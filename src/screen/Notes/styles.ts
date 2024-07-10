import { Image, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

type Props ={
    type: 'PRIMARY' | 'SECONDARY'
} 

export const Container = styled.View`
    flex: 1;
    padding: 20px;
`;



export const Content = styled.View`
    width: 100%;
    background: ${({theme}) => theme.COLORS.WHITE};
    position: relative;
    z-index: 11;
    border-radius: 20px;
    padding: 20px;
    margin-bottom: 20px;
`;

export const ContainerButton = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const Title = styled.Text`
    font-size: ${({theme}) => theme.FONTE_SIZE.GG}px;
    color: ${({theme}) => theme.COLORS.BLUE_800};
    font-weight: bold;
    text-align: center;
    margin-bottom: 15px;
`;



export const Button = styled(TouchableOpacity)<Props>`
    min-width: 100px;
    max-width: 100px;
    min-height: 40px;
    max-height: 40px;
    background-color: ${({theme, type}) => type === 'PRIMARY' ? theme.COLORS.BLUE_800 : theme.COLORS.RED_900};
    border-radius: 8px;
    align-items: center;
    justify-content: center;
    margin: 10px;
`;

export const TitleButton = styled.Text`
    font-size: ${({theme}) => theme.FONTE_SIZE.GG}px;
    color: ${({theme}) => theme.COLORS.WHITE};
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
    
`;