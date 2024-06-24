import { ActivityIndicator, Alert, ScrollView, Switch, View } from "react-native";
import { DefaultContainer } from "../../components/DefaultContainer";
import { Container, StyledImage, Content, Input, Title, ImageContainer } from "./styles";
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from "react";
import { database, storage } from "../../services";
import { useUserAuth } from "../../hooks/useUserAuth";
import { Toast } from "react-native-toast-notifications";
import { Button } from "../../components/Button";
import * as ImagePicker from 'expo-image-picker';

export function NewContact() {
    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState<string | null>(null);
    const userUid = useUserAuth();
    const uid = userUid?.uid;
    const [user, setUser] = useState({
        name: '',
        cpf: '',
        phone: '',
        email: '',
        adress: '',
    });
    const [observations, setObservations] = useState('');
    const [investor, setInvestor] = useState(false);
    const [resident, setResident] = useState(false);

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
        if (user.name === '') {
            Alert.alert('Atenção!', 'Por favor, preencha todos os campos obriatórios antes de salvar.');
            return;
        }

        setIsLoading(true);

        let imageUrl = '';
        if (image) {
            imageUrl = await uploadImage(image);
        }

        database
            .collection('Contacts')
            .doc()
            .set({
                name: user.name,
                cpf: user.cpf,
                phone: user.phone,
                email: user.email,
                adress: user.adress,
                investor,
                resident,
                uid,
                observations,
                imageUrl,
            })
            .then(() => {
                Toast.show('Contato adicionado!', { type: 'success' });
                setUser({
                    name: '',
                    cpf: '',
                    email: '',
                    phone: '',
                    adress: ''
                });
                setObservations('');
                setInvestor(false);
                setResident(false);
                setImage(null);
            })
            .catch(error => {
                console.error('Erro ao criar contato: ', error);
                Toast.show('Erro ao criar contato!', { type: 'danger' });
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <DefaultContainer showButtonBack title="Adicionar contato">
            <Container>
                <Content>
                    {image ? (
                        <StyledImage source={{ uri: image }} />
                    ) : (
                        <ImageContainer onPress={pickImage}>
                            <MaterialIcons name="add-a-photo" size={36} color="white" />
                        </ImageContainer>
                    )}
                </Content>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Title>Nome:</Title>
                    <Input
                        value={user.name}
                        onChangeText={(text) => setUser({ ...user, name: text })}
                    />
                    <Title>CPF:</Title>
                    <Input
                        value={user.cpf}
                        onChangeText={(text) => setUser({ ...user, cpf: text })}
                    />
                    <Title>Telefone:</Title>
                    <Input
                        value={user.phone}
                        onChangeText={(text) => setUser({ ...user, phone: text })}
                    />
                    <Title>E-mail:</Title>
                    <Input
                        value={user.email}
                        onChangeText={(text) => setUser({ ...user, email: text })}
                    />
                    <Title>Endereço:</Title>
                    <Input
                        value={user.adress}
                        onChangeText={(text) => setUser({ ...user, adress: text })}
                    />
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", marginRight: 10 }}>
                            <Switch
                                trackColor={{ false: "#0F2851", true: "#0F2851" }}
                                thumbColor={investor ? "#f4f3f4" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={() => setInvestor(!investor)}
                                value={investor}
                                style={{ width: 50, marginRight: 10 }}
                            />
                            <Title>Investidor</Title>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Switch
                                trackColor={{ false: "#b91c1c", true: "#b91c1c" }}
                                thumbColor={resident ? "#f4f3f4" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={() => setResident(!resident)}
                                value={resident}
                                style={{ width: 50, marginRight: 10 }}
                            />
                            <Title>Morador</Title>
                        </View>
                    </View>
                    <Title>Observações:</Title>
                    <Input
                        value={observations}
                        onChangeText={(text) => setObservations(text)}
                    />
                    <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', paddingLeft: 40, paddingRight: 40, paddingTop: 20  }}>
                         <Button title={isLoading ? <ActivityIndicator /> : "Salvar"} onPress={handleSaveForm} disabled={isLoading} />
                    </View>
                </ScrollView>
            </Container>
        </DefaultContainer>
    );
}
