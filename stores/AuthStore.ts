import { createStore } from 'effector';
import { createEffect } from 'effector/compat';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../config/firebase';
import UserService from '../services/UserService';

export const signInFx = createEffect(async (payload) => {
  try {
    await signInWithEmailAndPassword(auth, payload.email, payload.password);
  } catch (error) {
    console.log(error);
  }
});

export const signUpFx = createEffect(async (payload) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, payload.email, payload.password);
    await UserService.create(user);
  } catch (error) {
    console.log(error);
  }
});

export const $isAuth = createStore(false)
  .on(signInFx.doneData, () => true)
  .on(signUpFx.doneData, () => true);
