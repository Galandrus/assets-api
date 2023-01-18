<h1 align="center"> <strong> Assets API </strong> </h1>

# Description

This API was created as a backend developer challenge for the company Flixxo.
It consists of an information manager of digital assets such as cryptocurrency or tokens

# Set up

## Dependencies

-   [Node.js v18](https://nodejs.org/en/download/)
-   [npm](http://npmjs.com)
-   [Docker](https://www.docker.com/)
-   [Docker-compose](https://docs.docker.com/compose/)
-   [Git](https://git-scm.com)

## Download

To download this repository, run from your command line:

```bash
# Clone this repository
# throght  http
$ git clone https://github.com/Galandrus/flixxo-challenge
# throght ssh
$ git clone git@github.com:Galandrus/flixxo-challenge.git

# Go into the repository
$ cd flixxo-challenge
```

# Initialization

To initialize the project you must install the dependencies first. Run the following command:

```bash
npm install
```

# Enviroment variables

Before starting the server you need to set the environment variables in the file `./.env`.

For this challenge, and so you can try this API, all the environment variables are stated in the file `./.example.env`

# Start server

To start the server with the database, you can run the following command:

```bash
npm run dev:compose
```

if you only want to start the server, you can run the following command:

```bash
npm start
```

# Test

To execute the test run the following command

```bash
npm run test
```

# Documentation

The documentation is in the following link

> [Documentation](https://assets-api.up.railway.app/docs)

# Development Environment

This API is hosted in the cloud. You can access the site with the following link

> [Assets API](https://assets-api.up.railway.app/health)

# Maintainer

This repository was created by Martín Andrés Galán.

Any doubt or problems you can send an email to 96martingalan@gmail.com

---

---

---

# Preguntas

## ¿Qué es SQL Injection y cómo puede evitarse?

SQL Injection es una técnica de hacking que introduce código malicioso en una consulta SQL. Con el fin de manipular la base de datos, accediendo a ella de forma no autorizada, con el objetivo de robar información, modificar o borrar registros, entre otras cosas.
Existen varias formas de evitar que esto suceda:

-   Utilizar sistema que detecten este tipo de ataques, por ejemplo se puede utilizar el servicio WAF de AWS.
-   Limitar permisos de lectura/escritura a los estrictamente necesarios.
-   Utilizar consultas parametrizadas, es decir, separar los datos de la consulta con la lógica de la consulta SQL, de esta forma los datos de la consulta no son interpretados como parte la misma.
-   Testear continuamente la aplicación y la base de datos para encontrar vulnerabilidades
-   Validar los datos de entrada del usuario cuando se realiza una consulta.
-   Utilizar distintos patrones para abstraer la lógica de datos con la lógica de la aplicación. De esta forma, el usuario no tiene una conexión directa con la base de datos.

---

## ¿Cuándo es conveniente utilizar SQL Transactions? Dar un ejemplo.

Es conveniente utilizar transactions cuando se requieren hacer varias consultas SQL como si de una sola se tratara y de esta forma asegurarse que no falle ninguna. En caso de fallar alguna, hacer un rollback y dejar la base de datos como estaba.
Un ejemplo lo podemos encontrar en este challenge. Se puede usar una transaction para cuando se ingresa un nuevo valor de un token. Este se tiene que ver reflejado tanto en el historial como en el token en si. Si alguno de los dos falla, no se debería poder actualizar el valor del token.

---

## Describí brevemente las ventajas del patrón controller/service/repository

Este patrón permite separar la lógica de la aplicación en capas, lo que facilita la mantenibilidad y escalabilidad del código.
Al estar separadas las capas, son independientes unas con otros, lo que facilita la testeablidad de las mismas. También esta independencia permite poder cambiar, por ejemplo, el almacenamiento de datos sin afectar la lógica de negocio.

---

## ¿Cuál es la mejor forma de guardar un campo de tipo enum en la DB?

Depende para que se utilice ese campo y como se va a relacionar con los otros datos. Se puede utilizar el tipo ENUM de SQL o una tabla en donde cada valor del enum tiene un id asociado.
El tipo de dato ENUM válida automáticamente los datos ingresados, asegura que solo se ingresen valores permitidos y facilita la lectura de las consultas SQL, sin embargo, para agregar o modificar un campo requiere más trabajo, es difícil de escalar si se tienen muchos valores en el enum y es menos flexible a la hora de asociar información adicional a cada valor del enum.
Por otro lado, si se utiliza un identificador para cada valor del enum, es posible escalar más fácilmente, asimismo como agregar, modificar o borrar cualquier valor del enum. También simplifica a la hora de asociar información adicional a cada valor del enum. En su contraparte, no tiene una validación automática en la base de datos, se requiere más trabajo a la hora de mantener la integridad de los datos y las consultas SQL pueden llegar a ser más difíciles de entender

---

## Usando async/await: ¿cómo se puede aprovechar el paralelismo?

Una forma de aprovechar el paralelismo es utilizando la función `Promise.all()`, la misma recibe un arreglo de promesas y devuelve una nueva promesa que se resuelve con un arreglo de resultados de las promesas proporcionadas, en caso de que falle alguna, la promesa del `Promise.all()` falla. Esto permite que se puedan resolver las promesas del arreglo paralelamente. Luego haciendo uso del `await` podemos esperar a que se terminen de resolver todas las promesas y obtener el arreglo con resultados.
Un uso común de esto, es cuando se requiere obtener data de distintas APIs, con el `Promise.all()` se hacen todas las requests paralelamente y luego con el `await` se esperan las respuestas.

```js
try {
    const promise1 = fetch('https://api.example.com/data1');
    const promise2 = fetch('https://api.example.com/data2');
    const promise3 = fetch('https://api.example.com/data3');

    const [response1, response2, response3] = await Promise.all([promise1, promise2, promise3]);
    // procesar las respuestas
} catch (error) {
    // manejar el error
}
```
