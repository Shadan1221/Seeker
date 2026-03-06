export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Core palette — almost entirely monochrome
        ink:        "#0D0D0D",       // Near-black — primary text
        "ink-60":   "rgba(13,13,13,0.6)",
        "ink-30":   "rgba(13,13,13,0.3)",
        "ink-10":   "rgba(13,13,13,0.1)",
        paper:      "#F8F6F1",       // Warm off-white — primary background
        "paper-80": "rgba(248,246,241,0.8)",
        accent:     "#E8572A",       // Burnt orange — the ONLY colour used for CTAs, active states, highlights
        "accent-10":"rgba(232,87,42,0.1)",
        "accent-20":"rgba(232,87,42,0.2)",
        surface:    "#EFEFEC",       // Subtle surface for cards
        "surface-dark": "#1A1A1A",  // Dark surface for inverted sections
        muted:      "#9B9B95",       // Secondary text
      },
      fontFamily: {
        serif:  ["DM Serif Display", "Georgia", "serif"],
        sans:   ["DM Sans", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Display scale — editorial
        "display-xl": ["clamp(3.5rem, 8vw, 7rem)",   { lineHeight: "1.0", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.5rem, 5vw, 4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.75rem, 3vw, 2.75rem)", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
        "display-sm": ["clamp(1.25rem, 2vw, 1.75rem)", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
      },
      animation: {
        "path-draw":    "pathDraw 3s ease-out forwards",
        "fade-up":      "fadeUp 0.6s ease-out forwards",
        "fade-in":      "fadeIn 0.4s ease-out forwards",
        "cursor-blink": "cursorBlink 1s step-end infinite",
        "underline-in": "underlineIn 0.3s ease-out forwards",
      },
      keyframes: {
        fadeUp:       { "0%": { opacity: "0", transform: "translateY(24px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        fadeIn:       { "0%": { opacity: "0" },  "100%": { opacity: "1" } },
        cursorBlink:  { "0%, 100%": { opacity: "1" }, "50%": { opacity: "0" } },
        underlineIn:  { "0%": { transform: "scaleX(0)" }, "100%": { transform: "scaleX(1)" } },
      },
      transitionTimingFunction: {
        "spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
}
