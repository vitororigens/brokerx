import { useNavigation } from "@react-navigation/native";
import { Button } from "../../components/Button";
import { DefaultContainer } from "../../components/DefaultContainer";
import { Content, SubTitle, Title } from "./styles";


export function Start() {
    const navigation = useNavigation()
    function handlewSingIn(){
        navigation.navigate('singin')
    }
    function handlewSingUp(){
        navigation.navigate('singup')
    }

    return (
        <DefaultContainer>
            <Content>
                <Title>
                    Bem-vindo ao BrokerX
                </Title>
                <SubTitle>
                    A melhor maneira de gerenciar os seus imóveis.
                </SubTitle>
                <Button onPress={handlewSingIn} title="Entrar" />
                <Button  onPress={handlewSingUp} type="SECUNDARY" title="Cadastrar" />
            </Content>
        </DefaultContainer>
    )
}