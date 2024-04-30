import { Button } from "../../components/Button";
import { DefaultContainer } from "../../components/DefaultContainer";
import { Content, SubTitle, Title } from "./styles";


export function Start() {
    return (
        <DefaultContainer>
            <Content>
                <Title>
                    Bem-vindo ao BrokerX
                </Title>
                <SubTitle>
                    A melhor maneira de gerenciar os seus imóveis.
                </SubTitle>
                <Button title="Entrar" />
                <Button type="SECUNDARY" title="Cadastrar" />
            </Content>
        </DefaultContainer>
    )
}