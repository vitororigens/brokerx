import React, { useEffect, useState } from 'react';
import { FlatList, Modal } from 'react-native';
import { Container, ContainerButton, Title, TitleButton, Button, ModalContainer } from "./styles";
import useFirestoreCollection from '../../hooks/useFirestoreCollection';
import { ItemsContacts } from '../ItemsContacts';
import { Input } from '../Input';

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
    const data = useFirestoreCollection('Contacts');
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState(data);

    const handleToggle = (id: string) => {
        // Set the selected item, replacing any previously selected item
        setSelectedItems([id]);
    };

    useEffect(() => {
        if (data) {
            const filtered = data.filter(item =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredData(filtered);
        }
    }, [searchTerm, data]);
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
                        }}
                        >
                            <TitleButton type='PRIMARY'>
                                Selecionar
                            </TitleButton>
                        </Button>
                    </ContainerButton>
                    <Title>{title}</Title>
                    <Input
                        name="search"
                        placeholder="Pesquisar"
                        value={searchTerm}
                        onChangeText={text => setSearchTerm(text)}
                        showSearch
                    />
                    <FlatList
                        data={filteredData}
                        renderItem={({ item }) => (
                            <ItemsContacts
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
