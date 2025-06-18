import { EyeIcon } from 'lucide-react'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

// Define the StartUpTypeCard interface
interface StartUpTypeCard {
  _id: string;
  title: string;
  description?: string;
  logo?: string;
  _createdAt: string;
  views: number;
  slug: string;
  category?: string;
}

// Helper function to format date
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

const StartUpCard = ({ post }: { post: StartUpTypeCard }) => {
    return (
        <li className="startup-card group">
            <div className="flex flex-col gap-3">            
                <p className='text-gray-500 text-14-medium'>
                    {formatDate(post._createdAt)}
                </p>                <div className='flex gap-1.5'>
                    <EyeIcon className='size-6 text-blue-600'/>
                    <span className='text-16-medium'>{post.views}</span>
                </div>
                
                <Link href={`/startup/${post.slug}`}>
                    <h3 className='text-26-semibold line-clamp-1'>{post.title}</h3>
                </Link>
                
                <p className='line-clamp-2 text-16-medium text-black-300'>
                    {post.description || 'No description provided'}
                </p>
                
                {post.category && (
                    <div className='startup_card_badge'>
                        {post.category}
                    </div>
                )}
                
            </div>
        </li>
    )
}

export default StartUpCard
