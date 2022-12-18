import axios from "axios";
jest.setTimeout(30000)

describe("Integration Test", () => {
    describe("/tokens", () => {
        it("generation token by cardNumber - data correct", async () => {
            const data = ({"card_number":"4557880539642359","cvv":"124","expiration_month":"01","expiration_year":"2027","email":"demo@gmail.com"});
            const config = {
                url: 'http://localhost:3000/tokens',
                headers: { 
                  'Authorization': 'Bearer pk_test_LsRBKejzCOEEWOsw', 
                  'Content-Type': 'application/json'
                }
              };
            const response = await axios.post( config.url, data, {
                headers: config.headers
            });
    
            expect(response.status).toEqual(200);
        });
        
        it("generation token by cardNumber invalid", async () => {
            try {
                const data = ({"card_number":"12323232323","cvv":"124","expiration_month":"01","expiration_year":"2027","email":"demo@gmail.com"});
                const config = {
                    url: 'http://localhost:3000/tokens',
                    headers: { 
                    'Authorization': 'Bearer pk_test_LsRBKejzCOEEWOsw', 
                    'Content-Type': 'application/json'
                    }
                };
                const response = await axios.post( config.url, data, {
                    headers: config.headers
                });
                expect(response.status).toEqual(200);
            } catch(error) {
                expect(error.response.status).toEqual(400)
            }
        });

        it("generation token by cvv invalid", async () => {
            try {
                const data = ({"card_number":"4557880539642359","cvv":"12a4","expiration_month":"01","expiration_year":"2027","email":"demo@gmail.com"});
                const config = {
                    url: 'http://localhost:3000/tokens',
                    headers: { 
                    'Authorization': 'Bearer pk_test_LsRBKejzCOEEWOsw', 
                    'Content-Type': 'application/json'
                    }
                };
                const response = await axios.post( config.url, data, {
                    headers: config.headers
                });
                expect(response.status).toEqual(200);
            } catch(error) {
                expect(error.response.status).toEqual(400)
            }
        });

        it("generation token by expiration_year invalid", async () => {
            try {
                const data = ({"card_number":"4557880539642359","cvv":"12a4","expiration_month":"01","expiration_year":"2087","email":"demo@gmail.com"});
                const config = {
                    url: 'http://localhost:3000/tokens',
                    headers: { 
                    'Authorization': 'Bearer pk_test_LsRBKejzCOEEWOsw', 
                    'Content-Type': 'application/json'
                    }
                };
                const response = await axios.post( config.url, data, {
                    headers: config.headers
                });
                expect(response.status).toEqual(200);
            } catch(error) {
                expect(error.response.status).toEqual(400)
            }
        });

        it("generation token by expiration_month invalid", async () => {
            try {
                const data = ({"card_number":"4557880539642359","cvv":"12a4","expiration_month":"13","expiration_year":"2027","email":"demo@gmail.com"});
                const config = {
                    url: 'http://localhost:3000/tokens',
                    headers: { 
                    'Authorization': 'Bearer pk_test_LsRBKejzCOEEWOsw', 
                    'Content-Type': 'application/json'
                    }
                };
                const response = await axios.post( config.url, data, {
                    headers: config.headers
                });
                expect(response.status).toEqual(200);
            } catch(error) {
                expect(error.response.status).toEqual(400)
            }
        });

        it("generation token by email invalid", async () => {
            try {
                const data = ({"card_number":"4557880539642359","cvv":"12a4","expiration_month":"01","expiration_year":"2027","email":"gmail.com"});
                const config = {
                    url: 'http://localhost:3000/tokens',
                    headers: { 
                    'Authorization': 'Bearer pk_test_LsRBKejzCOEEWOsw', 
                    'Content-Type': 'application/json'
                    }
                };
                const response = await axios.post( config.url, data, {
                    headers: config.headers
                });
                expect(response.status).toEqual(200);
            } catch(error) {
                expect(error.response.status).toEqual(400)
            }
        });

        it("generation token by domain email invalid", async () => {
            try {
                const data = ({"card_number":"4557880539642359","cvv":"12a4","expiration_month":"01","expiration_year":"2027","email":"demo@domainInvalid.com"});
                const config = {
                    url: 'http://localhost:3000/tokens',
                    headers: { 
                    'Authorization': 'Bearer pk_test_LsRBKejzCOEEWOsw', 
                    'Content-Type': 'application/json'
                    }
                };
                const response = await axios.post( config.url, data, {
                    headers: config.headers
                });
                expect(response.status).toEqual(200);
            } catch(error) {
                expect(error.response.status).toEqual(400)
            }
        });

        it("generation token without token header", async () => {
            try {
                const data = ({"card_number":"4557880539642359","cvv":"12a4","expiration_month":"01","expiration_year":"2027","email":"demo@domainInvalid.com"});
                const config = {
                    url: 'http://localhost:3000/tokens',
                    headers: { 
                    'Content-Type': 'application/json'
                    }
                };
                const response = await axios.post( config.url, data, {
                    headers: config.headers
                });
                expect(response.status).toEqual(200);
            } catch(error) {
                expect(error.response.status).toEqual(401)
            }
        });
    })

    describe("/validate", () => {
        it("get cardNumber without token header", async () => {
            try {
                const data = ({"token":"pk_test_3A06A413D6c95f1E"});
                const config = {
                    url: 'http://localhost:3000/validate',
                    headers: { 
                    'Content-Type': 'application/json'
                    }
                };
                const response = await axios.post( config.url, data, {
                    headers: config.headers
                });
                expect(response.status).toEqual(200);
            } catch(error) {
                expect(error.response.status).toEqual(401)
            }
        });

        it("get cardNumber with token body invalid", async () => {
            try {
                const data = ({"token":"pk_test_1413D6c95f1E"});
                const config = {
                    url: 'http://localhost:3000/validate',
                    headers: { 
                        'Authorization': 'Bearer pk_test_LsRBKejzCOEEWOsw', 
                        'Content-Type': 'application/json'
                    }
                };
                const response = await axios.post( config.url, data, {
                    headers: config.headers
                });
                expect(response.status).toEqual(200);
            } catch(error) {
                expect(error.response.status).toEqual(403)
            }
        });

        it("get cardNumber with token body expired", async () => {
            try {
                const data = ({"token":"pk_test_63fE8210cD513108"});
                const config = {
                    url: 'http://localhost:3000/validate',
                    headers: { 
                        'Authorization': 'Bearer pk_test_LsRBKejzCOEEWOsw', 
                        'Content-Type': 'application/json'
                    }
                };
                const response = await axios.post( config.url, data, {
                    headers: config.headers
                });
                expect(response.status).toEqual(200);
            } catch(error) {
                expect(error.response.status).toEqual(403)
            }
        });

        it("get cardNumber with token body valid", async () => {
            try {
                const data = ({"token":"pk_test_5e98D583ffB4AE3A"});
                const config = {
                    url: 'http://localhost:3000/validate',
                    headers: { 
                        'Authorization': 'Bearer pk_test_LsRBKejzCOEEWOsw', 
                        'Content-Type': 'application/json'
                    }
                };
                const response = await axios.post( config.url, data, {
                    headers: config.headers
                });
                expect(response.status).toEqual(200);
            } catch(error) {
                expect(error.response.status).toEqual(403)
            }
        });
    })

    
});