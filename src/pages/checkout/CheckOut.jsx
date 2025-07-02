import {
    Box,
    Button,
    Card,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    Typography
  } from "@mui/material";
  import { useState } from "react";
  import { useMutation } from "@tanstack/react-query";
  import axiosAuth from "../../api/axiosAuthInstance";  
  
  function CheckOut() {
    const [paymentMethod, setPaymentMethod] = useState("Visa");
  
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
          window.location.href = data.url; // ✅ redirect if Visa
        } else {
          console.log("Payment Successful:", data);
          // بإمكانك هنا تعرض رسالة نجاح مثلاً
        }
      },
      onError: (error) => {
        console.error("Payment Error:", error);
        alert("حدث خطأ أثناء الدفع، حاول مرة أخرى.");
      },
    });
  
    const handlePay = () => {
      payMutation.mutate();
    };
  
    return (
      <Box>
        <Card sx={{ p: 4, maxWidth: 500, mx: "auto", mt: 5 }}>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            💳 Checkout
          </Typography>
  
          <FormControl sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Select Payment Method
            </Typography>
            <RadioGroup value={paymentMethod} onChange={handlePaymentMethod}>
              <FormControlLabel value="Visa" control={<Radio />} label="Visa" />
              <FormControlLabel value="Cash" control={<Radio />} label="Cash on Delivery" />
            </RadioGroup>
          </FormControl>
  
          <Button
            onClick={handlePay}
            fullWidth
            variant="contained"
            color="primary"
            disabled={payMutation.isPending}
          >
            {payMutation.isPending ? "Processing..." : "Confirm Payment"}
          </Button>
        </Card>
      </Box>
    );
  }
  
  export default CheckOut;
  