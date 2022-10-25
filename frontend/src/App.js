import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./components/Header"

import Login from "./pages/Login";
import Register from "./pages/Register";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Home from "./pages/Home";
import Products from "./pages/Products";


import ProductUpdateForm from "./components/productComponents/ProductUpdateForm";

function App() {
  return (
      <>
          <Router>
              <div className='container'>
                  <Header/>
                  <Routes>
                      <Route path='/login' element={<Login />} />
                      <Route path='/register' element={<Register />} />
                      <Route path='/home' element={<Home />} />

                      <Route path='/products' element={<Products />} />
                      <Route path='/update-product/:id' element={<ProductUpdateForm />} />

                  </Routes>
              </div>
          </Router>
          <ToastContainer/>
      </>
  );
}

export default App;
