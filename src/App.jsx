import { useContext, useState, useEffect } from 'react';
import { baseUrl } from './baseUrl';
import './App.css';
import { Header } from './components/Header';
import { Blogs } from './components/Blogs';
import { Pagination } from './components/Pagination';
import { useLocation } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { AppContext } from './context/AppContext';
import { Home } from './Pages/Home';
import { BlogPage } from './Pages/BlogPage';
import { CategoryPage } from './Pages/CategoryPage';
import { TagPage } from './Pages/TagPage';


function App() {
  const {fetchData, category, setCategory, tag, setTag} = useContext(AppContext);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const page = searchParams.get("page") ?? 1;
    if(location.pathname.includes("tags")){
      let tag = location.pathname.split('/').at(-1);
      setCategory(null);
      fetchData(1, null, tag);
    }
    else if(location.pathname.includes("categories")){
      // let category = location.pathname;
      let category = location.pathname.split('/').at(-1);
      setTag(null);
      fetchData(1, category);
    }
    else fetchData(Number(page));
  }, [location.pathname, location.search])
  return (
    <div className='flex flex-col'>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/blog/:blogId' element={<BlogPage/>}></Route>
        <Route path='/tags/:tag' element={<TagPage/>}></Route>
        <Route path='/categories/:category' element={<CategoryPage/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
