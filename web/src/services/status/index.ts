import { request } from '@umijs/max';

export type StatusItem = {
  mem: number;
  npu: number;
};

export type StatusResponse = {
  data: StatusItem[];
};

export async function getStatus() {
  return request<StatusResponse>('/api/v1/status', {
    method: 'GET',
  });
}
