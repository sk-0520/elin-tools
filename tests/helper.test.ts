describe("fail", () => {
	test("empty", () => {
		expect(() => fail()).toThrow();
	});

	test("Error", () => {
		expect(() => fail(new Error("Error!"))).toThrow("Error!");
	});

	test("string", () => {
		expect(() => fail("string")).toThrow("string");
	});

	test("number", () => {
		expect(() => fail(123)).toThrow("123");
	});
});
