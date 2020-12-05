module.exports = {
	mongodbMemoryServerOptions: {
	  instance: {
		dbName: 'SchittsTest'
	  },
	  binary: {
		version: '4.2.10', // Version of MongoDB
		skipMD5: true
	  },
	  autoStart: false
	}
  };