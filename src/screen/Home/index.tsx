import { Container, Content, StyledImage, Title } from "./styles";
import { MaterialIcons } from '@expo/vector-icons';
//
import { DefaultContainer } from "../../components/DefaultContainer";
import { UserInfo } from "../../components/UserInfo";
import { ItemsSchedule } from "../../components/ItemsSchedule";
import { useUserAuth } from "../../hooks/useUserAuth";
import useFirestoreCollection from "../../hooks/useFirestoreCollection";
import { FlatList } from "react-native";
import { ItemsNotes } from "../../components/ItemsNotes";




export function Home() {
  const user = useUserAuth();
  const registerData = useFirestoreCollection('Register');
  const data = useFirestoreCollection('Notes');


  return (
    <DefaultContainer showButtonGears title="Tela Inicial">
      <Container>
        <Content>
          <Title>Dados do Corretor</Title>
          <StyledImage >
            <MaterialIcons name="add-a-photo" size={36} color="white" />
          </StyledImage>
        </Content>
        <UserInfo name="user" title="Nome:" subTitle={user?.displayName ?? ''} />
        <UserInfo name="v-card" title="CRECI:" subTitle={registerData.length > 0 ? registerData[0].creci : ''} />
        <UserInfo name="old-phone" title="Telefone:" subTitle={registerData.length > 0 ? registerData[0].phone : ''} />
        <UserInfo name="mail" title="E-mail:" subTitle={user?.email ?? ''} />
        <UserInfo name="home" title="Imobiliária:" subTitle={registerData.length > 0 ? registerData[0].realEstate : ''} />
      </Container>
      <Container>
        <Content>
          <Title>Agenda</Title>
        </Content>
        <FlatList

          data={data}
          renderItem={({ item }) => (
            <ItemsNotes date={item.date} hours={item.hours} notes={item.notes} title={item.nameNotes} />
          )}
          keyExtractor={(item) => item.id}
        />

      </Container>
    </DefaultContainer>
  );
}

