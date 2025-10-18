# Campo Minato 🟦💣

**Descrizione**

Piccolo gioco a griglia stile “campo minato” (semplificato). L'utente genera una griglia quadrata e clicca le celle. Alcune celle contengono bombe: se le clicchi perdi; altrimenti continui a giocare fino a scoprire tutte le celle sicure.
🌐 [Prova a giocare!](https://michecosa.github.io/js-game/)

<br>
<br>

## 🎯 Obiettivo

* Implementare una griglia di gioco (es. 10x10) con celle numerate progressivamente.
* Generare 16 bombe casuali all'interno del range del gioco (nessun duplicato).
* Gestire click sulla cella: colore azzurro per cella sicura, rosso per bomba.
* Terminare la partita alla scoperta di una bomba o quando tutte le celle sicure sono state scoperte.
* Mostrare in output (console o UI) il punteggio: numero di click su celle sicure.

---

## Uso (flusso utente)

1. L'utente sceglie la difficoltà (opzionale) -> determina il numero massimo (es. 100 per 10x10).
2. L'utente clicca il bottone per generare la griglia.
3. Clic su una cella:

   * Se è una bomba ➜ cella diventa **rossa** e la partita termina.
   * Altrimenti ➜ cella diventa **azzurra** e il gioco continua.
4. Visualizzare il punteggio (numero di celle sicure cliccate) quando la partita termina.

---

## Regole tecniche

* Le celle sono numerate da `1` a `N` (es. `100` per una 10x10).
* Il computer genera **16 numeri unici** (le bombe) nel range della griglia.
* Se l'utente clicca su un numero presente nell'array delle bombe -> game over.
* La partita termina anche se l'utente scopre tutte le celle non-bomba: punteggio massimo = `N - 16`.

---

## Implementazione — passo passo

### 🟢 Prima Parte — generare la griglia

* Cosa serve:

  * Un container (div) per la griglia.
  * Un bottone che genera la griglia al click.
  * Funzione che crea `N` celle con numeri progressivi.
  * Event listener su ogni cella che:

    * colora la cella di azzurro alla prima pressione;
    * stampa in console il numero della cella (`console.log(numero)`);
    * evita doppi click (disabilita la cella o controlla uno stato `revealed`).

> Consiglio pratico: prima `console.log()` ovunque per verificare i flussi e i valori.

### 🟢 Seconda Parte — logica di gioco (bombe)

* Cosa serve:

  * Funzione per generare 16 numeri casuali unici nel range: usare un set o while + controllo `includes`.
  * Array `bombe` che contiene quei 16 numeri.
  * Funzione `handleClick(cellNumber)` che:

    * verifica se `cellNumber` è in `bombe`:

      * Sì → colora la cella di rosso, disabilita ulteriori click, mostra punteggio finale.
      * No → colora azzurro, incrementa `punteggio`, se `punteggio === N - 16` → vittoria.

> Attenzione: assicurati che le bombe siano **uniche** — puoi usare `Set` per sicurezza.

## Suggerimenti & Best practices

* Fai debugging con `console.log()` prima di implementare le validazioni.
* Separare la logica (generazione bombe, controllo click, stato partita) dalla UI rende il codice più leggibile e testabile.
* Validazioni (es. range, doppio click) possono essere aggiunte dopo il prototipo funzionante.
* Usa nomi di variabili chiari: `gridSize`, `totalCells`, `bombs`, `revealedCells`, `isGameOver`.
