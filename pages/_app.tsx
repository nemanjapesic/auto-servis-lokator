import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import Layout from '../components/Layout';
import { AuthProvider } from '../context/AuthContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
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
