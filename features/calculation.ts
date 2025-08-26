import { AppError } from "./error";

export class ConvertError extends AppError {}

function convertNumberCore(
	input: unknown,
	parser: (input: string) => number,
): { success: true; value: number } | { success: false } {
	const isNumber = typeof input === "number";
	if (!isNumber && typeof input !== "string") {
		return { success: false };
	}

	const value = isNumber ? input : parser(input);
	if (Number.isNaN(value)) {
		return { success: false };
	}
	if (!isNumber) {
		// 10a とか C っぽさすごいあれ対策
		if (Number.isNaN(Number(input))) {
			return { success: false };
		}
	}

	return { success: true, value: value };
}

/**
 * 入力値を整数に変換し、結果を引き渡す
 * @param input 入力値
 * @param receiver 整数を受け取る処理
 * @returns 変換成功か
 */
export function convertIntChain(
	input: unknown,
	receiver: (number: number) => void,
): boolean {
	const result = convertNumberCore(input, (a) => Number.parseInt(a, 10));

	if (result.success) {
		receiver(result.value);
	}

	return result.success;
}

/**
 * 入力値を浮動小数点数に変換し、結果を引き渡す
 * @param input 入力値
 * @param receiver 浮動小数点数を受け取る処理
 * @returns 変換成功か
 */
export function convertFloatChain(
	input: unknown,
	receiver: (number: number) => void,
): boolean {
	const result = convertNumberCore(input, (a) => Number.parseFloat(a));
	if (result.success) {
		receiver(result.value);
	}

	return result.success;
}

/**
 * 入力値を整数に変換する
 * @param input 入力値
 * @returns 整数
 * @throws {ConvertError} 変換失敗
 */
export function convertInt(input: unknown): number {
	const result = convertNumberCore(input, (a) => Number.parseInt(a, 10));

	if (!result.success) {
		throw new ConvertError(`input: ${input}`);
	}

	return result.value;
}

/**
 * 入力値を浮動小数点数に変換する
 * @param input 入力値
 * @returns 浮動小数点数
 * @throws {ConvertError} 変換失敗
 */
export function convertFloat(input: unknown): number {
	const result = convertNumberCore(input, (a) => Number.parseFloat(a));

	if (!result.success) {
		throw new ConvertError(`input: ${input}`);
	}

	return result.value;
}

/**
 * 小数点をふわっとしてピッタリ表示にする
 * @param input
 * @returns
 */
export function toDisplayFloat(input: number): string {
	const base = 100;
	const value = Math.floor(input * base) / base;
	return value.toFixed(2);
}
