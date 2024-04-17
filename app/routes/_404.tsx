import { NotFoundHandler } from "hono";

const handler: NotFoundHandler = (c) => {
  return c.render(<h1>ページが見つかりませんでした。</h1>);
};

export default handler;
