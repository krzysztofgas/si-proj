function PustaLista({ wyczyscFiltry }) {
  return (
    <div className="pusta-lista">
      <p>Brak gier spelniajacych kryteria.</p>
      <button type="button" onClick={wyczyscFiltry}>
        Wyczysc filtry
      </button>
    </div>
  );
}

export default PustaLista;
