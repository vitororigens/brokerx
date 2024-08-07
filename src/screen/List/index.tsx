import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
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
  const registerData = useFirestoreCollection("Register").find((item) => item.id === uid);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  const loading = !data;

  function handleEditItem(documentId: string) {
    navigation.navigate("immobile", { selectedItemId: documentId });
  }

  function handleCardItem(documentId: string) {
    navigation.navigate("cardimmobile", { selectedItemId: documentId });
  }

  useEffect(() => {
    if (data) {
      const filtered = data.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, data]);

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
              <Input
                name="search"
                placeholder="Pesquisar"
                value={searchTerm}
                onChangeText={text => setSearchTerm(text)}
                showSearch
              />
            </View>
            <Icon name="filter" />
          </View>
          <FlatList
            data={filteredData}
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
                isFavorite={registerData?.favorites.includes(item.id)}
              />
            )}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={
              filteredData.length === 0 ? (
               <View 
               style={{
                height: 300,
                alignItems: 'center',
                justifyContent:'center',
               }}
               >
                 <Title>
                  {searchTerm
                    ? "Não foi possível encontrar um imóvel com esse nome"
                    : "Você ainda não possui imóveis lançados, comece adicionando um imóvel"}
                </Title>
               </View>
              ) : null
            }
          />
        </Content>
      </Container>
    </DefaultContainer>
  );
}
