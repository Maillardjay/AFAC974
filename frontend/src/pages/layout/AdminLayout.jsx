import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import NavBarAdmin from "../../components/NavBarAdmin";
import { useCurrentUser } from "../../contexts/UserContexts";

function AdminLayout() {
  const { user } = useCurrentUser();

  if (user?.admin) {
    return (
      <div className="flex h-full w-full">
        <NavBarAdmin />
        <Outlet />
      </div>
    );
  }
  return <Navigate to="/" replace />;
}

export default AdminLayout;
