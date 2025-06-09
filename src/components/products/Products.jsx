import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './products.module.css';
import { Link } from 'react-router';

 export default function Products() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const response = await axios.get(`http://mytshop.runasp.net/api/products`);
    console.log(response.data);
    setProducts(response.data);
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Grid container spacing={4} className={`${styles.section}`}>
      {products.map((product) => (
        <Grid item size={{ xs: 12, sm: 6, md: 4, xl: 3 }} key={product.id}>
          <Card>
            <CardMedia component={'img'} image={product.mainImg} alt={product.description} >

            </CardMedia>
            <CardContent>
              <Typography gutterBottom component='div' variant='h2'>
                {product.name}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size='small' component={Link} to={`/product/${product.id}`}>Details</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}