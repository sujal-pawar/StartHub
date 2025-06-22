import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://f048c9099576e3878bd499fad16fe9c4@o4509540670111744.ingest.us.sentry.io/4509540673191936",
  integrations: [
    Sentry.feedbackIntegration({
      // Additional SDK configuration goes in here, for example:
      colorScheme: "system",
    }),
  ],
});