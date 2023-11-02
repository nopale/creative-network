import app from '@/firebase/config'
import { collection, getFirestore, orderBy, query } from 'firebase/firestore'
import React from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import Post from '../Post'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import styles from './posts.module.css'

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
    <div className=" px-3 md:px-4 lg:px-6">
      <div className={`${styles.filters} flex justify-between px-3 py-3 md:px-4 md:py-4 lg:px-6 lg:py-5`}>
        <div className="pl-5">
          <p className="uppercase text-[12px] cursor-pointer hover:text-gray-500 transition-colors duration-200 cursor-pointer">
            Berlin
          </p>
          <p className="uppercase text-[12px] cursor-pointer hover:text-gray-500 transition-colors duration-200 cursor-pointer">
            Amsterdam
          </p>
          <p className="uppercase text-[12px] cursor-pointer hover:text-gray-500 transition-colors duration-200 cursor-pointer">
            London
          </p>
          <p className="text-gray-500 uppercase text-[12px] cursor-pointer hover:text-gray-500 transition-colors duration-200 cursor-pointer">
            More locations
          </p>
        </div>
        <div className="hidden lg:block">
          <p className="uppercase text-[12px] cursor-pointer hover:text-gray-500 transition-colors duration-200 cursor-pointer">
            Hiring
          </p>
          <p className="uppercase text-[12px] cursor-pointer hover:text-gray-500 transition-colors duration-200 cursor-pointer">
            Portfolio
          </p>
          <p className="uppercase text-[12px] cursor-pointer hover:text-gray-500 transition-colors duration-200 cursor-pointer">
            Inspiration
          </p>
          <p className="text-gray-500 uppercase text-[12px] cursor-pointer hover:text-gray-500 transition-colors duration-200 cursor-pointer">
            More categories
          </p>
        </div>
        <div className="hidden lg:block">
          <p className="uppercase text-[12px] cursor-pointer hover:text-gray-500 transition-colors duration-200 cursor-pointer">
            Text
          </p>
          <p className="uppercase text-[12px] cursor-pointer hover:text-gray-500 transition-colors duration-200 cursor-pointer">
            Image
          </p>
          <p className="uppercase text-[12px] cursor-pointer hover:text-gray-500 transition-colors duration-200 cursor-pointer">
            Video
          </p>
          <p className="text-gray-500 uppercase text-[12px] cursor-pointer hover:text-gray-500 transition-colors duration-200 cursor-pointer">
            More media
          </p>
        </div>
        <div className="pr-5">
          <p className="uppercase text-[12px] cursor-pointer hover:text-gray-500 transition-colors duration-200 cursor-pointer">
            Architecture
          </p>
          <p className="uppercase text-[12px] cursor-pointer hover:text-gray-500 transition-colors duration-200 cursor-pointer">
            Engineering
          </p>
          <p className="uppercase text-[12px] cursor-pointer hover:text-gray-500 transition-colors duration-200 cursor-pointer">
            Music
          </p>
          <p className="text-gray-500 uppercase text-[12px] cursor-pointer hover:text-gray-500 transition-colors duration-200 cursor-pointer">
            More disciplines
          </p>
        </div>
      </div>
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1000: 4 }}
      >
        <Masonry className="posts px-3 md:px-4 lg:px-6 mt-5" gutter="56px">
          {realTimePosts &&
            realTimePosts.docs.map((doc) => (
              <Post
                key={doc.id}
                name={doc.data().name}
                message={doc.data().message}
                email={doc.data().email}
                timestamp={doc.data().timestamp}
                userImage={doc.data().userImage}
                postImage={doc.data().postImage}
              />
            ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  )
}

export default Posts
