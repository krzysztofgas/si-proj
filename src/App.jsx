import { useState } from "react";
import poczatkoweGry from "./data/poczatkoweGry.js";
import "./App.css";

function App() {
  const [gry] = useState(poczatkoweGry);

  return (
    <div>
      <h1>Kolekcja planszówek</h1>
      <p>Liczba gier: {gry.length}</p>
    </div>
  );
}

export default App;
