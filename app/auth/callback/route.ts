import { NextRequest, NextResponse } from 'next/server';
import type { EmailOtpType } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/server';

const VALID_TYPES: EmailOtpType[] = [
  'signup',
  'invite',
  'magiclink',
  'recovery',
  'email_change',
  'email',
];

const normalizeNextPath = (next: string | null) => {
  if (!next || !next.startsWith('/')) return '/onboarding';
  return next;
};

const redirectWithError = (request: NextRequest, code: string) =>
  NextResponse.redirect(new URL(`/login?error=${code}`, request.url));

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const tokenHash = requestUrl.searchParams.get('token_hash');
  const typeParam = requestUrl.searchParams.get('type');
  const next = normalizeNextPath(requestUrl.searchParams.get('next'));
  const errorCode = requestUrl.searchParams.get('error_code');

  if (errorCode) return redirectWithError(request, errorCode);

  const supabase = await createClient();

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) return redirectWithError(request, 'auth_callback_failed');
    return NextResponse.redirect(new URL(next, request.url));
  }

  if (tokenHash && typeParam) {
    const type = (VALID_TYPES.includes(typeParam as EmailOtpType)
      ? typeParam
      : 'email') as EmailOtpType;
    const { error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type,
    });
    if (error) return redirectWithError(request, 'token_invalid_or_expired');
    return NextResponse.redirect(new URL(next, request.url));
  }

  return redirectWithError(request, 'missing_auth_params');
}
