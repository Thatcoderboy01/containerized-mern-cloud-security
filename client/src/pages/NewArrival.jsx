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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 24px;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.card};
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.08);
`;

const Img = styled.div`
  height: 160px;
  border-radius: 8px;
  background: ${({ theme }) => theme.primary + 30};
  margin-bottom: 12px;
`;

const Name = styled.div`
  font-weight: 600;
`;

const Price = styled.div`
  color: ${({ theme }) => theme.primary};
  margin-top: 6px;
`;

const demoArrivals = [
  { id: 1, name: "Premium Hoodie", price: "$49" },
  { id: 2, name: "Classic Shoes", price: "$89" },
  { id: 3, name: "Leather Bag", price: "$120" },
  { id: 4, name: "Casual T-Shirt", price: "$29" },
];

export default function Arrivals() {
  return (
    <Container>
      <Title>New Arrivals</Title>

      <Grid>
        {demoArrivals.map((item) => (
          <Card key={item.id}>
            <Img />
            <Name>{item.name}</Name>
            <Price>{item.price}</Price>
          </Card>
        ))}
      </Grid>
    </Container>
  );
}