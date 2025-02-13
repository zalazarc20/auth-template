import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { createData, getDataById } from "../services/simpleCrud";

// Verificar que las variables de entorno estén configuradas
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.error("Error: Variables de entorno no configuradas.");
  process.exit(1); // Terminar la ejecución
}

const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;


passport.use(
  new GoogleStrategy(
    {
      clientID,
      clientSecret,
      callbackURL: "http://localhost:3000/auth/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      console.log({request, accessToken,refreshToken, profile})

      if(!profile["emails"] || !profile["name"] || !profile["photos"]){
        console.log('Error, no se cargo el email')
        return;
      }
       
      // verifico si ya existe en mi db...
      const exist = await getDataById('user', null, profile["emails"][0].value)

      if(!exist) {
        // si no existe lo creo...
        await createData('user', {
          email: profile["emails"][0].value,
          fullName: profile["displayName"] || "Usuario sin nombre",
          // username: profile["name"]["givenName"].toLowerCase()+'_'+profile["name"]["familyName"].toLowerCase(),
          photo: profile["photos"][0].value,
          googleId: profile.id
        })
      }

      // traigo al user desde db y lo paso a done()
      const user = await getDataById('user', null, profile["emails"][0].value)
      return done(null, user);
          
      // return done(null, profile);
    })
);

// Serializar y deserializar usuarios
passport.serializeUser((user: any, done) => {
  done(null, user.email);
});

passport.deserializeUser(async (email: string, done) => {
  try {
    // Recupera el usuario desde la base de datos usando el email
    const user = await getDataById('user', null, email);
    done(null, user);
  } catch (err) {
    done(err);
  }
});