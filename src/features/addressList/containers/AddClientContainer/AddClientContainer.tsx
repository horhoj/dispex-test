import { ClientForm } from '../../components/ClientForm';
import { addressListSlice } from '../../store/addressListSlice';
import { AddClientData } from '../../types/Client';
import { useAppDispatch } from '~/store/hooks';

interface AddClientContainerProps {
  houseFlatId: number;
  onClose: () => void;
}

const initialValues: AddClientData = {
  name: '',
  email: '',
  phone: '',
};

export function AddClientContainer({
  houseFlatId,
  onClose,
}: AddClientContainerProps) {
  const dispatch = useAppDispatch();
  const handleSubmit = (values: AddClientData) => {
    dispatch(
      addressListSlice.thunks.addClientThunk({
        addressId: houseFlatId,
        clientData: values,
        successCb: onClose,
      }),
    );
  };

  return (
    <ClientForm
      initialValues={initialValues}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}
