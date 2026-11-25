import{E as re,l as R,d as ne,n as ie,D as k,A as oe,L as ae,B as se,G as K,H as ce,_ as $,C as O,r as le}from"./firebase-app-Du7KfLpz.js";/**
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
 */const v=new Map,F={activated:!1,tokenObservers:[]},ue={initialized:!1,enabled:!1};function l(e){return v.get(e)||{...F}}function he(e,t){return v.set(e,t),v.get(e)}function A(){return ue}/**
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
 */const I="https://content-firebaseappcheck.googleapis.com/v1",de="exchangeRecaptchaV3Token",fe="exchangeRecaptchaEnterpriseToken",pe="exchangeDebugToken",H={RETRIAL_MIN_WAIT:30*1e3,RETRIAL_MAX_WAIT:960*1e3},ge=1440*60*1e3;/**
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
 */class ke{constructor(t,r,n,i,o){if(this.operation=t,this.retryPolicy=r,this.getWaitDuration=n,this.lowerBound=i,this.upperBound=o,this.pending=null,this.nextErrorWaitInterval=i,i>o)throw new Error("Proactive refresh lower bound greater than upper bound!")}start(){this.nextErrorWaitInterval=this.lowerBound,this.process(!0).catch(()=>{})}stop(){this.pending&&(this.pending.reject("cancelled"),this.pending=null)}isRunning(){return!!this.pending}async process(t){this.stop();try{this.pending=new k,this.pending.promise.catch(r=>{}),await me(this.getNextRun(t)),this.pending.resolve(),await this.pending.promise,this.pending=new k,this.pending.promise.catch(r=>{}),await this.operation(),this.pending.resolve(),await this.pending.promise,this.process(!0).catch(()=>{})}catch(r){this.retryPolicy(r)?this.process(!1).catch(()=>{}):this.stop()}}getNextRun(t){if(t)return this.nextErrorWaitInterval=this.lowerBound,this.getWaitDuration();{const r=this.nextErrorWaitInterval;return this.nextErrorWaitInterval*=2,this.nextErrorWaitInterval>this.upperBound&&(this.nextErrorWaitInterval=this.upperBound),r}}}function me(e){return new Promise(t=>{setTimeout(t,e)})}/**
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
 */const we={"already-initialized":"You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.","already-internally-initialized":"App Check has already been automatically initialized by {$initializerName} with default options. If you want to initialize App Check with custom options, call initializeAppCheck() with those options before initializing {$initializerName}.","use-before-activation":"App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.","fetch-network-error":"Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-parse-error":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status-error":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","recaptcha-error":"ReCAPTCHA error.","no-provider":"No attestation provider was passed to initializeAppCheck() and no ReCAPTCHA Enterprise site key was found in the Firebase config.","initial-throttle":"{$httpStatus} error. Attempts allowed again after {$time}",throttled:"Requests throttled due to previous {$httpStatus} error. Attempts allowed again after {$time}"},h=new re("appCheck","AppCheck",we);/**
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
 */function E(e=!1){var t;return e?(t=self.grecaptcha)==null?void 0:t.enterprise:self.grecaptcha}function D(e){if(!l(e).activated)throw h.create("use-before-activation",{appName:e.name})}function S(e){const t=Math.round(e/1e3),r=Math.floor(t/(3600*24)),n=Math.floor((t-r*3600*24)/3600),i=Math.floor((t-r*3600*24-n*3600)/60),o=t-r*3600*24-n*3600-i*60;let a="";return r&&(a+=w(r)+"d:"),n&&(a+=w(n)+"h:"),a+=w(i)+"m:"+w(o)+"s",a}function w(e){return e===0?"00":e>=10?e.toString():"0"+e}/**
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
 */async function _({url:e,body:t},r){const n={"Content-Type":"application/json"},i=r.getImmediate({optional:!0});if(i){const d=await i.getHeartbeatsHeader();d&&(n["X-Firebase-Client"]=d)}const o={method:"POST",body:JSON.stringify(t),headers:n};let a;try{a=await fetch(e,o)}catch(d){throw h.create("fetch-network-error",{originalErrorMessage:d==null?void 0:d.message})}if(a.status!==200)throw h.create("fetch-status-error",{httpStatus:a.status});let s;try{s=await a.json()}catch(d){throw h.create("fetch-parse-error",{originalErrorMessage:d==null?void 0:d.message})}const c=s.ttl.match(/^([\d.]+)(s)$/);if(!c||!c[2]||isNaN(Number(c[1])))throw h.create("fetch-parse-error",{originalErrorMessage:`ttl field (timeToLive) is not in standard Protobuf Duration format: ${s.ttl}`});const u=Number(c[1])*1e3,p=Date.now();return{token:s.token,expireTimeMillis:p+u,issuedAtTimeMillis:p}}function Te(e,t){const{projectId:r,appId:n,apiKey:i}=e.options;return{url:`${I}/projects/${r}/apps/${n}:${de}?key=${i}`,body:{recaptcha_v3_token:t}}}function Ee(e,t){const{projectId:r,appId:n,apiKey:i}=e.options;return{url:`${I}/projects/${r}/apps/${n}:${fe}?key=${i}`,body:{recaptcha_enterprise_token:t}}}function L(e,t){const{projectId:r,appId:n,apiKey:i}=e.options;return{url:`${I}/projects/${r}/apps/${n}:${pe}?key=${i}`,body:{debug_token:t}}}/**
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
 */const be="firebase-app-check-database",Ae=1,m="firebase-app-check-store",q="debug-token";let T=null;function U(){return T||(T=new Promise((e,t)=>{try{const r=indexedDB.open(be,Ae);r.onsuccess=n=>{e(n.target.result)},r.onerror=n=>{var i;t(h.create("storage-open",{originalErrorMessage:(i=n.target.error)==null?void 0:i.message}))},r.onupgradeneeded=n=>{const i=n.target.result;switch(n.oldVersion){case 0:i.createObjectStore(m,{keyPath:"compositeKey"})}}}catch(r){t(h.create("storage-open",{originalErrorMessage:r==null?void 0:r.message}))}}),T)}function _e(e){return j(G(e))}function Ce(e,t){return W(G(e),t)}function ye(e){return W(q,e)}function ve(){return j(q)}async function W(e,t){const n=(await U()).transaction(m,"readwrite"),o=n.objectStore(m).put({compositeKey:e,value:t});return new Promise((a,s)=>{o.onsuccess=c=>{a()},n.onerror=c=>{var u;s(h.create("storage-set",{originalErrorMessage:(u=c.target.error)==null?void 0:u.message}))}})}async function j(e){const r=(await U()).transaction(m,"readonly"),i=r.objectStore(m).get(e);return new Promise((o,a)=>{i.onsuccess=s=>{const c=s.target.result;o(c?c.value:void 0)},r.onerror=s=>{var c;a(h.create("storage-get",{originalErrorMessage:(c=s.target.error)==null?void 0:c.message}))}})}function G(e){return`${e.options.appId}-${e.name}`}/**
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
 */const f=new ae("@firebase/app-check");/**
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
 */async function Pe(e){if(K()){let t;try{t=await _e(e)}catch(r){f.warn(`Failed to read token from IndexedDB. Error: ${r}`)}return t}}function C(e,t){return K()?Ce(e,t).catch(r=>{f.warn(`Failed to write token to IndexedDB. Error: ${r}`)}):Promise.resolve()}async function Re(){let e;try{e=await ve()}catch{}if(e)return e;{const t=crypto.randomUUID();return ye(t).catch(r=>f.warn(`Failed to persist debug token to IndexedDB. Error: ${r}`)),t}}/**
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
 */function N(){return A().enabled}async function x(){const e=A();if(e.enabled&&e.token)return e.token.promise;throw Error(`
            Can't get debug token in production mode.
        `)}function Ie(){const e=oe(),t=A();if(t.initialized=!0,typeof e.FIREBASE_APPCHECK_DEBUG_TOKEN!="string"&&e.FIREBASE_APPCHECK_DEBUG_TOKEN!==!0)return;t.enabled=!0;const r=new k;t.token=r,typeof e.FIREBASE_APPCHECK_DEBUG_TOKEN=="string"?r.resolve(e.FIREBASE_APPCHECK_DEBUG_TOKEN):r.resolve(Re())}/**
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
 */const De={error:"UNKNOWN_ERROR"};function Se(e){return ce.encodeString(JSON.stringify(e),!1)}async function P(e,t=!1,r=!1){const n=e.app;D(n);const i=l(n);let o=i.token,a;if(o&&!g(o)&&(i.token=void 0,o=void 0),!o){const u=await i.cachedTokenPromise;u&&(g(u)?o=u:await C(n,void 0))}if(!t&&o&&g(o))return{token:o.token};let s=!1;if(N())try{const u=await x();i.exchangeTokenPromise||(i.exchangeTokenPromise=_(L(n,u),e.heartbeatServiceProvider).finally(()=>{i.exchangeTokenPromise=void 0}),s=!0);const p=await i.exchangeTokenPromise;return await C(n,p),i.token=p,{token:p.token}}catch(u){return u.code==="appCheck/throttled"||u.code==="appCheck/initial-throttle"?f.warn(u.message):r&&f.error(u),y(u)}try{i.exchangeTokenPromise||(i.exchangeTokenPromise=i.provider.getToken().finally(()=>{i.exchangeTokenPromise=void 0}),s=!0),o=await l(n).exchangeTokenPromise}catch(u){u.code==="appCheck/throttled"||u.code==="appCheck/initial-throttle"?f.warn(u.message):r&&f.error(u),a=u}let c;return o?a?g(o)?c={token:o.token,internalError:a}:c=y(a):(c={token:o.token},i.token=o,await C(n,o)):c=y(a),s&&Y(n,c),c}async function Ne(e){const t=e.app;D(t);const{provider:r}=l(t);if(N()){const n=await x(),i=L(t,n);i.body.limited_use=!0;const{token:o}=await _(i,e.heartbeatServiceProvider);return{token:o}}else{const{token:n}=await r.getToken(!0);return{token:n}}}function X(e,t,r,n){const{app:i}=e,o=l(i),a={next:r,error:n,type:t};if(o.tokenObservers=[...o.tokenObservers,a],o.token&&g(o.token)){const s=o.token;Promise.resolve().then(()=>{r({token:s.token}),z(e)}).catch(()=>{})}o.cachedTokenPromise.then(()=>z(e))}function V(e,t){const r=l(e),n=r.tokenObservers.filter(i=>i.next!==t);n.length===0&&r.tokenRefresher&&r.tokenRefresher.isRunning()&&r.tokenRefresher.stop(),r.tokenObservers=n}function z(e){const{app:t}=e,r=l(t);let n=r.tokenRefresher;n||(n=xe(e),r.tokenRefresher=n),!n.isRunning()&&r.isTokenAutoRefreshEnabled&&n.start()}function xe(e){const{app:t}=e;return new ke(async()=>{const r=l(t);let n;if(r.token?n=await P(e,!0):n=await P(e),n.error)throw n.error;if(n.internalError)throw n.internalError},()=>!0,()=>{const r=l(t);if(r.token){let n=r.token.issuedAtTimeMillis+(r.token.expireTimeMillis-r.token.issuedAtTimeMillis)*.5+3e5;const i=r.token.expireTimeMillis-300*1e3;return n=Math.min(n,i),Math.max(0,n-Date.now())}else return 0},H.RETRIAL_MIN_WAIT,H.RETRIAL_MAX_WAIT)}function Y(e,t){const r=l(e).tokenObservers;for(const n of r)try{n.type==="EXTERNAL"&&t.error!=null?n.error(t.error):n.next(t)}catch{}}function g(e){return e.expireTimeMillis-Date.now()>0}function y(e){return{token:Se(De),error:e}}/**
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
 */class Me{constructor(t,r){this.app=t,this.heartbeatServiceProvider=r}_delete(){const{tokenObservers:t}=l(this.app);for(const r of t)V(this.app,r.next);return Promise.resolve()}}function $e(e,t){return new Me(e,t)}function Oe(e){return{getToken:t=>P(e,t),getLimitedUseToken:()=>Ne(e),addTokenListener:t=>X(e,"INTERNAL",t),removeTokenListener:t=>V(e.app,t)}}const He="@firebase/app-check",ze="0.12.0";/**
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
 */const Be="https://www.google.com/recaptcha/api.js",Ke="https://www.google.com/recaptcha/enterprise.js";function Fe(e,t){const r=new k,n=l(e);n.reCAPTCHAState={initialized:r};const i=J(e),o=E(!1);return o?b(e,t,o,i,r):Ue(()=>{const a=E(!1);if(!a)throw new Error("no recaptcha");b(e,t,a,i,r)}),r.promise}function Le(e,t){const r=new k,n=l(e);n.reCAPTCHAState={initialized:r};const i=J(e),o=E(!0);return o?b(e,t,o,i,r):We(()=>{const a=E(!0);if(!a)throw new Error("no recaptcha");b(e,t,a,i,r)}),r.promise}function b(e,t,r,n,i){r.ready(()=>{qe(e,t,r,n),i.resolve(r)})}function J(e){const t=`fire_app_check_${e.name}`,r=document.createElement("div");return r.id=t,r.style.display="none",document.body.appendChild(r),t}async function Q(e){D(e);const r=await l(e).reCAPTCHAState.initialized.promise;return new Promise((n,i)=>{const o=l(e).reCAPTCHAState;r.ready(()=>{n(r.execute(o.widgetId,{action:"fire_app_check"}))})})}function qe(e,t,r,n){const i=r.render(n,{sitekey:t,size:"invisible",callback:()=>{l(e).reCAPTCHAState.succeeded=!0},"error-callback":()=>{l(e).reCAPTCHAState.succeeded=!1}}),o=l(e);o.reCAPTCHAState={...o.reCAPTCHAState,widgetId:i}}function Ue(e){const t=document.createElement("script");t.src=Be,t.onload=e,document.head.appendChild(t)}function We(e){const t=document.createElement("script");t.src=Ke+"?render=explicit",t.onload=e,document.head.appendChild(t)}/**
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
 */class Z{constructor(t){this._siteKey=t,this._throttleData=null}async getToken(t=!1){var i,o,a;te(this._throttleData);const r=await Q(this._app).catch(s=>{throw h.create("recaptcha-error")});if(!((i=l(this._app).reCAPTCHAState)!=null&&i.succeeded))throw h.create("recaptcha-error");let n;try{const s=Te(this._app,r);t&&(s.body.limited_use=!0),n=await _(s,this._heartbeatServiceProvider)}catch(s){throw(o=s.code)!=null&&o.includes("fetch-status-error")?(this._throttleData=ee(Number((a=s.customData)==null?void 0:a.httpStatus),this._throttleData),h.create("initial-throttle",{time:S(this._throttleData.allowRequestsAfter-Date.now()),httpStatus:this._throttleData.httpStatus})):s}return this._throttleData=null,n}initialize(t){this._app=t,this._heartbeatServiceProvider=R(t,"heartbeat"),Fe(t,this._siteKey).catch(()=>{})}isEqual(t){return t instanceof Z?this._siteKey===t._siteKey:!1}}class M{constructor(t){this._siteKey=t,this._throttleData=null}async getToken(t=!1){var i,o,a;te(this._throttleData);const r=await Q(this._app).catch(s=>{throw h.create("recaptcha-error")});if(!((i=l(this._app).reCAPTCHAState)!=null&&i.succeeded))throw h.create("recaptcha-error");let n;try{const s=Ee(this._app,r);t&&(s.body.limited_use=!0),n=await _(s,this._heartbeatServiceProvider)}catch(s){throw(o=s.code)!=null&&o.includes("fetch-status-error")?(this._throttleData=ee(Number((a=s.customData)==null?void 0:a.httpStatus),this._throttleData),h.create("initial-throttle",{time:S(this._throttleData.allowRequestsAfter-Date.now()),httpStatus:this._throttleData.httpStatus})):s}return this._throttleData=null,n}initialize(t){this._app=t,this._heartbeatServiceProvider=R(t,"heartbeat"),Le(t,this._siteKey).catch(()=>{})}isEqual(t){return t instanceof M?this._siteKey===t._siteKey:!1}}function ee(e,t){if(e===404||e===403)return{backoffCount:1,allowRequestsAfter:Date.now()+ge,httpStatus:e};{const r=t?t.backoffCount:0,n=se(r,1e3,2);return{backoffCount:r+1,allowRequestsAfter:Date.now()+n,httpStatus:e}}}function te(e){if(e&&Date.now()-e.allowRequestsAfter<=0)throw h.create("throttled",{time:S(e.allowRequestsAfter-Date.now()),httpStatus:e.httpStatus})}/**
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
 */function Ye(e=ie(),t){var a;e=ne(e),A().initialized||Ie(),N()&&x().then(s=>console.log(`App Check debug token: ${s}. You will need to add it to your app's App Check settings in the Firebase console for it to work.`));let r;if(!(t!=null&&t.provider)&&e.options.recaptchaSiteKey&&(r=new M(e.options.recaptchaSiteKey)),!(t!=null&&t.provider)&&!r)throw h.create("no-provider");const n={...t,provider:(t==null?void 0:t.provider)||r},i=R(e,"app-check");if(i.isInitialized()){const s=i.getImmediate(),c=i.getOptions();if(c.isTokenAutoRefreshEnabled===n.isTokenAutoRefreshEnabled&&((a=c.provider)!=null&&a.isEqual(n.provider)))return s;throw typeof l(e).internallyInitializedBy=="string"?h.create("already-internally-initialized",{initializerName:l(e).internallyInitializedBy}):h.create("already-initialized",{appName:e.name})}const o=i.initialize({options:n});return je(e,n.provider,n.isTokenAutoRefreshEnabled),l(e).isTokenAutoRefreshEnabled&&X(o,"INTERNAL",()=>{}),o}function je(e,t,r=!1){const n=he(e,{...F});n.activated=!0,n.provider=t,n.cachedTokenPromise=Pe(e).then(i=>(i&&g(i)&&(n.token=i,Y(e,{token:i.token})),i)),n.isTokenAutoRefreshEnabled=r&&e.automaticDataCollectionEnabled,!e.automaticDataCollectionEnabled&&r&&f.warn("`isTokenAutoRefreshEnabled` is true but `automaticDataCollectionEnabled` was set to false during `initializeApp()`. This blocks automatic token refresh."),n.provider.initialize(e)}const Ge="app-check",B="app-check-internal";function Xe(){$(new O(Ge,e=>{const t=e.getProvider("app").getImmediate(),r=e.getProvider("heartbeat");return $e(t,r)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider(B).initialize()})),$(new O(B,e=>{const t=e.getProvider("app-check").getImmediate();return Oe(t)},"PUBLIC").setInstantiationMode("EXPLICIT")),le(He,ze)}Xe();export{M as ReCaptchaEnterpriseProvider,Z as ReCaptchaV3Provider,Ye as initializeAppCheck};
