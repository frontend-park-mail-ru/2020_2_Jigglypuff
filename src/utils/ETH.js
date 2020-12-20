import Errors from 'consts/Errors';
import Transaction from 'ethereumjs-tx';
import web3 from 'web3';

const Web3 = web3.Web3;
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
     * @param {Array<string>} signedTransaction
     * @return {bool|null}
     */
    async transferSignedTransaction(senderAddress, signedTransaction) {
        const transaction = new Transaction.Transaction(signedTransaction, {chain: chainID});

        if (!transaction.verifySignature()) {
            return Errors.TransactionVerificationIsFailed;
        }

        const balance = await web3Obj.eth.getBalance(senderAddress);
        if (balance / decimalPrecision < amountToSend) {
            return Errors.TransactionNotEnoughMoney;
        }

        const serializedTransaction = transaction.serialize();

        const response = this._transfer(serializedTransaction);

        if (response.ok) {
            return null;
        }

        return Errors.TransactionNonceIsAlreadyUsed;
    }

    /**
     * Transfer ETH.
     * @param {Buffer} serializedTransaction
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
}
