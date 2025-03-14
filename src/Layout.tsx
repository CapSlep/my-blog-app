import NavBar from "./components/NavBar/NavBar";
import { Outlet } from "react-router-dom";

//Component that will display every page in router with other components that must be on every page
function Layout() {
  return (
    <>
      <NavBar />
      <div className="content__container">
        {/* Outlet is the Component that will show pages from router */}
        <Outlet></Outlet>
      </div>
    </>
  );
}

export default Layout;
