import styled from "styled-components/native";
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity, Image } from "react-native";

type Props ={
    type: 'PRIMARY' | 'SECONDARY'
} 



export const Container = styled.View`
    width: 100%;
    height: 80%;
    background: ${({theme}) => theme.COLORS.WHITE};
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
    font-size: ${({theme}) => theme.FONTE_SIZE.GG}px;
    color: ${({theme}) => theme.COLORS.BLUE_800};
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
    
    margin-bottom: 5px;
`;

export const Input = styled.TextInput`
    max-height: 40px;
    min-height: 40px;
    width: 100%;
    border-radius: 8px;
    background-color: ${({theme}) => theme.COLORS.GRAY_400};
    margin-bottom: 10px;
`;

export const Divider = styled.View`
    flex: 1;
    height: 2px;
    background-color: ${({theme}) => theme.COLORS.BLUE_800};
    margin-top: 20px;
    margin-bottom: 20px;
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