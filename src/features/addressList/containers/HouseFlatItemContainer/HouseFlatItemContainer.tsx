import { Button } from '../../components/Button';
import { ListItem } from '../../components/ListItem';
import { addressListSlice } from '../../store/addressListSlice';
import { House } from '../../types/House';
import { HouseFlat } from '../../types/HouseFlat';
import { Street } from '../../types/Street';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

interface HouseFlatItemContainerProps {
  houseFlat: HouseFlat;
  house: House;
  street: Street;
}
export function HouseFlatItemContainer({
  houseFlat,
  house,
  street,
}: HouseFlatItemContainerProps) {
  const dispatch = useAppDispatch();

  const currentFlat = useAppSelector((state) => state.addressList.currentFlat);

  const handleBtnClk = () => {
    dispatch(
      addressListSlice.actions.setCurrentFlatId({
        currentFlat: {
          houseFlat,
          house,
          street,
        },
      }),
    );
  };

  const title = `Квартира ${houseFlat.name}`;
  return (
    <ListItem>
      <Button
        onClick={handleBtnClk}
        isActive={currentFlat?.houseFlat.id === houseFlat.id}
      >
        {title}
      </Button>
    </ListItem>
  );
}
