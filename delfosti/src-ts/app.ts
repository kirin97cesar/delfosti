import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { CardService } from "./services/card";
import { ICardRequest } from "./Interfaces/ICardDetail";

export const lambdaHandler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    let cardService = new CardService();
    switch(event.path) {
        case '/validate':
            const {token } = JSON.parse(event.body || '{}');
            return await cardService.findCardNumberByToken(token, event.headers.Authorization);
        case '/tokens':
            const { card_number, cvv, expiration_month, expiration_year, email } : ICardRequest = JSON.parse(event.body || '{}');
            return await cardService.validateAndRegisterCardNumber({ card_number, cvv, expiration_month, expiration_year, email }, event.headers.Authorization);
            
        default:
            return {
                statusCode: 404,
                body: JSON.stringify({message: 'It was not found'})
            }
    }
}