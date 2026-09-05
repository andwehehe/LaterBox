import * as cheerio from "cheerio";

export const getMetadata = async (url) => {
    const response = await fetch(url);
    const html = await response.text();
    const scrape = cheerio.load(html);

    const iconUrl = scrape('link[rel="icon"]').attr("href") 
        || scrape('link[rel="shortcut icon"]').attr("href");

    const hostname = new URL(url).hostname
        .replace("www.", "")
        .split(".")[0];

    const icon = iconUrl
        ? new URL(iconUrl, url).href
        : null;
    
    const favicon = `https://www.google.com/s2/favicons?domain=${new URL(url).hostname}&sz=128`;

    return {
        title:
            scrape('meta[property="og:title"]').attr("content") ||
            scrape('meta[name="title"]').attr("content") ||
            scrape('title').text() ||
            null,
        description:
            scrape('meta[property="og:description"]').attr("content") ||
            scrape('meta[name="description"]').attr("content") ||
            null,
        platform: 
            scrape('meta[property="og:site_name"]').attr("content") ||
            hostname ||
            null,
        thumbnail:
            scrape('meta[property="og:image"]').attr("content") ||
            scrape('meta[name="twitter:image"]').attr("content") ||
            null,
        icon:
            icon || favicon || null
    };
};