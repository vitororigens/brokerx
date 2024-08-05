import { useEffect, useState } from "react";
import { DefaultContainer } from "../../components/DefaultContainer";
import { Button, Container, ContainerIcons, ContainerItems, Content, Icon, ImageContainer, MapContainer, ShareButtonMap, StyledImage, SubTitle, Title } from "./styles";
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { database } from "../../services";
import { View, Linking, ScrollView, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Loader } from "../../components/Loader";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";
import Share from 'react-native-share'

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
    cep: string;
    city: string;
    state: string;
    number: string;
}

export function CardContact() {
    const route = useRoute();
    const navigation = useNavigation();
    const [contact, setContact] = useState<PropsCardContact | null>(null);
    const [image, setImage] = useState<string | null>(null);
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const { selectedItemId } = route.params as { selectedItemId?: string };

    const GOOGLE_API_KEY = 'AIzaSyAP_M66gQj0WB71Wsp-OgVp-E32oGDxHmU';

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
                        setImage(data.imageUrl);
                        getGeolocation(data.cep);
                    }
                }
            });
        }
    }, [selectedItemId]);

    const getGeolocation = async (cep: string) => {
        try {
            const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${cep}&key=${GOOGLE_API_KEY}`);
            if (response.data.results.length > 0) {
                const { lat, lng } = response.data.results[0].geometry.location;
                setLocation({ latitude: lat, longitude: lng });
            } else {
                console.log("Geocoding Error", "Could not fetch geolocation for the given CEP.");
            }
        } catch (error) {
            console.error("Geocoding Error:", error);
            console.log("Geocoding Error", "An error occurred while fetching geolocation.");
        }
    };

    const shareLocation = (address: string, latitude: number, longitude: number) => {
        const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
        const options = {
            title: 'Compartilhar Localização',
            message: `Veja esta localização: ${address}`,
            url: url,
        };
        Share.open(options).catch(err => console.error('Error sharing location:', err));
    };


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
                <ScrollView>
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
                        <Icon name="chevron-small-right" />
                    </ContainerItems>
                    <ContainerItems onPress={() => openMaps(contact.adress)}>
                        <View>
                            <Title>Endereço:</Title>
                            <SubTitle>{contact.adress}</SubTitle>
                        </View>
                        <Icon name="chevron-small-right" />
                    </ContainerItems>
                    {location && (
                        <MapContainer>
                            <MapView
                                style={{
                                    width: '100%',
                                    height: 200,
                                    borderRadius: 8
                                }}
                                initialRegion={{
                                    latitude: location.latitude,
                                    longitude: location.longitude,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }}
                                scrollEnabled={false}
                                rotateEnabled={false}
                                pitchEnabled={false}
                            >
                                <Marker coordinate={location} title={contact.adress} />
                            </MapView>
                            <ShareButtonMap onPress={() => shareLocation(contact.adress, location.latitude, location.longitude)}>
                                <Icon name="share" />
                            </ShareButtonMap>
                        </MapContainer>
                    )}
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
                </ScrollView>
            </Container>
        </DefaultContainer>
    );
}
