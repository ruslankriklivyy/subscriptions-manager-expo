import moment from 'moment';
import firebase from 'firebase/compat';
import Timestamp = firebase.firestore.Timestamp;

import { FORMAT_DATE_PARSE } from '../config/consts';

export const formatDate = (date: Date | Timestamp) => {
  let newDate = date;

  if (date instanceof Timestamp) {
    newDate = date.toDate();
  }

  return moment(newDate).format(FORMAT_DATE_PARSE);
};
