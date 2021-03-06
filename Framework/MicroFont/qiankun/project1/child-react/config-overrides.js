module.exports = {
  webpack: (config) => {
    config.output.library = 'reactApp'
    config.output.libraryTarget = 'umd'
    config.output.publicPath = 'http://localhost:20001/'
    return config
  },
  devServer:(configFunction) => {
    return function(proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost)
      config.headers = {
        'Access-Control-allow-Origin': '*' 
      }
      return config
    }
  }
}