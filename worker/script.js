!function(e){var t={};function r(s){if(t[s])return t[s].exports;var n=t[s]={i:s,l:!1,exports:{}};return e[s].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=t,r.d=function(e,t,s){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(r.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(s,n,function(t){return e[t]}.bind(null,n));return s},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t){(()=>{"use strict";var e={"./src/KVHandlers/filters/filter.ts":
/*!******************************************!*\
  !*** ./src/KVHandlers/filters/filter.ts ***!
  \******************************************/function(e,t,r){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=s(r(/*! ./hashmap */"./src/KVHandlers/filters/hashmap.ts")),o=(e,t)=>{const r=t.type,s=t.field,n=t.value,o=Object.keys(e)[0].split(".")[1],i=e[Object.keys(e)[0]];return"LIKE"!==r||o===s&&i.includes(n)};t.default=async(e,t)=>{let r=[];for(const s of t)r=[...r,...(await n.default(e)).filter(e=>e.filter(e=>o(e,s)).length>0)];return r}},"./src/KVHandlers/filters/hashmap.ts":
/*!*******************************************!*\
  !*** ./src/KVHandlers/filters/hashmap.ts ***!
  \*******************************************/(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});const s=r(/*! ../queries */"./src/KVHandlers/queries.ts"),n=e=>Object.keys(e)[0].split(".")[0],o=async e=>{const t=(await s.retrieveAllKeys(e)).keys,r=new Set;return t.forEach(({name:e})=>{r.add(e.split(".")[0])}),r.size};t.default=async e=>await(async(e,t)=>{const r=await o(t),s=[];for(let t=0;s.length<r;t++){const r=n(e[t]);s.find(e=>e[0].id===r)||s.push([{id:r},...e.filter(e=>n(e)===r)])}return s})(await s.retrieveAllRecords(e),e)},"./src/KVHandlers/queries.ts":
/*!***********************************!*\
  !*** ./src/KVHandlers/queries.ts ***!
  \***********************************/(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getSingleValue=t.retrieveAllRecords=t.deleteSingleRecord=t.storeMultipleWidgetRecords=t.storeMultiplePlainRecords=t.storeSinglePlainRecord=t.retrieveAllKeys=void 0;t.retrieveAllKeys=async e=>await e.list();t.storeSinglePlainRecord=async(e,t,r)=>await r.put(e,t);t.storeMultiplePlainRecords=async(e,r)=>{for(const s of r)for(const{key:r,value:n}in s)await t.storeSinglePlainRecord(r,n,e)};t.storeMultipleWidgetRecords=async(e,r)=>{console.log(e);for(const s of e)for(const e in s)await t.storeSinglePlainRecord(e,s[e],r)};t.deleteSingleRecord=async(e,t)=>await e.delete(t);t.retrieveAllRecords=async e=>await Promise.all((await t.retrieveAllKeys(e)).keys.map(async({name:r})=>({[r]:await t.getSingleValue(e,r)})));t.getSingleValue=async(e,t)=>await e.get(t)},"./src/KVHandlers/retrieveNamespace.ts":
/*!*********************************************!*\
  !*** ./src/KVHandlers/retrieveNamespace.ts ***!
  \*********************************************/(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=e=>"TEST_DATA"===e?TEST_DATA:"WIDGETS"===e?WIDGETS:ARTICLES},"./src/controllers/query.ts":
/*!**********************************!*\
  !*** ./src/controllers/query.ts ***!
  \**********************************/function(e,t,r){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.postQuery=void 0;const n=s(r(/*! ../KVHandlers/filters/filter */"./src/KVHandlers/filters/filter.ts")),o=s(r(/*! ../util/response */"./src/util/response.ts")),i=s(r(/*! ../util/readRequestBody */"./src/util/readRequestBody.ts")),l=s(r(/*! ../KVHandlers/retrieveNamespace */"./src/KVHandlers/retrieveNamespace.ts")),a=r(/*! ../KVHandlers/queries */"./src/KVHandlers/queries.ts"),c=s(r(/*! ../util/performanceLogger */"./src/util/performanceLogger.ts"));t.postQuery=e=>{let t;const r={elapsedTime:"",body:[]};return c.default(async()=>{const r=await i.default(e),s=l.default(r.namespace);t=r.conditions?await n.default(s,r.conditions):await a.retrieveAllRecords(s)},e=>{r.elapsedTime=e+" seconds",r.body=t}),o.default(r)}},"./src/controllers/widgets.ts":
/*!************************************!*\
  !*** ./src/controllers/widgets.ts ***!
  \************************************/function(e,t,r){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.postWidgets=void 0;const n=s(r(/*! ../util/response */"./src/util/response.ts")),o=s(r(/*! ../util/readRequestBody */"./src/util/readRequestBody.ts")),i=r(/*! ../KVHandlers/queries */"./src/KVHandlers/queries.ts");t.postWidgets=async e=>{const t=await o.default(e);for(const e of t)for(const t in e)Reflect.set(e,`${e.id}.${t}`,e[t]),Reflect.deleteProperty(e,t);return await i.storeMultipleWidgetRecords(t,WIDGETS),n.default("results")}},"./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/function(e,t,r){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=s(r(/*! ./router */"./src/router.ts"));addEventListener("fetch",e=>{e.respondWith(async function(e){return await n.default(e)}(e.request))})},"./src/router.ts":
/*!***********************!*\
  !*** ./src/router.ts ***!
  \***********************/(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});const s=r(/*! ./controllers/query */"./src/controllers/query.ts"),n=r(/*! ./controllers/widgets */"./src/controllers/widgets.ts");t.default=async e=>{const t=e.url.split("https://worker.alex722khazzam.workers.dev")[1],r=e.method;return"/query"===t&&"POST"===r?await s.postQuery(e):"/widgets"===t&&"POST"===r?await n.postWidgets(e):void 0}},"./src/util/performanceLogger.ts":
/*!***************************************!*\
  !*** ./src/util/performanceLogger.ts ***!
  \***************************************/(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=(e,t)=>{const r=(new Date).getTime();e();t((((new Date).getTime()-r)/1e3).toPrecision(5))}},"./src/util/readRequestBody.ts":
/*!*************************************!*\
  !*** ./src/util/readRequestBody.ts ***!
  \*************************************/(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=async e=>{const t=Object.fromEntries(e.headers)["content-type"];if(t){if("application/json"===t)return await e.json();if("text/html"===t)return await e.text()}}},"./src/util/response.ts":
/*!******************************!*\
  !*** ./src/util/response.ts ***!
  \******************************/(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=e=>new Response(JSON.stringify(e))}},t={};(function r(s){var n=t[s];if(void 0!==n)return n.exports;var o=t[s]={exports:{}};return e[s].call(o.exports,o,o.exports,r),o.exports})("./src/index.ts")})()}]);