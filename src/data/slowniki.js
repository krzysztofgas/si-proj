// Słowniki wartości używane w wielu miejscach aplikacji
// (panel narzędzi, formularz, karta gry). Trzymamy je w jednym pliku,
// żeby dodanie nowej kategorii wymagało zmiany tylko tutaj.
// "wartosc" – to, co zapisujemy w danych; "etykieta" – to, co widzi użytkownik.

export const KATEGORIE = [
  { wartosc: "strategiczna", etykieta: "Strategiczna" },
  { wartosc: "rodzinna", etykieta: "Rodzinna" },
  { wartosc: "kooperacyjna", etykieta: "Kooperacyjna" },
  { wartosc: "imprezowa", etykieta: "Imprezowa" },
  { wartosc: "karciana", etykieta: "Karciana" },
];

export const POZIOMY_TRUDNOSCI = [
  { wartosc: "latwy", etykieta: "Łatwy" },
  { wartosc: "sredni", etykieta: "Średni" },
  { wartosc: "trudny", etykieta: "Trudny" },
];

// Pola, po których można sortować listę gier.
export const POLA_SORTOWANIA = [
  { wartosc: "tytul", etykieta: "Sortuj po tytule" },
  { wartosc: "ocena", etykieta: "Sortuj po ocenie" },
  { wartosc: "rok", etykieta: "Sortuj po roku" },
];
