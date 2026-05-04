import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, Divider } from "@mui/material";
import { Stack } from "@mui/material";
import Chip from "@mui/material/Chip";
import Link from "next/link";

import { useCart } from "@/app/context/CartContext";
import AddToCartButton from "./AddToCartButton";

const Page = async ({ params }) => {
  let { id } = await params;

  async function getProduct(id) {
    const res = await fetch(`http://localhost:3000/api/products/${id}`, {
      next: { revalidate: 60 },
    });

    return res.json();
  }

  const product = await getProduct(id);

  if (!product) return <div>Product not found</div>;

  console.log(product);

  const {
    product_name,
    product_category,
    sale_price,
    regular_price,
    discount_pct,
    color,
    color_options,
    available_sizes,
    material,
    product_description,
    primary_image_url,
    product_page_url,
    source_website,
    sku,
  } = product;

  const hasDiscount =
    discount_pct && regular_price && regular_price !== sale_price;

  const sizes = available_sizes?.split(",").map((s) => s.trim()) || [];
  const colors = color_options?.split(/[\n,]/).map((c) => c.trim()) || [];

  return (
    <Box
      sx={{
        maxWidth: 1200,
        mx: "auto",
        px: { xs: 2, md: 4 },
        pt: { xs: 4, md: 8 },
        pb: { xs: 6, md: 12 },
        animation: "fadeIn 0.5s ease forwards",
      }}
    >
      {/* Breadcrumb */}
      <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <Typography
            sx={{
              color: "var(--text-muted)",
              fontSize: "0.85rem",
              transition: "color 0.2s",
              "&:hover": { color: "var(--primary-light)" },
            }}
          >
            Home
          </Typography>
        </Link>
        <Typography sx={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
          /
        </Typography>
        <Typography sx={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>
          {product_category}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: { xs: 3, md: 5 },
        }}
      >
        {/* ───────── IMAGE ───────── */}
        <Box
          sx={{
            position: { md: "sticky" },
            top: { md: 80 },
            alignSelf: "start",
          }}
        >
          <Card
            sx={{
              borderRadius: "var(--radius-xl)",
              overflow: "hidden",
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-xl)",
              position: "relative",
            }}
          >
            {hasDiscount && (
              <Chip
                label={`-${discount_pct}%`}
                sx={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  zIndex: 2,
                  background: "linear-gradient(135deg, var(--accent), #e84393)",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  height: 30,
                  borderRadius: "var(--radius-sm)",
                  boxShadow: "0 2px 12px rgba(253, 121, 168, 0.3)",
                }}
              />
            )}
            <CardMedia
              component="img"
              image={primary_image_url}
              alt={product_name}
              sx={{
                width: "100%",
                height: "auto",
                maxHeight: { xs: 400, md: 600 },
                objectFit: "contain",
                backgroundColor: "rgba(0,0,0,0.2)",
              }}
            />
          </Card>
        </Box>

        {/* ───────── DETAILS ───────── */}
        <Box>
          {/* Category */}
          <Chip
            label={product_category}
            variant="outlined"
            size="small"
            sx={{
              mb: 1.5,
              borderColor: "var(--border)",
              color: "var(--primary-light)",
              fontWeight: 600,
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          />

          {/* Name */}
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              mb: 1,
              color: "var(--text)",
              letterSpacing: "-0.03em",
              fontSize: { xs: "1.6rem", md: "2.2rem" },
              lineHeight: 1.2,
            }}
          >
            {product_name}
          </Typography>

          {/* SKU */}
          <Typography
            variant="caption"
            sx={{ color: "var(--text-muted)", fontSize: "0.78rem" }}
          >
            SKU: {sku}
          </Typography>

          {/* PRICE */}
          <Box
            sx={{
              my: 3,
              p: 2.5,
              background: "var(--surface)",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border)",
            }}
          >
            <Stack direction="row" alignItems="center" spacing={2} flexWrap="wrap">
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  color: hasDiscount ? "var(--accent)" : "var(--text)",
                  fontSize: { xs: "1.5rem", md: "1.8rem" },
                }}
              >
                {sale_price} EGP
              </Typography>

              {hasDiscount && (
                <Typography
                  sx={{
                    textDecoration: "line-through",
                    color: "var(--text-muted)",
                    fontSize: "1rem",
                  }}
                >
                  {regular_price} EGP
                </Typography>
              )}

              {hasDiscount && (
                <Chip
                  label={`Save ${Math.round(((regular_price - sale_price) / regular_price) * 100)}%`}
                  size="small"
                  sx={{
                    background: "rgba(0, 184, 148, 0.12)",
                    color: "var(--success)",
                    fontWeight: 600,
                    fontSize: "0.78rem",
                  }}
                />
              )}
            </Stack>
          </Box>

          <Divider sx={{ borderColor: "var(--border)", my: 3 }} />

          {/* Sizes */}
          {sizes.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{
                  fontWeight: 600,
                  mb: 1.5,
                  color: "var(--text)",
                  fontSize: "0.92rem",
                }}
              >
                Available Sizes
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {[...new Set(sizes)].filter(Boolean).map((s) => (
                  <Chip
                    key={s}
                    label={s}
                    variant="outlined"
                    sx={{
                      borderColor: "var(--border)",
                      color: "var(--text-secondary)",
                      fontWeight: 500,
                      transition: "all 0.2s ease",
                      "&:hover": {
                        borderColor: "var(--primary)",
                        color: "var(--primary-light)",
                        backgroundColor: "rgba(108, 92, 231, 0.08)",
                      },
                    }}
                  />
                ))}
              </Stack>
            </Box>
          )}

          {/* Colors */}
          {colors.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{
                  fontWeight: 600,
                  mb: 1.5,
                  color: "var(--text)",
                  fontSize: "0.92rem",
                }}
              >
                Colors
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {colors.filter(Boolean).map((c) => (
                  <Chip
                    key={c}
                    label={c}
                    sx={{
                      backgroundColor: "var(--surface-hover)",
                      color: "var(--text-secondary)",
                      border: "1px solid var(--border)",
                      fontWeight: 500,
                      transition: "all 0.2s ease",
                      "&:hover": {
                        borderColor: "var(--primary)",
                        color: "var(--primary-light)",
                      },
                    }}
                  />
                ))}
              </Stack>
            </Box>
          )}

          {/* Material */}
          {material && (
            <Box
              sx={{
                mb: 3,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography sx={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                Material:
              </Typography>
              <Typography
                sx={{
                  color: "var(--text-secondary)",
                  fontWeight: 500,
                  fontSize: "0.9rem",
                }}
              >
                {material}
              </Typography>
            </Box>
          )}

          {/* Description */}
          <Typography
            sx={{
              color: "var(--text-muted)",
              lineHeight: 1.8,
              mb: 4,
              fontSize: "0.92rem",
            }}
          >
            {product_description}
          </Typography>

          {/* CTA */}
          <Stack spacing={1.5}>
            <AddToCartButton product={product} />

            {product_page_url && (
              <Button
                variant="outlined"
                size="large"
                fullWidth
                href={product_page_url}
                target="_blank"
                sx={{
                  borderColor: "var(--border)",
                  color: "var(--text-secondary)",
                  borderRadius: "var(--radius-md)",
                  py: 1.5,
                  fontWeight: 600,
                  textTransform: "none",
                  fontSize: "0.95rem",
                  transition: "all 0.25s ease",
                  "&:hover": {
                    borderColor: "var(--primary)",
                    color: "var(--primary-light)",
                    backgroundColor: "rgba(108, 92, 231, 0.06)",
                  },
                }}
              >
                View on {source_website}
              </Button>
            )}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default Page;
