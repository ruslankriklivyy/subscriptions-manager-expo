import { createEvent, createStore } from 'effector';

import { IModalResult } from '../types/common/ModalResult';

export const setModal = createEvent<IModalResult | null>();

export const $modal = createStore(null).on(setModal, (_, payload) => payload);
