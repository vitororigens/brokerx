import { TouchableOpacity, Image } from "react-native";
import styled from "styled-components/native";
import { Entypo } from '@expo/vector-icons';

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.COLORS.WHITE};
    border-radius: 8px;
`;

export const Content = styled.View`
    height: 200px;
    width: 100%;
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
    height: 200px;
    width: 100%;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.COLORS.GRAY_400};
    margin-bottom: 15px;
`;

export const Title = styled.Text`
    font-size: ${({ theme }) => theme.FONTE_SIZE.XL}px;
    color: ${({ theme }) => theme.COLORS.BLUE_800};
    font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
    
    margin-bottom: 5px;
`;

export const SubTitle = styled.Text`
    font-size: ${({ theme }) => theme.FONTE_SIZE.GG}px;
    color: ${({ theme }) => theme.COLORS.BLUE_800};
    font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
    
    margin-bottom: 5px;
`;


export const Icon = styled(Entypo).attrs(({ theme }) => ({
    size: theme.FONTE_SIZE.XL,
    color: theme.COLORS.BLUE_800,
}))`
    margin-right: 5px;
`;

export const ContainerItems = styled(TouchableOpacity)`
    width: 100%;
    padding: 10px;
    justify-content: center;

`;

export const ContainerIcons = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    padding: 40px;
`

export const Button = styled(TouchableOpacity)``

export const RadioButton = styled(TouchableOpacity)`
    height: 10px;
    width: 10px;
    background-color: ${({ theme }) => theme.COLORS.WHITE};
    border-radius: 50px;
    margin-left: 5px;
`;

export const Header = styled.View`
    width: 100%;
    padding: 10px;
`;

export const InformationText = styled.Text`
    font-size: ${({ theme }) => theme.FONTE_SIZE.MD}px;
    color: ${({ theme }) => theme.COLORS.BLUE_800};
    font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};

    margin-bottom: 5px;
`;

export const Items = styled.View`
    max-width: 65px;
    min-width: 65px;
    background-color: ${({theme}) => theme.COLORS.BLUE_800};
    border-radius: 20px;
    margin-right: 10px;
    align-items: center;
    justify-content: center;
`;

export const ItemsText = styled.Text`
    font-size: ${({ theme }) => theme.FONTE_SIZE.MD}px;
    color: ${({ theme }) => theme.COLORS.WHITE};
    font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};

    margin-bottom: 5px;
`;

export const InfoText = styled.Text`
    font-size: ${({ theme }) => theme.FONTE_SIZE.LG}px;
    color: ${({ theme }) => theme.COLORS.BLUE_800};
    font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};

    margin-bottom: 5px;
`;

export const ContainerInfo = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-top: 5px;
    margin-bottom: 5px;
    border-bottom-width: 1px;
    border-bottom-color: ${({theme}) => theme.COLORS.GRAY_400}; 
`;
