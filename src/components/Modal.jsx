function Modal({ dzieci, zamknij }) {
  return (
    <div className="modal-tlo" onClick={zamknij}>
      <div className="modal-okno" onClick={(zdarzenie) => zdarzenie.stopPropagation()}>
        <button type="button" className="modal-zamknij" onClick={zamknij}>
          X
        </button>
        {dzieci}
      </div>
    </div>
  );
}

export default Modal;
