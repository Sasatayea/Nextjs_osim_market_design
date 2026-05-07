"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box, Typography, Button, IconButton, Avatar, Chip,
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Accordion, AccordionSummary, AccordionDetails,
  Tooltip
} from "@mui/material";
import {
  Add, ExpandMore, Visibility, Edit, Delete, Close, Inventory2
} from "@mui/icons-material";
import { TableRowSkeleton } from "@/components/ui/LoadingSkeleton";

const DashboardClient = ({ products }) => {
  const [session, setSession] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState(products);
  const [isOpen, setIsOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  
  const [form, setForm] = useState({
    product_name: "", primary_image_url: "", product_category: "",
    product_description: "", regular_price: "", sale_price: "",
    discount_pct: "", material: "", color: "", color_options: "",
    available_sizes: "", product_page_url: "", sku: "",
    source_url: "", source_website: "",
  });
  
  const router = useRouter();

  const groupedProducts = items.reduce((acc, product) => {
    const category = product.product_category || "Uncategorized";
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {});

  useEffect(() => {
    const securePage = async () => {
      const res = await authClient.getSession();
      if (!res?.data?.user) {
        authClient.signIn.social({ provider: "github" });
      } else {
        setSession(res);
      }
      setLoading(false);
    };
    securePage();
  }, []);

  const handleShow = (id) => router.push(`/isr/${id}`);
  
  const handleEdit = (product) => {
    setCurrentProduct(product);
    setForm(product);
    setIsOpen(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { _id, ...rest } = form;
    await fetch(`/api/products/${currentProduct._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rest),
    });
    setItems((prev) =>
      prev.map((item) =>
        item._id === currentProduct._id ? { ...item, ...rest } : item
      )
    );
    setIsOpen(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
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
      borderRadius: "var(--r-sm)",
      "& fieldset": { borderColor: "var(--border)" },
      "&:hover fieldset": { borderColor: "var(--border-light)" },
      "&.Mui-focused fieldset": { borderColor: "var(--gold-dim)" },
    },
    "& .MuiInputLabel-root": {
      color: "var(--text-4)",
      "&.Mui-focused": { color: "var(--gold-light)" },
    },
  };

  if (loading) return (
    <Box sx={{ maxWidth: 1100, mx: "auto", px: 3, py: 6 }}>
      <TableRowSkeleton count={8} />
    </Box>
  );

  return (
    <Box sx={{
      maxWidth: 1100, mx: "auto", px: { xs: 2, md: 3 }, py: { xs: 4, md: 8 },
      animation: "fadeIn 0.5s ease forwards",
    }}>
      {/* Header */}
      <Box sx={{
        display: "flex", justifyContent: "space-between", alignItems: "flex-end",
        flexDirection: { xs: "column", sm: "row" }, gap: 3, mb: 6,
      }}>
        <Box>
          <Typography sx={{
            fontFamily: "var(--font-mono)", fontSize: "0.65rem",
            letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", mb: 1,
          }}>
            Management Portal
          </Typography>
          <Typography variant="h4" sx={{
            fontWeight: 600, color: "var(--text)", letterSpacing: "-0.02em",
            fontFamily: "var(--font-display)", fontSize: { xs: "1.8rem", md: "2.4rem" },
          }}>
            Dashboard <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Pulse</em>
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => router.push("/Dashboard/add")}
          sx={{
            background: "linear-gradient(135deg, var(--gold-light), var(--gold))",
            color: "#0a0804", borderRadius: "var(--r-sm)", px: 3, py: 1.2,
            fontWeight: 700, textTransform: "uppercase", fontSize: "0.75rem",
            letterSpacing: "0.08em", boxShadow: "var(--shadow-gold)",
            "&:hover": {
              filter: "brightness(1.05)", transform: "translateY(-2px)",
              boxShadow: "var(--shadow-gold-lg)",
            },
          }}
        >
          Add Product
        </Button>
      </Box>

      {/* Stats Bar */}
      <Box sx={{
        display: "grid", gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr)" },
        gap: 2, mb: 6,
      }}>
        {[
          { label: "Total Products", value: items.length, color: "var(--gold-light)" },
          { label: "Categories", value: Object.keys(groupedProducts).length, color: "var(--blue-light)" },
          { label: "On Sale", value: items.filter(p => p.discount_pct > 0).length, color: "var(--success)" },
          { label: "Avg. Price", value: `${Math.round(items.reduce((a, p) => a + (Number(p.sale_price) || 0), 0) / items.length)} EGP`, color: "var(--gold)" },
        ].map((stat) => (
          <Box key={stat.label} sx={{
            p: 3, background: "var(--surface)", borderRadius: "var(--r-lg)",
            border: "1px solid var(--border)", textAlign: "center",
          }}>
            <Typography sx={{
              fontSize: "1.8rem", fontWeight: 700, color: stat.color,
              letterSpacing: "-0.02em", lineHeight: 1, fontFamily: "var(--font-display)",
            }}>
              {stat.value}
            </Typography>
            <Typography sx={{
              fontSize: "0.62rem", color: "var(--text-4)", textTransform: "uppercase",
              letterSpacing: "0.12em", mt: 1, fontWeight: 600, fontFamily: "var(--font-mono)",
            }}>
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
            backgroundColor: "var(--surface)", border: "1px solid var(--border)",
            borderRadius: "var(--r-lg) !important", mb: 2,
            "&::before": { display: "none" }, overflow: "hidden", boxShadow: "none",
            "&:hover": { borderColor: "var(--border-light)" },
          }}
        >
          <AccordionSummary expandIcon={<ExpandMore sx={{ color: "var(--text-4)" }} />} sx={{ px: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Inventory2 sx={{ color: "var(--gold-dim)", fontSize: 18 }} />
              <Typography sx={{ fontWeight: 600, color: "var(--text)", fontSize: "0.9rem" }}>
                {category}
              </Typography>
              <Chip label={products.length} size="small" sx={{
                bgcolor: "rgba(201,160,76,0.08)", color: "var(--gold)",
                fontWeight: 700, fontSize: "0.65rem", height: 20, fontFamily: "var(--font-mono)",
              }} />
            </Box>
          </AccordionSummary>

          <AccordionDetails sx={{ px: 0, pb: 0 }}>
            {products.map((product) => (
              <Box key={product._id} sx={{
                display: "flex", alignItems: "center", gap: 2, px: 3, py: 1.5,
                borderTop: "1px solid var(--border)", transition: "background 0.15s ease",
                "&:hover": { backgroundColor: "var(--surface-hover)" },
              }}>
                <Avatar src={product.primary_image_url} alt={product.product_name} variant="rounded" sx={{
                  width: 48, height: 48, borderRadius: "var(--r-sm)", border: "1px solid var(--border)",
                }} />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography sx={{
                    fontWeight: 600, fontSize: "0.85rem", color: "var(--text-2)",
                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                  }}>
                    {product.product_name}
                  </Typography>
                  <Typography sx={{ fontSize: "0.75rem", color: "var(--text-4)", fontFamily: "var(--font-mono)" }}>
                    {product.sale_price ? `${Number(product.sale_price).toLocaleString()} EGP` : "—"}
                  </Typography>
                </Box>
                
                <Box sx={{ display: "flex", gap: 0.5 }}>
                  <DashboardIconBtn title="View" icon={<Visibility sx={{ fontSize: 16 }} />} onClick={() => handleShow(product._id)} color="var(--blue-light)" />
                  <DashboardIconBtn title="Edit" icon={<Edit sx={{ fontSize: 16 }} />} onClick={() => handleEdit(product)} color="var(--gold)" />
                  <DashboardIconBtn title="Delete" icon={<Delete sx={{ fontSize: 16 }} />} onClick={() => handleDelete(product._id)} color="var(--error)" />
                </Box>
              </Box>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}

      {/* Edit Modal */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} maxWidth="sm" fullWidth PaperProps={{
        sx: { bgcolor: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: "var(--r-xl)", boxShadow: "var(--shadow-xl)" }
      }}>
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border)", pb: 2 }}>
          <Typography sx={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--text)", fontSize: "1.2rem" }}>
            Edit Product
          </Typography>
          <IconButton onClick={() => setIsOpen(false)} sx={{ color: "var(--text-4)" }}><Close /></IconButton>
        </DialogTitle>
        <form onSubmit={handleUpdate}>
          <DialogContent sx={{ py: 3 }}>
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2.5 }}>
              <TextField name="product_name" label="Product Name" value={form.product_name || ""} onChange={handleChange} size="small" fullWidth sx={{ ...fieldSx, gridColumn: "1 / -1" }} />
              <TextField name="primary_image_url" label="Image URL" value={form.primary_image_url || ""} onChange={handleChange} size="small" fullWidth sx={{ ...fieldSx, gridColumn: "1 / -1" }} />
              <TextField name="product_category" label="Category" value={form.product_category || ""} onChange={handleChange} size="small" fullWidth sx={fieldSx} />
              <TextField name="sku" label="SKU" value={form.sku || ""} onChange={handleChange} size="small" fullWidth sx={fieldSx} />
              <TextField name="regular_price" label="Regular Price" value={form.regular_price || ""} onChange={handleChange} size="small" fullWidth sx={fieldSx} />
              <TextField name="sale_price" label="Sale Price" value={form.sale_price || ""} onChange={handleChange} size="small" fullWidth sx={fieldSx} />
              <TextField name="discount_pct" label="Discount %" value={form.discount_pct || ""} onChange={handleChange} size="small" fullWidth sx={fieldSx} />
              <TextField name="material" label="Material" value={form.material || ""} onChange={handleChange} size="small" fullWidth sx={fieldSx} />
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3, gap: 1.5 }}>
            <Button onClick={() => setIsOpen(false)} sx={{ color: "var(--text-4)", fontWeight: 600, fontSize: "0.8rem", textTransform: "uppercase" }}>Cancel</Button>
            <Button type="submit" variant="contained" sx={{
              background: "linear-gradient(135deg, var(--gold-light), var(--gold))", color: "#0a0804",
              borderRadius: "var(--r-sm)", fontWeight: 700, px: 4, py: 1, fontSize: "0.75rem", textTransform: "uppercase",
            }}>Save Changes</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

function DashboardIconBtn({ title, icon, onClick, color }) {
  return (
    <Tooltip title={title} arrow>
      <IconButton size="small" onClick={onClick} sx={{
        color: "var(--text-4)", border: "1px solid var(--border)", borderRadius: "var(--r-sm)",
        width: 36, height: 36, transition: "all 0.2s",
        "&:hover": { color: color, borderColor: color, backgroundColor: "rgba(201,160,76,0.04)" }
      }}>
        {icon}
      </IconButton>
    </Tooltip>
  );
}

export default DashboardClient;
