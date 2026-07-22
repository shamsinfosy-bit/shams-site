var Id=Object.defineProperty;var Ad=(n,t,e)=>t in n?Id(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var _=(n,t,e)=>Ad(n,typeof t!="symbol"?t+"":t,e);const Rd=()=>{};var kc={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kh=function(n){const t=[];let e=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?t[e++]=s:s<2048?(t[e++]=s>>6|192,t[e++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),t[e++]=s>>18|240,t[e++]=s>>12&63|128,t[e++]=s>>6&63|128,t[e++]=s&63|128):(t[e++]=s>>12|224,t[e++]=s>>6&63|128,t[e++]=s&63|128)}return t},vd=function(n){const t=[];let e=0,r=0;for(;e<n.length;){const s=n[e++];if(s<128)t[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[e++];t[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[e++],o=n[e++],u=n[e++],c=((s&7)<<18|(i&63)<<12|(o&63)<<6|u&63)-65536;t[r++]=String.fromCharCode(55296+(c>>10)),t[r++]=String.fromCharCode(56320+(c&1023))}else{const i=n[e++],o=n[e++];t[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return t.join("")},Dh={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,t){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const e=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],o=s+1<n.length,u=o?n[s+1]:0,c=s+2<n.length,h=c?n[s+2]:0,p=i>>2,m=(i&3)<<4|u>>4;let y=(u&15)<<2|h>>6,C=h&63;c||(C=64,o||(y=64)),r.push(e[p],e[m],e[y],e[C])}return r.join("")},encodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(n):this.encodeByteArray(kh(n),t)},decodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(n):vd(this.decodeStringToByteArray(n,t))},decodeStringToByteArray(n,t){this.init_();const e=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=e[n.charAt(s++)],u=s<n.length?e[n.charAt(s)]:0;++s;const h=s<n.length?e[n.charAt(s)]:64;++s;const m=s<n.length?e[n.charAt(s)]:64;if(++s,i==null||u==null||h==null||m==null)throw new Cd;const y=i<<2|u>>4;if(r.push(y),h!==64){const C=u<<4&240|h>>2;if(r.push(C),m!==64){const P=h<<6&192|m;r.push(P)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Cd extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Sd=function(n){const t=kh(n);return Dh.encodeByteArray(t,!0)},Qi=function(n){return Sd(n).replace(/\./g,"")},Vh=function(n){try{return Dh.decodeString(n,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pd(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bd=()=>Pd().__FIREBASE_DEFAULTS__,Nd=()=>{if(typeof process>"u"||typeof kc>"u")return;const n=kc.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Od=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=n&&Vh(n[1]);return t&&JSON.parse(t)},Ro=()=>{try{return Rd()||bd()||Nd()||Od()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},xh=n=>{var t,e;return(e=(t=Ro())==null?void 0:t.emulatorHosts)==null?void 0:e[n]},Lh=n=>{const t=xh(n);if(!t)return;const e=t.lastIndexOf(":");if(e<=0||e+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const r=parseInt(t.substring(e+1),10);return t[0]==="["?[t.substring(1,e-1),r]:[t.substring(0,e),r]},Mh=()=>{var n;return(n=Ro())==null?void 0:n.config},Uh=n=>{var t;return(t=Ro())==null?void 0:t[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fh{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,r)=>{e?this.reject(e):this.resolve(r),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(e):t(e,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bh(n,t){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const e={alg:"none",type:"JWT"},r=t||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...n};return[Qi(JSON.stringify(e)),Qi(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kt(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function kd(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Kt())}function Dd(){var t;const n=(t=Ro())==null?void 0:t.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Vd(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function xd(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Ld(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Md(){const n=Kt();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Ud(){return!Dd()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Fd(){try{return typeof indexedDB=="object"}catch{return!1}}function Bd(){return new Promise((n,t)=>{try{let e=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),e||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{e=!1},s.onerror=()=>{var i;t(((i=s.error)==null?void 0:i.message)||"")}}catch(e){t(e)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qd="FirebaseError";class Be extends Error{constructor(t,e,r){super(e),this.code=t,this.customData=r,this.name=qd,Object.setPrototypeOf(this,Be.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Qs.prototype.create)}}class Qs{constructor(t,e,r){this.service=t,this.serviceName=e,this.errors=r}create(t,...e){const r=e[0]||{},s=`${this.service}/${t}`,i=this.errors[t],o=i?$d(i,r):"Error",u=`${this.serviceName}: ${o} (${s}).`;return new Be(s,u,r)}}function $d(n,t){return n.replace(Hd,(e,r)=>{const s=t[r];return s!=null?String(s):`<${r}?>`})}const Hd=/\{\$([^}]+)}/g;function jd(n){for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t))return!1;return!0}function sr(n,t){if(n===t)return!0;const e=Object.keys(n),r=Object.keys(t);for(const s of e){if(!r.includes(s))return!1;const i=n[s],o=t[s];if(Dc(i)&&Dc(o)){if(!sr(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!e.includes(s))return!1;return!0}function Dc(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xs(n){const t=[];for(const[e,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{t.push(encodeURIComponent(e)+"="+encodeURIComponent(s))}):t.push(encodeURIComponent(e)+"="+encodeURIComponent(r));return t.length?"&"+t.join("&"):""}function ds(n){const t={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");t[decodeURIComponent(s)]=decodeURIComponent(i)}}),t}function ps(n){const t=n.indexOf("?");if(!t)return"";const e=n.indexOf("#",t);return n.substring(t,e>0?e:void 0)}function Gd(n,t){const e=new zd(n,t);return e.subscribe.bind(e)}class zd{constructor(t,e){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=e,this.task.then(()=>{t(this)}).catch(r=>{this.error(r)})}next(t){this.forEachObserver(e=>{e.next(t)})}error(t){this.forEachObserver(e=>{e.error(t)}),this.close(t)}complete(){this.forEachObserver(t=>{t.complete()}),this.close()}subscribe(t,e,r){let s;if(t===void 0&&e===void 0&&r===void 0)throw new Error("Missing Observer.");Wd(t,["next","error","complete"])?s=t:s={next:t,error:e,complete:r},s.next===void 0&&(s.next=Pa),s.error===void 0&&(s.error=Pa),s.complete===void 0&&(s.complete=Pa);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(t){this.observers===void 0||this.observers[t]===void 0||(delete this.observers[t],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(t){if(!this.finalized)for(let e=0;e<this.observers.length;e++)this.sendOne(e,t)}sendOne(t,e){this.task.then(()=>{if(this.observers!==void 0&&this.observers[t]!==void 0)try{e(this.observers[t])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(t){this.finalized||(this.finalized=!0,t!==void 0&&(this.finalError=t),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Wd(n,t){if(typeof n!="object"||n===null)return!1;for(const e of t)if(e in n&&typeof n[e]=="function")return!0;return!1}function Pa(){}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kd=1e3,Yd=2,Qd=14400*1e3,Xd=.5;function x5(n,t=Kd,e=Yd){const r=t*Math.pow(e,n),s=Math.round(Xd*r*(Math.random()-.5)*2);return Math.min(Qd,r+s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _t(n){return n&&n._delegate?n._delegate:n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hr(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function _1(n){return(await fetch(n,{credentials:"include"})).ok}class Sn{constructor(t,e,r){this.name=t,this.instanceFactory=e,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yn="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jd{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const r=new Fh;if(this.instancesDeferred.set(e,r),this.isInitialized(e)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:e});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(e).promise}getImmediate(t){const e=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),r=(t==null?void 0:t.optional)??!1;if(this.isInitialized(e)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:e})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(t0(t))try{this.getOrInitializeService({instanceIdentifier:Yn})}catch{}for(const[e,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(e);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(t=Yn){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...t.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=Yn){return this.instances.has(t)}getOptions(t=Yn){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:e});for(const[i,o]of this.instancesDeferred.entries()){const u=this.normalizeInstanceIdentifier(i);r===u&&o.resolve(s)}return s}onInit(t,e){const r=this.normalizeInstanceIdentifier(e),s=this.onInitCallbacks.get(r)??new Set;s.add(t),this.onInitCallbacks.set(r,s);const i=this.instances.get(r);return i&&t(i,r),()=>{s.delete(t)}}invokeOnInitCallbacks(t,e){const r=this.onInitCallbacks.get(e);if(r)for(const s of r)try{s(t,e)}catch{}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Zd(t),options:e}),this.instances.set(t,r),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch{}return r||null}normalizeInstanceIdentifier(t=Yn){return this.component?this.component.multipleInstances?t:Yn:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Zd(n){return n===Yn?void 0:n}function t0(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e0{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new Jd(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var at;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(at||(at={}));const n0={debug:at.DEBUG,verbose:at.VERBOSE,info:at.INFO,warn:at.WARN,error:at.ERROR,silent:at.SILENT},r0=at.INFO,s0={[at.DEBUG]:"log",[at.VERBOSE]:"log",[at.INFO]:"info",[at.WARN]:"warn",[at.ERROR]:"error"},i0=(n,t,...e)=>{if(t<n.logLevel)return;const r=new Date().toISOString(),s=s0[t];if(s)console[s](`[${r}]  ${n.name}:`,...e);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class E1{constructor(t){this.name=t,this._logLevel=r0,this._logHandler=i0,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in at))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?n0[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,at.DEBUG,...t),this._logHandler(this,at.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,at.VERBOSE,...t),this._logHandler(this,at.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,at.INFO,...t),this._logHandler(this,at.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,at.WARN,...t),this._logHandler(this,at.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,at.ERROR,...t),this._logHandler(this,at.ERROR,...t)}}const o0=(n,t)=>t.some(e=>n instanceof e);let Vc,xc;function a0(){return Vc||(Vc=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function u0(){return xc||(xc=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const qh=new WeakMap,Ga=new WeakMap,$h=new WeakMap,ba=new WeakMap,y1=new WeakMap;function c0(n){const t=new Promise((e,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",o)},i=()=>{e(wn(n.result)),s()},o=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",o)});return t.then(e=>{e instanceof IDBCursor&&qh.set(e,n)}).catch(()=>{}),y1.set(t,n),t}function l0(n){if(Ga.has(n))return;const t=new Promise((e,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",o),n.removeEventListener("abort",o)},i=()=>{e(),s()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",o),n.addEventListener("abort",o)});Ga.set(n,t)}let za={get(n,t,e){if(n instanceof IDBTransaction){if(t==="done")return Ga.get(n);if(t==="objectStoreNames")return n.objectStoreNames||$h.get(n);if(t==="store")return e.objectStoreNames[1]?void 0:e.objectStore(e.objectStoreNames[0])}return wn(n[t])},set(n,t,e){return n[t]=e,!0},has(n,t){return n instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in n}};function h0(n){za=n(za)}function f0(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...e){const r=n.call(Na(this),t,...e);return $h.set(r,t.sort?t.sort():[t]),wn(r)}:u0().includes(n)?function(...t){return n.apply(Na(this),t),wn(qh.get(this))}:function(...t){return wn(n.apply(Na(this),t))}}function d0(n){return typeof n=="function"?f0(n):(n instanceof IDBTransaction&&l0(n),o0(n,a0())?new Proxy(n,za):n)}function wn(n){if(n instanceof IDBRequest)return c0(n);if(ba.has(n))return ba.get(n);const t=d0(n);return t!==n&&(ba.set(n,t),y1.set(t,n)),t}const Na=n=>y1.get(n);function p0(n,t,{blocked:e,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(n,t),u=wn(o);return r&&o.addEventListener("upgradeneeded",c=>{r(wn(o.result),c.oldVersion,c.newVersion,wn(o.transaction),c)}),e&&o.addEventListener("blocked",c=>e(c.oldVersion,c.newVersion,c)),u.then(c=>{i&&c.addEventListener("close",()=>i()),s&&c.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),u}const m0=["get","getKey","getAll","getAllKeys","count"],g0=["put","add","delete","clear"],Oa=new Map;function Lc(n,t){if(!(n instanceof IDBDatabase&&!(t in n)&&typeof t=="string"))return;if(Oa.get(t))return Oa.get(t);const e=t.replace(/FromIndex$/,""),r=t!==e,s=g0.includes(e);if(!(e in(r?IDBIndex:IDBObjectStore).prototype)||!(s||m0.includes(e)))return;const i=async function(o,...u){const c=this.transaction(o,s?"readwrite":"readonly");let h=c.store;return r&&(h=h.index(u.shift())),(await Promise.all([h[e](...u),s&&c.done]))[0]};return Oa.set(t,i),i}h0(n=>({...n,get:(t,e,r)=>Lc(t,e)||n.get(t,e,r),has:(t,e)=>!!Lc(t,e)||n.has(t,e)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _0{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(E0(e)){const r=e.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(e=>e).join(" ")}}function E0(n){const t=n.getComponent();return(t==null?void 0:t.type)==="VERSION"}const Wa="@firebase/app",Mc="0.15.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qe=new E1("@firebase/app"),y0="@firebase/app-compat",T0="@firebase/analytics-compat",w0="@firebase/analytics",I0="@firebase/app-check-compat",A0="@firebase/app-check",R0="@firebase/auth",v0="@firebase/auth-compat",C0="@firebase/database",S0="@firebase/data-connect",P0="@firebase/database-compat",b0="@firebase/functions",N0="@firebase/functions-compat",O0="@firebase/installations",k0="@firebase/installations-compat",D0="@firebase/messaging",V0="@firebase/messaging-compat",x0="@firebase/performance",L0="@firebase/performance-compat",M0="@firebase/remote-config",U0="@firebase/remote-config-compat",F0="@firebase/storage",B0="@firebase/storage-compat",q0="@firebase/firestore",$0="@firebase/ai",H0="@firebase/firestore-compat",j0="firebase",G0="12.15.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ka="[DEFAULT]",z0={[Wa]:"fire-core",[y0]:"fire-core-compat",[w0]:"fire-analytics",[T0]:"fire-analytics-compat",[A0]:"fire-app-check",[I0]:"fire-app-check-compat",[R0]:"fire-auth",[v0]:"fire-auth-compat",[C0]:"fire-rtdb",[S0]:"fire-data-connect",[P0]:"fire-rtdb-compat",[b0]:"fire-fn",[N0]:"fire-fn-compat",[O0]:"fire-iid",[k0]:"fire-iid-compat",[D0]:"fire-fcm",[V0]:"fire-fcm-compat",[x0]:"fire-perf",[L0]:"fire-perf-compat",[M0]:"fire-rc",[U0]:"fire-rc-compat",[F0]:"fire-gcs",[B0]:"fire-gcs-compat",[q0]:"fire-fst",[H0]:"fire-fst-compat",[$0]:"fire-vertex","fire-js":"fire-js",[j0]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xi=new Map,W0=new Map,Ya=new Map;function Uc(n,t){try{n.container.addComponent(t)}catch(e){Qe.debug(`Component ${t.name} failed to register with FirebaseApp ${n.name}`,e)}}function ir(n){const t=n.name;if(Ya.has(t))return Qe.debug(`There were multiple attempts to register component ${t}.`),!1;Ya.set(t,n);for(const e of Xi.values())Uc(e,n);for(const e of W0.values())Uc(e,n);return!0}function vo(n,t){const e=n.container.getProvider("heartbeat").getImmediate({optional:!0});return e&&e.triggerHeartbeat(),n.container.getProvider(t)}function ie(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const K0={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},In=new Qs("app","Firebase",K0);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y0{constructor(t,e,r){this._isDeleted=!1,this._options={...t},this._config={...e},this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Sn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw In.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fr=G0;function Q0(n,t={}){let e=n;typeof t!="object"&&(t={name:t});const r={name:Ka,automaticDataCollectionEnabled:!0,...t},s=r.name;if(typeof s!="string"||!s)throw In.create("bad-app-name",{appName:String(s)});if(e||(e=Mh()),!e)throw In.create("no-options");const i=Xi.get(s);if(i){if(sr(e,i.options)&&sr(r,i.config))return i;throw In.create("duplicate-app",{appName:s})}const o=new e0(s);for(const c of Ya.values())o.addComponent(c);const u=new Y0(e,r,o);return Xi.set(s,u),u}function T1(n=Ka){const t=Xi.get(n);if(!t&&n===Ka&&Mh())return Q0();if(!t)throw In.create("no-app",{appName:n});return t}function De(n,t,e){let r=z0[n]??n;e&&(r+=`-${e}`);const s=r.match(/\s|\//),i=t.match(/\s|\//);if(s||i){const o=[`Unable to register library "${r}" with version "${t}":`];s&&o.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&o.push("and"),i&&o.push(`version name "${t}" contains illegal characters (whitespace or "/")`),Qe.warn(o.join(" "));return}ir(new Sn(`${r}-version`,()=>({library:r,version:t}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const X0="firebase-heartbeat-database",J0=1,Os="firebase-heartbeat-store";let ka=null;function Hh(){return ka||(ka=p0(X0,J0,{upgrade:(n,t)=>{switch(t){case 0:try{n.createObjectStore(Os)}catch(e){console.warn(e)}}}}).catch(n=>{throw In.create("idb-open",{originalErrorMessage:n.message})})),ka}async function Z0(n){try{const e=(await Hh()).transaction(Os),r=await e.objectStore(Os).get(jh(n));return await e.done,r}catch(t){if(t instanceof Be)Qe.warn(t.message);else{const e=In.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});Qe.warn(e.message)}}}async function Fc(n,t){try{const r=(await Hh()).transaction(Os,"readwrite");await r.objectStore(Os).put(t,jh(n)),await r.done}catch(e){if(e instanceof Be)Qe.warn(e.message);else{const r=In.create("idb-set",{originalErrorMessage:e==null?void 0:e.message});Qe.warn(r.message)}}}function jh(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tp=1024,ep=30;class np{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new sp(e),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var t,e;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Bc();if(((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>ep){const o=ip(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){Qe.warn(r)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Bc(),{heartbeatsToSend:r,unsentEntries:s}=rp(this._heartbeatsCache.heartbeats),i=Qi(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(e){return Qe.warn(e),""}}}function Bc(){return new Date().toISOString().substring(0,10)}function rp(n,t=tp){const e=[];let r=n.slice();for(const s of n){const i=e.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),qc(e)>t){i.dates.pop();break}}else if(e.push({agent:s.agent,dates:[s.date]}),qc(e)>t){e.pop();break}r=r.slice(1)}return{heartbeatsToSend:e,unsentEntries:r}}class sp{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Fd()?Bd().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const e=await Z0(this.app);return e!=null&&e.heartbeats?e:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){if(await this._canUseIndexedDBPromise){const r=await this.read();return Fc(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){if(await this._canUseIndexedDBPromise){const r=await this.read();return Fc(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...t.heartbeats]})}else return}}function qc(n){return Qi(JSON.stringify({version:2,heartbeats:n})).length}function ip(n){if(n.length===0)return-1;let t=0,e=n[0].date;for(let r=1;r<n.length;r++)n[r].date<e&&(e=n[r].date,t=r);return t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function op(n){ir(new Sn("platform-logger",t=>new _0(t),"PRIVATE")),ir(new Sn("heartbeat",t=>new np(t),"PRIVATE")),De(Wa,Mc,n),De(Wa,Mc,"esm2020"),De("fire-js","")}op("");var ap="firebase",up="12.15.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */De(ap,up,"app");function Gh(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const cp=Gh,zh=new Qs("auth","Firebase",Gh());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ji=new E1("@firebase/auth");function lp(n,...t){Ji.logLevel<=at.WARN&&Ji.warn(`Auth (${fr}): ${n}`,...t)}function Fi(n,...t){Ji.logLevel<=at.ERROR&&Ji.error(`Auth (${fr}): ${n}`,...t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Te(n,...t){throw I1(n,...t)}function Re(n,...t){return I1(n,...t)}function w1(n,t,e){const r={...cp(),[t]:e};return new Qs("auth","Firebase",r).create(t,{appName:n.name})}function ze(n){return w1(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function hp(n,t,e){const r=e;if(!(t instanceof r))throw r.name!==t.constructor.name&&Te(n,"argument-error"),w1(n,"argument-error",`Type of ${t.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function I1(n,...t){if(typeof n!="string"){const e=t[0],r=[...t.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(e,...r)}return zh.create(n,...t)}function Q(n,t,...e){if(!n)throw I1(t,...e)}function $e(n){const t="INTERNAL ASSERTION FAILED: "+n;throw Fi(t),new Error(t)}function Xe(n,t){n||$e(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zi(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.href)||""}function Wh(){return $c()==="http:"||$c()==="https:"}function $c(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fp(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Wh()||xd()||"connection"in navigator)?navigator.onLine:!0}function dp(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Js{constructor(t,e){this.shortDelay=t,this.longDelay=e,Xe(e>t,"Short delay should be less than long delay!"),this.isMobile=kd()||Ld()}get(){return fp()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function A1(n,t){Xe(n.emulator,"Emulator should always be set here");const{url:e}=n.emulator;return t?`${e}${t.startsWith("/")?t.slice(1):t}`:e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kh{static initialize(t,e,r){this.fetchImpl=t,e&&(this.headersImpl=e),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;$e("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;$e("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;$e("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pp={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mp=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],gp=new Js(3e4,6e4);function en(n,t){return n.tenantId&&!t.tenantId?{...t,tenantId:n.tenantId}:t}async function nn(n,t,e,r,s={}){return Yh(n,s,async()=>{let i={},o={};r&&(t==="GET"?o=r:i={body:JSON.stringify(r)});const u=Xs({...o,key:n.config.apiKey}).slice(1),c=await n._getAdditionalHeaders();c["Content-Type"]="application/json",n.languageCode&&(c["X-Firebase-Locale"]=n.languageCode);const h={method:t,headers:c,...i};return Vd()||(h.referrerPolicy="strict-origin-when-cross-origin"),n.emulatorConfig&&hr(n.emulatorConfig.host)&&(h.credentials="include"),Kh.fetch()(await Qh(n,n.config.apiHost,e,u),h)})}async function Yh(n,t,e){n._canInitEmulator=!1;const r={...pp,...t};try{const s=new Ep(n),i=await Promise.race([e(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw bi(n,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const u=i.ok?o.errorMessage:o.error.message,[c,h]=u.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw bi(n,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw bi(n,"email-already-in-use",o);if(c==="USER_DISABLED")throw bi(n,"user-disabled",o);const p=r[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw w1(n,p,h);Te(n,p)}}catch(s){if(s instanceof Be)throw s;Te(n,"network-request-failed",{message:String(s)})}}async function Zs(n,t,e,r,s={}){const i=await nn(n,t,e,r,s);return"mfaPendingCredential"in i&&Te(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function Qh(n,t,e,r){const s=`${t}${e}?${r}`,i=n,o=i.config.emulator?A1(n.config,s):`${n.config.apiScheme}://${s}`;return mp.includes(e)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(o).toString():o}function _p(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class Ep{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(t){this.auth=t,this.timer=null,this.promise=new Promise((e,r)=>{this.timer=setTimeout(()=>r(Re(this.auth,"network-request-failed")),gp.get())})}}function bi(n,t,e){const r={appName:n.name};e.email&&(r.email=e.email),e.phoneNumber&&(r.phoneNumber=e.phoneNumber);const s=Re(n,t,r);return s.customData._tokenResponse=e,s}function Hc(n){return n!==void 0&&n.enterprise!==void 0}class yp{constructor(t){if(this.siteKey="",this.recaptchaEnforcementState=[],t.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=t.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=t.recaptchaEnforcementState}getProviderEnforcementState(t){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const e of this.recaptchaEnforcementState)if(e.provider&&e.provider===t)return _p(e.enforcementState);return null}isProviderEnabled(t){return this.getProviderEnforcementState(t)==="ENFORCE"||this.getProviderEnforcementState(t)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function Tp(n,t){return nn(n,"GET","/v2/recaptchaConfig",en(n,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wp(n,t){return nn(n,"POST","/v1/accounts:delete",t)}async function to(n,t){return nn(n,"POST","/v1/accounts:lookup",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ys(n){if(n)try{const t=new Date(Number(n));if(!isNaN(t.getTime()))return t.toUTCString()}catch{}}async function Ip(n,t=!1){const e=_t(n),r=await e.getIdToken(t),s=R1(r);Q(s&&s.exp&&s.auth_time&&s.iat,e.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:ys(Da(s.auth_time)),issuedAtTime:ys(Da(s.iat)),expirationTime:ys(Da(s.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function Da(n){return Number(n)*1e3}function R1(n){const[t,e,r]=n.split(".");if(t===void 0||e===void 0||r===void 0)return Fi("JWT malformed, contained fewer than 3 sections"),null;try{const s=Vh(e);return s?JSON.parse(s):(Fi("Failed to decode base64 JWT payload"),null)}catch(s){return Fi("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function jc(n){const t=R1(n);return Q(t,"internal-error"),Q(typeof t.exp<"u","internal-error"),Q(typeof t.iat<"u","internal-error"),Number(t.exp)-Number(t.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ks(n,t,e=!1){if(e)return t;try{return await t}catch(r){throw r instanceof Be&&Ap(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function Ap({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rp{constructor(t){this.user=t,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(t){if(t){const e=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),e}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(t=!1){if(!this.isRunning)return;const e=this.getInterval(t);this.timerId=setTimeout(async()=>{await this.iteration()},e)}async iteration(){try{await this.user.getIdToken(!0)}catch(t){(t==null?void 0:t.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qa{constructor(t,e){this.createdAt=t,this.lastLoginAt=e,this._initializeTime()}_initializeTime(){this.lastSignInTime=ys(this.lastLoginAt),this.creationTime=ys(this.createdAt)}_copy(t){this.createdAt=t.createdAt,this.lastLoginAt=t.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eo(n){var m;const t=n.auth,e=await n.getIdToken(),r=await ks(n,to(t,{idToken:e}));Q(r==null?void 0:r.users.length,t,"internal-error");const s=r.users[0];n._notifyReloadListener(s);const i=(m=s.providerUserInfo)!=null&&m.length?Xh(s.providerUserInfo):[],o=Cp(n.providerData,i),u=n.isAnonymous,c=!(n.email&&s.passwordHash)&&!(o!=null&&o.length),h=u?c:!1,p={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new Qa(s.createdAt,s.lastLoginAt),isAnonymous:h};Object.assign(n,p)}async function vp(n){const t=_t(n);await eo(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}function Cp(n,t){return[...n.filter(r=>!t.some(s=>s.providerId===r.providerId)),...t]}function Xh(n){return n.map(({providerId:t,...e})=>({providerId:t,uid:e.rawId||"",displayName:e.displayName||null,email:e.email||null,phoneNumber:e.phoneNumber||null,photoURL:e.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Sp(n,t){const e=await Yh(n,{},async()=>{const r=Xs({grant_type:"refresh_token",refresh_token:t}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,o=await Qh(n,s,"/v1/token",`key=${i}`),u=await n._getAdditionalHeaders();u["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:u,body:r};return n.emulatorConfig&&hr(n.emulatorConfig.host)&&(c.credentials="include"),Kh.fetch()(o,c)});return{accessToken:e.access_token,expiresIn:e.expires_in,refreshToken:e.refresh_token}}async function Pp(n,t){return nn(n,"POST","/v2/accounts:revokeToken",en(n,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vr{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(t){Q(t.idToken,"internal-error"),Q(typeof t.idToken<"u","internal-error"),Q(typeof t.refreshToken<"u","internal-error");const e="expiresIn"in t&&typeof t.expiresIn<"u"?Number(t.expiresIn):jc(t.idToken);this.updateTokensAndExpiration(t.idToken,t.refreshToken,e)}updateFromIdToken(t){Q(t.length!==0,"internal-error");const e=jc(t);this.updateTokensAndExpiration(t,null,e)}async getToken(t,e=!1){return!e&&this.accessToken&&!this.isExpired?this.accessToken:(Q(this.refreshToken,t,"user-token-expired"),this.refreshToken?(await this.refresh(t,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(t,e){const{accessToken:r,refreshToken:s,expiresIn:i}=await Sp(t,e);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(t,e,r){this.refreshToken=e||null,this.accessToken=t||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(t,e){const{refreshToken:r,accessToken:s,expirationTime:i}=e,o=new vr;return r&&(Q(typeof r=="string","internal-error",{appName:t}),o.refreshToken=r),s&&(Q(typeof s=="string","internal-error",{appName:t}),o.accessToken=s),i&&(Q(typeof i=="number","internal-error",{appName:t}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(t){this.accessToken=t.accessToken,this.refreshToken=t.refreshToken,this.expirationTime=t.expirationTime}_clone(){return Object.assign(new vr,this.toJSON())}_performRefresh(){return $e("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hn(n,t){Q(typeof n=="string"||typeof n>"u","internal-error",{appName:t})}class Ae{constructor({uid:t,auth:e,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new Rp(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=e,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Qa(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(t){const e=await ks(this,this.stsTokenManager.getToken(this.auth,t));return Q(e,this.auth,"internal-error"),this.accessToken!==e&&(this.accessToken=e,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),e}getIdTokenResult(t){return Ip(this,t)}reload(){return vp(this)}_assign(t){this!==t&&(Q(this.uid===t.uid,this.auth,"internal-error"),this.displayName=t.displayName,this.photoURL=t.photoURL,this.email=t.email,this.emailVerified=t.emailVerified,this.phoneNumber=t.phoneNumber,this.isAnonymous=t.isAnonymous,this.tenantId=t.tenantId,this.providerData=t.providerData.map(e=>({...e})),this.metadata._copy(t.metadata),this.stsTokenManager._assign(t.stsTokenManager))}_clone(t){const e=new Ae({...this,auth:t,stsTokenManager:this.stsTokenManager._clone()});return e.metadata._copy(this.metadata),e}_onReload(t){Q(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=t,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(t){this.reloadListener?this.reloadListener(t):this.reloadUserInfo=t}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(t,e=!1){let r=!1;t.idToken&&t.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(t),r=!0),e&&await eo(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(ie(this.auth.app))return Promise.reject(ze(this.auth));const t=await this.getIdToken();return await ks(this,wp(this.auth,{idToken:t})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(t=>({...t})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(t,e){const r=e.displayName??void 0,s=e.email??void 0,i=e.phoneNumber??void 0,o=e.photoURL??void 0,u=e.tenantId??void 0,c=e._redirectEventId??void 0,h=e.createdAt??void 0,p=e.lastLoginAt??void 0,{uid:m,emailVerified:y,isAnonymous:C,providerData:P,stsTokenManager:L}=e;Q(m&&L,t,"internal-error");const M=vr.fromJSON(this.name,L);Q(typeof m=="string",t,"internal-error"),hn(r,t.name),hn(s,t.name),Q(typeof y=="boolean",t,"internal-error"),Q(typeof C=="boolean",t,"internal-error"),hn(i,t.name),hn(o,t.name),hn(u,t.name),hn(c,t.name),hn(h,t.name),hn(p,t.name);const W=new Ae({uid:m,auth:t,email:s,emailVerified:y,displayName:r,isAnonymous:C,photoURL:o,phoneNumber:i,tenantId:u,stsTokenManager:M,createdAt:h,lastLoginAt:p});return P&&Array.isArray(P)&&(W.providerData=P.map(et=>({...et}))),c&&(W._redirectEventId=c),W}static async _fromIdTokenResponse(t,e,r=!1){const s=new vr;s.updateFromServerResponse(e);const i=new Ae({uid:e.localId,auth:t,stsTokenManager:s,isAnonymous:r});return await eo(i),i}static async _fromGetAccountInfoResponse(t,e,r){const s=e.users[0];Q(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?Xh(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),u=new vr;u.updateFromIdToken(r);const c=new Ae({uid:s.localId,auth:t,stsTokenManager:u,isAnonymous:o}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new Qa(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(c,h),c}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gc=new Map;function He(n){Xe(n instanceof Function,"Expected a class definition");let t=Gc.get(n);return t?(Xe(t instanceof n,"Instance stored in cache mismatched with class"),t):(t=new n,Gc.set(n,t),t)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jh{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(t,e){this.storage[t]=e}async _get(t){const e=this.storage[t];return e===void 0?null:e}async _remove(t){delete this.storage[t]}_addListener(t,e){}_removeListener(t,e){}}Jh.type="NONE";const zc=Jh;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bi(n,t,e){return`firebase:${n}:${t}:${e}`}class Cr{constructor(t,e,r){this.persistence=t,this.auth=e,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=Bi(this.userKey,s.apiKey,i),this.fullPersistenceKey=Bi("persistence",s.apiKey,i),this.boundEventHandler=e._onStorageEvent.bind(e),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(t){return this.persistence._set(this.fullUserKey,t.toJSON())}async getCurrentUser(){const t=await this.persistence._get(this.fullUserKey);if(!t)return null;if(typeof t=="string"){const e=await to(this.auth,{idToken:t}).catch(()=>{});return e?Ae._fromGetAccountInfoResponse(this.auth,e,t):null}return Ae._fromJSON(this.auth,t)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(t){if(this.persistence===t)return;const e=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=t,e)return this.setCurrentUser(e)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(t,e,r="authUser"){if(!e.length)return new Cr(He(zc),t,r);const s=(await Promise.all(e.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=s[0]||He(zc);const o=Bi(r,t.config.apiKey,t.name);let u=null;for(const h of e)try{const p=await h._get(o);if(p){let m;if(typeof p=="string"){const y=await to(t,{idToken:p}).catch(()=>{});if(!y)break;m=await Ae._fromGetAccountInfoResponse(t,y,p)}else m=Ae._fromJSON(t,p);h!==i&&(u=m),i=h;break}}catch{}const c=s.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!c.length?new Cr(i,t,r):(i=c[0],u&&await i._set(o,u.toJSON()),await Promise.all(e.map(async h=>{if(h!==i)try{await h._remove(o)}catch{}})),new Cr(i,t,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wc(n){const t=n.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/"))return"Opera";if(n2(t))return"IEMobile";if(t.includes("msie")||t.includes("trident/"))return"IE";if(t.includes("edge/"))return"Edge";if(Zh(t))return"Firefox";if(t.includes("silk/"))return"Silk";if(s2(t))return"Blackberry";if(i2(t))return"Webos";if(t2(t))return"Safari";if((t.includes("chrome/")||e2(t))&&!t.includes("edge/"))return"Chrome";if(r2(t))return"Android";{const e=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(e);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function Zh(n=Kt()){return/firefox\//i.test(n)}function t2(n=Kt()){const t=n.toLowerCase();return t.includes("safari/")&&!t.includes("chrome/")&&!t.includes("crios/")&&!t.includes("android")}function e2(n=Kt()){return/crios\//i.test(n)}function n2(n=Kt()){return/iemobile/i.test(n)}function r2(n=Kt()){return/android/i.test(n)}function s2(n=Kt()){return/blackberry/i.test(n)}function i2(n=Kt()){return/webos/i.test(n)}function v1(n=Kt()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function bp(n=Kt()){var t;return v1(n)&&!!((t=window.navigator)!=null&&t.standalone)}function Np(){return Md()&&document.documentMode===10}function o2(n=Kt()){return v1(n)||r2(n)||i2(n)||s2(n)||/windows phone/i.test(n)||n2(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function a2(n,t=[]){let e;switch(n){case"Browser":e=Wc(Kt());break;case"Worker":e=`${Wc(Kt())}-${n}`;break;default:e=n}const r=t.length?t.join(","):"FirebaseCore-web";return`${e}/JsCore/${fr}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Op{constructor(t){this.auth=t,this.queue=[]}pushCallback(t,e){const r=i=>new Promise((o,u)=>{try{const c=t(i);o(c)}catch(c){u(c)}});r.onAbort=e,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(t){if(this.auth.currentUser===t)return;const e=[];try{for(const r of this.queue)await r(t),r.onAbort&&e.push(r.onAbort)}catch(r){e.reverse();for(const s of e)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kp(n,t={}){return nn(n,"GET","/v2/passwordPolicy",en(n,t))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dp=6;class Vp{constructor(t){var r;const e=t.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=e.minPasswordLength??Dp,e.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=e.maxPasswordLength),e.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=e.containsLowercaseCharacter),e.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=e.containsUppercaseCharacter),e.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=e.containsNumericCharacter),e.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=e.containsNonAlphanumericCharacter),this.enforcementState=t.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((r=t.allowedNonAlphanumericCharacters)==null?void 0:r.join(""))??"",this.forceUpgradeOnSignin=t.forceUpgradeOnSignin??!1,this.schemaVersion=t.schemaVersion}validatePassword(t){const e={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(t,e),this.validatePasswordCharacterOptions(t,e),e.isValid&&(e.isValid=e.meetsMinPasswordLength??!0),e.isValid&&(e.isValid=e.meetsMaxPasswordLength??!0),e.isValid&&(e.isValid=e.containsLowercaseLetter??!0),e.isValid&&(e.isValid=e.containsUppercaseLetter??!0),e.isValid&&(e.isValid=e.containsNumericCharacter??!0),e.isValid&&(e.isValid=e.containsNonAlphanumericCharacter??!0),e}validatePasswordLengthOptions(t,e){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(e.meetsMinPasswordLength=t.length>=r),s&&(e.meetsMaxPasswordLength=t.length<=s)}validatePasswordCharacterOptions(t,e){this.updatePasswordCharacterOptionsStatuses(e,!1,!1,!1,!1);let r;for(let s=0;s<t.length;s++)r=t.charAt(s),this.updatePasswordCharacterOptionsStatuses(e,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(t,e,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(t.containsLowercaseLetter||(t.containsLowercaseLetter=e)),this.customStrengthOptions.containsUppercaseLetter&&(t.containsUppercaseLetter||(t.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(t.containsNumericCharacter||(t.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(t.containsNonAlphanumericCharacter||(t.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xp{constructor(t,e,r,s){this.app=t,this.heartbeatServiceProvider=e,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Kc(this),this.idTokenSubscription=new Kc(this),this.beforeStateQueue=new Op(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=zh,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=t.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(t,e){return e&&(this._popupRedirectResolver=He(e)),this._initializationPromise=this.queue(async()=>{var r,s,i;if(!this._deleted&&(this.persistenceManager=await Cr.create(this,t),(r=this._resolvePersistenceManagerAvailable)==null||r.call(this),!this._deleted)){if((s=this._popupRedirectResolver)!=null&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(e),this.lastNotifiedUid=((i=this.currentUser)==null?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const t=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!t)){if(this.currentUser&&t&&this.currentUser.uid===t.uid){this._currentUser._assign(t),await this.currentUser.getIdToken();return}await this._updateCurrentUser(t,!0)}}async initializeCurrentUserFromIdToken(t){try{const e=await to(this,{idToken:t}),r=await Ae._fromGetAccountInfoResponse(this,e,t);await this.directlySetCurrentUser(r)}catch(e){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",e),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(t){var i;if(ie(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(u=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(u,u))}):this.directlySetCurrentUser(null)}const e=await this.assertedPersistence.getCurrentUser();let r=e,s=!1;if(t&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(i=this.redirectUser)==null?void 0:i._redirectEventId,u=r==null?void 0:r._redirectEventId,c=await this.tryRedirectSignIn(t);(!o||o===u)&&(c!=null&&c.user)&&(r=c.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(o){r=e,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return Q(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(t){let e=null;try{e=await this._popupRedirectResolver._completeRedirectFn(this,t,!0)}catch{await this._setRedirectUser(null)}return e}async reloadAndSetCurrentUserOrClear(t){try{await eo(t)}catch(e){if((e==null?void 0:e.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(t)}useDeviceLanguage(){this.languageCode=dp()}async _delete(){this._deleted=!0}async updateCurrentUser(t){if(ie(this.app))return Promise.reject(ze(this));const e=t?_t(t):null;return e&&Q(e.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(e&&e._clone(this))}async _updateCurrentUser(t,e=!1){if(!this._deleted)return t&&Q(this.tenantId===t.tenantId,this,"tenant-id-mismatch"),e||await this.beforeStateQueue.runMiddleware(t),this.queue(async()=>{await this.directlySetCurrentUser(t),this.notifyAuthListeners()})}async signOut(){return ie(this.app)?Promise.reject(ze(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(t){return ie(this.app)?Promise.reject(ze(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(He(t))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(t){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const e=this._getPasswordPolicyInternal();return e.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):e.validatePassword(t)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const t=await kp(this),e=new Vp(t);this.tenantId===null?this._projectPasswordPolicy=e:this._tenantPasswordPolicies[this.tenantId]=e}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(t){this._errorFactory=new Qs("auth","Firebase",t())}onAuthStateChanged(t,e,r){return this.registerStateListener(this.authStateSubscription,t,e,r)}beforeAuthStateChanged(t,e){return this.beforeStateQueue.pushCallback(t,e)}onIdTokenChanged(t,e,r){return this.registerStateListener(this.idTokenSubscription,t,e,r)}authStateReady(){return new Promise((t,e)=>{if(this.currentUser)t();else{const r=this.onAuthStateChanged(()=>{r(),t()},e)}})}async revokeAccessToken(t){if(this.currentUser){const e=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:t,idToken:e};this.tenantId!=null&&(r.tenantId=this.tenantId),await Pp(this,r)}}toJSON(){var t;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(t=this._currentUser)==null?void 0:t.toJSON()}}async _setRedirectUser(t,e){const r=await this.getOrInitRedirectPersistenceManager(e);return t===null?r.removeCurrentUser():r.setCurrentUser(t)}async getOrInitRedirectPersistenceManager(t){if(!this.redirectPersistenceManager){const e=t&&He(t)||this._popupRedirectResolver;Q(e,this,"argument-error"),this.redirectPersistenceManager=await Cr.create(this,[He(e._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(t){var e,r;return this._isInitialized&&await this.queue(async()=>{}),((e=this._currentUser)==null?void 0:e._redirectEventId)===t?this._currentUser:((r=this.redirectUser)==null?void 0:r._redirectEventId)===t?this.redirectUser:null}async _persistUserIfCurrent(t){if(t===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(t))}_notifyListenersIfCurrent(t){t===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const t=((e=this.currentUser)==null?void 0:e.uid)??null;this.lastNotifiedUid!==t&&(this.lastNotifiedUid=t,this.authStateSubscription.next(this.currentUser))}registerStateListener(t,e,r,s){if(this._deleted)return()=>{};const i=typeof e=="function"?e:e.next.bind(e);let o=!1;const u=this._isInitialized?Promise.resolve():this._initializationPromise;if(Q(u,this,"internal-error"),u.then(()=>{o||i(this.currentUser)}),typeof e=="function"){const c=t.addObserver(e,r,s);return()=>{o=!0,c()}}else{const c=t.addObserver(e);return()=>{o=!0,c()}}}async directlySetCurrentUser(t){this.currentUser&&this.currentUser!==t&&this._currentUser._stopProactiveRefresh(),t&&this.isProactiveRefreshEnabled&&t._startProactiveRefresh(),this.currentUser=t,t?await this.assertedPersistence.setCurrentUser(t):await this.assertedPersistence.removeCurrentUser()}queue(t){return this.operations=this.operations.then(t,t),this.operations}get assertedPersistence(){return Q(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(t){!t||this.frameworks.includes(t)||(this.frameworks.push(t),this.frameworks.sort(),this.clientVersion=a2(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var s;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const e=await((s=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:s.getHeartbeatsHeader());e&&(t["X-Firebase-Client"]=e);const r=await this._getAppCheckToken();return r&&(t["X-Firebase-AppCheck"]=r),t}async _getAppCheckToken(){var e;if(ie(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:e.getToken());return t!=null&&t.error&&lp(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function Bn(n){return _t(n)}class Kc{constructor(t){this.auth=t,this.observer=null,this.addObserver=Gd(e=>this.observer=e)}get next(){return Q(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Co={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Lp(n){Co=n}function u2(n){return Co.loadJS(n)}function Mp(){return Co.recaptchaEnterpriseScript}function Up(){return Co.gapiScript}function Fp(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class Bp{constructor(){this.enterprise=new qp}ready(t){t()}execute(t,e){return Promise.resolve("token")}render(t,e){return""}}class qp{ready(t){t()}execute(t,e){return Promise.resolve("token")}render(t,e){return""}}const $p="recaptcha-enterprise",c2="NO_RECAPTCHA",Yc="onFirebaseAuthREInstanceReady";class dn{constructor(t){this.type=$p,this.auth=Bn(t)}async verify(t="verify",e=!1){async function r(i){if(!e){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,u)=>{Tp(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(c=>{if(c.recaptchaKey===void 0)u(new Error("recaptcha Enterprise site key undefined"));else{const h=new yp(c);return i.tenantId==null?i._agentRecaptchaConfig=h:i._tenantRecaptchaConfigs[i.tenantId]=h,o(h.siteKey)}}).catch(c=>{u(c)})})}function s(i,o,u){const c=window.grecaptcha;Hc(c)?c.enterprise.ready(()=>{c.enterprise.execute(i,{action:t}).then(h=>{o(h)}).catch(()=>{o(c2)})}):u(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new Bp().execute("siteKey",{action:"verify"}):new Promise((i,o)=>{r(this.auth).then(async u=>{if(!e&&Hc(window.grecaptcha)&&dn.scriptInjectionDeferred)await dn.scriptInjectionDeferred.promise,s(u,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let c=Mp();c.length!==0&&(c+=u+`&onload=${Yc}`),dn.scriptInjectionDeferred=new Fh,window[Yc]=()=>{var h;(h=dn.scriptInjectionDeferred)==null||h.resolve()},u2(c).then(()=>{var h;return(h=dn.scriptInjectionDeferred)==null?void 0:h.promise}).then(()=>{s(u,i,o)}).catch(h=>{o(h)})}}).catch(u=>{o(u)})})}}dn.scriptInjectionDeferred=null;async function Qc(n,t,e,r=!1,s=!1){const i=new dn(n);let o;if(s)o=c2;else try{o=await i.verify(e)}catch{o=await i.verify(e,!0)}const u={...t};if(e==="mfaSmsEnrollment"||e==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in u){const c=u.phoneEnrollmentInfo.phoneNumber,h=u.phoneEnrollmentInfo.recaptchaToken;Object.assign(u,{phoneEnrollmentInfo:{phoneNumber:c,recaptchaToken:h,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in u){const c=u.phoneSignInInfo.recaptchaToken;Object.assign(u,{phoneSignInInfo:{recaptchaToken:c,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return u}return r?Object.assign(u,{captchaResp:o}):Object.assign(u,{captchaResponse:o}),Object.assign(u,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(u,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),u}async function Xa(n,t,e,r,s){var i;if((i=n._getRecaptchaConfig())!=null&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const o=await Qc(n,t,e,e==="getOobCode");return r(n,o)}else return r(n,t).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){console.log(`${e} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const u=await Qc(n,t,e,e==="getOobCode");return r(n,u)}else return Promise.reject(o)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hp(n,t){const e=vo(n,"auth");if(e.isInitialized()){const s=e.getImmediate(),i=e.getOptions();if(sr(i,t??{}))return s;Te(s,"already-initialized")}return e.initialize({options:t})}function jp(n,t){const e=(t==null?void 0:t.persistence)||[],r=(Array.isArray(e)?e:[e]).map(He);t!=null&&t.errorMap&&n._updateErrorMap(t.errorMap),n._initializeWithPersistence(r,t==null?void 0:t.popupRedirectResolver)}function Gp(n,t,e){const r=Bn(n);Q(/^https?:\/\//.test(t),r,"invalid-emulator-scheme");const s=!1,i=l2(t),{host:o,port:u}=zp(t),c=u===null?"":`:${u}`,h={url:`${i}//${o}${c}/`},p=Object.freeze({host:o,port:u,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){Q(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),Q(sr(h,r.config.emulator)&&sr(p,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=h,r.emulatorConfig=p,r.settings.appVerificationDisabledForTesting=!0,hr(o)?_1(`${i}//${o}${c}`):Wp()}function l2(n){const t=n.indexOf(":");return t<0?"":n.substr(0,t+1)}function zp(n){const t=l2(n),e=/(\/\/)?([^?#/]+)/.exec(n.substr(t.length));if(!e)return{host:"",port:null};const r=e[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:Xc(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:Xc(o)}}}function Xc(n){if(!n)return null;const t=Number(n);return isNaN(t)?null:t}function Wp(){function n(){const t=document.createElement("p"),e=t.style;t.innerText="Running in emulator mode. Do not use with production credentials.",e.position="fixed",e.width="100%",e.backgroundColor="#ffffff",e.border=".1em solid #000000",e.color="#b50000",e.bottom="0px",e.left="0px",e.margin="0px",e.zIndex="10000",e.textAlign="center",t.classList.add("firebase-emulator-warning"),document.body.appendChild(t)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C1{constructor(t,e){this.providerId=t,this.signInMethod=e}toJSON(){return $e("not implemented")}_getIdTokenResponse(t){return $e("not implemented")}_linkToIdToken(t,e){return $e("not implemented")}_getReauthenticationResolver(t){return $e("not implemented")}}async function Kp(n,t){return nn(n,"POST","/v1/accounts:signUp",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Yp(n,t){return Zs(n,"POST","/v1/accounts:signInWithPassword",en(n,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Qp(n,t){return Zs(n,"POST","/v1/accounts:signInWithEmailLink",en(n,t))}async function Xp(n,t){return Zs(n,"POST","/v1/accounts:signInWithEmailLink",en(n,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ds extends C1{constructor(t,e,r,s=null){super("password",r),this._email=t,this._password=e,this._tenantId=s}static _fromEmailAndPassword(t,e){return new Ds(t,e,"password")}static _fromEmailAndCode(t,e,r=null){return new Ds(t,e,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(t){const e=typeof t=="string"?JSON.parse(t):t;if(e!=null&&e.email&&(e!=null&&e.password)){if(e.signInMethod==="password")return this._fromEmailAndPassword(e.email,e.password);if(e.signInMethod==="emailLink")return this._fromEmailAndCode(e.email,e.password,e.tenantId)}return null}async _getIdTokenResponse(t){switch(this.signInMethod){case"password":const e={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Xa(t,e,"signInWithPassword",Yp);case"emailLink":return Qp(t,{email:this._email,oobCode:this._password});default:Te(t,"internal-error")}}async _linkToIdToken(t,e){switch(this.signInMethod){case"password":const r={idToken:e,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Xa(t,r,"signUpPassword",Kp);case"emailLink":return Xp(t,{idToken:e,email:this._email,oobCode:this._password});default:Te(t,"internal-error")}}_getReauthenticationResolver(t){return this._getIdTokenResponse(t)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Sr(n,t){return Zs(n,"POST","/v1/accounts:signInWithIdp",en(n,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jp="http://localhost";class or extends C1{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(t){const e=new or(t.providerId,t.signInMethod);return t.idToken||t.accessToken?(t.idToken&&(e.idToken=t.idToken),t.accessToken&&(e.accessToken=t.accessToken),t.nonce&&!t.pendingToken&&(e.nonce=t.nonce),t.pendingToken&&(e.pendingToken=t.pendingToken)):t.oauthToken&&t.oauthTokenSecret?(e.accessToken=t.oauthToken,e.secret=t.oauthTokenSecret):Te("argument-error"),e}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(t){const e=typeof t=="string"?JSON.parse(t):t,{providerId:r,signInMethod:s,...i}=e;if(!r||!s)return null;const o=new or(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(t){const e=this.buildRequest();return Sr(t,e)}_linkToIdToken(t,e){const r=this.buildRequest();return r.idToken=e,Sr(t,r)}_getReauthenticationResolver(t){const e=this.buildRequest();return e.autoCreate=!1,Sr(t,e)}buildRequest(){const t={requestUri:Jp,returnSecureToken:!0};if(this.pendingToken)t.pendingToken=this.pendingToken;else{const e={};this.idToken&&(e.id_token=this.idToken),this.accessToken&&(e.access_token=this.accessToken),this.secret&&(e.oauth_token_secret=this.secret),e.providerId=this.providerId,this.nonce&&!this.pendingToken&&(e.nonce=this.nonce),t.postBody=Xs(e)}return t}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zp(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function t7(n){const t=ds(ps(n)).link,e=t?ds(ps(t)).deep_link_id:null,r=ds(ps(n)).deep_link_id;return(r?ds(ps(r)).link:null)||r||e||t||n}class S1{constructor(t){const e=ds(ps(t)),r=e.apiKey??null,s=e.oobCode??null,i=Zp(e.mode??null);Q(r&&s&&i,"argument-error"),this.apiKey=r,this.operation=i,this.code=s,this.continueUrl=e.continueUrl??null,this.languageCode=e.lang??null,this.tenantId=e.tenantId??null}static parseLink(t){const e=t7(t);try{return new S1(e)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mr{constructor(){this.providerId=Mr.PROVIDER_ID}static credential(t,e){return Ds._fromEmailAndPassword(t,e)}static credentialWithLink(t,e){const r=S1.parseLink(e);return Q(r,"argument-error"),Ds._fromEmailAndCode(t,r.code,r.tenantId)}}Mr.PROVIDER_ID="password";Mr.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Mr.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class P1{constructor(t){this.providerId=t,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(t){this.defaultLanguageCode=t}setCustomParameters(t){return this.customParameters=t,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ti extends P1{constructor(){super(...arguments),this.scopes=[]}addScope(t){return this.scopes.includes(t)||this.scopes.push(t),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pn extends ti{constructor(){super("facebook.com")}static credential(t){return or._fromParams({providerId:pn.PROVIDER_ID,signInMethod:pn.FACEBOOK_SIGN_IN_METHOD,accessToken:t})}static credentialFromResult(t){return pn.credentialFromTaggedObject(t)}static credentialFromError(t){return pn.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t||!("oauthAccessToken"in t)||!t.oauthAccessToken)return null;try{return pn.credential(t.oauthAccessToken)}catch{return null}}}pn.FACEBOOK_SIGN_IN_METHOD="facebook.com";pn.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mn extends ti{constructor(){super("google.com"),this.addScope("profile")}static credential(t,e){return or._fromParams({providerId:mn.PROVIDER_ID,signInMethod:mn.GOOGLE_SIGN_IN_METHOD,idToken:t,accessToken:e})}static credentialFromResult(t){return mn.credentialFromTaggedObject(t)}static credentialFromError(t){return mn.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t)return null;const{oauthIdToken:e,oauthAccessToken:r}=t;if(!e&&!r)return null;try{return mn.credential(e,r)}catch{return null}}}mn.GOOGLE_SIGN_IN_METHOD="google.com";mn.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gn extends ti{constructor(){super("github.com")}static credential(t){return or._fromParams({providerId:gn.PROVIDER_ID,signInMethod:gn.GITHUB_SIGN_IN_METHOD,accessToken:t})}static credentialFromResult(t){return gn.credentialFromTaggedObject(t)}static credentialFromError(t){return gn.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t||!("oauthAccessToken"in t)||!t.oauthAccessToken)return null;try{return gn.credential(t.oauthAccessToken)}catch{return null}}}gn.GITHUB_SIGN_IN_METHOD="github.com";gn.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _n extends ti{constructor(){super("twitter.com")}static credential(t,e){return or._fromParams({providerId:_n.PROVIDER_ID,signInMethod:_n.TWITTER_SIGN_IN_METHOD,oauthToken:t,oauthTokenSecret:e})}static credentialFromResult(t){return _n.credentialFromTaggedObject(t)}static credentialFromError(t){return _n.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t)return null;const{oauthAccessToken:e,oauthTokenSecret:r}=t;if(!e||!r)return null;try{return _n.credential(e,r)}catch{return null}}}_n.TWITTER_SIGN_IN_METHOD="twitter.com";_n.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function e7(n,t){return Zs(n,"POST","/v1/accounts:signUp",en(n,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ar{constructor(t){this.user=t.user,this.providerId=t.providerId,this._tokenResponse=t._tokenResponse,this.operationType=t.operationType}static async _fromIdTokenResponse(t,e,r,s=!1){const i=await Ae._fromIdTokenResponse(t,r,s),o=Jc(r);return new ar({user:i,providerId:o,_tokenResponse:r,operationType:e})}static async _forOperation(t,e,r){await t._updateTokensIfNecessary(r,!0);const s=Jc(r);return new ar({user:t,providerId:s,_tokenResponse:r,operationType:e})}}function Jc(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class no extends Be{constructor(t,e,r,s){super(e.code,e.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,no.prototype),this.customData={appName:t.name,tenantId:t.tenantId??void 0,_serverResponse:e.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(t,e,r,s){return new no(t,e,r,s)}}function h2(n,t,e,r){return(t==="reauthenticate"?e._getReauthenticationResolver(n):e._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?no._fromErrorAndOperation(n,i,t,r):i})}async function n7(n,t,e=!1){const r=await ks(n,t._linkToIdToken(n.auth,await n.getIdToken()),e);return ar._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function r7(n,t,e=!1){const{auth:r}=n;if(ie(r.app))return Promise.reject(ze(r));const s="reauthenticate";try{const i=await ks(n,h2(r,s,t,n),e);Q(i.idToken,r,"internal-error");const o=R1(i.idToken);Q(o,r,"internal-error");const{sub:u}=o;return Q(n.uid===u,r,"user-mismatch"),ar._forOperation(n,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&Te(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function f2(n,t,e=!1){if(ie(n.app))return Promise.reject(ze(n));const r="signIn",s=await h2(n,r,t),i=await ar._fromIdTokenResponse(n,r,s);return e||await n._updateCurrentUser(i.user),i}async function s7(n,t){return f2(Bn(n),t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function d2(n){const t=Bn(n);t._getPasswordPolicyInternal()&&await t._updatePasswordPolicy()}async function L5(n,t,e){if(ie(n.app))return Promise.reject(ze(n));const r=Bn(n),o=await Xa(r,{returnSecureToken:!0,email:t,password:e,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",e7).catch(c=>{throw c.code==="auth/password-does-not-meet-requirements"&&d2(n),c}),u=await ar._fromIdTokenResponse(r,"signIn",o);return await r._updateCurrentUser(u.user),u}function M5(n,t,e){return ie(n.app)?Promise.reject(ze(n)):s7(_t(n),Mr.credential(t,e)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&d2(n),r})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function i7(n,t){return nn(n,"POST","/v1/accounts:createAuthUri",en(n,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function U5(n,t){const e=Wh()?Zi():"http://localhost",r={identifier:t,continueUri:e},{signinMethods:s}=await i7(_t(n),r);return s||[]}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function F5(n,t){return _t(n).setPersistence(t)}function o7(n,t,e,r){return _t(n).onIdTokenChanged(t,e,r)}function a7(n,t,e){return _t(n).beforeAuthStateChanged(t,e)}function B5(n,t,e,r){return _t(n).onAuthStateChanged(t,e,r)}const ro="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class p2{constructor(t,e){this.storageRetriever=t,this.type=e}_isAvailable(){try{return this.storage?(this.storage.setItem(ro,"1"),this.storage.removeItem(ro),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(t,e){return this.storage.setItem(t,JSON.stringify(e)),Promise.resolve()}_get(t){const e=this.storage.getItem(t);return Promise.resolve(e?JSON.parse(e):null)}_remove(t){return this.storage.removeItem(t),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const u7=1e3,c7=10;class m2 extends p2{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(t,e)=>this.onStorageEvent(t,e),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=o2(),this._shouldAllowMigration=!0}forAllChangedKeys(t){for(const e of Object.keys(this.listeners)){const r=this.storage.getItem(e),s=this.localCache[e];r!==s&&t(e,s,r)}}onStorageEvent(t,e=!1){if(!t.key){this.forAllChangedKeys((o,u,c)=>{this.notifyListeners(o,c)});return}const r=t.key;e?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(r);!e&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);Np()&&i!==t.newValue&&t.newValue!==t.oldValue?setTimeout(s,c7):s()}notifyListeners(t,e){this.localCache[t]=e;const r=this.listeners[t];if(r)for(const s of Array.from(r))s(e&&JSON.parse(e))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((t,e,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:t,oldValue:e,newValue:r}),!0)})},u7)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(t,e){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[t]||(this.listeners[t]=new Set,this.localCache[t]=this.storage.getItem(t)),this.listeners[t].add(e)}_removeListener(t,e){this.listeners[t]&&(this.listeners[t].delete(e),this.listeners[t].size===0&&delete this.listeners[t]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(t,e){await super._set(t,e),this.localCache[t]=JSON.stringify(e)}async _get(t){const e=await super._get(t);return this.localCache[t]=JSON.stringify(e),e}async _remove(t){await super._remove(t),delete this.localCache[t]}}m2.type="LOCAL";const l7=m2;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class g2 extends p2{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(t,e){}_removeListener(t,e){}}g2.type="SESSION";const _2=g2;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function h7(n){return Promise.all(n.map(async t=>{try{return{fulfilled:!0,value:await t}}catch(e){return{fulfilled:!1,reason:e}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class So{constructor(t){this.eventTarget=t,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(t){const e=this.receivers.find(s=>s.isListeningto(t));if(e)return e;const r=new So(t);return this.receivers.push(r),r}isListeningto(t){return this.eventTarget===t}async handleEvent(t){const e=t,{eventId:r,eventType:s,data:i}=e.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;e.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const u=Array.from(o).map(async h=>h(e.origin,i)),c=await h7(u);e.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:c})}_subscribe(t,e){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[t]||(this.handlersMap[t]=new Set),this.handlersMap[t].add(e)}_unsubscribe(t,e){this.handlersMap[t]&&e&&this.handlersMap[t].delete(e),(!e||this.handlersMap[t].size===0)&&delete this.handlersMap[t],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}So.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function b1(n="",t=10){let e="";for(let r=0;r<t;r++)e+=Math.floor(Math.random()*10);return n+e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class f7{constructor(t){this.target=t,this.handlers=new Set}removeMessageHandler(t){t.messageChannel&&(t.messageChannel.port1.removeEventListener("message",t.onMessage),t.messageChannel.port1.close()),this.handlers.delete(t)}async _send(t,e,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((u,c)=>{const h=b1("",20);s.port1.start();const p=setTimeout(()=>{c(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(m){const y=m;if(y.data.eventId===h)switch(y.data.status){case"ack":clearTimeout(p),i=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),u(y.data.response);break;default:clearTimeout(p),clearTimeout(i),c(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:t,eventId:h,data:e},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ve(){return window}function d7(n){Ve().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function E2(){return typeof Ve().WorkerGlobalScope<"u"&&typeof Ve().importScripts=="function"}async function p7(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function m7(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)==null?void 0:n.controller)||null}function g7(){return E2()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const y2="firebaseLocalStorageDb",_7=1,so="firebaseLocalStorage",T2="fbase_key";class ei{constructor(t){this.request=t}toPromise(){return new Promise((t,e)=>{this.request.addEventListener("success",()=>{t(this.request.result)}),this.request.addEventListener("error",()=>{e(this.request.error)})})}}function Po(n,t){return n.transaction([so],t?"readwrite":"readonly").objectStore(so)}function E7(){const n=indexedDB.deleteDatabase(y2);return new ei(n).toPromise()}function w2(){const n=indexedDB.open(y2,_7);return new Promise((t,e)=>{n.addEventListener("error",()=>{e(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(so,{keyPath:T2})}catch(s){e(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(so)?t(r):(r.close(),await E7(),t(await w2()))})})}async function Zc(n,t,e){const r=Po(n,!0).put({[T2]:t,value:e});return new ei(r).toPromise()}async function y7(n,t){const e=Po(n,!1).get(t),r=await new ei(e).toPromise();return r===void 0?null:r.value}function tl(n,t){const e=Po(n,!0).delete(t);return new ei(e).toPromise()}const T7=800,w7=3;class I2{constructor(){this.type="LOCAL",this.dbPromise=null,this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.dbPromise?this.dbPromise:(this.dbPromise=w2(),this.dbPromise.catch(()=>{this.dbPromise=null}),this.dbPromise)}async _withRetries(t){let e=0;for(;;)try{const r=await this._openDb();return await t(r)}catch(r){if(e++>w7)throw r;this.dbPromise&&((await this.dbPromise).close(),this.dbPromise=null)}}async initializeServiceWorkerMessaging(){return E2()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=So._getInstance(g7()),this.receiver._subscribe("keyChanged",async(t,e)=>({keyProcessed:(await this._poll()).includes(e.key)})),this.receiver._subscribe("ping",async(t,e)=>["keyChanged"])}async initializeSender(){var e,r;if(this.activeServiceWorker=await p7(),!this.activeServiceWorker)return;this.sender=new f7(this.activeServiceWorker);const t=await this.sender._send("ping",{},800);t&&(e=t[0])!=null&&e.fulfilled&&(r=t[0])!=null&&r.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(t){if(!(!this.sender||!this.activeServiceWorker||m7()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:t},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{return indexedDB?(await this._withRetries(async t=>{await Zc(t,ro,"1"),await tl(t,ro)}),!0):!1}catch{}return!1}async _withPendingWrite(t){this.pendingWrites++;try{await t()}finally{this.pendingWrites--}}async _set(t,e){return this._withPendingWrite(async()=>(await this._withRetries(r=>Zc(r,t,e)),this.localCache[t]=e,this.notifyServiceWorker(t)))}async _get(t){const e=await this._withRetries(r=>y7(r,t));return this.localCache[t]=e,e}async _remove(t){return this._withPendingWrite(async()=>(await this._withRetries(e=>tl(e,t)),delete this.localCache[t],this.notifyServiceWorker(t)))}async _poll(){const t=await this._withRetries(s=>{const i=Po(s,!1).getAll();return new ei(i).toPromise()});if(!t)return[];if(this.pendingWrites!==0)return[];const e=[],r=new Set;if(t.length!==0)for(const{fbase_key:s,value:i}of t)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),e.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),e.push(s));return e}notifyListeners(t,e){this.localCache[t]=e;const r=this.listeners[t];if(r)for(const s of Array.from(r))s(e)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),T7)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(t,e){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[t]||(this.listeners[t]=new Set,this._get(t)),this.listeners[t].add(e)}_removeListener(t,e){this.listeners[t]&&(this.listeners[t].delete(e),this.listeners[t].size===0&&delete this.listeners[t]),Object.keys(this.listeners).length===0&&this.stopPolling()}}I2.type="LOCAL";const I7=I2;new Js(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function A2(n,t){return t?He(t):(Q(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class N1 extends C1{constructor(t){super("custom","custom"),this.params=t}_getIdTokenResponse(t){return Sr(t,this._buildIdpRequest())}_linkToIdToken(t,e){return Sr(t,this._buildIdpRequest(e))}_getReauthenticationResolver(t){return Sr(t,this._buildIdpRequest())}_buildIdpRequest(t){const e={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return t&&(e.idToken=t),e}}function A7(n){return f2(n.auth,new N1(n),n.bypassAuthState)}function R7(n){const{auth:t,user:e}=n;return Q(e,t,"internal-error"),r7(e,new N1(n),n.bypassAuthState)}async function v7(n){const{auth:t,user:e}=n;return Q(e,t,"internal-error"),n7(e,new N1(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class R2{constructor(t,e,r,s,i=!1){this.auth=t,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(e)?e:[e]}execute(){return new Promise(async(t,e)=>{this.pendingPromise={resolve:t,reject:e};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(t){const{urlResponse:e,sessionId:r,postBody:s,tenantId:i,error:o,type:u}=t;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:e,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(u)(c))}catch(h){this.reject(h)}}onError(t){this.reject(t)}getIdpTask(t){switch(t){case"signInViaPopup":case"signInViaRedirect":return A7;case"linkViaPopup":case"linkViaRedirect":return v7;case"reauthViaPopup":case"reauthViaRedirect":return R7;default:Te(this.auth,"internal-error")}}resolve(t){Xe(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(t),this.unregisterAndCleanUp()}reject(t){Xe(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(t),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const C7=new Js(2e3,1e4);async function q5(n,t,e){if(ie(n.app))return Promise.reject(Re(n,"operation-not-supported-in-this-environment"));const r=Bn(n);hp(n,t,P1);const s=A2(r,e);return new Xn(r,"signInViaPopup",t,s).executeNotNull()}class Xn extends R2{constructor(t,e,r,s,i){super(t,e,s,i),this.provider=r,this.authWindow=null,this.pollId=null,Xn.currentPopupAction&&Xn.currentPopupAction.cancel(),Xn.currentPopupAction=this}async executeNotNull(){const t=await this.execute();return Q(t,this.auth,"internal-error"),t}async onExecution(){Xe(this.filter.length===1,"Popup operations only handle one event");const t=b1();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],t),this.authWindow.associatedEvent=t,this.resolver._originValidation(this.auth).catch(e=>{this.reject(e)}),this.resolver._isIframeWebStorageSupported(this.auth,e=>{e||this.reject(Re(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var t;return((t=this.authWindow)==null?void 0:t.associatedEvent)||null}cancel(){this.reject(Re(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Xn.currentPopupAction=null}pollUserCancellation(){const t=()=>{var e,r;if((r=(e=this.authWindow)==null?void 0:e.window)!=null&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Re(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(t,C7.get())};t()}}Xn.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const S7="pendingRedirect",qi=new Map;class P7 extends R2{constructor(t,e,r=!1){super(t,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],e,void 0,r),this.eventId=null}async execute(){let t=qi.get(this.auth._key());if(!t){try{const r=await b7(this.resolver,this.auth)?await super.execute():null;t=()=>Promise.resolve(r)}catch(e){t=()=>Promise.reject(e)}qi.set(this.auth._key(),t)}return this.bypassAuthState||qi.set(this.auth._key(),()=>Promise.resolve(null)),t()}async onAuthEvent(t){if(t.type==="signInViaRedirect")return super.onAuthEvent(t);if(t.type==="unknown"){this.resolve(null);return}if(t.eventId){const e=await this.auth._redirectUserForId(t.eventId);if(e)return this.user=e,super.onAuthEvent(t);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function b7(n,t){const e=k7(t),r=O7(n);if(!await r._isAvailable())return!1;const s=await r._get(e)==="true";return await r._remove(e),s}function N7(n,t){qi.set(n._key(),t)}function O7(n){return He(n._redirectPersistence)}function k7(n){return Bi(S7,n.config.apiKey,n.name)}async function D7(n,t,e=!1){if(ie(n.app))return Promise.reject(ze(n));const r=Bn(n),s=A2(r,t),o=await new P7(r,s,e).execute();return o&&!e&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,t)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const V7=600*1e3;class x7{constructor(t){this.auth=t,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(t){this.consumers.add(t),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,t)&&(this.sendToConsumer(this.queuedRedirectEvent,t),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(t){this.consumers.delete(t)}onEvent(t){if(this.hasEventBeenHandled(t))return!1;let e=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(t,r)&&(e=!0,this.sendToConsumer(t,r),this.saveEventToCache(t))}),this.hasHandledPotentialRedirect||!L7(t)||(this.hasHandledPotentialRedirect=!0,e||(this.queuedRedirectEvent=t,e=!0)),e}sendToConsumer(t,e){var r;if(t.error&&!v2(t)){const s=((r=t.error.code)==null?void 0:r.split("auth/")[1])||"internal-error";e.onError(Re(this.auth,s))}else e.onAuthEvent(t)}isEventForConsumer(t,e){const r=e.eventId===null||!!t.eventId&&t.eventId===e.eventId;return e.filter.includes(t.type)&&r}hasEventBeenHandled(t){return Date.now()-this.lastProcessedEventTime>=V7&&this.cachedEventUids.clear(),this.cachedEventUids.has(el(t))}saveEventToCache(t){this.cachedEventUids.add(el(t)),this.lastProcessedEventTime=Date.now()}}function el(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(t=>t).join("-")}function v2({type:n,error:t}){return n==="unknown"&&(t==null?void 0:t.code)==="auth/no-auth-event"}function L7(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return v2(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function M7(n,t={}){return nn(n,"GET","/v1/projects",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const U7=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,F7=/^https?/;async function B7(n){if(n.config.emulator)return;const{authorizedDomains:t}=await M7(n);for(const e of t)try{if(q7(e))return}catch{}Te(n,"unauthorized-domain")}function q7(n){const t=Zi(),{protocol:e,hostname:r}=new URL(t);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&r===""?e==="chrome-extension:"&&n.replace("chrome-extension://","")===t.replace("chrome-extension://",""):e==="chrome-extension:"&&o.hostname===r}if(!F7.test(e))return!1;if(U7.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $7=new Js(3e4,6e4);function nl(){const n=Ve().___jsl;if(n!=null&&n.H){for(const t of Object.keys(n.H))if(n.H[t].r=n.H[t].r||[],n.H[t].L=n.H[t].L||[],n.H[t].r=[...n.H[t].L],n.CP)for(let e=0;e<n.CP.length;e++)n.CP[e]=null}}function H7(n){return new Promise((t,e)=>{var s,i,o;function r(){nl(),gapi.load("gapi.iframes",{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{nl(),e(Re(n,"network-request-failed"))},timeout:$7.get()})}if((i=(s=Ve().gapi)==null?void 0:s.iframes)!=null&&i.Iframe)t(gapi.iframes.getContext());else if((o=Ve().gapi)!=null&&o.load)r();else{const u=Fp("iframefcb");return Ve()[u]=()=>{gapi.load?r():e(Re(n,"network-request-failed"))},u2(`${Up()}?onload=${u}`).catch(c=>e(c))}}).catch(t=>{throw $i=null,t})}let $i=null;function j7(n){return $i=$i||H7(n),$i}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const G7=new Js(5e3,15e3),z7="__/auth/iframe",W7="emulator/auth/iframe",K7={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Y7=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Q7(n){const t=n.config;Q(t.authDomain,n,"auth-domain-config-required");const e=t.emulator?A1(t,W7):`https://${n.config.authDomain}/${z7}`,r={apiKey:t.apiKey,appName:n.name,v:fr},s=Y7.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${e}?${Xs(r).slice(1)}`}async function X7(n){const t=await j7(n),e=Ve().gapi;return Q(e,n,"internal-error"),t.open({where:document.body,url:Q7(n),messageHandlersFilter:e.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:K7,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=Re(n,"network-request-failed"),u=Ve().setTimeout(()=>{i(o)},G7.get());function c(){Ve().clearTimeout(u),s(r)}r.ping(c).then(c,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const J7={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Z7=500,t4=600,e4="_blank",n4="http://localhost";class rl{constructor(t){this.window=t,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function r4(n,t,e,r=Z7,s=t4){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let u="";const c={...J7,width:r.toString(),height:s.toString(),top:i,left:o},h=Kt().toLowerCase();e&&(u=e2(h)?e4:e),Zh(h)&&(t=t||n4,c.scrollbars="yes");const p=Object.entries(c).reduce((y,[C,P])=>`${y}${C}=${P},`,"");if(bp(h)&&u!=="_self")return s4(t||"",u),new rl(null);const m=window.open(t||"",u,p);Q(m,n,"popup-blocked");try{m.focus()}catch{}return new rl(m)}function s4(n,t){const e=document.createElement("a");e.href=n,e.target=t;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),e.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const i4="__/auth/handler",o4="emulator/auth/handler",a4=encodeURIComponent("fac");async function sl(n,t,e,r,s,i){Q(n.config.authDomain,n,"auth-domain-config-required"),Q(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:e,redirectUrl:r,v:fr,eventId:s};if(t instanceof P1){t.setDefaultLanguage(n.languageCode),o.providerId=t.providerId||"",jd(t.getCustomParameters())||(o.customParameters=JSON.stringify(t.getCustomParameters()));for(const[p,m]of Object.entries({}))o[p]=m}if(t instanceof ti){const p=t.getScopes().filter(m=>m!=="");p.length>0&&(o.scopes=p.join(","))}n.tenantId&&(o.tid=n.tenantId);const u=o;for(const p of Object.keys(u))u[p]===void 0&&delete u[p];const c=await n._getAppCheckToken(),h=c?`#${a4}=${encodeURIComponent(c)}`:"";return`${u4(n)}?${Xs(u).slice(1)}${h}`}function u4({config:n}){return n.emulator?A1(n,o4):`https://${n.authDomain}/${i4}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Va="webStorageSupport";class c4{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=_2,this._completeRedirectFn=D7,this._overrideRedirectResult=N7}async _openPopup(t,e,r,s){var o;Xe((o=this.eventManagers[t._key()])==null?void 0:o.manager,"_initialize() not called before _openPopup()");const i=await sl(t,e,r,Zi(),s);return r4(t,i,b1())}async _openRedirect(t,e,r,s){await this._originValidation(t);const i=await sl(t,e,r,Zi(),s);return d7(i),new Promise(()=>{})}_initialize(t){const e=t._key();if(this.eventManagers[e]){const{manager:s,promise:i}=this.eventManagers[e];return s?Promise.resolve(s):(Xe(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(t);return this.eventManagers[e]={promise:r},r.catch(()=>{delete this.eventManagers[e]}),r}async initAndGetManager(t){const e=await X7(t),r=new x7(t);return e.register("authEvent",s=>(Q(s==null?void 0:s.authEvent,t,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[t._key()]={manager:r},this.iframes[t._key()]=e,r}_isIframeWebStorageSupported(t,e){this.iframes[t._key()].send(Va,{type:Va},s=>{var o;const i=(o=s==null?void 0:s[0])==null?void 0:o[Va];i!==void 0&&e(!!i),Te(t,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(t){const e=t._key();return this.originValidationPromises[e]||(this.originValidationPromises[e]=B7(t)),this.originValidationPromises[e]}get _shouldInitProactively(){return o2()||t2()||v1()}}const l4=c4;var il="@firebase/auth",ol="1.13.3";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class h4{constructor(t){this.auth=t,this.internalListeners=new Map}getUid(){var t;return this.assertAuthConfigured(),((t=this.auth.currentUser)==null?void 0:t.uid)||null}async getToken(t){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(t)}:null}addAuthTokenListener(t){if(this.assertAuthConfigured(),this.internalListeners.has(t))return;const e=this.auth.onIdTokenChanged(r=>{t((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(t,e),this.updateProactiveRefresh()}removeAuthTokenListener(t){this.assertAuthConfigured();const e=this.internalListeners.get(t);e&&(this.internalListeners.delete(t),e(),this.updateProactiveRefresh())}assertAuthConfigured(){Q(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function f4(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function d4(n){ir(new Sn("auth",(t,{options:e})=>{const r=t.getProvider("app").getImmediate(),s=t.getProvider("heartbeat"),i=t.getProvider("app-check-internal"),{apiKey:o,authDomain:u}=r.options;Q(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const c={apiKey:o,authDomain:u,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:a2(n)},h=new xp(r,s,i,c);return jp(h,e),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((t,e,r)=>{t.getProvider("auth-internal").initialize()})),ir(new Sn("auth-internal",t=>{const e=Bn(t.getProvider("auth").getImmediate());return(r=>new h4(r))(e)},"PRIVATE").setInstantiationMode("EXPLICIT")),De(il,ol,f4(n)),De(il,ol,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const p4=300,m4=Uh("authIdTokenMaxAge")||p4;let al=null;const g4=n=>async t=>{const e=t&&await t.getIdTokenResult(),r=e&&(new Date().getTime()-Date.parse(e.issuedAtTime))/1e3;if(r&&r>m4)return;const s=e==null?void 0:e.token;al!==s&&(al=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function $5(n=T1()){const t=vo(n,"auth");if(t.isInitialized())return t.getImmediate();const e=Hp(n,{popupRedirectResolver:l4,persistence:[I7,l7,_2]}),r=Uh("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const o=g4(i.toString());a7(e,o,()=>o(e.currentUser)),o7(e,u=>o(u))}}const s=xh("auth");return s&&Gp(e,`http://${s}`),e}function _4(){var n;return((n=document.getElementsByTagName("head"))==null?void 0:n[0])??document}Lp({loadJS(n){return new Promise((t,e)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=t,r.onerror=s=>{const i=Re("internal-error");i.customData=s,e(i)},r.type="text/javascript",r.charset="UTF-8",_4().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});d4("Browser");var ul=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var An,C2;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(R,E){function w(){}w.prototype=E.prototype,R.F=E.prototype,R.prototype=new w,R.prototype.constructor=R,R.D=function(v,A,b){for(var T=Array(arguments.length-2),ne=2;ne<arguments.length;ne++)T[ne-2]=arguments[ne];return E.prototype[A].apply(v,T)}}function e(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}t(r,e),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(R,E,w){w||(w=0);const v=Array(16);if(typeof E=="string")for(var A=0;A<16;++A)v[A]=E.charCodeAt(w++)|E.charCodeAt(w++)<<8|E.charCodeAt(w++)<<16|E.charCodeAt(w++)<<24;else for(A=0;A<16;++A)v[A]=E[w++]|E[w++]<<8|E[w++]<<16|E[w++]<<24;E=R.g[0],w=R.g[1],A=R.g[2];let b=R.g[3],T;T=E+(b^w&(A^b))+v[0]+3614090360&4294967295,E=w+(T<<7&4294967295|T>>>25),T=b+(A^E&(w^A))+v[1]+3905402710&4294967295,b=E+(T<<12&4294967295|T>>>20),T=A+(w^b&(E^w))+v[2]+606105819&4294967295,A=b+(T<<17&4294967295|T>>>15),T=w+(E^A&(b^E))+v[3]+3250441966&4294967295,w=A+(T<<22&4294967295|T>>>10),T=E+(b^w&(A^b))+v[4]+4118548399&4294967295,E=w+(T<<7&4294967295|T>>>25),T=b+(A^E&(w^A))+v[5]+1200080426&4294967295,b=E+(T<<12&4294967295|T>>>20),T=A+(w^b&(E^w))+v[6]+2821735955&4294967295,A=b+(T<<17&4294967295|T>>>15),T=w+(E^A&(b^E))+v[7]+4249261313&4294967295,w=A+(T<<22&4294967295|T>>>10),T=E+(b^w&(A^b))+v[8]+1770035416&4294967295,E=w+(T<<7&4294967295|T>>>25),T=b+(A^E&(w^A))+v[9]+2336552879&4294967295,b=E+(T<<12&4294967295|T>>>20),T=A+(w^b&(E^w))+v[10]+4294925233&4294967295,A=b+(T<<17&4294967295|T>>>15),T=w+(E^A&(b^E))+v[11]+2304563134&4294967295,w=A+(T<<22&4294967295|T>>>10),T=E+(b^w&(A^b))+v[12]+1804603682&4294967295,E=w+(T<<7&4294967295|T>>>25),T=b+(A^E&(w^A))+v[13]+4254626195&4294967295,b=E+(T<<12&4294967295|T>>>20),T=A+(w^b&(E^w))+v[14]+2792965006&4294967295,A=b+(T<<17&4294967295|T>>>15),T=w+(E^A&(b^E))+v[15]+1236535329&4294967295,w=A+(T<<22&4294967295|T>>>10),T=E+(A^b&(w^A))+v[1]+4129170786&4294967295,E=w+(T<<5&4294967295|T>>>27),T=b+(w^A&(E^w))+v[6]+3225465664&4294967295,b=E+(T<<9&4294967295|T>>>23),T=A+(E^w&(b^E))+v[11]+643717713&4294967295,A=b+(T<<14&4294967295|T>>>18),T=w+(b^E&(A^b))+v[0]+3921069994&4294967295,w=A+(T<<20&4294967295|T>>>12),T=E+(A^b&(w^A))+v[5]+3593408605&4294967295,E=w+(T<<5&4294967295|T>>>27),T=b+(w^A&(E^w))+v[10]+38016083&4294967295,b=E+(T<<9&4294967295|T>>>23),T=A+(E^w&(b^E))+v[15]+3634488961&4294967295,A=b+(T<<14&4294967295|T>>>18),T=w+(b^E&(A^b))+v[4]+3889429448&4294967295,w=A+(T<<20&4294967295|T>>>12),T=E+(A^b&(w^A))+v[9]+568446438&4294967295,E=w+(T<<5&4294967295|T>>>27),T=b+(w^A&(E^w))+v[14]+3275163606&4294967295,b=E+(T<<9&4294967295|T>>>23),T=A+(E^w&(b^E))+v[3]+4107603335&4294967295,A=b+(T<<14&4294967295|T>>>18),T=w+(b^E&(A^b))+v[8]+1163531501&4294967295,w=A+(T<<20&4294967295|T>>>12),T=E+(A^b&(w^A))+v[13]+2850285829&4294967295,E=w+(T<<5&4294967295|T>>>27),T=b+(w^A&(E^w))+v[2]+4243563512&4294967295,b=E+(T<<9&4294967295|T>>>23),T=A+(E^w&(b^E))+v[7]+1735328473&4294967295,A=b+(T<<14&4294967295|T>>>18),T=w+(b^E&(A^b))+v[12]+2368359562&4294967295,w=A+(T<<20&4294967295|T>>>12),T=E+(w^A^b)+v[5]+4294588738&4294967295,E=w+(T<<4&4294967295|T>>>28),T=b+(E^w^A)+v[8]+2272392833&4294967295,b=E+(T<<11&4294967295|T>>>21),T=A+(b^E^w)+v[11]+1839030562&4294967295,A=b+(T<<16&4294967295|T>>>16),T=w+(A^b^E)+v[14]+4259657740&4294967295,w=A+(T<<23&4294967295|T>>>9),T=E+(w^A^b)+v[1]+2763975236&4294967295,E=w+(T<<4&4294967295|T>>>28),T=b+(E^w^A)+v[4]+1272893353&4294967295,b=E+(T<<11&4294967295|T>>>21),T=A+(b^E^w)+v[7]+4139469664&4294967295,A=b+(T<<16&4294967295|T>>>16),T=w+(A^b^E)+v[10]+3200236656&4294967295,w=A+(T<<23&4294967295|T>>>9),T=E+(w^A^b)+v[13]+681279174&4294967295,E=w+(T<<4&4294967295|T>>>28),T=b+(E^w^A)+v[0]+3936430074&4294967295,b=E+(T<<11&4294967295|T>>>21),T=A+(b^E^w)+v[3]+3572445317&4294967295,A=b+(T<<16&4294967295|T>>>16),T=w+(A^b^E)+v[6]+76029189&4294967295,w=A+(T<<23&4294967295|T>>>9),T=E+(w^A^b)+v[9]+3654602809&4294967295,E=w+(T<<4&4294967295|T>>>28),T=b+(E^w^A)+v[12]+3873151461&4294967295,b=E+(T<<11&4294967295|T>>>21),T=A+(b^E^w)+v[15]+530742520&4294967295,A=b+(T<<16&4294967295|T>>>16),T=w+(A^b^E)+v[2]+3299628645&4294967295,w=A+(T<<23&4294967295|T>>>9),T=E+(A^(w|~b))+v[0]+4096336452&4294967295,E=w+(T<<6&4294967295|T>>>26),T=b+(w^(E|~A))+v[7]+1126891415&4294967295,b=E+(T<<10&4294967295|T>>>22),T=A+(E^(b|~w))+v[14]+2878612391&4294967295,A=b+(T<<15&4294967295|T>>>17),T=w+(b^(A|~E))+v[5]+4237533241&4294967295,w=A+(T<<21&4294967295|T>>>11),T=E+(A^(w|~b))+v[12]+1700485571&4294967295,E=w+(T<<6&4294967295|T>>>26),T=b+(w^(E|~A))+v[3]+2399980690&4294967295,b=E+(T<<10&4294967295|T>>>22),T=A+(E^(b|~w))+v[10]+4293915773&4294967295,A=b+(T<<15&4294967295|T>>>17),T=w+(b^(A|~E))+v[1]+2240044497&4294967295,w=A+(T<<21&4294967295|T>>>11),T=E+(A^(w|~b))+v[8]+1873313359&4294967295,E=w+(T<<6&4294967295|T>>>26),T=b+(w^(E|~A))+v[15]+4264355552&4294967295,b=E+(T<<10&4294967295|T>>>22),T=A+(E^(b|~w))+v[6]+2734768916&4294967295,A=b+(T<<15&4294967295|T>>>17),T=w+(b^(A|~E))+v[13]+1309151649&4294967295,w=A+(T<<21&4294967295|T>>>11),T=E+(A^(w|~b))+v[4]+4149444226&4294967295,E=w+(T<<6&4294967295|T>>>26),T=b+(w^(E|~A))+v[11]+3174756917&4294967295,b=E+(T<<10&4294967295|T>>>22),T=A+(E^(b|~w))+v[2]+718787259&4294967295,A=b+(T<<15&4294967295|T>>>17),T=w+(b^(A|~E))+v[9]+3951481745&4294967295,R.g[0]=R.g[0]+E&4294967295,R.g[1]=R.g[1]+(A+(T<<21&4294967295|T>>>11))&4294967295,R.g[2]=R.g[2]+A&4294967295,R.g[3]=R.g[3]+b&4294967295}r.prototype.v=function(R,E){E===void 0&&(E=R.length);const w=E-this.blockSize,v=this.C;let A=this.h,b=0;for(;b<E;){if(A==0)for(;b<=w;)s(this,R,b),b+=this.blockSize;if(typeof R=="string"){for(;b<E;)if(v[A++]=R.charCodeAt(b++),A==this.blockSize){s(this,v),A=0;break}}else for(;b<E;)if(v[A++]=R[b++],A==this.blockSize){s(this,v),A=0;break}}this.h=A,this.o+=E},r.prototype.A=function(){var R=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);R[0]=128;for(var E=1;E<R.length-8;++E)R[E]=0;E=this.o*8;for(var w=R.length-8;w<R.length;++w)R[w]=E&255,E/=256;for(this.v(R),R=Array(16),E=0,w=0;w<4;++w)for(let v=0;v<32;v+=8)R[E++]=this.g[w]>>>v&255;return R};function i(R,E){var w=u;return Object.prototype.hasOwnProperty.call(w,R)?w[R]:w[R]=E(R)}function o(R,E){this.h=E;const w=[];let v=!0;for(let A=R.length-1;A>=0;A--){const b=R[A]|0;v&&b==E||(w[A]=b,v=!1)}this.g=w}var u={};function c(R){return-128<=R&&R<128?i(R,function(E){return new o([E|0],E<0?-1:0)}):new o([R|0],R<0?-1:0)}function h(R){if(isNaN(R)||!isFinite(R))return m;if(R<0)return M(h(-R));const E=[];let w=1;for(let v=0;R>=w;v++)E[v]=R/w|0,w*=4294967296;return new o(E,0)}function p(R,E){if(R.length==0)throw Error("number format error: empty string");if(E=E||10,E<2||36<E)throw Error("radix out of range: "+E);if(R.charAt(0)=="-")return M(p(R.substring(1),E));if(R.indexOf("-")>=0)throw Error('number format error: interior "-" character');const w=h(Math.pow(E,8));let v=m;for(let b=0;b<R.length;b+=8){var A=Math.min(8,R.length-b);const T=parseInt(R.substring(b,b+A),E);A<8?(A=h(Math.pow(E,A)),v=v.j(A).add(h(T))):(v=v.j(w),v=v.add(h(T)))}return v}var m=c(0),y=c(1),C=c(16777216);n=o.prototype,n.m=function(){if(L(this))return-M(this).m();let R=0,E=1;for(let w=0;w<this.g.length;w++){const v=this.i(w);R+=(v>=0?v:4294967296+v)*E,E*=4294967296}return R},n.toString=function(R){if(R=R||10,R<2||36<R)throw Error("radix out of range: "+R);if(P(this))return"0";if(L(this))return"-"+M(this).toString(R);const E=h(Math.pow(R,6));var w=this;let v="";for(;;){const A=ht(w,E).g;w=W(w,A.j(E));let b=((w.g.length>0?w.g[0]:w.h)>>>0).toString(R);if(w=A,P(w))return b+v;for(;b.length<6;)b="0"+b;v=b+v}},n.i=function(R){return R<0?0:R<this.g.length?this.g[R]:this.h};function P(R){if(R.h!=0)return!1;for(let E=0;E<R.g.length;E++)if(R.g[E]!=0)return!1;return!0}function L(R){return R.h==-1}n.l=function(R){return R=W(this,R),L(R)?-1:P(R)?0:1};function M(R){const E=R.g.length,w=[];for(let v=0;v<E;v++)w[v]=~R.g[v];return new o(w,~R.h).add(y)}n.abs=function(){return L(this)?M(this):this},n.add=function(R){const E=Math.max(this.g.length,R.g.length),w=[];let v=0;for(let A=0;A<=E;A++){let b=v+(this.i(A)&65535)+(R.i(A)&65535),T=(b>>>16)+(this.i(A)>>>16)+(R.i(A)>>>16);v=T>>>16,b&=65535,T&=65535,w[A]=T<<16|b}return new o(w,w[w.length-1]&-2147483648?-1:0)};function W(R,E){return R.add(M(E))}n.j=function(R){if(P(this)||P(R))return m;if(L(this))return L(R)?M(this).j(M(R)):M(M(this).j(R));if(L(R))return M(this.j(M(R)));if(this.l(C)<0&&R.l(C)<0)return h(this.m()*R.m());const E=this.g.length+R.g.length,w=[];for(var v=0;v<2*E;v++)w[v]=0;for(v=0;v<this.g.length;v++)for(let A=0;A<R.g.length;A++){const b=this.i(v)>>>16,T=this.i(v)&65535,ne=R.i(A)>>>16,Hn=R.i(A)&65535;w[2*v+2*A]+=T*Hn,et(w,2*v+2*A),w[2*v+2*A+1]+=b*Hn,et(w,2*v+2*A+1),w[2*v+2*A+1]+=T*ne,et(w,2*v+2*A+1),w[2*v+2*A+2]+=b*ne,et(w,2*v+2*A+2)}for(R=0;R<E;R++)w[R]=w[2*R+1]<<16|w[2*R];for(R=E;R<2*E;R++)w[R]=0;return new o(w,0)};function et(R,E){for(;(R[E]&65535)!=R[E];)R[E+1]+=R[E]>>>16,R[E]&=65535,E++}function st(R,E){this.g=R,this.h=E}function ht(R,E){if(P(E))throw Error("division by zero");if(P(R))return new st(m,m);if(L(R))return E=ht(M(R),E),new st(M(E.g),M(E.h));if(L(E))return E=ht(R,M(E)),new st(M(E.g),E.h);if(R.g.length>30){if(L(R)||L(E))throw Error("slowDivide_ only works with positive integers.");for(var w=y,v=E;v.l(R)<=0;)w=yt(w),v=yt(v);var A=Tt(w,1),b=Tt(v,1);for(v=Tt(v,2),w=Tt(w,2);!P(v);){var T=b.add(v);T.l(R)<=0&&(A=A.add(w),b=T),v=Tt(v,1),w=Tt(w,1)}return E=W(R,A.j(E)),new st(A,E)}for(A=m;R.l(E)>=0;){for(w=Math.max(1,Math.floor(R.m()/E.m())),v=Math.ceil(Math.log(w)/Math.LN2),v=v<=48?1:Math.pow(2,v-48),b=h(w),T=b.j(E);L(T)||T.l(R)>0;)w-=v,b=h(w),T=b.j(E);P(b)&&(b=y),A=A.add(b),R=W(R,T)}return new st(A,R)}n.B=function(R){return ht(this,R).h},n.and=function(R){const E=Math.max(this.g.length,R.g.length),w=[];for(let v=0;v<E;v++)w[v]=this.i(v)&R.i(v);return new o(w,this.h&R.h)},n.or=function(R){const E=Math.max(this.g.length,R.g.length),w=[];for(let v=0;v<E;v++)w[v]=this.i(v)|R.i(v);return new o(w,this.h|R.h)},n.xor=function(R){const E=Math.max(this.g.length,R.g.length),w=[];for(let v=0;v<E;v++)w[v]=this.i(v)^R.i(v);return new o(w,this.h^R.h)};function yt(R){const E=R.g.length+1,w=[];for(let v=0;v<E;v++)w[v]=R.i(v)<<1|R.i(v-1)>>>31;return new o(w,R.h)}function Tt(R,E){const w=E>>5;E%=32;const v=R.g.length-w,A=[];for(let b=0;b<v;b++)A[b]=E>0?R.i(b+w)>>>E|R.i(b+w+1)<<32-E:R.i(b+w);return new o(A,R.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,C2=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.B,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=h,o.fromString=p,An=o}).apply(typeof ul<"u"?ul:typeof self<"u"?self:typeof window<"u"?window:{});var Ni=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var S2,ms,P2,Hi,Ja,b2,N2,O2;(function(){var n,t=Object.defineProperty;function e(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof Ni=="object"&&Ni];for(var l=0;l<a.length;++l){var f=a[l];if(f&&f.Math==Math)return f}throw Error("Cannot find global object")}var r=e(this);function s(a,l){if(l)t:{var f=r;a=a.split(".");for(var g=0;g<a.length-1;g++){var S=a[g];if(!(S in f))break t;f=f[S]}a=a[a.length-1],g=f[a],l=l(g),l!=g&&l!=null&&t(f,a,{configurable:!0,writable:!0,value:l})}}s("Symbol.dispose",function(a){return a||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(a){return a||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(a){return a||function(l){var f=[],g;for(g in l)Object.prototype.hasOwnProperty.call(l,g)&&f.push([g,l[g]]);return f}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},o=this||self;function u(a){var l=typeof a;return l=="object"&&a!=null||l=="function"}function c(a,l,f){return a.call.apply(a.bind,arguments)}function h(a,l,f){return h=c,h.apply(null,arguments)}function p(a,l){var f=Array.prototype.slice.call(arguments,1);return function(){var g=f.slice();return g.push.apply(g,arguments),a.apply(this,g)}}function m(a,l){function f(){}f.prototype=l.prototype,a.Z=l.prototype,a.prototype=new f,a.prototype.constructor=a,a.Ob=function(g,S,O){for(var F=Array(arguments.length-2),rt=2;rt<arguments.length;rt++)F[rt-2]=arguments[rt];return l.prototype[S].apply(g,F)}}var y=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?a=>a&&AsyncContext.Snapshot.wrap(a):a=>a;function C(a){const l=a.length;if(l>0){const f=Array(l);for(let g=0;g<l;g++)f[g]=a[g];return f}return[]}function P(a,l){for(let g=1;g<arguments.length;g++){const S=arguments[g];var f=typeof S;if(f=f!="object"?f:S?Array.isArray(S)?"array":f:"null",f=="array"||f=="object"&&typeof S.length=="number"){f=a.length||0;const O=S.length||0;a.length=f+O;for(let F=0;F<O;F++)a[f+F]=S[F]}else a.push(S)}}class L{constructor(l,f){this.i=l,this.j=f,this.h=0,this.g=null}get(){let l;return this.h>0?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function M(a){o.setTimeout(()=>{throw a},0)}function W(){var a=R;let l=null;return a.g&&(l=a.g,a.g=a.g.next,a.g||(a.h=null),l.next=null),l}class et{constructor(){this.h=this.g=null}add(l,f){const g=st.get();g.set(l,f),this.h?this.h.next=g:this.g=g,this.h=g}}var st=new L(()=>new ht,a=>a.reset());class ht{constructor(){this.next=this.g=this.h=null}set(l,f){this.h=l,this.g=f,this.next=null}reset(){this.next=this.g=this.h=null}}let yt,Tt=!1,R=new et,E=()=>{const a=Promise.resolve(void 0);yt=()=>{a.then(w)}};function w(){for(var a;a=W();){try{a.h.call(a.g)}catch(f){M(f)}var l=st;l.j(a),l.h<100&&(l.h++,a.next=l.g,l.g=a)}Tt=!1}function v(){this.u=this.u,this.C=this.C}v.prototype.u=!1,v.prototype.dispose=function(){this.u||(this.u=!0,this.N())},v.prototype[Symbol.dispose]=function(){this.dispose()},v.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function A(a,l){this.type=a,this.g=this.target=l,this.defaultPrevented=!1}A.prototype.h=function(){this.defaultPrevented=!0};var b=(function(){if(!o.addEventListener||!Object.defineProperty)return!1;var a=!1,l=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const f=()=>{};o.addEventListener("test",f,l),o.removeEventListener("test",f,l)}catch{}return a})();function T(a){return/^[\s\xa0]*$/.test(a)}function ne(a,l){A.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a&&this.init(a,l)}m(ne,A),ne.prototype.init=function(a,l){const f=this.type=a.type,g=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;this.target=a.target||a.srcElement,this.g=l,l=a.relatedTarget,l||(f=="mouseover"?l=a.fromElement:f=="mouseout"&&(l=a.toElement)),this.relatedTarget=l,g?(this.clientX=g.clientX!==void 0?g.clientX:g.pageX,this.clientY=g.clientY!==void 0?g.clientY:g.pageY,this.screenX=g.screenX||0,this.screenY=g.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=a.pointerType,this.state=a.state,this.i=a,a.defaultPrevented&&ne.Z.h.call(this)},ne.prototype.h=function(){ne.Z.h.call(this);const a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var Hn="closure_listenable_"+(Math.random()*1e6|0),jf=0;function Gf(a,l,f,g,S){this.listener=a,this.proxy=null,this.src=l,this.type=f,this.capture=!!g,this.ha=S,this.key=++jf,this.da=this.fa=!1}function pi(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function mi(a,l,f){for(const g in a)l.call(f,a[g],g,a)}function zf(a,l){for(const f in a)l.call(void 0,a[f],f,a)}function Ou(a){const l={};for(const f in a)l[f]=a[f];return l}const ku="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Du(a,l){let f,g;for(let S=1;S<arguments.length;S++){g=arguments[S];for(f in g)a[f]=g[f];for(let O=0;O<ku.length;O++)f=ku[O],Object.prototype.hasOwnProperty.call(g,f)&&(a[f]=g[f])}}function gi(a){this.src=a,this.g={},this.h=0}gi.prototype.add=function(a,l,f,g,S){const O=a.toString();a=this.g[O],a||(a=this.g[O]=[],this.h++);const F=ia(a,l,g,S);return F>-1?(l=a[F],f||(l.fa=!1)):(l=new Gf(l,this.src,O,!!g,S),l.fa=f,a.push(l)),l};function sa(a,l){const f=l.type;if(f in a.g){var g=a.g[f],S=Array.prototype.indexOf.call(g,l,void 0),O;(O=S>=0)&&Array.prototype.splice.call(g,S,1),O&&(pi(l),a.g[f].length==0&&(delete a.g[f],a.h--))}}function ia(a,l,f,g){for(let S=0;S<a.length;++S){const O=a[S];if(!O.da&&O.listener==l&&O.capture==!!f&&O.ha==g)return S}return-1}var oa="closure_lm_"+(Math.random()*1e6|0),aa={};function Vu(a,l,f,g,S){if(Array.isArray(l)){for(let O=0;O<l.length;O++)Vu(a,l[O],f,g,S);return null}return f=Mu(f),a&&a[Hn]?a.J(l,f,u(g)?!!g.capture:!1,S):Wf(a,l,f,!1,g,S)}function Wf(a,l,f,g,S,O){if(!l)throw Error("Invalid event type");const F=u(S)?!!S.capture:!!S;let rt=ca(a);if(rt||(a[oa]=rt=new gi(a)),f=rt.add(l,f,g,F,O),f.proxy)return f;if(g=Kf(),f.proxy=g,g.src=a,g.listener=f,a.addEventListener)b||(S=F),S===void 0&&(S=!1),a.addEventListener(l.toString(),g,S);else if(a.attachEvent)a.attachEvent(Lu(l.toString()),g);else if(a.addListener&&a.removeListener)a.addListener(g);else throw Error("addEventListener and attachEvent are unavailable.");return f}function Kf(){function a(f){return l.call(a.src,a.listener,f)}const l=Yf;return a}function xu(a,l,f,g,S){if(Array.isArray(l))for(var O=0;O<l.length;O++)xu(a,l[O],f,g,S);else g=u(g)?!!g.capture:!!g,f=Mu(f),a&&a[Hn]?(a=a.i,O=String(l).toString(),O in a.g&&(l=a.g[O],f=ia(l,f,g,S),f>-1&&(pi(l[f]),Array.prototype.splice.call(l,f,1),l.length==0&&(delete a.g[O],a.h--)))):a&&(a=ca(a))&&(l=a.g[l.toString()],a=-1,l&&(a=ia(l,f,g,S)),(f=a>-1?l[a]:null)&&ua(f))}function ua(a){if(typeof a!="number"&&a&&!a.da){var l=a.src;if(l&&l[Hn])sa(l.i,a);else{var f=a.type,g=a.proxy;l.removeEventListener?l.removeEventListener(f,g,a.capture):l.detachEvent?l.detachEvent(Lu(f),g):l.addListener&&l.removeListener&&l.removeListener(g),(f=ca(l))?(sa(f,a),f.h==0&&(f.src=null,l[oa]=null)):pi(a)}}}function Lu(a){return a in aa?aa[a]:aa[a]="on"+a}function Yf(a,l){if(a.da)a=!0;else{l=new ne(l,this);const f=a.listener,g=a.ha||a.src;a.fa&&ua(a),a=f.call(g,l)}return a}function ca(a){return a=a[oa],a instanceof gi?a:null}var la="__closure_events_fn_"+(Math.random()*1e9>>>0);function Mu(a){return typeof a=="function"?a:(a[la]||(a[la]=function(l){return a.handleEvent(l)}),a[la])}function $t(){v.call(this),this.i=new gi(this),this.M=this,this.G=null}m($t,v),$t.prototype[Hn]=!0,$t.prototype.removeEventListener=function(a,l,f,g){xu(this,a,l,f,g)};function Qt(a,l){var f,g=a.G;if(g)for(f=[];g;g=g.G)f.push(g);if(a=a.M,g=l.type||l,typeof l=="string")l=new A(l,a);else if(l instanceof A)l.target=l.target||a;else{var S=l;l=new A(g,a),Du(l,S)}S=!0;let O,F;if(f)for(F=f.length-1;F>=0;F--)O=l.g=f[F],S=_i(O,g,!0,l)&&S;if(O=l.g=a,S=_i(O,g,!0,l)&&S,S=_i(O,g,!1,l)&&S,f)for(F=0;F<f.length;F++)O=l.g=f[F],S=_i(O,g,!1,l)&&S}$t.prototype.N=function(){if($t.Z.N.call(this),this.i){var a=this.i;for(const l in a.g){const f=a.g[l];for(let g=0;g<f.length;g++)pi(f[g]);delete a.g[l],a.h--}}this.G=null},$t.prototype.J=function(a,l,f,g){return this.i.add(String(a),l,!1,f,g)},$t.prototype.K=function(a,l,f,g){return this.i.add(String(a),l,!0,f,g)};function _i(a,l,f,g){if(l=a.i.g[String(l)],!l)return!0;l=l.concat();let S=!0;for(let O=0;O<l.length;++O){const F=l[O];if(F&&!F.da&&F.capture==f){const rt=F.listener,Vt=F.ha||F.src;F.fa&&sa(a.i,F),S=rt.call(Vt,g)!==!1&&S}}return S&&!g.defaultPrevented}function Qf(a,l){if(typeof a!="function")if(a&&typeof a.handleEvent=="function")a=h(a.handleEvent,a);else throw Error("Invalid listener argument");return Number(l)>2147483647?-1:o.setTimeout(a,l||0)}function Uu(a){a.g=Qf(()=>{a.g=null,a.i&&(a.i=!1,Uu(a))},a.l);const l=a.h;a.h=null,a.m.apply(null,l)}class Xf extends v{constructor(l,f){super(),this.m=l,this.l=f,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:Uu(this)}N(){super.N(),this.g&&(o.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Kr(a){v.call(this),this.h=a,this.g={}}m(Kr,v);var Fu=[];function Bu(a){mi(a.g,function(l,f){this.g.hasOwnProperty(f)&&ua(l)},a),a.g={}}Kr.prototype.N=function(){Kr.Z.N.call(this),Bu(this)},Kr.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var ha=o.JSON.stringify,Jf=o.JSON.parse,Zf=class{stringify(a){return o.JSON.stringify(a,void 0)}parse(a){return o.JSON.parse(a,void 0)}};function qu(){}function $u(){}var Yr={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function fa(){A.call(this,"d")}m(fa,A);function da(){A.call(this,"c")}m(da,A);var jn={},Hu=null;function Ei(){return Hu=Hu||new $t}jn.Ia="serverreachability";function ju(a){A.call(this,jn.Ia,a)}m(ju,A);function Qr(a){const l=Ei();Qt(l,new ju(l))}jn.STAT_EVENT="statevent";function Gu(a,l){A.call(this,jn.STAT_EVENT,a),this.stat=l}m(Gu,A);function Xt(a){const l=Ei();Qt(l,new Gu(l,a))}jn.Ja="timingevent";function zu(a,l){A.call(this,jn.Ja,a),this.size=l}m(zu,A);function Xr(a,l){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return o.setTimeout(function(){a()},l)}function Jr(){this.g=!0}Jr.prototype.ua=function(){this.g=!1};function td(a,l,f,g,S,O){a.info(function(){if(a.g)if(O){var F="",rt=O.split("&");for(let dt=0;dt<rt.length;dt++){var Vt=rt[dt].split("=");if(Vt.length>1){const Mt=Vt[0];Vt=Vt[1];const Pe=Mt.split("_");F=Pe.length>=2&&Pe[1]=="type"?F+(Mt+"="+Vt+"&"):F+(Mt+"=redacted&")}}}else F=null;else F=O;return"XMLHTTP REQ ("+g+") [attempt "+S+"]: "+l+`
`+f+`
`+F})}function ed(a,l,f,g,S,O,F){a.info(function(){return"XMLHTTP RESP ("+g+") [ attempt "+S+"]: "+l+`
`+f+`
`+O+" "+F})}function gr(a,l,f,g){a.info(function(){return"XMLHTTP TEXT ("+l+"): "+rd(a,f)+(g?" "+g:"")})}function nd(a,l){a.info(function(){return"TIMEOUT: "+l})}Jr.prototype.info=function(){};function rd(a,l){if(!a.g)return l;if(!l)return null;try{const O=JSON.parse(l);if(O){for(a=0;a<O.length;a++)if(Array.isArray(O[a])){var f=O[a];if(!(f.length<2)){var g=f[1];if(Array.isArray(g)&&!(g.length<1)){var S=g[0];if(S!="noop"&&S!="stop"&&S!="close")for(let F=1;F<g.length;F++)g[F]=""}}}}return ha(O)}catch{return l}}var yi={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Wu={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},Ku;function pa(){}m(pa,qu),pa.prototype.g=function(){return new XMLHttpRequest},Ku=new pa;function Zr(a){return encodeURIComponent(String(a))}function sd(a){var l=1;a=a.split(":");const f=[];for(;l>0&&a.length;)f.push(a.shift()),l--;return a.length&&f.push(a.join(":")),f}function sn(a,l,f,g){this.j=a,this.i=l,this.l=f,this.S=g||1,this.V=new Kr(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Yu}function Yu(){this.i=null,this.g="",this.h=!1}var Qu={},ma={};function ga(a,l,f){a.M=1,a.A=wi(Se(l)),a.u=f,a.R=!0,Xu(a,null)}function Xu(a,l){a.F=Date.now(),Ti(a),a.B=Se(a.A);var f=a.B,g=a.S;Array.isArray(g)||(g=[String(g)]),lc(f.i,"t",g),a.C=0,f=a.j.L,a.h=new Yu,a.g=Pc(a.j,f?l:null,!a.u),a.P>0&&(a.O=new Xf(h(a.Y,a,a.g),a.P)),l=a.V,f=a.g,g=a.ba;var S="readystatechange";Array.isArray(S)||(S&&(Fu[0]=S.toString()),S=Fu);for(let O=0;O<S.length;O++){const F=Vu(f,S[O],g||l.handleEvent,!1,l.h||l);if(!F)break;l.g[F.key]=F}l=a.J?Ou(a.J):{},a.u?(a.v||(a.v="POST"),l["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.B,a.v,a.u,l)):(a.v="GET",a.g.ea(a.B,a.v,null,l)),Qr(),td(a.i,a.v,a.B,a.l,a.S,a.u)}sn.prototype.ba=function(a){a=a.target;const l=this.O;l&&un(a)==3?l.j():this.Y(a)},sn.prototype.Y=function(a){try{if(a==this.g)t:{const rt=un(this.g),Vt=this.g.ya(),dt=this.g.ca();if(!(rt<3)&&(rt!=3||this.g&&(this.h.h||this.g.la()||_c(this.g)))){this.K||rt!=4||Vt==7||(Vt==8||dt<=0?Qr(3):Qr(2)),_a(this);var l=this.g.ca();this.X=l;var f=id(this);if(this.o=l==200,ed(this.i,this.v,this.B,this.l,this.S,rt,l),this.o){if(this.U&&!this.L){e:{if(this.g){var g,S=this.g;if((g=S.g?S.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!T(g)){var O=g;break e}}O=null}if(a=O)gr(this.i,this.l,a,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,Ea(this,a);else{this.o=!1,this.m=3,Xt(12),Gn(this),ts(this);break t}}if(this.R){a=!0;let Mt;for(;!this.K&&this.C<f.length;)if(Mt=od(this,f),Mt==ma){rt==4&&(this.m=4,Xt(14),a=!1),gr(this.i,this.l,null,"[Incomplete Response]");break}else if(Mt==Qu){this.m=4,Xt(15),gr(this.i,this.l,f,"[Invalid Chunk]"),a=!1;break}else gr(this.i,this.l,Mt,null),Ea(this,Mt);if(Ju(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),rt!=4||f.length!=0||this.h.h||(this.m=1,Xt(16),a=!1),this.o=this.o&&a,!a)gr(this.i,this.l,f,"[Invalid Chunked Response]"),Gn(this),ts(this);else if(f.length>0&&!this.W){this.W=!0;var F=this.j;F.g==this&&F.aa&&!F.P&&(F.j.info("Great, no buffering proxy detected. Bytes received: "+f.length),Ca(F),F.P=!0,Xt(11))}}else gr(this.i,this.l,f,null),Ea(this,f);rt==4&&Gn(this),this.o&&!this.K&&(rt==4?Rc(this.j,this):(this.o=!1,Ti(this)))}else Td(this.g),l==400&&f.indexOf("Unknown SID")>0?(this.m=3,Xt(12)):(this.m=0,Xt(13)),Gn(this),ts(this)}}}catch{}finally{}};function id(a){if(!Ju(a))return a.g.la();const l=_c(a.g);if(l==="")return"";let f="";const g=l.length,S=un(a.g)==4;if(!a.h.i){if(typeof TextDecoder>"u")return Gn(a),ts(a),"";a.h.i=new o.TextDecoder}for(let O=0;O<g;O++)a.h.h=!0,f+=a.h.i.decode(l[O],{stream:!(S&&O==g-1)});return l.length=0,a.h.g+=f,a.C=0,a.h.g}function Ju(a){return a.g?a.v=="GET"&&a.M!=2&&a.j.Aa:!1}function od(a,l){var f=a.C,g=l.indexOf(`
`,f);return g==-1?ma:(f=Number(l.substring(f,g)),isNaN(f)?Qu:(g+=1,g+f>l.length?ma:(l=l.slice(g,g+f),a.C=g+f,l)))}sn.prototype.cancel=function(){this.K=!0,Gn(this)};function Ti(a){a.T=Date.now()+a.H,Zu(a,a.H)}function Zu(a,l){if(a.D!=null)throw Error("WatchDog timer not null");a.D=Xr(h(a.aa,a),l)}function _a(a){a.D&&(o.clearTimeout(a.D),a.D=null)}sn.prototype.aa=function(){this.D=null;const a=Date.now();a-this.T>=0?(nd(this.i,this.B),this.M!=2&&(Qr(),Xt(17)),Gn(this),this.m=2,ts(this)):Zu(this,this.T-a)};function ts(a){a.j.I==0||a.K||Rc(a.j,a)}function Gn(a){_a(a);var l=a.O;l&&typeof l.dispose=="function"&&l.dispose(),a.O=null,Bu(a.V),a.g&&(l=a.g,a.g=null,l.abort(),l.dispose())}function Ea(a,l){try{var f=a.j;if(f.I!=0&&(f.g==a||ya(f.h,a))){if(!a.L&&ya(f.h,a)&&f.I==3){try{var g=f.Ba.g.parse(l)}catch{g=null}if(Array.isArray(g)&&g.length==3){var S=g;if(S[0]==0){t:if(!f.v){if(f.g)if(f.g.F+3e3<a.F)Ci(f),Ri(f);else break t;va(f),Xt(18)}}else f.xa=S[1],0<f.xa-f.K&&S[2]<37500&&f.F&&f.A==0&&!f.C&&(f.C=Xr(h(f.Va,f),6e3));nc(f.h)<=1&&f.ta&&(f.ta=void 0)}else Wn(f,11)}else if((a.L||f.g==a)&&Ci(f),!T(l))for(S=f.Ba.g.parse(l),l=0;l<S.length;l++){let dt=S[l];const Mt=dt[0];if(!(Mt<=f.K))if(f.K=Mt,dt=dt[1],f.I==2)if(dt[0]=="c"){f.M=dt[1],f.ba=dt[2];const Pe=dt[3];Pe!=null&&(f.ka=Pe,f.j.info("VER="+f.ka));const Kn=dt[4];Kn!=null&&(f.za=Kn,f.j.info("SVER="+f.za));const cn=dt[5];cn!=null&&typeof cn=="number"&&cn>0&&(g=1.5*cn,f.O=g,f.j.info("backChannelRequestTimeoutMs_="+g)),g=f;const ln=a.g;if(ln){const Pi=ln.g?ln.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Pi){var O=g.h;O.g||Pi.indexOf("spdy")==-1&&Pi.indexOf("quic")==-1&&Pi.indexOf("h2")==-1||(O.j=O.l,O.g=new Set,O.h&&(Ta(O,O.h),O.h=null))}if(g.G){const Sa=ln.g?ln.g.getResponseHeader("X-HTTP-Session-Id"):null;Sa&&(g.wa=Sa,pt(g.J,g.G,Sa))}}f.I=3,f.l&&f.l.ra(),f.aa&&(f.T=Date.now()-a.F,f.j.info("Handshake RTT: "+f.T+"ms")),g=f;var F=a;if(g.na=Sc(g,g.L?g.ba:null,g.W),F.L){rc(g.h,F);var rt=F,Vt=g.O;Vt&&(rt.H=Vt),rt.D&&(_a(rt),Ti(rt)),g.g=F}else Ic(g);f.i.length>0&&vi(f)}else dt[0]!="stop"&&dt[0]!="close"||Wn(f,7);else f.I==3&&(dt[0]=="stop"||dt[0]=="close"?dt[0]=="stop"?Wn(f,7):Ra(f):dt[0]!="noop"&&f.l&&f.l.qa(dt),f.A=0)}}Qr(4)}catch{}}var ad=class{constructor(a,l){this.g=a,this.map=l}};function tc(a){this.l=a||10,o.PerformanceNavigationTiming?(a=o.performance.getEntriesByType("navigation"),a=a.length>0&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(o.chrome&&o.chrome.loadTimes&&o.chrome.loadTimes()&&o.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function ec(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function nc(a){return a.h?1:a.g?a.g.size:0}function ya(a,l){return a.h?a.h==l:a.g?a.g.has(l):!1}function Ta(a,l){a.g?a.g.add(l):a.h=l}function rc(a,l){a.h&&a.h==l?a.h=null:a.g&&a.g.has(l)&&a.g.delete(l)}tc.prototype.cancel=function(){if(this.i=sc(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function sc(a){if(a.h!=null)return a.i.concat(a.h.G);if(a.g!=null&&a.g.size!==0){let l=a.i;for(const f of a.g.values())l=l.concat(f.G);return l}return C(a.i)}var ic=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function ud(a,l){if(a){a=a.split("&");for(let f=0;f<a.length;f++){const g=a[f].indexOf("=");let S,O=null;g>=0?(S=a[f].substring(0,g),O=a[f].substring(g+1)):S=a[f],l(S,O?decodeURIComponent(O.replace(/\+/g," ")):"")}}}function on(a){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let l;a instanceof on?(this.l=a.l,es(this,a.j),this.o=a.o,this.g=a.g,ns(this,a.u),this.h=a.h,wa(this,hc(a.i)),this.m=a.m):a&&(l=String(a).match(ic))?(this.l=!1,es(this,l[1]||"",!0),this.o=rs(l[2]||""),this.g=rs(l[3]||"",!0),ns(this,l[4]),this.h=rs(l[5]||"",!0),wa(this,l[6]||"",!0),this.m=rs(l[7]||"")):(this.l=!1,this.i=new is(null,this.l))}on.prototype.toString=function(){const a=[];var l=this.j;l&&a.push(ss(l,oc,!0),":");var f=this.g;return(f||l=="file")&&(a.push("//"),(l=this.o)&&a.push(ss(l,oc,!0),"@"),a.push(Zr(f).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),f=this.u,f!=null&&a.push(":",String(f))),(f=this.h)&&(this.g&&f.charAt(0)!="/"&&a.push("/"),a.push(ss(f,f.charAt(0)=="/"?hd:ld,!0))),(f=this.i.toString())&&a.push("?",f),(f=this.m)&&a.push("#",ss(f,dd)),a.join("")},on.prototype.resolve=function(a){const l=Se(this);let f=!!a.j;f?es(l,a.j):f=!!a.o,f?l.o=a.o:f=!!a.g,f?l.g=a.g:f=a.u!=null;var g=a.h;if(f)ns(l,a.u);else if(f=!!a.h){if(g.charAt(0)!="/")if(this.g&&!this.h)g="/"+g;else{var S=l.h.lastIndexOf("/");S!=-1&&(g=l.h.slice(0,S+1)+g)}if(S=g,S==".."||S==".")g="";else if(S.indexOf("./")!=-1||S.indexOf("/.")!=-1){g=S.lastIndexOf("/",0)==0,S=S.split("/");const O=[];for(let F=0;F<S.length;){const rt=S[F++];rt=="."?g&&F==S.length&&O.push(""):rt==".."?((O.length>1||O.length==1&&O[0]!="")&&O.pop(),g&&F==S.length&&O.push("")):(O.push(rt),g=!0)}g=O.join("/")}else g=S}return f?l.h=g:f=a.i.toString()!=="",f?wa(l,hc(a.i)):f=!!a.m,f&&(l.m=a.m),l};function Se(a){return new on(a)}function es(a,l,f){a.j=f?rs(l,!0):l,a.j&&(a.j=a.j.replace(/:$/,""))}function ns(a,l){if(l){if(l=Number(l),isNaN(l)||l<0)throw Error("Bad port number "+l);a.u=l}else a.u=null}function wa(a,l,f){l instanceof is?(a.i=l,pd(a.i,a.l)):(f||(l=ss(l,fd)),a.i=new is(l,a.l))}function pt(a,l,f){a.i.set(l,f)}function wi(a){return pt(a,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),a}function rs(a,l){return a?l?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function ss(a,l,f){return typeof a=="string"?(a=encodeURI(a).replace(l,cd),f&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function cd(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var oc=/[#\/\?@]/g,ld=/[#\?:]/g,hd=/[#\?]/g,fd=/[#\?@]/g,dd=/#/g;function is(a,l){this.h=this.g=null,this.i=a||null,this.j=!!l}function zn(a){a.g||(a.g=new Map,a.h=0,a.i&&ud(a.i,function(l,f){a.add(decodeURIComponent(l.replace(/\+/g," ")),f)}))}n=is.prototype,n.add=function(a,l){zn(this),this.i=null,a=_r(this,a);let f=this.g.get(a);return f||this.g.set(a,f=[]),f.push(l),this.h+=1,this};function ac(a,l){zn(a),l=_r(a,l),a.g.has(l)&&(a.i=null,a.h-=a.g.get(l).length,a.g.delete(l))}function uc(a,l){return zn(a),l=_r(a,l),a.g.has(l)}n.forEach=function(a,l){zn(this),this.g.forEach(function(f,g){f.forEach(function(S){a.call(l,S,g,this)},this)},this)};function cc(a,l){zn(a);let f=[];if(typeof l=="string")uc(a,l)&&(f=f.concat(a.g.get(_r(a,l))));else for(a=Array.from(a.g.values()),l=0;l<a.length;l++)f=f.concat(a[l]);return f}n.set=function(a,l){return zn(this),this.i=null,a=_r(this,a),uc(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[l]),this.h+=1,this},n.get=function(a,l){return a?(a=cc(this,a),a.length>0?String(a[0]):l):l};function lc(a,l,f){ac(a,l),f.length>0&&(a.i=null,a.g.set(_r(a,l),C(f)),a.h+=f.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],l=Array.from(this.g.keys());for(let g=0;g<l.length;g++){var f=l[g];const S=Zr(f);f=cc(this,f);for(let O=0;O<f.length;O++){let F=S;f[O]!==""&&(F+="="+Zr(f[O])),a.push(F)}}return this.i=a.join("&")};function hc(a){const l=new is;return l.i=a.i,a.g&&(l.g=new Map(a.g),l.h=a.h),l}function _r(a,l){return l=String(l),a.j&&(l=l.toLowerCase()),l}function pd(a,l){l&&!a.j&&(zn(a),a.i=null,a.g.forEach(function(f,g){const S=g.toLowerCase();g!=S&&(ac(this,g),lc(this,S,f))},a)),a.j=l}function md(a,l){const f=new Jr;if(o.Image){const g=new Image;g.onload=p(an,f,"TestLoadImage: loaded",!0,l,g),g.onerror=p(an,f,"TestLoadImage: error",!1,l,g),g.onabort=p(an,f,"TestLoadImage: abort",!1,l,g),g.ontimeout=p(an,f,"TestLoadImage: timeout",!1,l,g),o.setTimeout(function(){g.ontimeout&&g.ontimeout()},1e4),g.src=a}else l(!1)}function gd(a,l){const f=new Jr,g=new AbortController,S=setTimeout(()=>{g.abort(),an(f,"TestPingServer: timeout",!1,l)},1e4);fetch(a,{signal:g.signal}).then(O=>{clearTimeout(S),O.ok?an(f,"TestPingServer: ok",!0,l):an(f,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(S),an(f,"TestPingServer: error",!1,l)})}function an(a,l,f,g,S){try{S&&(S.onload=null,S.onerror=null,S.onabort=null,S.ontimeout=null),g(f)}catch{}}function _d(){this.g=new Zf}function Ia(a){this.i=a.Sb||null,this.h=a.ab||!1}m(Ia,qu),Ia.prototype.g=function(){return new Ii(this.i,this.h)};function Ii(a,l){$t.call(this),this.H=a,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}m(Ii,$t),n=Ii.prototype,n.open=function(a,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=a,this.D=l,this.readyState=1,as(this)},n.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const l={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};a&&(l.body=a),(this.H||o).fetch(new Request(this.D,l)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,os(this)),this.readyState=0},n.Pa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,as(this)),this.g&&(this.readyState=3,as(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof o.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;fc(this)}else a.text().then(this.Oa.bind(this),this.ga.bind(this))};function fc(a){a.j.read().then(a.Ma.bind(a)).catch(a.ga.bind(a))}n.Ma=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var l=a.value?a.value:new Uint8Array(0);(l=this.B.decode(l,{stream:!a.done}))&&(this.response=this.responseText+=l)}a.done?os(this):as(this),this.readyState==3&&fc(this)}},n.Oa=function(a){this.g&&(this.response=this.responseText=a,os(this))},n.Na=function(a){this.g&&(this.response=a,os(this))},n.ga=function(){this.g&&os(this)};function os(a){a.readyState=4,a.l=null,a.j=null,a.B=null,as(a)}n.setRequestHeader=function(a,l){this.A.append(a,l)},n.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],l=this.h.entries();for(var f=l.next();!f.done;)f=f.value,a.push(f[0]+": "+f[1]),f=l.next();return a.join(`\r
`)};function as(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(Ii.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function dc(a){let l="";return mi(a,function(f,g){l+=g,l+=":",l+=f,l+=`\r
`}),l}function Aa(a,l,f){t:{for(g in f){var g=!1;break t}g=!0}g||(f=dc(f),typeof a=="string"?f!=null&&Zr(f):pt(a,l,f))}function vt(a){$t.call(this),this.headers=new Map,this.L=a||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}m(vt,$t);var Ed=/^https?$/i,yd=["POST","PUT"];n=vt.prototype,n.Fa=function(a){this.H=a},n.ea=function(a,l,f,g){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);l=l?l.toUpperCase():"GET",this.D=a,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():Ku.g(),this.g.onreadystatechange=y(h(this.Ca,this));try{this.B=!0,this.g.open(l,String(a),!0),this.B=!1}catch(O){pc(this,O);return}if(a=f||"",f=new Map(this.headers),g)if(Object.getPrototypeOf(g)===Object.prototype)for(var S in g)f.set(S,g[S]);else if(typeof g.keys=="function"&&typeof g.get=="function")for(const O of g.keys())f.set(O,g.get(O));else throw Error("Unknown input type for opt_headers: "+String(g));g=Array.from(f.keys()).find(O=>O.toLowerCase()=="content-type"),S=o.FormData&&a instanceof o.FormData,!(Array.prototype.indexOf.call(yd,l,void 0)>=0)||g||S||f.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[O,F]of f)this.g.setRequestHeader(O,F);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(a),this.v=!1}catch(O){pc(this,O)}};function pc(a,l){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=l,a.o=5,mc(a),Ai(a)}function mc(a){a.A||(a.A=!0,Qt(a,"complete"),Qt(a,"error"))}n.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=a||7,Qt(this,"complete"),Qt(this,"abort"),Ai(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Ai(this,!0)),vt.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?gc(this):this.Xa())},n.Xa=function(){gc(this)};function gc(a){if(a.h&&typeof i<"u"){if(a.v&&un(a)==4)setTimeout(a.Ca.bind(a),0);else if(Qt(a,"readystatechange"),un(a)==4){a.h=!1;try{const O=a.ca();t:switch(O){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break t;default:l=!1}var f;if(!(f=l)){var g;if(g=O===0){let F=String(a.D).match(ic)[1]||null;!F&&o.self&&o.self.location&&(F=o.self.location.protocol.slice(0,-1)),g=!Ed.test(F?F.toLowerCase():"")}f=g}if(f)Qt(a,"complete"),Qt(a,"success");else{a.o=6;try{var S=un(a)>2?a.g.statusText:""}catch{S=""}a.l=S+" ["+a.ca()+"]",mc(a)}}finally{Ai(a)}}}}function Ai(a,l){if(a.g){a.m&&(clearTimeout(a.m),a.m=null);const f=a.g;a.g=null,l||Qt(a,"ready");try{f.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function un(a){return a.g?a.g.readyState:0}n.ca=function(){try{return un(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(a){if(this.g){var l=this.g.responseText;return a&&l.indexOf(a)==0&&(l=l.substring(a.length)),Jf(l)}};function _c(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.F){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function Td(a){const l={};a=(a.g&&un(a)>=2&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let g=0;g<a.length;g++){if(T(a[g]))continue;var f=sd(a[g]);const S=f[0];if(f=f[1],typeof f!="string")continue;f=f.trim();const O=l[S]||[];l[S]=O,O.push(f)}zf(l,function(g){return g.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function us(a,l,f){return f&&f.internalChannelParams&&f.internalChannelParams[a]||l}function Ec(a){this.za=0,this.i=[],this.j=new Jr,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=us("failFast",!1,a),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=us("baseRetryDelayMs",5e3,a),this.Za=us("retryDelaySeedMs",1e4,a),this.Ta=us("forwardChannelMaxRetries",2,a),this.va=us("forwardChannelRequestTimeoutMs",2e4,a),this.ma=a&&a.xmlHttpFactory||void 0,this.Ua=a&&a.Rb||void 0,this.Aa=a&&a.useFetchStreams||!1,this.O=void 0,this.L=a&&a.supportsCrossDomainXhr||!1,this.M="",this.h=new tc(a&&a.concurrentRequestLimit),this.Ba=new _d,this.S=a&&a.fastHandshake||!1,this.R=a&&a.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=a&&a.Pb||!1,a&&a.ua&&this.j.ua(),a&&a.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&a&&a.detectBufferingProxy||!1,this.ia=void 0,a&&a.longPollingTimeout&&a.longPollingTimeout>0&&(this.ia=a.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=Ec.prototype,n.ka=8,n.I=1,n.connect=function(a,l,f,g){Xt(0),this.W=a,this.H=l||{},f&&g!==void 0&&(this.H.OSID=f,this.H.OAID=g),this.F=this.X,this.J=Sc(this,null,this.W),vi(this)};function Ra(a){if(yc(a),a.I==3){var l=a.V++,f=Se(a.J);if(pt(f,"SID",a.M),pt(f,"RID",l),pt(f,"TYPE","terminate"),cs(a,f),l=new sn(a,a.j,l),l.M=2,l.A=wi(Se(f)),f=!1,o.navigator&&o.navigator.sendBeacon)try{f=o.navigator.sendBeacon(l.A.toString(),"")}catch{}!f&&o.Image&&(new Image().src=l.A,f=!0),f||(l.g=Pc(l.j,null),l.g.ea(l.A)),l.F=Date.now(),Ti(l)}Cc(a)}function Ri(a){a.g&&(Ca(a),a.g.cancel(),a.g=null)}function yc(a){Ri(a),a.v&&(o.clearTimeout(a.v),a.v=null),Ci(a),a.h.cancel(),a.m&&(typeof a.m=="number"&&o.clearTimeout(a.m),a.m=null)}function vi(a){if(!ec(a.h)&&!a.m){a.m=!0;var l=a.Ea;yt||E(),Tt||(yt(),Tt=!0),R.add(l,a),a.D=0}}function wd(a,l){return nc(a.h)>=a.h.j-(a.m?1:0)?!1:a.m?(a.i=l.G.concat(a.i),!0):a.I==1||a.I==2||a.D>=(a.Sa?0:a.Ta)?!1:(a.m=Xr(h(a.Ea,a,l),vc(a,a.D)),a.D++,!0)}n.Ea=function(a){if(this.m)if(this.m=null,this.I==1){if(!a){this.V=Math.floor(Math.random()*1e5),a=this.V++;const S=new sn(this,this.j,a);let O=this.o;if(this.U&&(O?(O=Ou(O),Du(O,this.U)):O=this.U),this.u!==null||this.R||(S.J=O,O=null),this.S)t:{for(var l=0,f=0;f<this.i.length;f++){e:{var g=this.i[f];if("__data__"in g.map&&(g=g.map.__data__,typeof g=="string")){g=g.length;break e}g=void 0}if(g===void 0)break;if(l+=g,l>4096){l=f;break t}if(l===4096||f===this.i.length-1){l=f+1;break t}}l=1e3}else l=1e3;l=wc(this,S,l),f=Se(this.J),pt(f,"RID",a),pt(f,"CVER",22),this.G&&pt(f,"X-HTTP-Session-Id",this.G),cs(this,f),O&&(this.R?l="headers="+Zr(dc(O))+"&"+l:this.u&&Aa(f,this.u,O)),Ta(this.h,S),this.Ra&&pt(f,"TYPE","init"),this.S?(pt(f,"$req",l),pt(f,"SID","null"),S.U=!0,ga(S,f,null)):ga(S,f,l),this.I=2}}else this.I==3&&(a?Tc(this,a):this.i.length==0||ec(this.h)||Tc(this))};function Tc(a,l){var f;l?f=l.l:f=a.V++;const g=Se(a.J);pt(g,"SID",a.M),pt(g,"RID",f),pt(g,"AID",a.K),cs(a,g),a.u&&a.o&&Aa(g,a.u,a.o),f=new sn(a,a.j,f,a.D+1),a.u===null&&(f.J=a.o),l&&(a.i=l.G.concat(a.i)),l=wc(a,f,1e3),f.H=Math.round(a.va*.5)+Math.round(a.va*.5*Math.random()),Ta(a.h,f),ga(f,g,l)}function cs(a,l){a.H&&mi(a.H,function(f,g){pt(l,g,f)}),a.l&&mi({},function(f,g){pt(l,g,f)})}function wc(a,l,f){f=Math.min(a.i.length,f);const g=a.l?h(a.l.Ka,a.l,a):null;t:{var S=a.i;let rt=-1;for(;;){const Vt=["count="+f];rt==-1?f>0?(rt=S[0].g,Vt.push("ofs="+rt)):rt=0:Vt.push("ofs="+rt);let dt=!0;for(let Mt=0;Mt<f;Mt++){var O=S[Mt].g;const Pe=S[Mt].map;if(O-=rt,O<0)rt=Math.max(0,S[Mt].g-100),dt=!1;else try{O="req"+O+"_"||"";try{var F=Pe instanceof Map?Pe:Object.entries(Pe);for(const[Kn,cn]of F){let ln=cn;u(cn)&&(ln=ha(cn)),Vt.push(O+Kn+"="+encodeURIComponent(ln))}}catch(Kn){throw Vt.push(O+"type="+encodeURIComponent("_badmap")),Kn}}catch{g&&g(Pe)}}if(dt){F=Vt.join("&");break t}}F=void 0}return a=a.i.splice(0,f),l.G=a,F}function Ic(a){if(!a.g&&!a.v){a.Y=1;var l=a.Da;yt||E(),Tt||(yt(),Tt=!0),R.add(l,a),a.A=0}}function va(a){return a.g||a.v||a.A>=3?!1:(a.Y++,a.v=Xr(h(a.Da,a),vc(a,a.A)),a.A++,!0)}n.Da=function(){if(this.v=null,Ac(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var a=4*this.T;this.j.info("BP detection timer enabled: "+a),this.B=Xr(h(this.Wa,this),a)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Xt(10),Ri(this),Ac(this))};function Ca(a){a.B!=null&&(o.clearTimeout(a.B),a.B=null)}function Ac(a){a.g=new sn(a,a.j,"rpc",a.Y),a.u===null&&(a.g.J=a.o),a.g.P=0;var l=Se(a.na);pt(l,"RID","rpc"),pt(l,"SID",a.M),pt(l,"AID",a.K),pt(l,"CI",a.F?"0":"1"),!a.F&&a.ia&&pt(l,"TO",a.ia),pt(l,"TYPE","xmlhttp"),cs(a,l),a.u&&a.o&&Aa(l,a.u,a.o),a.O&&(a.g.H=a.O);var f=a.g;a=a.ba,f.M=1,f.A=wi(Se(l)),f.u=null,f.R=!0,Xu(f,a)}n.Va=function(){this.C!=null&&(this.C=null,Ri(this),va(this),Xt(19))};function Ci(a){a.C!=null&&(o.clearTimeout(a.C),a.C=null)}function Rc(a,l){var f=null;if(a.g==l){Ci(a),Ca(a),a.g=null;var g=2}else if(ya(a.h,l))f=l.G,rc(a.h,l),g=1;else return;if(a.I!=0){if(l.o)if(g==1){f=l.u?l.u.length:0,l=Date.now()-l.F;var S=a.D;g=Ei(),Qt(g,new zu(g,f)),vi(a)}else Ic(a);else if(S=l.m,S==3||S==0&&l.X>0||!(g==1&&wd(a,l)||g==2&&va(a)))switch(f&&f.length>0&&(l=a.h,l.i=l.i.concat(f)),S){case 1:Wn(a,5);break;case 4:Wn(a,10);break;case 3:Wn(a,6);break;default:Wn(a,2)}}}function vc(a,l){let f=a.Qa+Math.floor(Math.random()*a.Za);return a.isActive()||(f*=2),f*l}function Wn(a,l){if(a.j.info("Error code "+l),l==2){var f=h(a.bb,a),g=a.Ua;const S=!g;g=new on(g||"//www.google.com/images/cleardot.gif"),o.location&&o.location.protocol=="http"||es(g,"https"),wi(g),S?md(g.toString(),f):gd(g.toString(),f)}else Xt(2);a.I=0,a.l&&a.l.pa(l),Cc(a),yc(a)}n.bb=function(a){a?(this.j.info("Successfully pinged google.com"),Xt(2)):(this.j.info("Failed to ping google.com"),Xt(1))};function Cc(a){if(a.I=0,a.ja=[],a.l){const l=sc(a.h);(l.length!=0||a.i.length!=0)&&(P(a.ja,l),P(a.ja,a.i),a.h.i.length=0,C(a.i),a.i.length=0),a.l.oa()}}function Sc(a,l,f){var g=f instanceof on?Se(f):new on(f);if(g.g!="")l&&(g.g=l+"."+g.g),ns(g,g.u);else{var S=o.location;g=S.protocol,l=l?l+"."+S.hostname:S.hostname,S=+S.port;const O=new on(null);g&&es(O,g),l&&(O.g=l),S&&ns(O,S),f&&(O.h=f),g=O}return f=a.G,l=a.wa,f&&l&&pt(g,f,l),pt(g,"VER",a.ka),cs(a,g),g}function Pc(a,l,f){if(l&&!a.L)throw Error("Can't create secondary domain capable XhrIo object.");return l=a.Aa&&!a.ma?new vt(new Ia({ab:f})):new vt(a.ma),l.Fa(a.L),l}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function bc(){}n=bc.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function Si(){}Si.prototype.g=function(a,l){return new fe(a,l)};function fe(a,l){$t.call(this),this.g=new Ec(l),this.l=a,this.h=l&&l.messageUrlParams||null,a=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(a?a["X-WebChannel-Content-Type"]=l.messageContentType:a={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.sa&&(a?a["X-WebChannel-Client-Profile"]=l.sa:a={"X-WebChannel-Client-Profile":l.sa}),this.g.U=a,(a=l&&l.Qb)&&!T(a)&&(this.g.u=a),this.A=l&&l.supportsCrossDomainXhr||!1,this.v=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!T(l)&&(this.g.G=l,a=this.h,a!==null&&l in a&&(a=this.h,l in a&&delete a[l])),this.j=new Er(this)}m(fe,$t),fe.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},fe.prototype.close=function(){Ra(this.g)},fe.prototype.o=function(a){var l=this.g;if(typeof a=="string"){var f={};f.__data__=a,a=f}else this.v&&(f={},f.__data__=ha(a),a=f);l.i.push(new ad(l.Ya++,a)),l.I==3&&vi(l)},fe.prototype.N=function(){this.g.l=null,delete this.j,Ra(this.g),delete this.g,fe.Z.N.call(this)};function Nc(a){fa.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var l=a.__sm__;if(l){t:{for(const f in l){a=f;break t}a=void 0}(this.i=a)&&(a=this.i,l=l!==null&&a in l?l[a]:void 0),this.data=l}else this.data=a}m(Nc,fa);function Oc(){da.call(this),this.status=1}m(Oc,da);function Er(a){this.g=a}m(Er,bc),Er.prototype.ra=function(){Qt(this.g,"a")},Er.prototype.qa=function(a){Qt(this.g,new Nc(a))},Er.prototype.pa=function(a){Qt(this.g,new Oc)},Er.prototype.oa=function(){Qt(this.g,"b")},Si.prototype.createWebChannel=Si.prototype.g,fe.prototype.send=fe.prototype.o,fe.prototype.open=fe.prototype.m,fe.prototype.close=fe.prototype.close,O2=function(){return new Si},N2=function(){return Ei()},b2=jn,Ja={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},yi.NO_ERROR=0,yi.TIMEOUT=8,yi.HTTP_ERROR=6,Hi=yi,Wu.COMPLETE="complete",P2=Wu,$u.EventType=Yr,Yr.OPEN="a",Yr.CLOSE="b",Yr.ERROR="c",Yr.MESSAGE="d",$t.prototype.listen=$t.prototype.J,ms=$u,vt.prototype.listenOnce=vt.prototype.K,vt.prototype.getLastError=vt.prototype.Ha,vt.prototype.getLastErrorCode=vt.prototype.ya,vt.prototype.getStatus=vt.prototype.ca,vt.prototype.getResponseJson=vt.prototype.La,vt.prototype.getResponseText=vt.prototype.la,vt.prototype.send=vt.prototype.ea,vt.prototype.setWithCredentials=vt.prototype.Fa,S2=vt}).apply(typeof Ni<"u"?Ni:typeof self<"u"?self:typeof window<"u"?window:{});/*!
 * re2js
 * RE2JS is the JavaScript port of RE2, a regular expression engine that provides linear time matching
 *
 * @version v0.4.3
 * @author Alexey Vasiliev
 * @homepage https://github.com/le0pard/re2js#readme
 * @repository github:le0pard/re2js
 * @license MIT
 */const wt=class wt{};_(wt,"FOLD_CASE",1),_(wt,"LITERAL",2),_(wt,"CLASS_NL",4),_(wt,"DOT_NL",8),_(wt,"ONE_LINE",16),_(wt,"NON_GREEDY",32),_(wt,"PERL_X",64),_(wt,"UNICODE_GROUPS",128),_(wt,"WAS_DOLLAR",256),_(wt,"MATCH_NL",wt.CLASS_NL|wt.DOT_NL),_(wt,"PERL",wt.CLASS_NL|wt.ONE_LINE|wt.PERL_X|wt.UNICODE_GROUPS),_(wt,"POSIX",0),_(wt,"UNANCHORED",0),_(wt,"ANCHOR_START",1),_(wt,"ANCHOR_BOTH",2);let $=wt;class N{static toUpperCase(t){const e=String.fromCodePoint(t).toUpperCase();if(e.length>1)return t;const r=String.fromCodePoint(e.codePointAt(0)).toLowerCase();return r.length>1||r.codePointAt(0)!==t?t:e.codePointAt(0)}static toLowerCase(t){const e=String.fromCodePoint(t).toLowerCase();if(e.length>1)return t;const r=String.fromCodePoint(e.codePointAt(0)).toUpperCase();return r.length>1||r.codePointAt(0)!==t?t:e.codePointAt(0)}}_(N,"CODES",new Map([["\x07",7],["\b",8],["	",9],[`
`,10],["\v",11],["\f",12],["\r",13],[" ",32],['"',34],["$",36],["&",38],["(",40],[")",41],["*",42],["+",43],["-",45],[".",46],["0",48],["1",49],["2",50],["3",51],["4",52],["5",53],["6",54],["7",55],["8",56],["9",57],[":",58],["<",60],[">",62],["?",63],["A",65],["B",66],["C",67],["F",70],["P",80],["Q",81],["U",85],["Z",90],["[",91],["\\",92],["]",93],["^",94],["_",95],["a",97],["b",98],["f",102],["i",105],["m",109],["n",110],["r",114],["s",115],["t",116],["v",118],["x",120],["z",122],["{",123],["|",124],["}",125]]));const d=class d{};_(d,"CASE_ORBIT",new Map([[75,107],[107,8490],[8490,75],[83,115],[115,383],[383,83],[181,924],[924,956],[956,181],[197,229],[229,8491],[8491,197],[452,453],[453,454],[454,452],[455,456],[456,457],[457,455],[458,459],[459,460],[460,458],[497,498],[498,499],[499,497],[837,921],[921,953],[953,8126],[8126,837],[914,946],[946,976],[976,914],[917,949],[949,1013],[1013,917],[920,952],[952,977],[977,1012],[1012,920],[922,954],[954,1008],[1008,922],[928,960],[960,982],[982,928],[929,961],[961,1009],[1009,929],[931,962],[962,963],[963,931],[934,966],[966,981],[981,934],[937,969],[969,8486],[8486,937],[1042,1074],[1074,7296],[7296,1042],[1044,1076],[1076,7297],[7297,1044],[1054,1086],[1086,7298],[7298,1054],[1057,1089],[1089,7299],[7299,1057],[1058,1090],[1090,7300],[7300,7301],[7301,1058],[1066,1098],[1098,7302],[7302,1066],[1122,1123],[1123,7303],[7303,1122],[7304,42570],[42570,42571],[42571,7304],[7776,7777],[7777,7835],[7835,7776],[223,7838],[7838,223],[8064,8072],[8072,8064],[8065,8073],[8073,8065],[8066,8074],[8074,8066],[8067,8075],[8075,8067],[8068,8076],[8076,8068],[8069,8077],[8077,8069],[8070,8078],[8078,8070],[8071,8079],[8079,8071],[8080,8088],[8088,8080],[8081,8089],[8089,8081],[8082,8090],[8090,8082],[8083,8091],[8091,8083],[8084,8092],[8092,8084],[8085,8093],[8093,8085],[8086,8094],[8094,8086],[8087,8095],[8095,8087],[8096,8104],[8104,8096],[8097,8105],[8105,8097],[8098,8106],[8106,8098],[8099,8107],[8107,8099],[8100,8108],[8108,8100],[8101,8109],[8109,8101],[8102,8110],[8110,8102],[8103,8111],[8111,8103],[8115,8124],[8124,8115],[8131,8140],[8140,8131],[912,8147],[8147,912],[944,8163],[8163,944],[8179,8188],[8188,8179],[64261,64262],[64262,64261],[66560,66600],[66600,66560],[66561,66601],[66601,66561],[66562,66602],[66602,66562],[66563,66603],[66603,66563],[66564,66604],[66604,66564],[66565,66605],[66605,66565],[66566,66606],[66606,66566],[66567,66607],[66607,66567],[66568,66608],[66608,66568],[66569,66609],[66609,66569],[66570,66610],[66610,66570],[66571,66611],[66611,66571],[66572,66612],[66612,66572],[66573,66613],[66613,66573],[66574,66614],[66614,66574],[66575,66615],[66615,66575],[66576,66616],[66616,66576],[66577,66617],[66617,66577],[66578,66618],[66618,66578],[66579,66619],[66619,66579],[66580,66620],[66620,66580],[66581,66621],[66621,66581],[66582,66622],[66622,66582],[66583,66623],[66623,66583],[66584,66624],[66624,66584],[66585,66625],[66625,66585],[66586,66626],[66626,66586],[66587,66627],[66627,66587],[66588,66628],[66628,66588],[66589,66629],[66629,66589],[66590,66630],[66630,66590],[66591,66631],[66631,66591],[66592,66632],[66632,66592],[66593,66633],[66633,66593],[66594,66634],[66634,66594],[66595,66635],[66635,66595],[66596,66636],[66636,66596],[66597,66637],[66637,66597],[66598,66638],[66638,66598],[66599,66639],[66639,66599],[66736,66776],[66776,66736],[66737,66777],[66777,66737],[66738,66778],[66778,66738],[66739,66779],[66779,66739],[66740,66780],[66780,66740],[66741,66781],[66781,66741],[66742,66782],[66782,66742],[66743,66783],[66783,66743],[66744,66784],[66784,66744],[66745,66785],[66785,66745],[66746,66786],[66786,66746],[66747,66787],[66787,66747],[66748,66788],[66788,66748],[66749,66789],[66789,66749],[66750,66790],[66790,66750],[66751,66791],[66791,66751],[66752,66792],[66792,66752],[66753,66793],[66793,66753],[66754,66794],[66794,66754],[66755,66795],[66795,66755],[66756,66796],[66796,66756],[66757,66797],[66797,66757],[66758,66798],[66798,66758],[66759,66799],[66799,66759],[66760,66800],[66800,66760],[66761,66801],[66801,66761],[66762,66802],[66802,66762],[66763,66803],[66803,66763],[66764,66804],[66804,66764],[66765,66805],[66805,66765],[66766,66806],[66806,66766],[66767,66807],[66807,66767],[66768,66808],[66808,66768],[66769,66809],[66809,66769],[66770,66810],[66810,66770],[66771,66811],[66811,66771],[66928,66967],[66967,66928],[66929,66968],[66968,66929],[66930,66969],[66969,66930],[66931,66970],[66970,66931],[66932,66971],[66971,66932],[66933,66972],[66972,66933],[66934,66973],[66973,66934],[66935,66974],[66974,66935],[66936,66975],[66975,66936],[66937,66976],[66976,66937],[66938,66977],[66977,66938],[66940,66979],[66979,66940],[66941,66980],[66980,66941],[66942,66981],[66981,66942],[66943,66982],[66982,66943],[66944,66983],[66983,66944],[66945,66984],[66984,66945],[66946,66985],[66985,66946],[66947,66986],[66986,66947],[66948,66987],[66987,66948],[66949,66988],[66988,66949],[66950,66989],[66989,66950],[66951,66990],[66990,66951],[66952,66991],[66991,66952],[66953,66992],[66992,66953],[66954,66993],[66993,66954],[66956,66995],[66995,66956],[66957,66996],[66996,66957],[66958,66997],[66997,66958],[66959,66998],[66998,66959],[66960,66999],[66999,66960],[66961,67e3],[67e3,66961],[66962,67001],[67001,66962],[66964,67003],[67003,66964],[66965,67004],[67004,66965],[68736,68800],[68800,68736],[68737,68801],[68801,68737],[68738,68802],[68802,68738],[68739,68803],[68803,68739],[68740,68804],[68804,68740],[68741,68805],[68805,68741],[68742,68806],[68806,68742],[68743,68807],[68807,68743],[68744,68808],[68808,68744],[68745,68809],[68809,68745],[68746,68810],[68810,68746],[68747,68811],[68811,68747],[68748,68812],[68812,68748],[68749,68813],[68813,68749],[68750,68814],[68814,68750],[68751,68815],[68815,68751],[68752,68816],[68816,68752],[68753,68817],[68817,68753],[68754,68818],[68818,68754],[68755,68819],[68819,68755],[68756,68820],[68820,68756],[68757,68821],[68821,68757],[68758,68822],[68822,68758],[68759,68823],[68823,68759],[68760,68824],[68824,68760],[68761,68825],[68825,68761],[68762,68826],[68826,68762],[68763,68827],[68827,68763],[68764,68828],[68828,68764],[68765,68829],[68829,68765],[68766,68830],[68830,68766],[68767,68831],[68831,68767],[68768,68832],[68832,68768],[68769,68833],[68833,68769],[68770,68834],[68834,68770],[68771,68835],[68835,68771],[68772,68836],[68836,68772],[68773,68837],[68837,68773],[68774,68838],[68838,68774],[68775,68839],[68839,68775],[68776,68840],[68840,68776],[68777,68841],[68841,68777],[68778,68842],[68842,68778],[68779,68843],[68843,68779],[68780,68844],[68844,68780],[68781,68845],[68845,68781],[68782,68846],[68846,68782],[68783,68847],[68847,68783],[68784,68848],[68848,68784],[68785,68849],[68849,68785],[68786,68850],[68850,68786],[71840,71872],[71872,71840],[71841,71873],[71873,71841],[71842,71874],[71874,71842],[71843,71875],[71875,71843],[71844,71876],[71876,71844],[71845,71877],[71877,71845],[71846,71878],[71878,71846],[71847,71879],[71879,71847],[71848,71880],[71880,71848],[71849,71881],[71881,71849],[71850,71882],[71882,71850],[71851,71883],[71883,71851],[71852,71884],[71884,71852],[71853,71885],[71885,71853],[71854,71886],[71886,71854],[71855,71887],[71887,71855],[71856,71888],[71888,71856],[71857,71889],[71889,71857],[71858,71890],[71890,71858],[71859,71891],[71891,71859],[71860,71892],[71892,71860],[71861,71893],[71893,71861],[71862,71894],[71894,71862],[71863,71895],[71895,71863],[71864,71896],[71896,71864],[71865,71897],[71897,71865],[71866,71898],[71898,71866],[71867,71899],[71899,71867],[71868,71900],[71900,71868],[71869,71901],[71901,71869],[71870,71902],[71902,71870],[71871,71903],[71903,71871],[93760,93792],[93792,93760],[93761,93793],[93793,93761],[93762,93794],[93794,93762],[93763,93795],[93795,93763],[93764,93796],[93796,93764],[93765,93797],[93797,93765],[93766,93798],[93798,93766],[93767,93799],[93799,93767],[93768,93800],[93800,93768],[93769,93801],[93801,93769],[93770,93802],[93802,93770],[93771,93803],[93803,93771],[93772,93804],[93804,93772],[93773,93805],[93805,93773],[93774,93806],[93806,93774],[93775,93807],[93807,93775],[93776,93808],[93808,93776],[93777,93809],[93809,93777],[93778,93810],[93810,93778],[93779,93811],[93811,93779],[93780,93812],[93812,93780],[93781,93813],[93813,93781],[93782,93814],[93814,93782],[93783,93815],[93815,93783],[93784,93816],[93816,93784],[93785,93817],[93817,93785],[93786,93818],[93818,93786],[93787,93819],[93819,93787],[93788,93820],[93820,93788],[93789,93821],[93821,93789],[93790,93822],[93822,93790],[93791,93823],[93823,93791],[125184,125218],[125218,125184],[125185,125219],[125219,125185],[125186,125220],[125220,125186],[125187,125221],[125221,125187],[125188,125222],[125222,125188],[125189,125223],[125223,125189],[125190,125224],[125224,125190],[125191,125225],[125225,125191],[125192,125226],[125226,125192],[125193,125227],[125227,125193],[125194,125228],[125228,125194],[125195,125229],[125229,125195],[125196,125230],[125230,125196],[125197,125231],[125231,125197],[125198,125232],[125232,125198],[125199,125233],[125233,125199],[125200,125234],[125234,125200],[125201,125235],[125235,125201],[125202,125236],[125236,125202],[125203,125237],[125237,125203],[125204,125238],[125238,125204],[125205,125239],[125239,125205],[125206,125240],[125240,125206],[125207,125241],[125241,125207],[125208,125242],[125242,125208],[125209,125243],[125243,125209],[125210,125244],[125244,125210],[125211,125245],[125245,125211],[125212,125246],[125246,125212],[125213,125247],[125247,125213],[125214,125248],[125248,125214],[125215,125249],[125249,125215],[125216,125250],[125250,125216],[125217,125251],[125251,125217]])),_(d,"C",[[0,31,1],[127,159,1],[173,888,715],[889,896,7],[897,899,1],[907,909,2],[930,1328,398],[1367,1368,1],[1419,1420,1],[1424,1480,56],[1481,1487,1],[1515,1518,1],[1525,1541,1],[1564,1757,193],[1806,1807,1],[1867,1868,1],[1970,1983,1],[2043,2044,1],[2094,2095,1],[2111,2140,29],[2141,2143,2],[2155,2159,1],[2191,2199,1],[2274,2436,162],[2445,2446,1],[2449,2450,1],[2473,2481,8],[2483,2485,1],[2490,2491,1],[2501,2502,1],[2505,2506,1],[2511,2518,1],[2520,2523,1],[2526,2532,6],[2533,2559,26],[2560,2564,4],[2571,2574,1],[2577,2578,1],[2601,2609,8],[2612,2618,3],[2619,2621,2],[2627,2630,1],[2633,2634,1],[2638,2640,1],[2642,2648,1],[2653,2655,2],[2656,2661,1],[2679,2688,1],[2692,2702,10],[2706,2729,23],[2737,2740,3],[2746,2747,1],[2758,2766,4],[2767,2769,2],[2770,2783,1],[2788,2789,1],[2802,2808,1],[2816,2820,4],[2829,2830,1],[2833,2834,1],[2857,2865,8],[2868,2874,6],[2875,2885,10],[2886,2889,3],[2890,2894,4],[2895,2900,1],[2904,2907,1],[2910,2916,6],[2917,2936,19],[2937,2945,1],[2948,2955,7],[2956,2957,1],[2961,2966,5],[2967,2968,1],[2971,2973,2],[2976,2978,1],[2981,2983,1],[2987,2989,1],[3002,3005,1],[3011,3013,1],[3017,3022,5],[3023,3025,2],[3026,3030,1],[3032,3045,1],[3067,3071,1],[3085,3089,4],[3113,3130,17],[3131,3141,10],[3145,3150,5],[3151,3156,1],[3159,3163,4],[3164,3166,2],[3167,3172,5],[3173,3184,11],[3185,3190,1],[3213,3217,4],[3241,3252,11],[3258,3259,1],[3269,3273,4],[3278,3284,1],[3287,3292,1],[3295,3300,5],[3301,3312,11],[3316,3327,1],[3341,3345,4],[3397,3401,4],[3408,3411,1],[3428,3429,1],[3456,3460,4],[3479,3481,1],[3506,3516,10],[3518,3519,1],[3527,3529,1],[3531,3534,1],[3541,3543,2],[3552,3557,1],[3568,3569,1],[3573,3584,1],[3643,3646,1],[3676,3712,1],[3715,3717,2],[3723,3748,25],[3750,3774,24],[3775,3781,6],[3783,3791,8],[3802,3803,1],[3808,3839,1],[3912,3949,37],[3950,3952,1],[3992,4029,37],[4045,4059,14],[4060,4095,1],[4294,4296,2],[4297,4300,1],[4302,4303,1],[4681,4686,5],[4687,4695,8],[4697,4702,5],[4703,4745,42],[4750,4751,1],[4785,4790,5],[4791,4799,8],[4801,4806,5],[4807,4823,16],[4881,4886,5],[4887,4955,68],[4956,4989,33],[4990,4991,1],[5018,5023,1],[5110,5111,1],[5118,5119,1],[5789,5791,1],[5881,5887,1],[5910,5918,1],[5943,5951,1],[5972,5983,1],[5997,6001,4],[6004,6015,1],[6110,6111,1],[6122,6127,1],[6138,6143,1],[6158,6170,12],[6171,6175,1],[6265,6271,1],[6315,6319,1],[6390,6399,1],[6431,6444,13],[6445,6447,1],[6460,6463,1],[6465,6467,1],[6510,6511,1],[6517,6527,1],[6572,6575,1],[6602,6607,1],[6619,6621,1],[6684,6685,1],[6751,6781,30],[6782,6794,12],[6795,6799,1],[6810,6815,1],[6830,6831,1],[6863,6911,1],[6989,6991,1],[7039,7156,117],[7157,7163,1],[7224,7226,1],[7242,7244,1],[7305,7311,1],[7355,7356,1],[7368,7375,1],[7419,7423,1],[7958,7959,1],[7966,7967,1],[8006,8007,1],[8014,8015,1],[8024,8030,2],[8062,8063,1],[8117,8133,16],[8148,8149,1],[8156,8176,20],[8177,8181,4],[8191,8203,12],[8204,8207,1],[8234,8238,1],[8288,8303,1],[8306,8307,1],[8335,8349,14],[8350,8351,1],[8385,8399,1],[8433,8447,1],[8588,8591,1],[9255,9279,1],[9291,9311,1],[11124,11125,1],[11158,11508,350],[11509,11512,1],[11558,11560,2],[11561,11564,1],[11566,11567,1],[11624,11630,1],[11633,11646,1],[11671,11679,1],[11687,11743,8],[11870,11903,1],[11930,12020,90],[12021,12031,1],[12246,12271,1],[12352,12439,87],[12440,12544,104],[12545,12548,1],[12592,12687,95],[12772,12782,1],[12831,42125,29294],[42126,42127,1],[42183,42191,1],[42540,42559,1],[42744,42751,1],[42955,42959,1],[42962,42964,2],[42970,42993,1],[43053,43055,1],[43066,43071,1],[43128,43135,1],[43206,43213,1],[43226,43231,1],[43348,43358,1],[43389,43391,1],[43470,43482,12],[43483,43485,1],[43519,43575,56],[43576,43583,1],[43598,43599,1],[43610,43611,1],[43715,43738,1],[43767,43776,1],[43783,43784,1],[43791,43792,1],[43799,43807,1],[43815,43823,8],[43884,43887,1],[44014,44015,1],[44026,44031,1],[55204,55215,1],[55239,55242,1],[55292,63743,1],[64110,64111,1],[64218,64255,1],[64263,64274,1],[64280,64284,1],[64311,64317,6],[64319,64325,3],[64451,64466,1],[64912,64913,1],[64968,64974,1],[64976,65007,1],[65050,65055,1],[65107,65127,20],[65132,65135,1],[65141,65277,136],[65278,65280,1],[65471,65473,1],[65480,65481,1],[65488,65489,1],[65496,65497,1],[65501,65503,1],[65511,65519,8],[65520,65531,1],[65534,65535,1],[65548,65575,27],[65595,65598,3],[65614,65615,1],[65630,65663,1],[65787,65791,1],[65795,65798,1],[65844,65846,1],[65935,65949,14],[65950,65951,1],[65953,65999,1],[66046,66175,1],[66205,66207,1],[66257,66271,1],[66300,66303,1],[66340,66348,1],[66379,66383,1],[66427,66431,1],[66462,66500,38],[66501,66503,1],[66518,66559,1],[66718,66719,1],[66730,66735,1],[66772,66775,1],[66812,66815,1],[66856,66863,1],[66916,66926,1],[66939,66955,16],[66963,66966,3],[66978,66994,16],[67002,67005,3],[67006,67071,1],[67383,67391,1],[67414,67423,1],[67432,67455,1],[67462,67505,43],[67515,67583,1],[67590,67591,1],[67593,67638,45],[67641,67643,1],[67645,67646,1],[67670,67743,73],[67744,67750,1],[67760,67807,1],[67827,67830,3],[67831,67834,1],[67868,67870,1],[67898,67902,1],[67904,67967,1],[68024,68027,1],[68048,68049,1],[68100,68103,3],[68104,68107,1],[68116,68120,4],[68150,68151,1],[68155,68158,1],[68169,68175,1],[68185,68191,1],[68256,68287,1],[68327,68330,1],[68343,68351,1],[68406,68408,1],[68438,68439,1],[68467,68471,1],[68498,68504,1],[68509,68520,1],[68528,68607,1],[68681,68735,1],[68787,68799,1],[68851,68857,1],[68904,68911,1],[68922,69215,1],[69247,69290,43],[69294,69295,1],[69298,69372,1],[69416,69423,1],[69466,69487,1],[69514,69551,1],[69580,69599,1],[69623,69631,1],[69710,69713,1],[69750,69758,1],[69821,69827,6],[69828,69839,1],[69865,69871,1],[69882,69887,1],[69941,69960,19],[69961,69967,1],[70007,70015,1],[70112,70133,21],[70134,70143,1],[70162,70210,48],[70211,70271,1],[70279,70281,2],[70286,70302,16],[70314,70319,1],[70379,70383,1],[70394,70399,1],[70404,70413,9],[70414,70417,3],[70418,70441,23],[70449,70452,3],[70458,70469,11],[70470,70473,3],[70474,70478,4],[70479,70481,2],[70482,70486,1],[70488,70492,1],[70500,70501,1],[70509,70511,1],[70517,70655,1],[70748,70754,6],[70755,70783,1],[70856,70863,1],[70874,71039,1],[71094,71095,1],[71134,71167,1],[71237,71247,1],[71258,71263,1],[71277,71295,1],[71354,71359,1],[71370,71423,1],[71451,71452,1],[71468,71471,1],[71495,71679,1],[71740,71839,1],[71923,71934,1],[71943,71944,1],[71946,71947,1],[71956,71959,3],[71990,71993,3],[71994,72007,13],[72008,72015,1],[72026,72095,1],[72104,72105,1],[72152,72153,1],[72165,72191,1],[72264,72271,1],[72355,72367,1],[72441,72447,1],[72458,72703,1],[72713,72759,46],[72774,72783,1],[72813,72815,1],[72848,72849,1],[72872,72887,15],[72888,72959,1],[72967,72970,3],[73015,73017,1],[73019,73022,3],[73032,73039,1],[73050,73055,1],[73062,73065,3],[73103,73106,3],[73113,73119,1],[73130,73439,1],[73465,73471,1],[73489,73531,42],[73532,73533,1],[73562,73647,1],[73649,73663,1],[73714,73726,1],[74650,74751,1],[74863,74869,6],[74870,74879,1],[75076,77711,1],[77811,77823,1],[78896,78911,1],[78934,82943,1],[83527,92159,1],[92729,92735,1],[92767,92778,11],[92779,92781,1],[92863,92874,11],[92875,92879,1],[92910,92911,1],[92918,92927,1],[92998,93007,1],[93018,93026,8],[93048,93052,1],[93072,93759,1],[93851,93951,1],[94027,94030,1],[94088,94094,1],[94112,94175,1],[94181,94191,1],[94194,94207,1],[100344,100351,1],[101590,101631,1],[101641,110575,1],[110580,110588,8],[110591,110883,292],[110884,110897,1],[110899,110927,1],[110931,110932,1],[110934,110947,1],[110952,110959,1],[111356,113663,1],[113771,113775,1],[113789,113791,1],[113801,113807,1],[113818,113819,1],[113824,118527,1],[118574,118575,1],[118599,118607,1],[118724,118783,1],[119030,119039,1],[119079,119080,1],[119155,119162,1],[119275,119295,1],[119366,119487,1],[119508,119519,1],[119540,119551,1],[119639,119647,1],[119673,119807,1],[119893,119965,72],[119968,119969,1],[119971,119972,1],[119975,119976,1],[119981,119994,13],[119996,120004,8],[120070,120075,5],[120076,120085,9],[120093,120122,29],[120127,120133,6],[120135,120137,1],[120145,120486,341],[120487,120780,293],[120781,121484,703],[121485,121498,1],[121504,121520,16],[121521,122623,1],[122655,122660,1],[122667,122879,1],[122887,122905,18],[122906,122914,8],[122917,122923,6],[122924,122927,1],[122990,123022,1],[123024,123135,1],[123181,123183,1],[123198,123199,1],[123210,123213,1],[123216,123535,1],[123567,123583,1],[123642,123646,1],[123648,124111,1],[124154,124895,1],[124903,124908,5],[124911,124927,16],[125125,125126,1],[125143,125183,1],[125260,125263,1],[125274,125277,1],[125280,126064,1],[126133,126208,1],[126270,126463,1],[126468,126496,28],[126499,126501,2],[126502,126504,2],[126515,126520,5],[126522,126524,2],[126525,126529,1],[126531,126534,1],[126536,126540,2],[126544,126547,3],[126549,126550,1],[126552,126560,2],[126563,126565,2],[126566,126571,5],[126579,126589,5],[126591,126602,11],[126620,126624,1],[126628,126634,6],[126652,126703,1],[126706,126975,1],[127020,127023,1],[127124,127135,1],[127151,127152,1],[127168,127184,16],[127222,127231,1],[127406,127461,1],[127491,127503,1],[127548,127551,1],[127561,127567,1],[127570,127583,1],[127590,127743,1],[128728,128731,1],[128749,128751,1],[128765,128767,1],[128887,128890,1],[128986,128991,1],[129004,129007,1],[129009,129023,1],[129036,129039,1],[129096,129103,1],[129114,129119,1],[129160,129167,1],[129198,129199,1],[129202,129279,1],[129620,129631,1],[129646,129647,1],[129661,129663,1],[129673,129679,1],[129726,129734,8],[129735,129741,1],[129756,129759,1],[129769,129775,1],[129785,129791,1],[129939,129995,56],[129996,130031,1],[130042,131071,1],[173792,173823,1],[177978,177983,1],[178206,178207,1],[183970,183983,1],[191457,191471,1],[192094,194559,1],[195102,196607,1],[201547,201551,1],[205744,917759,1],[918e3,1114111,1]]),_(d,"Cc",[[0,31,1],[127,159,1]]),_(d,"Cf",[[173,1536,1363],[1537,1541,1],[1564,1757,193],[1807,2192,385],[2193,2274,81],[6158,8203,2045],[8204,8207,1],[8234,8238,1],[8288,8292,1],[8294,8303,1],[65279,65529,250],[65530,65531,1],[69821,69837,16],[78896,78911,1],[113824,113827,1],[119155,119162,1],[917505,917536,31],[917537,917631,1]]),_(d,"Co",[[57344,63743,1],[983040,1048573,1],[1048576,1114109,1]]),_(d,"Cs",[[55296,57343,1]]),_(d,"L",[[65,90,1],[97,122,1],[170,181,11],[186,192,6],[193,214,1],[216,246,1],[248,705,1],[710,721,1],[736,740,1],[748,750,2],[880,884,1],[886,887,1],[890,893,1],[895,902,7],[904,906,1],[908,910,2],[911,929,1],[931,1013,1],[1015,1153,1],[1162,1327,1],[1329,1366,1],[1369,1376,7],[1377,1416,1],[1488,1514,1],[1519,1522,1],[1568,1610,1],[1646,1647,1],[1649,1747,1],[1749,1765,16],[1766,1774,8],[1775,1786,11],[1787,1788,1],[1791,1808,17],[1810,1839,1],[1869,1957,1],[1969,1994,25],[1995,2026,1],[2036,2037,1],[2042,2048,6],[2049,2069,1],[2074,2084,10],[2088,2112,24],[2113,2136,1],[2144,2154,1],[2160,2183,1],[2185,2190,1],[2208,2249,1],[2308,2361,1],[2365,2384,19],[2392,2401,1],[2417,2432,1],[2437,2444,1],[2447,2448,1],[2451,2472,1],[2474,2480,1],[2482,2486,4],[2487,2489,1],[2493,2510,17],[2524,2525,1],[2527,2529,1],[2544,2545,1],[2556,2565,9],[2566,2570,1],[2575,2576,1],[2579,2600,1],[2602,2608,1],[2610,2611,1],[2613,2614,1],[2616,2617,1],[2649,2652,1],[2654,2674,20],[2675,2676,1],[2693,2701,1],[2703,2705,1],[2707,2728,1],[2730,2736,1],[2738,2739,1],[2741,2745,1],[2749,2768,19],[2784,2785,1],[2809,2821,12],[2822,2828,1],[2831,2832,1],[2835,2856,1],[2858,2864,1],[2866,2867,1],[2869,2873,1],[2877,2908,31],[2909,2911,2],[2912,2913,1],[2929,2947,18],[2949,2954,1],[2958,2960,1],[2962,2965,1],[2969,2970,1],[2972,2974,2],[2975,2979,4],[2980,2984,4],[2985,2986,1],[2990,3001,1],[3024,3077,53],[3078,3084,1],[3086,3088,1],[3090,3112,1],[3114,3129,1],[3133,3160,27],[3161,3162,1],[3165,3168,3],[3169,3200,31],[3205,3212,1],[3214,3216,1],[3218,3240,1],[3242,3251,1],[3253,3257,1],[3261,3293,32],[3294,3296,2],[3297,3313,16],[3314,3332,18],[3333,3340,1],[3342,3344,1],[3346,3386,1],[3389,3406,17],[3412,3414,1],[3423,3425,1],[3450,3455,1],[3461,3478,1],[3482,3505,1],[3507,3515,1],[3517,3520,3],[3521,3526,1],[3585,3632,1],[3634,3635,1],[3648,3654,1],[3713,3714,1],[3716,3718,2],[3719,3722,1],[3724,3747,1],[3749,3751,2],[3752,3760,1],[3762,3763,1],[3773,3776,3],[3777,3780,1],[3782,3804,22],[3805,3807,1],[3840,3904,64],[3905,3911,1],[3913,3948,1],[3976,3980,1],[4096,4138,1],[4159,4176,17],[4177,4181,1],[4186,4189,1],[4193,4197,4],[4198,4206,8],[4207,4208,1],[4213,4225,1],[4238,4256,18],[4257,4293,1],[4295,4301,6],[4304,4346,1],[4348,4680,1],[4682,4685,1],[4688,4694,1],[4696,4698,2],[4699,4701,1],[4704,4744,1],[4746,4749,1],[4752,4784,1],[4786,4789,1],[4792,4798,1],[4800,4802,2],[4803,4805,1],[4808,4822,1],[4824,4880,1],[4882,4885,1],[4888,4954,1],[4992,5007,1],[5024,5109,1],[5112,5117,1],[5121,5740,1],[5743,5759,1],[5761,5786,1],[5792,5866,1],[5873,5880,1],[5888,5905,1],[5919,5937,1],[5952,5969,1],[5984,5996,1],[5998,6e3,1],[6016,6067,1],[6103,6108,5],[6176,6264,1],[6272,6276,1],[6279,6312,1],[6314,6320,6],[6321,6389,1],[6400,6430,1],[6480,6509,1],[6512,6516,1],[6528,6571,1],[6576,6601,1],[6656,6678,1],[6688,6740,1],[6823,6917,94],[6918,6963,1],[6981,6988,1],[7043,7072,1],[7086,7087,1],[7098,7141,1],[7168,7203,1],[7245,7247,1],[7258,7293,1],[7296,7304,1],[7312,7354,1],[7357,7359,1],[7401,7404,1],[7406,7411,1],[7413,7414,1],[7418,7424,6],[7425,7615,1],[7680,7957,1],[7960,7965,1],[7968,8005,1],[8008,8013,1],[8016,8023,1],[8025,8031,2],[8032,8061,1],[8064,8116,1],[8118,8124,1],[8126,8130,4],[8131,8132,1],[8134,8140,1],[8144,8147,1],[8150,8155,1],[8160,8172,1],[8178,8180,1],[8182,8188,1],[8305,8319,14],[8336,8348,1],[8450,8455,5],[8458,8467,1],[8469,8473,4],[8474,8477,1],[8484,8490,2],[8491,8493,1],[8495,8505,1],[8508,8511,1],[8517,8521,1],[8526,8579,53],[8580,11264,2684],[11265,11492,1],[11499,11502,1],[11506,11507,1],[11520,11557,1],[11559,11565,6],[11568,11623,1],[11631,11648,17],[11649,11670,1],[11680,11686,1],[11688,11694,1],[11696,11702,1],[11704,11710,1],[11712,11718,1],[11720,11726,1],[11728,11734,1],[11736,11742,1],[11823,12293,470],[12294,12337,43],[12338,12341,1],[12347,12348,1],[12353,12438,1],[12445,12447,1],[12449,12538,1],[12540,12543,1],[12549,12591,1],[12593,12686,1],[12704,12735,1],[12784,12799,1],[13312,19903,1],[19968,42124,1],[42192,42237,1],[42240,42508,1],[42512,42527,1],[42538,42539,1],[42560,42606,1],[42623,42653,1],[42656,42725,1],[42775,42783,1],[42786,42888,1],[42891,42954,1],[42960,42961,1],[42963,42965,2],[42966,42969,1],[42994,43009,1],[43011,43013,1],[43015,43018,1],[43020,43042,1],[43072,43123,1],[43138,43187,1],[43250,43255,1],[43259,43261,2],[43262,43274,12],[43275,43301,1],[43312,43334,1],[43360,43388,1],[43396,43442,1],[43471,43488,17],[43489,43492,1],[43494,43503,1],[43514,43518,1],[43520,43560,1],[43584,43586,1],[43588,43595,1],[43616,43638,1],[43642,43646,4],[43647,43695,1],[43697,43701,4],[43702,43705,3],[43706,43709,1],[43712,43714,2],[43739,43741,1],[43744,43754,1],[43762,43764,1],[43777,43782,1],[43785,43790,1],[43793,43798,1],[43808,43814,1],[43816,43822,1],[43824,43866,1],[43868,43881,1],[43888,44002,1],[44032,55203,1],[55216,55238,1],[55243,55291,1],[63744,64109,1],[64112,64217,1],[64256,64262,1],[64275,64279,1],[64285,64287,2],[64288,64296,1],[64298,64310,1],[64312,64316,1],[64318,64320,2],[64321,64323,2],[64324,64326,2],[64327,64433,1],[64467,64829,1],[64848,64911,1],[64914,64967,1],[65008,65019,1],[65136,65140,1],[65142,65276,1],[65313,65338,1],[65345,65370,1],[65382,65470,1],[65474,65479,1],[65482,65487,1],[65490,65495,1],[65498,65500,1],[65536,65547,1],[65549,65574,1],[65576,65594,1],[65596,65597,1],[65599,65613,1],[65616,65629,1],[65664,65786,1],[66176,66204,1],[66208,66256,1],[66304,66335,1],[66349,66368,1],[66370,66377,1],[66384,66421,1],[66432,66461,1],[66464,66499,1],[66504,66511,1],[66560,66717,1],[66736,66771,1],[66776,66811,1],[66816,66855,1],[66864,66915,1],[66928,66938,1],[66940,66954,1],[66956,66962,1],[66964,66965,1],[66967,66977,1],[66979,66993,1],[66995,67001,1],[67003,67004,1],[67072,67382,1],[67392,67413,1],[67424,67431,1],[67456,67461,1],[67463,67504,1],[67506,67514,1],[67584,67589,1],[67592,67594,2],[67595,67637,1],[67639,67640,1],[67644,67647,3],[67648,67669,1],[67680,67702,1],[67712,67742,1],[67808,67826,1],[67828,67829,1],[67840,67861,1],[67872,67897,1],[67968,68023,1],[68030,68031,1],[68096,68112,16],[68113,68115,1],[68117,68119,1],[68121,68149,1],[68192,68220,1],[68224,68252,1],[68288,68295,1],[68297,68324,1],[68352,68405,1],[68416,68437,1],[68448,68466,1],[68480,68497,1],[68608,68680,1],[68736,68786,1],[68800,68850,1],[68864,68899,1],[69248,69289,1],[69296,69297,1],[69376,69404,1],[69415,69424,9],[69425,69445,1],[69488,69505,1],[69552,69572,1],[69600,69622,1],[69635,69687,1],[69745,69746,1],[69749,69763,14],[69764,69807,1],[69840,69864,1],[69891,69926,1],[69956,69959,3],[69968,70002,1],[70006,70019,13],[70020,70066,1],[70081,70084,1],[70106,70108,2],[70144,70161,1],[70163,70187,1],[70207,70208,1],[70272,70278,1],[70280,70282,2],[70283,70285,1],[70287,70301,1],[70303,70312,1],[70320,70366,1],[70405,70412,1],[70415,70416,1],[70419,70440,1],[70442,70448,1],[70450,70451,1],[70453,70457,1],[70461,70480,19],[70493,70497,1],[70656,70708,1],[70727,70730,1],[70751,70753,1],[70784,70831,1],[70852,70853,1],[70855,71040,185],[71041,71086,1],[71128,71131,1],[71168,71215,1],[71236,71296,60],[71297,71338,1],[71352,71424,72],[71425,71450,1],[71488,71494,1],[71680,71723,1],[71840,71903,1],[71935,71942,1],[71945,71948,3],[71949,71955,1],[71957,71958,1],[71960,71983,1],[71999,72001,2],[72096,72103,1],[72106,72144,1],[72161,72163,2],[72192,72203,11],[72204,72242,1],[72250,72272,22],[72284,72329,1],[72349,72368,19],[72369,72440,1],[72704,72712,1],[72714,72750,1],[72768,72818,50],[72819,72847,1],[72960,72966,1],[72968,72969,1],[72971,73008,1],[73030,73056,26],[73057,73061,1],[73063,73064,1],[73066,73097,1],[73112,73440,328],[73441,73458,1],[73474,73476,2],[73477,73488,1],[73490,73523,1],[73648,73728,80],[73729,74649,1],[74880,75075,1],[77712,77808,1],[77824,78895,1],[78913,78918,1],[82944,83526,1],[92160,92728,1],[92736,92766,1],[92784,92862,1],[92880,92909,1],[92928,92975,1],[92992,92995,1],[93027,93047,1],[93053,93071,1],[93760,93823,1],[93952,94026,1],[94032,94099,67],[94100,94111,1],[94176,94177,1],[94179,94208,29],[94209,100343,1],[100352,101589,1],[101632,101640,1],[110576,110579,1],[110581,110587,1],[110589,110590,1],[110592,110882,1],[110898,110928,30],[110929,110930,1],[110933,110948,15],[110949,110951,1],[110960,111355,1],[113664,113770,1],[113776,113788,1],[113792,113800,1],[113808,113817,1],[119808,119892,1],[119894,119964,1],[119966,119967,1],[119970,119973,3],[119974,119977,3],[119978,119980,1],[119982,119993,1],[119995,119997,2],[119998,120003,1],[120005,120069,1],[120071,120074,1],[120077,120084,1],[120086,120092,1],[120094,120121,1],[120123,120126,1],[120128,120132,1],[120134,120138,4],[120139,120144,1],[120146,120485,1],[120488,120512,1],[120514,120538,1],[120540,120570,1],[120572,120596,1],[120598,120628,1],[120630,120654,1],[120656,120686,1],[120688,120712,1],[120714,120744,1],[120746,120770,1],[120772,120779,1],[122624,122654,1],[122661,122666,1],[122928,122989,1],[123136,123180,1],[123191,123197,1],[123214,123536,322],[123537,123565,1],[123584,123627,1],[124112,124139,1],[124896,124902,1],[124904,124907,1],[124909,124910,1],[124912,124926,1],[124928,125124,1],[125184,125251,1],[125259,126464,1205],[126465,126467,1],[126469,126495,1],[126497,126498,1],[126500,126503,3],[126505,126514,1],[126516,126519,1],[126521,126523,2],[126530,126535,5],[126537,126541,2],[126542,126543,1],[126545,126546,1],[126548,126551,3],[126553,126561,2],[126562,126564,2],[126567,126570,1],[126572,126578,1],[126580,126583,1],[126585,126588,1],[126590,126592,2],[126593,126601,1],[126603,126619,1],[126625,126627,1],[126629,126633,1],[126635,126651,1],[131072,173791,1],[173824,177977,1],[177984,178205,1],[178208,183969,1],[183984,191456,1],[191472,192093,1],[194560,195101,1],[196608,201546,1],[201552,205743,1]]),_(d,"foldL",[[837,837,1]]),_(d,"Ll",[[97,122,1],[181,223,42],[224,246,1],[248,255,1],[257,311,2],[312,328,2],[329,375,2],[378,382,2],[383,384,1],[387,389,2],[392,396,4],[397,402,5],[405,409,4],[410,411,1],[414,417,3],[419,421,2],[424,426,2],[427,429,2],[432,436,4],[438,441,3],[442,445,3],[446,447,1],[454,460,3],[462,476,2],[477,495,2],[496,499,3],[501,505,4],[507,563,2],[564,569,1],[572,575,3],[576,578,2],[583,591,2],[592,659,1],[661,687,1],[881,883,2],[887,891,4],[892,893,1],[912,940,28],[941,974,1],[976,977,1],[981,983,1],[985,1007,2],[1008,1011,1],[1013,1019,3],[1020,1072,52],[1073,1119,1],[1121,1153,2],[1163,1215,2],[1218,1230,2],[1231,1327,2],[1376,1416,1],[4304,4346,1],[4349,4351,1],[5112,5117,1],[7296,7304,1],[7424,7467,1],[7531,7543,1],[7545,7578,1],[7681,7829,2],[7830,7837,1],[7839,7935,2],[7936,7943,1],[7952,7957,1],[7968,7975,1],[7984,7991,1],[8e3,8005,1],[8016,8023,1],[8032,8039,1],[8048,8061,1],[8064,8071,1],[8080,8087,1],[8096,8103,1],[8112,8116,1],[8118,8119,1],[8126,8130,4],[8131,8132,1],[8134,8135,1],[8144,8147,1],[8150,8151,1],[8160,8167,1],[8178,8180,1],[8182,8183,1],[8458,8462,4],[8463,8467,4],[8495,8505,5],[8508,8509,1],[8518,8521,1],[8526,8580,54],[11312,11359,1],[11361,11365,4],[11366,11372,2],[11377,11379,2],[11380,11382,2],[11383,11387,1],[11393,11491,2],[11492,11500,8],[11502,11507,5],[11520,11557,1],[11559,11565,6],[42561,42605,2],[42625,42651,2],[42787,42799,2],[42800,42801,1],[42803,42865,2],[42866,42872,1],[42874,42876,2],[42879,42887,2],[42892,42894,2],[42897,42899,2],[42900,42901,1],[42903,42921,2],[42927,42933,6],[42935,42947,2],[42952,42954,2],[42961,42969,2],[42998,43002,4],[43824,43866,1],[43872,43880,1],[43888,43967,1],[64256,64262,1],[64275,64279,1],[65345,65370,1],[66600,66639,1],[66776,66811,1],[66967,66977,1],[66979,66993,1],[66995,67001,1],[67003,67004,1],[68800,68850,1],[71872,71903,1],[93792,93823,1],[119834,119859,1],[119886,119892,1],[119894,119911,1],[119938,119963,1],[119990,119993,1],[119995,119997,2],[119998,120003,1],[120005,120015,1],[120042,120067,1],[120094,120119,1],[120146,120171,1],[120198,120223,1],[120250,120275,1],[120302,120327,1],[120354,120379,1],[120406,120431,1],[120458,120485,1],[120514,120538,1],[120540,120545,1],[120572,120596,1],[120598,120603,1],[120630,120654,1],[120656,120661,1],[120688,120712,1],[120714,120719,1],[120746,120770,1],[120772,120777,1],[120779,122624,1845],[122625,122633,1],[122635,122654,1],[122661,122666,1],[125218,125251,1]]),_(d,"foldLl",[[65,90,1],[192,214,1],[216,222,1],[256,302,2],[306,310,2],[313,327,2],[330,376,2],[377,381,2],[385,386,1],[388,390,2],[391,393,2],[394,395,1],[398,401,1],[403,404,1],[406,408,1],[412,413,1],[415,416,1],[418,422,2],[423,425,2],[428,430,2],[431,433,2],[434,435,1],[437,439,2],[440,444,4],[452,453,1],[455,456,1],[458,459,1],[461,475,2],[478,494,2],[497,498,1],[500,502,2],[503,504,1],[506,562,2],[570,571,1],[573,574,1],[577,579,2],[580,582,1],[584,590,2],[837,880,43],[882,886,4],[895,902,7],[904,906,1],[908,910,2],[911,913,2],[914,929,1],[931,939,1],[975,984,9],[986,1006,2],[1012,1015,3],[1017,1018,1],[1021,1071,1],[1120,1152,2],[1162,1216,2],[1217,1229,2],[1232,1326,2],[1329,1366,1],[4256,4293,1],[4295,4301,6],[5024,5109,1],[7312,7354,1],[7357,7359,1],[7680,7828,2],[7838,7934,2],[7944,7951,1],[7960,7965,1],[7976,7983,1],[7992,7999,1],[8008,8013,1],[8025,8031,2],[8040,8047,1],[8072,8079,1],[8088,8095,1],[8104,8111,1],[8120,8124,1],[8136,8140,1],[8152,8155,1],[8168,8172,1],[8184,8188,1],[8486,8490,4],[8491,8498,7],[8579,11264,2685],[11265,11311,1],[11360,11362,2],[11363,11364,1],[11367,11373,2],[11374,11376,1],[11378,11381,3],[11390,11392,1],[11394,11490,2],[11499,11501,2],[11506,42560,31054],[42562,42604,2],[42624,42650,2],[42786,42798,2],[42802,42862,2],[42873,42877,2],[42878,42886,2],[42891,42893,2],[42896,42898,2],[42902,42922,2],[42923,42926,1],[42928,42932,1],[42934,42948,2],[42949,42951,1],[42953,42960,7],[42966,42968,2],[42997,65313,22316],[65314,65338,1],[66560,66599,1],[66736,66771,1],[66928,66938,1],[66940,66954,1],[66956,66962,1],[66964,66965,1],[68736,68786,1],[71840,71871,1],[93760,93791,1],[125184,125217,1]]),_(d,"Lm",[[688,705,1],[710,721,1],[736,740,1],[748,750,2],[884,890,6],[1369,1600,231],[1765,1766,1],[2036,2037,1],[2042,2074,32],[2084,2088,4],[2249,2417,168],[3654,3782,128],[4348,6103,1755],[6211,6823,612],[7288,7293,1],[7468,7530,1],[7544,7579,35],[7580,7615,1],[8305,8319,14],[8336,8348,1],[11388,11389,1],[11631,11823,192],[12293,12337,44],[12338,12341,1],[12347,12445,98],[12446,12540,94],[12541,12542,1],[40981,42232,1251],[42233,42237,1],[42508,42623,115],[42652,42653,1],[42775,42783,1],[42864,42888,24],[42994,42996,1],[43e3,43001,1],[43471,43494,23],[43632,43741,109],[43763,43764,1],[43868,43871,1],[43881,65392,21511],[65438,65439,1],[67456,67461,1],[67463,67504,1],[67506,67514,1],[92992,92995,1],[94099,94111,1],[94176,94177,1],[94179,110576,16397],[110577,110579,1],[110581,110587,1],[110589,110590,1],[122928,122989,1],[123191,123197,1],[124139,125259,1120]]),_(d,"Lo",[[170,186,16],[443,448,5],[449,451,1],[660,1488,828],[1489,1514,1],[1519,1522,1],[1568,1599,1],[1601,1610,1],[1646,1647,1],[1649,1747,1],[1749,1774,25],[1775,1786,11],[1787,1788,1],[1791,1808,17],[1810,1839,1],[1869,1957,1],[1969,1994,25],[1995,2026,1],[2048,2069,1],[2112,2136,1],[2144,2154,1],[2160,2183,1],[2185,2190,1],[2208,2248,1],[2308,2361,1],[2365,2384,19],[2392,2401,1],[2418,2432,1],[2437,2444,1],[2447,2448,1],[2451,2472,1],[2474,2480,1],[2482,2486,4],[2487,2489,1],[2493,2510,17],[2524,2525,1],[2527,2529,1],[2544,2545,1],[2556,2565,9],[2566,2570,1],[2575,2576,1],[2579,2600,1],[2602,2608,1],[2610,2611,1],[2613,2614,1],[2616,2617,1],[2649,2652,1],[2654,2674,20],[2675,2676,1],[2693,2701,1],[2703,2705,1],[2707,2728,1],[2730,2736,1],[2738,2739,1],[2741,2745,1],[2749,2768,19],[2784,2785,1],[2809,2821,12],[2822,2828,1],[2831,2832,1],[2835,2856,1],[2858,2864,1],[2866,2867,1],[2869,2873,1],[2877,2908,31],[2909,2911,2],[2912,2913,1],[2929,2947,18],[2949,2954,1],[2958,2960,1],[2962,2965,1],[2969,2970,1],[2972,2974,2],[2975,2979,4],[2980,2984,4],[2985,2986,1],[2990,3001,1],[3024,3077,53],[3078,3084,1],[3086,3088,1],[3090,3112,1],[3114,3129,1],[3133,3160,27],[3161,3162,1],[3165,3168,3],[3169,3200,31],[3205,3212,1],[3214,3216,1],[3218,3240,1],[3242,3251,1],[3253,3257,1],[3261,3293,32],[3294,3296,2],[3297,3313,16],[3314,3332,18],[3333,3340,1],[3342,3344,1],[3346,3386,1],[3389,3406,17],[3412,3414,1],[3423,3425,1],[3450,3455,1],[3461,3478,1],[3482,3505,1],[3507,3515,1],[3517,3520,3],[3521,3526,1],[3585,3632,1],[3634,3635,1],[3648,3653,1],[3713,3714,1],[3716,3718,2],[3719,3722,1],[3724,3747,1],[3749,3751,2],[3752,3760,1],[3762,3763,1],[3773,3776,3],[3777,3780,1],[3804,3807,1],[3840,3904,64],[3905,3911,1],[3913,3948,1],[3976,3980,1],[4096,4138,1],[4159,4176,17],[4177,4181,1],[4186,4189,1],[4193,4197,4],[4198,4206,8],[4207,4208,1],[4213,4225,1],[4238,4352,114],[4353,4680,1],[4682,4685,1],[4688,4694,1],[4696,4698,2],[4699,4701,1],[4704,4744,1],[4746,4749,1],[4752,4784,1],[4786,4789,1],[4792,4798,1],[4800,4802,2],[4803,4805,1],[4808,4822,1],[4824,4880,1],[4882,4885,1],[4888,4954,1],[4992,5007,1],[5121,5740,1],[5743,5759,1],[5761,5786,1],[5792,5866,1],[5873,5880,1],[5888,5905,1],[5919,5937,1],[5952,5969,1],[5984,5996,1],[5998,6e3,1],[6016,6067,1],[6108,6176,68],[6177,6210,1],[6212,6264,1],[6272,6276,1],[6279,6312,1],[6314,6320,6],[6321,6389,1],[6400,6430,1],[6480,6509,1],[6512,6516,1],[6528,6571,1],[6576,6601,1],[6656,6678,1],[6688,6740,1],[6917,6963,1],[6981,6988,1],[7043,7072,1],[7086,7087,1],[7098,7141,1],[7168,7203,1],[7245,7247,1],[7258,7287,1],[7401,7404,1],[7406,7411,1],[7413,7414,1],[7418,8501,1083],[8502,8504,1],[11568,11623,1],[11648,11670,1],[11680,11686,1],[11688,11694,1],[11696,11702,1],[11704,11710,1],[11712,11718,1],[11720,11726,1],[11728,11734,1],[11736,11742,1],[12294,12348,54],[12353,12438,1],[12447,12449,2],[12450,12538,1],[12543,12549,6],[12550,12591,1],[12593,12686,1],[12704,12735,1],[12784,12799,1],[13312,19903,1],[19968,40980,1],[40982,42124,1],[42192,42231,1],[42240,42507,1],[42512,42527,1],[42538,42539,1],[42606,42656,50],[42657,42725,1],[42895,42999,104],[43003,43009,1],[43011,43013,1],[43015,43018,1],[43020,43042,1],[43072,43123,1],[43138,43187,1],[43250,43255,1],[43259,43261,2],[43262,43274,12],[43275,43301,1],[43312,43334,1],[43360,43388,1],[43396,43442,1],[43488,43492,1],[43495,43503,1],[43514,43518,1],[43520,43560,1],[43584,43586,1],[43588,43595,1],[43616,43631,1],[43633,43638,1],[43642,43646,4],[43647,43695,1],[43697,43701,4],[43702,43705,3],[43706,43709,1],[43712,43714,2],[43739,43740,1],[43744,43754,1],[43762,43777,15],[43778,43782,1],[43785,43790,1],[43793,43798,1],[43808,43814,1],[43816,43822,1],[43968,44002,1],[44032,55203,1],[55216,55238,1],[55243,55291,1],[63744,64109,1],[64112,64217,1],[64285,64287,2],[64288,64296,1],[64298,64310,1],[64312,64316,1],[64318,64320,2],[64321,64323,2],[64324,64326,2],[64327,64433,1],[64467,64829,1],[64848,64911,1],[64914,64967,1],[65008,65019,1],[65136,65140,1],[65142,65276,1],[65382,65391,1],[65393,65437,1],[65440,65470,1],[65474,65479,1],[65482,65487,1],[65490,65495,1],[65498,65500,1],[65536,65547,1],[65549,65574,1],[65576,65594,1],[65596,65597,1],[65599,65613,1],[65616,65629,1],[65664,65786,1],[66176,66204,1],[66208,66256,1],[66304,66335,1],[66349,66368,1],[66370,66377,1],[66384,66421,1],[66432,66461,1],[66464,66499,1],[66504,66511,1],[66640,66717,1],[66816,66855,1],[66864,66915,1],[67072,67382,1],[67392,67413,1],[67424,67431,1],[67584,67589,1],[67592,67594,2],[67595,67637,1],[67639,67640,1],[67644,67647,3],[67648,67669,1],[67680,67702,1],[67712,67742,1],[67808,67826,1],[67828,67829,1],[67840,67861,1],[67872,67897,1],[67968,68023,1],[68030,68031,1],[68096,68112,16],[68113,68115,1],[68117,68119,1],[68121,68149,1],[68192,68220,1],[68224,68252,1],[68288,68295,1],[68297,68324,1],[68352,68405,1],[68416,68437,1],[68448,68466,1],[68480,68497,1],[68608,68680,1],[68864,68899,1],[69248,69289,1],[69296,69297,1],[69376,69404,1],[69415,69424,9],[69425,69445,1],[69488,69505,1],[69552,69572,1],[69600,69622,1],[69635,69687,1],[69745,69746,1],[69749,69763,14],[69764,69807,1],[69840,69864,1],[69891,69926,1],[69956,69959,3],[69968,70002,1],[70006,70019,13],[70020,70066,1],[70081,70084,1],[70106,70108,2],[70144,70161,1],[70163,70187,1],[70207,70208,1],[70272,70278,1],[70280,70282,2],[70283,70285,1],[70287,70301,1],[70303,70312,1],[70320,70366,1],[70405,70412,1],[70415,70416,1],[70419,70440,1],[70442,70448,1],[70450,70451,1],[70453,70457,1],[70461,70480,19],[70493,70497,1],[70656,70708,1],[70727,70730,1],[70751,70753,1],[70784,70831,1],[70852,70853,1],[70855,71040,185],[71041,71086,1],[71128,71131,1],[71168,71215,1],[71236,71296,60],[71297,71338,1],[71352,71424,72],[71425,71450,1],[71488,71494,1],[71680,71723,1],[71935,71942,1],[71945,71948,3],[71949,71955,1],[71957,71958,1],[71960,71983,1],[71999,72001,2],[72096,72103,1],[72106,72144,1],[72161,72163,2],[72192,72203,11],[72204,72242,1],[72250,72272,22],[72284,72329,1],[72349,72368,19],[72369,72440,1],[72704,72712,1],[72714,72750,1],[72768,72818,50],[72819,72847,1],[72960,72966,1],[72968,72969,1],[72971,73008,1],[73030,73056,26],[73057,73061,1],[73063,73064,1],[73066,73097,1],[73112,73440,328],[73441,73458,1],[73474,73476,2],[73477,73488,1],[73490,73523,1],[73648,73728,80],[73729,74649,1],[74880,75075,1],[77712,77808,1],[77824,78895,1],[78913,78918,1],[82944,83526,1],[92160,92728,1],[92736,92766,1],[92784,92862,1],[92880,92909,1],[92928,92975,1],[93027,93047,1],[93053,93071,1],[93952,94026,1],[94032,94208,176],[94209,100343,1],[100352,101589,1],[101632,101640,1],[110592,110882,1],[110898,110928,30],[110929,110930,1],[110933,110948,15],[110949,110951,1],[110960,111355,1],[113664,113770,1],[113776,113788,1],[113792,113800,1],[113808,113817,1],[122634,123136,502],[123137,123180,1],[123214,123536,322],[123537,123565,1],[123584,123627,1],[124112,124138,1],[124896,124902,1],[124904,124907,1],[124909,124910,1],[124912,124926,1],[124928,125124,1],[126464,126467,1],[126469,126495,1],[126497,126498,1],[126500,126503,3],[126505,126514,1],[126516,126519,1],[126521,126523,2],[126530,126535,5],[126537,126541,2],[126542,126543,1],[126545,126546,1],[126548,126551,3],[126553,126561,2],[126562,126564,2],[126567,126570,1],[126572,126578,1],[126580,126583,1],[126585,126588,1],[126590,126592,2],[126593,126601,1],[126603,126619,1],[126625,126627,1],[126629,126633,1],[126635,126651,1],[131072,173791,1],[173824,177977,1],[177984,178205,1],[178208,183969,1],[183984,191456,1],[191472,192093,1],[194560,195101,1],[196608,201546,1],[201552,205743,1]]),_(d,"Lt",[[453,459,3],[498,8072,7574],[8073,8079,1],[8088,8095,1],[8104,8111,1],[8124,8140,16],[8188,8188,1]]),_(d,"foldLt",[[452,454,2],[455,457,2],[458,460,2],[497,499,2],[8064,8071,1],[8080,8087,1],[8096,8103,1],[8115,8131,16],[8179,8179,1]]),_(d,"Lu",[[65,90,1],[192,214,1],[216,222,1],[256,310,2],[313,327,2],[330,376,2],[377,381,2],[385,386,1],[388,390,2],[391,393,2],[394,395,1],[398,401,1],[403,404,1],[406,408,1],[412,413,1],[415,416,1],[418,422,2],[423,425,2],[428,430,2],[431,433,2],[434,435,1],[437,439,2],[440,444,4],[452,461,3],[463,475,2],[478,494,2],[497,500,3],[502,504,1],[506,562,2],[570,571,1],[573,574,1],[577,579,2],[580,582,1],[584,590,2],[880,882,2],[886,895,9],[902,904,2],[905,906,1],[908,910,2],[911,913,2],[914,929,1],[931,939,1],[975,978,3],[979,980,1],[984,1006,2],[1012,1015,3],[1017,1018,1],[1021,1071,1],[1120,1152,2],[1162,1216,2],[1217,1229,2],[1232,1326,2],[1329,1366,1],[4256,4293,1],[4295,4301,6],[5024,5109,1],[7312,7354,1],[7357,7359,1],[7680,7828,2],[7838,7934,2],[7944,7951,1],[7960,7965,1],[7976,7983,1],[7992,7999,1],[8008,8013,1],[8025,8031,2],[8040,8047,1],[8120,8123,1],[8136,8139,1],[8152,8155,1],[8168,8172,1],[8184,8187,1],[8450,8455,5],[8459,8461,1],[8464,8466,1],[8469,8473,4],[8474,8477,1],[8484,8490,2],[8491,8493,1],[8496,8499,1],[8510,8511,1],[8517,8579,62],[11264,11311,1],[11360,11362,2],[11363,11364,1],[11367,11373,2],[11374,11376,1],[11378,11381,3],[11390,11392,1],[11394,11490,2],[11499,11501,2],[11506,42560,31054],[42562,42604,2],[42624,42650,2],[42786,42798,2],[42802,42862,2],[42873,42877,2],[42878,42886,2],[42891,42893,2],[42896,42898,2],[42902,42922,2],[42923,42926,1],[42928,42932,1],[42934,42948,2],[42949,42951,1],[42953,42960,7],[42966,42968,2],[42997,65313,22316],[65314,65338,1],[66560,66599,1],[66736,66771,1],[66928,66938,1],[66940,66954,1],[66956,66962,1],[66964,66965,1],[68736,68786,1],[71840,71871,1],[93760,93791,1],[119808,119833,1],[119860,119885,1],[119912,119937,1],[119964,119966,2],[119967,119973,3],[119974,119977,3],[119978,119980,1],[119982,119989,1],[120016,120041,1],[120068,120069,1],[120071,120074,1],[120077,120084,1],[120086,120092,1],[120120,120121,1],[120123,120126,1],[120128,120132,1],[120134,120138,4],[120139,120144,1],[120172,120197,1],[120224,120249,1],[120276,120301,1],[120328,120353,1],[120380,120405,1],[120432,120457,1],[120488,120512,1],[120546,120570,1],[120604,120628,1],[120662,120686,1],[120720,120744,1],[120778,125184,4406],[125185,125217,1]]),_(d,"Upper",d.Lu),_(d,"foldLu",[[97,122,1],[181,223,42],[224,246,1],[248,255,1],[257,303,2],[307,311,2],[314,328,2],[331,375,2],[378,382,2],[383,384,1],[387,389,2],[392,396,4],[402,405,3],[409,410,1],[414,417,3],[419,421,2],[424,429,5],[432,436,4],[438,441,3],[445,447,2],[453,454,1],[456,457,1],[459,460,1],[462,476,2],[477,495,2],[498,499,1],[501,505,4],[507,543,2],[547,563,2],[572,575,3],[576,578,2],[583,591,2],[592,596,1],[598,599,1],[601,603,2],[604,608,4],[609,613,2],[614,616,2],[617,620,1],[623,625,2],[626,629,3],[637,640,3],[642,643,1],[647,652,1],[658,669,11],[670,837,167],[881,883,2],[887,891,4],[892,893,1],[940,943,1],[945,974,1],[976,977,1],[981,983,1],[985,1007,2],[1008,1011,1],[1013,1019,3],[1072,1119,1],[1121,1153,2],[1163,1215,2],[1218,1230,2],[1231,1327,2],[1377,1414,1],[4304,4346,1],[4349,4351,1],[5112,5117,1],[7296,7304,1],[7545,7549,4],[7566,7681,115],[7683,7829,2],[7835,7841,6],[7843,7935,2],[7936,7943,1],[7952,7957,1],[7968,7975,1],[7984,7991,1],[8e3,8005,1],[8017,8023,2],[8032,8039,1],[8048,8061,1],[8112,8113,1],[8126,8144,18],[8145,8160,15],[8161,8165,4],[8526,8580,54],[11312,11359,1],[11361,11365,4],[11366,11372,2],[11379,11382,3],[11393,11491,2],[11500,11502,2],[11507,11520,13],[11521,11557,1],[11559,11565,6],[42561,42605,2],[42625,42651,2],[42787,42799,2],[42803,42863,2],[42874,42876,2],[42879,42887,2],[42892,42897,5],[42899,42900,1],[42903,42921,2],[42933,42947,2],[42952,42954,2],[42961,42967,6],[42969,42998,29],[43859,43888,29],[43889,43967,1],[65345,65370,1],[66600,66639,1],[66776,66811,1],[66967,66977,1],[66979,66993,1],[66995,67001,1],[67003,67004,1],[68800,68850,1],[71872,71903,1],[93792,93823,1],[125218,125251,1]]),_(d,"M",[[768,879,1],[1155,1161,1],[1425,1469,1],[1471,1473,2],[1474,1476,2],[1477,1479,2],[1552,1562,1],[1611,1631,1],[1648,1750,102],[1751,1756,1],[1759,1764,1],[1767,1768,1],[1770,1773,1],[1809,1840,31],[1841,1866,1],[1958,1968,1],[2027,2035,1],[2045,2070,25],[2071,2073,1],[2075,2083,1],[2085,2087,1],[2089,2093,1],[2137,2139,1],[2200,2207,1],[2250,2273,1],[2275,2307,1],[2362,2364,1],[2366,2383,1],[2385,2391,1],[2402,2403,1],[2433,2435,1],[2492,2494,2],[2495,2500,1],[2503,2504,1],[2507,2509,1],[2519,2530,11],[2531,2558,27],[2561,2563,1],[2620,2622,2],[2623,2626,1],[2631,2632,1],[2635,2637,1],[2641,2672,31],[2673,2677,4],[2689,2691,1],[2748,2750,2],[2751,2757,1],[2759,2761,1],[2763,2765,1],[2786,2787,1],[2810,2815,1],[2817,2819,1],[2876,2878,2],[2879,2884,1],[2887,2888,1],[2891,2893,1],[2901,2903,1],[2914,2915,1],[2946,3006,60],[3007,3010,1],[3014,3016,1],[3018,3021,1],[3031,3072,41],[3073,3076,1],[3132,3134,2],[3135,3140,1],[3142,3144,1],[3146,3149,1],[3157,3158,1],[3170,3171,1],[3201,3203,1],[3260,3262,2],[3263,3268,1],[3270,3272,1],[3274,3277,1],[3285,3286,1],[3298,3299,1],[3315,3328,13],[3329,3331,1],[3387,3388,1],[3390,3396,1],[3398,3400,1],[3402,3405,1],[3415,3426,11],[3427,3457,30],[3458,3459,1],[3530,3535,5],[3536,3540,1],[3542,3544,2],[3545,3551,1],[3570,3571,1],[3633,3636,3],[3637,3642,1],[3655,3662,1],[3761,3764,3],[3765,3772,1],[3784,3790,1],[3864,3865,1],[3893,3897,2],[3902,3903,1],[3953,3972,1],[3974,3975,1],[3981,3991,1],[3993,4028,1],[4038,4139,101],[4140,4158,1],[4182,4185,1],[4190,4192,1],[4194,4196,1],[4199,4205,1],[4209,4212,1],[4226,4237,1],[4239,4250,11],[4251,4253,1],[4957,4959,1],[5906,5909,1],[5938,5940,1],[5970,5971,1],[6002,6003,1],[6068,6099,1],[6109,6155,46],[6156,6157,1],[6159,6277,118],[6278,6313,35],[6432,6443,1],[6448,6459,1],[6679,6683,1],[6741,6750,1],[6752,6780,1],[6783,6832,49],[6833,6862,1],[6912,6916,1],[6964,6980,1],[7019,7027,1],[7040,7042,1],[7073,7085,1],[7142,7155,1],[7204,7223,1],[7376,7378,1],[7380,7400,1],[7405,7412,7],[7415,7417,1],[7616,7679,1],[8400,8432,1],[11503,11505,1],[11647,11744,97],[11745,11775,1],[12330,12335,1],[12441,12442,1],[42607,42610,1],[42612,42621,1],[42654,42655,1],[42736,42737,1],[43010,43014,4],[43019,43043,24],[43044,43047,1],[43052,43136,84],[43137,43188,51],[43189,43205,1],[43232,43249,1],[43263,43302,39],[43303,43309,1],[43335,43347,1],[43392,43395,1],[43443,43456,1],[43493,43561,68],[43562,43574,1],[43587,43596,9],[43597,43643,46],[43644,43645,1],[43696,43698,2],[43699,43700,1],[43703,43704,1],[43710,43711,1],[43713,43755,42],[43756,43759,1],[43765,43766,1],[44003,44010,1],[44012,44013,1],[64286,65024,738],[65025,65039,1],[65056,65071,1],[66045,66272,227],[66422,66426,1],[68097,68099,1],[68101,68102,1],[68108,68111,1],[68152,68154,1],[68159,68325,166],[68326,68900,574],[68901,68903,1],[69291,69292,1],[69373,69375,1],[69446,69456,1],[69506,69509,1],[69632,69634,1],[69688,69702,1],[69744,69747,3],[69748,69759,11],[69760,69762,1],[69808,69818,1],[69826,69888,62],[69889,69890,1],[69927,69940,1],[69957,69958,1],[70003,70016,13],[70017,70018,1],[70067,70080,1],[70089,70092,1],[70094,70095,1],[70188,70199,1],[70206,70209,3],[70367,70378,1],[70400,70403,1],[70459,70460,1],[70462,70468,1],[70471,70472,1],[70475,70477,1],[70487,70498,11],[70499,70502,3],[70503,70508,1],[70512,70516,1],[70709,70726,1],[70750,70832,82],[70833,70851,1],[71087,71093,1],[71096,71104,1],[71132,71133,1],[71216,71232,1],[71339,71351,1],[71453,71467,1],[71724,71738,1],[71984,71989,1],[71991,71992,1],[71995,71998,1],[72e3,72002,2],[72003,72145,142],[72146,72151,1],[72154,72160,1],[72164,72193,29],[72194,72202,1],[72243,72249,1],[72251,72254,1],[72263,72273,10],[72274,72283,1],[72330,72345,1],[72751,72758,1],[72760,72767,1],[72850,72871,1],[72873,72886,1],[73009,73014,1],[73018,73020,2],[73021,73023,2],[73024,73029,1],[73031,73098,67],[73099,73102,1],[73104,73105,1],[73107,73111,1],[73459,73462,1],[73472,73473,1],[73475,73524,49],[73525,73530,1],[73534,73538,1],[78912,78919,7],[78920,78933,1],[92912,92916,1],[92976,92982,1],[94031,94033,2],[94034,94087,1],[94095,94098,1],[94180,94192,12],[94193,113821,19628],[113822,118528,4706],[118529,118573,1],[118576,118598,1],[119141,119145,1],[119149,119154,1],[119163,119170,1],[119173,119179,1],[119210,119213,1],[119362,119364,1],[121344,121398,1],[121403,121452,1],[121461,121476,15],[121499,121503,1],[121505,121519,1],[122880,122886,1],[122888,122904,1],[122907,122913,1],[122915,122916,1],[122918,122922,1],[123023,123184,161],[123185,123190,1],[123566,123628,62],[123629,123631,1],[124140,124143,1],[125136,125142,1],[125252,125258,1],[917760,917999,1]]),_(d,"foldM",[[921,953,32],[8126,8126,1]]),_(d,"Mc",[[2307,2363,56],[2366,2368,1],[2377,2380,1],[2382,2383,1],[2434,2435,1],[2494,2496,1],[2503,2504,1],[2507,2508,1],[2519,2563,44],[2622,2624,1],[2691,2750,59],[2751,2752,1],[2761,2763,2],[2764,2818,54],[2819,2878,59],[2880,2887,7],[2888,2891,3],[2892,2903,11],[3006,3007,1],[3009,3010,1],[3014,3016,1],[3018,3020,1],[3031,3073,42],[3074,3075,1],[3137,3140,1],[3202,3203,1],[3262,3264,2],[3265,3268,1],[3271,3272,1],[3274,3275,1],[3285,3286,1],[3315,3330,15],[3331,3390,59],[3391,3392,1],[3398,3400,1],[3402,3404,1],[3415,3458,43],[3459,3535,76],[3536,3537,1],[3544,3551,1],[3570,3571,1],[3902,3903,1],[3967,4139,172],[4140,4145,5],[4152,4155,3],[4156,4182,26],[4183,4194,11],[4195,4196,1],[4199,4205,1],[4227,4228,1],[4231,4236,1],[4239,4250,11],[4251,4252,1],[5909,5940,31],[6070,6078,8],[6079,6085,1],[6087,6088,1],[6435,6438,1],[6441,6443,1],[6448,6449,1],[6451,6456,1],[6681,6682,1],[6741,6743,2],[6753,6755,2],[6756,6765,9],[6766,6770,1],[6916,6965,49],[6971,6973,2],[6974,6977,1],[6979,6980,1],[7042,7073,31],[7078,7079,1],[7082,7143,61],[7146,7148,1],[7150,7154,4],[7155,7204,49],[7205,7211,1],[7220,7221,1],[7393,7415,22],[12334,12335,1],[43043,43044,1],[43047,43136,89],[43137,43188,51],[43189,43203,1],[43346,43347,1],[43395,43444,49],[43445,43450,5],[43451,43454,3],[43455,43456,1],[43567,43568,1],[43571,43572,1],[43597,43643,46],[43645,43755,110],[43758,43759,1],[43765,44003,238],[44004,44006,2],[44007,44009,2],[44010,44012,2],[69632,69634,2],[69762,69808,46],[69809,69810,1],[69815,69816,1],[69932,69957,25],[69958,70018,60],[70067,70069,1],[70079,70080,1],[70094,70188,94],[70189,70190,1],[70194,70195,1],[70197,70368,171],[70369,70370,1],[70402,70403,1],[70462,70463,1],[70465,70468,1],[70471,70472,1],[70475,70477,1],[70487,70498,11],[70499,70709,210],[70710,70711,1],[70720,70721,1],[70725,70832,107],[70833,70834,1],[70841,70843,2],[70844,70846,1],[70849,71087,238],[71088,71089,1],[71096,71099,1],[71102,71216,114],[71217,71218,1],[71227,71228,1],[71230,71340,110],[71342,71343,1],[71350,71456,106],[71457,71462,5],[71724,71726,1],[71736,71984,248],[71985,71989,1],[71991,71992,1],[71997,72e3,3],[72002,72145,143],[72146,72147,1],[72156,72159,1],[72164,72249,85],[72279,72280,1],[72343,72751,408],[72766,72873,107],[72881,72884,3],[73098,73102,1],[73107,73108,1],[73110,73461,351],[73462,73475,13],[73524,73525,1],[73534,73535,1],[73537,94033,20496],[94034,94087,1],[94192,94193,1],[119141,119142,1],[119149,119154,1]]),_(d,"Me",[[1160,1161,1],[6846,8413,1567],[8414,8416,1],[8418,8420,1],[42608,42610,1]]),_(d,"Mn",[[768,879,1],[1155,1159,1],[1425,1469,1],[1471,1473,2],[1474,1476,2],[1477,1479,2],[1552,1562,1],[1611,1631,1],[1648,1750,102],[1751,1756,1],[1759,1764,1],[1767,1768,1],[1770,1773,1],[1809,1840,31],[1841,1866,1],[1958,1968,1],[2027,2035,1],[2045,2070,25],[2071,2073,1],[2075,2083,1],[2085,2087,1],[2089,2093,1],[2137,2139,1],[2200,2207,1],[2250,2273,1],[2275,2306,1],[2362,2364,2],[2369,2376,1],[2381,2385,4],[2386,2391,1],[2402,2403,1],[2433,2492,59],[2497,2500,1],[2509,2530,21],[2531,2558,27],[2561,2562,1],[2620,2625,5],[2626,2631,5],[2632,2635,3],[2636,2637,1],[2641,2672,31],[2673,2677,4],[2689,2690,1],[2748,2753,5],[2754,2757,1],[2759,2760,1],[2765,2786,21],[2787,2810,23],[2811,2815,1],[2817,2876,59],[2879,2881,2],[2882,2884,1],[2893,2901,8],[2902,2914,12],[2915,2946,31],[3008,3021,13],[3072,3076,4],[3132,3134,2],[3135,3136,1],[3142,3144,1],[3146,3149,1],[3157,3158,1],[3170,3171,1],[3201,3260,59],[3263,3270,7],[3276,3277,1],[3298,3299,1],[3328,3329,1],[3387,3388,1],[3393,3396,1],[3405,3426,21],[3427,3457,30],[3530,3538,8],[3539,3540,1],[3542,3633,91],[3636,3642,1],[3655,3662,1],[3761,3764,3],[3765,3772,1],[3784,3790,1],[3864,3865,1],[3893,3897,2],[3953,3966,1],[3968,3972,1],[3974,3975,1],[3981,3991,1],[3993,4028,1],[4038,4141,103],[4142,4144,1],[4146,4151,1],[4153,4154,1],[4157,4158,1],[4184,4185,1],[4190,4192,1],[4209,4212,1],[4226,4229,3],[4230,4237,7],[4253,4957,704],[4958,4959,1],[5906,5908,1],[5938,5939,1],[5970,5971,1],[6002,6003,1],[6068,6069,1],[6071,6077,1],[6086,6089,3],[6090,6099,1],[6109,6155,46],[6156,6157,1],[6159,6277,118],[6278,6313,35],[6432,6434,1],[6439,6440,1],[6450,6457,7],[6458,6459,1],[6679,6680,1],[6683,6742,59],[6744,6750,1],[6752,6754,2],[6757,6764,1],[6771,6780,1],[6783,6832,49],[6833,6845,1],[6847,6862,1],[6912,6915,1],[6964,6966,2],[6967,6970,1],[6972,6978,6],[7019,7027,1],[7040,7041,1],[7074,7077,1],[7080,7081,1],[7083,7085,1],[7142,7144,2],[7145,7149,4],[7151,7153,1],[7212,7219,1],[7222,7223,1],[7376,7378,1],[7380,7392,1],[7394,7400,1],[7405,7412,7],[7416,7417,1],[7616,7679,1],[8400,8412,1],[8417,8421,4],[8422,8432,1],[11503,11505,1],[11647,11744,97],[11745,11775,1],[12330,12333,1],[12441,12442,1],[42607,42612,5],[42613,42621,1],[42654,42655,1],[42736,42737,1],[43010,43014,4],[43019,43045,26],[43046,43052,6],[43204,43205,1],[43232,43249,1],[43263,43302,39],[43303,43309,1],[43335,43345,1],[43392,43394,1],[43443,43446,3],[43447,43449,1],[43452,43453,1],[43493,43561,68],[43562,43566,1],[43569,43570,1],[43573,43574,1],[43587,43596,9],[43644,43696,52],[43698,43700,1],[43703,43704,1],[43710,43711,1],[43713,43756,43],[43757,43766,9],[44005,44008,3],[44013,64286,20273],[65024,65039,1],[65056,65071,1],[66045,66272,227],[66422,66426,1],[68097,68099,1],[68101,68102,1],[68108,68111,1],[68152,68154,1],[68159,68325,166],[68326,68900,574],[68901,68903,1],[69291,69292,1],[69373,69375,1],[69446,69456,1],[69506,69509,1],[69633,69688,55],[69689,69702,1],[69744,69747,3],[69748,69759,11],[69760,69761,1],[69811,69814,1],[69817,69818,1],[69826,69888,62],[69889,69890,1],[69927,69931,1],[69933,69940,1],[70003,70016,13],[70017,70070,53],[70071,70078,1],[70089,70092,1],[70095,70191,96],[70192,70193,1],[70196,70198,2],[70199,70206,7],[70209,70367,158],[70371,70378,1],[70400,70401,1],[70459,70460,1],[70464,70502,38],[70503,70508,1],[70512,70516,1],[70712,70719,1],[70722,70724,1],[70726,70750,24],[70835,70840,1],[70842,70847,5],[70848,70850,2],[70851,71090,239],[71091,71093,1],[71100,71101,1],[71103,71104,1],[71132,71133,1],[71219,71226,1],[71229,71231,2],[71232,71339,107],[71341,71344,3],[71345,71349,1],[71351,71453,102],[71454,71455,1],[71458,71461,1],[71463,71467,1],[71727,71735,1],[71737,71738,1],[71995,71996,1],[71998,72003,5],[72148,72151,1],[72154,72155,1],[72160,72193,33],[72194,72202,1],[72243,72248,1],[72251,72254,1],[72263,72273,10],[72274,72278,1],[72281,72283,1],[72330,72342,1],[72344,72345,1],[72752,72758,1],[72760,72765,1],[72767,72850,83],[72851,72871,1],[72874,72880,1],[72882,72883,1],[72885,72886,1],[73009,73014,1],[73018,73020,2],[73021,73023,2],[73024,73029,1],[73031,73104,73],[73105,73109,4],[73111,73459,348],[73460,73472,12],[73473,73526,53],[73527,73530,1],[73536,73538,2],[78912,78919,7],[78920,78933,1],[92912,92916,1],[92976,92982,1],[94031,94095,64],[94096,94098,1],[94180,113821,19641],[113822,118528,4706],[118529,118573,1],[118576,118598,1],[119143,119145,1],[119163,119170,1],[119173,119179,1],[119210,119213,1],[119362,119364,1],[121344,121398,1],[121403,121452,1],[121461,121476,15],[121499,121503,1],[121505,121519,1],[122880,122886,1],[122888,122904,1],[122907,122913,1],[122915,122916,1],[122918,122922,1],[123023,123184,161],[123185,123190,1],[123566,123628,62],[123629,123631,1],[124140,124143,1],[125136,125142,1],[125252,125258,1],[917760,917999,1]]),_(d,"foldMn",[[921,953,32],[8126,8126,1]]),_(d,"N",[[48,57,1],[178,179,1],[185,188,3],[189,190,1],[1632,1641,1],[1776,1785,1],[1984,1993,1],[2406,2415,1],[2534,2543,1],[2548,2553,1],[2662,2671,1],[2790,2799,1],[2918,2927,1],[2930,2935,1],[3046,3058,1],[3174,3183,1],[3192,3198,1],[3302,3311,1],[3416,3422,1],[3430,3448,1],[3558,3567,1],[3664,3673,1],[3792,3801,1],[3872,3891,1],[4160,4169,1],[4240,4249,1],[4969,4988,1],[5870,5872,1],[6112,6121,1],[6128,6137,1],[6160,6169,1],[6470,6479,1],[6608,6618,1],[6784,6793,1],[6800,6809,1],[6992,7001,1],[7088,7097,1],[7232,7241,1],[7248,7257,1],[8304,8308,4],[8309,8313,1],[8320,8329,1],[8528,8578,1],[8581,8585,1],[9312,9371,1],[9450,9471,1],[10102,10131,1],[11517,12295,778],[12321,12329,1],[12344,12346,1],[12690,12693,1],[12832,12841,1],[12872,12879,1],[12881,12895,1],[12928,12937,1],[12977,12991,1],[42528,42537,1],[42726,42735,1],[43056,43061,1],[43216,43225,1],[43264,43273,1],[43472,43481,1],[43504,43513,1],[43600,43609,1],[44016,44025,1],[65296,65305,1],[65799,65843,1],[65856,65912,1],[65930,65931,1],[66273,66299,1],[66336,66339,1],[66369,66378,9],[66513,66517,1],[66720,66729,1],[67672,67679,1],[67705,67711,1],[67751,67759,1],[67835,67839,1],[67862,67867,1],[68028,68029,1],[68032,68047,1],[68050,68095,1],[68160,68168,1],[68221,68222,1],[68253,68255,1],[68331,68335,1],[68440,68447,1],[68472,68479,1],[68521,68527,1],[68858,68863,1],[68912,68921,1],[69216,69246,1],[69405,69414,1],[69457,69460,1],[69573,69579,1],[69714,69743,1],[69872,69881,1],[69942,69951,1],[70096,70105,1],[70113,70132,1],[70384,70393,1],[70736,70745,1],[70864,70873,1],[71248,71257,1],[71360,71369,1],[71472,71483,1],[71904,71922,1],[72016,72025,1],[72784,72812,1],[73040,73049,1],[73120,73129,1],[73552,73561,1],[73664,73684,1],[74752,74862,1],[92768,92777,1],[92864,92873,1],[93008,93017,1],[93019,93025,1],[93824,93846,1],[119488,119507,1],[119520,119539,1],[119648,119672,1],[120782,120831,1],[123200,123209,1],[123632,123641,1],[124144,124153,1],[125127,125135,1],[125264,125273,1],[126065,126123,1],[126125,126127,1],[126129,126132,1],[126209,126253,1],[126255,126269,1],[127232,127244,1],[130032,130041,1]]),_(d,"Nd",[[48,57,1],[1632,1641,1],[1776,1785,1],[1984,1993,1],[2406,2415,1],[2534,2543,1],[2662,2671,1],[2790,2799,1],[2918,2927,1],[3046,3055,1],[3174,3183,1],[3302,3311,1],[3430,3439,1],[3558,3567,1],[3664,3673,1],[3792,3801,1],[3872,3881,1],[4160,4169,1],[4240,4249,1],[6112,6121,1],[6160,6169,1],[6470,6479,1],[6608,6617,1],[6784,6793,1],[6800,6809,1],[6992,7001,1],[7088,7097,1],[7232,7241,1],[7248,7257,1],[42528,42537,1],[43216,43225,1],[43264,43273,1],[43472,43481,1],[43504,43513,1],[43600,43609,1],[44016,44025,1],[65296,65305,1],[66720,66729,1],[68912,68921,1],[69734,69743,1],[69872,69881,1],[69942,69951,1],[70096,70105,1],[70384,70393,1],[70736,70745,1],[70864,70873,1],[71248,71257,1],[71360,71369,1],[71472,71481,1],[71904,71913,1],[72016,72025,1],[72784,72793,1],[73040,73049,1],[73120,73129,1],[73552,73561,1],[92768,92777,1],[92864,92873,1],[93008,93017,1],[120782,120831,1],[123200,123209,1],[123632,123641,1],[124144,124153,1],[125264,125273,1],[130032,130041,1]]),_(d,"Nl",[[5870,5872,1],[8544,8578,1],[8581,8584,1],[12295,12321,26],[12322,12329,1],[12344,12346,1],[42726,42735,1],[65856,65908,1],[66369,66378,9],[66513,66517,1],[74752,74862,1]]),_(d,"No",[[178,179,1],[185,188,3],[189,190,1],[2548,2553,1],[2930,2935,1],[3056,3058,1],[3192,3198,1],[3416,3422,1],[3440,3448,1],[3882,3891,1],[4969,4988,1],[6128,6137,1],[6618,8304,1686],[8308,8313,1],[8320,8329,1],[8528,8543,1],[8585,9312,727],[9313,9371,1],[9450,9471,1],[10102,10131,1],[11517,12690,1173],[12691,12693,1],[12832,12841,1],[12872,12879,1],[12881,12895,1],[12928,12937,1],[12977,12991,1],[43056,43061,1],[65799,65843,1],[65909,65912,1],[65930,65931,1],[66273,66299,1],[66336,66339,1],[67672,67679,1],[67705,67711,1],[67751,67759,1],[67835,67839,1],[67862,67867,1],[68028,68029,1],[68032,68047,1],[68050,68095,1],[68160,68168,1],[68221,68222,1],[68253,68255,1],[68331,68335,1],[68440,68447,1],[68472,68479,1],[68521,68527,1],[68858,68863,1],[69216,69246,1],[69405,69414,1],[69457,69460,1],[69573,69579,1],[69714,69733,1],[70113,70132,1],[71482,71483,1],[71914,71922,1],[72794,72812,1],[73664,73684,1],[93019,93025,1],[93824,93846,1],[119488,119507,1],[119520,119539,1],[119648,119672,1],[125127,125135,1],[126065,126123,1],[126125,126127,1],[126129,126132,1],[126209,126253,1],[126255,126269,1],[127232,127244,1]]),_(d,"P",[[33,35,1],[37,42,1],[44,47,1],[58,59,1],[63,64,1],[91,93,1],[95,123,28],[125,161,36],[167,171,4],[182,183,1],[187,191,4],[894,903,9],[1370,1375,1],[1417,1418,1],[1470,1472,2],[1475,1478,3],[1523,1524,1],[1545,1546,1],[1548,1549,1],[1563,1565,2],[1566,1567,1],[1642,1645,1],[1748,1792,44],[1793,1805,1],[2039,2041,1],[2096,2110,1],[2142,2404,262],[2405,2416,11],[2557,2678,121],[2800,3191,391],[3204,3572,368],[3663,3674,11],[3675,3844,169],[3845,3858,1],[3860,3898,38],[3899,3901,1],[3973,4048,75],[4049,4052,1],[4057,4058,1],[4170,4175,1],[4347,4960,613],[4961,4968,1],[5120,5742,622],[5787,5788,1],[5867,5869,1],[5941,5942,1],[6100,6102,1],[6104,6106,1],[6144,6154,1],[6468,6469,1],[6686,6687,1],[6816,6822,1],[6824,6829,1],[7002,7008,1],[7037,7038,1],[7164,7167,1],[7227,7231,1],[7294,7295,1],[7360,7367,1],[7379,8208,829],[8209,8231,1],[8240,8259,1],[8261,8273,1],[8275,8286,1],[8317,8318,1],[8333,8334,1],[8968,8971,1],[9001,9002,1],[10088,10101,1],[10181,10182,1],[10214,10223,1],[10627,10648,1],[10712,10715,1],[10748,10749,1],[11513,11516,1],[11518,11519,1],[11632,11776,144],[11777,11822,1],[11824,11855,1],[11858,11869,1],[12289,12291,1],[12296,12305,1],[12308,12319,1],[12336,12349,13],[12448,12539,91],[42238,42239,1],[42509,42511,1],[42611,42622,11],[42738,42743,1],[43124,43127,1],[43214,43215,1],[43256,43258,1],[43260,43310,50],[43311,43359,48],[43457,43469,1],[43486,43487,1],[43612,43615,1],[43742,43743,1],[43760,43761,1],[44011,64830,20819],[64831,65040,209],[65041,65049,1],[65072,65106,1],[65108,65121,1],[65123,65128,5],[65130,65131,1],[65281,65283,1],[65285,65290,1],[65292,65295,1],[65306,65307,1],[65311,65312,1],[65339,65341,1],[65343,65371,28],[65373,65375,2],[65376,65381,1],[65792,65794,1],[66463,66512,49],[66927,67671,744],[67871,67903,32],[68176,68184,1],[68223,68336,113],[68337,68342,1],[68409,68415,1],[68505,68508,1],[69293,69461,168],[69462,69465,1],[69510,69513,1],[69703,69709,1],[69819,69820,1],[69822,69825,1],[69952,69955,1],[70004,70005,1],[70085,70088,1],[70093,70107,14],[70109,70111,1],[70200,70205,1],[70313,70731,418],[70732,70735,1],[70746,70747,1],[70749,70854,105],[71105,71127,1],[71233,71235,1],[71264,71276,1],[71353,71484,131],[71485,71486,1],[71739,72004,265],[72005,72006,1],[72162,72255,93],[72256,72262,1],[72346,72348,1],[72350,72354,1],[72448,72457,1],[72769,72773,1],[72816,72817,1],[73463,73464,1],[73539,73551,1],[73727,74864,1137],[74865,74868,1],[77809,77810,1],[92782,92783,1],[92917,92983,66],[92984,92987,1],[92996,93847,851],[93848,93850,1],[94178,113823,19645],[121479,121483,1],[125278,125279,1]]),_(d,"Pc",[[95,8255,8160],[8256,8276,20],[65075,65076,1],[65101,65103,1],[65343,65343,1]]),_(d,"Pd",[[45,1418,1373],[1470,5120,3650],[6150,8208,2058],[8209,8213,1],[11799,11802,3],[11834,11835,1],[11840,11869,29],[12316,12336,20],[12448,65073,52625],[65074,65112,38],[65123,65293,170],[69293,69293,1]]),_(d,"Pe",[[41,93,52],[125,3899,3774],[3901,5788,1887],[8262,8318,56],[8334,8969,635],[8971,9002,31],[10089,10101,2],[10182,10215,33],[10217,10223,2],[10628,10648,2],[10713,10715,2],[10749,11811,1062],[11813,11817,2],[11862,11868,2],[12297,12305,2],[12309,12315,2],[12318,12319,1],[64830,65048,218],[65078,65092,2],[65096,65114,18],[65116,65118,2],[65289,65341,52],[65373,65379,3]]),_(d,"Pf",[[187,8217,8030],[8221,8250,29],[11779,11781,2],[11786,11789,3],[11805,11809,4]]),_(d,"Pi",[[171,8216,8045],[8219,8220,1],[8223,8249,26],[11778,11780,2],[11785,11788,3],[11804,11808,4]]),_(d,"Po",[[33,35,1],[37,39,1],[42,46,2],[47,58,11],[59,63,4],[64,92,28],[161,167,6],[182,183,1],[191,894,703],[903,1370,467],[1371,1375,1],[1417,1472,55],[1475,1478,3],[1523,1524,1],[1545,1546,1],[1548,1549,1],[1563,1565,2],[1566,1567,1],[1642,1645,1],[1748,1792,44],[1793,1805,1],[2039,2041,1],[2096,2110,1],[2142,2404,262],[2405,2416,11],[2557,2678,121],[2800,3191,391],[3204,3572,368],[3663,3674,11],[3675,3844,169],[3845,3858,1],[3860,3973,113],[4048,4052,1],[4057,4058,1],[4170,4175,1],[4347,4960,613],[4961,4968,1],[5742,5867,125],[5868,5869,1],[5941,5942,1],[6100,6102,1],[6104,6106,1],[6144,6149,1],[6151,6154,1],[6468,6469,1],[6686,6687,1],[6816,6822,1],[6824,6829,1],[7002,7008,1],[7037,7038,1],[7164,7167,1],[7227,7231,1],[7294,7295,1],[7360,7367,1],[7379,8214,835],[8215,8224,9],[8225,8231,1],[8240,8248,1],[8251,8254,1],[8257,8259,1],[8263,8273,1],[8275,8277,2],[8278,8286,1],[11513,11516,1],[11518,11519,1],[11632,11776,144],[11777,11782,5],[11783,11784,1],[11787,11790,3],[11791,11798,1],[11800,11801,1],[11803,11806,3],[11807,11818,11],[11819,11822,1],[11824,11833,1],[11836,11839,1],[11841,11843,2],[11844,11855,1],[11858,11860,1],[12289,12291,1],[12349,12539,190],[42238,42239,1],[42509,42511,1],[42611,42622,11],[42738,42743,1],[43124,43127,1],[43214,43215,1],[43256,43258,1],[43260,43310,50],[43311,43359,48],[43457,43469,1],[43486,43487,1],[43612,43615,1],[43742,43743,1],[43760,43761,1],[44011,65040,21029],[65041,65046,1],[65049,65072,23],[65093,65094,1],[65097,65100,1],[65104,65106,1],[65108,65111,1],[65119,65121,1],[65128,65130,2],[65131,65281,150],[65282,65283,1],[65285,65287,1],[65290,65294,2],[65295,65306,11],[65307,65311,4],[65312,65340,28],[65377,65380,3],[65381,65792,411],[65793,65794,1],[66463,66512,49],[66927,67671,744],[67871,67903,32],[68176,68184,1],[68223,68336,113],[68337,68342,1],[68409,68415,1],[68505,68508,1],[69461,69465,1],[69510,69513,1],[69703,69709,1],[69819,69820,1],[69822,69825,1],[69952,69955,1],[70004,70005,1],[70085,70088,1],[70093,70107,14],[70109,70111,1],[70200,70205,1],[70313,70731,418],[70732,70735,1],[70746,70747,1],[70749,70854,105],[71105,71127,1],[71233,71235,1],[71264,71276,1],[71353,71484,131],[71485,71486,1],[71739,72004,265],[72005,72006,1],[72162,72255,93],[72256,72262,1],[72346,72348,1],[72350,72354,1],[72448,72457,1],[72769,72773,1],[72816,72817,1],[73463,73464,1],[73539,73551,1],[73727,74864,1137],[74865,74868,1],[77809,77810,1],[92782,92783,1],[92917,92983,66],[92984,92987,1],[92996,93847,851],[93848,93850,1],[94178,113823,19645],[121479,121483,1],[125278,125279,1]]),_(d,"Ps",[[40,91,51],[123,3898,3775],[3900,5787,1887],[8218,8222,4],[8261,8317,56],[8333,8968,635],[8970,9001,31],[10088,10100,2],[10181,10214,33],[10216,10222,2],[10627,10647,2],[10712,10714,2],[10748,11810,1062],[11812,11816,2],[11842,11861,19],[11863,11867,2],[12296,12304,2],[12308,12314,2],[12317,64831,52514],[65047,65077,30],[65079,65091,2],[65095,65113,18],[65115,65117,2],[65288,65339,51],[65371,65375,4],[65378,65378,1]]),_(d,"S",[[36,43,7],[60,62,1],[94,96,2],[124,126,2],[162,166,1],[168,169,1],[172,174,2],[175,177,1],[180,184,4],[215,247,32],[706,709,1],[722,735,1],[741,747,1],[749,751,2],[752,767,1],[885,900,15],[901,1014,113],[1154,1421,267],[1422,1423,1],[1542,1544,1],[1547,1550,3],[1551,1758,207],[1769,1789,20],[1790,2038,248],[2046,2047,1],[2184,2546,362],[2547,2554,7],[2555,2801,246],[2928,3059,131],[3060,3066,1],[3199,3407,208],[3449,3647,198],[3841,3843,1],[3859,3861,2],[3862,3863,1],[3866,3871,1],[3892,3896,2],[4030,4037,1],[4039,4044,1],[4046,4047,1],[4053,4056,1],[4254,4255,1],[5008,5017,1],[5741,6107,366],[6464,6622,158],[6623,6655,1],[7009,7018,1],[7028,7036,1],[8125,8127,2],[8128,8129,1],[8141,8143,1],[8157,8159,1],[8173,8175,1],[8189,8190,1],[8260,8274,14],[8314,8316,1],[8330,8332,1],[8352,8384,1],[8448,8449,1],[8451,8454,1],[8456,8457,1],[8468,8470,2],[8471,8472,1],[8478,8483,1],[8485,8489,2],[8494,8506,12],[8507,8512,5],[8513,8516,1],[8522,8525,1],[8527,8586,59],[8587,8592,5],[8593,8967,1],[8972,9e3,1],[9003,9254,1],[9280,9290,1],[9372,9449,1],[9472,10087,1],[10132,10180,1],[10183,10213,1],[10224,10626,1],[10649,10711,1],[10716,10747,1],[10750,11123,1],[11126,11157,1],[11159,11263,1],[11493,11498,1],[11856,11857,1],[11904,11929,1],[11931,12019,1],[12032,12245,1],[12272,12287,1],[12292,12306,14],[12307,12320,13],[12342,12343,1],[12350,12351,1],[12443,12444,1],[12688,12689,1],[12694,12703,1],[12736,12771,1],[12783,12800,17],[12801,12830,1],[12842,12871,1],[12880,12896,16],[12897,12927,1],[12938,12976,1],[12992,13311,1],[19904,19967,1],[42128,42182,1],[42752,42774,1],[42784,42785,1],[42889,42890,1],[43048,43051,1],[43062,43065,1],[43639,43641,1],[43867,43882,15],[43883,64297,20414],[64434,64450,1],[64832,64847,1],[64975,65020,45],[65021,65023,1],[65122,65124,2],[65125,65126,1],[65129,65284,155],[65291,65308,17],[65309,65310,1],[65342,65344,2],[65372,65374,2],[65504,65510,1],[65512,65518,1],[65532,65533,1],[65847,65855,1],[65913,65929,1],[65932,65934,1],[65936,65948,1],[65952,66e3,48],[66001,66044,1],[67703,67704,1],[68296,71487,3191],[73685,73713,1],[92988,92991,1],[92997,113820,20823],[118608,118723,1],[118784,119029,1],[119040,119078,1],[119081,119140,1],[119146,119148,1],[119171,119172,1],[119180,119209,1],[119214,119274,1],[119296,119361,1],[119365,119552,187],[119553,119638,1],[120513,120539,26],[120571,120597,26],[120629,120655,26],[120687,120713,26],[120745,120771,26],[120832,121343,1],[121399,121402,1],[121453,121460,1],[121462,121475,1],[121477,121478,1],[123215,123647,432],[126124,126128,4],[126254,126704,450],[126705,126976,271],[126977,127019,1],[127024,127123,1],[127136,127150,1],[127153,127167,1],[127169,127183,1],[127185,127221,1],[127245,127405,1],[127462,127490,1],[127504,127547,1],[127552,127560,1],[127568,127569,1],[127584,127589,1],[127744,128727,1],[128732,128748,1],[128752,128764,1],[128768,128886,1],[128891,128985,1],[128992,129003,1],[129008,129024,16],[129025,129035,1],[129040,129095,1],[129104,129113,1],[129120,129159,1],[129168,129197,1],[129200,129201,1],[129280,129619,1],[129632,129645,1],[129648,129660,1],[129664,129672,1],[129680,129725,1],[129727,129733,1],[129742,129755,1],[129760,129768,1],[129776,129784,1],[129792,129938,1],[129940,129994,1]]),_(d,"Sc",[[36,162,126],[163,165,1],[1423,1547,124],[2046,2047,1],[2546,2547,1],[2555,2801,246],[3065,3647,582],[6107,8352,2245],[8353,8384,1],[43064,65020,21956],[65129,65284,155],[65504,65505,1],[65509,65510,1],[73693,73696,1],[123647,126128,2481]]),_(d,"Sk",[[94,96,2],[168,175,7],[180,184,4],[706,709,1],[722,735,1],[741,747,1],[749,751,2],[752,767,1],[885,900,15],[901,2184,1283],[8125,8127,2],[8128,8129,1],[8141,8143,1],[8157,8159,1],[8173,8175,1],[8189,8190,1],[12443,12444,1],[42752,42774,1],[42784,42785,1],[42889,42890,1],[43867,43882,15],[43883,64434,20551],[64435,64450,1],[65342,65344,2],[65507,127995,62488],[127996,127999,1]]),_(d,"Sm",[[43,60,17],[61,62,1],[124,126,2],[172,177,5],[215,247,32],[1014,1542,528],[1543,1544,1],[8260,8274,14],[8314,8316,1],[8330,8332,1],[8472,8512,40],[8513,8516,1],[8523,8592,69],[8593,8596,1],[8602,8603,1],[8608,8614,3],[8622,8654,32],[8655,8658,3],[8660,8692,32],[8693,8959,1],[8992,8993,1],[9084,9115,31],[9116,9139,1],[9180,9185,1],[9655,9665,10],[9720,9727,1],[9839,10176,337],[10177,10180,1],[10183,10213,1],[10224,10239,1],[10496,10626,1],[10649,10711,1],[10716,10747,1],[10750,11007,1],[11056,11076,1],[11079,11084,1],[64297,65122,825],[65124,65126,1],[65291,65308,17],[65309,65310,1],[65372,65374,2],[65506,65513,7],[65514,65516,1],[120513,120539,26],[120571,120597,26],[120629,120655,26],[120687,120713,26],[120745,120771,26],[126704,126705,1]]),_(d,"So",[[166,169,3],[174,176,2],[1154,1421,267],[1422,1550,128],[1551,1758,207],[1769,1789,20],[1790,2038,248],[2554,2928,374],[3059,3064,1],[3066,3199,133],[3407,3449,42],[3841,3843,1],[3859,3861,2],[3862,3863,1],[3866,3871,1],[3892,3896,2],[4030,4037,1],[4039,4044,1],[4046,4047,1],[4053,4056,1],[4254,4255,1],[5008,5017,1],[5741,6464,723],[6622,6655,1],[7009,7018,1],[7028,7036,1],[8448,8449,1],[8451,8454,1],[8456,8457,1],[8468,8470,2],[8471,8478,7],[8479,8483,1],[8485,8489,2],[8494,8506,12],[8507,8522,15],[8524,8525,1],[8527,8586,59],[8587,8597,10],[8598,8601,1],[8604,8607,1],[8609,8610,1],[8612,8613,1],[8615,8621,1],[8623,8653,1],[8656,8657,1],[8659,8661,2],[8662,8691,1],[8960,8967,1],[8972,8991,1],[8994,9e3,1],[9003,9083,1],[9085,9114,1],[9140,9179,1],[9186,9254,1],[9280,9290,1],[9372,9449,1],[9472,9654,1],[9656,9664,1],[9666,9719,1],[9728,9838,1],[9840,10087,1],[10132,10175,1],[10240,10495,1],[11008,11055,1],[11077,11078,1],[11085,11123,1],[11126,11157,1],[11159,11263,1],[11493,11498,1],[11856,11857,1],[11904,11929,1],[11931,12019,1],[12032,12245,1],[12272,12287,1],[12292,12306,14],[12307,12320,13],[12342,12343,1],[12350,12351,1],[12688,12689,1],[12694,12703,1],[12736,12771,1],[12783,12800,17],[12801,12830,1],[12842,12871,1],[12880,12896,16],[12897,12927,1],[12938,12976,1],[12992,13311,1],[19904,19967,1],[42128,42182,1],[43048,43051,1],[43062,43063,1],[43065,43639,574],[43640,43641,1],[64832,64847,1],[64975,65021,46],[65022,65023,1],[65508,65512,4],[65517,65518,1],[65532,65533,1],[65847,65855,1],[65913,65929,1],[65932,65934,1],[65936,65948,1],[65952,66e3,48],[66001,66044,1],[67703,67704,1],[68296,71487,3191],[73685,73692,1],[73697,73713,1],[92988,92991,1],[92997,113820,20823],[118608,118723,1],[118784,119029,1],[119040,119078,1],[119081,119140,1],[119146,119148,1],[119171,119172,1],[119180,119209,1],[119214,119274,1],[119296,119361,1],[119365,119552,187],[119553,119638,1],[120832,121343,1],[121399,121402,1],[121453,121460,1],[121462,121475,1],[121477,121478,1],[123215,126124,2909],[126254,126976,722],[126977,127019,1],[127024,127123,1],[127136,127150,1],[127153,127167,1],[127169,127183,1],[127185,127221,1],[127245,127405,1],[127462,127490,1],[127504,127547,1],[127552,127560,1],[127568,127569,1],[127584,127589,1],[127744,127994,1],[128e3,128727,1],[128732,128748,1],[128752,128764,1],[128768,128886,1],[128891,128985,1],[128992,129003,1],[129008,129024,16],[129025,129035,1],[129040,129095,1],[129104,129113,1],[129120,129159,1],[129168,129197,1],[129200,129201,1],[129280,129619,1],[129632,129645,1],[129648,129660,1],[129664,129672,1],[129680,129725,1],[129727,129733,1],[129742,129755,1],[129760,129768,1],[129776,129784,1],[129792,129938,1],[129940,129994,1]]),_(d,"Z",[[32,160,128],[5760,8192,2432],[8193,8202,1],[8232,8233,1],[8239,8287,48],[12288,12288,1]]),_(d,"Zl",[[8232,8232,1]]),_(d,"Zp",[[8233,8233,1]]),_(d,"Zs",[[32,160,128],[5760,8192,2432],[8193,8202,1],[8239,8287,48],[12288,12288,1]]),_(d,"Adlam",[[125184,125259,1],[125264,125273,1],[125278,125279,1]]),_(d,"Ahom",[[71424,71450,1],[71453,71467,1],[71472,71494,1]]),_(d,"Anatolian_Hieroglyphs",[[82944,83526,1]]),_(d,"Arabic",[[1536,1540,1],[1542,1547,1],[1549,1562,1],[1564,1566,1],[1568,1599,1],[1601,1610,1],[1622,1647,1],[1649,1756,1],[1758,1791,1],[1872,1919,1],[2160,2190,1],[2192,2193,1],[2200,2273,1],[2275,2303,1],[64336,64450,1],[64467,64829,1],[64832,64911,1],[64914,64967,1],[64975,65008,33],[65009,65023,1],[65136,65140,1],[65142,65276,1],[69216,69246,1],[69373,69375,1],[126464,126467,1],[126469,126495,1],[126497,126498,1],[126500,126503,3],[126505,126514,1],[126516,126519,1],[126521,126523,2],[126530,126535,5],[126537,126541,2],[126542,126543,1],[126545,126546,1],[126548,126551,3],[126553,126561,2],[126562,126564,2],[126567,126570,1],[126572,126578,1],[126580,126583,1],[126585,126588,1],[126590,126592,2],[126593,126601,1],[126603,126619,1],[126625,126627,1],[126629,126633,1],[126635,126651,1],[126704,126705,1]]),_(d,"Armenian",[[1329,1366,1],[1369,1418,1],[1421,1423,1],[64275,64279,1]]),_(d,"Avestan",[[68352,68405,1],[68409,68415,1]]),_(d,"Balinese",[[6912,6988,1],[6992,7038,1]]),_(d,"Bamum",[[42656,42743,1],[92160,92728,1]]),_(d,"Bassa_Vah",[[92880,92909,1],[92912,92917,1]]),_(d,"Batak",[[7104,7155,1],[7164,7167,1]]),_(d,"Bengali",[[2432,2435,1],[2437,2444,1],[2447,2448,1],[2451,2472,1],[2474,2480,1],[2482,2486,4],[2487,2489,1],[2492,2500,1],[2503,2504,1],[2507,2510,1],[2519,2524,5],[2525,2527,2],[2528,2531,1],[2534,2558,1]]),_(d,"Bhaiksuki",[[72704,72712,1],[72714,72758,1],[72760,72773,1],[72784,72812,1]]),_(d,"Bopomofo",[[746,747,1],[12549,12591,1],[12704,12735,1]]),_(d,"Brahmi",[[69632,69709,1],[69714,69749,1],[69759,69759,1]]),_(d,"Braille",[[10240,10495,1]]),_(d,"Buginese",[[6656,6683,1],[6686,6687,1]]),_(d,"Buhid",[[5952,5971,1]]),_(d,"Canadian_Aboriginal",[[5120,5759,1],[6320,6389,1],[72368,72383,1]]),_(d,"Carian",[[66208,66256,1]]),_(d,"Caucasian_Albanian",[[66864,66915,1],[66927,66927,1]]),_(d,"Chakma",[[69888,69940,1],[69942,69959,1]]),_(d,"Cham",[[43520,43574,1],[43584,43597,1],[43600,43609,1],[43612,43615,1]]),_(d,"Cherokee",[[5024,5109,1],[5112,5117,1],[43888,43967,1]]),_(d,"Chorasmian",[[69552,69579,1]]),_(d,"Common",[[0,64,1],[91,96,1],[123,169,1],[171,185,1],[187,191,1],[215,247,32],[697,735,1],[741,745,1],[748,767,1],[884,894,10],[901,903,2],[1541,1548,7],[1563,1567,4],[1600,1757,157],[2274,2404,130],[2405,3647,1242],[4053,4056,1],[4347,5867,1520],[5868,5869,1],[5941,5942,1],[6146,6147,1],[6149,7379,1230],[7393,7401,8],[7402,7404,1],[7406,7411,1],[7413,7415,1],[7418,8192,774],[8193,8203,1],[8206,8292,1],[8294,8304,1],[8308,8318,1],[8320,8334,1],[8352,8384,1],[8448,8485,1],[8487,8489,1],[8492,8497,1],[8499,8525,1],[8527,8543,1],[8585,8587,1],[8592,9254,1],[9280,9290,1],[9312,10239,1],[10496,11123,1],[11126,11157,1],[11159,11263,1],[11776,11869,1],[12272,12292,1],[12294,12296,2],[12297,12320,1],[12336,12343,1],[12348,12351,1],[12443,12444,1],[12448,12539,91],[12540,12688,148],[12689,12703,1],[12736,12771,1],[12783,12832,49],[12833,12895,1],[12927,13007,1],[13055,13144,89],[13145,13311,1],[19904,19967,1],[42752,42785,1],[42888,42890,1],[43056,43065,1],[43310,43471,161],[43867,43882,15],[43883,64830,20947],[64831,65040,209],[65041,65049,1],[65072,65106,1],[65108,65126,1],[65128,65131,1],[65279,65281,2],[65282,65312,1],[65339,65344,1],[65371,65381,1],[65392,65438,46],[65439,65504,65],[65505,65510,1],[65512,65518,1],[65529,65533,1],[65792,65794,1],[65799,65843,1],[65847,65855,1],[65936,65948,1],[66e3,66044,1],[66273,66299,1],[113824,113827,1],[118608,118723,1],[118784,119029,1],[119040,119078,1],[119081,119142,1],[119146,119162,1],[119171,119172,1],[119180,119209,1],[119214,119274,1],[119488,119507,1],[119520,119539,1],[119552,119638,1],[119648,119672,1],[119808,119892,1],[119894,119964,1],[119966,119967,1],[119970,119973,3],[119974,119977,3],[119978,119980,1],[119982,119993,1],[119995,119997,2],[119998,120003,1],[120005,120069,1],[120071,120074,1],[120077,120084,1],[120086,120092,1],[120094,120121,1],[120123,120126,1],[120128,120132,1],[120134,120138,4],[120139,120144,1],[120146,120485,1],[120488,120779,1],[120782,120831,1],[126065,126132,1],[126209,126269,1],[126976,127019,1],[127024,127123,1],[127136,127150,1],[127153,127167,1],[127169,127183,1],[127185,127221,1],[127232,127405,1],[127462,127487,1],[127489,127490,1],[127504,127547,1],[127552,127560,1],[127568,127569,1],[127584,127589,1],[127744,128727,1],[128732,128748,1],[128752,128764,1],[128768,128886,1],[128891,128985,1],[128992,129003,1],[129008,129024,16],[129025,129035,1],[129040,129095,1],[129104,129113,1],[129120,129159,1],[129168,129197,1],[129200,129201,1],[129280,129619,1],[129632,129645,1],[129648,129660,1],[129664,129672,1],[129680,129725,1],[129727,129733,1],[129742,129755,1],[129760,129768,1],[129776,129784,1],[129792,129938,1],[129940,129994,1],[130032,130041,1],[917505,917536,31],[917537,917631,1]]),_(d,"foldCommon",[[924,956,32]]),_(d,"Coptic",[[994,1007,1],[11392,11507,1],[11513,11519,1]]),_(d,"Cuneiform",[[73728,74649,1],[74752,74862,1],[74864,74868,1],[74880,75075,1]]),_(d,"Cypriot",[[67584,67589,1],[67592,67594,2],[67595,67637,1],[67639,67640,1],[67644,67647,3]]),_(d,"Cypro_Minoan",[[77712,77810,1]]),_(d,"Cyrillic",[[1024,1156,1],[1159,1327,1],[7296,7304,1],[7467,7544,77],[11744,11775,1],[42560,42655,1],[65070,65071,1],[122928,122989,1],[123023,123023,1]]),_(d,"Deseret",[[66560,66639,1]]),_(d,"Devanagari",[[2304,2384,1],[2389,2403,1],[2406,2431,1],[43232,43263,1],[72448,72457,1]]),_(d,"Dives_Akuru",[[71936,71942,1],[71945,71948,3],[71949,71955,1],[71957,71958,1],[71960,71989,1],[71991,71992,1],[71995,72006,1],[72016,72025,1]]),_(d,"Dogra",[[71680,71739,1]]),_(d,"Duployan",[[113664,113770,1],[113776,113788,1],[113792,113800,1],[113808,113817,1],[113820,113823,1]]),_(d,"Egyptian_Hieroglyphs",[[77824,78933,1]]),_(d,"Elbasan",[[66816,66855,1]]),_(d,"Elymaic",[[69600,69622,1]]),_(d,"Ethiopic",[[4608,4680,1],[4682,4685,1],[4688,4694,1],[4696,4698,2],[4699,4701,1],[4704,4744,1],[4746,4749,1],[4752,4784,1],[4786,4789,1],[4792,4798,1],[4800,4802,2],[4803,4805,1],[4808,4822,1],[4824,4880,1],[4882,4885,1],[4888,4954,1],[4957,4988,1],[4992,5017,1],[11648,11670,1],[11680,11686,1],[11688,11694,1],[11696,11702,1],[11704,11710,1],[11712,11718,1],[11720,11726,1],[11728,11734,1],[11736,11742,1],[43777,43782,1],[43785,43790,1],[43793,43798,1],[43808,43814,1],[43816,43822,1],[124896,124902,1],[124904,124907,1],[124909,124910,1],[124912,124926,1]]),_(d,"Georgian",[[4256,4293,1],[4295,4301,6],[4304,4346,1],[4348,4351,1],[7312,7354,1],[7357,7359,1],[11520,11557,1],[11559,11565,6]]),_(d,"Glagolitic",[[11264,11359,1],[122880,122886,1],[122888,122904,1],[122907,122913,1],[122915,122916,1],[122918,122922,1]]),_(d,"Gothic",[[66352,66378,1]]),_(d,"Grantha",[[70400,70403,1],[70405,70412,1],[70415,70416,1],[70419,70440,1],[70442,70448,1],[70450,70451,1],[70453,70457,1],[70460,70468,1],[70471,70472,1],[70475,70477,1],[70480,70487,7],[70493,70499,1],[70502,70508,1],[70512,70516,1]]),_(d,"Greek",[[880,883,1],[885,887,1],[890,893,1],[895,900,5],[902,904,2],[905,906,1],[908,910,2],[911,929,1],[931,993,1],[1008,1023,1],[7462,7466,1],[7517,7521,1],[7526,7530,1],[7615,7936,321],[7937,7957,1],[7960,7965,1],[7968,8005,1],[8008,8013,1],[8016,8023,1],[8025,8031,2],[8032,8061,1],[8064,8116,1],[8118,8132,1],[8134,8147,1],[8150,8155,1],[8157,8175,1],[8178,8180,1],[8182,8190,1],[8486,43877,35391],[65856,65934,1],[65952,119296,53344],[119297,119365,1]]),_(d,"foldGreek",[[181,837,656]]),_(d,"Gujarati",[[2689,2691,1],[2693,2701,1],[2703,2705,1],[2707,2728,1],[2730,2736,1],[2738,2739,1],[2741,2745,1],[2748,2757,1],[2759,2761,1],[2763,2765,1],[2768,2784,16],[2785,2787,1],[2790,2801,1],[2809,2815,1]]),_(d,"Gunjala_Gondi",[[73056,73061,1],[73063,73064,1],[73066,73102,1],[73104,73105,1],[73107,73112,1],[73120,73129,1]]),_(d,"Gurmukhi",[[2561,2563,1],[2565,2570,1],[2575,2576,1],[2579,2600,1],[2602,2608,1],[2610,2611,1],[2613,2614,1],[2616,2617,1],[2620,2622,2],[2623,2626,1],[2631,2632,1],[2635,2637,1],[2641,2649,8],[2650,2652,1],[2654,2662,8],[2663,2678,1]]),_(d,"Han",[[11904,11929,1],[11931,12019,1],[12032,12245,1],[12293,12295,2],[12321,12329,1],[12344,12347,1],[13312,19903,1],[19968,40959,1],[63744,64109,1],[64112,64217,1],[94178,94179,1],[94192,94193,1],[131072,173791,1],[173824,177977,1],[177984,178205,1],[178208,183969,1],[183984,191456,1],[191472,192093,1],[194560,195101,1],[196608,201546,1],[201552,205743,1]]),_(d,"Hangul",[[4352,4607,1],[12334,12335,1],[12593,12686,1],[12800,12830,1],[12896,12926,1],[43360,43388,1],[44032,55203,1],[55216,55238,1],[55243,55291,1],[65440,65470,1],[65474,65479,1],[65482,65487,1],[65490,65495,1],[65498,65500,1]]),_(d,"Hanifi_Rohingya",[[68864,68903,1],[68912,68921,1]]),_(d,"Hanunoo",[[5920,5940,1]]),_(d,"Hatran",[[67808,67826,1],[67828,67829,1],[67835,67839,1]]),_(d,"Hebrew",[[1425,1479,1],[1488,1514,1],[1519,1524,1],[64285,64310,1],[64312,64316,1],[64318,64320,2],[64321,64323,2],[64324,64326,2],[64327,64335,1]]),_(d,"Hiragana",[[12353,12438,1],[12445,12447,1],[110593,110879,1],[110898,110928,30],[110929,110930,1],[127488,127488,1]]),_(d,"Imperial_Aramaic",[[67648,67669,1],[67671,67679,1]]),_(d,"Inherited",[[768,879,1],[1157,1158,1],[1611,1621,1],[1648,2385,737],[2386,2388,1],[6832,6862,1],[7376,7378,1],[7380,7392,1],[7394,7400,1],[7405,7412,7],[7416,7417,1],[7616,7679,1],[8204,8205,1],[8400,8432,1],[12330,12333,1],[12441,12442,1],[65024,65039,1],[65056,65069,1],[66045,66272,227],[70459,118528,48069],[118529,118573,1],[118576,118598,1],[119143,119145,1],[119163,119170,1],[119173,119179,1],[119210,119213,1],[917760,917999,1]]),_(d,"foldInherited",[[921,953,32],[8126,8126,1]]),_(d,"Inscriptional_Pahlavi",[[68448,68466,1],[68472,68479,1]]),_(d,"Inscriptional_Parthian",[[68416,68437,1],[68440,68447,1]]),_(d,"Javanese",[[43392,43469,1],[43472,43481,1],[43486,43487,1]]),_(d,"Kaithi",[[69760,69826,1],[69837,69837,1]]),_(d,"Kannada",[[3200,3212,1],[3214,3216,1],[3218,3240,1],[3242,3251,1],[3253,3257,1],[3260,3268,1],[3270,3272,1],[3274,3277,1],[3285,3286,1],[3293,3294,1],[3296,3299,1],[3302,3311,1],[3313,3315,1]]),_(d,"Katakana",[[12449,12538,1],[12541,12543,1],[12784,12799,1],[13008,13054,1],[13056,13143,1],[65382,65391,1],[65393,65437,1],[110576,110579,1],[110581,110587,1],[110589,110590,1],[110592,110880,288],[110881,110882,1],[110933,110948,15],[110949,110951,1]]),_(d,"Kawi",[[73472,73488,1],[73490,73530,1],[73534,73561,1]]),_(d,"Kayah_Li",[[43264,43309,1],[43311,43311,1]]),_(d,"Kharoshthi",[[68096,68099,1],[68101,68102,1],[68108,68115,1],[68117,68119,1],[68121,68149,1],[68152,68154,1],[68159,68168,1],[68176,68184,1]]),_(d,"Khitan_Small_Script",[[94180,101120,6940],[101121,101589,1]]),_(d,"Khmer",[[6016,6109,1],[6112,6121,1],[6128,6137,1],[6624,6655,1]]),_(d,"Khojki",[[70144,70161,1],[70163,70209,1]]),_(d,"Khudawadi",[[70320,70378,1],[70384,70393,1]]),_(d,"Lao",[[3713,3714,1],[3716,3718,2],[3719,3722,1],[3724,3747,1],[3749,3751,2],[3752,3773,1],[3776,3780,1],[3782,3784,2],[3785,3790,1],[3792,3801,1],[3804,3807,1]]),_(d,"Latin",[[65,90,1],[97,122,1],[170,186,16],[192,214,1],[216,246,1],[248,696,1],[736,740,1],[7424,7461,1],[7468,7516,1],[7522,7525,1],[7531,7543,1],[7545,7614,1],[7680,7935,1],[8305,8319,14],[8336,8348,1],[8490,8491,1],[8498,8526,28],[8544,8584,1],[11360,11391,1],[42786,42887,1],[42891,42954,1],[42960,42961,1],[42963,42965,2],[42966,42969,1],[42994,43007,1],[43824,43866,1],[43868,43876,1],[43878,43881,1],[64256,64262,1],[65313,65338,1],[65345,65370,1],[67456,67461,1],[67463,67504,1],[67506,67514,1],[122624,122654,1],[122661,122666,1]]),_(d,"Lepcha",[[7168,7223,1],[7227,7241,1],[7245,7247,1]]),_(d,"Limbu",[[6400,6430,1],[6432,6443,1],[6448,6459,1],[6464,6468,4],[6469,6479,1]]),_(d,"Linear_A",[[67072,67382,1],[67392,67413,1],[67424,67431,1]]),_(d,"Linear_B",[[65536,65547,1],[65549,65574,1],[65576,65594,1],[65596,65597,1],[65599,65613,1],[65616,65629,1],[65664,65786,1]]),_(d,"Lisu",[[42192,42239,1],[73648,73648,1]]),_(d,"Lycian",[[66176,66204,1]]),_(d,"Lydian",[[67872,67897,1],[67903,67903,1]]),_(d,"Mahajani",[[69968,70006,1]]),_(d,"Makasar",[[73440,73464,1]]),_(d,"Malayalam",[[3328,3340,1],[3342,3344,1],[3346,3396,1],[3398,3400,1],[3402,3407,1],[3412,3427,1],[3430,3455,1]]),_(d,"Mandaic",[[2112,2139,1],[2142,2142,1]]),_(d,"Manichaean",[[68288,68326,1],[68331,68342,1]]),_(d,"Marchen",[[72816,72847,1],[72850,72871,1],[72873,72886,1]]),_(d,"Masaram_Gondi",[[72960,72966,1],[72968,72969,1],[72971,73014,1],[73018,73020,2],[73021,73023,2],[73024,73031,1],[73040,73049,1]]),_(d,"Medefaidrin",[[93760,93850,1]]),_(d,"Meetei_Mayek",[[43744,43766,1],[43968,44013,1],[44016,44025,1]]),_(d,"Mende_Kikakui",[[124928,125124,1],[125127,125142,1]]),_(d,"Meroitic_Cursive",[[68e3,68023,1],[68028,68047,1],[68050,68095,1]]),_(d,"Meroitic_Hieroglyphs",[[67968,67999,1]]),_(d,"Miao",[[93952,94026,1],[94031,94087,1],[94095,94111,1]]),_(d,"Modi",[[71168,71236,1],[71248,71257,1]]),_(d,"Mongolian",[[6144,6145,1],[6148,6150,2],[6151,6169,1],[6176,6264,1],[6272,6314,1],[71264,71276,1]]),_(d,"Mro",[[92736,92766,1],[92768,92777,1],[92782,92783,1]]),_(d,"Multani",[[70272,70278,1],[70280,70282,2],[70283,70285,1],[70287,70301,1],[70303,70313,1]]),_(d,"Myanmar",[[4096,4255,1],[43488,43518,1],[43616,43647,1]]),_(d,"Nabataean",[[67712,67742,1],[67751,67759,1]]),_(d,"Nag_Mundari",[[124112,124153,1]]),_(d,"Nandinagari",[[72096,72103,1],[72106,72151,1],[72154,72164,1]]),_(d,"New_Tai_Lue",[[6528,6571,1],[6576,6601,1],[6608,6618,1],[6622,6623,1]]),_(d,"Newa",[[70656,70747,1],[70749,70753,1]]),_(d,"Nko",[[1984,2042,1],[2045,2047,1]]),_(d,"Nushu",[[94177,110960,16783],[110961,111355,1]]),_(d,"Nyiakeng_Puachue_Hmong",[[123136,123180,1],[123184,123197,1],[123200,123209,1],[123214,123215,1]]),_(d,"Ogham",[[5760,5788,1]]),_(d,"Ol_Chiki",[[7248,7295,1]]),_(d,"Old_Hungarian",[[68736,68786,1],[68800,68850,1],[68858,68863,1]]),_(d,"Old_Italic",[[66304,66339,1],[66349,66351,1]]),_(d,"Old_North_Arabian",[[68224,68255,1]]),_(d,"Old_Permic",[[66384,66426,1]]),_(d,"Old_Persian",[[66464,66499,1],[66504,66517,1]]),_(d,"Old_Sogdian",[[69376,69415,1]]),_(d,"Old_South_Arabian",[[68192,68223,1]]),_(d,"Old_Turkic",[[68608,68680,1]]),_(d,"Old_Uyghur",[[69488,69513,1]]),_(d,"Oriya",[[2817,2819,1],[2821,2828,1],[2831,2832,1],[2835,2856,1],[2858,2864,1],[2866,2867,1],[2869,2873,1],[2876,2884,1],[2887,2888,1],[2891,2893,1],[2901,2903,1],[2908,2909,1],[2911,2915,1],[2918,2935,1]]),_(d,"Osage",[[66736,66771,1],[66776,66811,1]]),_(d,"Osmanya",[[66688,66717,1],[66720,66729,1]]),_(d,"Pahawh_Hmong",[[92928,92997,1],[93008,93017,1],[93019,93025,1],[93027,93047,1],[93053,93071,1]]),_(d,"Palmyrene",[[67680,67711,1]]),_(d,"Pau_Cin_Hau",[[72384,72440,1]]),_(d,"Phags_Pa",[[43072,43127,1]]),_(d,"Phoenician",[[67840,67867,1],[67871,67871,1]]),_(d,"Psalter_Pahlavi",[[68480,68497,1],[68505,68508,1],[68521,68527,1]]),_(d,"Rejang",[[43312,43347,1],[43359,43359,1]]),_(d,"Runic",[[5792,5866,1],[5870,5880,1]]),_(d,"Samaritan",[[2048,2093,1],[2096,2110,1]]),_(d,"Saurashtra",[[43136,43205,1],[43214,43225,1]]),_(d,"Sharada",[[70016,70111,1]]),_(d,"Shavian",[[66640,66687,1]]),_(d,"Siddham",[[71040,71093,1],[71096,71133,1]]),_(d,"SignWriting",[[120832,121483,1],[121499,121503,1],[121505,121519,1]]),_(d,"Sinhala",[[3457,3459,1],[3461,3478,1],[3482,3505,1],[3507,3515,1],[3517,3520,3],[3521,3526,1],[3530,3535,5],[3536,3540,1],[3542,3544,2],[3545,3551,1],[3558,3567,1],[3570,3572,1],[70113,70132,1]]),_(d,"Sogdian",[[69424,69465,1]]),_(d,"Sora_Sompeng",[[69840,69864,1],[69872,69881,1]]),_(d,"Soyombo",[[72272,72354,1]]),_(d,"Sundanese",[[7040,7103,1],[7360,7367,1]]),_(d,"Syloti_Nagri",[[43008,43052,1]]),_(d,"Syriac",[[1792,1805,1],[1807,1866,1],[1869,1871,1],[2144,2154,1]]),_(d,"Tagalog",[[5888,5909,1],[5919,5919,1]]),_(d,"Tagbanwa",[[5984,5996,1],[5998,6e3,1],[6002,6003,1]]),_(d,"Tai_Le",[[6480,6509,1],[6512,6516,1]]),_(d,"Tai_Tham",[[6688,6750,1],[6752,6780,1],[6783,6793,1],[6800,6809,1],[6816,6829,1]]),_(d,"Tai_Viet",[[43648,43714,1],[43739,43743,1]]),_(d,"Takri",[[71296,71353,1],[71360,71369,1]]),_(d,"Tamil",[[2946,2947,1],[2949,2954,1],[2958,2960,1],[2962,2965,1],[2969,2970,1],[2972,2974,2],[2975,2979,4],[2980,2984,4],[2985,2986,1],[2990,3001,1],[3006,3010,1],[3014,3016,1],[3018,3021,1],[3024,3031,7],[3046,3066,1],[73664,73713,1],[73727,73727,1]]),_(d,"Tangsa",[[92784,92862,1],[92864,92873,1]]),_(d,"Tangut",[[94176,94208,32],[94209,100343,1],[100352,101119,1],[101632,101640,1]]),_(d,"Telugu",[[3072,3084,1],[3086,3088,1],[3090,3112,1],[3114,3129,1],[3132,3140,1],[3142,3144,1],[3146,3149,1],[3157,3158,1],[3160,3162,1],[3165,3168,3],[3169,3171,1],[3174,3183,1],[3191,3199,1]]),_(d,"Thaana",[[1920,1969,1]]),_(d,"Thai",[[3585,3642,1],[3648,3675,1]]),_(d,"Tibetan",[[3840,3911,1],[3913,3948,1],[3953,3991,1],[3993,4028,1],[4030,4044,1],[4046,4052,1],[4057,4058,1]]),_(d,"Tifinagh",[[11568,11623,1],[11631,11632,1],[11647,11647,1]]),_(d,"Tirhuta",[[70784,70855,1],[70864,70873,1]]),_(d,"Toto",[[123536,123566,1]]),_(d,"Ugaritic",[[66432,66461,1],[66463,66463,1]]),_(d,"Vai",[[42240,42539,1]]),_(d,"Vithkuqi",[[66928,66938,1],[66940,66954,1],[66956,66962,1],[66964,66965,1],[66967,66977,1],[66979,66993,1],[66995,67001,1],[67003,67004,1]]),_(d,"Wancho",[[123584,123641,1],[123647,123647,1]]),_(d,"Warang_Citi",[[71840,71922,1],[71935,71935,1]]),_(d,"Yezidi",[[69248,69289,1],[69291,69293,1],[69296,69297,1]]),_(d,"Yi",[[40960,42124,1],[42128,42182,1]]),_(d,"Zanabazar_Square",[[72192,72263,1]]),_(d,"CATEGORIES",new Map([["C",d.C],["Cc",d.Cc],["Cf",d.Cf],["Co",d.Co],["Cs",d.Cs],["L",d.L],["Ll",d.Ll],["Lm",d.Lm],["Lo",d.Lo],["Lt",d.Lt],["Lu",d.Lu],["M",d.M],["Mc",d.Mc],["Me",d.Me],["Mn",d.Mn],["N",d.N],["Nd",d.Nd],["Nl",d.Nl],["No",d.No],["P",d.P],["Pc",d.Pc],["Pd",d.Pd],["Pe",d.Pe],["Pf",d.Pf],["Pi",d.Pi],["Po",d.Po],["Ps",d.Ps],["S",d.S],["Sc",d.Sc],["Sk",d.Sk],["Sm",d.Sm],["So",d.So],["Z",d.Z],["Zl",d.Zl],["Zp",d.Zp],["Zs",d.Zs]])),_(d,"SCRIPTS",new Map([["Adlam",d.Adlam],["Ahom",d.Ahom],["Anatolian_Hieroglyphs",d.Anatolian_Hieroglyphs],["Arabic",d.Arabic],["Armenian",d.Armenian],["Avestan",d.Avestan],["Balinese",d.Balinese],["Bamum",d.Bamum],["Bassa_Vah",d.Bassa_Vah],["Batak",d.Batak],["Bengali",d.Bengali],["Bhaiksuki",d.Bhaiksuki],["Bopomofo",d.Bopomofo],["Brahmi",d.Brahmi],["Braille",d.Braille],["Buginese",d.Buginese],["Buhid",d.Buhid],["Canadian_Aboriginal",d.Canadian_Aboriginal],["Carian",d.Carian],["Caucasian_Albanian",d.Caucasian_Albanian],["Chakma",d.Chakma],["Cham",d.Cham],["Cherokee",d.Cherokee],["Chorasmian",d.Chorasmian],["Common",d.Common],["Coptic",d.Coptic],["Cuneiform",d.Cuneiform],["Cypriot",d.Cypriot],["Cypro_Minoan",d.Cypro_Minoan],["Cyrillic",d.Cyrillic],["Deseret",d.Deseret],["Devanagari",d.Devanagari],["Dives_Akuru",d.Dives_Akuru],["Dogra",d.Dogra],["Duployan",d.Duployan],["Egyptian_Hieroglyphs",d.Egyptian_Hieroglyphs],["Elbasan",d.Elbasan],["Elymaic",d.Elymaic],["Ethiopic",d.Ethiopic],["Georgian",d.Georgian],["Glagolitic",d.Glagolitic],["Gothic",d.Gothic],["Grantha",d.Grantha],["Greek",d.Greek],["Gujarati",d.Gujarati],["Gunjala_Gondi",d.Gunjala_Gondi],["Gurmukhi",d.Gurmukhi],["Han",d.Han],["Hangul",d.Hangul],["Hanifi_Rohingya",d.Hanifi_Rohingya],["Hanunoo",d.Hanunoo],["Hatran",d.Hatran],["Hebrew",d.Hebrew],["Hiragana",d.Hiragana],["Imperial_Aramaic",d.Imperial_Aramaic],["Inherited",d.Inherited],["Inscriptional_Pahlavi",d.Inscriptional_Pahlavi],["Inscriptional_Parthian",d.Inscriptional_Parthian],["Javanese",d.Javanese],["Kaithi",d.Kaithi],["Kannada",d.Kannada],["Katakana",d.Katakana],["Kawi",d.Kawi],["Kayah_Li",d.Kayah_Li],["Kharoshthi",d.Kharoshthi],["Khitan_Small_Script",d.Khitan_Small_Script],["Khmer",d.Khmer],["Khojki",d.Khojki],["Khudawadi",d.Khudawadi],["Lao",d.Lao],["Latin",d.Latin],["Lepcha",d.Lepcha],["Limbu",d.Limbu],["Linear_A",d.Linear_A],["Linear_B",d.Linear_B],["Lisu",d.Lisu],["Lycian",d.Lycian],["Lydian",d.Lydian],["Mahajani",d.Mahajani],["Makasar",d.Makasar],["Malayalam",d.Malayalam],["Mandaic",d.Mandaic],["Manichaean",d.Manichaean],["Marchen",d.Marchen],["Masaram_Gondi",d.Masaram_Gondi],["Medefaidrin",d.Medefaidrin],["Meetei_Mayek",d.Meetei_Mayek],["Mende_Kikakui",d.Mende_Kikakui],["Meroitic_Cursive",d.Meroitic_Cursive],["Meroitic_Hieroglyphs",d.Meroitic_Hieroglyphs],["Miao",d.Miao],["Modi",d.Modi],["Mongolian",d.Mongolian],["Mro",d.Mro],["Multani",d.Multani],["Myanmar",d.Myanmar],["Nabataean",d.Nabataean],["Nag_Mundari",d.Nag_Mundari],["Nandinagari",d.Nandinagari],["New_Tai_Lue",d.New_Tai_Lue],["Newa",d.Newa],["Nko",d.Nko],["Nushu",d.Nushu],["Nyiakeng_Puachue_Hmong",d.Nyiakeng_Puachue_Hmong],["Ogham",d.Ogham],["Ol_Chiki",d.Ol_Chiki],["Old_Hungarian",d.Old_Hungarian],["Old_Italic",d.Old_Italic],["Old_North_Arabian",d.Old_North_Arabian],["Old_Permic",d.Old_Permic],["Old_Persian",d.Old_Persian],["Old_Sogdian",d.Old_Sogdian],["Old_South_Arabian",d.Old_South_Arabian],["Old_Turkic",d.Old_Turkic],["Old_Uyghur",d.Old_Uyghur],["Oriya",d.Oriya],["Osage",d.Osage],["Osmanya",d.Osmanya],["Pahawh_Hmong",d.Pahawh_Hmong],["Palmyrene",d.Palmyrene],["Pau_Cin_Hau",d.Pau_Cin_Hau],["Phags_Pa",d.Phags_Pa],["Phoenician",d.Phoenician],["Psalter_Pahlavi",d.Psalter_Pahlavi],["Rejang",d.Rejang],["Runic",d.Runic],["Samaritan",d.Samaritan],["Saurashtra",d.Saurashtra],["Sharada",d.Sharada],["Shavian",d.Shavian],["Siddham",d.Siddham],["SignWriting",d.SignWriting],["Sinhala",d.Sinhala],["Sogdian",d.Sogdian],["Sora_Sompeng",d.Sora_Sompeng],["Soyombo",d.Soyombo],["Sundanese",d.Sundanese],["Syloti_Nagri",d.Syloti_Nagri],["Syriac",d.Syriac],["Tagalog",d.Tagalog],["Tagbanwa",d.Tagbanwa],["Tai_Le",d.Tai_Le],["Tai_Tham",d.Tai_Tham],["Tai_Viet",d.Tai_Viet],["Takri",d.Takri],["Tamil",d.Tamil],["Tangsa",d.Tangsa],["Tangut",d.Tangut],["Telugu",d.Telugu],["Thaana",d.Thaana],["Thai",d.Thai],["Tibetan",d.Tibetan],["Tifinagh",d.Tifinagh],["Tirhuta",d.Tirhuta],["Toto",d.Toto],["Ugaritic",d.Ugaritic],["Vai",d.Vai],["Vithkuqi",d.Vithkuqi],["Wancho",d.Wancho],["Warang_Citi",d.Warang_Citi],["Yezidi",d.Yezidi],["Yi",d.Yi],["Zanabazar_Square",d.Zanabazar_Square]])),_(d,"FOLD_CATEGORIES",new Map([["L",d.foldL],["Ll",d.foldLl],["Lt",d.foldLt],["Lu",d.foldLu],["M",d.foldM],["Mn",d.foldMn]])),_(d,"FOLD_SCRIPT",new Map([["Common",d.foldCommon],["Greek",d.foldGreek],["Inherited",d.foldInherited]]));let jt=d;class X{static is32(t,e){let r=0,s=t.length;for(;r<s;){let i=r+Math.floor((s-r)/2),o=t[i];if(o[0]<=e&&e<=o[1])return(e-o[0])%o[2]===0;e<o[0]?s=i:r=i+1}return!1}static is(t,e){if(e<=this.MAX_LATIN1){for(let r of t)if(!(e>r[1]))return e<r[0]?!1:(e-r[0])%r[2]===0;return!1}return t.length>0&&e>=t[0][0]&&this.is32(t,e)}static isUpper(t){if(t<=this.MAX_LATIN1){const e=String.fromCodePoint(t);return e.toUpperCase()===e&&e.toLowerCase()!==e}return this.is(jt.Upper,t)}static isPrint(t){return t<=this.MAX_LATIN1?t>=32&&t<127||t>=161&&t!==173:this.is(jt.L,t)||this.is(jt.M,t)||this.is(jt.N,t)||this.is(jt.P,t)||this.is(jt.S,t)}static simpleFold(t){if(jt.CASE_ORBIT.has(t))return jt.CASE_ORBIT.get(t);const e=N.toLowerCase(t);return e!==t?e:N.toUpperCase(t)}static equalsIgnoreCase(t,e){if(t<0||e<0||t===e)return!0;if(t<=this.MAX_ASCII&&e<=this.MAX_ASCII)return N.CODES.get("A")<=t&&t<=N.CODES.get("Z")&&(t|=32),N.CODES.get("A")<=e&&e<=N.CODES.get("Z")&&(e|=32),t===e;for(let r=this.simpleFold(t);r!==t;r=this.simpleFold(r))if(r===e)return!0;return!1}}_(X,"MAX_RUNE",1114111),_(X,"MAX_ASCII",127),_(X,"MAX_LATIN1",255),_(X,"MAX_BMP",65535),_(X,"MIN_FOLD",65),_(X,"MAX_FOLD",125251);class tt{static emptyInts(){return[]}static isalnum(t){return N.CODES.get("0")<=t&&t<=N.CODES.get("9")||N.CODES.get("a")<=t&&t<=N.CODES.get("z")||N.CODES.get("A")<=t&&t<=N.CODES.get("Z")}static unhex(t){return N.CODES.get("0")<=t&&t<=N.CODES.get("9")?t-N.CODES.get("0"):N.CODES.get("a")<=t&&t<=N.CODES.get("f")?t-N.CODES.get("a")+10:N.CODES.get("A")<=t&&t<=N.CODES.get("F")?t-N.CODES.get("A")+10:-1}static escapeRune(t){let e="";if(X.isPrint(t))this.METACHARACTERS.indexOf(String.fromCodePoint(t))>=0&&(e+="\\"),e+=String.fromCodePoint(t);else switch(t){case N.CODES.get('"'):e+='\\"';break;case N.CODES.get("\\"):e+="\\\\";break;case N.CODES.get("	"):e+="\\t";break;case N.CODES.get(`
`):e+="\\n";break;case N.CODES.get("\r"):e+="\\r";break;case N.CODES.get("\b"):e+="\\b";break;case N.CODES.get("\f"):e+="\\f";break;default:{let r=t.toString(16);t<256?(e+="\\x",r.length===1&&(e+="0"),e+=r):e+=`\\x{${r}}`;break}}return e}static stringToRunes(t){return String(t).split("").map(e=>e.codePointAt(0))}static runeToString(t){return String.fromCodePoint(t)}static isWordRune(t){return N.CODES.get("a")<=t&&t<=N.CODES.get("z")||N.CODES.get("A")<=t&&t<=N.CODES.get("Z")||N.CODES.get("0")<=t&&t<=N.CODES.get("9")||t===N.CODES.get("_")}static emptyOpContext(t,e){let r=0;return t<0&&(r|=this.EMPTY_BEGIN_TEXT|this.EMPTY_BEGIN_LINE),t===N.CODES.get(`
`)&&(r|=this.EMPTY_BEGIN_LINE),e<0&&(r|=this.EMPTY_END_TEXT|this.EMPTY_END_LINE),e===N.CODES.get(`
`)&&(r|=this.EMPTY_END_LINE),this.isWordRune(t)!==this.isWordRune(e)?r|=this.EMPTY_WORD_BOUNDARY:r|=this.EMPTY_NO_WORD_BOUNDARY,r}static quoteMeta(t){return t.split("").map(e=>this.METACHARACTERS.indexOf(e)>=0?`\\${e}`:e).join("")}static charCount(t){return t>X.MAX_BMP?2:1}static stringToUtf8ByteArray(t){if(globalThis.TextEncoder)return Array.from(new TextEncoder().encode(t));{let e=[],r=0;for(let s=0;s<t.length;s++){let i=t.charCodeAt(s);i<128?e[r++]=i:i<2048?(e[r++]=i>>6|192,e[r++]=i&63|128):(i&64512)===55296&&s+1<t.length&&(t.charCodeAt(s+1)&64512)===56320?(i=65536+((i&1023)<<10)+(t.charCodeAt(++s)&1023),e[r++]=i>>18|240,e[r++]=i>>12&63|128,e[r++]=i>>6&63|128,e[r++]=i&63|128):(e[r++]=i>>12|224,e[r++]=i>>6&63|128,e[r++]=i&63|128)}return e}}static utf8ByteArrayToString(t){if(globalThis.TextDecoder)return new TextDecoder("utf-8").decode(new Uint8Array(t));{let e=[],r=0,s=0;for(;r<t.length;){let i=t[r++];if(i<128)e[s++]=String.fromCharCode(i);else if(i>191&&i<224){let o=t[r++];e[s++]=String.fromCharCode((i&31)<<6|o&63)}else if(i>239&&i<365){let o=t[r++],u=t[r++],c=t[r++],h=((i&7)<<18|(o&63)<<12|(u&63)<<6|c&63)-65536;e[s++]=String.fromCharCode(55296+(h>>10)),e[s++]=String.fromCharCode(56320+(h&1023))}else{let o=t[r++],u=t[r++];e[s++]=String.fromCharCode((i&15)<<12|(o&63)<<6|u&63)}}return e.join("")}}}_(tt,"METACHARACTERS","\\.+*?()|[]{}^$"),_(tt,"EMPTY_BEGIN_LINE",1),_(tt,"EMPTY_END_LINE",2),_(tt,"EMPTY_BEGIN_TEXT",4),_(tt,"EMPTY_END_TEXT",8),_(tt,"EMPTY_WORD_BOUNDARY",16),_(tt,"EMPTY_NO_WORD_BOUNDARY",32),_(tt,"EMPTY_ALL",-1);const k2=(n=[],t=0)=>{const e={};for(let r=0;r<n.length;r++){const s=n[r],i=t+r;e[s]=i,e[i]=s}return Object.freeze(e)},Ns=class Ns{getEncoding(){throw Error("not implemented")}isUTF8Encoding(){return this.getEncoding()===Ns.Encoding.UTF_8}isUTF16Encoding(){return this.getEncoding()===Ns.Encoding.UTF_16}};_(Ns,"Encoding",k2(["UTF_16","UTF_8"]));let Pn=Ns;class cl extends Pn{constructor(t=null){super(),this.bytes=t}getEncoding(){return Pn.Encoding.UTF_8}asCharSequence(){return tt.utf8ByteArrayToString(this.bytes)}asBytes(){return this.bytes}length(){return this.bytes.length}}class E4 extends Pn{constructor(t=null){super(),this.charSequence=t}getEncoding(){return Pn.Encoding.UTF_16}asCharSequence(){return this.charSequence}asBytes(){return this.charSequence.toString().split("").map(t=>t.codePointAt(0))}length(){return this.charSequence.length}}class io{static utf16(t){return new E4(t)}static utf8(t){return Array.isArray(t)?new cl(t):new cl(tt.stringToUtf8ByteArray(t))}}class bo extends Error{constructor(t){super(t),this.name="RE2JSException"}}class Ct extends bo{constructor(t,e=null){let r=`error parsing regexp: ${t}`;e&&(r+=`: \`${e}\``),super(r),this.name="RE2JSSyntaxException",this.message=r,this.error=t,this.input=e}getDescription(){return this.error}getPattern(){return this.input}}class y4 extends bo{constructor(t){super(t),this.name="RE2JSCompileException"}}class qe extends bo{constructor(t){super(t),this.name="RE2JSGroupException"}}class T4 extends bo{constructor(t){super(t),this.name="RE2JSFlagsException"}}class w4{static quoteReplacement(t){return t.indexOf("\\")<0&&t.indexOf("$")<0?t:t.split("").map(e=>{const r=e.codePointAt(0);return r===N.CODES["\\"]||r===N.CODES.$?`\\${e}`:e}).join("")}constructor(t,e){if(t===null)throw new Error("pattern is null");this.patternInput=t;const r=this.patternInput.re2();this.patternGroupCount=r.numberOfCapturingGroups(),this.groups=[],this.namedGroups=r.namedGroups,e instanceof Pn?this.resetMatcherInput(e):Array.isArray(e)?this.resetMatcherInput(io.utf8(e)):this.resetMatcherInput(io.utf16(e))}pattern(){return this.patternInput}reset(){return this.matcherInputLength=this.matcherInput.length(),this.appendPos=0,this.hasMatch=!1,this.hasGroups=!1,this.anchorFlag=0,this}resetMatcherInput(t){if(t===null)throw new Error("input is null");return this.matcherInput=t,this.reset(),this}start(t=0){if(typeof t=="string"){const e=this.namedGroups[t];if(!Number.isFinite(e))throw new qe(`group '${t}' not found`);t=e}return this.loadGroup(t),this.groups[2*t]}end(t=0){if(typeof t=="string"){const e=this.namedGroups[t];if(!Number.isFinite(e))throw new qe(`group '${t}' not found`);t=e}return this.loadGroup(t),this.groups[2*t+1]}group(t=0){if(typeof t=="string"){const s=this.namedGroups[t];if(!Number.isFinite(s))throw new qe(`group '${t}' not found`);t=s}const e=this.start(t),r=this.end(t);return e<0&&r<0?null:this.substring(e,r)}groupCount(){return this.patternGroupCount}loadGroup(t){if(t<0||t>this.patternGroupCount)throw new qe(`Group index out of bounds: ${t}`);if(!this.hasMatch)throw new qe("perhaps no match attempted");if(t===0||this.hasGroups)return;let e=this.groups[1]+1;e>this.matcherInputLength&&(e=this.matcherInputLength);const r=this.patternInput.re2().matchMachineInput(this.matcherInput,this.groups[0],e,this.anchorFlag,1+this.patternGroupCount);if(!r[0])throw new qe("inconsistency in matching group data");this.groups=r[1],this.hasGroups=!0}matches(){return this.genMatch(0,$.ANCHOR_BOTH)}lookingAt(){return this.genMatch(0,$.ANCHOR_START)}find(t=null){if(t!==null){if(t<0||t>this.matcherInputLength)throw new qe(`start index out of bounds: ${t}`);return this.reset(),this.genMatch(t,0)}return t=0,this.hasMatch&&(t=this.groups[1],this.groups[0]===this.groups[1]&&t++),this.genMatch(t,$.UNANCHORED)}genMatch(t,e){const r=this.patternInput.re2().matchMachineInput(this.matcherInput,t,this.matcherInputLength,e,1);return r[0]?(this.groups=r[1],this.hasMatch=!0,this.hasGroups=!1,this.anchorFlag=e,!0):!1}substring(t,e){return this.matcherInput.isUTF8Encoding()?tt.utf8ByteArrayToString(this.matcherInput.asBytes().slice(t,e)):this.matcherInput.asCharSequence().substring(t,e).toString()}inputLength(){return this.matcherInputLength}appendReplacement(t,e=!1){let r="";const s=this.start(),i=this.end();return this.appendPos<s&&(r+=this.substring(this.appendPos,s)),this.appendPos=i,r+=e?this.appendReplacementInternalPerl(t):this.appendReplacementInternal(t),r}appendReplacementInternal(t){let e="",r=0;const s=t.length;for(let i=0;i<s-1;i++){if(t.codePointAt(i)===N.CODES.get("\\")){r<i&&(e+=t.substring(r,i)),i++,r=i;continue}if(t.codePointAt(i)===N.CODES.get("$")){let o=t.codePointAt(i+1);if(N.CODES.get("0")<=o&&o<=N.CODES.get("9")){let u=o-N.CODES.get("0");for(r<i&&(e+=t.substring(r,i)),i+=2;i<s&&(o=t.codePointAt(i),!(o<N.CODES.get("0")||o>N.CODES.get("9")||u*10+o-N.CODES.get("0")>this.patternGroupCount));i++)u=u*10+o-N.CODES.get("0");if(u>this.patternGroupCount)throw new qe(`n > number of groups: ${u}`);const c=this.group(u);c!==null&&(e+=c),r=i,i--;continue}else if(o===N.CODES.get("{")){r<i&&(e+=t.substring(r,i)),i++;let u=i+1;for(;u<t.length&&t.codePointAt(u)!==N.CODES.get("}")&&t.codePointAt(u)!==N.CODES.get(" ");)u++;if(u===t.length||t.codePointAt(u)!==N.CODES.get("}"))throw new qe("named capture group is missing trailing '}'");const c=t.substring(i+1,u);e+=this.group(c),r=u+1}}}return r<s&&(e+=t.substring(r,s)),e}appendReplacementInternalPerl(t){let e="",r=0;const s=t.length;for(let i=0;i<s-1;i++)if(t.codePointAt(i)===N.CODES.get("$")){let o=t.codePointAt(i+1);if(N.CODES.get("$")===o){r<i&&(e+=t.substring(r,i)),e+="$",i++,r=i+1;continue}else if(N.CODES.get("&")===o){r<i&&(e+=t.substring(r,i));const u=this.group(0);u!==null?e+=u:e+="$&",i++,r=i+1;continue}else if(N.CODES.get("1")<=o&&o<=N.CODES.get("9")){let u=o-N.CODES.get("0");for(r<i&&(e+=t.substring(r,i)),i+=2;i<s&&(o=t.codePointAt(i),!(o<N.CODES.get("0")||o>N.CODES.get("9")||u*10+o-N.CODES.get("0")>this.patternGroupCount));i++)u=u*10+o-N.CODES.get("0");if(u>this.patternGroupCount){e+=`$${u}`,r=i,i--;continue}const c=this.group(u);c!==null&&(e+=c),r=i,i--;continue}else if(o===N.CODES.get("<")){r<i&&(e+=t.substring(r,i)),i++;let u=i+1;for(;u<t.length&&t.codePointAt(u)!==N.CODES.get(">")&&t.codePointAt(u)!==N.CODES.get(" ");)u++;if(u===t.length||t.codePointAt(u)!==N.CODES.get(">")){e+=t.substring(i-1,u+1),r=u+1;continue}const c=t.substring(i+1,u);Object.prototype.hasOwnProperty.call(this.namedGroups,c)?e+=this.group(c):e+=`$<${c}>`,r=u+1}}return r<s&&(e+=t.substring(r,s)),e}appendTail(){return this.substring(this.appendPos,this.matcherInputLength)}replaceAll(t,e=!1){return this.replace(t,!0,e)}replaceFirst(t,e=!1){return this.replace(t,!1,e)}replace(t,e=!0,r=!1){let s="";for(this.reset();this.find()&&(s+=this.appendReplacement(t,r),!!e););return s+=this.appendTail(),s}}class En{static EOF(){return-8}canCheckPrefix(){return!0}endPos(){return this.end}}class I4 extends En{constructor(t,e=0,r=t.length){super(),this.bytes=t,this.start=e,this.end=r}step(t){if(t+=this.start,t>=this.end)return En.EOF();let e=this.bytes[t++]&255;return(e&128)===0?e<<3|1:(e&224)===192?(e=e&31,t>=this.end?En.EOF():(e=e<<6|this.bytes[t++]&63,e<<3|2)):(e&240)===224?(e=e&15,t+1>=this.end?En.EOF():(e=e<<6|this.bytes[t++]&63,e=e<<6|this.bytes[t++]&63,e<<3|3)):(e=e&7,t+2>=this.end?En.EOF():(e=e<<6|this.bytes[t++]&63,e=e<<6|this.bytes[t++]&63,e=e<<6|this.bytes[t++]&63,e<<3|4))}index(t,e){e+=this.start;const r=this.indexOf(this.bytes,t.prefixUTF8,e);return r<0?r:r-e}context(t){t+=this.start;let e=-1;if(t>this.start&&t<=this.end){let s=t-1;if(e=this.bytes[s--],e>=128){let i=t-4;for(i<this.start&&(i=this.start);s>=i&&(this.bytes[s]&192)===128;)s--;s<this.start&&(s=this.start),e=this.step(s)>>3}}const r=t<this.end?this.step(t)>>3:-1;return tt.emptyOpContext(e,r)}indexOf(t,e,r=0){let s=e.length;if(s===0)return-1;let i=t.length;for(let o=r;o<=i-s;o++)for(let u=0;u<s&&t[o+u]===e[u];u++)if(u===s-1)return o;return-1}}class A4 extends En{constructor(t,e=0,r=t.length){super(),this.charSequence=t,this.start=e,this.end=r}step(t){if(t+=this.start,t<this.end){const e=this.charSequence.codePointAt(t);return e<<3|tt.charCount(e)}else return En.EOF()}index(t,e){e+=this.start;const r=this.charSequence.indexOf(t.prefix,e);return r<0?r:r-e}context(t){t+=this.start;const e=t>0&&t<=this.charSequence.length?this.charSequence.codePointAt(t-1):-1,r=t<this.charSequence.length?this.charSequence.codePointAt(t):-1;return tt.emptyOpContext(e,r)}}class St{static fromUTF8(t,e=0,r=t.length){return new I4(t,e,r)}static fromUTF16(t,e=0,r=t.length){return new A4(t,e,r)}}const Y=class Y{static isPseudoOp(t){return t>=Y.Op.LEFT_PAREN}static emptySubs(){return[]}static quoteIfHyphen(t){return t===N.CODES.get("-")?"\\":""}static fromRegexp(t){const e=new Y(t.op);return e.flags=t.flags,e.subs=t.subs,e.runes=t.runes,e.cap=t.cap,e.min=t.min,e.max=t.max,e.name=t.name,e.namedGroups=t.namedGroups,e}constructor(t){this.op=t,this.flags=0,this.subs=Y.emptySubs(),this.runes=null,this.min=0,this.max=0,this.cap=0,this.name=null,this.namedGroups={}}reinit(){this.flags=0,this.subs=Y.emptySubs(),this.runes=null,this.cap=0,this.min=0,this.max=0,this.name=null,this.namedGroups={}}toString(){return this.appendTo()}appendTo(){let t="";switch(this.op){case Y.Op.NO_MATCH:t+="[^\\x00-\\x{10FFFF}]";break;case Y.Op.EMPTY_MATCH:t+="(?:)";break;case Y.Op.STAR:case Y.Op.PLUS:case Y.Op.QUEST:case Y.Op.REPEAT:{const e=this.subs[0];switch(e.op>Y.Op.CAPTURE||e.op===Y.Op.LITERAL&&e.runes.length>1?t+=`(?:${e.appendTo()})`:t+=e.appendTo(),this.op){case Y.Op.STAR:t+="*";break;case Y.Op.PLUS:t+="+";break;case Y.Op.QUEST:t+="?";break;case Y.Op.REPEAT:t+=`{${this.min}`,this.min!==this.max&&(t+=",",this.max>=0&&(t+=this.max)),t+="}";break}(this.flags&$.NON_GREEDY)!==0&&(t+="?");break}case Y.Op.CONCAT:{for(let e of this.subs)e.op===Y.Op.ALTERNATE?t+=`(?:${e.appendTo()})`:t+=e.appendTo();break}case Y.Op.ALTERNATE:{let e="";for(let r of this.subs)t+=e,e="|",t+=r.appendTo();break}case Y.Op.LITERAL:(this.flags&$.FOLD_CASE)!==0&&(t+="(?i:");for(let e of this.runes)t+=tt.escapeRune(e);(this.flags&$.FOLD_CASE)!==0&&(t+=")");break;case Y.Op.ANY_CHAR_NOT_NL:t+="(?-s:.)";break;case Y.Op.ANY_CHAR:t+="(?s:.)";break;case Y.Op.CAPTURE:this.name===null||this.name.length===0?t+="(":t+=`(?P<${this.name}>`,this.subs[0].op!==Y.Op.EMPTY_MATCH&&(t+=this.subs[0].appendTo()),t+=")";break;case Y.Op.BEGIN_TEXT:t+="\\A";break;case Y.Op.END_TEXT:(this.flags&$.WAS_DOLLAR)!==0?t+="(?-m:$)":t+="\\z";break;case Y.Op.BEGIN_LINE:t+="^";break;case Y.Op.END_LINE:t+="$";break;case Y.Op.WORD_BOUNDARY:t+="\\b";break;case Y.Op.NO_WORD_BOUNDARY:t+="\\B";break;case Y.Op.CHAR_CLASS:if(this.runes.length%2!==0){t+="[invalid char class]";break}if(t+="[",this.runes.length===0)t+="^\\x00-\\x{10FFFF}";else if(this.runes[0]===0&&this.runes[this.runes.length-1]===X.MAX_RUNE){t+="^";for(let e=1;e<this.runes.length-1;e+=2){const r=this.runes[e]+1,s=this.runes[e+1]-1;t+=Y.quoteIfHyphen(r),t+=tt.escapeRune(r),r!==s&&(t+="-",t+=Y.quoteIfHyphen(s),t+=tt.escapeRune(s))}}else for(let e=0;e<this.runes.length;e+=2){const r=this.runes[e],s=this.runes[e+1];t+=Y.quoteIfHyphen(r),t+=tt.escapeRune(r),r!==s&&(t+="-",t+=Y.quoteIfHyphen(s),t+=tt.escapeRune(s))}t+="]";break;default:t+=this.op;break}return t}maxCap(){let t=0;if(this.op===Y.Op.CAPTURE&&(t=this.cap),this.subs!==null)for(let e of this.subs){const r=e.maxCap();t<r&&(t=r)}return t}equals(t){if(!(t!==null&&t instanceof Y)||this.op!==t.op)return!1;switch(this.op){case Y.Op.END_TEXT:{if((this.flags&$.WAS_DOLLAR)!==(t.flags&$.WAS_DOLLAR))return!1;break}case Y.Op.LITERAL:case Y.Op.CHAR_CLASS:{if(this.runes===null&&t.runes===null)break;if(this.runes===null||t.runes===null||this.runes.length!==t.runes.length)return!1;for(let e=0;e<this.runes.length;e++)if(this.runes[e]!==t.runes[e])return!1;break}case Y.Op.ALTERNATE:case Y.Op.CONCAT:{if(this.subs.length!==t.subs.length)return!1;for(let e=0;e<this.subs.length;++e)if(!this.subs[e].equals(t.subs[e]))return!1;break}case Y.Op.STAR:case Y.Op.PLUS:case Y.Op.QUEST:{if((this.flags&$.NON_GREEDY)!==(t.flags&$.NON_GREEDY)||!this.subs[0].equals(t.subs[0]))return!1;break}case Y.Op.REPEAT:{if((this.flags&$.NON_GREEDY)!==(t.flags&$.NON_GREEDY)||this.min!==t.min||this.max!==t.max||!this.subs[0].equals(t.subs[0]))return!1;break}case Y.Op.CAPTURE:{if(this.cap!==t.cap||(this.name===null?t.name!==null:this.name!==t.name)||!this.subs[0].equals(t.subs[0]))return!1;break}}return!0}};_(Y,"Op",k2(["NO_MATCH","EMPTY_MATCH","LITERAL","CHAR_CLASS","ANY_CHAR_NOT_NL","ANY_CHAR","BEGIN_LINE","END_LINE","BEGIN_TEXT","END_TEXT","WORD_BOUNDARY","NO_WORD_BOUNDARY","CAPTURE","STAR","PLUS","QUEST","REPEAT","CONCAT","ALTERNATE","LEFT_PAREN","VERTICAL_BAR"]));let D=Y;const ft=class ft{static isRuneOp(t){return ft.RUNE<=t&&t<=ft.RUNE_ANY_NOT_NL}static escapeRunes(t){let e='"';for(let r of t)e+=tt.escapeRune(r);return e+='"',e}constructor(t){this.op=t,this.out=0,this.arg=0,this.runes=null}matchRune(t){if(this.runes.length===1){const s=this.runes[0];return(this.arg&$.FOLD_CASE)!==0?X.equalsIgnoreCase(s,t):t===s}for(let s=0;s<this.runes.length&&s<=8;s+=2){if(t<this.runes[s])return!1;if(t<=this.runes[s+1])return!0}let e=0,r=this.runes.length/2|0;for(;e<r;){const s=e+((r-e)/2|0);if(this.runes[2*s]<=t){if(t<=this.runes[2*s+1])return!0;e=s+1}else r=s}return!1}toString(){switch(this.op){case ft.ALT:return`alt -> ${this.out}, ${this.arg}`;case ft.ALT_MATCH:return`altmatch -> ${this.out}, ${this.arg}`;case ft.CAPTURE:return`cap ${this.arg} -> ${this.out}`;case ft.EMPTY_WIDTH:return`empty ${this.arg} -> ${this.out}`;case ft.MATCH:return"match";case ft.FAIL:return"fail";case ft.NOP:return`nop -> ${this.out}`;case ft.RUNE:return this.runes===null?"rune <null>":["rune ",ft.escapeRunes(this.runes),(this.arg&$.FOLD_CASE)!==0?"/i":""," -> ",this.out].join("");case ft.RUNE1:return`rune1 ${ft.escapeRunes(this.runes)} -> ${this.out}`;case ft.RUNE_ANY:return`any -> ${this.out}`;case ft.RUNE_ANY_NOT_NL:return`anynotnl -> ${this.out}`;default:throw new Error("unhandled case in Inst.toString")}}};_(ft,"ALT",1),_(ft,"ALT_MATCH",2),_(ft,"CAPTURE",3),_(ft,"EMPTY_WIDTH",4),_(ft,"FAIL",5),_(ft,"MATCH",6),_(ft,"NOP",7),_(ft,"RUNE",8),_(ft,"RUNE1",9),_(ft,"RUNE_ANY",10),_(ft,"RUNE_ANY_NOT_NL",11);let nt=ft;class R4{constructor(){this.inst=[],this.start=0,this.numCap=2}getInst(t){return this.inst[t]}numInst(){return this.inst.length}addInst(t){this.inst.push(new nt(t))}skipNop(t){let e=this.inst[t];for(;e.op===nt.NOP||e.op===nt.CAPTURE;)e=this.inst[t],t=e.out;return e}prefix(){let t="",e=this.skipNop(this.start);if(!nt.isRuneOp(e.op)||e.runes.length!==1)return[e.op===nt.MATCH,t];for(;nt.isRuneOp(e.op)&&e.runes.length===1&&(e.arg&$.FOLD_CASE)===0;)t+=String.fromCodePoint(e.runes[0]),e=this.skipNop(e.out);return[e.op===nt.MATCH,t]}startCond(){let t=0,e=this.start;t:for(;;){const r=this.inst[e];switch(r.op){case nt.EMPTY_WIDTH:t|=r.arg;break;case nt.FAIL:return-1;case nt.CAPTURE:case nt.NOP:break;default:break t}e=r.out}return t}next(t){const e=this.inst[t>>1];return(t&1)===0?e.out:e.arg}patch(t,e){for(;t!==0;){const r=this.inst[t>>1];(t&1)===0?(t=r.out,r.out=e):(t=r.arg,r.arg=e)}}append(t,e){if(t===0)return e;if(e===0)return t;let r=t;for(;;){const i=this.next(r);if(i===0)break;r=i}const s=this.inst[r>>1];return(r&1)===0?s.out=e:s.arg=e,t}toString(){let t="";for(let e=0;e<this.inst.length;e++){const r=t.length;t+=e,e===this.start&&(t+="*"),t+="        ".substring(t.length-r),t+=this.inst[e],t+=`
`}return t}}class Oi{constructor(t=0,e=0,r=!1){this.i=t,this.out=e,this.nullable=r}}class Ts{static ANY_RUNE_NOT_NL(){return[0,N.CODES.get(`
`)-1,N.CODES.get(`
`)+1,X.MAX_RUNE]}static ANY_RUNE(){return[0,X.MAX_RUNE]}static compileRegexp(t){const e=new Ts,r=e.compile(t);return e.prog.patch(r.out,e.newInst(nt.MATCH).i),e.prog.start=r.i,e.prog}constructor(){this.prog=new R4,this.newInst(nt.FAIL)}newInst(t){return this.prog.addInst(t),new Oi(this.prog.numInst()-1,0,!0)}nop(){const t=this.newInst(nt.NOP);return t.out=t.i<<1,t}fail(){return new Oi}cap(t){const e=this.newInst(nt.CAPTURE);return e.out=e.i<<1,this.prog.getInst(e.i).arg=t,this.prog.numCap<t+1&&(this.prog.numCap=t+1),e}cat(t,e){return t.i===0||e.i===0?this.fail():(this.prog.patch(t.out,e.i),new Oi(t.i,e.out,t.nullable&&e.nullable))}alt(t,e){if(t.i===0)return e;if(e.i===0)return t;const r=this.newInst(nt.ALT),s=this.prog.getInst(r.i);return s.out=t.i,s.arg=e.i,r.out=this.prog.append(t.out,e.out),r.nullable=t.nullable||e.nullable,r}loop(t,e){const r=this.newInst(nt.ALT),s=this.prog.getInst(r.i);return e?(s.arg=t.i,r.out=r.i<<1):(s.out=t.i,r.out=r.i<<1|1),this.prog.patch(t.out,r.i),r}quest(t,e){const r=this.newInst(nt.ALT),s=this.prog.getInst(r.i);return e?(s.arg=t.i,r.out=r.i<<1):(s.out=t.i,r.out=r.i<<1|1),r.out=this.prog.append(r.out,t.out),r}star(t,e){return t.nullable?this.quest(this.plus(t,e),e):this.loop(t,e)}plus(t,e){return new Oi(t.i,this.loop(t,e).out,t.nullable)}empty(t){const e=this.newInst(nt.EMPTY_WIDTH);return this.prog.getInst(e.i).arg=t,e.out=e.i<<1,e}rune(t,e){const r=this.newInst(nt.RUNE);r.nullable=!1;const s=this.prog.getInst(r.i);return s.runes=t,e&=$.FOLD_CASE,(t.length!==1||X.simpleFold(t[0])===t[0])&&(e&=-2),s.arg=e,r.out=r.i<<1,(e&$.FOLD_CASE)===0&&t.length===1||t.length===2&&t[0]===t[1]?s.op=nt.RUNE1:t.length===2&&t[0]===0&&t[1]===X.MAX_RUNE?s.op=nt.RUNE_ANY:t.length===4&&t[0]===0&&t[1]===N.CODES.get(`
`)-1&&t[2]===N.CODES.get(`
`)+1&&t[3]===X.MAX_RUNE&&(s.op=nt.RUNE_ANY_NOT_NL),r}compile(t){switch(t.op){case D.Op.NO_MATCH:return this.fail();case D.Op.EMPTY_MATCH:return this.nop();case D.Op.LITERAL:if(t.runes.length===0)return this.nop();{let e=null;for(let r of t.runes){const s=this.rune([r],t.flags);e=e===null?s:this.cat(e,s)}return e}case D.Op.CHAR_CLASS:return this.rune(t.runes,t.flags);case D.Op.ANY_CHAR_NOT_NL:return this.rune(Ts.ANY_RUNE_NOT_NL(),0);case D.Op.ANY_CHAR:return this.rune(Ts.ANY_RUNE(),0);case D.Op.BEGIN_LINE:return this.empty(tt.EMPTY_BEGIN_LINE);case D.Op.END_LINE:return this.empty(tt.EMPTY_END_LINE);case D.Op.BEGIN_TEXT:return this.empty(tt.EMPTY_BEGIN_TEXT);case D.Op.END_TEXT:return this.empty(tt.EMPTY_END_TEXT);case D.Op.WORD_BOUNDARY:return this.empty(tt.EMPTY_WORD_BOUNDARY);case D.Op.NO_WORD_BOUNDARY:return this.empty(tt.EMPTY_NO_WORD_BOUNDARY);case D.Op.CAPTURE:{const e=this.cap(t.cap<<1),r=this.compile(t.subs[0]),s=this.cap(t.cap<<1|1);return this.cat(this.cat(e,r),s)}case D.Op.STAR:return this.star(this.compile(t.subs[0]),(t.flags&$.NON_GREEDY)!==0);case D.Op.PLUS:return this.plus(this.compile(t.subs[0]),(t.flags&$.NON_GREEDY)!==0);case D.Op.QUEST:return this.quest(this.compile(t.subs[0]),(t.flags&$.NON_GREEDY)!==0);case D.Op.CONCAT:{if(t.subs.length===0)return this.nop();{let e=null;for(let r of t.subs){const s=this.compile(r);e=e===null?s:this.cat(e,s)}return e}}case D.Op.ALTERNATE:{if(t.subs.length===0)return this.nop();{let e=null;for(let r of t.subs){const s=this.compile(r);e=e===null?s:this.alt(e,s)}return e}}default:throw new y4("regexp: unhandled case in compile")}}}class Ie{static simplify(t){if(t===null)return null;switch(t.op){case D.Op.CAPTURE:case D.Op.CONCAT:case D.Op.ALTERNATE:{let e=t;for(let r=0;r<t.subs.length;r++){const s=t.subs[r],i=Ie.simplify(s);e===t&&i!==s&&(e=D.fromRegexp(t),e.runes=null,e.subs=t.subs.slice(0,t.subs.length)),e!==t&&(e.subs[r]=i)}return e}case D.Op.STAR:case D.Op.PLUS:case D.Op.QUEST:{const e=Ie.simplify(t.subs[0]);return Ie.simplify1(t.op,t.flags,e,t)}case D.Op.REPEAT:{if(t.min===0&&t.max===0)return new D(D.Op.EMPTY_MATCH);const e=Ie.simplify(t.subs[0]);if(t.max===-1){if(t.min===0)return Ie.simplify1(D.Op.STAR,t.flags,e,null);if(t.min===1)return Ie.simplify1(D.Op.PLUS,t.flags,e,null);const s=new D(D.Op.CONCAT),i=[];for(let o=0;o<t.min-1;o++)i.push(e);return i.push(Ie.simplify1(D.Op.PLUS,t.flags,e,null)),s.subs=i.slice(0),s}if(t.min===1&&t.max===1)return e;let r=null;if(t.min>0){r=[];for(let s=0;s<t.min;s++)r.push(e)}if(t.max>t.min){let s=Ie.simplify1(D.Op.QUEST,t.flags,e,null);for(let i=t.min+1;i<t.max;i++){const o=new D(D.Op.CONCAT);o.subs=[e,s],s=Ie.simplify1(D.Op.QUEST,t.flags,o,null)}if(r===null)return s;r.push(s)}if(r!==null){const s=new D(D.Op.CONCAT);return s.subs=r.slice(0),s}return new D(D.Op.NO_MATCH)}}return t}static simplify1(t,e,r,s){return r.op===D.Op.EMPTY_MATCH||t===r.op&&(e&$.NON_GREEDY)===(r.flags&$.NON_GREEDY)?r:(s!==null&&s.op===t&&(s.flags&$.NON_GREEDY)===(e&$.NON_GREEDY)&&r===s.subs[0]||(s=new D(t),s.flags=e,s.subs=[r]),s)}}class ct{constructor(t,e){this.sign=t,this.cls=e}}const ll=[48,57],hl=[9,10,12,13,32,32],fl=[48,57,65,90,95,95,97,122],dl=new Map([["\\d",new ct(1,ll)],["\\D",new ct(-1,ll)],["\\s",new ct(1,hl)],["\\S",new ct(-1,hl)],["\\w",new ct(1,fl)],["\\W",new ct(-1,fl)]]),pl=[48,57,65,90,97,122],ml=[65,90,97,122],gl=[0,127],_l=[9,9,32,32],El=[0,31,127,127],yl=[48,57],Tl=[33,126],wl=[97,122],Il=[32,126],Al=[33,47,58,64,91,96,123,126],Rl=[9,13,32,32],vl=[65,90],Cl=[48,57,65,90,95,95,97,122],Sl=[48,57,65,70,97,102],Pl=new Map([["[:alnum:]",new ct(1,pl)],["[:^alnum:]",new ct(-1,pl)],["[:alpha:]",new ct(1,ml)],["[:^alpha:]",new ct(-1,ml)],["[:ascii:]",new ct(1,gl)],["[:^ascii:]",new ct(-1,gl)],["[:blank:]",new ct(1,_l)],["[:^blank:]",new ct(-1,_l)],["[:cntrl:]",new ct(1,El)],["[:^cntrl:]",new ct(-1,El)],["[:digit:]",new ct(1,yl)],["[:^digit:]",new ct(-1,yl)],["[:graph:]",new ct(1,Tl)],["[:^graph:]",new ct(-1,Tl)],["[:lower:]",new ct(1,wl)],["[:^lower:]",new ct(-1,wl)],["[:print:]",new ct(1,Il)],["[:^print:]",new ct(-1,Il)],["[:punct:]",new ct(1,Al)],["[:^punct:]",new ct(-1,Al)],["[:space:]",new ct(1,Rl)],["[:^space:]",new ct(-1,Rl)],["[:upper:]",new ct(1,vl)],["[:^upper:]",new ct(-1,vl)],["[:word:]",new ct(1,Cl)],["[:^word:]",new ct(-1,Cl)],["[:xdigit:]",new ct(1,Sl)],["[:^xdigit:]",new ct(-1,Sl)]]);class Gt{static charClassToString(t,e){let r="[";for(let s=0;s<e;s+=2){s>0&&(r+=" ");const i=t[s],o=t[s+1];i===o?r+=`0x${i.toString(16)}`:r+=`0x${i.toString(16)}-0x${o.toString(16)}`}return r+="]",r}static cmp(t,e,r,s){const i=t[e]-r;return i!==0?i:s-t[e+1]}static qsortIntPair(t,e,r){const s=((e+r)/2|0)&-2,i=t[s],o=t[s+1];let u=e,c=r;for(;u<=c;){for(;u<r&&Gt.cmp(t,u,i,o)<0;)u+=2;for(;c>e&&Gt.cmp(t,c,i,o)>0;)c-=2;if(u<=c){if(u!==c){let h=t[u];t[u]=t[c],t[c]=h,h=t[u+1],t[u+1]=t[c+1],t[c+1]=h}u+=2,c-=2}}e<c&&Gt.qsortIntPair(t,e,c),u<r&&Gt.qsortIntPair(t,u,r)}constructor(t=tt.emptyInts()){this.r=t,this.len=t.length}toArray(){return this.len===this.r.length?this.r:this.r.slice(0,this.len)}cleanClass(){if(this.len<4)return this;Gt.qsortIntPair(this.r,0,this.len-2);let t=2;for(let e=2;e<this.len;e+=2){const r=this.r[e],s=this.r[e+1];if(r<=this.r[t-1]+1){s>this.r[t-1]&&(this.r[t-1]=s);continue}this.r[t]=r,this.r[t+1]=s,t+=2}return this.len=t,this}appendLiteral(t,e){return(e&$.FOLD_CASE)!==0?this.appendFoldedRange(t,t):this.appendRange(t,t)}appendRange(t,e){if(this.len>0){for(let r=2;r<=4;r+=2)if(this.len>=r){const s=this.r[this.len-r],i=this.r[this.len-r+1];if(t<=i+1&&s<=e+1)return t<s&&(this.r[this.len-r]=t),e>i&&(this.r[this.len-r+1]=e),this}}return this.r[this.len++]=t,this.r[this.len++]=e,this}appendFoldedRange(t,e){if(t<=X.MIN_FOLD&&e>=X.MAX_FOLD)return this.appendRange(t,e);if(e<X.MIN_FOLD||t>X.MAX_FOLD)return this.appendRange(t,e);t<X.MIN_FOLD&&(this.appendRange(t,X.MIN_FOLD-1),t=X.MIN_FOLD),e>X.MAX_FOLD&&(this.appendRange(X.MAX_FOLD+1,e),e=X.MAX_FOLD);for(let r=t;r<=e;r++){this.appendRange(r,r);for(let s=X.simpleFold(r);s!==r;s=X.simpleFold(s))this.appendRange(s,s)}return this}appendClass(t){for(let e=0;e<t.length;e+=2)this.appendRange(t[e],t[e+1]);return this}appendFoldedClass(t){for(let e=0;e<t.length;e+=2)this.appendFoldedRange(t[e],t[e+1]);return this}appendNegatedClass(t){let e=0;for(let r=0;r<t.length;r+=2){const s=t[r],i=t[r+1];e<=s-1&&this.appendRange(e,s-1),e=i+1}return e<=X.MAX_RUNE&&this.appendRange(e,X.MAX_RUNE),this}appendTable(t){for(let e of t){const r=e[0],s=e[1],i=e[2];if(i===1){this.appendRange(r,s);continue}for(let o=r;o<=s;o+=i)this.appendRange(o,o)}return this}appendNegatedTable(t){let e=0;for(let r of t){const s=r[0],i=r[1],o=r[2];if(o===1){e<=s-1&&this.appendRange(e,s-1),e=i+1;continue}for(let u=s;u<=i;u+=o)e<=u-1&&this.appendRange(e,u-1),e=u+1}return e<=X.MAX_RUNE&&this.appendRange(e,X.MAX_RUNE),this}appendTableWithSign(t,e){return e<0?this.appendNegatedTable(t):this.appendTable(t)}negateClass(){let t=0,e=0;for(let r=0;r<this.len;r+=2){const s=this.r[r],i=this.r[r+1];t<=s-1&&(this.r[e]=t,this.r[e+1]=s-1,e+=2),t=i+1}return this.len=e,t<=X.MAX_RUNE&&(this.r[this.len++]=t,this.r[this.len++]=X.MAX_RUNE),this}appendClassWithSign(t,e){return e<0?this.appendNegatedClass(t):this.appendClass(t)}appendGroup(t,e){let r=t.cls;return e&&(r=new Gt().appendFoldedClass(r).cleanClass().toArray()),this.appendClassWithSign(r,t.sign)}toString(){return Gt.charClassToString(this.r,this.len)}}class ws{static of(t,e){return new ws(t,e)}constructor(t,e){this.first=t,this.second=e}}class v4{constructor(t){this.str=t,this.position=0}pos(){return this.position}rewindTo(t){this.position=t}more(){return this.position<this.str.length}peek(){return this.str.codePointAt(this.position)}skip(t){this.position+=t}skipString(t){this.position+=t.length}pop(){const t=this.str.codePointAt(this.position);return this.position+=tt.charCount(t),t}lookingAt(t){return this.rest().startsWith(t)}rest(){return this.str.substring(this.position)}from(t){return this.str.substring(t,this.position)}toString(){return this.rest()}}const j=class j{static ANY_TABLE(){return[[0,X.MAX_RUNE,1]]}static unicodeTable(t){return t==="Any"?ws.of(j.ANY_TABLE(),j.ANY_TABLE()):jt.CATEGORIES.has(t)?ws.of(jt.CATEGORIES.get(t),jt.FOLD_CATEGORIES.get(t)):jt.SCRIPTS.has(t)?ws.of(jt.SCRIPTS.get(t),jt.FOLD_SCRIPT.get(t)):null}static minFoldRune(t){if(t<X.MIN_FOLD||t>X.MAX_FOLD)return t;let e=t;const r=t;for(t=X.simpleFold(t);t!==r;t=X.simpleFold(t))e>t&&(e=t);return e}static leadingRegexp(t){if(t.op===D.Op.EMPTY_MATCH)return null;if(t.op===D.Op.CONCAT&&t.subs.length>0){const e=t.subs[0];return e.op===D.Op.EMPTY_MATCH?null:e}return t}static literalRegexp(t,e){const r=new D(D.Op.LITERAL);return r.flags=e,r.runes=tt.stringToRunes(t),r}static parse(t,e){return new j(t,e).parseInternal()}static parseRepeat(t){const e=t.pos();if(!t.more()||!t.lookingAt("{"))return-1;t.skip(1);const r=j.parseInt(t);if(r===-1||!t.more())return-1;let s;if(!t.lookingAt(","))s=r;else{if(t.skip(1),!t.more())return-1;if(t.lookingAt("}"))s=-1;else if((s=j.parseInt(t))===-1)return-1}if(!t.more()||!t.lookingAt("}"))return-1;if(t.skip(1),r<0||r>1e3||s===-2||s>1e3||s>=0&&r>s)throw new Ct(j.ERR_INVALID_REPEAT_SIZE,t.from(e));return r<<16|s&X.MAX_BMP}static isValidCaptureName(t){if(t.length===0)return!1;for(let e=0;e<t.length;e++){const r=t.codePointAt(e);if(r!==N.CODES.get("_")&&!tt.isalnum(r))return!1}return!0}static parseInt(t){const e=t.pos();for(;t.more()&&t.peek()>=N.CODES.get("0")&&t.peek()<=N.CODES.get("9");)t.skip(1);const r=t.from(e);return r.length===0||r.length>1&&r.codePointAt(0)===N.CODES.get("0")?-1:r.length>8?-2:parseFloat(r,10)}static isCharClass(t){return t.op===D.Op.LITERAL&&t.runes.length===1||t.op===D.Op.CHAR_CLASS||t.op===D.Op.ANY_CHAR_NOT_NL||t.op===D.Op.ANY_CHAR}static matchRune(t,e){switch(t.op){case D.Op.LITERAL:return t.runes.length===1&&t.runes[0]===e;case D.Op.CHAR_CLASS:for(let r=0;r<t.runes.length;r+=2)if(t.runes[r]<=e&&e<=t.runes[r+1])return!0;return!1;case D.Op.ANY_CHAR_NOT_NL:return e!==N.CODES.get(`
`);case D.Op.ANY_CHAR:return!0}return!1}static mergeCharClass(t,e){switch(t.op){case D.Op.ANY_CHAR:break;case D.Op.ANY_CHAR_NOT_NL:j.matchRune(e,N.CODES.get(`
`))&&(t.op=D.Op.ANY_CHAR);break;case D.Op.CHAR_CLASS:e.op===D.Op.LITERAL?t.runes=new Gt(t.runes).appendLiteral(e.runes[0],e.flags).toArray():t.runes=new Gt(t.runes).appendClass(e.runes).toArray();break;case D.Op.LITERAL:if(e.runes[0]===t.runes[0]&&e.flags===t.flags)break;t.op=D.Op.CHAR_CLASS,t.runes=new Gt().appendLiteral(t.runes[0],t.flags).appendLiteral(e.runes[0],e.flags).toArray();break}}static parseEscape(t){const e=t.pos();if(t.skip(1),!t.more())throw new Ct(j.ERR_TRAILING_BACKSLASH);let r=t.pop();t:switch(r){case N.CODES.get("1"):case N.CODES.get("2"):case N.CODES.get("3"):case N.CODES.get("4"):case N.CODES.get("5"):case N.CODES.get("6"):case N.CODES.get("7"):if(!t.more()||t.peek()<N.CODES.get("0")||t.peek()>N.CODES.get("7"))break;case N.CODES.get("0"):{let s=r-N.CODES.get("0");for(let i=1;i<3&&!(!t.more()||t.peek()<N.CODES.get("0")||t.peek()>N.CODES.get("7"));i++)s=s*8+t.peek()-N.CODES.get("0"),t.skip(1);return s}case N.CODES.get("x"):{if(!t.more())break;if(r=t.pop(),r===N.CODES.get("{")){let o=0,u=0;for(;;){if(!t.more())break t;if(r=t.pop(),r===N.CODES.get("}"))break;const c=tt.unhex(r);if(c<0||(u=u*16+c,u>X.MAX_RUNE))break t;o++}if(o===0)break t;return u}const s=tt.unhex(r);if(!t.more())break;r=t.pop();const i=tt.unhex(r);if(s<0||i<0)break;return s*16+i}case N.CODES.get("a"):return N.CODES.get("\x07");case N.CODES.get("f"):return N.CODES.get("\f");case N.CODES.get("n"):return N.CODES.get(`
`);case N.CODES.get("r"):return N.CODES.get("\r");case N.CODES.get("t"):return N.CODES.get("	");case N.CODES.get("v"):return N.CODES.get("\v");default:if(!tt.isalnum(r))return r;break}throw new Ct(j.ERR_INVALID_ESCAPE,t.from(e))}static parseClassChar(t,e){if(!t.more())throw new Ct(j.ERR_MISSING_BRACKET,t.from(e));return t.lookingAt("\\")?j.parseEscape(t):t.pop()}static concatRunes(t,e){return[...t,...e]}constructor(t,e=0){this.wholeRegexp=t,this.flags=e,this.numCap=0,this.namedGroups={},this.stack=[],this.free=null}newRegexp(t){let e=this.free;return e!==null&&e.subs!==null&&e.subs.length>0?(this.free=e.subs[0],e.reinit(),e.op=t):e=new D(t),e}reuse(t){t.subs!==null&&t.subs.length>0&&(t.subs[0]=this.free),this.free=t}pop(){return this.stack.pop()}popToPseudo(){const t=this.stack.length;let e=t;for(;e>0&&!D.isPseudoOp(this.stack[e-1].op);)e--;const r=this.stack.slice(e,t);return this.stack=this.stack.slice(0,e),r}push(t){if(t.op===D.Op.CHAR_CLASS&&t.runes.length===2&&t.runes[0]===t.runes[1]){if(this.maybeConcat(t.runes[0],this.flags&-2))return null;t.op=D.Op.LITERAL,t.runes=[t.runes[0]],t.flags=this.flags&-2}else if(t.op===D.Op.CHAR_CLASS&&t.runes.length===4&&t.runes[0]===t.runes[1]&&t.runes[2]===t.runes[3]&&X.simpleFold(t.runes[0])===t.runes[2]&&X.simpleFold(t.runes[2])===t.runes[0]||t.op===D.Op.CHAR_CLASS&&t.runes.length===2&&t.runes[0]+1===t.runes[1]&&X.simpleFold(t.runes[0])===t.runes[1]&&X.simpleFold(t.runes[1])===t.runes[0]){if(this.maybeConcat(t.runes[0],this.flags|$.FOLD_CASE))return null;t.op=D.Op.LITERAL,t.runes=[t.runes[0]],t.flags=this.flags|$.FOLD_CASE}else this.maybeConcat(-1,0);return this.stack.push(t),t}maybeConcat(t,e){const r=this.stack.length;if(r<2)return!1;const s=this.stack[r-1],i=this.stack[r-2];return s.op!==D.Op.LITERAL||i.op!==D.Op.LITERAL||(s.flags&$.FOLD_CASE)!==(i.flags&$.FOLD_CASE)?!1:(i.runes=j.concatRunes(i.runes,s.runes),t>=0?(s.runes=[t],s.flags=e,!0):(this.pop(),this.reuse(s),!1))}newLiteral(t,e){const r=this.newRegexp(D.Op.LITERAL);return r.flags=e,(e&$.FOLD_CASE)!==0&&(t=j.minFoldRune(t)),r.runes=[t],r}literal(t){this.push(this.newLiteral(t,this.flags))}op(t){const e=this.newRegexp(t);return e.flags=this.flags,this.push(e)}repeat(t,e,r,s,i,o){let u=this.flags;if((u&$.PERL_X)!==0&&(i.more()&&i.lookingAt("?")&&(i.skip(1),u^=$.NON_GREEDY),o!==-1))throw new Ct(j.ERR_INVALID_REPEAT_OP,i.from(o));const c=this.stack.length;if(c===0)throw new Ct(j.ERR_MISSING_REPEAT_ARGUMENT,i.from(s));const h=this.stack[c-1];if(D.isPseudoOp(h.op))throw new Ct(j.ERR_MISSING_REPEAT_ARGUMENT,i.from(s));const p=this.newRegexp(t);p.min=e,p.max=r,p.flags=u,p.subs=[h],this.stack[c-1]=p}concat(){this.maybeConcat(-1,0);const t=this.popToPseudo();return t.length===0?this.push(this.newRegexp(D.Op.EMPTY_MATCH)):this.push(this.collapse(t,D.Op.CONCAT))}alternate(){const t=this.popToPseudo();return t.length>0&&this.cleanAlt(t[t.length-1]),t.length===0?this.push(this.newRegexp(D.Op.NO_MATCH)):this.push(this.collapse(t,D.Op.ALTERNATE))}cleanAlt(t){t.op===D.Op.CHAR_CLASS&&(t.runes=new Gt(t.runes).cleanClass().toArray(),t.runes.length===2&&t.runes[0]===0&&t.runes[1]===X.MAX_RUNE?(t.runes=null,t.op=D.Op.ANY_CHAR):t.runes.length===4&&t.runes[0]===0&&t.runes[1]===N.CODES.get(`
`)-1&&t.runes[2]===N.CODES.get(`
`)+1&&t.runes[3]===X.MAX_RUNE&&(t.runes=null,t.op=D.Op.ANY_CHAR_NOT_NL))}collapse(t,e){if(t.length===1)return t[0];let r=0;for(let u of t)r+=u.op===e?u.subs.length:1;let s=new Array(r).fill(null),i=0;for(let u of t)u.op===e?(s.splice(i,u.subs.length,...u.subs),i+=u.subs.length,this.reuse(u)):s[i++]=u;let o=this.newRegexp(e);if(o.subs=s,e===D.Op.ALTERNATE&&(o.subs=this.factor(o.subs),o.subs.length===1)){const u=o;o=o.subs[0],this.reuse(u)}return o}factor(t){if(t.length<2)return t;let e=0,r=t.length,s=0,i=null,o=0,u=0,c=0;for(let p=0;p<=r;p++){let m=null,y=0,C=0;if(p<r){let P=t[e+p];if(P.op===D.Op.CONCAT&&P.subs.length>0&&(P=P.subs[0]),P.op===D.Op.LITERAL&&(m=P.runes,y=P.runes.length,C=P.flags&$.FOLD_CASE),C===u){let L=0;for(;L<o&&L<y&&i[L]===m[L];)L++;if(L>0){o=L;continue}}}if(p!==c)if(p===c+1)t[s++]=t[e+c];else{const P=this.newRegexp(D.Op.LITERAL);P.flags=u,P.runes=i.slice(0,o);for(let W=c;W<p;W++)t[e+W]=this.removeLeadingString(t[e+W],o);const L=this.collapse(t.slice(e+c,e+p),D.Op.ALTERNATE),M=this.newRegexp(D.Op.CONCAT);M.subs=[P,L],t[s++]=M}c=p,i=m,o=y,u=C}r=s,e=0,c=0,s=0;let h=null;for(let p=0;p<=r;p++){let m=null;if(!(p<r&&(m=j.leadingRegexp(t[e+p]),h!==null&&h.equals(m)&&(j.isCharClass(h)||h.op===D.Op.REPEAT&&h.min===h.max&&j.isCharClass(h.subs[0]))))){if(p!==c)if(p===c+1)t[s++]=t[e+c];else{const y=h;for(let L=c;L<p;L++){const M=L!==c;t[e+L]=this.removeLeadingRegexp(t[e+L],M)}const C=this.collapse(t.slice(e+c,e+p),D.Op.ALTERNATE),P=this.newRegexp(D.Op.CONCAT);P.subs=[y,C],t[s++]=P}c=p,h=m}}r=s,e=0,c=0,s=0;for(let p=0;p<=r;p++)if(!(p<r&&j.isCharClass(t[e+p]))){if(p!==c)if(p===c+1)t[s++]=t[e+c];else{let m=c;for(let C=c+1;C<p;C++){const P=t[e+m],L=t[e+C];(P.op<L.op||P.op===L.op&&(P.runes!==null?P.runes.length:0)<(L.runes!==null?L.runes.length:0))&&(m=C)}const y=t[e+c];t[e+c]=t[e+m],t[e+m]=y;for(let C=c+1;C<p;C++)j.mergeCharClass(t[e+c],t[e+C]),this.reuse(t[e+C]);this.cleanAlt(t[e+c]),t[s++]=t[e+c]}p<r&&(t[s++]=t[e+p]),c=p+1}r=s,e=0,c=0,s=0;for(let p=0;p<r;++p)p+1<r&&t[e+p].op===D.Op.EMPTY_MATCH&&t[e+p+1].op===D.Op.EMPTY_MATCH||(t[s++]=t[e+p]);return r=s,e=0,t.slice(e,r)}removeLeadingString(t,e){if(t.op===D.Op.CONCAT&&t.subs.length>0){const r=this.removeLeadingString(t.subs[0],e);if(t.subs[0]=r,r.op===D.Op.EMPTY_MATCH)switch(this.reuse(r),t.subs.length){case 0:case 1:t.op=D.Op.EMPTY_MATCH,t.subs=null;break;case 2:{const s=t;t=t.subs[1],this.reuse(s);break}default:t.subs=t.subs.slice(1,t.subs.length);break}return t}return t.op===D.Op.LITERAL&&(t.runes=t.runes.slice(e,t.runes.length),t.runes.length===0&&(t.op=D.Op.EMPTY_MATCH)),t}removeLeadingRegexp(t,e){if(t.op===D.Op.CONCAT&&t.subs.length>0){switch(e&&this.reuse(t.subs[0]),t.subs=t.subs.slice(1,t.subs.length),t.subs.length){case 0:{t.op=D.Op.EMPTY_MATCH,t.subs=D.emptySubs();break}case 1:{const r=t;t=t.subs[0],this.reuse(r);break}}return t}return e&&this.reuse(t),this.newRegexp(D.Op.EMPTY_MATCH)}parseInternal(){if((this.flags&$.LITERAL)!==0)return j.literalRegexp(this.wholeRegexp,this.flags);let t=-1,e=-1,r=-1;const s=new v4(this.wholeRegexp);for(;s.more();){let o=-1;t:switch(s.peek()){case N.CODES.get("("):if((this.flags&$.PERL_X)!==0&&s.lookingAt("(?")){this.parsePerlFlags(s);break}this.op(D.Op.LEFT_PAREN).cap=++this.numCap,s.skip(1);break;case N.CODES.get("|"):this.parseVerticalBar(),s.skip(1);break;case N.CODES.get(")"):this.parseRightParen(),s.skip(1);break;case N.CODES.get("^"):(this.flags&$.ONE_LINE)!==0?this.op(D.Op.BEGIN_TEXT):this.op(D.Op.BEGIN_LINE),s.skip(1);break;case N.CODES.get("$"):(this.flags&$.ONE_LINE)!==0?this.op(D.Op.END_TEXT).flags|=$.WAS_DOLLAR:this.op(D.Op.END_LINE),s.skip(1);break;case N.CODES.get("."):(this.flags&$.DOT_NL)!==0?this.op(D.Op.ANY_CHAR):this.op(D.Op.ANY_CHAR_NOT_NL),s.skip(1);break;case N.CODES.get("["):this.parseClass(s);break;case N.CODES.get("*"):case N.CODES.get("+"):case N.CODES.get("?"):{o=s.pos();let u=null;switch(s.pop()){case N.CODES.get("*"):u=D.Op.STAR;break;case N.CODES.get("+"):u=D.Op.PLUS;break;case N.CODES.get("?"):u=D.Op.QUEST;break}this.repeat(u,e,r,o,s,t);break}case N.CODES.get("{"):{o=s.pos();const u=j.parseRepeat(s);if(u<0){s.rewindTo(o),this.literal(s.pop());break}e=u>>16,r=(u&X.MAX_BMP)<<16>>16,this.repeat(D.Op.REPEAT,e,r,o,s,t);break}case N.CODES.get("\\"):{const u=s.pos();if(s.skip(1),(this.flags&$.PERL_X)!==0&&s.more())switch(s.pop()){case N.CODES.get("A"):this.op(D.Op.BEGIN_TEXT);break t;case N.CODES.get("b"):this.op(D.Op.WORD_BOUNDARY);break t;case N.CODES.get("B"):this.op(D.Op.NO_WORD_BOUNDARY);break t;case N.CODES.get("C"):throw new Ct(j.ERR_INVALID_ESCAPE,"\\C");case N.CODES.get("Q"):{let m=s.rest();const y=m.indexOf("\\E");y>=0&&(m=m.substring(0,y)),s.skipString(m),s.skipString("\\E");let C=0;for(;C<m.length;){const P=m.codePointAt(C);this.literal(P),C+=tt.charCount(P)}break t}case N.CODES.get("z"):this.op(D.Op.END_TEXT);break t;default:s.rewindTo(u);break}const c=this.newRegexp(D.Op.CHAR_CLASS);if(c.flags=this.flags,s.lookingAt("\\p")||s.lookingAt("\\P")){const p=new Gt;if(this.parseUnicodeClass(s,p)){c.runes=p.toArray(),this.push(c);break t}}const h=new Gt;if(this.parsePerlClassEscape(s,h)){c.runes=h.toArray(),this.push(c);break t}s.rewindTo(u),this.reuse(c),this.literal(j.parseEscape(s));break}default:this.literal(s.pop());break}t=o}if(this.concat(),this.swapVerticalBar()&&this.pop(),this.alternate(),this.stack.length!==1)throw new Ct(j.ERR_MISSING_PAREN,this.wholeRegexp);return this.stack[0].namedGroups=this.namedGroups,this.stack[0]}parsePerlFlags(t){const e=t.pos(),r=t.rest();if(r.startsWith("(?P<")||r.startsWith("(?<")){const u=r.charAt(2)==="P"?4:3,c=r.indexOf(">");if(c<0)throw new Ct(j.ERR_INVALID_NAMED_CAPTURE,r);const h=r.substring(u,c);if(t.skipString(h),t.skip(u+1),!j.isValidCaptureName(h))throw new Ct(j.ERR_INVALID_NAMED_CAPTURE,r.substring(0,c+1));const p=this.op(D.Op.LEFT_PAREN);if(p.cap=++this.numCap,this.namedGroups[h])throw new Ct(j.ERR_DUPLICATE_NAMED_CAPTURE,h);this.namedGroups[h]=this.numCap,p.name=h;return}t.skip(2);let s=this.flags,i=1,o=!1;t:for(;t.more();){const u=t.pop();switch(u){case N.CODES.get("i"):s|=$.FOLD_CASE,o=!0;break;case N.CODES.get("m"):s&=-17,o=!0;break;case N.CODES.get("s"):s|=$.DOT_NL,o=!0;break;case N.CODES.get("U"):s|=$.NON_GREEDY,o=!0;break;case N.CODES.get("-"):if(i<0)break t;i=-1,s=~s,o=!1;break;case N.CODES.get(":"):case N.CODES.get(")"):if(i<0){if(!o)break t;s=~s}u===N.CODES.get(":")&&this.op(D.Op.LEFT_PAREN),this.flags=s;return;default:break t}}throw new Ct(j.ERR_INVALID_PERL_OP,t.from(e))}parseVerticalBar(){this.concat(),this.swapVerticalBar()||this.op(D.Op.VERTICAL_BAR)}swapVerticalBar(){const t=this.stack.length;if(t>=3&&this.stack[t-2].op===D.Op.VERTICAL_BAR&&j.isCharClass(this.stack[t-1])&&j.isCharClass(this.stack[t-3])){let e=this.stack[t-1],r=this.stack[t-3];if(e.op>r.op){const s=r;r=e,e=s,this.stack[t-3]=r}return j.mergeCharClass(r,e),this.reuse(e),this.pop(),!0}if(t>=2){const e=this.stack[t-1],r=this.stack[t-2];if(r.op===D.Op.VERTICAL_BAR)return t>=3&&this.cleanAlt(this.stack[t-3]),this.stack[t-2]=e,this.stack[t-1]=r,!0}return!1}parseRightParen(){if(this.concat(),this.swapVerticalBar()&&this.pop(),this.alternate(),this.stack.length<2)throw new Ct(j.ERR_INTERNAL_ERROR,"stack underflow");const e=this.pop(),r=this.pop();if(r.op!==D.Op.LEFT_PAREN)throw new Ct(j.ERR_MISSING_PAREN,this.wholeRegexp);this.flags=r.flags,r.cap===0?this.push(e):(r.op=D.Op.CAPTURE,r.subs=[e],this.push(r))}parsePerlClassEscape(t,e){const r=t.pos();if((this.flags&$.PERL_X)===0||!t.more()||t.pop()!==N.CODES.get("\\")||!t.more())return!1;t.pop();const s=t.from(r),i=dl.has(s)?dl.get(s):null;return i===null?!1:(e.appendGroup(i,(this.flags&$.FOLD_CASE)!==0),!0)}parseNamedClass(t,e){const r=t.rest(),s=r.indexOf(":]");if(s<0)return!1;const i=r.substring(0,s+2);t.skipString(i);const o=Pl.has(i)?Pl.get(i):null;if(o===null)throw new Ct(j.ERR_INVALID_CHAR_RANGE,i);return e.appendGroup(o,(this.flags&$.FOLD_CASE)!==0),!0}parseUnicodeClass(t,e){const r=t.pos();if((this.flags&$.UNICODE_GROUPS)===0||!t.lookingAt("\\p")&&!t.lookingAt("\\P"))return!1;t.skip(1);let s=1,i=t.pop();if(i===N.CODES.get("P")&&(s=-1),!t.more())throw t.rewindTo(r),new Ct(j.ERR_INVALID_CHAR_RANGE,t.rest());i=t.pop();let o;if(i!==N.CODES.get("{"))o=tt.runeToString(i);else{const p=t.rest(),m=p.indexOf("}");if(m<0)throw t.rewindTo(r),new Ct(j.ERR_INVALID_CHAR_RANGE,t.rest());o=p.substring(0,m),t.skipString(o),t.skip(1)}o.length!==0&&o.codePointAt(0)===N.CODES.get("^")&&(s=0-s,o=o.substring(1));const u=j.unicodeTable(o);if(u===null)throw new Ct(j.ERR_INVALID_CHAR_RANGE,t.from(r));const c=u.first,h=u.second;if((this.flags&$.FOLD_CASE)===0||h===null)e.appendTableWithSign(c,s);else{const p=new Gt().appendTable(c).appendTable(h).cleanClass().toArray();e.appendClassWithSign(p,s)}return!0}parseClass(t){const e=t.pos();t.skip(1);const r=this.newRegexp(D.Op.CHAR_CLASS);r.flags=this.flags;const s=new Gt;let i=1;t.more()&&t.lookingAt("^")&&(i=-1,t.skip(1),(this.flags&$.CLASS_NL)===0&&s.appendRange(N.CODES.get(`
`),N.CODES.get(`
`)));let o=!0;for(;!t.more()||t.peek()!==N.CODES.get("]")||o;){if(t.more()&&t.lookingAt("-")&&(this.flags&$.PERL_X)===0&&!o){const p=t.rest();if(p==="-"||!p.startsWith("-]"))throw t.rewindTo(e),new Ct(j.ERR_INVALID_CHAR_RANGE,t.rest())}o=!1;const u=t.pos();if(t.lookingAt("[:")){if(this.parseNamedClass(t,s))continue;t.rewindTo(u)}if(this.parseUnicodeClass(t,s)||this.parsePerlClassEscape(t,s))continue;t.rewindTo(u);const c=j.parseClassChar(t,e);let h=c;if(t.more()&&t.lookingAt("-")){if(t.skip(1),t.more()&&t.lookingAt("]"))t.skip(-1);else if(h=j.parseClassChar(t,e),h<c)throw new Ct(j.ERR_INVALID_CHAR_RANGE,t.from(u))}(this.flags&$.FOLD_CASE)===0?s.appendRange(c,h):s.appendFoldedRange(c,h)}t.skip(1),s.cleanClass(),i<0&&s.negateClass(),r.runes=s.toArray(),this.push(r)}};_(j,"ERR_INTERNAL_ERROR","regexp/syntax: internal error"),_(j,"ERR_INVALID_CHAR_RANGE","invalid character class range"),_(j,"ERR_INVALID_ESCAPE","invalid escape sequence"),_(j,"ERR_INVALID_NAMED_CAPTURE","invalid named capture"),_(j,"ERR_INVALID_PERL_OP","invalid or unsupported Perl syntax"),_(j,"ERR_INVALID_REPEAT_OP","invalid nested repetition operator"),_(j,"ERR_INVALID_REPEAT_SIZE","invalid repeat count"),_(j,"ERR_MISSING_BRACKET","missing closing ]"),_(j,"ERR_MISSING_PAREN","missing closing )"),_(j,"ERR_MISSING_REPEAT_ARGUMENT","missing argument to repetition operator"),_(j,"ERR_TRAILING_BACKSLASH","trailing backslash at end of expression"),_(j,"ERR_DUPLICATE_NAMED_CAPTURE","duplicate capture group name");let Za=j;class C4{constructor(){this.inst=null,this.cap=[]}}class bl{constructor(){this.sparse=[],this.densePcs=[],this.denseThreads=[],this.size=0}contains(t){const e=this.sparse[t];return e<this.size&&this.densePcs[e]===t}isEmpty(){return this.size===0}add(t){const e=this.size++;return this.sparse[t]=e,this.denseThreads[e]=null,this.densePcs[e]=t,e}clear(){this.sparse=[],this.densePcs=[],this.denseThreads=[],this.size=0}toString(){let t="{";for(let e=0;e<this.size;e++)e!==0&&(t+=", "),t+=this.densePcs[e];return t+="}",t}}class Pr{static fromRE2(t){const e=new Pr;return e.prog=t.prog,e.re2=t,e.q0=new bl(e.prog.numInst()),e.q1=new bl(e.prog.numInst()),e.pool=[],e.poolSize=0,e.matched=!1,e.matchcap=Array(e.prog.numCap<2?2:e.prog.numCap).fill(0),e.ncap=0,e}static fromMachine(t){const e=new Pr;return e.re2=t.re2,e.prog=t.prog,e.q0=t.q0,e.q1=t.q1,e.pool=t.pool,e.poolSize=t.poolSize,e.matched=t.matched,e.matchcap=t.matchcap,e.ncap=t.ncap,e}init(t){this.ncap=t,t>this.matchcap.length?this.initNewCap(t):this.resetCap(t)}resetCap(t){for(let e=0;e<this.poolSize;e++){const r=this.pool[e];r.cap=Array(t).fill(0)}}initNewCap(t){for(let e=0;e<this.poolSize;e++){const r=this.pool[e];r.cap=Array(t).fill(0)}this.matchcap=Array(t).fill(0)}submatches(){return this.ncap===0?tt.emptyInts():this.matchcap.slice(0,this.ncap)}alloc(t){let e;return this.poolSize>0?(this.poolSize--,e=this.pool[this.poolSize]):e=new C4,e.inst=t,e}freeQueue(t,e=0){const r=t.size-e,s=this.poolSize+r;this.pool.length<s&&(this.pool=this.pool.slice(0,Math.max(this.pool.length*2,s)));for(let i=e;i<t.size;i++){const o=t.denseThreads[i];o!==null&&(this.pool[this.poolSize]=o,this.poolSize++)}t.clear()}freeThread(t){this.pool.length<=this.poolSize&&(this.pool=this.pool.slice(0,this.pool.length*2)),this.pool[this.poolSize]=t,this.poolSize++}match(t,e,r){const s=this.re2.cond;if(s===tt.EMPTY_ALL||(r===$.ANCHOR_START||r===$.ANCHOR_BOTH)&&e!==0)return!1;this.matched=!1,this.matchcap=Array(this.prog.numCap).fill(-1);let i=this.q0,o=this.q1,u=t.step(e),c=u>>3,h=u&7,p=-1,m=0;u!==En.EOF()&&(u=t.step(e+h),p=u>>3,m=u&7);let y;for(e===0?y=tt.emptyOpContext(-1,c):y=t.context(e);;){if(i.isEmpty()){if((s&tt.EMPTY_BEGIN_TEXT)!==0&&e!==0||this.matched)break;if(this.re2.prefix.length!==0&&p!==this.re2.prefixRune&&t.canCheckPrefix()){const L=t.index(this.re2,e);if(L<0)break;e+=L,u=t.step(e),c=u>>3,h=u&7,u=t.step(e+h),p=u>>3,m=u&7}}!this.matched&&(e===0||r===$.UNANCHORED)&&(this.ncap>0&&(this.matchcap[0]=e),this.add(i,this.prog.start,e,this.matchcap,y,null));const C=e+h;if(y=t.context(C),this.step(i,o,e,C,c,y,r,e===t.endPos()),h===0||this.ncap===0&&this.matched)break;e+=h,c=p,h=m,c!==-1&&(u=t.step(e+h),p=u>>3,m=u&7);const P=i;i=o,o=P}return this.freeQueue(o),this.matched}step(t,e,r,s,i,o,u,c){const h=this.re2.longest;for(let p=0;p<t.size;p++){let m=t.denseThreads[p];if(m===null)continue;if(h&&this.matched&&this.ncap>0&&this.matchcap[0]<m.cap[0]){this.freeThread(m);continue}const y=m.inst;let C=!1;switch(y.op){case nt.MATCH:if(u===$.ANCHOR_BOTH&&!c)break;this.ncap>0&&(!h||!this.matched||this.matchcap[1]<r)&&(m.cap[1]=r,this.matchcap=m.cap.slice(0,this.ncap)),h||this.freeQueue(t,p+1),this.matched=!0;break;case nt.RUNE:C=y.matchRune(i);break;case nt.RUNE1:C=i===y.runes[0];break;case nt.RUNE_ANY:C=!0;break;case nt.RUNE_ANY_NOT_NL:C=i!==N.CODES.get(`
`);break;default:throw new Error("bad inst")}C&&(m=this.add(e,y.out,s,m.cap,o,m)),m!==null&&(this.freeThread(m),t.denseThreads[p]=null)}t.clear()}add(t,e,r,s,i,o){if(e===0||t.contains(e))return o;const u=t.add(e),c=this.prog.inst[e];switch(c.op){case nt.FAIL:break;case nt.ALT:case nt.ALT_MATCH:o=this.add(t,c.out,r,s,i,o),o=this.add(t,c.arg,r,s,i,o);break;case nt.EMPTY_WIDTH:(c.arg&~i)===0&&(o=this.add(t,c.out,r,s,i,o));break;case nt.NOP:o=this.add(t,c.out,r,s,i,o);break;case nt.CAPTURE:if(c.arg<this.ncap){const h=s[c.arg];s[c.arg]=r,this.add(t,c.out,r,s,i,null),s[c.arg]=h}else o=this.add(t,c.out,r,s,i,o);break;case nt.MATCH:case nt.RUNE:case nt.RUNE1:case nt.RUNE_ANY:case nt.RUNE_ANY_NOT_NL:o===null?o=this.alloc(c):o.inst=c,this.ncap>0&&o.cap!==s&&(o.cap=s.slice(0,this.ncap)),t.denseThreads[u]=o,o=null;break;default:throw new Error("unhandled")}return o}}class S4{constructor(t){this.value=t}get(){return this.value}set(t){this.value=t}compareAndSet(t,e){return this.value===t?(this.value=e,!0):!1}}class fn{static initTest(t){const e=fn.compile(t),r=new fn(e.expr,e.prog,e.numSubexp,e.longest);return r.cond=e.cond,r.prefix=e.prefix,r.prefixUTF8=e.prefixUTF8,r.prefixComplete=e.prefixComplete,r.prefixRune=e.prefixRune,r}static compile(t){return fn.compileImpl(t,$.PERL,!1)}static compilePOSIX(t){return fn.compileImpl(t,$.POSIX,!0)}static compileImpl(t,e,r){let s=Za.parse(t,e);const i=s.maxCap();s=Ie.simplify(s);const o=Ts.compileRegexp(s),u=new fn(t,o,i,r),[c,h]=o.prefix();return u.prefixComplete=c,u.prefix=h,u.prefixUTF8=tt.stringToUtf8ByteArray(u.prefix),u.prefix.length>0&&(u.prefixRune=u.prefix.codePointAt(0)),u.namedGroups=s.namedGroups,u}static match(t,e){return fn.compile(t).match(e)}constructor(t,e,r=0,s=0){this.expr=t,this.prog=e,this.numSubexp=r,this.longest=s,this.cond=e.startCond(),this.prefix=null,this.prefixUTF8=null,this.prefixComplete=!1,this.prefixRune=0,this.pooled=new S4}numberOfCapturingGroups(){return this.numSubexp}get(){let t;do t=this.pooled.get();while(t&&!this.pooled.compareAndSet(t,t.next));return t}reset(){this.pooled.set(null)}put(t,e){let r=this.pooled.get();do r=this.pooled.get(),!e&&r&&(t=Pr.fromMachine(t),e=!0),t.next!==r&&(t.next=r);while(!this.pooled.compareAndSet(r,t))}toString(){return this.expr}doExecute(t,e,r,s){let i=this.get(),o=!1;i?i.next!==null&&(i=Pr.fromMachine(i),o=!0):(i=Pr.fromRE2(this),o=!0),i.init(s);const u=i.match(t,e,r)?i.submatches():null;return this.put(i,o),u}match(t){return this.doExecute(St.fromUTF16(t),0,$.UNANCHORED,0)!==null}matchWithGroup(t,e,r,s,i){return t instanceof Pn||(t=io.utf16(t)),this.matchMachineInput(t,e,r,s,i)}matchMachineInput(t,e,r,s,i){if(e>r)return[!1,null];const o=t.isUTF16Encoding()?St.fromUTF16(t.asCharSequence(),0,r):St.fromUTF8(t.asBytes(),0,r),u=this.doExecute(o,e,s,2*i);return u===null?[!1,null]:[!0,u]}matchUTF8(t){return this.doExecute(St.fromUTF8(t),0,$.UNANCHORED,0)!==null}replaceAll(t,e){return this.replaceAllFunc(t,()=>e,2*t.length+1)}replaceFirst(t,e){return this.replaceAllFunc(t,()=>e,1)}replaceAllFunc(t,e,r){let s=0,i=0,o="";const u=St.fromUTF16(t);let c=0;for(;i<=t.length;){const h=this.doExecute(u,i,$.UNANCHORED,2);if(h===null||h.length===0)break;o+=t.substring(s,h[0]),(h[1]>s||h[0]===0)&&(o+=e(t.substring(h[0],h[1])),c++),s=h[1];const p=u.step(i)&7;if(i+p>h[1]?i+=p:i+1>h[1]?i++:i=h[1],c>=r)break}return o+=t.substring(s),o}pad(t){if(t===null)return null;let e=(1+this.numSubexp)*2;if(t.length<e){let r=new Array(e).fill(-1);for(let s=0;s<t.length;s++)r[s]=t[s];t=r}return t}allMatches(t,e,r=s=>s){let s=[];const i=t.endPos();e<0&&(e=i+1);let o=0,u=0,c=-1;for(;u<e&&o<=i;){const h=this.doExecute(t,o,$.UNANCHORED,this.prog.numCap);if(h===null||h.length===0)break;let p=!0;if(h[1]===o){h[0]===c&&(p=!1);const m=t.step(o);m<0?o=i+1:o+=m&7}else o=h[1];c=h[1],p&&(s.push(r(this.pad(h))),u++)}return s}findUTF8(t){const e=this.doExecute(St.fromUTF8(t),0,$.UNANCHORED,2);return e===null?null:t.slice(e[0],e[1])}findUTF8Index(t){const e=this.doExecute(St.fromUTF8(t),0,$.UNANCHORED,2);return e===null?null:e.slice(0,2)}find(t){const e=this.doExecute(St.fromUTF16(t),0,$.UNANCHORED,2);return e===null?"":t.substring(e[0],e[1])}findIndex(t){return this.doExecute(St.fromUTF16(t),0,$.UNANCHORED,2)}findUTF8Submatch(t){const e=this.doExecute(St.fromUTF8(t),0,$.UNANCHORED,this.prog.numCap);if(e===null)return null;const r=new Array(1+this.numSubexp).fill(null);for(let s=0;s<r.length;s++)2*s<e.length&&e[2*s]>=0&&(r[s]=t.slice(e[2*s],e[2*s+1]));return r}findUTF8SubmatchIndex(t){return this.pad(this.doExecute(St.fromUTF8(t),0,$.UNANCHORED,this.prog.numCap))}findSubmatch(t){const e=this.doExecute(St.fromUTF16(t),0,$.UNANCHORED,this.prog.numCap);if(e===null)return null;const r=new Array(1+this.numSubexp).fill(null);for(let s=0;s<r.length;s++)2*s<e.length&&e[2*s]>=0&&(r[s]=t.substring(e[2*s],e[2*s+1]));return r}findSubmatchIndex(t){return this.pad(this.doExecute(St.fromUTF16(t),0,$.UNANCHORED,this.prog.numCap))}findAllUTF8(t,e){const r=this.allMatches(St.fromUTF8(t),e,s=>t.slice(s[0],s[1]));return r.length===0?null:r}findAllUTF8Index(t,e){const r=this.allMatches(St.fromUTF8(t),e,s=>s.slice(0,2));return r.length===0?null:r}findAll(t,e){const r=this.allMatches(St.fromUTF16(t),e,s=>t.substring(s[0],s[1]));return r.length===0?null:r}findAllIndex(t,e){const r=this.allMatches(St.fromUTF16(t),e,s=>s.slice(0,2));return r.length===0?null:r}findAllUTF8Submatch(t,e){const r=this.allMatches(St.fromUTF8(t),e,s=>{let i=new Array(s.length/2|0).fill(null);for(let o=0;o<i.length;o++)s[2*o]>=0&&(i[o]=t.slice(s[2*o],s[2*o+1]));return i});return r.length===0?null:r}findAllUTF8SubmatchIndex(t,e){const r=this.allMatches(St.fromUTF8(t),e);return r.length===0?null:r}findAllSubmatch(t,e){const r=this.allMatches(St.fromUTF16(t),e,s=>{let i=new Array(s.length/2|0).fill(null);for(let o=0;o<i.length;o++)s[2*o]>=0&&(i[o]=t.substring(s[2*o],s[2*o+1]));return i});return r.length===0?null:r}findAllSubmatchIndex(t,e){const r=this.allMatches(St.fromUTF16(t),e);return r.length===0?null:r}}const Zt=class Zt{static quote(t){return tt.quoteMeta(t)}static compile(t,e=0){let r=t;if((e&Zt.CASE_INSENSITIVE)!==0&&(r=`(?i)${r}`),(e&Zt.DOTALL)!==0&&(r=`(?s)${r}`),(e&Zt.MULTILINE)!==0&&(r=`(?m)${r}`),(e&-32)!==0)throw new T4("Flags should only be a combination of MULTILINE, DOTALL, CASE_INSENSITIVE, DISABLE_UNICODE_GROUPS, LONGEST_MATCH");let s=$.PERL;(e&Zt.DISABLE_UNICODE_GROUPS)!==0&&(s&=-129);const i=new Zt(t,e);return i.re2Input=fn.compileImpl(r,s,(e&Zt.LONGEST_MATCH)!==0),i}static matches(t,e){return Zt.compile(t).matcher(e).matches()}static initTest(t,e,r){if(t==null)throw new Error("pattern is null");if(r==null)throw new Error("re2 is null");const s=new Zt(t,e);return s.re2Input=r,s}constructor(t,e){this.patternInput=t,this.flagsInput=e}reset(){this.re2Input.reset()}flags(){return this.flagsInput}pattern(){return this.patternInput}re2(){return this.re2Input}matches(t){return this.matcher(t).matches()}matcher(t){return Array.isArray(t)&&(t=io.utf8(t)),new w4(this,t)}split(t,e=0){const r=this.matcher(t),s=[];let i=0,o=0;for(;r.find();){if(o===0&&r.end()===0){o=r.end();continue}if(e>0&&s.length===e-1)break;if(o===r.start()){if(e===0){i+=1,o=r.end();continue}}else for(;i>0;)s.push(""),i-=1;s.push(r.substring(o,r.start())),o=r.end()}if(e===0&&o!==r.inputLength()){for(;i>0;)s.push(""),i-=1;s.push(r.substring(o,r.inputLength()))}return(e!==0||s.length===0)&&s.push(r.substring(o,r.inputLength())),s}toString(){return this.patternInput}groupCount(){return this.re2Input.numberOfCapturingGroups()}namedGroups(){return this.re2Input.namedGroups}equals(t){return this===t?!0:t===null||this.constructor!==t.constructor?!1:this.flagsInput===t.flagsInput&&this.patternInput===t.patternInput}};_(Zt,"CASE_INSENSITIVE",1),_(Zt,"DOTALL",2),_(Zt,"MULTILINE",4),_(Zt,"DISABLE_UNICODE_GROUPS",8),_(Zt,"LONGEST_MATCH",16);let Vs=Zt;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zt{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}zt.UNAUTHENTICATED=new zt(null),zt.GOOGLE_CREDENTIALS=new zt("google-credentials-uid"),zt.FIRST_PARTY=new zt("first-party-uid"),zt.MOCK_USER=new zt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ur="12.15.0";function P4(n){Ur=n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ur=new E1("@firebase/firestore");function Tr(){return ur.logLevel}function q(n,...t){if(ur.logLevel<=at.DEBUG){const e=t.map(O1);ur.debug(`Firestore (${Ur}): ${n}`,...e)}}function Je(n,...t){if(ur.logLevel<=at.ERROR){const e=t.map(O1);ur.error(`Firestore (${Ur}): ${n}`,...e)}}function ve(n,...t){if(ur.logLevel<=at.WARN){const e=t.map(O1);ur.warn(`Firestore (${Ur}): ${n}`,...e)}}function O1(n){if(typeof n=="string")return n;try{return(function(e){return JSON.stringify(e)})(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function z(n,t,e){let r="Unexpected state";typeof t=="string"?r=t:e=t,D2(n,r,e)}function D2(n,t,e){let r=`FIRESTORE (${Ur}) INTERNAL ASSERTION FAILED: ${t} (ID: ${n.toString(16)})`;if(e!==void 0)try{r+=" CONTEXT: "+JSON.stringify(e)}catch{r+=" CONTEXT: "+e}throw Je(r),new Error(r)}function H(n,t,e,r){let s="Unexpected state";typeof e=="string"?s=e:r=e,n||D2(t,s,r)}function Z(n,t){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const V={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class B extends Be{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class We{constructor(){this.promise=new Promise(((t,e)=>{this.resolve=t,this.reject=e}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class V2{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class b4{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable((()=>e(zt.UNAUTHENTICATED)))}shutdown(){}}class N4{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable((()=>e(this.token.user)))}shutdown(){this.changeListener=null}}class O4{constructor(t){this.t=t,this.currentUser=zt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){H(this.o===void 0,42304);let r=this.i;const s=c=>this.i!==r?(r=this.i,e(c)):Promise.resolve();let i=new We;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new We,t.enqueueRetryable((()=>s(this.currentUser)))};const o=()=>{const c=i;t.enqueueRetryable((async()=>{await c.promise,await s(this.currentUser)}))},u=c=>{q("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit((c=>u(c))),setTimeout((()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?u(c):(q("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new We)}}),0),o()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then((r=>this.i!==t?(q("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(H(typeof r.accessToken=="string",31837,{l:r}),new V2(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return H(t===null||typeof t=="string",2055,{h:t}),new zt(t)}}class k4{constructor(t,e,r){this.T=t,this.P=e,this.R=r,this.type="FirstParty",this.user=zt.FIRST_PARTY,this.I=new Map}A(){return this.R?this.R():null}get headers(){this.I.set("X-Goog-AuthUser",this.T);const t=this.A();return t&&this.I.set("Authorization",t),this.P&&this.I.set("X-Goog-Iam-Authorization-Token",this.P),this.I}}class D4{constructor(t,e,r){this.T=t,this.P=e,this.R=r}getToken(){return Promise.resolve(new k4(this.T,this.P,this.R))}start(t,e){t.enqueueRetryable((()=>e(zt.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class Nl{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class V4{constructor(t,e){this.V=e,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,ie(t)&&t.settings.appCheckToken&&(this.p=t.settings.appCheckToken)}start(t,e){H(this.o===void 0,3512);const r=i=>{i.error!=null&&q("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.m;return this.m=i.token,q("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?e(i.token):Promise.resolve()};this.o=i=>{t.enqueueRetryable((()=>r(i)))};const s=i=>{q("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((i=>s(i))),setTimeout((()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):q("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new Nl(this.p));const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then((e=>e?(H(typeof e.token=="string",44558,{tokenResult:e}),this.m=e.token,new Nl(e.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function x4(n){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(n);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let r=0;r<n;r++)e[r]=Math.floor(256*Math.random());return e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class k1{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=x4(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<e&&(r+=t.charAt(s[i]%62))}return r}}function ot(n,t){return n<t?-1:n>t?1:0}function t1(n,t){const e=Math.min(n.length,t.length);for(let r=0;r<e;r++){const s=n.charAt(r),i=t.charAt(r);if(s!==i)return xa(s)===xa(i)?ot(s,i):xa(s)?1:-1}return ot(n.length,t.length)}const L4=55296,M4=57343;function xa(n){const t=n.charCodeAt(0);return t>=L4&&t<=M4}function Nr(n,t,e){return n.length===t.length&&n.every(((r,s)=>e(r,t[s])))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ne="__name__";class be{constructor(t,e,r){e===void 0?e=0:e>t.length&&z(637,{offset:e,range:t.length}),r===void 0?r=t.length-e:r>t.length-e&&z(1746,{length:r,range:t.length-e}),this.segments=t,this.offset=e,this.len=r}get length(){return this.len}isEqual(t){return be.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof be?t.forEach((r=>{e.push(r)})):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,r=this.limit();e<r;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const r=Math.min(t.length,e.length);for(let s=0;s<r;s++){const i=be.compareSegments(t.get(s),e.get(s));if(i!==0)return i}return ot(t.length,e.length)}static compareSegments(t,e){const r=be.isNumericId(t),s=be.isNumericId(e);return r&&!s?-1:!r&&s?1:r&&s?be.extractNumericId(t).compare(be.extractNumericId(e)):t1(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return An.fromString(t.substring(4,t.length-2))}}class lt extends be{construct(t,e,r){return new lt(t,e,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toStringWithLeadingSlash(){return`/${this.canonicalString()}`}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const r of t){if(r.indexOf("//")>=0)throw new B(V.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);e.push(...r.split("/").filter((s=>s.length>0)))}return new lt(e)}static emptyPath(){return new lt([])}}const U4=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class xt extends be{construct(t,e,r){return new xt(t,e,r)}static isValidIdentifier(t){return U4.test(t)}canonicalString(){return this.toArray().map((t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),xt.isValidIdentifier(t)||(t="`"+t+"`"),t))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Ne}static keyField(){return new xt([Ne])}static fromServerFormat(t){const e=[];let r="",s=0;const i=()=>{if(r.length===0)throw new B(V.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(r),r=""};let o=!1;for(;s<t.length;){const u=t[s];if(u==="\\"){if(s+1===t.length)throw new B(V.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const c=t[s+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new B(V.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);r+=c,s+=2}else u==="`"?(o=!o,s++):u!=="."||o?(r+=u,s++):(i(),s++)}if(i(),o)throw new B(V.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new xt(e)}static emptyPath(){return new xt([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G{constructor(t){this.path=t}static fromPath(t){return new G(lt.fromString(t))}static fromName(t){return new G(lt.fromString(t).popFirst(5))}static empty(){return new G(lt.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&lt.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return lt.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new G(new lt(t.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function x2(n,t,e){if(!e)throw new B(V.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${t}.`)}function F4(n,t,e,r){if(t===!0&&r===!0)throw new B(V.INVALID_ARGUMENT,`${n} and ${e} cannot be used together.`)}function Ol(n){if(!G.isDocumentKey(n))throw new B(V.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function kl(n){if(G.isDocumentKey(n))throw new B(V.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function ni(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function No(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const t=(function(r){return r.constructor?r.constructor.name:null})(n);return t?`a custom ${t} object`:"an object"}}return typeof n=="function"?"a function":z(12329,{type:typeof n})}function ae(n,t){if("_delegate"in n&&(n=n._delegate),!(n instanceof t)){if(t.name===n.constructor.name)throw new B(V.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=No(n);throw new B(V.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return n}function B4(n,t){if(t<=0)throw new B(V.INVALID_ARGUMENT,`Function ${n}() requires a positive number, but it was: ${t}.`)}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nt(n,t){const e={typeString:n};return t&&(e.value=t),e}function ri(n,t){if(!ni(n))throw new B(V.INVALID_ARGUMENT,"JSON must be an object");let e;for(const r in t)if(t[r]){const s=t[r].typeString,i="value"in t[r]?{value:t[r].value}:void 0;if(!(r in n)){e=`JSON missing required field: '${r}'`;break}const o=n[r];if(s&&typeof o!==s){e=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&o!==i.value){e=`Expected '${r}' field to equal '${i.value}'`;break}}if(e)throw new B(V.INVALID_ARGUMENT,e);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dl=-62135596800,Vl=1e6;class mt{static now(){return mt.fromMillis(Date.now())}static fromDate(t){return mt.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),r=Math.floor((t-1e3*e)*Vl);return new mt(e,r)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new B(V.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new B(V.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<Dl)throw new B(V.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new B(V.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Vl}_compareTo(t){return this.seconds===t.seconds?ot(this.nanoseconds,t.nanoseconds):ot(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:mt._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(t){if(ri(t,mt._jsonSchema))return new mt(t.seconds,t.nanoseconds)}valueOf(){const t=this.seconds-Dl;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}mt._jsonSchemaVersion="firestore/timestamp/1.0",mt._jsonSchema={type:Nt("string",mt._jsonSchemaVersion),seconds:Nt("number"),nanoseconds:Nt("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class J{static fromTimestamp(t){return new J(t)}static min(){return new J(new mt(0,0))}static max(){return new J(new mt(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xs=-1;function q4(n,t){const e=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=J.fromTimestamp(r===1e9?new mt(e+1,0):new mt(e,r));return new bn(s,G.empty(),t)}function $4(n){return new bn(n.readTime,n.key,xs)}class bn{constructor(t,e,r){this.readTime=t,this.documentKey=e,this.largestBatchId=r}static min(){return new bn(J.min(),G.empty(),xs)}static max(){return new bn(J.max(),G.empty(),xs)}}function H4(n,t){let e=n.readTime.compareTo(t.readTime);return e!==0?e:(e=G.comparator(n.documentKey,t.documentKey),e!==0?e:ot(n.largestBatchId,t.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const j4="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class G4{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((t=>t()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Fr(n){if(n.code!==V.FAILED_PRECONDITION||n.message!==j4)throw n;q("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class x{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t((e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)}),(e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)}))}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&z(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new x(((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(t,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(e,i).next(r,s)}}))}toPromise(){return new Promise(((t,e)=>{this.next(t,e)}))}wrapUserFunction(t){try{const e=t();return e instanceof x?e:x.resolve(e)}catch(e){return x.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction((()=>t(e))):x.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction((()=>t(e))):x.reject(e)}static resolve(t){return new x(((e,r)=>{e(t)}))}static reject(t){return new x(((e,r)=>{r(t)}))}static waitFor(t){return new x(((e,r)=>{let s=0,i=0,o=!1;t.forEach((u=>{++s,u.next((()=>{++i,o&&i===s&&e()}),(c=>r(c)))})),o=!0,i===s&&e()}))}static or(t){let e=x.resolve(!1);for(const r of t)e=e.next((s=>s?x.resolve(s):r()));return e}static forEach(t,e){const r=[];return t.forEach(((s,i)=>{r.push(e.call(this,s,i))})),this.waitFor(r)}static mapArray(t,e){return new x(((r,s)=>{const i=t.length,o=new Array(i);let u=0;for(let c=0;c<i;c++){const h=c;e(t[h]).next((p=>{o[h]=p,++u,u===i&&r(o)}),(p=>s(p)))}}))}static doWhile(t,e){return new x(((r,s)=>{const i=()=>{t()===!0?e().next((()=>{i()}),s):r()};i()}))}}function z4(n){const t=n.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}function Br(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oo{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>e.writeSequenceNumber(r))}ae(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.ue&&this.ue(t),t}}Oo.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const D1=-1;function ko(n){return n==null}function Ls(n){return n===0&&1/n==-1/0}function W4(n){return typeof n=="number"&&Number.isInteger(n)&&!Ls(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}function K4(n){return typeof n=="string"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const L2="";function Y4(n){let t="";for(let e=0;e<n.length;e++)t.length>0&&(t=xl(t)),t=Q4(n.get(e),t);return xl(t)}function Q4(n,t){let e=t;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":e+="";break;case L2:e+="";break;default:e+=i}}return e}function xl(n){return n+L2+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Et{constructor(t,e){this.comparator=t,this.root=e||Bt.EMPTY}insert(t,e){return new Et(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,Bt.BLACK,null,null))}remove(t){return new Et(this.comparator,this.root.remove(t,this.comparator).copy(null,null,Bt.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const r=this.comparator(t,e.key);if(r===0)return e.value;r<0?e=e.left:r>0&&(e=e.right)}return null}indexOf(t){let e=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(t,r.key);if(s===0)return e+r.left.size;s<0?r=r.left:(e+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal(((e,r)=>(t(e,r),!1)))}toString(){const t=[];return this.inorderTraversal(((e,r)=>(t.push(`${e}:${r}`),!1))),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new ki(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new ki(this.root,t,this.comparator,!1)}getReverseIterator(){return new ki(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new ki(this.root,t,this.comparator,!0)}}class ki{constructor(t,e,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!t.isEmpty();)if(i=e?r(t.key,e):1,e&&s&&(i*=-1),i<0)t=this.isReverse?t.left:t.right;else{if(i===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class Bt{constructor(t,e,r,s,i){this.key=t,this.value=e,this.color=r??Bt.RED,this.left=s??Bt.EMPTY,this.right=i??Bt.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,r,s,i){return new Bt(t??this.key,e??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,r){let s=this;const i=r(t,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(t,e,r),null):i===0?s.copy(null,e,null,null,null):s.copy(null,null,null,null,s.right.insert(t,e,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Bt.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let r,s=this;if(e(t,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(t,e),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),e(t,s.key)===0){if(s.right.isEmpty())return Bt.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(t,e))}return s.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,Bt.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,Bt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw z(43730,{key:this.key,value:this.value});if(this.right.isRed())throw z(14113,{key:this.key,value:this.value});const t=this.left.check();if(t!==this.right.check())throw z(27949);return t+(this.isRed()?0:1)}}Bt.EMPTY=null,Bt.RED=!0,Bt.BLACK=!1;Bt.EMPTY=new class{constructor(){this.size=0}get key(){throw z(57766)}get value(){throw z(16141)}get color(){throw z(16727)}get left(){throw z(29726)}get right(){throw z(36894)}copy(t,e,r,s,i){return this}insert(t,e,r){return new Bt(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ot{constructor(t){this.comparator=t,this.data=new Et(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal(((e,r)=>(t(e),!1)))}forEachInRange(t,e){const r=this.data.getIteratorFrom(t[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,t[1])>=0)return;e(s.key)}}forEachWhile(t,e){let r;for(r=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();r.hasNext();)if(!t(r.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new Ll(this.data.getIterator())}getIteratorFrom(t){return new Ll(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach((r=>{e=e.add(r)})),e}isEqual(t){if(!(t instanceof Ot)||this.size!==t.size)return!1;const e=this.data.getIterator(),r=t.data.getIterator();for(;e.hasNext();){const s=e.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const t=[];return this.forEach((e=>{t.push(e)})),t}toString(){const t=[];return this.forEach((e=>t.push(e))),"SortedSet("+t.toString()+")"}copy(t){const e=new Ot(this.comparator);return e.data=t,e}}class Ll{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pe{constructor(t){this.fields=t,t.sort(xt.comparator)}static empty(){return new pe([])}unionWith(t){let e=new Ot(xt.comparator);for(const r of this.fields)e=e.add(r);for(const r of t)e=e.add(r);return new pe(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return Nr(this.fields,t.fields,((e,r)=>e.isEqual(r)))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oo(n){let t=0;for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t++;return t}function qn(n,t){for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t(e,n[e])}function X4(n,t){const e=[];for(const r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.push(t(n[r],r,n));return e}function M2(n){for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t))return!1;return!0}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class U2 extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kt{constructor(t){this.binaryString=t}static fromBase64String(t){const e=(function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new U2("Invalid base64 string: "+i):i}})(t);return new kt(e)}static fromUint8Array(t){const e=(function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i})(t);return new kt(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(e){return btoa(e)})(this.binaryString)}toUint8Array(){return(function(e){const r=new Uint8Array(e.length);for(let s=0;s<e.length;s++)r[s]=e.charCodeAt(s);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return ot(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}kt.EMPTY_BYTE_STRING=new kt("");const J4=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Nn(n){if(H(!!n,39018),typeof n=="string"){let t=0;const e=J4.exec(n);if(H(!!e,46558,{timestamp:n}),e[1]){let s=e[1];s=(s+"000000000").substr(0,9),t=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:It(n.seconds),nanos:It(n.nanos)}}function It(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function On(n){return typeof n=="string"?kt.fromBase64String(n):kt.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const F2="server_timestamp",B2="__type__",q2="__previous_value__",$2="__local_write_time__";function Do(n){var e,r;return((r=(((e=n==null?void 0:n.mapValue)==null?void 0:e.fields)||{})[B2])==null?void 0:r.stringValue)===F2}function si(n){const t=n.mapValue.fields[q2];return Do(t)?si(t):t}function Or(n){const t=Nn(n.mapValue.fields[$2].timestampValue);return new mt(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z4{constructor(t,e,r,s,i,o,u,c,h,p,m){this.databaseId=t,this.appId=e,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=u,this.longPollingOptions=c,this.useFetchStreams=h,this.isUsingEmulator=p,this.apiKey=m}}const ao="(default)";class Ms{constructor(t,e){this.projectId=t,this.database=e||ao}static empty(){return new Ms("","")}get isDefaultDatabase(){return this.database===ao}isEqual(t){return t instanceof Ms&&t.projectId===this.projectId&&t.database===this.database}}function t3(n,t){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new B(V.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Ms(n.options.projectId,t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const H2="__type__",e3="__max__",Di={mapValue:{}},j2="__vector__",Us="value",kr={nullValue:"NULL_VALUE"},ce={booleanValue:!0},Ft={booleanValue:!1};function Dt(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Do(n)?4:n3(n)?9007199254740991:uo(n)?10:11:z(28295,{value:n})}function we(n,t,e){if(n===t)return!0;const r=Dt(n);if(r!==Dt(t))return!1;switch(r){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===t.booleanValue;case 4:return Or(n).isEqual(Or(t));case 3:return(function(i,o){if(typeof i.timestampValue=="string"&&typeof o.timestampValue=="string"&&i.timestampValue.length===o.timestampValue.length)return i.timestampValue===o.timestampValue;const u=Nn(i.timestampValue),c=Nn(o.timestampValue);return u.seconds===c.seconds&&u.nanos===c.nanos})(n,t);case 5:return n.stringValue===t.stringValue;case 6:return(function(i,o){return On(i.bytesValue).isEqual(On(o.bytesValue))})(n,t);case 7:return n.referenceValue===t.referenceValue;case 8:return(function(i,o){return It(i.geoPointValue.latitude)===It(o.geoPointValue.latitude)&&It(i.geoPointValue.longitude)===It(o.geoPointValue.longitude)})(n,t);case 2:return(function(i,o,u){if("integerValue"in i&&"integerValue"in o)return It(i.integerValue)===It(o.integerValue);let c,h;if("doubleValue"in i&&"doubleValue"in o)c=It(i.doubleValue),h=It(o.doubleValue);else{if(!(u!=null&&u.Ee))return!1;c=It(i.integerValue??i.doubleValue),h=It(o.integerValue??o.doubleValue)}return c===h?!!(u!=null&&u.he)||Ls(c)===Ls(h):!!(u===void 0||u.Te)&&isNaN(c)&&isNaN(h)})(n,t,e);case 9:return Nr(n.arrayValue.values||[],t.arrayValue.values||[],((s,i)=>we(s,i,e)));case 10:case 11:return(function(i,o,u){const c=i.mapValue.fields||{},h=o.mapValue.fields||{};if(oo(c)!==oo(h))return!1;for(const p in c)if(c.hasOwnProperty(p)&&(h[p]===void 0||!we(c[p],h[p],u)))return!1;return!0})(n,t,e);default:return z(52216,{left:n})}}function Fs(n,t){return(n.values||[]).find((e=>we(e,t)))!==void 0}function le(n,t){if(n===t)return 0;const e=Dt(n),r=Dt(t);if(e!==r)return ot(e,r);switch(e){case 0:case 9007199254740991:return 0;case 1:return ot(n.booleanValue,t.booleanValue);case 2:return(function(i,o){const u=It(i.integerValue||i.doubleValue),c=It(o.integerValue||o.doubleValue);return u<c?-1:u>c?1:u===c?0:isNaN(u)?isNaN(c)?0:-1:1})(n,t);case 3:return Ml(n.timestampValue,t.timestampValue);case 4:return Ml(Or(n),Or(t));case 5:return t1(n.stringValue,t.stringValue);case 6:return(function(i,o){const u=On(i),c=On(o);return u.compareTo(c)})(n.bytesValue,t.bytesValue);case 7:return(function(i,o){const u=i.split("/"),c=o.split("/");for(let h=0;h<u.length&&h<c.length;h++){const p=ot(u[h],c[h]);if(p!==0)return p}return ot(u.length,c.length)})(n.referenceValue,t.referenceValue);case 8:return(function(i,o){const u=ot(It(i.latitude),It(o.latitude));return u!==0?u:ot(It(i.longitude),It(o.longitude))})(n.geoPointValue,t.geoPointValue);case 9:return Ul(n.arrayValue,t.arrayValue);case 10:return(function(i,o){var y,C,P,L;const u=i.fields||{},c=o.fields||{},h=(y=u[Us])==null?void 0:y.arrayValue,p=(C=c[Us])==null?void 0:C.arrayValue,m=ot(((P=h==null?void 0:h.values)==null?void 0:P.length)||0,((L=p==null?void 0:p.values)==null?void 0:L.length)||0);return m!==0?m:Ul(h,p)})(n.mapValue,t.mapValue);case 11:return(function(i,o){if(i===Di.mapValue&&o===Di.mapValue)return 0;if(i===Di.mapValue)return 1;if(o===Di.mapValue)return-1;const u=i.fields||{},c=Object.keys(u),h=o.fields||{},p=Object.keys(h);c.sort(),p.sort();for(let m=0;m<c.length&&m<p.length;++m){const y=t1(c[m],p[m]);if(y!==0)return y;const C=le(u[c[m]],h[p[m]]);if(C!==0)return C}return ot(c.length,p.length)})(n.mapValue,t.mapValue);default:throw z(23264,{Pe:e})}}function Ml(n,t){if(typeof n=="string"&&typeof t=="string"&&n.length===t.length)return ot(n,t);const e=Nn(n),r=Nn(t),s=ot(e.seconds,r.seconds);return s!==0?s:ot(e.nanos,r.nanos)}function Ul(n,t){const e=n.values||[],r=t.values||[];for(let s=0;s<e.length&&s<r.length;++s){const i=le(e[s],r[s]);if(i!==void 0&&i!==0)return i}return ot(e.length,r.length)}function Dr(n){return e1(n)}function e1(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(e){const r=Nn(e);return`time(${r.seconds},${r.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(e){return On(e).toBase64()})(n.bytesValue):"referenceValue"in n?(function(e){return G.fromName(e).toString()})(n.referenceValue):"geoPointValue"in n?(function(e){return`geo(${e.latitude},${e.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(e){let r="[",s=!0;for(const i of e.values||[])s?s=!1:r+=",",r+=e1(i);return r+"]"})(n.arrayValue):"mapValue"in n?(function(e){const r=Object.keys(e.fields||{}).sort();let s="{",i=!0;for(const o of r)i?i=!1:s+=",",s+=`${o}:${e1(e.fields[o])}`;return s+"}"})(n.mapValue):z(61005,{value:n})}function ji(n){switch(Dt(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=si(n);return t?16+ji(t):16;case 5:return 2*n.stringValue.length;case 6:return On(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return(function(r){return(r.values||[]).reduce(((s,i)=>s+ji(i)),0)})(n.arrayValue);case 10:case 11:return(function(r){let s=0;return qn(r.fields,((i,o)=>{s+=i.length+ji(o)})),s})(n.mapValue);default:throw z(13486,{value:n})}}function Fl(n,t){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${t.path.canonicalString()}`}}function Oe(n){return!!n&&"integerValue"in n}function Jn(n){return!!n&&"doubleValue"in n}function kn(n){return Oe(n)||Jn(n)}function Vr(n){return!!n&&"arrayValue"in n}function me(n){return!!n&&"nullValue"in n}function he(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Zn(n){return!!n&&"mapValue"in n}function uo(n){var e,r;return((r=(((e=n==null?void 0:n.mapValue)==null?void 0:e.fields)||{})[H2])==null?void 0:r.stringValue)===j2}function n1(n){var t,e;return(e=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[Us])==null?void 0:e.arrayValue}function Is(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const t={mapValue:{fields:{}}};return qn(n.mapValue.fields,((e,r)=>t.mapValue.fields[e]=Is(r))),t}if(n.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(n.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=Is(n.arrayValue.values[e]);return t}return{...n}}function n3(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===e3}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ee{constructor(t){this.value=t}static empty(){return new ee({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let r=0;r<t.length-1;++r)if(e=(e.mapValue.fields||{})[t.get(r)],!Zn(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=Is(e)}setAll(t){let e=xt.emptyPath(),r={},s=[];t.forEach(((o,u)=>{if(!e.isImmediateParentOf(u)){const c=this.getFieldsMap(e);this.applyChanges(c,r,s),r={},s=[],e=u.popLast()}o?r[u.lastSegment()]=Is(o):s.push(u.lastSegment())}));const i=this.getFieldsMap(e);this.applyChanges(i,r,s)}delete(t){const e=this.field(t.popLast());Zn(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return we(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let r=0;r<t.length;++r){let s=e.mapValue.fields[t.get(r)];Zn(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},e.mapValue.fields[t.get(r)]=s),e=s}return e.mapValue.fields}applyChanges(t,e,r){qn(e,((s,i)=>t[s]=i));for(const s of r)delete t[s]}clone(){return new ee(Is(this.value))}}function G2(n){const t=[];return qn(n.fields,((e,r)=>{const s=new xt([e]);if(Zn(r)){const i=G2(r.mapValue).fields;if(i.length===0)t.push(s);else for(const o of i)t.push(s.child(o))}else t.push(s)})),new pe(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vo(n,t){if(n.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Ls(t)?"-0":t}}function V1(n){return{integerValue:""+n}}function xo(n,t,e){return Number.isInteger(t)&&(e!=null&&e.preferIntegers)||W4(t)?V1(t):Vo(n,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lo{constructor(){this._=void 0}}function r3(n,t,e){return n instanceof Bs?(function(s,i){const o={fields:{[B2]:{stringValue:F2},[$2]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Do(i)&&(i=si(i)),i&&(o.fields[q2]=i),{mapValue:o}})(e,t):n instanceof qs?W2(n,t):n instanceof $s?K2(n,t):n instanceof xr?(function(s,i){const o=z2(s,i),u=ho(o)+ho(s.Re);return Oe(o)&&Oe(s.Re)?V1(u):Vo(s.serializer,u)})(n,t):n instanceof co?(function(s,i){return Bl(s,i,Math.min)})(n,t):n instanceof lo?(function(s,i){return Bl(s,i,Math.max)})(n,t):void 0}function s3(n,t,e){return n instanceof qs?W2(n,t):n instanceof $s?K2(n,t):e}function z2(n,t){return n instanceof xr?kn(t)?t:{integerValue:0}:null}class Bs extends Lo{}class qs extends Lo{constructor(t){super(),this.elements=t}}function W2(n,t){const e=Y2(t);for(const r of n.elements)e.some((s=>we(s,r)))||e.push(r);return{arrayValue:{values:e}}}class $s extends Lo{constructor(t){super(),this.elements=t}}function K2(n,t){let e=Y2(t);for(const r of n.elements)e=e.filter((s=>!we(s,r)));return{arrayValue:{values:e}}}class x1 extends Lo{constructor(t,e){super(),this.serializer=t,this.Re=e}}class xr extends x1{}class co extends x1{}class lo extends x1{}function Bl(n,t,e){if(!kn(t))return n.Re;const r=e(ho(t),ho(n.Re));return Oe(t)&&Oe(n.Re)?V1(r):Vo(n.serializer,r)}function ho(n){return It(n.integerValue||n.doubleValue)}function Y2(n){return Vr(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Q2{constructor(t,e){this.field=t,this.transform=e}}function i3(n,t){return n.field.isEqual(t.field)&&(function(r,s){return r instanceof qs&&s instanceof qs||r instanceof $s&&s instanceof $s?Nr(r.elements,s.elements,we):r instanceof xr&&s instanceof xr||r instanceof co&&s instanceof co||r instanceof lo&&s instanceof lo?we(r.Re,s.Re):r instanceof Bs&&s instanceof Bs})(n.transform,t.transform)}class o3{constructor(t,e){this.version=t,this.transformResults=e}}class ye{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new ye}static exists(t){return new ye(void 0,t)}static updateTime(t){return new ye(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function Gi(n,t){return n.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(n.updateTime):n.exists===void 0||n.exists===t.isFoundDocument()}class Mo{}function X2(n,t){if(!n.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return n.isNoDocument()?new L1(n.key,ye.none()):new ii(n.key,n.data,ye.none());{const e=n.data,r=ee.empty();let s=new Ot(xt.comparator);for(let i of t.fields)if(!s.has(i)){let o=e.field(i);o===null&&i.length>1&&(i=i.popLast(),o=e.field(i)),o===null?r.delete(i):r.set(i,o),s=s.add(i)}return new $n(n.key,r,new pe(s.toArray()),ye.none())}}function a3(n,t,e){n instanceof ii?(function(s,i,o){const u=s.value.clone(),c=$l(s.fieldTransforms,i,o.transformResults);u.setAll(c),i.convertToFoundDocument(o.version,u).setHasCommittedMutations()})(n,t,e):n instanceof $n?(function(s,i,o){if(!Gi(s.precondition,i))return void i.convertToUnknownDocument(o.version);const u=$l(s.fieldTransforms,i,o.transformResults),c=i.data;c.setAll(J2(s)),c.setAll(u),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()})(n,t,e):(function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()})(0,t,e)}function As(n,t,e,r){return n instanceof ii?(function(i,o,u,c){if(!Gi(i.precondition,o))return u;const h=i.value.clone(),p=Hl(i.fieldTransforms,c,o);return h.setAll(p),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),null})(n,t,e,r):n instanceof $n?(function(i,o,u,c){if(!Gi(i.precondition,o))return u;const h=Hl(i.fieldTransforms,c,o),p=o.data;return p.setAll(J2(i)),p.setAll(h),o.convertToFoundDocument(o.version,p).setHasLocalMutations(),u===null?null:u.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map((m=>m.field)))})(n,t,e,r):(function(i,o,u){return Gi(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):u})(n,t,e)}function u3(n,t){let e=null;for(const r of n.fieldTransforms){const s=t.data.field(r.field),i=z2(r.transform,s||null);i!=null&&(e===null&&(e=ee.empty()),e.set(r.field,i))}return e||null}function ql(n,t){return n.type===t.type&&!!n.key.isEqual(t.key)&&!!n.precondition.isEqual(t.precondition)&&!!(function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&Nr(r,s,((i,o)=>i3(i,o)))})(n.fieldTransforms,t.fieldTransforms)&&(n.type===0?n.value.isEqual(t.value):n.type!==1||n.data.isEqual(t.data)&&n.fieldMask.isEqual(t.fieldMask))}class ii extends Mo{constructor(t,e,r,s=[]){super(),this.key=t,this.value=e,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class $n extends Mo{constructor(t,e,r,s,i=[]){super(),this.key=t,this.data=e,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function J2(n){const t=new Map;return n.fieldMask.fields.forEach((e=>{if(!e.isEmpty()){const r=n.data.field(e);t.set(e,r)}})),t}function $l(n,t,e){const r=new Map;H(n.length===e.length,32656,{Ie:e.length,Ae:n.length});for(let s=0;s<e.length;s++){const i=n[s],o=i.transform,u=t.data.field(i.field);r.set(i.field,s3(o,u,e[s]))}return r}function Hl(n,t,e){const r=new Map;for(const s of n){const i=s.transform,o=e.data.field(s.field);r.set(s.field,r3(i,o,t))}return r}class L1 extends Mo{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class c3 extends Mo{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fo{constructor(t,e){this.position=t,this.inclusive=e}}function jl(n,t,e){let r=0;for(let s=0;s<n.position.length;s++){const i=t[s],o=n.position[s];if(i.field.isKeyField()?r=G.comparator(G.fromName(o.referenceValue),e.key):r=le(o,e.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function Gl(n,t){if(n===null)return t===null;if(t===null||n.inclusive!==t.inclusive||n.position.length!==t.position.length)return!1;for(let e=0;e<n.position.length;e++)if(!we(n.position[e],t.position[e]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z2{}class bt extends Z2{constructor(t,e,r){super(),this.field=t,this.op=e,this.value=r}static create(t,e,r){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,r):new h3(t,e,r):e==="array-contains"?new p3(t,r):e==="in"?new m3(t,r):e==="not-in"?new g3(t,r):e==="array-contains-any"?new _3(t,r):new bt(t,e,r)}static createKeyFieldInFilter(t,e,r){return e==="in"?new f3(t,r):new d3(t,r)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&e.nullValue===void 0&&this.matchesComparison(le(e,this.value)):e!==null&&Dt(this.value)===Dt(e)&&this.matchesComparison(le(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return z(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Ce extends Z2{constructor(t,e){super(),this.filters=t,this.op=e,this.Ve=null}static create(t,e){return new Ce(t,e)}matches(t){return t6(this)?this.filters.find((e=>!e.matches(t)))===void 0:this.filters.find((e=>e.matches(t)))!==void 0}getFlattenedFilters(){return this.Ve!==null||(this.Ve=this.filters.reduce(((t,e)=>t.concat(e.getFlattenedFilters())),[])),this.Ve}getFilters(){return Object.assign([],this.filters)}}function t6(n){return n.op==="and"}function e6(n){return l3(n)&&t6(n)}function l3(n){for(const t of n.filters)if(t instanceof Ce)return!1;return!0}function r1(n){if(n instanceof bt)return n.field.canonicalString()+n.op.toString()+Dr(n.value);if(e6(n))return n.filters.map((t=>r1(t))).join(",");{const t=n.filters.map((e=>r1(e))).join(",");return`${n.op}(${t})`}}function n6(n,t){return n instanceof bt?(function(r,s){return s instanceof bt&&r.op===s.op&&r.field.isEqual(s.field)&&we(r.value,s.value)})(n,t):n instanceof Ce?(function(r,s){return s instanceof Ce&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce(((i,o,u)=>i&&n6(o,s.filters[u])),!0):!1})(n,t):void z(19439)}function r6(n){return n instanceof bt?(function(e){return`${e.field.canonicalString()} ${e.op} ${Dr(e.value)}`})(n):n instanceof Ce?(function(e){return e.op.toString()+" {"+e.getFilters().map(r6).join(" ,")+"}"})(n):"Filter"}class h3 extends bt{constructor(t,e,r){super(t,e,r),this.key=G.fromName(r.referenceValue)}matches(t){const e=G.comparator(t.key,this.key);return this.matchesComparison(e)}}class f3 extends bt{constructor(t,e){super(t,"in",e),this.keys=s6("in",e)}matches(t){return this.keys.some((e=>e.isEqual(t.key)))}}class d3 extends bt{constructor(t,e){super(t,"not-in",e),this.keys=s6("not-in",e)}matches(t){return!this.keys.some((e=>e.isEqual(t.key)))}}function s6(n,t){var e;return(((e=t.arrayValue)==null?void 0:e.values)||[]).map((r=>G.fromName(r.referenceValue)))}class p3 extends bt{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return Vr(e)&&Fs(e.arrayValue,this.value)}}class m3 extends bt{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&Fs(this.value.arrayValue,e)}}class g3 extends bt{constructor(t,e){super(t,"not-in",e)}matches(t){if(Fs(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&e.nullValue===void 0&&!Fs(this.value.arrayValue,e)}}class _3 extends bt{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!Vr(e)||!e.arrayValue.values)&&e.arrayValue.values.some((r=>Fs(this.value.arrayValue,r)))}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hs{constructor(t,e="asc"){this.field=t,this.dir=e}}function E3(n,t){return n.dir===t.dir&&n.field.isEqual(t.field)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wt{constructor(t,e,r,s,i,o,u){this.key=t,this.documentType=e,this.version=r,this.readTime=s,this.createTime=i,this.data=o,this.documentState=u}static newInvalidDocument(t){return new Wt(t,0,J.min(),J.min(),J.min(),ee.empty(),0)}static newFoundDocument(t,e,r,s){return new Wt(t,1,e,J.min(),r,s,0)}static newNoDocument(t,e){return new Wt(t,2,e,J.min(),J.min(),ee.empty(),0)}static newUnknownDocument(t,e){return new Wt(t,3,e,J.min(),J.min(),ee.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(J.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=ee.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=ee.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=J.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof Wt&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new Wt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class y3{constructor(t,e=null,r=[],s=[],i=null,o=null,u=null){this.path=t,this.collectionGroup=e,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=o,this.endAt=u,this.de=null}}function zl(n,t=null,e=[],r=[],s=null,i=null,o=null){return new y3(n,t,e,r,s,i,o)}function i6(n){const t=Z(n);if(t.de===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map((r=>r1(r))).join(","),e+="|ob:",e+=t.orderBy.map((r=>(function(i){return i.field.canonicalString()+i.dir})(r))).join(","),ko(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map((r=>Dr(r))).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map((r=>Dr(r))).join(",")),t.de=e}return t.de}function o6(n,t){if(n.limit!==t.limit||n.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<n.orderBy.length;e++)if(!E3(n.orderBy[e],t.orderBy[e]))return!1;if(n.filters.length!==t.filters.length)return!1;for(let e=0;e<n.filters.length;e++)if(!n6(n.filters[e],t.filters[e]))return!1;return n.collectionGroup===t.collectionGroup&&!!n.path.isEqual(t.path)&&!!Gl(n.startAt,t.startAt)&&Gl(n.endAt,t.endAt)}function Qn(n){return!!n.isCorePipeline}function a6(n){return!!n.path&&G.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qr{constructor(t,e=null,r=[],s=[],i=null,o="F",u=null,c=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=o,this.startAt=u,this.endAt=c,this.fe=null,this.me=null,this.pe=null,this.startAt,this.endAt}}function T3(n,t,e,r,s,i,o,u){return new qr(n,t,e,r,s,i,o,u)}function Uo(n){return new qr(n)}function Wl(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function w3(n){return G.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function u6(n){return n.collectionGroup!==null}function Rs(n){const t=Z(n);if(t.fe===null){t.fe=[];const e=new Set;for(const i of t.explicitOrderBy)t.fe.push(i),e.add(i.field.canonicalString());const r=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(o){let u=new Ot(xt.comparator);return o.filters.forEach((c=>{c.getFlattenedFilters().forEach((h=>{h.isInequality()&&(u=u.add(h.field))}))})),u})(t).forEach((i=>{e.has(i.canonicalString())||i.isKeyField()||t.fe.push(new Hs(i,r))})),e.has(xt.keyField().canonicalString())||t.fe.push(new Hs(xt.keyField(),r))}return t.fe}function xe(n){const t=Z(n);return t.me||(t.me=I3(t,Rs(n))),t.me}function I3(n,t){if(n.limitType==="F")return zl(n.path,n.collectionGroup,t,n.filters,n.limit,n.startAt,n.endAt);{t=t.map((s=>{const i=s.dir==="desc"?"asc":"desc";return new Hs(s.field,i)}));const e=n.endAt?new fo(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new fo(n.startAt.position,n.startAt.inclusive):null;return zl(n.path,n.collectionGroup,t,n.filters,n.limit,e,r)}}function s1(n,t){const e=n.filters.concat([t]);return new qr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),e,n.limit,n.limitType,n.startAt,n.endAt)}function A3(n,t){const e=n.explicitOrderBy.concat([t]);return new qr(n.path,n.collectionGroup,e,n.filters.slice(),n.limit,n.limitType,n.startAt,n.endAt)}function po(n,t,e){return new qr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),t,e,n.startAt,n.endAt)}function R3(n,t){return o6(xe(n),xe(t))&&n.limitType===t.limitType}function vs(n){return`Query(target=${(function(e){let r=e.path.canonicalString();return e.collectionGroup!==null&&(r+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(r+=`, filters: [${e.filters.map((s=>r6(s))).join(", ")}]`),ko(e.limit)||(r+=", limit: "+e.limit),e.orderBy.length>0&&(r+=`, orderBy: [${e.orderBy.map((s=>(function(o){return`${o.field.canonicalString()} (${o.dir})`})(s))).join(", ")}]`),e.startAt&&(r+=", startAt: ",r+=e.startAt.inclusive?"b:":"a:",r+=e.startAt.position.map((s=>Dr(s))).join(",")),e.endAt&&(r+=", endAt: ",r+=e.endAt.inclusive?"a:":"b:",r+=e.endAt.position.map((s=>Dr(s))).join(",")),`Target(${r})`})(xe(n))}; limitType=${n.limitType})`}function Fo(n,t){return t.isFoundDocument()&&(function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):G.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)})(n,t)&&(function(r,s){for(const i of Rs(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0})(n,t)&&(function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0})(n,t)&&(function(r,s){return!(r.startAt&&!(function(o,u,c){const h=jl(o,u,c);return o.inclusive?h<=0:h<0})(r.startAt,Rs(r),s)||r.endAt&&!(function(o,u,c){const h=jl(o,u,c);return o.inclusive?h>=0:h>0})(r.endAt,Rs(r),s))})(n,t)}function M1(n){return(t,e)=>{let r=!1;for(const s of Rs(n)){const i=v3(s,t,e);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function v3(n,t,e){const r=n.field.isKeyField()?G.comparator(t.key,e.key):(function(i,o,u){const c=o.data.field(i),h=u.data.field(i);return c!==null&&h!==null?le(c,h):z(42886)})(n.field,t,e);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return z(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C3{constructor(t,e){this.count=t,this.unchangedNames=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Pt,ut;function S3(n){switch(n){case V.OK:return z(64938);case V.CANCELLED:case V.UNKNOWN:case V.DEADLINE_EXCEEDED:case V.RESOURCE_EXHAUSTED:case V.INTERNAL:case V.UNAVAILABLE:case V.UNAUTHENTICATED:return!1;case V.INVALID_ARGUMENT:case V.NOT_FOUND:case V.ALREADY_EXISTS:case V.PERMISSION_DENIED:case V.FAILED_PRECONDITION:case V.ABORTED:case V.OUT_OF_RANGE:case V.UNIMPLEMENTED:case V.DATA_LOSS:return!0;default:return z(15467,{code:n})}}function c6(n){if(n===void 0)return Je("GRPC error has no .code"),V.UNKNOWN;switch(n){case Pt.OK:return V.OK;case Pt.CANCELLED:return V.CANCELLED;case Pt.UNKNOWN:return V.UNKNOWN;case Pt.DEADLINE_EXCEEDED:return V.DEADLINE_EXCEEDED;case Pt.RESOURCE_EXHAUSTED:return V.RESOURCE_EXHAUSTED;case Pt.INTERNAL:return V.INTERNAL;case Pt.UNAVAILABLE:return V.UNAVAILABLE;case Pt.UNAUTHENTICATED:return V.UNAUTHENTICATED;case Pt.INVALID_ARGUMENT:return V.INVALID_ARGUMENT;case Pt.NOT_FOUND:return V.NOT_FOUND;case Pt.ALREADY_EXISTS:return V.ALREADY_EXISTS;case Pt.PERMISSION_DENIED:return V.PERMISSION_DENIED;case Pt.FAILED_PRECONDITION:return V.FAILED_PRECONDITION;case Pt.ABORTED:return V.ABORTED;case Pt.OUT_OF_RANGE:return V.OUT_OF_RANGE;case Pt.UNIMPLEMENTED:return V.UNIMPLEMENTED;case Pt.DATA_LOSS:return V.DATA_LOSS;default:return z(39323,{code:n})}}(ut=Pt||(Pt={}))[ut.OK=0]="OK",ut[ut.CANCELLED=1]="CANCELLED",ut[ut.UNKNOWN=2]="UNKNOWN",ut[ut.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ut[ut.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ut[ut.NOT_FOUND=5]="NOT_FOUND",ut[ut.ALREADY_EXISTS=6]="ALREADY_EXISTS",ut[ut.PERMISSION_DENIED=7]="PERMISSION_DENIED",ut[ut.UNAUTHENTICATED=16]="UNAUTHENTICATED",ut[ut.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ut[ut.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ut[ut.ABORTED=10]="ABORTED",ut[ut.OUT_OF_RANGE=11]="OUT_OF_RANGE",ut[ut.UNIMPLEMENTED=12]="UNIMPLEMENTED",ut[ut.INTERNAL=13]="INTERNAL",ut[ut.UNAVAILABLE=14]="UNAVAILABLE",ut[ut.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dr{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,t))return i}}has(t){return this.get(t)!==void 0}set(t,e){const r=this.mapKeyFn(t),s=this.inner[r];if(s===void 0)return this.inner[r]=[[t,e]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],t))return void(s[i]=[t,e]);s.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],t))return r.length===1?delete this.inner[e]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(t){qn(this.inner,((e,r)=>{for(const[s,i]of r)t(s,i)}))}isEmpty(){return M2(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const P3=new Et(G.comparator);function oe(){return P3}const l6=new Et(G.comparator);function wr(...n){let t=l6;for(const e of n)t=t.insert(e.key,e);return t}function h6(n){let t=l6;return n.forEach(((e,r)=>t=t.insert(e,r.overlayedDocument))),t}function yn(){return Cs()}function f6(){return Cs()}function Cs(){return new dr((n=>n.toString()),((n,t)=>n.isEqual(t)))}const b3=new Et(G.comparator),N3=new Ot(G.comparator);function it(...n){let t=N3;for(const e of n)t=t.add(e);return t}const O3=new Ot(ot);function k3(){return O3}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function D3(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const V3=new An([4294967295,4294967295],0);function Kl(n){const t=D3().encode(n),e=new C2;return e.update(t),new Uint8Array(e.digest())}function Yl(n){const t=new DataView(n.buffer),e=t.getUint32(0,!0),r=t.getUint32(4,!0),s=t.getUint32(8,!0),i=t.getUint32(12,!0);return[new An([e,r],0),new An([s,i],0)]}class U1{constructor(t,e,r){if(this.bitmap=t,this.padding=e,this.hashCount=r,e<0||e>=8)throw new gs(`Invalid padding: ${e}`);if(r<0)throw new gs(`Invalid hash count: ${r}`);if(t.length>0&&this.hashCount===0)throw new gs(`Invalid hash count: ${r}`);if(t.length===0&&e!==0)throw new gs(`Invalid padding when bitmap length is 0: ${e}`);this.ge=8*t.length-e,this.ye=An.fromNumber(this.ge)}we(t,e,r){let s=t.add(e.multiply(An.fromNumber(r)));return s.compare(V3)===1&&(s=new An([s.getBits(0),s.getBits(1)],0)),s.modulo(this.ye).toNumber()}be(t){return!!(this.bitmap[Math.floor(t/8)]&1<<t%8)}mightContain(t){if(this.ge===0)return!1;const e=Kl(t),[r,s]=Yl(e);for(let i=0;i<this.hashCount;i++){const o=this.we(r,s,i);if(!this.be(o))return!1}return!0}static create(t,e,r){const s=t%8==0?0:8-t%8,i=new Uint8Array(Math.ceil(t/8)),o=new U1(i,s,e);return r.forEach((u=>o.insert(u))),o}insert(t){if(this.ge===0)return;const e=Kl(t),[r,s]=Yl(e);for(let i=0;i<this.hashCount;i++){const o=this.we(r,s,i);this.ve(o)}}ve(t){const e=Math.floor(t/8),r=t%8;this.bitmap[e]|=1<<r}}class gs extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oi{constructor(t,e,r,s,i,o){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=r,this.documentUpdates=s,this.augmentedDocumentUpdates=i,this.resolvedLimboDocuments=o}static createSynthesizedRemoteEventForCurrentChange(t,e,r){const s=new Map;return s.set(t,ai.createSynthesizedTargetChangeForCurrentChange(t,e,r)),new oi(J.min(),s,new Et(ot),oe(),oe(),it())}}class ai{constructor(t,e,r,s,i){this.resumeToken=t,this.current=e,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(t,e,r){return new ai(r,e,it(),it(),it())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zi{constructor(t,e,r,s){this.Se=t,this.removedTargetIds=e,this.key=r,this.De=s}}class d6{constructor(t,e){this.targetId=t,this.xe=e}}class p6{constructor(t,e,r=kt.EMPTY_BYTE_STRING,s=null){this.state=t,this.targetIds=e,this.resumeToken=r,this.cause=s}}class Ql{constructor(t){this.targetId=t,this.Ce=0,this.Fe=Xl(),this.Oe=kt.EMPTY_BYTE_STRING,this.Me=!1,this.Ne=!0}get current(){return this.Me}get resumeToken(){return this.Oe}get Le(){return this.Ce!==0}get Be(){return this.Ne}Ue(t){t.approximateByteSize()>0&&(this.Ne=!0,this.Oe=t)}ke(){let t=it(),e=it(),r=it();return this.Fe.forEach(((s,i)=>{switch(i){case 0:t=t.add(s);break;case 2:e=e.add(s);break;case 1:r=r.add(s);break;default:z(38017,{changeType:i})}})),new ai(this.Oe,this.Me,t,e,r)}qe(){this.Ne=!1,this.Fe=Xl()}$e(t,e){this.Ne=!0,this.Fe=this.Fe.insert(t,e)}Ke(t){this.Ne=!0,this.Fe=this.Fe.remove(t)}We(){this.Ce+=1}Qe(){this.Ce-=1,H(this.Ce>=0,3241,{Ce:this.Ce,targetId:this.targetId})}Ge(){this.Ne=!0,this.Me=!0}}const ls="WatchChangeAggregator";class x3{constructor(t){this.ze=t,this.je=new Map,this.He=oe(),this.Je=Vi(),this.Ye=oe(),this.Ze=Vi(),this.Xe=new Et(ot)}et(t){for(const e of t.Se)t.De&&t.De.isFoundDocument()?this.tt(e,t.De):this.nt(e,t.key,t.De);for(const e of t.removedTargetIds)this.nt(e,t.key,t.De)}rt(t){this.forEachTarget(t,(e=>{const r=this.je.get(e);if(r)switch(t.state){case 0:this.it(e)&&r.Ue(t.resumeToken);break;case 1:r.Qe(),r.Le||r.qe(),r.Ue(t.resumeToken);break;case 2:r.Qe(),r.Le||this.removeTarget(e);break;case 3:this.it(e)&&(r.Ge(),r.Ue(t.resumeToken));break;case 4:this.it(e)&&(this.st(e),r.Ue(t.resumeToken));break;default:z(56790,{state:t.state})}else q(ls,`handleTargetChange received targetChange for untracked target ID (${e}) with state (${t.state})`)}))}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.je.forEach(((r,s)=>{this.it(s)&&e(s)}))}_t(t){var e;return Qn(t)?t.getPipelineSourceType()==="documents"&&((e=t.getPipelineDocuments())==null?void 0:e.length)===1:a6(t)}ot(t){const e=t.targetId,r=t.xe.count,s=this.ut(e);if(s){const i=s.target;if(this._t(i))if(r===0){const o=new G(Qn(i)?lt.fromString(i.getPipelineDocuments()[0]):i.path);this.nt(e,o,Wt.newNoDocument(o,J.min()))}else H(r===1,20013,"Single document existence filter with count: "+r);else{const o=this.ct(e);if(o!==r){const u=this.lt(t),c=u?this.Et(u,t,o):1;if(c!==0){this.st(e);const h=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Xe=this.Xe.insert(e,h)}}}}}lt(t){const e=t.xe.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=e;let o,u;try{o=On(r).toUint8Array()}catch(c){if(c instanceof U2)return ve("Decoding the base64 bloom filter in existence filter failed ("+c.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw c}try{u=new U1(o,s,i)}catch(c){return ve(c instanceof gs?"BloomFilter error: ":"Applying bloom filter failed: ",c),null}return u.ge===0?null:u}Et(t,e,r){return e.xe.count===r-this.Pt(t,e.targetId)?0:2}Pt(t,e){const r=this.ze.getRemoteKeysForTarget(e);let s=0;return r.forEach((i=>{const o=this.ze.Tt(),u=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;t.mightContain(u)||(this.nt(e,i,null),s++)})),s}Rt(t){const e=new Map;this.je.forEach(((i,o)=>{const u=this.ut(o);if(u){if(i.current&&this._t(u.target)){const c=Qn(u.target)?lt.fromString(u.target.getPipelineDocuments()[0]):u.target.path,h=new G(c);this.It(h).has(o)||this.At(o,h)||this.nt(o,h,Wt.newNoDocument(h,t))}i.Be&&(e.set(o,i.ke()),i.qe())}}));let r=it();this.Ze.forEach(((i,o)=>{let u=!0;o.forEachWhile((c=>{const h=this.ut(c);return!h||h.purpose==="TargetPurposeLimboResolution"||(u=!1,!1)})),u&&(r=r.add(i))})),this.He.forEach(((i,o)=>o.setReadTime(t))),this.Ye.forEach(((i,o)=>o.setReadTime(t)));const s=new oi(t,e,this.Xe,this.He,this.Ye,r);return this.He=oe(),this.Je=Vi(),this.Ye=oe(),this.Ze=Vi(),this.Xe=new Et(ot),s}tt(t,e){const r=this.je.get(t);if(!r||!this.it(t))return void q(ls,`addDocumentToTarget received document for unknown inactive target (${t})`);const s=this.At(t,e.key)?2:0;r.$e(e.key,s),Qn(this.ut(t).target)&&this.ut(t).target.getPipelineFlavor()!=="exact"?this.Ye=this.Ye.insert(e.key,e):this.He=this.He.insert(e.key,e),this.Je=this.Je.insert(e.key,this.It(e.key).add(t)),this.Ze=this.Ze.insert(e.key,this.Vt(e.key).add(t))}nt(t,e,r){const s=this.je.get(t);s&&this.it(t)?(this.At(t,e)?s.$e(e,1):s.Ke(e),this.Ze=this.Ze.insert(e,this.Vt(e).delete(t)),this.Ze=this.Ze.insert(e,this.Vt(e).add(t)),r&&(Qn(this.ut(t).target)&&this.ut(t).target.getPipelineFlavor()!=="exact"?this.Ye=this.Ye.insert(e,r):this.He=this.He.insert(e,r))):q(ls,`removeDocumentFromTarget received document for unknown or inactive target (${t})`)}removeTarget(t){this.je.delete(t)}ct(t){const e=this.je.get(t);if(!e)return 0;const r=e.ke();return this.ze.getRemoteKeysForTarget(t).size+r.addedDocuments.size-r.removedDocuments.size}We(t){let e=this.je.get(t);e||(q(ls,`recordPendingTargetRequest set up tracking for target ID ${t}`),e=new Ql(t),this.je.set(t,e)),e.We()}Vt(t){let e=this.Ze.get(t);return e||(e=new Ot(ot),this.Ze=this.Ze.insert(t,e)),e}It(t){let e=this.Je.get(t);return e||(e=new Ot(ot),this.Je=this.Je.insert(t,e)),e}it(t){const e=this.ut(t)!==null;return e||q(ls,"Detected inactive target",t),e}ut(t){const e=this.je.get(t);return e===void 0||e.Le?null:this.ze.dt(t)}st(t){this.je.set(t,new Ql(t)),this.ze.getRemoteKeysForTarget(t).forEach((e=>{this.nt(t,e,null)}))}At(t,e){return this.ze.getRemoteKeysForTarget(t).has(e)}}function Vi(){return new Et(G.comparator)}function Xl(){return new Et(G.comparator)}const L3={asc:"ASCENDING",desc:"DESCENDING"},M3={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},U3={and:"AND",or:"OR"};class F3{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function i1(n,t){return n.useProto3Json||ko(t)?t:{value:t}}function mo(n,t){return n.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function F1(n){const t=Nn(n);return new mt(t.seconds,t.nanos)}function m6(n,t){return n.useProto3Json?t.toBase64():t.toUint8Array()}function Wi(n,t){return mo(n,t.toTimestamp())}function Le(n){return H(!!n,49232),J.fromTimestamp(F1(n))}function B1(n,t){return o1(n,t).canonicalString()}function o1(n,t){const e=(function(s){return new lt(["projects",s.projectId,"databases",s.database])})(n).child("documents");return t===void 0?e:e.child(t)}function g6(n){const t=lt.fromString(n);return H(w6(t),10190,{key:t.toString()}),t}function go(n,t){return B1(n.databaseId,t.path)}function La(n,t){const e=g6(t);if(e.get(1)!==n.databaseId.projectId)throw new B(V.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+n.databaseId.projectId);if(e.get(3)!==n.databaseId.database)throw new B(V.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+n.databaseId.database);return new G(E6(e))}function _6(n,t){return B1(n.databaseId,t)}function B3(n){const t=g6(n);return t.length===4?lt.emptyPath():E6(t)}function a1(n){return new lt(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function E6(n){return H(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Jl(n,t,e){return{name:go(n,t),fields:e.value.mapValue.fields}}function q3(n,t){let e;if("targetChange"in t){t.targetChange;const r=(function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:z(39313,{state:h})})(t.targetChange.targetChangeType||"NO_CHANGE"),s=t.targetChange.targetIds||[],i=(function(h,p){return h.useProto3Json?(H(p===void 0||typeof p=="string",58123),kt.fromBase64String(p||"")):(H(p===void 0||p instanceof Buffer||p instanceof Uint8Array,16193),kt.fromUint8Array(p||new Uint8Array))})(n,t.targetChange.resumeToken),o=t.targetChange.cause,u=o&&(function(h){const p=h.code===void 0?V.UNKNOWN:c6(h.code);return new B(p,h.message||"")})(o);e=new p6(r,s,i,u||null)}else if("documentChange"in t){t.documentChange;const r=t.documentChange;r.document,r.document.name,r.document.updateTime;const s=La(n,r.document.name),i=Le(r.document.updateTime),o=r.document.createTime?Le(r.document.createTime):J.min(),u=new ee({mapValue:{fields:r.document.fields}}),c=Wt.newFoundDocument(s,i,o,u),h=r.targetIds||[],p=r.removedTargetIds||[];e=new zi(h,p,c.key,c)}else if("documentDelete"in t){t.documentDelete;const r=t.documentDelete;r.document;const s=La(n,r.document),i=r.readTime?Le(r.readTime):J.min(),o=Wt.newNoDocument(s,i),u=r.removedTargetIds||[];e=new zi([],u,o.key,o)}else if("documentRemove"in t){t.documentRemove;const r=t.documentRemove;r.document;const s=La(n,r.document),i=r.removedTargetIds||[];e=new zi([],i,s,null)}else{if(!("filter"in t))return z(11601,{ft:t});{t.filter;const r=t.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,o=new C3(s,i),u=r.targetId;e=new d6(u,o)}}return e}function $3(n,t){let e;if(t instanceof ii)e={update:Jl(n,t.key,t.value)};else if(t instanceof L1)e={delete:go(n,t.key)};else if(t instanceof $n)e={update:Jl(n,t.key,t.data),updateMask:J3(t.fieldMask)};else{if(!(t instanceof c3))return z(16599,{gt:t.type});e={verify:go(n,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map((r=>(function(i,o){const u=o.transform;if(u instanceof Bs)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(u instanceof qs)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:u.elements}};if(u instanceof $s)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:u.elements}};if(u instanceof xr)return{fieldPath:o.field.canonicalString(),increment:u.Re};if(u instanceof co)return{fieldPath:o.field.canonicalString(),minimum:u.Re};if(u instanceof lo)return{fieldPath:o.field.canonicalString(),maximum:u.Re};throw z(20930,{transform:o.transform})})(0,r)))),t.precondition.isNone||(e.currentDocument=(function(s,i){return i.updateTime!==void 0?{updateTime:Wi(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:z(27497)})(n,t.precondition)),e}function H3(n,t){return n&&n.length>0?(H(t!==void 0,14353),n.map((e=>(function(s,i){let o=s.updateTime?Le(s.updateTime):Le(i);return o.isEqual(J.min())&&(o=Le(i)),new o3(o,s.transformResults||[])})(e,t)))):[]}function j3(n,t){return{documents:[_6(n,t.path)]}}function G3(n,t){const e={structuredQuery:{}},r=t.path;let s;t.collectionGroup!==null?(s=r,e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(s=r.popLast(),e.structuredQuery.from=[{collectionId:r.lastSegment()}]),e.parent=_6(n,s);const i=(function(h){if(h.length!==0)return T6(Ce.create(h,"and"))})(t.filters);i&&(e.structuredQuery.where=i);const o=(function(h){if(h.length!==0)return h.map((p=>(function(y){return{field:Ir(y.field),direction:Y3(y.dir)}})(p)))})(t.orderBy);o&&(e.structuredQuery.orderBy=o);const u=i1(n,t.limit);return u!==null&&(e.structuredQuery.limit=u),t.startAt&&(e.structuredQuery.startAt=(function(h){return{before:h.inclusive,values:h.position}})(t.startAt)),t.endAt&&(e.structuredQuery.endAt=(function(h){return{before:!h.inclusive,values:h.position}})(t.endAt)),{yt:e,parent:s}}function z3(n){let t=B3(n.parent);const e=n.structuredQuery,r=e.from?e.from.length:0;let s=null;if(r>0){H(r===1,65062);const p=e.from[0];p.allDescendants?s=p.collectionId:t=t.child(p.collectionId)}let i=[];e.where&&(i=(function(m){const y=y6(m);return y instanceof Ce&&e6(y)?y.getFilters():[y]})(e.where));let o=[];e.orderBy&&(o=(function(m){return m.map((y=>(function(P){return new Hs(Ar(P.field),(function(M){switch(M){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(P.direction))})(y)))})(e.orderBy));let u=null;e.limit&&(u=(function(m){let y;return y=typeof m=="object"?m.value:m,ko(y)?null:y})(e.limit));let c=null;e.startAt&&(c=(function(m){const y=!!m.before,C=m.values||[];return new fo(C,y)})(e.startAt));let h=null;return e.endAt&&(h=(function(m){const y=!m.before,C=m.values||[];return new fo(C,y)})(e.endAt)),T3(t,s,o,i,u,"F",c,h)}function W3(n,t){const e=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return z(28987,{purpose:s})}})(t.purpose);return e==null?null:{"goog-listen-tags":e}}function K3(n,t){return{structuredPipeline:{pipeline:{stages:t.stages.map((e=>e._toProto(n)))}}}}function y6(n){return n.unaryFilter!==void 0?(function(e){switch(e.unaryFilter.op){case"IS_NAN":const r=Ar(e.unaryFilter.field);return bt.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Ar(e.unaryFilter.field);return bt.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Ar(e.unaryFilter.field);return bt.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=Ar(e.unaryFilter.field);return bt.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return z(61313);default:return z(60726)}})(n):n.fieldFilter!==void 0?(function(e){return bt.create(Ar(e.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return z(58110);default:return z(50506)}})(e.fieldFilter.op),e.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(e){return Ce.create(e.compositeFilter.filters.map((r=>y6(r))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return z(1026)}})(e.compositeFilter.op))})(n):z(30097,{filter:n})}function Y3(n){return L3[n]}function Q3(n){return M3[n]}function X3(n){return U3[n]}function Ir(n){return{fieldPath:n.canonicalString()}}function Ar(n){return xt.fromServerFormat(n.fieldPath)}function T6(n){return n instanceof bt?(function(e){if(e.op==="=="){if(he(e.value))return{unaryFilter:{field:Ir(e.field),op:"IS_NAN"}};if(me(e.value))return{unaryFilter:{field:Ir(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(he(e.value))return{unaryFilter:{field:Ir(e.field),op:"IS_NOT_NAN"}};if(me(e.value))return{unaryFilter:{field:Ir(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Ir(e.field),op:Q3(e.op),value:e.value}}})(n):n instanceof Ce?(function(e){const r=e.getFilters().map((s=>T6(s)));return r.length===1?r[0]:{compositeFilter:{op:X3(e.op),filters:r}}})(n):z(54877,{filter:n})}function J3(n){const t=[];return n.fields.forEach((e=>t.push(e.canonicalString()))),{fieldPaths:t}}function w6(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function I6(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}function js(n,t){const e={fields:{}};return t.forEach(((r,s)=>{if(typeof s!="string")throw new Error(`Cannot encode map with non-string key: ${s}`);e.fields[s]=r._toProto(n)})),{mapValue:e}}function A6(n){return{stringValue:n}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bo(n){return new F3(n,!0)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ee{constructor(t){this._byteString=t}static fromBase64String(t){try{return new Ee(kt.fromBase64String(t))}catch(e){throw new B(V.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new Ee(kt.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}toJSON(){return{type:Ee._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(t){if(ri(t,Ee._jsonSchema))return Ee.fromBase64String(t.bytes)}}Ee._jsonSchemaVersion="firestore/bytes/1.0",Ee._jsonSchema={type:Nt("string",Ee._jsonSchemaVersion),bytes:Nt("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qo{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new B(V.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new xt(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}function Z3(){return new qo(Ne)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ui{constructor(t){this._methodName=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Me{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new B(V.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new B(V.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}_compareTo(t){return ot(this._lat,t._lat)||ot(this._long,t._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Me._jsonSchemaVersion}}static fromJSON(t){if(ri(t,Me._jsonSchema))return new Me(t.latitude,t.longitude)}}function R6(n){const t={};return n.timeoutSeconds!==void 0&&(t.timeoutSeconds=n.timeoutSeconds),t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Me._jsonSchemaVersion="firestore/geoPoint/1.0",Me._jsonSchema={type:Nt("string",Me._jsonSchemaVersion),latitude:Nt("number"),longitude:Nt("number")};class t9{bt(t){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zl="ConnectivityMonitor";class th{constructor(){this.vt=()=>this.St(),this.Dt=()=>this.xt(),this.Ct=[],this.Ft()}bt(t){this.Ct.push(t)}shutdown(){window.removeEventListener("online",this.vt),window.removeEventListener("offline",this.Dt)}Ft(){window.addEventListener("online",this.vt),window.addEventListener("offline",this.Dt)}St(){q(Zl,"Network connectivity changed: AVAILABLE");for(const t of this.Ct)t(0)}xt(){q(Zl,"Network connectivity changed: UNAVAILABLE");for(const t of this.Ct)t(1)}static C(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let xi=null;function u1(){return xi===null?xi=(function(){return 268435456+Math.round(2147483648*Math.random())})():xi++,"0x"+xi.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ma="RestConnection",e9={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class n9{get Ot(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Mt=e+"://"+t.host,this.Nt=`projects/${r}/databases/${s}`,this.Lt=this.databaseId.database===ao?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Bt(t,e,r,s,i){const o=u1(),u=this.Ut(t,e.toUriEncodedString());q(Ma,`Sending RPC '${t}' ${o}:`,u,r);const c={"google-cloud-resource-prefix":this.Nt,"x-goog-request-params":this.Lt};this.kt(c,s,i);const{host:h}=new URL(u),p=hr(h);return this.qt(t,u,c,r,p).then((m=>(q(Ma,`Received RPC '${t}' ${o}: `,m),m)),(m=>{throw ve(Ma,`RPC '${t}' ${o} failed with error: `,m,"url: ",u,"request:",r),m}))}$t(t,e,r,s,i,o){return this.Bt(t,e,r,s,i)}kt(t,e,r){t["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+Ur})(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach(((s,i)=>t[i]=s)),r&&r.headers.forEach(((s,i)=>t[i]=s))}Ut(t,e){const r=e9[t];let s=`${this.Mt}/v1/${e}:${r}`;return this.databaseInfo.apiKey&&(s=`${s}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),s}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r9{constructor(t){this.Kt=t.Kt,this.Wt=t.Wt}Qt(t){this.Gt=t}zt(t){this.jt=t}Ht(t){this.Jt=t}onMessage(t){this.Yt=t}close(){this.Wt()}send(t){this.Kt(t)}Zt(){this.Gt()}Xt(){this.jt()}en(t){this.Jt(t)}tn(t){this.Yt(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ht="WebChannelConnection",hs=(n,t,e)=>{n.listen(t,(r=>{try{e(r)}catch(s){setTimeout((()=>{throw s}),0)}}))};class br extends n9{constructor(t){super(t),this.nn=[],this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}static rn(){if(!br.sn){const t=N2();hs(t,b2.STAT_EVENT,(e=>{e.stat===Ja.PROXY?q(Ht,"STAT_EVENT: detected buffering proxy"):e.stat===Ja.NOPROXY&&q(Ht,"STAT_EVENT: detected no buffering proxy")})),br.sn=!0}}qt(t,e,r,s,i){const o=u1();return new Promise(((u,c)=>{const h=new S2;h.setWithCredentials(!0),h.listenOnce(P2.COMPLETE,(()=>{try{switch(h.getLastErrorCode()){case Hi.NO_ERROR:const m=h.getResponseJson();q(Ht,`XHR for RPC '${t}' ${o} received:`,JSON.stringify(m)),u(m);break;case Hi.TIMEOUT:q(Ht,`RPC '${t}' ${o} timed out`),c(new B(V.DEADLINE_EXCEEDED,"Request time out"));break;case Hi.HTTP_ERROR:const y=h.getStatus();if(q(Ht,`RPC '${t}' ${o} failed with status:`,y,"response text:",h.getResponseText()),y>0){let C=h.getResponseJson();Array.isArray(C)&&(C=C[0]);const P=C==null?void 0:C.error;if(P&&P.status&&P.message){const L=(function(W){const et=W.toLowerCase().replace(/_/g,"-");return Object.values(V).indexOf(et)>=0?et:V.UNKNOWN})(P.status);c(new B(L,P.message))}else c(new B(V.UNKNOWN,"Server responded with status "+h.getStatus()))}else c(new B(V.UNAVAILABLE,"Connection failed."));break;default:z(9055,{_n:t,streamId:o,an:h.getLastErrorCode(),un:h.getLastError()})}}finally{q(Ht,`RPC '${t}' ${o} completed.`)}}));const p=JSON.stringify(s);q(Ht,`RPC '${t}' ${o} sending request:`,s),h.send(e,"POST",p,r,15)}))}cn(t,e,r){const s=u1(),i=[this.Mt,"/","google.firestore.v1.Firestore","/",t,"/channel"],o=this.createWebChannelTransport(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},c=this.longPollingOptions.timeoutSeconds;c!==void 0&&(u.longPollingTimeout=Math.round(1e3*c)),this.useFetchStreams&&(u.useFetchStreams=!0),this.kt(u.initMessageHeaders,e,r),u.encodeInitMessageHeaders=!0;const h=i.join("");q(Ht,`Creating RPC '${t}' stream ${s}: ${h}`,u);const p=o.createWebChannel(h,u);this.En(p);let m=!1,y=!1;const C=new r9({Kt:P=>{y?q(Ht,`Not sending because RPC '${t}' stream ${s} is closed:`,P):(m||(q(Ht,`Opening RPC '${t}' stream ${s} transport.`),p.open(),m=!0),q(Ht,`RPC '${t}' stream ${s} sending:`,P),p.send(P))},Wt:()=>p.close()});return hs(p,ms.EventType.OPEN,(()=>{y||(q(Ht,`RPC '${t}' stream ${s} transport opened.`),C.Zt())})),hs(p,ms.EventType.CLOSE,(()=>{y||(y=!0,q(Ht,`RPC '${t}' stream ${s} transport closed`),C.en(),this.hn(p))})),hs(p,ms.EventType.ERROR,(P=>{y||(y=!0,ve(Ht,`RPC '${t}' stream ${s} transport errored. Name:`,P.name,"Message:",P.message),C.en(new B(V.UNAVAILABLE,"The operation could not be completed")))})),hs(p,ms.EventType.MESSAGE,(P=>{var L;if(!y){const M=P.data[0];H(!!M,16349);const W=M,et=(W==null?void 0:W.error)||((L=W[0])==null?void 0:L.error);if(et){q(Ht,`RPC '${t}' stream ${s} received error:`,et);const st=et.status;let ht=(function(R){const E=Pt[R];if(E!==void 0)return c6(E)})(st),yt=et.message;st==="NOT_FOUND"&&yt.includes("database")&&yt.includes("does not exist")&&yt.includes(this.databaseId.database)&&ve(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),ht===void 0&&(ht=V.INTERNAL,yt="Unknown error status: "+st+" with message "+et.message),y=!0,C.en(new B(ht,yt)),p.close()}else q(Ht,`RPC '${t}' stream ${s} received:`,M),C.tn(M)}})),br.rn(),setTimeout((()=>{C.Xt()}),0),C}terminate(){this.nn.forEach((t=>t.close())),this.nn=[]}En(t){this.nn.push(t)}hn(t){this.nn=this.nn.filter((e=>e===t))}kt(t,e,r){super.kt(t,e,r),this.databaseInfo.apiKey&&(t["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return O2()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function s9(n){return new br(n)}br.sn=!1;class v6{constructor(t,e,r=1e3,s=1.5,i=6e4){this.Tn=t,this.timerId=e,this.Pn=r,this.Rn=s,this.In=i,this.An=0,this.Vn=null,this.dn=Date.now(),this.reset()}reset(){this.An=0}fn(){this.An=this.In}mn(t){this.cancel();const e=Math.floor(this.An+this.pn()),r=Math.max(0,Date.now()-this.dn),s=Math.max(0,e-r);s>0&&q("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.An} ms, delay with jitter: ${e} ms, last attempt: ${r} ms ago)`),this.Vn=this.Tn.enqueueAfterDelay(this.timerId,s,(()=>(this.dn=Date.now(),t()))),this.An*=this.Rn,this.An<this.Pn&&(this.An=this.Pn),this.An>this.In&&(this.An=this.In)}gn(){this.Vn!==null&&(this.Vn.skipDelay(),this.Vn=null)}cancel(){this.Vn!==null&&(this.Vn.cancel(),this.Vn=null)}pn(){return(Math.random()-.5)*this.An}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eh="PersistentStream";class C6{constructor(t,e,r,s,i,o,u,c){this.Tn=t,this.yn=r,this.wn=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=u,this.listener=c,this.state=0,this.bn=0,this.vn=null,this.Sn=null,this.stream=null,this.Dn=0,this.xn=new v6(t,e)}Cn(){return this.state===1||this.state===5||this.Fn()}Fn(){return this.state===2||this.state===3}start(){this.Dn=0,this.state!==4?this.auth():this.On()}async stop(){this.Cn()&&await this.close(0)}Mn(){this.state=0,this.xn.reset()}Nn(){this.Fn()&&this.vn===null&&(this.vn=this.Tn.enqueueAfterDelay(this.yn,6e4,(()=>this.Ln())))}Bn(t){this.Un(),this.stream.send(t)}async Ln(){if(this.Fn())return this.close(0)}Un(){this.vn&&(this.vn.cancel(),this.vn=null)}kn(){this.Sn&&(this.Sn.cancel(),this.Sn=null)}async close(t,e){this.Un(),this.kn(),this.xn.cancel(),this.bn++,t!==4?this.xn.reset():e&&e.code===V.RESOURCE_EXHAUSTED?(Je(e.toString()),Je("Using maximum backoff delay to prevent overloading the backend."),this.xn.fn()):e&&e.code===V.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.qn(),this.stream.close(),this.stream=null),this.state=t,await this.listener.Ht(e)}qn(){}auth(){this.state=1;const t=this.$n(this.bn),e=this.bn;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([r,s])=>{this.bn===e&&this.Kn(r,s)}),(r=>{t((()=>{const s=new B(V.UNKNOWN,"Fetching auth token failed: "+r.message);return this.Wn(s)}))}))}Kn(t,e){const r=this.$n(this.bn);this.stream=this.Qn(t,e),this.stream.Qt((()=>{r((()=>this.listener.Qt()))})),this.stream.zt((()=>{r((()=>(this.state=2,this.Sn=this.Tn.enqueueAfterDelay(this.wn,1e4,(()=>(this.Fn()&&(this.state=3),Promise.resolve()))),this.listener.zt())))})),this.stream.Ht((s=>{r((()=>this.Wn(s)))})),this.stream.onMessage((s=>{r((()=>++this.Dn==1?this.Gn(s):this.onNext(s)))}))}On(){this.state=5,this.xn.mn((async()=>{this.state=0,this.start()}))}Wn(t){return q(eh,`close with error: ${t}`),this.stream=null,this.close(4,t)}$n(t){return e=>{this.Tn.enqueueAndForget((()=>this.bn===t?e():(q(eh,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class i9 extends C6{constructor(t,e,r,s,i,o){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,r,s,o),this.serializer=i}Qn(t,e){return this.connection.cn("Listen",t,e)}Gn(t){return this.onNext(t)}onNext(t){this.xn.reset();const e=q3(this.serializer,t),r=(function(i){if(!("targetChange"in i))return J.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?J.min():o.readTime?Le(o.readTime):J.min()})(t);return this.listener.zn(e,r)}jn(t){const e={};e.database=a1(this.serializer),e.addTarget=(function(i,o){let u;const c=o.target;if(u=Qn(c)?{pipelineQuery:K3(i,c)}:a6(c)?{documents:j3(i,c)}:{query:G3(i,c).yt},u.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){u.resumeToken=m6(i,o.resumeToken);const h=i1(i,o.expectedCount);h!==null&&(u.expectedCount=h)}else if(o.snapshotVersion.compareTo(J.min())>0){u.readTime=mo(i,o.snapshotVersion.toTimestamp());const h=i1(i,o.expectedCount);h!==null&&(u.expectedCount=h)}return u})(this.serializer,t);const r=W3(this.serializer,t);r&&(e.labels=r),this.Bn(e)}Hn(t){const e={};e.database=a1(this.serializer),e.removeTarget=t,this.Bn(e)}}class o9 extends C6{constructor(t,e,r,s,i,o){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,r,s,o),this.serializer=i}get Jn(){return this.Dn>0}start(){this.lastStreamToken=void 0,super.start()}qn(){this.Jn&&this.Yn([])}Qn(t,e){return this.connection.cn("Write",t,e)}Gn(t){return H(!!t.streamToken,31322),this.lastStreamToken=t.streamToken,H(!t.writeResults||t.writeResults.length===0,55816),this.listener.Zn()}onNext(t){H(!!t.streamToken,12678),this.lastStreamToken=t.streamToken,this.xn.reset();const e=H3(t.writeResults,t.commitTime),r=Le(t.commitTime);return this.listener.Xn(r,e)}er(){const t={};t.database=a1(this.serializer),this.Bn(t)}Yn(t){const e={streamToken:this.lastStreamToken,writes:t.map((r=>$3(this.serializer,r)))};this.Bn(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class a9{}class u9 extends a9{constructor(t,e,r,s){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=r,this.serializer=s,this.tr=!1}nr(){if(this.tr)throw new B(V.FAILED_PRECONDITION,"The client has already been terminated.")}Bt(t,e,r,s){return this.nr(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,o])=>this.connection.Bt(t,o1(e,r),s,i,o))).catch((i=>{throw i.name==="FirebaseError"?(i.code===V.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new B(V.UNKNOWN,i.toString())}))}$t(t,e,r,s,i){return this.nr(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,u])=>this.connection.$t(t,o1(e,r),s,o,u,i))).catch((o=>{throw o.name==="FirebaseError"?(o.code===V.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new B(V.UNKNOWN,o.toString())}))}terminate(){this.tr=!0,this.connection.terminate()}}function c9(n,t,e,r){return new u9(n,t,e,r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const l9="ComponentProvider",nh=new Map;function h9(n,t,e,r,s){return new Z4(n,t,e,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,R6(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,r)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rh={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},S6=41943040;class re{static withCacheSize(t){return new re(t,re.DEFAULT_COLLECTION_PERCENTILE,re.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(t,e,r){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=r}}re.DEFAULT_COLLECTION_PERCENTILE=10,re.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,re.DEFAULT=new re(S6,re.DEFAULT_COLLECTION_PERCENTILE,re.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),re.DISABLED=new re(-1,0,0);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sh="LruGarbageCollector",f9=1048576;function ih([n,t],[e,r]){const s=ot(n,e);return s===0?ot(t,r):s}class d9{constructor(t){this.rr=t,this.buffer=new Ot(ih),this.ir=0}sr(){return++this.ir}_r(t){const e=[t,this.sr()];if(this.buffer.size<this.rr)this.buffer=this.buffer.add(e);else{const r=this.buffer.last();ih(e,r)<0&&(this.buffer=this.buffer.delete(r).add(e))}}get maxValue(){return this.buffer.last()[0]}}class p9{constructor(t,e,r){this.garbageCollector=t,this.asyncQueue=e,this.localStore=r,this.ar=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.ur(6e4)}stop(){this.ar&&(this.ar.cancel(),this.ar=null)}get started(){return this.ar!==null}ur(t){q(sh,`Garbage collection scheduled in ${t}ms`),this.ar=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,(async()=>{this.ar=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){Br(e)?q(sh,"Ignoring IndexedDB error during garbage collection: ",e):await Fr(e)}await this.ur(3e5)}))}}class m9{constructor(t,e){this.cr=t,this.params=e}calculateTargetCount(t,e){return this.cr.lr(t).next((r=>Math.floor(e/100*r)))}nthSequenceNumber(t,e){if(e===0)return x.resolve(Oo.ce);const r=new d9(e);return this.cr.forEachTarget(t,(s=>r._r(s.sequenceNumber))).next((()=>this.cr.Er(t,(s=>r._r(s))))).next((()=>r.maxValue))}removeTargets(t,e,r){return this.cr.removeTargets(t,e,r)}removeOrphanedDocuments(t,e){return this.cr.removeOrphanedDocuments(t,e)}collect(t,e){return this.params.cacheSizeCollectionThreshold===-1?(q("LruGarbageCollector","Garbage collection skipped; disabled"),x.resolve(rh)):this.getCacheSize(t).next((r=>r<this.params.cacheSizeCollectionThreshold?(q("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),rh):this.hr(t,e)))}getCacheSize(t){return this.cr.getCacheSize(t)}hr(t,e){let r,s,i,o,u,c,h;const p=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next((m=>(m>this.params.maximumSequenceNumbersToCollect?(q("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${m}`),s=this.params.maximumSequenceNumbersToCollect):s=m,o=Date.now(),this.nthSequenceNumber(t,s)))).next((m=>(r=m,u=Date.now(),this.removeTargets(t,r,e)))).next((m=>(i=m,c=Date.now(),this.removeOrphanedDocuments(t,r)))).next((m=>(h=Date.now(),Tr()<=at.DEBUG&&q("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-p}ms
	Determined least recently used ${s} in `+(u-o)+`ms
	Removed ${i} targets in `+(c-u)+`ms
	Removed ${m} documents in `+(h-c)+`ms
Total Duration: ${h-p}ms`),x.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:m}))))}}function g9(n,t){return new m9(n,t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const P6="firestore.googleapis.com",oh=!0;class ah{constructor(t){if(t.host===void 0){if(t.ssl!==void 0)throw new B(V.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=P6,this.ssl=oh}else this.host=t.host,this.ssl=t.ssl??oh;if(this.isUsingEmulator=t.emulatorOptions!==void 0,this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=S6;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<f9)throw new B(V.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}F4("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=R6(t.experimentalLongPollingOptions??{}),(function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new B(V.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new B(V.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new B(V.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&(function(r,s){return r.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class $o{constructor(t,e,r,s){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new ah({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new B(V.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new B(V.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new ah(t),this._emulatorOptions=t.emulatorOptions||{},t.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new b4;switch(r.type){case"firstParty":return new D4(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new B(V.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(e){const r=nh.get(e);r&&(q(l9,"Removing Datastore"),nh.delete(e),r.terminate())})(this),Promise.resolve()}}function _9(n,t,e,r={}){var h;n=ae(n,$o);const s=hr(t),i=n._getSettings(),o={...i,emulatorOptions:n._getEmulatorOptions()},u=`${t}:${e}`;s&&_1(`https://${u}`),i.host!==P6&&i.host!==u&&ve("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const c={...i,host:u,ssl:s,emulatorOptions:r};if(!sr(c,o)&&(n._setSettings(c),r.mockUserToken)){let p,m;if(typeof r.mockUserToken=="string")p=r.mockUserToken,m=zt.MOCK_USER;else{p=Bh(r.mockUserToken,(h=n._app)==null?void 0:h.options.projectId);const y=r.mockUserToken.sub||r.mockUserToken.user_id;if(!y)throw new B(V.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");m=new zt(y)}n._authCredentials=new N4(new V2(p,m))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rn{constructor(t,e,r){this.converter=e,this._query=r,this.type="query",this.firestore=t}withConverter(t){return new rn(this.firestore,t,this._query)}}class At{constructor(t,e,r){this.converter=e,this._key=r,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Rn(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new At(this.firestore,t,this._key)}toJSON(){return{type:At._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(t,e,r){if(ri(e,At._jsonSchema))return new At(t,r||null,new G(lt.fromString(e.referencePath)))}}At._jsonSchemaVersion="firestore/documentReference/1.0",At._jsonSchema={type:Nt("string",At._jsonSchemaVersion),referencePath:Nt("string")};class Rn extends rn{constructor(t,e,r){super(t,e,Uo(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new At(this.firestore,null,new G(t))}withConverter(t){return new Rn(this.firestore,t,this._path)}}function j5(n,t,...e){if(n=_t(n),x2("collection","path",t),n instanceof $o){const r=lt.fromString(t,...e);return kl(r),new Rn(n,null,r)}{if(!(n instanceof At||n instanceof Rn))throw new B(V.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(lt.fromString(t,...e));return kl(r),new Rn(n.firestore,null,r)}}function E9(n,t,...e){if(n=_t(n),arguments.length===1&&(t=k1.newId()),x2("doc","path",t),n instanceof $o){const r=lt.fromString(t,...e);return Ol(r),new At(n,null,new G(r))}{if(!(n instanceof At||n instanceof Rn))throw new B(V.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(lt.fromString(t,...e));return Ol(r),new At(n.firestore,n instanceof Rn?n.converter:null,new G(r))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ue{constructor(t){this._values=(t||[]).map((e=>e))}toArray(){return this._values.map((t=>t))}isEqual(t){return(function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0})(this._values,t._values)}toJSON(){return{type:ue._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(t){if(ri(t,ue._jsonSchema)){if(Array.isArray(t.vectorValues)&&t.vectorValues.every((e=>typeof e=="number")))return new ue(t.vectorValues);throw new B(V.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}ue._jsonSchemaVersion="firestore/vectorValue/1.0",ue._jsonSchema={type:Nt("string",ue._jsonSchemaVersion),vectorValues:Nt("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const y9=/^__.*__$/;class T9{constructor(t,e,r){this.data=t,this.fieldMask=e,this.fieldTransforms=r}toMutation(t,e){return this.fieldMask!==null?new $n(t,this.data,this.fieldMask,e,this.fieldTransforms):new ii(t,this.data,e,this.fieldTransforms)}}class b6{constructor(t,e,r){this.data=t,this.fieldMask=e,this.fieldTransforms=r}toMutation(t,e){return new $n(t,this.data,this.fieldMask,e,this.fieldTransforms)}}function N6(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw z(40011,{dataSource:n})}}class q1{constructor(t,e,r,s,i,o){this.settings=t,this.databaseId=e,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.validatePath(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}contextWith(t){return new q1({...this.settings,...t},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}childContextForField(t){var s;const e=(s=this.path)==null?void 0:s.child(t),r=this.contextWith({path:e,arrayElement:!1});return r.validatePathSegment(t),r}childContextForFieldPath(t){var s;const e=(s=this.path)==null?void 0:s.child(t),r=this.contextWith({path:e,arrayElement:!1});return r.validatePath(),r}childContextForArray(t){return this.contextWith({path:void 0,arrayElement:!0})}createError(t){return _o(t,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(t){return this.fieldMask.find((e=>t.isPrefixOf(e)))!==void 0||this.fieldTransforms.find((e=>t.isPrefixOf(e.field)))!==void 0}validatePath(){if(this.path)for(let t=0;t<this.path.length;t++)this.validatePathSegment(this.path.get(t))}validatePathSegment(t){if(t.length===0)throw this.createError("Document fields must not be empty");if(N6(this.dataSource)&&y9.test(t))throw this.createError('Document fields cannot begin and end with "__"')}}class w9{constructor(t,e,r){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=r||Bo(t)}createContext(t,e,r,s=!1){return new q1({dataSource:t,methodName:e,targetDoc:r,path:xt.emptyPath(),arrayElement:!1,hasConverter:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Ho(n){const t=n._freezeSettings(),e=Bo(n._databaseId);return new w9(n._databaseId,!!t.ignoreUndefinedProperties,e)}function O6(n,t,e,r,s,i={}){const o=n.createContext(i.merge||i.mergeFields?2:0,t,e,s);j1("Data must be an object, but it was:",o,r);const u=k6(r,o);let c,h;if(i.merge)c=new pe(o.fieldMask),h=o.fieldTransforms;else if(i.mergeFields){const p=[];for(const m of i.mergeFields){const y=Vn(t,m,e);if(!o.contains(y))throw new B(V.INVALID_ARGUMENT,`Field '${y}' is specified in your field mask but missing from your input data.`);x6(p,y)||p.push(y)}c=new pe(p),h=o.fieldTransforms.filter((m=>c.covers(m.field)))}else c=null,h=o.fieldTransforms;return new T9(new ee(u),c,h)}class jo extends ui{_toFieldTransform(t){if(t.dataSource!==2)throw t.dataSource===1?t.createError(`${this._methodName}() can only appear at the top level of your update data`):t.createError(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return t.fieldMask.push(t.path),null}isEqual(t){return t instanceof jo}}class $1 extends ui{_toFieldTransform(t){return new Q2(t.path,new Bs)}isEqual(t){return t instanceof $1}}class H1 extends ui{constructor(t,e){super(t),this.Pr=e}_toFieldTransform(t){const e=new xr(t.serializer,xo(t.serializer,this.Pr));return new Q2(t.path,e)}isEqual(t){return t instanceof H1&&(this.Pr===t.Pr||Number.isNaN(this.Pr)&&Number.isNaN(t.Pr))}}function I9(n,t,e,r){const s=n.createContext(1,t,e);j1("Data must be an object, but it was:",s,r);const i=[],o=ee.empty();qn(r,((c,h)=>{const p=V6(t,c,e);h=_t(h);const m=s.childContextForFieldPath(p);if(h instanceof jo)i.push(p);else{const y=Dn(h,m);y!=null&&(i.push(p),o.set(p,y))}}));const u=new pe(i);return new b6(o,u,s.fieldTransforms)}function A9(n,t,e,r,s,i){const o=n.createContext(1,t,e),u=[Vn(t,r,e)],c=[s];if(i.length%2!=0)throw new B(V.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let y=0;y<i.length;y+=2)u.push(Vn(t,i[y])),c.push(i[y+1]);const h=[],p=ee.empty();for(let y=u.length-1;y>=0;--y)if(!x6(h,u[y])){const C=u[y];let P=c[y];P=_t(P);const L=o.childContextForFieldPath(C);if(P instanceof jo)h.push(C);else{const M=Dn(P,L);M!=null&&(h.push(C),p.set(C,M))}}const m=new pe(h);return new b6(p,m,o.fieldTransforms)}function R9(n,t,e,r=!1){return Dn(e,n.createContext(r?4:3,t))}function Dn(n,t,e){if(D6(n=_t(n)))return j1("Unsupported field value:",t,n),k6(n,t);if(n instanceof ui)return(function(s,i){if(!N6(i.dataSource))throw i.createError(`${s._methodName}() can only be used with update() and set()`);if(!i.path)throw i.createError(`${s._methodName}() is not currently supported inside arrays`);const o=s._toFieldTransform(i);o&&i.fieldTransforms.push(o)})(n,t),null;if(n===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),n instanceof Array){if(t.settings.arrayElement&&t.dataSource!==4)throw t.createError("Nested arrays are not supported");return(function(s,i){const o=[];let u=0;for(const c of s){let h=Dn(c,i.childContextForArray(u));h==null&&(h={nullValue:"NULL_VALUE"}),o.push(h),u++}return{arrayValue:{values:o}}})(n,t)}return(function(s,i,o){if((s=_t(s))===null)return{nullValue:"NULL_VALUE"};if(typeof s=="number")return xo(i.serializer,s,o);if(typeof s=="boolean")return{booleanValue:s};if(typeof s=="string")return{stringValue:s};if(s instanceof Date){const u=mt.fromDate(s);return{timestampValue:mo(i.serializer,u)}}if(s instanceof mt){const u=new mt(s.seconds,1e3*Math.floor(s.nanoseconds/1e3));return{timestampValue:mo(i.serializer,u)}}if(s instanceof Me)return{geoPointValue:{latitude:s.latitude,longitude:s.longitude}};if(s instanceof Ee)return{bytesValue:m6(i.serializer,s._byteString)};if(s instanceof At){const u=i.databaseId,c=s.firestore._databaseId;if(!c.isEqual(u))throw i.createError(`Document reference is for database ${c.projectId}/${c.database} but should be for database ${u.projectId}/${u.database}`);return{referenceValue:B1(s.firestore._databaseId||i.databaseId,s._key.path)}}if(s instanceof ue)return(function(c,h){const p=c instanceof ue?c.toArray():c;return{mapValue:{fields:{[H2]:{stringValue:j2},[Us]:{arrayValue:{values:p.map((y=>{if(typeof y!="number")throw h.createError("VectorValues must only contain numeric values.");return Vo(h.serializer,y)}))}}}}}})(s,i);if(I6(s))return s._toProto(i.serializer);throw i.createError(`Unsupported field value: ${No(s)}`)})(n,t,e)}function k6(n,t){const e={};return M2(n)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):qn(n,((r,s)=>{const i=Dn(s,t.childContextForField(r));i!=null&&(e[r]=i)})),{mapValue:{fields:e}}}function D6(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof mt||n instanceof Me||n instanceof Ee||n instanceof At||n instanceof ui||n instanceof ue||I6(n))}function j1(n,t,e){if(!D6(e)||!ni(e)){const r=No(e);throw r==="an object"?t.createError(n+" a custom object"):t.createError(n+" "+r)}}function Vn(n,t,e){if((t=_t(t))instanceof qo)return t._internalPath;if(typeof t=="string")return V6(n,t);throw _o("Field path arguments must be of type string or ",n,!1,void 0,e)}const v9=new RegExp("[~\\*/\\[\\]]");function V6(n,t,e){if(t.search(v9)>=0)throw _o(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,e);try{return new qo(...t.split("."))._internalPath}catch{throw _o(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,e)}}function _o(n,t,e,r,s){const i=r&&!r.isEmpty(),o=s!==void 0;let u=`Function ${t}() called with invalid data`;e&&(u+=" (via `toFirestore()`)"),u+=". ";let c="";return(i||o)&&(c+=" (found",i&&(c+=` in field ${r}`),o&&(c+=` in document ${s}`),c+=")"),new B(V.INVALID_ARGUMENT,u+n+c)}function x6(n,t){return n.some((e=>e.isEqual(t)))}function L6(n){return typeof n._readUserData=="function"}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yt{constructor(t){this.optionDefinitions=t}_getKnownOptions(t,e){const r=ee.empty();for(const s in this.optionDefinitions)if(this.optionDefinitions.hasOwnProperty(s)){const i=this.optionDefinitions[s];if(s in t){const o=t[s];let u;i.nestedOptions&&ni(o)?u={mapValue:{fields:new Yt(i.nestedOptions).getOptionsProto(e,o)}}:o&&(u=Dn(o,e)??void 0),u&&r.set(xt.fromServerFormat(i.serverName),u)}}return r}getOptionsProto(t,e,r){const s=this._getKnownOptions(e,t);if(r){const i=new Map(X4(r,((o,u)=>[xt.fromServerFormat(u),o!==void 0?Dn(o,t):null])));s.setAll(i)}return s.value.mapValue.fields??{}}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function C9(n){return typeof n=="object"&&n!==null&&!!("nullValue"in n&&(n.nullValue===null||n.nullValue==="NULL_VALUE")||"booleanValue"in n&&(n.booleanValue===null||typeof n.booleanValue=="boolean")||"integerValue"in n&&(n.integerValue===null||typeof n.integerValue=="number"||typeof n.integerValue=="string")||"doubleValue"in n&&(n.doubleValue===null||typeof n.doubleValue=="number")||"timestampValue"in n&&(n.timestampValue===null||(function(e){return typeof e=="object"&&e!==null&&"seconds"in e&&(e.seconds===null||typeof e.seconds=="number"||typeof e.seconds=="string")&&"nanos"in e&&(e.nanos===null||typeof e.nanos=="number")})(n.timestampValue))||"stringValue"in n&&(n.stringValue===null||typeof n.stringValue=="string")||"bytesValue"in n&&(n.bytesValue===null||n.bytesValue instanceof Uint8Array)||"referenceValue"in n&&(n.referenceValue===null||typeof n.referenceValue=="string")||"geoPointValue"in n&&(n.geoPointValue===null||(function(e){return typeof e=="object"&&e!==null&&"latitude"in e&&(e.latitude===null||typeof e.latitude=="number")&&"longitude"in e&&(e.longitude===null||typeof e.longitude=="number")})(n.geoPointValue))||"arrayValue"in n&&(n.arrayValue===null||(function(e){return typeof e=="object"&&e!==null&&!(!("values"in e)||e.values!==null&&!Array.isArray(e.values))})(n.arrayValue))||"mapValue"in n&&(n.mapValue===null||(function(e){return typeof e=="object"&&e!==null&&!(!("fields"in e)||e.fields!==null&&!ni(e.fields))})(n.mapValue))||"fieldReferenceValue"in n&&(n.fieldReferenceValue===null||typeof n.fieldReferenceValue=="string")||"functionValue"in n&&(n.functionValue===null||(function(e){return typeof e=="object"&&e!==null&&!(!("name"in e)||e.name!==null&&typeof e.name!="string"||!("args"in e)||e.args!==null&&!Array.isArray(e.args))})(n.functionValue))||"pipelineValue"in n&&(n.pipelineValue===null||(function(e){return typeof e=="object"&&e!==null&&!(!("stages"in e)||e.stages!==null&&!Array.isArray(e.stages))})(n.pipelineValue)))}function G5(){return new $1("serverTimestamp")}function z5(n){return new H1("increment",n)}function S9(n){return new ue(n)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function U(n){let t;return n instanceof pr?n:(t=ni(n)?k9(n):n instanceof Array?D9(n):M6(n,void 0),t)}function Ua(n){if(n instanceof pr)return n;if(n instanceof ue)return Gs(n);if(Array.isArray(n))return Gs(S9(n));throw new Error("Unsupported value: "+typeof n)}function G1(n){return K4(n)?Ki(n):U(n)}class pr{constructor(){this._protoValueType="ProtoValue"}add(t){return new k("add",[this,U(t)],"add")}asBoolean(){if(this instanceof xn)return this;if(this instanceof Hr)return new F6(this);if(this instanceof $r)return new O9(this);if(this instanceof k)return new U6(this);throw new B("invalid-argument",`Conversion of type ${typeof this} to BooleanExpression not supported.`)}subtract(t){return new k("subtract",[this,U(t)],"subtract")}multiply(t){return new k("multiply",[this,U(t)],"multiply")}divide(t){return new k("divide",[this,U(t)],"divide")}mod(t){return new k("mod",[this,U(t)],"mod")}equal(t){return new k("equal",[this,U(t)],"equal").asBoolean()}notEqual(t){return new k("not_equal",[this,U(t)],"notEqual").asBoolean()}lessThan(t){return new k("less_than",[this,U(t)],"lessThan").asBoolean()}lessThanOrEqual(t){return new k("less_than_or_equal",[this,U(t)],"lessThanOrEqual").asBoolean()}greaterThan(t){return new k("greater_than",[this,U(t)],"greaterThan").asBoolean()}greaterThanOrEqual(t){return new k("greater_than_or_equal",[this,U(t)],"greaterThanOrEqual").asBoolean()}arrayConcat(t,...e){const r=[t,...e].map((s=>U(s)));return new k("array_concat",[this,...r],"arrayConcat")}arrayContains(t){return new k("array_contains",[this,U(t)],"arrayContains").asBoolean()}arrayContainsAll(t){const e=Array.isArray(t)?new _s(t.map(U),"arrayContainsAll"):t;return new k("array_contains_all",[this,e],"arrayContainsAll").asBoolean()}arrayContainsAny(t){const e=Array.isArray(t)?new _s(t.map(U),"arrayContainsAny"):t;return new k("array_contains_any",[this,e],"arrayContainsAny").asBoolean()}arrayReverse(){return new k("array_reverse",[this])}arrayLength(){return new k("array_length",[this],"arrayLength")}equalAny(t){const e=Array.isArray(t)?new _s(t.map(U),"equalAny"):t;return new k("equal_any",[this,e],"equalAny").asBoolean()}notEqualAny(t){const e=Array.isArray(t)?new _s(t.map(U),"notEqualAny"):t;return new k("not_equal_any",[this,e],"notEqualAny").asBoolean()}exists(){return new k("exists",[this],"exists").asBoolean()}charLength(){return new k("char_length",[this],"charLength")}like(t){return new k("like",[this,U(t)],"like").asBoolean()}regexContains(t){return new k("regex_contains",[this,U(t)],"regexContains").asBoolean()}regexFind(t){return new k("regex_find",[this,U(t)],"regexFind")}regexFindAll(t){return new k("regex_find_all",[this,U(t)],"regexFindAll")}regexMatch(t){return new k("regex_match",[this,U(t)],"regexMatch").asBoolean()}stringContains(t){return new k("string_contains",[this,U(t)],"stringContains").asBoolean()}startsWith(t){return new k("starts_with",[this,U(t)],"startsWith").asBoolean()}endsWith(t){return new k("ends_with",[this,U(t)],"endsWith").asBoolean()}toLower(){return new k("to_lower",[this],"toLower")}toUpper(){return new k("to_upper",[this],"toUpper")}trim(t){const e=[this];return t&&e.push(U(t)),new k("trim",e,"trim")}ltrim(t){const e=[this];return t&&e.push(U(t)),new k("ltrim",e,"ltrim")}rtrim(t){const e=[this];return t&&e.push(U(t)),new k("rtrim",e,"rtrim")}type(){return new k("type",[this])}isType(t){return new k("is_type",[this,Gs(t)],"isType").asBoolean()}stringConcat(t,...e){const r=[t,...e].map(U);return new k("string_concat",[this,...r],"stringConcat")}stringIndexOf(t){return new k("string_index_of",[this,U(t)],"stringIndexOf")}stringRepeat(t){return new k("string_repeat",[this,U(t)],"stringRepeat")}stringReplaceAll(t,e){return new k("string_replace_all",[this,U(t),U(e)],"stringReplaceAll")}stringReplaceOne(t,e){return new k("string_replace_one",[this,U(t),U(e)],"stringReplaceOne")}concat(t,...e){const r=[t,...e].map(U);return new k("concat",[this,...r],"concat")}reverse(){return new k("reverse",[this],"reverse")}arrayFilter(t,e){return new k("array_filter",[this,U(t),e],"arrayFilter")}arrayTransform(t,e){return new k("array_transform",[this,U(t),e],"arrayTransform")}arrayTransformWithIndex(t,e,r){return new k("array_transform",[this,U(t),U(e),r],"arrayTransformWithIndex")}arraySlice(t,e){const r=[this,U(t)];return e!==void 0&&r.push(U(e)),new k("array_slice",r,"arraySlice")}arrayFirst(){return new k("array_first",[this],"arrayFirst")}arrayFirstN(t){return new k("array_first_n",[this,U(t)],"arrayFirstN")}arrayLast(){return new k("array_last",[this],"arrayLast")}arrayLastN(t){return new k("array_last_n",[this,U(t)],"arrayLastN")}arrayMaximum(){return new k("maximum",[this],"arrayMaximum")}arrayMaximumN(t){return new k("maximum_n",[this,U(t)],"arrayMaximumN")}arrayMinimum(){return new k("minimum",[this],"arrayMinimum")}arrayMinimumN(t){return new k("minimum_n",[this,U(t)],"arrayMinimumN")}arrayIndexOf(t){return new k("array_index_of",[this,U(t),U("first")],"arrayIndexOf")}arrayLastIndexOf(t){return new k("array_index_of",[this,U(t),U("last")],"arrayLastIndexOf")}arrayIndexOfAll(t){return new k("array_index_of_all",[this,U(t)],"arrayIndexOfAll")}byteLength(){return new k("byte_length",[this],"byteLength")}ceil(){return new k("ceil",[this])}floor(){return new k("floor",[this])}abs(){return new k("abs",[this])}exp(){return new k("exp",[this])}mapGet(t){return new k("map_get",[this,Gs(t)],"mapGet")}mapSet(t,e,...r){const s=[this,U(t),U(e),...r.map(U)];return new k("map_set",s,"mapSet")}mapKeys(){return new k("map_keys",[this],"mapKeys")}mapValues(){return new k("map_values",[this],"mapValues")}mapEntries(){return new k("map_entries",[this],"mapEntries")}getField(t){return new k("get_field",[this,U(t)],"get_field")}count(){return de._create("count",[this],"count")}sum(){return de._create("sum",[this],"sum")}average(){return de._create("average",[this],"average")}minimum(){return de._create("minimum",[this],"minimum")}maximum(){return de._create("maximum",[this],"maximum")}first(){return de._create("first",[this],"first")}last(){return de._create("last",[this],"last")}arrayAgg(){return de._create("array_agg",[this],"arrayAgg")}arrayAggDistinct(){return de._create("array_agg_distinct",[this],"arrayAggDistinct")}countDistinct(){return de._create("count_distinct",[this],"countDistinct")}logicalMaximum(t,...e){const r=[t,...e];return new k("maximum",[this,...r.map(U)],"logicalMaximum")}logicalMinimum(t,...e){const r=[t,...e];return new k("minimum",[this,...r.map(U)],"minimum")}vectorLength(){return new k("vector_length",[this],"vectorLength")}cosineDistance(t){return new k("cosine_distance",[this,Ua(t)],"cosineDistance")}dotProduct(t){return new k("dot_product",[this,Ua(t)],"dotProduct")}euclideanDistance(t){return new k("euclidean_distance",[this,Ua(t)],"euclideanDistance")}unixMicrosToTimestamp(){return new k("unix_micros_to_timestamp",[this],"unixMicrosToTimestamp")}timestampToUnixMicros(){return new k("timestamp_to_unix_micros",[this],"timestampToUnixMicros")}unixMillisToTimestamp(){return new k("unix_millis_to_timestamp",[this],"unixMillisToTimestamp")}timestampToUnixMillis(){return new k("timestamp_to_unix_millis",[this],"timestampToUnixMillis")}unixSecondsToTimestamp(){return new k("unix_seconds_to_timestamp",[this],"unixSecondsToTimestamp")}timestampToUnixSeconds(){return new k("timestamp_to_unix_seconds",[this],"timestampToUnixSeconds")}timestampAdd(t,e){return new k("timestamp_add",[this,U(t),U(e)],"timestampAdd")}timestampSubtract(t,e){return new k("timestamp_subtract",[this,U(t),U(e)],"timestampSubtract")}timestampDiff(t,e){return new k("timestamp_diff",[this,G1(t),U(e)],"timestampDiff")}timestampExtract(t,e){const r=[this,U(t)];return e&&r.push(U(e)),new k("timestamp_extract",r,"timestampExtract")}documentId(){return new k("document_id",[this],"documentId")}parent(){return new k("parent",[this],"parent")}substring(t,e){const r=U(t);return new k("substring",e===void 0?[this,r]:[this,r,U(e)],"substring")}arrayGet(t){return new k("array_get",[this,U(t)],"arrayGet")}isError(){return new k("is_error",[this],"isError").asBoolean()}ifError(t){const e=new k("if_error",[this,U(t)],"ifError");return t instanceof xn?e.asBoolean():e}isAbsent(){return new k("is_absent",[this],"isAbsent").asBoolean()}mapRemove(t){return new k("map_remove",[this,U(t)],"mapRemove")}mapMerge(t,...e){const r=U(t),s=e.map(U);return new k("map_merge",[this,r,...s],"mapMerge")}pow(t){return new k("pow",[this,U(t)])}trunc(t){return t===void 0?new k("trunc",[this]):new k("trunc",[this,U(t)],"trunc")}round(t){return t===void 0?new k("round",[this]):new k("round",[this,U(t)],"round")}collectionId(){return new k("collection_id",[this])}length(){return new k("length",[this])}ln(){return new k("ln",[this])}sqrt(){return new k("sqrt",[this])}stringReverse(){return new k("string_reverse",[this])}ifAbsent(t){return new k("if_absent",[this,U(t)],"ifAbsent")}ifNull(t){return new k("if_null",[this,U(t)],"ifNull")}coalesce(t,...e){return new k("coalesce",[this,U(t),...e.map(U)],"coalesce")}join(t){return new k("join",[this,U(t)],"join")}log10(){return new k("log10",[this])}arraySum(){return new k("sum",[this])}split(t){return new k("split",[this,U(t)])}timestampTruncate(t,e){const r=[this,U(t)];return e&&r.push(U(e)),new k("timestamp_trunc",r)}ascending(){return V9(this)}descending(){return x9(this)}as(t){return new b9(this,t,"as")}}class de{constructor(t,e){this.name=t,this.params=e,this.exprType="AggregateFunction",this._protoValueType="ProtoValue"}static _create(t,e,r){const s=new de(t,e);return s._methodName=r,s}as(t){return new P9(this,t,"as")}_toProto(t){return{functionValue:{name:this.name,args:this.params.map((e=>e._toProto(t)))}}}_readUserData(t){t=this._methodName?t.contextWith({methodName:this._methodName}):t,this.params.forEach((e=>e._readUserData(t)))}}class P9{constructor(t,e,r){this.aggregate=t,this.alias=e,this._methodName=r}_readUserData(t){this.aggregate._readUserData(t)}}class b9{constructor(t,e,r){this.expr=t,this.alias=e,this._methodName=r,this.exprType="AliasedExpression",this.selectable=!0}_readUserData(t){this.expr._readUserData(t)}}class _s extends pr{constructor(t,e){super(),this.Rr=t,this._methodName=e,this.expressionType="ListOfExpressions"}_toProto(t){return{arrayValue:{values:this.Rr.map((e=>e._toProto(t)))}}}_readUserData(t){this.Rr.forEach((e=>e._readUserData(t)))}}class $r extends pr{constructor(t,e){super(),this.fieldPath=t,this._methodName=e,this.expressionType="Field",this.selectable=!0}get _fieldPath(){return this.fieldPath}get fieldName(){return this.fieldPath.canonicalString()}get alias(){return this.fieldName}get expr(){return this}geoDistance(t){return new k("geo_distance",[this,U(t)],"geoDistance")}_toProto(t){return{fieldReferenceValue:this.fieldPath.canonicalString()}}_readUserData(t){}}function Ki(n){return N9(n,"field")}function N9(n,t){return new $r(typeof n=="string"?Ne===n?Z3()._internalPath:Vn("field",n):n._internalPath,t)}class Hr extends pr{constructor(t,e){super(),this.value=t,this._methodName=e,this.expressionType="Constant"}static _fromProto(t){const e=new Hr(t,void 0);return e._protoValue=t,e}_toProto(t){return H(this._protoValue!==void 0,237),this._protoValue}_getValue(){return this._protoValue}_readUserData(t){t=this._methodName?t.contextWith({methodName:this._methodName}):t,C9(this._protoValue)||(this._protoValue=Dn(this.value,t))}}function Gs(n,t){return M6(n,"constant")}function M6(n,t){const e=new Hr(n,t);return typeof n=="boolean"?new F6(e):e}class k extends pr{constructor(t,e,r,s){super(),this.name=t,this.params=e,this.expressionType="Function",this._optionsProto=void 0,r!==void 0&&(this._methodName=r),s!==void 0&&(this._options=s)}get _optionsUtil(){return new Yt({})}_toProto(t){const e={functionValue:{name:this.name,args:this.params.map((r=>r._toProto(t)))}};return this._optionsProto&&(e.functionValue.options=this._optionsProto),e}_readUserData(t){t=this._methodName?t.contextWith({methodName:this._methodName}):t,this.params.forEach((e=>e._readUserData(t))),this._options&&(this._optionsProto=this._optionsUtil.getOptionsProto(t,this._options))}}class xn extends pr{get _methodName(){return this._expr._methodName}countIf(){return de._create("count_if",[this],"countIf")}not(){return new k("not",[this],"not").asBoolean()}conditional(t,e){return new k("conditional",[this,t,e],"conditional")}ifError(t){const e=U(t),r=new k("if_error",[this,e],"ifError");return e instanceof xn?r.asBoolean():r}_toProto(t){return this._expr._toProto(t)}_readUserData(t){this._expr._readUserData(t)}}class U6 extends xn{constructor(t){super(),this._expr=t,this.expressionType="Function"}}class F6 extends xn{constructor(t){super(),this._expr=t,this.expressionType="Constant"}_getValue(){return this._expr._getValue()}}class O9 extends xn{constructor(t){super(),this._expr=t,this.expressionType="Field"}}function k9(n,t){const e=[];for(const r in n)if(Object.prototype.hasOwnProperty.call(n,r)){const s=n[r];e.push(Gs(r)),e.push(U(s))}return new k("map",e,"map")}function D9(n){return(function(e,r){return new k("array",e.map((s=>U(s))),r)})(n,"array")}function V9(n){return new B6(G1(n),"ascending","ascending")}function x9(n){return new B6(G1(n),"descending","descending")}class B6{constructor(t,e,r){this.expr=t,this.direction=e,this._methodName=r,this._protoValueType="ProtoValue"}_toProto(t){return{mapValue:{fields:{direction:A6(this.direction),expression:this.expr._toProto(t)}}}}_readUserData(t){this.expr._readUserData(t)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _e{constructor(t){this.optionsProto=void 0,{rawOptions:this.rawOptions,...this.knownOptions}=t}_readUserData(t){this.optionsProto=this._optionsUtil.getOptionsProto(t,this.knownOptions,this.rawOptions)}_toProto(t){return{name:this._name,options:this.optionsProto}}}class q6 extends _e{get _name(){return"add_fields"}get _optionsUtil(){return new Yt({})}constructor(t,e){super(e),this.fields=t}_toProto(t){return{...super._toProto(t),args:[js(t,this.fields)]}}_readUserData(t){super._readUserData(t),Ln(this.fields,t)}}class $6 extends _e{get _name(){return"aggregate"}get _optionsUtil(){return new Yt({})}constructor(t,e,r){super(r),this.groups=t,this.accumulators=e}_toProto(t){return{...super._toProto(t),args:[js(t,this.accumulators),js(t,this.groups)]}}_readUserData(t){super._readUserData(t),Ln(this.groups,t),Ln(this.accumulators,t)}}class H6 extends _e{get _name(){return"distinct"}get _optionsUtil(){return new Yt({})}constructor(t,e){super(e),this.groups=t}_toProto(t){return{...super._toProto(t),args:[js(t,this.groups)]}}_readUserData(t){super._readUserData(t),Ln(this.groups,t)}}class Go extends _e{get _name(){return"collection"}get _optionsUtil(){return new Yt({forceIndex:{serverName:"force_index"}})}constructor(t,e){super(e),this.Vr=t.startsWith("/")?t:"/"+t}_toProto(t){return{...super._toProto(t),args:[{referenceValue:this.Vr}]}}_readUserData(t){super._readUserData(t)}}class zo extends _e{get _name(){return"collection_group"}get _optionsUtil(){return new Yt({forceIndex:{serverName:"force_index"}})}constructor(t,e){super(e),this.collectionId=t}_toProto(t){return{...super._toProto(t),args:[{referenceValue:""},{stringValue:this.collectionId}]}}_readUserData(t){super._readUserData(t)}}class z1 extends _e{get _name(){return"database"}get _optionsUtil(){return new Yt({})}_toProto(t){return{...super._toProto(t)}}_readUserData(t){super._readUserData(t)}}class W1 extends _e{get _name(){return"documents"}get _optionsUtil(){return new Yt({})}constructor(t,e){if(super(e),!t||t.length===0)throw new B(V.INVALID_ARGUMENT,"Empty document paths are not allowed in DocumentsSource");const r=t.map((i=>i.startsWith("/")?i:"/"+i)),s=new Set(r);if(s.size!==r.length)throw new B(V.INVALID_ARGUMENT,"Duplicate document paths are not allowed in DocumentsSource");this.dr=r,this.mr=s}_toProto(t){return{...super._toProto(t),args:this.dr.map((e=>({referenceValue:e})))}}_readUserData(t){super._readUserData(t)}}class Wo extends _e{get _name(){return"where"}get _optionsUtil(){return new Yt({})}constructor(t,e){super(e),this.condition=t}_toProto(t){return{...super._toProto(t),args:[this.condition._toProto(t)]}}_readUserData(t){super._readUserData(t),Ln(this.condition,t)}}class cr extends _e{get _name(){return"limit"}get _optionsUtil(){return new Yt({})}constructor(t,e){H(!isNaN(t)&&t!==1/0&&t!==-1/0,34860),super(e),this.limit=t}_toProto(t){return{...super._toProto(t),args:[xo(t,this.limit)]}}}class uh extends _e{get _name(){return"offset"}get _optionsUtil(){return new Yt({})}constructor(t,e){super(e),this.offset=t}_toProto(t){return{...super._toProto(t),args:[xo(t,this.offset)]}}}class L9 extends _e{get _name(){return"select"}get _optionsUtil(){return new Yt({})}constructor(t,e){super(e),this.selections=t}_toProto(t){return{...super._toProto(t),args:[js(t,this.selections)]}}_readUserData(t){super._readUserData(t),Ln(this.selections,t)}}class je extends _e{get _name(){return"sort"}get _optionsUtil(){return new Yt({})}constructor(t,e){super(e),this.orderings=t}_toProto(t){return{...super._toProto(t),args:this.orderings.map((e=>e._toProto(t)))}}_readUserData(t){super._readUserData(t),Ln(this.orderings,t)}}class K1 extends _e{get _name(){return"replace_with"}get _optionsUtil(){return new Yt({})}constructor(t,e){super(e),this.map=t}_toProto(t){return{...super._toProto(t),args:[this.map._toProto(t),A6(K1.pr)]}}_readUserData(t){super._readUserData(t),Ln(this.map,t)}}K1.pr="full_replace";function Ln(n,t){return L6(n)?n._readUserData(t):Array.isArray(n)?n.forEach((e=>e._readUserData(t))):n instanceof Map?n.forEach((e=>e._readUserData(t))):Object.values(n).forEach((e=>e._readUserData(t))),n}// Copyright 2024 Google LLC* @license
class te{constructor(t,e,r){this.serializer=t,this.stages=e,this.listenOptions=r,this.isCorePipeline=!0}getPipelineCollection(){return Ko(this)}getPipelineCollectionGroup(){return Y1(this)}getPipelineCollectionId(){return M9(this)}getPipelineDocuments(){return c1(this)}getPipelineFlavor(){return(function(e){let r="exact";return e.stages.forEach(((s,i)=>{s._name!==H6.name&&s._name!==$6.name||(r="keyless"),s._name===L9.name&&r==="exact"&&(r="augmented"),s._name===q6.name&&i<e.stages.length-1&&r==="exact"&&(r="augmented")})),r})(this)}getPipelineSourceType(){return vn(this)}}function vn(n){const t=n.stages[0];return t instanceof Go||t instanceof zo||t instanceof z1||t instanceof W1?t._name:"unknown"}function Ko(n){if(vn(n)==="collection")return n.stages[0].Vr}function Y1(n){if(vn(n)==="collection_group")return n.stages[0].collectionId}function M9(n){switch(vn(n)){case"collection":return lt.fromString(Ko(n)).lastSegment();case"collection_group":return Y1(n);default:return}}function c1(n){if(vn(n)==="documents")return n.stages[0].dr}class Ss{constructor(t,e,r,s){this._db=t,this.userDataReader=e,this._userDataWriter=r,this.stages=s}wr(t,e){const r=this.userDataReader.createContext(3,t);return L6(e)?e._readUserData(r):Array.isArray(e)?e.forEach((s=>s._readUserData(r))):e.forEach((s=>s._readUserData(r))),e}where(t){const e=this.stages.map((r=>r));return this.wr("where",t),e.push(new Wo(t,{})),new Ss(this._db,this.userDataReader,this._userDataWriter,e)}limit(t){const e=this.stages.map((r=>r));return e.push(new cr(t,{})),new Ss(this._db,this.userDataReader,this._userDataWriter,e)}sort(t,...e){const r=this.stages.map((s=>s));return"orderings"in t?r.push(new je(this.wr("sort",t.orderings),{})):r.push(new je(this.wr("sort",[t,...e]),{})),new Ss(this._db,this.userDataReader,this._userDataWriter,r)}br(t){return{pipeline:{stages:this.stages.map((e=>e._toProto(t)))}}}}// Copyright 2024 Google LLC* @license
class I{constructor(t,e){this.type=t,this.value=e}static vr(){return new I("ERROR",void 0)}static Sr(){return new I("UNSET",void 0)}static Dr(){return new I("NULL",kr)}static newValue(t){return me(t)?new I("NULL",kr):(function(r){return!!r&&"booleanValue"in r})(t)?new I("BOOLEAN",t):Oe(t)?new I("INT",t):Jn(t)?new I("DOUBLE",t):(function(r){return!!r&&"timestampValue"in r&&!!r.timestampValue})(t)?new I("TIMESTAMP",t):(function(r){return!!r&&"stringValue"in r})(t)?new I("STRING",t):(function(r){return!!r&&"bytesValue"in r})(t)?new I("BYTES",t):t.referenceValue?new I("REFERENCE",t):t.geoPointValue?new I("GEO_POINT",t):Vr(t)?new I("ARRAY",t):uo(t)?new I("VECTOR",t):Zn(t)?new I("MAP",t):new I("ERROR",void 0)}Cr(){return this.type==="ERROR"||this.type==="UNSET"}Fr(){return this.type==="NULL"}}function Ps(n){if(!n.Cr())return n.value}function j6(n){return n instanceof xn?n._expr:n}function K(n){if((n=j6(n))instanceof $r)return new U9(n);if(n instanceof Hr)return new F9(n);if(n instanceof _s)return new B9(n);if(n instanceof k){if(n.name==="add")return new H9(n);if(n.name==="subtract")return new j9(n);if(n.name==="multiply")return new G9(n);if(n.name==="divide")return new z9(n);if(n.name==="mod")return new W9(n);if(n.name==="and")return new K9(n);if(n.name==="equal")return new om(n);if(n.name==="not_equal")return new am(n);if(n.name==="less_than")return new um(n);if(n.name==="less_than_or_equal")return new cm(n);if(n.name==="greater_than")return new lm(n);if(n.name==="greater_than_or_equal")return new hm(n);if(n.name==="array_concat")return new fm(n);if(n.name==="array_reverse")return new dm(n);if(n.name==="array_contains")return new pm(n);if(n.name==="array_contains_all")return new mm(n);if(n.name==="array_contains_any")return new gm(n);if(n.name==="array_length")return new _m(n);if(n.name==="array_element")return new Em(n);if(n.name==="equal_any")return new G6(n);if(n.name==="not_equal_any")return new Q9(n);if(n.name==="is_nan")return new X9(n);if(n.name==="is_not_nan")return new J9(n);if(n.name==="is_null")return new Z9(n);if(n.name==="is_not_null")return new tm(n);if(n.name==="is_error")return new em(n);if(n.name==="exists")return new nm(n);if(n.name==="not")return new Yo(n);if(n.name==="or")return new Y9(n);if(n.name==="xor")return new Q1(n);if(n.name==="conditional")return new rm(n);if(n.name==="maximum")return new sm(n);if(n.name==="minimum")return new im(n);if(n.name==="reverse")return new ym(n);if(n.name==="replace_first")return new Tm(n);if(n.name==="replace_all")return new wm(n);if(n.name==="char_length")return new Im(n);if(n.name==="byte_length")return new Am(n);if(n.name==="like")return new Rm(n);if(n.name==="regex_contains")return new vm(n);if(n.name==="regex_match")return new Cm(n);if(n.name==="string_contains")return new Sm(n);if(n.name==="starts_with")return new Pm(n);if(n.name==="ends_with")return new bm(n);if(n.name==="to_lower")return new Nm(n);if(n.name==="to_upper")return new Om(n);if(n.name==="trim")return new km(n);if(n.name==="string_concat")return new Dm(n);if(n.name==="map_get")return new Vm(n);if(n.name==="cosine_distance")return new xm(n);if(n.name==="dot_product")return new Lm(n);if(n.name==="euclidean_distance")return new Mm(n);if(n.name==="vector_length")return new Um(n);if(n.name==="unix_micros_to_timestamp")return new Hm(n);if(n.name==="timestamp_to_unix_micros")return new zm(n);if(n.name==="unix_millis_to_timestamp")return new jm(n);if(n.name==="timestamp_to_unix_millis")return new Wm(n);if(n.name==="unix_seconds_to_timestamp")return new Gm(n);if(n.name==="timestamp_to_unix_seconds")return new Km(n);if(n.name==="timestamp_add")return new Ym(n);if(n.name==="timestamp_subtract")return new Qm(n)}throw new Error(`Unknown Expr : ${n}`)}class U9{constructor(t){this.expr=t}evaluate(t,e){if(this.expr.fieldName===Ne)return I.newValue({referenceValue:go(t.serializer,e.key)});if(this.expr.fieldName==="__update_time__")return I.newValue({timestampValue:Wi(t.serializer,e.version)});if(this.expr.fieldName==="__create_time__")return I.newValue({timestampValue:Wi(t.serializer,e.createTime)});const r=e.data.field(this.expr._fieldPath);return r?Do(r)?I.newValue((function(i,o){if(i.serverTimestampBehavior==="estimate")return{timestampValue:Wi(i.serializer,J.fromTimestamp(Or(o)))};if(i.serverTimestampBehavior==="previous"){const u=si(o);if(u)return u}return{nullValue:"NULL_VALUE"}})(t,r)):I.newValue(r):I.Sr()}}class F9{constructor(t){this.expr=t}evaluate(t,e){return I.newValue(this.expr._getValue())}}class B9{constructor(t){this.expr=t}evaluate(t,e){const r=this.expr.Rr.map((s=>K(s).evaluate(t,e)));return r.some((s=>s.Cr()))?I.vr():I.newValue({arrayValue:{values:r.map((s=>s.value))}})}}function qt(n){return Jn(n)?Number(n.doubleValue):Number(n.integerValue)}function Ue(n){return BigInt(n.integerValue)}const q9=BigInt("0x7fffffffffffffff"),$9=-BigInt("0x8000000000000000");class ci{constructor(t){this.expr=t}evaluate(t,e){H(this.expr.params.length>=2,24778);const r=K(this.expr.params[0]).evaluate(t,e),s=K(this.expr.params[1]).evaluate(t,e);let i=this.Or(r,s);for(const o of this.expr.params.slice(2)){const u=K(o).evaluate(t,e);i=this.Or(i,u)}return i}Or(t,e){if(t.Cr()||e.Cr())return I.vr();if(t.Fr()||e.Fr())return I.Dr();const r=t.value,s=e.value;if(!Jn(r)&&!Oe(r)||!Jn(s)&&!Oe(s))return I.vr();if(Jn(r)||Jn(s)){const i=this.Mr(r,s);return i?I.newValue(i):I.vr()}if(Oe(r)&&Oe(s)){const i=this.Nr(r,s);return i===void 0?I.vr():typeof i=="number"?I.newValue({doubleValue:i}):i<$9||i>q9?I.vr():I.newValue({integerValue:`${i}`})}return I.vr()}}function Ze(n,t){return Dt(n)!==Dt(t)?"TYPE_MISMATCH":he(n)||he(t)?"NOT_EQ":me(n)&&me(t)?"EQ":me(n)||me(t)?"NULL":Vr(n)&&Vr(t)?(function(r,s){var o,u,c;if(((o=r.values)==null?void 0:o.length)!==((u=s.values)==null?void 0:u.length))return"NOT_EQ";let i=!1;for(let h=0;h<(((c=r.values)==null?void 0:c.length)??0);h++){const p=r.values[h],m=s.values[h];switch(Ze(p,m)){case"EQ":break;case"NOT_EQ":case"TYPE_MISMATCH":return"NOT_EQ";case"NULL":i=!0;break;default:z(44609,{Lr:p,Br:m})}}return i?"NULL":"EQ"})(n.arrayValue,t.arrayValue):uo(n)&&uo(t)||Zn(n)&&Zn(t)?(function(r,s){const i=r.fields||{},o=s.fields||{};if(oo(i)!==oo(o))return"NOT_EQ";let u=!1;for(const c in i)if(i.hasOwnProperty(c)){if(o[c]===void 0)return"NOT_EQ";switch(Ze(i[c],o[c])){case"NOT_EQ":case"TYPE_MISMATCH":return"NOT_EQ";case"NULL":u=!0}}return u?"NULL":"EQ"})(n.mapValue,t.mapValue):(function(r,s){return we(r,s,{Te:!1,Ee:!0,he:!0})})(n,t)?"EQ":"NOT_EQ"}class H9 extends ci{Nr(t,e){return Ue(t)+Ue(e)}Mr(t,e){return{doubleValue:qt(t)+qt(e)}}}class j9 extends ci{constructor(t){super(t),this.expr=t}Nr(t,e){return Ue(t)-Ue(e)}Mr(t,e){return{doubleValue:qt(t)-qt(e)}}}class G9 extends ci{constructor(t){super(t),this.expr=t}Nr(t,e){return Ue(t)*Ue(e)}Mr(t,e){return{doubleValue:qt(t)*qt(e)}}}class z9 extends ci{constructor(t){super(t),this.expr=t}Nr(t,e){const r=Ue(e);if(r!==BigInt(0))return Ue(t)/r}Mr(t,e){const r=qt(e);return r===0?{doubleValue:Ls(r)?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY}:{doubleValue:qt(t)/r}}}class W9 extends ci{constructor(t){super(t),this.expr=t}Nr(t,e){const r=Ue(e);if(r!==BigInt(0))return Ue(t)%r}Mr(t,e){const r=qt(e);if(r!==0)return{doubleValue:qt(t)%r}}}class K9{constructor(t){this.expr=t}evaluate(t,e){var i;let r=!1,s=!1;for(const o of this.expr.params){const u=K(o).evaluate(t,e);switch(u.type){case"BOOLEAN":if(!((i=u.value)!=null&&i.booleanValue))return I.newValue(Ft);break;case"NULL":s=!0;break;default:r=!0}}return r?I.vr():s?I.Dr():I.newValue(ce)}}class Yo{constructor(t){this.expr=t}evaluate(t,e){var s;H(this.expr.params.length===1,9634);const r=K(this.expr.params[0]).evaluate(t,e);switch(r.type){case"BOOLEAN":return I.newValue({booleanValue:!((s=r.value)!=null&&s.booleanValue)});case"NULL":return I.Dr();default:return I.vr()}}}class Y9{constructor(t){this.expr=t}evaluate(t,e){var i;let r=!1,s=!1;for(const o of this.expr.params){const u=K(o).evaluate(t,e);switch(u.type){case"BOOLEAN":if((i=u.value)!=null&&i.booleanValue)return I.newValue(ce);break;case"NULL":s=!0;break;default:r=!0}}return r?I.vr():s?I.Dr():I.newValue(Ft)}}class Q1{constructor(t){this.expr=t}evaluate(t,e){var i;let r=!1,s=!1;for(const o of this.expr.params){const u=K(o).evaluate(t,e);switch(u.type){case"BOOLEAN":r=Q1.xor(r,!!((i=u.value)!=null&&i.booleanValue));break;case"NULL":s=!0;break;default:return I.vr()}}return s?I.Dr():I.newValue({booleanValue:r})}static xor(t,e){return(t||e)&&!(t&&e)}}class G6{constructor(t){this.expr=t}evaluate(t,e){var o,u;H(this.expr.params.length===2,55094);let r=!1;const s=K(this.expr.params[0]).evaluate(t,e);switch(s.type){case"NULL":r=!0;break;case"ERROR":case"UNSET":return I.vr()}const i=K(this.expr.params[1]).evaluate(t,e);switch(i.type){case"ARRAY":break;case"NULL":r=!0;break;default:return I.vr()}if(r)return I.Dr();for(const c of((u=(o=i.value)==null?void 0:o.arrayValue)==null?void 0:u.values)??[])switch(me(s.value)&&me(c)?"EQ":Ze(s.value,c)){case"EQ":return I.newValue(ce);case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":r=!0;break;default:z(44608,{value:s.value,candidate:c})}return r?I.Dr():I.newValue(Ft)}}class Q9{constructor(t){this.expr=t}evaluate(t,e){return new Yo(new k("not",[new k("equal_any",this.expr.params)])).evaluate(t,e)}}class X9{constructor(t){this.expr=t}evaluate(t,e){H(this.expr.params.length===1,23322);const r=K(this.expr.params[0]).evaluate(t,e);switch(r.type){case"INT":return I.newValue(Ft);case"DOUBLE":return I.newValue({booleanValue:isNaN(qt(r.value))});case"NULL":return I.Dr();default:return I.vr()}}}class J9{constructor(t){this.expr=t}evaluate(t,e){return H(this.expr.params.length===1,50406),new Yo(new k("not",[new k("is_nan",this.expr.params)])).evaluate(t,e)}}class Z9{constructor(t){this.expr=t}evaluate(t,e){switch(H(this.expr.params.length===1,23123),K(this.expr.params[0]).evaluate(t,e).type){case"NULL":return I.newValue(ce);case"UNSET":case"ERROR":return I.vr();default:return I.newValue(Ft)}}}class tm{constructor(t){this.expr=t}evaluate(t,e){return H(this.expr.params.length===1,23167),new Yo(new k("not",[new k("is_null",this.expr.params)])).evaluate(t,e)}}class em{constructor(t){this.expr=t}evaluate(t,e){return H(this.expr.params.length===1,5228),K(this.expr.params[0]).evaluate(t,e).type==="ERROR"?I.newValue(ce):I.newValue(Ft)}}class nm{constructor(t){this.expr=t}evaluate(t,e){switch(H(this.expr.params.length===1,6877),K(this.expr.params[0]).evaluate(t,e).type){case"ERROR":return I.vr();case"UNSET":return I.newValue(Ft);default:return I.newValue(ce)}}}class rm{constructor(t){this.expr=t}evaluate(t,e){var s;H(this.expr.params.length===3,11706);const r=K(this.expr.params[0]).evaluate(t,e);switch(r.type){case"BOOLEAN":return(s=r.value)!=null&&s.booleanValue?K(this.expr.params[1]).evaluate(t,e):K(this.expr.params[2]).evaluate(t,e);case"NULL":return K(this.expr.params[2]).evaluate(t,e);default:return I.vr()}}}class sm{constructor(t){this.expr=t}evaluate(t,e){const r=this.expr.params.map((i=>K(i).evaluate(t,e)));let s;for(const i of r)switch(i.type){case"ERROR":case"UNSET":case"NULL":continue;default:s=s===void 0||le(i.value,s.value)>0?i:s}return s===void 0?I.Dr():s}}class im{constructor(t){this.expr=t}evaluate(t,e){const r=this.expr.params.map((i=>K(i).evaluate(t,e)));let s;for(const i of r)switch(i.type){case"ERROR":case"UNSET":case"NULL":continue;default:s=s===void 0||le(i.value,s.value)<0?i:s}return s===void 0?I.Dr():s}}class jr{constructor(t){this.expr=t}evaluate(t,e){H(this.expr.params.length===2,31033,`${this.expr.name}() function should have exactly 2 params`);const r=K(this.expr.params[0]).evaluate(t,e);switch(r.type){case"ERROR":case"UNSET":return I.vr()}const s=K(this.expr.params[1]).evaluate(t,e);switch(s.type){case"ERROR":case"UNSET":return I.vr()}return this.Ur(r,s)}}class om extends jr{constructor(t){super(t),this.expr=t}Ur(t,e){if(t.Fr()&&e.Fr())return I.newValue(ce);if(t.Fr()||e.Fr()||he(t.value)||he(e.value)||Dt(t.value)!==Dt(e.value))return I.newValue(Ft);switch(Ze(t.value,e.value)){case"EQ":return I.newValue(ce);case"NOT_EQ":return I.newValue(Ft);case"NULL":return I.Dr();default:z(44615,{left:t,right:e})}}}class am extends jr{constructor(t){super(t),this.expr=t}Ur(t,e){switch(Ze(t.value,e.value)){case"EQ":return I.newValue(Ft);case"NOT_EQ":case"TYPE_MISMATCH":return I.newValue(ce);case"NULL":return I.Dr();default:z(44614,{left:t,right:e})}}}class um extends jr{constructor(t){super(t),this.expr=t}Ur(t,e){return Dt(t.value)!==Dt(e.value)||he(t.value)||he(e.value)?I.newValue(Ft):I.newValue({booleanValue:le(t.value,e.value)<0})}}class cm extends jr{constructor(t){super(t),this.expr=t}Ur(t,e){return Dt(t.value)!==Dt(e.value)||he(t.value)||he(e.value)?I.newValue(Ft):Ze(t.value,e.value)==="EQ"?I.newValue(ce):I.newValue({booleanValue:le(t.value,e.value)<0})}}class lm extends jr{constructor(t){super(t),this.expr=t}Ur(t,e){return Dt(t.value)!==Dt(e.value)||he(t.value)||he(e.value)?I.newValue(Ft):I.newValue({booleanValue:le(t.value,e.value)>0})}}class hm extends jr{constructor(t){super(t),this.expr=t}Ur(t,e){return Dt(t.value)!==Dt(e.value)||he(t.value)||he(e.value)?I.newValue(Ft):Ze(t.value,e.value)==="EQ"?I.newValue(ce):I.newValue({booleanValue:le(t.value,e.value)>0})}}class fm{constructor(t){this.expr=t}evaluate(t,e){throw new Error("Unimplemented")}}class dm{constructor(t){this.expr=t}evaluate(t,e){var s;H(this.expr.params.length===1,216);const r=K(this.expr.params[0]).evaluate(t,e);switch(r.type){case"NULL":return I.Dr();case"ARRAY":{const i=((s=r.value.arrayValue)==null?void 0:s.values)??[];return I.newValue({arrayValue:{values:[...i].reverse()}})}default:return I.vr()}}}class pm{constructor(t){this.expr=t}evaluate(t,e){return H(this.expr.params.length===2,52884),new G6(new k("eq_any",[this.expr.params[1],this.expr.params[0]])).evaluate(t,e)}}class mm{constructor(t){this.expr=t}evaluate(t,e){var c,h,p,m;H(this.expr.params.length===2,1392);let r=!1;const s=K(this.expr.params[0]).evaluate(t,e);switch(s.type){case"ARRAY":break;case"NULL":r=!0;break;default:return I.vr()}const i=K(this.expr.params[1]).evaluate(t,e);switch(i.type){case"ARRAY":break;case"NULL":r=!0;break;default:return I.vr()}if(r)return I.Dr();const o=((h=(c=i.value)==null?void 0:c.arrayValue)==null?void 0:h.values)??[],u=((m=(p=s.value)==null?void 0:p.arrayValue)==null?void 0:m.values)??[];for(const y of o){let C=!1;r=!1;for(const P of u){switch(me(y)&&me(P)?"EQ":Ze(y,P)){case"EQ":C=!0;break;case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":r=!0;break;default:z(44613,{value:P,search:y})}if(C)break}if(!C)return I.newValue(Ft)}return I.newValue(ce)}}class gm{constructor(t){this.expr=t}evaluate(t,e){var c,h,p,m;H(this.expr.params.length===2,2680);let r=!1;const s=K(this.expr.params[0]).evaluate(t,e);switch(s.type){case"ARRAY":break;case"NULL":r=!0;break;default:return I.vr()}const i=K(this.expr.params[1]).evaluate(t,e);switch(i.type){case"ARRAY":break;case"NULL":r=!0;break;default:return I.vr()}if(r)return I.Dr();const o=((h=(c=i.value)==null?void 0:c.arrayValue)==null?void 0:h.values)??[],u=((m=(p=s.value)==null?void 0:p.arrayValue)==null?void 0:m.values)??[];for(const y of u)for(const C of o)switch(me(y)&&me(C)?"EQ":Ze(y,C)){case"EQ":return I.newValue(ce);case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":r=!0;break;default:z(44608,{value:y,search:C})}return r?I.Dr():I.newValue(Ft)}}class _m{constructor(t){this.expr=t}evaluate(t,e){var s,i,o;H(this.expr.params.length===1,38605);const r=K(this.expr.params[0]).evaluate(t,e);switch(r.type){case"NULL":return I.Dr();case"ARRAY":return I.newValue({integerValue:`${((o=(i=(s=r.value)==null?void 0:s.arrayValue)==null?void 0:i.values)==null?void 0:o.length)??0}`});default:return I.vr()}}}class Em{constructor(t){this.expr=t}evaluate(t,e){throw new Error("Unimplemented")}}class ym{constructor(t){this.expr=t}evaluate(t,e){var s,i;H(this.expr.params.length===1,1508);const r=K(this.expr.params[0]).evaluate(t,e);switch(r.type){case"NULL":return I.Dr();case"BYTES":{const o=(s=r.value)==null?void 0:s.bytesValue;if(typeof o=="string"){const u=kt.fromBase64String(o).toUint8Array();return u.reverse(),I.newValue({bytesValue:kt.fromUint8Array(u).toBase64()})}return I.newValue({bytesValue:new Uint8Array(o).reverse()})}case"STRING":{const o=(i=r.value)==null?void 0:i.stringValue,u=new Intl.__PRIVATE_Segmenter(void 0,{granularity:"grapheme"}).segment(o),c=Array.from(u,(h=>h.segment)).reverse();return I.newValue({stringValue:c.join("")})}default:return I.vr()}}}class Tm{constructor(t){this.expr=t}evaluate(t,e){throw new Error("Unimplemented")}}class wm{constructor(t){this.expr=t}evaluate(t,e){throw new Error("Unimplemented")}}class Im{constructor(t){this.expr=t}evaluate(t,e){H(this.expr.params.length===1,19400);const r=K(this.expr.params[0]).evaluate(t,e);switch(r.type){case"NULL":return I.Dr();case"STRING":{const s=(function(o){let u=0;for(let c=0;c<o.length;c++){const h=o.codePointAt(c);if(h===void 0)return;if(h<=65535)if(h>=55296&&h<=57343)if(h<=56319){const p=o.codePointAt(c+1);p!==void 0&&p>=56320&&p<=57343?(u+=1,c++):u+=1}else u+=1;else u+=1;else{if(!(h<=1114111))return;u+=1,c++}}return u})(r.value.stringValue);return s===void 0?I.vr():I.newValue({integerValue:s})}default:return I.vr()}}}class Am{constructor(t){this.expr=t}evaluate(t,e){var s,i;H(this.expr.params.length===1,8486);const r=K(this.expr.params[0]).evaluate(t,e);switch(r.type){case"BYTES":{const o=(s=r.value)==null?void 0:s.bytesValue;return typeof o=="string"?I.newValue({integerValue:kt.fromBase64String(o).toUint8Array().length}):I.newValue({integerValue:new Uint8Array(o).length})}case"STRING":{const o=(function(c){let h=0;for(let p=0;p<c.length;p++){const m=c.codePointAt(p);if(m===void 0)return;if(m>=55296&&m<=57343){if(!(m<=56319))return;{const y=c.codePointAt(p+1);if(y===void 0||!(y>=56320&&y<=57343))return;h+=4,p++}}else if(m<=127)h+=1;else if(m<=2047)h+=2;else if(m<=65535)h+=3;else{if(!(m<=1114111))return;h+=4,p++}}return h})((i=r.value)==null?void 0:i.stringValue);return o===void 0?I.vr():I.newValue({integerValue:o})}case"NULL":return I.Dr();default:return I.vr()}}}class Gr{constructor(t){this.expr=t}evaluate(t,e){var o,u;H(this.expr.params.length===2,39773,`${this.expr.name}() function should have exactly two parameters`);let r=!1;const s=K(this.expr.params[0]).evaluate(t,e);switch(s.type){case"STRING":break;case"NULL":r=!0;break;default:return I.vr()}const i=K(this.expr.params[1]).evaluate(t,e);switch(i.type){case"STRING":break;case"NULL":r=!0;break;default:return I.vr()}return r?I.Dr():this.kr((o=s.value)==null?void 0:o.stringValue,(u=i.value)==null?void 0:u.stringValue)}}class Rm extends Gr{kr(t,e){try{const r=(function(o){let u="";for(let c=0;c<o.length;c++){const h=o.charAt(c);switch(h){case"_":u+=".";break;case"%":u+=".*";break;case"\\":case".":case"*":case"?":case"+":case"^":case"$":case"|":case"(":case")":case"[":case"]":case"{":case"}":u+="\\"+h;break;default:u+=h}}return"^"+u+"$"})(e),s=Vs.compile(r);return I.newValue({booleanValue:s.matches(t)})}catch(r){return ve(`Invalid LIKE pattern converted to regex: ${e}, returning error. Error: ${r}`),I.vr()}}}class vm extends Gr{kr(t,e){try{const r=Vs.compile(e);return I.newValue({booleanValue:r.matcher(t).find()})}catch{return ve(`Invalid regex pattern found in regex_contains: ${e}, returning error`),I.vr()}}}class Cm extends Gr{kr(t,e){try{return I.newValue({booleanValue:Vs.compile(e).matches(t)})}catch{return ve(`Invalid regex pattern found in regex_match: ${e}, returning error`),I.vr()}}}class Sm extends Gr{kr(t,e){return I.newValue({booleanValue:t.includes(e)})}}class Pm extends Gr{kr(t,e){return I.newValue({booleanValue:t.startsWith(e)})}}class bm extends Gr{kr(t,e){return I.newValue({booleanValue:t.endsWith(e)})}}class Nm{constructor(t){this.expr=t}evaluate(t,e){var s,i;H(this.expr.params.length===1,29079);const r=K(this.expr.params[0]).evaluate(t,e);switch(r.type){case"STRING":return I.newValue({stringValue:(i=(s=r.value)==null?void 0:s.stringValue)==null?void 0:i.toLowerCase()});case"NULL":return I.Dr();default:return I.vr()}}}class Om{constructor(t){this.expr=t}evaluate(t,e){var s,i;H(this.expr.params.length===1,60487);const r=K(this.expr.params[0]).evaluate(t,e);switch(r.type){case"STRING":return I.newValue({stringValue:(i=(s=r.value)==null?void 0:s.stringValue)==null?void 0:i.toUpperCase()});case"NULL":return I.Dr();default:return I.vr()}}}class km{constructor(t){this.expr=t}evaluate(t,e){var s,i;H(this.expr.params.length===1,28544);const r=K(this.expr.params[0]).evaluate(t,e);switch(r.type){case"STRING":return I.newValue({stringValue:(i=(s=r.value)==null?void 0:s.stringValue)==null?void 0:i.trim()});case"NULL":return I.Dr();default:return I.vr()}}}class Dm{constructor(t){this.expr=t}evaluate(t,e){const r=this.expr.params.map((o=>K(o).evaluate(t,e)));let s="",i=!1;for(const o of r)switch(o.type){case"STRING":s+=o.value.stringValue;break;case"NULL":i=!0;break;default:return I.vr()}return i?I.Dr():I.newValue({stringValue:s})}}class Vm{constructor(t){this.expr=t}evaluate(t,e){var o,u,c,h;H(this.expr.params.length===2,4483);const r=K(this.expr.params[0]).evaluate(t,e);switch(r.type){case"UNSET":return I.Sr();case"MAP":break;default:return I.vr()}const s=K(this.expr.params[1]).evaluate(t,e);if(s.type!=="STRING")return I.vr();const i=(h=(u=(o=r.value)==null?void 0:o.mapValue)==null?void 0:u.fields)==null?void 0:h[(c=s.value)==null?void 0:c.stringValue];return i===void 0?I.Sr():I.newValue(i)}}class X1{constructor(t){this.expr=t}evaluate(t,e){var h,p;H(this.expr.params.length===2,25231,`${this.expr.name}() function should have exactly 2 params`);let r=!1;const s=K(this.expr.params[0]).evaluate(t,e);switch(s.type){case"VECTOR":break;case"NULL":r=!0;break;default:return I.vr()}const i=K(this.expr.params[1]).evaluate(t,e);switch(i.type){case"VECTOR":break;case"NULL":r=!0;break;default:return I.vr()}if(r)return I.Dr();const o=n1(s.value),u=n1(i.value);if(o===void 0||u===void 0||((h=o.values)==null?void 0:h.length)!==((p=u.values)==null?void 0:p.length))return I.vr();const c=this.qr(o,u);return c===void 0||isNaN(c)?I.vr():I.newValue({doubleValue:c})}}class xm extends X1{qr(t,e){const r=(t==null?void 0:t.values)??[],s=(e==null?void 0:e.values)??[];if(r.length===0)return;let i=0,o=0,u=0;for(let h=0;h<r.length;h++){if(!kn(r[h])||!kn(s[h]))return;const p=qt(r[h]),m=qt(s[h]);i+=p*m,o+=p*p,u+=m*m}const c=Math.sqrt(o)*Math.sqrt(u);if(c!==0)return 1-Math.max(-1,Math.min(1,i/c))}}class Lm extends X1{qr(t,e){const r=(t==null?void 0:t.values)??[],s=(e==null?void 0:e.values)??[];if(r.length===0)return 0;let i=0;for(let o=0;o<r.length;o++){if(!kn(r[o])||!kn(s[o]))return;i+=qt(r[o])*qt(s[o])}return i}}class Mm extends X1{qr(t,e){const r=(t==null?void 0:t.values)??[],s=(e==null?void 0:e.values)??[];if(r.length===0)return 0;let i=0;for(let o=0;o<r.length;o++){if(!kn(r[o])||!kn(s[o]))return;const u=qt(r[o]),c=qt(s[o]);i+=Math.pow(u-c,2)}return Math.sqrt(i)}}class Um{constructor(t){this.expr=t}evaluate(t,e){var s;H(this.expr.params.length===1,39044);const r=K(this.expr.params[0]).evaluate(t,e);switch(r.type){case"VECTOR":{const i=n1(r.value);return I.newValue({integerValue:((s=i==null?void 0:i.values)==null?void 0:s.length)??0})}case"NULL":return I.Dr();default:return I.vr()}}}const zs=BigInt(-62135596800),Ws=BigInt(253402300799),Eo=BigInt(1e3),Cn=BigInt(1e6),Fm=zs*Eo,Bm=Ws*Eo+BigInt(999),qm=zs*Cn,$m=Ws*Cn+BigInt(999999);function J1(n){return n>=qm&&n<=$m}function z6(n){return n>=zs&&n<=Ws}function Ks(n,t){const e=BigInt(n);return!(e<zs||e>Ws)&&!(t<0||t>=1e9)&&(e!==zs||t===0)&&!(e===Ws&&t>999999999)}function W6(n,t){return t<0?{seconds:n-1,nanos:t+1e9}:{seconds:n,nanos:t}}function Z1(n){return BigInt(n.seconds)*Cn+BigInt(Math.trunc(n.nanoseconds/1e3))}class tu{constructor(t){this.expr=t}evaluate(t,e){H(this.expr.params.length===1,49262,`${this.expr.name}() function should have exactly one parameter`);const r=K(this.expr.params[0]).evaluate(t,e);switch(r.type){case"INT":return this.toTimestamp(BigInt(r.value.integerValue));case"NULL":return I.Dr();default:return I.vr()}}}class Hm extends tu{toTimestamp(t){if(!J1(t))return I.vr();let e=Number(t/Cn),r=Number(t%Cn*BigInt(1e3));const s=W6(e,r);return e=s.seconds,r=s.nanos,Ks(e,r)?I.newValue({timestampValue:{seconds:e,nanos:r}}):I.vr()}}class jm extends tu{toTimestamp(t){if(!(function(o){return o>=Fm&&o<=Bm})(t))return I.vr();let e=Number(t/Eo),r=Number(t%Eo*BigInt(1e6));const s=W6(e,r);return e=s.seconds,r=s.nanos,Ks(e,r)?I.newValue({timestampValue:{seconds:e,nanos:r}}):I.vr()}}class Gm extends tu{toTimestamp(t){if(!z6(t))return I.vr();const e=Number(t);return I.newValue({timestampValue:{seconds:e,nanos:0}})}}class eu{constructor(t){this.expr=t}evaluate(t,e){H(this.expr.params.length===1,1265,`${this.expr.name}() function should have exactly one parameter`);const r=K(this.expr.params[0]).evaluate(t,e);switch(r.type){case"TIMESTAMP":break;case"NULL":return I.Dr();default:return I.vr()}const s=F1(r.value.timestampValue);return Ks(s.seconds,s.nanoseconds)?this.$r(s):I.vr()}}class zm extends eu{$r(t){const e=Z1(t);return J1(e)?I.newValue({integerValue:`${e.toString()}`}):I.vr()}}class Wm extends eu{$r(t){const e=Z1(t),r=e/BigInt(1e3),s=e%BigInt(1e3);return r>BigInt(0)||s===BigInt(0)?I.newValue({integerValue:r.toString()}):I.newValue({integerValue:(r-BigInt(1)).toString()})}}class Km extends eu{$r(t){const e=BigInt(t.seconds);return z6(e)?I.newValue({integerValue:e.toString()}):I.vr()}}class K6{constructor(t){this.expr=t}evaluate(t,e){H(this.expr.params.length===3,2775,`${this.expr.name}() function should have exactly 3 parameters`);let r=!1;const s=K(this.expr.params[0]).evaluate(t,e);switch(s.type){case"TIMESTAMP":break;case"NULL":r=!0;break;default:return I.vr()}const i=K(this.expr.params[1]).evaluate(t,e);let o;switch(i.type){case"STRING":if(o=(function(et){switch(et){case"microsecond":return"microsecond";case"millisecond":return"millisecond";case"second":return"second";case"minute":return"minute";case"hour":return"hour";case"day":return"day";default:return}})(i.value.stringValue),o===void 0)return I.vr();break;case"NULL":r=!0;break;default:return I.vr()}const u=K(this.expr.params[2]).evaluate(t,e);switch(u.type){case"INT":break;case"NULL":r=!0;break;default:return I.vr()}if(r)return I.Dr();const c=BigInt(u.value.integerValue);let h;try{switch(o){case"microsecond":h=c;break;case"millisecond":h=c*BigInt(1e3);break;case"second":h=c*BigInt(1e6);break;case"minute":h=c*BigInt(6e7);break;case"hour":h=c*BigInt(36e8);break;case"day":h=c*BigInt(864e8);break;default:return I.vr()}if(o!=="microsecond"&&c!==BigInt(0)&&h/c!==BigInt(this.Kr(o)))return I.vr()}catch(W){return ve(`Error during timestamp arithmetic: ${W}`),I.vr()}const p=F1(s.value.timestampValue);if(!Ks(p.seconds,p.nanoseconds))return I.vr();const m=Z1(p),y=this.Wr(m,h);if(!J1(y))return I.vr();const C=Number(y/Cn),P=y%Cn,L=Number((P<0?P+Cn:P)*BigInt(1e3)),M=P<0?C-1:C;return Ks(M,L)?I.newValue({timestampValue:{seconds:M,nanos:L}}):I.vr()}Kr(t){switch(t){case"millisecond":return 1e3;case"second":return 1e6;case"minute":return 6e7;case"hour":return 36e8;case"day":return 864e8;default:return 1}}}class Ym extends K6{Wr(t,e){return t+e}}class Qm extends K6{Wr(t,e){return t-e}}function Ys(n){if((n=j6(n))instanceof $r)return`fld(${n.fieldName})`;if(n instanceof Hr)return`cst(${(function(e){return e===null?"null":typeof e=="number"?e.toString():typeof e=="string"?`"${e}"`:e instanceof At?`ref(${e.path})`:e instanceof ue?`vec(${JSON.stringify(e)})`:JSON.stringify(e)})(n.value)})`;if(n instanceof k)return`fn(${n.name},[${n.params.map(Ys).join(",")}])`;if(n.expressionType==="ListOfExpressions")return`list([${n.Rr.map(Ys).join(",")}])`;throw new Error(`Unrecognized expr ${JSON.stringify(n,null,2)}`)}function Xm(n){if(n instanceof q6)return`${n._name}(${Li(n.fields)})`;if(n instanceof $6){let t=`${n._name}(${Li(n.accumulators)})`;return n.groups.size>0&&(t+=`grouping(${Li(n.groups)})`),t}if(n instanceof H6)return`${n._name}(${Li(n.groups)})`;if(n instanceof Go)return`${n._name}(${n.Vr})`;if(n instanceof zo)return`${n._name}(${n.collectionId})`;if(n instanceof z1)return`${n._name}()`;if(n instanceof W1)return`${n._name}(${n.dr.sort()})`;if(n instanceof Wo)return`${n._name}(${Ys(n.condition)})`;if(n instanceof cr)return`${n._name}(${n.limit})`;if(n instanceof je)return`${n._name}(${(function(e){return e.map((r=>`${Ys(r.expr)}${r.direction}`)).join(",")})(n.orderings)})`;throw new Error(`Unrecognized stage ${n._name}`)}function Li(n){return`${Array.from(n.entries()).sort().map((([t,e])=>`${t}=${Ys(e)}`)).join(",")}`}function Ke(n){return n.stages.map((t=>Xm(t))).join("|")}function Y6(n,t){return Ke(n)===Ke(t)}function Lt(n){return n instanceof te}function ch(n){return Lt(n)?Ke(n):vs(n)}function Q6(n){return Lt(n)?Ke(n):(function(e){return`${i6(xe(e))}|lt:${e.limitType}`})(n)}function Qo(n,t){return n instanceof te&&t instanceof te?Y6(n,t):!(n instanceof te&&!(t instanceof te)||!(n instanceof te)&&t instanceof te)&&R3(n,t)}function X6(n){return Qn(n)?Ke(n):i6(n)}function J6(n,t){return n instanceof te&&t instanceof te?Y6(n,t):!(n instanceof te&&!(t instanceof te)||!(n instanceof te)&&t instanceof te)&&o6(n,t)}function Jm(n,t){const e=(function(s){let i=!1;const o=[];for(const u of s)if(u instanceof je)if(i=!0,u.orderings.some((c=>c.expr instanceof $r&&c.expr.fieldName===Ne)))o.push(u);else{const c=u.orderings.map((h=>h));c.push(Ki(Ne).ascending()),o.push(new je(c,{}))}else u instanceof cr&&(i||(o.push(new je([Ki(Ne).ascending()],{})),i=!0)),o.push(u);return i||o.push(new je([Ki(Ne).ascending()],{})),o})(n.stages);if(n.userDataReader){const r=n.userDataReader.createContext(3,"toCorePipeline");e.forEach((s=>s._readUserData(r)))}return new te(n.userDataReader.serializer,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zm{constructor(t,e,r,s){this.batchId=t,this.localWriteTime=e,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(t,e){const r=e.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(t.key)&&a3(i,t,r[s])}}applyToLocalView(t,e){for(const r of this.baseMutations)r.key.isEqual(t.key)&&(e=As(r,t,e,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(t.key)&&(e=As(r,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const r=f6();return this.mutations.forEach((s=>{const i=t.get(s.key),o=i.overlayedDocument;let u=this.applyToLocalView(o,i.mutatedFields);u=e.has(s.key)?null:u;const c=X2(o,u);c!==null&&r.set(s.key,c),o.isValidDocument()||o.convertToNoDocument(J.min())})),r}keys(){return this.mutations.reduce(((t,e)=>t.add(e.key)),it())}isEqual(t){return this.batchId===t.batchId&&Nr(this.mutations,t.mutations,((e,r)=>ql(e,r)))&&Nr(this.baseMutations,t.baseMutations,((e,r)=>ql(e,r)))}}class nu{constructor(t,e,r,s){this.batch=t,this.commitVersion=e,this.mutationResults=r,this.docVersions=s}static from(t,e,r){H(t.mutations.length===r.length,58842,{Qr:t.mutations.length,Gr:r.length});let s=(function(){return b3})();const i=t.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,r[o].version);return new nu(t,e,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t8{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ge{constructor(t,e,r,s,i=J.min(),o=J.min(),u=kt.EMPTY_BYTE_STRING,c=null){this.target=t,this.targetId=e,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=u,this.expectedCount=c}withSequenceNumber(t){return new Ge(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new Ge(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new Ge(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new Ge(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e8{constructor(t){this.zr=t}}function n8(n){const t=z3({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?po(t,t.limit,"L"):t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r8{constructor(){this.Hi=new s8}addToCollectionParentIndex(t,e){return this.Hi.add(e),x.resolve()}getCollectionParents(t,e){return x.resolve(this.Hi.getEntries(e))}addFieldIndex(t,e){return x.resolve()}deleteFieldIndex(t,e){return x.resolve()}deleteAllFieldIndexes(t){return x.resolve()}createTargetIndexes(t,e){return x.resolve()}getDocumentsMatchingTarget(t,e){return x.resolve(null)}getIndexType(t,e){return x.resolve(0)}getFieldIndexes(t,e){return x.resolve([])}getNextCollectionGroupToUpdate(t){return x.resolve(null)}getMinOffset(t,e){return x.resolve(bn.min())}getMinOffsetFromCollectionGroup(t,e){return x.resolve(bn.min())}updateCollectionGroup(t,e,r){return x.resolve()}updateIndexEntries(t,e){return x.resolve()}}class s8{constructor(){this.index={}}add(t){const e=t.lastSegment(),r=t.popLast(),s=this.index[e]||new Ot(lt.comparator),i=!s.has(r);return this.index[e]=s.add(r),i}has(t){const e=t.lastSegment(),r=t.popLast(),s=this.index[e];return s&&s.has(r)}getEntries(t){return(this.index[t]||new Ot(lt.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mn{constructor(t){this.Ds=t}next(){return this.Ds+=2,this.Ds}static xs(){return new Mn(0)}static Cs(){return new Mn(-1)}}// Copyright 2024 Google LLC* @license
function Z6(n,t){var r;let e=t;for(const s of n.stages)e=o8({serializer:n.serializer,serverTimestampBehavior:(r=n.listenOptions)==null?void 0:r.serverTimestampBehavior},s,e);return e}function Xo(n,t){return Z6(n,[t]).length>0}function i8(n,t){return Lt(n)?Xo(n,t):Fo(n,t)}function o8(n,t,e){if(t instanceof Go)return(function(s,i,o){return o.filter((u=>u.isFoundDocument()&&`/${u.key.getCollectionPath().canonicalString()}`===i.Vr))})(0,t,e);if(t instanceof Wo)return(function(s,i,o){return o.filter((u=>{const c=Ps(K(i.condition).evaluate(s,u));return c!==void 0&&we(c,ce)}))})(n,t,e);if(t instanceof zo)return(function(s,i,o){return o.filter((u=>u.isFoundDocument()&&u.key.getCollectionPath().lastSegment()===i.collectionId))})(0,t,e);if(t instanceof z1)return(function(s,i,o){return o.filter((u=>u.isFoundDocument()))})(0,0,e);if(t instanceof W1)return(function(s,i,o){return o.filter((u=>u.isFoundDocument()&&i.mr.has(u.key.path.toStringWithLeadingSlash())))})(0,t,e);if(t instanceof cr)return(function(s,i,o){return o.slice(0,i.limit)})(0,t,e);if(t instanceof je)return(function(s,i,o){const u=i.orderings.map((c=>({ks:K(c.expr),direction:c.direction})));return[...o].sort(((c,h)=>{for(const{ks:p,direction:m}of u){const y=Ps(p.evaluate(s,c)),C=Ps(p.evaluate(s,h)),P=le(y??kr,C??kr);if(P!==0)return m==="ascending"?P:-P}return 0}))})(n,t,e);throw new Error(`Unknown stage: ${t._name}`)}function l1(n){const t=(function(r){for(let s=r.stages.length-1;s>=0;s--){const i=r.stages[s];if(i instanceof je)return i.orderings}throw new Error("Pipeline must contain at least one Sort stage")})(n);return(e,r)=>{for(const s of t){const i=Ps(K(s.expr).evaluate({serializer:n.serializer},e)),o=Ps(K(s.expr).evaluate({serializer:n.serializer},r)),u=le(i||kr,o||kr);if(u!==0)return s.direction==="ascending"?u:-u}return 0}}function Fa(n){for(let t=n.stages.length-1;t>=0;t--){const e=n.stages[t];if(e instanceof cr)return{limit:e.limit}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class a8{constructor(){this.changes=new dr((t=>t.toString()),((t,e)=>t.isEqual(e))),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,Wt.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const r=this.changes.get(e);return r!==void 0?x.resolve(r):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class u8{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class c8{constructor(t,e,r,s){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=r,this.indexManager=s}getDocument(t,e){let r=null;return this.documentOverlayCache.getOverlay(t,e).next((s=>(r=s,this.remoteDocumentCache.getEntry(t,e)))).next((s=>(r!==null&&As(r.mutation,s,pe.empty(),mt.now()),s)))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next((r=>this.getLocalViewOfDocuments(t,r,it()).next((()=>r))))}getLocalViewOfDocuments(t,e,r=it()){const s=yn();return this.populateOverlays(t,s,e).next((()=>this.computeViews(t,e,s,r).next((i=>{let o=wr();return i.forEach(((u,c)=>{o=o.insert(u,c.overlayedDocument)})),o}))))}getOverlayedDocuments(t,e){const r=yn();return this.populateOverlays(t,r,e).next((()=>this.computeViews(t,e,r,it())))}populateOverlays(t,e,r){const s=[];return r.forEach((i=>{e.has(i)||s.push(i)})),this.documentOverlayCache.getOverlays(t,s).next((i=>{i.forEach(((o,u)=>{e.set(o,u)}))}))}computeViews(t,e,r,s){let i=oe();const o=Cs(),u=(function(){return Cs()})();return e.forEach(((c,h)=>{const p=r.get(h.key);s.has(h.key)&&(p===void 0||p.mutation instanceof $n)?i=i.insert(h.key,h):p!==void 0?(o.set(h.key,p.mutation.getFieldMask()),As(p.mutation,h,p.mutation.getFieldMask(),mt.now())):o.set(h.key,pe.empty())})),this.recalculateAndSaveOverlays(t,i).next((c=>(c.forEach(((h,p)=>o.set(h,p))),e.forEach(((h,p)=>u.set(h,new u8(p,o.get(h)??null)))),u)))}recalculateAndSaveOverlays(t,e){const r=Cs();let s=new Et(((o,u)=>o-u)),i=it();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next((o=>{for(const u of o)u.keys().forEach((c=>{const h=e.get(c);if(h===null)return;let p=r.get(c)||pe.empty();p=u.applyToLocalView(h,p),r.set(c,p);const m=(s.get(u.batchId)||it()).add(c);s=s.insert(u.batchId,m)}))})).next((()=>{const o=[],u=s.getReverseIterator();for(;u.hasNext();){const c=u.getNext(),h=c.key,p=c.value,m=f6();p.forEach((y=>{if(!i.has(y)){const C=X2(e.get(y),r.get(y));C!==null&&m.set(y,C),i=i.add(y)}})),o.push(this.documentOverlayCache.saveOverlays(t,h,m))}return x.waitFor(o)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next((r=>this.recalculateAndSaveOverlays(t,r)))}getDocumentsMatchingQuery(t,e,r,s){return Lt(e)?this.getDocumentsMatchingPipeline(t,e,r,s):w3(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):u6(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,r,s):this.getDocumentsMatchingCollectionQuery(t,e,r,s)}getNextDocuments(t,e,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,r,s).next((i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,r.largestBatchId,s-i.size):x.resolve(yn());let u=xs,c=i;return o.next((h=>x.forEach(h,((p,m)=>(u<m.largestBatchId&&(u=m.largestBatchId),i.get(p)?x.resolve():this.remoteDocumentCache.getEntry(t,p).next((y=>{c=c.insert(p,y)}))))).next((()=>this.populateOverlays(t,h,i))).next((()=>this.computeViews(t,c,h,it()))).next((p=>({batchId:u,changes:h6(p)})))))}))}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new G(e)).next((r=>{let s=wr();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s}))}getDocumentsMatchingCollectionGroupQuery(t,e,r,s){const i=e.collectionGroup;let o=wr();return this.indexManager.getCollectionParents(t,i).next((u=>x.forEach(u,(c=>{const h=(function(m,y){return new qr(y,null,m.explicitOrderBy.slice(),m.filters.slice(),m.limit,m.limitType,m.startAt,m.endAt)})(e,c.child(i));return this.getDocumentsMatchingCollectionQuery(t,h,r,s).next((p=>{p.forEach(((m,y)=>{o=o.insert(m,y)}))}))})).next((()=>o))))}getDocumentsMatchingCollectionQuery(t,e,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,r.largestBatchId).next((o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,r,i,s)))).next((o=>this.retrieveMatchingLocalDocuments(i,o,(u=>Fo(e,u)))))}getDocumentsMatchingPipeline(t,e,r,s){if(vn(e)==="collection_group"){const i=Y1(e);let o=wr();return this.indexManager.getCollectionParents(t,i).next((u=>x.forEach(u,(c=>{const h=(function(m,y){const C=m.stages.map((P=>P instanceof zo?new Go(y.canonicalString(),{}):P));return new te(m.serializer,C)})(e,c.child(i));return this.getDocumentsMatchingPipeline(t,h,r,s).next((p=>{p.forEach(((m,y)=>{o=o.insert(m,y)}))}))})).next((()=>o))))}{let i;return this.getOverlaysForPipeline(t,e,r.largestBatchId).next((o=>{switch(i=o,vn(e)){case"collection":return this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,r,i,s);case"documents":let u=it();for(const c of c1(e))u=u.add(G.fromPath(c));return this.remoteDocumentCache.getEntries(t,u);case"database":return this.remoteDocumentCache.getAllEntries(t);default:throw new B("invalid-argument",`Invalid pipeline source to execute offline: ${Ke(e)}`)}})).next((o=>this.retrieveMatchingLocalDocuments(i,o,(u=>Xo(e,u)))))}}retrieveMatchingLocalDocuments(t,e,r){t.forEach(((i,o)=>{const u=o.getKey();e.get(u)===null&&(e=e.insert(u,Wt.newInvalidDocument(u)))}));let s=wr();return e.forEach(((i,o)=>{const u=t.get(i);u!==void 0&&As(u.mutation,o,pe.empty(),mt.now()),r(o)&&(s=s.insert(i,o))})),s}getOverlaysForPipeline(t,e,r){switch(vn(e)){case"collection":return this.documentOverlayCache.getOverlaysForCollection(t,lt.fromString(Ko(e)),r);case"collection_group":throw new B("invalid-argument",`Unexpected collection group pipeline: ${Ke(e)}`);case"documents":return this.documentOverlayCache.getOverlays(t,c1(e).map((s=>G.fromPath(s))));case"database":return this.documentOverlayCache.getAllOverlays(t,r);default:throw new B("invalid-argument",`Failed to get overlays for pipeline: ${Ke(e)}`)}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class l8{constructor(t){this.serializer=t,this.Hs=new Map,this.Js=new Map}getBundleMetadata(t,e){return x.resolve(this.Hs.get(e))}saveBundleMetadata(t,e){return this.Hs.set(e.id,(function(s){return{id:s.id,version:s.version,createTime:Le(s.createTime)}})(e)),x.resolve()}getNamedQuery(t,e){return x.resolve(this.Js.get(e))}saveNamedQuery(t,e){return this.Js.set(e.name,(function(s){return{name:s.name,query:n8(s.bundledQuery),readTime:Le(s.readTime)}})(e)),x.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class h8{constructor(){this.overlays=new Et(G.comparator),this.Ys=new Map}getOverlay(t,e){return x.resolve(this.overlays.get(e))}getOverlays(t,e){const r=yn();return x.forEach(e,(s=>this.getOverlay(t,s).next((i=>{i!==null&&r.set(s,i)})))).next((()=>r))}getAllOverlays(t,e){const r=yn();return this.overlays.forEach(((s,i)=>{i.largestBatchId>e&&r.set(s,i)})),x.resolve(r)}saveOverlays(t,e,r){return r.forEach(((s,i)=>{this.Hr(t,e,i)})),x.resolve()}removeOverlaysForBatchId(t,e,r){const s=this.Ys.get(r);return s!==void 0&&(s.forEach((i=>this.overlays=this.overlays.remove(i))),this.Ys.delete(r)),x.resolve()}getOverlaysForCollection(t,e,r){const s=yn(),i=e.length+1,o=new G(e.child("")),u=this.overlays.getIteratorFrom(o);for(;u.hasNext();){const c=u.getNext().value,h=c.getKey();if(!e.isPrefixOf(h.path))break;h.path.length===i&&c.largestBatchId>r&&s.set(c.getKey(),c)}return x.resolve(s)}getOverlaysForCollectionGroup(t,e,r,s){let i=new Et(((h,p)=>h-p));const o=this.overlays.getIterator();for(;o.hasNext();){const h=o.getNext().value;if(h.getKey().getCollectionGroup()===e&&h.largestBatchId>r){let p=i.get(h.largestBatchId);p===null&&(p=yn(),i=i.insert(h.largestBatchId,p)),p.set(h.getKey(),h)}}const u=yn(),c=i.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach(((h,p)=>u.set(h,p))),!(u.size()>=s)););return x.resolve(u)}Hr(t,e,r){const s=this.overlays.get(r.key);if(s!==null){const o=this.Ys.get(s.largestBatchId).delete(r.key);this.Ys.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new t8(e,r));let i=this.Ys.get(e);i===void 0&&(i=it(),this.Ys.set(e,i)),this.Ys.set(e,i.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class f8{constructor(){this.sessionToken=kt.EMPTY_BYTE_STRING}getSessionToken(t){return x.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,x.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ru{constructor(){this.Zs=new Ot(Ut.Xs),this.e_=new Ot(Ut.t_)}isEmpty(){return this.Zs.isEmpty()}addReference(t,e){const r=new Ut(t,e);this.Zs=this.Zs.add(r),this.e_=this.e_.add(r)}n_(t,e){t.forEach((r=>this.addReference(r,e)))}removeReference(t,e){this.r_(new Ut(t,e))}i_(t,e){t.forEach((r=>this.removeReference(r,e)))}s_(t){const e=new G(new lt([])),r=new Ut(e,t),s=new Ut(e,t+1),i=[];return this.e_.forEachInRange([r,s],(o=>{this.r_(o),i.push(o.key)})),i}__(){this.Zs.forEach((t=>this.r_(t)))}r_(t){this.Zs=this.Zs.delete(t),this.e_=this.e_.delete(t)}o_(t){const e=new G(new lt([])),r=new Ut(e,t),s=new Ut(e,t+1);let i=it();return this.e_.forEachInRange([r,s],(o=>{i=i.add(o.key)})),i}containsKey(t){const e=new Ut(t,0),r=this.Zs.firstAfterOrEqual(e);return r!==null&&t.isEqual(r.key)}}class Ut{constructor(t,e){this.key=t,this.a_=e}static Xs(t,e){return G.comparator(t.key,e.key)||ot(t.a_,e.a_)}static t_(t,e){return ot(t.a_,e.a_)||G.comparator(t.key,e.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class d8{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.gs=1,this.u_=new Ot(Ut.Xs)}checkEmpty(t){return x.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,r,s){const i=this.gs;this.gs++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new Zm(i,e,r,s);this.mutationQueue.push(o);for(const u of s)this.u_=this.u_.add(new Ut(u.key,i)),this.indexManager.addToCollectionParentIndex(t,u.key.path.popLast());return x.resolve(o)}lookupMutationBatch(t,e){return x.resolve(this.c_(e))}getNextMutationBatchAfterBatchId(t,e){const r=e+1,s=this.l_(r),i=s<0?0:s;return x.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return x.resolve(this.mutationQueue.length===0?D1:this.gs-1)}getAllMutationBatches(t){return x.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const r=new Ut(e,0),s=new Ut(e,Number.POSITIVE_INFINITY),i=[];return this.u_.forEachInRange([r,s],(o=>{const u=this.c_(o.a_);i.push(u)})),x.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(t,e){let r=new Ot(ot);return e.forEach((s=>{const i=new Ut(s,0),o=new Ut(s,Number.POSITIVE_INFINITY);this.u_.forEachInRange([i,o],(u=>{r=r.add(u.a_)}))})),x.resolve(this.E_(r))}getAllMutationBatchesAffectingQuery(t,e){const r=e.path,s=r.length+1;let i=r;G.isDocumentKey(i)||(i=i.child(""));const o=new Ut(new G(i),0);let u=new Ot(ot);return this.u_.forEachWhile((c=>{const h=c.key.path;return!!r.isPrefixOf(h)&&(h.length===s&&(u=u.add(c.a_)),!0)}),o),x.resolve(this.E_(u))}E_(t){const e=[];return t.forEach((r=>{const s=this.c_(r);s!==null&&e.push(s)})),e}removeMutationBatch(t,e){H(this.h_(e.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.u_;return x.forEach(e.mutations,(s=>{const i=new Ut(s.key,e.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(t,s.key)})).next((()=>{this.u_=r}))}bs(t){}containsKey(t,e){const r=new Ut(e,0),s=this.u_.firstAfterOrEqual(r);return x.resolve(e.isEqual(s&&s.key))}performConsistencyCheck(t){return this.mutationQueue.length,x.resolve()}h_(t,e){return this.l_(t)}l_(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}c_(t){const e=this.l_(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class p8{constructor(t){this.T_=t,this.docs=(function(){return new Et(G.comparator)})(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const r=e.key,s=this.docs.get(r),i=s?s.size:0,o=this.T_(e);return this.docs=this.docs.insert(r,{document:e.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(t,r.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const r=this.docs.get(e);return x.resolve(r?r.document.mutableCopy():Wt.newInvalidDocument(e))}getEntries(t,e){let r=oe();return e.forEach((s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():Wt.newInvalidDocument(s))})),x.resolve(r)}getAllEntries(t){let e=oe();return this.docs.forEach(((r,s)=>{e=e.insert(r,s.document)})),x.resolve(e)}getDocumentsMatchingQuery(t,e,r,s){let i,o;Lt(e)?(i=lt.fromString(Ko(e)),o=p=>Xo(e,p)):(i=e.path,o=p=>Fo(e,p));let u=oe();const c=new G(i.child("__id-9223372036854775808__")),h=this.docs.getIteratorFrom(c);for(;h.hasNext();){const{key:p,value:{document:m}}=h.getNext();if(!i.isPrefixOf(p.path))break;p.path.length>i.length+1||H4($4(m),r)<=0||(s.has(m.key)||o(m))&&(u=u.insert(m.key,m.mutableCopy()))}return x.resolve(u)}getAllFromCollectionGroup(t,e,r,s){z(9500)}P_(t,e){return x.forEach(this.docs,(r=>e(r)))}newChangeBuffer(t){return new m8(this)}getSize(t){return x.resolve(this.size)}}class m8 extends a8{constructor(t){super(),this.zs=t}applyChanges(t){const e=[];return this.changes.forEach(((r,s)=>{s.isValidDocument()?e.push(this.zs.addEntry(t,s)):this.zs.removeEntry(r)})),x.waitFor(e)}getFromCache(t,e){return this.zs.getEntry(t,e)}getAllFromCache(t,e){return this.zs.getEntries(t,e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class g8{constructor(t){this.persistence=t,this.R_=new dr((e=>X6(e)),J6),this.lastRemoteSnapshotVersion=J.min(),this.highestTargetId=0,this.I_=0,this.A_=new ru,this.targetCount=0,this.V_=Mn.xs()}forEachTarget(t,e){return this.R_.forEach(((r,s)=>e(s))),x.resolve()}getLastRemoteSnapshotVersion(t){return x.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return x.resolve(this.I_)}allocateTargetId(t){return this.highestTargetId=this.V_.next(),x.resolve(this.highestTargetId)}setTargetsMetadata(t,e,r){return r&&(this.lastRemoteSnapshotVersion=r),e>this.I_&&(this.I_=e),x.resolve()}Ms(t){this.R_.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.V_=new Mn(e),this.highestTargetId=e),t.sequenceNumber>this.I_&&(this.I_=t.sequenceNumber)}addTargetData(t,e){return this.Ms(e),this.targetCount+=1,x.resolve()}updateTargetData(t,e){return this.Ms(e),x.resolve()}removeTargetData(t,e){return this.R_.delete(e.target),this.A_.s_(e.targetId),this.targetCount-=1,x.resolve()}removeTargets(t,e,r){let s=0;const i=[];return this.R_.forEach(((o,u)=>{u.sequenceNumber<=e&&r.get(u.targetId)===null&&(this.R_.delete(o),i.push(this.removeMatchingKeysForTargetId(t,u.targetId)),s++)})),x.waitFor(i).next((()=>s))}getTargetCount(t){return x.resolve(this.targetCount)}getTargetData(t,e){const r=this.R_.get(e)||null;return x.resolve(r)}addMatchingKeys(t,e,r){return this.A_.n_(e,r),x.resolve()}removeMatchingKeys(t,e,r){this.A_.i_(e,r);const s=this.persistence.referenceDelegate,i=[];return s&&e.forEach((o=>{i.push(s.markPotentiallyOrphaned(t,o))})),x.waitFor(i)}removeMatchingKeysForTargetId(t,e){return this.A_.s_(e),x.resolve()}getMatchingKeysForTargetId(t,e){const r=this.A_.o_(e);return x.resolve(r)}containsKey(t,e){return x.resolve(this.A_.containsKey(e))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tf{constructor(t,e){this.d_={},this.overlays={},this.f_=new Oo(0),this.m_=!1,this.m_=!0,this.p_=new f8,this.referenceDelegate=t(this),this.g_=new g8(this),this.indexManager=new r8,this.remoteDocumentCache=(function(s){return new p8(s)})((r=>this.referenceDelegate.y_(r))),this.serializer=new e8(e),this.w_=new l8(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.m_=!1,Promise.resolve()}get started(){return this.m_}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new h8,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let r=this.d_[t.toKey()];return r||(r=new d8(e,this.referenceDelegate),this.d_[t.toKey()]=r),r}getGlobalsCache(){return this.p_}getTargetCache(){return this.g_}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.w_}runTransaction(t,e,r){q("MemoryPersistence","Starting transaction:",t);const s=new _8(this.f_.next());return this.referenceDelegate.b_(),r(s).next((i=>this.referenceDelegate.v_(s).next((()=>i)))).toPromise().then((i=>(s.raiseOnCommittedEvent(),i)))}S_(t,e){return x.or(Object.values(this.d_).map((r=>()=>r.containsKey(t,e))))}}class _8 extends G4{constructor(t){super(),this.currentSequenceNumber=t}}class su{constructor(t){this.persistence=t,this.D_=new ru,this.x_=null}static C_(t){return new su(t)}get F_(){if(this.x_)return this.x_;throw z(60996)}addReference(t,e,r){return this.D_.addReference(r,e),this.F_.delete(r.toString()),x.resolve()}removeReference(t,e,r){return this.D_.removeReference(r,e),this.F_.add(r.toString()),x.resolve()}markPotentiallyOrphaned(t,e){return this.F_.add(e.toString()),x.resolve()}removeTarget(t,e){this.D_.s_(e.targetId).forEach((s=>this.F_.add(s.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(t,e.targetId).next((s=>{s.forEach((i=>this.F_.add(i.toString())))})).next((()=>r.removeTargetData(t,e)))}b_(){this.x_=new Set}v_(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return x.forEach(this.F_,(r=>{const s=G.fromPath(r);return this.O_(t,s).next((i=>{i||e.removeEntry(s,J.min())}))})).next((()=>(this.x_=null,e.apply(t))))}updateLimboDocument(t,e){return this.O_(t,e).next((r=>{r?this.F_.delete(e.toString()):this.F_.add(e.toString())}))}y_(t){return 0}O_(t,e){return x.or([()=>x.resolve(this.D_.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.S_(t,e)])}}class yo{constructor(t,e){this.persistence=t,this.M_=new dr((r=>Y4(r.path)),((r,s)=>r.isEqual(s))),this.garbageCollector=g9(this,e)}static C_(t,e){return new yo(t,e)}b_(){}v_(t){return x.resolve()}forEachTarget(t,e){return this.persistence.getTargetCache().forEachTarget(t,e)}lr(t){const e=this.Ls(t);return this.persistence.getTargetCache().getTargetCount(t).next((r=>e.next((s=>r+s))))}Ls(t){let e=0;return this.Er(t,(r=>{e++})).next((()=>e))}Er(t,e){return x.forEach(this.M_,((r,s)=>this.Us(t,r,s).next((i=>i?x.resolve():e(s)))))}removeTargets(t,e,r){return this.persistence.getTargetCache().removeTargets(t,e,r)}removeOrphanedDocuments(t,e){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.P_(t,(o=>this.Us(t,o,e).next((u=>{u||(r++,i.removeEntry(o,J.min()))})))).next((()=>i.apply(t))).next((()=>r))}markPotentiallyOrphaned(t,e){return this.M_.set(e,t.currentSequenceNumber),x.resolve()}removeTarget(t,e){const r=e.withSequenceNumber(t.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(t,r)}addReference(t,e,r){return this.M_.set(r,t.currentSequenceNumber),x.resolve()}removeReference(t,e,r){return this.M_.set(r,t.currentSequenceNumber),x.resolve()}updateLimboDocument(t,e){return this.M_.set(e,t.currentSequenceNumber),x.resolve()}y_(t){let e=t.key.toString().length;return t.isFoundDocument()&&(e+=ji(t.data.value)),e}Us(t,e,r){return x.or([()=>this.persistence.S_(t,e),()=>this.persistence.getTargetCache().containsKey(t,e),()=>{const s=this.M_.get(e);return x.resolve(s!==void 0&&s>r)}])}getCacheSize(t){return this.persistence.getRemoteDocumentCache().getSize(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iu{constructor(t,e,r,s){this.targetId=t,this.fromCache=e,this.wo=r,this.bo=s}static vo(t,e){let r=it(),s=it();for(const i of e.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new iu(t,e.fromCache,r,s)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function E8(n,t){return G.comparator(n.key,t.key)}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class y8{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class T8{constructor(){this.So=!1,this.Do=!1,this.xo=100,this.Co=(function(){return Ud()?8:z4(Kt())>0?6:4})()}initialize(t,e){this.Fo=t,this.indexManager=e,this.So=!0}getDocumentsMatchingQuery(t,e,r,s){const i={result:null};return this.Oo(t,e).next((o=>{i.result=o})).next((()=>{if(!i.result)return this.Mo(t,e,s,r).next((o=>{i.result=o}))})).next((()=>{if(i.result)return;const o=new y8;return this.No(t,e,o).next((u=>{if(i.result=u,this.Do)return this.Lo(t,e,o,u.size)}))})).next((()=>i.result))}Lo(t,e,r,s){return Lt(e)?x.resolve():r.documentReadCount<this.xo?(Tr()<=at.DEBUG&&q("QueryEngine","SDK will not create cache indexes for query:",vs(e),"since it only creates cache indexes for collection contains","more than or equal to",this.xo,"documents"),x.resolve()):(Tr()<=at.DEBUG&&q("QueryEngine","Query:",vs(e),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.Co*s?(Tr()<=at.DEBUG&&q("QueryEngine","The SDK decides to create cache indexes for query:",vs(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,xe(e))):x.resolve())}Oo(t,e){if(Lt(e))return x.resolve(null);let r=e;if(Wl(r))return x.resolve(null);let s=xe(r);return this.indexManager.getIndexType(t,s).next((i=>i===0?null:(r.limit!==null&&i===1&&(r=po(r,null,"F"),s=xe(r)),this.indexManager.getDocumentsMatchingTarget(t,s).next((o=>{const u=it(...o);return this.Fo.getDocuments(t,u).next((c=>this.indexManager.getMinOffset(t,s).next((h=>{const p=this.Bo(r,c);return this.Uo(r,p,u,h.readTime)?this.Oo(t,po(r,null,"F")):this.ko(t,p,r,h)}))))})))))}Mo(t,e,r,s){return(Lt(e)?(function(o){for(const u of o.stages){if(u instanceof cr||u instanceof uh)return!1;if(u instanceof Wo){if(u.condition instanceof U6&&u.condition._expr.name==="exists"&&u.condition._expr.params[0]instanceof $r&&u.condition._expr.params[0].fieldName===Ne)continue;return!1}}return!0})(e):Wl(e))||s.isEqual(J.min())?x.resolve(null):this.Fo.getDocuments(t,r).next((i=>{const o=this.Bo(e,i);return this.Uo(e,o,r,s)?x.resolve(null):(Tr()<=at.DEBUG&&q("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),ch(e)),this.ko(t,o,e,q4(s,xs)).next((u=>u)))}))}Bo(t,e){let r,s;return Lt(t)?(r=new Ot(E8),s=i=>Xo(t,i)):(r=new Ot(M1(t)),s=i=>Fo(t,i)),e.forEach(((i,o)=>{s(o)&&(r=r.add(o))})),r}Uo(t,e,r,s){if(Lt(t))return(function(u){return u.stages.some((c=>c instanceof cr||c instanceof uh))})(t);if(t.limit===null)return!1;if(r.size!==e.size)return!0;const i=t.limitType==="F"?e.last():e.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}No(t,e,r){return Tr()<=at.DEBUG&&q("QueryEngine","Using full collection scan to execute query:",ch(e)),this.Fo.getDocumentsMatchingQuery(t,e,bn.min(),r)}ko(t,e,r,s){return this.Fo.getDocumentsMatchingQuery(t,r,s).next((i=>(e.forEach((o=>{i=i.insert(o.key,o)})),i)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ou="LocalStore",w8=3e8;class I8{constructor(t,e,r,s){this.persistence=t,this.qo=e,this.serializer=s,this.$o=new Et(ot),this.Ko=new dr((i=>X6(i)),J6),this.Wo=new Map,this.Qo=t.getRemoteDocumentCache(),this.g_=t.getTargetCache(),this.w_=t.getBundleCache(),this.Go(r)}Go(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new c8(this.Qo,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Qo.setIndexManager(this.indexManager),this.qo.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(e=>t.collect(e,this.$o)))}}function A8(n,t,e,r){return new I8(n,t,e,r)}async function ef(n,t){const e=Z(n);return await e.persistence.runTransaction("Handle user change","readonly",(r=>{let s;return e.mutationQueue.getAllMutationBatches(r).next((i=>(s=i,e.Go(t),e.mutationQueue.getAllMutationBatches(r)))).next((i=>{const o=[],u=[];let c=it();for(const h of s){o.push(h.batchId);for(const p of h.mutations)c=c.add(p.key)}for(const h of i){u.push(h.batchId);for(const p of h.mutations)c=c.add(p.key)}return e.localDocuments.getDocuments(r,c).next((h=>({zo:h,removedBatchIds:o,addedBatchIds:u})))}))}))}function R8(n,t){const e=Z(n);return e.persistence.runTransaction("Acknowledge batch","readwrite-primary",(r=>{const s=t.batch.keys(),i=e.Qo.newChangeBuffer({trackRemovals:!0});return(function(u,c,h,p){const m=h.batch,y=m.keys();let C=x.resolve();return y.forEach((P=>{C=C.next((()=>p.getEntry(c,P))).next((L=>{const M=h.docVersions.get(P);H(M!==null,48541),L.version.compareTo(M)<0&&(m.applyToRemoteDocument(L,h),L.isValidDocument()&&(L.setReadTime(h.commitVersion),p.addEntry(L)))}))})),C.next((()=>u.mutationQueue.removeMutationBatch(c,m)))})(e,r,t,i).next((()=>i.apply(r))).next((()=>e.mutationQueue.performConsistencyCheck(r))).next((()=>e.documentOverlayCache.removeOverlaysForBatchId(r,s,t.batch.batchId))).next((()=>e.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,(function(u){let c=it();for(let h=0;h<u.mutationResults.length;++h)u.mutationResults[h].transformResults.length>0&&(c=c.add(u.batch.mutations[h].key));return c})(t)))).next((()=>e.localDocuments.getDocuments(r,s)))}))}function nf(n){const t=Z(n);return t.persistence.runTransaction("Get last remote snapshot version","readonly",(e=>t.g_.getLastRemoteSnapshotVersion(e)))}function v8(n,t){const e=Z(n),r=t.snapshotVersion;let s=e.$o;return e.persistence.runTransaction("Apply remote event","readwrite-primary",(i=>{const o=e.Qo.newChangeBuffer({trackRemovals:!0});s=e.$o;const u=[];t.targetChanges.forEach(((p,m)=>{const y=s.get(m);if(!y)return;u.push(e.g_.removeMatchingKeys(i,p.removedDocuments,m).next((()=>e.g_.addMatchingKeys(i,p.addedDocuments,m))));let C=y.withSequenceNumber(i.currentSequenceNumber);t.targetMismatches.get(m)!==null?C=C.withResumeToken(kt.EMPTY_BYTE_STRING,J.min()).withLastLimboFreeSnapshotVersion(J.min()):p.resumeToken.approximateByteSize()>0&&(C=C.withResumeToken(p.resumeToken,r)),s=s.insert(m,C),(function(L,M,W){return L.resumeToken.approximateByteSize()===0||M.snapshotVersion.toMicroseconds()-L.snapshotVersion.toMicroseconds()>=w8?!0:W.addedDocuments.size+W.modifiedDocuments.size+W.removedDocuments.size>0})(y,C,p)&&u.push(e.g_.updateTargetData(i,C))}));let c=oe(),h=it();if(t.documentUpdates.forEach((p=>{t.resolvedLimboDocuments.has(p)&&u.push(e.persistence.referenceDelegate.updateLimboDocument(i,p))})),u.push(C8(i,o,t.documentUpdates).next((p=>{c=p.jo,h=p.Ho}))),!r.isEqual(J.min())){const p=e.g_.getLastRemoteSnapshotVersion(i).next((m=>e.g_.setTargetsMetadata(i,i.currentSequenceNumber,r)));u.push(p)}return x.waitFor(u).next((()=>o.apply(i))).next((()=>e.localDocuments.getLocalViewOfDocuments(i,c,h))).next((()=>c))})).then((i=>(e.$o=s,i)))}function C8(n,t,e){let r=it(),s=it();return e.forEach((i=>r=r.add(i))),t.getEntries(n,r).next((i=>{let o=oe();return e.forEach(((u,c)=>{const h=i.get(u);c.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(u)),c.isNoDocument()&&c.version.isEqual(J.min())?(t.removeEntry(u,c.readTime),o=o.insert(u,c)):!h.isValidDocument()||c.version.compareTo(h.version)>0||c.version.compareTo(h.version)===0&&h.hasPendingWrites?(t.addEntry(c),o=o.insert(u,c)):q(ou,"Ignoring outdated watch update for ",u,". Current version:",h.version," Watch version:",c.version)})),{jo:o,Ho:s}}))}function S8(n,t){const e=Z(n);return e.persistence.runTransaction("Get next mutation batch","readonly",(r=>(t===void 0&&(t=D1),e.mutationQueue.getNextMutationBatchAfterBatchId(r,t))))}function P8(n,t){const e=Z(n);return e.persistence.runTransaction("Allocate target","readwrite",(r=>{let s;return e.g_.getTargetData(r,t).next((i=>i?(s=i,x.resolve(s)):e.g_.allocateTargetId(r).next((o=>(s=new Ge(t,o,"TargetPurposeListen",r.currentSequenceNumber),e.g_.addTargetData(r,s).next((()=>s)))))))})).then((r=>{const s=e.$o.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(e.$o=e.$o.insert(r.targetId,r),e.Ko.set(t,r.targetId)),r}))}async function h1(n,t,e){const r=Z(n),s=r.$o.get(t),i=e?"readwrite":"readwrite-primary";try{e||await r.persistence.runTransaction("Release target",i,(o=>r.persistence.referenceDelegate.removeTarget(o,s)))}catch(o){if(!Br(o))throw o;q(ou,`Failed to update sequence numbers for target ${t}: ${o}`)}r.$o=r.$o.remove(t),r.Ko.delete(s.target)}function lh(n,t,e){const r=Z(n);let s=J.min(),i=it();return r.persistence.runTransaction("Execute query","readwrite",(o=>(function(c,h,p){const m=Z(c),y=m.Ko.get(p);return y!==void 0?x.resolve(m.$o.get(y)):m.g_.getTargetData(h,p)})(r,o,Lt(t)?t:xe(t)).next((u=>{if(u)return s=u.lastLimboFreeSnapshotVersion,r.g_.getMatchingKeysForTargetId(o,u.targetId).next((c=>{i=c}))})).next((()=>r.qo.getDocumentsMatchingQuery(o,t,e?s:J.min(),e?i:it()))).next((u=>(b8(r,u),{documents:u,Jo:i})))))}function b8(n,t){t.forEach(((e,r)=>{const s=r.key.getCollectionGroup(),i=n.Wo.get(s)||J.min();r.readTime.compareTo(i)>0&&n.Wo.set(s,r.readTime)}))}class hh{constructor(){this.activeTargetIds=k3()}na(t){this.activeTargetIds=this.activeTargetIds.add(t)}ra(t){this.activeTargetIds=this.activeTargetIds.delete(t)}ta(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class N8{constructor(){this.Ua=new hh,this.ka={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,r){}addLocalQueryTarget(t,e=!0){return e&&this.Ua.na(t),this.ka[t]||"not-current"}updateQueryState(t,e,r){this.ka[t]=e}removeLocalQueryTarget(t){this.Ua.ra(t)}isLocalQueryTarget(t){return this.Ua.activeTargetIds.has(t)}clearQueryState(t){delete this.ka[t]}getAllActiveQueryTargets(){return this.Ua.activeTargetIds}isActiveQueryTarget(t){return this.Ua.activeTargetIds.has(t)}start(){return this.Ua=new hh,Promise.resolve()}handleUserChange(t,e,r){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}function Ba(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O8{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.qa=0,this.$a=null,this.Ka=!0}Wa(){this.qa===0&&(this.Qa("Unknown"),this.$a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this.$a=null,this.Ga("Backend didn't respond within 10 seconds."),this.Qa("Offline"),Promise.resolve()))))}za(t){this.state==="Online"?this.Qa("Unknown"):(this.qa++,this.qa>=1&&(this.ja(),this.Ga(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.Qa("Offline")))}set(t){this.ja(),this.qa=0,t==="Online"&&(this.Ka=!1),this.Qa(t)}Qa(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}Ga(t){const e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.Ka?(Je(e),this.Ka=!1):q("OnlineStateTracker",e)}ja(){this.$a!==null&&(this.$a.cancel(),this.$a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fe="RemoteStore";class k8{constructor(t,e,r,s,i){this.localStore=t,this.datastore=e,this.asyncQueue=r,this.remoteSyncer={},this.Ha=[],this.Ja=new Map,this.Ya=new Map,this.Za=new Map,this.Xa=new Mn(1e3),this.eu=new Mn(1001),this.tu=new Set,this.nu=[],this.ru=i,this.ru.bt((o=>{r.enqueueAndForget((async()=>{mr(this)&&(q(Fe,"Restarting streams for network reachability change."),await(async function(c){const h=Z(c);h.tu.add(4),await li(h),h.iu.set("Unknown"),h.tu.delete(4),await Jo(h)})(this))}))})),this.iu=new O8(r,s)}}async function Jo(n){if(mr(n))for(const t of n.nu)await t(!0)}async function li(n){for(const t of n.nu)await t(!1)}function f1(n,t){return n.Ya.get(t)||void 0}function rf(n,t){const e=Z(n),r=f1(e,t.targetId);if(r!==void 0&&e.Ja.has(r))return;const s=(function(u,c){const h=f1(u,c);h!==void 0&&u.Za.delete(h);const p=(function(y,C){return C%2!=0?y.eu.next():y.Xa.next()})(u,c);return u.Ya.set(c,p),u.Za.set(p,c),p})(e,t.targetId);q(Fe,"remoteStoreListen mapping SDK target ID to remote",t.targetId,s);const i=new Ge(t.target,s,t.purpose,t.sequenceNumber,t.snapshotVersion,t.lastLimboFreeSnapshotVersion,t.resumeToken);e.Ja.set(s,i),lu(e)?cu(e):zr(e).Fn()&&uu(e,i)}function au(n,t){const e=Z(n),r=zr(e),s=f1(e,t);q(Fe,"remoteStoreUnlisten removing mapping of SDK target ID to remote",t,s),e.Ja.delete(s),e.Ya.delete(t),e.Za.delete(s),r.Fn()&&sf(e,s),e.Ja.size===0&&(r.Fn()?r.Nn():mr(e)&&e.iu.set("Unknown"))}function uu(n,t){if(n.su.We(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(J.min())>0){const e=n.Za.get(t.targetId);if(e===void 0)return void q(Fe,"SDK target ID not found for remote ID: "+t.targetId);const r=n.remoteSyncer.getRemoteKeysForTarget(e).size;t=t.withExpectedCount(r)}zr(n).jn(t)}function sf(n,t){n.su.We(t),zr(n).Hn(t)}function cu(n){n.su=new x3({getRemoteKeysForTarget:t=>{const e=n.Za.get(t);return e!==void 0?n.remoteSyncer.getRemoteKeysForTarget(e):it()},dt:t=>n.Ja.get(t)||null,Tt:()=>n.datastore.serializer.databaseId}),zr(n).start(),n.iu.Wa()}function lu(n){return mr(n)&&!zr(n).Cn()&&n.Ja.size>0}function mr(n){return Z(n).tu.size===0}function of(n){n.su=void 0}async function D8(n){n.iu.set("Online")}async function V8(n){n.Ja.forEach(((t,e)=>{uu(n,t)}))}async function x8(n,t){of(n),lu(n)?(n.iu.za(t),cu(n)):n.iu.set("Unknown")}async function L8(n,t,e){if(n.iu.set("Online"),t instanceof p6&&t.state===2&&t.cause)try{await(async function(s,i){const o=i.cause;for(const u of i.targetIds){if(s.Ja.has(u)){const c=s.Za.get(u);c!==void 0&&(await s.remoteSyncer.rejectListen(c,o),s.Ya.delete(c),s.Za.delete(u)),s.Ja.delete(u)}s.su.removeTarget(u)}})(n,t)}catch(r){q(Fe,"Failed to remove targets %s: %s ",t.targetIds.join(","),r),await To(n,r)}else if(t instanceof zi?n.su.et(t):t instanceof d6?n.su.ot(t):n.su.rt(t),!e.isEqual(J.min()))try{const r=await nf(n.localStore);e.compareTo(r)>=0&&await(function(i,o){const u=i.su.Rt(o);u.targetChanges.forEach(((h,p)=>{if(h.resumeToken.approximateByteSize()>0){const m=i.Ja.get(p);m&&i.Ja.set(p,m.withResumeToken(h.resumeToken,o))}})),u.targetMismatches.forEach(((h,p)=>{const m=i.Ja.get(h);if(!m)return;i.Ja.set(h,m.withResumeToken(kt.EMPTY_BYTE_STRING,m.snapshotVersion)),sf(i,h);const y=new Ge(m.target,h,p,m.sequenceNumber);uu(i,y)}));const c=(function(p,m){const y=new Map;m.targetChanges.forEach(((P,L)=>{const M=p.Za.get(L);M!==void 0&&y.set(M,P)}));let C=new Et(ot);return m.targetMismatches.forEach(((P,L)=>{const M=p.Za.get(P);M!==void 0&&(C=C.insert(M,L))})),new oi(m.snapshotVersion,y,C,m.documentUpdates,m.augmentedDocumentUpdates,m.resolvedLimboDocuments)})(i,u);return i.remoteSyncer.applyRemoteEvent(c)})(n,e)}catch(r){q(Fe,"Failed to raise snapshot:",r),await To(n,r)}}async function To(n,t,e){if(!Br(t))throw t;n.tu.add(1),await li(n),n.iu.set("Offline"),e||(e=()=>nf(n.localStore)),n.asyncQueue.enqueueRetryable((async()=>{q(Fe,"Retrying IndexedDB access"),await e(),n.tu.delete(1),await Jo(n)}))}function af(n,t){return t().catch((e=>To(n,e,t)))}async function Zo(n){const t=Z(n),e=Un(t);let r=t.Ha.length>0?t.Ha[t.Ha.length-1].batchId:D1;for(;M8(t);)try{const s=await S8(t.localStore,r);if(s===null){t.Ha.length===0&&e.Nn();break}r=s.batchId,U8(t,s)}catch(s){await To(t,s)}uf(t)&&cf(t)}function M8(n){return mr(n)&&n.Ha.length<10}function U8(n,t){n.Ha.push(t);const e=Un(n);e.Fn()&&e.Jn&&e.Yn(t.mutations)}function uf(n){return mr(n)&&!Un(n).Cn()&&n.Ha.length>0}function cf(n){Un(n).start()}async function F8(n){Un(n).er()}async function B8(n){const t=Un(n);for(const e of n.Ha)t.Yn(e.mutations)}async function q8(n,t,e){const r=n.Ha.shift(),s=nu.from(r,t,e);await af(n,(()=>n.remoteSyncer.applySuccessfulWrite(s))),await Zo(n)}async function $8(n,t){t&&Un(n).Jn&&await(async function(r,s){if((function(o){return S3(o)&&o!==V.ABORTED})(s.code)){const i=r.Ha.shift();Un(r).Mn(),await af(r,(()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s))),await Zo(r)}})(n,t),uf(n)&&cf(n)}async function fh(n,t){const e=Z(n);e.asyncQueue.verifyOperationInProgress(),q(Fe,"RemoteStore received new credentials");const r=mr(e);e.tu.add(3),await li(e),r&&e.iu.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.tu.delete(3),await Jo(e)}async function H8(n,t){const e=Z(n);t?(e.tu.delete(2),await Jo(e)):t||(e.tu.add(2),await li(e),e.iu.set("Unknown"))}function zr(n){return n._u||(n._u=(function(e,r,s){const i=Z(e);return i.nr(),new i9(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{Qt:D8.bind(null,n),zt:V8.bind(null,n),Ht:x8.bind(null,n),zn:L8.bind(null,n)}),n.nu.push((async t=>{t?(n._u.Mn(),lu(n)?cu(n):n.iu.set("Unknown")):(await n._u.stop(),of(n))}))),n._u}function Un(n){return n.ou||(n.ou=(function(e,r,s){const i=Z(e);return i.nr(),new o9(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{Qt:()=>Promise.resolve(),zt:F8.bind(null,n),Ht:$8.bind(null,n),Zn:B8.bind(null,n),Xn:q8.bind(null,n)}),n.nu.push((async t=>{t?(n.ou.Mn(),await Zo(n)):(await n.ou.stop(),n.Ha.length>0&&(q(Fe,`Stopping write stream with ${n.Ha.length} pending writes`),n.Ha=[]))}))),n.ou}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hu{constructor(t,e,r,s,i){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new We,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((o=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(t,e,r,s,i){const o=Date.now()+r,u=new hu(t,e,o,s,i);return u.start(r),u}start(t){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new B(V.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((t=>this.deferred.resolve(t)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function fu(n,t){if(Je("AsyncQueue",`${t}: ${n}`),Br(n))return new B(V.UNAVAILABLE,`${t}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tr{static emptySet(t){return new tr(t.comparator)}constructor(t){this.comparator=t?(e,r)=>t(e,r)||G.comparator(e.key,r.key):(e,r)=>G.comparator(e.key,r.key),this.keyedMap=wr(),this.sortedSet=new Et(this.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal(((e,r)=>(t(e),!1)))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof tr)||this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),r=t.sortedSet.getIterator();for(;e.hasNext();){const s=e.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const t=[];return this.forEach((e=>{t.push(e.toString())})),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,e){const r=new tr;return r.comparator=this.comparator,r.keyedMap=t,r.sortedSet=e,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dh{constructor(){this.au=new Et(G.comparator)}track(t){const e=t.doc.key,r=this.au.get(e);r?t.type!==0&&r.type===3?this.au=this.au.insert(e,t):t.type===3&&r.type!==1?this.au=this.au.insert(e,{type:r.type,doc:t.doc}):t.type===2&&r.type===2?this.au=this.au.insert(e,{type:2,doc:t.doc}):t.type===2&&r.type===0?this.au=this.au.insert(e,{type:0,doc:t.doc}):t.type===1&&r.type===0?this.au=this.au.remove(e):t.type===1&&r.type===2?this.au=this.au.insert(e,{type:1,doc:r.doc}):t.type===0&&r.type===1?this.au=this.au.insert(e,{type:2,doc:t.doc}):z(63341,{ft:t,uu:r}):this.au=this.au.insert(e,t)}cu(){const t=[];return this.au.inorderTraversal(((e,r)=>{t.push(r)})),t}}class Lr{constructor(t,e,r,s,i,o,u,c,h){this.query=t,this.docs=e,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=u,this.excludesMetadataChanges=c,this.hasCachedResults=h}static fromInitialDocuments(t,e,r,s,i){const o=[];return e.forEach((u=>{o.push({type:0,doc:u})})),new Lr(t,e,tr.emptySet(e),o,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&Qo(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,r=t.docChanges;if(e.length!==r.length)return!1;for(let s=0;s<e.length;s++)if(e[s].type!==r[s].type||!e[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j8{constructor(){this.lu=void 0,this.Eu=[]}hu(){return this.Eu.some((t=>t.Tu()))}}class G8{constructor(){this.queries=ph(),this.onlineState="Unknown",this.Pu=new Set}terminate(){(function(e,r){const s=Z(e),i=s.queries;s.queries=ph(),i.forEach(((o,u)=>{for(const c of u.Eu)c.onError(r)}))})(this,new B(V.ABORTED,"Firestore shutting down"))}}function ph(){return new dr((n=>Q6(n)),Qo)}async function du(n,t){const e=Z(n);let r=3;const s=t.query;let i=e.queries.get(s);i?!i.hu()&&t.Tu()&&(r=2):(i=new j8,r=t.Tu()?0:1);try{switch(r){case 0:i.lu=await e.onListen(s,!0);break;case 1:i.lu=await e.onListen(s,!1);break;case 2:await e.onFirstRemoteStoreListen(s)}}catch(o){const u=fu(o,`Initialization of query '${Lt(t.query)?Ke(t.query):vs(t.query)}' failed`);return void t.onError(u)}e.queries.set(s,i),i.Eu.push(t),t.Ru(e.onlineState),i.lu&&t.Iu(i.lu)&&mu(e)}async function pu(n,t){const e=Z(n),r=t.query;let s=3;const i=e.queries.get(r);if(i){const o=i.Eu.indexOf(t);o>=0&&(i.Eu.splice(o,1),i.Eu.length===0?s=t.Tu()?0:1:!i.hu()&&t.Tu()&&(s=2))}switch(s){case 0:return e.queries.delete(r),e.onUnlisten(r,!0);case 1:return e.queries.delete(r),e.onUnlisten(r,!1);case 2:return e.onLastRemoteStoreUnlisten(r);default:return}}function z8(n,t){const e=Z(n);let r=!1;for(const s of t){const i=s.query,o=e.queries.get(i);if(o){for(const u of o.Eu)u.Iu(s)&&(r=!0);o.lu=s}}r&&mu(e)}function W8(n,t,e){const r=Z(n),s=r.queries.get(t);if(s)for(const i of s.Eu)i.onError(e);r.queries.delete(t)}function mu(n){n.Pu.forEach((t=>{t.next()}))}var d1;(function(n){n.Default="default",n.Cache="cache"})(d1||(d1={}));class gu{constructor(t,e,r){this.query=t,this.Au=e,this.Vu=!1,this.du=null,this.onlineState="Unknown",this.options=r||{}}Iu(t){if(!this.options.includeMetadataChanges){const r=[];for(const s of t.docChanges)s.type!==3&&r.push(s);t=new Lr(t.query,t.docs,t.oldDocs,r,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.Vu?this.fu(t)&&(this.Au.next(t),e=!0):this.mu(t,this.onlineState)&&(this.pu(t),e=!0),this.du=t,e}onError(t){this.Au.error(t)}Ru(t){this.onlineState=t;let e=!1;return this.du&&!this.Vu&&this.mu(this.du,t)&&(this.pu(this.du),e=!0),e}mu(t,e){if(!t.fromCache||!this.Tu())return!0;const r=e!=="Offline";return(!this.options.waitForSyncWhenOnline||!r)&&(!t.docs.isEmpty()||t.hasCachedResults||e==="Offline")}fu(t){if(t.docChanges.length>0)return!0;const e=this.du&&this.du.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&this.options.includeMetadataChanges===!0}pu(t){t=Lr.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.Vu=!0,this.Au.next(t)}Tu(){return this.options.source!==d1.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lf{constructor(t){this.key=t}}class hf{constructor(t){this.key=t}}class K8{constructor(t,e){this.query=t,this.Ou=e,this.Mu=null,this.hasCachedResults=!1,this.current=!1,this.Nu=it(),this.mutatedKeys=it(),this.Lu=Lt(t)?l1(t):M1(t),this.Bu=new tr(this.Lu)}get Uu(){return this.Ou}ku(t,e){const r=e?e.qu:new dh,s=e?e.Bu:this.Bu;let i=e?e.mutatedKeys:this.mutatedKeys,o=s,u=!1;const[c,h]=this.$u(this.query,s);t.inorderTraversal(((m,y)=>{const C=s.get(m),P=i8(this.query,y)?y:null,L=!!C&&this.mutatedKeys.has(C.key),M=!!P&&(P.hasLocalMutations||this.mutatedKeys.has(P.key)&&P.hasCommittedMutations);let W=!1;C&&P?C.data.isEqual(P.data)?L!==M&&(r.track({type:3,doc:P}),W=!0):this.Ku(C,P)||(r.track({type:2,doc:P}),W=!0,(c&&this.Lu(P,c)>0||h&&this.Lu(P,h)<0)&&(u=!0)):!C&&P?(r.track({type:0,doc:P}),W=!0):C&&!P&&(r.track({type:1,doc:C}),W=!0,(c||h)&&(u=!0)),W&&(P?(o=o.add(P),i=M?i.add(m):i.delete(m)):(o=o.delete(m),i=i.delete(m)))}));const p=this.Wu(this.query);if(p)if(Lt(this.query)){const m=[];o.forEach((P=>m.push(P)));const y=Z6(this.query,m);let C=new tr(l1(this.query));for(const P of y)C=C.add(P);o.forEach((P=>{C.has(P.key)||(i=i.delete(P.key),r.track({type:1,doc:P}))})),o=C}else{const m=this.Qu(this.query);for(;o.size>p;){const y=m==="F"?o.last():o.first();o=o.delete(y.key),i=i.delete(y.key),r.track({type:1,doc:y})}}return{Bu:o,qu:r,Uo:u,mutatedKeys:i}}Wu(t){var e;return Lt(t)?(e=Fa(t))==null?void 0:e.limit:t.limit||void 0}Qu(t){if(Lt(t)){const e=Fa(t);return e&&e.limit<0?"L":"F"}return t.limitType}$u(t,e){var r;if(Lt(t)){const s=(r=Fa(t))==null?void 0:r.limit;return[e.size===s?e.last():null,null]}return[t.limitType==="F"&&e.size===this.Wu(this.query)?e.last():null,t.limitType==="L"&&e.size===this.Wu(this.query)?e.first():null]}Ku(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,r,s){const i=this.Bu;this.Bu=t.Bu,this.mutatedKeys=t.mutatedKeys;const o=t.qu.cu();o.sort(((p,m)=>(function(C,P){const L=M=>{switch(M){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return z(20277,{ft:M})}};return L(C)-L(P)})(p.type,m.type)||this.Lu(p.doc,m.doc))),this.Gu(r),s=s??!1;const u=e&&!s?this.zu():[],c=this.Nu.size===0&&this.current&&!s?1:0,h=c!==this.Mu;return this.Mu=c,o.length!==0||h?{snapshot:new Lr(this.query,t.Bu,i,o,t.mutatedKeys,c===0,h,!1,!!r&&r.resumeToken.approximateByteSize()>0),ju:u}:{ju:u}}Ru(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({Bu:this.Bu,qu:new dh,mutatedKeys:this.mutatedKeys,Uo:!1},!1)):{ju:[]}}Hu(t){return!this.Ou.has(t)&&!!this.Bu.has(t)&&!this.Bu.get(t).hasLocalMutations}Gu(t){t&&(t.addedDocuments.forEach((e=>this.Ou=this.Ou.add(e))),t.modifiedDocuments.forEach((e=>{})),t.removedDocuments.forEach((e=>this.Ou=this.Ou.delete(e))),this.current=t.current)}zu(){if(!this.current)return[];const t=this.Nu;this.Nu=it(),this.Bu.forEach((r=>{this.Hu(r.key)&&(this.Nu=this.Nu.add(r.key))}));const e=[];return t.forEach((r=>{this.Nu.has(r)||e.push(new hf(r))})),this.Nu.forEach((r=>{t.has(r)||e.push(new lf(r))})),e}Ju(t){this.Ou=t.Jo,this.Nu=it();const e=this.ku(t.documents);return this.applyChanges(e,!0)}Yu(){return Lr.fromInitialDocuments(this.query,this.Bu,this.mutatedKeys,this.Mu===0,this.hasCachedResults)}}const _u="SyncEngine";class Y8{constructor(t,e,r){this.query=t,this.targetId=e,this.view=r}}class Q8{constructor(t){this.key=t,this.Zu=!1}}class X8{constructor(t,e,r,s,i,o){this.localStore=t,this.remoteStore=e,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Xu={},this.ec=new dr((u=>Q6(u)),Qo),this.tc=new Map,this.nc=new Set,this.rc=new Et(G.comparator),this.sc=new Map,this._c=new ru,this.oc={},this.ac=new Map,this.uc=Mn.Cs(),this.onlineState="Unknown",this.cc=void 0}get isPrimaryClient(){return this.cc===!0}}async function J8(n,t,e=!0){const r=_f(n);let s;const i=r.ec.get(t);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Yu()):s=await ff(r,t,e,!0),s}async function Z8(n,t){const e=_f(n);await ff(e,t,!0,!1)}async function ff(n,t,e,r){const s=await P8(n.localStore,Lt(t)?t:xe(t)),i=s.targetId,o=n.sharedClientState.addLocalQueryTarget(i,e);let u;return r&&(u=await tg(n,t,i,o==="current",s.resumeToken)),n.isPrimaryClient&&e&&rf(n.remoteStore,s),u}async function tg(n,t,e,r,s){n.lc=(m,y,C)=>(async function(L,M,W,et){let st=M.view.ku(W);st.Uo&&(st=await lh(L.localStore,M.query,!1).then((({documents:R})=>M.view.ku(R,st))));const ht=et&&et.targetChanges.get(M.targetId),yt=et&&et.targetMismatches.get(M.targetId)!=null,Tt=M.view.applyChanges(st,L.isPrimaryClient,ht,yt);return gh(L,M.targetId,Tt.ju),Tt.snapshot})(n,m,y,C);const i=await lh(n.localStore,t,!0),o=new K8(t,i.Jo),u=o.ku(i.documents),c=ai.createSynthesizedTargetChangeForCurrentChange(e,r&&n.onlineState!=="Offline",s),h=o.applyChanges(u,n.isPrimaryClient,c);gh(n,e,h.ju);const p=new Y8(t,e,o);return n.ec.set(t,p),n.tc.has(e)?n.tc.get(e).push(t):n.tc.set(e,[t]),h.snapshot}async function eg(n,t,e){const r=Z(n),s=r.ec.get(t),i=r.tc.get(s.targetId);if(i.length>1)return r.tc.set(s.targetId,i.filter((o=>!Qo(o,t)))),void r.ec.delete(t);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await h1(r.localStore,s.targetId,!1).then((()=>{r.sharedClientState.clearQueryState(s.targetId),e&&au(r.remoteStore,s.targetId),p1(r,s.targetId)})).catch(Fr)):(p1(r,s.targetId),await h1(r.localStore,s.targetId,!0))}async function ng(n,t){const e=Z(n),r=e.ec.get(t),s=e.tc.get(r.targetId);e.isPrimaryClient&&s.length===1&&(e.sharedClientState.removeLocalQueryTarget(r.targetId),au(e.remoteStore,r.targetId))}async function rg(n,t,e){const r=lg(n);try{const s=await(function(o,u){const c=Z(o),h=mt.now(),p=u.reduce(((C,P)=>C.add(P.key)),it());let m,y;return c.persistence.runTransaction("Locally write mutations","readwrite",(C=>{let P=oe(),L=it();return c.Qo.getEntries(C,p).next((M=>{P=M,P.forEach(((W,et)=>{et.isValidDocument()||(L=L.add(W))}))})).next((()=>c.localDocuments.getOverlayedDocuments(C,P))).next((M=>{m=M;const W=[];for(const et of u){const st=u3(et,m.get(et.key).overlayedDocument);st!=null&&W.push(new $n(et.key,st,G2(st.value.mapValue),ye.exists(!0)))}return c.mutationQueue.addMutationBatch(C,h,W,u)})).next((M=>{y=M;const W=M.applyToLocalDocumentSet(m,L);return c.documentOverlayCache.saveOverlays(C,M.batchId,W)}))})).then((()=>({batchId:y.batchId,changes:h6(m)})))})(r.localStore,t);r.sharedClientState.addPendingMutation(s.batchId),(function(o,u,c){let h=o.oc[o.currentUser.toKey()];h||(h=new Et(ot)),h=h.insert(u,c),o.oc[o.currentUser.toKey()]=h})(r,s.batchId,e),await hi(r,s.changes),await Zo(r.remoteStore)}catch(s){const i=fu(s,"Failed to persist write");e.reject(i)}}async function df(n,t){const e=Z(n);try{const r=await v8(e.localStore,t);t.targetChanges.forEach(((s,i)=>{const o=e.sc.get(i);o&&(H(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?o.Zu=!0:s.modifiedDocuments.size>0?H(o.Zu,14607):s.removedDocuments.size>0&&(H(o.Zu,42227),o.Zu=!1))})),await hi(e,r,t)}catch(r){await Fr(r)}}function mh(n,t,e){const r=Z(n);if(r.isPrimaryClient&&e===0||!r.isPrimaryClient&&e===1){const s=[];r.ec.forEach(((i,o)=>{const u=o.view.Ru(t);u.snapshot&&s.push(u.snapshot)})),(function(o,u){const c=Z(o);c.onlineState=u;let h=!1;c.queries.forEach(((p,m)=>{for(const y of m.Eu)y.Ru(u)&&(h=!0)})),h&&mu(c)})(r.eventManager,t),s.length&&r.Xu.zn(s),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function sg(n,t,e){const r=Z(n);r.sharedClientState.updateQueryState(t,"rejected",e);const s=r.sc.get(t),i=s&&s.key;if(i){let o=new Et(G.comparator);o=o.insert(i,Wt.newNoDocument(i,J.min()));const u=it().add(i),c=new oi(J.min(),new Map,new Et(ot),o,oe(),u);await df(r,c),r.rc=r.rc.remove(i),r.sc.delete(t),Eu(r)}else await h1(r.localStore,t,!1).then((()=>p1(r,t,e))).catch(Fr)}async function ig(n,t){const e=Z(n),r=t.batch.batchId;try{const s=await R8(e.localStore,t);mf(e,r,null),pf(e,r),e.sharedClientState.updateMutationState(r,"acknowledged"),await hi(e,s)}catch(s){await Fr(s)}}async function og(n,t,e){const r=Z(n);try{const s=await(function(o,u){const c=Z(o);return c.persistence.runTransaction("Reject batch","readwrite-primary",(h=>{let p;return c.mutationQueue.lookupMutationBatch(h,u).next((m=>(H(m!==null,37113),p=m.keys(),c.mutationQueue.removeMutationBatch(h,m)))).next((()=>c.mutationQueue.performConsistencyCheck(h))).next((()=>c.documentOverlayCache.removeOverlaysForBatchId(h,p,u))).next((()=>c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,p))).next((()=>c.localDocuments.getDocuments(h,p)))}))})(r.localStore,t);mf(r,t,e),pf(r,t),r.sharedClientState.updateMutationState(t,"rejected",e),await hi(r,s)}catch(s){await Fr(s)}}function pf(n,t){(n.ac.get(t)||[]).forEach((e=>{e.resolve()})),n.ac.delete(t)}function mf(n,t,e){const r=Z(n);let s=r.oc[r.currentUser.toKey()];if(s){const i=s.get(t);i&&(e?i.reject(e):i.resolve(),s=s.remove(t)),r.oc[r.currentUser.toKey()]=s}}function p1(n,t,e=null){n.sharedClientState.removeLocalQueryTarget(t);for(const r of n.tc.get(t))n.ec.delete(r),e&&n.Xu.Ec(r,e);n.tc.delete(t),n.isPrimaryClient&&n._c.s_(t).forEach((r=>{n._c.containsKey(r)||gf(n,r)}))}function gf(n,t){n.nc.delete(t.path.canonicalString());const e=n.rc.get(t);e!==null&&(au(n.remoteStore,e),n.rc=n.rc.remove(t),n.sc.delete(e),Eu(n))}function gh(n,t,e){for(const r of e)r instanceof lf?(n._c.addReference(r.key,t),ag(n,r)):r instanceof hf?(q(_u,"Document no longer in limbo: "+r.key),n._c.removeReference(r.key,t),n._c.containsKey(r.key)||gf(n,r.key)):z(19791,{hc:r})}function ag(n,t){const e=t.key,r=e.path.canonicalString();n.rc.get(e)||n.nc.has(r)||(q(_u,"New document in limbo: "+e),n.nc.add(r),Eu(n))}function Eu(n){for(;n.nc.size>0&&n.rc.size<n.maxConcurrentLimboResolutions;){const t=n.nc.values().next().value;n.nc.delete(t);const e=new G(lt.fromString(t)),r=n.uc.next();n.sc.set(r,new Q8(e)),n.rc=n.rc.insert(e,r),rf(n.remoteStore,new Ge(xe(Uo(e.path)),r,"TargetPurposeLimboResolution",Oo.ce))}}async function hi(n,t,e){const r=Z(n),s=[],i=[],o=[];r.ec.isEmpty()||(r.ec.forEach(((u,c)=>{o.push(r.lc(c,t,e).then((h=>{var p;if((h||e)&&r.isPrimaryClient){const m=h?!h.fromCache:(p=e==null?void 0:e.targetChanges.get(c.targetId))==null?void 0:p.current;r.sharedClientState.updateQueryState(c.targetId,m?"current":"not-current")}if(h){s.push(h);const m=iu.vo(c.targetId,h);i.push(m)}})))})),await Promise.all(o),r.Xu.zn(s),await(async function(c,h){const p=Z(c);try{await p.persistence.runTransaction("notifyLocalViewChanges","readwrite",(m=>x.forEach(h,(y=>x.forEach(y.wo,(C=>p.persistence.referenceDelegate.addReference(m,y.targetId,C))).next((()=>x.forEach(y.bo,(C=>p.persistence.referenceDelegate.removeReference(m,y.targetId,C)))))))))}catch(m){if(!Br(m))throw m;q(ou,"Failed to update sequence numbers: "+m)}for(const m of h){const y=m.targetId;if(!m.fromCache){const C=p.$o.get(y),P=C.snapshotVersion,L=C.withLastLimboFreeSnapshotVersion(P);p.$o=p.$o.insert(y,L)}}})(r.localStore,i))}async function ug(n,t){const e=Z(n);if(!e.currentUser.isEqual(t)){q(_u,"User change. New user:",t.toKey());const r=await ef(e.localStore,t);e.currentUser=t,(function(i,o){i.ac.forEach((u=>{u.forEach((c=>{c.reject(new B(V.CANCELLED,o))}))})),i.ac.clear()})(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,r.removedBatchIds,r.addedBatchIds),await hi(e,r.zo)}}function cg(n,t){const e=Z(n),r=e.sc.get(t);if(r&&r.Zu)return it().add(r.key);{let s=it();const i=e.tc.get(t);if(!i)return s;for(const o of i??[]){const u=e.ec.get(o);s=s.unionWith(u.view.Uu)}return s}}function _f(n){const t=Z(n);return t.remoteStore.remoteSyncer.applyRemoteEvent=df.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=cg.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=sg.bind(null,t),t.Xu.zn=z8.bind(null,t.eventManager),t.Xu.Ec=W8.bind(null,t.eventManager),t}function lg(n){const t=Z(n);return t.remoteStore.remoteSyncer.applySuccessfulWrite=ig.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=og.bind(null,t),t}class wo{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=Bo(t.databaseInfo.databaseId),this.sharedClientState=this.Rc(t),this.persistence=this.Ic(t),await this.persistence.start(),this.localStore=this.Ac(t),this.gcScheduler=this.Vc(t,this.localStore),this.indexBackfillerScheduler=this.dc(t,this.localStore)}Vc(t,e){return null}dc(t,e){return null}Ac(t){return A8(this.persistence,new T8,t.initialUser,this.serializer)}Ic(t){return new tf(su.C_,this.serializer)}Rc(t){return new N8}async terminate(){var t,e;(t=this.gcScheduler)==null||t.stop(),(e=this.indexBackfillerScheduler)==null||e.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}wo.provider={build:()=>new wo};class hg extends wo{constructor(t){super(),this.cacheSizeBytes=t}Vc(t,e){H(this.persistence.referenceDelegate instanceof yo,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new p9(r,t.asyncQueue,e)}Ic(t){const e=this.cacheSizeBytes!==void 0?re.withCacheSize(this.cacheSizeBytes):re.DEFAULT;return new tf((r=>yo.C_(r,e)),this.serializer)}}class m1{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>mh(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=ug.bind(null,this.syncEngine),await H8(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return(function(){return new G8})()}createDatastore(t){const e=Bo(t.databaseInfo.databaseId),r=s9(t.databaseInfo);return c9(t.authCredentials,t.appCheckCredentials,r,e)}createRemoteStore(t){return(function(r,s,i,o,u){return new k8(r,s,i,o,u)})(this.localStore,this.datastore,t.asyncQueue,(e=>mh(this.syncEngine,e,0)),(function(){return th.C()?new th:new t9})())}createSyncEngine(t,e){return(function(s,i,o,u,c,h,p){const m=new X8(s,i,o,u,c,h);return p&&(m.cc=!0),m})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){var t,e;await(async function(s){const i=Z(s);q(Fe,"RemoteStore shutting down."),i.tu.add(5),await li(i),i.ru.shutdown(),i.iu.set("Unknown")})(this.remoteStore),(t=this.datastore)==null||t.terminate(),(e=this.eventManager)==null||e.terminate()}}m1.provider={build:()=>new m1};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yu{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.mc(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.mc(this.observer.error,t):Je("Uncaught Error in snapshot listener:",t.toString()))}gc(){this.muted=!0}mc(t,e){setTimeout((()=>{this.muted||t(e)}),0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fn="FirestoreClient";class fg{constructor(t,e,r,s,i){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=r,this._databaseInfo=s,this.user=zt.UNAUTHENTICATED,this.clientId=k1.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,(async o=>{q(Fn,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o})),this.appCheckCredentials.start(r,(o=>(q(Fn,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new We;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const r=fu(e,"Failed to shutdown persistence");t.reject(r)}})),t.promise}}async function qa(n,t){n.asyncQueue.verifyOperationInProgress(),q(Fn,"Initializing OfflineComponentProvider");const e=n.configuration;await t.initialize(e);let r=e.initialUser;n.setCredentialChangeListener((async s=>{r.isEqual(s)||(await ef(t.localStore,s),r=s)})),t.persistence.setDatabaseDeletedListener((()=>n.terminate())),n._offlineComponents=t}async function _h(n,t){n.asyncQueue.verifyOperationInProgress();const e=await dg(n);q(Fn,"Initializing OnlineComponentProvider"),await t.initialize(e,n.configuration),n.setCredentialChangeListener((r=>fh(t.remoteStore,r))),n.setAppCheckTokenChangeListener(((r,s)=>fh(t.remoteStore,s))),n._onlineComponents=t}async function dg(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){q(Fn,"Using user provided OfflineComponentProvider");try{await qa(n,n._uninitializedComponentsProvider._offline)}catch(t){const e=t;if(!(function(s){return s.name==="FirebaseError"?s.code===V.FAILED_PRECONDITION||s.code===V.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(e))throw e;ve("Error using user provided cache. Falling back to memory cache: "+e),await qa(n,new wo)}}else q(Fn,"Using default OfflineComponentProvider"),await qa(n,new hg(void 0));return n._offlineComponents}async function Ef(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(q(Fn,"Using user provided OnlineComponentProvider"),await _h(n,n._uninitializedComponentsProvider._online)):(q(Fn,"Using default OnlineComponentProvider"),await _h(n,new m1))),n._onlineComponents}function pg(n){return Ef(n).then((t=>t.syncEngine))}async function Io(n){const t=await Ef(n),e=t.eventManager;return e.onListen=J8.bind(null,t.syncEngine),e.onUnlisten=eg.bind(null,t.syncEngine),e.onFirstRemoteStoreListen=Z8.bind(null,t.syncEngine),e.onLastRemoteStoreUnlisten=ng.bind(null,t.syncEngine),e}function mg(n,t,e,r){const s=new yu(r),i=new gu(t,s,e);return n.asyncQueue.enqueueAndForget((async()=>du(await Io(n),i))),()=>{s.gc(),n.asyncQueue.enqueueAndForget((async()=>pu(await Io(n),i)))}}function gg(n,t,e={}){const r=new We;return n.asyncQueue.enqueueAndForget((async()=>(function(i,o,u,c,h){const p=new yu({next:y=>{p.gc(),o.enqueueAndForget((()=>pu(i,m)));const C=y.docs.has(u);!C&&y.fromCache?h.reject(new B(V.UNAVAILABLE,"Failed to get document because the client is offline.")):C&&y.fromCache&&c&&c.source==="server"?h.reject(new B(V.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(y)},error:y=>h.reject(y)}),m=new gu(Uo(u.path),p,{includeMetadataChanges:!0,waitForSyncWhenOnline:!0});return du(i,m)})(await Io(n),n.asyncQueue,t,e,r))),r.promise}function _g(n,t,e={}){const r=new We;return n.asyncQueue.enqueueAndForget((async()=>(function(i,o,u,c,h){const p=new yu({next:y=>{p.gc(),o.enqueueAndForget((()=>pu(i,m))),y.fromCache&&c.source==="server"?h.reject(new B(V.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(y)},error:y=>h.reject(y)}),m=new gu(u instanceof Ss?Jm(u):u,p,{includeMetadataChanges:!0,waitForSyncWhenOnline:!0});return du(i,m)})(await Io(n),n.asyncQueue,t,e,r))),r.promise}function Eg(n,t){const e=new We;return n.asyncQueue.enqueueAndForget((async()=>rg(await pg(n),t,e))),e.promise}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Eh="AsyncQueue";class yh{constructor(t=Promise.resolve()){this.qc=[],this.$c=!1,this.Kc=[],this.Wc=null,this.Qc=!1,this.Gc=!1,this.zc=[],this.xn=new v6(this,"async_queue_retry"),this.jc=()=>{const r=Ba();r&&q(Eh,"Visibility state changed to "+r.visibilityState),this.xn.gn()},this.Hc=t;const e=Ba();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.jc)}get isShuttingDown(){return this.$c}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.Jc(),this.Yc(t)}enterRestrictedMode(t){if(!this.$c){this.$c=!0,this.Gc=t||!1;const e=Ba();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this.jc)}}enqueue(t){if(this.Jc(),this.$c)return new Promise((()=>{}));const e=new We;return this.Yc((()=>this.$c&&this.Gc?Promise.resolve():(t().then(e.resolve,e.reject),e.promise))).then((()=>e.promise))}enqueueRetryable(t){this.enqueueAndForget((()=>(this.qc.push(t),this.Zc())))}async Zc(){if(this.qc.length!==0){try{await this.qc[0](),this.qc.shift(),this.xn.reset()}catch(t){if(!Br(t))throw t;q(Eh,"Operation failed with retryable error: "+t)}this.qc.length>0&&this.xn.mn((()=>this.Zc()))}}Yc(t){const e=this.Hc.then((()=>(this.Qc=!0,t().catch((r=>{throw this.Wc=r,this.Qc=!1,Je("INTERNAL UNHANDLED ERROR: ",Th(r)),r})).then((r=>(this.Qc=!1,r))))));return this.Hc=e,e}enqueueAfterDelay(t,e,r){this.Jc(),this.zc.indexOf(t)>-1&&(e=0);const s=hu.createAndSchedule(this,t,e,r,(i=>this.Xc(i)));return this.Kc.push(s),s}Jc(){this.Wc&&z(47125,{el:Th(this.Wc)})}verifyOperationInProgress(){}async tl(){let t;do t=this.Hc,await t;while(t!==this.Hc)}nl(t){for(const e of this.Kc)if(e.timerId===t)return!0;return!1}rl(t){return this.tl().then((()=>{this.Kc.sort(((e,r)=>e.targetTimeMs-r.targetTimeMs));for(const e of this.Kc)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.tl()}))}il(t){this.zc.push(t)}Xc(t){const e=this.Kc.indexOf(t);this.Kc.splice(e,1)}}function Th(n){let t=n.message||"";return n.stack&&(t=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),t}class tn extends $o{constructor(t,e,r,s){super(t,e,r,s),this.type="firestore",this._queue=new yh,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new yh(t),this._firestoreClient=void 0,await t}}}function W5(n,t){const e=typeof n=="object"?n:T1(),r=typeof n=="string"?n:ao,s=vo(e,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=Lh("firestore");i&&_9(s,...i)}return s}function ta(n){if(n._terminated)throw new B(V.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||yg(n),n._firestoreClient}function yg(n){var r,s,i,o;const t=n._freezeSettings(),e=h9(n._databaseId,((r=n._app)==null?void 0:r.options.appId)||"",n._persistenceKey,(s=n._app)==null?void 0:s.options.apiKey,t);n._componentsProvider||(i=t.localCache)!=null&&i._offlineComponentProvider&&((o=t.localCache)!=null&&o._onlineComponentProvider)&&(n._componentsProvider={_offline:t.localCache._offlineComponentProvider,_online:t.localCache._onlineComponentProvider}),n._firestoreClient=new fg(n._authCredentials,n._appCheckCredentials,n._queue,e,n._componentsProvider&&(function(c){const h=c==null?void 0:c._online.build();return{_offline:c==null?void 0:c._offline.build(h),_online:h}})(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tg{convertValue(t,e="none"){switch(Dt(t)){case 0:return null;case 1:return t.booleanValue;case 2:return It(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(On(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw z(62114,{value:t})}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const r={};return qn(t,((s,i)=>{r[s]=this.convertValue(i,e)})),r}convertVectorValue(t){var r,s,i;const e=(i=(s=(r=t.fields)==null?void 0:r[Us].arrayValue)==null?void 0:s.values)==null?void 0:i.map((o=>It(o.doubleValue)));return new ue(e)}convertGeoPoint(t){return new Me(It(t.latitude),It(t.longitude))}convertArray(t,e){return(t.values||[]).map((r=>this.convertValue(r,e)))}convertServerTimestamp(t,e){switch(e){case"previous":const r=si(t);return r==null?null:this.convertValue(r,e);case"estimate":return this.convertTimestamp(Or(t));default:return null}}convertTimestamp(t){const e=Nn(t);return new mt(e.seconds,e.nanos)}convertDocumentKey(t,e){const r=lt.fromString(t);H(w6(r),9688,{name:t});const s=new Ms(r.get(1),r.get(3)),i=new G(r.popFirst(5));return s.isEqual(e)||Je(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),i}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tu extends Tg{constructor(t){super(),this.firestore=t}convertBytes(t){return new Ee(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new At(this.firestore,null,e)}}const wh="@firebase/firestore",Ih="4.16.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ah(n){return(function(e,r){if(typeof e!="object"||e===null)return!1;const s=e;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1})(n,["next","error","complete"])}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yf{constructor(t,e,r,s,i){this._firestore=t,this._userDataWriter=e,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new At(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new wg(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var t;return((t=this._document)==null?void 0:t.data.clone().value.mapValue.fields)??void 0}get(t){if(this._document){const e=this._document.data.field(Vn("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class wg extends yf{data(){return super.data()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tf(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new B(V.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class wu{}class Iu extends wu{}function K5(n,t,...e){let r=[];t instanceof wu&&r.push(t),r=r.concat(e),(function(i){const o=i.filter((c=>c instanceof Au)).length,u=i.filter((c=>c instanceof ea)).length;if(o>1||o>0&&u>0)throw new B(V.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(r);for(const s of r)n=s._apply(n);return n}class ea extends Iu{constructor(t,e,r){super(),this._field=t,this._op=e,this._value=r,this.type="where"}static _create(t,e,r){return new ea(t,e,r)}_apply(t){const e=this._parse(t);return wf(t._query,e),new rn(t.firestore,t.converter,s1(t._query,e))}_parse(t){const e=Ho(t.firestore);return(function(i,o,u,c,h,p,m){let y;if(h.isKeyField()){if(p==="array-contains"||p==="array-contains-any")throw new B(V.INVALID_ARGUMENT,`Invalid Query. You can't perform '${p}' queries on documentId().`);if(p==="in"||p==="not-in"){vh(m,p);const P=[];for(const L of m)P.push(Rh(c,i,L));y={arrayValue:{values:P}}}else y=Rh(c,i,m)}else p!=="in"&&p!=="not-in"&&p!=="array-contains-any"||vh(m,p),y=R9(u,o,m,p==="in"||p==="not-in");return bt.create(h,p,y)})(t._query,"where",e,t.firestore._databaseId,this._field,this._op,this._value)}}function Y5(n,t,e){const r=t,s=Vn("where",n);return ea._create(s,r,e)}class Au extends wu{constructor(t,e){super(),this.type=t,this._queryConstraints=e}static _create(t,e){return new Au(t,e)}_parse(t){const e=this._queryConstraints.map((r=>r._parse(t))).filter((r=>r.getFilters().length>0));return e.length===1?e[0]:Ce.create(e,this._getOperator())}_apply(t){const e=this._parse(t);return e.getFilters().length===0?t:((function(s,i){let o=s;const u=i.getFlattenedFilters();for(const c of u)wf(o,c),o=s1(o,c)})(t._query,e),new rn(t.firestore,t.converter,s1(t._query,e)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Ru extends Iu{constructor(t,e){super(),this._field=t,this._direction=e,this.type="orderBy"}static _create(t,e){return new Ru(t,e)}_apply(t){const e=(function(s,i,o){if(s.startAt!==null)throw new B(V.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new B(V.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Hs(i,o)})(t._query,this._field,this._direction);return new rn(t.firestore,t.converter,A3(t._query,e))}}function Q5(n,t="asc"){const e=t,r=Vn("orderBy",n);return Ru._create(r,e)}class vu extends Iu{constructor(t,e,r){super(),this.type=t,this._limit=e,this._limitType=r}static _create(t,e,r){return new vu(t,e,r)}_apply(t){return new rn(t.firestore,t.converter,po(t._query,this._limit,this._limitType))}}function X5(n){return B4("limit",n),vu._create("limit",n,"F")}function Rh(n,t,e){if(typeof(e=_t(e))=="string"){if(e==="")throw new B(V.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!u6(t)&&e.indexOf("/")!==-1)throw new B(V.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${e}' contains a '/' character.`);const r=t.path.child(lt.fromString(e));if(!G.isDocumentKey(r))throw new B(V.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Fl(n,new G(r))}if(e instanceof At)return Fl(n,e._key);throw new B(V.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${No(e)}.`)}function vh(n,t){if(!Array.isArray(n)||n.length===0)throw new B(V.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function wf(n,t){const e=(function(s,i){for(const o of s)for(const u of o.getFlattenedFilters())if(i.indexOf(u.op)>=0)return u.op;return null})(n.filters,(function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(t.op));if(e!==null)throw e===t.op?new B(V.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new B(V.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${e.toString()}' filters.`)}function If(n,t,e){let r;return r=n?e&&(e.merge||e.mergeFields)?n.toFirestore(t,e):n.toFirestore(t):t,r}class Es{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class er extends yf{constructor(t,e,r,s,i,o){super(t,e,r,s,o),this._firestore=t,this._firestoreImpl=t,this.metadata=i}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new Yi(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const r=this._document.data.field(Vn("DocumentSnapshot.get",t));if(r!==null)return this._userDataWriter.convertValue(r,e.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new B(V.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t=this._document,e={};return e.type=er._jsonSchemaVersion,e.bundle="",e.bundleSource="DocumentSnapshot",e.bundleName=this._key.toString(),!t||!t.isValidDocument()||!t.isFoundDocument()?e:(this._userDataWriter.convertObjectMap(t.data.value.mapValue.fields,"previous"),e.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),e)}}er._jsonSchemaVersion="firestore/documentSnapshot/1.0",er._jsonSchema={type:Nt("string",er._jsonSchemaVersion),bundleSource:Nt("string","DocumentSnapshot"),bundleName:Nt("string"),bundle:Nt("string")};class Yi extends er{data(t={}){return super.data(t)}}class nr{constructor(t,e,r,s){this._firestore=t,this._userDataWriter=e,this._snapshot=s,this.metadata=new Es(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const t=[];return this.forEach((e=>t.push(e))),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,e){this._snapshot.docs.forEach((r=>{t.call(e,new Yi(this._firestore,this._userDataWriter,r.key,r,new Es(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new B(V.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=(function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map((u=>{Lt(s._snapshot.query)?l1(s._snapshot.query):M1(s.query._query);const c=new Yi(s._firestore,s._userDataWriter,u.doc.key,u.doc,new Es(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);return u.doc,{type:"added",doc:c,oldIndex:-1,newIndex:o++}}))}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((u=>i||u.type!==3)).map((u=>{const c=new Yi(s._firestore,s._userDataWriter,u.doc.key,u.doc,new Es(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,p=-1;return u.type!==0&&(h=o.indexOf(u.doc.key),o=o.delete(u.doc.key)),u.type!==1&&(o=o.add(u.doc),p=o.indexOf(u.doc.key)),{type:Ig(u.type),doc:c,oldIndex:h,newIndex:p}}))}})(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new B(V.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t={};t.type=nr._jsonSchemaVersion,t.bundleSource="QuerySnapshot",t.bundleName=k1.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const e=[],r=[],s=[];return this.docs.forEach((i=>{i._document!==null&&(e.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))})),t.bundle=(this._firestore,this.query._query,t.bundleName,"NOT SUPPORTED"),t}}function Ig(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return z(61501,{type:n})}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */nr._jsonSchemaVersion="firestore/querySnapshot/1.0",nr._jsonSchema={type:Nt("string",nr._jsonSchemaVersion),bundleSource:Nt("string","QuerySnapshot"),bundleName:Nt("string"),bundle:Nt("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function J5(n){n=ae(n,At);const t=ae(n.firestore,tn),e=ta(t);return gg(e,n._key).then((r=>Af(t,n,r)))}function Z5(n){n=ae(n,rn);const t=ae(n.firestore,tn),e=ta(t),r=new Tu(t);return Tf(n._query),_g(e,n._query).then((s=>new nr(t,r,n,s)))}function t_(n,t,e){n=ae(n,At);const r=ae(n.firestore,tn),s=If(n.converter,t,e),i=Ho(r);return na(r,[O6(i,"setDoc",n._key,s,n.converter!==null,e).toMutation(n._key,ye.none())])}function e_(n,t,e,...r){n=ae(n,At);const s=ae(n.firestore,tn),i=Ho(s);let o;return o=typeof(t=_t(t))=="string"||t instanceof qo?A9(i,"updateDoc",n._key,t,e,r):I9(i,"updateDoc",n._key,t),na(s,[o.toMutation(n._key,ye.exists(!0))])}function n_(n){return na(ae(n.firestore,tn),[new L1(n._key,ye.none())])}function r_(n,t){const e=ae(n.firestore,tn),r=E9(n),s=If(n.converter,t),i=Ho(n.firestore);return na(e,[O6(i,"addDoc",r._key,s,n.converter!==null,{}).toMutation(r._key,ye.exists(!1))]).then((()=>r))}function s_(n,...t){var h,p,m;n=_t(n);let e={includeMetadataChanges:!1,source:"default"},r=0;typeof t[r]!="object"||Ah(t[r])||(e=t[r++]);const s={includeMetadataChanges:e.includeMetadataChanges,source:e.source};if(Ah(t[r])){const y=t[r];t[r]=(h=y.next)==null?void 0:h.bind(y),t[r+1]=(p=y.error)==null?void 0:p.bind(y),t[r+2]=(m=y.complete)==null?void 0:m.bind(y)}let i,o,u;if(n instanceof At)o=ae(n.firestore,tn),u=Uo(n._key.path),i={next:y=>{t[r]&&t[r](Af(o,n,y))},error:t[r+1],complete:t[r+2]};else{const y=ae(n,rn);o=ae(y.firestore,tn),u=y._query;const C=new Tu(o);i={next:P=>{t[r]&&t[r](new nr(o,C,y,P))},error:t[r+1],complete:t[r+2]},Tf(n._query)}const c=ta(o);return mg(c,u,s,i)}function na(n,t){const e=ta(n);return Eg(e,t)}function Af(n,t,e){const r=e.docs.get(t._key),s=new Tu(n);return new er(n,s,t._key,r,new Es(e.hasPendingWrites,e.fromCache),t.converter)}(function(t,e=!0){P4(fr),ir(new Sn("firestore",((r,{instanceIdentifier:s,options:i})=>{const o=r.getProvider("app").getImmediate(),u=new tn(new O4(r.getProvider("auth-internal")),new V4(o,r.getProvider("app-check-internal")),t3(o,s),o);return i={useFetchStreams:e,...i},u._setSettings(i),u}),"PUBLIC").setMultipleInstances(!0)),De(wh,Ih,t),De(wh,Ih,"esm2020")})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rf="firebasestorage.googleapis.com",vf="storageBucket",Ag=120*1e3,Rg=600*1e3,vg=1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt extends Be{constructor(t,e,r=0){super($a(t),`Firebase Storage: ${e} (${$a(t)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,Rt.prototype)}get status(){return this.status_}set status(t){this.status_=t}_codeEquals(t){return $a(t)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(t){this.customData.serverResponse=t,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var gt;(function(n){n.UNKNOWN="unknown",n.OBJECT_NOT_FOUND="object-not-found",n.BUCKET_NOT_FOUND="bucket-not-found",n.PROJECT_NOT_FOUND="project-not-found",n.QUOTA_EXCEEDED="quota-exceeded",n.UNAUTHENTICATED="unauthenticated",n.UNAUTHORIZED="unauthorized",n.UNAUTHORIZED_APP="unauthorized-app",n.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",n.INVALID_CHECKSUM="invalid-checksum",n.CANCELED="canceled",n.INVALID_EVENT_NAME="invalid-event-name",n.INVALID_URL="invalid-url",n.INVALID_DEFAULT_BUCKET="invalid-default-bucket",n.NO_DEFAULT_BUCKET="no-default-bucket",n.CANNOT_SLICE_BLOB="cannot-slice-blob",n.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",n.NO_DOWNLOAD_URL="no-download-url",n.INVALID_ARGUMENT="invalid-argument",n.INVALID_ARGUMENT_COUNT="invalid-argument-count",n.APP_DELETED="app-deleted",n.INVALID_ROOT_OPERATION="invalid-root-operation",n.INVALID_FORMAT="invalid-format",n.INTERNAL_ERROR="internal-error",n.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(gt||(gt={}));function $a(n){return"storage/"+n}function Cu(){const n="An unknown error occurred, please check the error payload for server response.";return new Rt(gt.UNKNOWN,n)}function Cg(n){return new Rt(gt.OBJECT_NOT_FOUND,"Object '"+n+"' does not exist.")}function Sg(n){return new Rt(gt.QUOTA_EXCEEDED,"Quota for bucket '"+n+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function Pg(){const n="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new Rt(gt.UNAUTHENTICATED,n)}function bg(){return new Rt(gt.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function Ng(n){return new Rt(gt.UNAUTHORIZED,"User does not have permission to access '"+n+"'.")}function Cf(){return new Rt(gt.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function Sf(){return new Rt(gt.CANCELED,"User canceled the upload/download.")}function Og(n){return new Rt(gt.INVALID_URL,"Invalid URL '"+n+"'.")}function kg(n){return new Rt(gt.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+n+"'.")}function Dg(){return new Rt(gt.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+vf+"' property when initializing the app?")}function Pf(){return new Rt(gt.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function Vg(){return new Rt(gt.SERVER_FILE_WRONG_SIZE,"Server recorded incorrect upload file size, please retry the upload.")}function xg(){return new Rt(gt.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function Lg(n){return new Rt(gt.UNSUPPORTED_ENVIRONMENT,`${n} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function g1(n){return new Rt(gt.INVALID_ARGUMENT,n)}function bf(){return new Rt(gt.APP_DELETED,"The Firebase app was deleted.")}function Mg(n){return new Rt(gt.INVALID_ROOT_OPERATION,"The operation '"+n+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function bs(n,t){return new Rt(gt.INVALID_FORMAT,"String does not match format '"+n+"': "+t)}function fs(n){throw new Rt(gt.INTERNAL_ERROR,"Internal error: "+n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ge{constructor(t,e){this.bucket=t,this.path_=e}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const t=encodeURIComponent;return"/b/"+t(this.bucket)+"/o/"+t(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(t,e){let r;try{r=ge.makeFromUrl(t,e)}catch{return new ge(t,"")}if(r.path==="")return r;throw kg(t)}static makeFromUrl(t,e){let r=null;const s="([A-Za-z0-9.\\-_]+)";function i(ht){ht.path.charAt(ht.path.length-1)==="/"&&(ht.path_=ht.path_.slice(0,-1))}const o="(/(.*))?$",u=new RegExp("^gs://"+s+o,"i"),c={bucket:1,path:3};function h(ht){ht.path_=decodeURIComponent(ht.path)}const p="v[A-Za-z0-9_]+",m=e.replace(/[.]/g,"\\."),y="(/([^?#]*).*)?$",C=new RegExp(`^https?://${m}/${p}/b/${s}/o${y}`,"i"),P={bucket:1,path:3},L=e===Rf?"(?:storage.googleapis.com|storage.cloud.google.com)":e,M="([^?#]*)",W=new RegExp(`^https?://${L}/${s}/${M}`,"i"),st=[{regex:u,indices:c,postModify:i},{regex:C,indices:P,postModify:h},{regex:W,indices:{bucket:1,path:2},postModify:h}];for(let ht=0;ht<st.length;ht++){const yt=st[ht],Tt=yt.regex.exec(t);if(Tt){const R=Tt[yt.indices.bucket];let E=Tt[yt.indices.path];E||(E=""),r=new ge(R,E),yt.postModify(r);break}}if(r==null)throw Og(t);return r}}class Ug{constructor(t){this.promise_=Promise.reject(t)}getPromise(){return this.promise_}cancel(t=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fg(n,t,e){let r=1,s=null,i=null,o=!1,u=0;function c(){return u===2}let h=!1;function p(...M){h||(h=!0,t.apply(null,M))}function m(M){s=setTimeout(()=>{s=null,n(C,c())},M)}function y(){i&&clearTimeout(i)}function C(M,...W){if(h){y();return}if(M){y(),p.call(null,M,...W);return}if(c()||o){y(),p.call(null,M,...W);return}r<64&&(r*=2);let st;u===1?(u=2,st=0):st=(r+Math.random())*1e3,m(st)}let P=!1;function L(M){P||(P=!0,y(),!h&&(s!==null?(M||(u=2),clearTimeout(s),m(0)):M||(u=1)))}return m(0),i=setTimeout(()=>{o=!0,L(!0)},e),L}function Bg(n){n(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qg(n){return n!==void 0}function $g(n){return typeof n=="function"}function Hg(n){return typeof n=="object"&&!Array.isArray(n)}function ra(n){return typeof n=="string"||n instanceof String}function Ch(n){return Su()&&n instanceof Blob}function Su(){return typeof Blob<"u"}function Sh(n,t,e,r){if(r<t)throw g1(`Invalid value for '${n}'. Expected ${t} or greater.`);if(r>e)throw g1(`Invalid value for '${n}'. Expected ${e} or less.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fi(n,t,e){let r=t;return e==null&&(r=`https://${t}`),`${e}://${r}/v0${n}`}function Nf(n){const t=encodeURIComponent;let e="?";for(const r in n)if(n.hasOwnProperty(r)){const s=t(r)+"="+t(n[r]);e=e+s+"&"}return e=e.slice(0,-1),e}var rr;(function(n){n[n.NO_ERROR=0]="NO_ERROR",n[n.NETWORK_ERROR=1]="NETWORK_ERROR",n[n.ABORT=2]="ABORT"})(rr||(rr={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Of(n,t){const e=n>=500&&n<600,s=[408,429].indexOf(n)!==-1,i=t.indexOf(n)!==-1;return e||s||i}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jg{constructor(t,e,r,s,i,o,u,c,h,p,m,y=!0,C=!1){this.url_=t,this.method_=e,this.headers_=r,this.body_=s,this.successCodes_=i,this.additionalRetryCodes_=o,this.callback_=u,this.errorCallback_=c,this.timeout_=h,this.progressCallback_=p,this.connectionFactory_=m,this.retry=y,this.isUsingEmulator=C,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((P,L)=>{this.resolve_=P,this.reject_=L,this.start_()})}start_(){const t=(r,s)=>{if(s){r(!1,new Mi(!1,null,!0));return}const i=this.connectionFactory_();this.pendingConnection_=i;const o=u=>{const c=u.loaded,h=u.lengthComputable?u.total:-1;this.progressCallback_!==null&&this.progressCallback_(c,h)};this.progressCallback_!==null&&i.addUploadProgressListener(o),i.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&i.removeUploadProgressListener(o),this.pendingConnection_=null;const u=i.getErrorCode()===rr.NO_ERROR,c=i.getStatus();if(!u||Of(c,this.additionalRetryCodes_)&&this.retry){const p=i.getErrorCode()===rr.ABORT;r(!1,new Mi(!1,null,p));return}const h=this.successCodes_.indexOf(c)!==-1;r(!0,new Mi(h,i))})},e=(r,s)=>{const i=this.resolve_,o=this.reject_,u=s.connection;if(s.wasSuccessCode)try{const c=this.callback_(u,u.getResponse());qg(c)?i(c):i()}catch(c){o(c)}else if(u!==null){const c=Cu();c.serverResponse=u.getErrorText(),this.errorCallback_?o(this.errorCallback_(u,c)):o(c)}else if(s.canceled){const c=this.appDelete_?bf():Sf();o(c)}else{const c=Cf();o(c)}};this.canceled_?e(!1,new Mi(!1,null,!0)):this.backoffId_=Fg(t,e,this.timeout_)}getPromise(){return this.promise_}cancel(t){this.canceled_=!0,this.appDelete_=t||!1,this.backoffId_!==null&&Bg(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class Mi{constructor(t,e,r){this.wasSuccessCode=t,this.connection=e,this.canceled=!!r}}function Gg(n,t){t!==null&&t.length>0&&(n.Authorization="Firebase "+t)}function zg(n,t){n["X-Firebase-Storage-Version"]="webjs/"+(t??"AppManager")}function Wg(n,t){t&&(n["X-Firebase-GMPID"]=t)}function Kg(n,t){t!==null&&(n["X-Firebase-AppCheck"]=t)}function Yg(n,t,e,r,s,i,o=!0,u=!1){const c=Nf(n.urlParams),h=n.url+c,p=Object.assign({},n.headers);return Wg(p,t),Gg(p,e),zg(p,i),Kg(p,r),new jg(h,n.method,p,n.body,n.successCodes,n.additionalRetryCodes,n.handler,n.errorHandler,n.timeout,n.progressCallback,s,o,u)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qg(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function Xg(...n){const t=Qg();if(t!==void 0){const e=new t;for(let r=0;r<n.length;r++)e.append(n[r]);return e.getBlob()}else{if(Su())return new Blob(n);throw new Rt(gt.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function Jg(n,t,e){return n.webkitSlice?n.webkitSlice(t,e):n.mozSlice?n.mozSlice(t,e):n.slice?n.slice(t,e):null}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zg(n){if(typeof atob>"u")throw Lg("base-64");return atob(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ke={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class Ha{constructor(t,e){this.data=t,this.contentType=e||null}}function t5(n,t){switch(n){case ke.RAW:return new Ha(kf(t));case ke.BASE64:case ke.BASE64URL:return new Ha(Df(n,t));case ke.DATA_URL:return new Ha(n5(t),r5(t))}throw Cu()}function kf(n){const t=[];for(let e=0;e<n.length;e++){let r=n.charCodeAt(e);if(r<=127)t.push(r);else if(r<=2047)t.push(192|r>>6,128|r&63);else if((r&64512)===55296)if(!(e<n.length-1&&(n.charCodeAt(e+1)&64512)===56320))t.push(239,191,189);else{const i=r,o=n.charCodeAt(++e);r=65536|(i&1023)<<10|o&1023,t.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|r&63)}else(r&64512)===56320?t.push(239,191,189):t.push(224|r>>12,128|r>>6&63,128|r&63)}return new Uint8Array(t)}function e5(n){let t;try{t=decodeURIComponent(n)}catch{throw bs(ke.DATA_URL,"Malformed data URL.")}return kf(t)}function Df(n,t){switch(n){case ke.BASE64:{const s=t.indexOf("-")!==-1,i=t.indexOf("_")!==-1;if(s||i)throw bs(n,"Invalid character '"+(s?"-":"_")+"' found: is it base64url encoded?");break}case ke.BASE64URL:{const s=t.indexOf("+")!==-1,i=t.indexOf("/")!==-1;if(s||i)throw bs(n,"Invalid character '"+(s?"+":"/")+"' found: is it base64 encoded?");t=t.replace(/-/g,"+").replace(/_/g,"/");break}}let e;try{e=Zg(t)}catch(s){throw s.message.includes("polyfill")?s:bs(n,"Invalid character found")}const r=new Uint8Array(e.length);for(let s=0;s<e.length;s++)r[s]=e.charCodeAt(s);return r}class Vf{constructor(t){this.base64=!1,this.contentType=null;const e=t.match(/^data:([^,]+)?,/);if(e===null)throw bs(ke.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const r=e[1]||null;r!=null&&(this.base64=s5(r,";base64"),this.contentType=this.base64?r.substring(0,r.length-7):r),this.rest=t.substring(t.indexOf(",")+1)}}function n5(n){const t=new Vf(n);return t.base64?Df(ke.BASE64,t.rest):e5(t.rest)}function r5(n){return new Vf(n).contentType}function s5(n,t){return n.length>=t.length?n.substring(n.length-t.length)===t:!1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tn{constructor(t,e){let r=0,s="";Ch(t)?(this.data_=t,r=t.size,s=t.type):t instanceof ArrayBuffer?(e?this.data_=new Uint8Array(t):(this.data_=new Uint8Array(t.byteLength),this.data_.set(new Uint8Array(t))),r=this.data_.length):t instanceof Uint8Array&&(e?this.data_=t:(this.data_=new Uint8Array(t.length),this.data_.set(t)),r=t.length),this.size_=r,this.type_=s}size(){return this.size_}type(){return this.type_}slice(t,e){if(Ch(this.data_)){const r=this.data_,s=Jg(r,t,e);return s===null?null:new Tn(s)}else{const r=new Uint8Array(this.data_.buffer,t,e-t);return new Tn(r,!0)}}static getBlob(...t){if(Su()){const e=t.map(r=>r instanceof Tn?r.data_:r);return new Tn(Xg.apply(null,e))}else{const e=t.map(o=>ra(o)?t5(ke.RAW,o).data:o.data_);let r=0;e.forEach(o=>{r+=o.byteLength});const s=new Uint8Array(r);let i=0;return e.forEach(o=>{for(let u=0;u<o.length;u++)s[i++]=o[u]}),new Tn(s,!0)}}uploadData(){return this.data_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xf(n){let t;try{t=JSON.parse(n)}catch{return null}return Hg(t)?t:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function i5(n){if(n.length===0)return null;const t=n.lastIndexOf("/");return t===-1?"":n.slice(0,t)}function o5(n,t){const e=t.split("/").filter(r=>r.length>0).join("/");return n.length===0?e:n+"/"+e}function Lf(n){const t=n.lastIndexOf("/",n.length-2);return t===-1?n:n.slice(t+1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function a5(n,t){return t}class Jt{constructor(t,e,r,s){this.server=t,this.local=e||t,this.writable=!!r,this.xform=s||a5}}let Ui=null;function u5(n){return!ra(n)||n.length<2?n:Lf(n)}function Mf(){if(Ui)return Ui;const n=[];n.push(new Jt("bucket")),n.push(new Jt("generation")),n.push(new Jt("metageneration")),n.push(new Jt("name","fullPath",!0));function t(i,o){return u5(o)}const e=new Jt("name");e.xform=t,n.push(e);function r(i,o){return o!==void 0?Number(o):o}const s=new Jt("size");return s.xform=r,n.push(s),n.push(new Jt("timeCreated")),n.push(new Jt("updated")),n.push(new Jt("md5Hash",null,!0)),n.push(new Jt("cacheControl",null,!0)),n.push(new Jt("contentDisposition",null,!0)),n.push(new Jt("contentEncoding",null,!0)),n.push(new Jt("contentLanguage",null,!0)),n.push(new Jt("contentType",null,!0)),n.push(new Jt("metadata","customMetadata",!0)),Ui=n,Ui}function c5(n,t){function e(){const r=n.bucket,s=n.fullPath,i=new ge(r,s);return t._makeStorageReference(i)}Object.defineProperty(n,"ref",{get:e})}function l5(n,t,e){const r={};r.type="file";const s=e.length;for(let i=0;i<s;i++){const o=e[i];r[o.local]=o.xform(r,t[o.server])}return c5(r,n),r}function Uf(n,t,e){const r=xf(t);return r===null?null:l5(n,r,e)}function h5(n,t,e,r){const s=xf(t);if(s===null||!ra(s.downloadTokens))return null;const i=s.downloadTokens;if(i.length===0)return null;const o=encodeURIComponent;return i.split(",").map(h=>{const p=n.bucket,m=n.fullPath,y="/b/"+o(p)+"/o/"+o(m),C=fi(y,e,r),P=Nf({alt:"media",token:h});return C+P})[0]}function Ff(n,t){const e={},r=t.length;for(let s=0;s<r;s++){const i=t[s];i.writable&&(e[i.server]=n[i.local])}return JSON.stringify(e)}class Wr{constructor(t,e,r,s){this.url=t,this.method=e,this.handler=r,this.timeout=s,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ye(n){if(!n)throw Cu()}function Pu(n,t){function e(r,s){const i=Uf(n,s,t);return Ye(i!==null),i}return e}function f5(n,t){function e(r,s){const i=Uf(n,s,t);return Ye(i!==null),h5(i,s,n.host,n._protocol)}return e}function di(n){function t(e,r){let s;return e.getStatus()===401?e.getErrorText().includes("Firebase App Check token is invalid")?s=bg():s=Pg():e.getStatus()===402?s=Sg(n.bucket):e.getStatus()===403?s=Ng(n.path):s=r,s.status=e.getStatus(),s.serverResponse=r.serverResponse,s}return t}function Bf(n){const t=di(n);function e(r,s){let i=t(r,s);return r.getStatus()===404&&(i=Cg(n.path)),i.serverResponse=s.serverResponse,i}return e}function d5(n,t,e){const r=t.fullServerUrl(),s=fi(r,n.host,n._protocol),i="GET",o=n.maxOperationRetryTime,u=new Wr(s,i,Pu(n,e),o);return u.errorHandler=Bf(t),u}function p5(n,t,e){const r=t.fullServerUrl(),s=fi(r,n.host,n._protocol),i="GET",o=n.maxOperationRetryTime,u=new Wr(s,i,f5(n,e),o);return u.errorHandler=Bf(t),u}function m5(n,t){return n&&n.contentType||t&&t.type()||"application/octet-stream"}function qf(n,t,e){const r=Object.assign({},e);return r.fullPath=n.path,r.size=t.size(),r.contentType||(r.contentType=m5(null,t)),r}function g5(n,t,e,r,s){const i=t.bucketOnlyServerUrl(),o={"X-Goog-Upload-Protocol":"multipart"};function u(){let st="";for(let ht=0;ht<2;ht++)st=st+Math.random().toString().slice(2);return st}const c=u();o["Content-Type"]="multipart/related; boundary="+c;const h=qf(t,r,s),p=Ff(h,e),m="--"+c+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+p+`\r
--`+c+`\r
Content-Type: `+h.contentType+`\r
\r
`,y=`\r
--`+c+"--",C=Tn.getBlob(m,r,y);if(C===null)throw Pf();const P={name:h.fullPath},L=fi(i,n.host,n._protocol),M="POST",W=n.maxUploadRetryTime,et=new Wr(L,M,Pu(n,e),W);return et.urlParams=P,et.headers=o,et.body=C.uploadData(),et.errorHandler=di(t),et}class Ao{constructor(t,e,r,s){this.current=t,this.total=e,this.finalized=!!r,this.metadata=s||null}}function bu(n,t){let e=null;try{e=n.getResponseHeader("X-Goog-Upload-Status")}catch{Ye(!1)}return Ye(!!e&&(t||["active"]).indexOf(e)!==-1),e}function _5(n,t,e,r,s){const i=t.bucketOnlyServerUrl(),o=qf(t,r,s),u={name:o.fullPath},c=fi(i,n.host,n._protocol),h="POST",p={"X-Goog-Upload-Protocol":"resumable","X-Goog-Upload-Command":"start","X-Goog-Upload-Header-Content-Length":`${r.size()}`,"X-Goog-Upload-Header-Content-Type":o.contentType,"Content-Type":"application/json; charset=utf-8"},m=Ff(o,e),y=n.maxUploadRetryTime;function C(L){bu(L);let M;try{M=L.getResponseHeader("X-Goog-Upload-URL")}catch{Ye(!1)}return Ye(ra(M)),M}const P=new Wr(c,h,C,y);return P.urlParams=u,P.headers=p,P.body=m,P.errorHandler=di(t),P}function E5(n,t,e,r){const s={"X-Goog-Upload-Command":"query"};function i(h){const p=bu(h,["active","final"]);let m=null;try{m=h.getResponseHeader("X-Goog-Upload-Size-Received")}catch{Ye(!1)}m||Ye(!1);const y=Number(m);return Ye(!isNaN(y)),new Ao(y,r.size(),p==="final")}const o="POST",u=n.maxUploadRetryTime,c=new Wr(e,o,i,u);return c.headers=s,c.errorHandler=di(t),c}const Ph=256*1024;function y5(n,t,e,r,s,i,o,u){const c=new Ao(0,0);if(o?(c.current=o.current,c.total=o.total):(c.current=0,c.total=r.size()),r.size()!==c.total)throw Vg();const h=c.total-c.current;let p=h;s>0&&(p=Math.min(p,s));const m=c.current,y=m+p;let C="";p===0?C="finalize":h===p?C="upload, finalize":C="upload";const P={"X-Goog-Upload-Command":C,"X-Goog-Upload-Offset":`${c.current}`},L=r.slice(m,y);if(L===null)throw Pf();function M(ht,yt){const Tt=bu(ht,["active","final"]),R=c.current+p,E=r.size();let w;return Tt==="final"?w=Pu(t,i)(ht,yt):w=null,new Ao(R,E,Tt==="final",w)}const W="POST",et=t.maxUploadRetryTime,st=new Wr(e,W,M,et);return st.headers=P,st.body=L.uploadData(),st.progressCallback=u||null,st.errorHandler=di(n),st}const se={RUNNING:"running",PAUSED:"paused",SUCCESS:"success",CANCELED:"canceled",ERROR:"error"};function ja(n){switch(n){case"running":case"pausing":case"canceling":return se.RUNNING;case"paused":return se.PAUSED;case"success":return se.SUCCESS;case"canceled":return se.CANCELED;case"error":return se.ERROR;default:return se.ERROR}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class T5{constructor(t,e,r){if($g(t)||e!=null||r!=null)this.next=t,this.error=e??void 0,this.complete=r??void 0;else{const i=t;this.next=i.next,this.error=i.error,this.complete=i.complete}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yr(n){return(...t)=>{Promise.resolve().then(()=>n(...t))}}class w5{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=rr.NO_ERROR,this.sendPromise_=new Promise(t=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=rr.ABORT,t()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=rr.NETWORK_ERROR,t()}),this.xhr_.addEventListener("load",()=>{t()})})}send(t,e,r,s,i){if(this.sent_)throw fs("cannot .send() more than once");if(hr(t)&&r&&(this.xhr_.withCredentials=!0),this.sent_=!0,this.xhr_.open(e,t,!0),i!==void 0)for(const o in i)i.hasOwnProperty(o)&&this.xhr_.setRequestHeader(o,i[o].toString());return s!==void 0?this.xhr_.send(s):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw fs("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw fs("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw fs("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw fs("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(t){return this.xhr_.getResponseHeader(t)}addUploadProgressListener(t){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",t)}removeUploadProgressListener(t){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",t)}}class I5 extends w5{initXhr(){this.xhr_.responseType="text"}}function Rr(){return new I5}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class A5{isExponentialBackoffExpired(){return this.sleepTime>this.maxSleepTime}constructor(t,e,r=null){this._transferred=0,this._needToFetchStatus=!1,this._needToFetchMetadata=!1,this._observers=[],this._error=void 0,this._uploadUrl=void 0,this._request=void 0,this._chunkMultiplier=1,this._resolve=void 0,this._reject=void 0,this._ref=t,this._blob=e,this._metadata=r,this._mappings=Mf(),this._resumable=this._shouldDoResumable(this._blob),this._state="running",this._errorHandler=s=>{if(this._request=void 0,this._chunkMultiplier=1,s._codeEquals(gt.CANCELED))this._needToFetchStatus=!0,this.completeTransitions_();else{const i=this.isExponentialBackoffExpired();if(Of(s.status,[]))if(i)s=Cf();else{this.sleepTime=Math.max(this.sleepTime*2,vg),this._needToFetchStatus=!0,this.completeTransitions_();return}this._error=s,this._transition("error")}},this._metadataErrorHandler=s=>{this._request=void 0,s._codeEquals(gt.CANCELED)?this.completeTransitions_():(this._error=s,this._transition("error"))},this.sleepTime=0,this.maxSleepTime=this._ref.storage.maxUploadRetryTime,this._promise=new Promise((s,i)=>{this._resolve=s,this._reject=i,this._start()}),this._promise.then(null,()=>{})}_makeProgressCallback(){const t=this._transferred;return e=>this._updateProgress(t+e)}_shouldDoResumable(t){return t.size()>256*1024}_start(){this._state==="running"&&this._request===void 0&&(this._resumable?this._uploadUrl===void 0?this._createResumable():this._needToFetchStatus?this._fetchStatus():this._needToFetchMetadata?this._fetchMetadata():this.pendingTimeout=setTimeout(()=>{this.pendingTimeout=void 0,this._continueUpload()},this.sleepTime):this._oneShotUpload())}_resolveToken(t){Promise.all([this._ref.storage._getAuthToken(),this._ref.storage._getAppCheckToken()]).then(([e,r])=>{switch(this._state){case"running":t(e,r);break;case"canceling":this._transition("canceled");break;case"pausing":this._transition("paused");break}})}_createResumable(){this._resolveToken((t,e)=>{const r=_5(this._ref.storage,this._ref._location,this._mappings,this._blob,this._metadata),s=this._ref.storage._makeRequest(r,Rr,t,e);this._request=s,s.getPromise().then(i=>{this._request=void 0,this._uploadUrl=i,this._needToFetchStatus=!1,this.completeTransitions_()},this._errorHandler)})}_fetchStatus(){const t=this._uploadUrl;this._resolveToken((e,r)=>{const s=E5(this._ref.storage,this._ref._location,t,this._blob),i=this._ref.storage._makeRequest(s,Rr,e,r);this._request=i,i.getPromise().then(o=>{o=o,this._request=void 0,this._updateProgress(o.current),this._needToFetchStatus=!1,o.finalized&&(this._needToFetchMetadata=!0),this.completeTransitions_()},this._errorHandler)})}_continueUpload(){const t=Ph*this._chunkMultiplier,e=new Ao(this._transferred,this._blob.size()),r=this._uploadUrl;this._resolveToken((s,i)=>{let o;try{o=y5(this._ref._location,this._ref.storage,r,this._blob,t,this._mappings,e,this._makeProgressCallback())}catch(c){this._error=c,this._transition("error");return}const u=this._ref.storage._makeRequest(o,Rr,s,i,!1);this._request=u,u.getPromise().then(c=>{this._increaseMultiplier(),this._request=void 0,this._updateProgress(c.current),c.finalized?(this._metadata=c.metadata,this._transition("success")):this.completeTransitions_()},this._errorHandler)})}_increaseMultiplier(){Ph*this._chunkMultiplier*2<32*1024*1024&&(this._chunkMultiplier*=2)}_fetchMetadata(){this._resolveToken((t,e)=>{const r=d5(this._ref.storage,this._ref._location,this._mappings),s=this._ref.storage._makeRequest(r,Rr,t,e);this._request=s,s.getPromise().then(i=>{this._request=void 0,this._metadata=i,this._transition("success")},this._metadataErrorHandler)})}_oneShotUpload(){this._resolveToken((t,e)=>{const r=g5(this._ref.storage,this._ref._location,this._mappings,this._blob,this._metadata),s=this._ref.storage._makeRequest(r,Rr,t,e);this._request=s,s.getPromise().then(i=>{this._request=void 0,this._metadata=i,this._updateProgress(this._blob.size()),this._transition("success")},this._errorHandler)})}_updateProgress(t){const e=this._transferred;this._transferred=t,this._transferred!==e&&this._notifyObservers()}_transition(t){if(this._state!==t)switch(t){case"canceling":case"pausing":this._state=t,this._request!==void 0?this._request.cancel():this.pendingTimeout&&(clearTimeout(this.pendingTimeout),this.pendingTimeout=void 0,this.completeTransitions_());break;case"running":const e=this._state==="paused";this._state=t,e&&(this._notifyObservers(),this._start());break;case"paused":this._state=t,this._notifyObservers();break;case"canceled":this._error=Sf(),this._state=t,this._notifyObservers();break;case"error":this._state=t,this._notifyObservers();break;case"success":this._state=t,this._notifyObservers();break}}completeTransitions_(){switch(this._state){case"pausing":this._transition("paused");break;case"canceling":this._transition("canceled");break;case"running":this._start();break}}get snapshot(){const t=ja(this._state);return{bytesTransferred:this._transferred,totalBytes:this._blob.size(),state:t,metadata:this._metadata,task:this,ref:this._ref}}on(t,e,r,s){const i=new T5(e||void 0,r||void 0,s||void 0);return this._addObserver(i),()=>{this._removeObserver(i)}}then(t,e){return this._promise.then(t,e)}catch(t){return this.then(null,t)}_addObserver(t){this._observers.push(t),this._notifyObserver(t)}_removeObserver(t){const e=this._observers.indexOf(t);e!==-1&&this._observers.splice(e,1)}_notifyObservers(){this._finishPromise(),this._observers.slice().forEach(e=>{this._notifyObserver(e)})}_finishPromise(){if(this._resolve!==void 0){let t=!0;switch(ja(this._state)){case se.SUCCESS:yr(this._resolve.bind(null,this.snapshot))();break;case se.CANCELED:case se.ERROR:const e=this._reject;yr(e.bind(null,this._error))();break;default:t=!1;break}t&&(this._resolve=void 0,this._reject=void 0)}}_notifyObserver(t){switch(ja(this._state)){case se.RUNNING:case se.PAUSED:t.next&&yr(t.next.bind(t,this.snapshot))();break;case se.SUCCESS:t.complete&&yr(t.complete.bind(t))();break;case se.CANCELED:case se.ERROR:t.error&&yr(t.error.bind(t,this._error))();break;default:t.error&&yr(t.error.bind(t,this._error))()}}resume(){const t=this._state==="paused"||this._state==="pausing";return t&&this._transition("running"),t}pause(){const t=this._state==="running";return t&&this._transition("pausing"),t}cancel(){const t=this._state==="running"||this._state==="pausing";return t&&this._transition("canceling"),t}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lr{constructor(t,e){this._service=t,e instanceof ge?this._location=e:this._location=ge.makeFromUrl(e,t.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(t,e){return new lr(t,e)}get root(){const t=new ge(this._location.bucket,"");return this._newRef(this._service,t)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return Lf(this._location.path)}get storage(){return this._service}get parent(){const t=i5(this._location.path);if(t===null)return null;const e=new ge(this._location.bucket,t);return new lr(this._service,e)}_throwIfRoot(t){if(this._location.path==="")throw Mg(t)}}function R5(n,t,e){return n._throwIfRoot("uploadBytesResumable"),new A5(n,new Tn(t),e)}function v5(n){n._throwIfRoot("getDownloadURL");const t=p5(n.storage,n._location,Mf());return n.storage.makeRequestWithTokens(t,Rr).then(e=>{if(e===null)throw xg();return e})}function C5(n,t){const e=o5(n._location.path,t),r=new ge(n._location.bucket,e);return new lr(n.storage,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function S5(n){return/^[A-Za-z]+:\/\//.test(n)}function P5(n,t){return new lr(n,t)}function $f(n,t){if(n instanceof Nu){const e=n;if(e._bucket==null)throw Dg();const r=new lr(e,e._bucket);return t!=null?$f(r,t):r}else return t!==void 0?C5(n,t):n}function b5(n,t){if(t&&S5(t)){if(n instanceof Nu)return P5(n,t);throw g1("To use ref(service, url), the first argument must be a Storage instance.")}else return $f(n,t)}function bh(n,t){const e=t==null?void 0:t[vf];return e==null?null:ge.makeFromBucketSpec(e,n)}function N5(n,t,e,r={}){n.host=`${t}:${e}`;const s=hr(t);s&&_1(`https://${n.host}/b`),n._isUsingEmulator=!0,n._protocol=s?"https":"http";const{mockUserToken:i}=r;i&&(n._overrideAuthToken=typeof i=="string"?i:Bh(i,n.app.options.projectId))}class Nu{constructor(t,e,r,s,i,o=!1){this.app=t,this._authProvider=e,this._appCheckProvider=r,this._url=s,this._firebaseVersion=i,this._isUsingEmulator=o,this._bucket=null,this._host=Rf,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=Ag,this._maxUploadRetryTime=Rg,this._requests=new Set,s!=null?this._bucket=ge.makeFromBucketSpec(s,this._host):this._bucket=bh(this._host,this.app.options)}get host(){return this._host}set host(t){this._host=t,this._url!=null?this._bucket=ge.makeFromBucketSpec(this._url,t):this._bucket=bh(t,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(t){Sh("time",0,Number.POSITIVE_INFINITY,t),this._maxUploadRetryTime=t}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(t){Sh("time",0,Number.POSITIVE_INFINITY,t),this._maxOperationRetryTime=t}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const t=this._authProvider.getImmediate({optional:!0});if(t){const e=await t.getToken();if(e!==null)return e.accessToken}return null}async _getAppCheckToken(){if(ie(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=this._appCheckProvider.getImmediate({optional:!0});return t?(await t.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(t=>t.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(t){return new lr(this,t)}_makeRequest(t,e,r,s,i=!0){if(this._deleted)return new Ug(bf());{const o=Yg(t,this._appId,r,s,e,this._firebaseVersion,i,this._isUsingEmulator);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(t,e){const[r,s]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(t,e,r,s).getPromise()}}const Nh="@firebase/storage",Oh="0.14.3";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hf="storage";function i_(n,t,e){return n=_t(n),R5(n,t,e)}function o_(n){return n=_t(n),v5(n)}function a_(n,t){return n=_t(n),b5(n,t)}function u_(n=T1(),t){n=_t(n);const r=vo(n,Hf).getImmediate({identifier:t}),s=Lh("storage");return s&&O5(r,...s),r}function O5(n,t,e,r={}){N5(n,t,e,r)}function k5(n,{instanceIdentifier:t}){const e=n.getProvider("app").getImmediate(),r=n.getProvider("auth-internal"),s=n.getProvider("app-check-internal");return new Nu(e,r,s,t,fr)}function D5(){ir(new Sn(Hf,k5,"PUBLIC").setMultipleInstances(!0)),De(Nh,Oh,""),De(Nh,Oh,"esm2020")}D5();export{M5 as A,q5 as B,Sn as C,Fh as D,Qs as E,U5 as F,mn as G,Z5 as H,Y5 as I,X5 as J,a_ as K,E1 as L,i_ as M,o_ as N,r_ as O,z5 as P,ir as _,vo as a,Dh as b,T1 as c,Pd as d,x5 as e,Q0 as f,_t as g,$5 as h,Fd as i,W5 as j,u_ as k,l7 as l,J5 as m,E9 as n,B5 as o,s_ as p,j5 as q,De as r,F5 as s,n_ as t,e_ as u,t_ as v,G5 as w,K5 as x,Q5 as y,L5 as z};
