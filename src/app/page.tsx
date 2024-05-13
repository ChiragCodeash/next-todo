
import React from 'react'
import AddInput from './componets/AddInput'
import TodoList from './componets/TodoList'

const page:React.FC = () => {
  return (
    <div className='min-h-screen mx-auto container  '>
      <div className='px-52 mt-24'>
      <AddInput/>
      <TodoList/>
      </div>
    </div>
  )
}

export default page