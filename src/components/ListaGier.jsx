import KartaGry from "./KartaGry.jsx";

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
