import * as React from "react";
import {
  createBrowserRouter,
} from "react-router-dom";
import Login from './pages/login/Login';
import Tasks from './pages/tasks/Tasks';
import App from './App';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App>
        <Login />
      </App>
    ),
  },
  {
    path: "tarefas",
    element: (
    <App>
      <Tasks />
    </App>),
  },
]);

export { router };