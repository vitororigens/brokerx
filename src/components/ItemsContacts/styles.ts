import styled from "styled-components/native";
import { FontAwesome5 } from '@expo/vector-icons';
import { Image, TouchableOpacity } from "react-native";

export const Container = styled.View`
    width: 100%;
    height: 60px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    margin-top: 20px;
`;

export const Icon = styled(FontAwesome5).attrs(({theme}) => ({
    size: 22,
    color: theme.COLORS.BLUE_800,
}))`
    margin-left: 10px;
`;

export const ContainerIcon = styled.View`
    width: 50px;
    height: 50px;
    background-color: ${({theme}) => theme.COLORS.GRAY_400};
    border-radius: 50px;
    align-items: center;
    justify-content: center;
`;


export const ContainerImage = styled(Image)`
    width: 50px;
    height: 50px;
    background-color: ${({theme}) => theme.COLORS.GRAY_400};
    border-radius: 50px;
    align-items: center;
    justify-content: center;
`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
    font-size: ${({theme}) => theme.FONTE_SIZE.MD}px;
    color: ${({theme}) => theme.COLORS.BLUE_800};
`;

export const SubTitle = styled.Text`
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
    font-size: ${({theme}) => theme.FONTE_SIZE.SM}px;
    color: ${({theme}) => theme.COLORS.BLUE_800};
`;

export const Divaider = styled.View`
    width: 100%;
    height: 2px;
    margin-top: 5px;
    margin-bottom: 5px;
    background-color: ${({theme}) => theme.COLORS.BLUE_800};
`;


export const ContainerText = styled.View`
    justify-content: space-between;
    flex-direction: row;
`;

export const DivaiderInformation = styled.View`
    height: 100%;
    width: 2px;
    background-color: ${({theme}) => theme.COLORS.BLUE_800};
    margin-left: 10px;
    margin-right: 10px;

`;

export const Button = styled(TouchableOpacity)``;