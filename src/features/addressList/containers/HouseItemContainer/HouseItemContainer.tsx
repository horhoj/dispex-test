import { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { ListItem } from '../../components/ListItem';
import { ListWrapper } from '../../components/ListWrapper';
import { House } from '../../types/House';
import { addressListSlice } from '../../store/addressListSlice';
import { HouseFlatItemContainer } from '../HouseFlatItemContainer';
import { Street } from '../../types/Street';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

interface HouseItemContainerProps {
  house: House;
  street: Street;
}

export function HouseItemContainer({ house, street }: HouseItemContainerProps) {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      dispatch(addressListSlice.thunks.fetchHouseFlatListThunk(house.id));
    } else {
      dispatch(addressListSlice.actions.removeHouseFlatData({ id: house.id }));
    }
  }, [isOpen, dispatch, house.id]);

  const houseFlatList = useAppSelector(
    (state) => state.addressList.houseFlatData[house.id],
  );

  const title = `Дом ${house.name}`;

  return (
    <ListItem>
      <Button onClick={() => setIsOpen((prev) => !prev)} isOpen={isOpen}>
        {title}
      </Button>
      {isOpen && (
        <ListWrapper level={1}>
          {houseFlatList?.map((houseFlat) => (
            <HouseFlatItemContainer
              houseFlat={houseFlat}
              key={houseFlat.id}
              house={house}
              street={street}
            />
          ))}
        </ListWrapper>
      )}
    </ListItem>
  );
}
