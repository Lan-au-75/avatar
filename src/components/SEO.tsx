import { Helmet } from 'react-helmet-async'

interface Props {
    title: string
    description: string
}

function SEO({ title, description }: Props) {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keywords' content='avatar,video,phim hay, phim moi, phim lau, phim hd' />
            <link rel='canonical' href='https://avatar-git-avatar-lan-au-75.vercel.app/' />
        </Helmet>
    )
}

export default SEO
