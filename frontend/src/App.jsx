import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import UserLayout from "./pages/layout/UserLayout";

import HomePage from "./pages/HomePage";
import Gallery from "./pages/Gallery";
import OneImage from "./pages/OneImage";
import Author from "./pages/Author";
import About from "./pages/About";
import UserSubscription from "./pages/UserSubscription";
import UserFavourites from "./pages/UserFavourites";
import RgpdPage from "./pages/RgpdPage";

import AdminLayout from "./pages/layout/AdminLayout";

import Auth from "./pages/Auth";
import WorksAdmin from "./pages/admin/WorksAdmin";
import ArticlesAdmin from "./pages/admin/ArticlesAdmin";
import BiographiesAdmin from "./pages/admin/BiographiesAdmin";
import CategoriesAdmin from "./pages/admin/CategoriesAdmin";
import TechniquesAdmin from "./pages/admin/TechniquesAdmin";
import UsersAdmin from "./pages/admin/UsersAdmin";
import AboutAdmin from "./pages/admin/AboutAdmin";

import "./Index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route path="" element={<HomePage />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="gallery/:id" element={<OneImage />} />
          <Route path="author" element={<Author />} />
          <Route path="about" element={<About />} />
          <Route path="subscription" element={<UserSubscription />} />
          <Route path="favourites" element={<UserFavourites />} />
          <Route path="auth/connexion" element={<Auth />} />
          <Route path="rgpd" element={<RgpdPage />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="" element={<WorksAdmin />} />
          <Route path="articles" element={<ArticlesAdmin />} />
          <Route path="biographies" element={<BiographiesAdmin />} />
          <Route path="categories" element={<CategoriesAdmin />} />
          <Route path="techniques" element={<TechniquesAdmin />} />
          <Route path="users" element={<UsersAdmin />} />
          <Route path="about" element={<AboutAdmin />} />
        </Route>
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Router>
  );
}

export default App;
