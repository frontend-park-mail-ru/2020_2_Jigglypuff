import Errors from 'consts/Errors';
import Web3 from 'web3';
import * as tx from 'ethereumjs-tx';

const ethNetwork = 'https://rinkeby.infura.io/v3/921e50592f50453fac36299bb7cb0603';
const web3Obj = new Web3(new Web3.providers.HttpProvider(ethNetwork));

const amountToSend = 0.1;
const chainID = 4;
const decimalPrecision = 1000000000000000000;

/**
 * Manager to work with ETH BC
 */
export default class ETHManager {
    /**
     * Transfer signed transaction.
     * @param {string} senderAddress
     * @param {string} signedTransactionString
     * @return {Promise<int>|Promise<Buffer>}
     */
    async transferSignedTransaction(senderAddress, signedTransactionString) {
        const signedTransaction = this._getObjectForTransaction(signedTransactionString);
        const transaction = new tx.Transaction(signedTransaction, {chain: chainID});

        if (!transaction.verifySignature()) {
            throw Errors.TransactionVerificationIsFailed.errorNumber;
        }

        const balance = await web3Obj.eth.getBalance(senderAddress);
        if (balance / decimalPrecision < amountToSend) {
            throw Errors.TransactionNotEnoughMoney.errorNumber;
        }

        const serializedTransaction = transaction.serialize();

        await this._transfer(serializedTransaction.toString('hex'))
            .then(() => {
                return transaction.hash().toString('hex');
            })
            .catch(() => {
                throw Errors.TransactionNonceIsAlreadyUsed.errorNumber;
            });
    }

    /**
     * Transfer ETH.
     * @param {string} serializedTransaction
     * @return {Promise<PromiEvent<TransactionReceipt>>}
     * @private
     */
    async _transfer(serializedTransaction) {
        return web3Obj.eth.sendSignedTransaction('0x' + serializedTransaction, (err) => {
            if (err) {
                console.log(err);
            }
        });
    }

    /**
     * @param {string} signedTransactionString
     * @return {Array<string>}
     * @private
     */
    _getObjectForTransaction(signedTransactionString) {
        const result = [];

        let wasQuote = false;
        let substr = String();

        for (const char of signedTransactionString) {
            if (char === '\'') {
                if (wasQuote) {
                    result.push(substr);
                    wasQuote = false;
                    substr = String();
                    continue;
                }

                wasQuote = true;
                continue;
            }

            if (wasQuote) {
                substr += char;
            }
        }

        return result;
    }
}
