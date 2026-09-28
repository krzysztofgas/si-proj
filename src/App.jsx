import { useState } from "react";
import poczatkoweGry from "./data/poczatkoweGry.js";
import ListaGier from "./components/ListaGier.jsx";
import Paginacja from "./components/Paginacja.jsx";
import "./App.css";

const GIER_NA_STRONE = 5;

function App() {
  const [gry] = useState(poczatkoweGry);
  const [aktualnaStrona, setAktualnaStrona] = useState(1);

  const liczbaStron = Math.ceil(gry.length / GIER_NA_STRONE);
  const poczatekWycinka = (aktualnaStrona - 1) * GIER_NA_STRONE;
  const gryNaStronie = gry.slice(poczatekWycinka, poczatekWycinka + GIER_NA_STRONE);

  return (
    <div>
      <h1>Kolekcja planszówek</h1>
      <ListaGier gry={gryNaStronie} />
      <Paginacja
        aktualnaStrona={aktualnaStrona}
        liczbaStron={liczbaStron}
        naZmianeStrony={setAktualnaStrona}
      />
    </div>
  );
}

export default App;
