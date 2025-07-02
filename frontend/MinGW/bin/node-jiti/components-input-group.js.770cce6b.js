"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _plugin = require('tailwindcss/plugin'); var _plugin2 = _interopRequireDefault(_plugin);

exports. default = _plugin2.default.call(void 0, ({ addComponents }) => {
  // Form input
  addComponents({
    '.input-group': {
      'display': 'flex',
      'align-items': 'stretch',
      '.btn': {
        'flex-shrink': '0',
      },
      '.input': {
        'flex-grow': '1',
      },
      '.input ~ .btn, .input ~ .dropdown > .btn': {
        'border-start-start-radius': '0',
        'border-end-start-radius': '0',
      },
      '.input + .btn, .input + .dropdown > .btn': {
        'border-inline-start': '0',
      },
      '.btn ~ .input, .btn ~ .btn, .input ~ .input': {
        'border-start-start-radius': '0',
        'border-end-start-radius': '0',
      },
      '.input:has(~ .btn), .input:has(~ .input), .input:has(~ .dropdown > .btn)': {
        'border-start-end-radius': '0',
        'border-end-end-radius': '0',
      },
      '.btn:has(~ .input, ~ .btn), .input:has(~ .input)': {
        'border-start-end-radius': '0',
        'border-end-end-radius': '0',
        'border-inline-end': '0',
      },
    },
  });
});
 /* v7-131bd5613ca79dbb */