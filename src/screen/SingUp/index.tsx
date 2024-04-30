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
                    <Input name="face" />
                    <Input name="email" />
                    <Input name="phone" />
                    <Input name="badge" />
                    <Input name="lock" />
                    <Button title="Cadastrar" />
                </ScrollView>

            </Container>
        </DefaultContainer>
    )
}