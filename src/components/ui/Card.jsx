import { colors, radius, shadows } from "../../styles/theme";

/**
 * Reusable Card wrapper
 */
const Card = ({ children, style = {}, hover = false, onClick }) => {
  const base = {
    background: colors.card,
    borderRadius: radius.lg,
    border: `1.5px solid ${colors.border}`,
    boxShadow: shadows.card,
    padding: "22px 24px",
    transition: "all 0.2s",
    ...style,
  };

  const handleEnter = e => {
    if (hover) {
      e.currentTarget.style.border  = `1.5px solid ${colors.purple}`;
      e.currentTarget.style.boxShadow = `0 8px 32px rgba(124,58,237,0.15)`;
      e.currentTarget.style.transform = "translateY(-2px)";
    }
  };
  const handleLeave = e => {
    if (hover) {
      e.currentTarget.style.border    = `1.5px solid ${colors.border}`;
      e.currentTarget.style.boxShadow = shadows.card;
      e.currentTarget.style.transform = "none";
    }
  };

  return (
    <div
      style={base}
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  );
};

export default Card;
