![Express Logo](./directories/ExpressJS.png)

# Scaffolding de servidor Express

Repositorio con un Scaffolding para desplegar un servidor con **Express** para el desarrollo de proyectos en los diferentes **STACK** que se usan hoy en día, ya sean: 

- **MERN**: MongoDB, **Express**, React, NodeJS
- **MEAN**: MongoDB, **Express**, Angular, NodeJS
- **MEVN**: MongoDB, **Express**, Vue, NodeJS


## Todo:

### General:

1. Implementar las sugerencias de la documentación oficial de Express
    - [ ] 1.1 [Mejores prácticas de producción: seguridad](http://expressjs.com/es/advanced/best-practice-security.html)
    - [ ] 1.2 [Mejores prácticas de producción: rendimiento y fiabilidad](http://expressjs.com/es/advanced/best-practice-performance.html)

### Mejores prácticas de producción: seguridad.

- [ ] 1. No utilizar versiones en desuso o vulnerables de Express
- [ ] 2. Utilizar TLS
- [x] 3. Utilizar Helmet
- [x] 4. Utilizar cookies de forma segura
- [ ] 5. Asegurarse de que las dependencias sean seguras

### Mejores prácticas de producción: rendimiento y fiabilidad.

#### **Cosas que hacer en el código**

Estas son algunas de las cosas que puede hacer en el código para mejorar el rendimiento de la aplicación:

- [x] 1. Utilizar la compresión de gzip
- [ ] 2. No utilizar funciones síncronas
- [x] 3. Utilizar el middleware para el servicio de archivos estáticos
- [x] 4. Realizar un registro correcto
- [ ] 5. Manejar las excepciones correctamente

#### **Cosas que hacer en el entorno / configuración**

Estas son algunas de las cosas que puede hacer en el entorno del sistema para mejorar el rendimiento de la aplicación:

- [ ] 1. Establecer NODE_ENV en “production”
- [ ] 2. Asegurarse de que la aplicación se reinicia automáticamente
- [ ] 3. Ejecutar la aplicación en un clúster
- [ ] 4. Almacenar en la caché los resultados de la solicitud
- [ ] 5. Utilizar un equilibrador de carga
- [ ] 6. Utilizar un proxy inverso