import { useState } from "react";
import poczatkoweGry from "./data/poczatkoweGry.js";
import ListaGier from "./components/ListaGier.jsx";
import Paginacja from "./components/Paginacja.jsx";
import PanelNarzedzi from "./components/PanelNarzedzi.jsx";
import "./App.css";

const GIER_NA_STRONE = 5;

function App() {
  const [gry] = useState(poczatkoweGry);
  const [aktualnaStrona, setAktualnaStrona] = useState(1);
  const [szukanaFraza, setSzukanaFraze] = useState("");
  const [wybranaKategoria, setWybranaKategorie] = useState("wszystkie");
  const [poleSortowania, setPoleSortowania] = useState("tytul");
  const [kierunekSortowania, setKierunekSortowania] = useState("rosnaco");

  const gryPrzefiltrowane = gry
    .filter((gra) => gra.tytul.toLowerCase().includes(szukanaFraza.toLowerCase()))
    .filter((gra) => wybranaKategoria === "wszystkie" || gra.kategoria === wybranaKategoria);

  const gryPosortowane = [...gryPrzefiltrowane].sort((graA, graB) => {
    const wartoscA = graA[poleSortowania];
    const wartoscB = graB[poleSortowania];

    if (typeof wartoscA === "string") {
      const wynik = wartoscA.localeCompare(wartoscB);
      return kierunekSortowania === "rosnaco" ? wynik : -wynik;
    }

    const wynik = wartoscA - wartoscB;
    return kierunekSortowania === "rosnaco" ? wynik : -wynik;
  });

  const liczbaStron = Math.ceil(gryPosortowane.length / GIER_NA_STRONE);
  const poczatekWycinka = (aktualnaStrona - 1) * GIER_NA_STRONE;
  const gryNaStronie = gryPosortowane.slice(
    poczatekWycinka,
    poczatekWycinka + GIER_NA_STRONE,
  );

  return (
    <div>
      <h1>Kolekcja planszówek</h1>
      <PanelNarzedzi
        szukanaFraza={szukanaFraza}
        ustawSzukanaFraze={setSzukanaFraze}
        wybranaKategoria={wybranaKategoria}
        ustawWybranaKategorie={setWybranaKategorie}
        poleSortowania={poleSortowania}
        ustawPoleSortowania={setPoleSortowania}
        kierunekSortowania={kierunekSortowania}
        ustawKierunekSortowania={setKierunekSortowania}
      />
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
