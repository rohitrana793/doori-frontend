import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "../../../components/layouts/admin/AdminSidebar";
import AdminHeader from "../../../components/layouts/admin/AdminHeader";
import LogoutModal from "../../commom/LogoutModal";
import { logoutRequest } from "../../../api/apiRequest";
import useAuthStore from "../../../store/authStore";

const AdminMainLayout = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const { clearCredentials } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await logoutRequest();
    console.log("log resposne", response);
    navigate("/admin");
    clearCredentials();
    toast.success("Logout Successfully");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar
        setShowLogoutModal={setShowLogoutModal}
        showMobileSidebar={showMobileSidebar}
        setShowMobileSidebar={setShowMobileSidebar}
      />

      <div className="lg:ml-64">
        <AdminHeader
          setShowMobileSidebar={setShowMobileSidebar}
          setShowLogoutModal={setShowLogoutModal}
        />

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
