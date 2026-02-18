// import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) { },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: any }) {
    try {
      const localeService = strapi.plugin('i18n').service('locales');

      const locales = await localeService.find();
      const hasFr = locales.some((l: any) => l.code === 'fr');

      if (!hasFr) {
        console.log('French locale (fr) not found. Creating it...');
        await localeService.create({
          name: 'French (fr)',
          code: 'fr',
          isDefault: true,
        });
        console.log('French locale created and set as default.');
      } else {
        // Ensure it is default if it already exists
        const frLocale = locales.find((l: any) => l.code === 'fr');
        if (!frLocale.isDefault) {
          await localeService.update(frLocale.id, { isDefault: true });
          console.log('French locale set as default.');
        }
      }
    } catch (error) {
      console.error('Error in bootstrap while setting up locales:', error);
    }
  },
};
