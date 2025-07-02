"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } 
var _plugin = require('tailwindcss/plugin'); var _plugin2 = _interopRequireDefault(_plugin);

exports. default = _plugin2.default.call(void 0, ({addComponents, theme}) => {
  // Base
  addComponents({
    '.progress': {
      'width': '100%',
      'display': 'flex',
			'min-height': '4px',
			'overflow': 'hidden',
			'background-color': 'var(--tw-gray-100)',
			'border-radius': theme('custom.components.common.borderRadius.progress'),      
    },
		'.progress-bar': {
			'display': 'flex',
			'flex-direction': 'column',
			'justify-content': 'center',
			'overflow': 'hidden',
			'text-align': 'center',
			'white-space': 'nowrap',
			'background-color': 'var(--tw-gray-300)',
      'border-radius': theme('custom.components.common.borderRadius.progress'),  
    }
  });

  // Color options
  const colors = ['primary', 'success', 'danger', 'warning', 'info', 'dark'];

  colors.forEach((color) => {
    addComponents({
      [`.progress-${color}`]: {
        'background-color': `var(--tw-${color}-light)`,
				'.progress-bar': {
					'background-color': `var(--tw-${color})`
				}
      }			
    });
  });   
}); /* v7-d46e1db0b2e10fd6 */