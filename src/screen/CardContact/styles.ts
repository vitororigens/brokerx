import { TouchableOpacity, Image } from "react-native";
import styled from "styled-components/native";
import { Entypo } from '@expo/vector-icons';

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.COLORS.WHITE};
    border-radius: 8px;
`;


export const Content = styled.View`
    width: 100%;
    align-items: center;
    padding: 20px;
    background-color: #8ea5eb;
    border-radius: 8px 8px 0 0;
`;

export const ImageContainer = styled(TouchableOpacity)`
    height: 100px;
    width: 100px;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.COLORS.BLUE_800} ;
    border-radius: 100px;
    margin-bottom: 20px;
`;

export const StyledImage = styled(Image)`
    height: 100px;
    width: 100px;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.COLORS.BLUE_800} ;
    border-radius: 100px;
    margin-bottom: 20px;
`;


export const Title = styled.Text`
    font-size: ${({ theme }) => theme.FONTE_SIZE.GG}px;
    color: ${({ theme }) => theme.COLORS.BLUE_800};
    font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
    
    margin-bottom: 5px;
`;

export const SubTitle = styled.Text`
    font-size: ${({ theme }) => theme.FONTE_SIZE.GG}px;
    color: ${({ theme }) => theme.COLORS.BLUE_800};
    font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
    
    margin-bottom: 5px;
`;


export const Icon = styled(Entypo).attrs(({theme}) => ({
    size: theme.FONTE_SIZE.XL,
    color: theme.COLORS.BLUE_800,
}))`
    margin-right: 5px;
`;

export const ContainerItems = styled(TouchableOpacity)`
    flex-direction: row;
    width: 100%;
    padding: 10px;
    align-items: center;
    justify-content: space-between;
`;

export const ContainerIcons = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    padding: 40px;
`

export const Button = styled(TouchableOpacity)``