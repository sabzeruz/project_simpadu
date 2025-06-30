"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } 
var _plugin = require('tailwindcss/plugin'); var _plugin2 = _interopRequireDefault(_plugin);

exports. default = _plugin2.default.call(void 0, ({addComponents, theme}) => {
  // Base
  addComponents({
    '.leaflet-container': {
      '.leaflet-pane, .leaflet-top, .leaflet-bottom, .leaflet-control': {
        'z-index': '1 !important'
      },
      '.leaflet-popup-content-wrapper': {
        'border-radius': theme('custom.components.common.borderRadius.dropdown'), 
        'text-align': 'center',
        'background-color': 'var(--tw-dropdown-background-color)', 
        '.leaflet-popup-content': {
          'font-family': 'inherit',
          'font-size': theme('fontSize.2sm')
        }
      }
    }
  });   
}); /* v7-1bb04cf89319faa8 */