import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { ScrollToTop } from "@/components/ui";
import {
  CategoryItemDetails,
  CategoryItems,
  Categories,
  Home,
  Contact,
} from "@/pages";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function App() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <ScrollToTop />
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} /> 
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:categorySlug" element={<CategoryItems />} />
        <Route
          path="/categories/:categorySlug/:productId"
          element={<CategoryItemDetails />}
        />
      </Routes>
    </>
  );
}
