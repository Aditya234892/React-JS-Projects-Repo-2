import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './Components/Layout';
import AddNewPerson from './Components/AddNewPerson';
import RetrieveInfo from './Components/RetrieveInfo';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      // errorElement: <PageNotFound />
      children: [
        {
          path: "/",
          element: <AddNewPerson />
        },
        {
          path: "/retrieve-info",
          element: <RetrieveInfo />
        }
      ]
    }
  ]);

  return (
    <>
    <RouterProvider router = {router}/>
    </>
  )
}

export default App
