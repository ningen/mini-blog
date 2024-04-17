export type Category = {
  id: string,
  createdAt: string,
  updatedAt: string,
  publishedAt: string,
  revisedAt: string,
  name: string 
}

export type BlogContent = {
  id: string,
  createdAt: string,
  updatedAt: string,
  publishedAt: string,
  revisedAt: string,
  title: string,
  content: string,
  eyecatch: {
    url: string,
    height: number,
    width: number
  },
  category: Category
}

export type BlogContents = ListContents<BlogContent>

export type ListContents<T> = {
  contents: T[],
  totalCount: number,
  limit: number,
  offset: number
}


const fetchBlogContent = (serviceDomain: string, apiKey: string) => async (contentId: string): Promise<BlogContent | undefined> => {
  const response = await fetch(`https://${serviceDomain}.microcms.io/api/v1/blogs/${contentId}`, {
    headers: {
      "X-MICROCMS-API-KEY": apiKey
    }
  })

  if (response.status !== 200) {
    console.error(`status_code: ${response.status}`);
    return undefined 
  }

  const responseJson = await response.json() as BlogContent;
  return responseJson
}

const fetchBlogContents = (serviceDomain: string, apiKey: string) => async (query: { limit: number, offset: number }): Promise<ListContents<BlogContent>> => {
  const response = await fetch(`https://${serviceDomain}.microcms.io/api/v1/blogs/?limit=${query.limit}&offset=${query.offset}`, {
    headers: {
      "X-MICROCMS-API-KEY": apiKey
    }
  })

  if (response.status !== 200) {
    return {
      contents: [],
      totalCount: 0,
      limit: query.limit,
      offset: query.offset 
    }
  }

  const responseJson = await response.json() as ListContents<BlogContent>;
  return responseJson
}

export const microcmsClient = (serviceDomain: string, apiKey: string) => {
  return {
    getBlogContent: (contentId: string) => fetchBlogContent(serviceDomain, apiKey)(contentId),
    getBlogContents: (query: { limit: number, offset: number }) => fetchBlogContents(serviceDomain, apiKey)(query)
  }
}