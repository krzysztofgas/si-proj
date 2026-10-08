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

const BIEZACY_ROK = new Date().getFullYear();

function czyPuste(wartosc) {
  return String(wartosc).trim() === "";
}

function czyLiczbaCalkowitaWZakresie(wartosc, min, max) {
  const liczba = Number(wartosc);
  return Number.isInteger(liczba) && liczba >= min && liczba <= max;
}

function walidujGre(dane) {
  const bledy = {};

  if (czyPuste(dane.tytul)) {
    bledy.tytul = "Podaj tytuł gry.";
  } else if (dane.tytul.trim().length < 2) {
    bledy.tytul = "Tytuł musi mieć co najmniej 2 znaki.";
  }

  if (!dane.kategoria) {
    bledy.kategoria = "Wybierz kategorię.";
  }

  if (!dane.trudnosc) {
    bledy.trudnosc = "Wybierz poziom trudności.";
  }

  if (czyPuste(dane.minGraczy)) {
    bledy.minGraczy = "Podaj minimalną liczbę graczy.";
  } else if (!czyLiczbaCalkowitaWZakresie(dane.minGraczy, 1, 20)) {
    bledy.minGraczy = "Liczba graczy musi być liczbą całkowitą od 1 do 20.";
  }

  if (czyPuste(dane.maxGraczy)) {
    bledy.maxGraczy = "Podaj maksymalną liczbę graczy.";
  } else if (!czyLiczbaCalkowitaWZakresie(dane.maxGraczy, 1, 20)) {
    bledy.maxGraczy = "Liczba graczy musi być liczbą całkowitą od 1 do 20.";
  } else if (!bledy.minGraczy && Number(dane.maxGraczy) < Number(dane.minGraczy)) {
    bledy.maxGraczy = "Maksymalna liczba graczy nie może być mniejsza niż minimalna.";
  }

  if (czyPuste(dane.ocena)) {
    bledy.ocena = "Podaj ocenę.";
  } else if (!czyLiczbaCalkowitaWZakresie(dane.ocena, 1, 10)) {
    bledy.ocena = "Ocena musi być liczbą całkowitą od 1 do 10.";
  }

  if (czyPuste(dane.rok)) {
    bledy.rok = "Podaj rok wydania.";
  } else if (!czyLiczbaCalkowitaWZakresie(dane.rok, 1900, BIEZACY_ROK)) {
    bledy.rok = `Rok musi być liczbą od 1900 do ${BIEZACY_ROK}.`;
  }

  return bledy;
}

function BladPola({ komunikat }) {
  if (!komunikat) {
    return null;
  }
  return <p className="formularz-blad">{komunikat}</p>;
}

function FormularzGry({ poczatkoweDane, naZapisz, naAnuluj, tekstPrzycisku }) {
  const [dane, setDane] = useState(poczatkoweDane ?? PUSTA_GRA);
  const [czyProbaWyslania, setCzyProbaWyslania] = useState(false);

  const bledy = czyProbaWyslania ? walidujGre(dane) : {};
  const czySaBledy = Object.keys(bledy).length > 0;

  function klasaPola(nazwa) {
    return bledy[nazwa] ? "pole-blad" : "";
  }

  function obsluzZmiane(zdarzenie) {
    const { name, value, type, checked } = zdarzenie.target;
    setDane((poprzednieDane) => ({
      ...poprzednieDane,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function obsluzWyslanie(zdarzenie) {
    zdarzenie.preventDefault();
    setCzyProbaWyslania(true);

    if (Object.keys(walidujGre(dane)).length > 0) {
      return;
    }

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
    <form className="formularz" onSubmit={obsluzWyslanie} noValidate>
      <div className="formularz-pole">
        <label htmlFor="pole-tytul">Tytuł</label>
        <input
          id="pole-tytul"
          name="tytul"
          type="text"
          className={klasaPola("tytul")}
          aria-invalid={Boolean(bledy.tytul)}
          value={dane.tytul}
          onChange={obsluzZmiane}
        />
        <BladPola komunikat={bledy.tytul} />
      </div>

      <div className="formularz-pole">
        <label htmlFor="pole-kategoria">Kategoria</label>
        <select
          id="pole-kategoria"
          name="kategoria"
          className={klasaPola("kategoria")}
          aria-invalid={Boolean(bledy.kategoria)}
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
        <BladPola komunikat={bledy.kategoria} />
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
        <BladPola komunikat={bledy.trudnosc} />
      </fieldset>

      <div className="formularz-wiersz">
        <div className="formularz-pole">
          <label htmlFor="pole-min-graczy">Min. graczy</label>
          <input
            id="pole-min-graczy"
            name="minGraczy"
            type="number"
            className={klasaPola("minGraczy")}
            aria-invalid={Boolean(bledy.minGraczy)}
            value={dane.minGraczy}
            onChange={obsluzZmiane}
          />
          <BladPola komunikat={bledy.minGraczy} />
        </div>
        <div className="formularz-pole">
          <label htmlFor="pole-max-graczy">Maks. graczy</label>
          <input
            id="pole-max-graczy"
            name="maxGraczy"
            type="number"
            className={klasaPola("maxGraczy")}
            aria-invalid={Boolean(bledy.maxGraczy)}
            value={dane.maxGraczy}
            onChange={obsluzZmiane}
          />
          <BladPola komunikat={bledy.maxGraczy} />
        </div>
      </div>

      <div className="formularz-wiersz">
        <div className="formularz-pole">
          <label htmlFor="pole-ocena">Ocena (1–10)</label>
          <input
            id="pole-ocena"
            name="ocena"
            type="number"
            className={klasaPola("ocena")}
            aria-invalid={Boolean(bledy.ocena)}
            value={dane.ocena}
            onChange={obsluzZmiane}
          />
          <BladPola komunikat={bledy.ocena} />
        </div>
        <div className="formularz-pole">
          <label htmlFor="pole-rok">Rok wydania</label>
          <input
            id="pole-rok"
            name="rok"
            type="number"
            className={klasaPola("rok")}
            aria-invalid={Boolean(bledy.rok)}
            value={dane.rok}
            onChange={obsluzZmiane}
          />
          <BladPola komunikat={bledy.rok} />
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
        <button type="submit" className="przycisk-glowny" disabled={czySaBledy}>
          {tekstPrzycisku}
        </button>
      </div>
    </form>
  );
}

export default FormularzGry;
