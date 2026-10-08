import { useState } from "react";
import { KATEGORIE, POZIOMY_TRUDNOSCI } from "../data/slowniki.js";

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

function FormularzGry({ poczatkoweDane, naZapisz, naAnuluj, tekstPrzycisku }) {
  const [dane, setDane] = useState(poczatkoweDane ?? PUSTA_GRA);

  function obsluzZmiane(zdarzenie) {
    const { name, value, type, checked } = zdarzenie.target;
    setDane((poprzednieDane) => ({
      ...poprzednieDane,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function obsluzWyslanie(zdarzenie) {
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
