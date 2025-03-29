import { Typography, Box, Stack, TextField, Button } from "@mui/material";
import { Formik, Form } from "formik";
import LoginImg from "../assets/img-login.png";
import LogoImg from "../assets/veotrans-logo.png";
import { useAuthContext } from "../hooks";

export default function Login() {
  const { login } = useAuthContext();

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

          {/* Envolver todo dentro de Formik */}
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
                    placeholder="********"
                    type="password"
                    name="password"
                    value={values.password}
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
