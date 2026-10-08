import { useState } from "react";
import { KATEGORIE, POZIOMY_TRUDNOSCI } from "../data/slowniki.js";

// Wartości pustego formularza (tryb dodawania).
// Pola liczbowe trzymamy jako tekst, bo <input type="number"> zwraca string,
// a pusty string pozwala zostawić pole puste. Na liczby zamieniamy przy zapisie.
const PUSTA_GRA = {
  tytul: "",
  kategoria: "",
  trudnosc: "",
  posiadana: false,
  ocena: "",
  minGraczy: "",
  maxGraczy: "",
  rok: "",
};

// Jeden formularz do dodawania I edycji gry.
// - poczatkoweDane: brak = dodawanie (pusty formularz), obiekt gry = edycja
// - naZapisz(dane): wywoływana po wysłaniu formularza
// - naAnuluj(): zamyka formularz bez zapisu
// - tekstPrzycisku: np. "Dodaj grę" albo "Zapisz zmiany"
function FormularzGry({ poczatkoweDane, naZapisz, naAnuluj, tekstPrzycisku }) {
  // Cały formularz to jeden obiekt w stanie. Wartość początkowa jest brana
  // tylko przy pierwszym renderze komponentu.
  const [dane, setDane] = useState(poczatkoweDane ?? PUSTA_GRA);

  // Jedna funkcja obsługuje wszystkie pola. Atrybut "name" inputa mówi,
  // które pole obiektu zmienić. Checkbox przechowuje wartość w "checked",
  // a pozostałe pola w "value".
  function obsluzZmiane(zdarzenie) {
    const { name, value, type, checked } = zdarzenie.target;
    setDane((poprzednieDane) => ({
      ...poprzednieDane,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function obsluzWyslanie(zdarzenie) {
    // Blokujemy domyślne przeładowanie strony przez formularz HTML.
    zdarzenie.preventDefault();

    naZapisz({
      ...dane,
      tytul: dane.tytul.trim(),
      ocena: Number(dane.ocena),
      minGraczy: Number(dane.minGraczy),
      maxGraczy: Number(dane.maxGraczy),
      rok: Number(dane.rok),
    });
  }

  return (
    <form className="formularz" onSubmit={obsluzWyslanie}>
      {/* Kontrolowany input tekstowy */}
      <div className="formularz-pole">
        <label htmlFor="pole-tytul">Tytuł</label>
        <input
          id="pole-tytul"
          name="tytul"
          type="text"
          value={dane.tytul}
          onChange={obsluzZmiane}
        />
      </div>

      {/* Kontrolowany select */}
      <div className="formularz-pole">
        <label htmlFor="pole-kategoria">Kategoria</label>
        <select
          id="pole-kategoria"
          name="kategoria"
          value={dane.kategoria}
          onChange={obsluzZmiane}
        >
          <option value="">— wybierz kategorię —</option>
          {KATEGORIE.map((kategoria) => (
            <option key={kategoria.wartosc} value={kategoria.wartosc}>
              {kategoria.etykieta}
            </option>
          ))}
        </select>
      </div>

      {/* Kontrolowana grupa radio – zaznaczony jest ten, którego
          wartość równa się dane.trudnosc */}
      <fieldset className="formularz-pole">
        <legend>Poziom trudności</legend>
        <div className="formularz-radio">
          {POZIOMY_TRUDNOSCI.map((poziom) => (
            <label key={poziom.wartosc}>
              <input
                type="radio"
                name="trudnosc"
                value={poziom.wartosc}
                checked={dane.trudnosc === poziom.wartosc}
                onChange={obsluzZmiane}
              />
              {poziom.etykieta}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Pola liczbowe */}
      <div className="formularz-wiersz">
        <div className="formularz-pole">
          <label htmlFor="pole-min-graczy">Min. graczy</label>
          <input
            id="pole-min-graczy"
            name="minGraczy"
            type="number"
            value={dane.minGraczy}
            onChange={obsluzZmiane}
          />
        </div>
        <div className="formularz-pole">
          <label htmlFor="pole-max-graczy">Maks. graczy</label>
          <input
            id="pole-max-graczy"
            name="maxGraczy"
            type="number"
            value={dane.maxGraczy}
            onChange={obsluzZmiane}
          />
        </div>
      </div>

      <div className="formularz-wiersz">
        <div className="formularz-pole">
          <label htmlFor="pole-ocena">Ocena (1–10)</label>
          <input
            id="pole-ocena"
            name="ocena"
            type="number"
            value={dane.ocena}
            onChange={obsluzZmiane}
          />
        </div>
        <div className="formularz-pole">
          <label htmlFor="pole-rok">Rok wydania</label>
          <input
            id="pole-rok"
            name="rok"
            type="number"
            value={dane.rok}
            onChange={obsluzZmiane}
          />
        </div>
      </div>

      {/* Kontrolowany checkbox */}
      <label className="formularz-checkbox">
        <input
          name="posiadana"
          type="checkbox"
          checked={dane.posiadana}
          onChange={obsluzZmiane}
        />
        Mam tę grę w kolekcji
      </label>

      <div className="modal-akcje">
        <button type="button" onClick={naAnuluj}>
          Anuluj
        </button>
        <button type="submit" className="przycisk-glowny">
          {tekstPrzycisku}
        </button>
      </div>
    </form>
  );
}

export default FormularzGry;
