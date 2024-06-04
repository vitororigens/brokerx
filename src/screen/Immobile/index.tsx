import { ScrollView, Switch, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { DefaultContainer } from '../../components/DefaultContainer';
import { Button, ButtonAdd, Container, Divaider, Icon, Input, InputObservation, StyledImage, SubTitle, Title, TitleButton } from './styles';
import { useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { useUserAuth } from '../../hooks/useUserAuth';

type ImmobileProps = {
  showPicker: boolean;
}

export function Immobile({ showPicker }: ImmobileProps) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [status, setStatus] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const user = useUserAuth();
  const uid = user?.uid;
  const [image, setImage] = useState<string | null>(null);
  const [location, setLocation] = useState({
    address: '',
    number: '',
    city: '',
    cep: '',
    state: '',
  });
  const [information, setInformation] = useState({
    constructionArea: '',
    toatalArea: '',
    registration: '',
    numberbathrooms: '',
    numberBedrooms: '',
    numberSuites: '',
    positionSun: '',
    numberRooms: '',
    numberVacancies: ''
  });
  const [pool, setPool] = useState(false);
  const [gourmet, setGourmet] = useState(false);
  const [grill, setGrill] = useState(false);
  const [furniture, setFurniture] = useState(false);
  const [observations, setObservations] = useState('');
  const [owner, setOwner] = useState('');
  const [immobileSituation, setImmobileSituation] = useState('');
  const [valueIptu, setValueIptu] = useState('');
  const [situation, setSituation] = useState(false);
  const [sale, setSale] = useState(false);
  const [rent, setRent] = useState(false);
  const [valueImmobile, setValueImmobile] = useState('');
  const [brokerFee, setBrokerFee] = useState('');
  const [valueRent, setValueRent] = useState('');
  const [commission, setCommission] = useState('');

  return (
    <DefaultContainer showButtonGears title='Adicionar Imóvel'>
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
          {/* Localização */}
          <Title>
            Localização
          </Title>
          <SubTitle>
            Endereço:
          </SubTitle>
          <Input
            value={location.address}
            onChangeText={(text) => setLocation({ ...location, address: text })}
          />
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

          {/* Informações */}

          <Title>
            Informações
          </Title>

          <SubTitle>
            Tipo de imóvel
          </SubTitle>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedCategory(itemValue)
            }>
            <Picker.Item label="Apartamento" value="Apartamento" />
            <Picker.Item label="Casa" value="Casa" />
          </Picker>
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
          <View style={{
            flexDirection: 'row'
          }}>
            <View style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: 10,
            }}>
              <Switch
                trackColor={{ false: "#0F2851", true: "#0F2851" }}
                thumbColor={status ? "#f4f3f4" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setStatus(!status)}
                value={status}
                style={{
                  width: 50,
                  marginRight: 10,
                }}
              />
              <Title>
                Piscina?
              </Title>
            </View>
            <View style={{
              flexDirection: "row",
              alignItems: "center",
            }}>
              <Switch
                trackColor={{ false: "#0F2851", true: "#0F2851" }}
                thumbColor={status ? "#f4f3f4" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setStatus(!status)}
                value={status}
                style={{
                  width: 50,
                  marginRight: 10
                }}
              />
              <Title>
                Churrasqueira?
              </Title>
            </View>
          </View>
          <View style={{
            flexDirection: 'row'
          }}>
            <View style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: 10,
            }}>
              <Switch
                trackColor={{ false: "#b91c1c", true: "#b91c1c" }}
                thumbColor={status ? "#f4f3f4" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setStatus(!status)}
                value={status}
                style={{
                  width: 50,
                  marginRight: 10
                }}
              />
              <Title>
                Gourmet?
              </Title>
            </View>
            <View style={{
              flexDirection: "row",
              alignItems: "center"
            }}>
              <Switch
                trackColor={{ false: "#b91c1c", true: "#b91c1c" }}
                thumbColor={status ? "#f4f3f4" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setStatus(!status)}
                value={status}
                style={{
                  width: 50,
                  marginRight: 10
                }}
              />
              <Title>
                Mobiliário?
              </Title>
            </View>
          </View>
          <SubTitle>
            Observações:
          </SubTitle>
          <InputObservation
            multiline
            numberOfLines={10}
          />
          <Divaider />
          <SubTitle>
            Proprietário:
          </SubTitle>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <View
              style={{
                width: '80%'
              }}
            >
              <Input />
            </View>
            <View style={{
              width: '20%',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ButtonAdd>
                <FontAwesome5 name="plus" size={24} color="#FFFFFF" />
              </ButtonAdd>
            </View>

          </View>

          <SubTitle>
            Situação do Imóvel:
          </SubTitle>
          <Input />
          <SubTitle>
            Valor do IPTU:
          </SubTitle>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',

            }}
          >
            <View style={{
              width: '50%',
              height: 40,
              marginRight: 10,
            }}>

              <Input />
            </View>
            <View style={{
              flexDirection: "row",
              alignItems: "center",
              height: 40,
            }}>
              <Switch
                trackColor={{ false: "#0F2851", true: "#0F2851" }}
                thumbColor={status ? "#f4f3f4" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setStatus(!status)}
                value={status}
                style={{
                  width: 50,
                  marginRight: 10
                }}
              />
              <Title>
                Regular?
              </Title>
            </View>
          </View>
          <Divaider />
          <Title>
            Destinação
          </Title>
          <View style={{
            flexDirection: 'row',
            marginBottom: 10
          }}>
            <View style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 10,
            }}>
              <Switch
                trackColor={{ false: "#0F2851", true: "#0F2851" }}
                thumbColor={status ? "#f4f3f4" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setStatus(!status)}
                value={status}
                style={{
                  width: 50,
                  marginRight: 10
                }}
              />
              <Title>
                Venda?
              </Title>
            </View>
            <View style={{
              flexDirection: "row",
              alignItems: "center"
            }}>
              <Switch
                trackColor={{ false: "#0F2851", true: "#0F2851" }}
                thumbColor={status ? "#f4f3f4" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setStatus(!status)}
                value={status}
                style={{
                  width: 50,
                  marginRight: 10
                }}
              />
              <Title>
                Aluguel?
              </Title>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: 'space-between'
            }}
          >
            <View
              style={{
                width: '50%'
              }}
            >
              <SubTitle>
                Preço do Imóvel:
              </SubTitle>
              <Input />
            </View>
            <View
              style={{
                width: '45%'
              }}
            >
              <SubTitle>
                Taxa de Corret.:
              </SubTitle>
              <Input />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: 'space-between'
            }}
          >
            <View
              style={{
                width: '50%'
              }}
            >
              <SubTitle>
                Preço do Aluguel:
              </SubTitle>
              <Input />
            </View>
            <View
              style={{
                width: '45%'
              }}
            >
              <SubTitle>
                Comissão.:
              </SubTitle>
              <Input />
            </View>
          </View>
          <Divaider />

          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Button type='PRIMARY'>
              <TitleButton>
                Salvar
              </TitleButton>
            </Button>
          </View>
        </ScrollView>
      </Container>
    </DefaultContainer>
  );
}

