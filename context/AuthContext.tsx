import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import app from '@/firebase/config'
import React from 'react'
import getData from '@/firebase/getData'

const auth = getAuth(app)

export const AuthContext = createContext({})

export const useAuthContext = (): any => useContext(AuthContext)

export const AuthContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null)
  const [userData, setUserData] = useState<any>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      if (user) {
        setUser(user as any)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    getData('users', user && user.uid)
      .then(({ result }) => {
        // console.log(result)
        setUserData(result)
      })
      .catch(({ error }: any) => console.log(error))
  }, [user])

  return (
    <AuthContext.Provider value={{ user, userData }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  )
}
