import { View } from "react-native";
import { DefaultContainer } from "../../components/DefaultContainer";
import { Container, ContainerInfo, Content, Divider, SubTitle, Text, Title } from "./styles";
import { Entypo } from '@expo/vector-icons';
import { useTheme } from "styled-components/native";
import { UserInfo } from "../../components/UserInfo";

export function Home() {
  const {COLORS} = useTheme()
  return (
    <DefaultContainer>
      <Container>
        <Title>Dados do Corretor</Title>
        <UserInfo name="user" title="Nome:" subTitle="Teste Testenildo"/>  
        <UserInfo name="v-card" title="CRECI:" subTitle="84685"/>  
        <UserInfo name="old-phone" title="Telefone:" subTitle="99 9 9999-9999"/>  
        <UserInfo name="mail" title="E-mail:" subTitle="teste@teste.com"/>  
        <UserInfo name="home" title="Imobiliária:" subTitle="Gonçalves Imobiliária"/> 


      </Container>
    </DefaultContainer>
  );
}

