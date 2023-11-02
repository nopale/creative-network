/* eslint-disable @next/next/no-img-element */
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

interface PostProps {
  name: string
  message: string
  email: string
  timestamp: any
  userImage: string
  postImage: string
}

function Post({
  name,
  message,
  email,
  timestamp,
  userImage,
  postImage,
}: PostProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [sideBarVisible, setSideBarVisible] = useState(false)

  const openSideBar = () => {
    setSideBarVisible(!sideBarVisible)
  }

  return (
    <>
      <div className="flex flex-col p-0 bg-black border border-[#d9d9d9]/[0.3] border-solid">
        {postImage && (
          <div
            className="relative overflow-hidden"
            onMouseOver={() => setIsVisible(true)}
            onMouseOut={() => setIsVisible(false)}
          >
            <img
              className="w-full h-auto object-fill"
              src={postImage}
              alt={'post-image'}
            />
            <AnimatePresence mode="wait">
              {isVisible && (
                <motion.div
                  initial={{ y: -100, opacity: 0 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.3, ease: 'easeInOut' },
                  }}
                  exit={{
                    opacity: 0,
                    y: -100,
                    transition: { duration: 0.3, ease: 'easeInOut' },
                  }}
                  className="absolute w-full p-2 flex justify-between items-center rounde-b-2xl bg-transparent top-0 text-gray-400"
                >
                  <div className="w-full mr-2">
                    <button className="w-full">profile</button>
                  </div>
                  <div className="w-full">
                    <button className="w-full" onClick={openSideBar}>
                      details
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* footer */}

        <div className="p-3 bg-black ">
          <div className="flex items-center space-x-2">
            <img
              className="rounded-full object-cover"
              src={userImage}
              width={32}
              height={32}
              alt=""
            />
            <div>
              <p className="font-medium text-white">{name}</p>
              <p className="text-xs text-gray-400">
                {new Date(timestamp?.toDate()).toLocaleString()}
              </p>
            </div>
          </div>
          <p className="pt-4 text-white">{message}</p>
        </div>
      </div>
      <div className='fixed w-1/3 h-full bg-black'>
        
      </div>
    </>
  )
}

export default Post
