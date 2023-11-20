import { Street } from '../types/Street';
import { axiosInstance } from '~/api/apiTransport';

const fetchStreetList = async () => {
  const res = await axiosInstance.request<Street[]>({
    url: '/Request/streets',
  });

  return res.data;
};

export const streetApi = { fetchStreetList } as const;
