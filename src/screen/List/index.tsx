import React from 'react';
import { FlatList } from 'react-native';
import { DefaultContainer } from '../../components/DefaultContainer';
import { Button, Container, Icon, Title } from './styles';
import { ItemsList } from '../../components/ItemsList';
import useFirestoreCollection from '../../hooks/useFirestoreCollection';
import { useUserAuth } from '../../hooks/useUserAuth';

export function List() {
  const data = useFirestoreCollection('Immobile');
  const user = useUserAuth();
  const uid = user?.uid;
  
  return (
    <DefaultContainer showButtonGears title='Lista de Imóveis'>
      <Container>
        <FlatList
         data={data.filter((item) => item.uid === uid)}
          renderItem={({ item }) => (
            <ItemsList
              title={item.name}
              sale={item.sale}
              rent={item.rent}
              value={item.valueImmobile}
              image={item.imageUrls ? item.imageUrls[0] : null}
            />
          )}
          keyExtractor={(item) => item.id} 
            ListEmptyComponent={
            <Title>
               você ainda não possui imoveis lançados,
               comece adicionando um imovel
            </Title>
          }
        />
        <Button>
          <Icon name='search'/>
        </Button>
      </Container>
    </DefaultContainer>
  );
}
