import { View } from "react-native";
import { Container, ContainerIcon, ContainerText, Divider, Icon, SubTitle, Title } from "./styles";

type ItemsScheduleProps = {
    title: string;
    date: string;
    hours: string;
    notes: string;
} 

export function ItemsSchedule({date, hours, notes, title }: ItemsScheduleProps) {
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
                    <Title>{date}</Title>
                </ContainerText>
                <Divider />
                <ContainerText>
                    <SubTitle>{hours}</SubTitle>
                    <SubTitle>{notes}</SubTitle>
                </ContainerText>
            </View>

        </Container>
    )
}