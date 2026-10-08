import { useState } from "react";
import poczatkoweGry from "./data/poczatkoweGry.js";
import ListaGier from "./components/ListaGier.jsx";
import Paginacja from "./components/Paginacja.jsx";
import PanelNarzedzi from "./components/PanelNarzedzi.jsx";
import PustaLista from "./components/PustaLista.jsx";
import Modal from "./components/Modal.jsx";
import FormularzGry from "./components/FormularzGry.jsx";
import "./App.css";

const GIER_NA_STRONE = 5;

function App() {
  const [gry, setGry] = useState(poczatkoweGry);

  const [aktualnaStrona, setAktualnaStrona] = useState(1);
  const [szukanaFraza, setSzukanaFraze] = useState("");
  const [wybranaKategoria, setWybranaKategorie] = useState("wszystkie");
  const [poleSortowania, setPoleSortowania] = useState("tytul");
  const [kierunekSortowania, setKierunekSortowania] = useState("rosnaco");

  const [graDoUsuniecia, setGraDoUsuniecia] = useState(null);

  const [czyDodawanie, setCzyDodawanie] = useState(false);

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

  const gryPrzefiltrowane = gry
    .filter((gra) =>
      gra.tytul.toLowerCase().includes(szukanaFraza.toLowerCase()),
    )
    .filter(
      (gra) =>
        wybranaKategoria === "wszystkie" || gra.kategoria === wybranaKategoria,
    );

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

  function potwierdzUsuniecie() {
    setGry((poprzednieGry) =>
      poprzednieGry.filter((gra) => gra.id !== graDoUsuniecia.id),
    );

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

  function dodajGre(daneGry) {
    setGry((poprzednieGry) => {
      const noweId = Math.max(0, ...poprzednieGry.map((gra) => gra.id)) + 1;
      return [...poprzednieGry, { ...daneGry, id: noweId }];
    });
    setCzyDodawanie(false);
  }

  return (
    <div>
      <header className="naglowek-aplikacji">
        <h1>Kolekcja planszówek</h1>
        <button
          type="button"
          className="przycisk-glowny"
          onClick={() => setCzyDodawanie(true)}
        >
          + Dodaj grę
        </button>
      </header>
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

      {czyDodawanie && (
        <Modal tytul="Nowa gra" zamknij={() => setCzyDodawanie(false)}>
          <FormularzGry
            naZapisz={dodajGre}
            naAnuluj={() => setCzyDodawanie(false)}
            tekstPrzycisku="Dodaj grę"
          />
        </Modal>
      )}
    </div>
  );
}

export default App;
