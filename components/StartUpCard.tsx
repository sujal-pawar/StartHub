import { EyeIcon } from 'lucide-react'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from './ui/button'

interface StartUpTypeCard {
  _id: string;
  _createdAt: string;
  title: string;
  description: string;
  image: string;
  views: number;
  category: string;
  author: {
    id: string;
    name: string;
  };
}

// Helper function to format date
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function StartUpCard({ post }: { post: StartUpTypeCard} ) {

    const { _createdAt, views, author: { id: authorId, name }, title, category, _id, image, description } = post

    return (
        <li className="startup-card group">
            <div className="flex-between">
                <p className='text-16-medium text-gray-500 dark:text-gray-400'>
                    {formatDate(_createdAt)}
                </p>
                <div className='flex gap-1.5'>
                    <EyeIcon className='size-6 text-blue-600' />
                    <span className='text-16-medium'>{views}</span>
                </div>
            </div>

            <div className='flex-between mt-5 gap-5'>
                <div className='flex-1'>
                    <Link href={`/user/${authorId}`}>
                        <p className='text-16-medium font-serif line-clamp-1'>{name}</p>
                    </Link>
                    <Link href={`/startup/${_id}`} className='text-20-semibold mt-1 line-clamp-2 hover:underline'>
                        <h3 className='text-26-semibold line-clamp-1'>{title}</h3>
                    </Link>
                </div>
                <Link href={`/user/${authorId}`}>
                    <div className="w-[50px] h-[50px] overflow-hidden rounded-full">
                        <img
                            src="https://images.pexels.com/photos/1759530/pexels-photo-1759530.jpeg"
                            alt="profile"
                            width={50}
                            height={50}
                            className="object-cover w-full h-full" />
                    </div>
                </Link>
            </div>

            <Link href={`/startup/${_id}`}>
                <p className='startup-card_desc'>
                    {description}
                </p>
                <img src={image} alt="placeholder" className='startup-card_img' />
            </Link>

            <div className='flex-between gap-3 mt-5'>
                <Link href={`/?query=${category.toLowerCase()}`}>
                    <p className='text-16-medium'>{category}</p>
                </Link>
                <Button className='startup-card_btn' asChild>
                    <Link href={`/startup/${_id}`}>
                        Details
                    </Link>
                </Button>
            </div>
        </li>
    )
}

export default StartUpCard
