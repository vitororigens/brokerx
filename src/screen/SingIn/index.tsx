import { ScrollView } from "react-native";
import { Button } from "../../components/Button";
import { DefaultContainer } from "../../components/DefaultContainer";
import { Input } from "../../components/Input";
import { Container, SubTitle, Title } from "./styles";

export function SingIn() {
    return (
        <DefaultContainer>
            <Container>
                <Title>Entrar</Title>
                <SubTitle>Continue gerenciando os seus imóveis.</SubTitle>
                <ScrollView>
                    <Input name="email" placeholder="E-mail"/>
                    <Input name="lock" placeholder="Senha"/>
                    <Button title="Entrar" />
                </ScrollView>

            </Container>
        </DefaultContainer>
    )
}