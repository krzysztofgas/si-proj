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
        <option value="strategiczna">Strategiczna</option>
        <option value="imprezowa">Imprezowa</option>
        <option value="kooperacyjna">Kooperacyjna</option>
        <option value="karciana">Karciana</option>
        <option value="rodzinna">Rodzinna</option>
      </select>

      <select
        value={poleSortowania}
        onChange={(zdarzenie) => ustawPoleSortowania(zdarzenie.target.value)}
      >
        <option value="tytul">Sortuj po tytule</option>
        <option value="ocena">Sortuj po ocenie</option>
        <option value="rok">Sortuj po roku</option>
      </select>

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
