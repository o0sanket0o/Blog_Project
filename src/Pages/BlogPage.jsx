import React, { useState, useEffect, useContext } from 'react'
import { useLocation, useNavigate} from 'react-router-dom';
import { Router, Routes } from 'react-router-dom';
import { Header } from '../components/Header';
import { Post } from '../components/Post';
import { AppContext } from '../context/AppContext';
import { Spinner } from '../components/Spinner';

import '../components/Spinner.css';
export const BlogPage = () => {
  const {loading, setLoading} = useContext(AppContext);
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const [currBlog, setcurrBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  useEffect(() => {
    setLoading(true);
    async function fetchBlogId(){
      const baseURL = `https://codehelp-apis.vercel.app/api/get-blog?blogId=${pathname.split('/').at(-1)}`;
      try{
        const fetched = await fetch(baseURL);
        const data = await fetched.json();
        setcurrBlog(data.blog);
        setRelatedBlogs(data.relatedBlogs);
      }
      catch(err){
        console.log('Error', err);
      }
      setLoading(false);
    }
    fetchBlogId();
  }, [location.pathname])
  
  return (
    <div>
      <Header></Header>
      {loading && 
      <div className='flex min-h-screen justify-center items-center w-full'><Spinner/></div>
      }
      {!loading && 
        <div className='mt-24 flex flex-col w-full justify-center items-center'>
          <div className=' w-5/12 p-4 py-0'>
            <button className='border-gray-300 border rounded px-4 py-1' onClick={(() => {
              navigate(-1);
            })}>Back</button>
          </div>
          <div className='w-5/12'><Post post={currBlog}/></div>
          <div className='w-5/12 px-4 text-3xl font-bold mt-6'>Related Blogs</div>
          <div className='w-5/12 flex flex-col'>{
            relatedBlogs.map((currRelatedBlog) => (
              <Post post={currRelatedBlog} key={currRelatedBlog.id}/>
            ))
          }
          </div>
        </div>
      }
    </div>
  )
}
