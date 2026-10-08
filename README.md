# Kolekcja planszówek

Aplikacja CRUD w czystym Reactcie (bez zewnętrznych bibliotek) do zarządzania grami planszowymi.

## Uruchomienie

```bash
npm install
npm run dev
```

Aplikacja odpala się pod adresem `http://localhost:5173`.

- `npm run build` – budowanie projektu
- `npm run lint` – sprawdzanie kodu linterem

## Struktura komponentów

- `App` – główny komponent ze stanem gier, filtrów i modali
  - `PanelNarzedzi` – szukanie po tytule, filtrowanie kategorią i sortowanie
  - `ListaGier` – lista kart gier
    - `KartaGry` – pojedyncza gra z danymi oraz przyciskami Edytuj i Usuń
      - `Odznaka` – etykietka pokazująca trudność i posiadanie gry
  - `Paginacja` – paginacja (max 5 gier na stronę, przyciski poprzednia/następna)
  - `PustaLista` – komunikat, gdy nic nie pasuje do filtrów + reset
  - `Modal` – wspólne okno modalne (użyte do usuwania oraz formularza)
    - `FormularzGry` – ten sam formularz do dodawania i edycji (obsługuje input tekstowy, select, radio, checkbox, liczby i walidację)

## Schemat danych

Początkowe gry są w `src/data/poczatkoweGry.js`:

| Pole        | Typ     | Przykład         |
| ----------- | ------- | ---------------- |
| `id`        | number  | `1`              |
| `tytul`     | string  | `"Katan"`        |
| `kategoria` | string  | `"strategiczna"` |
| `trudnosc`  | string  | `"sredni"`       |
| `posiadana` | boolean | `true`           |
| `ocena`     | number  | `8`              |
| `minGraczy` | number  | `3`              |
| `maxGraczy` | number  | `4`              |
| `rok`       | number  | `1995`           |
