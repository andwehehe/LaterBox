// Placeholder data only — swap every array/object here for real API
// responses once the backend exists. Nothing in this file is fetched
// or persisted; it just gives the UI something realistic to render.

export const currentUser = {
  name: "Alberto Du Bist Gut Genug",
  email: "albertoSundotSammy67@gmail.com",
  plan: "ID: 1000",
  avatarInitials: "JR"
};

export const bookmarks = [
  {
    id: "b1",
    platform: "YouTube",
    title: "Building a Modern Design System",
    url: "youtube.com/watch?v=design-tips",
    quote:
      "Essential tips for scalable component architecture and token management.",
    tags: ["design", "tailwind", "ui-ux"],
    date: "Oct 12, 2023",
    status: "Visited",
    starred: true,
    private: false, 
  },
  {
    id: "b2",
    platform: "Article",
    title: "The Future of AI in Software",
    url: "medium.com/tech-trends",
    quote: "Insightful article about LLMs and their impact on junior developer roles.",
    tags: ["ai", "future", "coding"],
    date: "Oct 10, 2023",
    status: "Unread",
    starred: false,
    private: true,
  },
  {
    id: "b3",
    platform: "GitHub",
    title: "shadcn/ui - Beautifully designed",
    url: "github.com/shadcn/ui",
    quote: "The gold standard for accessible, customizable React components.",
    tags: ["react", "library", "components"],
    date: "Sep 28, 2023",
    status: "Visited",
    starred: false,
    private: false,
  },
  {
    id: "b4",
    platform: "Twitter",
    title: "New MacBook Pro M3 Max",
    url: "twitter.com/mkbhd/status/123",
    quote: "Performance results are absolutely wild. 128GB Unified Memory is huge.",
    tags: ["tech", "apple", "hardware"],
    date: "Oct 05, 2023",
    status: "Visited",
    starred: false,
    private: false,
  },
  {
    id: "b5",
    platform: "Article",
    title: "10 Principles of Good Design - Dieter",
    url: "vitra.com/magazine",
    quote: "Timeless wisdom for any creative. Good design is as little design as possible.",
    tags: ["minimalism", "design", "philosophy"],
    date: "Aug 15, 2023",
    status: "Unread",
    starred: true,
    private: true,
  },
  {
    id: "b6",
    platform: "YouTube",
    title: "Advanced Framer Motion Techniques",
    url: "youtube.com/watch?v=motion",
    quote: "Complex layout animations made simple using layoutId and variants.",
    tags: ["animation", "framer", "frontend"],
    date: "Jul 22, 2023",
    status: "Visited",
    starred: false,
    private: false,
  },
];

export const dashboardStats = [
  { label: "Total Bookmarks", value: "1,284", delta: "+24" },
  { label: "Visited", value: "856", delta: "67%" },
  { label: "Unvisited", value: "428", delta: "-8" },
  { label: "Shared Collections", value: "12", delta: "New" },
];

export const recentSaves = [
  { title: "10 UI Design Trends for 2024", url: "https://medium.com/design/trends-2024", tags: ["Design", "Trends"], time: "2 hours ago" },
  { title: "shadcn/ui - Beautifully designed", url: "https://ui.shadcn.com/", tags: ["Dev", "React"], time: "5 hours ago" },
  { title: "Building a modern SaaS with Next.js", url: "https://twitter.com/rauchg/status/...", tags: ["SaaS", "NextJS"], time: "Yesterday" },
  { title: "Deep Learning Specialization", url: "https://coursera.org/specializations/deep-learning", tags: ["AI", "Learning"], time: "2 days ago" },
  { title: "Product Hunt: Top Launches Today", url: "https://producthunt.com/", tags: ["Launch", "Products"], time: "3 days ago" },
  { title: "TypeScript 5.0 Release Notes", url: "https://devblogs.microsoft.com/typescript", tags: ["Code", "TypeScript"], time: "4 days ago" },
];

export const recentActivity = [
  { title: "React UI Kit", action: "Tagged", detail: "Added 'Dashboard' tag", time: "10m ago" },
  { title: "Best VS Code Themes", action: "Favorited", detail: "Added to Favorites", time: "1h ago" },
  { title: "Project Aurora", action: "Collection", detail: "Created new folder", time: "3h ago" },
  { title: "Old Documentation", action: "Archived", detail: "Moved to Archive", time: "Yesterday" },
  { title: "Next.js 14 Guide", action: "Tagged", detail: "Added 'Reference' tag", time: "2 days ago" },
];

export const recommendedTags = ["Animation", "Framing", "PostgreSQL", "TailwindCSS", "Node.js", "Marketing"];

export const profileStats = [
  { label: "Total Bookmarks", value: "1,248", delta: "12% increase from last month" },
  { label: "Visited Rate", value: "68.4%", delta: "Top 5% of active users" },
  { label: "Favorite Platform", value: "Medium", delta: "42% of your saved content" },
];

export const profileActivity = [
  { title: "The Future of AI-Driven Design Systems", action: "Saved a new link", time: "2 hours ago", source: "Medium" },
  { title: "Tailwind CSS v4.0 Alpha Roadmap", action: "Visited", time: "5 hours ago", source: "GitHub" },
  { title: "Sustainable Architecture in Modern Cities", action: "Added to favorites", time: "Yesterday", source: "ArchDaily" },
  { title: "10 Essential React Performance Tips", action: "Saved a new link", time: "2 days ago", source: "Dev.to" },
  { title: "Product Management for Designers", action: "Visited", time: "3 days ago", source: "Coursera" },
];

export const topCollections = [
  { name: "Design Inspiration", count: 423, letter: "D" },
  { name: "Coding Resources", count: 289, letter: "C" },
  { name: "Read Later", count: 156, letter: "R" },
  { name: "Work Project X", count: 87, letter: "W" },
];

export const platformSplit = [
  { label: "Articles", percent: 45 },
  { label: "Video Content", percent: 28 },
  { label: "Tools & Software", percent: 17 },
];

export const bookmarkDetail = {
  title: "The Future of Interface Design: 2024 Trends",
  category: "Design System",
  originalUrl: "figma.com/blog/future-interface...",
  savedOn: "Oct 14, 2023",
  status: "Visited",
  starred: true,
  tags: ["ProductDesign", "Trends2024", "Figma", "AI-UX", "Research"],
  source: "Figma Blog",
  author: "Noah Levin",
  readingTime: "12 mins",
  isPublic: false,
  notes: `This article is a comprehensive deep-dive into how AI-driven generative design is changing the paradigm of UI/UX. The core takeaway is the shift from "static components" to "dynamic intent-based layouts."`,
  keyPoints: [
    "Adaptive glassmorphism as a standard for spatial computing.",
    "Variable fonts that react to user eye-tracking data (wow!).",
    "The ethical implications of dark patterns in automated AB testing.",
  ],
  followUp:
    'I saved this for the Q4 design audit at work. We should definitely look at incorporating the "Liquid Grids" concept for our upcoming product dashboard redesign.',
};

export const relatedBookmarks = [
  { title: "Designing with AI: A New Era of Tools", source: "Medium" },
  { title: "2024 Design Systems Report", source: "InVision" },
  { title: "The Psychology of Color in UI", source: "Smashing Mag" },
  { title: "Advanced Prototyping in Figma", source: "YouTube" },
];