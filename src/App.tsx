import React from "react";
import "./App.scss";
import {
  HomePage,
  AboutPage,
  ArticlePage,
  articleLoader,
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

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <PageError />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/articles", element: <ArticlesPage /> },
      {
        path: "/articles/:name",
        element: <ArticlePage />,
        loader: articleLoader,
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

const router = createBrowserRouter(routes);

function App() {
  return (
    <Container fluid className="app__container">
      <RouterProvider router={router} />
    </Container>
  );
}

export default App;
