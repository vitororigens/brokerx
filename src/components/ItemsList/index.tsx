import { MaterialIcons } from "@expo/vector-icons";
import firestore from "@react-native-firebase/firestore";
import * as Clipboard from "expo-clipboard";
import { useState } from "react";
import { Rect } from "react-content-loader/native";
import {
  Alert,
  Linking,
  Modal,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import { Toast } from "react-native-toast-notifications";
import { database } from "../../services";
import { Options } from "../Options";

import {
  Button,
  Container,
  ContainerIcon,
  ContainerImage,
  ContainerItems,
  ContainerSkeleton,
  ContainerText,
  Icon,
  Items,
  ItemsText,
  SubTitle,
  Title,
} from "./styles";

const message = 'Informações de Contato';

type ItemsScheduleProps = {
  id: string;
  title: string;
  value: string;
  sale?: boolean;
  rent?: boolean;
  phone?: string;
  image?: string;
  adress?: string;
  description?: string
  showButton?: boolean;
  isChecked?: boolean;
  isLoading?: boolean;
  onToggle?: () => void;
  showButtonCheck?: boolean;
  onEdit?: () => void;
  onCard?: () => void;
  isFavorite?: boolean;
  date?: string;
  hours?: string;
  state?: string;
  city?: string;
};

export function ItemsList({
  value,
  sale,
  rent,
  title,
  phone,
  description,
  image,
  adress,
  date,
  hours,
  city,
  state,
  isChecked,
  onCard,
  onEdit,
  onToggle,
  id,
  showButton,
  showButtonCheck,
  isFavorite: initialIsFavorite,
  isLoading = false,
}: ItemsScheduleProps) {
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite || false);

  const handleShare = async () => {
    const shareOptions = {
      message: `${message}
      \n${title}
      \n${description}
      ${!!phone ? `\nNúmero para contato: ${phone}` : ""}
      ${!!adress ? `\nEndereço: ${adress}` : ""}
      `,
    };
    try {
      RNFS.downloadFile({
        fromUrl: image ?? "",
        toFile: `${RNFS.CachesDirectoryPath}/image.jpg`,
      })
        .promise.then(() => {
          RNFS.readFile(`${RNFS.CachesDirectoryPath}/image.jpg`, 'base64')
            .then(res => {
                // @ts-ignore
              shareOptions.url = `data:image/png;base64,${res}`;

              // option for wpp
              Share.shareSingle({
                ...shareOptions,
                // @ts-ignore
                social: Share.Social.WHATSAPP,
              }).catch(err => {
                console.log(err);
              });

              // option for instagram
              Share.shareSingle({
                ...shareOptions,
                // @ts-ignore
                social: Share.Social.INSTAGRAM,
              }).catch(err => {
                console.log(err);
              });

              // option for facebook
              Share.shareSingle({
                ...shareOptions,
                // @ts-ignore
                social: Share.Social.FACEBOOK,
              }).catch(err => {
                console.log(err);
              });
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleFavorite = async () => {
    try {
      await database.collection("Immobile").doc(id).update({
        isFavorite: !isFavorite,
      });
      setIsFavorite(!isFavorite);
      Toast.show(
        `Imóvel ${isFavorite ? "removido dos" : "adicionado aos"} favoritos!`,
        { type: "success" }
      );
    } catch (error) {
      console.error("Erro ao atualizar favorito: ", error);
      Toast.show("Erro ao atualizar favorito!", { type: "danger" });
    }
  };

  const handlePhone = () => {
    const url = `tel:${phone}`;
    Linking.openURL(url).catch((err) =>
      console.error("Error opening dialer:", err)
    );
  };

  const handleCopy = async () => {
    await Clipboard.setStringAsync(`Contact Information:\nName: ${title}`);
    Alert.alert("Copied", `Contact Information:\nName: ${title}`);
    setPopoverVisible(false);
  };

  const handleDelete = async () => {
    try {
      await firestore().collection("Immobile").doc(id).delete();
      Toast.show("Imóvel excluído!", { type: "success" });
      setPopoverVisible(false);
    } catch (error) {
      console.error("Error deleting contact:", error);
      Toast.show("Erro ao excluir contato!", { type: "danger" });
    }
  };

  return (
    <Container
      loading={isLoading}
      onPress={() => onCard && onCard()}
      onLongPress={() => setPopoverVisible(true)}
    >
      {isLoading && (
        <ContainerSkeleton backgroundColor="#f5f5f5" foregroundColor="#e0e0e0">
          <Rect width={"100%"} height={150} rx={20} ry={20} />
        </ContainerSkeleton>
      )}
      <Modal
        visible={popoverVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setPopoverVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setPopoverVisible(false)}>
          <View style={{ flex: 1 }}>
            <Options
              title={title}
              image={image}
              onCopy={handleCopy}
              onDelete={handleDelete}
              onEdit={() => {
                onEdit && onEdit();
                setPopoverVisible(false);
              }}
              showEdit
              showDelet
            />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {image ? (
        <ContainerIcon>
          <ContainerImage source={{ uri: image }} />
          <ContainerItems>
            {rent && (
              <Items>
                <ItemsText>Aluguel</ItemsText>
              </Items>
            )}
            {sale && (
              <Items>
                <ItemsText>Venda</ItemsText>
              </Items>
            )}
          </ContainerItems>
        </ContainerIcon>
      ) : (
        <ContainerIcon>
          <MaterialIcons name="add-a-photo" size={22} color="white" />
          <ContainerItems>
            {rent && (
              <Items>
                <ItemsText>Aluguel</ItemsText>
              </Items>
            )}
            {sale && (
              <Items>
                <ItemsText>Venda</ItemsText>
              </Items>
            )}
          </ContainerItems>
        </ContainerIcon>
      )}
      <View
        style={{
          flex: 1,
          padding: 5,
          height: "100%",
          justifyContent: "space-between",
        }}
      >
        <ContainerText>
          <Title>
            {title
              ? title.length > 10
                ? title.substring(0, 20) + "..."
                : title
              : ""}
          </Title>
        </ContainerText>
        <ContainerText>
          <Title>{value}</Title>
        </ContainerText>
        <ContainerText>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View>
              <SubTitle>
                {city} - {state}
              </SubTitle>
              <SubTitle>
                {date} - {hours}
              </SubTitle>
            </View>
          </View>
        </ContainerText>
      </View>
      <View>
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            padding: 5,
          }}
        >
          <Button onPress={handleShare}>
            <Icon name="share" />
          </Button>
          <Button onPress={handleFavorite}>
            <Icon name={isFavorite ? "star" : "star-outlined"} />
          </Button>
        </View>
      </View>
    </Container>
  );
}
