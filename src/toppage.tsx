import { BlogContents } from "./cms";


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