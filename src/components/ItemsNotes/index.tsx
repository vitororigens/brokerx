import { Modal, TouchableWithoutFeedback, View } from "react-native";
import { Button, Container, ContainerIcon, ContainerText, Divaider, Divider, Icon, IconApp, SubTitle, Title } from "./styles";
import Share from 'react-native-share';
import { useState } from "react";
import { Options } from "../Options";
import firestore from '@react-native-firebase/firestore';
import { Toast } from 'react-native-toast-notifications';
import * as Clipboard from 'expo-clipboard';

type ItemsScheduleProps = {
    id: string; 
    title: string;
    date: string;
    hours: string;
    notes: string;
    onEdit: () => void;
}

export function ItemsNotes({ id, date, hours, notes, title, onEdit }: ItemsScheduleProps) {
    const handleShare = async () => {
        try {
            await Share.open({
                message: `Informações da nota:\nTitulo: ${title}\nNota: ${notes}\nData: ${date}\nHora: ${hours}`,
            });
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    const [popoverVisible, setPopoverVisible] = useState(false);

    const handleCopy = async () => {
        await Clipboard.setStringAsync(`Informações da nota:\nNome: ${title}\nNota: ${notes}`);
        Toast.show('Nota copiada!', { type: 'sucess' });
        setPopoverVisible(false);
    };

    const handleDelete = async () => {
        try {
            await firestore().collection('Notes').doc(id).delete();
            Toast.show('Contato excluido!', { type: 'sucess' });
            setPopoverVisible(false);
        } catch (error) {
            console.error('Error deleting contact:', error);
            Toast.show('Error ao excluir contato!', { type: 'danger' });
        }
    };

    return (
        <Container onPress={() => onEdit()} onLongPress={() => setPopoverVisible(true)}>
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
                            onCopy={handleCopy} 
                            onDelete={handleDelete} 
                            onEdit={() => { onEdit(); setPopoverVisible(false); }} 
                        />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            <ContainerIcon>
                <Icon name="infocirlce" />
            </ContainerIcon>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                padding: 5,
                height: 40,
            }}>
                <ContainerText>
                    <Title>{title}</Title>
                    <View
                        style={{
                            flexDirection: 'row'
                        }}
                    >
                        <Title>{date}</Title>
                        <Divaider />
                        <Title>{hours}</Title>
                    </View>
                </ContainerText>
                <Divider />
                <ContainerText>
                    <SubTitle> {notes
                        ? notes.length > 10
                            ? notes.substring(0, 30) + "..."
                            : notes
                        : ""}</SubTitle>
                    <Button onPress={handleShare}>
                        <IconApp name='share' />
                    </Button>
                </ContainerText>
            </View>

        </Container>
    )
}