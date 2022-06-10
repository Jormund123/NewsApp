import './App.css';
//fdfd0cb8753045319c3c7dfa30cc7e0c

import React, {useState} from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'

import { HashRouter, Routes, Route} from "react-router-dom";

function App() {
  const pageSize = 12;
  const apiKey = process.env.REACT_APP_NEWS_API

  const [progress, setprogress] = useState(0);

  const setProgress=(progress)=>{
   setprogress(progress);
  }


    return (
      <HashRouter>
        <div>
          <Navbar/>
          <LoadingBar
              color='#f11946'
              progress={progress}
          />
          <Routes>
            <Route path="/" element={<News apiKey = {apiKey} setProgress = {setProgress} key="general" pageSize = {pageSize} country = "in" category="general"/>} />
            <Route path="/business" element={<News apiKey = {apiKey} setProgress = {setProgress} key="business" pageSize = {pageSize} country = "in" category="business"/>} />
            <Route path="/entertainment" element={<News apiKey = {apiKey} setProgress = {setProgress} key="entertainment" pageSize = {pageSize} country = "in" category="entertainment"/>} />
            <Route path="/general" element={<News apiKey = {apiKey} setProgress = {setProgress} key="general" pageSize = {pageSize} country = "in" category="general"/>} />
            <Route path="/health" element={<News apiKey = {apiKey} setProgress = {setProgress} key="health" pageSize = {pageSize} country = "in" category="health"/>} />
            <Route path="/science" element={<News apiKey = {apiKey} setProgress = {setProgress} key="science" pageSize = {pageSize} country = "in" category="science"/>} />
            <Route path="/sports" element={<News apiKey = {apiKey} setProgress = {setProgress} key="sports" pageSize = {pageSize} country = "in" category="sports"/>} />
            <Route path="/technology" element={<News apiKey = {apiKey} setProgress = {setProgress} key="technology" pageSize = {pageSize} country = "in" category="technology"/>} />
         </Routes>     
        </div>
      </HashRouter>
    )
}

export default App;
