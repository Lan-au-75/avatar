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
            <link rel='canonical' href='https://avatar-red.vercel.app/' />

            <meta property='og:url' content='https://avatar-red.vercel.app/' />
            <meta property='og:title' content={title} />
            <meta property='og:description' content={description} />
            <meta
                property='og:image'
                content='https://upload.wikimedia.org/wikipedia/vi/8/8b/Avatar_2_logo.jpg'
            />
        </Helmet>
    )
}

export default SEO
