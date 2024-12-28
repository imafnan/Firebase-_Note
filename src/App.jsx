import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import app from './Firebase';
import Register from './components/register/Register'
import { ToastContainer } from 'react-toastify';
import Login from './components/login/Login';
import LayoutOne from './layouts/LayoutOne';
import Home from './pages/Home';
import Bin from './pages/Bin';
import Pined from './pages/Pined';



function App() {

  const myRoute = createBrowserRouter(createRoutesFromElements(
    <Route>

      <Route path='/Register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>

      <Route path='/' element={<LayoutOne/>}>
        <Route index element={<Home/>}/>
        <Route path='/pin_notes' element={<Pined/>}/>
        <Route path='/bin_notes' element={<Bin/>}/>
      </Route>

    </Route>
  ))


  return (
    <>
     <RouterProvider router={myRoute}/>
     <ToastContainer/>
    </>
  )
}

export default App
