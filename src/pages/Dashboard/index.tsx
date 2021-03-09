import React from "react";

import { useAuth } from "../../context/AuthContext";

import { Container, Header, HeaderTitle, UserName } from "./styles";

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo, {"\n"}
          <UserName> Thales</UserName>
        </HeaderTitle>
      </Header>
    </Container>
  );
};

export default Dashboard;
