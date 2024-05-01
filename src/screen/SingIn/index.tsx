import { ScrollView } from "react-native";
import { Button } from "../../components/Button";
import { DefaultContainer } from "../../components/DefaultContainer";
import { Input } from "../../components/Input";
import { ButtonPassword, Container, SubTitle, Title } from "./styles";

export function SingIn() {
    function handlewSingin() {

    }
    return (
        <DefaultContainer>
            <Container>
                <Title>Entrar</Title>
                <SubTitle>Continue gerenciando os seus imóveis.</SubTitle>
                <ScrollView>
                    <Input name="email" placeholder="E-mail" />
                    <Input name="lock" placeholder="Senha" />
                    <Button onPress={handlewSingin} title="Entrar" />
                    <ButtonPassword>
                        <SubTitle>Esqueceu a senha?</SubTitle>
                    </ButtonPassword>
                </ScrollView>

            </Container>
        </DefaultContainer>
    )
}