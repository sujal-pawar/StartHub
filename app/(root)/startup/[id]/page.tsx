import React from 'react'

const page = async ({params}:{params:Promise<{id:string}>}) => {
    const id = (await params).id;
  return (
    <div className='bg-black min-h-screen'>    
      <h1 className='text-white text-4xl p-4'> Lets Go</h1>
    </div>
  )
}

export default page
