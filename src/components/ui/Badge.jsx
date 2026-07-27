import { colors, fonts, radius } from "../../styles/theme";

const Badge = ({ children, variant = "purple", style = {} }) => {
  const variants = {
    purple: { background: colors.purpleSoft, color: colors.purple, border: `1px solid ${colors.lavender}` },
    gold:   { background: "#FEF3C7",         color: "#D97706",     border: "1px solid #FDE68A" },
    green:  { background: "#D1FAE5",         color: "#065F46",     border: "1px solid #A7F3D0" },
  };
  return (
    <span style={{
      display: "inline-block",
      padding: "4px 12px", borderRadius: radius.full,
      fontSize: 10, fontWeight: 700, fontFamily: fonts.body,
      letterSpacing: "0.06em",
      ...variants[variant],
      ...style,
    }}>
      {children}
    </span>
  );
};

export default Badge;
