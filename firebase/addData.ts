import app from './config'
import { getFirestore, doc, setDoc } from 'firebase/firestore'

const db = getFirestore(app)
export default async function addData(colllection: any, id: string, data: any) {
  let resultData = null
  let errorData = null

  try {
    resultData = await setDoc(doc(db, colllection, id), data, {
      merge: true,
    })
  } catch (e) {
    errorData = e
    console.log(errorData)
  }

  return { resultData, errorData }
}
