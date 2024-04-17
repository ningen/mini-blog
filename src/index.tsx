import { Hono } from "hono";
import { renderer } from "./renderer";
import { TopPage } from "./toppage";

import { microcmsClient } from "./cms";

const app = new Hono<{
  Bindings: {
    MICROCMS_SERVICE_DOMAIN: string,
    MICROCMS_API_KEY: string,
  }
}>();

app.use(renderer)


app.get("/", async (c) => {

  const limit = Number(c.req.query("limit")) ?? 10
  const offset = Number(c.req.query("offset")) ?? 0
  
  const content = await microcmsClient(c.env.MICROCMS_SERVICE_DOMAIN, c.env.MICROCMS_API_KEY).getBlogContents({ limit: limit, offset: offset })
  return c.render(<TopPage blogContents={content}></TopPage>)

});


app.get("/contents/:slug", async(c) => {
  const contentId = c.req.param("slug");
  const blogContent = await microcmsClient(c.env.MICROCMS_SERVICE_DOMAIN, c.env.MICROCMS_API_KEY).getBlogContent(contentId)

  if(!blogContent) return c.notFound()

  return c.render(<div dangerouslySetInnerHTML={{ __html: blogContent.content }}></div>, {
    title: blogContent.title
  })
})

export default app;
