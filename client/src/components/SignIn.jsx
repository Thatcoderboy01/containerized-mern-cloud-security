import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";
import { UserSignIn } from "../api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/reducers/userSlice";
import { openSnackbar } from "../redux/reducers/snackbarSlice";

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 36px;
`;
const Title = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.primary};
`;
const Span = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 90};
`;
const TextButton = styled.div`
  width: 100%;
  text-align: end;
  color: ${({ theme }) => theme.text_primary};
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  font-weight: 500;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

// Component
const SignIn = ({ setOpenAuth }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateInputs = () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return false;
    }
    return true;
  };

  const handelSignIn = async () => {
    setButtonLoading(true);
    setButtonDisabled(true);

    if (validateInputs()) {
      try {
        const res = await UserSignIn({ email, password });
        const token = res.data.token;

        if (token) {
          localStorage.setItem("krist-app-token", token);
          dispatch(loginSuccess(res.data));
          dispatch(
            openSnackbar({
              message: "Login Successful",
              severity: "success",
            })
          );

          // ✅ Close the modal
          setOpenAuth(false);

          // ✅ Redirect to Home page
          navigate("/");
        }
      } catch (err) {
        setButtonLoading(false);
        setButtonDisabled(false);
        const errorMessage = err.response?.data?.message || err.message;
        alert(errorMessage);
        dispatch(
          openSnackbar({
            message: errorMessage,
            severity: "error",
          })
        );
      }
    }

    setButtonDisabled(false);
    setButtonLoading(false);
  };



  return (
     <Container>
      <div>
        <Title>Welcome to Krist 👋</Title>
        <Span>Please login with your details here</Span>
      </div>
      <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
        <TextInput
          label="Email Address"
          placeholder="Enter your email address"
          value={email}
          handelChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          label="Password"
          placeholder="Enter your password"
          password
          value={password}
          handelChange={(e) => setPassword(e.target.value)}
        />

        <TextButton>Forgot Password?</TextButton>
        <Button
          text="Sign In"
          onClick={handelSignIn}
          isLoading={buttonLoading}
          isDisabled={buttonDisabled}
        />
      </div>
    </Container>
  )
}

export default SignIn;