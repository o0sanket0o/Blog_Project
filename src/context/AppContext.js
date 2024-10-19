import { createContext, useState } from "react";
import { baseUrl } from "../baseUrl";
import React from "react";

export const AppContext = createContext();

export default function AppContextProvider({children}){
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState('');
  const [tag, setTag] = useState('');
  const value = {
    loading,
    setLoading,
    page,
    setPage,
    totalPages,
    setTotalPages,
    posts,
    setPosts,
    fetchData,
    handlePageChange,
    category,
    setCategory,
    tag,
    setTag,
  };
  function handlePageChange(page){
    setPage(page);
    fetchData(page, category, tag);
  }
  async function fetchData(page = 1, category = null, tag = null){
    setLoading(true);
    let finalURL = baseUrl;
    if(category){
      finalURL += `?category=${category}&`;
      setCategory(category);
    } 
    else if(tag){
      finalURL += `?tag=${tag}&`;
      setTag(tag);
    } 
    if(!category && !tag) finalURL += '?';
    finalURL += `page=${page}`;
    try{
      const data = await fetch(`${finalURL}`);
      const jsonData = await data.json();
      setTotalPages(jsonData.totalPages);
      if(totalPages) setPage(Math.min(page, totalPages));
      setPosts(jsonData.posts);
    }catch(err){
      setLoading(false);
      // setPage(1);
      setPosts([]);
      setTotalPages(null);
      console.log('Error', err);
    }
    setLoading(false);
  }

  //We sent the value to the children  of appContext. Here, the child of app context is app.jsx. So all the 
  //children of app.jsx will also get this value.
  // return <AppContext.Provider value={value}>
  //   {children}
  // </AppContext.Provider>
  return React.createElement(AppContext.Provider, { value }, children);
}
