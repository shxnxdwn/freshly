const MOBILE_UA_REGEX = /Mobi|Android|iPhone|iPod|IEMobile|BlackBerry|Opera Mini|Windows Phone/i;

export function getIsMobileFromHeaders(headers: Headers): boolean {
  const clientHint = headers.get('sec-ch-ua-mobile');

  if (clientHint !== null) {
    return clientHint === '?1';
  }

  const userAgent = headers.get('user-agent') ?? '';
  return MOBILE_UA_REGEX.test(userAgent);
}
