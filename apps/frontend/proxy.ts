import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
import { defaultLocale, locales } from '@/shared/i18n/config';

const intlMiddleware = createMiddleware({ locales, defaultLocale });

const MOBILE_UA_REGEX = /Android|iPhone|iPod|IEMobile|BlackBerry|Opera Mini/i;

export default function proxy(request: NextRequest) {
  const isMobile = MOBILE_UA_REGEX.test(request.headers.get('user-agent') ?? '');
  request.headers.set('x-is-mobile', String(isMobile));

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
