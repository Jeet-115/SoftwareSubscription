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
import NeuronBackground from "./components/NeuronBackground";
import "./styles/background.css";
import Home from "./pages/Home";
import LegalContentPage from "./pages/Legal/LegalcontentPage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="flex min-h-screen flex-col text-text-DEFAULT neuron-background">
        <NeuronBackground />
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/contact"
                element={
                  <LegalContentPage
                    slug="contact"
                    title="Contact Us"
                    subtitle="Connect with ImportEase if you need product help, billing support, or partnership details."
                    showContactForm
                  />
                }
              />
              <Route
                path="/shipping-policy"
                element={
                  <LegalContentPage
                    slug="shipping"
                    title="Shipping & Digital Delivery Policy"
                    subtitle="Understand how we fulfill ImportEase subscriptions."
                  />
                }
              />
              <Route
                path="/terms-and-conditions"
                element={
                  <LegalContentPage
                    slug="terms"
                    title="Terms and Conditions"
                    subtitle="The rules that govern your use of ImportEase."
                  />
                }
              />
              <Route
                path="/cancellations-and-refunds"
                element={
                  <LegalContentPage
                    slug="cancellations"
                    title="Cancellations & Refunds"
                    subtitle="How cancellations work and when refunds apply."
                  />
                }
              />
              <Route
                path="/privacy-policy"
                element={
                  <LegalContentPage
                    slug="privacy"
                    title="Privacy Policy"
                    subtitle="How ImportEase collects and protects your data."
                  />
                }
              />
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
