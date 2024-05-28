import { ScrollView, Switch, View } from "react-native";
import { DefaultContainer } from "../../components/DefaultContainer";
import { Container, Input, Title, Button, TitleButton, InputNote, ButtonAdd, Icon } from "./styles";

import { useState } from "react";

export function NewNotes() {
    const [status, setStatus] = useState(false)
    return (
        <DefaultContainer showButtonBack title="Adicionar Nota">
            <Container>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Title>
                        Tipo de nota:
                    </Title>
                    <Input />
                    <Title>
                        Nota:
                    </Title>
                    <InputNote 
                     multiline
                     numberOfLines={10}
                    />
              
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginRight: 10,
                    marginBottom: 10
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
                   
                   <View  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                   }}>
                   <View style={{
                    width: '45%'
                   }}>
                   <Title>
                        Data:
                    </Title>
                    <Input />
                   </View>
                   <View style={{
                    width: '45%'
                   }}>
                   <Title>
                        Horário:
                    </Title>
                    <Input />
                   </View>
                   </View>
                   <Title>
                        Participantes:
                    </Title>
                   <View  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                   }}>
                   <View style={{
                    width: '80%'
                   }}>
                    <Input />
                   </View>
                   <View style={{
                    width: '15%'
                   }}>
                  <ButtonAdd>
                    <Icon name='plus'/>
                  </ButtonAdd>
                   </View>
                   </View>
                   
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