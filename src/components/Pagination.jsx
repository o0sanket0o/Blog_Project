import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

export const Pagination = (props) => {
    const {page, totalPages, handlePageChange} = useContext(AppContext);
  return (
    <div className={`fixed bottom-0 w-full shadow-lg border-2 flex justify-center items-center border-gray-300 p-4 bg-white ${props.className}`}>
        <div className='flex flex-wrap justify-between w-6/12 items-center'>
            <div className='flex flex-wrap gap-2'>
                {page > 1 && <button onClick={(()=> {
                    handlePageChange(page - 1);
                })} className='border-gray-300 border-2 rounded py-1 px-4'>Previous</button>}
                {page < totalPages && <button className='border-gray-300 border-2 rounded py-1 px-4' onClick={(() => {
                    handlePageChange(page + 1);
                })}>Next</button>}
                
            </div>
            <div className='font-bold text-[0.9rem]'>
                Page {page} of {totalPages}
            </div>
        </div>
    </div>
  )
}
