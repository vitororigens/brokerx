import { useEffect, useState } from "react";
import { DefaultContainer } from "../../components/DefaultContainer";
import { Button, Container, ContainerIcons, ContainerItems, Content, Icon, ImageContainer, StyledImage, SubTitle, Title } from "./styles";
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { database} from "../../services";
import { View, Linking } from "react-native"; // Importa Linking
import { useNavigation, useRoute } from "@react-navigation/native";
import { Loader } from "../../components/Loader";

type PropsCardContact = {
    name: string;
    cpf: string;
    phone: string;
    email: string;
    adress: string;
    observations: string;
    investor: boolean;
    resident: boolean;
    image: string;
    instagram: string;
    facebook: string;
}

export function CardImmobile() {
    const route = useRoute();
    const navigation = useNavigation();
    const [contact, setContact] = useState<PropsCardContact | null>(null);
    const [image, setImage] = useState<string | null>(null);
    const { selectedItemId } = route.params as { selectedItemId?: string };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleEditItem = (documentId: string) => {
        navigation.navigate('newcontact', { selectedItemId: documentId });
    }

    useEffect(() => {
        if (selectedItemId) {
            database.collection("Contacts").doc(selectedItemId).get().then((doc) => {
                if (doc.exists) {
                    const data = doc.data();
                    if (data) {
                        setContact(data as PropsCardContact);
                        setImage(data.image);
                    }
                }
            });
        }
    }, [selectedItemId]);

    if (!contact) {
        return (
            <DefaultContainer>
                <Container>
                    <Loader />
                </Container>
            </DefaultContainer>
        );
    }

    const openInstagram = (username: string) => {
        const url = `https://www.instagram.com/${username}`;
        Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
    };

    const openFacebook = (username: string) => {
        const url = `https://www.facebook.com/${username}`;
        Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
    };

    const handlePhone = (phone: string) => {
        const url = `tel:${phone}`;
        Linking.openURL(url).catch(err => console.error('Error opening dialer:', err));
    };

    const sendEmail = (email: string) => {
        const url = `mailto:${email}`;
        Linking.openURL(url).catch(err => console.error("Couldn't send email", err));
    };

    const openMaps = (address: string) => {
        const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
        Linking.openURL(url).catch(err => console.error("Couldn't open maps", err));
    };

    return (
        <DefaultContainer showButtonBack showButtonEdit onEdit={() => selectedItemId && handleEditItem(selectedItemId)}>
            <Container>
                <Content>
                    {image ? (
                        <StyledImage source={{ uri: image }} />
                    ) : (
                        <ImageContainer onPress={pickImage}>
                            <MaterialIcons name="add-a-photo" size={36} color="white" />
                        </ImageContainer>
                    )}
                    <Title>{contact.name}</Title>
                    <SubTitle>{contact.phone}</SubTitle>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            width: '100%'
                        }}
                    >
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Icon name="suitcase" />
                            <SubTitle>
                                {contact.investor ? 'Investidor' : 'Não Investidor'}
                            </SubTitle>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Icon name="home" />
                            <SubTitle>
                                {contact.resident ? 'Morador' : 'Não Morador'}
                            </SubTitle>
                        </View>
                    </View>
                </Content>
                <ContainerItems>
                    <View>
                        <Title>CPF:</Title>
                        <SubTitle>{contact.cpf}</SubTitle>
                    </View>
                </ContainerItems>
                <ContainerItems onPress={() => sendEmail(contact.email)}>
                    <View>
                        <Title>E-mail:</Title>
                        <SubTitle>{contact.email}</SubTitle>
                    </View>
                    <Icon name="chevron-small-right"  />
                </ContainerItems>
                <ContainerItems onPress={() => openMaps(contact.adress)}>
                    <View>
                        <Title>Endereço:</Title>
                        <SubTitle>{contact.adress}</SubTitle>
                    </View>
                    <Icon name="chevron-small-right"  />
                </ContainerItems>
                <ContainerIcons>
                    <Button onPress={() => openInstagram(contact.instagram)}>
                        <Icon name="instagram" />
                    </Button>
                    <Button onPress={() => openFacebook(contact.facebook)}>
                        <Icon name="facebook" />
                    </Button>
                    <Button onPress={() => handlePhone(contact.phone)}>
                        <Icon name="phone" />
                    </Button>
                    <Button onPress={() => sendEmail(contact.email)}>
                        <Icon name="mail" />
                    </Button>
                </ContainerIcons>
            </Container>
        </DefaultContainer>
    );
}
