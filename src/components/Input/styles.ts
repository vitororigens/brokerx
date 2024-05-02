import { TextInput } from "react-native";
import styled from "styled-components/native";
import { MaterialIcons } from '@expo/vector-icons';

export const Container = styled.View`
    flex: 1;
    flex-direction: row;
    width: 100%;
    min-height: 60px;
    max-height: 60px;
    margin-bottom: 20px;
    padding-left: 20px;
    background: ${({theme}) => theme.COLORS.GRAY_300};
    align-items: center;
    justify-content: center;
    border-radius: 8px;
`;

export const InputContainer = styled(TextInput).attrs(({ theme }) => ({
    placeholderTextColor: theme.COLORS.GRAY_400
}))`
    flex: 1;
    min-height: 60px;
    max-height: 60px;
    background: ${({theme}) => theme.COLORS.GRAY_300};
 

`;

export const Icon = styled(MaterialIcons).attrs(({theme}) => ({
    color: theme.COLORS.GRAY_400,
    size: 26
}))`
margin-right: 10px;
`;