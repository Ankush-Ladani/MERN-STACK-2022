import ButtonAppBar from "./components/AppBar";

import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <ButtonAppBar />
      <Outlet />
    </>
  );
}

export default App;
