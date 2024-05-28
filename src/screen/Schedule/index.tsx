import { Text, View } from 'react-native';
import { DefaultContainer } from '../../components/DefaultContainer';
import { Button, Container, Icon, Title } from './styles';
import { ItemsContacts } from '../../components/ItemsContacts';
import { useNavigation } from "@react-navigation/native";

export function Schedule() {
  const navigation = useNavigation()
  function handleNewContact() {
    navigation.navigate('newcontact')
  }

  return (
    <DefaultContainer showButtonGears title='Contatos' >
      <Container>
        <ItemsContacts resident='M' title='Nome do cliente' numero='(66) 9 9999-9999' />
        <ItemsContacts resident='M' investor='I' title='Nome do cliente' numero='(66) 9 9999-9999' />
        <Button
          onPress={handleNewContact}
        >
          <Icon name='plus' />
        </Button>
      </Container>
    </DefaultContainer>
  );
}

