export function getDefaultStorageName(): "session" | "local" {
	if (process.env.NEXT_PUBLIC_DEFAULT_STORAGE === "session") {
		return "session";
	}

	return "local";
}

export function getDefaultStorage(): Storage {
	switch (getDefaultStorageName()) {
		case "session":
			return sessionStorage;

		case "local":
			return localStorage;
	}
}
