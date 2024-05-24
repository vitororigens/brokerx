import styled from "styled-components/native";
import { FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";

export const Container = styled.View`
    width: 100%;
    background: ${({theme}) => theme.COLORS.WHITE};
    position: relative;
    z-index: 11;
    border-radius: 20px;
    padding: 20px;
    margin-bottom: 20px;
    justify-content: center;
    align-items: center;
`;

export const Title = styled.Text`
    font-size: ${({theme}) => theme.FONTE_SIZE.GG}px;
    color: ${({theme}) => theme.COLORS.BLUE_800};
    font-weight: bold;
    text-align: center;
    margin-bottom: 15px;
`;

export const Content = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const Button = styled(TouchableOpacity)`
    width: 50px;
    height: 50px;
    background-color: ${({theme}) => theme.COLORS.BLUE_800};
    border-radius: 50px;
    align-items: center;
    justify-content: center;
`;

export const Icon = styled(FontAwesome5).attrs(({theme}) => ({
    size: 22,
    color: theme.COLORS.WHITE,
}))``;