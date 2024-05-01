import { ScrollView } from "react-native";
import { Button } from "../../components/Button";
import { DefaultContainer } from "../../components/DefaultContainer";
import { Input } from "../../components/Input";
import { ButtonPassword, Container, SubTitle, Title } from "./styles";
import { useNavigation } from "@react-navigation/native";

export function SingIn() {
    const navition = useNavigation()
    function handlewForgetPassword() {
        navition.navigate('forgetpassword')
    }

    function handlewSingIn(){

    }
    return (
        <DefaultContainer>
            <Container>
                <Title>Entrar</Title>
                <SubTitle>Continue gerenciando os seus imóveis.</SubTitle>
                <ScrollView>
                    <Input name="email" placeholder="E-mail" />
                    <Input name="lock" placeholder="Senha" />
                    <Button onPress={handlewSingIn} title="Entrar" />
                    <ButtonPassword onPress={handlewForgetPassword}>
                        <SubTitle>Esqueceu a senha?</SubTitle>
                    </ButtonPassword>
                </ScrollView>

            </Container>
        </DefaultContainer>
    )
}