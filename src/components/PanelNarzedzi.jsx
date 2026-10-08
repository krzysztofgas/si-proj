import { KATEGORIE, POLA_SORTOWANIA } from "../data/slowniki.js";

// Panel nad listą: wyszukiwarka, filtr kategorii i sortowanie.
// Komponent nie trzyma własnego stanu – wartości i funkcje zmieniające
// dostaje z App przez propsy (inputy kontrolowane).
function PanelNarzedzi({
  szukanaFraza,
  ustawSzukanaFraze,
  wybranaKategoria,
  ustawWybranaKategorie,
  poleSortowania,
  ustawPoleSortowania,
  kierunekSortowania,
  ustawKierunekSortowania,
}) {
  return (
    <div className="panel-narzedzi">
      <input
        type="text"
        placeholder="Szukaj po tytule"
        value={szukanaFraza}
        onChange={(zdarzenie) => ustawSzukanaFraze(zdarzenie.target.value)}
      />

      <select
        value={wybranaKategoria}
        onChange={(zdarzenie) => ustawWybranaKategorie(zdarzenie.target.value)}
      >
        <option value="wszystkie">Wszystkie kategorie</option>
        {KATEGORIE.map((kategoria) => (
          <option key={kategoria.wartosc} value={kategoria.wartosc}>
            {kategoria.etykieta}
          </option>
        ))}
      </select>

      <select
        value={poleSortowania}
        onChange={(zdarzenie) => ustawPoleSortowania(zdarzenie.target.value)}
      >
        {POLA_SORTOWANIA.map((pole) => (
          <option key={pole.wartosc} value={pole.wartosc}>
            {pole.etykieta}
          </option>
        ))}
      </select>

      {/* Przycisk przełącza kierunek sortowania na przeciwny */}
      <button
        type="button"
        onClick={() =>
          ustawKierunekSortowania(
            kierunekSortowania === "rosnaco" ? "malejaco" : "rosnaco",
          )
        }
      >
        {kierunekSortowania === "rosnaco" ? "Rosnaco" : "Malejaco"}
      </button>
    </div>
  );
}

export default PanelNarzedzi;
