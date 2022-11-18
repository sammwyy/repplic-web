import { ChakraProvider } from "@chakra-ui/react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import E404 from "./pages/_404";

import Home from "./pages/home";
import Landing from "./pages/landing";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Register from "./pages/register";
import Settings from "./pages/settings";
import Verify from "./pages/verify";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/:username" element={<Profile />} />

          <Route path="*" element={<E404 />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
