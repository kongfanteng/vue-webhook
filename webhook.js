const http = require('http')
const server = http.createServer(function(req, res) {
  console.log('req, res:', req, res)
  if(req.method === 'POST' && req.url == '/webhook') {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringfiy({ok: true}))
  } else {
    res.end('Not Found');
  }
})
server.listen(4000, () => {
  console.log('webhook 服务已经启动在 4000 端口！')
})
