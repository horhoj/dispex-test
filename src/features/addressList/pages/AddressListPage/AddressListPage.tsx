import { useEffect } from 'react';
import { Content } from '../../components/Content';
import { Flex } from '../../components/Flex';
import { Left } from '../../components/Left';
import { ListOfPeopleInFlatContainer } from '../../containers/ListOfPeopleInFlatContainer';
import { StreetListContainer } from '../../containers/StreetListContainer';
import {
  addressListErrorSelector,
  addressListSlice,
} from '../../store/addressListSlice';
import { FlatFullAddressContainer } from '../../containers/FlatFullAddressContainer';
import { DefaultLayout } from '~/ui/DefaultLayout';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

export function AddressListPage() {
  const dispatch = useAppDispatch();
  useEffect(
    () => () => {
      dispatch(addressListSlice.actions.clear());
    },
    [],
  );

  const isRequestError = useAppSelector(addressListErrorSelector);

  useEffect(() => {
    if (isRequestError) {
      alert('Ошибка взаимодействия с сервером приложения');
    }
  }, [isRequestError]);

  return (
    <DefaultLayout>
      <Flex>
        <Left>
          <StreetListContainer />
        </Left>
        <Content>
          <FlatFullAddressContainer />
          <ListOfPeopleInFlatContainer />
        </Content>
      </Flex>
    </DefaultLayout>
  );
}
