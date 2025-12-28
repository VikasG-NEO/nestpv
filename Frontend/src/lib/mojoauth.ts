
import MojoAuth from 'mojoauth-web-sdk';

const apiKey = 'test-0fd326b4-5265-4026-82fe-ed1cbd8afc5b';

export const initMojoAuth = () => {
    return new MojoAuth(apiKey, {
        source: [{ type: 'email', feature: 'magiclink' }],
        language: 'en',
        redirect_url: window.location.href, // Redirect back to same page
    });
};
