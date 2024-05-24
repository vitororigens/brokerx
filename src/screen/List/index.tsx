import { Text, View } from 'react-native';
import { DefaultContainer } from '../../components/DefaultContainer';
import { Button, Container, Icon, Title } from './styles';
import { ItemsContacts } from '../../components/ItemsContacts';
import { ItemsList } from '../../components/ItemsList';

export function List() {
  return (
    <DefaultContainer title='Lista de Imóveis' >
        <Container>
          <ItemsList title='Nome do Imóvel' sale='V' value='R$: 000.000,00'/>
          <ItemsList title='Nome do Imóvel' rent='A' value='R$: 000.000,00'/>
          <ItemsList title='Nome do Imóvel' sale='V' rent='A' value='R$: 000.000,00'/>
          <ItemsList title='Nome do Imóvel' sale='V' rent='A' value='R$: 000.000,00'/>
          <Button>
            <Icon name='search'/>
          </Button>
        </Container>
    </DefaultContainer>
  );
}

