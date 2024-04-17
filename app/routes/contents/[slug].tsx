import { createRoute } from 'honox/factory'
import { BlogContent, microcmsClient } from '../../cms';

import notFound from "../_404"


type Props = {
    content: BlogContent
}
export const Content = (props: Props) => {
    const { content } = props
    return <>
        <h1>{ content.title }</h1>
        <div dangerouslySetInnerHTML={{ __html: content.content }}></div>
    </>
}

export default createRoute(async (c) => {
    const contentId = c.req.param("slug")
    const blogContent = await microcmsClient(c.env.MICROCMS_SERVICE_DOMAIN, c.env.MICROCMS_API_KEY).getBlogContent(contentId)

    if(!blogContent) return notFound(c) 

    return c.render(<Content content={blogContent}></Content>, {
        title: blogContent.title
    })
})