import { createAsyncThunk } from '@reduxjs/toolkit';

import { usersService } from 'services/Sample';

export const getUsersAction = createAsyncThunk('users', async () => {
  const res = await usersService();
  return res.data.data;
});
