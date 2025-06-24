export function getDefaultStorage(): Storage {
	if(process.env.NEXT_PUBLIC_DEFAULT_STORAGE === "session") {
		return sessionStorage
	}

	return localStorage
}