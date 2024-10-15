import { FunctionComponent, ReactNode } from "react";
import CustomThemeProvider from "./theme/provider";
import { Provider } from "react-redux";
import { store } from "./reducer/store";
import { CssBaseline } from "@mui/material";

interface EverythingProviderProps {
  children: ReactNode;
}

const EverythingProvider: FunctionComponent<EverythingProviderProps> = ({
  children,
}: EverythingProviderProps) => {
  return (
    <CustomThemeProvider>
      <CssBaseline />
      <Provider store={store}>{children}</Provider>
    </CustomThemeProvider>
  );
};

export default EverythingProvider;
