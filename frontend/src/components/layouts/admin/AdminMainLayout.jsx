import AdminSidebar from "../../../components/layouts/admin/AdminSidebar";
import AdminHeader from "../../../components/layouts/admin/AdminHeader";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import LogoutModal from "../../commom/LogoutModal";
import toast from "react-hot-toast";

const AdminMainLayout = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("Logout Successfull");
    navigate("/admin");
  };
  return (
    <div className="min-h-screen">
      <AdminSidebar setShowLogoutModal={setShowLogoutModal} />

      <div className="lg:ml-64">
        <AdminHeader />

        <main className="pt-25">
          <Outlet />
        </main>
      </div>
      {showLogoutModal && (
        <LogoutModal
          setShowLogoutModal={setShowLogoutModal}
          handleLogout={handleLogout}
        />
      )}
    </div>
  );
};

export default AdminMainLayout;
