import { View, Linking, Alert, Modal, TouchableWithoutFeedback } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import Share from 'react-native-share';
import { Button, Container, ContainerIcon, ContainerImage, ContainerItems, ContainerText, DivaiderInformation, Divider, Icon, Items, ItemsText, SubTitle, Title } from "./styles";
import { useState } from "react";
import firestore from '@react-native-firebase/firestore';
import { Toast } from 'react-native-toast-notifications';
import * as Clipboard from 'expo-clipboard';
import { Options } from "../Options";
import { database } from "../../services";
import { date } from "zod";

type ItemsScheduleProps = {
    id: string;
    title: string;
    value: string;
    sale?: boolean;
    rent?: boolean;
    phone?: string;
    image?: string;
    adress?: string;
    showButton?: boolean;
    isChecked?: boolean;
    onToggle?: () => void;
    showButtonCheck?: boolean;
    onEdit?: () => void;
    onCard?: () => void;
    isFavorite?: boolean;
    date?: string;
    hours?: string;
    state?: string;
    city?: string;
}

export function ItemsList({ value, sale, rent, title, phone, image, adress, date, hours, city, state, isChecked, onCard, onEdit, onToggle, id, showButton, showButtonCheck, isFavorite: initialIsFavorite }: ItemsScheduleProps) {
    const [popoverVisible, setPopoverVisible] = useState(false);
    const [isFavorite, setIsFavorite] = useState(initialIsFavorite || false);

    const handleShare = async () => {
        try {
            await Share.open({
                message: `Contact Information:\nName: ${title}\nPhone: ${phone}`,
            });
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    const handleFavorite = async () => {
        try {
            await database.collection('Immobile').doc(id).update({
                isFavorite: !isFavorite
            });
            setIsFavorite(!isFavorite);
            Toast.show(`Imóvel ${isFavorite ? 'removido dos' : 'adicionado aos'} favoritos!`, { type: 'success' });
        } catch (error) {
            console.error('Erro ao atualizar favorito: ', error);
            Toast.show('Erro ao atualizar favorito!', { type: 'danger' });
        }
    };

    const handlePhone = () => {
        const url = `tel:${phone}`;
        Linking.openURL(url).catch(err => console.error('Error opening dialer:', err));
    };

    const handleCopy = async () => {
        await Clipboard.setStringAsync(`Contact Information:\nName: ${title}`);
        Alert.alert('Copied', `Contact Information:\nName: ${title}`);
        setPopoverVisible(false);
    };

    const handleDelete = async () => {
        try {
            await firestore().collection('Immobile').doc(id).delete();
            Toast.show('Imóvel excluído!', { type: 'success' });
            setPopoverVisible(false);
        } catch (error) {
            console.error('Error deleting contact:', error);
            Toast.show('Erro ao excluir contato!', { type: 'danger' });
        }
    };

    return (
        <Container onPress={() => onCard && onCard()} onLongPress={() => setPopoverVisible(true)}>
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
                            onEdit={() => { onEdit && onEdit(); setPopoverVisible(false); }}
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
                        {rent && <Items>
                            <ItemsText>
                                Aluguel
                            </ItemsText>
                        </Items>}
                        {sale && <Items>
                            <ItemsText>
                                Venda
                            </ItemsText>
                        </Items>}
                    </ContainerItems>
                </ContainerIcon>
            ) : (
                <ContainerIcon>
                    <MaterialIcons name="add-a-photo" size={22} color="white" />
                    <ContainerItems>
                        {rent && <Items>
                            <ItemsText>
                                Aluguel
                            </ItemsText>
                        </Items>}
                        {sale && <Items>
                            <ItemsText>
                                Venda
                            </ItemsText>
                        </Items>}
                    </ContainerItems>
                </ContainerIcon>
            )}
            <View style={{
                flex: 1,
                padding: 5,
                height: '100%',
                justifyContent: 'space-between'
            }}>
                <ContainerText>
                    <Title>{title ? title.length > 10 ? title.substring(0, 20) + "..." : title : ""}</Title>
                </ContainerText>
                <ContainerText>
                    <Title>{value}</Title>
                </ContainerText>
                <ContainerText>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <View>
                            <SubTitle>{city} - {state}</SubTitle>
                            <SubTitle>{date} - {hours}</SubTitle>
                        </View>
                    </View>
                </ContainerText>
            </View>
            <View>
                <View style={{
                    flex: 1,
                    justifyContent: 'space-between',
                    padding: 5
                }}>
                    <Button onPress={handleShare}>
                        <Icon name='share' />
                    </Button>
                    <Button onPress={handleFavorite}>
                        <Icon name={isFavorite ? 'star' : 'star-outlined'} />
                    </Button>
                </View>
            </View>
        </Container>
    );
}
