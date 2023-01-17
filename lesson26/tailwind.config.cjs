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
      ],
      indexBody: [
        "YuGothic",
        "Yu Gothic",
        "Yu Gothic UI",
        "ＭＳ ゴシック",
        "ヒラギノ角ゴシック",
        "Hiragino Sans",
        "Hiragino Kaku Gothic ProN",
        "ヒラギノ角ゴ ProN W3",
        "sans-serif"
      ]
    },
    extend: {
      transitionDelay: {
        '2000': '2000ms',
      }
    },
  },
  plugins: [
    plugin(function ({ addBase, addComponents,addVariant }) {
      addVariant('active', '&.is-active'),
      addBase({
        'body': {
          "@apply font-body bg-slate-200": {}
        },
        'h1':{
          "@apply text-2xl font-bold mb-6 text-center text-gray-800": {}
        },
        'h2':{
          "@apply text-lg font-normal text-black mb-1": {}
        },
        "a":{
          "@apply text-blue-600 font-bold hover:underline cursor-pointer" : {}
        },
        'form': {
          "@apply bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4": {}
        },
        'label':{
          "@apply block mb-2 text-base font-bold text-gray-600": {},
        },
        'label[for="agree_check"]':{
          "@apply ml-2 mb-0 text-base font-medium text-gray-900": {},
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
        '.cancel_button':{
          "@apply text-gray-700 bg-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 m-auto": {},
          "@apply hover:text-gray-400 hover:cursor-pointer": {},
        },
        '.modal':{
          "@apply overflow-y-auto fixed top-0 right-0 left-0 z-50 inset-0 h-full bg-stone-800/80 flex flex-col items-center justify-center": {},
        },
        '.error-message':{
          "@apply text-red-500 py-[20px] px-[100px] bg-red-100": {},
        },
        '.loading-area':{
          "@apply table text-center absolute top-0 bottom-0 left-0 right-0 h-full w-full delay-1000 z-10": {},
        },
        '.loading-image':{
          "@apply text-sm my-12 mx-auto w-[3em] h-[3em] rounded-full absolute bg-blue-500/0 bg-gradient-to-l from-blue-900 top-[calc(50%-60px)] bottom-0 left-0 right-0 animate-spin indent-[-9999px]": {},
          "@apply before:absolute before:content-[''] before:top-0 before:left-0 before:w-1/2 before:h-1/2 before:bg-white before:rounded-tl-full":{},
          "@apply after:absolute after:content-[''] after:left-0 after:right-0 after:top-0 after:bottom-0 after:w-3/4 after:h-3/4 after:rounded-full after:bg-white after:m-auto":{},
        },
        '.slider-list': {
          "@apply relative flex justify-center items-center text-center box-border h-[300px] max-w-[1000px] w-full mx-auto mb-[30px] p-[30px] overflow-hidden sm:h-[500px]":{}
        },
        '.slider-list__item':{
          "@apply absolute top-0 right-0 left-0 text-center z-0 w-full opacity-0": {},
          "@apply active:z-10 active:opacity-100": {},
        },
        '.slider-btn':{
          "@apply absolute inline-block text-[1rem] top-[calc(50%-40px)] bg-blue-700 border border-white p-[15px] rounded-full z-10 align-middle shadow-lg shadow-black/40":{},
          "@apply hover:opacity-70":{},
          "@apply before:absolute before:m-auto before:content-[''] before:align-middle before:top-0 before:bottom-0 before:left-[8px] before:w-[10px] before:h-[10px] before:border-r before:border-t before:border-r-white before:border-t-white before:origin-center before:rotate-45":{},
          "@apply disabled:text-white disabled:bg-gray-300 disabled:border-2 disabled:border-gray-300 disabled:pointer-events-none":{},
        },
        '.prev-btn':{
          "@apply left-0 origin-center rotate-180 ml-[10px]": {},
        },
        '.next-btn':{
          "@apply right-0 mr-[10px]": {},
        },
        '.pagination-list':{
          "@apply absolute text-[0.85rem] text-center w-full right-0 left-0 bottom-[27px] z-10 p-[5px] bg-white": {},
        },
        '.pagination-list__item':{
          "@apply inline-block mr-[10px] cursor-pointer bg-white rounded-full z-10 align-middle p-[5px] border border-gray-300 drop-shadow-md shadow-black/40": {},
          "@apply hover:opacity-70 cursor-pointer": {},
          "@apply active:bg-blue-700 active:border active:border-blue-500": {},
        },
        '#total-number':{
          "@apply absolute bottom-0 right-0 left-0 text-center w-full z-10 p-[5px] bg-white drop-shadow-md shadow-black/40 tracking-[.3em]":{}
        },
        '.current-number':{
          "@apply text-blue-700":{}
        },
        '.topics-list':{
          "@apply relative flex justify-between items-end w-full m-auto px-[20px] lg:px-[0px] max-w-[1000px]":{}
        },
        '.topics-list__item':{
          "@apply text-white text-[0.9rem] md:text-[1.25rem] tracking-tight text-center md:tracking-[.1em] bg-blue-700 border border-b-0 border-blue-700 rounded-t w-1/4 py-[10px] px-[5px] mr-[3px]":{},
          "@apply active:relative active:py-[15px]":{},
          "@apply [&:first-child]:bg-blue-900 [&:first-child]:border-blue-900":{},
          "@apply [&:nth-child(2)]:bg-orange-600 [&:nth-child(2)]:border-orange-600":{},
          "@apply [&:nth-child(3)]:bg-amber-500 [&:nth-child(3)]:border-amber-500":{},
          "@apply last:mr-0":{},
          "@apply [&.is-active:after]:absolute [&.is-active:after]:content-[''] [&.is-active:after]:right-0 [&.is-active:after]:bottom-[-15px] [&.is-active:after]:left-0 [&.is-active:after]:w-0 [&.is-active:after]:h-0 [&.is-active:after]:m-auto [&.is-active:after]:border-t-[15px] [&.is-active:after]:border-r-[15px] [&.is-active:after]:border-l-[15px] [&.is-active:after]:border-white [&.is-active:after]:border-t-inherit":{}
        },
        '.contents-area':{
          "@apply w-full m-auto px-[20px] lg:px-[0px] max-w-[1000px]":{}
        },
        '.contents-box':{
          "@apply flex flex-col-reverse sm:flex-row mb-[100px] border-t-0 rounded-[3px] bg-white shadow-2xl shadow-gray-700/50":{}
        },
        '.contents-item':{
          "@apply w-full p-[20px] sm:w-[70%]":{}
        },
        '.topics-img':{
          "@apply w-[60%] mb-0 mx-auto mt-[20px] sm:mt-[0px]":{}
        },
        '.topics-img__item':{
          "@apply hidden w-full max-w-[600px]":{},
          "@apply active:block":{}
        },
        '.article-list':{
          "@apply hidden mt-[10px] ml-[15px] sm:mt-[30px]":{},
          "@apply active:block":{},
        },
        '.article-list__item':{
          "@apply flex relative flex-wrap pl-[15px] mb-[20px]":{},
          "@apply before:content-[''] before:absolute before:top-[0.4em] before:left-0 before:w-[7px] before:h-[7px] before:bg-gray-300 before:rounded-full":{},
        },
        '.article-list__item a':{
          "@apply max-w-[80%]":{},
        },
        '.article-title':{
          "@apply truncate":{},
          "@apply active:block":{},
        },
        '.comment-icon':{
          "@apply inline-block w-[18px] ml-[10px]":{},
        },
        '.new-icon':{
          "@apply inline-block text-white bg-orange-500 text-[0.75rem] ml-[5px] px-[10px] rounded-lg":{},
        },
        '.comment-number':{
          "@apply text-[0.75rem] inline-block rounded-full ml-[3px]":{},
        },
      })
    })
  ]
}
