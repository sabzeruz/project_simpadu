"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } 
var _plugin = require('tailwindcss/plugin'); var _plugin2 = _interopRequireDefault(_plugin);

exports. default = _plugin2.default.call(void 0, ({addVariant, config}) => {
  const screens = config().theme.screens;

  for (const screen of Object.keys(screens)) {
    addVariant(`below-${screen}`, `@media screen and (max-width: theme('screens.${screen}'))`);
  }
}); /* v7-bd3ed83a29b1fa42 */