import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Controller from './Controller/Controller'
import SignUp from './SignUp'
import SignIn from './SignIn'

function App() {
  const route = createBrowserRouter([
    {
      path: '/',
      element: <Controller></Controller>,
      children: [
        {
         path: '/',
         element: <SignUp></SignUp>
        },
        {
          path: '/register',
          element: <SignUp></SignUp>
        },
        {
          path: '/login',
          element: <SignIn></SignIn>
        }
      ]
    }
  ])

  return (
    <>
    <RouterProvider router={route}></RouterProvider>
    </>
  )
}

export default App
