# StartHub - A Modern Startup Showcase Platform

<div align="center">
  <img src="./app/assets/logo.png" alt="StartHub Logo" width="150" />
  <h3>Connect, Innovate, Launch</h3>
  <p>A feature-rich platform for entrepreneurs to showcase their startups and connect with innovators</p>
</div>

## 🚀 About The Project

StartHub is a comprehensive platform designed for entrepreneurs and startup founders to showcase their ventures, connect with like-minded individuals, and track engagement. The platform allows users to create detailed profiles for their startups, including descriptions, pitches, and visuals, while enabling visitors to discover and engage with innovative projects across various categories.

### Key Features

- **Authentication System**: Secure GitHub OAuth integration with custom login page
- **Startup Showcase**: Detailed startup profiles with markdown pitch support
- **User Profiles**: Custom profiles for entrepreneurs and founders
- **Search Functionality**: Find startups by name, category, or founder
- **View Tracking**: Analytics on startup profile views
- **Responsive Design**: Modern UI that works across all devices
- **Dark/Light Mode**: Theme switching with system preference detection

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 with App Router, React, TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Authentication**: NextAuth.js with GitHub OAuth
- **Database & CMS**: Sanity.io
- **Monitoring**: Sentry
- **Deployment**: Vercel
- **SEO**: Next.js Metadata API, Dynamic OG Images
- **Performance**: Partial Prerendering (PPR)

## 📚 What I Learned

### Next.js 14 and Partial Prerendering (PPR)

Implementing Next.js 14's Partial Prerendering (PPR) was a game-changer for this project. PPR provides the best of both static and dynamic rendering by:

- Streaming initial static HTML shell for immediate display
- Dynamically loading interactive components and data
- Using the `experimental_ppr` flag to optimize specific routes
- Leveraging Suspense boundaries for component-level streaming

I implemented PPR in the startup detail pages and user profiles, resulting in significantly improved LCP metrics while maintaining dynamic content capabilities.

```tsx
// Example of PPR implementation in startup detail page
export const experimental_ppr = true;

const Page = async ({ params }) => {
  // ...
  return (
    <>
      <StaticShellComponent />
      <Suspense fallback={<Skeleton />}>
        <DynamicContentComponent />
      </Suspense>
    </>
  );
}
```

### Serial vs. Parallel Data Fetching

Understanding when to use serial vs. parallel data fetching patterns was crucial for optimizing performance:

- **Parallel Data Fetching**: For independent data requests, used Promise.all to fetch data concurrently
- **Serial Data Fetching**: For dependent data sequences where one request depends on another
- **Intelligent Waterfalls**: Created optimized data loading patterns to minimize blocking

```tsx
// Parallel data fetching example
const [startupData, userData] = await Promise.all([
  fetchStartupData(id),
  fetchUserData(authorId)
]);

// Serial data fetching example (when necessary)
const startup = await fetchStartupData(id);
const relatedStartups = await fetchRelatedStartups(startup.category);
```

### SEO Optimization & Metadata

Next.js 14's metadata API provided powerful tools for SEO optimization:

- Created dynamic metadata for every page using both static and generated metadata
- Implemented OpenGraph and Twitter card metadata for social sharing
- Generated dynamic OG images based on content
- Created a reusable metadata generation utility
- Implemented sitemap.xml, robots.txt, and manifest.json
- Used structured data for search engine optimization

```tsx
// Dynamic metadata generation for startup pages
export async function generateMetadata({ params }) {
  const startup = await fetchStartupData(params.id);
  
  return {
    title: startup.title,
    description: startup.description,
    openGraph: {
      images: [startup.image],
      // ...other OG properties
    }
  };
}
```

### Sanity.io CMS Integration

Working with Sanity.io provided insights into headless CMS architecture:

- Structured content modeling with schemas for startups and authors
- Real-time content updates with GROQ queries
- Content validation and relationships between documents
- Optimistic UI updates with live queries
- Error handling and fallback strategies for API timeouts
- Image handling and transformations

```typescript
// Example GROQ query with relationships
export const STARTUP_BY_ID_QUERY = defineQuery(
  `*[_type == "startup" && _id==$id][0]{
    _id, title, slug, _createdAt,
    author->{ _id, name, username, image, bio },
    views, description, image, category, pitch
  }`
);
```

### Sentry for Monitoring Production Apps

Implementing Sentry provided important lessons in monitoring large-scale applications:

- Error tracking and performance monitoring with Sentry's Next.js SDK
- Custom error boundaries for graceful failure handling
- Transaction tracking for critical user flows
- Sourcemap uploads for accurate error stack traces
- Environment-specific configurations for dev/prod environments
- API route monitoring and backend error tracking

```tsx
// Setting up Sentry for client, server, and Edge runtimes
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0, 
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  // Environment-specific settings
});
```

### Authentication Flow & Middleware

Building a robust authentication system with NextAuth.js and middleware:

- GitHub OAuth integration with secure callback handling
- Session management and token refresh strategies
- Route protection with Next.js middleware
- Conditional rendering based on authentication state
- Custom login page with branded design
- Error handling for authentication failures

```tsx
// Middleware for protecting routes and redirecting unauthenticated users
export default withAuthMiddleware((req) => {
  const { pathname } = req.nextUrl;
  const isAuth = req.auth;
  
  // Redirect logic based on auth state and paths
  if (!isAuth && !publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
});
```

### Responsive UI & Accessibility

Developing a modern, accessible UI brought valuable lessons:

- Component-based design with shadcn/ui for consistency
- Responsive layouts with Tailwind CSS
- Dark/light mode implementation with theme persistence
- Keyboard navigation and screen reader support
- Focus management for improved accessibility
- Animation performance optimization

### Error Handling & Fallbacks

Creating a resilient application required comprehensive error handling:

- Graceful degradation with error boundaries
- Loading states and fallback UI components
- API error handling with retry mechanisms
- Network error detection and offline support
- User feedback for error states

## 🔧 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- GitHub account (for authentication)
- Sanity.io account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/starthub.git
   cd starthub
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   ```
   # Create a .env.local file with the following variables
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   NEXT_PUBLIC_SANITY_API_VERSION=2023-05-03
   
   # Auth variables
   GITHUB_ID=your_github_oauth_app_id
   GITHUB_SECRET=your_github_oauth_app_secret
   NEXTAUTH_SECRET=your_generated_secret
   NEXTAUTH_URL=http://localhost:3000
   
   # Sentry variables (optional)
   NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.
