const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export async function apiFetch<T>(
  path: string,
  options?: RequestInit & { token?: string; timeoutMs?: number },
): Promise<T> {
  const { token, timeoutMs = 8000, ...init } = options ?? {};
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(init.headers ?? {}),
  };
  if (token) {
    (headers as Record<string, string>).Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers,
    // Fail fast instead of hanging (e.g. when the API is unreachable during
    // static build) so callers can fall back to local data.
    signal: init.signal ?? AbortSignal.timeout(timeoutMs),
    ...(init.method === 'GET' || !init.method ? { next: { revalidate: 60 } } : {}),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || `Request failed (${res.status})`);
  }

  return res.json() as Promise<T>;
}

export { API_BASE };

export async function downloadInvoicePdf(invoiceId: string, token: string, filename?: string) {
  const res = await fetch(`${API_BASE}/store/invoices/${invoiceId}/pdf`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || 'Failed to download invoice');
  }
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || `invoice-${invoiceId}.pdf`;
  a.target = '_blank';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
