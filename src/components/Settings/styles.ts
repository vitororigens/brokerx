import styled from "styled-components/native";
import { Entypo } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";

export const Title = styled.Text`
    font-size: ${({ theme }) => theme.FONTE_SIZE.LG}px;
    color: ${({ theme }) => theme.COLORS.BLUE_800};
    
`;

export const Button = styled(TouchableOpacity)`
  flex-direction: row;
  height: 30px;
  margin-bottom: 5px;
`;

export const Icon = styled(Entypo).attrs(({ theme }) => ({
  color: theme.COLORS.BLUE_800,
  size: 24
}))`
  margin-right: 10px;
`;

export const Container = styled.View`
  min-width: 100px;
  border-radius: 5px;
  background-color: #fff;
  max-height: 200px;
  top: -15px;
  right: 20px;
  padding: 10px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
`;