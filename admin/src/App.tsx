import { Routes, Route } from "react-router-dom";
import {
  AddProduct,
  Auth,
  EditProduct,
  Home,
  ProductDetails,
  Products,
  RouteGuard,
} from "./pages";
import { useAuth } from "./hooks";
import { useEffect } from "react";
import { Toaster } from "sonner";

export default function App() {
  const { checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  
  return (
    <>
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route element={<RouteGuard />}>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/products/:id/edit" element={<EditProduct />} />
        </Route>
      </Routes>
    </>
  );
}
