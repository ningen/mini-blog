import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children, title }) => {
  return (
    <html>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css"></link>
        <title>{title}</title>
      </head>
      <body>
        <header><a href="/">Ningen mini blog</a></header>
        <h1>{ title }</h1>
        { children }
      </body>
    </html>
  )
})
