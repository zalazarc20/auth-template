# Pasos para poder empezar a usar el template.

**⚠️ Nota importante:** Este template utiliza **MySQL** como base de datos por defecto.  
Si deseas usar otra base de datos, consulta la documentación de [Prisma ORM](https://www.prisma.io/docs/getting-started/quickstart-sqlite) para realizar la configuración adecuada.  



## Pasos para configurar el proyecto  

1. **Configurar la conexión a la base de datos**  
   - Abre el archivo `.env.example`.  
   - Modifica la variable `DATABASE_URL` con los datos de tu base de datos. Si usas MySQL, el formato es el siguiente:  

     ```env
     DATABASE_URL="mysql://usuario:contraseña@localhost:3306/nombre_de_tu_base"
     ```

   - Si usas otro motor de base de datos, ajusta la URL según la documentación de Prisma.  

2. **Renombrar el archivo de configuración**  
   - Cambia el nombre del archivo `.env.example` a `.env`.  

3. **Ejecutar la primera migración**  
   - Abre una terminal en la raíz del proyecto y ejecuta el siguiente comando para aplicar la primera migración y crear las tablas definidas en `schema.prisma`:  

     ```sh
     npx prisma migrate dev --name init
     ```

¡Listo! Ahora tu base de datos está configurada y lista para usarse. 🚀 