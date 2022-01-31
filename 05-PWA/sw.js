/*
    + Colocar todas la rutas de los archivos que utilizar nuestra aplicacion
    + Colocar las rutas completas, con extension de archivos.
*/
const CACHE_ELEMENTS = [
    "./",
    "https://unpkg.com/react@17/umd/react.production.min.js",
    "https://unpkg.com/react-dom@17/umd/react-dom.production.min.js",
    "https://unpkg.com/@babel/standalone/babel.min.js",
    "css/style.css",
    "components/Contador.js",
    "js/Register.js"
]

/*
    Nombre de cache, regularmente se utilizar vnumero_de_version_nombre_de_cache
*/
const CACHE_NAME = "v1_cache_contador_react";

/*
    Utilizar self, para que este escuchando el evento "install"
*/
self.addEventListener("install", (e)=> {
    // Espera a que el caches se ejecute
    e.waitUntil(
        //Utilizar la funcion open para pasar el nombre de cache
        caches.open(CACHE_NAME).then(cache => { 
            //Retorna un objeto cache, al cual le vamos agregar los elementos de nuestra cache
            cache.addAll(CACHE_ELEMENTS).then( () => {
                //Busca una nueva version de cache, para tener el serviceWorke actualizado
                self.skipWaiting() 
            }).catch(console.log)
        })
    )
});

/*
    Utilizar self, para que este escuchando el evento "active"
*/
self.addEventListener("activate",(e)=>{
    //Array con todo lo que contienen el cache 
    const cacheWhitelist = [CACHE_NAME];

    e.waitUntil(
        //Funcio para iterar entre los caches que estemos utilizando
        caches.keys().then((cacheNames) => {
            //Si retorna -1 es cache de una version anterior y se debe de eliminar
            return Promise.all(cacheNames.map(cacheName =>{
                //Utilizar && para retornar un solo valor en la operacion terminaria. 
                cacheWhitelist.indexOf(cacheName) === -1 && caches.delete(cacheName);
            }));
        }).then(()=> self.clients.claim())
    );
});

/*
    Utilizar self, para que este escuchando el evento "fetch"
*/
self.addEventListener("fetch",(e)=>{
    //Responder cuando se haga match el request
    e.respondWith(()=>{
        caches.match(e.request).then((res)=>{
            //Si existe la repuesta en cache que la retorne
            if(res){
                return res;
            }
            //Si no existe la repuesta en cache, que la agregue al cache
            return fetch(e.request);
        });
    })
});
