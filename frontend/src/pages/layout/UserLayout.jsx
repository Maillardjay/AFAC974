import React from "react";
import { Outlet } from "react-router-dom";
import NavBarUser from "../../components/NavBarUser";
import Footer from "../../components/Footer";

function UserLayout() {
  return (
    <div>
      <NavBarUser />
      <Outlet />
      <Footer />
    </div>
  );
}
export default UserLayout;
