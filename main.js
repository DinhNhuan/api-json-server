const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const queryString = require('query-string');

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
    res.jsonp(req.query)
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
    if (req.method === 'POST') {
        req.body.createdAt = Date.now();
        req.body.updatedAt = Date.now();
    } else if (req.method === 'PATH') {
        req.body.updatedAt = Date.now();
    }
    // Continue to JSON Server router
    next()
});


router.render = (req, res) => {
    const headers = res.getHeaders()
    const totalCountHeader = headers['x-total-count'];
    const queryParam = queryString.parse(req._parsedUrl.query);

    if (req.method === 'GET' && totalCountHeader) {
        const result = {
            data: res.locals.data,
            pagination: {
                _page: Number.parseInt(queryParam._page) || 1,
                _totalRows: Number.parseInt(totalCountHeader),
                _limit: Number.parseInt(queryParam._limit) || 10
            }
        }
        return res.jsonp(result);
    }

}

// Use default router
const port = process.env.PORT || 3000;
server.use("/api", router)
server.listen(port, () => {
    console.log('JSON Server is running')
})