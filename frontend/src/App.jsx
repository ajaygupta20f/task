import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import FetchConfigPage from "./pages/FetchConfigPage";
import UpdateRemarkPage from "./pages/UpdateRemarkPage";

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<FetchConfigPage />} />
        <Route path="/update" element={<UpdateRemarkPage />} />
      </Routes>
    </div>
  );
}
