'use client';

import React from 'react';
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
import { ApiError } from '@/shared/api/ApiError';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';

type ErrorVariant =
  | 'network'
  | 'server'
  | 'notFound'
  | 'unauthorized'
  | 'forbidden'
  | 'validation'
  | 'rateLimit'
  | 'client'
  | 'unknown';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const VARIANT_ICON: Record<ErrorVariant, React.ElementType> = {
  unknown: CircleAlert,
  network: WifiOff,
  server: ServerCrash,
  notFound: FileQuestion,
  unauthorized: LockKeyhole,
  forbidden: ShieldOff,
  validation: FormInput,
  rateLimit: Timer,
  client: AlertTriangle
};

function resolveVariant(error: Error): ErrorVariant {
  if (!ApiError.isApiError(error)) {
    return error instanceof TypeError || error.message.toLowerCase().includes('network') ? 'network' : 'unknown';
  }

  const e = error as ApiError;

  if (e.isNetworkError) return 'network';
  if (e.isUnauthorized) return 'unauthorized';
  if (e.isForbidden) return 'forbidden';
  if (e.isNotFound) return 'notFound';
  if (e.isValidationError) return 'validation';
  if (e.isTooManyRequests) return 'rateLimit';
  if (e.isServerError) return 'server';
  if (e.isClientError) return 'client';

  return 'unknown';
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const t = useTranslations('Errors');
  const variant = resolveVariant(error);
  const Icon = VARIANT_ICON[variant];

  return (
    <main className="flex min-h-dvh items-center justify-center p-6">
      <Card className="flex w-full max-w-sm flex-col items-center gap-4 p-8 text-center">
        <div className="bg-muted flex size-14 items-center justify-center rounded-2xl border">
          <Icon className="text-muted-foreground size-6" aria-hidden="true" />
        </div>

        <div className="space-y-1.5">
          <h1 className="text-lg font-semibold tracking-tight">{t(`${variant}.title`)}</h1>
          <p className="text-muted-foreground text-sm">{t(`${variant}.message`)}</p>
        </div>

        {error.digest && (
          <p className="text-muted-foreground/60 text-xs">
            <span className="select-none">{t('common.digest')}: </span>
            <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-[11px]">{error.digest}</code>
          </p>
        )}

        <div className="flex gap-2 pt-1">
          <Button className="cursor-pointer" onClick={reset}>
            {t('actions.retry')}
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">{t('actions.home')}</Link>
          </Button>
        </div>
      </Card>
    </main>
  );
}
