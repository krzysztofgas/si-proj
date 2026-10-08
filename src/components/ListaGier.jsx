import KartaGry from "./KartaGry.jsx";

// Lista kart gier. Przekazuje funkcję naUsun dalej do każdej karty.
function ListaGier({ gry, naUsun }) {
  return (
    <div className="lista-gier">
      {gry.map((gra) => (
        <KartaGry key={gra.id} gra={gra} naUsun={naUsun} />
      ))}
    </div>
  );
}

export default ListaGier;
