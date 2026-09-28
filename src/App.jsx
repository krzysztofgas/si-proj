import { useState } from "react";
import poczatkoweGry from "./data/poczatkoweGry.js";
import ListaGier from "./components/ListaGier.jsx";
import Paginacja from "./components/Paginacja.jsx";
import "./App.css";

function App() {
  const [gry] = useState(poczatkoweGry);

  return (
    <div>
      <h1>Kolekcja planszówek</h1>
      <ListaGier gry={gry} />
      <Paginacja aktualnaStrona={1} liczbaStron={4} naZmianeStrony={() => {}} />
    </div>
  );
}

export default App;
