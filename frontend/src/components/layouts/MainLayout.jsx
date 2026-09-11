import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";
import ScrollToTop from "../commom/ScrollToTop";

const MainLayout = () => {
  return (
    <div>
      <ScrollToTop />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
