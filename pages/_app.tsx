import Head from 'next/head';
import { useEffect } from 'react';
import toast, { Toaster, useToasterStore } from 'react-hot-toast';
import Layout from '../components/Layout';
import { AuthProvider } from '../context/AuthContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const { toasts } = useToasterStore();

  const TOAST_LIMIT = 1;

  useEffect(() => {
    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= TOAST_LIMIT) // Is toast index over limit?
      .forEach((t) => toast.remove(t.id)); // Dismiss
  }, [toasts]);

  return (
    <AuthProvider>
      <Toaster />
      <Head>
        <title>Auto Servis Lokator</title>
        <meta
          name="description"
          content="Auto Servis Lokator - Pronađite najbolje auto servise u vašoj okolini."
        />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
