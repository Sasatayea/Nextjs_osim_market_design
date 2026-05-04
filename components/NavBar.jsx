"use client";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  InputBase,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
} from "@mui/material";
import {
  Search,
  AccountCircle,
  ShoppingCart,
  Menu as MenuIcon,
  Close,
  Home,
  Dashboard,
  Info,
  ExpandLess,
  ExpandMore,
  LocalOffer,
  Checkroom,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useCart } from "@/app/context/CartContext";

const NavBar = () => {
  const [session, setSession] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // MEN dropdown
  const [menAnchor, setMenAnchor] = useState(null);
  const menOpen = Boolean(menAnchor);

  // Sale dropdown
  const [saleAnchor, setSaleAnchor] = useState(null);
  const saleOpen = Boolean(saleAnchor);

  // Mobile sub-menus
  const [menMobileOpen, setMenMobileOpen] = useState(false);
  const [saleMobileOpen, setSaleMobileOpen] = useState(false);

  // Cart context
  let cart = [];
  try {
    const cartContext = useCart();
    cart = cartContext?.cart || [];
  } catch {
    cart = [];
  }

  useEffect(() => {
    authClient.getSession().then(setSession);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkSx = {
    color: "var(--text-secondary)",
    cursor: "pointer",
    px: 2,
    py: 1,
    borderRadius: "var(--radius-full)",
    fontSize: "0.9rem",
    fontWeight: 500,
    letterSpacing: "0.01em",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      color: "#fff",
      backgroundColor: "rgba(108, 92, 231, 0.15)",
    },
  };

  const menuItemSx = {
    fontSize: "0.9rem",
    color: "var(--text)",
    borderRadius: "var(--radius-sm)",
    px: 2,
    py: 1.2,
    mb: 0.5,
    "&:hover": {
      backgroundColor: "var(--surface-hover)",
      color: "var(--primary-light)",
    },
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={scrolled ? 4 : 0}
        sx={{
          background: scrolled ? "rgba(11, 11, 16, 0.85)" : "rgba(11, 11, 16, 0.6)",
          backdropFilter: "blur(24px) saturate(1.2)",
          WebkitBackdropFilter: "blur(24px) saturate(1.2)",
          borderBottom: "1px solid",
          borderColor: scrolled ? "var(--border)" : "transparent",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          pt: scrolled ? 0 : 1,
          pb: scrolled ? 0 : 1,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            maxWidth: 1400,
            width: "100%",
            mx: "auto",
            px: { xs: 2, md: 4 },
            minHeight: { xs: 60, md: 64 },
          }}
        >
          {/* Mobile Menu Button */}
          <IconButton
            sx={{
              display: { xs: "flex", md: "none" },
              color: "var(--text)",
              mr: 1,
            }}
            onClick={() => setMobileOpen(true)}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none" }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 900,
                letterSpacing: "-0.04em",
                background: "linear-gradient(135deg, #fff 30%, var(--primary-light))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: { xs: "1.2rem", md: "1.5rem" },
                mr: { md: 4 },
              }}
            >
              OSIM.
            </Typography>
          </Link>

          {/* Desktop Navigation Links */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 1,
            }}
          >
            <Link href="/" style={{ textDecoration: "none" }}>
              <Typography sx={navLinkSx}>Home</Typography>
            </Link>

            {/* MEN Dropdown */}
            <Typography
              sx={{ ...navLinkSx, display: "flex", alignItems: "center", gap: 0.5 }}
              onClick={(e) => setMenAnchor(e.currentTarget)}
            >
              Men
              {menOpen ? <ExpandLess sx={{ fontSize: 18 }} /> : <ExpandMore sx={{ fontSize: 18 }} />}
            </Typography>
            <Menu
              anchorEl={menAnchor}
              open={menOpen}
              onClose={() => setMenAnchor(null)}
              elevation={0}
              PaperProps={{
                sx: {
                  mt: 1.5,
                  bgcolor: "rgba(17, 17, 24, 0.95)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-lg)",
                  boxShadow: "var(--shadow-xl)",
                  minWidth: 180,
                  p: 1,
                },
              }}
            >
              {["Top", "Bottom", "Shoes", "Accessories"].map((item) => (
                <MenuItem key={item} sx={menuItemSx} onClick={() => setMenAnchor(null)}>
                  {item}
                </MenuItem>
              ))}
            </Menu>

            {/* SALE Dropdown */}
            <Typography
              sx={{ ...navLinkSx, display: "flex", alignItems: "center", gap: 0.5, color: "var(--accent-light)" }}
              onClick={(e) => setSaleAnchor(e.currentTarget)}
            >
              Sale
              {saleOpen ? <ExpandLess sx={{ fontSize: 18 }} /> : <ExpandMore sx={{ fontSize: 18 }} />}
            </Typography>
            <Menu
              anchorEl={saleAnchor}
              open={saleOpen}
              onClose={() => setSaleAnchor(null)}
              elevation={0}
              PaperProps={{
                sx: {
                  mt: 1.5,
                  bgcolor: "rgba(17, 17, 24, 0.95)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-lg)",
                  boxShadow: "var(--shadow-xl)",
                  minWidth: 220,
                  p: 1,
                },
              }}
            >
              <MenuItem sx={menuItemSx} onClick={() => setSaleAnchor(null)}>
                <LocalOffer sx={{ fontSize: 18, mr: 1.5, color: "var(--accent)" }} />
                Winter up to 70% OFF
              </MenuItem>
              <MenuItem sx={menuItemSx} onClick={() => setSaleAnchor(null)}>
                <LocalOffer sx={{ fontSize: 18, mr: 1.5, color: "var(--accent)" }} />
                Summer up to 70% OFF
              </MenuItem>
            </Menu>

            <Link href="/About" style={{ textDecoration: "none" }}>
              <Typography sx={navLinkSx}>About</Typography>
            </Link>

            {session?.data?.user && (
              <Link href="/Dashboard" style={{ textDecoration: "none" }}>
                <Typography sx={navLinkSx}>Dashboard</Typography>
              </Link>
            )}
          </Box>

          {/* Spacer */}
          <Box sx={{ flex: 1 }} />

          {/* Search Bar — Desktop */}
          <Box
            sx={{
              display: { xs: "none", lg: "flex" },
              alignItems: "center",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              px: 2,
              py: 0.8,
              borderRadius: "var(--radius-full)",
              width: 300,
              mr: 3,
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:focus-within": {
                borderColor: "var(--primary)",
                boxShadow: "0 0 0 4px var(--primary-glow)",
                background: "var(--surface-hover)",
              },
            }}
          >
            <Search sx={{ color: "var(--text-muted)", mr: 1, fontSize: 20 }} />
            <InputBase
              placeholder="Search products..."
              sx={{
                color: "var(--text)",
                width: "100%",
                fontSize: "0.9rem",
                "& input::placeholder": {
                  color: "var(--text-muted)",
                  opacity: 1,
                },
              }}
            />
          </Box>

          {/* Right Icons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, md: 1.5 } }}>
            {/* User Icon */}
            <Link href="/userInfo">
              <IconButton
                sx={{
                  color: "var(--text)",
                  transition: "all 0.25s ease",
                  "&:hover": { color: "#fff", backgroundColor: "rgba(108, 92, 231, 0.15)" },
                }}
              >
                <AccountCircle sx={{ fontSize: 26 }} />
              </IconButton>
            </Link>

            {/* Cart Icon */}
            <Link href="/cart2">
              <IconButton
                sx={{
                  color: "var(--text)",
                  transition: "all 0.25s ease",
                  backgroundColor: cart.length > 0 ? "rgba(108, 92, 231, 0.1)" : "transparent",
                  "&:hover": { color: "#fff", backgroundColor: "rgba(108, 92, 231, 0.2)" },
                }}
              >
                <Badge
                  badgeContent={cart.length}
                  sx={{
                    "& .MuiBadge-badge": {
                      background: "linear-gradient(135deg, var(--primary), var(--accent))",
                      color: "#fff",
                      fontWeight: 800,
                      fontSize: "0.75rem",
                      minWidth: 20,
                      height: 20,
                      boxShadow: "0 2px 8px var(--primary-glow)",
                    },
                  }}
                >
                  <ShoppingCart sx={{ fontSize: 24 }} />
                </Badge>
              </IconButton>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>

      {/* ── Mobile Drawer ── */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            width: 300,
            bgcolor: "var(--bg)",
            borderRight: "1px solid var(--border)",
            backgroundImage: "radial-gradient(ellipse at top right, rgba(108, 92, 231, 0.05), transparent 50%)",
          },
        }}
      >
        {/* Drawer Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 3,
            borderBottom: "1px solid var(--border)",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 900,
              letterSpacing: "-0.04em",
              background: "linear-gradient(135deg, #fff, var(--primary-light))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: "1.4rem",
            }}
          >
            OSIM.
          </Typography>
          <IconButton
            onClick={() => setMobileOpen(false)}
            sx={{ color: "var(--text-muted)", "&:hover": { color: "var(--text)" } }}
          >
            <Close />
          </IconButton>
        </Box>

        {/* Search — Mobile */}
        <Box sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              px: 2,
              py: 1,
              borderRadius: "var(--radius-full)",
              "&:focus-within": {
                borderColor: "var(--primary)",
                boxShadow: "0 0 0 3px var(--primary-glow)",
              },
            }}
          >
            <Search sx={{ color: "var(--text-muted)", mr: 1, fontSize: 20 }} />
            <InputBase
              placeholder="Search products..."
              sx={{
                color: "var(--text)",
                width: "100%",
                fontSize: "0.95rem",
              }}
            />
          </Box>
        </Box>

        <List sx={{ px: 2, pb: 4 }}>
          {/* Home */}
          <ListItem
            component={Link}
            href="/"
            onClick={() => setMobileOpen(false)}
            sx={{
              borderRadius: "var(--radius-md)",
              mb: 1,
              py: 1.5,
              "&:hover": { bgcolor: "var(--surface-hover)" },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: "var(--text-muted)" }}>
              <Home />
            </ListItemIcon>
            <ListItemText
              primary="Home"
              primaryTypographyProps={{
                sx: { color: "var(--text)", fontSize: "1rem", fontWeight: 600 },
              }}
            />
          </ListItem>

          {/* MEN — Collapsible */}
          <ListItem
            onClick={() => setMenMobileOpen(!menMobileOpen)}
            sx={{
              borderRadius: "var(--radius-md)",
              mb: 1,
              py: 1.5,
              cursor: "pointer",
              "&:hover": { bgcolor: "var(--surface-hover)" },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: "var(--text-muted)" }}>
              <Checkroom />
            </ListItemIcon>
            <ListItemText
              primary="Men"
              primaryTypographyProps={{
                sx: { color: "var(--text)", fontSize: "1rem", fontWeight: 600 },
              }}
            />
            {menMobileOpen ? <ExpandLess sx={{ color: "var(--text-muted)" }} /> : <ExpandMore sx={{ color: "var(--text-muted)" }} />}
          </ListItem>
          <Collapse in={menMobileOpen}>
            <List disablePadding>
              {["Top", "Bottom", "Shoes", "Accessories"].map((item) => (
                <ListItem
                  key={item}
                  sx={{ pl: 7, py: 1, mb: 0.5, borderRadius: "var(--radius-md)", "&:hover": { bgcolor: "var(--surface-hover)" } }}
                  onClick={() => setMobileOpen(false)}
                >
                  <ListItemText
                    primary={item}
                    primaryTypographyProps={{
                      sx: { color: "var(--text-secondary)", fontSize: "0.95rem", fontWeight: 500 },
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Collapse>

          {/* SALE — Collapsible */}
          <ListItem
            onClick={() => setSaleMobileOpen(!saleMobileOpen)}
            sx={{
              borderRadius: "var(--radius-md)",
              mb: 1,
              py: 1.5,
              cursor: "pointer",
              "&:hover": { bgcolor: "var(--surface-hover)" },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: "var(--accent)" }}>
              <LocalOffer />
            </ListItemIcon>
            <ListItemText
              primary="Sale"
              primaryTypographyProps={{
                sx: { color: "var(--accent)", fontSize: "1rem", fontWeight: 700 },
              }}
            />
            {saleMobileOpen ? <ExpandLess sx={{ color: "var(--text-muted)" }} /> : <ExpandMore sx={{ color: "var(--text-muted)" }} />}
          </ListItem>
          <Collapse in={saleMobileOpen}>
            <List disablePadding>
              {["Winter up to 70% OFF", "Summer up to 70% OFF"].map((item) => (
                <ListItem
                  key={item}
                  sx={{ pl: 7, py: 1, mb: 0.5, borderRadius: "var(--radius-md)", "&:hover": { bgcolor: "var(--surface-hover)" } }}
                  onClick={() => setMobileOpen(false)}
                >
                  <ListItemText
                    primary={item}
                    primaryTypographyProps={{
                      sx: { color: "var(--text-secondary)", fontSize: "0.95rem", fontWeight: 500 },
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Collapse>

          {/* About */}
          <ListItem
            component={Link}
            href="/About"
            onClick={() => setMobileOpen(false)}
            sx={{
              borderRadius: "var(--radius-md)",
              mb: 1,
              py: 1.5,
              "&:hover": { bgcolor: "var(--surface-hover)" },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: "var(--text-muted)" }}>
              <Info />
            </ListItemIcon>
            <ListItemText
              primary="About"
              primaryTypographyProps={{
                sx: { color: "var(--text)", fontSize: "1rem", fontWeight: 600 },
              }}
            />
          </ListItem>

          {/* Dashboard */}
          {session?.data?.user && (
            <ListItem
              component={Link}
              href="/Dashboard"
              onClick={() => setMobileOpen(false)}
              sx={{
                borderRadius: "var(--radius-md)",
                mb: 1,
                py: 1.5,
                "&:hover": { bgcolor: "var(--surface-hover)" },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: "var(--primary)" }}>
                <Dashboard />
              </ListItemIcon>
              <ListItemText
                primary="Dashboard"
                primaryTypographyProps={{
                  sx: { color: "var(--primary-light)", fontSize: "1rem", fontWeight: 600 },
                }}
              />
            </ListItem>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default NavBar;