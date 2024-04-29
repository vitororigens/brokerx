import { Button } from "../../components/Button";
import { Container, ContainerBackground, ContainerOpacity, Content, SubTitle, Title } from "./styles";

export function Start(){
    return(
        <Container>
            <ContainerBackground/>
            <ContainerOpacity>
                <Content>
                    <Title>
                        Bem-vindo ao BrokerX
                    </Title>
                    <SubTitle>
                        A melhor maneira de gerenciar os seus imóveis.
                    </SubTitle>
                    <Button/>
                </Content>
            </ContainerOpacity>
           
        </Container>
    )
}