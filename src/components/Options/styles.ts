import styled from "styled-components/native";
import { Entypo } from '@expo/vector-icons';
import { TouchableOpacity, Image } from "react-native";


export const Container = styled.View`
  flex: 1;
  justify-content: center;
  background-color: rgba(43, 44, 44, 0.9);
  padding: 20px;

`;

export const ContainerItem = styled.View`
  width: 100%;
  border-radius: 5px;
  flex-direction: row;
  height: 70px;
  align-items: center;
  padding: 5px;
  background-color: ${({theme}) => theme.COLORS.WHITE};
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
`;

export const ContainerOptions = styled.View`
  min-width: 100px;
  max-width: 170px;
  border-radius: 5px;
  background-color: ${({theme}) => theme.COLORS.WHITE};
  max-height: 200px;
  top: 20px;
  padding: 10px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
`;

export const Title = styled.Text`
    font-size: ${({ theme }) => theme.FONTE_SIZE.LG}px;
    color: ${({ theme }) => theme.COLORS.BLUE_800};
    
`;

export const Button = styled(TouchableOpacity)`
  flex-direction: row;
  height: 40px;
  margin-bottom: 5px;
  justify-content: space-between;
  border-bottom-width: 2px;
  border-color: ${({ theme }) => theme.COLORS.BLUE_800};
  border-width: 1px; 
  border-radius: 5px; 
  padding: 5px; 
`;
export const Icon = styled(Entypo).attrs(({ theme }) => ({
  color: theme.COLORS.BLUE_800,
  size: 24
}))`
  margin-right: 10px;
`;

export const ContainerIcon = styled.View`
    width: 50px;
    height: 50px;
    background-color: ${({theme}) => theme.COLORS.GRAY_400};
    border-radius: 50px;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`;


export const ContainerImage = styled(Image)`
    width: 50px;
    height: 50px;
    background-color: ${({theme}) => theme.COLORS.GRAY_400};
    border-radius: 50px;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`;

