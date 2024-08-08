import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList } from 'react-native';
import { DefaultContainer } from '../../components/DefaultContainer';
import { ItemsList } from '../../components/ItemsList';
import useFirestoreCollection from '../../hooks/useFirestoreCollection';
import { useUserAuth } from '../../hooks/useUserAuth';
import { Container, Content, Title } from './styles';

export function Favorite() {
  const data = useFirestoreCollection('Immobile');
  const user = useUserAuth();
  const uid = user?.uid;
  const registerData = useFirestoreCollection("Register").find((item) => item.id === uid);
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
            data={data.filter((item) => registerData?.favorites.includes(item.id))}
            renderItem={({ item  }) => (
              <ItemsList
                id={item.id}
                title={item.name}
                sale={item.sale}
                rent={item.rent}
                value={item.valueImmobile}
                // @ts-ignore
                image={item.imageUrls ? item.imageUrls[0] : null}
                onEdit={() => handleEditItem(item.id)}
                onCard={() => handleCardItem(item.id)}
                isFavorite={item.isFavorite}
              />
            )}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={
              <Title>
                você ainda não possui imóveis lançados,
                comece adicionando um imóvel
              </Title>
            }
          />
        </Content>
      </Container>
    </DefaultContainer>
  );
}
