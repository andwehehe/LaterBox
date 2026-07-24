const getBookmarks_query = `
    SELECT  
        b.bookmark_id,
        b.title,
        b.url,
        b.platform,
        b.note,
        b.is_visited,
        b.is_starred,
        b.is_private,
        DATE_FORMAT(b.saved_on, '%M %d, %Y') AS saved_on,
        GROUP_CONCAT(t.tag ORDER BY t.tag_id SEPARATOR ',') AS tags
    FROM bookmarks b 
    LEFT JOIN bookmark_tags bt
        ON b.bookmark_id = bt.bookmark_id
    LEFT JOIN tags t
        ON bt.tag_id = t.tag_id
    WHERE b.user_id = ?
    GROUP BY
        b.bookmark_id,
        b.title,
        b.url,
        b.note,
        b.platform,
        b.is_visited,
        b.is_starred,
        b.is_private;
`;

const getTargetBookmark_query = `
    SELECT  
        b.bookmark_id,
        b.title,
        b.url,
        b.platform,
        b.note,
        b.is_visited,
        b.is_starred,
        b.is_private,
        DATE_FORMAT(b.saved_on, '%M %d, %Y') AS saved_on,
        GROUP_CONCAT(t.tag ORDER BY t.tag_id SEPARATOR ',') AS tags
    FROM bookmarks b 
    LEFT JOIN bookmark_tags bt
        ON b.bookmark_id = bt.bookmark_id
    LEFT JOIN tags t
        ON bt.tag_id = t.tag_id
    WHERE b.bookmark_id = ?
    GROUP BY
        b.bookmark_id,
        b.title,
        b.url,
        b.note,
        b.platform,
        b.is_visited,
        b.is_starred,
        b.is_private;
`;

export const bookmarkQueries = {
    getBookmarks_query,
    getTargetBookmark_query
}