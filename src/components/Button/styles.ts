import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export type ButtonTypeProps = 'PRIMARY' | 'SECUNDARY';

type Props = {
    type: ButtonTypeProps;
}

export const Container = styled(TouchableOpacity)<Props>`
    flex: 1;
    min-height: 45px;
    max-height: 45px;
    width: 100%;
    border-radius: 8px;
    background: ${({theme, type}) => type === 'PRIMARY' ? theme.COLORS.BLUE_800 : theme.COLORS.WHITE};
    border-color:${({theme}) => theme.COLORS.BLUE_800};
    border: 2px;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
`;

export const Title = styled.Text<Props>`
    font-size: ${({theme}) => theme.FONTE_SIZE.GG}px;
    font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
    color: ${({theme, type}) => type === 'PRIMARY' ? theme.COLORS.WHITE : theme.COLORS.BLUE_800 };
`;