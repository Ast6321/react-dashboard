import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProtectedRoute from "../routes/ProtectedRoutes"
import Login from "../pages/Login"
import Dashboard from "../pages/Dashboard"
import Users from "../pages/User"
import Products from "../pages/Products"
import Orders from "../pages/order"
import Messages from "../pages/message"
import MainLayout from "../../layouts/MainLayout"
import PublicRoute from "./PublicRoutes"

function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

       <Route
  path="/login"
  element={
    <PublicRoute>
      <Login />
    </PublicRoute>
  }
/>

        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >

          <Route index element={<Dashboard />} />

          <Route path="users" element={<Users />} />

          <Route path="products" element={<Products />} />

          <Route path="orders" element={<Orders />} />

          <Route path="messages" element={<Messages />} />

        </Route>
                <Route path="*" element={<Login />} />

      </Routes>

    </BrowserRouter>
  )
}

export default AppRoutes