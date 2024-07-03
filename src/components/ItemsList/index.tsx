import { View, Linking, Alert, Modal,  TouchableWithoutFeedback  } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import Share from 'react-native-share';
import { Button, Container, ContainerIcon, ContainerImage, ContainerText, DivaiderInformation, Divider, Icon, SubTitle, Title } from "./styles";
import { useState } from "react";
import firestore from '@react-native-firebase/firestore';
import { Toast } from 'react-native-toast-notifications';
import * as Clipboard from 'expo-clipboard';
import { Options } from "../Options";

type ItemsScheduleProps = {
    id: string;
    title: string;
    value: string;
    sale?: boolean;
    rent?: boolean;
    phone?: string; 
    image?: string;
    showButton?: boolean;
    isChecked?: boolean;
    onToggle?: () => void;
    showButtonCheck?: boolean;
    onEdit?: () => void;
    onCard?: () => void;
}

export function ItemsList({ value, sale, rent, title, phone, image, isChecked, onCard, onEdit, onToggle, id, showButton, showButtonCheck }: ItemsScheduleProps) {
    const handleShare = async () => {
        try {
            await Share.open({
                message: `Contact Information:\nName: ${title}\nPhone: ${phone}`,
            });
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    const handleWhatsApp = async () => {
        const url = `whatsapp://send?phone=${phone}`;
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert('Error', 'WhatsApp is not installed on your device.');
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
            Toast.show('Imóvel excluido!', { type: 'sucess' });
            setPopoverVisible(false);
        } catch (error) {
            console.error('Error deleting contact:', error);
            Toast.show('Error ao excluir contato!', { type: 'danger' });
        }
    };

    const [popoverVisible, setPopoverVisible] = useState(false);

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
                <ContainerImage source={{ uri: image }} />
            ) : (
                <ContainerIcon>
                    <MaterialIcons name="add-a-photo" size={22} color="white" />
                </ContainerIcon>
            )}
            <View style={{
                flex: 1,
                justifyContent: 'center',
                padding: 5,
                height: 40,
            }}>
                <ContainerText>
                    <Title>{title}</Title>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        {rent && <Title>A</Title>}
                        {rent && sale && <DivaiderInformation />}
                        {sale && <Title>V</Title>}
                    </View>
                </ContainerText>
                <Divider />
                <ContainerText>
                    <Title>{value}</Title>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Button onPress={handleShare}>
                            <Icon name='share' />
                        </Button>
                        <Button onPress={handleWhatsApp}>
                            <Icon name='whatsapp' />
                        </Button>
                        <Button onPress={handlePhone}>
                            <Icon name='phone' />
                        </Button>
                    </View>
                </ContainerText>
            </View>
        </Container>
    )
}
