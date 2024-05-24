import { View } from "react-native";
import { Container, ContainerIcon, ContainerText, Divaider, DivaiderInformation,  Icon, SubTitle, Title } from "./styles";

type ItemsScheduleProps = {
    title: string;
    numero: string;
    resident?: string;
    investor?: string;
}

export function ItemsContacts({ numero, title, investor, resident }: ItemsScheduleProps) {
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
                    <View   style={{
                        flexDirection: 'row'
                    }}>
                        {investor && <Title>{investor}</Title>}
                        {investor && resident && <DivaiderInformation />}
                        {resident && <Title>{resident}</Title>}
                    </View>
                </ContainerText>
                <Divaider />
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