module.exports = {
    testEnvironment: 'jsdom',
    transform: {
        "^.+\\.(ts|tsx)?$": "babel-jest",
        "^.+\\.js$": "babel-jest"
    },
    moduleNameMapper: {
        "\\.(css|less|scss|sss|styl)$": "<rootDir>/node_modules/jest-css-modules"
    },
    transformIgnorePatterns: ["<rootDir>/node_modules/(?!(axios)/)"]
};