import { Router, Request, Response, NextFunction } from "express";
import passport from "passport";

const router = Router()

router.get('/', (_req, res) => {
    res.send('Hola soy el login!')
})

// inicio de sesion con google
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
  
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/" }), (_req: Request, res: Response) => {
      res.redirect("/dashboard"); // Redirigir después del inicio de sesión
    }
);

// esto es para cerrar sesion
router.post("/logout", (req: Request, res: Response, next: NextFunction) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.send("Sesión cerrada");
    });
  });

export default router