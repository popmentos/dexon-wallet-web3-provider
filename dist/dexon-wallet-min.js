parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"FO+Z":[function(require,module,exports) {
"use strict";function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function _iterableToArray(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function _arrayWithoutHoles(e){if(Array.isArray(e)){for(var r=0,n=new Array(e.length);r<e.length;r++)n[r]=e[r];return n}}function _classCallCheck(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,r){for(var n=0;n<r.length;n++){var t=r[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}function _createClass(e,r,n){return r&&_defineProperties(e.prototype,r),n&&_defineProperties(e,n),e}var Utils=function(){function e(){_classCallCheck(this,e)}return _createClass(e,null,[{key:"genId",value:function(){return(new Date).getTime()+Math.floor(1e3*Math.random())}},{key:"flatMap",value:function(e,r){var n;return(n=[]).concat.apply(n,_toConsumableArray(e.map(r)))}},{key:"intRange",value:function(e,r){return e>=r?[]:new Array(r-e).fill().map(function(r,n){return n+e})}},{key:"hexToInt",value:function(e){return null==e?e:Number.parseInt(e,16)}},{key:"intToHex",value:function(e){return null==e?e:"0x"+e.toString(16)}}]),e}();module.exports=Utils;
},{}],"IYY2":[function(require,module,exports) {
"use strict";var _utils=_interopRequireDefault(require("./utils"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var i=t[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),e}var FilterMgr=function(){function e(t){_classCallCheck(this,e),this.rpc=t,this.filters=new Map,this.blockNumbers=new Map,this.timers=new Map,this.timeoutInterval=3e5}return _createClass(e,[{key:"newFilter",value:function(e){var t=this,r={type:"log",options:this._normalizeFilter(e.params[0])},i=this._installFilter(r);return this._getBlockNumber().then(function(e){return t.blockNumbers.set(i,e),_utils.default.intToHex(i)})}},{key:"newBlockFilter",value:function(){var e=this,t=this._installFilter({type:"block",options:"latest"});return this._getBlockNumber().then(function(r){return e.blockNumbers.set(t,r),_utils.default.intToHex(t)})}},{key:"newPendingTransactionFilter",value:function(){var e=this,t=this._installFilter({type:"tx",options:"pending"});return this._getBlockNumber().then(function(r){return e.blockNumbers.set(t,r),_utils.default.intToHex(t)})}},{key:"_installFilter",value:function(e){var t=this.filters.keys.length+1;return e.id=t,this.filters.set(t,e),this._setupTimer(t),t}},{key:"uninstallFilter",value:function(e){var t=_utils.default.hexToInt(e);return this.filters.delete(t),this.blockNumbers.delete(t),this._clearTimer(t),Promise.resolve(!0)}},{key:"getFilterChanges",value:function(e){var t=_utils.default.hexToInt(e),r=this.filters.get(t);if(!r)return Promise.reject(new Error("getFilterChanges: no filter found"));switch(r.type){case"log":return this._getLogFilterChanges(r.id);case"block":return this._getBlockFilterChanges(r.id);case"tx":return this._getTxFilterChanges(r.id);default:return Promise.reject(new Error("unsupport filter type"))}}},{key:"_getLogFilterChanges",value:function(e){var t=this,r=this.filters.get(e).options,i=this.blockNumbers.get(e);return r&&i?this._getBlockNumber().then(function(e){var n="latest"===r.toBlock?e:r.toBlock;return _utils.default.hexToInt(i)>_utils.default.hexToInt(n)?[]:t.rpc.getFilterLogs(Object.assign({},r,{fromBlock:i,toBlock:n}))}):Promise.reject(new Error("_getLogFilterChanges: no filter found"))}},{key:"_getBlockFilterChanges",value:function(e){return this._getBlocksForFilter(e).then(function(e){return e.map(function(e){return e.hash})})}},{key:"_getTxFilterChanges",value:function(e){return this._getBlocksForFilter(e).then(function(e){return _utils.default.flatMap(e,function(e){return e.transactions})})}},{key:"_getBlocksForFilter",value:function(e){var t=this,r=this.blockNumbers.get(e);return r?this._getBlockNumber().then(function(i){var n=_utils.default.hexToInt(r),l=_utils.default.hexToInt(i);return l>n&&t.blockNumbers.set(e,i),t._getBlocksInRange(n,l)}):Promise.reject(new Error("no filter found"))}},{key:"_getBlocksInRange",value:function(e,t){return e>=t?Promise.resolve([]):Promise.all(_utils.default.intRange(e,t).map(_utils.default.intToHex).map(this._getBlockByNumber.bind(this)))}},{key:"_getBlockNumber",value:function(){return this.rpc.getBlockNumber()}},{key:"_getBlockByNumber",value:function(e){return this.rpc.getBlockByNumber(e)}},{key:"getFilterLogs",value:function(e){var t=this.filters.get(_utils.default.hexToInt(e));return t?this.rpc.getFilterLogs(this._normalizeParams(t.options)):Promise.reject(new Error("no filter found"))}},{key:"_normalizeParams",value:function(e){var t={fromBlock:this._normalizeParamBlock(e.fromBlock),toBlock:this._normalizeParamBlock(e.toBlock),topics:e.topics};return e.addresses&&(t.address=e.addresses),t}},{key:"_normalizeFilter",value:function(e){return{fromBlock:this._normalizeFilterBlock(e.fromBlock),toBlock:this._normalizeFilterBlock(e.toBlock),addresses:void 0===e.address?null:Array.isArray(e.address)?e.address:[e.address],topics:e.topics||[]}}},{key:"_normalizeFilterBlock",value:function(e){if(void 0===e||"latest"===e||"pending"===e)return"latest";if("earliest"===e)return 0;if(e.startsWith("0x"))return _utils.default.hexToInt(e);throw new Error("Invalid block option: "+e)}},{key:"_normalizeParamBlock",value:function(e){return"latest"===e?e:_utils.default.intToHex(e)}},{key:"_clearTimer",value:function(e){var t=this.timers.get(e);t&&clearTimeout(t)}},{key:"_setupTimer",value:function(e){var t=this;this._clearTimer(e);var r=setTimeout(function(){t.filters.delete(e),t.blockNumbers.delete(e)},this.timeoutInterval);this.timers.set(e,r)}}]),e}();module.exports=FilterMgr;
},{"./utils":"FO+Z"}],"sD6q":[function(require,module,exports) {
"use strict";var _utils=_interopRequireDefault(require("./utils"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _createClass(e,t,i){return t&&_defineProperties(e.prototype,t),i&&_defineProperties(e,i),e}var IdMapping=function(){function e(){_classCallCheck(this,e),this.intIds=new Map}return _createClass(e,[{key:"tryIntifyId",value:function(e){if(e.id){if("number"!=typeof e.id){var t=_utils.default.genId();this.intIds.set(t,e.id),e.id=t}}else e.id=_utils.default.genId()}},{key:"tryRestoreId",value:function(e){var t=this.tryPopId(e.id);t&&(e.id=t)}},{key:"tryPopId",value:function(e){var t=this.intIds.get(e);return t&&this.intIds.delete(e),t}}]),e}();module.exports=IdMapping;
},{"./utils":"FO+Z"}],"7afn":[function(require,module,exports) {
"use strict";var _id_mapping=_interopRequireDefault(require("./id_mapping"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,r){for(var t=0;t<r.length;t++){var n=r[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _createClass(e,r,t){return r&&_defineProperties(e.prototype,r),t&&_defineProperties(e,t),e}var RPCServer=function(){function e(r){_classCallCheck(this,e),this.rpcUrl=r,this.idMapping=new _id_mapping.default}return _createClass(e,[{key:"getBlockNumber",value:function(){return this.call({jsonrpc:"2.0",method:"eth_blockNumber",params:[]}).then(function(e){return e.result})}},{key:"getBlockByNumber",value:function(e){return this.call({jsonrpc:"2.0",method:"eth_getBlockByNumber",params:[e,!1]}).then(function(e){return e.result})}},{key:"getFilterLogs",value:function(e){return this.call({jsonrpc:"2.0",method:"eth_getLogs",params:[e]})}},{key:"call",value:function(e){var r=this;return this.idMapping.tryIntifyId(e),fetch(this.rpcUrl,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(e)}).then(function(e){return e.json()}).then(function(e){if(!e.result&&e.error)throw new Error(e.error.message||"rpc error");return r.idMapping.tryRestoreId(e),e})}}]),e}();module.exports=RPCServer;
},{"./id_mapping":"sD6q"}],"Focm":[function(require,module,exports) {
"use strict";var _filter=_interopRequireDefault(require("./filter")),_rpc=_interopRequireDefault(require("./rpc")),_utils=_interopRequireDefault(require("./utils")),_id_mapping=_interopRequireDefault(require("./id_mapping"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}var DexonWalletWeb3Provider=function(){function e(t){_classCallCheck(this,e),this.setConfig(t),this.idMapping=new _id_mapping.default,this.callbacks=new Map,this.isDexonWallet=!0}return _createClass(e,[{key:"isConnected",value:function(){return!0}},{key:"setAddress",value:function(e){this.address=(e||"").toLowerCase(),this.ready=!!e}},{key:"setConfig",value:function(e){this.setAddress(e.address),this.chainId=e.chainId,this.rpc=new _rpc.default(e.rpcUrl),this.filterMgr=new _filter.default(e.rpcUrl)}},{key:"enable",value:function(){return this._sendAsync({method:"eth_requestAccounts",params:[]}).then(function(e){return"string"==typeof e.result?[e.result]:e.result})}},{key:"send",value:function(e){var t={jsonrpc:"2.0",id:e.id};switch(e.method){case"eth_accounts":t.result=this.eth_accounts();break;case"eth_coinbase":t.result=this.eth_coinbase();break;case"net_version":t.result=this.net_version();break;case"eth_uninstallFilter":this.sendAsync(e,function(e){e&&console.log("<== uninstallFilter ".concat(e))}),t.result=!0;break;default:throw new Error("DekuSan does not support calling ".concat(e.method," synchronously without a callback. Please provide a callback parameter to call ").concat(e.method," asynchronously."))}return t}},{key:"sendAsync",value:function(e,t){Array.isArray(e)?Promise.all(e.map(this._sendAsync.bind(this))).then(function(e){return t(null,e)}).catch(function(e){return t(e,null)}):this._sendAsync(e).then(function(e){return t(null,e)}).catch(function(e){return t(e,null)})}},{key:"_sendAsync",value:function(e){var t=this;return this.idMapping.tryIntifyId(e),new Promise(function(n,r){switch(e.id||(e.id=_utils.default.genId()),t.callbacks.set(e.id,function(e,t){e?r(e):n(t)}),e.method){case"eth_accounts":return t.sendResponse(e.id,t.eth_accounts());case"eth_coinbase":return t.sendResponse(e.id,t.eth_coinbase());case"net_version":return t.sendResponse(e.id,t.net_version());case"eth_sign":return t.eth_sign(e);case"personal_sign":return t.personal_sign(e);case"personal_ecRecover":return t.personal_ecRecover(e);case"eth_signTypedData":case"eth_signTypedData_v3":return t.eth_signTypedData(e);case"eth_sendTransaction":return t.eth_sendTransaction(e);case"eth_requestAccounts":return t.eth_requestAccounts(e);case"eth_newFilter":return t.eth_newFilter(e);case"eth_newBlockFilter":return t.eth_newBlockFilter(e);case"eth_newPendingTransactionFilter":return t.eth_newPendingTransactionFilter(e);case"eth_uninstallFilter":return t.eth_uninstallFilter(e);case"eth_getFilterChanges":return t.eth_getFilterChanges(e);case"eth_getFilterLogs":return t.eth_getFilterLogs(e);default:return t.callbacks.delete(e.id),t.rpc.call(e).then(n).catch(r)}})}},{key:"eth_accounts",value:function(){return this.address?[this.address]:[]}},{key:"eth_coinbase",value:function(){return this.address}},{key:"net_version",value:function(){return this.chainId.toString(10)||null}},{key:"eth_sign",value:function(e){this.postMessage("signMessage",e.id,{data:e.params[1]})}},{key:"personal_sign",value:function(e){this.postMessage("signPersonalMessage",e.id,{data:e.params[0]})}},{key:"personal_ecRecover",value:function(e){this.postMessage("ecRecover",e.id,{signature:e.params[1],message:e.params[0]})}},{key:"eth_signTypedData",value:function(e){this.postMessage("signTypedMessage",e.id,{data:e.params[1]})}},{key:"eth_sendTransaction",value:function(e){this.postMessage("signTransaction",e.id,e.params[0])}},{key:"eth_requestAccounts",value:function(e){this.postMessage("requestAccounts",e.id,{})}},{key:"eth_newFilter",value:function(e){var t=this;this.filterMgr.newFilter(e).then(function(n){return t.sendResponse(e.id,n)}).catch(function(n){return t.sendError(e.id,n)})}},{key:"eth_newBlockFilter",value:function(e){var t=this;this.filterMgr.newBlockFilter().then(function(n){return t.sendResponse(e.id,n)}).catch(function(n){return t.sendError(e.id,n)})}},{key:"eth_newPendingTransactionFilter",value:function(e){var t=this;this.filterMgr.newPendingTransactionFilter().then(function(n){return t.sendResponse(e.id,n)}).catch(function(n){return t.sendError(e.id,n)})}},{key:"eth_uninstallFilter",value:function(e){var t=this;this.filterMgr.uninstallFilter(e.params[0]).then(function(n){return t.sendResponse(e.id,n)}).catch(function(n){return t.sendError(e.id,n)})}},{key:"eth_getFilterChanges",value:function(e){var t=this;this.filterMgr.getFilterChanges(e.params[0]).then(function(n){return t.sendResponse(e.id,n)}).catch(function(n){return t.sendError(e.id,n)})}},{key:"eth_getFilterLogs",value:function(e){var t=this;this.filterMgr.getFilterLogs(e.params[0]).then(function(n){return t.sendResponse(e.id,n)}).catch(function(n){return t.sendError(e.id,n)})}},{key:"postMessage",value:function(e,t,n){this.ready||"requestAccounts"===e?window.webkit.messageHandlers[e].postMessage({name:e,object:n,id:t}):this.sendError(t,new Error("provider is not ready"))}},{key:"sendResponse",value:function(e,t){var n=this.idMapping.tryPopId(e)||e,r=this.callbacks.get(e),s={jsonrpc:"2.0",id:n};"object"===_typeof(t)&&t.jsonrpc&&t.result?s.result=t.result:s.result=t,r&&(r(null,s),this.callbacks.delete(e))}},{key:"sendError",value:function(e,t){var n=this.callbacks.get(e);n&&(n(t instanceof Error?t:new Error(t),null),this.callbacks.delete(e))}}]),e}();window.DexonWallet=DexonWalletWeb3Provider;
},{"./filter":"IYY2","./rpc":"7afn","./utils":"FO+Z","./id_mapping":"sD6q"}]},{},["Focm"], null)
//# sourceMappingURL=/dexon-wallet-min.map