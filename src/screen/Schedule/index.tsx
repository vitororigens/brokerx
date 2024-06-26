import { FlatList, Text, View } from 'react-native';
import { DefaultContainer } from '../../components/DefaultContainer';
import { Button, Container, Icon, Title } from './styles';
import { ItemsContacts } from '../../components/ItemsContacts';
import { useNavigation } from "@react-navigation/native";
import useFirestoreCollection from '../../hooks/useFirestoreCollection';
import { useUserAuth } from '../../hooks/useUserAuth';

export function Schedule() {
  const user = useUserAuth();
  const uid = user?.uid;
  const data = useFirestoreCollection('Contacts');
  const navigation = useNavigation()
  function handleNewContact() {
    navigation.navigate('newcontact')
  }

  return (
    <DefaultContainer showButtonGears title='Contatos' >
      <Container>
    <FlatList
        data={data.filter((item) => item.uid === uid)}
          renderItem={({ item }) => (
            <ItemsContacts
              numero={item.phone}
              title={item.name}
              investor={item.investor}
              resident={item.resident}
              image={item.imageUrl}
              showButton
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
        
        <Button
          onPress={handleNewContact}
        >
          <Icon name='plus' />
        </Button>
      </Container>
    </DefaultContainer>
  );
}

