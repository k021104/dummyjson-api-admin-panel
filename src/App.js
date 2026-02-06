import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Users from './pages/Users';
import Orders from './pages/Orders';
import Login from "./pages/Login";
import ProtectedRoute from "./pages/ProtectedRoute";
import './App.css';
// import './globalcss2.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from './context/ThemeContext'; // 1. Import moved to top level

function App() {
  return (
    /* 2. Wrap EVERYTHING in ThemeProvider */
    <ThemeProvider>
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          /* You can now use the theme logic here too! */
        />

        <Routes>
          {/* LOGIN ROUTE */}
          <Route path="/login" element={<Login />} />

          {/* PROTECTED ADMIN PANEL */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <div className="app-layout">
                  <Sidebar />
                  <div className="main-content">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/products" element={<Products />} />
                      <Route path="/users" element={<Users />} />
                      <Route path="/orders" element={<Orders />} />
                    </Routes>
                  </div>
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;