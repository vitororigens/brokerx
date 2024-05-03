import { Container, Content, StyledImage, SubTitle, Title } from "./styles";
import { MaterialIcons } from '@expo/vector-icons';
//
import { DefaultContainer } from "../../components/DefaultContainer";
import { UserInfo } from "../../components/UserInfo";
import { ItemsSchedule } from "../../components/ItemsSchedule";

export function Home() {
  return (
    <DefaultContainer>
      <Container>
        <Content>
          <Title>Dados do Corretor</Title>
          <StyledImage >
            <MaterialIcons name="add-a-photo" size={36} color="white" />
          </StyledImage>
        </Content>
        <UserInfo name="user" title="Nome:" subTitle="Teste Testenildo" />
        <UserInfo name="v-card" title="CRECI:" subTitle="84685" />
        <UserInfo name="old-phone" title="Telefone:" subTitle="99 9 9999-9999" />
        <UserInfo name="mail" title="E-mail:" subTitle="teste@teste.com" />
        <UserInfo name="home" title="Imobiliária:" subTitle="Gonçalves Imobiliária" />
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

