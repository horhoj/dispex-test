import { useEffect } from 'react';
import { addressListSlice } from '../../store/addressListSlice';
import { ListWrapper } from '../../components/ListWrapper';
import { StreetItemContainer } from '../StreetItemContainer';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

export function StreetListContainer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(addressListSlice.thunks.fetchStreetListThunk());
  }, [dispatch]);

  const fetchListRequest = useAppSelector(
    (state) => state.addressList.fetchStreetListRequest,
  );

  return (
    <ListWrapper level={0}>
      {fetchListRequest.data?.map((street) => (
        <StreetItemContainer street={street} key={street.id} />
      ))}
    </ListWrapper>
  );
}
