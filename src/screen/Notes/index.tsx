import { Button, Container, Content, TitleButton } from "./styles";
//
import { DefaultContainer } from "../../components/DefaultContainer";
import { ItemsNotes } from "../../components/ItemsNotes";

export function Notes() {
  return (
    <DefaultContainer title="Notas Rápidas">
      <Container>
        <ItemsNotes date="30.06.2024" hours="11h" notes="Assinar contrato elaborado..." title="Visita" />
        <ItemsNotes date="30.06.2024" hours="11h" notes="Assinar contrato elaborado..." title="Contrato" />
        <Content>
          <Button type="PRIMARY">
            <TitleButton>
              Adicionar
            </TitleButton>
          </Button>
          <Button type="SECONDARY">
            <TitleButton>
              Pesquisar
            </TitleButton>
          </Button>
        </Content>
      </Container>
    </DefaultContainer>
  );
}

