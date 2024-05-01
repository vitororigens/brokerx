import { ScrollView } from "react-native";
import { Button } from "../../components/Button";
import { DefaultContainer } from "../../components/DefaultContainer";
import { Input } from "../../components/Input";
import { Container, SubTitle, Title } from "./styles";

export function SingUp() {
    return (
        <DefaultContainer>
            <Container>
                <Title>Cadastrar</Title>
                <SubTitle>Comece a genrenciar os seus imóveis agora mesmo!</SubTitle>
                <ScrollView>
                    <Input name="face" placeholder="Nome completo" />
                    <Input name="email" placeholder="E-mail" />
                    <Input name="phone" placeholder="Telefone" />
                    <Input name="badge" placeholder="CRECI" />
                    <Input name="lock" placeholder="Senha" />
                    <Input name="lock" placeholder="Confirma senha" />
                    <Button title="Cadastrar" />
                </ScrollView>

            </Container>
        </DefaultContainer>
    )
}