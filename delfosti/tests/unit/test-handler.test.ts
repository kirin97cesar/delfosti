import { APIGatewayProxyEvent } from "aws-lambda";
import { lambdaHandler } from "../../src-ts/app";
import { CardController } from "../../src-ts/controllers/cardController";
import { TokenService } from "../../src-ts/services/token";
jest.setTimeout(30000)

describe('Unit test for app handler', function () {
    describe('/tokens', () => {
        it('verifies successful response', async () => {
            const event: APIGatewayProxyEvent = {
                body: JSON.stringify({
                    "card_number": "4557880539642359",
                    "cvv": "124",
                    "expiration_month": "01",
                    "expiration_year": "2027",
                    "email": "demo@gmail.com"
                }),
                path: '/tokens',
                headers: {
                    Authorization: 'Bearer pk_test_LsRBKejzCOEEWOsw'
                }
            } as any
            const result = await lambdaHandler(event)
            expect(result.statusCode).toEqual(200);
        });

        it('verifies without token header response', async () => {
            const event: APIGatewayProxyEvent = {
                body: JSON.stringify({
                    "card_number": "4557880539642359",
                    "cvv": "124",
                    "expiration_month": "01",
                    "expiration_year": "2027",
                    "email": "demo@gmail.com"
                }),
                path: '/tokens',
                headers: {
                }
            } as any
            const result = await lambdaHandler(event)
            expect(result.statusCode).toEqual(401);
        });

        it('verifies invalid card_number response', async () => {
            const event: APIGatewayProxyEvent = {
                body: JSON.stringify({
                    "card_number": "455780539642359",
                    "cvv": "124",
                    "expiration_month": "01",
                    "expiration_year": "2027",
                    "email": "demo@gmail.com"
                }),
                path: '/tokens',
                headers: {
                    Authorization: 'Bearer pk_test_LsRBKejzCOEEWOsw'
                }
            } as any
            const result = await lambdaHandler(event)
            expect(result.statusCode).toEqual(400);
            expect(JSON.parse(result.body).message).toEqual("Invalid cardNumber")
        });

        it('verifies invalid cvv response', async () => {
            const event: APIGatewayProxyEvent = {
                body: JSON.stringify({
                    "card_number": "4557880539642359",
                    "cvv": "1a24",
                    "expiration_month": "01",
                    "expiration_year": "2027",
                    "email": "demo@gmail.com"
                }),
                path: '/tokens',
                headers: {
                    Authorization: 'Bearer pk_test_LsRBKejzCOEEWOsw'
                }
            } as any
            const result = await lambdaHandler(event)
            expect(result.statusCode).toEqual(400);
            expect(JSON.parse(result.body).message).toEqual("Invalid cvv")
        });

        it('verifies invalid expiration_month response', async () => {
            const event: APIGatewayProxyEvent = {
                body: JSON.stringify({
                    "card_number": "4557880539642359",
                    "cvv": "124",
                    "expiration_month": "23",
                    "expiration_year": "2027",
                    "email": "demo@gmail.com"
                }),
                path: '/tokens',
                headers: {
                    Authorization: 'Bearer pk_test_LsRBKejzCOEEWOsw'
                }
            } as any
            const result = await lambdaHandler(event)
            expect(result.statusCode).toEqual(400);
            expect(JSON.parse(result.body).message).toEqual("Invalid expirationMonth")
        });

        it('verifies invalid expiration_year response', async () => {
            const event: APIGatewayProxyEvent = {
                body: JSON.stringify({
                    "card_number": "4557880539642359",
                    "cvv": "124",
                    "expiration_month": "12",
                    "expiration_year": "3027",
                    "email": "demo@gmail.com"
                }),
                path: '/tokens',
                headers: {
                    Authorization: 'Bearer pk_test_LsRBKejzCOEEWOsw'
                }
            } as any
            const result = await lambdaHandler(event)
            expect(result.statusCode).toEqual(400);
            expect(JSON.parse(result.body).message).toEqual("Invalid expirationYear")
        });

        it('verifies invalid email response', async () => {
            const event: APIGatewayProxyEvent = {
                body: JSON.stringify({
                    "card_number": "4557880539642359",
                    "cvv": "124",
                    "expiration_month": "12",
                    "expiration_year": "2027",
                    "email": "mail.com"
                }),
                path: '/tokens',
                headers: {
                    Authorization: 'Bearer pk_test_LsRBKejzCOEEWOsw'
                }
            } as any
            const result = await lambdaHandler(event)
            expect(result.statusCode).toEqual(400);
            expect(JSON.parse(result.body).message).toEqual("Invalid email")
        });

        it('verifies invalid domain email response', async () => {
            const event: APIGatewayProxyEvent = {
                body: JSON.stringify({
                    "card_number": "4557880539642359",
                    "cvv": "124",
                    "expiration_month": "11",
                    "expiration_year": "2027",
                    "email": "demo@dmo.com"
                }),
                path: '/tokens',
                headers: {
                    Authorization: 'Bearer pk_test_LsRBKejzCOEEWOsw'
                }
            } as any
            const result = await lambdaHandler(event)
            expect(result.statusCode).toEqual(400);
            expect(JSON.parse(result.body).message).toEqual("Invalid email")
        });

    })

    describe('/validate', () => {
        it('verifies without token header response', async () => {
            const event: APIGatewayProxyEvent = {
                body: JSON.stringify({
                    "token": "pk_test_5e98D583ffB4AE3A"
                }),
                path: '/validate',
                headers: {
                }
            } as any
            const result = await lambdaHandler(event)
            expect(result.statusCode).toEqual(401);
        });

        it('verifies successful response', async () => {
            const event: APIGatewayProxyEvent = {
                body: JSON.stringify({
                    "token": "pk_test_5e98D583ffB4AE3A"
                }),
                path: '/validate',
                headers: {
                    Authorization: 'Bearer pk_test_LsRBKejzCOEEWOsw'
                }
            } as any
            const result = await lambdaHandler(event)
            expect(result.statusCode).toEqual(200);
        });

        it('verifies token expired response', async () => {
            const event: APIGatewayProxyEvent = {
                body: JSON.stringify({
                    "token": "pk_test_507776E95400dc63"
                }),
                path: '/validate',
                headers: {
                    Authorization: 'Bearer pk_test_LsRBKejzCOEEWOsw'
                }
            } as any
            const result = await lambdaHandler(event)
            expect(result.statusCode).toEqual(403);
        });
    })
    
    describe('/other', () => {
        it('verify token exists', async () => {
            const isNewToken = await TokenService.isNewToken('3A06A413D6c95f1E');
            expect(isNewToken).toEqual(false)
        });

        it('registerInvalid format error', async () => {
            const error = await TokenService.registerCardNumberAndToken();
            expect(error.statusCode).toEqual(500)
        });

        it('regenerate token', async () => {
            const token = '3A06A413D6c95f1E'
            const newToken = await TokenService.regenerateToken(token);
            expect(newToken).not.toEqual(token)
        });
        

        it('verifies other routes', async () => {
            const event: APIGatewayProxyEvent = {
                body: JSON.stringify({
                    "token": "pk_test_5e98D583ffB4AE3A"
                }),
                path: '/other',
            } as any
            const result = await lambdaHandler(event)
            expect(result.statusCode).toEqual(404);
        });
    })

  
   

});
