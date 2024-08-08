import { Button, Container, ContainerButton, Content, Title, TitleButton } from "./styles";
//
import { DefaultContainer } from "../../components/DefaultContainer";
import { ItemsNotes } from "../../components/ItemsNotes";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native";
import useFirestoreCollection from "../../hooks/useFirestoreCollection";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useEffect, useState } from "react";
import { Input } from "../../components/Input";

export function Notes() {
  const navigation = useNavigation()
  const user = useUserAuth();
  const uid = user?.uid;
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const data = useFirestoreCollection('Notes');
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  const isLoading = !!data;

  function handleNewNotes() {
    navigation.navigate('newnotes', { selectedItemId: undefined });
  }

  function handleEditItem(documentId: string) {
    navigation.navigate('newnotes', { selectedItemId: documentId });
  }

  useEffect(() => {
    if (selectedItemId) {
      navigation.navigate('newnotes', { selectedItemId });
    }
  }, [selectedItemId]);

  useEffect(() => {
    if (data) {
      const filtered = data.filter(item =>
        item.nameNotes.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, data]);

  return (
    <DefaultContainer showButtonGears title="Notas Rápidas">
      <Container>
        <Content>
        <Input
                name="search"
                placeholder="Pesquisar"
                value={searchTerm}
                onChangeText={text => setSearchTerm(text)}
                showSearch
              />
          <FlatList
            showsVerticalScrollIndicator={false}
            data={filteredData}
            renderItem={({ item }) => (
              <ItemsNotes
                onEdit={() => handleEditItem(item.id)}
                id={item.id}
                date={item.date}
                hours={item.hours}
                notes={item.notes}
                title={item.nameNotes}
              />
            )}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={
              <Title>
                você ainda não possui notas,
                comece adicionando uma nota.
              </Title>
            }
          />
          <ContainerButton>
            <Button onPress={handleNewNotes} type="PRIMARY">
              <TitleButton>
                Adicionar
              </TitleButton>
            </Button>
            <Button type="SECONDARY">
              <TitleButton>
                Pesquisar
              </TitleButton>
            </Button>
          </ContainerButton>
        </Content>
      </Container>
    </DefaultContainer>
  );
}

