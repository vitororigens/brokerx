import { Image, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
    width: 100%;
    background: ${({theme}) => theme.COLORS.WHITE};
    border-radius: 20px;
    padding: 20px;
    margin-bottom: 15px;
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

export const ImageContainer = styled(TouchableOpacity)`
    height: 100px;
    width: 100px;
    justify-content: center;
    align-items: center;
    background-color: ${({theme}) => theme.COLORS.BLUE_800} ;
    position: absolute;
    right: -30px;
    top: -40px;
    border-radius: 100px;
    z-index: 11;
`;

export const StyledImage = styled(Image)`
    height: 100px;
    width: 100px;
    justify-content: center;
    align-items: center;
    background-color: ${({theme}) => theme.COLORS.BLUE_800} ;
    border-radius: 100px;
    z-index: 11;
`;