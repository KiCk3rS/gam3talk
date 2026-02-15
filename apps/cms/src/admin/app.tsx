import type { StrapiApp } from '@strapi/strapi/admin';

export default {
    config: {
        locales: [
            'fr',
            'es',
        ],
    },
    bootstrap(app: StrapiApp) {
        console.log(app);
    },
};
