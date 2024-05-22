import { Text, View } from 'react-native';
import { DefaultContainer } from '../../components/DefaultContainer';
import { Button, Container, Icon, Title } from './styles';
import { ItemsContacts } from '../../components/ItemsContacts';

export function Schedule() {
  return (
    <DefaultContainer title='Contatos' >
        <Container>
          <ItemsContacts notes='M' title='Nome do cliente' numero='(66) 9 9999-9999'/>
          <ItemsContacts notes='I' title='Nome do cliente' numero='(66) 9 9999-9999'/>
          <Button>
            <Icon name='plus'/>
          </Button>
        </Container>
    </DefaultContainer>
  );
}

