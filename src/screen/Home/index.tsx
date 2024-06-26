import { Container, Content, ImageContainer, StyledImage, Title } from "./styles";
import { MaterialIcons } from '@expo/vector-icons';
import { DefaultContainer } from "../../components/DefaultContainer";
import { UserInfo } from "../../components/UserInfo";
import { database, storage } from "../../services";
import { useUserAuth } from "../../hooks/useUserAuth";
import useFirestoreCollection from "../../hooks/useFirestoreCollection";
import { FlatList } from "react-native";
import { ItemsNotes } from "../../components/ItemsNotes";
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from "react";
import { Toast } from "react-native-toast-notifications";
import { Loader } from "../../components/Loader";

export function Home() {
  const user = useUserAuth();
  const registerData = useFirestoreCollection('Register');
  const data = useFirestoreCollection('Notes');
  const uid = user?.uid;
  const [image, setImage] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      handleEditPhoto(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const imageRef = storage.ref(`user/${uid}/${new Date().getTime()}`);
    await imageRef.put(blob);
    return await imageRef.getDownloadURL();
  };

  const handleEditPhoto = async (uri: string) => {
    try {
      const imageUrl = await uploadImage(uri);

      await database
        .collection("Register")
        .doc(registerData.length > 0 ? registerData[0].id : '')
        .update({
          imageUrl
        });

      Toast.show("Foto alterada!", { type: "success" });
    } catch (error) {
      console.error("Erro ao alterar a foto: ", error);
      Toast.show("Erro ao alterar a foto. Tente novamente mais tarde.", { type: "error" });
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (registerData.length > 0 && registerData[0].imageUrl) {
        setImage(registerData[0].imageUrl);
      }
      setIsLoaded(true);  
    };

    if (uid) {
      fetchUserData();
    }
  }, [uid, registerData]);

  useEffect(() => {
    if (data.length > 0 && registerData.length > 0) {
      setIsLoaded(true); 
    }
  }, [data, registerData]);

  if (!isLoaded) {
    return <Loader />;
  }

  return (
    <DefaultContainer showButtonGears title="Tela Inicial">
      <Container>
        <Content>
          <Title>Dados do Corretor</Title>
          {image ? (
            <ImageContainer onPress={pickImage}>
              <StyledImage source={{ uri: image }} />
            </ImageContainer>
          ) : (
            <ImageContainer onPress={pickImage}>
              <MaterialIcons name="add-a-photo" size={36} color="white" />
            </ImageContainer>
          )}
        </Content>
        <UserInfo name="user" title="Nome:" subTitle={user?.displayName ?? ''} />
        <UserInfo name="v-card" title="CRECI:" subTitle={registerData.length > 0 ? registerData[0].creci : ''} />
        <UserInfo name="old-phone" title="Telefone:" subTitle={registerData.length > 0 ? registerData[0].phone : ''} />
        <UserInfo name="mail" title="E-mail:" subTitle={user?.email ?? ''} />
        <UserInfo name="home" title="Imobiliária:" subTitle={registerData.length > 0 ? registerData[0].realEstate : ''} />
      </Container>
      <Container style={{ height: 160 }}>
        <Content>
          <Title>Agenda</Title>
        </Content>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <ItemsNotes date={item.date} hours={item.hours} notes={item.notes} title={item.nameNotes} />
          )}
          keyExtractor={(item) => item.id}
        />
      </Container>
    </DefaultContainer>
  );
}
