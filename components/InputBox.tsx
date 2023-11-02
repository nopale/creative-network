/* eslint-disable @next/next/no-img-element */
import { useAuthContext } from '@/context/AuthContext'
import {
  CameraIcon,
  LinkIcon,
  MapPinIcon,
  PlusCircleIcon,
  RectangleGroupIcon,
} from '@heroicons/react/20/solid'
import React, {
  ButtonHTMLAttributes,
  MouseEventHandler,
  useRef,
  useState,
} from 'react'
import Image from 'next/image'
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore'
import addData from '@/firebase/addData'
import firebase from 'firebase/compat/app'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import app from '@/firebase/config'
import { neueWorld, pierSans } from '@/fonts/fonts'
// import { FieldValue } from '@google-cloud/firestore'

function InputBox() {
  const { user, userData } = useAuthContext()
  const inputRef = useRef<any>(null)
  const filepickerRef = useRef<any>(null)
  const [imageToPost, setImageToPost] = useState<any>(null)
  const [imageUrl, setImageUrl] = useState<any>('')
  const [imageFile, setImageFile] = useState<any>(null)
  const [progresspercent, setProgresspercent] = useState(0)
  const storage = getStorage()

  const sendPost = (event: any) => {
    event.preventDefault()

    if (!inputRef?.current?.value) return

    const db = getFirestore(app)
    // const docRef = doc(db, 'users', user.uid)
    const colRef = collection(db, 'posts')
    addDoc(colRef, {
      message: inputRef.current.value,
      name: userData.name,
      email: user.email,
      userImage: userData.photo,
      timestamp: serverTimestamp(),
    }).then((doc) => {
      if (imageToPost) {
        const storageRef = ref(storage, `posts/${doc.id}`)
        const uploadTask = uploadBytesResumable(storageRef, imageFile)

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            )
            setProgresspercent(progress)
          },
          (error) => {
            alert(error)
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setDoc(
                doc,
                {
                  postImage: downloadURL,
                },
                { merge: true }
              )
            })
          }
        )
      }
      removeImage()
    })

    removeImage()

    inputRef.current.value = ''
  }

  const addImageToPost = (e: any) => {
    const reader = new FileReader()
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
      setImageFile(e.target.files[0])
    }

    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target?.result)
    }
  }

  const removeImage = () => {
    setImageToPost(null)
  }

  return (
    <div className='px-3 md:px-4 lg:px-6'>
      <div className="relative border-t border-white border-solid mx-3 md:mx-4 lg:mb-4 mb-6 mx-6">
        <div className="bg-[#d9d9d9]/[0.2] p-4 rounded-[5px] shadow-md font-medium text-white mt-6 ">
          <div className="flex space-x-4 pb-4 items-center">
            <form className="flex flex-1">
              <input
                ref={inputRef}
                className={`${pierSans.className} text-white h-12 bg-transparent flex-grow focus:outline-none text-[20px] md:text-[32px]`}
                type="text"
                placeholder="What's on your mind?"
              />
            </form>
            <button type="submit" onClick={sendPost}>
              post
            </button>

            {imageToPost && (
              <div className=" w-100 h-200 cursor-pointer right-4 flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor:pointer">
                <img
                  className="h-10 w-10 object-cover "
                  src={imageToPost}
                  alt="post-image"
                />
                <p
                  onClick={removeImage}
                  className="text-xs text-red-500 text-center"
                >
                  remove
                </p>
              </div>
            )}
          </div>

          <div>
            <div>
              <p></p>
            </div>
            <div className="flex items-center">
              <PlusCircleIcon
                className="text-white h-6 mr-3"
                onClick={() => filepickerRef.current.click()}
              />
              <LinkIcon className="text-white h-5 mr-3 rotate-45" />
              <MapPinIcon className="text-white h-5 mr-3 " />
              <RectangleGroupIcon className="text-white h-5 mr-3 " />
              <input
                className="opacity-0"
                ref={filepickerRef}
                onChange={addImageToPost}
                hidden
                type="file"
                placeholder="upload"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InputBox
