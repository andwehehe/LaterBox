export const getPlatformName = (url) => {
    try {
        const hostname = new URL(url).hostname.replace(/^www\./, "").toLowerCase();
        const platforms = [
            ["youtube.com", "YouTube"], ["youtu.be", "YouTube"],
            ["github.com", "GitHub"], ["twitter.com", "X / Twitter"],
            ["x.com", "X / Twitter"], ["facebook.com", "Facebook"],
            ["instagram.com", "Instagram"], ["tiktok.com", "TikTok"]
        ];

        return platforms.find(([domain]) => hostname === domain || hostname.endsWith(`.${domain}`))?.[1] ?? hostname;
    } catch {
        return "Other";
    }
};