import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import { profile } from 'console';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'
export const experimental_ppr = true;
import markdownit from 'markdown-it';   
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';

const md = markdownit();

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;
    const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });

    if (!post) return notFound();
    const parsedContent = md.render(post?.pitch || '');
    return (
        <>
            <section className='blue_container !min-h-[230px]'>
                <p className='tag'>{formatDate(post._createdAt)}</p>
                <h1 className='heading'>{post.title}</h1>
                <p className='sub-heading !max-w-5xl'>{post.description}</p>
            </section>

            <section className='section_container'>
                <img src={post.image} alt="thumbnail" className='w-full h-auto rounded-xl' />
                <div className='space-y-5 mt-10 max-w-4xl mx-auto'>
                    <div className='flex-between gap-5'>
                        <Link href={`/user/${post.author?._id}`} className='flex items-center gap-2 mb-3'>
                            <div className='w-[64px] h-[64px] overflow-hidden rounded-full'>
                                <Image
                                    src={post.author?.image}
                                    alt='profile'
                                    height={64}
                                    width={64}
                                    className='rounded-full drop-shadow-lg' />
                            </div>
                            <div >
                                <p className='dark:text-white text-20-medium'>{post.author?.name}</p>
                                <p className='text-16-medium dark:text-white/60 text-black-300'>{post.author?.username}</p>
                            </div>
                        </Link>
                        <p className='category-tag'>{post.category} </p>
                    </div>
                    <h3 className='text-30-bold dark:text-white'>Pitch Details</h3>
                    {parsedContent ? (
                     <article className='prose dark:text-white max-w-4xl font-work-sans break-all'
                     dangerouslySetInnerHTML={{ __html: parsedContent }}
                     />
                    ):(
                        <p className='text-16-medium dark:text-white text-black-300'>No pitch details available.</p>                         
                    )}
                </div>
                <hr className='divider'/>
                {/* TODO : Editor Selected Startups */}
            </section>
            <section>
                <Suspense fallback={<Skeleton className='view_skeleton' />}>
                    <View id={id}/>
                </Suspense>
            </section>
        </>
    )
}

export default page
