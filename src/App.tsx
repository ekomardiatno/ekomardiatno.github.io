import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Monflo from "./pages/Monflo";
import Eksamart from "./pages/Eksamart";
import Emvite from "./pages/Emvite";

export default function App() {
  return (
    <Routes>
      <Route index path="/" element={<Home />} />
      <Route path="/monflo" element={<Monflo />} />
      <Route path="/eksamart" element={<Eksamart />} />
      <Route path="/emvite/preview/:id" element={<Emvite mode="preview" />} />
      <Route path="/emvite/guest/:id" element={<Emvite mode="guest" />} />
    </Routes>
  );
}
