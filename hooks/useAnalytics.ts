import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { load, trackPageview } from 'fathom-client';

const useAnalytics = (): void => {
  const { events } = useRouter();

  useEffect(() => {
    load(process.env.NEXT_PUBLIC_FATHOM_SITE_ID ?? '', {
      url: new URL('/script.js', process.env.NEXT_PUBLIC_ANALYTICS_URL).href,
    });

    const onRouteChangeComplete = () => trackPageview();

    events.on('routeChangeComplete', onRouteChangeComplete);

    onRouteChangeComplete();

    return () => {
      events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, [events]);
};

export default useAnalytics;
