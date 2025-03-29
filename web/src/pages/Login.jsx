import {
  Typography,
  Box,
  Stack,
  Input,
  Button,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import LoginImg from "../assets/img-login.png";
import LogoImg from "../assets/veotrans-logo.png";
export default function Login() {
  const { setFieldValue, values } = useFormik({
    initialValues: { email: "", password: "" },
  });
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard/content");
  };
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
          <form
            style={{ display: "flex", flexDirection: "column", gap: "2em" }}
            onSubmit={handleSubmit}
          >
            <Stack>
              <Typography fontSize={14} fontWeight={400} color="#4B4B4B">
                Email
              </Typography>
              <TextField
                placeholder="Ingresa tu email"
                value={values.email}
                onChange={({ target }) => setFieldValue("email", target.value)}
              />
            </Stack>
            <Stack>
              <Typography fontSize={14} fontWeight={400} color="#4B4B4B">
                Contraseña
              </Typography>
              <TextField
                placeholder="********"
                type="password"
                value={values.password}
                onChange={({ target }) =>
                  setFieldValue("password", target.value)
                }
              />
            </Stack>
            <Button variant="contained" type="submit">
              {" "}
              Iniciar Sesión
            </Button>
          </form>
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
