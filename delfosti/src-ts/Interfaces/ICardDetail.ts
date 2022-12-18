export interface ICardDetail {
    cardNumber: string;
    cvv: string;
    expirationMonth: number;
    expirationYear: string;
    email : string;
}

export interface ICardDetailModel {
    cardNumber: string;
    cvv: string;
    expirationMonth: number;
    expirationYear: string;
    email : string;
    token: string;
    creationDate : string;
    expirationDate: string;
}

export interface ICardRequest {
    card_number: string;
    cvv: string;
    expiration_month: string;
    expiration_year: string;
    email : string;
}
