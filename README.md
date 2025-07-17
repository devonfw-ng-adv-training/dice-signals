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


## Development server

To start a local development server, run:

```bash
ng serve
```

