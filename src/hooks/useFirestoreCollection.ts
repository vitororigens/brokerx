import { useState, useEffect } from 'react';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'; 
import { database } from '../services';

export interface FirebaseFirestoreTypes {
  id: string;
  uid: string;
  name: string;
  phone: string;
  realEstate: string;
  creci: string;
  investor: boolean;
  resident: boolean;
  imageUrl: string;
  imageUrls: string;
  date: string;
  hours: string;
  notes: string;
  nameNotes: string;
  selectedCategory: string;
  sale: boolean;
  rent: boolean;
  valueImmobile: string;

}


const useFirestoreCollection = (
  collectionName: string 
): FirebaseFirestoreTypes[] => {
  const [data, setData] = useState<FirebaseFirestoreTypes[]>([]);

  useEffect(() => {
    const unsubscribe = database.collection(collectionName).onSnapshot(
      (snapshot: FirebaseFirestoreTypes.QuerySnapshot) => {
        const collectionData: FirebaseFirestoreTypes[] = [];
        snapshot.forEach(doc => {
          collectionData.push({ id: doc.id, ...doc.data() } as FirebaseFirestoreTypes);
        });
        setData(collectionData);
      }
    );

    return () => unsubscribe();
  }, [collectionName]);

  return data;
};

export default useFirestoreCollection;
