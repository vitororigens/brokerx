import { ScrollView } from "react-native";
import { Button } from "../../components/Button";
import { DefaultContainer } from "../../components/DefaultContainer";
import { Input } from "../../components/Input";
import { ButtonPassword, Container, Content, SubTitle, Title } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { Toast } from "react-native-toast-notifications";
import auth from "@react-native-firebase/auth";
import { useState } from "react";

export function SingIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation()

    function handleForgetPassword() {
        navigation.navigate('forgetpassword')
    }
    function handleSingIn() {
        if (!email || !password) {
            Toast.show('Por favor, preencha todos os campos.', { type: 'danger' });
            return;
        }

        auth()
            .signInWithEmailAndPassword(email.trim(), password.trim())
            .then(() => {
                Toast.show('Login realizado com sucesso!', { type: 'success' })
                setEmail("")
                setPassword("")

            })
            .catch(() => Toast.show('Verifique se seu e-mail ou senha estão corretos.', { type: 'danger' }))
    }
    return (
        <DefaultContainer showButtonBack>
            <Container>
                <Content>
                    <Title>Entrar</Title>
                    <SubTitle>Continue gerenciando os seus imóveis.</SubTitle>
                    <ScrollView>
                        <Input name="envelope" value={email} onChangeText={setEmail} showIcon placeholder="Email" />
                        <Input name="lock" value={password} onChangeText={setPassword} showIcon placeholder="Senha" passwordType />
                        <Button title={'Entrar'} onPress={handleSingIn} />
                        <ButtonPassword onPress={handleForgetPassword}>
                            <SubTitle>Esqueceu a senha?</SubTitle>
                        </ButtonPassword>
                    </ScrollView>
                </Content>
            </Container>
        </DefaultContainer>
    )
}