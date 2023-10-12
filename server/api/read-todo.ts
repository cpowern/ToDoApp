import { MongoClient } from 'mongodb'
import { sortByDate } from '~/composables/date';
import { ToDo } from '~/core/todo.type';

export default defineEventHandler(async (event) => {
  const uri = "mongodb+srv://nghb2014:Test1234@cluster0.pfuayqz.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri)

  try {
    await client.connect()
    const db = client.db('data-todo')
    const collection = db.collection('app')
    return await collection.find().toArray()

  } finally {
    await client.close()
  }
})