// import React from 'react'
// import { Link, useLocation } from 'react-router-dom'

// const Success = () => {
//     const location = useLocation()

//     console.log("location",)
//   return (
//     <div className='m-2 w-full max-w-md bg-green-200 p-4 py-5 rounded mx-auto flex flex-col justify-center items-center gap-5'>
//         <p className='text-gray-800 font-bold text-lg text-center'>{Boolean(location?.state?.text ) ? location?.state?.text : "Payment" } Successfully </p>
//         <Link to="/" className='border border-green-900 text-green-900 hover:bg-green-900 hover:text-white transition-all px-4 py-1'>Go To Home</Link>
//     </div>
//   )
// }

// export default Success
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const Success = () => {
  const location = useLocation();
  const message = location?.state?.text || "Order";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-green-200 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <CheckCircle className="w-20 h-20 text-green-500 animate-pulse" />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-800">{message} Placed Successfully!</h1>
        <p className="text-gray-600 text-sm">
          Thank you for your purchase. A confirmation email has been sent to you. We’ll notify you when your items are on the way.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/"
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
          >
            Continue Shopping
          </Link>
          <Link
            to="/orders"
            className="border border-green-600 text-green-700 px-6 py-2 rounded-md hover:bg-green-100 transition"
          >
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
