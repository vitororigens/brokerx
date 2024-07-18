import React from 'react';
import { FlatList, View } from 'react-native';
import { DefaultContainer } from '../../components/DefaultContainer';
import { Button, Container, Content, Icon, Title } from './styles';
import { ItemsList } from '../../components/ItemsList';
import useFirestoreCollection from '../../hooks/useFirestoreCollection';
import { useUserAuth } from '../../hooks/useUserAuth';
import { useNavigation } from '@react-navigation/native';
import { Input } from '../../components/Input';

export function List() {
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
    <DefaultContainer showButtonGears title='Lista de Imóveis'>
      <Container>
        <Content>
          <View style={{
            flexDirection: 'row',
            width:'100%',
            alignItems:'center',
            justifyContent:'space-between'
          }}>
            <View style={{
              flex: 1,
              marginRight: 10
            }}>
            <Input name='search' placeholder='Pesquisar' value=''/> 
            </View>
            <Icon name='filter'/>
          </View>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <ItemsList
                id={item.id}
                title={item.name}
                sale={item.sale}
                rent={item.rent}
                value={item.valueImmobile}
                image={item.imageUrls ? item.imageUrls[0] : null}
                onEdit={() => handleEditItem(item.id)}
                onCard={() => handleCardItem(item.id)}
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
