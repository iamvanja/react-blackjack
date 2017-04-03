'use strict';

// Use the native implementation if it's present and isn't buggy.
Object.assign = require('object-assign');

// Use the native version when it exists and fallback to polyfill if it doesn't.
require('es6-weak-map/implement');
