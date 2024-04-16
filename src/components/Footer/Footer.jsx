import React from 'react';
import darkLogo from '../../assets/darkLogo.png';
import './Footer.css';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <div id="footer">
      <div className="buttons-container">
     
      <p>Made By</p>
          <img src={darkLogo} id="developer-logo" />
      
        </div>
        <div id="social-links">
        <a href="https://www.linkedin.com/in/guy-shabtay/" target="_blank" ><LinkedInIcon className='social-link'/></a>
        <a href="https://github.com/GuyShabtay" target="_blank"><GitHubIcon className='social-link'/></a>
      </div>
      </div> 
  )
}

export default Footer