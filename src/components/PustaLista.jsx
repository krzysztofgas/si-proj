function PustaLista({ wyczyscFiltry }) {
  return (
    <div className="pusta-lista">
      <p>Brak gier spełniających kryteria.</p>
      <button type="button" className="przycisk-glowny" onClick={wyczyscFiltry}>
        Wyczyść filtry
      </button>
    </div>
  );
}

export default PustaLista;
