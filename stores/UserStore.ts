import { createEffect, createEvent, createStore } from 'effector';

import { IUser } from '../types/entities/User';
import UserService from '../services/UserService';

export const setUser = createEvent<IUser>();
export const fetchOneUserFx = createEffect(async (id: string) => {
  return await UserService.getOne(id);
});

export const $user = createStore(null)
  .on(setUser, (state, payload) => payload)
  .on(fetchOneUserFx.doneData, (_, repos) => repos);
