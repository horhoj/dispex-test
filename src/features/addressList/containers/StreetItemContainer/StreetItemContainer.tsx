import { useEffect, useState } from 'react';
import { ListItem } from '../../components/ListItem';
import { ListWrapper } from '../../components/ListWrapper';
import { Street } from '../../types/Street';
import { addressListSlice } from '../../store/addressListSlice';
import { HouseItemContainer } from '../HouseItemContainer';
import { Button } from '../../components/Button';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

interface StreetItemContainerProps {
  street: Street;
}

export function StreetItemContainer({ street }: StreetItemContainerProps) {
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      dispatch(addressListSlice.thunks.fetchHouseListThunk(street.id));
    } else {
      dispatch(addressListSlice.actions.removeHouseData({ id: street.id }));
    }
  }, [isOpen, dispatch, street.id]);

  const houseList = useAppSelector(
    (state) => state.addressList.houseData[street.id],
  );

  const title = `Улица ${street.name}`;

  return (
    <ListItem>
      <Button onClick={() => setIsOpen((prev) => !prev)} isOpen={isOpen}>
        {title}
      </Button>
      {houseList && (
        <ListWrapper level={1}>
          {houseList.map((house) => (
            <HouseItemContainer house={house} key={house.id} street={street} />
          ))}
        </ListWrapper>
      )}
    </ListItem>
  );
}
