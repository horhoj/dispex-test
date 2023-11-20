import { House } from './House';
import { HouseFlat } from './HouseFlat';
import { Street } from './Street';

export interface CurrentFlat {
  street: Street;
  house: House;
  houseFlat: HouseFlat;
}
