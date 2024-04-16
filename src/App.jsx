import React from 'react';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import Footer from './components/Footer/Footer';
import MainPage from './components/MainPage/MainPage';

const App = () => {
  return (
    <div id='app'>
    <Navbar />
    <MainPage/>
    <Footer/>
    </div>
    
  )
}

export default App