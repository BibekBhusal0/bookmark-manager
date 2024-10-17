import { FunctionComponent, ReactNode } from "react";
import CustomThemeProvider from "./theme/provider";
import { Provider } from "react-redux";
import { persistor, store } from "./reducer/store";
import CssBaseline from "@mui/material/CssBaseline";
import { PersistGate } from "redux-persist/integration/react";

interface EverythingProviderProps {
  children: ReactNode;
}

const EverythingProvider: FunctionComponent<EverythingProviderProps> = ({
  children,
}: EverythingProviderProps) => {
  return (
    <CustomThemeProvider>
      <CssBaseline />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    </CustomThemeProvider>
  );
};

export default EverythingProvider;
