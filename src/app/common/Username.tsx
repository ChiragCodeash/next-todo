import { auth } from '@/auth'
import React from 'react'

const Username = async() => {
    const session = await auth()
    const user = session?.user?.name
  return (
    <div className='font-semibold capitalize'>{user}</div>
  )
}

export default Username