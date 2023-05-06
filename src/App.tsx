import { useEffect } from "react";
import { dbCheck } from "./db";

function App() {

  useEffect(() => {
    dbCheck();
  }, []);

  return (
    <>
      APP
    </>
  )
}

export default App;
