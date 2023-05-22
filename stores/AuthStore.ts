import { createStore } from 'effector';
import { createEffect } from 'effector/compat';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../config/firebase';
import UserService from '../services/UserService';

export const signInFx = createEffect(async (payload) => {
  await signInWithEmailAndPassword(auth, payload.email, payload.password);
});

export const signUpFx = createEffect(async (payload) => {
  const { user } = await createUserWithEmailAndPassword(auth, payload.email, payload.password);
  await UserService.create({ ...user, avatar: payload?.avatar });
});

export const $isAuth = createStore(false)
  .on(signInFx.doneData, () => true)
  .on(signUpFx.doneData, () => true);
