'use client';

import React, { startTransition, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import {
  AlertTriangle,
  WifiOff,
  ServerCrash,
  FileQuestion,
  LockKeyhole,
  ShieldOff,
  FormInput,
  Timer,
  CircleAlert
} from 'lucide-react';

import type { ClientErrorCode } from '@/shared/api/HttpError';
import { resolveClientErrorCode, getErrorTranslationKeys } from '@/shared/api/error-utils';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const ERROR_ICON: Record<ClientErrorCode, React.ComponentType<{ className?: string }>> = {
  NETWORK_ERROR: WifiOff,
  INTERNAL_SERVER_ERROR: ServerCrash,
  NOT_FOUND: FileQuestion,
  UNAUTHORIZED: LockKeyhole,
  FORBIDDEN: ShieldOff,
  VALIDATION_ERROR: FormInput,
  TOO_MANY_REQUESTS: Timer,
  BAD_REQUEST: CircleAlert,
  CONFLICT: AlertTriangle,
  INVALID_CREDENTIALS: LockKeyhole,
  INVALID_REFRESH_TOKEN: LockKeyhole,
  EMAIL_ALREADY_EXISTS: CircleAlert,
  PRODUCT_OUT_OF_STOCK: AlertTriangle,
  CART_EMPTY: AlertTriangle,
  REVIEW_ALREADY_EXISTS: AlertTriangle,
  ORDER_CANNOT_BE_CANCELLED: AlertTriangle,
  UNKNOWN_ERROR: CircleAlert
};

export default function GlobalErrorPage(props: ErrorPageProps) {
  const { error, reset } = props;

  const t = useTranslations('Errors');
  const code = resolveClientErrorCode(error);
  const { titleKey, messageKey } = getErrorTranslationKeys(code);

  const Icon = ERROR_ICON[code] ?? CircleAlert;

  useEffect(() => {
    console.error('[Next]: Captured App Error:', error);
  }, [error]);

  const handleRetry = () => {
    startTransition(() => {
      reset();
    });
  };

  return (
    <main className="flex min-h-dvh items-center justify-center p-6" role="alert" aria-live="assertive">
      <Card className="flex w-full max-w-sm flex-col items-center gap-4 p-8 text-center shadow-md">
        <div className="bg-muted flex size-14 items-center justify-center rounded-2xl border">
          <Icon className="text-muted-foreground size-6" />
        </div>

        <div className="space-y-1.5">
          <h1 className="text-lg font-semibold tracking-tight">{t(titleKey)}</h1>
          <p className="text-muted-foreground text-sm">{t(messageKey)}</p>
        </div>

        {error.digest && (
          <p className="text-muted-foreground/60 flex items-center gap-1 text-xs">
            <span className="select-none">{t('common.digest')}: </span>
            <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-[11px] select-all">{error.digest}</code>
          </p>
        )}

        <div className="flex w-full gap-2 pt-2">
          <Button className="flex-1 cursor-pointer" onClick={handleRetry}>
            {t('actions.retry')}
          </Button>
          <Button variant="outline" className="flex-1" asChild>
            <Link href="/">{t('actions.home')}</Link>
          </Button>
        </div>
      </Card>
    </main>
  );
}
