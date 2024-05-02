import { Image } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
    width: 100%;
    background: ${({theme}) => theme.COLORS.WHITE};
    position: absolute;
    z-index: 11;
    border-radius: 20px;
    padding: 20px;
`;

export const Title = styled.Text`
    font-size: ${({theme}) => theme.FONTE_SIZE.GG}px;
    color: ${({theme}) => theme.COLORS.BLUE_800};
    font-weight: bold;
    text-align: center;
    margin-bottom: 15px;
`;

export const SubTitle = styled.Text`
    font-size: ${({theme}) => theme.FONTE_SIZE.LG}px;
    color: ${({theme}) => theme.COLORS.GRAY_600};
    text-align: center;
`;

export const Content = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const StyledImage = styled.View`
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