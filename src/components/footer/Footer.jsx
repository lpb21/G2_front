import React from "react";
import PropTypes from "prop-types";


export const Footer =( {version, copyrigth}) => {

  return (
    <footer className="main-footer">
      <strong>
         {copyrigth} <a className="text-danger">LG Portal </a>.
      </strong>
      All rights reserved.
      <div className="float-right d-none d-sm-inline-block">
        <b>Version</b> {version}
      </div>
    </footer>
  )
}

Footer.prototype = {
  version: PropTypes.string.isRequired,
  copyrigth: PropTypes.string.isRequired
}

Footer.defaultProps = {
  version: '1.0.0',
  copyrigth: 'Copyright © 2023 '
}