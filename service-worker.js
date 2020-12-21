//console.log('Hello from service-worker.js');

importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js');

workbox.setConfig({
    debug: false
  });
  

if (workbox){
    //console.log("Houra");

    /** Pre-cache */
    workbox.precaching.precacheAndRoute([
        // { url: '/*', revision: 'toutencache' },
        { url: '/index.html', revision: 'index1234' },
        { url: '/assets/css/style.min.css', revision: 'stylemin1234' },
        { url: '/assets/css/normalize.min.css', revision: 'normalize1234' },
        { url: '/assets/js/app.min.js', revision: 'appminjs1234' },
        // ... autres entrées...
      ]);
      

    workbox.routing.registerRoute(
        /\.(?:html|css|js)$/,
        new workbox.strategies.StaleWhileRevalidate({
            "cacheName" : "assets",
            plugins:[
                new workbox.expiration.ExpirationPlugin({
                    maxEntries: 1000,
                    maxAgeSeconds:1800
                })
            ]
    
        })
      );
     
      workbox.routing.registerRoute(
        /\.(?:png|jpg|webp|gif)$/,
        new workbox.strategies.CacheFirst({
            "cacheName" : "images",
            plugins:[
                new workbox.expiration.ExpirationPlugin({
                    maxEntries: 1000,
                    maxAgeSeconds:1800
                })
            ]
    
        })
      );


}else{
    console.log("Cela n'a pas fonctionné");
}



