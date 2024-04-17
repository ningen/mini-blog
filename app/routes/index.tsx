import { createRoute } from 'honox/factory'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

import { BlogContents, microcmsClient } from '../cms'

type Props = {
    blogContents: BlogContents,
    pageNumber: number
}

const renderBlogContent = (blogContent: BlogContents["contents"][number]) => {
    const href = `/contents/${blogContent.id}`
    return <div>
        <a href={href}>{ blogContent.title }</a>
    </div>
}


const perPage = 10

const pagenator = (totalCount: number, pageNumber: number) => {
    return {
        hasNext: totalCount > pageNumber * perPage,
        hasPrev: pageNumber > 1
    }
}

export const TopPage = (props: Props) => {
    const { hasNext, hasPrev } = pagenator(props.blogContents.totalCount, props.pageNumber)
    return <>
        <main>
            <p>総件数: {props.blogContents.totalCount}</p>
            <div>
                { props.blogContents.contents.map(v => {
                    return renderBlogContent(v);
                })}
            </div>
            { hasNext ? <a href={`/?page=${props.pageNumber + 1}`}>次のページへ</a> : <></>}
            { hasPrev ? <a href={`/?page=${props.pageNumber - 1}`}>前のページへ</a> : <></>}
        </main>
    </>
}

export default createRoute(zValidator('query', z.object({
    page: z.string().optional().default("1").transform(v => {
        const page = Number(v);
        if(page <= 0) return 1
        return page
    })
})), async (c) => {

    const { page } = c.req.valid("query")
    const offset = perPage * (page - 1)
    const content = await microcmsClient(c.env.MICROCMS_SERVICE_DOMAIN, c.env.MICROCMS_API_KEY).getBlogContents({ limit: perPage, offset: offset })
    return c.render(<TopPage pageNumber={page} blogContents={content}></TopPage>, {
        title: "Ningen mini blog"
    })
})