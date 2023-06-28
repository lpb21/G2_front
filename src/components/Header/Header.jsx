import axios from "axios";
import React, { useEffect, useState } from "react";
import { Headercomponent } from "./headerProp";

export const HeaderMenus = () => {

  const [menuData, setMenuData] = useState({
    homeText: "",
    homeLink: "",
    contactText: "",
    contactLink: "",
    lgPortalText: "",
    lgPortalLink: "",
  });

  const getDataHeader = async () => {
    
    // * Obtener los datos del menu
    try{
    const responsemenu = await axios.get(
      `${process.env.REACT_APP_ENDPOINT}v1/getMenuHeader`
    );
    setMenuData(responsemenu.data.data);
    }catch(err){
      throw new Error(err.message || err.stack || 'error / line 25 Header')
    }
    
  };
const homeLink = menuData.homeLink;
const homeText = menuData.homeText;
const contacLink = menuData.contactLink;
const contactText = menuData.contactText;
const lgPortalLink = menuData.lgPortalLink;
const lgPortalText = menuData.lgPortalText;

  useEffect(() => {
    //getDataHeader()
  }, []);
  
  return(
    <Headercomponent
    nav_item1_Link = {homeLink}
    nav_item1_Text = {homeText}
    nav_item2_Link = {contacLink}
    nav_item2_Text = {contactText}
    nav_item3_Link = {lgPortalLink}
    nav_item3_Text = {lgPortalText}
    />
  )
}
