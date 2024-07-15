import styled from "styled-components/native";
import { Entypo} from "@expo/vector-icons";
import {  Image } from "react-native";

export const Container = styled.View`
    width: 40px;
    height: 40px;
    border-radius: 50px;
    align-items: center;
    justify-content: center;
    background-color: ${({theme}) => theme.COLORS.GRAY_400};
    border: 2px solid ${({ theme }) => theme.COLORS.WHITE};
`;

export const Title = styled.Text`
    font-size: ${({theme}) => theme.FONTE_SIZE.LG}px;
    font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
    color: ${({theme}) => theme.COLORS.WHITE};
`;



export const StyledImage = styled(Image)`
  width: 100%;
    height: 100%;
    border-radius: 50px;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.COLORS.GRAY_400} ;
`;
