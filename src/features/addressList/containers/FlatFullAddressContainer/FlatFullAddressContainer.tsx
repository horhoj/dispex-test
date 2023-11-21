import { ContentWrapper } from '../../components/ContentWrapper';
import { useAppSelector } from '~/store/hooks';

export function FlatFullAddressContainer() {
  const currentFlat = useAppSelector((state) => state.addressList.currentFlat);

  if (currentFlat === null) {
    return <></>;
  }

  const address = `(${currentFlat.houseFlat.id}) АДРЕС: Улица ${currentFlat.street.name}, Дом ${currentFlat.house.name}, Квартира ${currentFlat.houseFlat.name}`;

  return <ContentWrapper>{address}</ContentWrapper>;
}
