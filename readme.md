
# Proyecto Final React Native - Mercado Esclavo

Pequeña aplicación ecommerce como proyecto final del curso de React Native de CoderHouse, que cuenta con todo lo visto en clase, así como el alcance solicitado y las funcionalidades requeridas.



## Features

- Creación de cuenta
- Inicio de sesión
- Listado de categorías
- Listado de productos por categoría
- Búsqueda y filtrado de productos por categoría
- Detalle de producto
- Armado de carrito de compras (inclusión de productos)
- Administración de carrito de compras (detalles, eliminar producto, realizar compra)
- Listado de órdenes realizadas (detalle de productos)
- Utilización de cámara para imagen de perfil de usuario


## Dependencies

- react-navigation
- reduxjs
- expo
- expo-status-bar
- react-native-elements
- react-native
- react-native-toast-notifications
- react-native-vector-icons
- react-native-web
- react-redux
- yup
- expo-image-picker
- expo-sqlite


## Extra components

Componentes incluídos para mejorar la aplicación:
- Carousel
Para el despliegue de las imágenes del detalle del producto, se utilizaron 3 componentes: Slider, SliderItem y Pagination.
Código extraído de: https://github.com/Basir-PD/React-Native-Carousel
Tutorial: https://www.youtube.com/watch?v=2TgArwz6je8&t=148s&ab_channel=BasirPayenda

- Loaders
Para visualizar las instancias de carga en las diferentes páginas. Se utilizó el componente nativo de React Native ActivityIndicator

- Alert
Para ventanas emergentes con información para el usuario. Se utilizó el componente nativo de React Native Alert

- Toast Notification
Para mensajes popup con información para el usuario. Se utilizó el componente externo react-native-toast-notifications
URL: https://www.npmjs.com/package/react-native-toast-notifications

- Badge
Indicadores visuales para el contador de productos en el carrito y para la imagen de usuario en la barra de navegación.
URL: https://reactnativeelements.com/docs/1.2.0/badge