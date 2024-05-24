import { View } from "react-native";
import { Container, ContainerIcon, ContainerText, Divaider, Divider, Icon, IconApp, SubTitle, Title } from "./styles";

type ItemsScheduleProps = {
    title: string;
    date: string;
    hours: string;
    notes: string;
} 

export function ItemsNotes({date, hours, notes, title }: ItemsScheduleProps) {
    return (
        <Container>
            <ContainerIcon>
                <Icon name="infocirlce" />
            </ContainerIcon>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                padding: 5,
                height: 40,
            }}>
                <ContainerText>
                    <Title>{title}</Title>
                    <View
                        style={{
                            flexDirection:'row'
                        }}
                    >
                    <Title>{date}</Title>
                    <Divaider/>
                    <Title>{hours}</Title>
                    </View>
                </ContainerText>
                <Divider />
                <ContainerText>
                    <SubTitle>{notes}</SubTitle>
                    <IconApp name='telegram'/>
                </ContainerText>
            </View>

        </Container>
    )
}