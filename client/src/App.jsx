import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/Dashboard";
import BuySubscription from "./pages/BuySubscription";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";
import Profile from "./pages/Profile";
import AdminWebhookLogs from "./pages/AdminWebhookLogs";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/buy"
                element={
                  <ProtectedRoute>
                    <BuySubscription />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/payment-success"
                element={
                  <ProtectedRoute>
                    <PaymentSuccess />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/payment-failed"
                element={
                  <ProtectedRoute>
                    <PaymentFailed />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/webhook-logs"
                element={
                  <ProtectedRoute>
                    <AdminWebhookLogs />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
