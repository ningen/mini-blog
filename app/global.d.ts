import {} from "hono";

declare module "hono" {
  interface Env {
    Variables: {};
    Bindings: {
      MICROCMS_SERVICE_DOMAIN: string;
      MICROCMS_API_KEY: string;
    };
  }
  interface ContextRenderer {
    (content: string | Promise<string>, props?: { title?: string }): Response;
  }
}
