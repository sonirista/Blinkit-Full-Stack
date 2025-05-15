import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import Login from "../pages/login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import OtpVerification from "../pages/OtpVerification";
import ResetPassword from "../pages/ResetPassword";
import UserMenuMobile from "../pages/UserMenuMobile";
import Dashboard from "../Layout/Dashboard";
import Profile from "../pages/Profile";
import MyOrder from "../pages/MyOrder";
import Address from "../pages/Address";
import CategoryPage from "../pages/CategoryPage";
import SubCategoryPage from "../pages/SubCategoryPage";
import UploadProduct from "../pages/UploadProduct";
import ProductAdmin from "../pages/ProductAdmin";
import AdminPermission from "../Layout/AdminPermission";
import ProductListPage from "../pages/ProductListPage";
import ProductDisplayPage from "../pages/ProductDisplayPage";
import CartMobile from "../pages/cartMobile";
import CheckoutPage from "../pages/CheckoutPage";
import Success from "../pages/Success";
import Cancel from "../pages/Cancel";




const router = createBrowserRouter([
    {
        path : "/",
        element: <App/>,
        children:[
            {
                path : "",
                element : <Home/>
            },
            {
                path : "Search",
                element : <SearchPage/>
            },
            {
                path : "login",
                element : <Login/>
            },
            {
                path : "register",
                element : <Register/>
            },
            {
                path : "forgot-password",
                element : <ForgotPassword/>
                
            },
            {
                path : "verification-otp",
                element : <OtpVerification/>
                
            },
            {
                path : "reset-password",
                element : <ResetPassword/>
                
            },
            {
                path : "user",
                element : <UserMenuMobile/>
                
            },
            {
                path: "dashboard",
                element : <Dashboard/>,
                children:[
                    {
                        path : "profile",
                        element : <Profile/>
                    },
                    {
                        path : "myOrders",
                        element : <MyOrder/>
                    },
                    {
                        path : "address",
                        element : <Address/>
                    },
                    {
                        path : "category",
                        element :<AdminPermission><CategoryPage/></AdminPermission> 
                    },
                    {
                        path : "subcategory",
                        element :<AdminPermission> <SubCategoryPage/></AdminPermission>
                    },
                    {
                        path : "upload-product",
                        element :<AdminPermission><UploadProduct/></AdminPermission> 
                    },
                    {
                        path : "product",
                        element :<AdminPermission><ProductAdmin/></AdminPermission> 
                    }


                ]
            },
            {
                path : ":category",
                children : [
                    {
                        path : ":subCategory",
                        element : <ProductListPage/>
                    }
                ]
            },
            {
                path :"product/:product",
                element : <ProductDisplayPage/>
            },
            {
                path : 'cart',
                element:<CartMobile/>
            },
            {
                path : "checkout",
                element : <CheckoutPage/>
            },
            {
                path : "success",
                element : <Success/>
            },
            {
                path : 'cancel',
                element : <Cancel/>
            }
            

        ]
    }
])
export default router