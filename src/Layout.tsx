import { Container } from "react-bootstrap";
import NavBar from "./components/NavBar/NavBar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <NavBar />
      <div className="content__container">
        <Outlet></Outlet>
      </div>
    </>
  );
}

export default Layout;
