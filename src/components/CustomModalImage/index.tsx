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
    onGallery: () => void;
    onCamera: () => void;
    animationType: string;
    transparent: boolean;
}

export function CustomModalImage({ title, visible, onClose, onGallery, onCamera }: CustomModalProps) {
 
    return (
        <Modal transparent visible={visible} onRequestClose={onClose}>
            <Container>
                <ModalContainer>
                    
                        <Button type="SECONDARY" onPress={() => {
                            onGallery()
                            onClose();
                        }}>
                            <TitleButton type='SECONDARY'>
                                Galeria
                            </TitleButton>
                        </Button>
                        <Button type="PRIMARY" onPress={() => {
                            onCamera()
                            onClose();
                        }}>
                            <TitleButton type='PRIMARY'>
                                Camêra
                            </TitleButton>
                        </Button>
             
                </ModalContainer>
                    <Button type="SECONDARY" onPress={() => {
                        onClose();
                    }}>
                        <TitleButton type='SECONDARY'>
                            Cancelar
                        </TitleButton>
                    </Button>
            </Container>
        </Modal>
    );
}
