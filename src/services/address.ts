import request from '@/utils/request.ts';

export interface AddressDTO extends RecordsType {
  id: number;
  recipientName: string;
  recipientPhone: string;
  city: {
    name: string;
    code: number;
  }[];
  address: string;
  label?: string;
}

export default {
  fetchAddresses() {
    return request<AddressDTO[]>('/users/addresses');
  },
  addAddress(address: AddressDTO) {
    return request('/users/addresses', {
      method: 'POST',
      body: address
    });
  },
  modifyAddress(id: number, address: AddressDTO) {
    return request(`/users/addresses/${id}`, {
      method: 'PUT',
      body: address
    });
  },
  removeAddress(id: number) {
    return request(`/users/addresses/${id}`, {
      method: 'DELETE'
    });
  }
};
