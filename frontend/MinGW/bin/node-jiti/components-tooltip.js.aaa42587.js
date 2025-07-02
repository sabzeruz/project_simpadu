"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } 
var _plugin = require('tailwindcss/plugin'); var _plugin2 = _interopRequireDefault(_plugin);

exports. default = _plugin2.default.call(void 0, ({addComponents, theme}) => {
	// Base	
  addComponents({
    '.tooltip': {
			'display': 'none',
			'color': 'white', 
			'z-index': theme('custom.components.common.zIndex.tooltip'),
      'box-shadow': 'var(--tw-tooltip-box-shadow)', 
      'background-color': 'var(--tw-tooltip-background-color)',
			'border': 'var(--tw-tooltip-border)',
			'border-radius': theme('custom.components.common.borderRadius.tooltip'),
			'padding': '0.375rem 0.6rem',
			'font-size': theme('fontSize.xs'),
			'font-weight': theme('fontWeight.normal'),
			'line-height': theme('fontSize.xs.1.lineHeight'),
			'&.show': {
				'display': 'block'
			}
    }
  });   
}); /* v7-70735c402441993c */