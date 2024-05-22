import { View } from "react-native";
import { Container, ContainerIcon, ContainerText, Divider, Icon, SubTitle, Title } from "./styles";

type ItemsScheduleProps = {
    title: string;
    numero: string;
    notes: string;
}

export function ItemsContacts({ numero,  notes, title }: ItemsScheduleProps) {
    return (
        <Container>
            <ContainerIcon>

            </ContainerIcon>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                padding: 5,
                height: 40,
            }}>
                <ContainerText>
                    <Title>{title}</Title>
                    <Title>{notes}</Title>
                </ContainerText>
                <Divider />
                <ContainerText>
                    <Title>{numero}</Title>
                   <View style={{
                    flexDirection: 'row'
                   }}>
                   <Icon name='telegram'/>
                   <Icon name='whatsapp'/>
                   <Icon name='phone'/>
                   </View>
                </ContainerText>
            </View>

        </Container>
    )
}