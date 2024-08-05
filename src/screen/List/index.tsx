import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, View } from "react-native";
import { DefaultContainer } from "../../components/DefaultContainer";
import { Input } from "../../components/Input";
import { ItemsList } from "../../components/ItemsList";
import useFirestoreCollection from "../../hooks/useFirestoreCollection";
import { useUserAuth } from "../../hooks/useUserAuth";
import { Container, Content, Icon, Title } from "./styles";

export function List() {
  const data = useFirestoreCollection("Immobile");
  const user = useUserAuth();
  const uid = user?.uid;
  const navigation = useNavigation();

  const loading = !data;

  function handleEditItem(documentId: string) {
    navigation.navigate("immobile", { selectedItemId: documentId });
  }

  function handleCardItem(documentId: string) {
    navigation.navigate("cardimmobile", { selectedItemId: documentId });
  }

  return (
    <DefaultContainer showButtonGears title="Lista de Imóveis">
      <Container>
        <Content>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flex: 1,
                marginRight: 10,
              }}
            >
              <Input name="search" placeholder="Pesquisar" value="" />
            </View>
            <Icon name="filter" />
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
                city={item.city}
                state={item.state}
                hours={item.hours}
                date={item.date}
                adress={item.address}
                phone={item.phone}
                description={item.observations}
                // @ts-ignore
                image={item.imageUrls ? item.imageUrls[0] : null}
                onEdit={() => handleEditItem(item.id)}
                onCard={() => handleCardItem(item.id)}
                isLoading={loading}
              />
            )}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={
              loading ? null : (
                <Title>
                  você ainda não possui imoveis lançados, comece adicionando um
                  imovel
                </Title>
              )
            }
          />
        </Content>
      </Container>
    </DefaultContainer>
  );
}
