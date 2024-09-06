import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartPage from "./pages/CartPage";
import RegisterPage from "./pages/RegisterPage";
import CollectionPage from "./pages/CollectionPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import WhishListPage from "./pages/WhishListPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WhishListPage />} />
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
