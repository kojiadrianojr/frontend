import { Card, Box, Container } from "@mui/material";
import { ComponentPropsWithoutRef, ReactNode } from "react";
import styled from "styled-components";

type Props = ComponentPropsWithoutRef<"div"> & {
  children: ReactNode;
};

const FormContainer = ({ children, ...rest }: Props) => {

  return <Container {...rest} sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  }}>{children}</Container>;
};

const FormCard = ({ children, ...rest }: Props) => {
  return (
    <Card raised sx={{ p: 5,
      width: {
        xs: '100vw',
        sm: '50vw',
        xl: '50vw',
      }
    }} {...rest}>
      {children}
    </Card>
  );
};

const FormBox = ({children, ...rest}:Props) => {
  return (
    <Box sx={{ display: "flex", alignItems: 'flex-end'}} {...rest}>
      {children}
    </Box>
  )
}

export { FormContainer, FormCard, FormBox };
