import React from 'react';
import { FlatList } from 'react-native';
import { DefaultContainer } from '../../components/DefaultContainer';
import { Button, Container, Icon } from './styles';
import { ItemsList } from '../../components/ItemsList';
import useFirestoreCollection from '../../hooks/useFirestoreCollection';

export function List() {
  const data = useFirestoreCollection('Immobile');

  return (
    <DefaultContainer showButtonGears title='Lista de Imóveis'>
      <Container>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <ItemsList
              title={item.name}
              sale={item.sale}
              rent={item.rent}
              value={item.valueImmobile}
              image={item.imageUrls ? item.imageUrls[0] : null} // Passa apenas o primeiro URL de imagem
            />
          )}
          keyExtractor={(item) => item.id} 
        />
        <Button>
          <Icon name='search'/>
        </Button>
      </Container>
    </DefaultContainer>
  );
}
