import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px 30px;
  background: ${({ theme }) => theme.bg};
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const OrderCard = styled.div`
  background: ${({ theme }) => theme.card};
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
`;

const Left = styled.div``;

const Status = styled.div`
  color: green;
  font-weight: 500;
`;

const orders = [
  { id: "ORD001", item: "Premium Hoodie", total: "$49", status: "Delivered" },
  { id: "ORD002", item: "Leather Bag", total: "$120", status: "Processing" },
];

export default function Orders() {
  return (
    <Container>
      <Title>Your Orders</Title>

      {orders.map((order) => (
        <OrderCard key={order.id}>
          <Left>
            <div><b>{order.item}</b></div>
            <div>Order ID: {order.id}</div>
            <div>Total: {order.total}</div>
          </Left>
          <Status>{order.status}</Status>
        </OrderCard>
      ))}
    </Container>
  );
}
