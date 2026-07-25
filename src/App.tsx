import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Monflo from "./pages/Monflo";
import Eksamart from "./pages/Eksamart";
import Emvite from "./pages/Emvite";
import EmviteDemo from "./pages/EmviteDemo";
import EmviteDemoCelestial from "./pages/EmviteDemoCelestial";
import EmviteDemoEnchanted from "./pages/EmviteDemoEnchanted";
import EmviteDemoVelvet from "./pages/EmviteDemoVelvet";
import EmviteDemoOpulent from "./pages/EmviteDemoOpulent";
import EmviteDemoMemoir from "./pages/EmviteDemoMemoir";
import EmvitePrivacyPolicy from "./pages/EmvitePrivacyPolicy";

export default function App() {
  return (
    <Routes>
      <Route index path="/" element={<Home />} />
      <Route path="/monflo" element={<Monflo />} />
      <Route path="/eksamart" element={<Eksamart />} />
      <Route path="/emvite/demo/evergreen" element={<EmviteDemo />} />
      <Route path="/emvite/demo/celestial" element={<EmviteDemoCelestial />} />
      <Route path="/emvite/demo/enchanted" element={<EmviteDemoEnchanted />} />
      <Route path="/emvite/demo/velvet" element={<EmviteDemoVelvet />} />
      <Route path="/emvite/demo/opulent" element={<EmviteDemoOpulent />} />
      <Route path="/emvite/demo/memoir" element={<EmviteDemoMemoir />} />
      <Route path="/emvite/privacy-policy" element={<EmvitePrivacyPolicy />} />
      <Route
        path="/emvite/wedding/preview/:id"
        element={<Emvite mode="preview" />}
      />
      <Route
        path="/emvite/wedding/guest/:id"
        element={<Emvite mode="guest" />}
      />
    </Routes>
  );
}
