export default ({
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",

    ],
    theme: {
        extend: {
            backgroundImage: {
                'signup': "url('./Images/Travel-Images-For-Desktop 1.png')",
                'shadow': "url('./Images/Rectangle 20197.png')",
                'shadow1': "url('./Images/Rectangle 6.png')",
            },
            animation: {
                'custom': 'slow 250ms ',
            },
            keyframes: {
                slow: {
                    '0%': { transform: 'scale(0)' },
                    '100%': { transform: 'scale(1)' },
                }
            }
        },
    },
    plugins: [function ({ addUtilities }) {
        addUtilities({
            '.no-spinner::-webkit-outer-spin-button, .no-spinner::-webkit-inner-spin-button': {
                '-webkit-appearance': 'none',
                margin: '0',
            },
            '.no-spinner': {
                '-moz-appearance': 'textfield',
            },
        });
    },],
});
