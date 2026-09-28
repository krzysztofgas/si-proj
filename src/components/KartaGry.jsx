function KartaGry({ gra }) {
  return (
    <div className="karta-gry">
      <h3>{gra.tytul}</h3>
      <p>Kategoria: {gra.kategoria}</p>
      <p>
        Gracze: {gra.minGraczy}–{gra.maxGraczy}
      </p>
      <p>Ocena: {gra.ocena}/10</p>
      {gra.posiadana && <span className="odznaka">Posiadana</span>}
    </div>
  );
}

export default KartaGry;
