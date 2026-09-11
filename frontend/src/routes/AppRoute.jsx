import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import Home from "../features/home/Home";
import HelsingborgPage from "../pages/order/HelsingborgPage";
import MalmoPage from "../pages/order/MalmoPage";
import CopenhagenPage from "../pages/order/CopenhagenPage";
import VaxjoPage from "../pages/order/VaxjoPage";
import MalmoWesternPage from "../pages/order/MalmoWesternPage.jsx";
import MenuPage from "../pages/food/MenuPage.jsx";
import AboutPage from "../pages/about/AboutPage.jsx";
import ContactPage from "../pages/contact/ContactPage.jsx";
import CateringPage from "../pages/catering/CateringPage.jsx";
import PageNotFound from "../pages/PageNotFound/PageNotFound.jsx";
import AdminLogin from "../pages/admin/auth/AdminLogin.jsx";
import AdminDashboard from "../pages/admin/dashboard/AdminDashboard.jsx";
import AdminMainLayout from "../components/layouts/admin/AdminMainLayout.jsx";
import OrderPage from "../pages/admin/order/OrderPage.jsx";
import AddMenu from "../pages/admin/menu/AddMenu.jsx";

const AppRoute = () => {
  const router = createBrowserRouter([
    {
      path: "/admin",
      element: <AdminLogin />,
    },
    {
      path: "/admin/dashboard",
      element: <AdminMainLayout />,
      children: [
        {
          index: true,
          element: <AdminDashboard />,
        },
        {
          path: "order",
          element: <OrderPage />,
        },
        {
          path: "menu",
          element: <AddMenu />,
        },
      ],
    },
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "helsingborg",
          element: <HelsingborgPage />,
        },
        {
          path: "malmo",
          element: <MalmoPage />,
        },
        {
          path: "malmo-vastra-hamnen",
          element: <MalmoWesternPage />,
        },
        {
          path: "vaxjo",
          element: <VaxjoPage />,
        },
        {
          path: "copenhagen",
          element: <CopenhagenPage />,
        },
        {
          path: "menu",
          element: <MenuPage />,
        },
        {
          path: "about-us",
          element: <AboutPage />,
        },
        {
          path: "contact",
          element: <ContactPage />,
        },
        {
          path: "catering",
          element: <CateringPage />,
        },
        {
          path: "*",
          element: <PageNotFound />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRoute;
