# Refactor
## Todo

### Javascript
###### Variablen
* konsistentes variablen naming question_and_answers vs queryData

###### Files
* quiz.js: zu hohe Komplexität -> in klare Funktionen aufteilen
  * init
  * setupQuestion
  * randomizeQuestions
* end.js: sehr viel Verschachtelung
  * Funktionen mit sideEffects: existierenden Code zu verändern schwierig
* profile.js: nested ifs vermeiden
  * Funktionen auslagern -> playerWon(), challengeActive(), checkChallenger()
  * Diagram der Logik zu zeichnen kann helfen Abstraktion zu schaffen

###### Allgemein
* console.log entfernen
* alte Kommentare löschen!

### CSS
* global.scss -> nicht nested
* login_end -> sehr viel nesting!
* naming BEM -> klar lesbares naming: 
  * .end__div--challenge form -> final__form
    * -- steht für modifier

### General
remove code cuplications, find them with `npx jscpd src`

## Done
