import type { AppProps } from "next/app";

import "../components/map/GlobalMap.css";
import "leaflet/dist/leaflet.css";
import { TrackingScript } from "@/components/TrackingScript";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<TrackingScript />
			<Component {...pageProps} />
		</>
	);
}
