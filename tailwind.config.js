module.exports = {
    
    content: ['./src/**/*.{html,js}', './node_modules/tw-elements/dist/js/**/*.js'],
    plugins: [
        require("daisyui"),
    ],
    daisyui: {
        themes: [{
            light: {
                ...require("daisyui/src/colors/themes")["[data-theme=light]"],
                primary: "#1d4ed8",
                "primary-focus": "mediumblue",
              },
        }]
    },
    theme: {
    extend: {
        blur: {
        xs: '2px',
        }
    }
    }
  }