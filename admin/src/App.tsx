import { Routes, Route } from "react-router-dom";
import { AddProduct, Auth, Home, Products } from "./pages";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/dashboard" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/add-product" element={<AddProduct />} />
    </Routes>
  )
}
