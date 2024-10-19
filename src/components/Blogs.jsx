import React, {useContext, useEffect} from 'react'
import { AppContext } from '../context/AppContext'
import { Spinner } from './Spinner';
import { Post } from './Post';
import { useLocation } from 'react-router-dom';

export const Blogs = () => {
  const {loading, posts} = useContext(AppContext);
  return (
    <div className=''>
      {loading&& 
        <Spinner/>
      }{!loading&& 
        <div className='mt-24 flex flex-col w-full justify-center items-center mb-20'>
          <div className='w-5/12'>
            {
            posts.map((post) => (
              <Post key={post.id} post={post}/>
            ))
            }
          </div>
        </div>
      }
    </div>
  )
}
