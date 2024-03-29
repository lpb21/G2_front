import React from 'react'
import ReactDOM from 'react-dom/client'
// import reportWebVitals from './reportWebVitals';
import { store } from './stores/store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import  {App} from './App'

import './index.css'
// import './resources/toastr/toastr.min.css'
// import './public/resources/css/adminlte.min.css'

// import './public/plugins/jquery/jquery.min.js'
// import './public/plugins/bootstrap/js/bootstrap.bundle.min.js'
// import './public/plugins/sweetalert2/sweetalert2.min.js'
// import './resources/toastr/toastr.min.js'
// import './public/dist/js/adminlte'
// import './public/plugins/fontawesome-free/css/all.min.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>  
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
