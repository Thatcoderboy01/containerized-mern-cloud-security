import React, { useEffect, useState } from "react";
import ProductCard from "../components/Cards/ProductCard";
import styled from "styled-components";
import { filter } from "../utils/data";
import { CircularProgress, Slider } from "@mui/material";
import { getAllProducts } from "../api";

const Container = styled.div`
  padding: 20px 30px;
  height: 100vh;
  display: flex;
  gap: 30px;
  background: ${({ theme }) => theme.bg};

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 20px 12px;
    overflow-y: auto;
  }
`;

const Filters = styled.div`
  width: 230px;
  padding: 20px 16px;
  overflow-y: auto;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Products = styled.div`
  flex: 1;
  padding: 12px;
  overflow-y: auto;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
`;

const FilterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 500;
`;

const Item = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const SelectableItem = styled.div`
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  border-radius: 8px;
  padding: 4px 10px;
  font-size: 14px;

  ${({ selected, theme }) =>
    selected &&
    `
    border-color:${theme.text_primary};
    background:${theme.text_primary + 30};
    color:${theme.text_primary};
  `}
`;

const ShopListing = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const query = `minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}${
        selectedSizes.length ? `&sizes=${selectedSizes.join(",")}` : ""
      }${
        selectedCategories.length
          ? `&categories=${selectedCategories.join(",")}`
          : ""
      }`;

      const res = await getAllProducts(query);

      setProducts(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [priceRange, selectedSizes, selectedCategories]);

  return (
    <Container>
      <Filters>
        {filter.map((filters) => (
          <FilterSection key={filters.value}>
            <Title>{filters.name}</Title>

            {filters.value === "price" && (
              <Slider
                value={priceRange}
                min={0}
                max={10000}
                onChange={(e, val) => setPriceRange(val)}
                valueLabelDisplay="auto"
              />
            )}

            {filters.value === "size" && (
              <Item>
                {filters.items.map((item) => (
                  <SelectableItem
                    key={item}
                    selected={selectedSizes.includes(item)}
                    onClick={() =>
                      setSelectedSizes((prev) =>
                        prev.includes(item)
                          ? prev.filter((x) => x !== item)
                          : [...prev, item]
                      )
                    }
                  >
                    {item}
                  </SelectableItem>
                ))}
              </Item>
            )}

            {filters.value === "category" && (
              <Item>
                {filters.items.map((item) => (
                  <SelectableItem
                    key={item}
                    selected={selectedCategories.includes(item)}
                    onClick={() =>
                      setSelectedCategories((prev) =>
                        prev.includes(item)
                          ? prev.filter((x) => x !== item)
                          : [...prev, item]
                      )
                    }
                  >
                    {item}
                  </SelectableItem>
                ))}
              </Item>
            )}
          </FilterSection>
        ))}
      </Filters>

      <Products>
        {loading ? (
          <CircularProgress />
        ) : (
          <CardWrapper>
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </CardWrapper>
        )}
      </Products>
    </Container>
  );
};

export default ShopListing;