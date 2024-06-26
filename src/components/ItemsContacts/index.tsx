import React from 'react';
import { View, Linking, Alert } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import Share from 'react-native-share';
import { Button, Container, ContainerIcon, ContainerImage, ContainerText, Divider, DividerInformation, Icon, IconCheck, Title } from "./styles";

type ItemsContactsProps = {
    title: string;
    numero: string;
    resident?: boolean;
    investor?: boolean;
    image?: string;
    isChecked?: boolean;
    showButton?: boolean;
    onToggle?: () => void;
    showButtonCheck?: boolean;
}

export function ItemsContacts({ numero, title, showButtonCheck, investor, resident, image, isChecked, showButton, onToggle }: ItemsContactsProps) {
    const handleShare = async () => {
        try {
            await Share.open({
                message: `Contact Information:\nName: ${title}\nPhone: ${numero}`,
            });
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    const handleWhatsApp = async () => {
        const url = `whatsapp://send?phone=${numero}`;
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert('Error', 'WhatsApp is not installed on your device.');
        }
    };

    const handlePhone = () => {
        const url = `tel:${numero}`;
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
                        {investor && <Title>I</Title>}
                        {investor && resident && <DividerInformation />}
                        {resident && <Title>M</Title>}
                    </View>
                </ContainerText>
                <Divider />
                <ContainerText>
                    <Title>{numero}</Title>
                    {showButton && (
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
                    )}
                </ContainerText>
            </View>
            {showButtonCheck &&
                <Button onPress={onToggle}>
                    <IconCheck
                        name={isChecked ? "checkbox-marked-circle-outline" : "checkbox-blank-circle-outline"}
                    />
                </Button>
            }
        </Container>
    );
}
