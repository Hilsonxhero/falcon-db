/** @type {import('tailwindcss').Config} */
module.exports= {

  content: [ "./index.html",
  "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'design-base': '0px 2px 14px #0000001a',
          'design': '0px 0px 16px #0000001a',
      }

      ,
    }

    ,
    container: {

      center: true,
      padding: {
        DEFAULT: "2rem",
          sm: "2rem",
          lg: "2rem",
          xl: "2rem",
          "2xl": "2rem",
          "3xl": "2rem",
      }

      ,
      screens: {
        lg: "1124px",
          xl: "1280px",
          "2xl": "1536px",
      }

      ,
    }

    ,
  }

  ,
  plugins: [],
}