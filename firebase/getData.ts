import app from './config'
import { getFirestore, doc, getDoc } from 'firebase/firestore'

const db = getFirestore(app)
export default async function getData(collection: any, id: any) {
  let docRef = doc(db, collection, id)
    console.log(id)
  let result = null
  let error = null

  try {
    result = (await getDoc(docRef)).data()
  } catch (e) {
    error = e
  }

  return { result, error }
}
