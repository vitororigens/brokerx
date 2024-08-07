import { Image, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    padding: 20px;
    
`;

export const Card = styled.View`
    width: 100%;
    height: 90%;
    background: ${({ theme }) => theme.COLORS.WHITE};
    position: relative;
    z-index: 11;
    border-radius: 20px;
    padding: 20px;
    margin-bottom: 20px;
    justify-content: center;
`;

export const Content = styled.View`
    flex-direction: row;
    width: 100%;
    justify-content: flex-end;
    margin-bottom: 80px;
`;

export const ImageContainer = styled(TouchableOpacity)`
    height: 100px;
    width: 100px;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.COLORS.BLUE_800} ;
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
    background-color: ${({ theme }) => theme.COLORS.BLUE_800} ;
    position: absolute;
    right: -30px;
    top: -40px;
    border-radius: 100px;
    z-index: 11;
`;

export const Input = styled.TextInput`
    color: ${({ theme }) => theme.COLORS.GRAY_600};
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
    max-height: 50px;
    min-height: 50px;
    width: 100%;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.COLORS.GRAY_400};
    margin-bottom: 10px;
    padding: 15px;
`;

export const Title = styled.Text`
    font-size: ${({ theme }) => theme.FONTE_SIZE.GG}px;
    color: ${({ theme }) => theme.COLORS.BLUE_800};
    font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
    
    margin-bottom: 5px;
`;

export const Button = styled(TouchableOpacity)`
    min-width: 100px;
    max-width: 100px;
    min-height: 40px;
    max-height: 40px;
    background-color: ${({ theme }) => theme.COLORS.BLUE_800};
    border-radius: 8px;
    align-items: center;
    justify-content: center;
    margin: 10px;
`;

export const TitleButton = styled.Text`
    font-size: ${({ theme }) => theme.FONTE_SIZE.GG}px;
    color: ${({ theme }) => theme.COLORS.WHITE};
    font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
    
`;