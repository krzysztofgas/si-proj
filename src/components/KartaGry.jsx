import Odznaka from "./Odznaka.jsx";

// Karta pojedynczej gry. Sama niczego nie usuwa – po kliknięciu
// "Usuń" wywołuje funkcję naUsun przekazaną z rodzica (App decyduje, co dalej).
function KartaGry({ gra, naUsun }) {
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
