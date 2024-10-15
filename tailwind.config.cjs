module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 20s linear infinite",
      },
    },
  },
  prefix: "",
  plugins: [
    require("@xpd/tailwind-3dtransforms"),
    require("tailwind-scrollbar")({ nocompatible: true }),
  ],
};
