import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import {
  HomeIcon,
  MagnifyingGlassIcon,
  UserGroupIcon,
  ViewColumnsIcon,
} from '@heroicons/react/20/solid'
import { FlagIcon, PlayIcon } from '@heroicons/react/24/outline'
import { useAuthContext } from '@/context/AuthContext'
import getData from '@/firebase/getData'

const Header = () => {
  const { userData } = useAuthContext()
  
  return (
    <div className="sticky top-0 z-50 bg-white flex items-center p-2 lg:px-5 shadow-md">
      <h1> New Republic</h1>
      <div className="flex items-center">
        <Image
          src="https://links.papareact.com/5me"
          width={40}
          height={40}
          alt={''}
        />
        <div className="flex ml-2 items-center bg-gray-100">
          <MagnifyingGlassIcon className="h-6 text-gray-500" />
          <input
            className="hidden md:inline-flex ml-2 items-center bg-transparent outline-none flex-shrink "
            type="text"
            placeholder="Search Directory"
          />
        </div>
      </div>

      <div className="flex justify-center flex-grow h-200">
        <div className="flex space-x-6 md:space-x-2">
          <div className="flex items-center cursor-pointer md:px-10 sm:h-14 md:hover:bg-gray-100 active-border-b-2 active:border-blue-500 group">
            <HomeIcon className="h-6 text-gray-500 group:hover:text-blue-500 text-center mx-auto sm:h-7" />
          </div>
          <div className="flex items-center cursor-pointer md:px-10 sm:h-14 md:hover:bg-gray-100 active-border-b-2 active:border-blue-500 group">
            <FlagIcon className="h-6 text-gray-500 group:hover:text-blue-500 text-center mx-auto sm:h-7" />
          </div>
          <div className="flex items-center cursor-pointer md:px-10 sm:h-14 md:hover:bg-gray-100 active-border-b-2 active:border-blue-500 group">
            <PlayIcon className="h-6 text-gray-500 group:hover:text-blue-500 text-center mx-auto sm:h-7" />
          </div>
          <div className="flex items-center cursor-pointer md:px-10 sm:h-14 md:hover:bg-gray-100 active-border-b-2 active:border-blue-500 group">
            <UserGroupIcon className="h-6 text-gray-500 group:hover:text-blue-500 text-center mx-auto sm:h-7" />
          </div>
          {/* <HeaderIcon className="h-6 text-gray-500 group:hover:text-blue-500 text-center mx-auto sm:h-7" Icon={HomeIcon} />
          <HeaderIcon Icon={FlagIcon} />
          <HeaderIcon Icon={PlayIcon} />
          <HeaderIcon Icon={HomeIcon} /> */}
        </div>
      </div>

      <div className="flex items-center sm:space-x-2 justify-end">
        <Image src={userData.photo} width={40} height={40} alt={''} />
        <p className="whitespace-nowrap font-semibold pr-3">
          {userData.name} {userData.lastName}
        </p>
        <ViewColumnsIcon />
      </div>
    </div>
  )
}

export default Header
