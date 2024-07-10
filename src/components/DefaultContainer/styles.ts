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
 
`;

export const Menu = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
`;


export const Title = styled.Text`
    font-size: ${({theme}) => theme.FONTE_SIZE.XL}px;
    color: ${({theme}) => theme.COLORS.WHITE};
    font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
    
`;

export const SubTitle = styled.Text`
    font-size: ${({theme}) => theme.FONTE_SIZE.GG}px;
    color: ${({theme}) => theme.COLORS.WHITE};
    font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
    
`;

export const Button = styled(TouchableOpacity)``;

export const Icon = styled(FontAwesome).attrs(({theme}) => ({
    color: theme.COLORS.WHITE,
    size: 24
}))``;

export const ContainerMenu = styled.View`
  min-width: 90px;
  border-radius: 5px;
  background-color: #fff;
  max-height: 200px;
  top: -20px;
  right: 10px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
`;