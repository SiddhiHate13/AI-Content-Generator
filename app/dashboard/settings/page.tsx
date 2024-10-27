import { UserProfile } from '@clerk/nextjs'
import React from 'react'

function Settings() {
  return (
    <div className='flex items-center justify-center h-screen bg-gradient-to-tl from-slate-200 to-violet-500'>
        <div className='mt-[-80px]'>
        <UserProfile />
        </div>
    </div>
  )
}

export default Settings