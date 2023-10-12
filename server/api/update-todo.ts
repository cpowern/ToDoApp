import { MongoClient } from 'mongodb'

export default defineEventHandler(async (event) => {
    const uri = "mongodb+srv://nghb2014:Test1234@cluster0.pfuayqz.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri)

    try {
        await client.connect()
        const db = client.db('data-todo')
        const collection = db.collection('app')

        const body = await readBody(event)

        await collection.updateOne(
            { id: body.id },
            {
                $set: {
                    ...body
                }
            }
        )

        
        
      } finally {
        await client.close()
    }

})