import React, {useContext, useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate, useNavigation, useNavigationType } from 'react-router-dom'
import { Blogs } from '../components/Blogs'
import { Header } from '../components/Header'
import { Pagination } from '../components/Pagination'
import { AppContext } from '../context/AppContext'
import { Post } from '../components/Post'
import { Spinner } from '../components/Spinner'


export const CategoryPage = () => {
    const navigate = useNavigate();
    let {loading, setLoading, posts, category, setCategory, tag, setTag} = useContext(AppContext);
    const location = useLocation();
    const curr = category?.split("%20")
    if(curr?.length > 1){
      category = '';
      category += curr[0];
      category += ' ';
      category += curr[1];
    }
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
              setCategory(null);
              setTag(null);
            })}>Back</button>
            <h2 className='text-lg ml-4 flex justify-center items-center'>Blogs on <span className='mx-1 underline font-bold'>{category}</span></h2>
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
