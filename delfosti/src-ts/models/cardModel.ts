import { MongoClient } from "mongodb";
 
export const cardModel = async () => {
    const uri = 'mongodb+srv://pau97:Pau1997@cluster0.ezoewjs.mongodb.net/delfosti?retryWrites=true&w=majority'

    const client = new MongoClient(uri);
     
    await client.connect();
    const db = client.db("delfosti");
    return db.collection("cardNumbers");
}



