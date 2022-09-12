import http from 'services/http';

import { Sample } from './types';

export const usersService = () => http.get<BaseAPIResponse<Array<Sample>>>(`/users`);
