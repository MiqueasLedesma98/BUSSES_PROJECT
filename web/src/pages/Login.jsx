import {
  Typography,
  Box,
  Stack,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { Formik, Form } from "formik";
import LoginImg from "../assets/img-login.png";
import LogoImg from "../assets/veotrans-logo.png";
import { useAuthContext } from "../hooks";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Login() {
  const { login } = useAuthContext();

  const [visible, setVisible] = useState(false);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "45% 1fr",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={LogoImg} alt="Logo-veoTrans" style={{ width: "200px" }} />
        <Stack width={"400px"} padding={4}>
          <Typography
            textAlign={"center"}
            fontSize={32}
            fontWeight={600}
            color="#151D48"
          >
            Inicia Sesión
          </Typography>

          <Formik initialValues={{ email: "", password: "" }} onSubmit={login}>
            {({ values, handleChange, handleSubmit }) => (
              <Form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: "2em" }}
              >
                <Stack>
                  <Typography fontSize={14} fontWeight={400} color="#4B4B4B">
                    Email
                  </Typography>
                  <TextField
                    placeholder="Ingresa tu email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                  />
                </Stack>
                <Stack>
                  <Typography fontSize={14} fontWeight={400} color="#4B4B4B">
                    Contraseña
                  </Typography>
                  <TextField
                    type={visible ? "text" : "password"}
                    placeholder="********"
                    name="password"
                    value={values.password}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <IconButton
                            sx={{ ml: 2 }}
                            onClick={() => setVisible(!visible)}
                          >
                            {visible ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        ),
                      },
                    }}
                    onChange={handleChange}
                  />
                </Stack>
                <Button variant="contained" type="submit">
                  Iniciar Sesión
                </Button>
              </Form>
            )}
          </Formik>
        </Stack>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          backgroundImage: `url("${LoginImg}")`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></Box>
    </Box>
  );
}
