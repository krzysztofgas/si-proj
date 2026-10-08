import { useEffect, useId } from "react";

function Modal({ tytul, zamknij, children }) {
  const idTytulu = useId();

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
    <div className="modal-tlo" onClick={zamknij}>
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
