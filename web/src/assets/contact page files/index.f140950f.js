import { _ as b } from "./Footer.e6485fe5.js";
import { _ as k } from "./Blocks.44438b3b.js";
import { u as y, s as w, _ as x } from "./useHeadSeo.d3db824e.js";
import {
	h as M,
	w as B,
	y as P,
	g as T,
	d as s,
	o as V,
	i as C,
	j as H,
	m as N,
	a as h,
	I as S,
	b as $,
} from "./entry.b64d388a.js";
import { d as A, b as q } from "./usePageTransition.c85436b5.js";
import { u as v } from "./usePreviewToken.81b6aab9.js";
import { u as I } from "./useErrorPage.23109362.js";
import "./BlockTimedTabs.vue.d0651cc9.js";
import "./Listing.a298d72a.js";
import "./slugify.3ca60c52.js";
import "./useResourceIndexData.dc2ced4d.js";
import "./usePageLoading.6c7406d2.js";
import "./lang.4a9029fb.js";
const R = { class: "home-blocks" },
	Y = {
		__name: "index",
		async setup(j) {
			var _, f;
			let r, m;
			const { $twill: c, $helpers: u } = M(),
				g = A(),
				{ data: e, error: p } =
					(([r, m] = B(() =>
						q(
							"homepage",
							() => {
								const o = c.find("homepages");
								return v().value && o.query("preview", v().value), o.fetch();
							},
							{ transform: (o) => c.transform(o).pop() }
						)
					)),
					(r = await r),
					m(),
					r);
			I({ data: e, error: p }), (g.value = "simple");
			const i = P(() => {
				var o, l, t, n, a;
				return {
					blendMode:
						((o = e == null ? void 0 : e.value) == null
							? void 0
							: o.hero.blendMode) ?? "default",
					image: u.media.imageByRole(
						e == null ? void 0 : e.value,
						"heroImage",
						"default"
					),
					links: (l = e == null ? void 0 : e.value) == null ? void 0 : l.links,
					poster: u.media.imageByRole(
						e == null ? void 0 : e.value,
						"heroPoster",
						"default"
					),
					title:
						(t = e == null ? void 0 : e.value) == null ? void 0 : t.description,
					type:
						(n = e == null ? void 0 : e.value) == null
							? void 0
							: n.hero.assetType,
					video:
						((a = e.value.files.heroVideoSrc) == null ? void 0 : a.length) &&
						e.value.files.heroVideoSrc[0].originalSrc,
				};
			});
			return (
				y({
					title: (_ = e.value) == null ? void 0 : _.title,
					seo: (f = e.value) == null ? void 0 : f.seo,
				}),
				T(() => {
					w(e == null ? void 0 : e.value);
				}),
				(o, l) => {
					const t = b,
						n = k,
						a = x;
					return s(p)
						? N("", !0)
						: (V(),
						  C(
								a,
								{ key: 0, id: "home" },
								{
									default: H(() => {
										var d;
										return [
											h(
												t,
												S({ name: "Home" }, s(i), {
													differenceMode:
														s(i).blendMode && s(i).blendMode === "difference",
													template: "Home",
													theme: s(e).colorTheme,
												}),
												null,
												16,
												["differenceMode", "theme"]
											),
											$("div", R, [
												h(
													n,
													{
														blocks:
															(d = s(e).blocks) == null ? void 0 : d.default,
														brand: !0,
													},
													null,
													8,
													["blocks"]
												),
											]),
										];
									}),
									_: 1,
								}
						  ));
				}
			);
		},
	};
export { Y as default };