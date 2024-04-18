import React from 'react';
import darkLogo from '../../assets/darkLogo.png';
import './Footer.css';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useSelector } from 'react-redux';


const Footer = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  return (
    <div id="footer">
      <div className="buttons-container">
     
      <p>Made By</p>
      <a href="https://guyshabtay.netlify.app/" target="_blank" ><img src={darkLogo} id="developer-logo" /></a>

          
      
        </div>
        <div id="social-links">    

        <a href="https://www.linkedin.com/in/guy-shabtay/" target="_blank" ><LinkedInIcon className={`social-link ${isDarkMode ? 'dark-mode' : ''}`}/></a>
        <a href="https://github.com/GuyShabtay" target="_blank"><GitHubIcon className={`social-link ${isDarkMode ? 'dark-mode' : ''}`}/></a>
      </div>
      </div> 
  )
}

export default Footer