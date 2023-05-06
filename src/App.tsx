import { useEffect } from "react";
import { dbCheck } from "./db";
import { Board } from "./components/Board";

function App() {

  useEffect(() => {
    dbCheck();
  }, []);

  return (
    <main className="flex justify-center">
      <Board />
    </main>
  )
}

export default App;
