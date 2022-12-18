import validator from 'validator';
import moment from 'moment-timezone';
import luhn from "luhn";
import { ICardDetail } from '../Interfaces/ICardDetail';


export class ValidationCardService {

    constructor(public props: ICardDetail) { }
    
    isValidCardNumber() : boolean {
        return luhn.validate(this.props.cardNumber); 
    }

    isValidCVV() : boolean {
        const numberValid = validator.isNumeric(this.props.cvv);
        const isCVV = validator.isLength(this.props.cvv, { min: 3, max: 4});
        return numberValid && isCVV;
    }

    isValidExpirationMonth() : boolean {
        const lengthValid = validator.isLength(String(this.props.expirationMonth), {min: 1, max: 2});
        const numberValid = validator.isNumeric(String(this.props.expirationMonth));
        return (lengthValid && numberValid && this.props.expirationMonth <=12 && this.props.expirationMonth >= 1);
    }

    isValidExpirationYear() : boolean {
        const lastYear = moment().subtract(1, 'year').format('YYYY');
        const limitYear = moment().add(6, 'year').format('YYYY');
        const minYearValid = validator.isAfter(this.props.expirationYear, lastYear );
        const maxYearValid = validator.isBefore(this.props.expirationYear, limitYear );
        return (minYearValid && maxYearValid);
    }

    isValidEmail(): boolean {
        const validEmail = validator.isEmail(this.props.email);
        const validDomain = this.isValidateDomain(this.props.email, ['gmail.com', 'hotmail.com', 'yahoo.es']);
        return (validEmail && validDomain);
    }

    isValidateDomain(email : string, domains : string[]): boolean {
        let isValidDomain = 0;
        domains.forEach((domain) => {
          const parts = email.split(domain);
          if (parts.length === 2) isValidDomain=+1;
        })
        return Boolean(isValidDomain);
    }

    isValidationComplete(): any {
        if(!this.isValidCardNumber()) return { statusCode: 400, body: JSON.stringify({message: 'Invalid cardNumber'})};
        if(!this.isValidCVV()) return { statusCode: 400, body: JSON.stringify({message: 'Invalid cvv'})};
        if(!this.isValidExpirationMonth()) return { statusCode: 400, body: JSON.stringify({message: 'Invalid expirationMonth'})};
        if(!this.isValidExpirationYear()) return { statusCode: 400, body: JSON.stringify({message: 'Invalid expirationYear'})};
        if(!this.isValidEmail()) return { statusCode: 400, body: JSON.stringify({message: 'Invalid email'})};
        return true;
    }
}