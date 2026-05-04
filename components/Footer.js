"use client";
import { Box, Container, Typography, IconButton } from "@mui/material";
import { Facebook, Instagram, Twitter, GitHub } from "@mui/icons-material";
import Link from "next/link";

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "var(--bg-alt)",
        color: "var(--text)",
        borderTop: "1px solid var(--border)",
        mt: "auto",
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        {/* Top Section */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "2fr 1fr 1fr 1fr",
            },
            gap: 4,
          }}
        >
          {/* Brand */}
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                mb: 1.5,
                background: "linear-gradient(135deg, #fff, var(--primary-light))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "-0.02em",
              }}
            >
              OSIM
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "var(--text-muted)",
                maxWidth: 280,
                lineHeight: 1.7,
                fontSize: "0.85rem",
              }}
            >
              Your best destination for high-quality products at the best
              prices. Premium fashion for the modern man.
            </Typography>
          </Box>

            <Box>
              <Typography
                sx={{
                  fontWeight: 700,
                  mb: 2.5,
                  color: "var(--text)",
                  fontSize: "0.95rem",
                  letterSpacing: "0.02em",
                }}
              >
                Quick Links
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {[
                  { label: "Home", href: "/" },
                  { label: "About", href: "/About" },
                  { label: "Cart", href: "/cart2" },
                ].map((link) => (
                  <Link key={link.label} href={link.href} style={{ textDecoration: "none" }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "var(--text-muted)",
                        fontSize: "0.9rem",
                        transition: "all 0.2s ease",
                        "&:hover": { color: "var(--primary-light)", transform: "translateX(4px)" },
                      }}
                    >
                      {link.label}
                    </Typography>
                  </Link>
                ))}
              </Box>
            </Box>
  
            {/* Contact */}
            <Box>
              <Typography
                sx={{
                  fontWeight: 700,
                  mb: 2.5,
                  color: "var(--text)",
                  fontSize: "0.95rem",
                  letterSpacing: "0.02em",
                }}
              >
                Contact Us
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "var(--text-muted)",
                    fontSize: "0.9rem",
                  }}
                >
                  info@osim-market.com
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "var(--text-muted)",
                    fontSize: "0.9rem",
                  }}
                >
                  +20 100 000 0000
                </Typography>
              </Box>
            </Box>
  
            {/* Social */}
            <Box>
              <Typography
                sx={{
                  fontWeight: 700,
                  mb: 2.5,
                  color: "var(--text)",
                  fontSize: "0.95rem",
                  letterSpacing: "0.02em",
                }}
              >
                Follow Us
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                {[
                  { Icon: Facebook, label: "Facebook" },
                  { Icon: Instagram, label: "Instagram" },
                  { Icon: Twitter, label: "Twitter" },
                  { Icon: GitHub, label: "GitHub" },
                ].map(({ Icon, label }) => (
                  <IconButton
                    key={label}
                    aria-label={label}
                    sx={{
                      color: "var(--text-muted)",
                      width: 40,
                      height: 40,
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius-full)",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        color: "#fff",
                        borderColor: "var(--primary)",
                        backgroundColor: "rgba(108, 92, 231, 0.15)",
                        transform: "translateY(-3px)",
                        boxShadow: "0 4px 12px var(--primary-glow)",
                      },
                    }}
                  >
                    <Icon sx={{ fontSize: 18 }} />
                  </IconButton>
                ))}
              </Box>
            </Box>
        </Box>

        {/* Bottom Section */}
        <Box
          sx={{
            textAlign: "center",
            borderTop: "1px solid var(--border)",
            mt: 5,
            pt: 3,
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: "var(--text-muted)", fontSize: "0.8rem" }}
          >
            © {new Date().getFullYear()} OSIM Store. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}