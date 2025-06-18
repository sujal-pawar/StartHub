import { EyeIcon } from 'lucide-react'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

// Helper function to format date
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

const StartUpCard = ({ post }: { post: StartUpTypeCard }) => {

    const {_createdAt,views,author:{id:authorId,name},title,category,_id,image} = post;

    return (
        <li className="startup-card group">
            <div className="flex-between">            
                <p className='text-16-medium text-gray-500 dark:text-gray-400'>
                    {formatDate(_createdAt)}
                </p>                
                <div className='flex gap-1.5'>
                    <EyeIcon className='size-6 text-blue-600'/>
                    <span className='text-16-medium'>{views}</span>
                </div>
            </div>

            <div className='flex-between mt-5 gap-5'>
                <div className='flex-1'>
                    <Link href={`/user/${authorId}`}>
                        <p className='text-16-medium line-clamp-1'>{name}</p>
                    </Link>
                    <Link href={`/startup/${_id}`} className='text-20-semibold mt-1 line-clamp-2 hover:underline'>
                    <h3 className='text-26-semibold line-clamp-1'>{title}</h3>
                    </Link>
                </div>
            </div>
        </li>
    )
}

export default StartUpCard
