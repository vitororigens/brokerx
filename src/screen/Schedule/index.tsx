import { FlatList, Text, View } from 'react-native';
import { DefaultContainer } from '../../components/DefaultContainer';
import { Button, Container, Icon, Title } from './styles';
import { ItemsContacts } from '../../components/ItemsContacts';
import { useNavigation } from "@react-navigation/native";
import useFirestoreCollection from '../../hooks/useFirestoreCollection';
import { useUserAuth } from '../../hooks/useUserAuth';
import { useEffect, useState } from 'react';

export function Schedule() {
  const user = useUserAuth();
  const uid = user?.uid;
  const data = useFirestoreCollection('Contacts');
  const navigation = useNavigation();
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  function handleNewContact() {
    navigation.navigate('newcontact', { selectedItemId: undefined });
  }

  function handleEditItem(documentId: string) {
    navigation.navigate('newcontact', { selectedItemId: documentId });
  }

  useEffect(() => {
    if (selectedItemId) {
      navigation.navigate('newcontact', { selectedItemId });
    }
  }, [selectedItemId]);

  return (
    <DefaultContainer showButtonGears title='Contatos'>
      <Container>
        <FlatList
          data={data.filter((item) => item.uid === uid)}
          renderItem={({ item }) => (
            <ItemsContacts
              id={item.id}
              numero={item.phone}
              title={item.name}
              investor={item.investor}
              resident={item.resident}
              image={item.imageUrl}
              showButton
              onEdit={() => handleEditItem(item.id)}
            />
          )}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <Title>
              você ainda não tem contatos lançados,
              comece adicionando um contato
            </Title>
          }
        />

        <Button onPress={handleNewContact}>
          <Icon name='plus' />
        </Button>
      </Container>
    </DefaultContainer>
  );
}
