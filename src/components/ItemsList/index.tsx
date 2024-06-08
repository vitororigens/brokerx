import { View, Linking, Alert } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import Share from 'react-native-share';
import { Button, Container, ContainerIcon, ContainerImage, ContainerText, DivaiderInformation, Divider, Icon, SubTitle, Title } from "./styles";

type ItemsScheduleProps = {
    title: string;
    value: string;
    sale?: boolean;
    rent?: boolean;
    phone?: string; 
    image?: string;
}

export function ItemsList({ value, sale, rent, title, phone, image }: ItemsScheduleProps) {
    const handleShare = async () => {
        try {
            await Share.open({
                message: `Contact Information:\nName: ${title}\nPhone: ${phone}`,
            });
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    const handleWhatsApp = async () => {
        const url = `whatsapp://send?phone=${phone}`;
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert('Error', 'WhatsApp is not installed on your device.');
        }
    };

    const handlePhone = () => {
        const url = `tel:${phone}`;
        Linking.openURL(url).catch(err => console.error('Error opening dialer:', err));
    };

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
                        {rent && <Title>A</Title>}
                        {rent && sale && <DivaiderInformation />}
                        {sale && <Title>V</Title>}
                    </View>
                </ContainerText>
                <Divider />
                <ContainerText>
                    <Title>{value}</Title>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Button onPress={handleShare}>
                            <Icon name='share' />
                        </Button>
                        <Button onPress={handleWhatsApp}>
                            <Icon name='whatsapp' />
                        </Button>
                        <Button onPress={handlePhone}>
                            <Icon name='phone' />
                        </Button>
                    </View>
                </ContainerText>
            </View>
        </Container>
    )
}
