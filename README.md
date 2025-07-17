# Dice

## Execise 02 Signals

### Goal: Setup table with categories below dice
 
As the dice pass values of their current points to the parent component we can use them to calculate the values of the categories.

Steps:

#### CasinoComponent (casino.component.ts)
- Create signals to compute the values for the categories. You can use the dice.util.ts utility functions in order to map from the
cube points to the values of the categories.
- Bonus: do not use the util but write own functions to calculate the categories

#### CasinoComponent Template (casino.component.html):
- Add the signals holding the values of the categories to the corresponding places in the template to display them in the prepared table.


## Development server

To start a local development server, run:

```bash
ng serve
```
