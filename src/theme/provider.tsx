import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

export default function CustomThemeProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <ThemeProvider defaultMode="dark" theme={theme}>
      {children}
    </ThemeProvider>
  );
}
