#Game of life

Game of life BE & FE 

## Entities

The BE & FE has entities: 
CellStatus: enum with the values 0, 1; 
Generation: CellStatus 2D matrics; 


### Backend

The BE was created with NestJS. 
on each getNextGeneration request the backend checks the request generation and decides whether its the first generation or not.
after the first generation the MS runs on the 2D matrics and checks each cells according to game of life logic.

### Frontend 

The FE was created with the create-react-app, and RTK was used to pull generations updates.

