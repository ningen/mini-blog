import { createRoute } from 'honox/factory'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

import { BlogContents, microcmsClient } from '../cms'




type Props = {
    blogContents: BlogContents
}

const renderBlogContent = (blogContent: BlogContents["contents"][number]) => {
    const href = `/contents/${blogContent.id}`
    return <div>
        <a href={href}>{ blogContent.title }</a>
    </div>
}

export const TopPage = (props: Props) => {
    return <>
        <div>
            <p>総件数: {props.blogContents.totalCount}</p>
            <div>
                { props.blogContents.contents.map(v => {
                    return renderBlogContent(v);
                })}
            </div>
        </div>
    </>
}

export default createRoute(zValidator('query', z.object({
    limit: z.number().default(10),
    offset: z.number().default(0),
    page: z.number().default(1),
})), async (c) => {
    const { page } = c.req.valid("query")

    const limit = 10
    const offset = limit * (page - 1)
    const content = await microcmsClient(c.env.MICROCMS_SERVICE_DOMAIN, c.env.MICROCMS_API_KEY).getBlogContents({ limit: limit, offset: offset })
    return c.render(<TopPage blogContents={content}></TopPage>, {
        title: "Ningen mini blog"
    })
})