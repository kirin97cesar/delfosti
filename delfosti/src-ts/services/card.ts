import { ICardRequest } from "../Interfaces/ICardDetail";
import { TokenService } from "./token";
import { ValidationCardService } from "./validationCard";

export class CardService { 

    async validateAndRegisterCardNumber (props: ICardRequest, authorization: string) {
        
        const isValidtokenHeader = await TokenService.isValidHeaderToken(authorization)
        if(!isValidtokenHeader) return { statusCode: 401, body: JSON.stringify({message: 'Token Header invalid'})}

        const validationCard = new ValidationCardService({
            cardNumber : props.card_number, 
            cvv : props.cvv, 
            expirationMonth: Number(props.expiration_month), 
            expirationYear: props.expiration_year, 
            email : props.email})
        
        const responseValidation = validationCard.isValidationComplete();

        if(responseValidation === true){
            const responseRegisterCardNumber = await TokenService.registerCardNumberAndToken({
                cardNumber : props.card_number, 
                cvv : props.cvv, 
                expirationMonth: Number(props.expiration_month), 
                expirationYear: props.expiration_year, 
                email : props.email
            })
            return responseRegisterCardNumber;
        }
        return responseValidation;
    }

    async findCardNumberByToken(token : string, authorization: string) : Promise<any> {
        const isValidtokenHeader = await TokenService.isValidHeaderToken(authorization)
        if(!isValidtokenHeader) return { statusCode: 401, body: JSON.stringify({message: 'Token Header invalid'})}

        return await TokenService.getStatusTokenAndCardNumber(token);
    }
}