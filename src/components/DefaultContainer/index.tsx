import React from "react";
import { Button, Container, ContainerBackground, ContainerOpacity, Icon, Menu, Title } from "./styles";

type PropsDefaultContainer = {
    children: React.ReactNode;
    title?: string;
    showButtonGears?: boolean;
    showButtonBack?: boolean;
}

export function DefaultContainer({ children, title, showButtonGears, showButtonBack }: PropsDefaultContainer) {
    return (
        <Container>
            <ContainerBackground />
            <ContainerOpacity>
                <Menu>
                    <Title>{title}</Title>
                    {showButtonGears &&
                        <Button>
                            <Icon name="gear" />
                        </Button>
                    }
                      {showButtonBack &&
                        <Button>
                            <Icon name="arrow-left" />
                        </Button>
                    }
                </Menu>
                {children}
            </ContainerOpacity>
        </Container>
    )
}