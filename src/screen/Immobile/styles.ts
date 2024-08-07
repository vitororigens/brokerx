import styled from "styled-components/native";
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity, Image, Platform } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
type Props ={
    type: 'PRIMARY' | 'SECONDARY'
} 

const ContainerMarginBottom = Platform.OS === 'ios' ? '20px' : '90px'

export const Container = styled.View`
    width: 100%;
    
    background: ${({theme}) => theme.COLORS.WHITE};
    padding: 20px;
    margin-bottom: ${ContainerMarginBottom};
    justify-content: center;
    
`;

export const Content = styled.View`
    flex-direction: row;
    width: 100%;
    justify-content: flex-end;
    margin-bottom: 80px;
`;

export const StyledImage = styled(Image)`
    height: 200px;
    width: 100%;
    justify-content: center;
    align-items: center;
    background-color: ${({theme}) => theme.COLORS.GRAY_400};
    border-radius: 8px;
    margin-bottom: 15px;
`;

export const Icon = styled(MaterialIcons).attrs(({theme}) => ({
    size: 52,
    color: theme.COLORS.WHITE,
}))``;

export const Title = styled.Text`
    font-size: ${({theme}) => theme.FONTE_SIZE.GG}px;
    color: ${({theme}) => theme.COLORS.BLUE_800};
    font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
    
    margin-bottom: 5px;
`;

export const SubTitle = styled.Text`
    font-size: ${({theme}) => theme.FONTE_SIZE.LG}px;
    color: ${({theme}) => theme.COLORS.BLUE_800};
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
    
    margin-bottom: 5px;
`;

export const Input = styled.TextInput`
    max-height: 45px;
    min-height: 45px;
    width: 100%;
    border-radius: 8px;
    background-color: ${({theme}) => theme.COLORS.GRAY_400};
    margin-bottom: 10px;
    padding: 10px;
`;


export const ButtonImage = styled(TouchableOpacity)<Props>`
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

export const InputObservation = styled.TextInput`
   
    width: 100%;
    padding: 10px;
    height: 90px;
    border-radius: 8px;
    background-color: ${({theme}) => theme.COLORS.GRAY_400};
    margin-bottom: 10px;
`;


export const ButtonAdd = styled(TouchableOpacity)`
    width: 40px;
    height: 40px;
    background-color: ${({theme}) => theme.COLORS.BLUE_800 };
    border-radius: 100px;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
`;

export const ImageContainer = styled(TouchableOpacity)`
     height: 200px;
    width: 100%;
    justify-content: center;
    align-items: center;
    background-color: ${({theme}) => theme.COLORS.GRAY_400};
    border-radius: 8px;
    margin-bottom: 15px;
`;


export const ButtonPlus = styled(TouchableOpacity)`
    width: 40px;
    height: 40px;
    background-color: ${({theme}) => theme.COLORS.BLUE_800};
    border-radius: 50px;
    align-items: center;
    justify-content: center;
`;

export const IconPlus = styled(FontAwesome5).attrs(({theme}) => ({
    size: 22,
    color: theme.COLORS.WHITE,
}))``;


export const RadioButton = styled(TouchableOpacity)`
    height: 10px;
    width: 10px;
    background-color: ${({theme}) => theme.COLORS.WHITE};
    border-radius: 50px;
    margin-left: 5px;
`;