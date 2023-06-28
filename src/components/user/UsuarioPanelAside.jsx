import React from "react";
import PropTypes from "prop-types";

export const UserPanel = ({ imageSrc, imageAlt, name, link })=> {
  return (
    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
      <div className="image">
        <img src={imageSrc} className="img-circle elevation-2" alt={imageAlt} />
      </div>
      <div className="info">
        <a href={link} className="d-block">
          {name}
        </a>
      </div>
    </div>
  );
};


  

  UserPanel.prototype = {
     imageSrc: PropTypes.string.isRequired,
     imageAlt: PropTypes.string.isRequired,
     name: PropTypes.string.isRequired,
     link: PropTypes.string.isRequired
   }

   UserPanel.defaultProps = {
     imageSrc: `${process.env.REACT_APP_HOST}/dist/img/user2-160x160.jpg`,
     imageAlt: 'User Image',
     name :"Sin Definir",
     link: '#'
   }
  
  
  
  
  
  