const path = require('path');

module.exports = {
  entry: './index.js',

  devServer: {
    contentBase: path.join(__dirname, "src"),
    compress: true,
    port: 8054,
	https:true,
	host:"localhost",
	disableHostCheck:true,
	
    historyApiFallback: {
		index:"/simple/index.html",
		disableDotRule: true,
		htmlAcceptHeaders: ['text/html', 'application/xhtml+xml']
    },
	 proxy: [{
      context: ['/networking', '/ace-lib'],
      "target": "https://satheesh.vmaalqamain.eur.ad.sag",
      "secure": false,
      "changeOrigin": "true"
    }]
    
  }
};