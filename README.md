# Dice

## Execise 01 Signals

### Goal: Setup Casino and Cube components with signals

In the app we have two component types: a casino component, that holds the application state
and a cube component that represents a single cube that can generate and display a random number.

The casino component contains five cube components and a "Roll" button that makes all cube components generate their next number.

Steps:

#### CubeComponent (cube.component.ts, see Todo lines):

- Implement input signals
- Implement a signal for current points
- Implement a computed signal that holds the current icon url
- Implement output that is triggered on change of current points
- Implement effects

#### CubeComponent Template (cube.component.html, see given hint):

- Connect currentPoints signal to select input element

#### CasinoComponent Template (casino.component.html):

- Add the input and output parameters to the cube components in the template in oder to pass values to the input signals
  defined above and to call the correspondent handler function for the output.

## Development server

To start a local development server, run:

```bash
ng serve
```
