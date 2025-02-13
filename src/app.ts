import express, { Request, Response } from "express";
import passport from "passport";
import session from "express-session";
// rutas
import authRoutes from "./routes/auth.routes";
// tipos y utils
import { UserData } from "./types";
import './utils/passport'

const app = express();
const port = process.env.PORT || 3000;

// Configurar express-session
app.use(
  session({
    secret: "mi-secreto-super-seguro",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Cambiar a true si usas HTTPS
  })
);

// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json()); // Middleware que transforma req.body a JSON

// Rutas
app.use("/auth", authRoutes);

app.get("/dashboard", (req: Request, res: Response) => {
  if (req.isAuthenticated() && req.user) {
    const user = req.user as UserData; // TypeScript ayuda a inferir el tipo
    console.log(user)
    res.send(`Bienvenido ${user.fullName || "Usuario"} <img src="${user.photo}" />`);
  } else {
    res.status(401).send("No autorizado");
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});