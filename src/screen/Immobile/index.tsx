import { ActivityIndicator, Dimensions, ScrollView, Switch, View } from 'react-native';
import RNPickerSelect from "react-native-picker-select";
import { DefaultContainer } from '../../components/DefaultContainer';
import { ButtonImage, ButtonPlus, Container, Icon, IconPlus, ImageContainer, Input, InputObservation, RadioButton, StyledImage, SubTitle, Title, TitleButton } from './styles';
import { useEffect, useRef, useState } from 'react';

import { useUserAuth } from '../../hooks/useUserAuth';
import * as ImagePicker from 'expo-image-picker';
import { database, storage } from "../../services";
import { Toast } from 'react-native-toast-notifications';
import { Button } from "../../components/Button";
import { useTheme } from 'styled-components/native';
import { CustomModal } from '../../components/CustomModal';
import useFirestoreCollection from '../../hooks/useFirestoreCollection';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';

const { width: windowWidth } = Dimensions.get('window');

export function Immobile() {
  const data = useFirestoreCollection('Contacts');
  const { COLORS } = useTheme()
  const [selectedCategory, setSelectedCategory] = useState('');
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const user = useUserAuth();
  const uid = user?.uid;
  const route = useRoute();
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState('');
  const { selectedItemId }: { selectedItemId?: string } = route.params || {};

  const [location, setLocation] = useState({
    address: '',
    number: '',
    city: '',
    cep: '',
    state: '',
  });
  const [information, setInformation] = useState({
    constructionArea: '',
    toatalArea: '',
    registration: '',
    numberbathrooms: '',
    numberBedrooms: '',
    numberSuites: '',
    positionSun: '',
    numberRooms: '',
    numberVacancies: ''
  });
  const [pool, setPool] = useState(false);
  const [gourmet, setGourmet] = useState(false);
  const [grill, setGrill] = useState(false);
  const [furniture, setFurniture] = useState(false);
  const [observations, setObservations] = useState('');
  const [owner, setOwner] = useState('');
  const [phone, setPhone] = useState('');
  const [immobileSituation, setImmobileSituation] = useState('');
  const [valueIptu, setValueIptu] = useState('');
  const [situation, setSituation] = useState(false);
  const [sale, setSale] = useState(false);
  const [rent, setRent] = useState(false);
  const [financing, setFinancing] = useState(false);
  const [valueImmobile, setValueImmobile] = useState('');
  const [brokerFee, setBrokerFee] = useState('');
  const [valueRent, setValueRent] = useState('');
  const [commission, setCommission] = useState('');
  const [visible, setVisible] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const uploadImage = async (uri: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const imageRef = storage.ref(`immobile/${uid}/${new Date().getTime()}`);
    await imageRef.put(blob);
    return await imageRef.getDownloadURL();
  };



  const handleSaveForm = async () => {
    setIsLoading(true);

    const imageUrls = await Promise.all(images.map(image => uploadImage(image)));

    const docRef = selectedItemId
      ? database.collection('Immobile').doc(selectedItemId)
      : database.collection('Immobile').doc();

    docRef.set({
      uid,
      observations,
      imageUrls,
      name,
      address: location.address,
      number: location.number,
      city: location.city,
      cep: location.cep,
      state: location.state,
      constructionArea: information.constructionArea,
      toatalArea: information.toatalArea,
      registration: information.registration,
      numberbathrooms: information.numberbathrooms,
      numberBedrooms: information.numberBedrooms,
      numberSuites: information.numberSuites,
      positionSun: information.positionSun,
      numberRooms: information.numberRooms,
      numberVacancies: information.numberVacancies,
      pool,
      gourmet,
      grill,
      furniture,
      owner,
      phone,
      immobileSituation,
      valueIptu,
      situation,
      sale,
      rent,
      financing,
      valueImmobile,
      brokerFee,
      valueRent,
      commission,
      selectedCategory,
      visible
    })
      .then(() => {
        Toast.show('Imóvel adicionado!', { type: 'success' });

        // Limpar todos os estados do formulário
        setObservations('');
        setImage(null);
        setLocation({
          address: '',
          number: '',
          city: '',
          cep: '',
          state: ''
        });
        setInformation({
          constructionArea: '',
          toatalArea: '',
          registration: '',
          numberbathrooms: '',
          numberBedrooms: '',
          numberSuites: '',
          positionSun: '',
          numberRooms: '',
          numberVacancies: ''
        });
        setPool(false);
        setGourmet(false);
        setGrill(false);
        setFurniture(false);
        setOwner('');
        setPhone('');
        setImmobileSituation('');
        setValueIptu('');
        setSituation(false);
        setSale(false);
        setRent(false);
        setFinancing(false);
        setVisible(false);
        setValueImmobile('');
        setBrokerFee('');
        setValueRent('');
        setCommission('');
        setName('');
      })
      .catch(error => {
        console.error('Erro ao criar contato: ', error);
        Toast.show('Erro ao criar contato!', { type: 'danger' });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  function handleContact() {
    setConfirmModalVisible(true);
  }

  const handleDeleteLastImage = () => {
    setImages(prevImages => prevImages.slice(0, -1));
  };

  useEffect(() => {
    if (selectedItemId) {
      database.collection("Immobile").doc(selectedItemId).get().then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          console.log("Fetched data:", data);
          if (data) {
            setImages(data.imageUrls || []);
            setObservations(data.observations || '');
            setLocation({
              address: data.address || '',
              number: data.number || '',
              city: data.city || '',
              cep: data.cep || '',
              state: data.state || ''
            });
            setInformation({
              constructionArea: data.constructionArea || '',
              toatalArea: data.toatalArea || '',
              registration: data.registration || '',
              numberbathrooms: data.numberbathrooms || '',
              numberBedrooms: data.numberBedrooms || '',
              numberSuites: data.numberSuites || '',
              positionSun: data.positionSun || '',
              numberRooms: data.numberRooms || '',
              numberVacancies: data.numberVacancies || ''
            });
            setPool(data.pool || false);
            setGourmet(data.gourmet || false);
            setGrill(data.grill || false);
            setFurniture(data.furniture || false);
            setOwner(data.owner || '');
            setPhone(data.phone || '');
            setImmobileSituation(data.immobileSituation || '');
            setValueIptu(data.valueIptu || '');
            setSituation(data.situation || false);
            setSale(data.sale || false);
            setRent(data.rent || false);
            setFinancing(data.financing || false);
            setVisible(data.visible || false);
            setValueImmobile(data.valueImmobile || '');
            setBrokerFee(data.brokerFee || '');
            setValueRent(data.valueRent || '');
            setCommission(data.commission || '');
            setName(data.name || '');
          }
        }
      });
    }
  }, [selectedItemId]);

  return (
    <DefaultContainer showButtonGears title='Adicionar Imóvel'>
      <Container>
        <ScrollView showsVerticalScrollIndicator={false}>
          {images.length > 0 ? (
            <View>
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
              <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                {images.map((_, index) => (
                  <RadioButton
                    key={index}
                    style={{ backgroundColor: index === currentIndex ? COLORS.BLUE_800 : COLORS.GRAY_400 }}
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
              <Icon name="add-a-photo" />
            </ImageContainer>
          )}
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
            <ButtonImage type='PRIMARY' onPress={pickImage} disabled={isLoading}>
              <TitleButton>
                {isLoading ? <ActivityIndicator /> : 'Adicionar'}
              </TitleButton>
            </ButtonImage>
            <ButtonImage type='SECONDARY' onPress={handleDeleteLastImage}>
              <TitleButton>
                Excluir
              </TitleButton>
            </ButtonImage>
          </View>
          <SubTitle>Nome:</SubTitle>
          <Input
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <Title style={{
            textAlign: 'center',
            marginBottom: 20,
            marginTop: 20
          }}>LOCALIZAÇÃO</Title>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: '30%', marginRight: 15 }}>
              <SubTitle>CEP:</SubTitle>
              <Input
                value={location.cep}
                onChangeText={(text) => setLocation({ ...location, cep: text })}
              />
            </View>
            <View style={{ width: '65%' }}>
              <SubTitle>Estado:</SubTitle>
              <Input
                value={location.state}
                onChangeText={(text) => setLocation({ ...location, state: text })}
              />
            </View>
          </View>
          <SubTitle>Endereço:</SubTitle>
          <Input
            value={location.address}
            onChangeText={(text) => setLocation({ ...location, address: text })}
          />
          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: '30%', marginRight: 15 }}>
              <SubTitle>Número:</SubTitle>
              <Input
                value={location.number}
                onChangeText={(text) => setLocation({ ...location, number: text })}
              />
            </View>
            <View style={{ width: '65%' }}>
              <SubTitle>Cidade:</SubTitle>
              <Input
                value={location.city}
                onChangeText={(text) => setLocation({ ...location, city: text })}
              />
            </View>
          </View>


          <Title style={{
            textAlign: 'center',
            marginBottom: 20,
            marginTop: 20
          }}>INFORMAÇÕES</Title>
          <SubTitle>Tipo de imóvel:</SubTitle>



          <RNPickerSelect
            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
            items={[
              { label: "Apartamento", value: "apartamento" },
              { label: "Casa", value: "casa" },
              { label: "Terreno", value: "terreno" },
              { label: "Comercial", value: "comercial" },
              { label: "Chácara", value: "chácara" },
              { label: "Outro", value: "outro" }
            ]}
            value={selectedCategory}
            placeholder={{ label: "Apartamento", value: "apartamento" }}
            useNativeAndroidPickerStyle={false}
            style={{
              inputIOS: {
                fontSize: 16,
                paddingVertical: 12,
                paddingHorizontal: 10,
                color: COLORS.BLUE_800,
                backgroundColor: COLORS.GRAY_400,
                borderRadius: 8,
                marginBottom: 10,
                paddingRight: 30,
              },
              inputAndroid: {
                fontSize: 16,
                paddingHorizontal: 10,
                paddingVertical: 8,
                color: COLORS.BLUE_800,
                paddingRight: 30,
                backgroundColor: COLORS.GRAY_400,
              },
              iconContainer: {
                top: 10,
                right: 10,
              },
            }}
            Icon={() => <Ionicons name="chevron-down" size={24} color="white" />}
          />
          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: '33%', marginRight: 15 }}>
              <SubTitle>Matrícula:</SubTitle>
              <Input
                value={information.registration}
                onChangeText={(text) => setInformation({ ...information, registration: text })}
              />
            </View>
            <View style={{ width: '28%', marginRight: 15 }}>
              <SubTitle>Área total:</SubTitle>
              <Input
                value={information.toatalArea}
                onChangeText={(text) => setInformation({ ...information, toatalArea: text })}
              />
            </View>
            <View style={{ width: '28%' }}>
              <SubTitle>Área Const.:</SubTitle>
              <Input
                value={information.constructionArea}
                onChangeText={(text) => setInformation({ ...information, constructionArea: text })}
              />

            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: '33%', marginRight: 15 }}>
              <SubTitle>N° Banheiros:</SubTitle>
              <Input
                value={information.numberbathrooms}
                onChangeText={(text) => setInformation({ ...information, numberbathrooms: text })}
              />
            </View>
            <View style={{ width: '28%', marginRight: 15 }}>
              <SubTitle>N° Quartos:</SubTitle>
              <Input
                value={information.numberBedrooms}
                onChangeText={(text) => setInformation({ ...information, numberBedrooms: text })}
              />
            </View>
            <View style={{ width: '28%' }}>
              <SubTitle>N° Suítes:</SubTitle>
              <Input
                value={information.numberSuites}
                onChangeText={(text) => setInformation({ ...information, numberSuites: text })}
              />
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: '33%', marginRight: 15 }}>
              <SubTitle>Posição sol:</SubTitle>
              <Input
                value={information.positionSun}
                onChangeText={(text) => setInformation({ ...information, positionSun: text })}
              />
            </View>
            <View style={{ width: '28%', marginRight: 15 }}>
              <SubTitle>N° Salas:</SubTitle>
              <Input
                value={information.numberRooms}
                onChangeText={(text) => setInformation({ ...information, numberRooms: text })}
              />
            </View>
            <View style={{ width: '28%' }}>
              <SubTitle>N° Vagas:</SubTitle>
              <Input
                value={information.numberVacancies}
                onChangeText={(text) => setInformation({ ...information, numberVacancies: text })}
              />
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
            <View style={{ width: '45%', flexDirection: 'row', alignItems: 'center' }}>
              <SubTitle>Piscina?</SubTitle>
              <Switch
                trackColor={{ false: "#0F2851", true: "#0F2851" }}
                thumbColor={pool ? "#ffff00" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setPool(!pool)}
                value={pool}
                style={{
                  width: 50,
                  marginRight: 10
                }}
              />
            </View>
            <View style={{ width: '45%', flexDirection: 'row', alignItems: 'center' }}>
              <SubTitle>Gourmet?</SubTitle>
              <Switch
                trackColor={{ false: "#0F2851", true: "#0F2851" }}
                thumbColor={gourmet ? "#ffff00" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setGourmet(!gourmet)}
                value={gourmet}
                style={{
                  width: 50,
                  marginRight: 10
                }}
              />
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
            <View style={{ width: '45%', flexDirection: 'row', alignItems: 'center' }}>
              <SubTitle>Churrasqueira?</SubTitle>
              <Switch
                trackColor={{ false: "#C00905", true: "#C00905" }}
                thumbColor={grill ? "#ffff00" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setGrill(!grill)}
                value={grill}
                style={{
                  width: 50,
                  marginRight: 10
                }}
              />
            </View>
            <View style={{ width: '45%', flexDirection: 'row', alignItems: 'center' }}>
              <SubTitle>Mobiliário</SubTitle>
              <Switch
                trackColor={{ false: "#C00905", true: "#C00905" }}
                thumbColor={furniture ? "#ffff00" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setFurniture(!furniture)}
                value={furniture}
                style={{
                  width: 50,
                  marginRight: 10
                }}
              />
            </View>
          </View>
          <SubTitle>Observações:</SubTitle>
          <InputObservation
            value={observations}
            onChangeText={(text) => setObservations(text)}
            multiline
            numberOfLines={4}
          />

          <Title style={{
            textAlign: 'center',
            marginBottom: 20,
            marginTop: 20
          }}>PROPRIETARIO</Title>
          <SubTitle>Nome:</SubTitle>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <View style={{ width: '80%' }}>

              <Input
                value={owner}
                onChangeText={(text) => setOwner(text)}
              />

            </View>
            <ButtonPlus onPress={handleContact}>
              <IconPlus name="plus" />
            </ButtonPlus>
          </View>


          <SubTitle>Telefone:</SubTitle>
          <Input
            value={phone}
            onChangeText={(text) => setPhone(text)}
          />
          <SubTitle>Situação:</SubTitle>
          <Input
            value={immobileSituation}
            onChangeText={(text) => setImmobileSituation(text)}
          />

          <SubTitle>Valor IPTU:</SubTitle>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>

            <View style={{ width: '55%', flexDirection: 'row', alignItems: 'center' }}>

              <Input
                value={valueIptu}
                onChangeText={(text) => setValueIptu(text)}
              />
            </View>
            <View style={{ width: '35%', flexDirection: 'row', alignItems: 'center' }}>
              <SubTitle>Regular:</SubTitle>
              <Switch
                trackColor={{ false: "#0F2851", true: "#0F2851" }}
                thumbColor={situation ? "#ffff00" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setSituation(!situation)}
                value={situation}
                style={{
                  width: 50,
                  marginRight: 10
                }}
              />
            </View>
          </View>

          <Title style={{
            textAlign: 'center',
            marginBottom: 20
          }}>DESTINAÇÃO</Title>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
            <View style={{ width: '23%', flexDirection: 'row', alignItems: 'center' }}>

              <Switch
                trackColor={{ false: "#0F2851", true: "#0F2851" }}
                thumbColor={sale ? "#ffff00" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setSale(!sale)}
                value={sale}
                style={{
                  width: 45
                }}
              />
              <SubTitle>Venda?</SubTitle>
            </View>
            <View style={{ width: '23%', flexDirection: 'row', alignItems: 'center' }}>

              <Switch
                trackColor={{ false: "#0F2851", true: "#0F2851" }}
                thumbColor={rent ? "#ffff00" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setRent(!rent)}
                value={rent}
                style={{
                  width: 40
                }}
              />
              <SubTitle>Aluguel?</SubTitle>
            </View>
            <View style={{ width: '33%', flexDirection: 'row', alignItems: 'center' }}>

              <Switch
                trackColor={{ false: "#0F2851", true: "#0F2851" }}
                thumbColor={financing ? "#ffff00" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setFinancing(!financing)}
                value={financing}
                style={{
                  width: 45
                }}
              />
              <SubTitle>Financ.?</SubTitle>
            </View>
          </View>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            <View
              style={{
                width: '48%'
              }}
            >
              <SubTitle>Valor do imóvel:</SubTitle>
              <Input
                value={valueImmobile}
                onChangeText={(text) => setValueImmobile(text)}
              />
            </View>
            <View
              style={{
                width: '48%'
              }}>
              <SubTitle>Taxa corretor:</SubTitle>
              <Input
                value={brokerFee}
                onChangeText={(text) => setBrokerFee(text)}
              />
            </View>
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10
          }}>
            <View
              style={{
                width: '48%'
              }}
            >
              <SubTitle>Valor aluguel:</SubTitle>
              <Input
                value={valueRent}
                onChangeText={(text) => setValueRent(text)}
              />
            </View>
            <View
              style={{
                width: '48%'
              }}>
              <SubTitle>Comissão:</SubTitle>
              <Input
                value={commission}
                onChangeText={(text) => setCommission(text)}
              />
            </View>
          </View>

          <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>

            <Switch
              trackColor={{ false: "#0F2851", true: "#0F2851" }}
              thumbColor={visible ? "#ffff00" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setVisible(!visible)}
              value={visible}
              style={{
                width: 45
              }}
            />
            <SubTitle>Tornar publico?</SubTitle>
          </View>

          <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{
              width: 150
            }}>
              <Button title={isLoading ? <ActivityIndicator /> : "Salvar"} onPress={handleSaveForm} disabled={isLoading} />
            </View>
          </View>
        </ScrollView>
      </Container>
      <CustomModal
        animationType="slide"
        transparent={true}
        onCancel={() => setConfirmModalVisible(false)}
        onClose={() => setConfirmModalVisible(false)}
        onConfirm={(selectedItems: string[]) => {
          const selectedContact = data.find(item => item.id === selectedItems[0]);
          if (selectedContact) {
            setOwner(selectedContact.name);
            setPhone(selectedContact.phone)
          }
          setConfirmModalVisible(false);
        }}

        title="Selecione um contato"
        visible={confirmModalVisible}
      />
    </DefaultContainer>
  );
}
