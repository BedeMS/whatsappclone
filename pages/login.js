import Head from "next/head";
import styled from "styled-components";
import Button from "@material-ui/core";

function Login() {
  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>

      <LoginContainer>
        <Logo src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png" />
        <Button variant="outlined">Sign in with Google</Button>
      </LoginContainer>
    </Container>
  );
}

export default Login;

const Container = styled.div``;

const LoginContainer = styled.div``;

const Logo = styled.img``;
