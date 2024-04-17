import { jsxRenderer } from 'hono/jsx-renderer'

export default jsxRenderer(({ children, title }) => {
  return (
    <html>
      <head>
        <link rel="stylesheet" href="https://unpkg.com/sakura.css/css/sakura-vader.css" />
        <title>{title}</title>
      </head>
      <body>
        <header><a href="/">Ningen mini blog</a></header>
        { children }
      </body>
    </html>
  )
})
