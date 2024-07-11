import {
	_,
	e as f,
	d as w,
	s as v,
	a as x,
} from "./usePageTransition.c85436b5.js";
import {
	o,
	c as i,
	b as m,
	F as y,
	G as H,
	J as T,
	k as p,
	w as k,
	h as C,
	x as L,
	a as $,
	d as z,
} from "./entry.b64d388a.js";
import { u as E } from "./useAsyncNavigationData.564096b3.js";
import { u as M } from "./usePageLoading.6c7406d2.js";
const N = {
		data() {
			return { isMounted: !1, windowHeight: 0 };
		},
		setup() {
			return { pageTheme: f() };
		},
		computed: {
			classes() {
				return [];
			},
			themeClass() {
				return `theme-${this.pageTheme ?? "light-gray"}`;
			},
			lineCount() {
				return this.isMounted ? Math.ceil(this.windowHeight / 24) : 36;
			},
		},
		mounted() {
			(this.isMounted = !0),
				(this.windowHeight = window.innerHeight),
				window.addEventListener("resize", this.updateHeight);
		},
		beforeDestroy() {
			(this.isMounted = !1),
				window.removeEventListener("resize", this.updateHeight);
		},
		methods: {
			updateHeight() {
				this.windowHeight = window.innerHeight;
			},
		},
	},
	A = { class: "flex items-center h-full" },
	S = { class: "w-full mt-spacing-7 pb-spacing-7", "aria-hidden": "true" };
function b(a, s, r, n, u, e) {
	return (
		o(),
		i(
			"div",
			{ class: p([e.themeClass, "fixed inset-0 z-[999] shutter-transition"]) },
			[
				m("div", A, [
					m("div", S, [
						(o(!0),
						i(
							y,
							null,
							H(
								e.lineCount,
								(t) => (
									o(),
									i(
										"div",
										{
											key: t,
											class: "shutter-row overflow-hidden",
											style: T(`--shutter-delay: ${(e.lineCount - t) * 7.5}ms`),
										},
										null,
										4
									)
								)
							),
							128
						)),
					]),
				]),
			],
			2
		)
	);
}
const B = _(N, [["render", b]]),
	J = {
		__name: "app",
		async setup(a) {
			var d, h;
			let s, r;
			const n = w(),
				{ data: u, error: e } =
					(([s, r] = k(() => E())), (s = await s), r(), s);
			!e.value && v((d = u.value) == null ? void 0 : d.navigation),
				!e.value && x((h = u.value) == null ? void 0 : h.social);
			const t = C(),
				c = M();
			return (
				t.hook("page:start", () => {
					(c.value = !0),
						document.documentElement.classList.remove("scroll-smooth");
				}),
				t.hook("page:finish", () => {
					const l = n.value == "simple" ? 150 : 600;
					(c.value = !1),
						setTimeout(() => {
							n.value = "simple";
						}, l + 100);
				}),
				t.hook("page:transition:finish", () => {
					window.scrollTo(0, 0),
						document.documentElement.classList.add("scroll-smooth");
				}),
				(l, P) => {
					const g = B;
					return (
						o(),
						i(
							"div",
							{ class: p(`${z(n)}-transition`) },
							[L(l.$slots, "default"), $(g)],
							2
						)
					);
				}
			);
		},
	};
export { J as default };
