import { ScrollView } from "react-native";
import { Button } from "../../components/Button";
import { DefaultContainer } from "../../components/DefaultContainer";
import { Input } from "../../components/Input";
import { ButtonPassword, Container, Content, SubTitle, Title } from "./styles";
import { useNavigation } from "@react-navigation/native";

export function ForgetPassword() {
    const navigation = useNavigation()
    function handlewForgetPassword() {
        navigation.navigate('singin')
    }
    return (
        <DefaultContainer showButtonBack>
            <Container>
                <Content>
                    <Title>Recuperar Senha</Title>
                    <SubTitle>Esqueceu a senha? enviaremos um email de recuperação para seu email.</SubTitle>
                    <ScrollView>
                        <Input name="email" placeholder="E-mail" />
                        <Button onPress={handlewForgetPassword} title="Enviar" />
                    </ScrollView>
                </Content>
            </Container>
        </DefaultContainer>
    )
}