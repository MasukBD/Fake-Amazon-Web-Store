import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import HomePage from './component/HomePage/HomePage';
import Shop from './component/Shop/Shop';
import ErrorPage from './component/ErrorPage/ErrorPage';
import Order from './component/Order/Order';
import Inventory from './component/Inventory/Inventory';
import Login from './component/LogIn/Login';
import handleCartPreview from './component/CartPreview/CartPreview';
import CheckOut from './component/CheckOut/CheckOut';
import SignUp from './component/SignUp/SignUp';
import ContextProvider from './component/ContextProvider/ContextProvider';
import PrivateRoutes from './Routes/PrivateRoutes';



const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage></HomePage>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Shop></Shop>,
        loader: () => fetch('https://fake-amazon-server-mocha.vercel.app/productCount')
      },
      {
        path: "/order",
        element: <Order></Order>,
        loader: handleCartPreview,
      },
      {
        path: "/inventory",
        element: <Inventory></Inventory>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/checkout",
        element: <PrivateRoutes><CheckOut></CheckOut></PrivateRoutes>
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </React.StrictMode>,
)
