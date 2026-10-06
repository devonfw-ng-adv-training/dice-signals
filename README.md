# Dice

## Execise 01 RxJS

### Goal: Setup Casino and Cube components with RxJS

In the app we have two component types: a casino component, that holds the application state
and a cube component that represents a single cube that can generate and display a random number.

The casino component contains five cube components and a "Roll" button that makes all cube components generate their next number.

Steps:

#### CubeComponent (cube.component.ts, see Todo lines):

- Implement @Input() variables for throwNo and cubeNumber
- Implement BehaviorSubject for current points
- Implement an @Output() output that is triggered on change of current points
- Implement function onSelectionChange() that is called on change of current points / change of option in select box.

#### CubeComponent Template (cube.component.html, see given hint):

- Connect currentPoints observable with async pipe
- Connect ngModelChange with onSelectionChange() function

#### CasinoComponent Template (casino.component.html):

- Add the input and output parameters to the cube components in the template in oder to pass values to the inputs
  defined above and to call the correspondent handler function for the output.

## Execise 02 RxJS

Please note: you can either continue with exercise 02 here on your results of exercise 01, or you check out the prepared branch "exercise-02-rxjs"

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
