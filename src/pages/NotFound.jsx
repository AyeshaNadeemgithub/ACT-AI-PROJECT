import { useNavigate } from "react-router-dom";
import { colors, fonts } from "../styles/theme";
import Button from "../components/ui/Button";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      background: colors.bg, gap: 20, textAlign: "center", padding: 32,
    }}>
      <div style={{ fontSize: 72 }}>🧘</div>
      <h1 style={{ fontFamily: fonts.display, fontSize: 48, color: colors.purple }}>404</h1>
      <p style={{ fontFamily: fonts.body, fontSize: 18, color: colors.textMid, maxWidth: 360 }}>
        This page doesn't exist — but your peace of mind does. Let's go back.
      </p>
      <Button onClick={() => navigate("/")} size="lg">Go Home</Button>
    </div>
  );
};

export default NotFound;
