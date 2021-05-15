import { useEffect, useState } from 'react';
import {
  GetProductBalancesDTO,
  MedicamentDTO,
  ProductBalanceDTO,
} from 'swagger/models';

import { Container } from 'components/Container';
import { Content } from 'components/Content';

import { ProductList } from './components/ProductList';
import { getProducts } from './services/ProductService';

export const Products = (): JSX.Element => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<MedicamentDTO[]>([]);

  const fetchProducts = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await getProducts();
      const data: GetProductBalancesDTO = await response.json();
      setProducts(data.data as ProductBalanceDTO[]);
    } catch (error) {
      setError(error?.message ?? '');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container>
      <Content withPadding={false}>
        <div className="flex flex-col items-center justify-between w-full p-8 sm:flex-row">
          <h1 className="text-2xl font-medium text-gray-900 sm:text-3xl title-font">
            Likučiai
          </h1>
        </div>
        <ProductList products={products} error={error} loading={loading} />
      </Content>
    </Container>
  );
};
