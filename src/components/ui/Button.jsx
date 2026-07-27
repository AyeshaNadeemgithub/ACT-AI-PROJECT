import { colors, fonts, radius, shadows } from "../../styles/theme";

/**
 * Reusable Button
 * variant: "primary" | "secondary" | "ghost"
 * size:    "sm" | "md" | "lg"
 */
const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  fullWidth = false,
  style = {},
  ...props
}) => {
  const pad   = { sm: "8px 16px",  md: "11px 26px",  lg: "15px 40px"  }[size];
  const fsize = { sm: "12px",      md: "13px",        lg: "15px"       }[size];

  const base = {
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    gap: 6, border: "none", borderRadius: radius.md,
    padding: pad, fontSize: fsize, fontWeight: 800,
    fontFamily: fonts.body, width: fullWidth ? "100%" : "auto",
    transition: "all 0.2s", lineHeight: 1,
    ...style,
  };

  const variants = {
    primary: {
      background: `linear-gradient(135deg, ${colors.purple}, ${colors.purpleLight})`,
      color: "#fff",
      boxShadow: shadows.purple,
    },
    secondary: {
      background: colors.purpleSoft,
      color: colors.purple,
      border: `1px solid ${colors.lavender}`,
    },
    ghost: {
      background: "transparent",
      color: colors.textMid,
      border: `1px solid ${colors.border}`,
    },
  };

  const hover = {
    primary:   { boxShadow: shadows.purpleLg, transform: "translateY(-1px)" },
    secondary: { background: colors.purplePale },
    ghost:     { background: colors.purpleSoft },
  };

  const handleEnter = e => Object.assign(e.currentTarget.style, hover[variant]);
  const handleLeave = e => Object.assign(e.currentTarget.style, {
    boxShadow: variants[variant].boxShadow || "none",
    transform: "none",
    background: variants[variant].background,
  });

  return (
    <button
      onClick={onClick}
      style={{ ...base, ...variants[variant] }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
