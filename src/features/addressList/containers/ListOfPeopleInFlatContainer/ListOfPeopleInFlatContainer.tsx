import { useEffect, useState } from 'react';
import { addressListSlice } from '../../store/addressListSlice';
import { ContentWrapper } from '../../components/ContentWrapper';
import { ClientCard } from '../../components/ClientCard';
import { Button } from '../../components/Button';
import { AddClientContainer } from '../AddClientContainer';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { Modal } from '~/ui/Modal';
import { ModalContent } from '~/ui/ModalContent';

export function ListOfPeopleInFlatContainer() {
  const dispatch = useAppDispatch();
  const currentFlat = useAppSelector((state) => state.addressList.currentFlat);
  const [isShowAddClientForm, setIsShowAddClientForm] = useState(false);

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

  const handleEdit = (id: number) => {
    console.log('edit', id);
  };

  const handleDelete = (id: number) => {
    console.log('delete', id);
    if (!confirm('Удалить')) {
      return;
    }

    dispatch(
      addressListSlice.thunks.deleteClientThunk({
        addressId: currentFlat.houseFlat.id,
        clientId: id,
      }),
    );
  };

  return (
    <>
      <Modal
        isOpen={isShowAddClientForm}
        onClose={() => setIsShowAddClientForm(false)}
      >
        <ModalContent>
          <AddClientContainer
            houseFlatId={currentFlat.houseFlat.id}
            onClose={() => setIsShowAddClientForm(false)}
          />
        </ModalContent>
      </Modal>
      <Button isFitContent={true} onClick={() => setIsShowAddClientForm(true)}>
        Добавить жильца
      </Button>
      <ContentWrapper>
        {clientListRequest.data?.map((client) => (
          <ClientCard
            client={client}
            key={client.id}
            onDelete={() => handleDelete(client.bindId)}
          />
        ))}
        {clientListRequest.data?.length === 0 && (
          <>В данной квартире нет жильцов</>
        )}
      </ContentWrapper>
    </>
  );
}
