import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Rect } from "react-content-loader/native";
import { FlatList } from "react-native";
import { DefaultContainer } from "../../components/DefaultContainer";
import { ItemsContacts } from "../../components/ItemsContacts";
import useFirestoreCollection from "../../hooks/useFirestoreCollection";
import { useUserAuth } from "../../hooks/useUserAuth";
import {
  Button,
  Container,
  Content,
  ContentSkeleton,
  Icon,
  Title,
} from "./styles";
import { Input } from "../../components/Input";

export function Schedule() {
  const user = useUserAuth();
  const uid = user?.uid;
  const data = useFirestoreCollection("Contacts");
  const navigation = useNavigation();
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  const isLoading = !!data;

  function handleNewContact() {
    navigation.navigate("newcontact", { selectedItemId: undefined });
  }

  function handleEditItem(documentId: string) {
    navigation.navigate("newcontact", { selectedItemId: documentId });
  }

  function handleCardItem(documentId: string) {
    navigation.navigate("cardcontact", { selectedItemId: documentId });
  }

  useEffect(() => {
    if (selectedItemId) {
      navigation.navigate("newcontact", { selectedItemId });
    }
  }, [selectedItemId]);

  useEffect(() => {
    if (data) {
      const filtered = data.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, data]);

  return (
    <DefaultContainer showButtonGears title="Contatos">
      <Container>
        {!isLoading ? (
          <ContentSkeleton backgroundColor="#f5f5f5" foregroundColor="#e0e0e0">
            <Rect width={"100%"} height={170} rx={20} ry={20} />
          </ContentSkeleton>
        ) : (
          <Content>
             <Input
                name="search"
                placeholder="Pesquisar"
                value={searchTerm}
                onChangeText={text => setSearchTerm(text)}
                showSearch
              />
            <FlatList
              data={filteredData}
              renderItem={({ item }) => (
                <ItemsContacts
                  id={item.id}
                  numero={item.phone}
                  title={item.name}
                  investor={item.investor}
                  resident={item.resident}
                  image={item.imageUrl}
                  showButton
                  onEdit={() => handleEditItem(item.id)}
                  onCard={() => handleCardItem(item.id)}
                />
              )}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={
                <Title>
                  você ainda não tem contatos lançados, comece adicionando um
                  contato
                </Title>
              }
            />

            <Button onPress={handleNewContact}>
              <Icon name="plus" />
            </Button>
          </Content>
        )}
      </Container>
    </DefaultContainer>
  );
}
