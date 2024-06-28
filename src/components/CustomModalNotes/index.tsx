import React, { useEffect, useState } from 'react';
import { FlatList, Modal } from 'react-native';
import { Container, ContainerButton, Title, TitleButton, Button, ModalContainer } from "./styles";
import useFirestoreCollection from '../../hooks/useFirestoreCollection';
import { ItemsContacts } from '../ItemsContacts';
import { useNavigation } from '@react-navigation/native';

type CustomModalProps = {
    title: string;
    visible: boolean;
    onClose: () => void;
    onConfirm: (selectedItems: string[]) => void;
    onCancel: () => void;
    animationType: string;
    transparent: boolean;
}

export function CustomModal({ title, visible, onClose, onConfirm, onCancel }: CustomModalProps) {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
    const navigation = useNavigation();
    const data = useFirestoreCollection('Contacts');

    const handleToggle = (id: string) => {
        const updatedSelectedItems = [...selectedItems];
        const index = updatedSelectedItems.indexOf(id);

        if (index >= 0) {
            updatedSelectedItems.splice(index, 1);
        } else {
            updatedSelectedItems.push(id);
        }

        setSelectedItems(updatedSelectedItems);
    };

    function handleEditItem(documentId: string) {
        navigation.navigate('newnotes', { selectedItemId: documentId });
    }

    useEffect(() => {
        if (selectedItemId) {
            navigation.navigate('newnotes', { selectedItemId });
        }
    }, [selectedItemId]);

    return (
        <Modal transparent visible={visible} onRequestClose={onClose}>
            <Container>
                <ModalContainer>
                    <ContainerButton>
                        <Button type="SECONDARY" onPress={() => {
                            onCancel();
                            onClose();
                        }}>
                            <TitleButton type='SECONDARY'>
                                Cancelar
                            </TitleButton>
                        </Button>
                        <Button type="PRIMARY" onPress={() => {
                            onConfirm(selectedItems);
                            onClose();
                        }}>
                            <TitleButton type='PRIMARY'>
                                Selecionar
                            </TitleButton>
                        </Button>
                    </ContainerButton>
                    <Title>{title}</Title>
                    <FlatList
                        data={data}
                        renderItem={({ item }) => (
                            <ItemsContacts
                                onEdit={() => handleEditItem(item.id)}
                                id={item.id}
                                numero={item.phone}
                                title={item.name}
                                image={item.imageUrl}
                                isChecked={selectedItems.includes(item.id)}
                                onToggle={() => handleToggle(item.id)}
                                showButtonCheck
                            />
                        )}
                        keyExtractor={(item) => item.id}
                    />
                </ModalContainer>
            </Container>
        </Modal>
    );
}
