"use client";

import { useCart } from "@/app/context/CartContext";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Stack,
  IconButton,
  Divider,
} from "@mui/material";
import { Delete, ShoppingCart, ArrowBack } from "@mui/icons-material";
import Link from "next/link";
import EmptyState from "@/components/ui/EmptyState";

const CartPage = () => {
  const { cart, removeFromCart } = useCart();

  if (!cart || cart.length === 0) {
    return (
      <EmptyState
        icon="🛒"
        title="Your cart is empty"
        description="Looks like you haven't added any products yet. Start exploring our collection!"
        actionLabel="Browse Products"
        actionHref="/"
      />
    );
  }

  const total = cart.reduce((acc, item) => {
    const price = Number(item.sale_price) || 0;
    const qty = item.qty || 1;

    return acc + price * qty;
  }, 0);
  const handleCheckout = async () => {
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart }),
      });

      const data = await res.json();

      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "100%",
        minHeight: "100vh",
        pt: { xs: 3, md: 5 },
        pb: 8,
      }}
    >
      <Box
        sx={{
          maxWidth: 900,
          mx: "auto",
          px: { xs: 2, md: 3 },
          animation: "fadeIn 0.5s ease forwards",
        }}
      >
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <Button
            startIcon={<ArrowBack />}
            sx={{
              color: "var(--text-muted)",
              textTransform: "none",
              mb: 2,
              fontWeight: 500,
              "&:hover": { color: "var(--primary-light)" },
            }}
          >
            Continue Shopping
          </Button>
        </Link>

        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            color: "var(--text)",
            letterSpacing: "-0.03em",
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <ShoppingCart sx={{ fontSize: 28, color: "var(--primary-light)" }} />
          Shopping Cart
          <Typography
            component="span"
            sx={{
              fontSize: "0.9rem",
              color: "var(--text-muted)",
              fontWeight: 400,
            }}
          >
            ({cart.length} {cart.length === 1 ? "item" : "items"})
          </Typography>
        </Typography>
      </Box>

      {/* Cart Items */}
      <Stack spacing={2}>
        {cart.map((item) => (
          <Card
            key={item._id}
            sx={{
              display: "flex",
              alignItems: { xs: "flex-start", sm: "center" },
              flexDirection: { xs: "column", sm: "row" },
              p: 0,
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              boxShadow: "none",
              overflow: "hidden",
              transition: "border-color 0.2s ease",
              "&:hover": {
                borderColor: "var(--border-light)",
              },
            }}
          >
            {/* IMAGE */}
            <CardMedia
              component="img"
              image={item.primary_image_url}
              alt={item.product_name}
              sx={{
                width: { xs: "100%", sm: 140 },
                height: { xs: 180, sm: 140 },
                objectFit: "cover",
                flexShrink: 0,
              }}
            />

            {/* INFO */}
            <CardContent
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                width: "100%",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: "var(--text)",
                    fontSize: "0.95rem",
                    mb: 0.5,
                  }}
                >
                  {item.product_name}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: "var(--primary-light)",
                    fontSize: "1.05rem",
                  }}
                >
                  {Number(item.sale_price).toLocaleString()} EGP
                </Typography>
              </Box>

              <IconButton
                onClick={() => removeFromCart(item._id)}
                sx={{
                  color: "var(--text-muted)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-sm)",
                  width: 36,
                  height: 36,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    color: "var(--error)",
                    borderColor: "var(--error)",
                    backgroundColor: "rgba(231, 76, 60, 0.08)",
                  },
                }}
              >
                <Delete sx={{ fontSize: 18 }} />
              </IconButton>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {/* Summary */}
      <Box
        sx={{
          mt: 4,
          p: 3,
          background: "var(--surface)",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--border)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography sx={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            Subtotal
          </Typography>
          <Typography
            sx={{
              color: "var(--text)",
              fontWeight: 700,
              fontSize: "1.1rem",
            }}
          >
            {total.toLocaleString("en", { minimumFractionDigits: 2 })} EGP
          </Typography>
        </Box>

        <Divider sx={{ borderColor: "var(--border)", mb: 2 }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography
            sx={{
              color: "var(--text)",
              fontWeight: 700,
              fontSize: "1.1rem",
            }}
          >
            Total
          </Typography>
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: "1.4rem",
              background: "linear-gradient(135deg, var(--primary-light), var(--accent))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {total.toLocaleString("en", { minimumFractionDigits: 2 })} EGP
          </Typography>
        </Box>

        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={handleCheckout}
          disabled={cart.length === 0}
          sx={{
            background: "linear-gradient(135deg, var(--primary), #8b5cf6)",
            color: "#fff",
            borderRadius: "var(--radius-md)",
            py: 1.5,
            fontWeight: 700,
            textTransform: "none",
            fontSize: "1rem",
            boxShadow: "0 4px 20px var(--primary-glow)",
            transition: "all 0.25s ease",
            "&:hover": {
              background: "linear-gradient(135deg, var(--primary-hover), #9b6ff7)",
              transform: "translateY(-2px)",
              boxShadow: "0 8px 28px var(--primary-glow)",
            },
            "&:disabled": {
              background: "var(--surface-hover)",
              color: "var(--text-muted)",
              boxShadow: "none",
            },
          }}
        >
          Proceed to Checkout
        </Button>
      </Box>
    </Box>
  </Box>
  );
};

export default CartPage;
