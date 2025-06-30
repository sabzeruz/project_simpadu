"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } 
var _plugin = require('tailwindcss/plugin'); var _plugin2 = _interopRequireDefault(_plugin);

exports. default = _plugin2.default.call(void 0, ({addComponents, theme}) => {
  // Base
  addComponents({
    '.tabs': {
      'display': 'flex',
      'align-items': 'center',
      'gap': theme('spacing.5'),
      'border-bottom': '1px solid var(--tw-gray-200)'
    },
    '.tab': {
      'display': 'inline-flex',
      'align-items': 'center',
      'gap': theme('spacing')['2'],
      'font-size': theme('fontSize.2sm'),
      'line-height': '1',
      'color': 'var(--tw-gray-700)',
      'i': {
        'font-size': theme('fontSize.md'),
        'color': 'var(--tw-gray-600)',
      },
      'font-weight': theme('fontWeight.medium'),
      'padding': `${theme('spacing.4')} 0`,
      'border-bottom': '2px solid transparent',
      '&.active, &:hover, &:focus': {
        'color': 'var(--tw-primary)',
        'i': {
          'color': 'var(--tw-primary)'
        }
      },
      '&.active': {
        'border-bottom-color': 'var(--tw-primary)'
      }
    } 
  }); 
}); /* v7-4326ba8857e0e8f0 */