import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import Login from './pages/login/Login';
import Tasks from './pages/tasks/Tasks';
import ProtectRoute from './providers/protectedRoute';

const Routes = () => {

  const authenticatedRoutes = [
    {
      path: '/',
      element: <ProtectRoute />,
      children: [
        {
          path: "/tarefas",
          element: <Tasks />
        }
      ]
    }
  ]

  const unAuthenticatedRoutes = [
    {
      path: '/login',
      element: <Login />
    },
  ]

  const router = createBrowserRouter([
    ...unAuthenticatedRoutes,
    ...authenticatedRoutes
  ])

  return <RouterProvider router={router} />

}

export default Routes;