
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";


export type ButtonTypeStyleProps = 'PRIMARY' | 'SECONDARY';

type Props = {
    type: ButtonTypeStyleProps;
}


export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);

`;

export const ModalContainer = styled.View`
    background-color: ${({ theme }) => theme.COLORS.WHITE};
    padding: 20px;
    border-radius: 10px;
    width: 100%;
    flex: 1;
    margin-top: 90px;
    align-items: center;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
    font-size: ${({ theme }) => theme.FONTE_SIZE.LG}px;
    color: ${({ theme }) => theme.COLORS.GRAY_600};
    padding-top: 20px;
`;


export const Button = styled(TouchableOpacity) <Props>`
  background: ${({ theme, type }) => type === 'PRIMARY' ? theme.COLORS.BLUE_800 : theme.COLORS.WHITE};
  border-color:${({ theme }) => theme.COLORS.BLUE_800};
    width: 100px;
    height: 30px;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
`

export const TitleButton = styled.Text<Props>`
    font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
    font-size: ${({ theme }) => theme.FONTE_SIZE.MD}px;
    color: ${({ theme, type }) => type === 'PRIMARY' ? theme.COLORS.WHITE : theme.COLORS.BLUE_800};
`;


export const ContainerButton = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;