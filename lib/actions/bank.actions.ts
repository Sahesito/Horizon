"use server";

import {
    ACHClass,
    CountryCode,
    TransferAuthorizationCreateRequest,
    TransferCreateRequest,
    TransferNetwork,
    TransferType,
} from "plaid";

import { plaidClient } from "../plaid";
import { parseStringify } from "../utils";

import { getTransactionsByBankId } from "./transaction.actions";
import { getBanks, getBank } from "./user.actions";

export const getAccounts = async ({ userId }: GetAccountsProps) => {
    try {
        const banks = await getBanks({ userId });

        const accounts = await Promise.all(
            banks?.map(async (bank: Bank) => {

                const accountsResponse = await plaidClient.accountsGet({
                    access_token: bank.accessToken,
                });
                const accountData = accountsResponse.data.accounts[0];

                const institution = await getInstitution({
                    institutionId: accountsResponse.data.item.institution_id!,
                });

                const account = {
                    id: accountData.account_id,
                    availableBalance: accountData.balances.available!,
                    currentBalance: accountData.balances.current!,
                    institutionId: institution.institution_id,
                    name: accountData.name,
                    officialName: accountData.official_name,
                    mask: accountData.mask!,
                    type: accountData.type as string,
                    subtype: accountData.subtype! as string,
                    appwriteItemId: bank.$id,
                    sharaebleId: bank.shareableId,
                };

                return account;
            })
        );

        const totalBanks = accounts.length;
        const totalCurrentBalance = accounts.reduce((total, account) => {
            return total + account.currentBalance;
        }, 0);

        return parseStringify({ data: accounts, totalBanks, totalCurrentBalance });
    } catch (error) {
        console.error("An error occurred while getting the accounts:", error);
    }
};


export const getAccount = async ({ appwriteItemId }: GetAccountProps) => {
    try {

        const bank = await getBank({ documentId: appwriteItemId });


        const accountsResponse = await plaidClient.accountsGet({
            access_token: bank.accessToken,
        });
        const accountData = accountsResponse.data.accounts[0];

        const transferTransactionsData = await getTransactionsByBankId({
            bankId: bank.$id,
        });

        const transferTransactions = transferTransactionsData.documents.map(
            (transferData: Transaction) => ({
                id: transferData.$id,
                name: transferData.name!,
                amount: transferData.amount!,
                date: transferData.$createdAt,
                paymentChannel: transferData.channel,
                category: transferData.category,
                type: transferData.senderBankId === bank.$id ? "debit" : "credit",
            })
        );

        const institution = await getInstitution({
            institutionId: accountsResponse.data.item.institution_id!,
        });

        const transactions = await getTransactions({
            accessToken: bank?.accessToken,
        });

        const account = {
            id: accountData.account_id,
            availableBalance: accountData.balances.available!,
            currentBalance: accountData.balances.current!,
            institutionId: institution.institution_id,
            name: accountData.name,
            officialName: accountData.official_name,
            mask: accountData.mask!,
            type: accountData.type as string,
            subtype: accountData.subtype! as string,
            appwriteItemId: bank.$id,
        };

        const validTransactions = Array.isArray(transactions) ? transactions : [];
        const validTransferTransactions = Array.isArray(transferTransactions) ? transferTransactions : [];

        const allTransactions = [...validTransactions, ...validTransferTransactions].sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        return parseStringify({
            data: account,
            transactions: allTransactions,
        });
    } catch (error) {
        console.error("An error occurred while getting the account:", error);
        return null;
    }
};

export const getInstitution = async ({
    institutionId,
}: GetInstitutionProps) => {
    try {
        const institutionResponse = await plaidClient.institutionsGetById({
            institution_id: institutionId,
            country_codes: ["US"] as CountryCode[],
        });

        const intitution = institutionResponse.data.institution;

        return parseStringify(intitution);
    } catch (error) {
        console.error("An error occurred while getting the accounts:", error);
    }
};

export const getTransactions = async ({
    accessToken,
}: GetTransactionsProps) => {
    let hasMore = true;
    let transactions: any = [];

    try {
        if (!accessToken) {
            console.error('No access token provided');
            return [];
        }

        while (hasMore) {
            try {
                const response = await plaidClient.transactionsSync({
                    access_token: accessToken,
                });

                const data = response.data;

                const newTransactions = data.added.map((transaction) => ({
                    id: transaction.transaction_id,
                    name: transaction.name,
                    paymentChannel: transaction.payment_channel,
                    type: transaction.payment_channel,
                    accountId: transaction.account_id,
                    amount: transaction.amount,
                    pending: transaction.pending,
                    category: transaction.category ? transaction.category[0] : "",
                    date: transaction.date,
                    image: transaction.logo_url,
                }));

                transactions = [...transactions, ...newTransactions];
                hasMore = data.has_more;

            } catch (syncError: any) {
                const errorCode = syncError.response?.data?.error_code;
                
                if (errorCode === 'ADDITIONAL_CONSENT_REQUIRED') {
                    console.warn('Additional consent required - user needs to reconnect their bank account');
                    return [];
                }
                
                if (errorCode === 'ITEM_LOGIN_REQUIRED') {
                    console.warn('Item login required - user needs to reconnect their bank');
                    return [];
                }
                
                console.error("Error syncing transactions:", syncError.response?.data || syncError.message);
                hasMore = false;
            }
        }

        return parseStringify(transactions);
    } catch (error) {
        console.error("An error occurred while getting the transactions:", error);
        return [];
    }
};