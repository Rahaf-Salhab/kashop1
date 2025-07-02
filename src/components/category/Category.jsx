import {
  Button,
  Typography,
  useTheme,
} from '@mui/material';
 import axiosAuth from '../../api/axiosAuthInstance'; 
import styles from './category.module.css';
import { useQuery } from '@tanstack/react-query';
import Loader from '../shared/Loader';

export default function Category() {
  const theme = useTheme();

  const fetchCategories = async () => {
    const { data } = await axiosAuth.get(
      `/categories`
    );
    return data;
  };

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 6 * 60 * 60 * 1000,
    refetchOnWindowFocus: true,
  });

  if (isError) return <p>error is : {error.message}</p>;
  if (isLoading) return <Loader />;

  const cardStyle = {
    width: 260,
    height: 180,
    borderRadius: 2,
    p: 2,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    transition: '0.3s ease',
    backgroundColor:
      theme.palette.mode === 'dark' ? '#1e1e1e' : '#ffffff',
    color: theme.palette.mode === 'dark' ? '#fff' : '#000',
    boxShadow:
      theme.palette.mode === 'dark'
        ? '0 2px 8px rgba(255, 255, 255, 0.08)'
        : '0 2px 8px rgba(0, 0, 0, 0.1)',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow:
        theme.palette.mode === 'dark'
          ? '0 6px 12px rgba(255, 255, 255, 0.15)'
          : '0 6px 12px rgba(0, 0, 0, 0.15)',
    },
  };

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        {data.slice(0, 3).map((category) => (
          <div key={category.id} style={{ ...cardStyle }}>
            <Typography variant="h6" gutterBottom>
              {category.name}
            </Typography>
            <Button
              size="small"
              sx={{
                color:
                  theme.palette.mode === 'dark'
                    ? '#90caf9'
                    : theme.palette.primary.main,
              }}
            >
              Details
            </Button>
          </div>
        ))}
      </div>

      <div className={styles.row}>
        {data.slice(3, 5).map((category) => (
          <div key={category.id} style={{ ...cardStyle }}>
            <Typography variant="h6" gutterBottom>
              {category.name}
            </Typography>
            <Button
              size="small"
              sx={{
                color:
                  theme.palette.mode === 'dark'
                    ? '#90caf9'
                    : theme.palette.primary.main,
              }}
            >
              Details
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
