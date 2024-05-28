import { ImageBackground, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import backgroundImage from "../../assets/background.png"


export const Container = styled(SafeAreaView)`
    flex: 1;
    background: ${({theme}) => theme.COLORS.WHITE};
`;

export const ContainerBackground = styled.View`
    height: 50%;
    width: 100%;
    background: ${({theme}) => theme.COLORS.RED_700};
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;

`;

export const Background = styled(ImageBackground).attrs({
    source: backgroundImage,
    resizeMode: "cover"
})`
    flex: 1;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;

`;

export const ContainerOpacity = styled(SafeAreaView)`
    background: rgba(0, 0, 0, 0.2);
    position: absolute;
    z-index: 10; 
    width: 100%; 
    height: 100%;
    padding: 20px;
 
`;

export const Menu = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
`;


export const Title = styled.Text`
    font-size: ${({theme}) => theme.FONTE_SIZE.XL}px;
    color: ${({theme}) => theme.COLORS.WHITE};
    font-weight: bold;
    margin-bottom: 40px;
    
`;

export const Button = styled(TouchableOpacity)``;

export const Icon = styled(FontAwesome).attrs(({theme}) => ({
    color: theme.COLORS.WHITE,
    size: 26
}))``;