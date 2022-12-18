import { ICardDetailModel } from "../Interfaces/ICardDetail";
import { cardModel } from "../models/cardModel";


export class CardRepository {

    constructor(){}

    async saveCardNumber(props: ICardDetailModel) {
        const cardNumber = await cardModel();
        
        return await cardNumber.insertOne({
                token: `pk_test_${props.token}`,
                cardNumber: props.cardNumber,
                cvv: props.cvv,
                expirationMonth: props.expirationMonth,
                expirationYear: props.expirationYear,
                email: props.email,
                creationDate: props.creationDate,
                expirationDate: props.expirationDate
            })
    }

    async findToken(token: string) {
        const cardNumber = await cardModel();
        
        return await cardNumber.findOne(
            {
                token
            }
        )
    }

    async findTokenNew(token: string) {
        const cardNumber = await cardModel();
        
        return await cardNumber.findOne(
            {
                token: `pk_test_${token}`
            }
        )
    }
}