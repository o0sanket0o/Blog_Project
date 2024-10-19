import React from 'react'
import { Header } from '../components/Header'
import { Pagination } from '../components/Pagination'
import { Blogs } from '../components/Blogs'
import '../components/Spinner.css'


export const Home = () => {
  return (
    <div className='flex flex-col justify-between'>
      <Header />
      <div className='flex min-h-screen justify-center items-center w-full'> {/* Change margin to padding-top */}
        <Blogs />
      </div>
      <Pagination />  
    </div>
  )
}
