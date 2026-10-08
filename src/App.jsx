import { useState } from "react";
import poczatkoweGry from "./data/poczatkoweGry.js";
import ListaGier from "./components/ListaGier.jsx";
import Paginacja from "./components/Paginacja.jsx";
import PanelNarzedzi from "./components/PanelNarzedzi.jsx";
import PustaLista from "./components/PustaLista.jsx";
import Modal from "./components/Modal.jsx";
import "./App.css";

const GIER_NA_STRONE = 5;

function App() {
  // Główne dane aplikacji – lista gier trzymana w stanie Reacta.
  const [gry, setGry] = useState(poczatkoweGry);

  // Stan widoku: strona, wyszukiwanie, filtr i sortowanie.
  const [aktualnaStrona, setAktualnaStrona] = useState(1);
  const [szukanaFraza, setSzukanaFraze] = useState("");
  const [wybranaKategoria, setWybranaKategorie] = useState("wszystkie");
  const [poleSortowania, setPoleSortowania] = useState("tytul");
  const [kierunekSortowania, setKierunekSortowania] = useState("rosnaco");

  // Gra czekająca na potwierdzenie usunięcia. null = modal zamknięty.
  const [graDoUsuniecia, setGraDoUsuniecia] = useState(null);

  // Każda zmiana kryteriów wraca na 1. stronę, żeby użytkownik
  // nie wylądował na stronie, która po filtrowaniu już nie istnieje.
  function zmienSzukanaFraze(nowaFraza) {
    setSzukanaFraze(nowaFraza);
    setAktualnaStrona(1);
  }

  function zmienWybranaKategorie(nowaKategoria) {
    setWybranaKategorie(nowaKategoria);
    setAktualnaStrona(1);
  }

  function zmienPoleSortowania(nowePole) {
    setPoleSortowania(nowePole);
    setAktualnaStrona(1);
  }

  function zmienKierunekSortowania(nowyKierunek) {
    setKierunekSortowania(nowyKierunek);
    setAktualnaStrona(1);
  }

  function wyczyscFiltry() {
    setSzukanaFraze("");
    setWybranaKategorie("wszystkie");
    setAktualnaStrona(1);
  }

  // Wartości wyliczane przy każdym renderze (nie trzymamy ich w stanie):
  // 1) filtrowanie po tytule i kategorii, 2) sortowanie, 3) wycinek strony.
  const gryPrzefiltrowane = gry
    .filter((gra) =>
      gra.tytul.toLowerCase().includes(szukanaFraza.toLowerCase()),
    )
    .filter(
      (gra) =>
        wybranaKategoria === "wszystkie" || gra.kategoria === wybranaKategoria,
    );

  // Kopia tablicy ([...]), bo sort() modyfikuje tablicę, na której działa.
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

  // Usuwanie: filter() zwraca nową tablicę bez usuwanej gry
  // (stanu nie modyfikujemy bezpośrednio).
  function potwierdzUsuniecie() {
    setGry((poprzednieGry) =>
      poprzednieGry.filter((gra) => gra.id !== graDoUsuniecia.id),
    );

    // Jeśli usunęliśmy ostatnią grę z ostatniej strony, ta strona przestaje
    // istnieć – cofamy się na nową ostatnią stronę (minimum 1).
    const nowaLiczbaStron = Math.max(
      1,
      Math.ceil((gryPosortowane.length - 1) / GIER_NA_STRONE),
    );
    if (aktualnaStrona > nowaLiczbaStron) {
      setAktualnaStrona(nowaLiczbaStron);
    }

    setGraDoUsuniecia(null);
  }

  function anulujUsuniecie() {
    setGraDoUsuniecia(null);
  }

  return (
    <div>
      <h1>Kolekcja planszówek</h1>
      <PanelNarzedzi
        szukanaFraza={szukanaFraza}
        ustawSzukanaFraze={zmienSzukanaFraze}
        wybranaKategoria={wybranaKategoria}
        ustawWybranaKategorie={zmienWybranaKategorie}
        poleSortowania={poleSortowania}
        ustawPoleSortowania={zmienPoleSortowania}
        kierunekSortowania={kierunekSortowania}
        ustawKierunekSortowania={zmienKierunekSortowania}
      />

      {/* Pusty stan sprawdzamy na całej przefiltrowanej liście,
          a nie na wycinku bieżącej strony. */}
      {gryPosortowane.length === 0 ? (
        <PustaLista wyczyscFiltry={wyczyscFiltry} />
      ) : (
        <ListaGier gry={gryNaStronie} naUsun={setGraDoUsuniecia} />
      )}

      <Paginacja
        aktualnaStrona={aktualnaStrona}
        liczbaStron={liczbaStron}
        naZmianeStrony={setAktualnaStrona}
      />

      {/* Kontekst nr 1 modala: potwierdzenie usunięcia */}
      {graDoUsuniecia && (
        <Modal tytul="Usuwanie gry" zamknij={anulujUsuniecie}>
          <p>
            Czy na pewno chcesz usunąć grę <strong>{graDoUsuniecia.tytul}</strong>?
            Tej operacji nie można cofnąć.
          </p>
          <div className="modal-akcje">
            <button type="button" onClick={anulujUsuniecie}>
              Anuluj
            </button>
            <button
              type="button"
              className="przycisk-niebezpieczny"
              onClick={potwierdzUsuniecie}
            >
              Usuń
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default App;
