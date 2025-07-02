"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } 
var _plugin = require('tailwindcss/plugin'); var _plugin2 = _interopRequireDefault(_plugin);

exports. default = _plugin2.default.call(void 0, ({addComponents}) => {
	addComponents({
		'.range': {
			'width': '100%',
			'height': '0.5rem',
			'padding': '0',
			'appearance': 'none',
			'&:focus': {
				'outline': 0
			},		
			'&::-moz-focus-outer': {
				'border': '0'
			},		
			'&::-webkit-slider-thumb': {
				'width': '1.625rem',
				'height': '1.625rem',
				'margin-top': '-0.563rem',
				'box-shadow': 'var(--tw-default-box-shadow)',
				'appearance': 'none',
				'border': '1px solid var(--tw-gray-200)',
				'transition': 'background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out',
				'border-radius': '50%',		
				'background-color': 'var(--tw-light)',
				'&:active': {
					'background-color': 'var(--tw-light)'
				}
			},
			'&::-moz-range-thumb': {
				'width': '1.625rem',
				'height': '1.625rem',
				'margin-top': '-0.563rem',
				'box-shadow': 'var(--tw-default-box-shadow)',
				'appearance': 'none',
				'border': '1px solid var(--tw-gray-200)',
				'transition': 'background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out',
				'border-radius': '50%',		
				'background-color': 'var(--tw-light)',
				'&:active': {
					'background-color': 'var(--tw-light)'
				}
			},		
			'&::-moz-range-track': {
				'width': '100%',
				'height': '0.5rem',
				'color': 'transparent',
				'cursor': 'pointer',
				'background-color': 'var(--tw-gray-200)',
				'border-color': 'transparent',
				'border-radius': '0.188rem'
			},
			'&::-webkit-slider-runnable-track': {
				'width': '100%',
				'height': '0.5rem',
				'color': 'transparent',
				'cursor': 'pointer',
				'background-color': 'var(--tw-gray-200)',
				'border-color': 'transparent',
				'border-radius': '0.188rem'
			},		
			'&:disabled': {
				'pointer-events': 'none',		
				'&::-webkit-slider-thumb': {
					'background-color': 'var(--tw-gray-100)'
				},
				'&::-moz-range-thumb': {
					'background-color': 'var(--tw-gray-100)'
				}
			}
		}
	});
}); /* v7-8a15844ee4cbfc0c */