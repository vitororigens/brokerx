import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Rect } from "react-content-loader/native";
import { FlatList, View } from "react-native";
import { Modal } from "react-native-paper";
import { Toast } from "react-native-toast-notifications";
import { Button } from "../../components/Button";
import { DefaultContainer } from "../../components/DefaultContainer";
import { ItemsNotes } from "../../components/ItemsNotes";
import { UserInfo } from "../../components/UserInfo";
import useFirestoreCollection from "../../hooks/useFirestoreCollection";
import { useUserAuth } from "../../hooks/useUserAuth";
import { database, storage } from "../../services";
import {
  Card,
  CardLoader,
  Container,
  ContainerCard,
  Content,
  ContentSkeleton,
  Header,
  Icon,
  ImageContainer,
  StyledImage,
  SubTitle,
  Title,
} from "./styles";
import { useNavigation } from "@react-navigation/native";

export function Home() {
  const navigation = useNavigation();
  const user = useUserAuth();
  const registerData = useFirestoreCollection("Register");
  const data = useFirestoreCollection("Notes");
  const uid = user?.uid;
  const [image, setImage] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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
        .doc(registerData.length > 0 ? registerData[0].id : "")
        .update({
          imageUrl,
        });

      Toast.show("Foto alterada!", { type: "success" });
    } catch (error) {
      console.error("Erro ao alterar a foto: ", error);
      Toast.show("Erro ao alterar a foto. Tente novamente mais tarde.", {
        type: "error",
      });
    }
  };

  function handleFavorite(){
    navigation.navigate('favorite')
  }

  function handleEditItem(documentId: string) {
    navigation.navigate('newnotes', { selectedItemId: documentId });
  }

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

  // if (!isLoaded) {
  //   return <Loader />;
  // }

  return (
    <DefaultContainer showButtonGears title="Tela Inicial">
      <Container>
        <ContainerCard>
          {!isLoaded ? (
            <CardLoader backgroundColor="#f5f5f5" foregroundColor="#e0e0e0">
              <Rect width={"100%"} height={150} rx={20} ry={20} />
            </CardLoader>
          ) : (
            <Card onPress={() => setIsVisible(true)}>
              <Header>
                <Icon name="v-card" />
                <Icon name="chevron-right" />
              </Header>
              <Title>Meu cartão</Title>
              <SubTitle>Bem-vindo(a) {user?.displayName}</SubTitle>
            </Card>
          )}

          {!isLoaded ? (
            <CardLoader backgroundColor="#f5f5f5" foregroundColor="#e0e0e0">
              <Rect width={"100%"} height={150} rx={20} ry={20} />
            </CardLoader>
          ) : (
            <Card onPress={handleFavorite}>
              <Header>
                <Icon name="star" />
                <Icon name="chevron-right" />
              </Header>
              <Title>Favoritos</Title>
              <SubTitle>15 Imóveis salvos</SubTitle>
            </Card>
          )}
        </ContainerCard>
        {!isLoaded ? (
          <ContentSkeleton backgroundColor="#f5f5f5" foregroundColor="#e0e0e0">
            <Rect width={"100%"} height={150} rx={20} ry={20} />
          </ContentSkeleton>
        ) : (
          <Content style={{ height: 160 }}>
            <Header>
              <Title>Agenda</Title>
            </Header>
            <FlatList
              data={data.filter((item) => item.uid === uid)}
              renderItem={({ item }) => (
                <ItemsNotes
                  onEdit={() => handleEditItem(item.id)}
                  id={item.id}
                  date={item.date}
                  hours={item.hours}
                  notes={item.notes}
                  title={item.nameNotes}
                />
              )}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={
                <Title>você ainda não tem contatos lançados</Title>
              }
            />
          </Content>
        )}
      </Container>
      <Modal visible={isVisible}>
        <View
          style={{
            padding: 20,
          }}
        >
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

            <UserInfo
              name="user"
              title="Nome:"
              subTitle={user?.displayName ?? ""}
            />
            <UserInfo
              name="v-card"
              title="CRECI:"
              subTitle={registerData.length > 0 ? registerData[0].creci : ""}
            />
            <UserInfo
              name="old-phone"
              title="Telefone:"
              subTitle={registerData.length > 0 ? registerData[0].phone : ""}
            />
            <UserInfo
              name="mail"
              title="E-mail:"
              subTitle={user?.email ?? ""}
            />
            <UserInfo
              name="home"
              title="Imobiliária:"
              subTitle={
                registerData.length > 0 ? registerData[0].realEstate : ""
              }
            />
            <View
              style={{
                padding: 20,
              }}
            >
              <Button onPress={() => setIsVisible(false)} title={"Fechar"} />
            </View>
          </Content>
        </View>
      </Modal>
    </DefaultContainer>
  );
}
