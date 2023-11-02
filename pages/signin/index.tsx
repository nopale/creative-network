import React from 'react'
import signIn from '@/firebase/auth/signin'
import { useRouter } from 'next/navigation'

function Page() {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const router = useRouter()

  const handleForm = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { result, error } = await signIn(email, password)

    if (error) {
      return console.log(error)
    }

    // else successful
    console.log(result)
    return router.push('/')
  }
  return (
    <div className="wrapper w-full h-full flex justify-center items-center">
      <div className="form-wrapper">
        <h1 className="mt-60 mb-30 text-[40px] mb-4">
          Sign in to your account
        </h1>
        <form onSubmit={handleForm} className="form">
          <label htmlFor="email" className="mb-4">
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
          <label htmlFor="password" className="relative items-center h-full">
            <p className="mb-3">Password</p>
            <div className="relative flex items-center justify-start">
              <input
                className="rounded-[5px] bg-[#d9d9d9]/[0.2] text-white  mb-5 focus:outline-none p-4 w-full border border-[#ffffff]/[0.4] borer-solid"
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
                name="password"
                id="password"
                placeholder="password"
              />
              {/* <p className="absolute mx-4 mb-6">{password}</p> */}
            </div>
          </label>
          <button type="submit">Sign in</button>
        </form>
      </div>
    </div>
  )
}

export default Page
