const PROXY_CONFIG = {
    "/api": {
        "target": "https://sandbox-api.brewerydb.com/v2",
        "logLevel": "debug",
        "changeOrigin": true,
        "pathRewrite": function (path, req) {
            const apiKey = "key=659d5c6b8f3d2447f090119e48202fdb"
            const keyword = path.replace(/^\/api/, '');

            let apiURL = ``
            if (keyword.indexOf('?') === -1) {
                apiURL = `${keyword}?${apiKey}`
            } else {
                apiURL = `${keyword}&${apiKey}`
            }
            return apiURL
        }
    }
}

module.exports = PROXY_CONFIG;
