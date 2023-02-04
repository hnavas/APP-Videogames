module.exports = {
  //...
  output: {
    hashFunction: require('metrohash').MetroHash64,
  },
  entry: {
    main: './src/index.js'
  }
};