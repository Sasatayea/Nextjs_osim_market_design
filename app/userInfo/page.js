"use client";

import { authClient } from "@/lib/auth-client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Avatar,
  Divider,
  Chip,
} from "@mui/material";
import { GitHub, Logout, CalendarMonth, Email } from "@mui/icons-material";
import { ProfileSkeleton } from "@/components/ui/LoadingSkeleton";

export default function Login() {
  const [session, setSession] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(false);

  const [user, setUser] = useState(null);

  const [dbUser, setDbUser] = useState(null);

  useEffect(() => {
    authClient.getSession().then((res) => {
      setSession(res);
      setLoading(false);
    });

    // const getData = async () => {
    //   try {
    //     const res = await fetch("http://localhost:3000/api/users", {
    //       cache: "no-store",
    //     });
    //     const data = await res.json();
    //     setUsers(data);
    //   } catch (err) {
    //     console.log(err);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // getData();
  }, []);

  useEffect(() => {
    const syncUser = async () => {
      if (!session?.data?.user) return;

      const user = session?.data?.user;
      try {
        await fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(session.data.user),
        });
      } catch (err) {
        console.log(err);
      }
    };

    syncUser();
  }, [session]);

  // 2) fetch user from DB باستخدام email
  useEffect(() => {
    const fetchUser = async () => {
      const email = session?.data?.user?.email;
      if (!email) return;
      setUserLoading(true);

      try {
        const res = await fetch(
          `/api/users?email=${encodeURIComponent(email)}`,
        );

        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
        setUserLoading(false);
      }
    };

    fetchUser();
  }, [session]);

  useEffect(() => {
    console.log("user :", user);
  }, [user]);

  const login = () => {
    authClient.signIn.social({
      provider: "github",
    });
  };

  const logout = async () => {
    await authClient.signOut();
    setSession(null);
  };

  if (loading) return <ProfileSkeleton />;

  if (!session?.data?.user) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          px: 2,
          backgroundColor: "var(--bg)",
          animation: "fadeIn 0.5s ease forwards",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            maxWidth: 400,
            width: "100%",
            p: 5,
            background: "var(--surface)",
            borderRadius: "var(--radius-xl)",
            border: "1px solid var(--border)",
            boxShadow: "var(--shadow-lg)",
          }}
        >
          <Box
            sx={{
              width: 72,
              height: 72,
              borderRadius: "var(--radius-lg)",
              background: "linear-gradient(135deg, var(--primary), #8b5cf6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 3,
              boxShadow: "0 8px 32px var(--primary-glow)",
            }}
          >
            <GitHub sx={{ fontSize: 36, color: "#fff" }} />
          </Box>

          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              mb: 1,
              color: "var(--text)",
            }}
          >
            Welcome Back
          </Typography>

          <Typography
            sx={{
              color: "var(--text-muted)",
              mb: 4,
              fontSize: "0.92rem",
            }}
          >
            Sign in with your GitHub account to continue
          </Typography>

          <Button
            variant="contained"
            fullWidth
            startIcon={<GitHub />}
            onClick={login}
            sx={{
              background: "linear-gradient(135deg, var(--primary), #8b5cf6)",
              color: "#fff",
              borderRadius: "var(--radius-md)",
              py: 1.5,
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
            Login with GitHub
          </Button>
        </Box>
      </Box>
    );
  }

  if (userLoading || !user) {
    return <ProfileSkeleton />;
  }

  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "100vh",
        px: 2,
        py: 6,
        backgroundColor: "var(--bg)",
        animation: "fadeIn 0.5s ease forwards",
      }}
    >
      {!session?.data?.user ? (
        <button onClick={login}>Login with GitHub</button>
      ) : (
        <Box
          sx={{
            maxWidth: 480,
            width: "100%",
            background: "var(--surface)",
            borderRadius: "var(--radius-xl)",
            border: "1px solid var(--border)",
            overflow: "hidden",
          }}
        >
          {/* Profile Header Gradient */}
          <Box
            sx={{
              height: 120,
              background: "linear-gradient(135deg, var(--primary), #8b5cf6, var(--accent))",
              backgroundSize: "200% 200%",
              animation: "gradientShift 6s ease infinite",
              position: "relative",
            }}
          />

          {/* Avatar */}
          <Box sx={{ textAlign: "center", mt: -6, px: 3 }}>
            <Avatar
              src={user.image}
              alt={user.name}
              sx={{
                width: 96,
                height: 96,
                mx: "auto",
                border: "4px solid var(--surface)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                fontSize: "2rem",
              }}
            />

            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                mt: 2,
                color: "var(--text)",
              }}
            >
              {user.name}
            </Typography>

            <Chip
              label="GitHub Account"
              icon={<GitHub sx={{ fontSize: 14 }} />}
              size="small"
              sx={{
                mt: 1,
                bgcolor: "var(--surface-hover)",
                color: "var(--text-muted)",
                border: "1px solid var(--border)",
                fontSize: "0.75rem",
                "& .MuiChip-icon": {
                  color: "var(--text-muted)",
                },
              }}
            />
          </Box>

          <Divider sx={{ borderColor: "var(--border)", my: 3, mx: 3 }} />

          {/* Info Section */}
          <Box sx={{ px: 3, pb: 4 }}>
            {/* Email */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                mb: 2,
                p: 2,
                borderRadius: "var(--radius-md)",
                background: "var(--bg)",
                border: "1px solid var(--border)",
              }}
            >
              <Email sx={{ color: "var(--primary-light)", fontSize: 20 }} />
              <Box>
                <Typography
                  sx={{
                    fontSize: "0.72rem",
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    fontWeight: 600,
                  }}
                >
                  Email
                </Typography>
                <Typography
                  sx={{
                    color: "var(--text-secondary)",
                    fontSize: "0.88rem",
                  }}
                >
                  {user.email}
                </Typography>
              </Box>
            </Box>

            {/* Member Since */}
            {memberSince && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  mb: 3,
                  p: 2,
                  borderRadius: "var(--radius-md)",
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                }}
              >
                <CalendarMonth
                  sx={{ color: "var(--primary-light)", fontSize: 20 }}
                />
                <Box>
                  <Typography
                    sx={{
                      fontSize: "0.72rem",
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      fontWeight: 600,
                    }}
                  >
                    Member Since
                  </Typography>
                  <Typography
                    sx={{
                      color: "var(--text-secondary)",
                      fontSize: "0.88rem",
                    }}
                  >
                    {memberSince}
                  </Typography>
                </Box>
              </Box>
            )}

            {/* Logout Button */}
            <Button
              variant="outlined"
              fullWidth
              startIcon={<Logout />}
              onClick={logout}
              sx={{
                borderColor: "rgba(231, 76, 60, 0.3)",
                color: "var(--error)",
                borderRadius: "var(--radius-md)",
                py: 1.2,
                fontWeight: 600,
                textTransform: "none",
                fontSize: "0.9rem",
                transition: "all 0.25s ease",
                "&:hover": {
                  borderColor: "var(--error)",
                  backgroundColor: "rgba(231, 76, 60, 0.08)",
                },
              }}
            >
              Logout
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
