function Odznaka({ tekst, wariant }) {
  return <span className={`odznaka odznaka-${wariant}`}>{tekst}</span>;
}

export default Odznaka;
