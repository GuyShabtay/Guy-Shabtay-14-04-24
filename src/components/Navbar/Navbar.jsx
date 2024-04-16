import React from 'react';
import './Navbar.css';
import ToggleBtn from '../ToggleBtn';
import logo from '../../assets/heroloLogo.png'

const Navbar = () => {
  return (
    <div id='navbar'>
    <div id='logo'>
    <img src={logo} alt="" id='logo-icon'/>
    <h2 id='logo-text' className='varela-round-regular'>Herolo Weather Task</h2>
    </div>
    <ToggleBtn/>
    </div>
  )
}

export default Navbar