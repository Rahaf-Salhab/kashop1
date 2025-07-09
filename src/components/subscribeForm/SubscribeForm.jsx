import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axiosAuth from "../../api/axiosAuthInstance";

export default function SubscribeForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginMutation = useMutation({
    mutationFn: async (data) => {
      const res = await axiosAuth.post("Account/Login", data);
      return res.data;
    },
    onSuccess: (data) => {
      const token = data?.token;
      if (token) {
        localStorage.setItem("userToken", token);
        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error("Login failed: No token returned");
      }
    },
    onError: (error) => {
      console.error(error);
      toast.error("Login failed");
    },
  });

  const onSubmit = (data) => {
    loginMutation.mutate(data);
  };

   const backgroundStyle = "linear-gradient(to bottom, #b3a1e6 0%, #a18ad5 100%)";

  return (
    <div
      style={{
        background: backgroundStyle,
        minHeight: "70vh",
        padding: "2rem 1rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          background: "transparent",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "1rem",
            color: "#002B5B",
          }}
        >
          Subscribe - Don't Miss a Deal
        </h1>
        <p
          style={{
            fontWeight: "normal",
            color: "#002B5B",
            marginBottom: "2rem",
            fontSize: "0.95rem",
          }}
        >
          Sign up for the latest discounts, offers, and shopping trends.
        </p>

        <div style={{ textAlign: "left", marginBottom: "1rem" }}>
          <label
            style={{
              color: "#000",
              display: "block",
              marginBottom: "0.5rem",
            }}
          >
            Email Address
          </label>
          <input
            type="email"
            placeholder="Your Email"
            {...register("email", { required: true })}
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "1px solid #ccc",
              borderRadius: "8px",
              fontSize: "0.95rem",
              backgroundColor: "#fff",
              color: "#000",
            }}
          />
          {errors.email && (
            <span style={{ color: "red", fontSize: "0.85rem" }}>
              Email is required
            </span>
          )}
        </div>

        <div style={{ textAlign: "left", marginBottom: "1.5rem" }}>
          <label
            style={{
              color: "#000",
              display: "block",
              marginBottom: "0.5rem",
            }}
          >
            Password
          </label>
          <input
            type="password"
            placeholder="Your Password"
            {...register("password", { required: true })}
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "1px solid #ccc",
              borderRadius: "8px",
              fontSize: "0.95rem",
              backgroundColor: "#fff",
              color: "#000",
            }}
          />
          {errors.password && (
            <span style={{ color: "red", fontSize: "0.85rem" }}>
              Password is required
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={loginMutation.isLoading}
          style={{
            width: "100%",
            padding: "0.9rem",
            backgroundColor: "#fff",
            color: "#002B5B",
            fontWeight: "bold",
            fontSize: "1rem",
            border: "2px solid #ddd",
            borderRadius: "10px",
            cursor: "pointer",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            transition: "all 0.3s ease",
            opacity: loginMutation.isLoading ? 0.6 : 1,
          }}
        >
          {loginMutation.isLoading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}

