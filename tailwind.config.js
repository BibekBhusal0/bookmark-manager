// tailwind.config.js
const { nextui } = require("@nextui-org/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/(accordion|autocomplete|breadcrumbs|button|card|dropdown|image|listbox|select|divider|ripple|spinner|form|input|popover|scroll-shadow|menu).js"
  ],
  theme: {
    animation: {
      "spin-slow": "spin 20s linear infinite",
    },
  },
  darkMode: "class",
  plugins: [
    nextui(),
    require("@xpd/tailwind-3dtransforms"),
    require("tailwind-scrollbar")({ nocompatible: true }),
  ],
};
