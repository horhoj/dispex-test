import { AddClientData, Client } from '../types/Client';
import { axiosInstance } from '~/api/apiTransport';

const fetchClientList = async (addressId: number) => {
  const res = await axiosInstance.request<Client[]>({
    url: `/HousingStock/clients`,
    params: {
      addressId,
    },
  });

  return Array.isArray(res.data) ? res.data : [];
};

const deleteClient = async (id: number) => {
  await axiosInstance.delete(`/HousingStock/bind_client/${id}`);
};

const addClient = async (addClientData: AddClientData, addressId: number) => {
  const res = await axiosInstance.request<{ id: number; result: string }>({
    url: '/HousingStock/client/',
    method: 'post',
    data: addClientData,
  });

  await axiosInstance.request({
    url: '/HousingStock/bind_client',
    method: 'put',
    data: {
      AddressId: addressId,
      ClientId: res.data.id,
    },
  });
};

export const clientsApi = { fetchClientList, deleteClient, addClient } as const;
