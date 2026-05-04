import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";

const NotFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        textAlign: "center",
        px: 3,
        animation: "fadeIn 0.6s ease forwards",
      }}
    >
      {/* 404 Number */}
      <Typography
        sx={{
          fontSize: "clamp(6rem, 15vw, 10rem)",
          fontWeight: 900,
          lineHeight: 1,
          letterSpacing: "-0.05em",
          background: "linear-gradient(135deg, var(--primary-light), var(--accent), var(--primary))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          backgroundSize: "200% 200%",
          animation: "gradientShift 4s ease infinite",
          mb: 1,
        }}
      >
        404
      </Typography>

      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          color: "var(--text)",
          mb: 1,
        }}
      >
        Page Not Found
      </Typography>

      <Typography
        sx={{
          color: "var(--text-muted)",
          maxWidth: 420,
          mb: 4,
          fontSize: "0.95rem",
          lineHeight: 1.6,
        }}
      >
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Let&apos;s get you back on track.
      </Typography>

      <Link href="/" style={{ textDecoration: "none" }}>
        <Button
          variant="contained"
          sx={{
            background: "linear-gradient(135deg, var(--primary), #8b5cf6)",
            color: "#fff",
            borderRadius: "var(--radius-md)",
            px: 4,
            py: 1.3,
            fontWeight: 600,
            textTransform: "none",
            fontSize: "0.95rem",
            boxShadow: "0 4px 16px var(--primary-glow)",
            transition: "all 0.25s ease",
            "&:hover": {
              background: "linear-gradient(135deg, var(--primary-hover), #9b6ff7)",
              transform: "translateY(-2px)",
              boxShadow: "0 8px 24px var(--primary-glow)",
            },
          }}
        >
          Go Home
        </Button>
      </Link>
    </Box>
  );
};

export default NotFound;
