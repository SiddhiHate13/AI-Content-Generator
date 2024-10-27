import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

export default clerkMiddleware((auth, req) => {
    // Only protect routes if they are not '/dashboard/settings' or its child routes
    if (isProtectedRoute(req) && !isSettingsRoute(req)) {
        auth().protect();
    }
});

// Define protected routes
const isProtectedRoute = createRouteMatcher([
    '/dashboard(.*)', // All dashboard routes
]);

// Define the settings route as unprotected
const isSettingsRoute = createRouteMatcher([
    '/dashboard/settings(.*)', // Excludes settings and its subroutes
]);

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
