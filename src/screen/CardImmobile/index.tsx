import { useEffect, useRef, useState } from "react";
import { DefaultContainer } from "../../components/DefaultContainer";
import { Button, Card, CardIcon, Container, ContainerCard, ContainerCardImmobile, ContainerIcons, ContainerInfo, ContainerItems, Content, Header, Icon, ImageContainer, InfoText, InformationText, Items, ItemsIcon, ItemsText, RadioButton, StyledImage, SubTitle, Title } from "./styles";
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { database } from "../../services";
import { View, Linking, Dimensions, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Loader } from "../../components/Loader";
import { useTheme } from "styled-components/native";
import axios from "axios";
import MapView, { Marker } from "react-native-maps";

const { width: windowWidth } = Dimensions.get('window');

type PropsCardImmobile = {
    address: string;
    brokerFee: string;
    cep: string;
    city: string;
    commission: string;
    constructionArea: string;
    financing: boolean;
    furniture: boolean;
    gourmet: boolean;
    grill: boolean;
    imageUrls: string[];
    immobileSituation: string;
    name: string;
    number: string;
    numberBedrooms: string;
    numberRooms: string;
    numberSuites: string;
    numberVacancies: string;
    numberbathrooms: string;
    observations: string;
    owner: string;
    phone: string;
    pool: boolean;
    positionSun: string;
    registration: string;
    rent: boolean;
    sale: boolean;
    selectedCategory: string;
    situation: boolean;
    state: string;
    totalArea: string;
    uid: string;
    valueImmobile: string;
    valueIptu: string;
    valueRent: string;
    visible: boolean;
    security: boolean;
    balcony: boolean;
    serviceArea: boolean;
    bathtub: boolean;
    partyHall: boolean;
    elevator: boolean;
    garage: boolean;
    written: boolean;
    endorsed: boolean;
    garden: boolean;
    selectPropertyType: string;
    selectSituation: string;
    startConstruction: string;
    endConstruction: string;
    date: string;
    hours: string;
};

const GOOGLE_API_KEY = 'AIzaSyAP_M66gQj0WB71Wsp-OgVp-E32oGDxHmU';

export function CardImmobile() {
    const route = useRoute();
    const navigation = useNavigation();
    const [dataImmobile, setDataImmobile] = useState<PropsCardImmobile | null>(null);
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [images, setImages] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { selectedItemId } = route.params as { selectedItemId?: string };
    const { COLORS } = useTheme()

    const scrollViewRef = useRef<ScrollView>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => {
                const nextIndex = (prevIndex + 1) % images.length;
                if (scrollViewRef.current) {
                    scrollViewRef.current.scrollTo({ x: nextIndex * windowWidth, animated: true });
                }
                return nextIndex;
            });
        }, 3000);

        return () => clearInterval(interval);
    }, [images.length]);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImages(prevImages => [...prevImages, result.assets[0].uri]);
        }
    };



    const handleEditItem = (documentId: string) => {
        navigation.navigate('immobile', { selectedItemId: documentId });
    }

    useEffect(() => {
        if (selectedItemId) {
            database.collection("Immobile").doc(selectedItemId).get().then((doc) => {
                if (doc.exists) {
                    const data = doc.data();
                    if (data) {
                        setDataImmobile(data as PropsCardImmobile);
                        setImages(data.imageUrls || []);
                        getGeolocation(data.cep);
                    }
                }
            });
        }
    }, [selectedItemId]);

    const getGeolocation = async (cep: string) => {
        console.log(cep)
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

    if (!dataImmobile) {
        return (
            <DefaultContainer>
                <Container>
                    <Loader />
                </Container>
            </DefaultContainer>
        );
    }

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
                <ContainerCardImmobile>
                    <Content>
                        {images.length > 0 ? (
                            <View >
                                <ScrollView
                                    ref={scrollViewRef}
                                    horizontal
                                    pagingEnabled
                                    showsHorizontalScrollIndicator={false}
                                    onScroll={(event) => {
                                        const index = Math.floor(event.nativeEvent.contentOffset.x / windowWidth);
                                        setCurrentIndex(index);
                                    }}
                                >
                                    {images.map((image, index) => (
                                        <StyledImage key={index} source={{ uri: image }} style={{ width: windowWidth }} />
                                    ))}
                                </ScrollView>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    marginTop: 170,
                                    alignItems: 'center',
                                    position: 'absolute',
                                    width: '100%'
                                }}>
                                    {images.map((_, index) => (
                                        <RadioButton
                                            key={index}
                                            style={{ backgroundColor: index === currentIndex ? COLORS.BLUE_800 : COLORS.WHITE }}
                                            onPress={() => {
                                                setCurrentIndex(index);
                                                if (scrollViewRef.current) {
                                                    scrollViewRef.current.scrollTo({ x: index * windowWidth, animated: true });
                                                }
                                            }}
                                        />
                                    ))}
                                </View>
                            </View>
                        ) : (
                            <ImageContainer onPress={pickImage}>
                                <MaterialIcons name="add-a-photo" />
                            </ImageContainer>
                        )}
                        <View
                            style={{
                                flexDirection: 'row',
                                padding: 10,
                                position: 'absolute'
                            }}
                        >
                            {dataImmobile.rent &&
                                <Items>
                                    <ItemsText>
                                        Aluguel
                                    </ItemsText>
                                </Items>
                            }
                            {dataImmobile.sale &&
                                <Items>
                                    <ItemsText>
                                        Venda
                                    </ItemsText>
                                </Items>
                            }
                        </View>
                    </Content>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Header>
                            <InformationText>
                                {dataImmobile.date} ás {dataImmobile.hours}
                            </InformationText>
                            <SubTitle>
                                {dataImmobile.name}
                            </SubTitle>
                        </Header>

                        <ContainerItems>
                            <Title>{dataImmobile.valueImmobile}</Title>
                        </ContainerItems>
                        <ContainerItems>
                            <SubTitle>
                                Descrição
                            </SubTitle>
                            <InfoText>
                                {dataImmobile.observations}
                            </InfoText>
                        </ContainerItems>
                        <ContainerItems>
                            <SubTitle>
                                Informação
                            </SubTitle>
                            <ContainerInfo>
                                <InfoText>
                                    Aluguel
                                </InfoText>
                                <InfoText>
                                    {dataImmobile.valueRent}
                                </InfoText>
                            </ContainerInfo>
                            <ContainerInfo>
                                <InfoText>
                                    IPTU
                                </InfoText>
                                <InfoText>
                                    {dataImmobile.valueIptu}
                                </InfoText>
                            </ContainerInfo>
                        </ContainerItems>
                        <ContainerItems>
                            <SubTitle>
                                Detalhes
                            </SubTitle>
                            <ContainerCard>
                                <Card>
                                    <CardIcon name="form-textarea" />
                                    <InformationText>
                                        Área útil
                                    </InformationText>
                                    <InfoText>
                                        {dataImmobile.totalArea}
                                    </InfoText>
                                </Card>
                                <Card>
                                    <CardIcon name="bed-king-outline" />
                                    <InformationText>
                                        Quartos
                                    </InformationText>
                                    <InfoText>
                                        {dataImmobile.numberBedrooms}
                                    </InfoText>
                                </Card>

                            </ContainerCard>
                            <ContainerCard>
                                <Card>
                                    <CardIcon name="form-textarea" />
                                    <InformationText>
                                        Banheiros
                                    </InformationText>
                                    <InfoText>
                                        {dataImmobile.numberbathrooms}
                                    </InfoText>
                                </Card>
                                <Card>
                                    <CardIcon name="car" />
                                    <InformationText>
                                        Vagas na garagem
                                    </InformationText>
                                    <InfoText>
                                        {dataImmobile.numberVacancies}
                                    </InfoText>
                                </Card>

                            </ContainerCard>
                        </ContainerItems>
                        <ContainerItems>
                            <SubTitle>
                                Características
                            </SubTitle>
                            <ContainerCard>
                                {dataImmobile.grill &&
                                    <Items>
                                        <ItemsIcon name="grill" />
                                        <ItemsText>
                                            Churrasqueira
                                        </ItemsText>
                                    </Items>
                                }
                                {dataImmobile.pool &&
                                    <Items>
                                        <ItemsIcon name="pool" />
                                        <ItemsText>
                                            Piscina
                                        </ItemsText>
                                    </Items>
                                }

                                {dataImmobile.furniture &&
                                    <Items>
                                        <ItemsIcon name="sofa" />
                                        <ItemsText>
                                            Mobiliado
                                        </ItemsText>
                                    </Items>
                                }

                            </ContainerCard>
                            <ContainerCard>
                                {dataImmobile.elevator &&
                                    <Items>
                                        <ItemsIcon name="elevator-passenger-outline" />
                                        <ItemsText>
                                            Elevador
                                        </ItemsText>
                                    </Items>
                                }
                                {dataImmobile.serviceArea &&
                                    <Items>
                                        <ItemsIcon name="air-humidifier" />
                                        <ItemsText>
                                            Área de serviço
                                        </ItemsText>
                                    </Items>
                                }
                                {dataImmobile.bathtub &&
                                    <Items>
                                        <ItemsIcon name="bathtub" />
                                        <ItemsText>
                                            Banheira
                                        </ItemsText>
                                    </Items>
                                }

                            </ContainerCard>
                            <ContainerCard>
                                {dataImmobile.written &&
                                    <Items>
                                        <ItemsIcon name="file-document" />
                                        <ItemsText>
                                            Escriturado
                                        </ItemsText>
                                    </Items>
                                }
                                {dataImmobile.endorsed &&
                                    <Items>
                                        <ItemsIcon name="check" />
                                        <ItemsText>
                                            Averbado
                                        </ItemsText>
                                    </Items>
                                }
                                {dataImmobile.garden &&
                                    <Items>
                                        <ItemsIcon name="nature" />
                                        <ItemsText>
                                            Jardim
                                        </ItemsText>
                                    </Items>
                                }
                            </ContainerCard>
                            <ContainerCard>
                                {dataImmobile.garage &&
                                    <Items>
                                        <ItemsIcon name="garage" />
                                        <ItemsText>
                                            Garagem
                                        </ItemsText>
                                    </Items>
                                }
                                {dataImmobile.gourmet &&
                                    <Items>
                                        <ItemsIcon name="food" />
                                        <ItemsText>
                                            Aréa gourmet
                                        </ItemsText>
                                    </Items>
                                }
                                {dataImmobile.balcony &&
                                    <Items>
                                        <ItemsIcon name="balcony" />
                                        <ItemsText>
                                            Varanda
                                        </ItemsText>
                                    </Items>
                                }
                            </ContainerCard>
                            <ContainerCard>
                                {dataImmobile.partyHall &&
                                    <Items>
                                        <ItemsIcon name="party-popper" />
                                        <ItemsText>
                                            Salão de festa
                                        </ItemsText>
                                    </Items>
                                }

                                {dataImmobile.security &&
                                    <Items>
                                        <ItemsIcon name="security" />
                                        <ItemsText>
                                            Segurança 24h
                                        </ItemsText>
                                    </Items>
                                }

                            </ContainerCard>
                        </ContainerItems>
                        {location && (
                            <>
                                <ContainerItems>
                                    <SubTitle>
                                        Endereço
                                    </SubTitle>
                                    <InfoText>
                                        {dataImmobile.address}
                                    </InfoText>
                                </ContainerItems>
                                <ContainerItems>
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
                                        <Marker coordinate={location} title={dataImmobile.address} />
                                    </MapView>

                                </ContainerItems>
                            </>
                        )}

                        <ContainerIcons>
                            <Button onPress={() => handlePhone(dataImmobile.phone)}>
                                <Icon name="phone" />
                            </Button>
                            <Button onPress={() => sendEmail(dataImmobile.email)}>
                                <Icon name="mail" />
                            </Button>
                        </ContainerIcons>
                    </ScrollView>
                </ContainerCardImmobile>
            </Container>
        </DefaultContainer>
    );
}
