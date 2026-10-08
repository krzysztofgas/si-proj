import { useEffect, useId } from "react";

// Uniwersalne okno modalne. Nie wie nic o grach – wyświetla dowolną
// zawartość przekazaną między <Modal> a </Modal> (prop "children").
// Dzięki temu używamy go w kilku kontekstach: potwierdzenie usunięcia,
// dodawanie gry i edycja gry.
function Modal({ tytul, zamknij, children }) {
  // Unikalne id nagłówka – czytnik ekranu odczyta je jako nazwę okna.
  const idTytulu = useId();

  // Zamykanie klawiszem Escape. Nasłuchiwacz dodajemy po otwarciu modala,
  // a funkcja zwrócona z useEffect usuwa go przy zamknięciu (sprzątanie).
  useEffect(() => {
    function obsluzKlawisz(zdarzenie) {
      if (zdarzenie.key === "Escape") {
        zamknij();
      }
    }

    document.addEventListener("keydown", obsluzKlawisz);
    return () => document.removeEventListener("keydown", obsluzKlawisz);
  }, [zamknij]);

  return (
    // Kliknięcie w przyciemnione tło zamyka modal...
    <div className="modal-tlo" onClick={zamknij}>
      {/* ...ale kliknięcie wewnątrz okna nie – stopPropagation zatrzymuje
          "bąbelkowanie" zdarzenia do tła. */}
      <div
        className="modal-okno"
        role="dialog"
        aria-modal="true"
        aria-labelledby={idTytulu}
        onClick={(zdarzenie) => zdarzenie.stopPropagation()}
      >
        <div className="modal-naglowek">
          <h2 id={idTytulu}>{tytul}</h2>
          <button
            type="button"
            className="modal-zamknij"
            onClick={zamknij}
            aria-label="Zamknij okno"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
