import { DefaultContainer } from "../../components/DefaultContainer";
import { Container, StyledImage, Content } from "./styles";
import { MaterialIcons } from '@expo/vector-icons';

export function NewContact(){
    return(
        <DefaultContainer title="Adicionar contato">
            <Container>
            <Content>
          <StyledImage >
            <MaterialIcons name="add-a-photo" size={36} color="white" />
          </StyledImage>
        </Content>
            </Container>
        </DefaultContainer>
    )
}