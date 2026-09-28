import KartaGry from "./KartaGry.jsx";

function ListaGier({ gry }) {
  return (
    <div className="lista-gier">
      {gry.map((gra) => (
        <KartaGry key={gra.id} gra={gra} />
      ))}
    </div>
  );
}

export default ListaGier;
