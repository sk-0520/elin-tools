import type { AppProps } from "next/app";

import "../components/map/GlobalMap.css";
import "leaflet/dist/leaflet.css";

export default function App({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}
