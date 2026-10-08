function Paginacja({ aktualnaStrona, liczbaStron, naZmianeStrony }) {
  if (liczbaStron <= 1) {
    return null;
  }

  const numeryStron = [];
  for (let numer = 1; numer <= liczbaStron; numer++) {
    numeryStron.push(numer);
  }

  return (
    <nav className="paginacja" aria-label="Paginacja">
      <button
        type="button"
        onClick={() => naZmianeStrony(aktualnaStrona - 1)}
        disabled={aktualnaStrona === 1}
      >
        ‹ Poprzednia
      </button>

      {numeryStron.map((numer) => (
        <button
          key={numer}
          type="button"
          className={numer === aktualnaStrona ? "strona-aktywna" : ""}
          aria-current={numer === aktualnaStrona ? "page" : undefined}
          onClick={() => naZmianeStrony(numer)}
        >
          {numer}
        </button>
      ))}

      <button
        type="button"
        onClick={() => naZmianeStrony(aktualnaStrona + 1)}
        disabled={aktualnaStrona === liczbaStron}
      >
        Następna ›
      </button>
    </nav>
  );
}

export default Paginacja;
