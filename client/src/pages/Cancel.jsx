// import React from 'react'
// import { Link } from 'react-router-dom'

// const Cancel = () => {
//   return (
    
//          <div className='m-2 w-full max-w-md bg-red-200 p-4 py-5 rounded mx-auto flex flex-col justify-center items-center gap-5'>
//         <p className='text-gray-800 font-bold text-lg text-center'>Order Cancel </p>
//         <Link to="/" className='border border-red-900 text-red-900 hover:bg-red-900 hover:text-white transition-all px-4 py-1'>Go To Home</Link>
//     </div>
    
//   )
// }

// export default Cancel
import React from 'react';
import { Link } from 'react-router-dom';
import { XCircle } from 'lucide-react'; // Optional: Lucide icon (install if needed)

const Cancel = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="bg-white border border-red-300 rounded-2xl p-8 shadow-lg text-center max-w-sm w-full">
        <div className="flex flex-col items-center space-y-4">
          <XCircle className="text-red-600 w-16 h-16" />
          <h2 className="text-2xl font-bold text-red-700">Order Cancelled</h2>
          <p className="text-gray-600">
            Your payment process was canceled. You can return to the home page and try again later.
          </p>
          <Link
            to="/"
            className="inline-block mt-4 px-6 py-2 border border-red-600 text-red-600 rounded hover:bg-red-600 hover:text-white transition-all"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cancel;
