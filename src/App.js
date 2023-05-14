import { useState } from "react";
import { ThemeProvider } from "@mui/material";

import base from "./styles/themes/base";
import Group from "./components/groups";

import "./App.css";

function App() {
  let [groups, setGroups] = useState([]);

  function onGroupCreate(group) {
    setGroups((prevSatate) => [...prevSatate, group]);
  }

  console.log(groups);
  return (
    <ThemeProvider theme={base}>
      <div className="App">
        <Group onSubmit={onGroupCreate} />
      </div>
    </ThemeProvider>
  );
}

export default App;
