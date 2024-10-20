/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(0, 0%, 100%)",
        foreground: "hsl(240, 10%, 3.9%)",
        card: "hsl(0, 0%, 100%)",
        cardForeground: "hsl(240, 10%, 3.9%)",
        popover: "hsl(0, 0%, 100%)",
        popoverForeground: "hsl(240, 10%, 3.9%)",
        primary: "hsl(142.1, 76.2%, 36.3%)",
        primaryForeground: "hsl(0, 0%, 100%)",
        secondary: "hsl(240, 4.8%, 95.9%)",
        secondaryForeground: "hsl(240, 5.9%, 10%)",
        muted: "hsl(240, 4.8%, 95.9%)",
        mutedForeground: "hsl(240, 3.8%, 46.1%)",
        accent: "hsl(240, 4.8%, 95.9%)",
        accentForeground: "hsl(240, 5.9%, 10%)",
        destructive: "hsl(0, 84.2%, 60.2%)",
        destructiveForeground: "hsl(0, 0%, 98%)",
        border: "hsl(240, 5.9%, 90%)",
        input: "hsl(240, 5.9%, 90%)",
        ring: "hsl(142.1, 76.2%, 36.3%)",
        radius: "0.5rem",
        chart1: "hsl(12, 76%, 61%)",
        chart2: "hsl(173, 58%, 39%)",
        chart3: "hsl(197, 37%, 24%)",
        chart4: "hsl(43, 74%, 66%)",
        chart5: "hsl(27, 87%, 67%)",

        dark: {
          background: "hsl(20, 14.3%, 4.1%)",
          foreground: "hsl(0, 0%, 95%)",
          card: "hsl(24, 9.8%, 10%)",
          cardForeground: "hsl(0, 0%, 95%)",
          popover: "hsl(0, 0%, 9%)",
          popoverForeground: "hsl(0, 0%, 95%)",
          primary: "hsl(142.1, 70.6%, 45.3%)",
          primaryForeground: "hsl(0, 0%, 100%)",
          secondary: "hsl(240, 3.7%, 15.9%)",
          secondaryForeground: "hsl(0, 0%, 98%)",
          muted: "hsl(0, 0%, 15%)",
          mutedForeground: "hsl(240, 5%, 64.9%)",
          accent: "hsl(12, 6.5%, 15.1%)",
          accentForeground: "hsl(0, 0%, 98%)",
          destructive: "hsl(0, 62.8%, 30.6%)",
          destructiveForeground: "hsl(0, 85.7%, 97.3%)",
          border: "hsl(240, 3.7%, 15.9%)",
          input: "hsl(240, 3.7%, 15.9%)",
          ring: "hsl(142.4, 71.8%, 29.2%)",
          chart1: "hsl(220, 70%, 50%)",
          chart2: "hsl(160, 60%, 45%)",
          chart3: "hsl(30, 80%, 55%)",
          chart4: "hsl(280, 65%, 60%)",
          chart5: "hsl(340, 75%, 55%)",
        },
      },
    },
  },
  plugins: [],
};