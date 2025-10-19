import type { LatLngExpression } from "leaflet";
import type { TooltipProps } from "react-leaflet";

export const MapKinds = ["base", "nefia", "sample"] as const;
export type MapKind = (typeof MapKinds)[number];

export const MapConditions = ["return", "festival", "implementation"] as const;
export type MapCondition = (typeof MapConditions)[number];

export const MapImplementations = [
	"notImplemented",
	"inProgress",
	"completed",
] as const;
export type MapImplementation = (typeof MapImplementations)[number];

export const MapKindDefines: Array<{
	kind: MapKind;
	display: string;
	color: string;
	direction: Exclude<TooltipProps["direction"], undefined>;
}> = [
	{
		kind: "base",
		display: "拠点",
		color: "blue",
		direction: "bottom",
	},
	{
		kind: "nefia",
		display: "ネフィア",
		color: "red",
		direction: "right",
	},
	{
		kind: "sample",
		display: "初期地点",
		color: "yellow",
		direction: "right",
	},
];

export const MapConditionDefines: Array<{
	condition: MapCondition;
	display: string;
}> = [
	{
		condition: "return",
		display: "帰還先に限定",
	},
	{
		condition: "festival",
		display: "お祭り開催地に限定",
	},
	{
		condition: "implementation",
		display: "実装度合いで限定",
	},
];

export const MapImplementationDefines: Array<{
	implementation: MapImplementation;
	display: string;
}> = [
	{
		implementation: "completed",
		display: "実装済み",
	},
	{
		implementation: "inProgress",
		display: "実装途中",
	},
	{
		implementation: "notImplemented",
		display: "未実装",
	},
];

interface GlobalMapItem {
	/** 表示名 */
	name: string;
	/** 実装状態 */
	implementation: MapImplementation;
	/** 種類 */
	kind: MapKind;
	/** 危険度 */
	riskLevel?: number;
	/** 位置 */
	position: LatLngExpression;
	/** 吹き出し表示位置 */
	direction?: TooltipProps["direction"];
	/** 帰還可能 */
	return?: boolean;
	/** お祭り(月) */
	festival?: number;
}

interface GlobalMapBaseItem extends GlobalMapItem {
	kind: "base";
	festival?: number;
}

interface GlobalMapNefiaItem extends GlobalMapItem {
	kind: "nefia";
	riskLevel: number;
}

interface GlobalMapSampleItem extends GlobalMapItem {
	kind: "sample";
}

// 気持ち左上から右へ進める感じ
export const GlobalMapItemMapping = {
	items: [
		{
			name: "永遠の庭",
			implementation: "completed",
			kind: "base",
			position: { lat: 1518, lng: 1117.2499451246429 },
		},
		{
			name: "闘技場",
			implementation: "inProgress",
			kind: "nefia",
			riskLevel: 1,
			position: { lat: 1517.75, lng: 1136.4976952349966 },
			direction: "top",
		},
		{
			name: "探究者の孤城",
			implementation: "completed",
			kind: "base",
			position: { lat: 1370, lng: 118.99890249285548 },
		},
		{
			name: "ネフの里",
			implementation: "completed",
			kind: "base",
			position: { lat: 1390, lng: 1098.4986464078552 },
		},
		{
			name: "帰らずの森",
			implementation: "completed",
			kind: "nefia",
			position: { lat: 1319.0193428439584, lng: 989 },
			direction: "left",
			riskLevel: 19,
			return: true,
		},
		{
			name: "妹の館",
			implementation: "inProgress",
			kind: "base",
			position: { lat: 1223.25, lng: 371.7507133796439 },
			return: true,
		},
		{
			name: "ドーガ遺跡キャンプ",
			implementation: "inProgress",
			kind: "base",
			position: { lat: 1225, lng: 865 },
		},
		{
			name: "すくつ",
			implementation: "completed",
			kind: "nefia",
			riskLevel: 51,
			position: { lat: 1225, lng: 1136.00197551286 },
			return: true,
		},
		{
			name: "永久凍土",
			implementation: "completed",
			kind: "nefia",
			riskLevel: 30,
			position: { lat: 1212, lng: 1954.0598507229477 },
		},

		{
			name: "スペクウィング",
			implementation: "completed",
			kind: "base",
			position: { lat: 1116, lng: 1173.5147065957365 },
		},
		{
			name: "神々の休戦地",
			implementation: "completed",
			kind: "nefia",
			riskLevel: 1,
			position: { lat: 1100.5, lng: 972.5000365835715 },
		},
		{
			name: "ピラミッド",
			implementation: "notImplemented",
			kind: "nefia",
			riskLevel: 2,
			position: { lat: 1063, lng: 117.48620799355058 },
			direction: "right",
		},
		{
			name: "ノイエル",
			implementation: "completed",
			kind: "base",
			position: { lat: 1010, lng: 1681.000365835715 },
			festival: 12,
		},
		{
			name: "ポート・カプール",
			implementation: "completed",
			kind: "base",
			position: { lat: 990, lng: 98.99026876998528 },
			direction: "top",
			festival: 6,
		},
		{
			name: "呪われた館",
			implementation: "completed",
			kind: "base",
			position: { lat: 919.5, lng: 318.00007316714294 },
			return: true,
		},
		{
			name: "静かな砂浜",
			implementation: "completed",
			kind: "base",
			position: { lat: 899, lng: 100.49301253784654 },
		},
		{
			name: "丘の洞窟",
			implementation: "completed",
			kind: "sample",
			position: { lat: 881, lng: 443.99370762570476 },
		},
		{
			name: "死者の洞窟",
			implementation: "notImplemented",
			kind: "nefia",
			riskLevel: 2,
			position: { lat: 882, lng: 717.0199746300302 },
		},
		{
			name: "パルミア大使館",
			implementation: "completed",
			position: { lat: 882, lng: 1008.5072069635823 },
			kind: "base",
			direction: "top",
		},
		{
			name: "ヴェルニース",
			implementation: "completed",
			kind: "sample",
			position: { lat: 845.5, lng: 517.5002560850004 },
			return: true,
		},
		{
			name: "パルミア",
			implementation: "completed",
			kind: "base",
			position: { lat: 825.25, lng: 1008.7499451246427 },
		},
		{
			name: "工房ミラル・ガロク",
			implementation: "completed",
			kind: "base",
			position: { lat: 809.5, lng: 1645.5134261707346 },
		},
		{
			name: "アクリ・テオラ",
			implementation: "completed",
			kind: "base",
			position: { lat: 772, lng: 426.9972928157102 },
			direction: "left",
		},
		{
			name: "ハウスドーム",
			implementation: "notImplemented",
			kind: "nefia",
			riskLevel: 1,
			position: { lat: 773, lng: 681.7500548753573 },
			direction: "top",
		},
		{
			name: "レシマス",
			implementation: "inProgress",
			kind: "nefia",
			riskLevel: 1,
			position: { lat: 734.5, lng: 464.4840861464045 },
			return: true,
		},
		{
			name: "イークの洞窟",
			implementation: "inProgress",
			kind: "nefia",
			riskLevel: 5,
			position: { lat: 698, lng: 735.0332178829074 },
			direction: "top",
			return: true,
		},
		{
			name: "墓所",
			implementation: "completed",
			kind: "base",
			position: { lat: 701, lng: 1389.018584454314 },
		},
		{
			name: "竜窟",
			implementation: "inProgress",
			kind: "nefia",
			riskLevel: 51,
			position: { lat: 681, lng: 281.48661041283685 },
			direction: "left",
		},
		{
			name: "ヨウィン",
			implementation: "completed",
			kind: "base",
			position: { lat: 680, lng: 826.0012438414304 },
			festival: 9,
		},
		{
			name: "不気味な城",
			implementation: "notImplemented",
			kind: "nefia",
			riskLevel: 1,
			position: { lat: 679, lng: 971.9899761014134 },
		},
		{
			name: "ルミエスト",
			implementation: "completed",
			kind: "base",
			position: { lat: 684, lng: 1153.0239256557504 },
			direction: "top",
		},
		{
			name: "ルミエスト・クレーター",
			implementation: "inProgress",
			kind: "nefia",
			riskLevel: 20,
			position: { lat: 646, lng: 1135.4987195749982 },
		},
		{
			name: "ダルフィ",
			implementation: "completed",
			kind: "base",
			position: { lat: 627, lng: 299.0059265385804 },
		},
		{
			name: "ミノタウロスの巣",
			implementation: "completed",
			kind: "nefia",
			riskLevel: 26,
			position: { lat: 554.25, lng: 826.7480974966951 },
		},
		{
			name: "旅商人の停泊地",
			implementation: "completed",
			kind: "base",
			position: { lat: 498, lng: 645.0253158314669 },
		},
		{
			name: "リトルガーデン",
			implementation: "completed",
			kind: "base",
			position: { lat: 482, lng: 243.97065997566983 },
			return: true,
		},
		{
			name: "山道への入り口",
			implementation: "notImplemented",
			kind: "nefia",
			riskLevel: 1,
			position: { lat: 480, lng: 1207.9997073314282 },
			direction: "left",
		},
		{
			name: "ミフの里",
			implementation: "completed",
			kind: "base",
			position: { lat: 464, lng: 1279.5006950878583 },
		},
		{
			name: "仔犬の洞窟",
			implementation: "inProgress",
			kind: "nefia",
			riskLevel: 2,
			position: { lat: 446.5, lng: 553.9956099714219 },
			direction: "left",
			return: true,
		},
		{
			name: "リサナス",
			implementation: "inProgress",
			kind: "nefia",
			riskLevel: 31,
			position: { lat: 426, lng: 1972.5003292521433 },
			return: true,
		},
		{
			name: "野原",
			implementation: "completed",
			kind: "sample",
			position: { lat: 408, lng: 590.0052680342936 },
			return: true,
		},
		{
			name: "ラーナ",
			implementation: "notImplemented",
			kind: "nefia",
			riskLevel: 1,
			position: { lat: 410, lng: 1208 },
			direction: "left",
		},
		{
			name: "孤児院",
			implementation: "completed",
			kind: "base",
			position: { lat: 354, lng: 806.9653919413763 },
		},
		{
			name: "ナイミール",
			implementation: "completed",
			kind: "nefia",
			riskLevel: 4,
			position: { lat: 336.5, lng: 699.000073167143 },
			direction: "left",
			return: true,
		},
		{
			name: "贖罪の村",
			implementation: "inProgress",
			kind: "base",
			position: { lat: 281.5, lng: 1481.5 },
		},
		{
			name: "ミシリア",
			implementation: "completed",
			kind: "base",
			position: { lat: 244, lng: 935.0093653943 },
			direction: "top",
		},
		{
			name: "ルーリエ海底神殿",
			implementation: "completed",
			kind: "nefia",
			riskLevel: 25,
			position: { lat: 186, lng: 1701.4986464078552 },
			return: true,
		},
		{
			name: "古城",
			implementation: "notImplemented",
			kind: "nefia",
			riskLevel: 1,
			position: { lat: 212, lng: 498.9853665714064 },
		},
		{
			name: "商人ギルド",
			implementation: "completed",
			kind: "base",
			position: { lat: 210, lng: 917.9987561585696 },
		},
		{
			name: "オルヴィナ",
			implementation: "completed",
			kind: "base",
			position: { lat: 171, lng: 626.9787083613963 },
			festival: 3,
		},
		{
			name: "風の眠る場所",
			implementation: "completed",
			kind: "nefia",
			riskLevel: 1,
			position: { lat: 118, lng: 1407.999853665714 },
		},
		{
			name: "ウィロウ",
			implementation: "completed",
			kind: "base",
			position: { lat: 61, lng: 845.015950437167 },
		},
	] satisfies (
		| GlobalMapBaseItem
		| GlobalMapNefiaItem
		| GlobalMapSampleItem
	)[],
};
