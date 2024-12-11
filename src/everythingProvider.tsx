import { ReactNode } from "react";
import { Provider } from "react-redux";
import { persistor, store } from "./reducer/store";
import { PersistGate } from "redux-persist/integration/react";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider } from "next-themes";

interface EverythingProviderProps {
  children: ReactNode;
}

const EverythingProvider = ({ children }: EverythingProviderProps) => {
  return (
    <Provider store={store}>
      <NextUIProvider>
        <ThemeProvider attribute={"class"} defaultTheme="dark">
          <PersistGate loading={null} persistor={persistor}>
            {children}
          </PersistGate>
        </ThemeProvider>
      </NextUIProvider>
    </Provider>
  );
};

export default EverythingProvider;
