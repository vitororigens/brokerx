import { ActivityIndicator, ScrollView, Switch, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { DefaultContainer } from '../../components/DefaultContainer';
import { ButtonImage, Container,  Divider,  Icon, ImageContainer, Input, InputObservation, StyledImage, SubTitle, Title, TitleButton } from './styles';
import { useState } from 'react';

import { useUserAuth } from '../../hooks/useUserAuth';
import * as ImagePicker from 'expo-image-picker';
import { database, storage } from "../../services";
import { Toast } from 'react-native-toast-notifications';
import { Button } from "../../components/Button";

type ImmobileProps = {
  showPicker: boolean;
}

export function Immobile({ showPicker }: ImmobileProps) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [status, setStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const user = useUserAuth();
  const uid = user?.uid;
  const [image, setImage] = useState<string | null>(null);
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
  const [immobileSituation, setImmobileSituation] = useState('');
  const [valueIptu, setValueIptu] = useState('');
  const [situation, setSituation] = useState(false);
  const [sale, setSale] = useState(false);
  const [rent, setRent] = useState(false);
  const [valueImmobile, setValueImmobile] = useState('');
  const [brokerFee, setBrokerFee] = useState('');
  const [valueRent, setValueRent] = useState('');
  const [commission, setCommission] = useState('');

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

  const uploadImage = async (uri: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const imageRef = storage.ref(`contacts/${uid}/${new Date().getTime()}`);
    await imageRef.put(blob);
    return await imageRef.getDownloadURL();
  };

  const handleSaveForm = async () => {
    setIsLoading(true);

    let imageUrl = '';
    if (image) {
        imageUrl = await uploadImage(image);
    }

    database
        .collection('Immobile')
        .doc()
        .set({
            uid,
            observations,
            imageUrl,
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
            immobileSituation,
            valueIptu,
            situation,
            sale,
            rent,
            valueImmobile,
            brokerFee,
            valueRent,
            commission,
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
            setImmobileSituation('');
            setValueIptu('');
            setSituation(false);
            setSale(false);
            setRent(false);
            setValueImmobile('');
            setBrokerFee('');
            setValueRent('');
            setCommission('');
        })
        .catch(error => {
            console.error('Erro ao criar contato: ', error);
            Toast.show('Erro ao criar contato!', { type: 'danger' });
        })
        .finally(() => {
            setIsLoading(false);
        });
};


  return (
    <DefaultContainer showButtonGears title='Adicionar Imóvel'>
      <Container>
        <ScrollView showsVerticalScrollIndicator={false}>
          {image ? (
            <StyledImage source={{ uri: image }} />
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
            <ButtonImage type='SECONDARY'>
              <TitleButton>
                Excluir
              </TitleButton>
            </ButtonImage>
          </View>
          <Title>Localização</Title>
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
          <Divider />
          <Title>Informações</Title>
          <SubTitle>Tipo de imóvel:</SubTitle>
          <Picker
            style={{
              backgroundColor: '#aeaeae',
              borderRadius: 8
            }}
            selectedValue={selectedCategory}
            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          >
            <Picker.Item label="Apartamento" value="Apartamento" />
            <Picker.Item label="Casa" value="Casa" />
          </Picker>
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
          <Divider />
          <Title>Proprietário</Title>
          <SubTitle>Nome:</SubTitle>
          <Input
            value={owner}
            onChangeText={(text) => setOwner(text)}
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
          <Divider />
          <Title style={{
            textAlign: 'center',
            marginBottom: 20
          }}>DESTINAÇÃO</Title>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }}>
            <View style={{ width: '45%', flexDirection: 'row', alignItems: 'center' }}>

              <Switch
                trackColor={{ false: "#0F2851", true: "#0F2851" }}
                thumbColor={sale ? "#ffff00" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setSale(!sale)}
                value={sale}
                style={{
                  width: 50,
                  marginRight: 10
                }}
              />
              <SubTitle>Venda?</SubTitle>
            </View>
            <View style={{ width: '45%', flexDirection: 'row', alignItems: 'center' }}>

              <Switch
                trackColor={{ false: "#0F2851", true: "#0F2851" }}
                thumbColor={rent ? "#ffff00" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setRent(!rent)}
                value={rent}
                style={{
                  width: 50,
                  marginRight: 10
                }}
              />
              <SubTitle>Aluguel?</SubTitle>
            </View>
          </View>

          <SubTitle>Valor do imóvel:</SubTitle>
          <Input
            value={valueImmobile}
            onChangeText={(text) => setValueImmobile(text)}
          />
          <SubTitle>Taxa corretor:</SubTitle>
          <Input
            value={brokerFee}
            onChangeText={(text) => setBrokerFee(text)}
          />
          <SubTitle>Valor aluguel:</SubTitle>
          <Input
            value={valueRent}
            onChangeText={(text) => setValueRent(text)}
          />
          <View>
          <SubTitle>Comissão:</SubTitle>
          <Input
            value={commission}
            onChangeText={(text) => setCommission(text)}
          />
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
    </DefaultContainer>
  );
}
