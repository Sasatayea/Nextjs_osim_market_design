"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { ArrowBack, Save } from "@mui/icons-material";
import Link from "next/link";

const AddProductPage = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    product_name: "",
    primary_image_url: "",
    product_category: "",
    product_description: "",
    regular_price: "",
    sale_price: "",
    available_sizes: "",
    material: "",
    discount_pct: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify({
        ...form,
        price_missing_flag: false,
        scrape_date: new Date(),
      }),
    });

    router.push("/Admin");
  };

  const fieldSx = {
    "& .MuiOutlinedInput-root": {
      color: "var(--text)",
      borderRadius: "var(--radius-md)",
      fontSize: "0.9rem",
      "& fieldset": { borderColor: "var(--border)" },
      "&:hover fieldset": { borderColor: "var(--border-light)" },
      "&.Mui-focused fieldset": {
        borderColor: "var(--primary)",
        boxShadow: "0 0 0 3px var(--primary-glow)",
      },
    },
    "& .MuiInputLabel-root": {
      color: "var(--text-muted)",
      fontSize: "0.88rem",
      "&.Mui-focused": { color: "var(--primary)" },
    },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "var(--bg)",
        color: "var(--text)",
      }}
    >
      <Box
        sx={{
          maxWidth: 700,
          mx: "auto",
          px: { xs: 2, md: 3 },
          py: { xs: 3, md: 6 },
          animation: "fadeIn 0.5s ease forwards",
        }}
      >
        {/* Back Link */}
        <Link href="/Admin" style={{ textDecoration: "none" }}>
          <Button
            startIcon={<ArrowBack sx={{ fontSize: 18 }} />}
            sx={{
              color: "var(--text-muted)",
              textTransform: "none",
              mb: 3,
              fontWeight: 500,
              fontSize: "0.85rem",
              "&:hover": { color: "var(--primary)" },
            }}
          >
            Back to Dashboard
          </Button>
        </Link>

        {/* Card */}
        <Box
          sx={{
            background: "var(--surface)",
            borderRadius: "var(--radius-xl)",
            border: "1px solid var(--border)",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              px: 3,
              py: 2.5,
              borderBottom: "1px solid var(--border)",
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "2px",
                background: "linear-gradient(90deg, var(--primary), transparent)",
                opacity: 0.5,
              },
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontFamily: "var(--font-playfair), var(--font-display)",
                fontWeight: 700,
                color: "var(--text)",
                letterSpacing: "-0.02em",
              }}
            >
              Add New Product
            </Typography>
            <Typography
              sx={{
                color: "var(--text-muted)",
                fontSize: "0.85rem",
                mt: 0.5,
              }}
            >
              Fill in the product details below
            </Typography>
          </Box>

          {/* Form */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ p: 3 }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 2.5,
              }}
            >
              <TextField
                name="product_name"
                label="Product Name"
                onChange={handleChange}
                size="small"
                fullWidth
                required
                sx={{ ...fieldSx, gridColumn: "1 / -1" }}
              />

              <TextField
                name="primary_image_url"
                label="Image URL"
                onChange={handleChange}
                size="small"
                fullWidth
                sx={{ ...fieldSx, gridColumn: "1 / -1" }}
              />

              <TextField
                name="product_category"
                label="Category"
                onChange={handleChange}
                size="small"
                fullWidth
                sx={fieldSx}
              />

              <TextField
                name="material"
                label="Material"
                onChange={handleChange}
                size="small"
                fullWidth
                sx={fieldSx}
              />

              <TextField
                name="regular_price"
                label="Regular Price"
                onChange={handleChange}
                size="small"
                fullWidth
                type="number"
                sx={fieldSx}
              />

              <TextField
                name="sale_price"
                label="Sale Price"
                onChange={handleChange}
                size="small"
                fullWidth
                type="number"
                sx={fieldSx}
              />

              <TextField
                name="discount_pct"
                label="Discount %"
                onChange={handleChange}
                size="small"
                fullWidth
                type="number"
                sx={fieldSx}
              />

              <TextField
                name="available_sizes"
                label="Sizes (e.g. 46,48,50)"
                onChange={handleChange}
                size="small"
                fullWidth
                sx={fieldSx}
              />

              <TextField
                name="product_description"
                label="Description"
                onChange={handleChange}
                size="small"
                fullWidth
                multiline
                rows={4}
                sx={{ ...fieldSx, gridColumn: "1 / -1" }}
              />
            </Box>

            {/* Submit */}
            <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
              <Button
                type="submit"
                variant="contained"
                startIcon={<Save />}
                sx={{
                  background: "linear-gradient(135deg, var(--primary), #b8972f)",
                  color: "#0a0a0a",
                  borderRadius: "var(--radius-md)",
                  px: 4,
                  py: 1.2,
                  fontWeight: 600,
                  textTransform: "none",
                  fontSize: "0.92rem",
                  boxShadow: "var(--shadow-gold)",
                  transition: "all 0.25s ease",
                  "&:hover": {
                    background: "linear-gradient(135deg, var(--primary-hover), #c4a23a)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 28px rgba(201, 168, 76, 0.25)",
                  },
                }}
              >
                Save Product
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AddProductPage;
