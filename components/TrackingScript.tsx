import Script from "next/script";
import type { FC } from "react";

const isEnabledTracking = process.env.NEXT_PUBLIC_TRACKING === "true";

export const TrackingScript: FC = () => {
	if (!isEnabledTracking) {
		return undefined;
	}

	return (
		<Script>
			{`
  var _paq = window._paq = window._paq || [];
  /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  (function() {
    var u="//analytics.content-type-text.org/";
    _paq.push(['setTrackerUrl', u+'matomo.php']);
    _paq.push(['setSiteId', '5']);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
  })();
		`}
		</Script>
	);
};
