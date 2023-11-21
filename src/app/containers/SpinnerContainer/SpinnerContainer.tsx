import { addressListLoadingSelector } from '~/features/addressList/store/addressListSlice';
import { useAppSelector } from '~/store/hooks';
import { Spinner } from '~/ui/Spinner';

export function SpinnerContainer() {
  const isLoading = useAppSelector(addressListLoadingSelector);

  return <Spinner isShow={isLoading} />;
}
