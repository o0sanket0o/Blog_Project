import React, {useState, useEffect, useContext} from 'react'
import { useNavigate, useNavigation, useNavigationType } from 'react-router-dom'
import { Header } from '../components/Header'
import { useLocation } from 'react-router-dom'
import { Blogs } from '../components/Blogs'
import { Pagination } from '../components/Pagination'
import { AppContext } from '../context/AppContext'
import { Post } from '../components/Post'
import { Spinner } from '../components/Spinner'

export const TagPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    let tagName = location.pathname.split("/").at(-1); 
    const curr = tagName?.split("%20")
    if(curr?.length > 1){
      tagName = '';
      tagName += curr[0];
      tagName += ' ';
      tagName += curr[1];
    }
    let {loading, setLoading, posts, tag, setTag, category, setCategory} = useContext(AppContext);
  return (
    <div>
      <Header></Header>
      {loading && 
      <div className='flex min-h-screen justify-center items-center w-full'><Spinner/></div>
      }
      {!loading && 
        <div className='my-24 flex flex-col w-full justify-center items-center'>
          <div className=' w-5/12 p-4 py-0 flex'>
            <button className='border-gray-300 border rounded px-4 py-1' onClick={(() => {
              navigate(-1);
              setTag(null);
              setCategory(null);
            })}>Back</button>
            <h2 className='text-lg ml-4 flex justify-center items-center'>Blogs tagged <span className='mx-1 underline font-bold text-blue-700'>#{tagName}</span></h2>
          </div>
            <div className='w-5/12 flex flex-col'>{
              posts.map((post) => (
                <Post post={post} key={post.id}/>
              ))
            }
            </div>
          <Pagination ></Pagination>
        </div>
      }
    </div>
  )
}
