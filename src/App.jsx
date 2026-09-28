import { useState } from "react";
import poczatkoweGry from "./data/poczatkoweGry.js";
import KartaGry from "./components/KartaGry.jsx";
import "./App.css";

function App() {
  const [gry] = useState(poczatkoweGry);

  return (
    <div>
      <h1>Kolekcja planszówek</h1>
      <KartaGry gra={gry[0]} />
      <KartaGry gra={gry[1]} />
    </div>
  );
}

export default App;
