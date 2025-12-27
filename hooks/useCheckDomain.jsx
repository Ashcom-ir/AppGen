// hooks/useCheckDomain.jsx
"use client";

import { useState, useCallback } from "react";

/**
 * useCheckDomain
 * returns: { check, loading, data, error, available }
 *
 * usage:
 * const { check, loading, data, error, available } = useCheckDomain();
 * await check('example.com');
 */
export default function useCheckDomain() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const check = useCallback(async (domain) => {
    if (!domain) {
      setError("No domain specified");
      setData(null);
      return null;
    }

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch(`/api/check-domain?domain=${encodeURIComponent(domain)}`);
      if (!res.ok) {
        const errJson = await res.json().catch(() => ({ error: "Server error" }));
        throw new Error(errJson.error || `HTTP ${res.status}`);
      }
      const json = await res.json();
      setData(json);
      setLoading(false);
      return json;
    } catch (err) {
      setLoading(false);
      setError(err.message || String(err));
      return null;
    }
  }, []);

  return {
    check,
    loading,
    data,
    error,
    available: data ? Boolean(data.available) : null,
  };
}
