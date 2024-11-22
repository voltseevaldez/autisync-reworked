import {
  CollectionReference,
  DocumentReference,
  DocumentSnapshot,
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import type { WhereFilterOp } from 'firebase/firestore';

import { NewItem } from '~/types';
import { database } from '~/utils';
// import { useEffect, useState } from "react";

export interface ISetDocProps<T> {
  docRef: string | DocumentReference;
  data: Partial<T>;
}

export interface IAddDocProps<T> {
  collectionRef: string | CollectionReference;
  data: NewItem<T>;
}

export interface IGetOneDocumentProps {
  docRef: DocumentReference | string;
}

export interface ICollectionWithQueryProps {
  collectionRef: string | CollectionReference;
  queryParams: {
    key: string;
    operator: WhereFilterOp;
    searchValue: any;
  };
}

export const SetDocument: <T>(params: ISetDocProps<T>) => any = async ({
  docRef,
  data,
}) => {
  try {
    // Create a copy of the data object without the 'doc' property
    const { doc: _, ...dataWithoutDoc } = data as any;

    // Get the existing document data
    const documentRef =
      typeof docRef === 'string' ? doc(database, docRef) : docRef;
    const existingDoc = await getDoc(documentRef);

    // Merge existing data with new data
    const mergedData = existingDoc.exists()
      ? { ...existingDoc.data(), ...dataWithoutDoc }
      : dataWithoutDoc;

    // Set the document with the merged data
    const document = await setDoc(documentRef, mergedData);
    return document;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const AddDocument: <T>(params: IAddDocProps<T>) => any = async ({
  collectionRef,
  data,
}) => {
  try {
    const docRef = await addDoc(
      typeof collectionRef === 'string'
        ? collection(database, collectionRef)
        : collectionRef,
      {
        ...data,
        createdAt: new Date().toISOString(),
      }
    );
    return docRef;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getCollectionWithQuery: (
  params: ICollectionWithQueryProps
) => any = async ({ collectionRef: _a, queryParams: _b }) => {
  try {
    // const { key, operator, searchValue } = queryParams;
    // const q = query(collectionRef, where(key, operator, searchValue));
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const Get = async <T,>({
  docRef,
}: {
  docRef: DocumentReference | string;
}) => {
  try {
    const snap: DocumentSnapshot = await getDoc(
      typeof docRef === 'string' ? doc(database, docRef) : docRef
    );

    return snap.data() as T;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default SetDocument;
