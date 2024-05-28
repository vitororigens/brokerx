import { View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Button, Container, ContainerIcon, ContainerImage, ContainerText, Divaider, DivaiderInformation, Icon, Title } from "./styles";

type ItemsScheduleProps = {
    title: string;
    numero: string;
    resident?: boolean;
    investor?: boolean;
    image?: string;
}

export function ItemsContacts({ numero, title, investor, resident, image }: ItemsScheduleProps) {
    return (
        <Container>
            {image ? (
                <ContainerImage source={{ uri: image }} />
            ) : (
                <ContainerIcon>
                    <MaterialIcons name="add-a-photo" size={22} color="white" />
                </ContainerIcon>
            )}
            <View style={{
                flex: 1,
                justifyContent: 'center',
                padding: 5,
                height: 40,
            }}>
                <ContainerText>
                    <Title>{title}</Title>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        {investor && <Title>I</Title>}
                        {investor && resident && <DivaiderInformation />}
                        {resident && <Title>M</Title>}
                    </View>
                </ContainerText>
                <Divaider />
                <ContainerText>
                    <Title>{numero}</Title>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Button>
                            <Icon name='telegram' />
                        </Button>
                        <Button>
                            <Icon name='whatsapp' />
                        </Button>
                        <Button>
                            <Icon name='phone' />
                        </Button>
                    </View>
                </ContainerText>
            </View>

        </Container>
    )
}