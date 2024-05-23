import { ScrollView, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { DefaultContainer } from '../../components/DefaultContainer';
import { Button, Container, Divaider, Icon, Input, StyledImage, SubTitle, Title, TitleButton } from './styles';
import { useState } from 'react';

type ImmobileProps = {
  showPicker: boolean;
}

export function Immobile({ showPicker }: ImmobileProps) {
  const [selectedCategory, setSelectedCategory] = useState('');
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

          <Title>
            Informações
          </Title>

          <SubTitle>
            Tipo de imóvel
          </SubTitle>
          <Input placeholder='Apartamento'/>

          {showPicker &&
            <Picker
              selectedValue={selectedCategory}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedCategory(itemValue)
              }>
              <Picker.Item label="Apartamento" value="Apartamento" />
              <Picker.Item label="Casa" value="Casa" />
            </Picker>
          }
              <View style={{
            flexDirection: 'row',

          }}>
            <View
              style={{
                width: '33%',
                marginRight: 15
              }}
            >
              <SubTitle>
              Área Const.:
              </SubTitle>
              <Input />
            </View>
            <View style={{
              width: '28%',
              marginRight: 15,
            }}
            >
              <SubTitle>
                Área total:
              </SubTitle>
              <Input />
            </View>
            <View style={{
              width: '28%'
            }}
            >
              <SubTitle>
                Matrícula:
              </SubTitle>
              <Input />
            </View>
          </View>
          <View style={{
            flexDirection: 'row',

          }}>
            <View
              style={{
                width: '33%',
                marginRight: 15
              }}
            >
              <SubTitle>
                N Banheiros:
              </SubTitle>
              <Input />
            </View>
            <View style={{
              width: '28%',
              marginRight: 15,
            }}
            >
              <SubTitle>
                N Quartos:
              </SubTitle>
              <Input />
            </View>
            <View style={{
              width: '28%'
            }}
            >
              <SubTitle>
                N Suítes:
              </SubTitle>
              <Input />
            </View>
          </View>
          <View style={{
            flexDirection: 'row',

          }}>
            <View
              style={{
                width: '33%',
                marginRight: 15
              }}
            >
              <SubTitle>
                Pos. Sol:
              </SubTitle>
              <Input />
            </View>
            <View style={{
              width: '28%',
              marginRight: 15,
            }}
            >
              <SubTitle>
                N Salas:
              </SubTitle>
              <Input />
            </View>
            <View style={{
              width: '28%'
            }}
            >
              <SubTitle>
                N Vagas:
              </SubTitle>
              <Input />
            </View>
          </View>


        </ScrollView>
      </Container>
    </DefaultContainer>
  );
}

