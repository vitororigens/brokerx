import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { database } from '../services';

export interface FirebaseFirestoreTypes {
  id: string;
  name: string;
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
  address: string;
  brokerFee: string;
  cep: string;
  city: string;
  commission: string;
  constructionArea: string;
  financing: boolean;
  furniture: boolean;
  gourmet: boolean;
  grill: boolean;
  number: string;
  numberBedrooms: string;
  numberRooms: string;
  numberSuites: string;
  numberVacancies: string;
  numberbathrooms: string;
  observations: string;
  owner: string;
  phone: string;
  pool: boolean;
  positionSun: string;
  registration: string;
  rent: boolean;
  sale: boolean;
  selectedCategory: string;
  situation: boolean;
  state: string;
  totalArea: string;
  uid: string;
  valueImmobile: string;
  valueIptu: string;
  valueRent: string;
  visible: boolean;
  security: boolean;
  balcony: boolean;
  serviceArea: boolean;
  bathtub: boolean;
  partyHall: boolean;
  elevator: boolean;
  garage: boolean;
  written: boolean;
  endorsed: boolean;
  garden: boolean;
  selectPropertyType: string;
  selectSituation: string;
  startConstruction: string;
  endConstruction: string;
  isFavorite: boolean;
  favorites: string[]
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
