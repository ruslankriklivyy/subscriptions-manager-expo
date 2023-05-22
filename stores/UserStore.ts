import { createEffect, createEvent, createStore } from 'effector';

import { IUser } from '../types/entities/User';
import UserService from '../services/UserService';
import { IUserEditFormValues } from '../components/user/UserEditForm';

interface IUpdateUserFx {
  id: string;
  payload: IUserEditFormValues;
}

export const setUser = createEvent<IUser>();

export const updateUserFx = createEffect(async ({ id, payload }: IUpdateUserFx) => {
  return await UserService.update(id, payload);
});
export const fetchOneUserFx = createEffect(async (id: string) => {
  return await UserService.getOne(id);
});

export const $user = createStore(null)
  .on(setUser, (state, payload) => payload)
  .on(fetchOneUserFx.doneData, (_, repos) => repos)
  .on(updateUserFx.doneData, (_, repos) => repos);
