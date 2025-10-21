import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState("");

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((result) => {
        setData(result);
      });
  }, []);

  return (
    <>
      <div>
        <h1>Heeeesaaaaanananananj</h1>
        <p>{data.hello}</p>
      </div>
    </>
  );
}

export default App;
