import app from '@/firebase/config'
import { collection, getFirestore, orderBy, query } from 'firebase/firestore'
import React from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'

function Posts() {
  const db = getFirestore(app)
  const postsRef = collection(db, 'posts')

  // Create a query that orders the documents by the 'timestampField' in descending order
  const myQuery: any = query(postsRef, orderBy('timestamp', 'desc'))
  const [realTimePosts, loading, error] = useCollection(myQuery)

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  console.log(realTimePosts && realTimePosts.docs)

  return (
    <div className="posts">
      {realTimePosts &&
        realTimePosts.docs.map((doc) => (
          <li key={doc.id}>
            YES
          </li>
        ))}
    </div>
  )
}

export default Posts
