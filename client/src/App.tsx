import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserProvider from "./context/UserContext";
import Layout from './pages/Layout';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';

function App() {

  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </>
  )
}

export default App
