import * as cheerio from "cheerio";

export const getMetadata = async (url) => {
    const response = await fetch(url);
    const html = await response.text();
    const scrape = cheerio.load(html);

    const iconUrl = scrape('link[rel="icon"]').attr("href") 
        || scrape('link[rel="shortcut icon"]').attr("href");

    const icon = iconUrl
        ? new URL(iconUrl, url).href
        : null;

    return {
        platform: 
            scrape('meta[property="og:site_name"]').attr("content") ||
            scrape("title").text() ||
            null,
        thumbnail:
            scrape('meta[property="og:image"]').attr("content") ||
            scrape('meta[name="twitter:image"]').attr("content") ||
            null,

        icon:
            icon || null
    };
};

export const getTitleAndDescription = async (url) => {
    const response = await fetch(url);
    const html = await response.text();
    const scrape = cheerio.load(html);

    const title =
        scrape('meta[property="og:title"]').attr("content") ||
        scrape('meta[name="title"]').attr("content") ||
        scrape('title').text() ||
        null;

    const description =
        scrape('meta[property="og:description"]').attr("content") ||
        scrape('meta[name="description"]').attr("content") ||
        null;

    return { title, description };
};