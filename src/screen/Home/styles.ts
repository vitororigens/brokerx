import { Entypo } from "@expo/vector-icons";
import ContentLoader from "react-content-loader/native";
import { Image, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  padding-bottom: 90px;
`;

export const ContainerCard = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const Card = styled(TouchableOpacity)`
  width: 48%;
  height: 150px;
  background: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 15px;
`;

export const CardLoader = styled(ContentLoader)`
  width: 48%;
  height: 150px;
  padding: 20px;
  margin-bottom: 15px;
`;

export const Content = styled(View)`
  background: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 15px;
`;

export const ContentSkeleton = styled(ContentLoader)`
  padding: 20px;
  margin-bottom: 15px;
`;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.FONTE_SIZE.GG}px;
  color: ${({ theme }) => theme.COLORS.BLUE_800};
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`;

export const SubTitle = styled.Text`
  font-size: ${({ theme }) => theme.FONTE_SIZE.LG}px;
  color: ${({ theme }) => theme.COLORS.BLUE_800};
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

export const ImageContainer = styled(TouchableOpacity)`
  height: 100px;
  width: 100px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.BLUE_800};
  position: absolute;
  right: 20px;
  top: 30px;
  border-radius: 8px;
  z-index: 11;
`;

export const StyledImage = styled(Image)`
  height: 100px;
  width: 100px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.BLUE_800};
  border-radius: 8px;
  z-index: 11;
`;

export const Icon = styled(Entypo).attrs(({ theme }) => ({
  color: theme.COLORS.BLUE_800,
  size: theme.FONTE_SIZE.XL,
}))``;
