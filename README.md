# Dice

## Execise 02 RxJS

### Goal: Setup table with categories below dice

As the dice pass values of their current points to the parent component we can use them to calculate the values of the categories.

Steps:

#### CasinoComponent (casino.component.ts)
- Create observables to compute the values for the categories inside the class. You can use the dice.util.ts utility functions in order to map from the
  cube points to the values of the categories.
- Bonus: do not use the util but write own functions to calculate the categories
- In ngOnInit() implement the calculations for the categories

#### CasinoComponent Template (casino.component.html):
- Add the observables emitting the values of the categories to the corresponding places in the template 
to display them in the prepared table. Use the async pipe.


## Development server

To start a local development server, run:

```bash
ng serve
```
