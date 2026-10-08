import { KATEGORIE, POLA_SORTOWANIA } from "../data/slowniki.js";

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
    <section className="panel-narzedzi" aria-label="Narzędzia wyszukiwania i sortowania">
      <div className="panel-pole">
        <input
          type="text"
          placeholder="Szukaj po tytule..."
          value={szukanaFraza}
          onChange={(zdarzenie) => ustawSzukanaFraze(zdarzenie.target.value)}
        />
      </div>

      <div className="panel-pole">
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
      </div>

      <div className="panel-pole">
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
      </div>

      <div className="panel-pole">
        <button
          type="button"
          className="przycisk-drugorzedny przycisk-kierunek"
          onClick={() =>
            ustawKierunekSortowania(
              kierunekSortowania === "rosnaco" ? "malejaco" : "rosnaco",
            )
          }
        >
          {kierunekSortowania === "rosnaco" ? "Rosnąco ↑" : "Malejąco ↓"}
        </button>
      </div>
    </section>
  );
}

export default PanelNarzedzi;
