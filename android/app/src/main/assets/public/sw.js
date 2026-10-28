/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-afac4cd2'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "study-data.js",
    "revision": "ff1723f877ab6b1af62940edd84e0fed"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "49544dd18a52e4e14bc50b693f260819"
  }, {
    "url": "pwa-512x512.png",
    "revision": "d91cfa3216b307c8a9f4a613c53a947d"
  }, {
    "url": "pwa-192x192.png",
    "revision": "44ef1a6dfc8e54389d391711f907382c"
  }, {
    "url": "index.html",
    "revision": "3e39c486904d01b88a749d5c14441891"
  }, {
    "url": "icon.svg",
    "revision": "532aea442018d8893686401d66049ce0"
  }, {
    "url": "icon-maskable.svg",
    "revision": "1d766fd3b4c97b639d9a75d4123c938e"
  }, {
    "url": "favicon.ico",
    "revision": "6b7f63cc17a0a4983a736b3ebecb89ce"
  }, {
    "url": "apple-touch-icon.png",
    "revision": "5a7c3ff84c6cfb5620e28e17f55d5036"
  }, {
    "url": "assets/workbox-window.prod.es5-Bd17z0YL.js",
    "revision": null
  }, {
    "url": "assets/index-bR2Qviha.js",
    "revision": null
  }, {
    "url": "assets/index-bODHOhe2.css",
    "revision": null
  }, {
    "url": "apple-touch-icon.png",
    "revision": "5a7c3ff84c6cfb5620e28e17f55d5036"
  }, {
    "url": "favicon.ico",
    "revision": "6b7f63cc17a0a4983a736b3ebecb89ce"
  }, {
    "url": "icon.svg",
    "revision": "532aea442018d8893686401d66049ce0"
  }, {
    "url": "pwa-192x192.png",
    "revision": "44ef1a6dfc8e54389d391711f907382c"
  }, {
    "url": "pwa-512x512.png",
    "revision": "d91cfa3216b307c8a9f4a613c53a947d"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "49544dd18a52e4e14bc50b693f260819"
  }, {
    "url": "manifest.webmanifest",
    "revision": "41972a20bd5acd3520bd8fe877777efc"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));
  workbox.registerRoute(/^https:\/\/fonts\.googleapis\.com\/.*/i, new workbox.CacheFirst({
    "cacheName": "google-fonts-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 10,
      maxAgeSeconds: 31536000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');
  workbox.registerRoute(/^https:\/\/fonts\.gstatic\.com\/.*/i, new workbox.CacheFirst({
    "cacheName": "gstatic-fonts-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 10,
      maxAgeSeconds: 31536000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');

}));
