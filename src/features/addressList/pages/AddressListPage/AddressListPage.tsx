import { useEffect } from 'react';
import { Content } from '../../components/Content';
import { Flex } from '../../components/Flex';
import { Left } from '../../components/Left';
import { ListOfPeopleInFlatContainer } from '../../containers/ListOfPeopleInFlatContainer';
import { StreetListContainer } from '../../containers/StreetListContainer';
import { addressListSlice } from '../../store/addressListSlice';
import { DefaultLayout } from '~/ui/DefaultLayout';
import { useAppDispatch } from '~/store/hooks';

export function AddressListPage() {
  const dispatch = useAppDispatch();
  useEffect(
    () => () => {
      dispatch(addressListSlice.actions.clear());
    },
    [],
  );

  return (
    <DefaultLayout>
      <Flex>
        <Left>
          <StreetListContainer />
        </Left>
        <Content>
          <ListOfPeopleInFlatContainer />
        </Content>
      </Flex>
    </DefaultLayout>
  );
}
