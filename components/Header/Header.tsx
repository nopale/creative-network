import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import {
  ChatBubbleBottomCenterIcon,
  EllipsisHorizontalIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
  RectangleGroupIcon,
  UserGroupIcon,
  ViewColumnsIcon,
} from '@heroicons/react/20/solid'
import { FlagIcon, PlayIcon } from '@heroicons/react/24/outline'
import { useAuthContext } from '@/context/AuthContext'
import styles from './header.module.css'
import getData from '@/firebase/getData'

const Header = () => {
  const { userData } = useAuthContext()

  return (
    <div className="sticky top-0 z-50 bg-black flex justify-between items-center p-5 lg:mx-6 lg:mt-4 shadow-md">
      <div className="flex items-center">
        <Image src="/images/group-4.png" width={40} height={40} alt={''} />
        <div
          className={`${styles.inputContainer} flex ml-2 p4 items-center bg-[#d9d9d9]/[0.2]`}
        >
          <MagnifyingGlassIcon className="h-6 text-gray-500" />
          <input
            className="hidden md:inline-flex ml-2 text-white items-center bg-transparent outline-none flex-shrink "
            type="text"
            placeholder="Search Directory"
          />
        </div>
      </div>

      <div className="flex items-center sm:space-x-2 justify-end">
        <div className="hidden md:flex space-x-6 md:space-x-2 mr-2">
          <EllipsisHorizontalIcon className="h-3 text-white text-center mx-auto mr-2 sm:h-7" />
          <PlusCircleIcon className="h-3 text-white text-center mx-auto mr-2 sm:h-7" />
          <RectangleGroupIcon className="h-3 text-white text-center mx-auto mr-4 sm:h-7" />
        </div>
        <Image
          className="ml-3 rounded-full object-cover"
          src={userData.photo}
          width={32}
          height={32}
          alt={''}
        />
      </div>
      {/* <div className='absolute m-x-4 h-[1px] bottom-0 bg-white' style={{ width: 'calc(100% - 40px)'}} /> */}
    </div>
  )
}

export default Header
