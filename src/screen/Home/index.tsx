import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { useEffect, useRef, useState } from "react";
import { Rect } from "react-content-loader/native";
import { FlatList, View } from "react-native";
import { Modal } from "react-native-paper";
import Share from "react-native-share";
import { Toast } from "react-native-toast-notifications";
import { captureRef } from "react-native-view-shot";
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

export function Home() {
  const navigation = useNavigation();
  const user = useUserAuth();
  const data = useFirestoreCollection("Notes");
  const uid = user?.uid;
  const [image, setImage] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const viewRef = useRef<View>(null);
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const registerData = useFirestoreCollection("Register").find(
    (item) => item.id === uid
  );

  if (status === null) {
    requestPermission();
  }

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
        .doc(!!registerData ? registerData.id : "")
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

  function handleFavorite() {
    navigation.navigate("favorite");
  }

  function handleEditItem(documentId: string) {
    navigation.navigate("newnotes", { selectedItemId: documentId });
  }

  const shareCard = async () => {
    const title = "Meu Cartão de Contato";
    const description = "Aqui estão os meus dados de contato.";
    const phone = !!registerData ? registerData.phone : "";
    const address = !!registerData ? registerData.realEstate : "";
    const message = `${title}\n${description}\n${
      phone ? `Número para contato: ${phone}` : ""
    }\n${address ? `Endereço: ${address}` : ""}`;

    try {
      if (viewRef.current) {
        setTimeout(async () => {
          try {
            // @ts-ignore
            const uri = await captureRef(viewRef.current, {
              format: "png",
              quality: 0.8,
            });
            console.log("Captured image URI:", uri);

            const shareOptions = {
              title,
              message,
              url: uri,
            };

            const platforms = [
              Share.Social.WHATSAPP,
              Share.Social.INSTAGRAM,
              Share.Social.FACEBOOK,
            ];

            for (const platform of platforms) {
              try {
                await Share.shareSingle({
                  ...shareOptions,
                  // @ts-ignore
                  social: platform,
                });
              } catch (err) {
                console.log(`Error sharing to ${platform}:`, err);
              }
            }
          } catch (error) {
            console.error("Error capturing view:", error);
          }
        }, 100);
      } else {
        console.log("viewRef.current is null");
      }
    } catch (error) {
      console.error("Error capturing view:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (!!registerData && registerData.imageUrl) {
        setImage(registerData.imageUrl);
      }
      setIsLoaded(true);
    };

    if (uid) {
      fetchUserData();
    }
  }, [uid, registerData]);

  useEffect(() => {
    if (data.length && !!registerData) {
      setIsLoaded(true);
    }
  }, [data, registerData]);

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
              <SubTitle>{registerData?.favorites.length} Imóveis salvos</SubTitle>
            </Card>
          )}
        </ContainerCard>
        {!isLoaded ? (
          <ContentSkeleton backgroundColor="#f5f5f5" foregroundColor="#e0e0e0">
            <Rect width={"100%"} height={150} rx={20} ry={20} />
          </ContentSkeleton>
        ) : (
          <Content style={{ flex: 1 }}>
            <Header>
              <Title>Agenda</Title>
            </Header>
            <FlatList
              showsVerticalScrollIndicator={false}
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
                <Title>Você ainda não tem contatos lançados</Title>
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
          <Content ref={viewRef}>
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
              subTitle={!!registerData ? registerData.creci : ""}
            />
            <UserInfo
              name="old-phone"
              title="Telefone:"
              subTitle={!!registerData ? registerData.phone : ""}
            />
            <UserInfo
              name="mail"
              title="E-mail:"
              subTitle={user?.email ?? ""}
            />
            <UserInfo
              name="home"
              title="Imobiliária:"
              subTitle={!!registerData ? registerData.realEstate : ""}
            />
          </Content>
          <Button onPress={() => setIsVisible(false)} title="Fechar" />
          <Button onPress={shareCard} title="Compartilhar" />
        </View>
      </Modal>
    </DefaultContainer>
  );
}
