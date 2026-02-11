import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ProductCard from "../components/Cards/ProductCard";
import { getFavourite } from "../api/index.js";
import { CircularProgress } from "@mui/material";

/* ================= STYLES ================= */

const Container = styled.div`
  padding: 20px 30px;
  padding-bottom: 200px;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  background: ${({ theme }) => theme.bg};

  @media (max-width: 768px) {
    padding: 20px 12px;
  }
`;

const Section = styled.div`
  max-width: 1400px;
  padding: 32px 16px;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 500;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;

  @media (max-width: 750px) {
    gap: 14px;
  }
`;

/* ================= COMPONENT ================= */

const Favourite = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const token = localStorage.getItem("krist-app-token");
    if (!token) return; // 🔥 MAIN FIX (NO TOKEN → NO API CALL)

    try {
      setLoading(true);
      const res = await getFavourite(token);
      setProducts(res.data);
    } catch (error) {
      console.error("Favourite API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Container>
      <Section>
        <Title>Your favourites</Title>

        {loading ? (
          <CircularProgress />
        ) : products.length === 0 ? (
          <>No Products</>
        ) : (
          <CardWrapper>
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </CardWrapper>
        )}
      </Section>
    </Container>
  );
};

export default Favourite;