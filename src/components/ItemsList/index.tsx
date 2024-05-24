import { View } from "react-native";
import { Container, ContainerIcon, ContainerText, DivaiderInformation, Divider, Icon, SubTitle, Title } from "./styles";

type ItemsScheduleProps = {
    title: string;
    value: string;
    sale?: string;
    rent?: string;
}

export function ItemsList({ value,  sale, rent, title }: ItemsScheduleProps) {
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
                        {rent && <Title>{rent}</Title>}
                        {rent && sale && <DivaiderInformation />}
                        {sale && <Title>{sale}</Title>}
                    </View>
                </ContainerText>
                <Divider />
                <ContainerText>
                    <Title>{value}</Title>
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