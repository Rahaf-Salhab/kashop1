import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, Typography } from '@mui/material';
import axios from 'axios';
 import styles from './products.module.css';
import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import Loader from '../shared/Loader';

 export default function Products() {
  const fetchProducts = async()=>{
    const {data} = await axios.get(`https://mytshop.runasp.net/api/products`);
    return data ;
}
const {data , isLoading , isError , error} = useQuery({
queryKey : ['products'],
queryFn : fetchProducts,
staleTime : 6 * 60 * 60 * 1000 ,
refetchOnWindowFocus : true,
});
if(isError) return <p>error is : {error.message}</p>
if(isLoading) return <Loader />
 
   

  return (
    <Grid container spacing={4} className={`${styles.section}`}>
      {data.map((product) => (
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
              <Button size='small' component={Link} to={`/product/${product.id}`}viewTransition>Details</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}