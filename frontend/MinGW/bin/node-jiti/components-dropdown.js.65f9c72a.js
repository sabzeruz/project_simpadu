"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _plugin = require('tailwindcss/plugin'); var _plugin2 = _interopRequireDefault(_plugin);

exports. default = _plugin2.default.call(void 0, ({ addComponents, theme }) => {
  // Base
  addComponents({
    '.dropdown': {
      'display': 'flex',
    },
    '.dropdown-content': {
      'display': 'none',
      'align-items': 'stretch',
      'flex-direction': 'column',
      'border': 'var(--tw-dropdown-border)',
      'box-shadow': 'var(--tw-dropdown-box-shadow)',
      'background-color': 'var(--tw-dropdown-background-color)',
      'border-radius': theme('custom.components.common.borderRadius.dropdown'),
      '.open.dropdown > &, &.open[data-popper-placement]': {
        'will-change': 'transform',
      },
    },
  });

  // Utilities
  addComponents({
    '.modal-rounded-t': {
      'border-start-start-radius': theme('custom.components.common.borderRadius.dropdown'),
      'border-start-end-radius': theme('custom.components.common.borderRadius.dropdown'),
    },
    '.modal-rounded-b': {
      'border-end-start-radius': theme('custom.components.common.borderRadius.dropdown'),
      'border-end-end-radius': theme('custom.components.common.borderRadius.dropdown'),
    },
  });
});
 /* v7-0dc25de858340427 */