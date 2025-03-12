import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['gb', 'pl', 'uy'],
  defaultLocale: 'uy',
  localeDetection: false,
  alternateLinks: false,
  localePrefix: 'as-needed', // Comment this line to show locale in pathname
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
