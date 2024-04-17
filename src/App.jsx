import React from 'react';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import Footer from './components/Footer/Footer';
import MainPage from './components/MainPage/MainPage';
import Faovorites from './components/Favorites/Favorites';
import { useSelector } from 'react-redux';



const App = () => {
  const isFavorites = useSelector((state) => state.visiblePage.isFavorites);

  return (
    <div id='app'>
    <div id="main-background"></div>
    <Navbar />
    

    {isFavorites ? <Faovorites/> : <MainPage/>}
    
    <Footer/>
    </div>
    
  )
}

export default App