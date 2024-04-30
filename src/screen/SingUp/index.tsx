import { Button } from "../../components/Button";
import { DefaultContainer } from "../../components/DefaultContainer";
import { Container, SubTitle, Title } from "./styles";

export function SingUp(){
    return(
        <DefaultContainer>
            <Container>
                <Title>Cadastrar</Title>
                <SubTitle>Comece a genrenciar os seus imóveis agora mesmo!</SubTitle>
                <Button title="Cadastrar"/>
            </Container>
        </DefaultContainer>
    )
}