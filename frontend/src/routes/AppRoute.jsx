import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import AdminMainLayout from "../components/layouts/admin/AdminMainLayout.jsx";
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
import AddMenu from "../pages/admin/menu/AddMenu.jsx";
import AddRestaurant from "../pages/admin/restaurant/AddRestaurant.jsx";
import AddBranch from "../pages/admin/branch/AddBranch.jsx";
import ContactList from "../pages/admin/contact/ContactList.jsx";
import AddHistory from "../pages/admin/about/AddHistory.jsx";
import WhoWeArePage from "../pages/admin/about/WhoWeArePage.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import AdminPageNotFound from "../pages/PageNotFound/AdminPageNotFound.jsx";
import CatheringList from "../pages/admin/cathering/CatheringList.jsx";
import FranchiseList from "../pages/admin/about/FranchiseList.jsx";

const AppRoute = () => {
  const router = createBrowserRouter([
    // ADMIN LOGIN
    {
      path: "/admin",
      element: <AdminLogin />,
    },

    // PROTECTED ADMIN ROUTES

    {
      path: "/admin",
      element: <ProtectedRoute />,
      children: [
        {
          element: <AdminMainLayout />,
          children: [
            {
              path: "dashboard",
              element: <AdminDashboard />,
            },
            {
              path: "menu",
              element: <AddMenu />,
            },
            {
              path: "restaurant",
              element: <AddRestaurant />,
            },
            {
              path: "branch",
              element: <AddBranch />,
            },
            {
              path: "contact",
              element: <ContactList />,
            },
            {
              path: "cathering",
              element: <CatheringList />,
            },
            {
              path: "history",
              element: <AddHistory />,
            },
            {
              path: "who-we-are",
              element: <WhoWeArePage />,
            },
            {
              path: "franchise",
              element: <FranchiseList />,
            },
            {
              path: "*",
              element: <AdminPageNotFound />,
            },
          ],
        },
      ],
    },

    // PUBLIC ROUTES
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
