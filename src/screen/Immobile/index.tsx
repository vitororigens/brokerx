import { ScrollView, Text, View } from 'react-native';
import { DefaultContainer } from '../../components/DefaultContainer';
import { Button, Container, Divaider, Icon, Input, StyledImage, SubTitle, Title, TitleButton } from './styles';

export function Immobile() {
  return (
    <DefaultContainer title='Adicionar Imóvel'>
      <Container>
        <ScrollView showsVerticalScrollIndicator={false}>
          <StyledImage>
            <Icon name="add-a-photo" />
          </StyledImage>
          <View style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'center'
          }}>
          <Button type='PRIMARY'>
            <TitleButton>
              Adicionar 
            </TitleButton>
          </Button>
          <Button type='SECONDARY'>
            <TitleButton>
              Excluir
            </TitleButton>
          </Button>
          </View>
          <Title>
            Localização
          </Title>
          <SubTitle>
            Endereço:
          </SubTitle>
          <Input />
          <View style={{
            flexDirection: 'row',
            
          }}>
            <View
              style={{
                width: '30%',
                marginRight: 15
              }}
            >
              <SubTitle>
                Número:
              </SubTitle>
              <Input />
            </View>
            <View style={{
                width: '65%'
              }}
              >
              <SubTitle>
                Cidade:
              </SubTitle>
              <Input />
            </View>
          </View>
          <View style={{
            flexDirection: 'row',
            
          }}>
            <View
              style={{
                width: '30%',
                marginRight: 15
              }}
            >
              <SubTitle>
                CEP:
              </SubTitle>
              <Input />
            </View>
            <View style={{
                width: '65%'
              }}
              >
              <SubTitle>
                Estado:
              </SubTitle>
              <Input />
            </View>
          </View>

          <Divaider />

        </ScrollView>
      </Container>
    </DefaultContainer>
  );
}

