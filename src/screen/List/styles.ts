import styled from "styled-components/native";
import { FontAwesome5 } from '@expo/vector-icons';

export const Container = styled.View`
    flex: 1;
`;

export const Content = styled.View`
    flex: 1;
    background: ${({theme}) => theme.COLORS.WHITE};
    padding: 20px;
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



export const Button = styled.View`
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