import Errors from 'consts/Errors';
import TicketModel from 'models/TicketModel';
import ETHManager from 'utils/ETH';
import Extractor from 'utils/Extractor';

/** Class that contains Ticket ViewModel */
export default class TicketViewModel {
    /**
     * Represents TicketViewModel constructor
     */
    constructor() {
        this.state = {
            hallID: '',
            id: '',
            login: '',
            placeField: {
                place: '',
                row: '',
            },
            qrpath: '',
            placeFields: [],
            schedule: {
                cinemaID: '',
                cost: '',
                hallID: '',
                id: '',
                movieID: '',
                premierTime: '',
            },
            scheduleID: '',
        };
        this.stateTransaction = {
            senderAddress: '',
            signedTransaction: '',
            transactionHash: '',
        };
        this.buyTicketCommand = {exec: () => this.buyTicket()};
        this.buyTicketByCryptoCommand = {exec: () => this.buyTicketByCrypto()};
        this.getTicketcommand = {exec: () => this.getTicket()};
    }

    /**
     * Buy ticket.
     * @param {string} transactionHash
     * @return {Promise<JSON>}
     */
    async buyTicket(transactionHash = '') {
        const ticketModel = new TicketModel();

        ticketModel.login = this.state.login;
        ticketModel.placeFields = this.state.placeFields;
        ticketModel.scheduleID = Number(this.state.scheduleID);

        if (transactionHash.length > 0) {
            return ticketModel.buyTicket(transactionHash,
                this.stateTransaction.senderAddress,
                this.stateTransaction.signedTransaction,
            );
        }

        return ticketModel.buyTicket(this.stateTransaction.transactionHash,
            this.stateTransaction.senderAddress,
            this.stateTransaction.signedTransaction,
        );
    }

    /**
     * Get user ticket.
     * @return {Promise<Error>|Promise<Object>}
     */
    async getTicket() {
        const ticketModel = new TicketModel();

        ticketModel.id = this.state.id;
        const response = await ticketModel.getTicket();

        if (response.ok) {
            const extractedTicketDataMap = Extractor.extractTicketDataFromModel(ticketModel);
            extractedTicketDataMap.forEach((value, key) => {
                this.state[key] = value;
            });

            return this.state;
        }

        throw new Error(Errors.FailedToGetTicket);
    }

    /**
     * Buy ticket by ETH
     * @return {Promise<Error>|Promise<Object>}
     */
    async buyTicketByCrypto() {
        const cryptoManager = new ETHManager();
        const response = await cryptoManager.transferSignedTransaction(
            this.stateTransaction.senderAddress,
            this.stateTransaction.signedTransaction
        )
            .catch((err) => {
                switch (err) {
                    case Errors.TransactionNonceIsAlreadyUsed.errorNumber:
                        throw new Error(Errors.TransactionNonceIsAlreadyUsed.errorMessage);
                    case Errors.TransactionNotEnoughMoney.errorNumber:
                        throw new Error(Errors.TransactionNotEnoughMoney.errorMessage);
                    case Errors.TransactionVerificationIsFailed.errorNumber:
                        throw new Error(Errors.TransactionVerificationIsFailed.errorMessage);
                    default:
                        throw err;
                }
            });

        return this.buyTicket(response);
    }
}
