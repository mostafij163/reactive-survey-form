import { ThemeProvider } from "@mui/material";

import base from "./styles/themes/base";
import DnDFlow from "./pages";

import "./App.css";
import AppContextProvider from "./context/AppContext";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={base}>
        <AppContextProvider>
          <DnDFlow />
        </AppContextProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
