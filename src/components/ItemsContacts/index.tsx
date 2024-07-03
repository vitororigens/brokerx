import React, { useState } from 'react';
import { View, Linking, Alert, Modal, TouchableWithoutFeedback } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import Share from 'react-native-share';
import { Button, Container, ContainerIcon, ContainerImage, ContainerText, Divider, DividerInformation, Icon, IconCheck, Title } from "./styles";
import { Options } from '../Options';
import firestore from '@react-native-firebase/firestore';
import { Toast } from 'react-native-toast-notifications';
import * as Clipboard from 'expo-clipboard';

type ItemsContactsProps = {
    id?: string; 
    title: string;
    numero: string;
    resident?: boolean;
    investor?: boolean;
    image?: string;
    isChecked?: boolean;
    showButton?: boolean;
    onToggle?: () => void;
    showButtonCheck?: boolean;
    onEdit?: () => void;
    onCard?: () => void;
}

export function ItemsContacts({ id, numero, title, showButtonCheck, investor, resident, image, isChecked, showButton, onToggle, onEdit, onCard }: ItemsContactsProps) {
    const handleShare = async () => {
        try {
            await Share.open({
                message: `Informações de contato:\nNome: ${title}\nTelefone: ${numero}`,
            });
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    const handleWhatsApp = async () => {
        const url = `whatsapp://send?phone=${numero}`;
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert('Error', 'WhatsApp is not installed on your device.');
        }
    };

    const handlePhone = () => {
        const url = `tel:${numero}`;
        Linking.openURL(url).catch(err => console.error('Error opening dialer:', err));
    };

    const handleCopy = async () => {
        await Clipboard.setStringAsync(`Contact Information:\nName: ${title}\nPhone: ${numero}`);
        Alert.alert('Copied', `Contact Information:\nName: ${title}\nPhone: ${numero}`);
        setPopoverVisible(false);
    };

    const handleDelete = async () => {
        try {
            await firestore().collection('Contacts').doc(id).delete();
            Toast.show('Contato excluido!', { type: 'sucess' });
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
                            showCopy
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
                        {investor && <Title>I</Title>}
                        {investor && resident && <DividerInformation />}
                        {resident && <Title>M</Title>}
                    </View>
                </ContainerText>
                <Divider />
                <ContainerText>
                    <Title>{numero}</Title>
                    {showButton && (
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
                    )}
                </ContainerText>
            </View>
            {showButtonCheck &&
                <Button onPress={onToggle}>
                    <IconCheck
                        name={isChecked ? "checkbox-marked-circle-outline" : "checkbox-blank-circle-outline"}
                    />
                </Button>
            }
        </Container>
    );
}
