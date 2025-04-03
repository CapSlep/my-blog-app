import { ToastNotificationContainer, Footer } from "./components";
import NavBar from "./components/NavBar/NavBar";
import { Outlet } from "react-router-dom";

//Component that will display every page in router with other components that must be on every page
function Layout() {
  return (
    <>
      <NavBar />
      <ToastNotificationContainer></ToastNotificationContainer>
      <main className="content__container">
        {/* Outlet is the Component that will show pages from router */}
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </>
  );
}

export default Layout;
