# Proyecto 1 - Aplicación de Geolocalización
By: Anderson Grajales - agrajal7@eafit.edu.co
2019-1
## Descripción
Esta aplicación permite a sus usuarios llevar un registro de todas aquellos lugares que han visitado. Además, el usuario tiene la posibilidad de visualizarlos en un mapa que es cargado una vez el usuario está registrado.

# 1. Análisis y Diseño

## 1.1 Requisitos Funcionales
  * La aplicación debe permitir el incio de sesión de un usuario previamente registrado.
  * La aplicación debe permitir a las personas crear una cuenta teniendo su nombre, e-mail y contraseña.  
  * La aplicación debe permitir a sus usuarios registrar las ubicaciones que quieran recordar.
  * La aplicación debe mostrar a sus usuarios todas los lugares que han escogido como sus favoritos.

## 1.2 Requisitos No Funcionales
  * La aplicación no debe permitir a un usuario acceder al perfil de otro usuario.
### 1.2.2 La aplicación no debe permitir a un usuario revisar las rutas si no se ha entrado en el sistema previamente.
### 1.2.3 La aplicación debe estar disponible todo el tiempo para un usuario.
### 1.2.4 La aplicación debe admitir almenos x usuarios activos.
### 1.2.5 En el momento de cerrar sesión la aplicación no debe permitir a un usuario ingresar nuevamente ha su perfil, a menos de que vuelva a iniciar sesión.

## 1.3 Modelo de Datos

### 1.3.1 Un usuario dentro de la aplicación está identificado con los siguientes atributos:

  User: {
    fullName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
    hashPassword: {
      type: String,
      required: true
    }
  }

### 1.3.1 Una ubicación dentro de la aplicación está identifacada con los siguientes atributos:
  Location: {
    logitude: {
      type: Number,
      required: true
    },
    latitude: {
      type: Number,
      required: true
    },
    user: {
      type: String,
      required: true,
      default_value: (Current logged in user)
    },
    date: {
      type: String,
      required: true,
      default_value: (Current Date with Current Hour)
    }
  }
# 2. Tecnología Usada
