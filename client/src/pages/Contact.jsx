import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px 30px;
  background: ${({ theme }) => theme.bg};
  height: 100%;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Card = styled.div`
  max-width: 500px;
  background: ${({ theme }) => theme.card};
  padding: 24px;
  border-radius: 12px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 12px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.text_secondary + 40};
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  height: 100px;
  border-radius: 6px;
`;

const Button = styled.div`
  margin-top: 16px;
  padding: 12px;
  background: ${({ theme }) => theme.primary};
  color: white;
  text-align: center;
  border-radius: 8px;
  cursor: pointer;
`;

export default function Contact() {
  return (
    <Container>
      <Title>Contact Us</Title>

      <Card>
        <Input placeholder="Your Name" />
        <Input placeholder="Email" />
        <TextArea placeholder="Message..." />
        <Button>Send Message</Button>
      </Card>
    </Container>
  );
}