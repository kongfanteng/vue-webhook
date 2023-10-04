const crypto = require('crypto')
const SECRET = '123456'
const sign = (body) => `sha1=${ crypto.createHmac('sha1', SECRET).update(body).digest('hex') }`;
const http = require('http')
const server = http.createServer(function (req, res) {
  if (req.method === 'POST' && req.url == '/webhook') {
    const buffers = []
    req.on('data', function (buffer) {
      buffers.push(buffer)
    })
    req.on('end', function () {
      const body = Buffer.concat(buffers)
      const event = req.headers['x-github-event'] //evet = push
      const signature = req.headers['x-hub-signature']     
      if (signature !== sign(body)){
        return res.end('Not Allowed')
      }
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
