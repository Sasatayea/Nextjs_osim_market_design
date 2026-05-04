import Link from "next/link";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { ScaleOnHover } from "@/components/ui/Animations";

export default function ActionAreaCard({
  name,
  description,
  imageURL,
  myId,
  sale_price,
  regular_price,
  discount_pct,
}) {
  const hasDiscount =
    discount_pct != null &&
    discount_pct > 0 &&
    regular_price != null &&
    regular_price !== sale_price;

  return (
    <ScaleOnHover>
      <Card
        sx={{
          maxWidth: "100%",
        borderRadius: "var(--radius-lg)",
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
        boxShadow: "none",
        transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        overflow: "hidden",
        position: "relative",
        "&:hover": {
          transform: "translateY(-6px)",
          borderColor: "var(--primary)",
          boxShadow: "0 12px 40px rgba(108, 92, 231, 0.15)",
        },
        "&:hover .product-image": {
          transform: "scale(1.08)",
        },
      }}
    >
      {/* Discount badge */}
      {hasDiscount && (
        <Chip
          label={`-${Math.round(discount_pct)}%`}
          size="small"
          sx={{
            position: "absolute",
            top: 12,
            left: 12,
            zIndex: 2,
            background: "linear-gradient(135deg, var(--accent), #e84393)",
            color: "#fff",
            fontWeight: 700,
            fontSize: "0.72rem",
            height: 26,
            borderRadius: "var(--radius-sm)",
            letterSpacing: "0.02em",
            boxShadow: "0 2px 8px rgba(253, 121, 168, 0.3)",
          }}
        />
      )}

      <Link href={`/isr/${myId}`} style={{ textDecoration: "none" }}>
        <CardActionArea
          sx={{
            "&:hover .MuiCardActionArea-focusHighlight": {
              opacity: 0,
            },
          }}
        >
          <Box sx={{ overflow: "hidden", position: "relative" }}>
            <CardMedia
              className="product-image"
              component="img"
              height="240"
              image={imageURL}
              alt={name}
              sx={{
                objectFit: "contain",
                transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
            {/* Image overlay gradient */}
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "50%",
                background: "linear-gradient(to top, var(--surface), transparent)",
                pointerEvents: "none",
              }}
            />
          </Box>

          <CardContent sx={{ pb: "20px !important", pt: 2.5, px: 2.5 }}>
            {/* Product name */}
            <Typography
              gutterBottom
              variant="h6"
              component="h3"
              sx={{
                fontWeight: 700,
                fontSize: "1rem",
                lineHeight: 1.4,
                color: "var(--text)",
                mb: 0.8,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                transition: "color 0.2s ease",
                "&:hover": { color: "var(--primary-light)" },
              }}
            >
              {name}
            </Typography>

            {/* Description */}
            {description && (
              <Typography
                variant="body2"
                sx={{
                  color: "var(--text-muted)",
                  fontSize: "0.85rem",
                  mb: 2,
                  display: "-webkit-box",
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  lineHeight: 1.5,
                }}
              >
                {description}
              </Typography>
            )}

            {/* Price row */}
            <Box sx={{ display: "flex", alignItems: "baseline", gap: 1.5, flexWrap: "wrap", mt: 'auto' }}>
              {/* Sale price */}
              {sale_price != null && (
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 800,
                    fontSize: "1.15rem",
                    color: hasDiscount ? "var(--accent-light)" : "var(--text)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {Number(sale_price).toLocaleString()} EGP
                </Typography>
              )}

              {/* Original price (strikethrough) */}
              {hasDiscount && (
                <Typography
                  variant="body2"
                  sx={{
                    textDecoration: "line-through",
                    color: "var(--text-muted)",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                  }}
                >
                  {Number(regular_price).toLocaleString()}
                </Typography>
              )}
            </Box>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
    </ScaleOnHover>
  );
}