import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export const Container = styled(TouchableOpacity)`
    flex: 1;
    min-height: 60px;
    max-height: 60px;
    background-color: ${({theme}) => theme.COLORS.BLUE_800};
    width: 100%;
    border-radius: 8px;
    border-bottom-width: 5px;
    border-bottom-color:${({theme}) => theme.COLORS.BLUE_800};
    align-items: center;
    justify-content: center;
`;

export const Title = styled.Text`
    font-size: ${({theme}) => theme.FONTE_SIZE.GG}px;
    font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
    color: ${({theme}) => theme.COLORS.WHITE};
`;