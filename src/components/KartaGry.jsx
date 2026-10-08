import Odznaka from "./Odznaka.jsx";

function KartaGry({ gra, naEdytuj, naUsun }) {
  return (
    <div className="karta-gry">
      <h3>{gra.tytul}</h3>
      <p>Kategoria: {gra.kategoria}</p>
      <p>
        Gracze: {gra.minGraczy}-{gra.maxGraczy}
      </p>
      <p>Ocena: {gra.ocena}/10</p>
      {gra.posiadana && <Odznaka tekst="Posiadana" wariant="posiadana" />}

      <div className="karta-akcje">
        <button type="button" onClick={() => naEdytuj(gra)}>
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
    </div>
  );
}

export default KartaGry;
