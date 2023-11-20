import { useEffect } from 'react';
import { addressListSlice } from '../../store/addressListSlice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

export function ListOfPeopleInFlatContainer() {
  const dispatch = useAppDispatch();
  const currentFlat = useAppSelector((state) => state.addressList.currentFlat);

  const clientListRequest = useAppSelector(
    (state) => state.addressList.fetchClientListRequest,
  );

  useEffect(() => {
    return () => {
      dispatch(
        addressListSlice.actions.setCurrentFlatId({ currentFlat: null }),
      );
    };
  }, []);

  useEffect(() => {
    if (currentFlat !== null) {
      dispatch(
        addressListSlice.thunks.fetchClientListThunk(currentFlat.houseFlat.id),
      );
    }
  }, [currentFlat]);

  if (currentFlat === null) {
    return <div>Выберите квартиру из списка</div>;
  }

  const address = `Улица ${currentFlat.street.name}, Дом ${currentFlat.house.name}, Квартира ${currentFlat.houseFlat.name}`;

  return (
    <div>
      <div>{address}</div>
      <pre>{JSON.stringify(clientListRequest.data, null, 2)}</pre>
    </div>
  );
}
