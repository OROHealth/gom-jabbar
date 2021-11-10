import React from 'react';
import {Helmet} from 'react-helmet';

interface Props {
    seo_title: string
    seo_description: string
    seo_keywords: string[]
    seo_robots: string[]
    seo_language?: 'en' | 'fr'
    seo_relay?: number
    seo_author?: string
}

const AppHelmet: React.FC<Props> = ({
    seo_author,
    seo_description,
    seo_keywords,
    seo_language,
    seo_relay,
    seo_robots,
    seo_title
}) => {
    return (
        <Helmet htmlAttributes={{ "lang" : seo_language ? seo_language : "en" }}>
            <meta charSet="utf-8"/>
            <title>{process.env.REACT_APP_WEBAPP_NAME + ` | ${seo_title}`}</title>
            <link rel="canonical" href={process.env.REACT_APP_WEBAPP_DOMAIN}/>
            <meta name="title" content={process.env.REACT_APP_WEBAPP_NAME + ` | ${seo_title}`}/>
            <meta name="description" content={seo_description}/>
            <meta name="keywords" content={seo_keywords.join(",")}/>
            <meta name="robots" content={seo_robots.join(",")}/>
            <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8"/>
            <meta name="language" content="French"/>
            <meta name="revisit-after" content={`${seo_relay ? seo_relay : 1} days`}/>
            <meta name="author" content={seo_author ? seo_author : seo_title}/>
        </Helmet>
    )
}

export default AppHelmet;
