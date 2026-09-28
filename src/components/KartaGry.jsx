import Odznaka from "./Odznaka.jsx";

function KartaGry({ gra }) {
  return (
    <div className="karta-gry">
      <h3>{gra.tytul}</h3>
      <p>Kategoria: {gra.kategoria}</p>
      <p>
        Gracze: {gra.minGraczy}–{gra.maxGraczy}
      </p>
      <p>Ocena: {gra.ocena}/10</p>
      {gra.posiadana && <Odznaka tekst="Posiadana" wariant="posiadana" />}
    </div>
  );
}

export default KartaGry;
