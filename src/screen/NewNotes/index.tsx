import React from "react";
import { Alert, ScrollView, Switch, View, Text, ActivityIndicator } from "react-native";
import { DefaultContainer } from "../../components/DefaultContainer";
import { Container, Input, Title, Button, TitleButton, InputNote, ButtonAdd, Icon } from "./styles";

import { useState } from "react";
import { database } from "../../services";
import { Toast } from "react-native-toast-notifications";
import { useUserAuth } from "../../hooks/useUserAuth";

export function NewNotes() {
    const [isLoading, setIsLoading] = useState(false);
    const [addSchedule, setAddSchedule] = useState(false)
    const [nameNotes, setNameNotes] = useState('');
    const [notes, setNotes] = useState('');
    const [date, setDate] = useState('');
    const [hours, setHours] = useState('');
    const [participants, setParticipants] = useState('');
    const user = useUserAuth();
    const uid = user?.uid;

    const handleSaveForm = async () => {
        setIsLoading(true);

        database
            .collection('Notes')
            .doc()
            .set({
                addSchedule,
                nameNotes,
                notes,
                date,
                hours,
                participants,
                uid
            })
            .then(() => {
                Toast.show('Nota adicionada!', { type: 'success' });
                setAddSchedule(false);
                setNameNotes('');
                setNotes('');
                setDate('');
                setHours('');
                setParticipants('');
            })
            .catch(error => {
                console.error('Erro ao criar nota: ', error);
                Toast.show('Erro ao criar nota!', { type: 'danger' });
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <DefaultContainer showButtonBack title="Adicionar Nota">
            <Container>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Title>Tipo de nota:</Title>
                    <Input
                        value={nameNotes}
                        onChangeText={(text) => setNameNotes(text)}
                    />
                    <Title>Nota:</Title>
                    <InputNote
                        multiline
                        numberOfLines={10}
                        value={notes}
                        onChangeText={(text) => setNotes(text)}
                    />
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 10
                    }}>
                        <Switch
                            trackColor={{ false: "#0F2851", true: "#0F2851" }}
                            thumbColor={addSchedule ? "#f4f3f4" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => setAddSchedule(!addSchedule)}
                            value={addSchedule}
                            style={{ 
                                width: 50,
                                marginRight: 10
                             }}
                        />
                        <Title>Agendar</Title>
                    </View>
                    
                    {addSchedule && (
                        <>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                <View style={{ width: '45%' }}>
                                    <Title>Data:</Title>
                                    <Input
                                        value={date}
                                        onChangeText={(text) => setDate(text)}
                                    />
                                </View>
                                <View style={{ width: '45%' }}>
                                    <Title>Horário:</Title>
                                    <Input
                                        value={hours}
                                        onChangeText={(text) => setHours(text)}
                                    />
                                </View>
                            </View>
                        </>
                    )}
                    
                    <Title>Participantes:</Title>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <View style={{ width: '80%' }}>
                            <Input
                                value={participants}
                                onChangeText={(text) => setParticipants(text)}
                            />
                        </View>
                        <View style={{ width: '15%' }}>
                            <ButtonAdd>
                                <Icon name='plus'/>
                            </ButtonAdd>
                        </View>
                    </View>
                    
                    <View style={{
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Button onPress={handleSaveForm}>
                            <TitleButton>
                                {isLoading ? <ActivityIndicator/> : 'Salvar'}
                            </TitleButton>
                        </Button>
                    </View>
                </ScrollView>
            </Container>
        </DefaultContainer>
    );
}
