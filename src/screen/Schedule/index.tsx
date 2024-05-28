import { FlatList, Text, View } from 'react-native';
import { DefaultContainer } from '../../components/DefaultContainer';
import { Button, Container, Icon, Title } from './styles';
import { ItemsContacts } from '../../components/ItemsContacts';
import { useNavigation } from "@react-navigation/native";
import useFirestoreCollection from '../../hooks/useFirestoreCollection';

export function Schedule() {
  const data = useFirestoreCollection('Contacts');
  const navigation = useNavigation()
  function handleNewContact() {
    navigation.navigate('newcontact')
  }

  return (
    <DefaultContainer showButtonGears title='Contatos' >
      <Container>
    <FlatList
          data={data}
          renderItem={({ item }) => (
            <ItemsContacts
              numero={item.phone}
              title={item.name}
              investor={item.investor}
              resident={item.resident}
              image={item.imageUrl}
            />
          )}
          keyExtractor={(item) => item.id} 
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

