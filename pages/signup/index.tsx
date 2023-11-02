import addData from '@/firebase/addData'
import signUp from '@/firebase/auth/signup'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
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
  const router = useRouter()

  const storage = getStorage()

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      photo: imgUrl
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

  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h1 className="mt-60 mb-30">Sign up</h1>
        <form onSubmit={handleForm} className="form">
          <label htmlFor="email">
            <p>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              name="email"
              id="email"
              placeholder="example@mail.com"
            />
          </label>
          <label htmlFor="password">
            <p>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              name="password"
              id="password"
              placeholder="password"
            />
          </label>
          <label htmlFor="name">
            <p>First Name</p>
            <input
              onChange={(e) => setFirstName(e.target.value)}
              required
              type="text"
              name="first Name"
              id="first-name"
              placeholder="Your First Name"
            />
          </label>
          <label htmlFor="lastName">
            <p>Last Name</p>
            <input
              onChange={(e) => setLastName(e.target.value)}
              required
              type="text"
              name="Last "
              id="last-name"
              placeholder="Your Last Name"
            />
          </label>
          <label htmlFor="profileImage">
            <p>Profile Image</p>
            <input
              onChange={handleImage}
              required
              accept="image/*"
              type="file"
              name="Profile Picture "
              id="profile-image"
              placeholder="Upload Image"
            />
          </label>
          <button type="submit">Sign up</button>
        </form>
      </div>
    </div>
  )
}

export default Page
