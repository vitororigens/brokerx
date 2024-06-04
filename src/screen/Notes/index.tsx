import { Button, Container, Content, TitleButton } from "./styles";
//
import { DefaultContainer } from "../../components/DefaultContainer";
import { ItemsNotes } from "../../components/ItemsNotes";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native";
import useFirestoreCollection from "../../hooks/useFirestoreCollection";

export function Notes() {
  const navigation = useNavigation()
  function handleNewNotes(){
    navigation.navigate('newnotes')
  }
  const data = useFirestoreCollection('Notes');
  return (
    <DefaultContainer showButtonGears title="Notas Rápidas">
      <Container>
      <FlatList
        
          data={data}
          renderItem={({ item }) => (
            <ItemsNotes date={item.date} hours={item.hours} notes={item.notes} title={item.nameNotes} />
          )}
          keyExtractor={(item) => item.id} 
        />
       
       
        <Content>
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
        </Content>
      </Container>
    </DefaultContainer>
  );
}

