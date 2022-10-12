const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './src/**/*.{html,js}',
  ],
  theme: {
    fontFamily:{
      body:[
        "Helvetica Neue",
        "Arial",
        "Hiragino Kaku Gothic ProN",
        "Hiragino Sans",
        "Meiryo",
        "sans-serif"
      ]
    },
    extend: {},
  },
  plugins: [
    plugin(function ({ addBase, addComponents }) {
      addBase({
        'body': {
          "@apply font-body bg-slate-200": {}
        },
        'h1':{
          "@apply text-xl font-bold mb-6 text-center text-gray-800": {}
        },
        'h2':{
          "@apply text-lg font-normal text-black mb-1": {}
        },
        "a":{
          "@apply text-blue-600 font-bold hover:underline" : {}
        },
        'form': {
          "@apply bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4": {}
        },
        'label':{
          "@apply block mb-2 text-sm font-bold text-gray-600": {},
        },
        'label[for="agree_check"]':{
          "@apply ml-2 mb-0 text-sm font-medium text-gray-900": {},
        },
        'input':{
          "@apply block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg":{},
          "@apply focus:ring-blue-500 focus:border-blue-500": {}
        },
        'input[type="checkbox"]':{
          "@apply w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300": {},
          "@apply focus:ring-blue-500": {}
        },
      })
      addComponents({
        '.submit_btn':{
          "@apply text-white bg-blue-600 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center": {},
          "@apply hover:bg-blue-800": {},
          "@apply focus:ring-4 focus:outline-none focus:ring-blue-300": {},
          "@apply disabled:text-white disabled:bg-gray-300 disabled:cursor-not-allowed": {},
          "@apply sm:w-auto": {},
        },
        '.close_btn':{
          "@apply absolute top-3 right-2.5 text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center":{},
          "@apply hover:bg-gray-200 hover:text-gray-900": {}
        },
        '.agree_btn':{
          "@apply text-white bg-red-600 font-medium rounded-lg text-sm items-center px-5 py-2.5 text-center": {},
          "@apply hover:bg-red-800": {},
          "@apply focus:ring-4 focus:outline-none focus:ring-red-300": {},
          "@apply disabled:text-white disabled:bg-gray-300 disabled:cursor-not-allowed": {},
          "@apply sm:w-auto": {},
        },
        '.cancel_text':{
          "@apply text-white text-sm py-3 underline": {},
          "@apply hover:text-gray-400 hover:cursor-pointer": {},
        },
        '.modal':{
          "@apply overflow-y-auto fixed top-0 right-0 left-0 z-50 inset-0 h-full bg-stone-800/80 flex items-center justify-center": {},
        }
      })
    })
  ]
}
