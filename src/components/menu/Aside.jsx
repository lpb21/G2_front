import React from "react";
//import PropTypes from "prop-types";
import {UserPanel} from "../user/UsuarioPanelAside";
import {Navigation} from "./MenuPanelNav";

export const  Aside = () => {
    return (
        <aside className="main-sidebar sidebar-dark-danger elevation-4">
          {/* Brand Logo */}
          <a href="http://newep.lge.com/portal/main/portalMain.do" className="brand-link" target="blank">
            <img
              src={`${process.env.REACT_APP_HOST}/dist/img/Lg-logo.png`}
              alt="LG Logo"
              className="brand-image img-circle elevation-3"
              style={{ opacity: ".8" }}
            />
            <span className="brand-text font-weight-light">LG G2 Test</span>
          </a>
          {/* Sidebar */}
          <div className="sidebar">
            <UserPanel />
            <Navigation/>
          </div>
        </aside>
  )
}
