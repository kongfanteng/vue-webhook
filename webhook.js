const http = require('http')
const server = http.createServer(function (req, res) {
  if (req.method === 'POST' && req.url == '/webhook') {
    const buffers = []
    req.on('data', function (buffer) {
      buffers.push(buffer)
    })
    req.on('end', function () {
      const body = Buffer.concat(buffers)
      console.log('req.header:', req.header)
      const event = req.header['x-github-event'] //evet = push
      const signature = req.headers['x-hub-signature']
      console.log('event:', event)
      console.log('signature:', signature)
      console.log('body:', body)
    })
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ ok: true }))
  } else {
    res.end('Not Found')
  }
})
server.listen(4000, () => {
  console.log('webhook 服务已经启动在 4000 端口！')
})
