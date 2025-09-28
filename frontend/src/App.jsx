import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import ProtectedRoute from "./components/ProtectedRoute";
import AuthRoute from './components/AuthRoute';
import NotFound from './pages/NotFound';
import Guest from './pages/GuestHome'
import Leaderboard from './pages/Leaderboard';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route
            path="/login"
            element={
              <AuthRoute>
                <Login />
              </AuthRoute>
            }
          />
          <Route
            path="/register"
            element={
              <AuthRoute>
                <Register />
              </AuthRoute>
            }
          />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path='/guest'
            element={
              <AuthRoute>
                <Guest />
              </AuthRoute>
            } />

          <Route
            path='/leaderboard'
            element={
              <Leaderboard />
            } />
          <Route
            path='*'
            element={<NotFound />} 
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
