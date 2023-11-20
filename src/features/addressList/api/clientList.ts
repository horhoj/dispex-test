import { Client } from '../types/Client';
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

export const clientsApi = { fetchClientList } as const;
