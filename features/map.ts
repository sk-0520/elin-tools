import type { LatLngExpression } from "leaflet";
import type { TooltipProps } from "react-leaflet";

export const MapKinds = ["base", "nefia", "sample"] as const;
export type MapKind = (typeof MapKinds)[number];

interface GlobalMapItem {
	/** 表示名 */
	name: string;
	/** 種類 */
	kind: MapKind;
	/** 位置 */
	position: LatLngExpression;
	/** 吹き出し表示位置 */
	direction?: TooltipProps["direction"];
	/** 帰還可能 */
	return?: boolean;
}

// 気持ち左上から右へ進める感じ
export const GlobalMapItemMapping = {
	items: [
		{
			name: "どこか",
			kind: "base",
			position: { lat: 1518, lng: 1117.2499451246429 },
		},
		{
			name: "闘技場",
			kind: "nefia",
			position: { lat: 1517.75, lng: 1136.4976952349966 },
		},
		{
			name: "探究者の孤城",
			kind: "base",
			position: { lat: 1370, lng: 118.99890249285548 },
		},
		{
			name: "ネフの里",
			kind: "base",
			position: { lat: 1390, lng: 1098.4986464078552 },
		},
		{
			name: "妹の館",
			kind: "base",
			position: { lat: 1223.25, lng: 371.7507133796439 },
			return: true,
		},
		{
			name: "すくつ",
			kind: "nefia",
			position: { lat: 1225, lng: 1136.00197551286 },
		},
		{
			name: "永久凍土",
			kind: "nefia",
			position: { lat: 1212, lng: 1954.0598507229477 },
		},

		{
			name: "スペクウィング",
			kind: "base",
			position: { lat: 1116, lng: 1173.5147065957365 },
		},
		{
			name: "神々の休戦地",
			kind: "base",
			position: { lat: 1100.5, lng: 972.5000365835715 },
		},
		{
			name: "ピラミッド",
			kind: "nefia",
			position: { lat: 1063, lng: 117.48620799355058 },
			direction: "right",
		},
		{
			name: "ノイエル",
			kind: "base",
			position: { lat: 1010, lng: 1681.000365835715 },
		},
		{
			name: "ポート・カプール",
			kind: "base",
			position: { lat: 990, lng: 98.99026876998528 },
			direction: "top",
		},
		{
			name: "呪われた館",
			kind: "nefia",
			position: { lat: 919.5, lng: 318.00007316714294 },
		},
		{
			name: "静かな砂浜",
			kind: "base",
			position: { lat: 899, lng: 100.49301253784654 },
		},
		{
			name: "丘の洞窟",
			kind: "base",
			position: { lat: 881, lng: 443.99370762570476 },
		},
		{
			name: "死者の洞窟",
			kind: "nefia",
			position: { lat: 882, lng: 717.0199746300302 },
		},
		{
			name: "パルミア大使館",
			position: { lat: 882, lng: 1008.5072069635823 },
			kind: "base",
			direction: "top",
		},
		{
			name: "ヴェルニース",
			kind: "sample",
			position: { lat: 845.5, lng: 517.5002560850004 },
		},
		{
			name: "パルミア",
			kind: "base",
			position: { lat: 825.25, lng: 1008.7499451246427 },
		},
		{
			name: "工房ミラル・ガロク",
			kind: "base",
			position: { lat: 809.5, lng: 1645.5134261707346 },
		},
		{
			name: "アクリ・テオラ",
			kind: "base",
			position: { lat: 772, lng: 426.9972928157102 },
			direction: "left",
		},
		{
			// ここ行ったことないわ 拠点？
			name: "ハウスドーム",
			kind: "base",
			position: { lat: 773, lng: 681.7500548753573 },
		},
		{
			name: "レシマス",
			kind: "nefia",
			position: { lat: 734.5, lng: 464.4840861464045 },
		},
		{
			name: "イークの洞窟",
			kind: "nefia",
			position: { lat: 698, lng: 735.0332178829074 },
			direction: "left",
		},
		{
			name: "墓所",
			kind: "base",
			position: { lat: 701, lng: 1389.018584454314 },
		},
		{
			name: "竜窟",
			kind: "nefia",
			position: { lat: 681, lng: 281.48661041283685 },
			direction: "left",
		},
		{
			name: "ヨウィン",
			kind: "base",
			position: { lat: 680, lng: 826.0012438414304 },
		},
		{
			name: "混沌の城",
			kind: "nefia",
			position: { lat: 679, lng: 971.9899761014134 },
		},
		{
			name: "ルミエスト",
			kind: "base",
			position: { lat: 684, lng: 1153.0239256557504 },
			direction: "top",
		},
		{
			// 拠点・・・？
			name: "ルミエスト・クレーター",
			kind: "base",
			position: { lat: 646, lng: 1135.4987195749982 },
		},
		{
			name: "ダルフィ",
			kind: "base",
			position: { lat: 627, lng: 299.0059265385804 },
		},
		{
			name: "旅商人の停泊地",
			kind: "base",
			position: { lat: 498, lng: 645.0253158314669 },
		},
		{
			name: "リトルガーデン",
			kind: "base",
			position: { lat: 482, lng: 243.97065997566983 },
		},

		{
			name: "山道への入り口",
			kind: "nefia",
			position: { lat: 480, lng: 1207.9997073314282 },
		},
		{
			name: "ミフの里",
			kind: "base",
			position: { lat: 464, lng: 1279.5006950878583 },
		},
		{
			name: "子犬の洞窟",
			kind: "nefia",
			position: { lat: 446.5, lng: 553.9956099714219 },
			direction: "left",
		},
		{
			name: "リサナス",
			kind: "nefia",
			position: { lat: 426, lng: 1972.5003292521433 },
		},
		{
			name: "野原",
			kind: "sample",
			position: { lat: 408, lng: 590.0052680342936 },
		},
		{
			name: "ラーナ",
			kind: "nefia",
			position: { lat: 410, lng: 1208 },
			direction: "left",
		},
		{
			name: "孤児院",
			kind: "base",
			position: { lat: 354, lng: 806.9653919413763 },
		},
		{
			name: "ナイミール",
			kind: "nefia",
			position: { lat: 336.5, lng: 699.000073167143 },
			direction: "left",
		},
		{
			name: "ミシリア",
			kind: "base",
			position: { lat: 244, lng: 935.0093653943 },
			direction: "top",
		},
		{
			name: "ここら辺に新しいのあった気がする",
			kind: "base",
			position: { lat: 177, lng: 1251.988585925697 },
		},
		{
			name: "古城",
			kind: "nefia",
			position: { lat: 212, lng: 498.9853665714064 },
		},
		{
			name: "商人ギルド",
			kind: "base",
			position: { lat: 210, lng: 917.9987561585696 },
		},
		{
			name: "オルヴィナ",
			kind: "base",
			position: { lat: 171, lng: 626.9787083613963 },
		},
		{
			name: "風の眠る場所",
			kind: "nefia",
			position: { lat: 118, lng: 1407.999853665714 },
		},
		{
			name: "ウィロウ",
			kind: "base",
			position: { lat: 61, lng: 845.015950437167 },
		},
	] satisfies GlobalMapItem[],
};
