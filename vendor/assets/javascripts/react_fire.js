var ReactFireMixin=function(){"use strict";var e={componentWillMount:function(){this.firebaseRefs={}},componentWillUnmount:function(){for(var e in this.firebaseRefs)this.firebaseRefs.hasOwnProperty(e)&&this.unbind(e)},bindAsArray:function(e,n){this._bind(e,n,!0)},bindAsObject:function(e,n){this._bind(e,n,!1)},_bind:function(e,n,t){this._validateBindVar(n);var i;if("undefined"==typeof e.ref||e.ref()instanceof Firebase==!1?i="firebaseRef must be an instance of Firebase":"boolean"!=typeof t&&(i="bindAsArray must be a boolean. Got: "+t),"undefined"!=typeof i)throw new Error("ReactFire: "+i);this.firebaseRefs[n]=e.ref(),e.on("value",function(e){var i={};i[n]=t?this._toArray(e.val()):e.val(),this.setState(i)}.bind(this))},unbind:function(e){if(this._validateBindVar(e),"undefined"==typeof this.firebaseRefs[e])throw new Error('unexpected value for bindVar. "'+e+'" was either never bound or has already been unbound');this.firebaseRefs[e].off("value"),delete this.firebaseRefs[e]},_validateBindVar:function(e){var n;if("string"!=typeof e?n="bindVar must be a string. Got: "+e:0===e.length?n='bindVar must be a non-empty string. Got: ""':e.length>768?n="bindVar is too long to be stored in Firebase. Got: "+e:/[\[\].#$\/\u0000-\u001F\u007F]/.test(e)&&(n="bindVar cannot contain any of the following characters: . # $ ] [ /. Got: "+e),"undefined"!=typeof n)throw new Error("ReactFire: "+n)},_isArray:function(e){return"[object Array]"===Object.prototype.toString.call(e)},_toArray:function(e){var n=[];if(e)if(this._isArray(e))n=e;else if("object"==typeof e)for(var t in e)e.hasOwnProperty(t)&&n.push(e[t]);return n}};return e}();"undefined"!=typeof module&&"undefined"!=typeof process&&(module.exports=ReactFireMixin);
