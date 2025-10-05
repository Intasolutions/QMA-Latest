import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AboutMain from "./pages/AboutMain";
import GalleryMain from "./pages/GalleryMain";
import Announcement from "./pages/Announcement";
import ContactUs from "./pages/ContactUs";
import { useState, useEffect } from "react";
import { DialogProvider } from "./components/DialogContext";
import GlobalDialog from "./components/GlobalDialog";
import Loader from "./components/Loader";
import AdminDashboard from "./Admin/AdminDashboard";

function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith("/Admin");

  return (
    <div className="min-h-screen flex flex-col">
      {!hideNavbar && <Navbar />}
      <main className={`flex-grow ${!hideNavbar ? "pt-20" : ""}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AboutMain" element={<AboutMain />} />
          <Route path="/GalleryMain" element={<GalleryMain />} />
          <Route path="/Announcement" element={<Announcement />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/Admin" element={<AdminDashboard />} />
        </Routes>
        <GlobalDialog />
      </main>
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <DialogProvider>
      {loading && <Loader onFinish={() => setLoading(false)} />}
      {!loading && (
        <Router>
          <AppContent />
        </Router>
      )}
    </DialogProvider>
  );
}
