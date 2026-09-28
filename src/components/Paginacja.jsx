function Paginacja({ aktualnaStrona, liczbaStron, naZmianeStrony }) {
  const numeryStron = [];
  for (let numer = 1; numer <= liczbaStron; numer++) {
    numeryStron.push(numer);
  }

  return (
    <div className="paginacja">
      {numeryStron.map((numer) => (
        <button
          key={numer}
          type="button"
          className={numer === aktualnaStrona ? "strona-aktywna" : ""}
          onClick={() => naZmianeStrony(numer)}
        >
          {numer}
        </button>
      ))}
    </div>
  );
}

export default Paginacja;
