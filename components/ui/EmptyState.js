"use client";

import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";

export default function EmptyState({
  icon = "📭",
  title = "Nothing here yet",
  description = "",
  actionLabel = "",
  actionHref = "/",
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 10,
        px: 3,
        textAlign: "center",
        animation: "fadeIn 0.5s ease forwards",
      }}
    >
      <Box
        sx={{
          fontSize: "4rem",
          mb: 3,
          animation: "float 3s ease-in-out infinite",
        }}
      >
        {icon}
      </Box>

      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          color: "var(--text)",
          mb: 1,
        }}
      >
        {title}
      </Typography>

      {description && (
        <Typography
          sx={{
            color: "var(--text-muted)",
            maxWidth: 400,
            mb: 3,
            fontSize: "0.95rem",
          }}
        >
          {description}
        </Typography>
      )}

      {actionLabel && (
        <Link href={actionHref}>
          <Button
            variant="contained"
            sx={{
              background: "linear-gradient(135deg, var(--primary), #8b5cf6)",
              color: "#fff",
              fontWeight: 600,
              borderRadius: "var(--radius-md)",
              px: 4,
              py: 1.2,
              textTransform: "none",
              boxShadow: "0 4px 16px var(--primary-glow)",
              "&:hover": {
                background: "linear-gradient(135deg, var(--primary-hover), #9b6ff7)",
                transform: "translateY(-2px)",
                boxShadow: "0 8px 24px var(--primary-glow)",
              },
              transition: "all 0.25s ease",
            }}
          >
            {actionLabel}
          </Button>
        </Link>
      )}
    </Box>
  );
}
