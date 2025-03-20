import React from "react";
import "./App.scss";
import {
  HomePage,
  AboutPage,
  ArticlePage,
  ArticlesPage,
  PageError,
  LogInPage,
  CreateAccountPage,
} from "./pages";
import Layout from "./Layout";
import { Container } from "react-bootstrap";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";

//Routes to navigate through pages with react-router-dom
const routes: RouteObject[] = [
  {
    path: "/", // path of home page
    element: <Layout />, // Layout element that contain still components and page that will be displayed
    errorElement: <PageError />, //error element if no pages was found
    children: [
      // pages that can be displayed and their paths
      { path: "/", element: <HomePage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/articles", element: <ArticlesPage /> },
      {
        path: "/articles/:name", // special path to travel across many articles
        element: <ArticlePage />,
      },
      {
        path: "/login",
        element: <LogInPage></LogInPage>,
      },
      {
        path: "/create-account",
        element: <CreateAccountPage></CreateAccountPage>,
      },
    ],
  },
];

//router that responsible for routing through pages
const router = createBrowserRouter(routes);

function App() {
  return (
    <Container fluid className="app__container">
      <RouterProvider router={router} />
    </Container>
  );
}

export default App;
