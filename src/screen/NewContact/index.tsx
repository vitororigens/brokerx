import { ScrollView, Switch, View } from "react-native";
import { DefaultContainer } from "../../components/DefaultContainer";
import { Container, StyledImage, Content, Input, Title, Button, TitleButton } from "./styles";
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from "react";

export function NewContact() {
    const [status, setStatus] = useState(false)
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
                <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10
                   }}
                >
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginRight: 10
                   }}>
                   <Switch
                            trackColor={{ false: "#0F2851", true: "#0F2851" }}
                            thumbColor={status ? "#f4f3f4" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => setStatus(!status)}
                            value={status}
                            style={{ 
                                width: 50,
                                marginRight: 10
                             }}
                        />
                        <Title>
                            Investidor
                        </Title>
                   </View>
                   <View style={{
                    flexDirection: "row",
                    alignItems: "center"
                   }}>
                   <Switch
                            trackColor={{ false: "#b91c1c", true: "#b91c1c" }}
                            thumbColor={status ? "#f4f3f4" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => setStatus(!status)}
                            value={status}
                            style={{ 
                                width: 50,
                                marginRight: 10
                             }}
                        />
                        <Title>
                            Investidor
                        </Title>
                   </View>
                </View>
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