import React from 'react';
import './Navbar.css';
import ToggleBtn from '../ToggleBtn';
import logo from '../../assets/orangeUmbrellaLogo.png';
import DarkModeSwitch from '../Switches/DarkModeSwitch';
import TemperatureScaleSwitch from '../Switches/TemperatureScaleSwitch';

const Navbar = () => {
  return (
    <div id='navbar'>
    <div id='logo'>
    <img src={logo} alt="" id='logo-icon'/>
    <h2 id='logo-text' className='varela-round-regular'>Orange Umbrella</h2>
    </div>
    <div id='toggle-and-switches'>
    <div id='switches'>
    <DarkModeSwitch/>
    <TemperatureScaleSwitch/>
    </div>
    <ToggleBtn/>
    </div>
    </div>
  )
}

export default Navbar;