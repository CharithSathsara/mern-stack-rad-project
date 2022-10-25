import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./components/Header"

import Login from "./pages/Login";
import Register from "./pages/Register";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Home from "./pages/Home";
import Products from "./pages/Products";


import ProductUpdateForm from "./components/productComponents/ProductUpdateForm";
import Customers from "./pages/Customers";
import CustomerUpdateForm from "./components/customerComponents/CustomerUpdateForm";
import Incomes from "./pages/Incomes";
import IncomeUpdateForm from "./components/incomeComponents/IncomeUpdateForm";
import Expenditures from "./pages/Expenditures";
import ExpenditureUpdateForm from "./components/expenditureComponent/ExpenditureUpdateForm";
import Distributors from "./pages/Distributors";
import DistributorUpdateForm from "./components/distributorComponent/DistributorUpdateForm";

function App() {
  return (
      <>
          <Router>
              <div className='container'>
                  <Header/>
                  <h1>SCS 2208 RAD MERN Project</h1>
                  <Routes>
                      <Route path='/login' element={<Login />} />
                      <Route path='/register' element={<Register />} />
                      <Route path='/home' element={<Home />} />
                      <Route path='/' element={<Home />} />

                      <Route path='/products' element={<Products />} />
                      <Route path='/update-product/:id' element={<ProductUpdateForm />} />

                      <Route path='/customers' element={<Customers />} />
                      <Route path='/update-customer/:id' element={<CustomerUpdateForm />} />

                      <Route path='/incomes' element={<Incomes />} />
                      <Route path='/update-income/:id' element={<IncomeUpdateForm />} />

                      <Route path='/expenditures' element={<Expenditures />} />
                      <Route path='/update-expenditure/:id' element={<ExpenditureUpdateForm />} />

                      <Route path='/distributors' element={<Distributors />} />
                      <Route path='/update-distributor/:id' element={<DistributorUpdateForm />} />

                  </Routes>
              </div>
          </Router>
          <ToastContainer/>
      </>
  );
}

export default App;
