import {
  Box,
  Button,
  Card,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  useTheme,
  Divider,
} from "@mui/material";
import { useState, useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosAuth from "../../api/axiosAuthInstance";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import pic2 from "../../assets/images/pic2.png";

function CheckOut() {
  const [paymentMethod, setPaymentMethod] = useState("Visa");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const theme = useTheme();
  const queryClient = useQueryClient();
  const { getItems } = useContext(CartContext);

  const handlePaymentMethod = (event) => {
    setPaymentMethod(event.target.value);
  };

  const payMutation = useMutation({
    mutationFn: async () => {
      const { data } = await axiosAuth.post("CheckOuts/Pay", {
        PaymentMethod: paymentMethod,
      });
      return data;
    },
    onSuccess: (data) => {
      if (paymentMethod === "Visa" && data.url) {
        window.location.href = data.url;
      } else {
        queryClient.invalidateQueries(["cart"]);
        getItems();
        setIsConfirmed(true);
      }
    },
    onError: () => {
      alert("❌ Payment error. Try again.");
    },
  });

  const handlePay = () => {
    payMutation.mutate();
  };

  if (isConfirmed) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
          p: 3,
          gap: 2,
        }}
      >
        <Box
          sx={{
            width: 70,
            height: 70,
            borderRadius: "50%",
            backgroundColor: "#00BCD4",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: 3,
          }}
        >
          <Typography fontSize={40} color="white">
            ✓
          </Typography>
        </Box>

        <Typography variant="h5" fontWeight="bold">
          Your order is confirmed!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          We've received your payment and will start processing your order
          shortly.
        </Typography>

        <Button
          component={Link}
          to="/profile/orders"
          variant="contained"
          sx={{
            backgroundColor: "#4dd0e1",
            color: "#fff",
            fontWeight: "bold",
            px: 4,
            "&:hover": {
              backgroundColor: "#26c6da",
            },
          }}
        >
          Go to order
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        minHeight: "100vh",
      }}
    >
      {/* ✅ صورة على اليسار مع فراغ من الجانبين */}
      <Box
        sx={{
          flex: 1,
          backgroundImage: `url(${pic2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: { xs: "none", md: "block" },
          px: 4, // فراغ من اليمين واليسار
        }}
      />

      {/* ✅ الفورم */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.palette.background.default,
          p: { xs: 2, sm: 4 },
        }}
      >
        <Card
          elevation={6}
          sx={{
            width: "100%",
            maxWidth: 500,
            p: { xs: 3, sm: 4 },
            borderRadius: 4,
            boxShadow: `0 8px 24px ${
              theme.palette.mode === "light"
                ? "rgba(0,0,0,0.1)"
                : "rgba(255,255,255,0.1)"
            }`,
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            textAlign="center"
            color="primary"
          >
            💳 Checkout
          </Typography>

          <Divider sx={{ my: 2 }} />

          <FormControl component="fieldset" sx={{ width: "100%", mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Select Payment Method:
            </Typography>
            <RadioGroup value={paymentMethod} onChange={handlePaymentMethod}>
              <FormControlLabel
                value="Visa"
                control={<Radio />}
                label="Visa / MasterCard"
              />
              <FormControlLabel
                value="Cash"
                control={<Radio />}
                label="Cash on Delivery"
              />
            </RadioGroup>
          </FormControl>

          <Button
            onClick={handlePay}
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            sx={{
              py: 1.5,
              fontWeight: "bold",
              borderRadius: 3,
              textTransform: "none",
            }}
            disabled={payMutation.isPending}
          >
            {payMutation.isPending ? "Processing..." : "Confirm Payment"}
          </Button>
        </Card>
      </Box>
    </Box>
  );
}

export default CheckOut;
