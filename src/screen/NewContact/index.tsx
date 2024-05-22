import { ScrollView, View } from "react-native";
import { DefaultContainer } from "../../components/DefaultContainer";
import { Container, StyledImage, Content, Input, Title, Button, TitleButton } from "./styles";
import { MaterialIcons } from '@expo/vector-icons';

export function NewContact() {
    return (
        <DefaultContainer title="Adicionar contato">
            <Container>
                <Content>
                    <StyledImage >
                        <MaterialIcons name="add-a-photo" size={36} color="white" />
                    </StyledImage>
                </Content>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Title>
                        Nome:
                    </Title>
                    <Input />
                    <Title>
                        CPF:
                    </Title>
                    <Input />
                    <Title>
                        Telefone:
                    </Title>
                    <Input />
                    <Title>
                        E-mail:
                    </Title>
                    <Input />
                    <Title>
                        Endereço:
                    </Title>
                    <Input />
                    <Title>
                        Observações:
                    </Title>
                    <Input />
                    <View
                        style={{
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Button>
                            <TitleButton>
                                Salvar
                            </TitleButton>
                        </Button>
                    </View>
                </ScrollView>
            </Container>
        </DefaultContainer>
    )
}