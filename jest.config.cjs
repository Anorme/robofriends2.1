module.exports ={
  testEnvironment: "jsdom",
  moduleNameMapper: {
    '\\.(css|scss|less|sass)$': 'identity-obj-proxy'
  },
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.js'
  ]
}