import { initializeApp } from 'firebase/app';
import {
  CollectionReference,
  DocumentReference,
  collection,
  doc,
  getFirestore,
} from 'firebase/firestore';

import creds from '~/utils/firebase/config';

const firebaseApp = initializeApp(creds);

const database = getFirestore(firebaseApp);

const db_dev = 'autisync/development';

export interface ICollection {
  ref: CollectionReference;
  string: string;
}

interface ICompanyInfo {
  ref: DocumentReference;
  string: string;
}

interface ICollections {
  companyInfo: ICompanyInfo;
  rooms: ICollection;
  activities: ICollection;
  users: ICollection;
}

export const collections: ICollections = {
  companyInfo: {
    ref: doc(database, `${db_dev}`),
    string: 'test',
  },
  rooms: {
    ref: collection(database, `${db_dev}/rooms`),
    string: `${db_dev}/rooms`,
  },
  activities: {
    ref: collection(database, `${db_dev}/lessons`),
    string: `${db_dev}/lessons`,
  },
  users: {
    ref: collection(database, `${db_dev}/users`),
    string: `${db_dev}/users`,
  },
};
