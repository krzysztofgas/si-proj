import KartaGry from "./KartaGry.jsx";

function ListaGier({ gry, naEdytuj, naUsun }) {
  return (
    <div className="lista-gier">
      {gry.map((gra) => (
        <KartaGry key={gra.id} gra={gra} naEdytuj={naEdytuj} naUsun={naUsun} />
      ))}
    </div>
  );
}

export default ListaGier;
