export function getDefaultStorageName(): "session" | "local" {
	if (process.env.NEXT_PUBLIC_DEFAULT_STORAGE === "local") {
		return "local";
	}

	return "session";
}

export function getDefaultStorage(): Storage {
	switch (getDefaultStorageName()) {
		case "session":
			return sessionStorage;

		case "local":
			return localStorage;
	}
}
