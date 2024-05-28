import { Container, Content, StyledImage, Title } from "./styles";
import { MaterialIcons } from '@expo/vector-icons';
//
import { DefaultContainer } from "../../components/DefaultContainer";
import { UserInfo } from "../../components/UserInfo";
import { ItemsSchedule } from "../../components/ItemsSchedule";
import { useUserAuth } from "../../hooks/useUserAuth";
import useFirestoreCollection from "../../hooks/useFirestoreCollection";




export function Home() {
  const user = useUserAuth();
  const registerData = useFirestoreCollection('Register');



  return (
    <DefaultContainer showButtonGears title="Tela Inicial">
      <Container>
        <Content>
          <Title>Dados do Corretor</Title>
          <StyledImage >
            <MaterialIcons name="add-a-photo" size={36} color="white" />
          </StyledImage>
        </Content>
        <UserInfo name="user" title="Nome:" subTitle={user?.displayName ?? ''}/>
        <UserInfo name="v-card" title="CRECI:" subTitle={registerData.length > 0 ? registerData[0].creci : ''} />
        <UserInfo name="old-phone" title="Telefone:" subTitle={registerData.length > 0 ? registerData[0].phone : ''} />
        <UserInfo name="mail" title="E-mail:" subTitle={user?.email ?? ''} />
        <UserInfo name="home" title="Imobiliária:" subTitle={registerData.length > 0 ? registerData[0].realEstate : ''} />
      </Container>
      <Container>
        <Content>
          <Title>Agenda</Title>
        </Content>
        <ItemsSchedule date="30.06.2024" hours="11h" notes="Assinar contrato elaborado..." title="Contrato"/>
        <ItemsSchedule date="30.06.2024" hours="11h" notes="Assinar contrato elaborado..." title="Contrato"/>
      </Container>
    </DefaultContainer>
  );
}

