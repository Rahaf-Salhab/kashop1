import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Loader from '../../components/shared/Loader';
import { Button, Card, CardContent, Typography } from '@mui/material';

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const getProduct = async () => {
    try {
      const response = await axios.get(`http://mytshop.runasp.net/api/products/${id}`);
      console.log(response.data);
      setProduct(response.data); 
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch product", error);
      setLoading(false);
    }
  };
    const addToCart = async(id)=>{
           alert(id)
           const userToken = localStorage.getItem("userToken");
           console.log(userToken);
           const response = await axios.post(`http://mytshop.runasp.net/api/Carts/${id}`,{}, 
           {
                  headers:{
                    Authorization : `Bearer ${userToken}`
                  }
           }
           )
           console.log(response);
  }

  useEffect(() => {
    getProduct();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Card>
      <CardContent>
        <Typography component="h2" variant="h5">
          {product?.name}
        </Typography>
         <Typography variant="body2">
          {product?.description}
        </Typography>
        <Button onClick={()=>addToCart(product.id)}>Add To Cart</Button>
      </CardContent>
    </Card>
  );
}

export default Product;
