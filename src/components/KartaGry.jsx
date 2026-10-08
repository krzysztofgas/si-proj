import Odznaka from "./Odznaka.jsx";

const ETYKIETY_TRUDNOSCI = {
  latwy: "Łatwy",
  sredni: "Średni",
  trudny: "Trudny",
};

function KartaGry({ gra, naEdytuj, naUsun }) {
  return (
    <article className="karta-gry">
      <div className="karta-naglowek">
        <h3>{gra.tytul}</h3>
        <div className="karta-odznaki">
          {gra.posiadana && <Odznaka tekst="Posiadana" wariant="posiadana" />}
          <Odznaka
            tekst={ETYKIETY_TRUDNOSCI[gra.trudnosc] || gra.trudnosc}
            wariant={gra.trudnosc}
          />
        </div>
      </div>

      <div className="karta-szczegoly">
        <p>
          <span>Kategoria:</span> <strong>{gra.kategoria}</strong>
        </p>
        <p>
          <span>Liczba graczy:</span> <strong>{gra.minGraczy}–{gra.maxGraczy}</strong>
        </p>
        <p>
          <span>Ocena:</span> <strong>{gra.ocena}/10</strong>
        </p>
        <p>
          <span>Rok wydania:</span> <strong>{gra.rok}</strong>
        </p>
      </div>

      <div className="karta-akcje">
        <button
          type="button"
          className="przycisk-drugorzedny"
          onClick={() => naEdytuj(gra)}
        >
          Edytuj
        </button>
        <button
          type="button"
          className="przycisk-niebezpieczny"
          onClick={() => naUsun(gra)}
        >
          Usuń
        </button>
      </div>
    </article>
  );
}

export default KartaGry;
