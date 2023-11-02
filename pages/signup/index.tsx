/* eslint-disable @next/next/no-img-element */
import addData from '@/firebase/addData'
import signUp from '@/firebase/auth/signup'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import {
  getStorage,
  uploadString,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from 'firebase/storage'

function Page() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [profileImage, setProfileImage] = useState({})
  const [imgUrl, setImgUrl] = useState<null | string>(null)
  const [progresspercent, setProgresspercent] = useState(0)
  const [imageToPost, setImageToPost] = useState<any>(null)
  const router = useRouter()
  const filepickerRef = useRef<any>(null)

  const storage = getStorage()

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    addImageToPost(event)
    event.preventDefault()
    const file =
      event && event.target && event.target.files && event.target.files[0]

    if (!file) return

    const storageRef = ref(storage, `files/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

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
          console.log(downloadURL)
          setImgUrl(downloadURL)
        })
      }
    )
  }

  const handleForm = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = {
      name: firstName,
      lastName: lastName,
      photo: imgUrl,
    }

    signUp(email, password).then(({ result, error }) => {
      result &&
        addData('users', result?.user.uid, data).then((res) => console.log(res))
    })

    // if (error) {
    //   return console.log(error)
    // }

    // const { resultData, errorData } = await addData('users', result?.user.uid as , data)

    // else successful
    // console.log(result)
    return router.push('/signin')
  }

  const addImageToPost = (e: any) => {
    const reader = new FileReader()
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
      //   setImageFile(e.target.files[0])
    }

    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target?.result)
    }
  }

  const removeImage = () => {
    setImageToPost(null)
  }

  return (
    <div className="wrapper p-10 mb-20 w-full max-w-[1100px] m-auto h-full flex justify-center items-center">
      <div className="form-wrapper">
        <h1 className="mt-24 text-[56px] mb-5 leading-11">
          A curated community for creative minds.
        </h1>
        <p className="mb-5 text-[24px]">
          Tired of the noise? So are we. It&apos;s time for a platform that
          reflects the essence of social connections. Here you build meaningful
          relationships and connect with members online to create in real life.
        </p>

        <div className="flex mt-20 justify-between">
          <div className="flex flex-col mr-10 w-1/3">
            <div className="mb-6">
              <h3 className="uppercase mb-2">Share your work</h3>
              <p>
                Raw creativity without having to think about how to tailor it to
                an algirithm.
              </p>
            </div>
            <div className="mb-6">
              <h3 className="uppercase mb-2">DISTINCT COLLABORATION</h3>
              <p>
                Raw creativity without having to think about how to tailor it to
                an algirithm.
              </p>
            </div>
            <div className="mb-6">
              <h3 className="uppercase mb-2">CLIENT CONNECTIONS</h3>
              <p>
                Raw creativity without having to think about how to tailor it to
                an algirithm.
              </p>
            </div>
          </div>
          <div className="w-1/2 pl-5">
            <h3></h3>
            <p className="text-[24px]">
              The Creative Network is not just another social media platform.
              It&apos;s a carefully curated space for the world&apos;s most
              passionate and talented creatives. Here, each member is
              handpicked, ensuring that you&apos;re surrounded by peers who
              inspire, challenge, and elevate your work.
            </p>
          </div>
        </div>

        <h3 className="mt-20 mb-10 text-[20px]">Sign up</h3>

        <form onSubmit={handleForm} className="form">
          <label htmlFor="email">
            <p className="mb-3">Email</p>
            <input
              className="rounded-[5px] bg-[#d9d9d9]/[0.2] text-white p-4 mb-5 focus:outline-none w-full border border-[#ffffff]/[0.4] borer-solid"
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              name="email"
              id="email"
              placeholder="example@mail.com"
            />
          </label>
          <label htmlFor="password">
            <p className="mb-3">Password</p>
            <input
              className="rounded-[5px] bg-[#d9d9d9]/[0.2] text-white p-4 mb-5 focus:outline-none w-full border border-[#ffffff]/[0.4] borer-solid"
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              name="password"
              id="password"
              placeholder="password"
            />
          </label>
          <div className="flex w-full">
            <div className="w-full mr-3">
              <label htmlFor="name">
                <p className="mb-3">First Name</p>
                <input
                  className="w-full rounded-[5px] bg-[#d9d9d9]/[0.2] text-white p-4 mb-5 focus:outline-none w-full border border-[#ffffff]/[0.4] borer-solid"
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  type="text"
                  name="first Name"
                  id="first-name"
                  placeholder="Your First Name"
                />
              </label>
            </div>
            <div className="w-full">
              <label htmlFor="lastName">
                <p className="mb-3">Last Name</p>
                <input
                  className="w-full rounded-[5px] bg-[#d9d9d9]/[0.2] text-white p-4 mb-5 focus:outline-none w-full border border-[#ffffff]/[0.4] borer-solid"
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  type="text"
                  name="Last "
                  id="last-name"
                  placeholder="Your Last Name"
                />
              </label>
            </div>
          </div>
          <label htmlFor="profileImage">
            <p className="mb-3">Profile Image</p>

            <div className="flex items-end mb-10">
              <button
                className="w-[200px] mr-4"
                onClick={() => filepickerRef?.current?.click()}
              >
                choose file
              </button>
              <input
                hidden
                className="bg-black px-3 py-2 border border-[#ffffff]/[0.4] borer-solid"
                onChange={handleImage}
                ref={filepickerRef}
                required
                accept="image/*"
                type="file"
                name="Profile Picture "
                id="profile-image"
                placeholder="Upload Image"
              />
              {imageToPost && (
                <div className="flex flex-col filter items-center hover:brightness-110 transition duration-150 transform hover:scale-105 cursor:pointer">
                  <img
                    className="h-10 rounded-full object-contain "
                    src={imageToPost}
                    alt="post-image"
                    onClick={removeImage}
                  />
                  <p
                    onClick={removeImage}
                    className="absolute bottom-[-18px] text-xs text-red-500 text-center"
                  >
                    remove
                  </p>
                </div>
              )}
            </div>
          </label>
          <div className="w-full flex justify-center">
            <button
              disabled={!imgUrl}
              type="submit"
              className={`${
                !imgUrl && 'cursor-not-allowed'
              } bg-white text-black w-[300px] hover:text-[#d9d9d9] hover:bg-[#ffffff]/[0.2]`}
            >
              Apply
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Page
