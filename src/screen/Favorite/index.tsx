import React from 'react';
import { FlatList, View } from 'react-native';
import { DefaultContainer } from '../../components/DefaultContainer';
import { Button, Container, Content, Icon, Title } from './styles';
import { ItemsList } from '../../components/ItemsList';
import useFirestoreCollection from '../../hooks/useFirestoreCollection';
import { useUserAuth } from '../../hooks/useUserAuth';
import { useNavigation } from '@react-navigation/native';
import { Input } from '../../components/Input';

export function Favorite() {
  const data = useFirestoreCollection('Immobile');
  const user = useUserAuth();
  const uid = user?.uid;
  const navigation = useNavigation();


  function handleEditItem(documentId: string) {
    navigation.navigate('immobile', { selectedItemId: documentId });
  }

  function handleCardItem(documentId: string) {
    navigation.navigate('cardimmobile', { selectedItemId: documentId });
  }

  return (
    <DefaultContainer showButtonBack  title='Anúncios salvos'>
      <Container>
        <Content>
          <FlatList
            data={data.filter((item) => item.isFavorite === true)}
            renderItem={({ item  }) => (
              <ItemsList
                id={item.id}
                title={item.name}
                sale={item.sale}
                rent={item.rent}
                value={item.valueImmobile}
                image={item.imageUrls ? item.imageUrls[0] : null}
                onEdit={() => handleEditItem(item.id)}
                onCard={() => handleCardItem(item.id)}
                isFavorite={item.isFavorite}
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
        </Content>
      </Container>
    </DefaultContainer>
  );
}
