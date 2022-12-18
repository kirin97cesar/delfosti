# PRUEBA TECNICA

![N|Solid](https://i.postimg.cc/bww5VKzF/Logo-secundario-2048x850.png)

Se desarrollo un API el cual proporciona tokens y con ellos podemos buscar el numero de tarjeta asociado.

- Typescript
- Jest
- Nodejs
- Babel
- Moment
- Mongo
- Axios
- Lambda
- ✨Magic ✨
## POSTMAN
- Se cuenta con un postman __Delfosti.postman_collection.json__ con el cual podran revisar a mas detalle los servicios creados.
## DESCRIPCION
 - El api cuenta con los siguientes metodos:
    - Ambos servicios necesitan de un token que es __Bearer pk_test_LsRBKejzCOEEWOsw__
  
    ## /tokens
        Este metodo me genera un token con los datos ingresados.
            ```
            {
                "card_number": "4557880539642359",
                "cvv": "124",
                "expiration_month": "01",
                "expiration_year": "2027",
                "email": "demo@gmail.com"
            }
            ```
    ![Generacion token](https://i.postimg.cc/MHQv0sLs/generar-Token.png)
    ## /validate
        Este metodo me devuelve los datos de la tarjeta asociada al token.
            ```
            {
                "token": "pk_test_507776E95400dc63"
            }
            ```
    ![Consultar token](https://i.postimg.cc/LhFhxtKm/consultar.png)
## COMANDO  - 
  El proyecto cuenta con los siguientes comandos de acuerdo a la prueba
  - __npm run compile__ : Usado para compilar typescript a javascript
  - __npm run start-local__ : Usado para desplegar el proyecto local
  - __npm run test__ : Usado para hacer las pruebas unitarias
  - __npm run integ-test__ : Usado para hacer las pruebas de integracion
## DESPLIEGUE

Para el despliegue en local se debera de contar con Nodejs, Docker y SAM

### 1. Nos ubicaremos en la carpeta __/delfosti__ y ejecutaremos:
- Windows:
``` npm run compile-windows ```
- Otros:
```npm run compile ```

### 2. Luego de la instalacion de las dependencias, ejecutaremos:
``` npm run start-local```
Esto hara que se despliegue en http://localhost:3000

## PRUEBAS-UNITARIAS
- Para realizar las pruebas unitarias se debera de ejecutar:
    ```
    npm run test
    ```
- El cual comprobara a nivel codigo las funciones correspondientes
![Pruebas unitarias](https://i.postimg.cc/MGVP4xQx/TES-UNITARIOS.png)
## PRUEBAS-INTEGRACION
- Para realizar las pruebas de integracion se debera de tener activo el despliegue en local y se procedera a ejecutar
```
    npm run integ-test
```
- El cual ejecutara una serie de request a la maquina local:
![Prueba de integracion](https://i.postimg.cc/x1tTmDCf/pruebas-de-integracion.png)
## License

MIT
**Prueba desarrollada por Paulo Cesar Carbajal Jimenez!**

