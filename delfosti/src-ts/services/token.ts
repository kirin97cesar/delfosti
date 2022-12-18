import moment from "moment-timezone";
import validator from 'validator';
import { ICardDetail } from "../Interfaces/ICardDetail";
import { CardRepository } from "../repositories/cardRepository";

export class TokenService {

    public static isValidHeaderToken(tokenInput : string = '') : boolean {
        const token = (tokenInput.split('Bearer')[1] || '').trim();
        if(token.includes('pk_test_')) {
            if(token === 'pk_test_LsRBKejzCOEEWOsw') return true;
        }
        return false;
    }

    public static generateToken() :string {
        let guid = 'xxxxxxxxxxxxxxxx'.replace(/x/g, function () {
          const generateId = ((Math.random() * 16) | 0).toString(16)
          return Math.random() * 10 > 5 ? generateId.toUpperCase() : generateId
        })
        return guid;
    }

    public static async isNewToken(token : string = '') : Promise<boolean> {
        const cardRepository = new CardRepository()
        const showToken = await cardRepository.findTokenNew(token);
        if(!showToken) return true;
        return false;
    }

    public static async getStatusTokenAndCardNumber(token : string = '') : Promise<any> {
        const cardRepository = new CardRepository();
        const detailCardNumber = await cardRepository.findToken(token);
        if(!detailCardNumber) return { statusCode: 403, body: JSON.stringify({message: 'Invalid Token'})}
        const { cardNumber, expirationMonth, expirationYear, email, expirationDate } = detailCardNumber;

        if(this.isExpirateToken(expirationDate)) return { statusCode: 403, body: JSON.stringify({message: 'Token Expired'})}

        return {
            statusCode: 200,
            body: JSON.stringify({
                cardNumber,
                expirationMonth,
                expirationYear,
                email
            })
        };
    }

    public static isExpirateToken(expirationDate : string = '') : boolean {
        const nowDate = moment().tz('America/Lima').format('YYYY-MM-DD HH:mm:ss');
        const isValidToken = moment( nowDate ).isAfter(expirationDate);
        return isValidToken; 
    }

    public static async regenerateToken (token : string = '') {
        while(!await this.isNewToken(token)) {
            token = this.generateToken();
        }
        return token;
    }

    public static async registerCardNumberAndToken(props: ICardDetail) : Promise<any> {
        try {
            if(!props) throw "Error";

            let token = this.generateToken();
            token = await this.regenerateToken(token);

            const creationDate = moment().tz('America/Lima').format('YYYY-MM-DD HH:mm:ss');
            const expirationDate =  moment().tz('America/Lima').add(15, 'minute').format('YYYY-MM-DD HH:mm:ss');

            const cardRepository = new CardRepository();
            await cardRepository.saveCardNumber({
                ...props,
                token,
                creationDate,
                expirationDate
            });
    
            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: 'Registered card number',
                    token: `pk_test_${token}`,
                    creationDate,
                    expirationDate
                })
            }   
            
        } catch (error) {
            return {
                statusCode: 500,
                body: JSON.stringify({
                    message: 'Error register card number'
                })
            }   
        }
       

    }
}