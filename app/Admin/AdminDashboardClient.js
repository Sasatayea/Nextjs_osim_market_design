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
  ArrowBack,
  TrendingUp,
  Category,
  LocalOffer,
  AttachMoney,
} from "@mui/icons-material";
import { TableRowSkeleton } from "@/components/ui/LoadingSkeleton";

const AdminDashboardClient = ({ products }) => {
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
    router.push(`/isr/${id}`);
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setForm(product);
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

    const { _id, ...rest } = form;

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

      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting product");
    }
  };

  const fieldSx = {
    "& .MuiOutlinedInput-root": {
      color: "var(--text)",
      borderRadius: "var(--radius-md)",
      fontSize: "0.9rem",
      "& fieldset": {
        borderColor: "var(--border)",
      },
      "&:hover fieldset": {
        borderColor: "var(--border-light)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "var(--primary)",
        boxShadow: "0 0 0 3px var(--primary-glow)",
      },
    },
    "& .MuiInputLabel-root": {
      color: "var(--text-muted)",
      fontSize: "0.88rem",
      "&.Mui-focused": {
        color: "var(--primary)",
      },
    },
  };

  if (loading)
    return (
      <Box
        sx={{
          maxWidth: 1100,
          mx: "auto",
          px: 3,
          py: 6,
          minHeight: "100vh",
          backgroundColor: "var(--bg)",
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

  const statCards = [
    {
      label: "Total Products",
      value: items.length,
      color: "var(--primary)",
      icon: <Inventory2 sx={{ fontSize: 20 }} />,
    },
    {
      label: "Categories",
      value: Object.keys(groupedProducts).length,
      color: "var(--accent)",
      icon: <Category sx={{ fontSize: 20 }} />,
    },
    {
      label: "On Sale",
      value: items.filter(
        (p) => p.discount_pct && Number(p.discount_pct) > 0,
      ).length,
      color: "var(--success)",
      icon: <LocalOffer sx={{ fontSize: 20 }} />,
    },
    {
      label: "Avg. Price",
      value: `${Math.round(items.reduce((a, p) => a + (Number(p.sale_price) || 0), 0) / items.length)} EGP`,
      color: "var(--warning)",
      icon: <AttachMoney sx={{ fontSize: 20 }} />,
    },
  ];

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
          maxWidth: 1200,
          mx: "auto",
          px: { xs: 2, md: 4 },
          py: { xs: 3, md: 5 },
          animation: "fadeIn 0.5s ease forwards",
        }}
      >
        {/* Back to Store */}
        <Button
          startIcon={<ArrowBack sx={{ fontSize: 18 }} />}
          onClick={() => router.push("/")}
          sx={{
            color: "var(--text-muted)",
            textTransform: "none",
            mb: 3,
            fontWeight: 500,
            fontSize: "0.85rem",
            "&:hover": { color: "var(--primary)" },
          }}
        >
          Back to Store
        </Button>

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
                fontFamily: "var(--font-playfair), var(--font-display)",
                fontWeight: 700,
                color: "var(--text)",
                letterSpacing: "-0.02em",
                fontSize: { xs: "1.5rem", md: "2rem" },
              }}
            >
              Admin Dashboard
            </Typography>
            <Typography
              sx={{
                color: "var(--text-muted)",
                fontSize: "0.88rem",
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
            onClick={() => router.push("/Admin/add")}
            sx={{
              background: "linear-gradient(135deg, var(--primary), #b8972f)",
              color: "#0a0a0a",
              borderRadius: "var(--radius-md)",
              px: 3,
              py: 1.2,
              fontWeight: 600,
              textTransform: "none",
              fontSize: "0.88rem",
              boxShadow: "var(--shadow-gold)",
              transition: "all 0.25s ease",
              "&:hover": {
                background: "linear-gradient(135deg, var(--primary-hover), #c4a23a)",
                transform: "translateY(-2px)",
                boxShadow: "0 8px 28px rgba(201, 168, 76, 0.25)",
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
            mb: 5,
          }}
        >
          {statCards.map((stat) => (
            <Box
              key={stat.label}
              sx={{
                p: 3,
                background: "var(--surface)",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--border)",
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden",
                "&:hover": {
                  borderColor: "var(--border-light)",
                  transform: "translateY(-2px)",
                  boxShadow: "var(--shadow-md)",
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: stat.color,
                  opacity: 0.5,
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5 }}>
                <Box sx={{ color: stat.color, opacity: 0.7 }}>{stat.icon}</Box>
              </Box>
              <Typography
                sx={{
                  fontSize: "1.8rem",
                  fontWeight: 800,
                  color: stat.color,
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                  mb: 0.5,
                }}
              >
                {stat.value}
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.7rem",
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
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
              transition: "border-color 0.2s ease",
              "&:hover": {
                borderColor: "var(--border-light)",
              },
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
                  sx={{ color: "var(--primary)", fontSize: 18 }}
                />
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: "var(--text)",
                    fontSize: "0.95rem",
                  }}
                >
                  {category}
                </Typography>
                <Chip
                  label={products.length}
                  size="small"
                  sx={{
                    bgcolor: "var(--primary-muted)",
                    color: "var(--primary)",
                    fontWeight: 700,
                    fontSize: "0.72rem",
                    height: 22,
                    border: "1px solid rgba(201, 168, 76, 0.15)",
                  }}
                />
              </Box>
            </AccordionSummary>

            <AccordionDetails sx={{ px: 0, pb: 0 }}>
              {products.map((product) => (
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
                      width: 48,
                      height: 48,
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--border)",
                      flexShrink: 0,
                      bgcolor: "var(--surface-hover)",
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
                          color: "var(--primary)",
                          border: "1px solid var(--border)",
                          borderRadius: "var(--radius-sm)",
                          width: 34,
                          height: 34,
                          transition: "all 0.2s ease",
                          "&:hover": {
                            borderColor: "var(--primary)",
                            backgroundColor: "var(--primary-muted)",
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
                            backgroundColor: "var(--warning-glow)",
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
                            backgroundColor: "var(--error-glow)",
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

        {/* ===== EDIT MODAL ===== */}
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
                fontFamily: "var(--font-playfair), var(--font-display)",
                fontWeight: 700,
                color: "var(--text)",
                fontSize: "1.15rem",
              }}
            >
              Edit Product
            </Typography>
            <IconButton
              onClick={() => setIsOpen(false)}
              sx={{ color: "var(--text-muted)", "&:hover": { color: "var(--text)" } }}
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
                      ...fieldSx,
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
                    ...fieldSx,
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
                    ...fieldSx,
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
                      ...fieldSx,
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
                  background: "linear-gradient(135deg, var(--primary), #b8972f)",
                  color: "#0a0a0a",
                  borderRadius: "var(--radius-md)",
                  textTransform: "none",
                  fontWeight: 600,
                  px: 4,
                  boxShadow: "var(--shadow-gold)",
                  "&:hover": {
                    background: "linear-gradient(135deg, var(--primary-hover), #c4a23a)",
                  },
                }}
              >
                Save Changes
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Box>
    </Box>
  );
};

export default AdminDashboardClient;
