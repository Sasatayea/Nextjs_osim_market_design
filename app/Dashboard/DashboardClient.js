"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Avatar,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Tooltip,
} from "@mui/material";
import {
  Add,
  ExpandMore,
  Visibility,
  Edit,
  Delete,
  Close,
  Inventory2,
} from "@mui/icons-material";
import { TableRowSkeleton } from "@/components/ui/LoadingSkeleton";

const DashboardClient = ({ products }) => {
  const [session, setSession] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const [items, setItems] = useState(products);

  const [isOpen, setIsOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [form, setForm] = useState({
    product_name: "",
    primary_image_url: "",
    product_category: "",
    product_description: "",
    regular_price: "",
    sale_price: "",
    discount_pct: "",
    material: "",
    color: "",
    color_options: "",
    available_sizes: "",
    product_page_url: "",
    sku: "",
    source_url: "",
    source_website: "",
  });
  const router = useRouter();

  const groupedProducts = items.reduce((acc, product) => {
    const category = product.product_category;

    if (!acc[category]) acc[category] = [];

    acc[category].push(product);
    return acc;
  }, {});

  useEffect(() => {
    const securePage = async () => {
      const res = await authClient.getSession();

      if (!res?.data?.user) {
        authClient.signIn.social({
          provider: "github",
        });
      } else {
        setSession(res);
      }

      setLoading(false);
    };

    securePage();
  }, []);

  // ===== ACTIONS =====
  const handleShow = (id) => {
    console.log(id);
    router.push(`/isr/${id}`);
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setForm(product); // نفس الشكل من DB
    setIsOpen(true);
  };
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const { _id, ...rest } = form; // مهم جدًا

    await fetch(`/api/products/${currentProduct._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rest),
    });

    setItems((prev) =>
      prev.map((item) =>
        item._id === currentProduct._id ? { ...item, ...rest } : item,
      ),
    );

    setIsOpen(false);
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete?");

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      // نحذف من الـ UI فورًا
      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting product");
    }
  };

  if (loading)
    return (
      <Box
        sx={{
          maxWidth: 1100,
          mx: "auto",
          px: 3,
          py: 6,
        }}
      >
        <Box
          className="skeleton"
          sx={{ width: 300, height: 32, mb: 2, borderRadius: "var(--radius-sm)" }}
        />
        <Box
          className="skeleton"
          sx={{ width: 200, height: 18, mb: 4, borderRadius: "var(--radius-sm)" }}
        />
        <TableRowSkeleton count={6} />
      </Box>
    );

  // console.log("ID:", currentProduct.id);
  return (
    <Box
      sx={{
        maxWidth: 1100,
        mx: "auto",
        px: { xs: 2, md: 3 },
        py: { xs: 3, md: 6 },
        animation: "fadeIn 0.5s ease forwards",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          mb: 4,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: "var(--text)",
              letterSpacing: "-0.03em",
              fontSize: { xs: "1.5rem", md: "2rem" },
            }}
          >
            Dashboard 👋
          </Typography>
          <Typography
            sx={{
              color: "var(--text-muted)",
              fontSize: "0.9rem",
              mt: 0.5,
            }}
          >
            Welcome back, {session?.data?.user?.name} •{" "}
            <span style={{ color: "var(--text-secondary)" }}>
              {session?.data?.user?.email}
            </span>
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => router.push("/Dashboard/add")}
          sx={{
            background: "linear-gradient(135deg, var(--primary), #8b5cf6)",
            color: "#fff",
            borderRadius: "var(--radius-md)",
            px: 3,
            py: 1.2,
            fontWeight: 600,
            textTransform: "none",
            fontSize: "0.9rem",
            boxShadow: "0 4px 16px var(--primary-glow)",
            transition: "all 0.25s ease",
            "&:hover": {
              background: "linear-gradient(135deg, var(--primary-hover), #9b6ff7)",
              transform: "translateY(-2px)",
              boxShadow: "0 8px 24px var(--primary-glow)",
            },
          }}
        >
          Add Product
        </Button>
      </Box>

      {/* Stats Bar */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr)" },
          gap: 2,
          mb: 4,
        }}
      >
        {[
          {
            label: "Total Products",
            value: items.length,
            color: "var(--primary-light)",
          },
          {
            label: "Categories",
            value: Object.keys(groupedProducts).length,
            color: "var(--accent)",
          },
          {
            label: "On Sale",
            value: items.filter(
              (p) => p.discount_pct && Number(p.discount_pct) > 0,
            ).length,
            color: "var(--success)",
          },
          {
            label: "Avg. Price",
            value: `${Math.round(items.reduce((a, p) => a + (Number(p.sale_price) || 0), 0) / items.length)} EGP`,
            color: "var(--warning)",
          },
        ].map((stat) => (
          <Box
            key={stat.label}
            sx={{
              p: 2.5,
              background: "var(--surface)",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border)",
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "1.6rem",
                fontWeight: 800,
                color: stat.color,
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              {stat.value}
            </Typography>
            <Typography
              sx={{
                fontSize: "0.72rem",
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                mt: 0.5,
                fontWeight: 600,
              }}
            >
              {stat.label}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Category Accordions */}
      {Object.entries(groupedProducts).map(([category, products]) => (
        <Accordion
          key={category}
          defaultExpanded
          sx={{
            backgroundColor: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg) !important",
            mb: 2,
            "&::before": { display: "none" },
            overflow: "hidden",
            boxShadow: "none",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMore sx={{ color: "var(--text-muted)" }} />}
            sx={{
              px: 3,
              "&:hover": {
                backgroundColor: "var(--surface-hover)",
              },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Inventory2
                sx={{ color: "var(--primary-light)", fontSize: 20 }}
              />
              <Typography
                sx={{
                  fontWeight: 700,
                  color: "var(--text)",
                  fontSize: "1rem",
                }}
              >
                {category}
              </Typography>
              <Chip
                label={products.length}
                size="small"
                sx={{
                  bgcolor: "rgba(108, 92, 231, 0.12)",
                  color: "var(--primary-light)",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  height: 22,
                }}
              />
            </Box>
          </AccordionSummary>

          <AccordionDetails sx={{ px: 0, pb: 0 }}>
            {products.map((product, index) => (
              <Box
                key={product._id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: 1.5, md: 2 },
                  px: 3,
                  py: 1.5,
                  borderTop: "1px solid var(--border)",
                  transition: "background 0.15s ease",
                  "&:hover": {
                    backgroundColor: "var(--surface-hover)",
                  },
                  flexWrap: { xs: "wrap", sm: "nowrap" },
                }}
              >
                {/* Thumbnail */}
                <Avatar
                  src={product.primary_image_url}
                  alt={product.product_name}
                  variant="rounded"
                  sx={{
                    width: 52,
                    height: 52,
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border)",
                    flexShrink: 0,
                  }}
                />

                {/* Name & Price */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: "0.88rem",
                      color: "var(--text)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {product.product_name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.78rem",
                      color: "var(--text-muted)",
                    }}
                  >
                    {product.sale_price
                      ? `${Number(product.sale_price).toLocaleString()} EGP`
                      : "No price"}
                  </Typography>
                </Box>

                {/* Action Buttons */}
                <Box sx={{ display: "flex", gap: 0.5, flexShrink: 0 }}>
                  <Tooltip title="View Product" arrow>
                    <IconButton
                      size="small"
                      onClick={() => handleShow(product._id)}
                      sx={{
                        color: "var(--primary-light)",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius-sm)",
                        width: 34,
                        height: 34,
                        transition: "all 0.2s ease",
                        "&:hover": {
                          borderColor: "var(--primary)",
                          backgroundColor: "rgba(108, 92, 231, 0.1)",
                        },
                      }}
                    >
                      <Visibility sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Edit Product" arrow>
                    <IconButton
                      size="small"
                      onClick={() => handleEdit(product)}
                      sx={{
                        color: "var(--warning)",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius-sm)",
                        width: 34,
                        height: 34,
                        transition: "all 0.2s ease",
                        "&:hover": {
                          borderColor: "var(--warning)",
                          backgroundColor: "rgba(253, 203, 110, 0.1)",
                        },
                      }}
                    >
                      <Edit sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete Product" arrow>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(product._id)}
                      sx={{
                        color: "var(--error)",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius-sm)",
                        width: 34,
                        height: 34,
                        transition: "all 0.2s ease",
                        "&:hover": {
                          borderColor: "var(--error)",
                          backgroundColor: "rgba(231, 76, 60, 0.1)",
                        },
                      }}
                    >
                      <Delete sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}

      {/* ===== EDIT MODAL (MUI Dialog) ===== */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: "var(--surface-raised)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-xl)",
            maxHeight: "90vh",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid var(--border)",
            pb: 2,
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              color: "var(--text)",
              fontSize: "1.1rem",
            }}
          >
            Edit Product
          </Typography>
          <IconButton
            onClick={() => setIsOpen(false)}
            sx={{ color: "var(--text-muted)" }}
          >
            <Close />
          </IconButton>
        </DialogTitle>

        <form onSubmit={handleUpdate}>
          <DialogContent sx={{ py: 3 }}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 2,
              }}
            >
              {[
                { name: "product_name", label: "Product Name", full: true },
                { name: "primary_image_url", label: "Image URL", full: true },
                { name: "product_category", label: "Category" },
                { name: "regular_price", label: "Regular Price" },
                { name: "sale_price", label: "Sale Price" },
                { name: "discount_pct", label: "Discount %" },
                { name: "material", label: "Material" },
                { name: "color", label: "Color" },
                { name: "available_sizes", label: "Sizes" },
                { name: "sku", label: "SKU" },
              ].map((field) => (
                <TextField
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  value={form[field.name] || ""}
                  onChange={handleChange}
                  size="small"
                  fullWidth
                  sx={{
                    gridColumn: field.full ? "1 / -1" : "auto",
                    "& .MuiOutlinedInput-root": {
                      color: "var(--text)",
                      borderRadius: "var(--radius-md)",
                      "& fieldset": {
                        borderColor: "var(--border)",
                      },
                      "&:hover fieldset": {
                        borderColor: "var(--border-light)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "var(--primary)",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "var(--text-muted)",
                      "&.Mui-focused": {
                        color: "var(--primary-light)",
                      },
                    },
                  }}
                />
              ))}

              <TextField
                name="color_options"
                label="Color Options"
                value={form.color_options || ""}
                onChange={handleChange}
                size="small"
                fullWidth
                multiline
                rows={2}
                sx={{
                  gridColumn: "1 / -1",
                  "& .MuiOutlinedInput-root": {
                    color: "var(--text)",
                    borderRadius: "var(--radius-md)",
                    "& fieldset": { borderColor: "var(--border)" },
                    "&:hover fieldset": { borderColor: "var(--border-light)" },
                    "&.Mui-focused fieldset": { borderColor: "var(--primary)" },
                  },
                  "& .MuiInputLabel-root": {
                    color: "var(--text-muted)",
                    "&.Mui-focused": { color: "var(--primary-light)" },
                  },
                }}
              />

              <TextField
                name="product_description"
                label="Description"
                value={form.product_description || ""}
                onChange={handleChange}
                size="small"
                fullWidth
                multiline
                rows={3}
                sx={{
                  gridColumn: "1 / -1",
                  "& .MuiOutlinedInput-root": {
                    color: "var(--text)",
                    borderRadius: "var(--radius-md)",
                    "& fieldset": { borderColor: "var(--border)" },
                    "&:hover fieldset": { borderColor: "var(--border-light)" },
                    "&.Mui-focused fieldset": { borderColor: "var(--primary)" },
                  },
                  "& .MuiInputLabel-root": {
                    color: "var(--text-muted)",
                    "&.Mui-focused": { color: "var(--primary-light)" },
                  },
                }}
              />

              {[
                { name: "product_page_url", label: "Product URL" },
                { name: "source_url", label: "Source URL" },
                { name: "source_website", label: "Source Website" },
              ].map((field) => (
                <TextField
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  value={form[field.name] || ""}
                  onChange={handleChange}
                  size="small"
                  fullWidth
                  sx={{
                    gridColumn: field.name === "product_page_url" ? "1 / -1" : "auto",
                    "& .MuiOutlinedInput-root": {
                      color: "var(--text)",
                      borderRadius: "var(--radius-md)",
                      "& fieldset": { borderColor: "var(--border)" },
                      "&:hover fieldset": { borderColor: "var(--border-light)" },
                      "&.Mui-focused fieldset": { borderColor: "var(--primary)" },
                    },
                    "& .MuiInputLabel-root": {
                      color: "var(--text-muted)",
                      "&.Mui-focused": { color: "var(--primary-light)" },
                    },
                  }}
                />
              ))}
            </Box>
          </DialogContent>

          <DialogActions
            sx={{
              px: 3,
              pb: 3,
              pt: 1,
              borderTop: "1px solid var(--border)",
              gap: 1,
            }}
          >
            <Button
              type="button"
              onClick={() => setIsOpen(false)}
              sx={{
                color: "var(--text-muted)",
                borderRadius: "var(--radius-md)",
                textTransform: "none",
                fontWeight: 500,
                px: 3,
                "&:hover": {
                  backgroundColor: "var(--surface-hover)",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                background: "linear-gradient(135deg, var(--primary), #8b5cf6)",
                color: "#fff",
                borderRadius: "var(--radius-md)",
                textTransform: "none",
                fontWeight: 600,
                px: 4,
                boxShadow: "0 4px 16px var(--primary-glow)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, var(--primary-hover), #9b6ff7)",
                },
              }}
            >
              Save Changes
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default DashboardClient;
