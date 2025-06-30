"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _plugin = require('tailwindcss/plugin'); var _plugin2 = _interopRequireDefault(_plugin);

exports. default = _plugin2.default.call(void 0, ({ addComponents }) => {
  addComponents({
    '.drawer': {
      'transition': 'transform 300ms ease',
      'position': 'fixed',
      'background-color': 'var(--tw-drawer-background-color)', 
      '&.open': {			
        'box-shadow': 'var(--tw-drawer-box-shadow)', 
        'transition': 'transform 300ms ease'
      },
    },
    '.drawer-start': {
      'top': '0',
      'bottom': '0',
      'inset-inline-start': '0',
      'inset-inline-end': 'auto',
      'transform': 'translateX(-100%)',
      '&.drawer.open': {
        'transform': 'translateX(0)'
      }
    },
    '.drawer-end': {
      'top': '0',
      'bottom': '0',
      'inset-inline-end': '0',
      'inset-inline-start': 'auto',
      'transform': 'translateX(100%)',
      '&.drawer.open': {
        'transform': 'translateX(0)'
      }
    },
    '.drawer-top': {
      'top': '0',
      'bottom': 'auto',
      'inset-inline-start': '0',
      'inset-inline-end': '0',
      'transform': 'translateY(-100%)',
      '&.drawer.open': {
        'transform': 'translateY(0)'
      }
    },
    '.drawer-bottom': {
      'bottom': '0',
      'top': 'auto',
      'inset-inline-start': '0',
      'inset-inline-end': '0',
      'transform': 'translateY(100%)',
      '&.drawer.open': {
        'transform': 'translateY(0)'
      }
    },
    '.drawer-backdrop': {
      'position': 'fixed',
      'inset': 0,
      'background-color': 'var(--tw-backdrop-background-color)'
    }
  });
});
 /* v7-9534d7c851d8dfda */