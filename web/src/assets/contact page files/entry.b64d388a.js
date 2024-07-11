function Hc(e, t) {
	const r = Object.create(null),
		n = e.split(",");
	for (let i = 0; i < n.length; i++) r[n[i]] = !0;
	return t ? (i) => !!r[i.toLowerCase()] : (i) => !!r[i];
}
function Lo(e) {
	if (ge(e)) {
		const t = {};
		for (let r = 0; r < e.length; r++) {
			const n = e[r],
				i = We(n) ? U5(n) : Lo(n);
			if (i) for (const a in i) t[a] = i[a];
		}
		return t;
	} else {
		if (We(e)) return e;
		if (He(e)) return e;
	}
}
const $5 = /;(?![^(]*\))/g,
	F5 = /:([^]+)/,
	H5 = /\/\*.*?\*\//gs;
function U5(e) {
	const t = {};
	return (
		e
			.replace(H5, "")
			.split($5)
			.forEach((r) => {
				if (r) {
					const n = r.split(F5);
					n.length > 1 && (t[n[0].trim()] = n[1].trim());
				}
			}),
		t
	);
}
function zo(e) {
	let t = "";
	if (We(e)) t = e;
	else if (ge(e))
		for (let r = 0; r < e.length; r++) {
			const n = zo(e[r]);
			n && (t += n + " ");
		}
	else if (He(e)) for (const r in e) e[r] && (t += r + " ");
	return t.trim();
}
function eP(e) {
	if (!e) return null;
	let { class: t, style: r } = e;
	return t && !We(t) && (e.class = zo(t)), r && (e.style = Lo(r)), e;
}
const j5 =
		"itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
	q5 = Hc(j5);
function lp(e) {
	return !!e || e === "";
}
function G5(e, t) {
	if (e.length !== t.length) return !1;
	let r = !0;
	for (let n = 0; r && n < e.length; n++) r = ls(e[n], t[n]);
	return r;
}
function ls(e, t) {
	if (e === t) return !0;
	let r = Nf(e),
		n = Nf(t);
	if (r || n) return r && n ? e.getTime() === t.getTime() : !1;
	if (((r = za(e)), (n = za(t)), r || n)) return e === t;
	if (((r = ge(e)), (n = ge(t)), r || n)) return r && n ? G5(e, t) : !1;
	if (((r = He(e)), (n = He(t)), r || n)) {
		if (!r || !n) return !1;
		const i = Object.keys(e).length,
			a = Object.keys(t).length;
		if (i !== a) return !1;
		for (const s in e) {
			const o = e.hasOwnProperty(s),
				l = t.hasOwnProperty(s);
			if ((o && !l) || (!o && l) || !ls(e[s], t[s])) return !1;
		}
	}
	return String(e) === String(t);
}
function Uc(e, t) {
	return e.findIndex((r) => ls(r, t));
}
const tP = (e) =>
		We(e)
			? e
			: e == null
			? ""
			: ge(e) || (He(e) && (e.toString === up || !Se(e.toString)))
			? JSON.stringify(e, cp, 2)
			: String(e),
	cp = (e, t) =>
		t && t.__v_isRef
			? cp(e, t.value)
			: yi(t)
			? {
					[`Map(${t.size})`]: [...t.entries()].reduce(
						(r, [n, i]) => ((r[`${n} =>`] = i), r),
						{}
					),
			  }
			: Xi(t)
			? { [`Set(${t.size})`]: [...t.values()] }
			: He(t) && !ge(t) && !fp(t)
			? String(t)
			: t,
	qe = {},
	gi = [],
	Qt = () => {},
	Y5 = () => !1,
	W5 = /^on[^a-z]/,
	cs = (e) => W5.test(e),
	jc = (e) => e.startsWith("onUpdate:"),
	mt = Object.assign,
	qc = (e, t) => {
		const r = e.indexOf(t);
		r > -1 && e.splice(r, 1);
	},
	V5 = Object.prototype.hasOwnProperty,
	Ie = (e, t) => V5.call(e, t),
	ge = Array.isArray,
	yi = (e) => Ji(e) === "[object Map]",
	Xi = (e) => Ji(e) === "[object Set]",
	Nf = (e) => Ji(e) === "[object Date]",
	K5 = (e) => Ji(e) === "[object RegExp]",
	Se = (e) => typeof e == "function",
	We = (e) => typeof e == "string",
	za = (e) => typeof e == "symbol",
	He = (e) => e !== null && typeof e == "object",
	Gc = (e) => He(e) && Se(e.then) && Se(e.catch),
	up = Object.prototype.toString,
	Ji = (e) => up.call(e),
	X5 = (e) => Ji(e).slice(8, -1),
	fp = (e) => Ji(e) === "[object Object]",
	Yc = (e) =>
		We(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
	_a = Hc(
		",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
	),
	$o = (e) => {
		const t = Object.create(null);
		return (r) => t[r] || (t[r] = e(r));
	},
	J5 = /-(\w)/g,
	hr = $o((e) => e.replace(J5, (t, r) => (r ? r.toUpperCase() : ""))),
	Z5 = /\B([A-Z])/g,
	Qn = $o((e) => e.replace(Z5, "-$1").toLowerCase()),
	Fo = $o((e) => e.charAt(0).toUpperCase() + e.slice(1)),
	T0 = $o((e) => (e ? `on${Fo(e)}` : "")),
	$a = (e, t) => !Object.is(e, t),
	bi = (e, t) => {
		for (let r = 0; r < e.length; r++) e[r](t);
	},
	so = (e, t, r) => {
		Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: r });
	},
	oo = (e) => {
		const t = parseFloat(e);
		return isNaN(t) ? e : t;
	},
	dp = (e) => {
		const t = We(e) ? Number(e) : NaN;
		return isNaN(t) ? e : t;
	};
let Cf;
const Q5 = () =>
	Cf ||
	(Cf =
		typeof globalThis < "u"
			? globalThis
			: typeof self < "u"
			? self
			: typeof window < "u"
			? window
			: typeof global < "u"
			? global
			: {});
let Kt;
class e3 {
	constructor(t = !1) {
		(this.detached = t),
			(this._active = !0),
			(this.effects = []),
			(this.cleanups = []),
			(this.parent = Kt),
			!t && Kt && (this.index = (Kt.scopes || (Kt.scopes = [])).push(this) - 1);
	}
	get active() {
		return this._active;
	}
	run(t) {
		if (this._active) {
			const r = Kt;
			try {
				return (Kt = this), t();
			} finally {
				Kt = r;
			}
		}
	}
	on() {
		Kt = this;
	}
	off() {
		Kt = this.parent;
	}
	stop(t) {
		if (this._active) {
			let r, n;
			for (r = 0, n = this.effects.length; r < n; r++) this.effects[r].stop();
			for (r = 0, n = this.cleanups.length; r < n; r++) this.cleanups[r]();
			if (this.scopes)
				for (r = 0, n = this.scopes.length; r < n; r++) this.scopes[r].stop(!0);
			if (!this.detached && this.parent && !t) {
				const i = this.parent.scopes.pop();
				i &&
					i !== this &&
					((this.parent.scopes[this.index] = i), (i.index = this.index));
			}
			(this.parent = void 0), (this._active = !1);
		}
	}
}
function t3(e, t = Kt) {
	t && t.active && t.effects.push(e);
}
function r3() {
	return Kt;
}
const Wc = (e) => {
		const t = new Set(e);
		return (t.w = 0), (t.n = 0), t;
	},
	hp = (e) => (e.w & bn) > 0,
	pp = (e) => (e.n & bn) > 0,
	n3 = ({ deps: e }) => {
		if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= bn;
	},
	i3 = (e) => {
		const { deps: t } = e;
		if (t.length) {
			let r = 0;
			for (let n = 0; n < t.length; n++) {
				const i = t[n];
				hp(i) && !pp(i) ? i.delete(e) : (t[r++] = i),
					(i.w &= ~bn),
					(i.n &= ~bn);
			}
			t.length = r;
		}
	},
	lo = new WeakMap();
let ga = 0,
	bn = 1;
const Tl = 30;
let Jt;
const qn = Symbol(""),
	kl = Symbol("");
class Vc {
	constructor(t, r = null, n) {
		(this.fn = t),
			(this.scheduler = r),
			(this.active = !0),
			(this.deps = []),
			(this.parent = void 0),
			t3(this, n);
	}
	run() {
		if (!this.active) return this.fn();
		let t = Jt,
			r = fn;
		for (; t; ) {
			if (t === this) return;
			t = t.parent;
		}
		try {
			return (
				(this.parent = Jt),
				(Jt = this),
				(fn = !0),
				(bn = 1 << ++ga),
				ga <= Tl ? n3(this) : If(this),
				this.fn()
			);
		} finally {
			ga <= Tl && i3(this),
				(bn = 1 << --ga),
				(Jt = this.parent),
				(fn = r),
				(this.parent = void 0),
				this.deferStop && this.stop();
		}
	}
	stop() {
		Jt === this
			? (this.deferStop = !0)
			: this.active &&
			  (If(this), this.onStop && this.onStop(), (this.active = !1));
	}
}
function If(e) {
	const { deps: t } = e;
	if (t.length) {
		for (let r = 0; r < t.length; r++) t[r].delete(e);
		t.length = 0;
	}
}
let fn = !0;
const mp = [];
function Zi() {
	mp.push(fn), (fn = !1);
}
function Qi() {
	const e = mp.pop();
	fn = e === void 0 ? !0 : e;
}
function Nt(e, t, r) {
	if (fn && Jt) {
		let n = lo.get(e);
		n || lo.set(e, (n = new Map()));
		let i = n.get(r);
		i || n.set(r, (i = Wc())), gp(i);
	}
}
function gp(e, t) {
	let r = !1;
	ga <= Tl ? pp(e) || ((e.n |= bn), (r = !hp(e))) : (r = !e.has(Jt)),
		r && (e.add(Jt), Jt.deps.push(e));
}
function Cr(e, t, r, n, i, a) {
	const s = lo.get(e);
	if (!s) return;
	let o = [];
	if (t === "clear") o = [...s.values()];
	else if (r === "length" && ge(e)) {
		const l = Number(n);
		s.forEach((c, u) => {
			(u === "length" || u >= l) && o.push(c);
		});
	} else
		switch ((r !== void 0 && o.push(s.get(r)), t)) {
			case "add":
				ge(e)
					? Yc(r) && o.push(s.get("length"))
					: (o.push(s.get(qn)), yi(e) && o.push(s.get(kl)));
				break;
			case "delete":
				ge(e) || (o.push(s.get(qn)), yi(e) && o.push(s.get(kl)));
				break;
			case "set":
				yi(e) && o.push(s.get(qn));
				break;
		}
	if (o.length === 1) o[0] && Al(o[0]);
	else {
		const l = [];
		for (const c of o) c && l.push(...c);
		Al(Wc(l));
	}
}
function Al(e, t) {
	const r = ge(e) ? e : [...e];
	for (const n of r) n.computed && Df(n);
	for (const n of r) n.computed || Df(n);
}
function Df(e, t) {
	(e !== Jt || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
function a3(e, t) {
	var r;
	return (r = lo.get(e)) === null || r === void 0 ? void 0 : r.get(t);
}
const s3 = Hc("__proto__,__v_isRef,__isVue"),
	yp = new Set(
		Object.getOwnPropertyNames(Symbol)
			.filter((e) => e !== "arguments" && e !== "caller")
			.map((e) => Symbol[e])
			.filter(za)
	),
	o3 = Kc(),
	l3 = Kc(!1, !0),
	c3 = Kc(!0),
	Bf = u3();
function u3() {
	const e = {};
	return (
		["includes", "indexOf", "lastIndexOf"].forEach((t) => {
			e[t] = function (...r) {
				const n = De(this);
				for (let a = 0, s = this.length; a < s; a++) Nt(n, "get", a + "");
				const i = n[t](...r);
				return i === -1 || i === !1 ? n[t](...r.map(De)) : i;
			};
		}),
		["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
			e[t] = function (...r) {
				Zi();
				const n = De(this)[t].apply(this, r);
				return Qi(), n;
			};
		}),
		e
	);
}
function f3(e) {
	const t = De(this);
	return Nt(t, "has", e), t.hasOwnProperty(e);
}
function Kc(e = !1, t = !1) {
	return function (n, i, a) {
		if (i === "__v_isReactive") return !e;
		if (i === "__v_isReadonly") return e;
		if (i === "__v_isShallow") return t;
		if (i === "__v_raw" && a === (e ? (t ? A3 : Sp) : t ? wp : _p).get(n))
			return n;
		const s = ge(n);
		if (!e) {
			if (s && Ie(Bf, i)) return Reflect.get(Bf, i, a);
			if (i === "hasOwnProperty") return f3;
		}
		const o = Reflect.get(n, i, a);
		return (za(i) ? yp.has(i) : s3(i)) || (e || Nt(n, "get", i), t)
			? o
			: st(o)
			? s && Yc(i)
				? o
				: o.value
			: He(o)
			? e
				? Ep(o)
				: pr(o)
			: o;
	};
}
const d3 = bp(),
	h3 = bp(!0);
function bp(e = !1) {
	return function (r, n, i, a) {
		let s = r[n];
		if (Vn(s) && st(s) && !st(i)) return !1;
		if (
			!e &&
			(!co(i) && !Vn(i) && ((s = De(s)), (i = De(i))),
			!ge(r) && st(s) && !st(i))
		)
			return (s.value = i), !0;
		const o = ge(r) && Yc(n) ? Number(n) < r.length : Ie(r, n),
			l = Reflect.set(r, n, i, a);
		return (
			r === De(a) && (o ? $a(i, s) && Cr(r, "set", n, i) : Cr(r, "add", n, i)),
			l
		);
	};
}
function p3(e, t) {
	const r = Ie(e, t);
	e[t];
	const n = Reflect.deleteProperty(e, t);
	return n && r && Cr(e, "delete", t, void 0), n;
}
function m3(e, t) {
	const r = Reflect.has(e, t);
	return (!za(t) || !yp.has(t)) && Nt(e, "has", t), r;
}
function g3(e) {
	return Nt(e, "iterate", ge(e) ? "length" : qn), Reflect.ownKeys(e);
}
const vp = { get: o3, set: d3, deleteProperty: p3, has: m3, ownKeys: g3 },
	y3 = {
		get: c3,
		set(e, t) {
			return !0;
		},
		deleteProperty(e, t) {
			return !0;
		},
	},
	b3 = mt({}, vp, { get: l3, set: h3 }),
	Xc = (e) => e,
	Ho = (e) => Reflect.getPrototypeOf(e);
function Ss(e, t, r = !1, n = !1) {
	e = e.__v_raw;
	const i = De(e),
		a = De(t);
	r || (t !== a && Nt(i, "get", t), Nt(i, "get", a));
	const { has: s } = Ho(i),
		o = n ? Xc : r ? Qc : Fa;
	if (s.call(i, t)) return o(e.get(t));
	if (s.call(i, a)) return o(e.get(a));
	e !== i && e.get(t);
}
function Es(e, t = !1) {
	const r = this.__v_raw,
		n = De(r),
		i = De(e);
	return (
		t || (e !== i && Nt(n, "has", e), Nt(n, "has", i)),
		e === i ? r.has(e) : r.has(e) || r.has(i)
	);
}
function xs(e, t = !1) {
	return (
		(e = e.__v_raw), !t && Nt(De(e), "iterate", qn), Reflect.get(e, "size", e)
	);
}
function Pf(e) {
	e = De(e);
	const t = De(this);
	return Ho(t).has.call(t, e) || (t.add(e), Cr(t, "add", e, e)), this;
}
function Lf(e, t) {
	t = De(t);
	const r = De(this),
		{ has: n, get: i } = Ho(r);
	let a = n.call(r, e);
	a || ((e = De(e)), (a = n.call(r, e)));
	const s = i.call(r, e);
	return (
		r.set(e, t), a ? $a(t, s) && Cr(r, "set", e, t) : Cr(r, "add", e, t), this
	);
}
function zf(e) {
	const t = De(this),
		{ has: r, get: n } = Ho(t);
	let i = r.call(t, e);
	i || ((e = De(e)), (i = r.call(t, e))), n && n.call(t, e);
	const a = t.delete(e);
	return i && Cr(t, "delete", e, void 0), a;
}
function $f() {
	const e = De(this),
		t = e.size !== 0,
		r = e.clear();
	return t && Cr(e, "clear", void 0, void 0), r;
}
function Ts(e, t) {
	return function (n, i) {
		const a = this,
			s = a.__v_raw,
			o = De(s),
			l = t ? Xc : e ? Qc : Fa;
		return (
			!e && Nt(o, "iterate", qn), s.forEach((c, u) => n.call(i, l(c), l(u), a))
		);
	};
}
function ks(e, t, r) {
	return function (...n) {
		const i = this.__v_raw,
			a = De(i),
			s = yi(a),
			o = e === "entries" || (e === Symbol.iterator && s),
			l = e === "keys" && s,
			c = i[e](...n),
			u = r ? Xc : t ? Qc : Fa;
		return (
			!t && Nt(a, "iterate", l ? kl : qn),
			{
				next() {
					const { value: d, done: p } = c.next();
					return p
						? { value: d, done: p }
						: { value: o ? [u(d[0]), u(d[1])] : u(d), done: p };
				},
				[Symbol.iterator]() {
					return this;
				},
			}
		);
	};
}
function qr(e) {
	return function (...t) {
		return e === "delete" ? !1 : this;
	};
}
function v3() {
	const e = {
			get(a) {
				return Ss(this, a);
			},
			get size() {
				return xs(this);
			},
			has: Es,
			add: Pf,
			set: Lf,
			delete: zf,
			clear: $f,
			forEach: Ts(!1, !1),
		},
		t = {
			get(a) {
				return Ss(this, a, !1, !0);
			},
			get size() {
				return xs(this);
			},
			has: Es,
			add: Pf,
			set: Lf,
			delete: zf,
			clear: $f,
			forEach: Ts(!1, !0),
		},
		r = {
			get(a) {
				return Ss(this, a, !0);
			},
			get size() {
				return xs(this, !0);
			},
			has(a) {
				return Es.call(this, a, !0);
			},
			add: qr("add"),
			set: qr("set"),
			delete: qr("delete"),
			clear: qr("clear"),
			forEach: Ts(!0, !1),
		},
		n = {
			get(a) {
				return Ss(this, a, !0, !0);
			},
			get size() {
				return xs(this, !0);
			},
			has(a) {
				return Es.call(this, a, !0);
			},
			add: qr("add"),
			set: qr("set"),
			delete: qr("delete"),
			clear: qr("clear"),
			forEach: Ts(!0, !0),
		};
	return (
		["keys", "values", "entries", Symbol.iterator].forEach((a) => {
			(e[a] = ks(a, !1, !1)),
				(r[a] = ks(a, !0, !1)),
				(t[a] = ks(a, !1, !0)),
				(n[a] = ks(a, !0, !0));
		}),
		[e, r, t, n]
	);
}
const [_3, w3, S3, E3] = v3();
function Jc(e, t) {
	const r = t ? (e ? E3 : S3) : e ? w3 : _3;
	return (n, i, a) =>
		i === "__v_isReactive"
			? !e
			: i === "__v_isReadonly"
			? e
			: i === "__v_raw"
			? n
			: Reflect.get(Ie(r, i) && i in n ? r : n, i, a);
}
const x3 = { get: Jc(!1, !1) },
	T3 = { get: Jc(!1, !0) },
	k3 = { get: Jc(!0, !1) },
	_p = new WeakMap(),
	wp = new WeakMap(),
	Sp = new WeakMap(),
	A3 = new WeakMap();
function R3(e) {
	switch (e) {
		case "Object":
		case "Array":
			return 1;
		case "Map":
		case "Set":
		case "WeakMap":
		case "WeakSet":
			return 2;
		default:
			return 0;
	}
}
function M3(e) {
	return e.__v_skip || !Object.isExtensible(e) ? 0 : R3(X5(e));
}
function pr(e) {
	return Vn(e) ? e : Zc(e, !1, vp, x3, _p);
}
function O3(e) {
	return Zc(e, !1, b3, T3, wp);
}
function Ep(e) {
	return Zc(e, !0, y3, k3, Sp);
}
function Zc(e, t, r, n, i) {
	if (!He(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
	const a = i.get(e);
	if (a) return a;
	const s = M3(e);
	if (s === 0) return e;
	const o = new Proxy(e, s === 2 ? n : r);
	return i.set(e, o), o;
}
function vi(e) {
	return Vn(e) ? vi(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Vn(e) {
	return !!(e && e.__v_isReadonly);
}
function co(e) {
	return !!(e && e.__v_isShallow);
}
function xp(e) {
	return vi(e) || Vn(e);
}
function De(e) {
	const t = e && e.__v_raw;
	return t ? De(t) : e;
}
function Tp(e) {
	return so(e, "__v_skip", !0), e;
}
const Fa = (e) => (He(e) ? pr(e) : e),
	Qc = (e) => (He(e) ? Ep(e) : e);
function kp(e) {
	fn && Jt && ((e = De(e)), gp(e.dep || (e.dep = Wc())));
}
function Ap(e, t) {
	e = De(e);
	const r = e.dep;
	r && Al(r);
}
function st(e) {
	return !!(e && e.__v_isRef === !0);
}
function _i(e) {
	return Rp(e, !1);
}
function Rl(e) {
	return Rp(e, !0);
}
function Rp(e, t) {
	return st(e) ? e : new N3(e, t);
}
class N3 {
	constructor(t, r) {
		(this.__v_isShallow = r),
			(this.dep = void 0),
			(this.__v_isRef = !0),
			(this._rawValue = r ? t : De(t)),
			(this._value = r ? t : Fa(t));
	}
	get value() {
		return kp(this), this._value;
	}
	set value(t) {
		const r = this.__v_isShallow || co(t) || Vn(t);
		(t = r ? t : De(t)),
			$a(t, this._rawValue) &&
				((this._rawValue = t), (this._value = r ? t : Fa(t)), Ap(this));
	}
}
function ct(e) {
	return st(e) ? e.value : e;
}
const C3 = {
	get: (e, t, r) => ct(Reflect.get(e, t, r)),
	set: (e, t, r, n) => {
		const i = e[t];
		return st(i) && !st(r) ? ((i.value = r), !0) : Reflect.set(e, t, r, n);
	},
};
function Mp(e) {
	return vi(e) ? e : new Proxy(e, C3);
}
function rP(e) {
	const t = ge(e) ? new Array(e.length) : {};
	for (const r in e) t[r] = eu(e, r);
	return t;
}
class I3 {
	constructor(t, r, n) {
		(this._object = t),
			(this._key = r),
			(this._defaultValue = n),
			(this.__v_isRef = !0);
	}
	get value() {
		const t = this._object[this._key];
		return t === void 0 ? this._defaultValue : t;
	}
	set value(t) {
		this._object[this._key] = t;
	}
	get dep() {
		return a3(De(this._object), this._key);
	}
}
function eu(e, t, r) {
	const n = e[t];
	return st(n) ? n : new I3(e, t, r);
}
var Op;
class D3 {
	constructor(t, r, n, i) {
		(this._setter = r),
			(this.dep = void 0),
			(this.__v_isRef = !0),
			(this[Op] = !1),
			(this._dirty = !0),
			(this.effect = new Vc(t, () => {
				this._dirty || ((this._dirty = !0), Ap(this));
			})),
			(this.effect.computed = this),
			(this.effect.active = this._cacheable = !i),
			(this.__v_isReadonly = n);
	}
	get value() {
		const t = De(this);
		return (
			kp(t),
			(t._dirty || !t._cacheable) &&
				((t._dirty = !1), (t._value = t.effect.run())),
			t._value
		);
	}
	set value(t) {
		this._setter(t);
	}
}
Op = "__v_isReadonly";
function B3(e, t, r = !1) {
	let n, i;
	const a = Se(e);
	return (
		a ? ((n = e), (i = Qt)) : ((n = e.get), (i = e.set)),
		new D3(n, i, a || !i, r)
	);
}
function dn(e, t, r, n) {
	let i;
	try {
		i = n ? e(...n) : e();
	} catch (a) {
		ea(a, t, r);
	}
	return i;
}
function Gt(e, t, r, n) {
	if (Se(e)) {
		const a = dn(e, t, r, n);
		return (
			a &&
				Gc(a) &&
				a.catch((s) => {
					ea(s, t, r);
				}),
			a
		);
	}
	const i = [];
	for (let a = 0; a < e.length; a++) i.push(Gt(e[a], t, r, n));
	return i;
}
function ea(e, t, r, n = !0) {
	const i = t ? t.vnode : null;
	if (t) {
		let a = t.parent;
		const s = t.proxy,
			o = r;
		for (; a; ) {
			const c = a.ec;
			if (c) {
				for (let u = 0; u < c.length; u++) if (c[u](e, s, o) === !1) return;
			}
			a = a.parent;
		}
		const l = t.appContext.config.errorHandler;
		if (l) {
			dn(l, null, 10, [e, s, o]);
			return;
		}
	}
	P3(e, r, i, n);
}
function P3(e, t, r, n = !0) {
	console.error(e);
}
let Ha = !1,
	Ml = !1;
const bt = [];
let fr = 0;
const wi = [];
let Sr = null,
	Ln = 0;
const Np = Promise.resolve();
let tu = null;
function vn(e) {
	const t = tu || Np;
	return e ? t.then(this ? e.bind(this) : e) : t;
}
function L3(e) {
	let t = fr + 1,
		r = bt.length;
	for (; t < r; ) {
		const n = (t + r) >>> 1;
		Ua(bt[n]) < e ? (t = n + 1) : (r = n);
	}
	return t;
}
function Uo(e) {
	(!bt.length || !bt.includes(e, Ha && e.allowRecurse ? fr + 1 : fr)) &&
		(e.id == null ? bt.push(e) : bt.splice(L3(e.id), 0, e), Cp());
}
function Cp() {
	!Ha && !Ml && ((Ml = !0), (tu = Np.then(Dp)));
}
function z3(e) {
	const t = bt.indexOf(e);
	t > fr && bt.splice(t, 1);
}
function Ip(e) {
	ge(e)
		? wi.push(...e)
		: (!Sr || !Sr.includes(e, e.allowRecurse ? Ln + 1 : Ln)) && wi.push(e),
		Cp();
}
function Ff(e, t = Ha ? fr + 1 : 0) {
	for (; t < bt.length; t++) {
		const r = bt[t];
		r && r.pre && (bt.splice(t, 1), t--, r());
	}
}
function uo(e) {
	if (wi.length) {
		const t = [...new Set(wi)];
		if (((wi.length = 0), Sr)) {
			Sr.push(...t);
			return;
		}
		for (Sr = t, Sr.sort((r, n) => Ua(r) - Ua(n)), Ln = 0; Ln < Sr.length; Ln++)
			Sr[Ln]();
		(Sr = null), (Ln = 0);
	}
}
const Ua = (e) => (e.id == null ? 1 / 0 : e.id),
	$3 = (e, t) => {
		const r = Ua(e) - Ua(t);
		if (r === 0) {
			if (e.pre && !t.pre) return -1;
			if (t.pre && !e.pre) return 1;
		}
		return r;
	};
function Dp(e) {
	(Ml = !1), (Ha = !0), bt.sort($3);
	const t = Qt;
	try {
		for (fr = 0; fr < bt.length; fr++) {
			const r = bt[fr];
			r && r.active !== !1 && dn(r, null, 14);
		}
	} finally {
		(fr = 0),
			(bt.length = 0),
			uo(),
			(Ha = !1),
			(tu = null),
			(bt.length || wi.length) && Dp();
	}
}
function F3(e, t, ...r) {
	if (e.isUnmounted) return;
	const n = e.vnode.props || qe;
	let i = r;
	const a = t.startsWith("update:"),
		s = a && t.slice(7);
	if (s && s in n) {
		const u = `${s === "modelValue" ? "model" : s}Modifiers`,
			{ number: d, trim: p } = n[u] || qe;
		p && (i = r.map((m) => (We(m) ? m.trim() : m))), d && (i = r.map(oo));
	}
	let o,
		l = n[(o = T0(t))] || n[(o = T0(hr(t)))];
	!l && a && (l = n[(o = T0(Qn(t)))]), l && Gt(l, e, 6, i);
	const c = n[o + "Once"];
	if (c) {
		if (!e.emitted) e.emitted = {};
		else if (e.emitted[o]) return;
		(e.emitted[o] = !0), Gt(c, e, 6, i);
	}
}
function Bp(e, t, r = !1) {
	const n = t.emitsCache,
		i = n.get(e);
	if (i !== void 0) return i;
	const a = e.emits;
	let s = {},
		o = !1;
	if (!Se(e)) {
		const l = (c) => {
			const u = Bp(c, t, !0);
			u && ((o = !0), mt(s, u));
		};
		!r && t.mixins.length && t.mixins.forEach(l),
			e.extends && l(e.extends),
			e.mixins && e.mixins.forEach(l);
	}
	return !a && !o
		? (He(e) && n.set(e, null), null)
		: (ge(a) ? a.forEach((l) => (s[l] = null)) : mt(s, a),
		  He(e) && n.set(e, s),
		  s);
}
function jo(e, t) {
	return !e || !cs(t)
		? !1
		: ((t = t.slice(2).replace(/Once$/, "")),
		  Ie(e, t[0].toLowerCase() + t.slice(1)) || Ie(e, Qn(t)) || Ie(e, t));
}
let pt = null,
	qo = null;
function fo(e) {
	const t = pt;
	return (pt = e), (qo = (e && e.type.__scopeId) || null), t;
}
function nP(e) {
	qo = e;
}
function iP() {
	qo = null;
}
function ho(e, t = pt, r) {
	if (!t || e._n) return e;
	const n = (...i) => {
		n._d && Zf(-1);
		const a = fo(t);
		let s;
		try {
			s = e(...i);
		} finally {
			fo(a), n._d && Zf(1);
		}
		return s;
	};
	return (n._n = !0), (n._c = !0), (n._d = !0), n;
}
function k0(e) {
	const {
		type: t,
		vnode: r,
		proxy: n,
		withProxy: i,
		props: a,
		propsOptions: [s],
		slots: o,
		attrs: l,
		emit: c,
		render: u,
		renderCache: d,
		data: p,
		setupState: m,
		ctx: b,
		inheritAttrs: E,
	} = e;
	let R, _;
	const v = fo(e);
	try {
		if (r.shapeFlag & 4) {
			const M = i || n;
			(R = Ft(u.call(M, M, d, a, m, p, b))), (_ = l);
		} else {
			const M = t;
			(R = Ft(
				M.length > 1 ? M(a, { attrs: l, slots: o, emit: c }) : M(a, null)
			)),
				(_ = t.props ? l : U3(l));
		}
	} catch (M) {
		(xa.length = 0), ea(M, e, 1), (R = Ye(Tt));
	}
	let T = R;
	if (_ && E !== !1) {
		const M = Object.keys(_),
			{ shapeFlag: O } = T;
		M.length && O & 7 && (s && M.some(jc) && (_ = j3(_, s)), (T = Ir(T, _)));
	}
	return (
		r.dirs && ((T = Ir(T)), (T.dirs = T.dirs ? T.dirs.concat(r.dirs) : r.dirs)),
		r.transition && (T.transition = r.transition),
		(R = T),
		fo(v),
		R
	);
}
function H3(e) {
	let t;
	for (let r = 0; r < e.length; r++) {
		const n = e[r];
		if (Bi(n)) {
			if (n.type !== Tt || n.children === "v-if") {
				if (t) return;
				t = n;
			}
		} else return;
	}
	return t;
}
const U3 = (e) => {
		let t;
		for (const r in e)
			(r === "class" || r === "style" || cs(r)) && ((t || (t = {}))[r] = e[r]);
		return t;
	},
	j3 = (e, t) => {
		const r = {};
		for (const n in e) (!jc(n) || !(n.slice(9) in t)) && (r[n] = e[n]);
		return r;
	};
function q3(e, t, r) {
	const { props: n, children: i, component: a } = e,
		{ props: s, children: o, patchFlag: l } = t,
		c = a.emitsOptions;
	if (t.dirs || t.transition) return !0;
	if (r && l >= 0) {
		if (l & 1024) return !0;
		if (l & 16) return n ? Hf(n, s, c) : !!s;
		if (l & 8) {
			const u = t.dynamicProps;
			for (let d = 0; d < u.length; d++) {
				const p = u[d];
				if (s[p] !== n[p] && !jo(c, p)) return !0;
			}
		}
	} else
		return (i || o) && (!o || !o.$stable)
			? !0
			: n === s
			? !1
			: n
			? s
				? Hf(n, s, c)
				: !0
			: !!s;
	return !1;
}
function Hf(e, t, r) {
	const n = Object.keys(t);
	if (n.length !== Object.keys(e).length) return !0;
	for (let i = 0; i < n.length; i++) {
		const a = n[i];
		if (t[a] !== e[a] && !jo(r, a)) return !0;
	}
	return !1;
}
function ru({ vnode: e, parent: t }, r) {
	for (; t && t.subTree === e; ) ((e = t.vnode).el = r), (t = t.parent);
}
const Pp = (e) => e.__isSuspense,
	G3 = {
		name: "Suspense",
		__isSuspense: !0,
		process(e, t, r, n, i, a, s, o, l, c) {
			e == null ? Y3(t, r, n, i, a, s, o, l, c) : W3(e, t, r, n, i, s, o, l, c);
		},
		hydrate: V3,
		create: nu,
		normalize: K3,
	},
	Lp = G3;
function ja(e, t) {
	const r = e.props && e.props[t];
	Se(r) && r();
}
function Y3(e, t, r, n, i, a, s, o, l) {
	const {
			p: c,
			o: { createElement: u },
		} = l,
		d = u("div"),
		p = (e.suspense = nu(e, i, n, t, d, r, a, s, o, l));
	c(null, (p.pendingBranch = e.ssContent), d, null, n, p, a, s),
		p.deps > 0
			? (ja(e, "onPending"),
			  ja(e, "onFallback"),
			  c(null, e.ssFallback, t, r, n, null, a, s),
			  Si(p, e.ssFallback))
			: p.resolve();
}
function W3(e, t, r, n, i, a, s, o, { p: l, um: c, o: { createElement: u } }) {
	const d = (t.suspense = e.suspense);
	(d.vnode = t), (t.el = e.el);
	const p = t.ssContent,
		m = t.ssFallback,
		{ activeBranch: b, pendingBranch: E, isInFallback: R, isHydrating: _ } = d;
	if (E)
		(d.pendingBranch = p),
			Zt(p, E)
				? (l(E, p, d.hiddenContainer, null, i, d, a, s, o),
				  d.deps <= 0
						? d.resolve()
						: R && (l(b, m, r, n, i, null, a, s, o), Si(d, m)))
				: (d.pendingId++,
				  _ ? ((d.isHydrating = !1), (d.activeBranch = E)) : c(E, i, d),
				  (d.deps = 0),
				  (d.effects.length = 0),
				  (d.hiddenContainer = u("div")),
				  R
						? (l(null, p, d.hiddenContainer, null, i, d, a, s, o),
						  d.deps <= 0
								? d.resolve()
								: (l(b, m, r, n, i, null, a, s, o), Si(d, m)))
						: b && Zt(p, b)
						? (l(b, p, r, n, i, d, a, s, o), d.resolve(!0))
						: (l(null, p, d.hiddenContainer, null, i, d, a, s, o),
						  d.deps <= 0 && d.resolve()));
	else if (b && Zt(p, b)) l(b, p, r, n, i, d, a, s, o), Si(d, p);
	else if (
		(ja(t, "onPending"),
		(d.pendingBranch = p),
		d.pendingId++,
		l(null, p, d.hiddenContainer, null, i, d, a, s, o),
		d.deps <= 0)
	)
		d.resolve();
	else {
		const { timeout: v, pendingId: T } = d;
		v > 0
			? setTimeout(() => {
					d.pendingId === T && d.fallback(m);
			  }, v)
			: v === 0 && d.fallback(m);
	}
}
function nu(e, t, r, n, i, a, s, o, l, c, u = !1) {
	const {
			p: d,
			m: p,
			um: m,
			n: b,
			o: { parentNode: E, remove: R },
		} = c,
		_ = e.props ? dp(e.props.timeout) : void 0,
		v = {
			vnode: e,
			parent: t,
			parentComponent: r,
			isSVG: s,
			container: n,
			hiddenContainer: i,
			anchor: a,
			deps: 0,
			pendingId: 0,
			timeout: typeof _ == "number" ? _ : -1,
			activeBranch: null,
			pendingBranch: null,
			isInFallback: !0,
			isHydrating: u,
			isUnmounted: !1,
			effects: [],
			resolve(T = !1) {
				const {
					vnode: M,
					activeBranch: O,
					pendingBranch: B,
					pendingId: z,
					effects: D,
					parentComponent: H,
					container: Q,
				} = v;
				if (v.isHydrating) v.isHydrating = !1;
				else if (!T) {
					const oe = O && B.transition && B.transition.mode === "out-in";
					oe &&
						(O.transition.afterLeave = () => {
							z === v.pendingId && p(B, Q, W, 0);
						});
					let { anchor: W } = v;
					O && ((W = b(O)), m(O, H, v, !0)), oe || p(B, Q, W, 0);
				}
				Si(v, B), (v.pendingBranch = null), (v.isInFallback = !1);
				let te = v.parent,
					q = !1;
				for (; te; ) {
					if (te.pendingBranch) {
						te.effects.push(...D), (q = !0);
						break;
					}
					te = te.parent;
				}
				q || Ip(D), (v.effects = []), ja(M, "onResolve");
			},
			fallback(T) {
				if (!v.pendingBranch) return;
				const {
					vnode: M,
					activeBranch: O,
					parentComponent: B,
					container: z,
					isSVG: D,
				} = v;
				ja(M, "onFallback");
				const H = b(O),
					Q = () => {
						v.isInFallback && (d(null, T, z, H, B, null, D, o, l), Si(v, T));
					},
					te = T.transition && T.transition.mode === "out-in";
				te && (O.transition.afterLeave = Q),
					(v.isInFallback = !0),
					m(O, B, null, !0),
					te || Q();
			},
			move(T, M, O) {
				v.activeBranch && p(v.activeBranch, T, M, O), (v.container = T);
			},
			next() {
				return v.activeBranch && b(v.activeBranch);
			},
			registerDep(T, M) {
				const O = !!v.pendingBranch;
				O && v.deps++;
				const B = T.vnode.el;
				T.asyncDep
					.catch((z) => {
						ea(z, T, 0);
					})
					.then((z) => {
						if (T.isUnmounted || v.isUnmounted || v.pendingId !== T.suspenseId)
							return;
						T.asyncResolved = !0;
						const { vnode: D } = T;
						Pl(T, z, !1), B && (D.el = B);
						const H = !B && T.subTree.el;
						M(T, D, E(B || T.subTree.el), B ? null : b(T.subTree), v, s, l),
							H && R(H),
							ru(T, D.el),
							O && --v.deps === 0 && v.resolve();
					});
			},
			unmount(T, M) {
				(v.isUnmounted = !0),
					v.activeBranch && m(v.activeBranch, r, T, M),
					v.pendingBranch && m(v.pendingBranch, r, T, M);
			},
		};
	return v;
}
function V3(e, t, r, n, i, a, s, o, l) {
	const c = (t.suspense = nu(
			t,
			n,
			r,
			e.parentNode,
			document.createElement("div"),
			null,
			i,
			a,
			s,
			o,
			!0
		)),
		u = l(e, (c.pendingBranch = t.ssContent), r, c, a, s);
	return c.deps === 0 && c.resolve(), u;
}
function K3(e) {
	const { shapeFlag: t, children: r } = e,
		n = t & 32;
	(e.ssContent = Uf(n ? r.default : r)),
		(e.ssFallback = n ? Uf(r.fallback) : Ye(Tt));
}
function Uf(e) {
	let t;
	if (Se(e)) {
		const r = Di && e._c;
		r && ((e._d = !1), sn()), (e = e()), r && ((e._d = !0), (t = Ut), om());
	}
	return (
		ge(e) && (e = H3(e)),
		(e = Ft(e)),
		t && !e.dynamicChildren && (e.dynamicChildren = t.filter((r) => r !== e)),
		e
	);
}
function zp(e, t) {
	t && t.pendingBranch
		? ge(e)
			? t.effects.push(...e)
			: t.effects.push(e)
		: Ip(e);
}
function Si(e, t) {
	e.activeBranch = t;
	const { vnode: r, parentComponent: n } = e,
		i = (r.el = t.el);
	n && n.subTree === r && ((n.vnode.el = i), ru(n, i));
}
function Ei(e, t) {
	if (et) {
		let r = et.provides;
		const n = et.parent && et.parent.provides;
		n === r && (r = et.provides = Object.create(n)), (r[e] = t);
	}
}
function Lt(e, t, r = !1) {
	const n = et || pt;
	if (n) {
		const i =
			n.parent == null
				? n.vnode.appContext && n.vnode.appContext.provides
				: n.parent.provides;
		if (i && e in i) return i[e];
		if (arguments.length > 1) return r && Se(t) ? t.call(n.proxy) : t;
	}
}
function X3(e, t) {
	return iu(e, null, t);
}
const As = {};
function xi(e, t, r) {
	return iu(e, t, r);
}
function iu(
	e,
	t,
	{ immediate: r, deep: n, flush: i, onTrack: a, onTrigger: s } = qe
) {
	const o = r3() === (et == null ? void 0 : et.scope) ? et : null;
	let l,
		c = !1,
		u = !1;
	if (
		(st(e)
			? ((l = () => e.value), (c = co(e)))
			: vi(e)
			? ((l = () => e), (n = !0))
			: ge(e)
			? ((u = !0),
			  (c = e.some((T) => vi(T) || co(T))),
			  (l = () =>
					e.map((T) => {
						if (st(T)) return T.value;
						if (vi(T)) return Fn(T);
						if (Se(T)) return dn(T, o, 2);
					})))
			: Se(e)
			? t
				? (l = () => dn(e, o, 2))
				: (l = () => {
						if (!(o && o.isUnmounted)) return d && d(), Gt(e, o, 3, [p]);
				  })
			: (l = Qt),
		t && n)
	) {
		const T = l;
		l = () => Fn(T());
	}
	let d,
		p = (T) => {
			d = _.onStop = () => {
				dn(T, o, 4);
			};
		},
		m;
	if (Pi)
		if (
			((p = Qt),
			t ? r && Gt(t, o, 3, [l(), u ? [] : void 0, p]) : l(),
			i === "sync")
		) {
			const T = H6();
			m = T.__watcherHandles || (T.__watcherHandles = []);
		} else return Qt;
	let b = u ? new Array(e.length).fill(As) : As;
	const E = () => {
		if (_.active)
			if (t) {
				const T = _.run();
				(n || c || (u ? T.some((M, O) => $a(M, b[O])) : $a(T, b))) &&
					(d && d(),
					Gt(t, o, 3, [T, b === As ? void 0 : u && b[0] === As ? [] : b, p]),
					(b = T));
			} else _.run();
	};
	E.allowRecurse = !!t;
	let R;
	i === "sync"
		? (R = E)
		: i === "post"
		? (R = () => dt(E, o && o.suspense))
		: ((E.pre = !0), o && (E.id = o.uid), (R = () => Uo(E)));
	const _ = new Vc(l, R);
	t
		? r
			? E()
			: (b = _.run())
		: i === "post"
		? dt(_.run.bind(_), o && o.suspense)
		: _.run();
	const v = () => {
		_.stop(), o && o.scope && qc(o.scope.effects, _);
	};
	return m && m.push(v), v;
}
function J3(e, t, r) {
	const n = this.proxy,
		i = We(e) ? (e.includes(".") ? $p(n, e) : () => n[e]) : e.bind(n, n);
	let a;
	Se(t) ? (a = t) : ((a = t.handler), (r = t));
	const s = et;
	_n(this);
	const o = iu(i, a.bind(n), r);
	return s ? _n(s) : hn(), o;
}
function $p(e, t) {
	const r = t.split(".");
	return () => {
		let n = e;
		for (let i = 0; i < r.length && n; i++) n = n[r[i]];
		return n;
	};
}
function Fn(e, t) {
	if (!He(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
	if ((t.add(e), st(e))) Fn(e.value, t);
	else if (ge(e)) for (let r = 0; r < e.length; r++) Fn(e[r], t);
	else if (Xi(e) || yi(e))
		e.forEach((r) => {
			Fn(r, t);
		});
	else if (fp(e)) for (const r in e) Fn(e[r], t);
	return e;
}
function Z3() {
	const e = {
		isMounted: !1,
		isLeaving: !1,
		isUnmounting: !1,
		leavingVNodes: new Map(),
	};
	return (
		au(() => {
			e.isMounted = !0;
		}),
		Yo(() => {
			e.isUnmounting = !0;
		}),
		e
	);
}
const $t = [Function, Array],
	Q3 = {
		name: "BaseTransition",
		props: {
			mode: String,
			appear: Boolean,
			persisted: Boolean,
			onBeforeEnter: $t,
			onEnter: $t,
			onAfterEnter: $t,
			onEnterCancelled: $t,
			onBeforeLeave: $t,
			onLeave: $t,
			onAfterLeave: $t,
			onLeaveCancelled: $t,
			onBeforeAppear: $t,
			onAppear: $t,
			onAfterAppear: $t,
			onAppearCancelled: $t,
		},
		setup(e, { slots: t }) {
			const r = An(),
				n = Z3();
			let i;
			return () => {
				const a = t.default && Up(t.default(), !0);
				if (!a || !a.length) return;
				let s = a[0];
				if (a.length > 1) {
					for (const E of a)
						if (E.type !== Tt) {
							s = E;
							break;
						}
				}
				const o = De(e),
					{ mode: l } = o;
				if (n.isLeaving) return A0(s);
				const c = jf(s);
				if (!c) return A0(s);
				const u = Ol(c, o, n, r);
				po(c, u);
				const d = r.subTree,
					p = d && jf(d);
				let m = !1;
				const { getTransitionKey: b } = c.type;
				if (b) {
					const E = b();
					i === void 0 ? (i = E) : E !== i && ((i = E), (m = !0));
				}
				if (p && p.type !== Tt && (!Zt(c, p) || m)) {
					const E = Ol(p, o, n, r);
					if ((po(p, E), l === "out-in"))
						return (
							(n.isLeaving = !0),
							(E.afterLeave = () => {
								(n.isLeaving = !1), r.update.active !== !1 && r.update();
							}),
							A0(s)
						);
					l === "in-out" &&
						c.type !== Tt &&
						(E.delayLeave = (R, _, v) => {
							const T = Hp(n, p);
							(T[String(p.key)] = p),
								(R._leaveCb = () => {
									_(), (R._leaveCb = void 0), delete u.delayedLeave;
								}),
								(u.delayedLeave = v);
						});
				}
				return s;
			};
		},
	},
	Fp = Q3;
function Hp(e, t) {
	const { leavingVNodes: r } = e;
	let n = r.get(t.type);
	return n || ((n = Object.create(null)), r.set(t.type, n)), n;
}
function Ol(e, t, r, n) {
	const {
			appear: i,
			mode: a,
			persisted: s = !1,
			onBeforeEnter: o,
			onEnter: l,
			onAfterEnter: c,
			onEnterCancelled: u,
			onBeforeLeave: d,
			onLeave: p,
			onAfterLeave: m,
			onLeaveCancelled: b,
			onBeforeAppear: E,
			onAppear: R,
			onAfterAppear: _,
			onAppearCancelled: v,
		} = t,
		T = String(e.key),
		M = Hp(r, e),
		O = (D, H) => {
			D && Gt(D, n, 9, H);
		},
		B = (D, H) => {
			const Q = H[1];
			O(D, H),
				ge(D) ? D.every((te) => te.length <= 1) && Q() : D.length <= 1 && Q();
		},
		z = {
			mode: a,
			persisted: s,
			beforeEnter(D) {
				let H = o;
				if (!r.isMounted)
					if (i) H = E || o;
					else return;
				D._leaveCb && D._leaveCb(!0);
				const Q = M[T];
				Q && Zt(e, Q) && Q.el._leaveCb && Q.el._leaveCb(), O(H, [D]);
			},
			enter(D) {
				let H = l,
					Q = c,
					te = u;
				if (!r.isMounted)
					if (i) (H = R || l), (Q = _ || c), (te = v || u);
					else return;
				let q = !1;
				const oe = (D._enterCb = (W) => {
					q ||
						((q = !0),
						W ? O(te, [D]) : O(Q, [D]),
						z.delayedLeave && z.delayedLeave(),
						(D._enterCb = void 0));
				});
				H ? B(H, [D, oe]) : oe();
			},
			leave(D, H) {
				const Q = String(e.key);
				if ((D._enterCb && D._enterCb(!0), r.isUnmounting)) return H();
				O(d, [D]);
				let te = !1;
				const q = (D._leaveCb = (oe) => {
					te ||
						((te = !0),
						H(),
						oe ? O(b, [D]) : O(m, [D]),
						(D._leaveCb = void 0),
						M[Q] === e && delete M[Q]);
				});
				(M[Q] = e), p ? B(p, [D, q]) : q();
			},
			clone(D) {
				return Ol(D, t, r, n);
			},
		};
	return z;
}
function A0(e) {
	if (us(e)) return (e = Ir(e)), (e.children = null), e;
}
function jf(e) {
	return us(e) ? (e.children ? e.children[0] : void 0) : e;
}
function po(e, t) {
	e.shapeFlag & 6 && e.component
		? po(e.component.subTree, t)
		: e.shapeFlag & 128
		? ((e.ssContent.transition = t.clone(e.ssContent)),
		  (e.ssFallback.transition = t.clone(e.ssFallback)))
		: (e.transition = t);
}
function Up(e, t = !1, r) {
	let n = [],
		i = 0;
	for (let a = 0; a < e.length; a++) {
		let s = e[a];
		const o = r == null ? s.key : String(r) + String(s.key != null ? s.key : a);
		s.type === Ot
			? (s.patchFlag & 128 && i++, (n = n.concat(Up(s.children, t, o))))
			: (t || s.type !== Tt) && n.push(o != null ? Ir(s, { key: o }) : s);
	}
	if (i > 1) for (let a = 0; a < n.length; a++) n[a].patchFlag = -2;
	return n;
}
function Lr(e) {
	return Se(e) ? { setup: e, name: e.name } : e;
}
const Gn = (e) => !!e.type.__asyncLoader;
function e6(e) {
	Se(e) && (e = { loader: e });
	const {
		loader: t,
		loadingComponent: r,
		errorComponent: n,
		delay: i = 200,
		timeout: a,
		suspensible: s = !0,
		onError: o,
	} = e;
	let l = null,
		c,
		u = 0;
	const d = () => (u++, (l = null), p()),
		p = () => {
			let m;
			return (
				l ||
				(m = l =
					t()
						.catch((b) => {
							if (((b = b instanceof Error ? b : new Error(String(b))), o))
								return new Promise((E, R) => {
									o(
										b,
										() => E(d()),
										() => R(b),
										u + 1
									);
								});
							throw b;
						})
						.then((b) =>
							m !== l && l
								? l
								: (b &&
										(b.__esModule || b[Symbol.toStringTag] === "Module") &&
										(b = b.default),
								  (c = b),
								  b)
						))
			);
		};
	return Lr({
		name: "AsyncComponentWrapper",
		__asyncLoader: p,
		get __asyncResolved() {
			return c;
		},
		setup() {
			const m = et;
			if (c) return () => R0(c, m);
			const b = (v) => {
				(l = null), ea(v, m, 13, !n);
			};
			if ((s && m.suspense) || Pi)
				return p()
					.then((v) => () => R0(v, m))
					.catch((v) => (b(v), () => (n ? Ye(n, { error: v }) : null)));
			const E = _i(!1),
				R = _i(),
				_ = _i(!!i);
			return (
				i &&
					setTimeout(() => {
						_.value = !1;
					}, i),
				a != null &&
					setTimeout(() => {
						if (!E.value && !R.value) {
							const v = new Error(`Async component timed out after ${a}ms.`);
							b(v), (R.value = v);
						}
					}, a),
				p()
					.then(() => {
						(E.value = !0),
							m.parent && us(m.parent.vnode) && Uo(m.parent.update);
					})
					.catch((v) => {
						b(v), (R.value = v);
					}),
				() => {
					if (E.value && c) return R0(c, m);
					if (R.value && n) return Ye(n, { error: R.value });
					if (r && !_.value) return Ye(r);
				}
			);
		},
	});
}
function R0(e, t) {
	const { ref: r, props: n, children: i, ce: a } = t.vnode,
		s = Ye(e, n, i);
	return (s.ref = r), (s.ce = a), delete t.vnode.ce, s;
}
const us = (e) => e.type.__isKeepAlive,
	t6 = {
		name: "KeepAlive",
		__isKeepAlive: !0,
		props: {
			include: [String, RegExp, Array],
			exclude: [String, RegExp, Array],
			max: [String, Number],
		},
		setup(e, { slots: t }) {
			const r = An(),
				n = r.ctx;
			if (!n.renderer)
				return () => {
					const v = t.default && t.default();
					return v && v.length === 1 ? v[0] : v;
				};
			const i = new Map(),
				a = new Set();
			let s = null;
			const o = r.suspense,
				{
					renderer: {
						p: l,
						m: c,
						um: u,
						o: { createElement: d },
					},
				} = n,
				p = d("div");
			(n.activate = (v, T, M, O, B) => {
				const z = v.component;
				c(v, T, M, 0, o),
					l(z.vnode, v, T, M, z, o, O, v.slotScopeIds, B),
					dt(() => {
						(z.isDeactivated = !1), z.a && bi(z.a);
						const D = v.props && v.props.onVnodeMounted;
						D && Rt(D, z.parent, v);
					}, o);
			}),
				(n.deactivate = (v) => {
					const T = v.component;
					c(v, p, null, 1, o),
						dt(() => {
							T.da && bi(T.da);
							const M = v.props && v.props.onVnodeUnmounted;
							M && Rt(M, T.parent, v), (T.isDeactivated = !0);
						}, o);
				});
			function m(v) {
				M0(v), u(v, r, o, !0);
			}
			function b(v) {
				i.forEach((T, M) => {
					const O = Ll(T.type);
					O && (!v || !v(O)) && E(M);
				});
			}
			function E(v) {
				const T = i.get(v);
				!s || !Zt(T, s) ? m(T) : s && M0(s), i.delete(v), a.delete(v);
			}
			xi(
				() => [e.include, e.exclude],
				([v, T]) => {
					v && b((M) => ya(v, M)), T && b((M) => !ya(T, M));
				},
				{ flush: "post", deep: !0 }
			);
			let R = null;
			const _ = () => {
				R != null && i.set(R, O0(r.subTree));
			};
			return (
				au(_),
				Yp(_),
				Yo(() => {
					i.forEach((v) => {
						const { subTree: T, suspense: M } = r,
							O = O0(T);
						if (v.type === O.type && v.key === O.key) {
							M0(O);
							const B = O.component.da;
							B && dt(B, M);
							return;
						}
						m(v);
					});
				}),
				() => {
					if (((R = null), !t.default)) return null;
					const v = t.default(),
						T = v[0];
					if (v.length > 1) return (s = null), v;
					if (!Bi(T) || (!(T.shapeFlag & 4) && !(T.shapeFlag & 128)))
						return (s = null), T;
					let M = O0(T);
					const O = M.type,
						B = Ll(Gn(M) ? M.type.__asyncResolved || {} : O),
						{ include: z, exclude: D, max: H } = e;
					if ((z && (!B || !ya(z, B))) || (D && B && ya(D, B)))
						return (s = M), T;
					const Q = M.key == null ? O : M.key,
						te = i.get(Q);
					return (
						M.el && ((M = Ir(M)), T.shapeFlag & 128 && (T.ssContent = M)),
						(R = Q),
						te
							? ((M.el = te.el),
							  (M.component = te.component),
							  M.transition && po(M, M.transition),
							  (M.shapeFlag |= 512),
							  a.delete(Q),
							  a.add(Q))
							: (a.add(Q),
							  H && a.size > parseInt(H, 10) && E(a.values().next().value)),
						(M.shapeFlag |= 256),
						(s = M),
						Pp(T.type) ? T : M
					);
				}
			);
		},
	},
	r6 = t6;
function ya(e, t) {
	return ge(e)
		? e.some((r) => ya(r, t))
		: We(e)
		? e.split(",").includes(t)
		: K5(e)
		? e.test(t)
		: !1;
}
function jp(e, t) {
	Gp(e, "a", t);
}
function qp(e, t) {
	Gp(e, "da", t);
}
function Gp(e, t, r = et) {
	const n =
		e.__wdc ||
		(e.__wdc = () => {
			let i = r;
			for (; i; ) {
				if (i.isDeactivated) return;
				i = i.parent;
			}
			return e();
		});
	if ((Go(t, n, r), r)) {
		let i = r.parent;
		for (; i && i.parent; )
			us(i.parent.vnode) && n6(n, t, r, i), (i = i.parent);
	}
}
function n6(e, t, r, n) {
	const i = Go(t, e, n, !0);
	Wp(() => {
		qc(n[t], i);
	}, r);
}
function M0(e) {
	(e.shapeFlag &= -257), (e.shapeFlag &= -513);
}
function O0(e) {
	return e.shapeFlag & 128 ? e.ssContent : e;
}
function Go(e, t, r = et, n = !1) {
	if (r) {
		const i = r[e] || (r[e] = []),
			a =
				t.__weh ||
				(t.__weh = (...s) => {
					if (r.isUnmounted) return;
					Zi(), _n(r);
					const o = Gt(t, r, e, s);
					return hn(), Qi(), o;
				});
		return n ? i.unshift(a) : i.push(a), a;
	}
}
const zr =
		(e) =>
		(t, r = et) =>
			(!Pi || e === "sp") && Go(e, (...n) => t(...n), r),
	i6 = zr("bm"),
	au = zr("m"),
	a6 = zr("bu"),
	Yp = zr("u"),
	Yo = zr("bum"),
	Wp = zr("um"),
	s6 = zr("sp"),
	o6 = zr("rtg"),
	l6 = zr("rtc");
function Vp(e, t = et) {
	Go("ec", e, t);
}
function aP(e, t) {
	const r = pt;
	if (r === null) return e;
	const n = Ko(r) || r.proxy,
		i = e.dirs || (e.dirs = []);
	for (let a = 0; a < t.length; a++) {
		let [s, o, l, c = qe] = t[a];
		s &&
			(Se(s) && (s = { mounted: s, updated: s }),
			s.deep && Fn(o),
			i.push({
				dir: s,
				instance: n,
				value: o,
				oldValue: void 0,
				arg: l,
				modifiers: c,
			}));
	}
	return e;
}
function lr(e, t, r, n) {
	const i = e.dirs,
		a = t && t.dirs;
	for (let s = 0; s < i.length; s++) {
		const o = i[s];
		a && (o.oldValue = a[s].value);
		let l = o.dir[n];
		l && (Zi(), Gt(l, r, 8, [e.el, o, e, t]), Qi());
	}
}
const su = "components";
function sP(e, t) {
	return Xp(su, e, !0, t) || e;
}
const Kp = Symbol();
function oP(e) {
	return We(e) ? Xp(su, e, !1) || e : e || Kp;
}
function Xp(e, t, r = !0, n = !1) {
	const i = pt || et;
	if (i) {
		const a = i.type;
		if (e === su) {
			const o = Ll(a, !1);
			if (o && (o === t || o === hr(t) || o === Fo(hr(t)))) return a;
		}
		const s = qf(i[e] || a[e], t) || qf(i.appContext[e], t);
		return !s && n ? a : s;
	}
}
function qf(e, t) {
	return e && (e[t] || e[hr(t)] || e[Fo(hr(t))]);
}
function lP(e, t, r, n) {
	let i;
	const a = r && r[n];
	if (ge(e) || We(e)) {
		i = new Array(e.length);
		for (let s = 0, o = e.length; s < o; s++)
			i[s] = t(e[s], s, void 0, a && a[s]);
	} else if (typeof e == "number") {
		i = new Array(e);
		for (let s = 0; s < e; s++) i[s] = t(s + 1, s, void 0, a && a[s]);
	} else if (He(e))
		if (e[Symbol.iterator])
			i = Array.from(e, (s, o) => t(s, o, void 0, a && a[o]));
		else {
			const s = Object.keys(e);
			i = new Array(s.length);
			for (let o = 0, l = s.length; o < l; o++) {
				const c = s[o];
				i[o] = t(e[c], c, o, a && a[o]);
			}
		}
	else i = [];
	return r && (r[n] = i), i;
}
function cP(e, t, r = {}, n, i) {
	if (pt.isCE || (pt.parent && Gn(pt.parent) && pt.parent.isCE))
		return t !== "default" && (r.name = t), Ye("slot", r, n && n());
	let a = e[t];
	a && a._c && (a._d = !1), sn();
	const s = a && Jp(a(r)),
		o = Hn(
			Ot,
			{ key: r.key || (s && s.key) || `_${t}` },
			s || (n ? n() : []),
			s && e._ === 1 ? 64 : -2
		);
	return (
		!i && o.scopeId && (o.slotScopeIds = [o.scopeId + "-s"]),
		a && a._c && (a._d = !0),
		o
	);
}
function Jp(e) {
	return e.some((t) =>
		Bi(t) ? !(t.type === Tt || (t.type === Ot && !Jp(t.children))) : !0
	)
		? e
		: null;
}
const Nl = (e) => (e ? (fm(e) ? Ko(e) || e.proxy : Nl(e.parent)) : null),
	wa = mt(Object.create(null), {
		$: (e) => e,
		$el: (e) => e.vnode.el,
		$data: (e) => e.data,
		$props: (e) => e.props,
		$attrs: (e) => e.attrs,
		$slots: (e) => e.slots,
		$refs: (e) => e.refs,
		$parent: (e) => Nl(e.parent),
		$root: (e) => Nl(e.root),
		$emit: (e) => e.emit,
		$options: (e) => ou(e),
		$forceUpdate: (e) => e.f || (e.f = () => Uo(e.update)),
		$nextTick: (e) => e.n || (e.n = vn.bind(e.proxy)),
		$watch: (e) => J3.bind(e),
	}),
	N0 = (e, t) => e !== qe && !e.__isScriptSetup && Ie(e, t),
	c6 = {
		get({ _: e }, t) {
			const {
				ctx: r,
				setupState: n,
				data: i,
				props: a,
				accessCache: s,
				type: o,
				appContext: l,
			} = e;
			let c;
			if (t[0] !== "$") {
				const m = s[t];
				if (m !== void 0)
					switch (m) {
						case 1:
							return n[t];
						case 2:
							return i[t];
						case 4:
							return r[t];
						case 3:
							return a[t];
					}
				else {
					if (N0(n, t)) return (s[t] = 1), n[t];
					if (i !== qe && Ie(i, t)) return (s[t] = 2), i[t];
					if ((c = e.propsOptions[0]) && Ie(c, t)) return (s[t] = 3), a[t];
					if (r !== qe && Ie(r, t)) return (s[t] = 4), r[t];
					Cl && (s[t] = 0);
				}
			}
			const u = wa[t];
			let d, p;
			if (u) return t === "$attrs" && Nt(e, "get", t), u(e);
			if ((d = o.__cssModules) && (d = d[t])) return d;
			if (r !== qe && Ie(r, t)) return (s[t] = 4), r[t];
			if (((p = l.config.globalProperties), Ie(p, t))) return p[t];
		},
		set({ _: e }, t, r) {
			const { data: n, setupState: i, ctx: a } = e;
			return N0(i, t)
				? ((i[t] = r), !0)
				: n !== qe && Ie(n, t)
				? ((n[t] = r), !0)
				: Ie(e.props, t) || (t[0] === "$" && t.slice(1) in e)
				? !1
				: ((a[t] = r), !0);
		},
		has(
			{
				_: {
					data: e,
					setupState: t,
					accessCache: r,
					ctx: n,
					appContext: i,
					propsOptions: a,
				},
			},
			s
		) {
			let o;
			return (
				!!r[s] ||
				(e !== qe && Ie(e, s)) ||
				N0(t, s) ||
				((o = a[0]) && Ie(o, s)) ||
				Ie(n, s) ||
				Ie(wa, s) ||
				Ie(i.config.globalProperties, s)
			);
		},
		defineProperty(e, t, r) {
			return (
				r.get != null
					? (e._.accessCache[t] = 0)
					: Ie(r, "value") && this.set(e, t, r.value, null),
				Reflect.defineProperty(e, t, r)
			);
		},
	};
let Cl = !0;
function u6(e) {
	const t = ou(e),
		r = e.proxy,
		n = e.ctx;
	(Cl = !1), t.beforeCreate && Gf(t.beforeCreate, e, "bc");
	const {
		data: i,
		computed: a,
		methods: s,
		watch: o,
		provide: l,
		inject: c,
		created: u,
		beforeMount: d,
		mounted: p,
		beforeUpdate: m,
		updated: b,
		activated: E,
		deactivated: R,
		beforeDestroy: _,
		beforeUnmount: v,
		destroyed: T,
		unmounted: M,
		render: O,
		renderTracked: B,
		renderTriggered: z,
		errorCaptured: D,
		serverPrefetch: H,
		expose: Q,
		inheritAttrs: te,
		components: q,
		directives: oe,
		filters: W,
	} = t;
	if ((c && f6(c, n, null, e.appContext.config.unwrapInjectedRef), s))
		for (const K in s) {
			const ie = s[K];
			Se(ie) && (n[K] = ie.bind(r));
		}
	if (i) {
		const K = i.call(r, r);
		He(K) && (e.data = pr(K));
	}
	if (((Cl = !0), a))
		for (const K in a) {
			const ie = a[K],
				ye = Se(ie) ? ie.bind(r, r) : Se(ie.get) ? ie.get.bind(r, r) : Qt,
				Te = !Se(ie) && Se(ie.set) ? ie.set.bind(r) : Qt,
				Ne = Et({ get: ye, set: Te });
			Object.defineProperty(n, K, {
				enumerable: !0,
				configurable: !0,
				get: () => Ne.value,
				set: (Me) => (Ne.value = Me),
			});
		}
	if (o) for (const K in o) Zp(o[K], n, r, K);
	if (l) {
		const K = Se(l) ? l.call(r) : l;
		Reflect.ownKeys(K).forEach((ie) => {
			Ei(ie, K[ie]);
		});
	}
	u && Gf(u, e, "c");
	function I(K, ie) {
		ge(ie) ? ie.forEach((ye) => K(ye.bind(r))) : ie && K(ie.bind(r));
	}
	if (
		(I(i6, d),
		I(au, p),
		I(a6, m),
		I(Yp, b),
		I(jp, E),
		I(qp, R),
		I(Vp, D),
		I(l6, B),
		I(o6, z),
		I(Yo, v),
		I(Wp, M),
		I(s6, H),
		ge(Q))
	)
		if (Q.length) {
			const K = e.exposed || (e.exposed = {});
			Q.forEach((ie) => {
				Object.defineProperty(K, ie, {
					get: () => r[ie],
					set: (ye) => (r[ie] = ye),
				});
			});
		} else e.exposed || (e.exposed = {});
	O && e.render === Qt && (e.render = O),
		te != null && (e.inheritAttrs = te),
		q && (e.components = q),
		oe && (e.directives = oe);
}
function f6(e, t, r = Qt, n = !1) {
	ge(e) && (e = Il(e));
	for (const i in e) {
		const a = e[i];
		let s;
		He(a)
			? "default" in a
				? (s = Lt(a.from || i, a.default, !0))
				: (s = Lt(a.from || i))
			: (s = Lt(a)),
			st(s) && n
				? Object.defineProperty(t, i, {
						enumerable: !0,
						configurable: !0,
						get: () => s.value,
						set: (o) => (s.value = o),
				  })
				: (t[i] = s);
	}
}
function Gf(e, t, r) {
	Gt(ge(e) ? e.map((n) => n.bind(t.proxy)) : e.bind(t.proxy), t, r);
}
function Zp(e, t, r, n) {
	const i = n.includes(".") ? $p(r, n) : () => r[n];
	if (We(e)) {
		const a = t[e];
		Se(a) && xi(i, a);
	} else if (Se(e)) xi(i, e.bind(r));
	else if (He(e))
		if (ge(e)) e.forEach((a) => Zp(a, t, r, n));
		else {
			const a = Se(e.handler) ? e.handler.bind(r) : t[e.handler];
			Se(a) && xi(i, a, e);
		}
}
function ou(e) {
	const t = e.type,
		{ mixins: r, extends: n } = t,
		{
			mixins: i,
			optionsCache: a,
			config: { optionMergeStrategies: s },
		} = e.appContext,
		o = a.get(t);
	let l;
	return (
		o
			? (l = o)
			: !i.length && !r && !n
			? (l = t)
			: ((l = {}), i.length && i.forEach((c) => mo(l, c, s, !0)), mo(l, t, s)),
		He(t) && a.set(t, l),
		l
	);
}
function mo(e, t, r, n = !1) {
	const { mixins: i, extends: a } = t;
	a && mo(e, a, r, !0), i && i.forEach((s) => mo(e, s, r, !0));
	for (const s in t)
		if (!(n && s === "expose")) {
			const o = d6[s] || (r && r[s]);
			e[s] = o ? o(e[s], t[s]) : t[s];
		}
	return e;
}
const d6 = {
	data: Yf,
	props: Bn,
	emits: Bn,
	methods: Bn,
	computed: Bn,
	beforeCreate: wt,
	created: wt,
	beforeMount: wt,
	mounted: wt,
	beforeUpdate: wt,
	updated: wt,
	beforeDestroy: wt,
	beforeUnmount: wt,
	destroyed: wt,
	unmounted: wt,
	activated: wt,
	deactivated: wt,
	errorCaptured: wt,
	serverPrefetch: wt,
	components: Bn,
	directives: Bn,
	watch: p6,
	provide: Yf,
	inject: h6,
};
function Yf(e, t) {
	return t
		? e
			? function () {
					return mt(
						Se(e) ? e.call(this, this) : e,
						Se(t) ? t.call(this, this) : t
					);
			  }
			: t
		: e;
}
function h6(e, t) {
	return Bn(Il(e), Il(t));
}
function Il(e) {
	if (ge(e)) {
		const t = {};
		for (let r = 0; r < e.length; r++) t[e[r]] = e[r];
		return t;
	}
	return e;
}
function wt(e, t) {
	return e ? [...new Set([].concat(e, t))] : t;
}
function Bn(e, t) {
	return e ? mt(mt(Object.create(null), e), t) : t;
}
function p6(e, t) {
	if (!e) return t;
	if (!t) return e;
	const r = mt(Object.create(null), e);
	for (const n in t) r[n] = wt(e[n], t[n]);
	return r;
}
function m6(e, t, r, n = !1) {
	const i = {},
		a = {};
	so(a, Wo, 1), (e.propsDefaults = Object.create(null)), Qp(e, t, i, a);
	for (const s in e.propsOptions[0]) s in i || (i[s] = void 0);
	r ? (e.props = n ? i : O3(i)) : e.type.props ? (e.props = i) : (e.props = a),
		(e.attrs = a);
}
function g6(e, t, r, n) {
	const {
			props: i,
			attrs: a,
			vnode: { patchFlag: s },
		} = e,
		o = De(i),
		[l] = e.propsOptions;
	let c = !1;
	if ((n || s > 0) && !(s & 16)) {
		if (s & 8) {
			const u = e.vnode.dynamicProps;
			for (let d = 0; d < u.length; d++) {
				let p = u[d];
				if (jo(e.emitsOptions, p)) continue;
				const m = t[p];
				if (l)
					if (Ie(a, p)) m !== a[p] && ((a[p] = m), (c = !0));
					else {
						const b = hr(p);
						i[b] = Dl(l, o, b, m, e, !1);
					}
				else m !== a[p] && ((a[p] = m), (c = !0));
			}
		}
	} else {
		Qp(e, t, i, a) && (c = !0);
		let u;
		for (const d in o)
			(!t || (!Ie(t, d) && ((u = Qn(d)) === d || !Ie(t, u)))) &&
				(l
					? r &&
					  (r[d] !== void 0 || r[u] !== void 0) &&
					  (i[d] = Dl(l, o, d, void 0, e, !0))
					: delete i[d]);
		if (a !== o)
			for (const d in a) (!t || !Ie(t, d)) && (delete a[d], (c = !0));
	}
	c && Cr(e, "set", "$attrs");
}
function Qp(e, t, r, n) {
	const [i, a] = e.propsOptions;
	let s = !1,
		o;
	if (t)
		for (let l in t) {
			if (_a(l)) continue;
			const c = t[l];
			let u;
			i && Ie(i, (u = hr(l)))
				? !a || !a.includes(u)
					? (r[u] = c)
					: ((o || (o = {}))[u] = c)
				: jo(e.emitsOptions, l) ||
				  ((!(l in n) || c !== n[l]) && ((n[l] = c), (s = !0)));
		}
	if (a) {
		const l = De(r),
			c = o || qe;
		for (let u = 0; u < a.length; u++) {
			const d = a[u];
			r[d] = Dl(i, l, d, c[d], e, !Ie(c, d));
		}
	}
	return s;
}
function Dl(e, t, r, n, i, a) {
	const s = e[r];
	if (s != null) {
		const o = Ie(s, "default");
		if (o && n === void 0) {
			const l = s.default;
			if (s.type !== Function && Se(l)) {
				const { propsDefaults: c } = i;
				r in c ? (n = c[r]) : (_n(i), (n = c[r] = l.call(null, t)), hn());
			} else n = l;
		}
		s[0] &&
			(a && !o ? (n = !1) : s[1] && (n === "" || n === Qn(r)) && (n = !0));
	}
	return n;
}
function em(e, t, r = !1) {
	const n = t.propsCache,
		i = n.get(e);
	if (i) return i;
	const a = e.props,
		s = {},
		o = [];
	let l = !1;
	if (!Se(e)) {
		const u = (d) => {
			l = !0;
			const [p, m] = em(d, t, !0);
			mt(s, p), m && o.push(...m);
		};
		!r && t.mixins.length && t.mixins.forEach(u),
			e.extends && u(e.extends),
			e.mixins && e.mixins.forEach(u);
	}
	if (!a && !l) return He(e) && n.set(e, gi), gi;
	if (ge(a))
		for (let u = 0; u < a.length; u++) {
			const d = hr(a[u]);
			Wf(d) && (s[d] = qe);
		}
	else if (a)
		for (const u in a) {
			const d = hr(u);
			if (Wf(d)) {
				const p = a[u],
					m = (s[d] = ge(p) || Se(p) ? { type: p } : Object.assign({}, p));
				if (m) {
					const b = Xf(Boolean, m.type),
						E = Xf(String, m.type);
					(m[0] = b > -1),
						(m[1] = E < 0 || b < E),
						(b > -1 || Ie(m, "default")) && o.push(d);
				}
			}
		}
	const c = [s, o];
	return He(e) && n.set(e, c), c;
}
function Wf(e) {
	return e[0] !== "$";
}
function Vf(e) {
	const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
	return t ? t[2] : e === null ? "null" : "";
}
function Kf(e, t) {
	return Vf(e) === Vf(t);
}
function Xf(e, t) {
	return ge(t) ? t.findIndex((r) => Kf(r, e)) : Se(t) && Kf(t, e) ? 0 : -1;
}
const tm = (e) => e[0] === "_" || e === "$stable",
	lu = (e) => (ge(e) ? e.map(Ft) : [Ft(e)]),
	y6 = (e, t, r) => {
		if (t._n) return t;
		const n = ho((...i) => lu(t(...i)), r);
		return (n._c = !1), n;
	},
	rm = (e, t, r) => {
		const n = e._ctx;
		for (const i in e) {
			if (tm(i)) continue;
			const a = e[i];
			if (Se(a)) t[i] = y6(i, a, n);
			else if (a != null) {
				const s = lu(a);
				t[i] = () => s;
			}
		}
	},
	nm = (e, t) => {
		const r = lu(t);
		e.slots.default = () => r;
	},
	b6 = (e, t) => {
		if (e.vnode.shapeFlag & 32) {
			const r = t._;
			r ? ((e.slots = De(t)), so(t, "_", r)) : rm(t, (e.slots = {}));
		} else (e.slots = {}), t && nm(e, t);
		so(e.slots, Wo, 1);
	},
	v6 = (e, t, r) => {
		const { vnode: n, slots: i } = e;
		let a = !0,
			s = qe;
		if (n.shapeFlag & 32) {
			const o = t._;
			o
				? r && o === 1
					? (a = !1)
					: (mt(i, t), !r && o === 1 && delete i._)
				: ((a = !t.$stable), rm(t, i)),
				(s = t);
		} else t && (nm(e, t), (s = { default: 1 }));
		if (a) for (const o in i) !tm(o) && !(o in s) && delete i[o];
	};
function im() {
	return {
		app: null,
		config: {
			isNativeTag: Y5,
			performance: !1,
			globalProperties: {},
			optionMergeStrategies: {},
			errorHandler: void 0,
			warnHandler: void 0,
			compilerOptions: {},
		},
		mixins: [],
		components: {},
		directives: {},
		provides: Object.create(null),
		optionsCache: new WeakMap(),
		propsCache: new WeakMap(),
		emitsCache: new WeakMap(),
	};
}
let _6 = 0;
function w6(e, t) {
	return function (n, i = null) {
		Se(n) || (n = Object.assign({}, n)), i != null && !He(i) && (i = null);
		const a = im(),
			s = new Set();
		let o = !1;
		const l = (a.app = {
			_uid: _6++,
			_component: n,
			_props: i,
			_container: null,
			_context: a,
			_instance: null,
			version: fu,
			get config() {
				return a.config;
			},
			set config(c) {},
			use(c, ...u) {
				return (
					s.has(c) ||
						(c && Se(c.install)
							? (s.add(c), c.install(l, ...u))
							: Se(c) && (s.add(c), c(l, ...u))),
					l
				);
			},
			mixin(c) {
				return a.mixins.includes(c) || a.mixins.push(c), l;
			},
			component(c, u) {
				return u ? ((a.components[c] = u), l) : a.components[c];
			},
			directive(c, u) {
				return u ? ((a.directives[c] = u), l) : a.directives[c];
			},
			mount(c, u, d) {
				if (!o) {
					const p = Ye(n, i);
					return (
						(p.appContext = a),
						u && t ? t(p, c) : e(p, c, d),
						(o = !0),
						(l._container = c),
						(c.__vue_app__ = l),
						Ko(p.component) || p.component.proxy
					);
				}
			},
			unmount() {
				o && (e(null, l._container), delete l._container.__vue_app__);
			},
			provide(c, u) {
				return (a.provides[c] = u), l;
			},
		});
		return l;
	};
}
function go(e, t, r, n, i = !1) {
	if (ge(e)) {
		e.forEach((p, m) => go(p, t && (ge(t) ? t[m] : t), r, n, i));
		return;
	}
	if (Gn(n) && !i) return;
	const a = n.shapeFlag & 4 ? Ko(n.component) || n.component.proxy : n.el,
		s = i ? null : a,
		{ i: o, r: l } = e,
		c = t && t.r,
		u = o.refs === qe ? (o.refs = {}) : o.refs,
		d = o.setupState;
	if (
		(c != null &&
			c !== l &&
			(We(c)
				? ((u[c] = null), Ie(d, c) && (d[c] = null))
				: st(c) && (c.value = null)),
		Se(l))
	)
		dn(l, o, 12, [s, u]);
	else {
		const p = We(l),
			m = st(l);
		if (p || m) {
			const b = () => {
				if (e.f) {
					const E = p ? (Ie(d, l) ? d[l] : u[l]) : l.value;
					i
						? ge(E) && qc(E, a)
						: ge(E)
						? E.includes(a) || E.push(a)
						: p
						? ((u[l] = [a]), Ie(d, l) && (d[l] = u[l]))
						: ((l.value = [a]), e.k && (u[e.k] = l.value));
				} else
					p
						? ((u[l] = s), Ie(d, l) && (d[l] = s))
						: m && ((l.value = s), e.k && (u[e.k] = s));
			};
			s ? ((b.id = -1), dt(b, r)) : b();
		}
	}
}
let Gr = !1;
const Rs = (e) => /svg/.test(e.namespaceURI) && e.tagName !== "foreignObject",
	Ms = (e) => e.nodeType === 8;
function S6(e) {
	const {
			mt: t,
			p: r,
			o: {
				patchProp: n,
				createText: i,
				nextSibling: a,
				parentNode: s,
				remove: o,
				insert: l,
				createComment: c,
			},
		} = e,
		u = (_, v) => {
			if (!v.hasChildNodes()) {
				r(null, _, v), uo(), (v._vnode = _);
				return;
			}
			(Gr = !1),
				d(v.firstChild, _, null, null, null),
				uo(),
				(v._vnode = _),
				Gr && console.error("Hydration completed but contains mismatches.");
		},
		d = (_, v, T, M, O, B = !1) => {
			const z = Ms(_) && _.data === "[",
				D = () => E(_, v, T, M, O, z),
				{ type: H, ref: Q, shapeFlag: te, patchFlag: q } = v;
			let oe = _.nodeType;
			(v.el = _), q === -2 && ((B = !1), (v.dynamicChildren = null));
			let W = null;
			switch (H) {
				case Ii:
					oe !== 3
						? v.children === ""
							? (l((v.el = i("")), s(_), _), (W = _))
							: (W = D())
						: (_.data !== v.children && ((Gr = !0), (_.data = v.children)),
						  (W = a(_)));
					break;
				case Tt:
					oe !== 8 || z ? (W = D()) : (W = a(_));
					break;
				case Ea:
					if ((z && ((_ = a(_)), (oe = _.nodeType)), oe === 1 || oe === 3)) {
						W = _;
						const Ee = !v.children.length;
						for (let I = 0; I < v.staticCount; I++)
							Ee && (v.children += W.nodeType === 1 ? W.outerHTML : W.data),
								I === v.staticCount - 1 && (v.anchor = W),
								(W = a(W));
						return z ? a(W) : W;
					} else D();
					break;
				case Ot:
					z ? (W = b(_, v, T, M, O, B)) : (W = D());
					break;
				default:
					if (te & 1)
						oe !== 1 || v.type.toLowerCase() !== _.tagName.toLowerCase()
							? (W = D())
							: (W = p(_, v, T, M, O, B));
					else if (te & 6) {
						v.slotScopeIds = O;
						const Ee = s(_);
						if (
							(t(v, Ee, null, T, M, Rs(Ee), B),
							(W = z ? R(_) : a(_)),
							W && Ms(W) && W.data === "teleport end" && (W = a(W)),
							Gn(v))
						) {
							let I;
							z
								? ((I = Ye(Ot)),
								  (I.anchor = W ? W.previousSibling : Ee.lastChild))
								: (I = _.nodeType === 3 ? um("") : Ye("div")),
								(I.el = _),
								(v.component.subTree = I);
						}
					} else
						te & 64
							? oe !== 8
								? (W = D())
								: (W = v.type.hydrate(_, v, T, M, O, B, e, m))
							: te & 128 &&
							  (W = v.type.hydrate(_, v, T, M, Rs(s(_)), O, B, e, d));
			}
			return Q != null && go(Q, null, M, v), W;
		},
		p = (_, v, T, M, O, B) => {
			B = B || !!v.dynamicChildren;
			const { type: z, props: D, patchFlag: H, shapeFlag: Q, dirs: te } = v,
				q = (z === "input" && te) || z === "option";
			if (q || H !== -1) {
				if ((te && lr(v, null, T, "created"), D))
					if (q || !B || H & 48)
						for (const W in D)
							((q && W.endsWith("value")) || (cs(W) && !_a(W))) &&
								n(_, W, null, D[W], !1, void 0, T);
					else D.onClick && n(_, "onClick", null, D.onClick, !1, void 0, T);
				let oe;
				if (
					((oe = D && D.onVnodeBeforeMount) && Rt(oe, T, v),
					te && lr(v, null, T, "beforeMount"),
					((oe = D && D.onVnodeMounted) || te) &&
						zp(() => {
							oe && Rt(oe, T, v), te && lr(v, null, T, "mounted");
						}, M),
					Q & 16 && !(D && (D.innerHTML || D.textContent)))
				) {
					let W = m(_.firstChild, v, _, T, M, O, B);
					for (; W; ) {
						Gr = !0;
						const Ee = W;
						(W = W.nextSibling), o(Ee);
					}
				} else
					Q & 8 &&
						_.textContent !== v.children &&
						((Gr = !0), (_.textContent = v.children));
			}
			return _.nextSibling;
		},
		m = (_, v, T, M, O, B, z) => {
			z = z || !!v.dynamicChildren;
			const D = v.children,
				H = D.length;
			for (let Q = 0; Q < H; Q++) {
				const te = z ? D[Q] : (D[Q] = Ft(D[Q]));
				if (_) _ = d(_, te, M, O, B, z);
				else {
					if (te.type === Ii && !te.children) continue;
					(Gr = !0), r(null, te, T, null, M, O, Rs(T), B);
				}
			}
			return _;
		},
		b = (_, v, T, M, O, B) => {
			const { slotScopeIds: z } = v;
			z && (O = O ? O.concat(z) : z);
			const D = s(_),
				H = m(a(_), v, D, T, M, O, B);
			return H && Ms(H) && H.data === "]"
				? a((v.anchor = H))
				: ((Gr = !0), l((v.anchor = c("]")), D, H), H);
		},
		E = (_, v, T, M, O, B) => {
			if (((Gr = !0), (v.el = null), B)) {
				const H = R(_);
				for (;;) {
					const Q = a(_);
					if (Q && Q !== H) o(Q);
					else break;
				}
			}
			const z = a(_),
				D = s(_);
			return o(_), r(null, v, D, z, T, M, Rs(D), O), z;
		},
		R = (_) => {
			let v = 0;
			for (; _; )
				if (
					((_ = a(_)), _ && Ms(_) && (_.data === "[" && v++, _.data === "]"))
				) {
					if (v === 0) return a(_);
					v--;
				}
			return _;
		};
	return [u, d];
}
const dt = zp;
function E6(e) {
	return am(e);
}
function x6(e) {
	return am(e, S6);
}
function am(e, t) {
	const r = Q5();
	r.__VUE__ = !0;
	const {
			insert: n,
			remove: i,
			patchProp: a,
			createElement: s,
			createText: o,
			createComment: l,
			setText: c,
			setElementText: u,
			parentNode: d,
			nextSibling: p,
			setScopeId: m = Qt,
			insertStaticContent: b,
		} = e,
		E = (
			w,
			k,
			C,
			$ = null,
			U = null,
			P = null,
			ae = !1,
			j = null,
			G = !!k.dynamicChildren
		) => {
			if (w === k) return;
			w && !Zt(w, k) && (($ = ne(w)), Me(w, U, P, !0), (w = null)),
				k.patchFlag === -2 && ((G = !1), (k.dynamicChildren = null));
			const { type: V, ref: he, shapeFlag: fe } = k;
			switch (V) {
				case Ii:
					R(w, k, C, $);
					break;
				case Tt:
					_(w, k, C, $);
					break;
				case Ea:
					w == null && v(k, C, $, ae);
					break;
				case Ot:
					q(w, k, C, $, U, P, ae, j, G);
					break;
				default:
					fe & 1
						? O(w, k, C, $, U, P, ae, j, G)
						: fe & 6
						? oe(w, k, C, $, U, P, ae, j, G)
						: (fe & 64 || fe & 128) &&
						  V.process(w, k, C, $, U, P, ae, j, G, Ae);
			}
			he != null && U && go(he, w && w.ref, P, k || w, !k);
		},
		R = (w, k, C, $) => {
			if (w == null) n((k.el = o(k.children)), C, $);
			else {
				const U = (k.el = w.el);
				k.children !== w.children && c(U, k.children);
			}
		},
		_ = (w, k, C, $) => {
			w == null ? n((k.el = l(k.children || "")), C, $) : (k.el = w.el);
		},
		v = (w, k, C, $) => {
			[w.el, w.anchor] = b(w.children, k, C, $, w.el, w.anchor);
		},
		T = ({ el: w, anchor: k }, C, $) => {
			let U;
			for (; w && w !== k; ) (U = p(w)), n(w, C, $), (w = U);
			n(k, C, $);
		},
		M = ({ el: w, anchor: k }) => {
			let C;
			for (; w && w !== k; ) (C = p(w)), i(w), (w = C);
			i(k);
		},
		O = (w, k, C, $, U, P, ae, j, G) => {
			(ae = ae || k.type === "svg"),
				w == null ? B(k, C, $, U, P, ae, j, G) : H(w, k, U, P, ae, j, G);
		},
		B = (w, k, C, $, U, P, ae, j) => {
			let G, V;
			const { type: he, props: fe, shapeFlag: me, transition: F, dirs: J } = w;
			if (
				((G = w.el = s(w.type, P, fe && fe.is, fe)),
				me & 8
					? u(G, w.children)
					: me & 16 &&
					  D(w.children, G, null, $, U, P && he !== "foreignObject", ae, j),
				J && lr(w, null, $, "created"),
				z(G, w, w.scopeId, ae, $),
				fe)
			) {
				for (const pe in fe)
					pe !== "value" &&
						!_a(pe) &&
						a(G, pe, null, fe[pe], P, w.children, $, U, se);
				"value" in fe && a(G, "value", null, fe.value),
					(V = fe.onVnodeBeforeMount) && Rt(V, $, w);
			}
			J && lr(w, null, $, "beforeMount");
			const ue = (!U || (U && !U.pendingBranch)) && F && !F.persisted;
			ue && F.beforeEnter(G),
				n(G, k, C),
				((V = fe && fe.onVnodeMounted) || ue || J) &&
					dt(() => {
						V && Rt(V, $, w), ue && F.enter(G), J && lr(w, null, $, "mounted");
					}, U);
		},
		z = (w, k, C, $, U) => {
			if ((C && m(w, C), $)) for (let P = 0; P < $.length; P++) m(w, $[P]);
			if (U) {
				let P = U.subTree;
				if (k === P) {
					const ae = U.vnode;
					z(w, ae, ae.scopeId, ae.slotScopeIds, U.parent);
				}
			}
		},
		D = (w, k, C, $, U, P, ae, j, G = 0) => {
			for (let V = G; V < w.length; V++) {
				const he = (w[V] = j ? Jr(w[V]) : Ft(w[V]));
				E(null, he, k, C, $, U, P, ae, j);
			}
		},
		H = (w, k, C, $, U, P, ae) => {
			const j = (k.el = w.el);
			let { patchFlag: G, dynamicChildren: V, dirs: he } = k;
			G |= w.patchFlag & 16;
			const fe = w.props || qe,
				me = k.props || qe;
			let F;
			C && On(C, !1),
				(F = me.onVnodeBeforeUpdate) && Rt(F, C, k, w),
				he && lr(k, w, C, "beforeUpdate"),
				C && On(C, !0);
			const J = U && k.type !== "foreignObject";
			if (
				(V
					? Q(w.dynamicChildren, V, j, C, $, J, P)
					: ae || ie(w, k, j, null, C, $, J, P, !1),
				G > 0)
			) {
				if (G & 16) te(j, k, fe, me, C, $, U);
				else if (
					(G & 2 && fe.class !== me.class && a(j, "class", null, me.class, U),
					G & 4 && a(j, "style", fe.style, me.style, U),
					G & 8)
				) {
					const ue = k.dynamicProps;
					for (let pe = 0; pe < ue.length; pe++) {
						const Oe = ue[pe],
							rt = fe[Oe],
							jr = me[Oe];
						(jr !== rt || Oe === "value") &&
							a(j, Oe, rt, jr, U, w.children, C, $, se);
					}
				}
				G & 1 && w.children !== k.children && u(j, k.children);
			} else !ae && V == null && te(j, k, fe, me, C, $, U);
			((F = me.onVnodeUpdated) || he) &&
				dt(() => {
					F && Rt(F, C, k, w), he && lr(k, w, C, "updated");
				}, $);
		},
		Q = (w, k, C, $, U, P, ae) => {
			for (let j = 0; j < k.length; j++) {
				const G = w[j],
					V = k[j],
					he =
						G.el && (G.type === Ot || !Zt(G, V) || G.shapeFlag & 70)
							? d(G.el)
							: C;
				E(G, V, he, null, $, U, P, ae, !0);
			}
		},
		te = (w, k, C, $, U, P, ae) => {
			if (C !== $) {
				if (C !== qe)
					for (const j in C)
						!_a(j) &&
							!(j in $) &&
							a(w, j, C[j], null, ae, k.children, U, P, se);
				for (const j in $) {
					if (_a(j)) continue;
					const G = $[j],
						V = C[j];
					G !== V && j !== "value" && a(w, j, V, G, ae, k.children, U, P, se);
				}
				"value" in $ && a(w, "value", C.value, $.value);
			}
		},
		q = (w, k, C, $, U, P, ae, j, G) => {
			const V = (k.el = w ? w.el : o("")),
				he = (k.anchor = w ? w.anchor : o(""));
			let { patchFlag: fe, dynamicChildren: me, slotScopeIds: F } = k;
			F && (j = j ? j.concat(F) : F),
				w == null
					? (n(V, C, $), n(he, C, $), D(k.children, C, he, U, P, ae, j, G))
					: fe > 0 && fe & 64 && me && w.dynamicChildren
					? (Q(w.dynamicChildren, me, C, U, P, ae, j),
					  (k.key != null || (U && k === U.subTree)) && cu(w, k, !0))
					: ie(w, k, C, he, U, P, ae, j, G);
		},
		oe = (w, k, C, $, U, P, ae, j, G) => {
			(k.slotScopeIds = j),
				w == null
					? k.shapeFlag & 512
						? U.ctx.activate(k, C, $, ae, G)
						: W(k, C, $, U, P, ae, G)
					: Ee(w, k, G);
		},
		W = (w, k, C, $, U, P, ae) => {
			const j = (w.component = D6(w, $, U));
			if ((us(w) && (j.ctx.renderer = Ae), B6(j), j.asyncDep)) {
				if ((U && U.registerDep(j, I), !w.el)) {
					const G = (j.subTree = Ye(Tt));
					_(null, G, k, C);
				}
				return;
			}
			I(j, w, k, C, U, P, ae);
		},
		Ee = (w, k, C) => {
			const $ = (k.component = w.component);
			if (q3(w, k, C))
				if ($.asyncDep && !$.asyncResolved) {
					K($, k, C);
					return;
				} else ($.next = k), z3($.update), $.update();
			else (k.el = w.el), ($.vnode = k);
		},
		I = (w, k, C, $, U, P, ae) => {
			const j = () => {
					if (w.isMounted) {
						let { next: he, bu: fe, u: me, parent: F, vnode: J } = w,
							ue = he,
							pe;
						On(w, !1),
							he ? ((he.el = J.el), K(w, he, ae)) : (he = J),
							fe && bi(fe),
							(pe = he.props && he.props.onVnodeBeforeUpdate) &&
								Rt(pe, F, he, J),
							On(w, !0);
						const Oe = k0(w),
							rt = w.subTree;
						(w.subTree = Oe),
							E(rt, Oe, d(rt.el), ne(rt), w, U, P),
							(he.el = Oe.el),
							ue === null && ru(w, Oe.el),
							me && dt(me, U),
							(pe = he.props && he.props.onVnodeUpdated) &&
								dt(() => Rt(pe, F, he, J), U);
					} else {
						let he;
						const { el: fe, props: me } = k,
							{ bm: F, m: J, parent: ue } = w,
							pe = Gn(k);
						if (
							(On(w, !1),
							F && bi(F),
							!pe && (he = me && me.onVnodeBeforeMount) && Rt(he, ue, k),
							On(w, !0),
							fe && xe)
						) {
							const Oe = () => {
								(w.subTree = k0(w)), xe(fe, w.subTree, w, U, null);
							};
							pe
								? k.type.__asyncLoader().then(() => !w.isUnmounted && Oe())
								: Oe();
						} else {
							const Oe = (w.subTree = k0(w));
							E(null, Oe, C, $, w, U, P), (k.el = Oe.el);
						}
						if ((J && dt(J, U), !pe && (he = me && me.onVnodeMounted))) {
							const Oe = k;
							dt(() => Rt(he, ue, Oe), U);
						}
						(k.shapeFlag & 256 ||
							(ue && Gn(ue.vnode) && ue.vnode.shapeFlag & 256)) &&
							w.a &&
							dt(w.a, U),
							(w.isMounted = !0),
							(k = C = $ = null);
					}
				},
				G = (w.effect = new Vc(j, () => Uo(V), w.scope)),
				V = (w.update = () => G.run());
			(V.id = w.uid), On(w, !0), V();
		},
		K = (w, k, C) => {
			k.component = w;
			const $ = w.vnode.props;
			(w.vnode = k),
				(w.next = null),
				g6(w, k.props, $, C),
				v6(w, k.children, C),
				Zi(),
				Ff(),
				Qi();
		},
		ie = (w, k, C, $, U, P, ae, j, G = !1) => {
			const V = w && w.children,
				he = w ? w.shapeFlag : 0,
				fe = k.children,
				{ patchFlag: me, shapeFlag: F } = k;
			if (me > 0) {
				if (me & 128) {
					Te(V, fe, C, $, U, P, ae, j, G);
					return;
				} else if (me & 256) {
					ye(V, fe, C, $, U, P, ae, j, G);
					return;
				}
			}
			F & 8
				? (he & 16 && se(V, U, P), fe !== V && u(C, fe))
				: he & 16
				? F & 16
					? Te(V, fe, C, $, U, P, ae, j, G)
					: se(V, U, P, !0)
				: (he & 8 && u(C, ""), F & 16 && D(fe, C, $, U, P, ae, j, G));
		},
		ye = (w, k, C, $, U, P, ae, j, G) => {
			(w = w || gi), (k = k || gi);
			const V = w.length,
				he = k.length,
				fe = Math.min(V, he);
			let me;
			for (me = 0; me < fe; me++) {
				const F = (k[me] = G ? Jr(k[me]) : Ft(k[me]));
				E(w[me], F, C, null, U, P, ae, j, G);
			}
			V > he ? se(w, U, P, !0, !1, fe) : D(k, C, $, U, P, ae, j, G, fe);
		},
		Te = (w, k, C, $, U, P, ae, j, G) => {
			let V = 0;
			const he = k.length;
			let fe = w.length - 1,
				me = he - 1;
			for (; V <= fe && V <= me; ) {
				const F = w[V],
					J = (k[V] = G ? Jr(k[V]) : Ft(k[V]));
				if (Zt(F, J)) E(F, J, C, null, U, P, ae, j, G);
				else break;
				V++;
			}
			for (; V <= fe && V <= me; ) {
				const F = w[fe],
					J = (k[me] = G ? Jr(k[me]) : Ft(k[me]));
				if (Zt(F, J)) E(F, J, C, null, U, P, ae, j, G);
				else break;
				fe--, me--;
			}
			if (V > fe) {
				if (V <= me) {
					const F = me + 1,
						J = F < he ? k[F].el : $;
					for (; V <= me; )
						E(null, (k[V] = G ? Jr(k[V]) : Ft(k[V])), C, J, U, P, ae, j, G),
							V++;
				}
			} else if (V > me) for (; V <= fe; ) Me(w[V], U, P, !0), V++;
			else {
				const F = V,
					J = V,
					ue = new Map();
				for (V = J; V <= me; V++) {
					const Dt = (k[V] = G ? Jr(k[V]) : Ft(k[V]));
					Dt.key != null && ue.set(Dt.key, V);
				}
				let pe,
					Oe = 0;
				const rt = me - J + 1;
				let jr = !1,
					ws = 0;
				const la = new Array(rt);
				for (V = 0; V < rt; V++) la[V] = 0;
				for (V = F; V <= fe; V++) {
					const Dt = w[V];
					if (Oe >= rt) {
						Me(Dt, U, P, !0);
						continue;
					}
					let ir;
					if (Dt.key != null) ir = ue.get(Dt.key);
					else
						for (pe = J; pe <= me; pe++)
							if (la[pe - J] === 0 && Zt(Dt, k[pe])) {
								ir = pe;
								break;
							}
					ir === void 0
						? Me(Dt, U, P, !0)
						: ((la[ir - J] = V + 1),
						  ir >= ws ? (ws = ir) : (jr = !0),
						  E(Dt, k[ir], C, null, U, P, ae, j, G),
						  Oe++);
				}
				const Mf = jr ? T6(la) : gi;
				for (pe = Mf.length - 1, V = rt - 1; V >= 0; V--) {
					const Dt = J + V,
						ir = k[Dt],
						Of = Dt + 1 < he ? k[Dt + 1].el : $;
					la[V] === 0
						? E(null, ir, C, Of, U, P, ae, j, G)
						: jr && (pe < 0 || V !== Mf[pe] ? Ne(ir, C, Of, 2) : pe--);
				}
			}
		},
		Ne = (w, k, C, $, U = null) => {
			const { el: P, type: ae, transition: j, children: G, shapeFlag: V } = w;
			if (V & 6) {
				Ne(w.component.subTree, k, C, $);
				return;
			}
			if (V & 128) {
				w.suspense.move(k, C, $);
				return;
			}
			if (V & 64) {
				ae.move(w, k, C, Ae);
				return;
			}
			if (ae === Ot) {
				n(P, k, C);
				for (let fe = 0; fe < G.length; fe++) Ne(G[fe], k, C, $);
				n(w.anchor, k, C);
				return;
			}
			if (ae === Ea) {
				T(w, k, C);
				return;
			}
			if ($ !== 2 && V & 1 && j)
				if ($ === 0) j.beforeEnter(P), n(P, k, C), dt(() => j.enter(P), U);
				else {
					const { leave: fe, delayLeave: me, afterLeave: F } = j,
						J = () => n(P, k, C),
						ue = () => {
							fe(P, () => {
								J(), F && F();
							});
						};
					me ? me(P, J, ue) : ue();
				}
			else n(P, k, C);
		},
		Me = (w, k, C, $ = !1, U = !1) => {
			const {
				type: P,
				props: ae,
				ref: j,
				children: G,
				dynamicChildren: V,
				shapeFlag: he,
				patchFlag: fe,
				dirs: me,
			} = w;
			if ((j != null && go(j, null, C, w, !0), he & 256)) {
				k.ctx.deactivate(w);
				return;
			}
			const F = he & 1 && me,
				J = !Gn(w);
			let ue;
			if ((J && (ue = ae && ae.onVnodeBeforeUnmount) && Rt(ue, k, w), he & 6))
				L(w.component, C, $);
			else {
				if (he & 128) {
					w.suspense.unmount(C, $);
					return;
				}
				F && lr(w, null, k, "beforeUnmount"),
					he & 64
						? w.type.remove(w, k, C, U, Ae, $)
						: V && (P !== Ot || (fe > 0 && fe & 64))
						? se(V, k, C, !1, !0)
						: ((P === Ot && fe & 384) || (!U && he & 16)) && se(G, k, C),
					$ && ut(w);
			}
			((J && (ue = ae && ae.onVnodeUnmounted)) || F) &&
				dt(() => {
					ue && Rt(ue, k, w), F && lr(w, null, k, "unmounted");
				}, C);
		},
		ut = (w) => {
			const { type: k, el: C, anchor: $, transition: U } = w;
			if (k === Ot) {
				Je(C, $);
				return;
			}
			if (k === Ea) {
				M(w);
				return;
			}
			const P = () => {
				i(C), U && !U.persisted && U.afterLeave && U.afterLeave();
			};
			if (w.shapeFlag & 1 && U && !U.persisted) {
				const { leave: ae, delayLeave: j } = U,
					G = () => ae(C, P);
				j ? j(w.el, P, G) : G();
			} else P();
		},
		Je = (w, k) => {
			let C;
			for (; w !== k; ) (C = p(w)), i(w), (w = C);
			i(k);
		},
		L = (w, k, C) => {
			const { bum: $, scope: U, update: P, subTree: ae, um: j } = w;
			$ && bi($),
				U.stop(),
				P && ((P.active = !1), Me(ae, w, k, C)),
				j && dt(j, k),
				dt(() => {
					w.isUnmounted = !0;
				}, k),
				k &&
					k.pendingBranch &&
					!k.isUnmounted &&
					w.asyncDep &&
					!w.asyncResolved &&
					w.suspenseId === k.pendingId &&
					(k.deps--, k.deps === 0 && k.resolve());
		},
		se = (w, k, C, $ = !1, U = !1, P = 0) => {
			for (let ae = P; ae < w.length; ae++) Me(w[ae], k, C, $, U);
		},
		ne = (w) =>
			w.shapeFlag & 6
				? ne(w.component.subTree)
				: w.shapeFlag & 128
				? w.suspense.next()
				: p(w.anchor || w.el),
		de = (w, k, C) => {
			w == null
				? k._vnode && Me(k._vnode, null, null, !0)
				: E(k._vnode || null, w, k, null, null, null, C),
				Ff(),
				uo(),
				(k._vnode = w);
		},
		Ae = {
			p: E,
			um: Me,
			m: Ne,
			r: ut,
			mt: W,
			mc: D,
			pc: ie,
			pbc: Q,
			n: ne,
			o: e,
		};
	let Le, xe;
	return (
		t && ([Le, xe] = t(Ae)), { render: de, hydrate: Le, createApp: w6(de, Le) }
	);
}
function On({ effect: e, update: t }, r) {
	e.allowRecurse = t.allowRecurse = r;
}
function cu(e, t, r = !1) {
	const n = e.children,
		i = t.children;
	if (ge(n) && ge(i))
		for (let a = 0; a < n.length; a++) {
			const s = n[a];
			let o = i[a];
			o.shapeFlag & 1 &&
				!o.dynamicChildren &&
				((o.patchFlag <= 0 || o.patchFlag === 32) &&
					((o = i[a] = Jr(i[a])), (o.el = s.el)),
				r || cu(s, o)),
				o.type === Ii && (o.el = s.el);
		}
}
function T6(e) {
	const t = e.slice(),
		r = [0];
	let n, i, a, s, o;
	const l = e.length;
	for (n = 0; n < l; n++) {
		const c = e[n];
		if (c !== 0) {
			if (((i = r[r.length - 1]), e[i] < c)) {
				(t[n] = i), r.push(n);
				continue;
			}
			for (a = 0, s = r.length - 1; a < s; )
				(o = (a + s) >> 1), e[r[o]] < c ? (a = o + 1) : (s = o);
			c < e[r[a]] && (a > 0 && (t[n] = r[a - 1]), (r[a] = n));
		}
	}
	for (a = r.length, s = r[a - 1]; a-- > 0; ) (r[a] = s), (s = t[s]);
	return r;
}
const k6 = (e) => e.__isTeleport,
	Sa = (e) => e && (e.disabled || e.disabled === ""),
	Jf = (e) => typeof SVGElement < "u" && e instanceof SVGElement,
	Bl = (e, t) => {
		const r = e && e.to;
		return We(r) ? (t ? t(r) : null) : r;
	},
	A6 = {
		__isTeleport: !0,
		process(e, t, r, n, i, a, s, o, l, c) {
			const {
					mc: u,
					pc: d,
					pbc: p,
					o: { insert: m, querySelector: b, createText: E, createComment: R },
				} = c,
				_ = Sa(t.props);
			let { shapeFlag: v, children: T, dynamicChildren: M } = t;
			if (e == null) {
				const O = (t.el = E("")),
					B = (t.anchor = E(""));
				m(O, r, n), m(B, r, n);
				const z = (t.target = Bl(t.props, b)),
					D = (t.targetAnchor = E(""));
				z && (m(D, z), (s = s || Jf(z)));
				const H = (Q, te) => {
					v & 16 && u(T, Q, te, i, a, s, o, l);
				};
				_ ? H(r, B) : z && H(z, D);
			} else {
				t.el = e.el;
				const O = (t.anchor = e.anchor),
					B = (t.target = e.target),
					z = (t.targetAnchor = e.targetAnchor),
					D = Sa(e.props),
					H = D ? r : B,
					Q = D ? O : z;
				if (
					((s = s || Jf(B)),
					M
						? (p(e.dynamicChildren, M, H, i, a, s, o), cu(e, t, !0))
						: l || d(e, t, H, Q, i, a, s, o, !1),
					_)
				)
					D || Os(t, r, O, c, 1);
				else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
					const te = (t.target = Bl(t.props, b));
					te && Os(t, te, null, c, 0);
				} else D && Os(t, B, z, c, 1);
			}
			sm(t);
		},
		remove(e, t, r, n, { um: i, o: { remove: a } }, s) {
			const {
				shapeFlag: o,
				children: l,
				anchor: c,
				targetAnchor: u,
				target: d,
				props: p,
			} = e;
			if ((d && a(u), (s || !Sa(p)) && (a(c), o & 16)))
				for (let m = 0; m < l.length; m++) {
					const b = l[m];
					i(b, t, r, !0, !!b.dynamicChildren);
				}
		},
		move: Os,
		hydrate: R6,
	};
function Os(e, t, r, { o: { insert: n }, m: i }, a = 2) {
	a === 0 && n(e.targetAnchor, t, r);
	const { el: s, anchor: o, shapeFlag: l, children: c, props: u } = e,
		d = a === 2;
	if ((d && n(s, t, r), (!d || Sa(u)) && l & 16))
		for (let p = 0; p < c.length; p++) i(c[p], t, r, 2);
	d && n(o, t, r);
}
function R6(
	e,
	t,
	r,
	n,
	i,
	a,
	{ o: { nextSibling: s, parentNode: o, querySelector: l } },
	c
) {
	const u = (t.target = Bl(t.props, l));
	if (u) {
		const d = u._lpa || u.firstChild;
		if (t.shapeFlag & 16)
			if (Sa(t.props))
				(t.anchor = c(s(e), t, o(e), r, n, i, a)), (t.targetAnchor = d);
			else {
				t.anchor = s(e);
				let p = d;
				for (; p; )
					if (
						((p = s(p)), p && p.nodeType === 8 && p.data === "teleport anchor")
					) {
						(t.targetAnchor = p),
							(u._lpa = t.targetAnchor && s(t.targetAnchor));
						break;
					}
				c(d, t, u, r, n, i, a);
			}
		sm(t);
	}
	return t.anchor && s(t.anchor);
}
const uP = A6;
function sm(e) {
	const t = e.ctx;
	if (t && t.ut) {
		let r = e.children[0].el;
		for (; r !== e.targetAnchor; )
			r.nodeType === 1 && r.setAttribute("data-v-owner", t.uid),
				(r = r.nextSibling);
		t.ut();
	}
}
const Ot = Symbol(void 0),
	Ii = Symbol(void 0),
	Tt = Symbol(void 0),
	Ea = Symbol(void 0),
	xa = [];
let Ut = null;
function sn(e = !1) {
	xa.push((Ut = e ? null : []));
}
function om() {
	xa.pop(), (Ut = xa[xa.length - 1] || null);
}
let Di = 1;
function Zf(e) {
	Di += e;
}
function lm(e) {
	return (
		(e.dynamicChildren = Di > 0 ? Ut || gi : null),
		om(),
		Di > 0 && Ut && Ut.push(e),
		e
	);
}
function fP(e, t, r, n, i, a) {
	return lm(Vo(e, t, r, n, i, a, !0));
}
function Hn(e, t, r, n, i) {
	return lm(Ye(e, t, r, n, i, !0));
}
function Bi(e) {
	return e ? e.__v_isVNode === !0 : !1;
}
function Zt(e, t) {
	return e.type === t.type && e.key === t.key;
}
const Wo = "__vInternal",
	cm = ({ key: e }) => e ?? null,
	eo = ({ ref: e, ref_key: t, ref_for: r }) =>
		e != null
			? We(e) || st(e) || Se(e)
				? { i: pt, r: e, k: t, f: !!r }
				: e
			: null;
function Vo(
	e,
	t = null,
	r = null,
	n = 0,
	i = null,
	a = e === Ot ? 0 : 1,
	s = !1,
	o = !1
) {
	const l = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e,
		props: t,
		key: t && cm(t),
		ref: t && eo(t),
		scopeId: qo,
		slotScopeIds: null,
		children: r,
		component: null,
		suspense: null,
		ssContent: null,
		ssFallback: null,
		dirs: null,
		transition: null,
		el: null,
		anchor: null,
		target: null,
		targetAnchor: null,
		staticCount: 0,
		shapeFlag: a,
		patchFlag: n,
		dynamicProps: i,
		dynamicChildren: null,
		appContext: null,
		ctx: pt,
	};
	return (
		o
			? (uu(l, r), a & 128 && e.normalize(l))
			: r && (l.shapeFlag |= We(r) ? 8 : 16),
		Di > 0 &&
			!s &&
			Ut &&
			(l.patchFlag > 0 || a & 6) &&
			l.patchFlag !== 32 &&
			Ut.push(l),
		l
	);
}
const Ye = M6;
function M6(e, t = null, r = null, n = 0, i = null, a = !1) {
	if (((!e || e === Kp) && (e = Tt), Bi(e))) {
		const o = Ir(e, t, !0);
		return (
			r && uu(o, r),
			Di > 0 &&
				!a &&
				Ut &&
				(o.shapeFlag & 6 ? (Ut[Ut.indexOf(e)] = o) : Ut.push(o)),
			(o.patchFlag |= -2),
			o
		);
	}
	if ((z6(e) && (e = e.__vccOpts), t)) {
		t = O6(t);
		let { class: o, style: l } = t;
		o && !We(o) && (t.class = zo(o)),
			He(l) && (xp(l) && !ge(l) && (l = mt({}, l)), (t.style = Lo(l)));
	}
	const s = We(e) ? 1 : Pp(e) ? 128 : k6(e) ? 64 : He(e) ? 4 : Se(e) ? 2 : 0;
	return Vo(e, t, r, n, i, s, a, !0);
}
function O6(e) {
	return e ? (xp(e) || Wo in e ? mt({}, e) : e) : null;
}
function Ir(e, t, r = !1) {
	const { props: n, ref: i, patchFlag: a, children: s } = e,
		o = t ? N6(n || {}, t) : n;
	return {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e.type,
		props: o,
		key: o && cm(o),
		ref:
			t && t.ref
				? r && i
					? ge(i)
						? i.concat(eo(t))
						: [i, eo(t)]
					: eo(t)
				: i,
		scopeId: e.scopeId,
		slotScopeIds: e.slotScopeIds,
		children: s,
		target: e.target,
		targetAnchor: e.targetAnchor,
		staticCount: e.staticCount,
		shapeFlag: e.shapeFlag,
		patchFlag: t && e.type !== Ot ? (a === -1 ? 16 : a | 16) : a,
		dynamicProps: e.dynamicProps,
		dynamicChildren: e.dynamicChildren,
		appContext: e.appContext,
		dirs: e.dirs,
		transition: e.transition,
		component: e.component,
		suspense: e.suspense,
		ssContent: e.ssContent && Ir(e.ssContent),
		ssFallback: e.ssFallback && Ir(e.ssFallback),
		el: e.el,
		anchor: e.anchor,
		ctx: e.ctx,
		ce: e.ce,
	};
}
function um(e = " ", t = 0) {
	return Ye(Ii, null, e, t);
}
function dP(e, t) {
	const r = Ye(Ea, null, e);
	return (r.staticCount = t), r;
}
function hP(e = "", t = !1) {
	return t ? (sn(), Hn(Tt, null, e)) : Ye(Tt, null, e);
}
function Ft(e) {
	return e == null || typeof e == "boolean"
		? Ye(Tt)
		: ge(e)
		? Ye(Ot, null, e.slice())
		: typeof e == "object"
		? Jr(e)
		: Ye(Ii, null, String(e));
}
function Jr(e) {
	return (e.el === null && e.patchFlag !== -1) || e.memo ? e : Ir(e);
}
function uu(e, t) {
	let r = 0;
	const { shapeFlag: n } = e;
	if (t == null) t = null;
	else if (ge(t)) r = 16;
	else if (typeof t == "object")
		if (n & 65) {
			const i = t.default;
			i && (i._c && (i._d = !1), uu(e, i()), i._c && (i._d = !0));
			return;
		} else {
			r = 32;
			const i = t._;
			!i && !(Wo in t)
				? (t._ctx = pt)
				: i === 3 &&
				  pt &&
				  (pt.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
		}
	else
		Se(t)
			? ((t = { default: t, _ctx: pt }), (r = 32))
			: ((t = String(t)), n & 64 ? ((r = 16), (t = [um(t)])) : (r = 8));
	(e.children = t), (e.shapeFlag |= r);
}
function N6(...e) {
	const t = {};
	for (let r = 0; r < e.length; r++) {
		const n = e[r];
		for (const i in n)
			if (i === "class")
				t.class !== n.class && (t.class = zo([t.class, n.class]));
			else if (i === "style") t.style = Lo([t.style, n.style]);
			else if (cs(i)) {
				const a = t[i],
					s = n[i];
				s &&
					a !== s &&
					!(ge(a) && a.includes(s)) &&
					(t[i] = a ? [].concat(a, s) : s);
			} else i !== "" && (t[i] = n[i]);
	}
	return t;
}
function Rt(e, t, r, n = null) {
	Gt(e, t, 7, [r, n]);
}
const C6 = im();
let I6 = 0;
function D6(e, t, r) {
	const n = e.type,
		i = (t ? t.appContext : e.appContext) || C6,
		a = {
			uid: I6++,
			vnode: e,
			type: n,
			parent: t,
			appContext: i,
			root: null,
			next: null,
			subTree: null,
			effect: null,
			update: null,
			scope: new e3(!0),
			render: null,
			proxy: null,
			exposed: null,
			exposeProxy: null,
			withProxy: null,
			provides: t ? t.provides : Object.create(i.provides),
			accessCache: null,
			renderCache: [],
			components: null,
			directives: null,
			propsOptions: em(n, i),
			emitsOptions: Bp(n, i),
			emit: null,
			emitted: null,
			propsDefaults: qe,
			inheritAttrs: n.inheritAttrs,
			ctx: qe,
			data: qe,
			props: qe,
			attrs: qe,
			slots: qe,
			refs: qe,
			setupState: qe,
			setupContext: null,
			suspense: r,
			suspenseId: r ? r.pendingId : 0,
			asyncDep: null,
			asyncResolved: !1,
			isMounted: !1,
			isUnmounted: !1,
			isDeactivated: !1,
			bc: null,
			c: null,
			bm: null,
			m: null,
			bu: null,
			u: null,
			um: null,
			bum: null,
			da: null,
			a: null,
			rtg: null,
			rtc: null,
			ec: null,
			sp: null,
		};
	return (
		(a.ctx = { _: a }),
		(a.root = t ? t.root : a),
		(a.emit = F3.bind(null, a)),
		e.ce && e.ce(a),
		a
	);
}
let et = null;
const An = () => et || pt,
	_n = (e) => {
		(et = e), e.scope.on();
	},
	hn = () => {
		et && et.scope.off(), (et = null);
	};
function fm(e) {
	return e.vnode.shapeFlag & 4;
}
let Pi = !1;
function B6(e, t = !1) {
	Pi = t;
	const { props: r, children: n } = e.vnode,
		i = fm(e);
	m6(e, r, i, t), b6(e, n);
	const a = i ? P6(e, t) : void 0;
	return (Pi = !1), a;
}
function P6(e, t) {
	const r = e.type;
	(e.accessCache = Object.create(null)), (e.proxy = Tp(new Proxy(e.ctx, c6)));
	const { setup: n } = r;
	if (n) {
		const i = (e.setupContext = n.length > 1 ? hm(e) : null);
		_n(e), Zi();
		const a = dn(n, e, 0, [e.props, i]);
		if ((Qi(), hn(), Gc(a))) {
			if ((a.then(hn, hn), t))
				return a
					.then((s) => {
						Pl(e, s, t);
					})
					.catch((s) => {
						ea(s, e, 0);
					});
			e.asyncDep = a;
		} else Pl(e, a, t);
	} else dm(e, t);
}
function Pl(e, t, r) {
	Se(t)
		? e.type.__ssrInlineRender
			? (e.ssrRender = t)
			: (e.render = t)
		: He(t) && (e.setupState = Mp(t)),
		dm(e, r);
}
let Qf;
function dm(e, t, r) {
	const n = e.type;
	if (!e.render) {
		if (!t && Qf && !n.render) {
			const i = n.template || ou(e).template;
			if (i) {
				const { isCustomElement: a, compilerOptions: s } = e.appContext.config,
					{ delimiters: o, compilerOptions: l } = n,
					c = mt(mt({ isCustomElement: a, delimiters: o }, s), l);
				n.render = Qf(i, c);
			}
		}
		e.render = n.render || Qt;
	}
	_n(e), Zi(), u6(e), Qi(), hn();
}
function L6(e) {
	return new Proxy(e.attrs, {
		get(t, r) {
			return Nt(e, "get", "$attrs"), t[r];
		},
	});
}
function hm(e) {
	const t = (n) => {
		e.exposed = n || {};
	};
	let r;
	return {
		get attrs() {
			return r || (r = L6(e));
		},
		slots: e.slots,
		emit: e.emit,
		expose: t,
	};
}
function Ko(e) {
	if (e.exposed)
		return (
			e.exposeProxy ||
			(e.exposeProxy = new Proxy(Mp(Tp(e.exposed)), {
				get(t, r) {
					if (r in t) return t[r];
					if (r in wa) return wa[r](e);
				},
				has(t, r) {
					return r in t || r in wa;
				},
			}))
		);
}
function Ll(e, t = !0) {
	return Se(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function z6(e) {
	return Se(e) && "__vccOpts" in e;
}
const Et = (e, t) => B3(e, t, Pi);
function pP() {
	return $6().slots;
}
function $6() {
	const e = An();
	return e.setupContext || (e.setupContext = hm(e));
}
function mP(e) {
	const t = An();
	let r = e();
	return (
		hn(),
		Gc(r) &&
			(r = r.catch((n) => {
				throw (_n(t), n);
			})),
		[r, () => _n(t)]
	);
}
function er(e, t, r) {
	const n = arguments.length;
	return n === 2
		? He(t) && !ge(t)
			? Bi(t)
				? Ye(e, null, [t])
				: Ye(e, t)
			: Ye(e, null, t)
		: (n > 3
				? (r = Array.prototype.slice.call(arguments, 2))
				: n === 3 && Bi(r) && (r = [r]),
		  Ye(e, t, r));
}
const F6 = Symbol(""),
	H6 = () => Lt(F6),
	fu = "3.2.47",
	U6 = "http://www.w3.org/2000/svg",
	zn = typeof document < "u" ? document : null,
	ed = zn && zn.createElement("template"),
	j6 = {
		insert: (e, t, r) => {
			t.insertBefore(e, r || null);
		},
		remove: (e) => {
			const t = e.parentNode;
			t && t.removeChild(e);
		},
		createElement: (e, t, r, n) => {
			const i = t
				? zn.createElementNS(U6, e)
				: zn.createElement(e, r ? { is: r } : void 0);
			return (
				e === "select" &&
					n &&
					n.multiple != null &&
					i.setAttribute("multiple", n.multiple),
				i
			);
		},
		createText: (e) => zn.createTextNode(e),
		createComment: (e) => zn.createComment(e),
		setText: (e, t) => {
			e.nodeValue = t;
		},
		setElementText: (e, t) => {
			e.textContent = t;
		},
		parentNode: (e) => e.parentNode,
		nextSibling: (e) => e.nextSibling,
		querySelector: (e) => zn.querySelector(e),
		setScopeId(e, t) {
			e.setAttribute(t, "");
		},
		insertStaticContent(e, t, r, n, i, a) {
			const s = r ? r.previousSibling : t.lastChild;
			if (i && (i === a || i.nextSibling))
				for (
					;
					t.insertBefore(i.cloneNode(!0), r),
						!(i === a || !(i = i.nextSibling));

				);
			else {
				ed.innerHTML = n ? `<svg>${e}</svg>` : e;
				const o = ed.content;
				if (n) {
					const l = o.firstChild;
					for (; l.firstChild; ) o.appendChild(l.firstChild);
					o.removeChild(l);
				}
				t.insertBefore(o, r);
			}
			return [
				s ? s.nextSibling : t.firstChild,
				r ? r.previousSibling : t.lastChild,
			];
		},
	};
function q6(e, t, r) {
	const n = e._vtc;
	n && (t = (t ? [t, ...n] : [...n]).join(" ")),
		t == null
			? e.removeAttribute("class")
			: r
			? e.setAttribute("class", t)
			: (e.className = t);
}
function G6(e, t, r) {
	const n = e.style,
		i = We(r);
	if (r && !i) {
		if (t && !We(t)) for (const a in t) r[a] == null && zl(n, a, "");
		for (const a in r) zl(n, a, r[a]);
	} else {
		const a = n.display;
		i ? t !== r && (n.cssText = r) : t && e.removeAttribute("style"),
			"_vod" in e && (n.display = a);
	}
}
const td = /\s*!important$/;
function zl(e, t, r) {
	if (ge(r)) r.forEach((n) => zl(e, t, n));
	else if ((r == null && (r = ""), t.startsWith("--"))) e.setProperty(t, r);
	else {
		const n = Y6(e, t);
		td.test(r)
			? e.setProperty(Qn(n), r.replace(td, ""), "important")
			: (e[n] = r);
	}
}
const rd = ["Webkit", "Moz", "ms"],
	C0 = {};
function Y6(e, t) {
	const r = C0[t];
	if (r) return r;
	let n = hr(t);
	if (n !== "filter" && n in e) return (C0[t] = n);
	n = Fo(n);
	for (let i = 0; i < rd.length; i++) {
		const a = rd[i] + n;
		if (a in e) return (C0[t] = a);
	}
	return t;
}
const nd = "http://www.w3.org/1999/xlink";
function W6(e, t, r, n, i) {
	if (n && t.startsWith("xlink:"))
		r == null
			? e.removeAttributeNS(nd, t.slice(6, t.length))
			: e.setAttributeNS(nd, t, r);
	else {
		const a = q5(t);
		r == null || (a && !lp(r))
			? e.removeAttribute(t)
			: e.setAttribute(t, a ? "" : r);
	}
}
function V6(e, t, r, n, i, a, s) {
	if (t === "innerHTML" || t === "textContent") {
		n && s(n, i, a), (e[t] = r ?? "");
		return;
	}
	if (t === "value" && e.tagName !== "PROGRESS" && !e.tagName.includes("-")) {
		e._value = r;
		const l = r ?? "";
		(e.value !== l || e.tagName === "OPTION") && (e.value = l),
			r == null && e.removeAttribute(t);
		return;
	}
	let o = !1;
	if (r === "" || r == null) {
		const l = typeof e[t];
		l === "boolean"
			? (r = lp(r))
			: r == null && l === "string"
			? ((r = ""), (o = !0))
			: l === "number" && ((r = 0), (o = !0));
	}
	try {
		e[t] = r;
	} catch {}
	o && e.removeAttribute(t);
}
function rn(e, t, r, n) {
	e.addEventListener(t, r, n);
}
function K6(e, t, r, n) {
	e.removeEventListener(t, r, n);
}
function X6(e, t, r, n, i = null) {
	const a = e._vei || (e._vei = {}),
		s = a[t];
	if (n && s) s.value = n;
	else {
		const [o, l] = J6(t);
		if (n) {
			const c = (a[t] = e7(n, i));
			rn(e, o, c, l);
		} else s && (K6(e, o, s, l), (a[t] = void 0));
	}
}
const id = /(?:Once|Passive|Capture)$/;
function J6(e) {
	let t;
	if (id.test(e)) {
		t = {};
		let n;
		for (; (n = e.match(id)); )
			(e = e.slice(0, e.length - n[0].length)), (t[n[0].toLowerCase()] = !0);
	}
	return [e[2] === ":" ? e.slice(3) : Qn(e.slice(2)), t];
}
let I0 = 0;
const Z6 = Promise.resolve(),
	Q6 = () => I0 || (Z6.then(() => (I0 = 0)), (I0 = Date.now()));
function e7(e, t) {
	const r = (n) => {
		if (!n._vts) n._vts = Date.now();
		else if (n._vts <= r.attached) return;
		Gt(t7(n, r.value), t, 5, [n]);
	};
	return (r.value = e), (r.attached = Q6()), r;
}
function t7(e, t) {
	if (ge(t)) {
		const r = e.stopImmediatePropagation;
		return (
			(e.stopImmediatePropagation = () => {
				r.call(e), (e._stopped = !0);
			}),
			t.map((n) => (i) => !i._stopped && n && n(i))
		);
	} else return t;
}
const ad = /^on[a-z]/,
	r7 = (e, t, r, n, i = !1, a, s, o, l) => {
		t === "class"
			? q6(e, n, i)
			: t === "style"
			? G6(e, r, n)
			: cs(t)
			? jc(t) || X6(e, t, r, n, s)
			: (
					t[0] === "."
						? ((t = t.slice(1)), !0)
						: t[0] === "^"
						? ((t = t.slice(1)), !1)
						: n7(e, t, n, i)
			  )
			? V6(e, t, n, a, s, o, l)
			: (t === "true-value"
					? (e._trueValue = n)
					: t === "false-value" && (e._falseValue = n),
			  W6(e, t, n, i));
	};
function n7(e, t, r, n) {
	return n
		? !!(
				t === "innerHTML" ||
				t === "textContent" ||
				(t in e && ad.test(t) && Se(r))
		  )
		: t === "spellcheck" ||
		  t === "draggable" ||
		  t === "translate" ||
		  t === "form" ||
		  (t === "list" && e.tagName === "INPUT") ||
		  (t === "type" && e.tagName === "TEXTAREA") ||
		  (ad.test(t) && We(r))
		? !1
		: t in e;
}
const Yr = "transition",
	ca = "animation",
	Xo = (e, { slots: t }) => er(Fp, i7(e), t);
Xo.displayName = "Transition";
const pm = {
	name: String,
	type: String,
	css: { type: Boolean, default: !0 },
	duration: [String, Number, Object],
	enterFromClass: String,
	enterActiveClass: String,
	enterToClass: String,
	appearFromClass: String,
	appearActiveClass: String,
	appearToClass: String,
	leaveFromClass: String,
	leaveActiveClass: String,
	leaveToClass: String,
};
Xo.props = mt({}, Fp.props, pm);
const Nn = (e, t = []) => {
		ge(e) ? e.forEach((r) => r(...t)) : e && e(...t);
	},
	sd = (e) => (e ? (ge(e) ? e.some((t) => t.length > 1) : e.length > 1) : !1);
function i7(e) {
	const t = {};
	for (const q in e) q in pm || (t[q] = e[q]);
	if (e.css === !1) return t;
	const {
			name: r = "v",
			type: n,
			duration: i,
			enterFromClass: a = `${r}-enter-from`,
			enterActiveClass: s = `${r}-enter-active`,
			enterToClass: o = `${r}-enter-to`,
			appearFromClass: l = a,
			appearActiveClass: c = s,
			appearToClass: u = o,
			leaveFromClass: d = `${r}-leave-from`,
			leaveActiveClass: p = `${r}-leave-active`,
			leaveToClass: m = `${r}-leave-to`,
		} = e,
		b = a7(i),
		E = b && b[0],
		R = b && b[1],
		{
			onBeforeEnter: _,
			onEnter: v,
			onEnterCancelled: T,
			onLeave: M,
			onLeaveCancelled: O,
			onBeforeAppear: B = _,
			onAppear: z = v,
			onAppearCancelled: D = T,
		} = t,
		H = (q, oe, W) => {
			Cn(q, oe ? u : o), Cn(q, oe ? c : s), W && W();
		},
		Q = (q, oe) => {
			(q._isLeaving = !1), Cn(q, d), Cn(q, m), Cn(q, p), oe && oe();
		},
		te = (q) => (oe, W) => {
			const Ee = q ? z : v,
				I = () => H(oe, q, W);
			Nn(Ee, [oe, I]),
				od(() => {
					Cn(oe, q ? l : a), Wr(oe, q ? u : o), sd(Ee) || ld(oe, n, E, I);
				});
		};
	return mt(t, {
		onBeforeEnter(q) {
			Nn(_, [q]), Wr(q, a), Wr(q, s);
		},
		onBeforeAppear(q) {
			Nn(B, [q]), Wr(q, l), Wr(q, c);
		},
		onEnter: te(!1),
		onAppear: te(!0),
		onLeave(q, oe) {
			q._isLeaving = !0;
			const W = () => Q(q, oe);
			Wr(q, d),
				l7(),
				Wr(q, p),
				od(() => {
					q._isLeaving && (Cn(q, d), Wr(q, m), sd(M) || ld(q, n, R, W));
				}),
				Nn(M, [q, W]);
		},
		onEnterCancelled(q) {
			H(q, !1), Nn(T, [q]);
		},
		onAppearCancelled(q) {
			H(q, !0), Nn(D, [q]);
		},
		onLeaveCancelled(q) {
			Q(q), Nn(O, [q]);
		},
	});
}
function a7(e) {
	if (e == null) return null;
	if (He(e)) return [D0(e.enter), D0(e.leave)];
	{
		const t = D0(e);
		return [t, t];
	}
}
function D0(e) {
	return dp(e);
}
function Wr(e, t) {
	t.split(/\s+/).forEach((r) => r && e.classList.add(r)),
		(e._vtc || (e._vtc = new Set())).add(t);
}
function Cn(e, t) {
	t.split(/\s+/).forEach((n) => n && e.classList.remove(n));
	const { _vtc: r } = e;
	r && (r.delete(t), r.size || (e._vtc = void 0));
}
function od(e) {
	requestAnimationFrame(() => {
		requestAnimationFrame(e);
	});
}
let s7 = 0;
function ld(e, t, r, n) {
	const i = (e._endId = ++s7),
		a = () => {
			i === e._endId && n();
		};
	if (r) return setTimeout(a, r);
	const { type: s, timeout: o, propCount: l } = o7(e, t);
	if (!s) return n();
	const c = s + "end";
	let u = 0;
	const d = () => {
			e.removeEventListener(c, p), a();
		},
		p = (m) => {
			m.target === e && ++u >= l && d();
		};
	setTimeout(() => {
		u < l && d();
	}, o + 1),
		e.addEventListener(c, p);
}
function o7(e, t) {
	const r = window.getComputedStyle(e),
		n = (b) => (r[b] || "").split(", "),
		i = n(`${Yr}Delay`),
		a = n(`${Yr}Duration`),
		s = cd(i, a),
		o = n(`${ca}Delay`),
		l = n(`${ca}Duration`),
		c = cd(o, l);
	let u = null,
		d = 0,
		p = 0;
	t === Yr
		? s > 0 && ((u = Yr), (d = s), (p = a.length))
		: t === ca
		? c > 0 && ((u = ca), (d = c), (p = l.length))
		: ((d = Math.max(s, c)),
		  (u = d > 0 ? (s > c ? Yr : ca) : null),
		  (p = u ? (u === Yr ? a.length : l.length) : 0));
	const m =
		u === Yr && /\b(transform|all)(,|$)/.test(n(`${Yr}Property`).toString());
	return { type: u, timeout: d, propCount: p, hasTransform: m };
}
function cd(e, t) {
	for (; e.length < t.length; ) e = e.concat(e);
	return Math.max(...t.map((r, n) => ud(r) + ud(e[n])));
}
function ud(e) {
	return Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function l7() {
	return document.body.offsetHeight;
}
const Li = (e) => {
	const t = e.props["onUpdate:modelValue"] || !1;
	return ge(t) ? (r) => bi(t, r) : t;
};
function c7(e) {
	e.target.composing = !0;
}
function fd(e) {
	const t = e.target;
	t.composing && ((t.composing = !1), t.dispatchEvent(new Event("input")));
}
const gP = {
		created(e, { modifiers: { lazy: t, trim: r, number: n } }, i) {
			e._assign = Li(i);
			const a = n || (i.props && i.props.type === "number");
			rn(e, t ? "change" : "input", (s) => {
				if (s.target.composing) return;
				let o = e.value;
				r && (o = o.trim()), a && (o = oo(o)), e._assign(o);
			}),
				r &&
					rn(e, "change", () => {
						e.value = e.value.trim();
					}),
				t ||
					(rn(e, "compositionstart", c7),
					rn(e, "compositionend", fd),
					rn(e, "change", fd));
		},
		mounted(e, { value: t }) {
			e.value = t ?? "";
		},
		beforeUpdate(
			e,
			{ value: t, modifiers: { lazy: r, trim: n, number: i } },
			a
		) {
			if (
				((e._assign = Li(a)),
				e.composing ||
					(document.activeElement === e &&
						e.type !== "range" &&
						(r ||
							(n && e.value.trim() === t) ||
							((i || e.type === "number") && oo(e.value) === t))))
			)
				return;
			const s = t ?? "";
			e.value !== s && (e.value = s);
		},
	},
	yP = {
		deep: !0,
		created(e, t, r) {
			(e._assign = Li(r)),
				rn(e, "change", () => {
					const n = e._modelValue,
						i = qa(e),
						a = e.checked,
						s = e._assign;
					if (ge(n)) {
						const o = Uc(n, i),
							l = o !== -1;
						if (a && !l) s(n.concat(i));
						else if (!a && l) {
							const c = [...n];
							c.splice(o, 1), s(c);
						}
					} else if (Xi(n)) {
						const o = new Set(n);
						a ? o.add(i) : o.delete(i), s(o);
					} else s(mm(e, a));
				});
		},
		mounted: dd,
		beforeUpdate(e, t, r) {
			(e._assign = Li(r)), dd(e, t, r);
		},
	};
function dd(e, { value: t, oldValue: r }, n) {
	(e._modelValue = t),
		ge(t)
			? (e.checked = Uc(t, n.props.value) > -1)
			: Xi(t)
			? (e.checked = t.has(n.props.value))
			: t !== r && (e.checked = ls(t, mm(e, !0)));
}
const bP = {
	deep: !0,
	created(e, { value: t, modifiers: { number: r } }, n) {
		const i = Xi(t);
		rn(e, "change", () => {
			const a = Array.prototype.filter
				.call(e.options, (s) => s.selected)
				.map((s) => (r ? oo(qa(s)) : qa(s)));
			e._assign(e.multiple ? (i ? new Set(a) : a) : a[0]);
		}),
			(e._assign = Li(n));
	},
	mounted(e, { value: t }) {
		hd(e, t);
	},
	beforeUpdate(e, t, r) {
		e._assign = Li(r);
	},
	updated(e, { value: t }) {
		hd(e, t);
	},
};
function hd(e, t) {
	const r = e.multiple;
	if (!(r && !ge(t) && !Xi(t))) {
		for (let n = 0, i = e.options.length; n < i; n++) {
			const a = e.options[n],
				s = qa(a);
			if (r) ge(t) ? (a.selected = Uc(t, s) > -1) : (a.selected = t.has(s));
			else if (ls(qa(a), t)) {
				e.selectedIndex !== n && (e.selectedIndex = n);
				return;
			}
		}
		!r && e.selectedIndex !== -1 && (e.selectedIndex = -1);
	}
}
function qa(e) {
	return "_value" in e ? e._value : e.value;
}
function mm(e, t) {
	const r = t ? "_trueValue" : "_falseValue";
	return r in e ? e[r] : t;
}
const u7 = ["ctrl", "shift", "alt", "meta"],
	f7 = {
		stop: (e) => e.stopPropagation(),
		prevent: (e) => e.preventDefault(),
		self: (e) => e.target !== e.currentTarget,
		ctrl: (e) => !e.ctrlKey,
		shift: (e) => !e.shiftKey,
		alt: (e) => !e.altKey,
		meta: (e) => !e.metaKey,
		left: (e) => "button" in e && e.button !== 0,
		middle: (e) => "button" in e && e.button !== 1,
		right: (e) => "button" in e && e.button !== 2,
		exact: (e, t) => u7.some((r) => e[`${r}Key`] && !t.includes(r)),
	},
	vP =
		(e, t) =>
		(r, ...n) => {
			for (let i = 0; i < t.length; i++) {
				const a = f7[t[i]];
				if (a && a(r, t)) return;
			}
			return e(r, ...n);
		},
	d7 = {
		esc: "escape",
		space: " ",
		up: "arrow-up",
		left: "arrow-left",
		right: "arrow-right",
		down: "arrow-down",
		delete: "backspace",
	},
	_P = (e, t) => (r) => {
		if (!("key" in r)) return;
		const n = Qn(r.key);
		if (t.some((i) => i === n || d7[i] === n)) return e(r);
	},
	wP = {
		beforeMount(e, { value: t }, { transition: r }) {
			(e._vod = e.style.display === "none" ? "" : e.style.display),
				r && t ? r.beforeEnter(e) : ua(e, t);
		},
		mounted(e, { value: t }, { transition: r }) {
			r && t && r.enter(e);
		},
		updated(e, { value: t, oldValue: r }, { transition: n }) {
			!t != !r &&
				(n
					? t
						? (n.beforeEnter(e), ua(e, !0), n.enter(e))
						: n.leave(e, () => {
								ua(e, !1);
						  })
					: ua(e, t));
		},
		beforeUnmount(e, { value: t }) {
			ua(e, t);
		},
	};
function ua(e, t) {
	e.style.display = t ? e._vod : "none";
}
const gm = mt({ patchProp: r7 }, j6);
let Ta,
	pd = !1;
function h7() {
	return Ta || (Ta = E6(gm));
}
function p7() {
	return (Ta = pd ? Ta : x6(gm)), (pd = !0), Ta;
}
const m7 = (...e) => {
		const t = h7().createApp(...e),
			{ mount: r } = t;
		return (
			(t.mount = (n) => {
				const i = ym(n);
				if (!i) return;
				const a = t._component;
				!Se(a) && !a.render && !a.template && (a.template = i.innerHTML),
					(i.innerHTML = "");
				const s = r(i, !1, i instanceof SVGElement);
				return (
					i instanceof Element &&
						(i.removeAttribute("v-cloak"), i.setAttribute("data-v-app", "")),
					s
				);
			}),
			t
		);
	},
	g7 = (...e) => {
		const t = p7().createApp(...e),
			{ mount: r } = t;
		return (
			(t.mount = (n) => {
				const i = ym(n);
				if (i) return r(i, !0, i instanceof SVGElement);
			}),
			t
		);
	};
function ym(e) {
	return We(e) ? document.querySelector(e) : e;
}
const y7 =
		/"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/,
	b7 =
		/"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/,
	v7 = /^\s*["[{]|^\s*-?\d[\d.]{0,14}\s*$/;
function _7(e, t) {
	if (
		e !== "__proto__" &&
		!(e === "constructor" && t && typeof t == "object" && "prototype" in t)
	)
		return t;
}
function w7(e, t = {}) {
	if (typeof e != "string") return e;
	const r = e.toLowerCase().trim();
	if (r === "true") return !0;
	if (r === "false") return !1;
	if (r === "null") return null;
	if (r === "nan") return Number.NaN;
	if (r === "infinity") return Number.POSITIVE_INFINITY;
	if (r !== "undefined") {
		if (!v7.test(e)) {
			if (t.strict) throw new SyntaxError("Invalid JSON");
			return e;
		}
		try {
			return y7.test(e) || b7.test(e) ? JSON.parse(e, _7) : JSON.parse(e);
		} catch (n) {
			if (t.strict) throw n;
			return e;
		}
	}
}
const S7 = /#/g,
	E7 = /&/g,
	x7 = /=/g,
	bm = /\+/g,
	T7 = /%5e/gi,
	k7 = /%60/gi,
	A7 = /%7c/gi,
	R7 = /%20/gi;
function M7(e) {
	return encodeURI("" + e).replace(A7, "|");
}
function $l(e) {
	return M7(typeof e == "string" ? e : JSON.stringify(e))
		.replace(bm, "%2B")
		.replace(R7, "+")
		.replace(S7, "%23")
		.replace(E7, "%26")
		.replace(k7, "`")
		.replace(T7, "^");
}
function B0(e) {
	return $l(e).replace(x7, "%3D");
}
function vm(e = "") {
	try {
		return decodeURIComponent("" + e);
	} catch {
		return "" + e;
	}
}
function O7(e) {
	return vm(e.replace(bm, " "));
}
function N7(e = "") {
	const t = {};
	e[0] === "?" && (e = e.slice(1));
	for (const r of e.split("&")) {
		const n = r.match(/([^=]+)=?(.*)/) || [];
		if (n.length < 2) continue;
		const i = vm(n[1]);
		if (i === "__proto__" || i === "constructor") continue;
		const a = O7(n[2] || "");
		typeof t[i] < "u"
			? Array.isArray(t[i])
				? t[i].push(a)
				: (t[i] = [t[i], a])
			: (t[i] = a);
	}
	return t;
}
function _m(e, t) {
	return (
		(typeof t == "number" || typeof t == "boolean") && (t = String(t)),
		t
			? Array.isArray(t)
				? t.map((r) => `${B0(e)}=${$l(r)}`).join("&")
				: `${B0(e)}=${$l(t)}`
			: B0(e)
	);
}
function C7(e) {
	return Object.keys(e)
		.filter((t) => e[t] !== void 0)
		.map((t) => _m(t, e[t]))
		.join("&");
}
const I7 = /^\w{2,}:([/\\]{1,2})/,
	D7 = /^\w{2,}:([/\\]{2})?/,
	B7 = /^([/\\]\s*){2,}[^/\\]/;
function Kn(e, t = {}) {
	return (
		typeof t == "boolean" && (t = { acceptRelative: t }),
		t.strict ? I7.test(e) : D7.test(e) || (t.acceptRelative ? B7.test(e) : !1)
	);
}
const P7 = /\/$|\/\?/;
function Fl(e = "", t = !1) {
	return t ? P7.test(e) : e.endsWith("/");
}
function wm(e = "", t = !1) {
	if (!t) return (Fl(e) ? e.slice(0, -1) : e) || "/";
	if (!Fl(e, !0)) return e || "/";
	const [r, ...n] = e.split("?");
	return (r.slice(0, -1) || "/") + (n.length > 0 ? `?${n.join("?")}` : "");
}
function L7(e = "", t = !1) {
	if (!t) return e.endsWith("/") ? e : e + "/";
	if (Fl(e, !0)) return e || "/";
	const [r, ...n] = e.split("?");
	return r + "/" + (n.length > 0 ? `?${n.join("?")}` : "");
}
function Sm(e = "") {
	return e.startsWith("/");
}
function z7(e = "") {
	return (Sm(e) ? e.slice(1) : e) || "/";
}
function $7(e = "") {
	return Sm(e) ? e : "/" + e;
}
function F7(e, t) {
	if (Em(t) || Kn(e)) return e;
	const r = wm(t);
	return e.startsWith(r) ? e : ei(r, e);
}
function md(e, t) {
	if (Em(t)) return e;
	const r = wm(t);
	if (!e.startsWith(r)) return e;
	const n = e.slice(r.length);
	return n[0] === "/" ? n : "/" + n;
}
function H7(e, t) {
	const r = fs(e),
		n = { ...N7(r.search), ...t };
	return (r.search = C7(n)), j7(r);
}
function Em(e) {
	return !e || e === "/";
}
function U7(e) {
	return e && e !== "/";
}
function ei(e, ...t) {
	let r = e || "";
	for (const n of t.filter((i) => U7(i))) r = r ? L7(r) + z7(n) : n;
	return r;
}
function fs(e = "", t) {
	if (!Kn(e, { acceptRelative: !0 })) return t ? fs(t + e) : gd(e);
	const [r = "", n, i = ""] = (
			e.replace(/\\/g, "/").match(/([^/:]+:)?\/\/([^/@]+@)?(.*)/) || []
		).splice(1),
		[a = "", s = ""] = (i.match(/([^#/?]*)(.*)?/) || []).splice(1),
		{ pathname: o, search: l, hash: c } = gd(s.replace(/\/(?=[A-Za-z]:)/, ""));
	return {
		protocol: r,
		auth: n ? n.slice(0, Math.max(0, n.length - 1)) : "",
		host: a,
		pathname: o,
		search: l,
		hash: c,
	};
}
function gd(e = "") {
	const [t = "", r = "", n = ""] = (
		e.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []
	).splice(1);
	return { pathname: t, search: r, hash: n };
}
function j7(e) {
	const t =
		e.pathname +
		(e.search ? (e.search.startsWith("?") ? "" : "?") + e.search : "") +
		e.hash;
	return e.protocol
		? e.protocol + "//" + (e.auth ? e.auth + "@" : "") + e.host + t
		: t;
}
class q7 extends Error {
	constructor() {
		super(...arguments), (this.name = "FetchError");
	}
}
function G7(e, t, r) {
	let n = "";
	t && (n = t.message),
		e && r
			? (n = `${n} (${r.status} ${r.statusText} (${e.toString()}))`)
			: e && (n = `${n} (${e.toString()})`);
	const i = new q7(n);
	return (
		Object.defineProperty(i, "request", {
			get() {
				return e;
			},
		}),
		Object.defineProperty(i, "response", {
			get() {
				return r;
			},
		}),
		Object.defineProperty(i, "data", {
			get() {
				return r && r._data;
			},
		}),
		Object.defineProperty(i, "status", {
			get() {
				return r && r.status;
			},
		}),
		Object.defineProperty(i, "statusText", {
			get() {
				return r && r.statusText;
			},
		}),
		Object.defineProperty(i, "statusCode", {
			get() {
				return r && r.status;
			},
		}),
		Object.defineProperty(i, "statusMessage", {
			get() {
				return r && r.statusText;
			},
		}),
		i
	);
}
const Y7 = new Set(Object.freeze(["PATCH", "POST", "PUT", "DELETE"]));
function yd(e = "GET") {
	return Y7.has(e.toUpperCase());
}
function W7(e) {
	if (e === void 0) return !1;
	const t = typeof e;
	return t === "string" || t === "number" || t === "boolean" || t === null
		? !0
		: t !== "object"
		? !1
		: Array.isArray(e)
		? !0
		: (e.constructor && e.constructor.name === "Object") ||
		  typeof e.toJSON == "function";
}
const V7 = new Set([
		"image/svg",
		"application/xml",
		"application/xhtml",
		"application/html",
	]),
	K7 = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function X7(e = "") {
	if (!e) return "json";
	const t = e.split(";").shift() || "";
	return K7.test(t)
		? "json"
		: V7.has(t) || t.startsWith("text/")
		? "text"
		: "blob";
}
const J7 = new Set([408, 409, 425, 429, 500, 502, 503, 504]);
function xm(e) {
	const { fetch: t, Headers: r } = e;
	function n(s) {
		const o = (s.error && s.error.name === "AbortError") || !1;
		if (s.options.retry !== !1 && !o) {
			let c;
			typeof s.options.retry == "number"
				? (c = s.options.retry)
				: (c = yd(s.options.method) ? 0 : 1);
			const u = (s.response && s.response.status) || 500;
			if (c > 0 && J7.has(u))
				return i(s.request, { ...s.options, retry: c - 1 });
		}
		const l = G7(s.request, s.error, s.response);
		throw (Error.captureStackTrace && Error.captureStackTrace(l, i), l);
	}
	const i = async function (o, l = {}) {
			const c = {
				request: o,
				options: { ...e.defaults, ...l },
				response: void 0,
				error: void 0,
			};
			c.options.onRequest && (await c.options.onRequest(c)),
				typeof c.request == "string" &&
					(c.options.baseURL && (c.request = F7(c.request, c.options.baseURL)),
					(c.options.query || c.options.params) &&
						(c.request = H7(c.request, {
							...c.options.params,
							...c.options.query,
						})),
					c.options.body &&
						yd(c.options.method) &&
						W7(c.options.body) &&
						((c.options.body =
							typeof c.options.body == "string"
								? c.options.body
								: JSON.stringify(c.options.body)),
						(c.options.headers = new r(c.options.headers)),
						c.options.headers.has("content-type") ||
							c.options.headers.set("content-type", "application/json"),
						c.options.headers.has("accept") ||
							c.options.headers.set("accept", "application/json"))),
				(c.response = await t(c.request, c.options).catch(
					async (d) => (
						(c.error = d),
						c.options.onRequestError && (await c.options.onRequestError(c)),
						n(c)
					)
				));
			const u =
				(c.options.parseResponse ? "json" : c.options.responseType) ||
				X7(c.response.headers.get("content-type") || "");
			if (u === "json") {
				const d = await c.response.text(),
					p = c.options.parseResponse || w7;
				c.response._data = p(d);
			} else
				u === "stream"
					? (c.response._data = c.response.body)
					: (c.response._data = await c.response[u]());
			return (
				c.options.onResponse && (await c.options.onResponse(c)),
				c.response.status >= 400 && c.response.status < 600
					? (c.options.onResponseError && (await c.options.onResponseError(c)),
					  n(c))
					: c.response
			);
		},
		a = function (o, l) {
			return i(o, l).then((c) => c._data);
		};
	return (
		(a.raw = i),
		(a.native = t),
		(a.create = (s = {}) => xm({ ...e, defaults: { ...e.defaults, ...s } })),
		a
	);
}
const Tm = (function () {
		if (typeof globalThis < "u") return globalThis;
		if (typeof self < "u") return self;
		if (typeof window < "u") return window;
		if (typeof global < "u") return global;
		throw new Error("unable to locate global object");
	})(),
	Z7 =
		Tm.fetch ||
		(() =>
			Promise.reject(new Error("[ofetch] global.fetch is not supported!"))),
	Q7 = Tm.Headers,
	ey = xm({ fetch: Z7, Headers: Q7 }),
	ty = ey,
	ry = () => {
		var e;
		return (
			((e = window == null ? void 0 : window.__NUXT__) == null
				? void 0
				: e.config) || {}
		);
	},
	yo = ry().app,
	ny = () => yo.baseURL,
	iy = () => yo.buildAssetsDir,
	ay = (...e) => ei(km(), iy(), ...e),
	km = (...e) => {
		const t = yo.cdnURL || yo.baseURL;
		return e.length ? ei(t, ...e) : t;
	};
(globalThis.__buildAssetsURL = ay), (globalThis.__publicAssetsURL = km);
function Hl(e, t = {}, r) {
	for (const n in e) {
		const i = e[n],
			a = r ? `${r}:${n}` : n;
		typeof i == "object" && i !== null
			? Hl(i, t, a)
			: typeof i == "function" && (t[a] = i);
	}
	return t;
}
const sy = { run: (e) => e() },
	oy = () => sy,
	Am = typeof console.createTask < "u" ? console.createTask : oy;
function ly(e, t) {
	const r = t.shift(),
		n = Am(r);
	return e.reduce(
		(i, a) => i.then(() => n.run(() => a(...t))),
		Promise.resolve()
	);
}
function cy(e, t) {
	const r = t.shift(),
		n = Am(r);
	return Promise.all(e.map((i) => n.run(() => i(...t))));
}
function P0(e, t) {
	for (const r of [...e]) r(t);
}
class uy {
	constructor() {
		(this._hooks = {}),
			(this._before = void 0),
			(this._after = void 0),
			(this._deprecatedMessages = void 0),
			(this._deprecatedHooks = {}),
			(this.hook = this.hook.bind(this)),
			(this.callHook = this.callHook.bind(this)),
			(this.callHookWith = this.callHookWith.bind(this));
	}
	hook(t, r, n = {}) {
		if (!t || typeof r != "function") return () => {};
		const i = t;
		let a;
		for (; this._deprecatedHooks[t]; )
			(a = this._deprecatedHooks[t]), (t = a.to);
		if (a && !n.allowDeprecated) {
			let s = a.message;
			s ||
				(s =
					`${i} hook has been deprecated` +
					(a.to ? `, please use ${a.to}` : "")),
				this._deprecatedMessages || (this._deprecatedMessages = new Set()),
				this._deprecatedMessages.has(s) ||
					(console.warn(s), this._deprecatedMessages.add(s));
		}
		if (!r.name)
			try {
				Object.defineProperty(r, "name", {
					get: () => "_" + t.replace(/\W+/g, "_") + "_hook_cb",
					configurable: !0,
				});
			} catch {}
		return (
			(this._hooks[t] = this._hooks[t] || []),
			this._hooks[t].push(r),
			() => {
				r && (this.removeHook(t, r), (r = void 0));
			}
		);
	}
	hookOnce(t, r) {
		let n,
			i = (...a) => (
				typeof n == "function" && n(), (n = void 0), (i = void 0), r(...a)
			);
		return (n = this.hook(t, i)), n;
	}
	removeHook(t, r) {
		if (this._hooks[t]) {
			const n = this._hooks[t].indexOf(r);
			n !== -1 && this._hooks[t].splice(n, 1),
				this._hooks[t].length === 0 && delete this._hooks[t];
		}
	}
	deprecateHook(t, r) {
		this._deprecatedHooks[t] = typeof r == "string" ? { to: r } : r;
		const n = this._hooks[t] || [];
		delete this._hooks[t];
		for (const i of n) this.hook(t, i);
	}
	deprecateHooks(t) {
		Object.assign(this._deprecatedHooks, t);
		for (const r in t) this.deprecateHook(r, t[r]);
	}
	addHooks(t) {
		const r = Hl(t),
			n = Object.keys(r).map((i) => this.hook(i, r[i]));
		return () => {
			for (const i of n.splice(0, n.length)) i();
		};
	}
	removeHooks(t) {
		const r = Hl(t);
		for (const n in r) this.removeHook(n, r[n]);
	}
	removeAllHooks() {
		for (const t in this._hooks) delete this._hooks[t];
	}
	callHook(t, ...r) {
		return r.unshift(t), this.callHookWith(ly, t, ...r);
	}
	callHookParallel(t, ...r) {
		return r.unshift(t), this.callHookWith(cy, t, ...r);
	}
	callHookWith(t, r, ...n) {
		const i =
			this._before || this._after ? { name: r, args: n, context: {} } : void 0;
		this._before && P0(this._before, i);
		const a = t(r in this._hooks ? [...this._hooks[r]] : [], n);
		return a instanceof Promise
			? a.finally(() => {
					this._after && i && P0(this._after, i);
			  })
			: (this._after && i && P0(this._after, i), a);
	}
	beforeEach(t) {
		return (
			(this._before = this._before || []),
			this._before.push(t),
			() => {
				if (this._before !== void 0) {
					const r = this._before.indexOf(t);
					r !== -1 && this._before.splice(r, 1);
				}
			}
		);
	}
	afterEach(t) {
		return (
			(this._after = this._after || []),
			this._after.push(t),
			() => {
				if (this._after !== void 0) {
					const r = this._after.indexOf(t);
					r !== -1 && this._after.splice(r, 1);
				}
			}
		);
	}
}
function Rm() {
	return new uy();
}
function fy() {
	let e,
		t = !1;
	const r = (n) => {
		if (e && e !== n) throw new Error("Context conflict");
	};
	return {
		use: () => {
			if (e === void 0) throw new Error("Context is not available");
			return e;
		},
		tryUse: () => e,
		set: (n, i) => {
			i || r(n), (e = n), (t = !0);
		},
		unset: () => {
			(e = void 0), (t = !1);
		},
		call: (n, i) => {
			r(n), (e = n);
			try {
				return i();
			} finally {
				t || (e = void 0);
			}
		},
		async callAsync(n, i) {
			e = n;
			const a = () => {
					e = n;
				},
				s = () => (e === n ? a : void 0);
			Ul.add(s);
			try {
				const o = i();
				return t || (e = void 0), await o;
			} finally {
				Ul.delete(s);
			}
		},
	};
}
function dy() {
	const e = {};
	return {
		get(t) {
			return e[t] || (e[t] = fy()), e[t], e[t];
		},
	};
}
const bo =
		typeof globalThis < "u"
			? globalThis
			: typeof self < "u"
			? self
			: typeof global < "u"
			? global
			: typeof window < "u"
			? window
			: {},
	bd = "__unctx__",
	hy = bo[bd] || (bo[bd] = dy()),
	py = (e) => hy.get(e),
	vd = "__unctx_async_handlers__",
	Ul = bo[vd] || (bo[vd] = new Set());
function jl(e) {
	const t = [];
	for (const i of Ul) {
		const a = i();
		a && t.push(a);
	}
	const r = () => {
		for (const i of t) i();
	};
	let n = e();
	return (
		n &&
			typeof n == "object" &&
			"catch" in n &&
			(n = n.catch((i) => {
				throw (r(), i);
			})),
		[n, r]
	);
}
const Mm = py("nuxt-app"),
	my = "__nuxt_plugin";
function gy(e) {
	let t = 0;
	const r = {
		provide: void 0,
		globalName: "nuxt",
		payload: pr({ data: {}, state: {}, _errors: {}, ...window.__NUXT__ }),
		static: { data: {} },
		isHydrating: !0,
		deferHydration() {
			if (!r.isHydrating) return () => {};
			t++;
			let a = !1;
			return () => {
				if (!a && ((a = !0), t--, t === 0))
					return (r.isHydrating = !1), r.callHook("app:suspense:resolve");
			};
		},
		_asyncDataPromises: {},
		_asyncData: {},
		...e,
	};
	(r.hooks = Rm()),
		(r.hook = r.hooks.hook),
		(r.callHook = r.hooks.callHook),
		(r.provide = (a, s) => {
			const o = "$" + a;
			Ns(r, o, s), Ns(r.vueApp.config.globalProperties, o, s);
		}),
		Ns(r.vueApp, "$nuxt", r),
		Ns(r.vueApp.config.globalProperties, "$nuxt", r),
		window.addEventListener("nuxt.preloadError", (a) => {
			r.callHook("app:chunkError", { error: a.payload });
		});
	const n = pr(r.payload.config),
		i = new Proxy(n, {
			get(a, s) {
				return s === "public" ? a.public : a[s] ?? a.public[s];
			},
			set(a, s, o) {
				return s === "public" || s === "app"
					? !1
					: ((a[s] = o), (a.public[s] = o), !0);
			},
		});
	return r.provide("config", i), r;
}
async function yy(e, t) {
	if (typeof t != "function") return;
	const { provide: r } = (await Tr(e, t, [e])) || {};
	if (r && typeof r == "object") for (const n in r) e.provide(n, r[n]);
}
async function by(e, t) {
	for (const r of t) await yy(e, r);
}
function vy(e) {
	return e
		.map((r) =>
			typeof r != "function" ? null : r.length > 1 ? (n) => r(n, n.provide) : r
		)
		.filter(Boolean);
}
function Ct(e) {
	return (e[my] = !0), e;
}
function Tr(e, t, r) {
	const n = () => (r ? t(...r) : t());
	return Mm.set(e), n();
}
function Re() {
	const e = Mm.tryUse();
	if (!e) {
		const t = An();
		if (!t) throw new Error("nuxt instance unavailable");
		return t.appContext.app.$nuxt;
	}
	return e;
}
function Jo() {
	return Re().$config;
}
function Ns(e, t, r) {
	Object.defineProperty(e, t, { get: () => r });
}
const L0 = {},
	_y = Ct((e) => {
		for (const t in L0)
			e.vueApp.component(t, L0[t]), e.vueApp.component("Lazy" + t, L0[t]);
	});
function wy(e) {
	return Array.isArray(e) ? e : [e];
}
const Sy = ["title", "script", "style", "noscript"],
	du = ["base", "meta", "link", "style", "script", "noscript"],
	Ey = [
		"title",
		"titleTemplate",
		"base",
		"htmlAttrs",
		"bodyAttrs",
		"meta",
		"link",
		"style",
		"script",
		"noscript",
	],
	xy = ["base", "title", "titleTemplate", "bodyAttrs", "htmlAttrs"],
	Ty = ["tagPosition", "tagPriority", "tagDuplicateStrategy"];
function Om(e, t) {
	const { props: r, tag: n } = e;
	if (xy.includes(n)) return n;
	if (n === "link" && r.rel === "canonical") return "canonical";
	if (r.charset) return "charset";
	const i = ["id"];
	n === "meta" && i.push("name", "property", "http-equiv");
	for (const a of i)
		if (typeof r[a] < "u") {
			const s = String(r[a]);
			return t && !t(s) ? !1 : `${n}:${a}:${s}`;
		}
	return !1;
}
const ky = (e) => {
	e = e || {};
	const t = e.dedupeKeys || ["hid", "vmid", "key"];
	return {
		hooks: {
			"tag:normalise": function ({ tag: r }) {
				t.forEach((i) => {
					r.props[i] && ((r.key = r.props[i]), delete r.props[i]);
				});
				const n = r.key ? `${r.tag}:${r.key}` : Om(r);
				n && (r._d = n);
			},
			"tags:resolve": function (r) {
				const n = {};
				r.tags.forEach((i) => {
					let a = i._d || i._p;
					const s = n[a];
					if (s) {
						let o = i == null ? void 0 : i.tagDuplicateStrategy;
						if (
							(!o &&
								(i.tag === "htmlAttrs" || i.tag === "bodyAttrs") &&
								(o = "merge"),
							o === "merge")
						) {
							const c = s.props;
							["class", "style"].forEach((u) => {
								i.props[u] &&
									c[u] &&
									(u === "style" && !c[u].endsWith(";") && (c[u] += ";"),
									(i.props[u] = `${c[u]} ${i.props[u]}`));
							}),
								(n[a].props = { ...c, ...i.props });
							return;
						} else i._e === s._e && (a = i._d = `${a}:${i._p}`);
						const l = Object.keys(i.props).length;
						if (
							(l === 0 || (l === 1 && typeof i.props["data-h-key"] < "u")) &&
							!i.children
						) {
							delete n[a];
							return;
						}
					}
					n[a] = i;
				}),
					(r.tags = Object.values(n));
			},
		},
	};
};
function Nm(e) {
	let t = 9;
	for (let r = 0; r < e.length; ) t = Math.imul(t ^ e.charCodeAt(r++), 9 ** 9);
	return ((t ^ (t >>> 9)) + 65536).toString(16).substring(1, 8).toLowerCase();
}
const Cs = (e, t) => {
	const { tag: r, $el: n } = e;
	n &&
		(Object.entries(r.props).forEach(([i, a]) => {
			a = String(a);
			const s = `attr:${i}`;
			if (i === "class") {
				if (!a) return;
				for (const o of a.split(" ")) {
					const l = `${s}:${o}`;
					t && t(e, l, () => n.classList.remove(o)),
						n.classList.contains(o) || n.classList.add(o);
				}
				return;
			}
			t && !i.startsWith("data-h-") && t(e, s, () => n.removeAttribute(i)),
				n.getAttribute(i) !== a && n.setAttribute(i, a);
		}),
		Sy.includes(r.tag) &&
			n.innerHTML !== (r.children || "") &&
			(n.innerHTML = r.children || ""));
};
async function Cm(e, t = {}) {
	var d, p;
	const r = { shouldRender: !0 };
	if ((await e.hooks.callHook("dom:beforeRender", r), !r.shouldRender)) return;
	const n = t.document || window.document,
		i = e._popSideEffectQueue();
	e.headEntries()
		.map((m) => m._sde)
		.forEach((m) => {
			Object.entries(m).forEach(([b, E]) => {
				i[b] = E;
			});
		});
	const a = async (m) => {
			const b = e.headEntries().find((R) => R._i === m._e),
				E = {
					renderId:
						m._d || Nm(JSON.stringify({ ...m, _e: void 0, _p: void 0 })),
					$el: null,
					shouldRender: !0,
					tag: m,
					entry: b,
					staleSideEffects: i,
				};
			return await e.hooks.callHook("dom:beforeRenderTag", E), E;
		},
		s = [],
		o = { body: [], head: [] },
		l = (m, b, E) => {
			(b = `${m.renderId}:${b}`), m.entry && (m.entry._sde[b] = E), delete i[b];
		},
		c = (m) => {
			(e._elMap[m.renderId] = m.$el),
				s.push(m),
				l(m, "el", () => {
					var b;
					(b = m.$el) == null || b.remove(), delete e._elMap[m.renderId];
				});
		};
	for (const m of await e.resolveTags()) {
		const b = await a(m);
		if (!b.shouldRender) continue;
		const { tag: E } = b;
		if (E.tag === "title") {
			(n.title = E.children || ""), s.push(b);
			continue;
		}
		if (E.tag === "htmlAttrs" || E.tag === "bodyAttrs") {
			(b.$el = n[E.tag === "htmlAttrs" ? "documentElement" : "body"]),
				Cs(b, l),
				s.push(b);
			continue;
		}
		if (
			((b.$el = e._elMap[b.renderId]),
			!b.$el &&
				E._hash &&
				(b.$el = n.querySelector(
					`${
						(d = E.tagPosition) != null && d.startsWith("body")
							? "body"
							: "head"
					} > ${E.tag}[data-h-${E._hash}]`
				)),
			b.$el)
		) {
			b.tag._d && Cs(b), c(b);
			continue;
		}
		(b.$el = n.createElement(E.tag)),
			Cs(b),
			o[
				(p = E.tagPosition) != null && p.startsWith("body") ? "body" : "head"
			].push(b);
	}
	const u = { bodyClose: void 0, bodyOpen: void 0, head: void 0 };
	Object.entries(o).forEach(([m, b]) => {
		var R;
		if (!b.length) return;
		const E = (R = n == null ? void 0 : n[m]) == null ? void 0 : R.children;
		if (E) {
			for (const _ of [...E].reverse()) {
				const v = _.tagName.toLowerCase();
				if (!du.includes(v)) continue;
				const T = Om({
						tag: v,
						props: _.getAttributeNames().reduce(
							(O, B) => ({ ...O, [B]: _.getAttribute(B) }),
							{}
						),
					}),
					M = b.findIndex((O) => {
						var B;
						return (
							O &&
							(O.tag._d === T ||
								((B = _.isEqualNode) == null ? void 0 : B.call(_, O.$el)))
						);
					});
				if (M !== -1) {
					const O = b[M];
					(O.$el = _), Cs(O), c(O), delete b[M];
				}
			}
			b.forEach((_) => {
				const v = _.tag.tagPosition || "head";
				(u[v] = u[v] || n.createDocumentFragment()),
					u[v].appendChild(_.$el),
					c(_);
			});
		}
	}),
		u.head && n.head.appendChild(u.head),
		u.bodyOpen && n.body.insertBefore(u.bodyOpen, n.body.firstChild),
		u.bodyClose && n.body.appendChild(u.bodyClose);
	for (const m of s) await e.hooks.callHook("dom:renderTag", m);
	Object.values(i).forEach((m) => m());
}
let z0 = null;
async function Im(e, t = {}) {
	function r() {
		return (z0 = null), Cm(e, t);
	}
	const n = t.delayFn || ((i) => setTimeout(i, 10));
	return (z0 = z0 || new Promise((i) => n(() => i(r()))));
}
const Ay = (e) => ({
		hooks: {
			"entries:updated": function (t) {
				if (
					typeof (e == null ? void 0 : e.document) > "u" &&
					typeof window > "u"
				)
					return;
				let r = e == null ? void 0 : e.delayFn;
				!r && typeof requestAnimationFrame < "u" && (r = requestAnimationFrame),
					Im(t, {
						document: (e == null ? void 0 : e.document) || window.document,
						delayFn: r,
					});
			},
		},
	}),
	_d = { critical: 2, high: 9, low: 12, base: -1, title: 1, meta: 10 };
function wd(e) {
	if (typeof e.tagPriority == "number") return e.tagPriority;
	if (e.tag === "meta") {
		if (e.props.charset) return -2;
		if (e.props["http-equiv"] === "content-security-policy") return 0;
	}
	const t = e.tagPriority || e.tag;
	return t in _d ? _d[t] : 10;
}
const Ry = [
	{ prefix: "before:", offset: -1 },
	{ prefix: "after:", offset: 1 },
];
function My() {
	return {
		hooks: {
			"tags:resolve": (e) => {
				const t = (r) => {
					var n;
					return (n = e.tags.find((i) => i._d === r)) == null ? void 0 : n._p;
				};
				for (const { prefix: r, offset: n } of Ry)
					for (const i of e.tags.filter(
						(a) =>
							typeof a.tagPriority == "string" && a.tagPriority.startsWith(r)
					)) {
						const a = t(i.tagPriority.replace(r, ""));
						typeof a < "u" && (i._p = a + n);
					}
				e.tags.sort((r, n) => r._p - n._p).sort((r, n) => wd(r) - wd(n));
			},
		},
	};
}
const Sd = (e, t) =>
		e == null
			? t || null
			: typeof e == "function"
			? e(t)
			: e.replace("%s", t ?? ""),
	Oy = () => ({
		hooks: {
			"tags:resolve": (e) => {
				const { tags: t } = e;
				let r = t.findIndex((i) => i.tag === "titleTemplate");
				const n = t.findIndex((i) => i.tag === "title");
				if (n !== -1 && r !== -1) {
					const i = Sd(t[r].children, t[n].children);
					i !== null ? (t[n].children = i || t[n].children) : delete t[n];
				} else if (r !== -1) {
					const i = Sd(t[r].children);
					i !== null && ((t[r].children = i), (t[r].tag = "title"), (r = -1));
				}
				r !== -1 && delete t[r], (e.tags = t.filter(Boolean));
			},
		},
	}),
	Ny = () => ({
		hooks: {
			"tag:normalise": function ({ tag: e }) {
				typeof e.props.body < "u" &&
					((e.tagPosition = "bodyClose"), delete e.props.body);
			},
		},
	}),
	Cy = typeof window < "u",
	Iy = () => ({
		hooks: {
			"tag:normalise": (e) => {
				var i, a;
				const { tag: t, entry: r } = e,
					n = typeof t.props._dynamic < "u";
				!du.includes(t.tag) ||
					!t.key ||
					((t._hash = Nm(JSON.stringify({ tag: t.tag, key: t.key }))),
					!(
						Cy ||
						((a = (i = Bm()) == null ? void 0 : i.resolvedOptions) != null &&
							a.document)
					) &&
						(r._m === "server" || n) &&
						(t.props[`data-h-${t._hash}`] = ""));
			},
			"tags:resolve": (e) => {
				e.tags = e.tags.map((t) => (delete t.props._dynamic, t));
			},
		},
	}),
	Ed = ["script", "link", "bodyAttrs"],
	Dy = () => {
		const e = (t, r) => {
			const n = {},
				i = {};
			Object.entries(r.props).forEach(([s, o]) => {
				s.startsWith("on") && typeof o == "function" ? (i[s] = o) : (n[s] = o);
			});
			let a;
			return (
				t === "dom" &&
					r.tag === "script" &&
					typeof n.src == "string" &&
					typeof i.onload < "u" &&
					((a = n.src), delete n.src),
				{ props: n, eventHandlers: i, delayedSrc: a }
			);
		};
		return {
			hooks: {
				"ssr:render": function (t) {
					t.tags = t.tags.map(
						(r) => (
							!Ed.includes(r.tag) ||
								!Object.entries(r.props).find(
									([n, i]) => n.startsWith("on") && typeof i == "function"
								) ||
								(r.props = e("ssr", r).props),
							r
						)
					);
				},
				"dom:beforeRenderTag": function (t) {
					if (
						!Ed.includes(t.tag.tag) ||
						!Object.entries(t.tag.props).find(
							([a, s]) => a.startsWith("on") && typeof s == "function"
						)
					)
						return;
					const { props: r, eventHandlers: n, delayedSrc: i } = e("dom", t.tag);
					Object.keys(n).length &&
						((t.tag.props = r),
						(t.tag._eventHandlers = n),
						(t.tag._delayedSrc = i));
				},
				"dom:renderTag": function (t) {
					const r = t.$el;
					if (!t.tag._eventHandlers || !r) return;
					const n =
						t.tag.tag === "bodyAttrs" && typeof window < "u" ? window : r;
					Object.entries(t.tag._eventHandlers).forEach(([i, a]) => {
						const s = `${t.tag._d || t.tag._p}:${i}`,
							o = i.slice(2).toLowerCase(),
							l = `data-h-${o}`;
						if ((delete t.staleSideEffects[s], r.hasAttribute(l))) return;
						const c = a;
						r.setAttribute(l, ""),
							n.addEventListener(o, c),
							t.entry &&
								(t.entry._sde[s] = () => {
									n.removeEventListener(o, c), r.removeAttribute(l);
								});
					}),
						t.tag._delayedSrc && r.setAttribute("src", t.tag._delayedSrc);
				},
			},
		};
	};
let Dm;
const By = (e) => (Dm = e),
	Bm = () => Dm;
async function Py(e, t) {
	const r = { tag: e, props: {} };
	return e === "title" || e === "titleTemplate"
		? ((r.children = t instanceof Promise ? await t : t), r)
		: ((r.props = await Ly({ ...t })),
		  ["children", "innerHtml", "innerHTML"].forEach((n) => {
				typeof r.props[n] < "u" &&
					((r.children = r.props[n]),
					typeof r.children == "object" &&
						(r.children = JSON.stringify(r.children)),
					delete r.props[n]);
		  }),
		  Object.keys(r.props)
				.filter((n) => Ty.includes(n))
				.forEach((n) => {
					(r[n] = r.props[n]), delete r.props[n];
				}),
		  typeof r.props.class == "object" &&
				!Array.isArray(r.props.class) &&
				(r.props.class = Object.keys(r.props.class).filter(
					(n) => r.props.class[n]
				)),
		  Array.isArray(r.props.class) && (r.props.class = r.props.class.join(" ")),
		  r.props.content && Array.isArray(r.props.content)
				? r.props.content.map((n, i) => {
						const a = { ...r, props: { ...r.props } };
						return (
							(a.props.content = n),
							(a.key = `${r.props.name || r.props.property}:${i}`),
							a
						);
				  })
				: r);
}
async function Ly(e) {
	for (const t of Object.keys(e))
		e[t] instanceof Promise && (e[t] = await e[t]),
			String(e[t]) === "true"
				? (e[t] = "")
				: String(e[t]) === "false" && delete e[t];
	return e;
}
const zy = 10;
async function $y(e) {
	const t = [];
	return (
		Object.entries(e.resolvedInput || e.input)
			.filter(([r, n]) => typeof n < "u" && Ey.includes(r))
			.forEach(([r, n]) => {
				const i = wy(n);
				t.push(...i.map((a) => Py(r, a)).flat());
			}),
		(await Promise.all(t))
			.flat()
			.map((r, n) => ((r._e = e._i), (r._p = (e._i << zy) + n), r))
	);
}
const Fy = () => [ky(), My(), Oy(), Iy(), Dy(), Ny()],
	Hy = (e = {}) => [
		Ay({
			document: e == null ? void 0 : e.document,
			delayFn: e == null ? void 0 : e.domDelayFn,
		}),
	];
function Uy(e = {}) {
	const t = jy({
		...e,
		plugins: [...Hy(e), ...((e == null ? void 0 : e.plugins) || [])],
	});
	return By(t), t;
}
function jy(e = {}) {
	let t = [],
		r = {},
		n = 0;
	const i = Rm();
	e != null && e.hooks && i.addHooks(e.hooks),
		(e.plugins = [...Fy(), ...((e == null ? void 0 : e.plugins) || [])]),
		e.plugins.forEach((o) => o.hooks && i.addHooks(o.hooks));
	const a = () => i.callHook("entries:updated", s),
		s = {
			resolvedOptions: e,
			headEntries() {
				return t;
			},
			get hooks() {
				return i;
			},
			use(o) {
				o.hooks && i.addHooks(o.hooks);
			},
			push(o, l) {
				const c = { _i: n++, input: o, _sde: {} };
				return (
					l != null && l.mode && (c._m = l == null ? void 0 : l.mode),
					t.push(c),
					a(),
					{
						dispose() {
							t = t.filter((u) =>
								u._i !== c._i
									? !0
									: ((r = { ...r, ...(u._sde || {}) }), (u._sde = {}), a(), !1)
							);
						},
						patch(u) {
							t = t.map(
								(d) => (d._i === c._i && ((c.input = d.input = u), a()), d)
							);
						},
					}
				);
			},
			async resolveTags() {
				const o = { tags: [], entries: [...t] };
				await i.callHook("entries:resolve", o);
				for (const l of o.entries)
					for (const c of await $y(l)) {
						const u = { tag: c, entry: l };
						await i.callHook("tag:normalise", u), o.tags.push(u.tag);
					}
				return await i.callHook("tags:resolve", o), o.tags;
			},
			_elMap: {},
			_popSideEffectQueue() {
				const o = { ...r };
				return (r = {}), o;
			},
		};
	return s.hooks.callHook("init", s), s;
}
function qy(e) {
	return typeof e == "function" ? e() : ct(e);
}
function vo(e, t = "") {
	if (e instanceof Promise) return e;
	const r = qy(e);
	if (!e || !r) return r;
	if (Array.isArray(r)) return r.map((n) => vo(n, t));
	if (typeof r == "object") {
		let n = !1;
		const i = Object.fromEntries(
			Object.entries(r).map(([a, s]) =>
				a === "titleTemplate" || a.startsWith("on")
					? [a, ct(s)]
					: ((typeof s == "function" || st(s)) && (n = !0), [a, vo(s, a)])
			)
		);
		return n && du.includes(String(t)) && (i._dynamic = !0), i;
	}
	return r;
}
const Gy = fu.startsWith("3"),
	Yy = typeof window < "u",
	Pm = "usehead";
function hu() {
	return (An() && Lt(Pm)) || Bm();
}
function Wy(e = {}) {
	const t = Uy({
			...e,
			domDelayFn: (n) => setTimeout(() => vn(() => n()), 10),
			plugins: [Vy(), ...((e == null ? void 0 : e.plugins) || [])],
		}),
		r = {
			install(n) {
				Gy && ((n.config.globalProperties.$unhead = t), n.provide(Pm, t));
			},
		};
	return (t.install = r.install), t;
}
const Vy = () => ({
	hooks: {
		"entries:resolve": function (e) {
			for (const t of e.entries) t.resolvedInput = vo(t.input);
		},
	},
});
function Ky(e, t = {}) {
	const r = hu(),
		n = _i(!1),
		i = _i({});
	X3(() => {
		i.value = n.value ? {} : vo(e);
	});
	const a = r.push(i.value, t);
	return (
		xi(i, (o) => {
			a.patch(o);
		}),
		An() &&
			(Yo(() => {
				a.dispose();
			}),
			qp(() => {
				n.value = !0;
			}),
			jp(() => {
				n.value = !1;
			})),
		a
	);
}
function Xy(e, t = {}) {
	return hu().push(e, t);
}
function Lm(e, t = {}) {
	var n;
	const r = hu();
	if (r) {
		const i = Yy || !!((n = r.resolvedOptions) != null && n.document);
		return (t.mode === "server" && i) || (t.mode === "client" && !i)
			? void 0
			: i
			? Ky(e, t)
			: Xy(e, t);
	}
}
function Jy(e) {
	const t = Wy(),
		r = {
			unhead: t,
			install(n) {
				fu.startsWith("3") &&
					((n.config.globalProperties.$head = t), n.provide("usehead", t));
			},
			use(n) {
				t.use(n);
			},
			resolveTags() {
				return t.resolveTags();
			},
			headEntries() {
				return t.headEntries();
			},
			headTags() {
				return t.resolveTags();
			},
			push(n, i) {
				return t.push(n, i);
			},
			addEntry(n, i) {
				return t.push(n, i);
			},
			addHeadObjs(n, i) {
				return t.push(n, i);
			},
			addReactiveEntry(n, i) {
				const a = Lm(n, i);
				return typeof a < "u" ? a.dispose : () => {};
			},
			removeHeadObjs() {},
			updateDOM(n, i) {
				i
					? Cm(t, { document: n })
					: Im(t, { delayFn: (a) => setTimeout(() => a(), 50), document: n });
			},
			internalHooks: t.hooks,
			hooks: { "before:dom": [], "resolved:tags": [], "resolved:entries": [] },
		};
	return (
		(t.addHeadObjs = r.addHeadObjs),
		(t.updateDOM = r.updateDOM),
		t.hooks.hook("dom:beforeRender", (n) => {
			for (const i of r.hooks["before:dom"])
				i() === !1 && (n.shouldRender = !1);
		}),
		e && r.addHeadObjs(e),
		r
	);
}
const Zy = {
		meta: [
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ charset: "utf-8" },
			{
				name: "facebook-domain-verification",
				content: "5y9s3n362dmfwvfk3gl7xf9qw0fqlq",
			},
		],
		link: [
			{
				rel: "preconnect",
				href: "https://github.githubassets.com/",
				crossorigin: !0,
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com/",
				crossorigin: !0,
			},
		],
		style: [],
		script: [
			{
				src: "https://static.cloudflareinsights.com/beacon.min.js",
				"data-cf-beacon": '{"token": "393a70f7207446539b84da589836560a"}',
			},
		],
		noscript: [],
	},
	ql = { name: "page", mode: "out-in" },
	Qy = !1,
	e8 = !1,
	t8 = "__nuxt",
	r8 = Ct((e) => {
		const t = Jy();
		t.push(Zy), e.vueApp.use(t);
		{
			let r = !0;
			const n = () => {
				(r = !1), t.internalHooks.callHook("entries:updated", t.unhead);
			};
			t.internalHooks.hook("dom:beforeRender", (i) => {
				i.shouldRender = !r;
			}),
				e.hooks.hook("page:start", () => {
					r = !0;
				}),
				e.hooks.hook("page:finish", n),
				e.hooks.hook("app:mounted", n);
		}
		e._useHead = Lm;
	});
/*!
 * vue-router v4.1.6
 * (c) 2022 Eduardo San Martin Morote
 * @license MIT
 */ const li = typeof window < "u";
function n8(e) {
	return e.__esModule || e[Symbol.toStringTag] === "Module";
}
const ze = Object.assign;
function $0(e, t) {
	const r = {};
	for (const n in t) {
		const i = t[n];
		r[n] = rr(i) ? i.map(e) : e(i);
	}
	return r;
}
const ka = () => {},
	rr = Array.isArray,
	i8 = /\/$/,
	a8 = (e) => e.replace(i8, "");
function F0(e, t, r = "/") {
	let n,
		i = {},
		a = "",
		s = "";
	const o = t.indexOf("#");
	let l = t.indexOf("?");
	return (
		o < l && o >= 0 && (l = -1),
		l > -1 &&
			((n = t.slice(0, l)),
			(a = t.slice(l + 1, o > -1 ? o : t.length)),
			(i = e(a))),
		o > -1 && ((n = n || t.slice(0, o)), (s = t.slice(o, t.length))),
		(n = c8(n ?? t, r)),
		{ fullPath: n + (a && "?") + a + s, path: n, query: i, hash: s }
	);
}
function s8(e, t) {
	const r = t.query ? e(t.query) : "";
	return t.path + (r && "?") + r + (t.hash || "");
}
function xd(e, t) {
	return !t || !e.toLowerCase().startsWith(t.toLowerCase())
		? e
		: e.slice(t.length) || "/";
}
function o8(e, t, r) {
	const n = t.matched.length - 1,
		i = r.matched.length - 1;
	return (
		n > -1 &&
		n === i &&
		zi(t.matched[n], r.matched[i]) &&
		zm(t.params, r.params) &&
		e(t.query) === e(r.query) &&
		t.hash === r.hash
	);
}
function zi(e, t) {
	return (e.aliasOf || e) === (t.aliasOf || t);
}
function zm(e, t) {
	if (Object.keys(e).length !== Object.keys(t).length) return !1;
	for (const r in e) if (!l8(e[r], t[r])) return !1;
	return !0;
}
function l8(e, t) {
	return rr(e) ? Td(e, t) : rr(t) ? Td(t, e) : e === t;
}
function Td(e, t) {
	return rr(t)
		? e.length === t.length && e.every((r, n) => r === t[n])
		: e.length === 1 && e[0] === t;
}
function c8(e, t) {
	if (e.startsWith("/")) return e;
	if (!e) return t;
	const r = t.split("/"),
		n = e.split("/");
	let i = r.length - 1,
		a,
		s;
	for (a = 0; a < n.length; a++)
		if (((s = n[a]), s !== "."))
			if (s === "..") i > 1 && i--;
			else break;
	return (
		r.slice(0, i).join("/") +
		"/" +
		n.slice(a - (a === n.length ? 1 : 0)).join("/")
	);
}
var Ga;
(function (e) {
	(e.pop = "pop"), (e.push = "push");
})(Ga || (Ga = {}));
var Aa;
(function (e) {
	(e.back = "back"), (e.forward = "forward"), (e.unknown = "");
})(Aa || (Aa = {}));
function u8(e) {
	if (!e)
		if (li) {
			const t = document.querySelector("base");
			(e = (t && t.getAttribute("href")) || "/"),
				(e = e.replace(/^\w+:\/\/[^\/]+/, ""));
		} else e = "/";
	return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), a8(e);
}
const f8 = /^[^#]+#/;
function d8(e, t) {
	return e.replace(f8, "#") + t;
}
function h8(e, t) {
	const r = document.documentElement.getBoundingClientRect(),
		n = e.getBoundingClientRect();
	return {
		behavior: t.behavior,
		left: n.left - r.left - (t.left || 0),
		top: n.top - r.top - (t.top || 0),
	};
}
const Zo = () => ({ left: window.pageXOffset, top: window.pageYOffset });
function p8(e) {
	let t;
	if ("el" in e) {
		const r = e.el,
			n = typeof r == "string" && r.startsWith("#"),
			i =
				typeof r == "string"
					? n
						? document.getElementById(r.slice(1))
						: document.querySelector(r)
					: r;
		if (!i) return;
		t = h8(i, e);
	} else t = e;
	"scrollBehavior" in document.documentElement.style
		? window.scrollTo(t)
		: window.scrollTo(
				t.left != null ? t.left : window.pageXOffset,
				t.top != null ? t.top : window.pageYOffset
		  );
}
function kd(e, t) {
	return (history.state ? history.state.position - t : -1) + e;
}
const Gl = new Map();
function m8(e, t) {
	Gl.set(e, t);
}
function g8(e) {
	const t = Gl.get(e);
	return Gl.delete(e), t;
}
let y8 = () => location.protocol + "//" + location.host;
function $m(e, t) {
	const { pathname: r, search: n, hash: i } = t,
		a = e.indexOf("#");
	if (a > -1) {
		let o = i.includes(e.slice(a)) ? e.slice(a).length : 1,
			l = i.slice(o);
		return l[0] !== "/" && (l = "/" + l), xd(l, "");
	}
	return xd(r, e) + n + i;
}
function b8(e, t, r, n) {
	let i = [],
		a = [],
		s = null;
	const o = ({ state: p }) => {
		const m = $m(e, location),
			b = r.value,
			E = t.value;
		let R = 0;
		if (p) {
			if (((r.value = m), (t.value = p), s && s === b)) {
				s = null;
				return;
			}
			R = E ? p.position - E.position : 0;
		} else n(m);
		i.forEach((_) => {
			_(r.value, b, {
				delta: R,
				type: Ga.pop,
				direction: R ? (R > 0 ? Aa.forward : Aa.back) : Aa.unknown,
			});
		});
	};
	function l() {
		s = r.value;
	}
	function c(p) {
		i.push(p);
		const m = () => {
			const b = i.indexOf(p);
			b > -1 && i.splice(b, 1);
		};
		return a.push(m), m;
	}
	function u() {
		const { history: p } = window;
		p.state && p.replaceState(ze({}, p.state, { scroll: Zo() }), "");
	}
	function d() {
		for (const p of a) p();
		(a = []),
			window.removeEventListener("popstate", o),
			window.removeEventListener("beforeunload", u);
	}
	return (
		window.addEventListener("popstate", o),
		window.addEventListener("beforeunload", u),
		{ pauseListeners: l, listen: c, destroy: d }
	);
}
function Ad(e, t, r, n = !1, i = !1) {
	return {
		back: e,
		current: t,
		forward: r,
		replaced: n,
		position: window.history.length,
		scroll: i ? Zo() : null,
	};
}
function v8(e) {
	const { history: t, location: r } = window,
		n = { value: $m(e, r) },
		i = { value: t.state };
	i.value ||
		a(
			n.value,
			{
				back: null,
				current: n.value,
				forward: null,
				position: t.length - 1,
				replaced: !0,
				scroll: null,
			},
			!0
		);
	function a(l, c, u) {
		const d = e.indexOf("#"),
			p =
				d > -1
					? (r.host && document.querySelector("base") ? e : e.slice(d)) + l
					: y8() + e + l;
		try {
			t[u ? "replaceState" : "pushState"](c, "", p), (i.value = c);
		} catch (m) {
			console.error(m), r[u ? "replace" : "assign"](p);
		}
	}
	function s(l, c) {
		const u = ze({}, t.state, Ad(i.value.back, l, i.value.forward, !0), c, {
			position: i.value.position,
		});
		a(l, u, !0), (n.value = l);
	}
	function o(l, c) {
		const u = ze({}, i.value, t.state, { forward: l, scroll: Zo() });
		a(u.current, u, !0);
		const d = ze({}, Ad(n.value, l, null), { position: u.position + 1 }, c);
		a(l, d, !1), (n.value = l);
	}
	return { location: n, state: i, push: o, replace: s };
}
function Fm(e) {
	e = u8(e);
	const t = v8(e),
		r = b8(e, t.state, t.location, t.replace);
	function n(a, s = !0) {
		s || r.pauseListeners(), history.go(a);
	}
	const i = ze(
		{ location: "", base: e, go: n, createHref: d8.bind(null, e) },
		t,
		r
	);
	return (
		Object.defineProperty(i, "location", {
			enumerable: !0,
			get: () => t.location.value,
		}),
		Object.defineProperty(i, "state", {
			enumerable: !0,
			get: () => t.state.value,
		}),
		i
	);
}
function _8(e) {
	return (
		(e = location.host ? e || location.pathname + location.search : ""),
		e.includes("#") || (e += "#"),
		Fm(e)
	);
}
function w8(e) {
	return typeof e == "string" || (e && typeof e == "object");
}
function Hm(e) {
	return typeof e == "string" || typeof e == "symbol";
}
const Vr = {
		path: "/",
		name: void 0,
		params: {},
		query: {},
		hash: "",
		fullPath: "/",
		matched: [],
		meta: {},
		redirectedFrom: void 0,
	},
	Um = Symbol("");
var Rd;
(function (e) {
	(e[(e.aborted = 4)] = "aborted"),
		(e[(e.cancelled = 8)] = "cancelled"),
		(e[(e.duplicated = 16)] = "duplicated");
})(Rd || (Rd = {}));
function $i(e, t) {
	return ze(new Error(), { type: e, [Um]: !0 }, t);
}
function vr(e, t) {
	return e instanceof Error && Um in e && (t == null || !!(e.type & t));
}
const Md = "[^/]+?",
	S8 = { sensitive: !1, strict: !1, start: !0, end: !0 },
	E8 = /[.+*?^${}()[\]/\\]/g;
function x8(e, t) {
	const r = ze({}, S8, t),
		n = [];
	let i = r.start ? "^" : "";
	const a = [];
	for (const c of e) {
		const u = c.length ? [] : [90];
		r.strict && !c.length && (i += "/");
		for (let d = 0; d < c.length; d++) {
			const p = c[d];
			let m = 40 + (r.sensitive ? 0.25 : 0);
			if (p.type === 0)
				d || (i += "/"), (i += p.value.replace(E8, "\\$&")), (m += 40);
			else if (p.type === 1) {
				const { value: b, repeatable: E, optional: R, regexp: _ } = p;
				a.push({ name: b, repeatable: E, optional: R });
				const v = _ || Md;
				if (v !== Md) {
					m += 10;
					try {
						new RegExp(`(${v})`);
					} catch (M) {
						throw new Error(
							`Invalid custom RegExp for param "${b}" (${v}): ` + M.message
						);
					}
				}
				let T = E ? `((?:${v})(?:/(?:${v}))*)` : `(${v})`;
				d || (T = R && c.length < 2 ? `(?:/${T})` : "/" + T),
					R && (T += "?"),
					(i += T),
					(m += 20),
					R && (m += -8),
					E && (m += -20),
					v === ".*" && (m += -50);
			}
			u.push(m);
		}
		n.push(u);
	}
	if (r.strict && r.end) {
		const c = n.length - 1;
		n[c][n[c].length - 1] += 0.7000000000000001;
	}
	r.strict || (i += "/?"), r.end ? (i += "$") : r.strict && (i += "(?:/|$)");
	const s = new RegExp(i, r.sensitive ? "" : "i");
	function o(c) {
		const u = c.match(s),
			d = {};
		if (!u) return null;
		for (let p = 1; p < u.length; p++) {
			const m = u[p] || "",
				b = a[p - 1];
			d[b.name] = m && b.repeatable ? m.split("/") : m;
		}
		return d;
	}
	function l(c) {
		let u = "",
			d = !1;
		for (const p of e) {
			(!d || !u.endsWith("/")) && (u += "/"), (d = !1);
			for (const m of p)
				if (m.type === 0) u += m.value;
				else if (m.type === 1) {
					const { value: b, repeatable: E, optional: R } = m,
						_ = b in c ? c[b] : "";
					if (rr(_) && !E)
						throw new Error(
							`Provided param "${b}" is an array but it is not repeatable (* or + modifiers)`
						);
					const v = rr(_) ? _.join("/") : _;
					if (!v)
						if (R)
							p.length < 2 &&
								(u.endsWith("/") ? (u = u.slice(0, -1)) : (d = !0));
						else throw new Error(`Missing required param "${b}"`);
					u += v;
				}
		}
		return u || "/";
	}
	return { re: s, score: n, keys: a, parse: o, stringify: l };
}
function T8(e, t) {
	let r = 0;
	for (; r < e.length && r < t.length; ) {
		const n = t[r] - e[r];
		if (n) return n;
		r++;
	}
	return e.length < t.length
		? e.length === 1 && e[0] === 40 + 40
			? -1
			: 1
		: e.length > t.length
		? t.length === 1 && t[0] === 40 + 40
			? 1
			: -1
		: 0;
}
function k8(e, t) {
	let r = 0;
	const n = e.score,
		i = t.score;
	for (; r < n.length && r < i.length; ) {
		const a = T8(n[r], i[r]);
		if (a) return a;
		r++;
	}
	if (Math.abs(i.length - n.length) === 1) {
		if (Od(n)) return 1;
		if (Od(i)) return -1;
	}
	return i.length - n.length;
}
function Od(e) {
	const t = e[e.length - 1];
	return e.length > 0 && t[t.length - 1] < 0;
}
const A8 = { type: 0, value: "" },
	R8 = /[a-zA-Z0-9_]/;
function M8(e) {
	if (!e) return [[]];
	if (e === "/") return [[A8]];
	if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);
	function t(m) {
		throw new Error(`ERR (${r})/"${c}": ${m}`);
	}
	let r = 0,
		n = r;
	const i = [];
	let a;
	function s() {
		a && i.push(a), (a = []);
	}
	let o = 0,
		l,
		c = "",
		u = "";
	function d() {
		c &&
			(r === 0
				? a.push({ type: 0, value: c })
				: r === 1 || r === 2 || r === 3
				? (a.length > 1 &&
						(l === "*" || l === "+") &&
						t(
							`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`
						),
				  a.push({
						type: 1,
						value: c,
						regexp: u,
						repeatable: l === "*" || l === "+",
						optional: l === "*" || l === "?",
				  }))
				: t("Invalid state to consume buffer"),
			(c = ""));
	}
	function p() {
		c += l;
	}
	for (; o < e.length; ) {
		if (((l = e[o++]), l === "\\" && r !== 2)) {
			(n = r), (r = 4);
			continue;
		}
		switch (r) {
			case 0:
				l === "/" ? (c && d(), s()) : l === ":" ? (d(), (r = 1)) : p();
				break;
			case 4:
				p(), (r = n);
				break;
			case 1:
				l === "("
					? (r = 2)
					: R8.test(l)
					? p()
					: (d(), (r = 0), l !== "*" && l !== "?" && l !== "+" && o--);
				break;
			case 2:
				l === ")"
					? u[u.length - 1] == "\\"
						? (u = u.slice(0, -1) + l)
						: (r = 3)
					: (u += l);
				break;
			case 3:
				d(), (r = 0), l !== "*" && l !== "?" && l !== "+" && o--, (u = "");
				break;
			default:
				t("Unknown state");
				break;
		}
	}
	return r === 2 && t(`Unfinished custom RegExp for param "${c}"`), d(), s(), i;
}
function O8(e, t, r) {
	const n = x8(M8(e.path), r),
		i = ze(n, { record: e, parent: t, children: [], alias: [] });
	return t && !i.record.aliasOf == !t.record.aliasOf && t.children.push(i), i;
}
function N8(e, t) {
	const r = [],
		n = new Map();
	t = Id({ strict: !1, end: !0, sensitive: !1 }, t);
	function i(u) {
		return n.get(u);
	}
	function a(u, d, p) {
		const m = !p,
			b = C8(u);
		b.aliasOf = p && p.record;
		const E = Id(t, u),
			R = [b];
		if ("alias" in u) {
			const T = typeof u.alias == "string" ? [u.alias] : u.alias;
			for (const M of T)
				R.push(
					ze({}, b, {
						components: p ? p.record.components : b.components,
						path: M,
						aliasOf: p ? p.record : b,
					})
				);
		}
		let _, v;
		for (const T of R) {
			const { path: M } = T;
			if (d && M[0] !== "/") {
				const O = d.record.path,
					B = O[O.length - 1] === "/" ? "" : "/";
				T.path = d.record.path + (M && B + M);
			}
			if (
				((_ = O8(T, d, E)),
				p
					? p.alias.push(_)
					: ((v = v || _),
					  v !== _ && v.alias.push(_),
					  m && u.name && !Cd(_) && s(u.name)),
				b.children)
			) {
				const O = b.children;
				for (let B = 0; B < O.length; B++) a(O[B], _, p && p.children[B]);
			}
			(p = p || _),
				((_.record.components && Object.keys(_.record.components).length) ||
					_.record.name ||
					_.record.redirect) &&
					l(_);
		}
		return v
			? () => {
					s(v);
			  }
			: ka;
	}
	function s(u) {
		if (Hm(u)) {
			const d = n.get(u);
			d &&
				(n.delete(u),
				r.splice(r.indexOf(d), 1),
				d.children.forEach(s),
				d.alias.forEach(s));
		} else {
			const d = r.indexOf(u);
			d > -1 &&
				(r.splice(d, 1),
				u.record.name && n.delete(u.record.name),
				u.children.forEach(s),
				u.alias.forEach(s));
		}
	}
	function o() {
		return r;
	}
	function l(u) {
		let d = 0;
		for (
			;
			d < r.length &&
			k8(u, r[d]) >= 0 &&
			(u.record.path !== r[d].record.path || !jm(u, r[d]));

		)
			d++;
		r.splice(d, 0, u), u.record.name && !Cd(u) && n.set(u.record.name, u);
	}
	function c(u, d) {
		let p,
			m = {},
			b,
			E;
		if ("name" in u && u.name) {
			if (((p = n.get(u.name)), !p)) throw $i(1, { location: u });
			(E = p.record.name),
				(m = ze(
					Nd(
						d.params,
						p.keys.filter((v) => !v.optional).map((v) => v.name)
					),
					u.params &&
						Nd(
							u.params,
							p.keys.map((v) => v.name)
						)
				)),
				(b = p.stringify(m));
		} else if ("path" in u)
			(b = u.path),
				(p = r.find((v) => v.re.test(b))),
				p && ((m = p.parse(b)), (E = p.record.name));
		else {
			if (((p = d.name ? n.get(d.name) : r.find((v) => v.re.test(d.path))), !p))
				throw $i(1, { location: u, currentLocation: d });
			(E = p.record.name),
				(m = ze({}, d.params, u.params)),
				(b = p.stringify(m));
		}
		const R = [];
		let _ = p;
		for (; _; ) R.unshift(_.record), (_ = _.parent);
		return { name: E, path: b, params: m, matched: R, meta: D8(R) };
	}
	return (
		e.forEach((u) => a(u)),
		{
			addRoute: a,
			resolve: c,
			removeRoute: s,
			getRoutes: o,
			getRecordMatcher: i,
		}
	);
}
function Nd(e, t) {
	const r = {};
	for (const n of t) n in e && (r[n] = e[n]);
	return r;
}
function C8(e) {
	return {
		path: e.path,
		redirect: e.redirect,
		name: e.name,
		meta: e.meta || {},
		aliasOf: void 0,
		beforeEnter: e.beforeEnter,
		props: I8(e),
		children: e.children || [],
		instances: {},
		leaveGuards: new Set(),
		updateGuards: new Set(),
		enterCallbacks: {},
		components:
			"components" in e
				? e.components || null
				: e.component && { default: e.component },
	};
}
function I8(e) {
	const t = {},
		r = e.props || !1;
	if ("component" in e) t.default = r;
	else for (const n in e.components) t[n] = typeof r == "boolean" ? r : r[n];
	return t;
}
function Cd(e) {
	for (; e; ) {
		if (e.record.aliasOf) return !0;
		e = e.parent;
	}
	return !1;
}
function D8(e) {
	return e.reduce((t, r) => ze(t, r.meta), {});
}
function Id(e, t) {
	const r = {};
	for (const n in e) r[n] = n in t ? t[n] : e[n];
	return r;
}
function jm(e, t) {
	return t.children.some((r) => r === e || jm(e, r));
}
const qm = /#/g,
	B8 = /&/g,
	P8 = /\//g,
	L8 = /=/g,
	z8 = /\?/g,
	Gm = /\+/g,
	$8 = /%5B/g,
	F8 = /%5D/g,
	Ym = /%5E/g,
	H8 = /%60/g,
	Wm = /%7B/g,
	U8 = /%7C/g,
	Vm = /%7D/g,
	j8 = /%20/g;
function pu(e) {
	return encodeURI("" + e)
		.replace(U8, "|")
		.replace($8, "[")
		.replace(F8, "]");
}
function q8(e) {
	return pu(e).replace(Wm, "{").replace(Vm, "}").replace(Ym, "^");
}
function Yl(e) {
	return pu(e)
		.replace(Gm, "%2B")
		.replace(j8, "+")
		.replace(qm, "%23")
		.replace(B8, "%26")
		.replace(H8, "`")
		.replace(Wm, "{")
		.replace(Vm, "}")
		.replace(Ym, "^");
}
function G8(e) {
	return Yl(e).replace(L8, "%3D");
}
function Y8(e) {
	return pu(e).replace(qm, "%23").replace(z8, "%3F");
}
function W8(e) {
	return e == null ? "" : Y8(e).replace(P8, "%2F");
}
function _o(e) {
	try {
		return decodeURIComponent("" + e);
	} catch {}
	return "" + e;
}
function V8(e) {
	const t = {};
	if (e === "" || e === "?") return t;
	const n = (e[0] === "?" ? e.slice(1) : e).split("&");
	for (let i = 0; i < n.length; ++i) {
		const a = n[i].replace(Gm, " "),
			s = a.indexOf("="),
			o = _o(s < 0 ? a : a.slice(0, s)),
			l = s < 0 ? null : _o(a.slice(s + 1));
		if (o in t) {
			let c = t[o];
			rr(c) || (c = t[o] = [c]), c.push(l);
		} else t[o] = l;
	}
	return t;
}
function Dd(e) {
	let t = "";
	for (let r in e) {
		const n = e[r];
		if (((r = G8(r)), n == null)) {
			n !== void 0 && (t += (t.length ? "&" : "") + r);
			continue;
		}
		(rr(n) ? n.map((a) => a && Yl(a)) : [n && Yl(n)]).forEach((a) => {
			a !== void 0 &&
				((t += (t.length ? "&" : "") + r), a != null && (t += "=" + a));
		});
	}
	return t;
}
function K8(e) {
	const t = {};
	for (const r in e) {
		const n = e[r];
		n !== void 0 &&
			(t[r] = rr(n)
				? n.map((i) => (i == null ? null : "" + i))
				: n == null
				? n
				: "" + n);
	}
	return t;
}
const X8 = Symbol(""),
	Bd = Symbol(""),
	mu = Symbol(""),
	gu = Symbol(""),
	Wl = Symbol("");
function fa() {
	let e = [];
	function t(n) {
		return (
			e.push(n),
			() => {
				const i = e.indexOf(n);
				i > -1 && e.splice(i, 1);
			}
		);
	}
	function r() {
		e = [];
	}
	return { add: t, list: () => e, reset: r };
}
function Zr(e, t, r, n, i) {
	const a = n && (n.enterCallbacks[i] = n.enterCallbacks[i] || []);
	return () =>
		new Promise((s, o) => {
			const l = (d) => {
					d === !1
						? o($i(4, { from: r, to: t }))
						: d instanceof Error
						? o(d)
						: w8(d)
						? o($i(2, { from: t, to: d }))
						: (a &&
								n.enterCallbacks[i] === a &&
								typeof d == "function" &&
								a.push(d),
						  s());
				},
				c = e.call(n && n.instances[i], t, r, l);
			let u = Promise.resolve(c);
			e.length < 3 && (u = u.then(l)), u.catch((d) => o(d));
		});
}
function H0(e, t, r, n) {
	const i = [];
	for (const a of e)
		for (const s in a.components) {
			let o = a.components[s];
			if (!(t !== "beforeRouteEnter" && !a.instances[s]))
				if (J8(o)) {
					const c = (o.__vccOpts || o)[t];
					c && i.push(Zr(c, r, n, a, s));
				} else {
					let l = o();
					i.push(() =>
						l.then((c) => {
							if (!c)
								return Promise.reject(
									new Error(`Couldn't resolve component "${s}" at "${a.path}"`)
								);
							const u = n8(c) ? c.default : c;
							a.components[s] = u;
							const p = (u.__vccOpts || u)[t];
							return p && Zr(p, r, n, a, s)();
						})
					);
				}
		}
	return i;
}
function J8(e) {
	return (
		typeof e == "object" ||
		"displayName" in e ||
		"props" in e ||
		"__vccOpts" in e
	);
}
function Pd(e) {
	const t = Lt(mu),
		r = Lt(gu),
		n = Et(() => t.resolve(ct(e.to))),
		i = Et(() => {
			const { matched: l } = n.value,
				{ length: c } = l,
				u = l[c - 1],
				d = r.matched;
			if (!u || !d.length) return -1;
			const p = d.findIndex(zi.bind(null, u));
			if (p > -1) return p;
			const m = Ld(l[c - 2]);
			return c > 1 && Ld(u) === m && d[d.length - 1].path !== m
				? d.findIndex(zi.bind(null, l[c - 2]))
				: p;
		}),
		a = Et(() => i.value > -1 && tb(r.params, n.value.params)),
		s = Et(
			() =>
				i.value > -1 &&
				i.value === r.matched.length - 1 &&
				zm(r.params, n.value.params)
		);
	function o(l = {}) {
		return eb(l)
			? t[ct(e.replace) ? "replace" : "push"](ct(e.to)).catch(ka)
			: Promise.resolve();
	}
	return {
		route: n,
		href: Et(() => n.value.href),
		isActive: a,
		isExactActive: s,
		navigate: o,
	};
}
const Z8 = Lr({
		name: "RouterLink",
		compatConfig: { MODE: 3 },
		props: {
			to: { type: [String, Object], required: !0 },
			replace: Boolean,
			activeClass: String,
			exactActiveClass: String,
			custom: Boolean,
			ariaCurrentValue: { type: String, default: "page" },
		},
		useLink: Pd,
		setup(e, { slots: t }) {
			const r = pr(Pd(e)),
				{ options: n } = Lt(mu),
				i = Et(() => ({
					[zd(e.activeClass, n.linkActiveClass, "router-link-active")]:
						r.isActive,
					[zd(
						e.exactActiveClass,
						n.linkExactActiveClass,
						"router-link-exact-active"
					)]: r.isExactActive,
				}));
			return () => {
				const a = t.default && t.default(r);
				return e.custom
					? a
					: er(
							"a",
							{
								"aria-current": r.isExactActive ? e.ariaCurrentValue : null,
								href: r.href,
								onClick: r.navigate,
								class: i.value,
							},
							a
					  );
			};
		},
	}),
	Q8 = Z8;
function eb(e) {
	if (
		!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) &&
		!e.defaultPrevented &&
		!(e.button !== void 0 && e.button !== 0)
	) {
		if (e.currentTarget && e.currentTarget.getAttribute) {
			const t = e.currentTarget.getAttribute("target");
			if (/\b_blank\b/i.test(t)) return;
		}
		return e.preventDefault && e.preventDefault(), !0;
	}
}
function tb(e, t) {
	for (const r in t) {
		const n = t[r],
			i = e[r];
		if (typeof n == "string") {
			if (n !== i) return !1;
		} else if (!rr(i) || i.length !== n.length || n.some((a, s) => a !== i[s]))
			return !1;
	}
	return !0;
}
function Ld(e) {
	return e ? (e.aliasOf ? e.aliasOf.path : e.path) : "";
}
const zd = (e, t, r) => e ?? t ?? r,
	rb = Lr({
		name: "RouterView",
		inheritAttrs: !1,
		props: { name: { type: String, default: "default" }, route: Object },
		compatConfig: { MODE: 3 },
		setup(e, { attrs: t, slots: r }) {
			const n = Lt(Wl),
				i = Et(() => e.route || n.value),
				a = Lt(Bd, 0),
				s = Et(() => {
					let c = ct(a);
					const { matched: u } = i.value;
					let d;
					for (; (d = u[c]) && !d.components; ) c++;
					return c;
				}),
				o = Et(() => i.value.matched[s.value]);
			Ei(
				Bd,
				Et(() => s.value + 1)
			),
				Ei(X8, o),
				Ei(Wl, i);
			const l = _i();
			return (
				xi(
					() => [l.value, o.value, e.name],
					([c, u, d], [p, m, b]) => {
						u &&
							((u.instances[d] = c),
							m &&
								m !== u &&
								c &&
								c === p &&
								(u.leaveGuards.size || (u.leaveGuards = m.leaveGuards),
								u.updateGuards.size || (u.updateGuards = m.updateGuards))),
							c &&
								u &&
								(!m || !zi(u, m) || !p) &&
								(u.enterCallbacks[d] || []).forEach((E) => E(c));
					},
					{ flush: "post" }
				),
				() => {
					const c = i.value,
						u = e.name,
						d = o.value,
						p = d && d.components[u];
					if (!p) return $d(r.default, { Component: p, route: c });
					const m = d.props[u],
						b = m
							? m === !0
								? c.params
								: typeof m == "function"
								? m(c)
								: m
							: null,
						R = er(
							p,
							ze({}, b, t, {
								onVnodeUnmounted: (_) => {
									_.component.isUnmounted && (d.instances[u] = null);
								},
								ref: l,
							})
						);
					return $d(r.default, { Component: R, route: c }) || R;
				}
			);
		},
	});
function $d(e, t) {
	if (!e) return null;
	const r = e(t);
	return r.length === 1 ? r[0] : r;
}
const Km = rb;
function nb(e) {
	const t = N8(e.routes, e),
		r = e.parseQuery || V8,
		n = e.stringifyQuery || Dd,
		i = e.history,
		a = fa(),
		s = fa(),
		o = fa(),
		l = Rl(Vr);
	let c = Vr;
	li &&
		e.scrollBehavior &&
		"scrollRestoration" in history &&
		(history.scrollRestoration = "manual");
	const u = $0.bind(null, (L) => "" + L),
		d = $0.bind(null, W8),
		p = $0.bind(null, _o);
	function m(L, se) {
		let ne, de;
		return (
			Hm(L) ? ((ne = t.getRecordMatcher(L)), (de = se)) : (de = L),
			t.addRoute(de, ne)
		);
	}
	function b(L) {
		const se = t.getRecordMatcher(L);
		se && t.removeRoute(se);
	}
	function E() {
		return t.getRoutes().map((L) => L.record);
	}
	function R(L) {
		return !!t.getRecordMatcher(L);
	}
	function _(L, se) {
		if (((se = ze({}, se || l.value)), typeof L == "string")) {
			const w = F0(r, L, se.path),
				k = t.resolve({ path: w.path }, se),
				C = i.createHref(w.fullPath);
			return ze(w, k, {
				params: p(k.params),
				hash: _o(w.hash),
				redirectedFrom: void 0,
				href: C,
			});
		}
		let ne;
		if ("path" in L) ne = ze({}, L, { path: F0(r, L.path, se.path).path });
		else {
			const w = ze({}, L.params);
			for (const k in w) w[k] == null && delete w[k];
			(ne = ze({}, L, { params: d(L.params) })), (se.params = d(se.params));
		}
		const de = t.resolve(ne, se),
			Ae = L.hash || "";
		de.params = u(p(de.params));
		const Le = s8(n, ze({}, L, { hash: q8(Ae), path: de.path })),
			xe = i.createHref(Le);
		return ze(
			{ fullPath: Le, hash: Ae, query: n === Dd ? K8(L.query) : L.query || {} },
			de,
			{ redirectedFrom: void 0, href: xe }
		);
	}
	function v(L) {
		return typeof L == "string" ? F0(r, L, l.value.path) : ze({}, L);
	}
	function T(L, se) {
		if (c !== L) return $i(8, { from: se, to: L });
	}
	function M(L) {
		return z(L);
	}
	function O(L) {
		return M(ze(v(L), { replace: !0 }));
	}
	function B(L) {
		const se = L.matched[L.matched.length - 1];
		if (se && se.redirect) {
			const { redirect: ne } = se;
			let de = typeof ne == "function" ? ne(L) : ne;
			return (
				typeof de == "string" &&
					((de =
						de.includes("?") || de.includes("#") ? (de = v(de)) : { path: de }),
					(de.params = {})),
				ze(
					{
						query: L.query,
						hash: L.hash,
						params: "path" in de ? {} : L.params,
					},
					de
				)
			);
		}
	}
	function z(L, se) {
		const ne = (c = _(L)),
			de = l.value,
			Ae = L.state,
			Le = L.force,
			xe = L.replace === !0,
			w = B(ne);
		if (w)
			return z(
				ze(v(w), {
					state: typeof w == "object" ? ze({}, Ae, w.state) : Ae,
					force: Le,
					replace: xe,
				}),
				se || ne
			);
		const k = ne;
		k.redirectedFrom = se;
		let C;
		return (
			!Le &&
				o8(n, de, ne) &&
				((C = $i(16, { to: k, from: de })), Te(de, de, !0, !1)),
			(C ? Promise.resolve(C) : H(k, de))
				.catch(($) => (vr($) ? (vr($, 2) ? $ : ye($)) : K($, k, de)))
				.then(($) => {
					if ($) {
						if (vr($, 2))
							return z(
								ze({ replace: xe }, v($.to), {
									state: typeof $.to == "object" ? ze({}, Ae, $.to.state) : Ae,
									force: Le,
								}),
								se || k
							);
					} else $ = te(k, de, !0, xe, Ae);
					return Q(k, de, $), $;
				})
		);
	}
	function D(L, se) {
		const ne = T(L, se);
		return ne ? Promise.reject(ne) : Promise.resolve();
	}
	function H(L, se) {
		let ne;
		const [de, Ae, Le] = ib(L, se);
		ne = H0(de.reverse(), "beforeRouteLeave", L, se);
		for (const w of de)
			w.leaveGuards.forEach((k) => {
				ne.push(Zr(k, L, se));
			});
		const xe = D.bind(null, L, se);
		return (
			ne.push(xe),
			ii(ne)
				.then(() => {
					ne = [];
					for (const w of a.list()) ne.push(Zr(w, L, se));
					return ne.push(xe), ii(ne);
				})
				.then(() => {
					ne = H0(Ae, "beforeRouteUpdate", L, se);
					for (const w of Ae)
						w.updateGuards.forEach((k) => {
							ne.push(Zr(k, L, se));
						});
					return ne.push(xe), ii(ne);
				})
				.then(() => {
					ne = [];
					for (const w of L.matched)
						if (w.beforeEnter && !se.matched.includes(w))
							if (rr(w.beforeEnter))
								for (const k of w.beforeEnter) ne.push(Zr(k, L, se));
							else ne.push(Zr(w.beforeEnter, L, se));
					return ne.push(xe), ii(ne);
				})
				.then(
					() => (
						L.matched.forEach((w) => (w.enterCallbacks = {})),
						(ne = H0(Le, "beforeRouteEnter", L, se)),
						ne.push(xe),
						ii(ne)
					)
				)
				.then(() => {
					ne = [];
					for (const w of s.list()) ne.push(Zr(w, L, se));
					return ne.push(xe), ii(ne);
				})
				.catch((w) => (vr(w, 8) ? w : Promise.reject(w)))
		);
	}
	function Q(L, se, ne) {
		for (const de of o.list()) de(L, se, ne);
	}
	function te(L, se, ne, de, Ae) {
		const Le = T(L, se);
		if (Le) return Le;
		const xe = se === Vr,
			w = li ? history.state : {};
		ne &&
			(de || xe
				? i.replace(L.fullPath, ze({ scroll: xe && w && w.scroll }, Ae))
				: i.push(L.fullPath, Ae)),
			(l.value = L),
			Te(L, se, ne, xe),
			ye();
	}
	let q;
	function oe() {
		q ||
			(q = i.listen((L, se, ne) => {
				if (!Je.listening) return;
				const de = _(L),
					Ae = B(de);
				if (Ae) {
					z(ze(Ae, { replace: !0 }), de).catch(ka);
					return;
				}
				c = de;
				const Le = l.value;
				li && m8(kd(Le.fullPath, ne.delta), Zo()),
					H(de, Le)
						.catch((xe) =>
							vr(xe, 12)
								? xe
								: vr(xe, 2)
								? (z(xe.to, de)
										.then((w) => {
											vr(w, 20) &&
												!ne.delta &&
												ne.type === Ga.pop &&
												i.go(-1, !1);
										})
										.catch(ka),
								  Promise.reject())
								: (ne.delta && i.go(-ne.delta, !1), K(xe, de, Le))
						)
						.then((xe) => {
							(xe = xe || te(de, Le, !1)),
								xe &&
									(ne.delta && !vr(xe, 8)
										? i.go(-ne.delta, !1)
										: ne.type === Ga.pop && vr(xe, 20) && i.go(-1, !1)),
								Q(de, Le, xe);
						})
						.catch(ka);
			}));
	}
	let W = fa(),
		Ee = fa(),
		I;
	function K(L, se, ne) {
		ye(L);
		const de = Ee.list();
		return (
			de.length ? de.forEach((Ae) => Ae(L, se, ne)) : console.error(L),
			Promise.reject(L)
		);
	}
	function ie() {
		return I && l.value !== Vr
			? Promise.resolve()
			: new Promise((L, se) => {
					W.add([L, se]);
			  });
	}
	function ye(L) {
		return (
			I ||
				((I = !L),
				oe(),
				W.list().forEach(([se, ne]) => (L ? ne(L) : se())),
				W.reset()),
			L
		);
	}
	function Te(L, se, ne, de) {
		const { scrollBehavior: Ae } = e;
		if (!li || !Ae) return Promise.resolve();
		const Le =
			(!ne && g8(kd(L.fullPath, 0))) ||
			((de || !ne) && history.state && history.state.scroll) ||
			null;
		return vn()
			.then(() => Ae(L, se, Le))
			.then((xe) => xe && p8(xe))
			.catch((xe) => K(xe, L, se));
	}
	const Ne = (L) => i.go(L);
	let Me;
	const ut = new Set(),
		Je = {
			currentRoute: l,
			listening: !0,
			addRoute: m,
			removeRoute: b,
			hasRoute: R,
			getRoutes: E,
			resolve: _,
			options: e,
			push: M,
			replace: O,
			go: Ne,
			back: () => Ne(-1),
			forward: () => Ne(1),
			beforeEach: a.add,
			beforeResolve: s.add,
			afterEach: o.add,
			onError: Ee.add,
			isReady: ie,
			install(L) {
				const se = this;
				L.component("RouterLink", Q8),
					L.component("RouterView", Km),
					(L.config.globalProperties.$router = se),
					Object.defineProperty(L.config.globalProperties, "$route", {
						enumerable: !0,
						get: () => ct(l),
					}),
					li &&
						!Me &&
						l.value === Vr &&
						((Me = !0), M(i.location).catch((Ae) => {}));
				const ne = {};
				for (const Ae in Vr) ne[Ae] = Et(() => l.value[Ae]);
				L.provide(mu, se), L.provide(gu, pr(ne)), L.provide(Wl, l);
				const de = L.unmount;
				ut.add(L),
					(L.unmount = function () {
						ut.delete(L),
							ut.size < 1 &&
								((c = Vr),
								q && q(),
								(q = null),
								(l.value = Vr),
								(Me = !1),
								(I = !1)),
							de();
					});
			},
		};
	return Je;
}
function ii(e) {
	return e.reduce((t, r) => t.then(() => r()), Promise.resolve());
}
function ib(e, t) {
	const r = [],
		n = [],
		i = [],
		a = Math.max(t.matched.length, e.matched.length);
	for (let s = 0; s < a; s++) {
		const o = t.matched[s];
		o && (e.matched.find((c) => zi(c, o)) ? n.push(o) : r.push(o));
		const l = e.matched[s];
		l && (t.matched.find((c) => zi(c, l)) || i.push(l));
	}
	return [r, n, i];
}
function ab() {
	return Lt(gu);
}
function U0(e) {
	return e !== null && typeof e == "object";
}
function Vl(e, t, r = ".", n) {
	if (!U0(t)) return Vl(e, {}, r, n);
	const i = Object.assign({}, t);
	for (const a in e) {
		if (a === "__proto__" || a === "constructor") continue;
		const s = e[a];
		s != null &&
			((n && n(i, a, s, r)) ||
				(Array.isArray(s) && Array.isArray(i[a])
					? (i[a] = [...s, ...i[a]])
					: U0(s) && U0(i[a])
					? (i[a] = Vl(s, i[a], (r ? `${r}.` : "") + a.toString(), n))
					: (i[a] = s)));
	}
	return i;
}
function Xm(e) {
	return (...t) => t.reduce((r, n) => Vl(r, n, "", e), {});
}
const yu = Xm(),
	sb = Xm((e, t, r) => {
		if (typeof e[t] < "u" && typeof r == "function")
			return (e[t] = r(e[t])), !0;
	});
class Kl extends Error {
	constructor() {
		super(...arguments),
			(this.statusCode = 500),
			(this.fatal = !1),
			(this.unhandled = !1),
			(this.statusMessage = void 0);
	}
	toJSON() {
		const t = { message: this.message, statusCode: Jl(this.statusCode, 500) };
		return (
			this.statusMessage && (t.statusMessage = Jm(this.statusMessage)),
			this.data !== void 0 && (t.data = this.data),
			t
		);
	}
}
Kl.__h3_error__ = !0;
function Xl(e) {
	if (typeof e == "string") return new Kl(e);
	if (ob(e)) return e;
	const t = new Kl(
		e.message ?? e.statusMessage,
		e.cause ? { cause: e.cause } : void 0
	);
	if ("stack" in e)
		try {
			Object.defineProperty(t, "stack", {
				get() {
					return e.stack;
				},
			});
		} catch {
			try {
				t.stack = e.stack;
			} catch {}
		}
	if (
		(e.data && (t.data = e.data),
		e.statusCode
			? (t.statusCode = Jl(e.statusCode, t.statusCode))
			: e.status && (t.statusCode = Jl(e.status, t.statusCode)),
		e.statusMessage
			? (t.statusMessage = e.statusMessage)
			: e.statusText && (t.statusMessage = e.statusText),
		t.statusMessage)
	) {
		const r = t.statusMessage;
		Jm(t.statusMessage) !== r &&
			console.warn(
				"[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future `statusMessage` will be sanitized by default."
			);
	}
	return (
		e.fatal !== void 0 && (t.fatal = e.fatal),
		e.unhandled !== void 0 && (t.unhandled = e.unhandled),
		t
	);
}
function ob(e) {
	var t;
	return (
		((t = e == null ? void 0 : e.constructor) == null
			? void 0
			: t.__h3_error__) === !0
	);
}
const lb = /[^\u0009\u0020-\u007E]/g;
function Jm(e = "") {
	return e.replace(lb, "");
}
function Jl(e, t = 200) {
	return !e ||
		(typeof e == "string" && (e = Number.parseInt(e, 10)), e < 100 || e > 999)
		? t
		: e;
}
const Qo = () => eu(Re().payload, "error"),
	di = (e) => {
		const t = Zm(e);
		try {
			Re().callHook("app:error", t);
			const n = Qo();
			n.value = n.value || t;
		} catch {
			throw t;
		}
		return t;
	},
	cb = async (e = {}) => {
		const t = Re(),
			r = Qo();
		t.callHook("app:error:cleared", e),
			e.redirect && (await t.$router.replace(e.redirect)),
			(r.value = null);
	},
	ub = (e) => !!(e && typeof e == "object" && "__nuxt_error" in e),
	Zm = (e) => {
		const t = Xl(e);
		return (t.__nuxt_error = !0), t;
	};
function fb(...e) {
	const t = typeof e[e.length - 1] == "string" ? e.pop() : void 0;
	typeof e[0] != "string" && e.unshift(t);
	const [r, n] = e;
	if (!r || typeof r != "string")
		throw new TypeError("[nuxt] [useState] key must be a string: " + r);
	if (n !== void 0 && typeof n != "function")
		throw new Error("[nuxt] [useState] init must be a function: " + n);
	const i = "$s" + r,
		a = Re(),
		s = eu(a.payload.state, i);
	if (s.value === void 0 && n) {
		const o = n();
		if (st(o)) return (a.payload.state[i] = o), o;
		s.value = o;
	}
	return s;
}
const ds = () => {
		var e;
		return (e = Re()) == null ? void 0 : e.$router;
	},
	bu = () => (An() ? Lt("_route", Re()._route) : Re()._route),
	Qm = (e) => e,
	db = () => {
		try {
			if (Re()._processingMiddleware) return !0;
		} catch {
			return !0;
		}
		return !1;
	},
	hb = (e, t) => {
		e || (e = "/");
		const r = typeof e == "string" ? e : e.path || "/",
			n = Kn(r, !0);
		if (n && !(t != null && t.external))
			throw new Error(
				"Navigating to external URL is not allowed by default. Use `navigateTo (url, { external: true })`."
			);
		if (n && fs(r).protocol === "script:")
			throw new Error("Cannot navigate to an URL with script protocol.");
		if (!n && db()) return e;
		const i = ds();
		return n
			? (t != null && t.replace ? location.replace(r) : (location.href = r),
			  Promise.resolve())
			: t != null && t.replace
			? i.replace(e)
			: i.push(e);
	},
	pb = "modulepreload",
	mb = function (e, t) {
		return e.startsWith(".") ? new URL(e, t).href : e;
	},
	Fd = {},
	gb = function (t, r, n) {
		if (!r || r.length === 0) return t();
		const i = document.getElementsByTagName("link");
		return Promise.all(
			r.map((a) => {
				if (((a = mb(a, n)), a in Fd)) return;
				Fd[a] = !0;
				const s = a.endsWith(".css"),
					o = s ? '[rel="stylesheet"]' : "";
				if (!!n)
					for (let u = i.length - 1; u >= 0; u--) {
						const d = i[u];
						if (d.href === a && (!s || d.rel === "stylesheet")) return;
					}
				else if (document.querySelector(`link[href="${a}"]${o}`)) return;
				const c = document.createElement("link");
				if (
					((c.rel = s ? "stylesheet" : pb),
					s || ((c.as = "script"), (c.crossOrigin = "")),
					(c.href = a),
					document.head.appendChild(c),
					s)
				)
					return new Promise((u, d) => {
						c.addEventListener("load", u),
							c.addEventListener("error", () =>
								d(new Error(`Unable to preload CSS for ${a}`))
							);
					});
			})
		).then(() => t());
	},
	Ze = (...e) =>
		gb(...e).catch((t) => {
			const r = new Event("nuxt.preloadError");
			throw ((r.payload = t), window.dispatchEvent(r), t);
		}),
	Hd = [
		{
			name: "locale-preview-params",
			path: "/:locale/preview/:params(.*)*",
			children: [],
			meta: {},
			alias: [],
			redirect: void 0,
			component: () =>
				Ze(
					() => import("./_...params_.66fdc45a.js"),
					["./_...params_.66fdc45a.js", "./usePreviewToken.81b6aab9.js"],
					import.meta.url
				).then((e) => e.default || e),
		},
		{
			name: "parent-child-slug",
			path: "/:parent/:child?/:slug",
			children: [],
			meta: {},
			alias: [],
			redirect: void 0,
			component: () =>
				Ze(
					() => import("./_slug_.19f4dd46.js"),
					[
						"./_slug_.19f4dd46.js",
						"./Landing.df64328f.js",
						"./Footer.e6485fe5.js",
						"./usePageTransition.c85436b5.js",
						"./Footer.9aabec20.css",
						"./Blocks.44438b3b.js",
						"./BlockTimedTabs.vue.d0651cc9.js",
						"./BlockTimedTabs.944c46ae.css",
						"./Listing.a298d72a.js",
						"./slugify.3ca60c52.js",
						"./useResourceIndexData.dc2ced4d.js",
						"./useHeadSeo.d3db824e.js",
						"./usePageLoading.6c7406d2.js",
						"./List.4457a9db.js",
						"./Detail.befef1e5.css",
						"./usePreviewToken.81b6aab9.js",
						"./useErrorPage.23109362.js",
						"./lang.4a9029fb.js",
					],
					import.meta.url
				).then((e) => e.default || e),
		},
		{
			name: "slug",
			path: "/:slug",
			children: [],
			meta: {},
			alias: [],
			redirect: void 0,
			component: () =>
				Ze(
					() => import("./_slug_.2c64d510.js"),
					[
						"./_slug_.2c64d510.js",
						"./Product.a4206206.js",
						"./Footer.e6485fe5.js",
						"./usePageTransition.c85436b5.js",
						"./Footer.9aabec20.css",
						"./Blocks.44438b3b.js",
						"./BlockTimedTabs.vue.d0651cc9.js",
						"./BlockTimedTabs.944c46ae.css",
						"./Listing.a298d72a.js",
						"./slugify.3ca60c52.js",
						"./useResourceIndexData.dc2ced4d.js",
						"./useHeadSeo.d3db824e.js",
						"./usePageLoading.6c7406d2.js",
						"./Landing.df64328f.js",
						"./List.4457a9db.js",
						"./Detail.befef1e5.css",
						"./usePreviewToken.81b6aab9.js",
						"./useErrorPage.23109362.js",
						"./lang.4a9029fb.js",
					],
					import.meta.url
				).then((e) => e.default || e),
		},
		{
			name: "blog-slug",
			path: "/blog/:slug",
			children: [],
			meta: {},
			alias: [],
			redirect: void 0,
			component: () =>
				Ze(
					() => import("./_slug_.dac61aba.js"),
					[
						"./_slug_.dac61aba.js",
						"./Footer.e6485fe5.js",
						"./usePageTransition.c85436b5.js",
						"./Footer.9aabec20.css",
						"./HeroMeta.7906402e.js",
						"./Blocks.44438b3b.js",
						"./BlockTimedTabs.vue.d0651cc9.js",
						"./BlockTimedTabs.944c46ae.css",
						"./Listing.a298d72a.js",
						"./slugify.3ca60c52.js",
						"./useResourceIndexData.dc2ced4d.js",
						"./useHeadSeo.d3db824e.js",
						"./usePageLoading.6c7406d2.js",
						"./List.4457a9db.js",
						"./ResearchPublications.8d82d2af.js",
						"./usePreviewToken.81b6aab9.js",
						"./useErrorPage.23109362.js",
						"./lang.4a9029fb.js",
					],
					import.meta.url
				).then((e) => e.default || e),
		},
		{
			name: "blog",
			path: "/blog",
			children: [],
			url: "/blog",
			meta: {},
			alias: [],
			redirect: void 0,
			component: () =>
				Ze(
					() => import("./index.8a3e3f3c.js"),
					[
						"./index.8a3e3f3c.js",
						"./Footer.e6485fe5.js",
						"./usePageTransition.c85436b5.js",
						"./Footer.9aabec20.css",
						"./Blocks.44438b3b.js",
						"./BlockTimedTabs.vue.d0651cc9.js",
						"./BlockTimedTabs.944c46ae.css",
						"./Listing.a298d72a.js",
						"./slugify.3ca60c52.js",
						"./useResourceIndexData.dc2ced4d.js",
						"./useHeadSeo.d3db824e.js",
						"./usePageLoading.6c7406d2.js",
						"./Blog.4476b770.js",
						"./indexComponents.44e4cc59.js",
						"./usePreviewToken.81b6aab9.js",
						"./useErrorPage.23109362.js",
						"./lang.4a9029fb.js",
					],
					import.meta.url
				).then((e) => e.default || e),
		},
		{
			name: "blog-series-slug",
			path: "/blog/series/:slug",
			children: [],
			meta: {},
			alias: [],
			redirect: void 0,
			component: () =>
				Ze(
					() => import("./_slug_.8b3c0e2f.js"),
					[
						"./_slug_.8b3c0e2f.js",
						"./Footer.e6485fe5.js",
						"./usePageTransition.c85436b5.js",
						"./Footer.9aabec20.css",
						"./Blocks.44438b3b.js",
						"./BlockTimedTabs.vue.d0651cc9.js",
						"./BlockTimedTabs.944c46ae.css",
						"./Listing.a298d72a.js",
						"./slugify.3ca60c52.js",
						"./useResourceIndexData.dc2ced4d.js",
						"./useHeadSeo.d3db824e.js",
						"./usePageLoading.6c7406d2.js",
						"./usePreviewToken.81b6aab9.js",
						"./useErrorPage.23109362.js",
						"./lang.4a9029fb.js",
					],
					import.meta.url
				).then((e) => e.default || e),
		},
		{
			name: "blog-series",
			path: "/blog/series",
			children: [],
			url: "/blog/series",
			meta: {},
			alias: [],
			redirect: void 0,
			component: () =>
				Ze(
					() => import("./index.efd409ee.js"),
					[
						"./index.efd409ee.js",
						"./Footer.e6485fe5.js",
						"./usePageTransition.c85436b5.js",
						"./Footer.9aabec20.css",
						"./Listing.a298d72a.js",
						"./useHeadSeo.d3db824e.js",
						"./usePageLoading.6c7406d2.js",
						"./usePreviewToken.81b6aab9.js",
						"./useErrorPage.23109362.js",
						"./lang.4a9029fb.js",
					],
					import.meta.url
				).then((e) => e.default || e),
		},
		{
			name: "careers-slug",
			path: "/careers/:slug",
			children: [],
			meta: {},
			alias: [],
			redirect: void 0,
			component: () =>
				Ze(
					() => import("./_slug_.7b862061.js"),
					[
						"./_slug_.7b862061.js",
						"./Footer.e6485fe5.js",
						"./usePageTransition.c85436b5.js",
						"./Footer.9aabec20.css",
						"./useHeadSeo.d3db824e.js",
						"./usePageLoading.6c7406d2.js",
						"./useErrorPage.23109362.js",
						"./lang.4a9029fb.js",
						"./_slug_.85ccbfae.css",
					],
					import.meta.url
				).then((e) => e.default || e),
		},
		{
			name: "careers-search",
			path: "/careers/search",
			children: [],
			url: "/careers/search",
			meta: {},
			alias: [],
			redirect: void 0,
			component: () =>
				Ze(
					() => import("./search.157ad940.js"),
					[
						"./search.157ad940.js",
						"./Footer.e6485fe5.js",
						"./usePageTransition.c85436b5.js",
						"./Footer.9aabec20.css",
						"./useHeadSeo.d3db824e.js",
						"./usePageLoading.6c7406d2.js",
						"./useErrorPage.23109362.js",
						"./lang.4a9029fb.js",
						"./slugify.3ca60c52.js",
						"./search.7501b419.css",
					],
					import.meta.url
				).then((e) => e.default || e),
		},
		{
			name: "customer-stories-slug",
			path: "/customer-stories/:slug",
			children: [],
			meta: {},
			alias: [],
			redirect: void 0,
			component: () =>
				Ze(
					() => import("./_slug_.89550ac6.js"),
					[
						"./_slug_.89550ac6.js",
						"./Footer.e6485fe5.js",
						"./usePageTransition.c85436b5.js",
						"./Footer.9aabec20.css",
						"./HeroMeta.7906402e.js",
						"./Blocks.44438b3b.js",
						"./BlockTimedTabs.vue.d0651cc9.js",
						"./BlockTimedTabs.944c46ae.css",
						"./Listing.a298d72a.js",
						"./slugify.3ca60c52.js",
						"./useResourceIndexData.dc2ced4d.js",
						"./useHeadSeo.d3db824e.js",
						"./usePageLoading.6c7406d2.js",
						"./usePreviewToken.81b6aab9.js",
						"./useErrorPage.23109362.js",
						"./lang.4a9029fb.js",
					],
					import.meta.url
				).then((e) => e.default || e),
		},
		{
			name: "customer-stories",
			path: "/customer-stories",
			children: [],
			url: "/customer-stories",
			meta: {},
			alias: [],
			redirect: void 0,
			component: () =>
				Ze(
					() => import("./index.9a533b75.js"),
					[
						"./index.9a533b75.js",
						"./Footer.e6485fe5.js",
						"./usePageTransition.c85436b5.js",
						"./Footer.9aabec20.css",
						"./Listing.a298d72a.js",
						"./CustomerStory.95104661.js",
						"./indexComponents.44e4cc59.js",
						"./useResourceIndexData.dc2ced4d.js",
						"./useHeadSeo.d3db824e.js",
						"./usePageLoading.6c7406d2.js",
						"./usePreviewToken.81b6aab9.js",
						"./useErrorPage.23109362.js",
						"./lang.4a9029fb.js",
					],
					import.meta.url
				).then((e) => e.default || e),
		},
		{
			name: "index",
			path: "/",
			children: [],
			url: "/",
			meta: {},
			alias: [],
			redirect: void 0,
			component: () =>
				Ze(
					() => import("./index.f140950f.js"),
					[
						"./index.f140950f.js",
						"./Footer.e6485fe5.js",
						"./usePageTransition.c85436b5.js",
						"./Footer.9aabec20.css",
						"./Blocks.44438b3b.js",
						"./BlockTimedTabs.vue.d0651cc9.js",
						"./BlockTimedTabs.944c46ae.css",
						"./Listing.a298d72a.js",
						"./slugify.3ca60c52.js",
						"./useResourceIndexData.dc2ced4d.js",
						"./useHeadSeo.d3db824e.js",
						"./usePageLoading.6c7406d2.js",
						"./usePreviewToken.81b6aab9.js",
						"./useErrorPage.23109362.js",
						"./lang.4a9029fb.js",
					],
					import.meta.url
				).then((e) => e.default || e),
		},
		{
			name: "preview-params",
			path: "/preview/:params(.*)*",
			children: [],
			meta: {},
			alias: [],
			redirect: void 0,
			component: () =>
				Ze(
					() => import("./_...params_.2d50bc68.js"),
					["./_...params_.2d50bc68.js", "./usePreviewToken.81b6aab9.js"],
					import.meta.url
				).then((e) => e.default || e),
		},
		{
			name: "product-parent-slug",
			path: "/product/:parent/:slug",
			children: [],
			meta: {},
			alias: [],
			redirect: void 0,
			component: () =>
				Ze(
					() => import("./_slug_.95aa5bae.js"),
					[
						"./_slug_.95aa5bae.js",
						"./Landing.df64328f.js",
						"./Footer.e6485fe5.js",
						"./usePageTransition.c85436b5.js",
						"./Footer.9aabec20.css",
						"./Blocks.44438b3b.js",
						"./BlockTimedTabs.vue.d0651cc9.js",
						"./BlockTimedTabs.944c46ae.css",
						"./Listing.a298d72a.js",
						"./slugify.3ca60c52.js",
						"./useResourceIndexData.dc2ced4d.js",
						"./useHeadSeo.d3db824e.js",
						"./usePageLoading.6c7406d2.js",
						"./List.4457a9db.js",
						"./Detail.befef1e5.css",
						"./usePreviewToken.81b6aab9.js",
						"./useErrorPage.23109362.js",
						"./lang.4a9029fb.js",
					],
					import.meta.url
				).then((e) => e.default || e),
		},
		{
			name: "product-slug",
			path: "/product/:slug",
			children: [],
			meta: {},
			alias: [],
			redirect: void 0,
			component: () =>
				Ze(
					() => import("./_slug_.2a2f54a8.js"),
					[
						"./_slug_.2a2f54a8.js",
						"./Product.a4206206.js",
						"./Footer.e6485fe5.js",
						"./usePageTransition.c85436b5.js",
						"./Footer.9aabec20.css",
						"./Blocks.44438b3b.js",
						"./BlockTimedTabs.vue.d0651cc9.js",
						"./BlockTimedTabs.944c46ae.css",
						"./Listing.a298d72a.js",
						"./slugify.3ca60c52.js",
						"./useResourceIndexData.dc2ced4d.js",
						"./useHeadSeo.d3db824e.js",
						"./usePageLoading.6c7406d2.js",
						"./Landing.df64328f.js",
						"./List.4457a9db.js",
						"./Detail.befef1e5.css",
						"./usePreviewToken.81b6aab9.js",
						"./useErrorPage.23109362.js",
						"./lang.4a9029fb.js",
					],
					import.meta.url
				).then((e) => e.default || e),
		},
		{
			name: "research-parent-slug",
			path: "/research/:parent/:slug",
			children: [],
			meta: {},
			alias: [],
			redirect: void 0,
			component: () =>
				Ze(
					() => import("./_slug_.a8927113.js"),
					[
						"./_slug_.a8927113.js",
						"./Landing.df64328f.js",
						"./Footer.e6485fe5.js",
						"./usePageTransition.c85436b5.js",
						"./Footer.9aabec20.css",
						"./Blocks.44438b3b.js",
						"./BlockTimedTabs.vue.d0651cc9.js",
						"./BlockTimedTabs.944c46ae.css",
						"./Listing.a298d72a.js",
						"./slugify.3ca60c52.js",
						"./useResourceIndexData.dc2ced4d.js",
						"./useHeadSeo.d3db824e.js",
						"./usePageLoading.6c7406d2.js",
						"./List.4457a9db.js",
						"./Detail.befef1e5.css",
						"./usePreviewToken.81b6aab9.js",
						"./useErrorPage.23109362.js",
						"./lang.4a9029fb.js",
					],
					import.meta.url
				).then((e) => e.default || e),
		},
		{
			name: "research-slug",
			path: "/research/:slug",
			children: [],
			meta: {},
			alias: [],
			redirect: void 0,
			component: () =>
				Ze(
					() => import("./_slug_.a3f83d3e.js"),
					[
						"./_slug_.a3f83d3e.js",
						"./Footer.e6485fe5.js",
						"./usePageTransition.c85436b5.js",
						"./Footer.9aabec20.css",
						"./HeroMeta.7906402e.js",
						"./Blocks.44438b3b.js",
						"./BlockTimedTabs.vue.d0651cc9.js",
						"./BlockTimedTabs.944c46ae.css",
						"./Listing.a298d72a.js",
						"./slugify.3ca60c52.js",
						"./useResourceIndexData.dc2ced4d.js",
						"./useHeadSeo.d3db824e.js",
						"./usePageLoading.6c7406d2.js",
						"./Landing.df64328f.js",
						"./List.4457a9db.js",
						"./Detail.befef1e5.css",
						"./ResearchPublications.8d82d2af.js",
						"./usePreviewToken.81b6aab9.js",
						"./useErrorPage.23109362.js",
						"./lang.4a9029fb.js",
					],
					import.meta.url
				).then((e) => e.default || e),
		},
		{
			name: "research",
			path: "/research",
			children: [],
			url: "/research",
			meta: {},
			alias: [],
			redirect: void 0,
			component: () =>
				Ze(
					() => import("./index.deaa74a7.js"),
					[
						"./index.deaa74a7.js",
						"./Footer.e6485fe5.js",
						"./usePageTransition.c85436b5.js",
						"./Footer.9aabec20.css",
						"./Research.1ccfe14c.js",
						"./indexComponents.44e4cc59.js",
						"./Listing.a298d72a.js",
						"./useResourceIndexData.dc2ced4d.js",
						"./useHeadSeo.d3db824e.js",
						"./usePageLoading.6c7406d2.js",
						"./useErrorPage.23109362.js",
						"./lang.4a9029fb.js",
					],
					import.meta.url
				).then((e) => e.default || e),
		},
		{
			name: "search",
			path: "/search",
			children: [],
			url: "/search",
			meta: {},
			alias: [],
			redirect: void 0,
			component: () =>
				Ze(
					() => import("./index.3bdc77a4.js"),
					[
						"./index.3bdc77a4.js",
						"./Footer.e6485fe5.js",
						"./usePageTransition.c85436b5.js",
						"./Footer.9aabec20.css",
						"./Listing.a298d72a.js",
						"./BlockTimedTabs.vue.d0651cc9.js",
						"./BlockTimedTabs.944c46ae.css",
						"./useHeadSeo.d3db824e.js",
						"./usePageLoading.6c7406d2.js",
						"./indexComponents.44e4cc59.js",
						"./Blog.4476b770.js",
						"./useResourceIndexData.dc2ced4d.js",
						"./CustomerStory.95104661.js",
						"./Research.1ccfe14c.js",
						"./index.298688c3.css",
						"./Detail.befef1e5.css",
					],
					import.meta.url
				).then((e) => e.default || e),
		},
	],
	yb = {
		scrollBehavior(e, t, r) {
			const n = Re();
			let i = r || void 0;
			if (
				(!i &&
					t &&
					e &&
					e.meta.scrollToTop !== !1 &&
					bb(t, e) &&
					(i = { left: 0, top: 0 }),
				e.path === t.path)
			) {
				if (t.hash && !e.hash) return { left: 0, top: 0 };
				if (e.hash) return { el: e.hash, top: Ud(e.hash) };
			}
			const a = (o) => !!(o.meta.pageTransition ?? ql),
				s = a(t) && a(e) ? "page:transition:finish" : "page:finish";
			return new Promise((o) => {
				n.hooks.hookOnce(s, async () => {
					await vn(), e.hash && (i = { el: e.hash, top: Ud(e.hash) }), o(i);
				});
			});
		},
	};
function Ud(e) {
	try {
		const t = document.querySelector(e);
		if (t) return parseFloat(getComputedStyle(t).scrollMarginTop);
	} catch {}
	return 0;
}
function bb(e, t) {
	const r = e.matched[0] === t.matched[0];
	return !!(!r || (r && JSON.stringify(e.params) !== JSON.stringify(t.params)));
}
const vb = { strict: !0 },
	_r = { ...vb, ...yb },
	_b = Qm(async (e) => {
		var l;
		let t, r;
		if (!((l = e.meta) != null && l.validate)) return;
		const n = Re(),
			i = ds();
		if (
			(([t, r] = jl(() => Promise.resolve(e.meta.validate(e)))),
			(t = await t),
			r(),
			t) === !0
		)
			return;
		const s = Zm({
				statusCode: 404,
				statusMessage: `Page Not Found: ${e.fullPath}`,
			}),
			o = i.beforeResolve((c) => {
				if ((o(), c === e)) {
					const u = i.afterEach(async () => {
						u(),
							await Tr(n, di, [s]),
							window.history.pushState({}, "", e.fullPath);
					});
					return !1;
				}
			});
	});
function wb(e, t) {
	return Re()._useHead(e, t);
}
function jd(e, t = {}) {
	const r = Sb(e, t),
		n = Re(),
		i = (n._payloadCache = n._payloadCache || {});
	return i[e] || (i[e] = Eb(r).then((a) => a || (delete i[e], null))), i[e];
}
function Sb(e, t = {}) {
	const r = new URL(e, "http://localhost");
	if (r.search)
		throw new Error("Payload URL cannot contain search params: " + e);
	if (r.host !== "localhost" || Kn(r.pathname, !0))
		throw new Error("Payload URL must not include hostname: " + e);
	const n = t.hash || (t.fresh ? Date.now() : "");
	return ei(
		Jo().app.baseURL,
		r.pathname,
		n ? `_payload.${n}.js` : "_payload.js"
	);
}
async function Eb(e) {
	const t = await Ze(() => import(e), [], import.meta.url).catch((r) => {
		console.warn("[nuxt] Cannot load payload ", e, r);
	});
	return (t == null ? void 0 : t.default) || null;
}
function xb() {
	return !!Re().payload.prerenderedAt;
}
const Tb = {};
sb(Tb);
const kb = Qm((e, t) => {
		if (e.path !== "/" && e.path.endsWith("/")) {
			const { path: r, query: n, hash: i } = e,
				s = { path: r.replace(/\/+$/, "") || "/", query: n, hash: i };
			return hb(s, { redirectCode: 301 });
		}
	}),
	Ab = [_b, kb],
	Ra = {};
function Rb(e, t) {
	const { pathname: r, search: n, hash: i } = t,
		a = e.indexOf("#");
	if (a > -1) {
		const o = i.includes(e.slice(a)) ? e.slice(a).length : 1;
		let l = i.slice(o);
		return l[0] !== "/" && (l = "/" + l), md(l, "");
	}
	return md(r, e) + n + i;
}
const Mb = Ct(async (e) => {
		var b, E;
		let t,
			r,
			n = Jo().app.baseURL;
		_r.hashMode && !n.includes("#") && (n += "#");
		const i =
				((b = _r.history) == null ? void 0 : b.call(_r, n)) ??
				(_r.hashMode ? _8(n) : Fm(n)),
			a = ((E = _r.routes) == null ? void 0 : E.call(_r, Hd)) ?? Hd,
			s = Rb(n, window.location),
			o = nb({ ..._r, history: i, routes: a });
		e.vueApp.use(o);
		const l = Rl(o.currentRoute.value);
		o.afterEach((R, _) => {
			l.value = _;
		}),
			Object.defineProperty(e.vueApp.config.globalProperties, "previousRoute", {
				get: () => l.value,
			});
		const c = Rl(o.resolve(s)),
			u = () => {
				c.value = o.currentRoute.value;
			};
		e.hook("page:finish", u),
			o.afterEach((R, _) => {
				var v, T, M, O;
				((T = (v = R.matched[0]) == null ? void 0 : v.components) == null
					? void 0
					: T.default) ===
					((O = (M = _.matched[0]) == null ? void 0 : M.components) == null
						? void 0
						: O.default) && u();
			});
		const d = {};
		for (const R in c.value) d[R] = Et(() => c.value[R]);
		(e._route = pr(d)),
			(e._middleware = e._middleware || { global: [], named: {} });
		const p = Qo();
		try {
			([t, r] = jl(() => o.isReady())), await t, r();
		} catch (R) {
			([t, r] = jl(() => Tr(e, di, [R]))), await t, r();
		}
		const m = fb("_layout");
		return (
			o.beforeEach(async (R, _) => {
				var T;
				(R.meta = pr(R.meta)),
					e.isHydrating &&
						m.value &&
						!Vn(R.meta.layout) &&
						(R.meta.layout = m.value),
					(e._processingMiddleware = !0);
				const v = new Set([...Ab, ...e._middleware.global]);
				for (const M of R.matched) {
					const O = M.meta.middleware;
					if (O)
						if (Array.isArray(O)) for (const B of O) v.add(B);
						else v.add(O);
				}
				for (const M of v) {
					const O =
						typeof M == "string"
							? e._middleware.named[M] ||
							  (await ((T = Ra[M]) == null
									? void 0
									: T.call(Ra).then((z) => z.default || z)))
							: M;
					if (!O) throw new Error(`Unknown route middleware: '${M}'.`);
					const B = await Tr(e, O, [R, _]);
					if (
						!e.payload.serverRendered &&
						e.isHydrating &&
						(B === !1 || B instanceof Error)
					) {
						const z =
							B ||
							Xl({ statusCode: 404, statusMessage: `Page Not Found: ${s}` });
						return await Tr(e, di, [z]), !1;
					}
					if (B || B === !1) return B;
				}
			}),
			o.afterEach(async (R) => {
				delete e._processingMiddleware,
					!e.isHydrating && p.value && (await Tr(e, cb)),
					R.matched.length === 0 &&
						(await Tr(e, di, [
							Xl({
								statusCode: 404,
								fatal: !1,
								statusMessage: `Page not found: ${R.fullPath}`,
							}),
						]));
			}),
			e.hooks.hookOnce("app:created", async () => {
				try {
					await o.replace({ ...o.resolve(s), name: void 0, force: !0 });
				} catch (R) {
					await Tr(e, di, [R]);
				}
			}),
			{ provide: { router: o } }
		);
	}),
	hi = {
		app: () =>
			Ze(
				() => import("./app.44388a27.js"),
				[
					"./app.44388a27.js",
					"./usePageTransition.c85436b5.js",
					"./useAsyncNavigationData.564096b3.js",
					"./usePageLoading.6c7406d2.js",
				],
				import.meta.url
			).then((e) => e.default || e),
	},
	Ob = Ct(() => {
		const e = Re(),
			t = ds();
		e.hooks.hook("app:mounted", () => {
			t.beforeEach(async (r) => {
				var i;
				const n = (i = r == null ? void 0 : r.meta) == null ? void 0 : i.layout;
				n && typeof hi[n] == "function" && (await hi[n]());
			});
		}),
			e.hooks.hook("link:prefetch", (r) => {
				var s, o, l, c;
				if (Kn(r)) return;
				const n = t.resolve(r);
				if (!n) return;
				const i = (s = n == null ? void 0 : n.meta) == null ? void 0 : s.layout;
				let a = Array.isArray(
					(o = n == null ? void 0 : n.meta) == null ? void 0 : o.middleware
				)
					? (l = n == null ? void 0 : n.meta) == null
						? void 0
						: l.middleware
					: [(c = n == null ? void 0 : n.meta) == null ? void 0 : c.middleware];
				a = a.filter((u) => typeof u == "string");
				for (const u of a) typeof Ra[u] == "function" && Ra[u]();
				i && typeof hi[i] == "function" && hi[i]();
			});
	});
async function Nb(e, t) {
	return await Cb(t).catch(
		(n) => (
			console.error("Failed to get image meta for " + t, n + ""),
			{ width: 0, height: 0, ratio: 0 }
		)
	);
}
async function Cb(e) {
	if (typeof Image > "u") throw new TypeError("Image not supported");
	return new Promise((t, r) => {
		const n = new Image();
		(n.onload = () => {
			const i = { width: n.width, height: n.height, ratio: n.width / n.height };
			t(i);
		}),
			(n.onerror = (i) => r(i)),
			(n.src = e);
	});
}
function qd(e) {
	return (t) => (t ? e[t] || t : e.missingValue);
}
function e4({ formatter: e, keyMap: t, joinWith: r = "/", valueMap: n } = {}) {
	e || (e = (a, s) => `${a}=${s}`), t && typeof t != "function" && (t = qd(t));
	const i = n || {};
	return (
		Object.keys(i).forEach((a) => {
			typeof i[a] != "function" && (i[a] = qd(i[a]));
		}),
		(a = {}) =>
			Object.entries(a)
				.filter(([o, l]) => typeof l < "u")
				.map(([o, l]) => {
					const c = i[o];
					return (
						typeof c == "function" && (l = c(a[o])),
						(o = typeof t == "function" ? t(o) : o),
						e(o, l)
					);
				})
				.join(r)
	);
}
function wo(e = "") {
	if (typeof e == "number") return e;
	if (typeof e == "string" && e.replace("px", "").match(/^\d+$/g))
		return parseInt(e, 10);
}
function Ib(e) {
	const t = { options: e },
		r = (i, a = {}) => t4(t, i, a),
		n = (i, a = {}, s = {}) =>
			r(i, { ...s, modifiers: yu(a, s.modifiers || {}) }).url;
	for (const i in e.presets)
		n[i] = (a, s, o) => n(a, s, { ...e.presets[i], ...o });
	return (
		(n.options = e),
		(n.getImage = r),
		(n.getMeta = (i, a) => Db(t, i, a)),
		(n.getSizes = (i, a) => Lb(t, i, a)),
		(t.$img = n),
		n
	);
}
async function Db(e, t, r) {
	const n = t4(e, t, { ...r });
	return typeof n.getMeta == "function"
		? await n.getMeta()
		: await Nb(e, n.url);
}
function t4(e, t, r) {
	var c, u;
	if (typeof t != "string" || t === "")
		throw new TypeError(
			`input must be a string (received ${typeof t}: ${JSON.stringify(t)})`
		);
	if (t.startsWith("data:")) return { url: t };
	const { provider: n, defaults: i } = Bb(e, r.provider || e.options.provider),
		a = Pb(e, r.preset);
	if (((t = Kn(t) ? t : $7(t)), !n.supportsAlias))
		for (const d in e.options.alias)
			t.startsWith(d) && (t = ei(e.options.alias[d], t.substr(d.length)));
	if (n.validateDomains && Kn(t)) {
		const d = fs(t).host;
		if (!e.options.domains.find((p) => p === d)) return { url: t };
	}
	const s = yu(r, a, i);
	s.modifiers = { ...s.modifiers };
	const o = s.modifiers.format;
	(c = s.modifiers) != null &&
		c.width &&
		(s.modifiers.width = wo(s.modifiers.width)),
		(u = s.modifiers) != null &&
			u.height &&
			(s.modifiers.height = wo(s.modifiers.height));
	const l = n.getImage(t, s, e);
	return (l.format = l.format || o || ""), l;
}
function Bb(e, t) {
	const r = e.options.providers[t];
	if (!r) throw new Error("Unknown provider: " + t);
	return r;
}
function Pb(e, t) {
	if (!t) return {};
	if (!e.options.presets[t]) throw new Error("Unknown preset: " + t);
	return e.options.presets[t];
}
function Lb(e, t, r) {
	var c, u;
	const n = wo((c = r.modifiers) == null ? void 0 : c.width),
		i = wo((u = r.modifiers) == null ? void 0 : u.height),
		a = n && i ? i / n : 0,
		s = [],
		o = {};
	if (typeof r.sizes == "string")
		for (const d of r.sizes.split(/[\s,]+/).filter((p) => p)) {
			const p = d.split(":");
			p.length === 2 && (o[p[0].trim()] = p[1].trim());
		}
	else Object.assign(o, r.sizes);
	for (const d in o) {
		const p = (e.options.screens && e.options.screens[d]) || parseInt(d);
		let m = String(o[d]);
		const b = m.endsWith("vw");
		if ((!b && /^\d+$/.test(m) && (m = m + "px"), !b && !m.endsWith("px")))
			continue;
		let E = parseInt(m);
		if (!p || !E) continue;
		b && (E = Math.round((E / 100) * p));
		const R = a ? Math.round(E * a) : i;
		s.push({
			width: E,
			size: m,
			screenMaxWidth: p,
			media: `(max-width: ${p}px)`,
			src: e.$img(t, { ...r.modifiers, width: E, height: R }, r),
		});
	}
	s.sort((d, p) => d.screenMaxWidth - p.screenMaxWidth);
	const l = s[s.length - 1];
	return (
		l && (l.media = ""),
		{
			sizes: s
				.map((d) => `${d.media ? d.media + " " : ""}${d.size}`)
				.join(", "),
			srcset: s.map((d) => `${d.src} ${d.width}w`).join(", "),
			src: l == null ? void 0 : l.src,
		}
	);
}
const r4 = e4({
		keyMap: {
			width: "w",
			height: "h",
			format: "fm",
			quality: "q",
			backgroundColor: "bg",
			rotate: "rot",
			mask: "mask",
			auto: "auto",
			crop: "crop",
			brightness: "bri",
			contrast: "con",
			exposure: "exp",
			gamma: "gam",
			highlight: "high",
			hueShift: "hue",
			invert: "invert",
			saturation: "sat",
			shadow: "shad",
			sharpen: "sharp",
			unsharpMask: "usm",
			unsharpMaskRadius: "usmrad",
			vibrance: "vib",
			blend: "blend",
			blendAlign: "blend-align",
			blendAlpha: "blend-alpha",
			blendColor: "blend-color",
			blendCrop: "blend-crop",
			blendFit: "blend-fit",
			blendHeight: "blend-h",
			blendMode: "blend-mode",
			blendPadding: "blend-pad",
			blendSize: "blend-size",
			blendWidth: "blend-w",
			blendXPosition: "blend-x",
			blendYPosition: "blend-y",
			padding: "pad",
			borderBottom: "border-bottom",
			borderLeft: "border-left",
			innerBorderRadius: "border-radius-inner",
			outerBorderRadius: "border-radius",
			borderRight: "border-right",
			borderTop: "border-top",
			borderSizeColor: "border",
			paddingBottom: "pad-bottom",
			paddingLeft: "pad-left",
			paddingRight: "pad-right",
			paddingTop: "pad-top",
			paletteColorCount: "colors",
			colorPaletteExtraction: "palette",
			cssPrefix: "prefix",
			expirationTimestamp: "expires",
			faceIndex: "faceindex",
			facePadding: "facepad",
			jsonFaceData: "faces",
			fillMode: "fill",
			fillColor: "fill-color",
			gridColors: "grid-colors",
			gridSize: "grid-size",
			transparency: "transparency",
			focalPointDebug: "fp-debug",
			focalPointXPosition: "fp-x",
			focalPointYPosition: "fp-y",
			focalPointZoom: "fp-z",
			clientHints: "ch",
			chromaSubsampling: "chromasub",
			colorQuantization: "colorquant",
			colorSpace: "cs",
			download: "dl",
			dotsPerInch: "dpi",
			losslessCompression: "lossless",
			maskBackgroundColor: "mask-bg",
			maskCornerRadius: "corner-radius",
			noiseReductionSharp: "nrs",
			noiseReductionBound: "nr",
			pdfPageNumber: "page",
			pdfAnnotation: "pdf-annotation",
			pixelDensity: "dpr",
			orientation: "orient",
			flipAxis: "flip",
			aspectRatio: "ar",
			maximumHeight: "max-h",
			maximumWidth: "max-w",
			minimumHeight: "min-h",
			minimumWidth: "min-w",
			sourceRectangleRegion: "rect",
			gaussianBlur: "blur",
			duotoneAlpha: "duotone-alpha",
			duotone: "duotone",
			halftone: "htn",
			monochrome: "monochrome",
			pixellate: "px",
			sepiaTone: "sepia",
			textAlign: "txt-align",
			textClippingMode: "txt-clip",
			textColor: "txt-color",
			textFitMode: "txt-fit",
			textFont: "txt-font",
			textLigatures: "txt-lig",
			textOutlineColor: "txt-line-color",
			textOutline: "txt-line",
			textPadding: "txt-pad",
			textShadow: "txt-shad",
			textFontSize: "txt-size",
			textWidth: "txt-width",
			textString: "txt",
			trimColor: "trim-color",
			trimMeanDifference: "trim-md",
			trimStandardDeviation: "trim-sd",
			trimTolerance: "trim-tol",
			trimImage: "trim",
			textLeading: "txt-lead",
			textTracking: "txt-track",
			typesettingEndpoint: "~text",
			watermarkAlignment: "mark-align",
			watermarkAlpha: "mark-alpha",
			watermarkBaseURL: "mark-base",
			watermarkFitMode: "mark-fit",
			watermarkHeight: "mark-h",
			watermarkPadding: "mark-pad",
			watermarkRotation: "mark-rot",
			watermarkScale: "mark-sclae",
			watermarkTile: "mark-tile",
			watermarkWidth: "mark-w",
			watermarkXPosition: "mark-x",
			watermarkYPosition: "mark-y",
			watermarkImageURL: "mark",
		},
		valueMap: {
			fit: {
				fill: "scale",
				inside: "max",
				outside: "min",
				cover: "crop",
				contain: "fill",
				clamp: "clamp",
				clip: "clip",
				facearea: "facearea",
				fillMax: "fillmax",
			},
			format: {
				gif: "gif",
				jp2: "jp2",
				jpg: "jpg",
				json: "json",
				jxr: "jxr",
				pjpg: "pjpg",
				mp4: "mp4",
				png: "png",
				png8: "png8",
				png32: "png32",
				webm: "webm",
				webp: "webp",
				blurhash: "blurhash",
			},
		},
		joinWith: "&",
		formatter: (e, t) => `${e}=${t}`,
	}),
	zb = (e, { modifiers: t = {}, baseURL: r = "/" } = {}) => {
		const n = r4(t);
		return { url: ei(r, e + (n ? "?" + n : "")) };
	},
	$b = Object.freeze(
		Object.defineProperty(
			{ __proto__: null, getImage: zb, operationsGenerator: r4 },
			Symbol.toStringTag,
			{ value: "Module" }
		)
	),
	Fb = e4({
		keyMap: {
			width: "width",
			height: "height",
			dpr: "dpr",
			fit: "fit",
			quality: "quality",
			format: "format",
		},
		valueMap: {
			fit: {
				cover: "cover",
				contain: "contain",
				fill: "scale-down",
				outside: "crop",
				inside: "pad",
			},
			gravity: { auto: "auto", side: "side" },
		},
		joinWith: "&",
		formatter: (e, t) => _m(e, t),
	}),
	Hb = {},
	Ub = (e, { modifiers: t = {}, baseURL: r = "/" } = {}) => {
		const n = { ...Hb, ...t },
			i = Fb(n);
		let a = e;
		try {
			const s = new URL(r),
				o = e.replace(s.pathname, ""),
				l = i ? `?${i}` : "";
			a = `${ei(r, o)}${l}`;
		} catch (s) {
			console.log(s, e);
		}
		return { url: a };
	},
	jb = Object.freeze(
		Object.defineProperty(
			{ __proto__: null, getImage: Ub },
			Symbol.toStringTag,
			{ value: "Module" }
		)
	),
	n4 = {
		screens: {
			xs: 429,
			sm: 744,
			md: 1280,
			lg: 1440,
			xl: 1919,
			xxl: 1920,
			"2xl": 1536,
		},
		presets: {},
		provider: "cloudflare-worker",
		domains: ["images.openai.com"],
		alias: {},
	};
n4.providers = {
	imgix: {
		provider: $b,
		defaults: {
			baseURL: "",
			modifiers: { fm: "auto", auto: "compress,format", fit: "min" },
		},
	},
	["cloudflare-worker"]: {
		provider: jb,
		defaults: { baseURL: "https://images.openai.com/blob", modifiers: {} },
	},
};
const qb = Ct(() => {
		const e = Jo();
		return {
			provide: { img: Ib({ ...n4, nuxt: { baseURL: e.app.baseURL } }) },
		};
	}),
	Gb = Ct((e) => {
		const t = ds(),
			r = new Set();
		t.beforeEach(() => {
			r.clear();
		}),
			e.hook("app:chunkError", ({ error: n }) => {
				r.add(n);
			}),
			t.onError((n, i) => {
				if (!r.has(n)) return;
				let a = {};
				try {
					a = JSON.parse(localStorage.getItem("nuxt:reload") || "{}");
				} catch {}
				((a == null ? void 0 : a.path) !== i.fullPath ||
					(a == null ? void 0 : a.expires) < Date.now()) &&
					(localStorage.setItem(
						"nuxt:reload",
						JSON.stringify({ path: i.fullPath, expires: Date.now() + 1e4 })
					),
					(window.location.href = i.fullPath));
			});
	}),
	Yb = Ct((e) => {
		xb() &&
			(e.hooks.hook("link:prefetch", (t) => {
				if (!fs(t).protocol) return jd(t);
			}),
			ds().beforeResolve(async (t, r) => {
				if (t.path === r.path) return;
				const n = await jd(t.path);
				n && Object.assign(e.static.data, n.data);
			}));
	});
async function Wb({ topics: e = [], size: t = 4 } = {}) {
	const { $twill: r } = Re();
	let n;
	const i = { published: !0 },
		a = r
			.find("blog-details")
			.sort("-publicationDate,-createdAt")
			.page({ size: t })
			.include(["media", "topics"]);
	return (
		e && e.length && (i.topics = { slug: e }),
		a.filter(i),
		(n = await a.fetch()),
		n.data ? r.transform(n) : null
	);
}
class Bt {
	constructor(t, r, n) {
		(this.lexer = void 0),
			(this.start = void 0),
			(this.end = void 0),
			(this.lexer = t),
			(this.start = r),
			(this.end = n);
	}
	static range(t, r) {
		return r
			? !t || !t.loc || !r.loc || t.loc.lexer !== r.loc.lexer
				? null
				: new Bt(t.loc.lexer, t.loc.start, r.loc.end)
			: t && t.loc;
	}
}
class jt {
	constructor(t, r) {
		(this.text = void 0),
			(this.loc = void 0),
			(this.noexpand = void 0),
			(this.treatAsRelax = void 0),
			(this.text = t),
			(this.loc = r);
	}
	range(t, r) {
		return new jt(r, Bt.range(this, t));
	}
}
class Z {
	constructor(t, r) {
		this.position = void 0;
		var n = "KaTeX parse error: " + t,
			i,
			a = r && r.loc;
		if (a && a.start <= a.end) {
			var s = a.lexer.input;
			i = a.start;
			var o = a.end;
			i === s.length
				? (n += " at end of input: ")
				: (n += " at position " + (i + 1) + ": ");
			var l = s.slice(i, o).replace(/[^]/g, "$&̲"),
				c;
			i > 15 ? (c = "…" + s.slice(i - 15, i)) : (c = s.slice(0, i));
			var u;
			o + 15 < s.length ? (u = s.slice(o, o + 15) + "…") : (u = s.slice(o)),
				(n += c + l + u);
		}
		var d = new Error(n);
		return (
			(d.name = "ParseError"), (d.__proto__ = Z.prototype), (d.position = i), d
		);
	}
}
Z.prototype.__proto__ = Error.prototype;
var Vb = function (t, r) {
		return t.indexOf(r) !== -1;
	},
	Kb = function (t, r) {
		return t === void 0 ? r : t;
	},
	Xb = /([A-Z])/g,
	Jb = function (t) {
		return t.replace(Xb, "-$1").toLowerCase();
	},
	Zb = { "&": "&amp;", ">": "&gt;", "<": "&lt;", '"': "&quot;", "'": "&#x27;" },
	Qb = /[&><"']/g;
function ev(e) {
	return String(e).replace(Qb, (t) => Zb[t]);
}
var i4 = function e(t) {
		return t.type === "ordgroup" || t.type === "color"
			? t.body.length === 1
				? e(t.body[0])
				: t
			: t.type === "font"
			? e(t.body)
			: t;
	},
	tv = function (t) {
		var r = i4(t);
		return r.type === "mathord" || r.type === "textord" || r.type === "atom";
	},
	rv = function (t) {
		if (!t) throw new Error("Expected non-null, but got " + String(t));
		return t;
	},
	nv = function (t) {
		var r = /^\s*([^\\/#]*?)(?::|&#0*58|&#x0*3a)/i.exec(t);
		return r != null ? r[1] : "_relative";
	},
	_e = {
		contains: Vb,
		deflt: Kb,
		escape: ev,
		hyphenate: Jb,
		getBaseElem: i4,
		isCharacterBox: tv,
		protocolFromUrl: nv,
	},
	to = {
		displayMode: {
			type: "boolean",
			description:
				"Render math in display mode, which puts the math in display style (so \\int and \\sum are large, for example), and centers the math on the page on its own line.",
			cli: "-d, --display-mode",
		},
		output: {
			type: { enum: ["htmlAndMathml", "html", "mathml"] },
			description: "Determines the markup language of the output.",
			cli: "-F, --format <type>",
		},
		leqno: {
			type: "boolean",
			description: "Render display math in leqno style (left-justified tags).",
		},
		fleqn: { type: "boolean", description: "Render display math flush left." },
		throwOnError: {
			type: "boolean",
			default: !0,
			cli: "-t, --no-throw-on-error",
			cliDescription:
				"Render errors (in the color given by --error-color) instead of throwing a ParseError exception when encountering an error.",
		},
		errorColor: {
			type: "string",
			default: "#cc0000",
			cli: "-c, --error-color <color>",
			cliDescription:
				"A color string given in the format 'rgb' or 'rrggbb' (no #). This option determines the color of errors rendered by the -t option.",
			cliProcessor: (e) => "#" + e,
		},
		macros: {
			type: "object",
			cli: "-m, --macro <def>",
			cliDescription:
				"Define custom macro of the form '\\foo:expansion' (use multiple -m arguments for multiple macros).",
			cliDefault: [],
			cliProcessor: (e, t) => (t.push(e), t),
		},
		minRuleThickness: {
			type: "number",
			description:
				"Specifies a minimum thickness, in ems, for fraction lines, `\\sqrt` top lines, `{array}` vertical lines, `\\hline`, `\\hdashline`, `\\underline`, `\\overline`, and the borders of `\\fbox`, `\\boxed`, and `\\fcolorbox`.",
			processor: (e) => Math.max(0, e),
			cli: "--min-rule-thickness <size>",
			cliProcessor: parseFloat,
		},
		colorIsTextColor: {
			type: "boolean",
			description:
				"Makes \\color behave like LaTeX's 2-argument \\textcolor, instead of LaTeX's one-argument \\color mode change.",
			cli: "-b, --color-is-text-color",
		},
		strict: {
			type: [{ enum: ["warn", "ignore", "error"] }, "boolean", "function"],
			description:
				"Turn on strict / LaTeX faithfulness mode, which throws an error if the input uses features that are not supported by LaTeX.",
			cli: "-S, --strict",
			cliDefault: !1,
		},
		trust: {
			type: ["boolean", "function"],
			description: "Trust the input, enabling all HTML features such as \\url.",
			cli: "-T, --trust",
		},
		maxSize: {
			type: "number",
			default: 1 / 0,
			description:
				"If non-zero, all user-specified sizes, e.g. in \\rule{500em}{500em}, will be capped to maxSize ems. Otherwise, elements and spaces can be arbitrarily large",
			processor: (e) => Math.max(0, e),
			cli: "-s, --max-size <n>",
			cliProcessor: parseInt,
		},
		maxExpand: {
			type: "number",
			default: 1e3,
			description:
				"Limit the number of macro expansions to the specified number, to prevent e.g. infinite macro loops. If set to Infinity, the macro expander will try to fully expand as in LaTeX.",
			processor: (e) => Math.max(0, e),
			cli: "-e, --max-expand <n>",
			cliProcessor: (e) => (e === "Infinity" ? 1 / 0 : parseInt(e)),
		},
		globalGroup: { type: "boolean", cli: !1 },
	};
function iv(e) {
	if (e.default) return e.default;
	var t = e.type,
		r = Array.isArray(t) ? t[0] : t;
	if (typeof r != "string") return r.enum[0];
	switch (r) {
		case "boolean":
			return !1;
		case "string":
			return "";
		case "number":
			return 0;
		case "object":
			return {};
	}
}
class vu {
	constructor(t) {
		(this.displayMode = void 0),
			(this.output = void 0),
			(this.leqno = void 0),
			(this.fleqn = void 0),
			(this.throwOnError = void 0),
			(this.errorColor = void 0),
			(this.macros = void 0),
			(this.minRuleThickness = void 0),
			(this.colorIsTextColor = void 0),
			(this.strict = void 0),
			(this.trust = void 0),
			(this.maxSize = void 0),
			(this.maxExpand = void 0),
			(this.globalGroup = void 0),
			(t = t || {});
		for (var r in to)
			if (to.hasOwnProperty(r)) {
				var n = to[r];
				this[r] =
					t[r] !== void 0 ? (n.processor ? n.processor(t[r]) : t[r]) : iv(n);
			}
	}
	reportNonstrict(t, r, n) {
		var i = this.strict;
		if ((typeof i == "function" && (i = i(t, r, n)), !(!i || i === "ignore"))) {
			if (i === !0 || i === "error")
				throw new Z(
					"LaTeX-incompatible input and strict mode is set to 'error': " +
						(r + " [" + t + "]"),
					n
				);
			i === "warn"
				? typeof console < "u" &&
				  console.warn(
						"LaTeX-incompatible input and strict mode is set to 'warn': " +
							(r + " [" + t + "]")
				  )
				: typeof console < "u" &&
				  console.warn(
						"LaTeX-incompatible input and strict mode is set to " +
							("unrecognized '" + i + "': " + r + " [" + t + "]")
				  );
		}
	}
	useStrictBehavior(t, r, n) {
		var i = this.strict;
		if (typeof i == "function")
			try {
				i = i(t, r, n);
			} catch {
				i = "error";
			}
		return !i || i === "ignore"
			? !1
			: i === !0 || i === "error"
			? !0
			: i === "warn"
			? (typeof console < "u" &&
					console.warn(
						"LaTeX-incompatible input and strict mode is set to 'warn': " +
							(r + " [" + t + "]")
					),
			  !1)
			: (typeof console < "u" &&
					console.warn(
						"LaTeX-incompatible input and strict mode is set to " +
							("unrecognized '" + i + "': " + r + " [" + t + "]")
					),
			  !1);
	}
	isTrusted(t) {
		t.url && !t.protocol && (t.protocol = _e.protocolFromUrl(t.url));
		var r = typeof this.trust == "function" ? this.trust(t) : this.trust;
		return Boolean(r);
	}
}
class Kr {
	constructor(t, r, n) {
		(this.id = void 0),
			(this.size = void 0),
			(this.cramped = void 0),
			(this.id = t),
			(this.size = r),
			(this.cramped = n);
	}
	sup() {
		return cr[av[this.id]];
	}
	sub() {
		return cr[sv[this.id]];
	}
	fracNum() {
		return cr[ov[this.id]];
	}
	fracDen() {
		return cr[lv[this.id]];
	}
	cramp() {
		return cr[cv[this.id]];
	}
	text() {
		return cr[uv[this.id]];
	}
	isTight() {
		return this.size >= 2;
	}
}
var _u = 0,
	So = 1,
	Ti = 2,
	Mr = 3,
	Ya = 4,
	qt = 5,
	Fi = 6,
	xt = 7,
	cr = [
		new Kr(_u, 0, !1),
		new Kr(So, 0, !0),
		new Kr(Ti, 1, !1),
		new Kr(Mr, 1, !0),
		new Kr(Ya, 2, !1),
		new Kr(qt, 2, !0),
		new Kr(Fi, 3, !1),
		new Kr(xt, 3, !0),
	],
	av = [Ya, qt, Ya, qt, Fi, xt, Fi, xt],
	sv = [qt, qt, qt, qt, xt, xt, xt, xt],
	ov = [Ti, Mr, Ya, qt, Fi, xt, Fi, xt],
	lv = [Mr, Mr, qt, qt, xt, xt, xt, xt],
	cv = [So, So, Mr, Mr, qt, qt, xt, xt],
	uv = [_u, So, Ti, Mr, Ti, Mr, Ti, Mr],
	be = { DISPLAY: cr[_u], TEXT: cr[Ti], SCRIPT: cr[Ya], SCRIPTSCRIPT: cr[Fi] },
	Zl = [
		{
			name: "latin",
			blocks: [
				[256, 591],
				[768, 879],
			],
		},
		{ name: "cyrillic", blocks: [[1024, 1279]] },
		{ name: "armenian", blocks: [[1328, 1423]] },
		{ name: "brahmic", blocks: [[2304, 4255]] },
		{ name: "georgian", blocks: [[4256, 4351]] },
		{
			name: "cjk",
			blocks: [
				[12288, 12543],
				[19968, 40879],
				[65280, 65376],
			],
		},
		{ name: "hangul", blocks: [[44032, 55215]] },
	];
function fv(e) {
	for (var t = 0; t < Zl.length; t++)
		for (var r = Zl[t], n = 0; n < r.blocks.length; n++) {
			var i = r.blocks[n];
			if (e >= i[0] && e <= i[1]) return r.name;
		}
	return null;
}
var ro = [];
Zl.forEach((e) => e.blocks.forEach((t) => ro.push(...t)));
function a4(e) {
	for (var t = 0; t < ro.length; t += 2)
		if (e >= ro[t] && e <= ro[t + 1]) return !0;
	return !1;
}
var ai = 80,
	dv = function (t, r) {
		return (
			"M95," +
			(622 + t + r) +
			`
c-2.7,0,-7.17,-2.7,-13.5,-8c-5.8,-5.3,-9.5,-10,-9.5,-14
c0,-2,0.3,-3.3,1,-4c1.3,-2.7,23.83,-20.7,67.5,-54
c44.2,-33.3,65.8,-50.3,66.5,-51c1.3,-1.3,3,-2,5,-2c4.7,0,8.7,3.3,12,10
s173,378,173,378c0.7,0,35.3,-71,104,-213c68.7,-142,137.5,-285,206.5,-429
c69,-144,104.5,-217.7,106.5,-221
l` +
			t / 2.075 +
			" -" +
			t +
			`
c5.3,-9.3,12,-14,20,-14
H400000v` +
			(40 + t) +
			`H845.2724
s-225.272,467,-225.272,467s-235,486,-235,486c-2.7,4.7,-9,7,-19,7
c-6,0,-10,-1,-12,-3s-194,-422,-194,-422s-65,47,-65,47z
M` +
			(834 + t) +
			" " +
			r +
			"h400000v" +
			(40 + t) +
			"h-400000z"
		);
	},
	hv = function (t, r) {
		return (
			"M263," +
			(601 + t + r) +
			`c0.7,0,18,39.7,52,119
c34,79.3,68.167,158.7,102.5,238c34.3,79.3,51.8,119.3,52.5,120
c340,-704.7,510.7,-1060.3,512,-1067
l` +
			t / 2.084 +
			" -" +
			t +
			`
c4.7,-7.3,11,-11,19,-11
H40000v` +
			(40 + t) +
			`H1012.3
s-271.3,567,-271.3,567c-38.7,80.7,-84,175,-136,283c-52,108,-89.167,185.3,-111.5,232
c-22.3,46.7,-33.8,70.3,-34.5,71c-4.7,4.7,-12.3,7,-23,7s-12,-1,-12,-1
s-109,-253,-109,-253c-72.7,-168,-109.3,-252,-110,-252c-10.7,8,-22,16.7,-34,26
c-22,17.3,-33.3,26,-34,26s-26,-26,-26,-26s76,-59,76,-59s76,-60,76,-60z
M` +
			(1001 + t) +
			" " +
			r +
			"h400000v" +
			(40 + t) +
			"h-400000z"
		);
	},
	pv = function (t, r) {
		return (
			"M983 " +
			(10 + t + r) +
			`
l` +
			t / 3.13 +
			" -" +
			t +
			`
c4,-6.7,10,-10,18,-10 H400000v` +
			(40 + t) +
			`
H1013.1s-83.4,268,-264.1,840c-180.7,572,-277,876.3,-289,913c-4.7,4.7,-12.7,7,-24,7
s-12,0,-12,0c-1.3,-3.3,-3.7,-11.7,-7,-25c-35.3,-125.3,-106.7,-373.3,-214,-744
c-10,12,-21,25,-33,39s-32,39,-32,39c-6,-5.3,-15,-14,-27,-26s25,-30,25,-30
c26.7,-32.7,52,-63,76,-91s52,-60,52,-60s208,722,208,722
c56,-175.3,126.3,-397.3,211,-666c84.7,-268.7,153.8,-488.2,207.5,-658.5
c53.7,-170.3,84.5,-266.8,92.5,-289.5z
M` +
			(1001 + t) +
			" " +
			r +
			"h400000v" +
			(40 + t) +
			"h-400000z"
		);
	},
	mv = function (t, r) {
		return (
			"M424," +
			(2398 + t + r) +
			`
c-1.3,-0.7,-38.5,-172,-111.5,-514c-73,-342,-109.8,-513.3,-110.5,-514
c0,-2,-10.7,14.3,-32,49c-4.7,7.3,-9.8,15.7,-15.5,25c-5.7,9.3,-9.8,16,-12.5,20
s-5,7,-5,7c-4,-3.3,-8.3,-7.7,-13,-13s-13,-13,-13,-13s76,-122,76,-122s77,-121,77,-121
s209,968,209,968c0,-2,84.7,-361.7,254,-1079c169.3,-717.3,254.7,-1077.7,256,-1081
l` +
			t / 4.223 +
			" -" +
			t +
			`c4,-6.7,10,-10,18,-10 H400000
v` +
			(40 + t) +
			`H1014.6
s-87.3,378.7,-272.6,1166c-185.3,787.3,-279.3,1182.3,-282,1185
c-2,6,-10,9,-24,9
c-8,0,-12,-0.7,-12,-2z M` +
			(1001 + t) +
			" " +
			r +
			`
h400000v` +
			(40 + t) +
			"h-400000z"
		);
	},
	gv = function (t, r) {
		return (
			"M473," +
			(2713 + t + r) +
			`
c339.3,-1799.3,509.3,-2700,510,-2702 l` +
			t / 5.298 +
			" -" +
			t +
			`
c3.3,-7.3,9.3,-11,18,-11 H400000v` +
			(40 + t) +
			`H1017.7
s-90.5,478,-276.2,1466c-185.7,988,-279.5,1483,-281.5,1485c-2,6,-10,9,-24,9
c-8,0,-12,-0.7,-12,-2c0,-1.3,-5.3,-32,-16,-92c-50.7,-293.3,-119.7,-693.3,-207,-1200
c0,-1.3,-5.3,8.7,-16,30c-10.7,21.3,-21.3,42.7,-32,64s-16,33,-16,33s-26,-26,-26,-26
s76,-153,76,-153s77,-151,77,-151c0.7,0.7,35.7,202,105,604c67.3,400.7,102,602.7,104,
606zM` +
			(1001 + t) +
			" " +
			r +
			"h400000v" +
			(40 + t) +
			"H1017.7z"
		);
	},
	yv = function (t) {
		var r = t / 2;
		return (
			"M400000 " + t + " H0 L" + r + " 0 l65 45 L145 " + (t - 80) + " H400000z"
		);
	},
	bv = function (t, r, n) {
		var i = n - 54 - r - t;
		return (
			"M702 " +
			(t + r) +
			"H400000" +
			(40 + t) +
			`
H742v` +
			i +
			`l-4 4-4 4c-.667.7 -2 1.5-4 2.5s-4.167 1.833-6.5 2.5-5.5 1-9.5 1
h-12l-28-84c-16.667-52-96.667 -294.333-240-727l-212 -643 -85 170
c-4-3.333-8.333-7.667-13 -13l-13-13l77-155 77-156c66 199.333 139 419.667
219 661 l218 661zM702 ` +
			r +
			"H400000v" +
			(40 + t) +
			"H742z"
		);
	},
	vv = function (t, r, n) {
		r = 1e3 * r;
		var i = "";
		switch (t) {
			case "sqrtMain":
				i = dv(r, ai);
				break;
			case "sqrtSize1":
				i = hv(r, ai);
				break;
			case "sqrtSize2":
				i = pv(r, ai);
				break;
			case "sqrtSize3":
				i = mv(r, ai);
				break;
			case "sqrtSize4":
				i = gv(r, ai);
				break;
			case "sqrtTall":
				i = bv(r, ai, n);
		}
		return i;
	},
	_v = function (t, r) {
		switch (t) {
			case "⎜":
				return "M291 0 H417 V" + r + " H291z M291 0 H417 V" + r + " H291z";
			case "∣":
				return "M145 0 H188 V" + r + " H145z M145 0 H188 V" + r + " H145z";
			case "∥":
				return (
					"M145 0 H188 V" +
					r +
					" H145z M145 0 H188 V" +
					r +
					" H145z" +
					("M367 0 H410 V" + r + " H367z M367 0 H410 V" + r + " H367z")
				);
			case "⎟":
				return "M457 0 H583 V" + r + " H457z M457 0 H583 V" + r + " H457z";
			case "⎢":
				return "M319 0 H403 V" + r + " H319z M319 0 H403 V" + r + " H319z";
			case "⎥":
				return "M263 0 H347 V" + r + " H263z M263 0 H347 V" + r + " H263z";
			case "⎪":
				return "M384 0 H504 V" + r + " H384z M384 0 H504 V" + r + " H384z";
			case "⏐":
				return "M312 0 H355 V" + r + " H312z M312 0 H355 V" + r + " H312z";
			case "‖":
				return (
					"M257 0 H300 V" +
					r +
					" H257z M257 0 H300 V" +
					r +
					" H257z" +
					("M478 0 H521 V" + r + " H478z M478 0 H521 V" + r + " H478z")
				);
			default:
				return "";
		}
	},
	Gd = {
		doubleleftarrow: `M262 157
l10-10c34-36 62.7-77 86-123 3.3-8 5-13.3 5-16 0-5.3-6.7-8-20-8-7.3
 0-12.2.5-14.5 1.5-2.3 1-4.8 4.5-7.5 10.5-49.3 97.3-121.7 169.3-217 216-28
 14-57.3 25-88 33-6.7 2-11 3.8-13 5.5-2 1.7-3 4.2-3 7.5s1 5.8 3 7.5
c2 1.7 6.3 3.5 13 5.5 68 17.3 128.2 47.8 180.5 91.5 52.3 43.7 93.8 96.2 124.5
 157.5 9.3 8 15.3 12.3 18 13h6c12-.7 18-4 18-10 0-2-1.7-7-5-15-23.3-46-52-87
-86-123l-10-10h399738v-40H218c328 0 0 0 0 0l-10-8c-26.7-20-65.7-43-117-69 2.7
-2 6-3.7 10-5 36.7-16 72.3-37.3 107-64l10-8h399782v-40z
m8 0v40h399730v-40zm0 194v40h399730v-40z`,
		doublerightarrow: `M399738 392l
-10 10c-34 36-62.7 77-86 123-3.3 8-5 13.3-5 16 0 5.3 6.7 8 20 8 7.3 0 12.2-.5
 14.5-1.5 2.3-1 4.8-4.5 7.5-10.5 49.3-97.3 121.7-169.3 217-216 28-14 57.3-25 88
-33 6.7-2 11-3.8 13-5.5 2-1.7 3-4.2 3-7.5s-1-5.8-3-7.5c-2-1.7-6.3-3.5-13-5.5-68
-17.3-128.2-47.8-180.5-91.5-52.3-43.7-93.8-96.2-124.5-157.5-9.3-8-15.3-12.3-18
-13h-6c-12 .7-18 4-18 10 0 2 1.7 7 5 15 23.3 46 52 87 86 123l10 10H0v40h399782
c-328 0 0 0 0 0l10 8c26.7 20 65.7 43 117 69-2.7 2-6 3.7-10 5-36.7 16-72.3 37.3
-107 64l-10 8H0v40zM0 157v40h399730v-40zm0 194v40h399730v-40z`,
		leftarrow: `M400000 241H110l3-3c68.7-52.7 113.7-120
 135-202 4-14.7 6-23 6-25 0-7.3-7-11-21-11-8 0-13.2.8-15.5 2.5-2.3 1.7-4.2 5.8
-5.5 12.5-1.3 4.7-2.7 10.3-4 17-12 48.7-34.8 92-68.5 130S65.3 228.3 18 247
c-10 4-16 7.7-18 11 0 8.7 6 14.3 18 17 47.3 18.7 87.8 47 121.5 85S196 441.3 208
 490c.7 2 1.3 5 2 9s1.2 6.7 1.5 8c.3 1.3 1 3.3 2 6s2.2 4.5 3.5 5.5c1.3 1 3.3
 1.8 6 2.5s6 1 10 1c14 0 21-3.7 21-11 0-2-2-10.3-6-25-20-79.3-65-146.7-135-202
 l-3-3h399890zM100 241v40h399900v-40z`,
		leftbrace: `M6 548l-6-6v-35l6-11c56-104 135.3-181.3 238-232 57.3-28.7 117
-45 179-50h399577v120H403c-43.3 7-81 15-113 26-100.7 33-179.7 91-237 174-2.7
 5-6 9-10 13-.7 1-7.3 1-20 1H6z`,
		leftbraceunder: `M0 6l6-6h17c12.688 0 19.313.3 20 1 4 4 7.313 8.3 10 13
 35.313 51.3 80.813 93.8 136.5 127.5 55.688 33.7 117.188 55.8 184.5 66.5.688
 0 2 .3 4 1 18.688 2.7 76 4.3 172 5h399450v120H429l-6-1c-124.688-8-235-61.7
-331-161C60.687 138.7 32.312 99.3 7 54L0 41V6z`,
		leftgroup: `M400000 80
H435C64 80 168.3 229.4 21 260c-5.9 1.2-18 0-18 0-2 0-3-1-3-3v-38C76 61 257 0
 435 0h399565z`,
		leftgroupunder: `M400000 262
H435C64 262 168.3 112.6 21 82c-5.9-1.2-18 0-18 0-2 0-3 1-3 3v38c76 158 257 219
 435 219h399565z`,
		leftharpoon: `M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3
-3.3 10.2-9.5 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5
-18.3 3-21-1.3-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7
-196 228-6.7 4.7-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40z`,
		leftharpoonplus: `M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3-3.3 10.2-9.5
 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5-18.3 3-21-1.3
-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7-196 228-6.7 4.7
-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40zM0 435v40h400000v-40z
m0 0v40h400000v-40z`,
		leftharpoondown: `M7 241c-4 4-6.333 8.667-7 14 0 5.333.667 9 2 11s5.333
 5.333 12 10c90.667 54 156 130 196 228 3.333 10.667 6.333 16.333 9 17 2 .667 5
 1 9 1h5c10.667 0 16.667-2 18-6 2-2.667 1-9.667-3-21-32-87.333-82.667-157.667
-152-211l-3-3h399907v-40zM93 281 H400000 v-40L7 241z`,
		leftharpoondownplus: `M7 435c-4 4-6.3 8.7-7 14 0 5.3.7 9 2 11s5.3 5.3 12
 10c90.7 54 156 130 196 228 3.3 10.7 6.3 16.3 9 17 2 .7 5 1 9 1h5c10.7 0 16.7
-2 18-6 2-2.7 1-9.7-3-21-32-87.3-82.7-157.7-152-211l-3-3h399907v-40H7zm93 0
v40h399900v-40zM0 241v40h399900v-40zm0 0v40h399900v-40z`,
		lefthook: `M400000 281 H103s-33-11.2-61-33.5S0 197.3 0 164s14.2-61.2 42.5
-83.5C70.8 58.2 104 47 142 47 c16.7 0 25 6.7 25 20 0 12-8.7 18.7-26 20-40 3.3
-68.7 15.7-86 37-10 12-15 25.3-15 40 0 22.7 9.8 40.7 29.5 54 19.7 13.3 43.5 21
 71.5 23h399859zM103 281v-40h399897v40z`,
		leftlinesegment: `M40 281 V428 H0 V94 H40 V241 H400000 v40z
M40 281 V428 H0 V94 H40 V241 H400000 v40z`,
		leftmapsto: `M40 281 V448H0V74H40V241H400000v40z
M40 281 V448H0V74H40V241H400000v40z`,
		leftToFrom: `M0 147h400000v40H0zm0 214c68 40 115.7 95.7 143 167h22c15.3 0 23
-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69-70-101l-7-8h399905v-40H95l7-8
c28.7-32 52-65.7 70-101 10.7-23.3 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 265.3
 68 321 0 361zm0-174v-40h399900v40zm100 154v40h399900v-40z`,
		longequal: `M0 50 h400000 v40H0z m0 194h40000v40H0z
M0 50 h400000 v40H0z m0 194h40000v40H0z`,
		midbrace: `M200428 334
c-100.7-8.3-195.3-44-280-108-55.3-42-101.7-93-139-153l-9-14c-2.7 4-5.7 8.7-9 14
-53.3 86.7-123.7 153-211 199-66.7 36-137.3 56.3-212 62H0V214h199568c178.3-11.7
 311.7-78.3 403-201 6-8 9.7-12 11-12 .7-.7 6.7-1 18-1s17.3.3 18 1c1.3 0 5 4 11
 12 44.7 59.3 101.3 106.3 170 141s145.3 54.3 229 60h199572v120z`,
		midbraceunder: `M199572 214
c100.7 8.3 195.3 44 280 108 55.3 42 101.7 93 139 153l9 14c2.7-4 5.7-8.7 9-14
 53.3-86.7 123.7-153 211-199 66.7-36 137.3-56.3 212-62h199568v120H200432c-178.3
 11.7-311.7 78.3-403 201-6 8-9.7 12-11 12-.7.7-6.7 1-18 1s-17.3-.3-18-1c-1.3 0
-5-4-11-12-44.7-59.3-101.3-106.3-170-141s-145.3-54.3-229-60H0V214z`,
		oiintSize1: `M512.6 71.6c272.6 0 320.3 106.8 320.3 178.2 0 70.8-47.7 177.6
-320.3 177.6S193.1 320.6 193.1 249.8c0-71.4 46.9-178.2 319.5-178.2z
m368.1 178.2c0-86.4-60.9-215.4-368.1-215.4-306.4 0-367.3 129-367.3 215.4 0 85.8
60.9 214.8 367.3 214.8 307.2 0 368.1-129 368.1-214.8z`,
		oiintSize2: `M757.8 100.1c384.7 0 451.1 137.6 451.1 230 0 91.3-66.4 228.8
-451.1 228.8-386.3 0-452.7-137.5-452.7-228.8 0-92.4 66.4-230 452.7-230z
m502.4 230c0-111.2-82.4-277.2-502.4-277.2s-504 166-504 277.2
c0 110 84 276 504 276s502.4-166 502.4-276z`,
		oiiintSize1: `M681.4 71.6c408.9 0 480.5 106.8 480.5 178.2 0 70.8-71.6 177.6
-480.5 177.6S202.1 320.6 202.1 249.8c0-71.4 70.5-178.2 479.3-178.2z
m525.8 178.2c0-86.4-86.8-215.4-525.7-215.4-437.9 0-524.7 129-524.7 215.4 0
85.8 86.8 214.8 524.7 214.8 438.9 0 525.7-129 525.7-214.8z`,
		oiiintSize2: `M1021.2 53c603.6 0 707.8 165.8 707.8 277.2 0 110-104.2 275.8
-707.8 275.8-606 0-710.2-165.8-710.2-275.8C311 218.8 415.2 53 1021.2 53z
m770.4 277.1c0-131.2-126.4-327.6-770.5-327.6S248.4 198.9 248.4 330.1
c0 130 128.8 326.4 772.7 326.4s770.5-196.4 770.5-326.4z`,
		rightarrow: `M0 241v40h399891c-47.3 35.3-84 78-110 128
-16.7 32-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20
 11 8 0 13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7
 39-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85
-40.5-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5
-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67
 151.7 139 205zm0 0v40h399900v-40z`,
		rightbrace: `M400000 542l
-6 6h-17c-12.7 0-19.3-.3-20-1-4-4-7.3-8.3-10-13-35.3-51.3-80.8-93.8-136.5-127.5
s-117.2-55.8-184.5-66.5c-.7 0-2-.3-4-1-18.7-2.7-76-4.3-172-5H0V214h399571l6 1
c124.7 8 235 61.7 331 161 31.3 33.3 59.7 72.7 85 118l7 13v35z`,
		rightbraceunder: `M399994 0l6 6v35l-6 11c-56 104-135.3 181.3-238 232-57.3
 28.7-117 45-179 50H-300V214h399897c43.3-7 81-15 113-26 100.7-33 179.7-91 237
-174 2.7-5 6-9 10-13 .7-1 7.3-1 20-1h17z`,
		rightgroup: `M0 80h399565c371 0 266.7 149.4 414 180 5.9 1.2 18 0 18 0 2 0
 3-1 3-3v-38c-76-158-257-219-435-219H0z`,
		rightgroupunder: `M0 262h399565c371 0 266.7-149.4 414-180 5.9-1.2 18 0 18
 0 2 0 3 1 3 3v38c-76 158-257 219-435 219H0z`,
		rightharpoon: `M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3
-3.7-15.3-11-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2
-10.7 0-16.7 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58
 69.2 92 94.5zm0 0v40h399900v-40z`,
		rightharpoonplus: `M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3-3.7-15.3-11
-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2-10.7 0-16.7
 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58 69.2 92 94.5z
m0 0v40h399900v-40z m100 194v40h399900v-40zm0 0v40h399900v-40z`,
		rightharpoondown: `M399747 511c0 7.3 6.7 11 20 11 8 0 13-.8 15-2.5s4.7-6.8
 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3 8.5-5.8 9.5
-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3-64.7 57-92 95
-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 241v40h399900v-40z`,
		rightharpoondownplus: `M399747 705c0 7.3 6.7 11 20 11 8 0 13-.8
 15-2.5s4.7-6.8 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3
 8.5-5.8 9.5-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3
-64.7 57-92 95-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 435v40h399900v-40z
m0-194v40h400000v-40zm0 0v40h400000v-40z`,
		righthook: `M399859 241c-764 0 0 0 0 0 40-3.3 68.7-15.7 86-37 10-12 15-25.3
 15-40 0-22.7-9.8-40.7-29.5-54-19.7-13.3-43.5-21-71.5-23-17.3-1.3-26-8-26-20 0
-13.3 8.7-20 26-20 38 0 71 11.2 99 33.5 0 0 7 5.6 21 16.7 14 11.2 21 33.5 21
 66.8s-14 61.2-42 83.5c-28 22.3-61 33.5-99 33.5L0 241z M0 281v-40h399859v40z`,
		rightlinesegment: `M399960 241 V94 h40 V428 h-40 V281 H0 v-40z
M399960 241 V94 h40 V428 h-40 V281 H0 v-40z`,
		rightToFrom: `M400000 167c-70.7-42-118-97.7-142-167h-23c-15.3 0-23 .3-23
 1 0 1.3 5.3 13.7 16 37 18 35.3 41.3 69 70 101l7 8H0v40h399905l-7 8c-28.7 32
-52 65.7-70 101-10.7 23.3-16 35.7-16 37 0 .7 7.7 1 23 1h23c24-69.3 71.3-125 142
-167z M100 147v40h399900v-40zM0 341v40h399900v-40z`,
		twoheadleftarrow: `M0 167c68 40
 115.7 95.7 143 167h22c15.3 0 23-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69
-70-101l-7-8h125l9 7c50.7 39.3 85 86 103 140h46c0-4.7-6.3-18.7-19-42-18-35.3
-40-67.3-66-96l-9-9h399716v-40H284l9-9c26-28.7 48-60.7 66-96 12.7-23.333 19
-37.333 19-42h-46c-18 54-52.3 100.7-103 140l-9 7H95l7-8c28.7-32 52-65.7 70-101
 10.7-23.333 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 71.3 68 127 0 167z`,
		twoheadrightarrow: `M400000 167
c-68-40-115.7-95.7-143-167h-22c-15.3 0-23 .3-23 1 0 1.3 5.3 13.7 16 37 18 35.3
 41.3 69 70 101l7 8h-125l-9-7c-50.7-39.3-85-86-103-140h-46c0 4.7 6.3 18.7 19 42
 18 35.3 40 67.3 66 96l9 9H0v40h399716l-9 9c-26 28.7-48 60.7-66 96-12.7 23.333
-19 37.333-19 42h46c18-54 52.3-100.7 103-140l9-7h125l-7 8c-28.7 32-52 65.7-70
 101-10.7 23.333-16 35.7-16 37 0 .7 7.7 1 23 1h22c27.3-71.3 75-127 143-167z`,
		tilde1: `M200 55.538c-77 0-168 73.953-177 73.953-3 0-7
-2.175-9-5.437L2 97c-1-2-2-4-2-6 0-4 2-7 5-9l20-12C116 12 171 0 207 0c86 0
 114 68 191 68 78 0 168-68 177-68 4 0 7 2 9 5l12 19c1 2.175 2 4.35 2 6.525 0
 4.35-2 7.613-5 9.788l-19 13.05c-92 63.077-116.937 75.308-183 76.128
-68.267.847-113-73.952-191-73.952z`,
		tilde2: `M344 55.266c-142 0-300.638 81.316-311.5 86.418
-8.01 3.762-22.5 10.91-23.5 5.562L1 120c-1-2-1-3-1-4 0-5 3-9 8-10l18.4-9C160.9
 31.9 283 0 358 0c148 0 188 122 331 122s314-97 326-97c4 0 8 2 10 7l7 21.114
c1 2.14 1 3.21 1 4.28 0 5.347-3 9.626-7 10.696l-22.3 12.622C852.6 158.372 751
 181.476 676 181.476c-149 0-189-126.21-332-126.21z`,
		tilde3: `M786 59C457 59 32 175.242 13 175.242c-6 0-10-3.457
-11-10.37L.15 138c-1-7 3-12 10-13l19.2-6.4C378.4 40.7 634.3 0 804.3 0c337 0
 411.8 157 746.8 157 328 0 754-112 773-112 5 0 10 3 11 9l1 14.075c1 8.066-.697
 16.595-6.697 17.492l-21.052 7.31c-367.9 98.146-609.15 122.696-778.15 122.696
 -338 0-409-156.573-744-156.573z`,
		tilde4: `M786 58C457 58 32 177.487 13 177.487c-6 0-10-3.345
-11-10.035L.15 143c-1-7 3-12 10-13l22-6.7C381.2 35 637.15 0 807.15 0c337 0 409
 177 744 177 328 0 754-127 773-127 5 0 10 3 11 9l1 14.794c1 7.805-3 13.38-9
 14.495l-20.7 5.574c-366.85 99.79-607.3 139.372-776.3 139.372-338 0-409
 -175.236-744-175.236z`,
		vec: `M377 20c0-5.333 1.833-10 5.5-14S391 0 397 0c4.667 0 8.667 1.667 12 5
3.333 2.667 6.667 9 10 19 6.667 24.667 20.333 43.667 41 57 7.333 4.667 11
10.667 11 18 0 6-1 10-3 12s-6.667 5-14 9c-28.667 14.667-53.667 35.667-75 63
-1.333 1.333-3.167 3.5-5.5 6.5s-4 4.833-5 5.5c-1 .667-2.5 1.333-4.5 2s-4.333 1
-7 1c-4.667 0-9.167-1.833-13.5-5.5S337 184 337 178c0-12.667 15.667-32.333 47-59
H213l-171-1c-8.667-6-13-12.333-13-19 0-4.667 4.333-11.333 13-20h359
c-16-25.333-24-45-24-59z`,
		widehat1: `M529 0h5l519 115c5 1 9 5 9 10 0 1-1 2-1 3l-4 22
c-1 5-5 9-11 9h-2L532 67 19 159h-2c-5 0-9-4-11-9l-5-22c-1-6 2-12 8-13z`,
		widehat2: `M1181 0h2l1171 176c6 0 10 5 10 11l-2 23c-1 6-5 10
-11 10h-1L1182 67 15 220h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z`,
		widehat3: `M1181 0h2l1171 236c6 0 10 5 10 11l-2 23c-1 6-5 10
-11 10h-1L1182 67 15 280h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z`,
		widehat4: `M1181 0h2l1171 296c6 0 10 5 10 11l-2 23c-1 6-5 10
-11 10h-1L1182 67 15 340h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z`,
		widecheck1: `M529,159h5l519,-115c5,-1,9,-5,9,-10c0,-1,-1,-2,-1,-3l-4,-22c-1,
-5,-5,-9,-11,-9h-2l-512,92l-513,-92h-2c-5,0,-9,4,-11,9l-5,22c-1,6,2,12,8,13z`,
		widecheck2: `M1181,220h2l1171,-176c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,
-11,-10h-1l-1168,153l-1167,-153h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z`,
		widecheck3: `M1181,280h2l1171,-236c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,
-11,-10h-1l-1168,213l-1167,-213h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z`,
		widecheck4: `M1181,340h2l1171,-296c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,
-11,-10h-1l-1168,273l-1167,-273h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z`,
		baraboveleftarrow: `M400000 620h-399890l3 -3c68.7 -52.7 113.7 -120 135 -202
c4 -14.7 6 -23 6 -25c0 -7.3 -7 -11 -21 -11c-8 0 -13.2 0.8 -15.5 2.5
c-2.3 1.7 -4.2 5.8 -5.5 12.5c-1.3 4.7 -2.7 10.3 -4 17c-12 48.7 -34.8 92 -68.5 130
s-74.2 66.3 -121.5 85c-10 4 -16 7.7 -18 11c0 8.7 6 14.3 18 17c47.3 18.7 87.8 47
121.5 85s56.5 81.3 68.5 130c0.7 2 1.3 5 2 9s1.2 6.7 1.5 8c0.3 1.3 1 3.3 2 6
s2.2 4.5 3.5 5.5c1.3 1 3.3 1.8 6 2.5s6 1 10 1c14 0 21 -3.7 21 -11
c0 -2 -2 -10.3 -6 -25c-20 -79.3 -65 -146.7 -135 -202l-3 -3h399890z
M100 620v40h399900v-40z M0 241v40h399900v-40zM0 241v40h399900v-40z`,
		rightarrowabovebar: `M0 241v40h399891c-47.3 35.3-84 78-110 128-16.7 32
-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20 11 8 0
13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7 39
-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85-40.5
-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5
-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67
151.7 139 205zm96 379h399894v40H0zm0 0h399904v40H0z`,
		baraboveshortleftharpoon: `M507,435c-4,4,-6.3,8.7,-7,14c0,5.3,0.7,9,2,11
c1.3,2,5.3,5.3,12,10c90.7,54,156,130,196,228c3.3,10.7,6.3,16.3,9,17
c2,0.7,5,1,9,1c0,0,5,0,5,0c10.7,0,16.7,-2,18,-6c2,-2.7,1,-9.7,-3,-21
c-32,-87.3,-82.7,-157.7,-152,-211c0,0,-3,-3,-3,-3l399351,0l0,-40
c-398570,0,-399437,0,-399437,0z M593 435 v40 H399500 v-40z
M0 281 v-40 H399908 v40z M0 281 v-40 H399908 v40z`,
		rightharpoonaboveshortbar: `M0,241 l0,40c399126,0,399993,0,399993,0
c4.7,-4.7,7,-9.3,7,-14c0,-9.3,-3.7,-15.3,-11,-18c-92.7,-56.7,-159,-133.7,-199,
-231c-3.3,-9.3,-6,-14.7,-8,-16c-2,-1.3,-7,-2,-15,-2c-10.7,0,-16.7,2,-18,6
c-2,2.7,-1,9.7,3,21c15.3,42,36.7,81.8,64,119.5c27.3,37.7,58,69.2,92,94.5z
M0 241 v40 H399908 v-40z M0 475 v-40 H399500 v40z M0 475 v-40 H399500 v40z`,
		shortbaraboveleftharpoon: `M7,435c-4,4,-6.3,8.7,-7,14c0,5.3,0.7,9,2,11
c1.3,2,5.3,5.3,12,10c90.7,54,156,130,196,228c3.3,10.7,6.3,16.3,9,17c2,0.7,5,1,9,
1c0,0,5,0,5,0c10.7,0,16.7,-2,18,-6c2,-2.7,1,-9.7,-3,-21c-32,-87.3,-82.7,-157.7,
-152,-211c0,0,-3,-3,-3,-3l399907,0l0,-40c-399126,0,-399993,0,-399993,0z
M93 435 v40 H400000 v-40z M500 241 v40 H400000 v-40z M500 241 v40 H400000 v-40z`,
		shortrightharpoonabovebar: `M53,241l0,40c398570,0,399437,0,399437,0
c4.7,-4.7,7,-9.3,7,-14c0,-9.3,-3.7,-15.3,-11,-18c-92.7,-56.7,-159,-133.7,-199,
-231c-3.3,-9.3,-6,-14.7,-8,-16c-2,-1.3,-7,-2,-15,-2c-10.7,0,-16.7,2,-18,6
c-2,2.7,-1,9.7,3,21c15.3,42,36.7,81.8,64,119.5c27.3,37.7,58,69.2,92,94.5z
M500 241 v40 H399408 v-40z M500 435 v40 H400000 v-40z`,
	},
	wv = function (t, r) {
		switch (t) {
			case "lbrack":
				return (
					"M403 1759 V84 H666 V0 H319 V1759 v" +
					r +
					` v1759 h347 v-84
H403z M403 1759 V0 H319 V1759 v` +
					r +
					" v1759 h84z"
				);
			case "rbrack":
				return (
					"M347 1759 V0 H0 V84 H263 V1759 v" +
					r +
					` v1759 H0 v84 H347z
M347 1759 V0 H263 V1759 v` +
					r +
					" v1759 h84z"
				);
			case "vert":
				return (
					"M145 15 v585 v" +
					r +
					` v585 c2.667,10,9.667,15,21,15
c10,0,16.667,-5,20,-15 v-585 v` +
					-r +
					` v-585 c-2.667,-10,-9.667,-15,-21,-15
c-10,0,-16.667,5,-20,15z M188 15 H145 v585 v` +
					r +
					" v585 h43z"
				);
			case "doublevert":
				return (
					"M145 15 v585 v" +
					r +
					` v585 c2.667,10,9.667,15,21,15
c10,0,16.667,-5,20,-15 v-585 v` +
					-r +
					` v-585 c-2.667,-10,-9.667,-15,-21,-15
c-10,0,-16.667,5,-20,15z M188 15 H145 v585 v` +
					r +
					` v585 h43z
M367 15 v585 v` +
					r +
					` v585 c2.667,10,9.667,15,21,15
c10,0,16.667,-5,20,-15 v-585 v` +
					-r +
					` v-585 c-2.667,-10,-9.667,-15,-21,-15
c-10,0,-16.667,5,-20,15z M410 15 H367 v585 v` +
					r +
					" v585 h43z"
				);
			case "lfloor":
				return (
					"M319 602 V0 H403 V602 v" +
					r +
					` v1715 h263 v84 H319z
MM319 602 V0 H403 V602 v` +
					r +
					" v1715 H319z"
				);
			case "rfloor":
				return (
					"M319 602 V0 H403 V602 v" +
					r +
					` v1799 H0 v-84 H319z
MM319 602 V0 H403 V602 v` +
					r +
					" v1715 H319z"
				);
			case "lceil":
				return (
					"M403 1759 V84 H666 V0 H319 V1759 v" +
					r +
					` v602 h84z
M403 1759 V0 H319 V1759 v` +
					r +
					" v602 h84z"
				);
			case "rceil":
				return (
					"M347 1759 V0 H0 V84 H263 V1759 v" +
					r +
					` v602 h84z
M347 1759 V0 h-84 V1759 v` +
					r +
					" v602 h84z"
				);
			case "lparen":
				return (
					`M863,9c0,-2,-2,-5,-6,-9c0,0,-17,0,-17,0c-12.7,0,-19.3,0.3,-20,1
c-5.3,5.3,-10.3,11,-15,17c-242.7,294.7,-395.3,682,-458,1162c-21.3,163.3,-33.3,349,
-36,557 l0,` +
					(r + 84) +
					`c0.2,6,0,26,0,60c2,159.3,10,310.7,24,454c53.3,528,210,
949.7,470,1265c4.7,6,9.7,11.7,15,17c0.7,0.7,7,1,19,1c0,0,18,0,18,0c4,-4,6,-7,6,-9
c0,-2.7,-3.3,-8.7,-10,-18c-135.3,-192.7,-235.5,-414.3,-300.5,-665c-65,-250.7,-102.5,
-544.7,-112.5,-882c-2,-104,-3,-167,-3,-189
l0,-` +
					(r + 92) +
					`c0,-162.7,5.7,-314,17,-454c20.7,-272,63.7,-513,129,-723c65.3,
-210,155.3,-396.3,270,-559c6.7,-9.3,10,-15.3,10,-18z`
				);
			case "rparen":
				return (
					`M76,0c-16.7,0,-25,3,-25,9c0,2,2,6.3,6,13c21.3,28.7,42.3,60.3,
63,95c96.7,156.7,172.8,332.5,228.5,527.5c55.7,195,92.8,416.5,111.5,664.5
c11.3,139.3,17,290.7,17,454c0,28,1.7,43,3.3,45l0,` +
					(r + 9) +
					`
c-3,4,-3.3,16.7,-3.3,38c0,162,-5.7,313.7,-17,455c-18.7,248,-55.8,469.3,-111.5,664
c-55.7,194.7,-131.8,370.3,-228.5,527c-20.7,34.7,-41.7,66.3,-63,95c-2,3.3,-4,7,-6,11
c0,7.3,5.7,11,17,11c0,0,11,0,11,0c9.3,0,14.3,-0.3,15,-1c5.3,-5.3,10.3,-11,15,-17
c242.7,-294.7,395.3,-681.7,458,-1161c21.3,-164.7,33.3,-350.7,36,-558
l0,-` +
					(r + 144) +
					`c-2,-159.3,-10,-310.7,-24,-454c-53.3,-528,-210,-949.7,
-470,-1265c-4.7,-6,-9.7,-11.7,-15,-17c-0.7,-0.7,-6.7,-1,-18,-1z`
				);
			default:
				throw new Error("Unknown stretchy delimiter.");
		}
	};
class hs {
	constructor(t) {
		(this.children = void 0),
			(this.classes = void 0),
			(this.height = void 0),
			(this.depth = void 0),
			(this.maxFontSize = void 0),
			(this.style = void 0),
			(this.children = t),
			(this.classes = []),
			(this.height = 0),
			(this.depth = 0),
			(this.maxFontSize = 0),
			(this.style = {});
	}
	hasClass(t) {
		return _e.contains(this.classes, t);
	}
	toNode() {
		for (
			var t = document.createDocumentFragment(), r = 0;
			r < this.children.length;
			r++
		)
			t.appendChild(this.children[r].toNode());
		return t;
	}
	toMarkup() {
		for (var t = "", r = 0; r < this.children.length; r++)
			t += this.children[r].toMarkup();
		return t;
	}
	toText() {
		var t = (r) => r.toText();
		return this.children.map(t).join("");
	}
}
var dr = {
		"AMS-Regular": {
			32: [0, 0, 0, 0, 0.25],
			65: [0, 0.68889, 0, 0, 0.72222],
			66: [0, 0.68889, 0, 0, 0.66667],
			67: [0, 0.68889, 0, 0, 0.72222],
			68: [0, 0.68889, 0, 0, 0.72222],
			69: [0, 0.68889, 0, 0, 0.66667],
			70: [0, 0.68889, 0, 0, 0.61111],
			71: [0, 0.68889, 0, 0, 0.77778],
			72: [0, 0.68889, 0, 0, 0.77778],
			73: [0, 0.68889, 0, 0, 0.38889],
			74: [0.16667, 0.68889, 0, 0, 0.5],
			75: [0, 0.68889, 0, 0, 0.77778],
			76: [0, 0.68889, 0, 0, 0.66667],
			77: [0, 0.68889, 0, 0, 0.94445],
			78: [0, 0.68889, 0, 0, 0.72222],
			79: [0.16667, 0.68889, 0, 0, 0.77778],
			80: [0, 0.68889, 0, 0, 0.61111],
			81: [0.16667, 0.68889, 0, 0, 0.77778],
			82: [0, 0.68889, 0, 0, 0.72222],
			83: [0, 0.68889, 0, 0, 0.55556],
			84: [0, 0.68889, 0, 0, 0.66667],
			85: [0, 0.68889, 0, 0, 0.72222],
			86: [0, 0.68889, 0, 0, 0.72222],
			87: [0, 0.68889, 0, 0, 1],
			88: [0, 0.68889, 0, 0, 0.72222],
			89: [0, 0.68889, 0, 0, 0.72222],
			90: [0, 0.68889, 0, 0, 0.66667],
			107: [0, 0.68889, 0, 0, 0.55556],
			160: [0, 0, 0, 0, 0.25],
			165: [0, 0.675, 0.025, 0, 0.75],
			174: [0.15559, 0.69224, 0, 0, 0.94666],
			240: [0, 0.68889, 0, 0, 0.55556],
			295: [0, 0.68889, 0, 0, 0.54028],
			710: [0, 0.825, 0, 0, 2.33334],
			732: [0, 0.9, 0, 0, 2.33334],
			770: [0, 0.825, 0, 0, 2.33334],
			771: [0, 0.9, 0, 0, 2.33334],
			989: [0.08167, 0.58167, 0, 0, 0.77778],
			1008: [0, 0.43056, 0.04028, 0, 0.66667],
			8245: [0, 0.54986, 0, 0, 0.275],
			8463: [0, 0.68889, 0, 0, 0.54028],
			8487: [0, 0.68889, 0, 0, 0.72222],
			8498: [0, 0.68889, 0, 0, 0.55556],
			8502: [0, 0.68889, 0, 0, 0.66667],
			8503: [0, 0.68889, 0, 0, 0.44445],
			8504: [0, 0.68889, 0, 0, 0.66667],
			8513: [0, 0.68889, 0, 0, 0.63889],
			8592: [-0.03598, 0.46402, 0, 0, 0.5],
			8594: [-0.03598, 0.46402, 0, 0, 0.5],
			8602: [-0.13313, 0.36687, 0, 0, 1],
			8603: [-0.13313, 0.36687, 0, 0, 1],
			8606: [0.01354, 0.52239, 0, 0, 1],
			8608: [0.01354, 0.52239, 0, 0, 1],
			8610: [0.01354, 0.52239, 0, 0, 1.11111],
			8611: [0.01354, 0.52239, 0, 0, 1.11111],
			8619: [0, 0.54986, 0, 0, 1],
			8620: [0, 0.54986, 0, 0, 1],
			8621: [-0.13313, 0.37788, 0, 0, 1.38889],
			8622: [-0.13313, 0.36687, 0, 0, 1],
			8624: [0, 0.69224, 0, 0, 0.5],
			8625: [0, 0.69224, 0, 0, 0.5],
			8630: [0, 0.43056, 0, 0, 1],
			8631: [0, 0.43056, 0, 0, 1],
			8634: [0.08198, 0.58198, 0, 0, 0.77778],
			8635: [0.08198, 0.58198, 0, 0, 0.77778],
			8638: [0.19444, 0.69224, 0, 0, 0.41667],
			8639: [0.19444, 0.69224, 0, 0, 0.41667],
			8642: [0.19444, 0.69224, 0, 0, 0.41667],
			8643: [0.19444, 0.69224, 0, 0, 0.41667],
			8644: [0.1808, 0.675, 0, 0, 1],
			8646: [0.1808, 0.675, 0, 0, 1],
			8647: [0.1808, 0.675, 0, 0, 1],
			8648: [0.19444, 0.69224, 0, 0, 0.83334],
			8649: [0.1808, 0.675, 0, 0, 1],
			8650: [0.19444, 0.69224, 0, 0, 0.83334],
			8651: [0.01354, 0.52239, 0, 0, 1],
			8652: [0.01354, 0.52239, 0, 0, 1],
			8653: [-0.13313, 0.36687, 0, 0, 1],
			8654: [-0.13313, 0.36687, 0, 0, 1],
			8655: [-0.13313, 0.36687, 0, 0, 1],
			8666: [0.13667, 0.63667, 0, 0, 1],
			8667: [0.13667, 0.63667, 0, 0, 1],
			8669: [-0.13313, 0.37788, 0, 0, 1],
			8672: [-0.064, 0.437, 0, 0, 1.334],
			8674: [-0.064, 0.437, 0, 0, 1.334],
			8705: [0, 0.825, 0, 0, 0.5],
			8708: [0, 0.68889, 0, 0, 0.55556],
			8709: [0.08167, 0.58167, 0, 0, 0.77778],
			8717: [0, 0.43056, 0, 0, 0.42917],
			8722: [-0.03598, 0.46402, 0, 0, 0.5],
			8724: [0.08198, 0.69224, 0, 0, 0.77778],
			8726: [0.08167, 0.58167, 0, 0, 0.77778],
			8733: [0, 0.69224, 0, 0, 0.77778],
			8736: [0, 0.69224, 0, 0, 0.72222],
			8737: [0, 0.69224, 0, 0, 0.72222],
			8738: [0.03517, 0.52239, 0, 0, 0.72222],
			8739: [0.08167, 0.58167, 0, 0, 0.22222],
			8740: [0.25142, 0.74111, 0, 0, 0.27778],
			8741: [0.08167, 0.58167, 0, 0, 0.38889],
			8742: [0.25142, 0.74111, 0, 0, 0.5],
			8756: [0, 0.69224, 0, 0, 0.66667],
			8757: [0, 0.69224, 0, 0, 0.66667],
			8764: [-0.13313, 0.36687, 0, 0, 0.77778],
			8765: [-0.13313, 0.37788, 0, 0, 0.77778],
			8769: [-0.13313, 0.36687, 0, 0, 0.77778],
			8770: [-0.03625, 0.46375, 0, 0, 0.77778],
			8774: [0.30274, 0.79383, 0, 0, 0.77778],
			8776: [-0.01688, 0.48312, 0, 0, 0.77778],
			8778: [0.08167, 0.58167, 0, 0, 0.77778],
			8782: [0.06062, 0.54986, 0, 0, 0.77778],
			8783: [0.06062, 0.54986, 0, 0, 0.77778],
			8785: [0.08198, 0.58198, 0, 0, 0.77778],
			8786: [0.08198, 0.58198, 0, 0, 0.77778],
			8787: [0.08198, 0.58198, 0, 0, 0.77778],
			8790: [0, 0.69224, 0, 0, 0.77778],
			8791: [0.22958, 0.72958, 0, 0, 0.77778],
			8796: [0.08198, 0.91667, 0, 0, 0.77778],
			8806: [0.25583, 0.75583, 0, 0, 0.77778],
			8807: [0.25583, 0.75583, 0, 0, 0.77778],
			8808: [0.25142, 0.75726, 0, 0, 0.77778],
			8809: [0.25142, 0.75726, 0, 0, 0.77778],
			8812: [0.25583, 0.75583, 0, 0, 0.5],
			8814: [0.20576, 0.70576, 0, 0, 0.77778],
			8815: [0.20576, 0.70576, 0, 0, 0.77778],
			8816: [0.30274, 0.79383, 0, 0, 0.77778],
			8817: [0.30274, 0.79383, 0, 0, 0.77778],
			8818: [0.22958, 0.72958, 0, 0, 0.77778],
			8819: [0.22958, 0.72958, 0, 0, 0.77778],
			8822: [0.1808, 0.675, 0, 0, 0.77778],
			8823: [0.1808, 0.675, 0, 0, 0.77778],
			8828: [0.13667, 0.63667, 0, 0, 0.77778],
			8829: [0.13667, 0.63667, 0, 0, 0.77778],
			8830: [0.22958, 0.72958, 0, 0, 0.77778],
			8831: [0.22958, 0.72958, 0, 0, 0.77778],
			8832: [0.20576, 0.70576, 0, 0, 0.77778],
			8833: [0.20576, 0.70576, 0, 0, 0.77778],
			8840: [0.30274, 0.79383, 0, 0, 0.77778],
			8841: [0.30274, 0.79383, 0, 0, 0.77778],
			8842: [0.13597, 0.63597, 0, 0, 0.77778],
			8843: [0.13597, 0.63597, 0, 0, 0.77778],
			8847: [0.03517, 0.54986, 0, 0, 0.77778],
			8848: [0.03517, 0.54986, 0, 0, 0.77778],
			8858: [0.08198, 0.58198, 0, 0, 0.77778],
			8859: [0.08198, 0.58198, 0, 0, 0.77778],
			8861: [0.08198, 0.58198, 0, 0, 0.77778],
			8862: [0, 0.675, 0, 0, 0.77778],
			8863: [0, 0.675, 0, 0, 0.77778],
			8864: [0, 0.675, 0, 0, 0.77778],
			8865: [0, 0.675, 0, 0, 0.77778],
			8872: [0, 0.69224, 0, 0, 0.61111],
			8873: [0, 0.69224, 0, 0, 0.72222],
			8874: [0, 0.69224, 0, 0, 0.88889],
			8876: [0, 0.68889, 0, 0, 0.61111],
			8877: [0, 0.68889, 0, 0, 0.61111],
			8878: [0, 0.68889, 0, 0, 0.72222],
			8879: [0, 0.68889, 0, 0, 0.72222],
			8882: [0.03517, 0.54986, 0, 0, 0.77778],
			8883: [0.03517, 0.54986, 0, 0, 0.77778],
			8884: [0.13667, 0.63667, 0, 0, 0.77778],
			8885: [0.13667, 0.63667, 0, 0, 0.77778],
			8888: [0, 0.54986, 0, 0, 1.11111],
			8890: [0.19444, 0.43056, 0, 0, 0.55556],
			8891: [0.19444, 0.69224, 0, 0, 0.61111],
			8892: [0.19444, 0.69224, 0, 0, 0.61111],
			8901: [0, 0.54986, 0, 0, 0.27778],
			8903: [0.08167, 0.58167, 0, 0, 0.77778],
			8905: [0.08167, 0.58167, 0, 0, 0.77778],
			8906: [0.08167, 0.58167, 0, 0, 0.77778],
			8907: [0, 0.69224, 0, 0, 0.77778],
			8908: [0, 0.69224, 0, 0, 0.77778],
			8909: [-0.03598, 0.46402, 0, 0, 0.77778],
			8910: [0, 0.54986, 0, 0, 0.76042],
			8911: [0, 0.54986, 0, 0, 0.76042],
			8912: [0.03517, 0.54986, 0, 0, 0.77778],
			8913: [0.03517, 0.54986, 0, 0, 0.77778],
			8914: [0, 0.54986, 0, 0, 0.66667],
			8915: [0, 0.54986, 0, 0, 0.66667],
			8916: [0, 0.69224, 0, 0, 0.66667],
			8918: [0.0391, 0.5391, 0, 0, 0.77778],
			8919: [0.0391, 0.5391, 0, 0, 0.77778],
			8920: [0.03517, 0.54986, 0, 0, 1.33334],
			8921: [0.03517, 0.54986, 0, 0, 1.33334],
			8922: [0.38569, 0.88569, 0, 0, 0.77778],
			8923: [0.38569, 0.88569, 0, 0, 0.77778],
			8926: [0.13667, 0.63667, 0, 0, 0.77778],
			8927: [0.13667, 0.63667, 0, 0, 0.77778],
			8928: [0.30274, 0.79383, 0, 0, 0.77778],
			8929: [0.30274, 0.79383, 0, 0, 0.77778],
			8934: [0.23222, 0.74111, 0, 0, 0.77778],
			8935: [0.23222, 0.74111, 0, 0, 0.77778],
			8936: [0.23222, 0.74111, 0, 0, 0.77778],
			8937: [0.23222, 0.74111, 0, 0, 0.77778],
			8938: [0.20576, 0.70576, 0, 0, 0.77778],
			8939: [0.20576, 0.70576, 0, 0, 0.77778],
			8940: [0.30274, 0.79383, 0, 0, 0.77778],
			8941: [0.30274, 0.79383, 0, 0, 0.77778],
			8994: [0.19444, 0.69224, 0, 0, 0.77778],
			8995: [0.19444, 0.69224, 0, 0, 0.77778],
			9416: [0.15559, 0.69224, 0, 0, 0.90222],
			9484: [0, 0.69224, 0, 0, 0.5],
			9488: [0, 0.69224, 0, 0, 0.5],
			9492: [0, 0.37788, 0, 0, 0.5],
			9496: [0, 0.37788, 0, 0, 0.5],
			9585: [0.19444, 0.68889, 0, 0, 0.88889],
			9586: [0.19444, 0.74111, 0, 0, 0.88889],
			9632: [0, 0.675, 0, 0, 0.77778],
			9633: [0, 0.675, 0, 0, 0.77778],
			9650: [0, 0.54986, 0, 0, 0.72222],
			9651: [0, 0.54986, 0, 0, 0.72222],
			9654: [0.03517, 0.54986, 0, 0, 0.77778],
			9660: [0, 0.54986, 0, 0, 0.72222],
			9661: [0, 0.54986, 0, 0, 0.72222],
			9664: [0.03517, 0.54986, 0, 0, 0.77778],
			9674: [0.11111, 0.69224, 0, 0, 0.66667],
			9733: [0.19444, 0.69224, 0, 0, 0.94445],
			10003: [0, 0.69224, 0, 0, 0.83334],
			10016: [0, 0.69224, 0, 0, 0.83334],
			10731: [0.11111, 0.69224, 0, 0, 0.66667],
			10846: [0.19444, 0.75583, 0, 0, 0.61111],
			10877: [0.13667, 0.63667, 0, 0, 0.77778],
			10878: [0.13667, 0.63667, 0, 0, 0.77778],
			10885: [0.25583, 0.75583, 0, 0, 0.77778],
			10886: [0.25583, 0.75583, 0, 0, 0.77778],
			10887: [0.13597, 0.63597, 0, 0, 0.77778],
			10888: [0.13597, 0.63597, 0, 0, 0.77778],
			10889: [0.26167, 0.75726, 0, 0, 0.77778],
			10890: [0.26167, 0.75726, 0, 0, 0.77778],
			10891: [0.48256, 0.98256, 0, 0, 0.77778],
			10892: [0.48256, 0.98256, 0, 0, 0.77778],
			10901: [0.13667, 0.63667, 0, 0, 0.77778],
			10902: [0.13667, 0.63667, 0, 0, 0.77778],
			10933: [0.25142, 0.75726, 0, 0, 0.77778],
			10934: [0.25142, 0.75726, 0, 0, 0.77778],
			10935: [0.26167, 0.75726, 0, 0, 0.77778],
			10936: [0.26167, 0.75726, 0, 0, 0.77778],
			10937: [0.26167, 0.75726, 0, 0, 0.77778],
			10938: [0.26167, 0.75726, 0, 0, 0.77778],
			10949: [0.25583, 0.75583, 0, 0, 0.77778],
			10950: [0.25583, 0.75583, 0, 0, 0.77778],
			10955: [0.28481, 0.79383, 0, 0, 0.77778],
			10956: [0.28481, 0.79383, 0, 0, 0.77778],
			57350: [0.08167, 0.58167, 0, 0, 0.22222],
			57351: [0.08167, 0.58167, 0, 0, 0.38889],
			57352: [0.08167, 0.58167, 0, 0, 0.77778],
			57353: [0, 0.43056, 0.04028, 0, 0.66667],
			57356: [0.25142, 0.75726, 0, 0, 0.77778],
			57357: [0.25142, 0.75726, 0, 0, 0.77778],
			57358: [0.41951, 0.91951, 0, 0, 0.77778],
			57359: [0.30274, 0.79383, 0, 0, 0.77778],
			57360: [0.30274, 0.79383, 0, 0, 0.77778],
			57361: [0.41951, 0.91951, 0, 0, 0.77778],
			57366: [0.25142, 0.75726, 0, 0, 0.77778],
			57367: [0.25142, 0.75726, 0, 0, 0.77778],
			57368: [0.25142, 0.75726, 0, 0, 0.77778],
			57369: [0.25142, 0.75726, 0, 0, 0.77778],
			57370: [0.13597, 0.63597, 0, 0, 0.77778],
			57371: [0.13597, 0.63597, 0, 0, 0.77778],
		},
		"Caligraphic-Regular": {
			32: [0, 0, 0, 0, 0.25],
			65: [0, 0.68333, 0, 0.19445, 0.79847],
			66: [0, 0.68333, 0.03041, 0.13889, 0.65681],
			67: [0, 0.68333, 0.05834, 0.13889, 0.52653],
			68: [0, 0.68333, 0.02778, 0.08334, 0.77139],
			69: [0, 0.68333, 0.08944, 0.11111, 0.52778],
			70: [0, 0.68333, 0.09931, 0.11111, 0.71875],
			71: [0.09722, 0.68333, 0.0593, 0.11111, 0.59487],
			72: [0, 0.68333, 0.00965, 0.11111, 0.84452],
			73: [0, 0.68333, 0.07382, 0, 0.54452],
			74: [0.09722, 0.68333, 0.18472, 0.16667, 0.67778],
			75: [0, 0.68333, 0.01445, 0.05556, 0.76195],
			76: [0, 0.68333, 0, 0.13889, 0.68972],
			77: [0, 0.68333, 0, 0.13889, 1.2009],
			78: [0, 0.68333, 0.14736, 0.08334, 0.82049],
			79: [0, 0.68333, 0.02778, 0.11111, 0.79611],
			80: [0, 0.68333, 0.08222, 0.08334, 0.69556],
			81: [0.09722, 0.68333, 0, 0.11111, 0.81667],
			82: [0, 0.68333, 0, 0.08334, 0.8475],
			83: [0, 0.68333, 0.075, 0.13889, 0.60556],
			84: [0, 0.68333, 0.25417, 0, 0.54464],
			85: [0, 0.68333, 0.09931, 0.08334, 0.62583],
			86: [0, 0.68333, 0.08222, 0, 0.61278],
			87: [0, 0.68333, 0.08222, 0.08334, 0.98778],
			88: [0, 0.68333, 0.14643, 0.13889, 0.7133],
			89: [0.09722, 0.68333, 0.08222, 0.08334, 0.66834],
			90: [0, 0.68333, 0.07944, 0.13889, 0.72473],
			160: [0, 0, 0, 0, 0.25],
		},
		"Fraktur-Regular": {
			32: [0, 0, 0, 0, 0.25],
			33: [0, 0.69141, 0, 0, 0.29574],
			34: [0, 0.69141, 0, 0, 0.21471],
			38: [0, 0.69141, 0, 0, 0.73786],
			39: [0, 0.69141, 0, 0, 0.21201],
			40: [0.24982, 0.74947, 0, 0, 0.38865],
			41: [0.24982, 0.74947, 0, 0, 0.38865],
			42: [0, 0.62119, 0, 0, 0.27764],
			43: [0.08319, 0.58283, 0, 0, 0.75623],
			44: [0, 0.10803, 0, 0, 0.27764],
			45: [0.08319, 0.58283, 0, 0, 0.75623],
			46: [0, 0.10803, 0, 0, 0.27764],
			47: [0.24982, 0.74947, 0, 0, 0.50181],
			48: [0, 0.47534, 0, 0, 0.50181],
			49: [0, 0.47534, 0, 0, 0.50181],
			50: [0, 0.47534, 0, 0, 0.50181],
			51: [0.18906, 0.47534, 0, 0, 0.50181],
			52: [0.18906, 0.47534, 0, 0, 0.50181],
			53: [0.18906, 0.47534, 0, 0, 0.50181],
			54: [0, 0.69141, 0, 0, 0.50181],
			55: [0.18906, 0.47534, 0, 0, 0.50181],
			56: [0, 0.69141, 0, 0, 0.50181],
			57: [0.18906, 0.47534, 0, 0, 0.50181],
			58: [0, 0.47534, 0, 0, 0.21606],
			59: [0.12604, 0.47534, 0, 0, 0.21606],
			61: [-0.13099, 0.36866, 0, 0, 0.75623],
			63: [0, 0.69141, 0, 0, 0.36245],
			65: [0, 0.69141, 0, 0, 0.7176],
			66: [0, 0.69141, 0, 0, 0.88397],
			67: [0, 0.69141, 0, 0, 0.61254],
			68: [0, 0.69141, 0, 0, 0.83158],
			69: [0, 0.69141, 0, 0, 0.66278],
			70: [0.12604, 0.69141, 0, 0, 0.61119],
			71: [0, 0.69141, 0, 0, 0.78539],
			72: [0.06302, 0.69141, 0, 0, 0.7203],
			73: [0, 0.69141, 0, 0, 0.55448],
			74: [0.12604, 0.69141, 0, 0, 0.55231],
			75: [0, 0.69141, 0, 0, 0.66845],
			76: [0, 0.69141, 0, 0, 0.66602],
			77: [0, 0.69141, 0, 0, 1.04953],
			78: [0, 0.69141, 0, 0, 0.83212],
			79: [0, 0.69141, 0, 0, 0.82699],
			80: [0.18906, 0.69141, 0, 0, 0.82753],
			81: [0.03781, 0.69141, 0, 0, 0.82699],
			82: [0, 0.69141, 0, 0, 0.82807],
			83: [0, 0.69141, 0, 0, 0.82861],
			84: [0, 0.69141, 0, 0, 0.66899],
			85: [0, 0.69141, 0, 0, 0.64576],
			86: [0, 0.69141, 0, 0, 0.83131],
			87: [0, 0.69141, 0, 0, 1.04602],
			88: [0, 0.69141, 0, 0, 0.71922],
			89: [0.18906, 0.69141, 0, 0, 0.83293],
			90: [0.12604, 0.69141, 0, 0, 0.60201],
			91: [0.24982, 0.74947, 0, 0, 0.27764],
			93: [0.24982, 0.74947, 0, 0, 0.27764],
			94: [0, 0.69141, 0, 0, 0.49965],
			97: [0, 0.47534, 0, 0, 0.50046],
			98: [0, 0.69141, 0, 0, 0.51315],
			99: [0, 0.47534, 0, 0, 0.38946],
			100: [0, 0.62119, 0, 0, 0.49857],
			101: [0, 0.47534, 0, 0, 0.40053],
			102: [0.18906, 0.69141, 0, 0, 0.32626],
			103: [0.18906, 0.47534, 0, 0, 0.5037],
			104: [0.18906, 0.69141, 0, 0, 0.52126],
			105: [0, 0.69141, 0, 0, 0.27899],
			106: [0, 0.69141, 0, 0, 0.28088],
			107: [0, 0.69141, 0, 0, 0.38946],
			108: [0, 0.69141, 0, 0, 0.27953],
			109: [0, 0.47534, 0, 0, 0.76676],
			110: [0, 0.47534, 0, 0, 0.52666],
			111: [0, 0.47534, 0, 0, 0.48885],
			112: [0.18906, 0.52396, 0, 0, 0.50046],
			113: [0.18906, 0.47534, 0, 0, 0.48912],
			114: [0, 0.47534, 0, 0, 0.38919],
			115: [0, 0.47534, 0, 0, 0.44266],
			116: [0, 0.62119, 0, 0, 0.33301],
			117: [0, 0.47534, 0, 0, 0.5172],
			118: [0, 0.52396, 0, 0, 0.5118],
			119: [0, 0.52396, 0, 0, 0.77351],
			120: [0.18906, 0.47534, 0, 0, 0.38865],
			121: [0.18906, 0.47534, 0, 0, 0.49884],
			122: [0.18906, 0.47534, 0, 0, 0.39054],
			160: [0, 0, 0, 0, 0.25],
			8216: [0, 0.69141, 0, 0, 0.21471],
			8217: [0, 0.69141, 0, 0, 0.21471],
			58112: [0, 0.62119, 0, 0, 0.49749],
			58113: [0, 0.62119, 0, 0, 0.4983],
			58114: [0.18906, 0.69141, 0, 0, 0.33328],
			58115: [0.18906, 0.69141, 0, 0, 0.32923],
			58116: [0.18906, 0.47534, 0, 0, 0.50343],
			58117: [0, 0.69141, 0, 0, 0.33301],
			58118: [0, 0.62119, 0, 0, 0.33409],
			58119: [0, 0.47534, 0, 0, 0.50073],
		},
		"Main-Bold": {
			32: [0, 0, 0, 0, 0.25],
			33: [0, 0.69444, 0, 0, 0.35],
			34: [0, 0.69444, 0, 0, 0.60278],
			35: [0.19444, 0.69444, 0, 0, 0.95833],
			36: [0.05556, 0.75, 0, 0, 0.575],
			37: [0.05556, 0.75, 0, 0, 0.95833],
			38: [0, 0.69444, 0, 0, 0.89444],
			39: [0, 0.69444, 0, 0, 0.31944],
			40: [0.25, 0.75, 0, 0, 0.44722],
			41: [0.25, 0.75, 0, 0, 0.44722],
			42: [0, 0.75, 0, 0, 0.575],
			43: [0.13333, 0.63333, 0, 0, 0.89444],
			44: [0.19444, 0.15556, 0, 0, 0.31944],
			45: [0, 0.44444, 0, 0, 0.38333],
			46: [0, 0.15556, 0, 0, 0.31944],
			47: [0.25, 0.75, 0, 0, 0.575],
			48: [0, 0.64444, 0, 0, 0.575],
			49: [0, 0.64444, 0, 0, 0.575],
			50: [0, 0.64444, 0, 0, 0.575],
			51: [0, 0.64444, 0, 0, 0.575],
			52: [0, 0.64444, 0, 0, 0.575],
			53: [0, 0.64444, 0, 0, 0.575],
			54: [0, 0.64444, 0, 0, 0.575],
			55: [0, 0.64444, 0, 0, 0.575],
			56: [0, 0.64444, 0, 0, 0.575],
			57: [0, 0.64444, 0, 0, 0.575],
			58: [0, 0.44444, 0, 0, 0.31944],
			59: [0.19444, 0.44444, 0, 0, 0.31944],
			60: [0.08556, 0.58556, 0, 0, 0.89444],
			61: [-0.10889, 0.39111, 0, 0, 0.89444],
			62: [0.08556, 0.58556, 0, 0, 0.89444],
			63: [0, 0.69444, 0, 0, 0.54305],
			64: [0, 0.69444, 0, 0, 0.89444],
			65: [0, 0.68611, 0, 0, 0.86944],
			66: [0, 0.68611, 0, 0, 0.81805],
			67: [0, 0.68611, 0, 0, 0.83055],
			68: [0, 0.68611, 0, 0, 0.88194],
			69: [0, 0.68611, 0, 0, 0.75555],
			70: [0, 0.68611, 0, 0, 0.72361],
			71: [0, 0.68611, 0, 0, 0.90416],
			72: [0, 0.68611, 0, 0, 0.9],
			73: [0, 0.68611, 0, 0, 0.43611],
			74: [0, 0.68611, 0, 0, 0.59444],
			75: [0, 0.68611, 0, 0, 0.90138],
			76: [0, 0.68611, 0, 0, 0.69166],
			77: [0, 0.68611, 0, 0, 1.09166],
			78: [0, 0.68611, 0, 0, 0.9],
			79: [0, 0.68611, 0, 0, 0.86388],
			80: [0, 0.68611, 0, 0, 0.78611],
			81: [0.19444, 0.68611, 0, 0, 0.86388],
			82: [0, 0.68611, 0, 0, 0.8625],
			83: [0, 0.68611, 0, 0, 0.63889],
			84: [0, 0.68611, 0, 0, 0.8],
			85: [0, 0.68611, 0, 0, 0.88472],
			86: [0, 0.68611, 0.01597, 0, 0.86944],
			87: [0, 0.68611, 0.01597, 0, 1.18888],
			88: [0, 0.68611, 0, 0, 0.86944],
			89: [0, 0.68611, 0.02875, 0, 0.86944],
			90: [0, 0.68611, 0, 0, 0.70277],
			91: [0.25, 0.75, 0, 0, 0.31944],
			92: [0.25, 0.75, 0, 0, 0.575],
			93: [0.25, 0.75, 0, 0, 0.31944],
			94: [0, 0.69444, 0, 0, 0.575],
			95: [0.31, 0.13444, 0.03194, 0, 0.575],
			97: [0, 0.44444, 0, 0, 0.55902],
			98: [0, 0.69444, 0, 0, 0.63889],
			99: [0, 0.44444, 0, 0, 0.51111],
			100: [0, 0.69444, 0, 0, 0.63889],
			101: [0, 0.44444, 0, 0, 0.52708],
			102: [0, 0.69444, 0.10903, 0, 0.35139],
			103: [0.19444, 0.44444, 0.01597, 0, 0.575],
			104: [0, 0.69444, 0, 0, 0.63889],
			105: [0, 0.69444, 0, 0, 0.31944],
			106: [0.19444, 0.69444, 0, 0, 0.35139],
			107: [0, 0.69444, 0, 0, 0.60694],
			108: [0, 0.69444, 0, 0, 0.31944],
			109: [0, 0.44444, 0, 0, 0.95833],
			110: [0, 0.44444, 0, 0, 0.63889],
			111: [0, 0.44444, 0, 0, 0.575],
			112: [0.19444, 0.44444, 0, 0, 0.63889],
			113: [0.19444, 0.44444, 0, 0, 0.60694],
			114: [0, 0.44444, 0, 0, 0.47361],
			115: [0, 0.44444, 0, 0, 0.45361],
			116: [0, 0.63492, 0, 0, 0.44722],
			117: [0, 0.44444, 0, 0, 0.63889],
			118: [0, 0.44444, 0.01597, 0, 0.60694],
			119: [0, 0.44444, 0.01597, 0, 0.83055],
			120: [0, 0.44444, 0, 0, 0.60694],
			121: [0.19444, 0.44444, 0.01597, 0, 0.60694],
			122: [0, 0.44444, 0, 0, 0.51111],
			123: [0.25, 0.75, 0, 0, 0.575],
			124: [0.25, 0.75, 0, 0, 0.31944],
			125: [0.25, 0.75, 0, 0, 0.575],
			126: [0.35, 0.34444, 0, 0, 0.575],
			160: [0, 0, 0, 0, 0.25],
			163: [0, 0.69444, 0, 0, 0.86853],
			168: [0, 0.69444, 0, 0, 0.575],
			172: [0, 0.44444, 0, 0, 0.76666],
			176: [0, 0.69444, 0, 0, 0.86944],
			177: [0.13333, 0.63333, 0, 0, 0.89444],
			184: [0.17014, 0, 0, 0, 0.51111],
			198: [0, 0.68611, 0, 0, 1.04166],
			215: [0.13333, 0.63333, 0, 0, 0.89444],
			216: [0.04861, 0.73472, 0, 0, 0.89444],
			223: [0, 0.69444, 0, 0, 0.59722],
			230: [0, 0.44444, 0, 0, 0.83055],
			247: [0.13333, 0.63333, 0, 0, 0.89444],
			248: [0.09722, 0.54167, 0, 0, 0.575],
			305: [0, 0.44444, 0, 0, 0.31944],
			338: [0, 0.68611, 0, 0, 1.16944],
			339: [0, 0.44444, 0, 0, 0.89444],
			567: [0.19444, 0.44444, 0, 0, 0.35139],
			710: [0, 0.69444, 0, 0, 0.575],
			711: [0, 0.63194, 0, 0, 0.575],
			713: [0, 0.59611, 0, 0, 0.575],
			714: [0, 0.69444, 0, 0, 0.575],
			715: [0, 0.69444, 0, 0, 0.575],
			728: [0, 0.69444, 0, 0, 0.575],
			729: [0, 0.69444, 0, 0, 0.31944],
			730: [0, 0.69444, 0, 0, 0.86944],
			732: [0, 0.69444, 0, 0, 0.575],
			733: [0, 0.69444, 0, 0, 0.575],
			915: [0, 0.68611, 0, 0, 0.69166],
			916: [0, 0.68611, 0, 0, 0.95833],
			920: [0, 0.68611, 0, 0, 0.89444],
			923: [0, 0.68611, 0, 0, 0.80555],
			926: [0, 0.68611, 0, 0, 0.76666],
			928: [0, 0.68611, 0, 0, 0.9],
			931: [0, 0.68611, 0, 0, 0.83055],
			933: [0, 0.68611, 0, 0, 0.89444],
			934: [0, 0.68611, 0, 0, 0.83055],
			936: [0, 0.68611, 0, 0, 0.89444],
			937: [0, 0.68611, 0, 0, 0.83055],
			8211: [0, 0.44444, 0.03194, 0, 0.575],
			8212: [0, 0.44444, 0.03194, 0, 1.14999],
			8216: [0, 0.69444, 0, 0, 0.31944],
			8217: [0, 0.69444, 0, 0, 0.31944],
			8220: [0, 0.69444, 0, 0, 0.60278],
			8221: [0, 0.69444, 0, 0, 0.60278],
			8224: [0.19444, 0.69444, 0, 0, 0.51111],
			8225: [0.19444, 0.69444, 0, 0, 0.51111],
			8242: [0, 0.55556, 0, 0, 0.34444],
			8407: [0, 0.72444, 0.15486, 0, 0.575],
			8463: [0, 0.69444, 0, 0, 0.66759],
			8465: [0, 0.69444, 0, 0, 0.83055],
			8467: [0, 0.69444, 0, 0, 0.47361],
			8472: [0.19444, 0.44444, 0, 0, 0.74027],
			8476: [0, 0.69444, 0, 0, 0.83055],
			8501: [0, 0.69444, 0, 0, 0.70277],
			8592: [-0.10889, 0.39111, 0, 0, 1.14999],
			8593: [0.19444, 0.69444, 0, 0, 0.575],
			8594: [-0.10889, 0.39111, 0, 0, 1.14999],
			8595: [0.19444, 0.69444, 0, 0, 0.575],
			8596: [-0.10889, 0.39111, 0, 0, 1.14999],
			8597: [0.25, 0.75, 0, 0, 0.575],
			8598: [0.19444, 0.69444, 0, 0, 1.14999],
			8599: [0.19444, 0.69444, 0, 0, 1.14999],
			8600: [0.19444, 0.69444, 0, 0, 1.14999],
			8601: [0.19444, 0.69444, 0, 0, 1.14999],
			8636: [-0.10889, 0.39111, 0, 0, 1.14999],
			8637: [-0.10889, 0.39111, 0, 0, 1.14999],
			8640: [-0.10889, 0.39111, 0, 0, 1.14999],
			8641: [-0.10889, 0.39111, 0, 0, 1.14999],
			8656: [-0.10889, 0.39111, 0, 0, 1.14999],
			8657: [0.19444, 0.69444, 0, 0, 0.70277],
			8658: [-0.10889, 0.39111, 0, 0, 1.14999],
			8659: [0.19444, 0.69444, 0, 0, 0.70277],
			8660: [-0.10889, 0.39111, 0, 0, 1.14999],
			8661: [0.25, 0.75, 0, 0, 0.70277],
			8704: [0, 0.69444, 0, 0, 0.63889],
			8706: [0, 0.69444, 0.06389, 0, 0.62847],
			8707: [0, 0.69444, 0, 0, 0.63889],
			8709: [0.05556, 0.75, 0, 0, 0.575],
			8711: [0, 0.68611, 0, 0, 0.95833],
			8712: [0.08556, 0.58556, 0, 0, 0.76666],
			8715: [0.08556, 0.58556, 0, 0, 0.76666],
			8722: [0.13333, 0.63333, 0, 0, 0.89444],
			8723: [0.13333, 0.63333, 0, 0, 0.89444],
			8725: [0.25, 0.75, 0, 0, 0.575],
			8726: [0.25, 0.75, 0, 0, 0.575],
			8727: [-0.02778, 0.47222, 0, 0, 0.575],
			8728: [-0.02639, 0.47361, 0, 0, 0.575],
			8729: [-0.02639, 0.47361, 0, 0, 0.575],
			8730: [0.18, 0.82, 0, 0, 0.95833],
			8733: [0, 0.44444, 0, 0, 0.89444],
			8734: [0, 0.44444, 0, 0, 1.14999],
			8736: [0, 0.69224, 0, 0, 0.72222],
			8739: [0.25, 0.75, 0, 0, 0.31944],
			8741: [0.25, 0.75, 0, 0, 0.575],
			8743: [0, 0.55556, 0, 0, 0.76666],
			8744: [0, 0.55556, 0, 0, 0.76666],
			8745: [0, 0.55556, 0, 0, 0.76666],
			8746: [0, 0.55556, 0, 0, 0.76666],
			8747: [0.19444, 0.69444, 0.12778, 0, 0.56875],
			8764: [-0.10889, 0.39111, 0, 0, 0.89444],
			8768: [0.19444, 0.69444, 0, 0, 0.31944],
			8771: [0.00222, 0.50222, 0, 0, 0.89444],
			8773: [0.027, 0.638, 0, 0, 0.894],
			8776: [0.02444, 0.52444, 0, 0, 0.89444],
			8781: [0.00222, 0.50222, 0, 0, 0.89444],
			8801: [0.00222, 0.50222, 0, 0, 0.89444],
			8804: [0.19667, 0.69667, 0, 0, 0.89444],
			8805: [0.19667, 0.69667, 0, 0, 0.89444],
			8810: [0.08556, 0.58556, 0, 0, 1.14999],
			8811: [0.08556, 0.58556, 0, 0, 1.14999],
			8826: [0.08556, 0.58556, 0, 0, 0.89444],
			8827: [0.08556, 0.58556, 0, 0, 0.89444],
			8834: [0.08556, 0.58556, 0, 0, 0.89444],
			8835: [0.08556, 0.58556, 0, 0, 0.89444],
			8838: [0.19667, 0.69667, 0, 0, 0.89444],
			8839: [0.19667, 0.69667, 0, 0, 0.89444],
			8846: [0, 0.55556, 0, 0, 0.76666],
			8849: [0.19667, 0.69667, 0, 0, 0.89444],
			8850: [0.19667, 0.69667, 0, 0, 0.89444],
			8851: [0, 0.55556, 0, 0, 0.76666],
			8852: [0, 0.55556, 0, 0, 0.76666],
			8853: [0.13333, 0.63333, 0, 0, 0.89444],
			8854: [0.13333, 0.63333, 0, 0, 0.89444],
			8855: [0.13333, 0.63333, 0, 0, 0.89444],
			8856: [0.13333, 0.63333, 0, 0, 0.89444],
			8857: [0.13333, 0.63333, 0, 0, 0.89444],
			8866: [0, 0.69444, 0, 0, 0.70277],
			8867: [0, 0.69444, 0, 0, 0.70277],
			8868: [0, 0.69444, 0, 0, 0.89444],
			8869: [0, 0.69444, 0, 0, 0.89444],
			8900: [-0.02639, 0.47361, 0, 0, 0.575],
			8901: [-0.02639, 0.47361, 0, 0, 0.31944],
			8902: [-0.02778, 0.47222, 0, 0, 0.575],
			8968: [0.25, 0.75, 0, 0, 0.51111],
			8969: [0.25, 0.75, 0, 0, 0.51111],
			8970: [0.25, 0.75, 0, 0, 0.51111],
			8971: [0.25, 0.75, 0, 0, 0.51111],
			8994: [-0.13889, 0.36111, 0, 0, 1.14999],
			8995: [-0.13889, 0.36111, 0, 0, 1.14999],
			9651: [0.19444, 0.69444, 0, 0, 1.02222],
			9657: [-0.02778, 0.47222, 0, 0, 0.575],
			9661: [0.19444, 0.69444, 0, 0, 1.02222],
			9667: [-0.02778, 0.47222, 0, 0, 0.575],
			9711: [0.19444, 0.69444, 0, 0, 1.14999],
			9824: [0.12963, 0.69444, 0, 0, 0.89444],
			9825: [0.12963, 0.69444, 0, 0, 0.89444],
			9826: [0.12963, 0.69444, 0, 0, 0.89444],
			9827: [0.12963, 0.69444, 0, 0, 0.89444],
			9837: [0, 0.75, 0, 0, 0.44722],
			9838: [0.19444, 0.69444, 0, 0, 0.44722],
			9839: [0.19444, 0.69444, 0, 0, 0.44722],
			10216: [0.25, 0.75, 0, 0, 0.44722],
			10217: [0.25, 0.75, 0, 0, 0.44722],
			10815: [0, 0.68611, 0, 0, 0.9],
			10927: [0.19667, 0.69667, 0, 0, 0.89444],
			10928: [0.19667, 0.69667, 0, 0, 0.89444],
			57376: [0.19444, 0.69444, 0, 0, 0],
		},
		"Main-BoldItalic": {
			32: [0, 0, 0, 0, 0.25],
			33: [0, 0.69444, 0.11417, 0, 0.38611],
			34: [0, 0.69444, 0.07939, 0, 0.62055],
			35: [0.19444, 0.69444, 0.06833, 0, 0.94444],
			37: [0.05556, 0.75, 0.12861, 0, 0.94444],
			38: [0, 0.69444, 0.08528, 0, 0.88555],
			39: [0, 0.69444, 0.12945, 0, 0.35555],
			40: [0.25, 0.75, 0.15806, 0, 0.47333],
			41: [0.25, 0.75, 0.03306, 0, 0.47333],
			42: [0, 0.75, 0.14333, 0, 0.59111],
			43: [0.10333, 0.60333, 0.03306, 0, 0.88555],
			44: [0.19444, 0.14722, 0, 0, 0.35555],
			45: [0, 0.44444, 0.02611, 0, 0.41444],
			46: [0, 0.14722, 0, 0, 0.35555],
			47: [0.25, 0.75, 0.15806, 0, 0.59111],
			48: [0, 0.64444, 0.13167, 0, 0.59111],
			49: [0, 0.64444, 0.13167, 0, 0.59111],
			50: [0, 0.64444, 0.13167, 0, 0.59111],
			51: [0, 0.64444, 0.13167, 0, 0.59111],
			52: [0.19444, 0.64444, 0.13167, 0, 0.59111],
			53: [0, 0.64444, 0.13167, 0, 0.59111],
			54: [0, 0.64444, 0.13167, 0, 0.59111],
			55: [0.19444, 0.64444, 0.13167, 0, 0.59111],
			56: [0, 0.64444, 0.13167, 0, 0.59111],
			57: [0, 0.64444, 0.13167, 0, 0.59111],
			58: [0, 0.44444, 0.06695, 0, 0.35555],
			59: [0.19444, 0.44444, 0.06695, 0, 0.35555],
			61: [-0.10889, 0.39111, 0.06833, 0, 0.88555],
			63: [0, 0.69444, 0.11472, 0, 0.59111],
			64: [0, 0.69444, 0.09208, 0, 0.88555],
			65: [0, 0.68611, 0, 0, 0.86555],
			66: [0, 0.68611, 0.0992, 0, 0.81666],
			67: [0, 0.68611, 0.14208, 0, 0.82666],
			68: [0, 0.68611, 0.09062, 0, 0.87555],
			69: [0, 0.68611, 0.11431, 0, 0.75666],
			70: [0, 0.68611, 0.12903, 0, 0.72722],
			71: [0, 0.68611, 0.07347, 0, 0.89527],
			72: [0, 0.68611, 0.17208, 0, 0.8961],
			73: [0, 0.68611, 0.15681, 0, 0.47166],
			74: [0, 0.68611, 0.145, 0, 0.61055],
			75: [0, 0.68611, 0.14208, 0, 0.89499],
			76: [0, 0.68611, 0, 0, 0.69777],
			77: [0, 0.68611, 0.17208, 0, 1.07277],
			78: [0, 0.68611, 0.17208, 0, 0.8961],
			79: [0, 0.68611, 0.09062, 0, 0.85499],
			80: [0, 0.68611, 0.0992, 0, 0.78721],
			81: [0.19444, 0.68611, 0.09062, 0, 0.85499],
			82: [0, 0.68611, 0.02559, 0, 0.85944],
			83: [0, 0.68611, 0.11264, 0, 0.64999],
			84: [0, 0.68611, 0.12903, 0, 0.7961],
			85: [0, 0.68611, 0.17208, 0, 0.88083],
			86: [0, 0.68611, 0.18625, 0, 0.86555],
			87: [0, 0.68611, 0.18625, 0, 1.15999],
			88: [0, 0.68611, 0.15681, 0, 0.86555],
			89: [0, 0.68611, 0.19803, 0, 0.86555],
			90: [0, 0.68611, 0.14208, 0, 0.70888],
			91: [0.25, 0.75, 0.1875, 0, 0.35611],
			93: [0.25, 0.75, 0.09972, 0, 0.35611],
			94: [0, 0.69444, 0.06709, 0, 0.59111],
			95: [0.31, 0.13444, 0.09811, 0, 0.59111],
			97: [0, 0.44444, 0.09426, 0, 0.59111],
			98: [0, 0.69444, 0.07861, 0, 0.53222],
			99: [0, 0.44444, 0.05222, 0, 0.53222],
			100: [0, 0.69444, 0.10861, 0, 0.59111],
			101: [0, 0.44444, 0.085, 0, 0.53222],
			102: [0.19444, 0.69444, 0.21778, 0, 0.4],
			103: [0.19444, 0.44444, 0.105, 0, 0.53222],
			104: [0, 0.69444, 0.09426, 0, 0.59111],
			105: [0, 0.69326, 0.11387, 0, 0.35555],
			106: [0.19444, 0.69326, 0.1672, 0, 0.35555],
			107: [0, 0.69444, 0.11111, 0, 0.53222],
			108: [0, 0.69444, 0.10861, 0, 0.29666],
			109: [0, 0.44444, 0.09426, 0, 0.94444],
			110: [0, 0.44444, 0.09426, 0, 0.64999],
			111: [0, 0.44444, 0.07861, 0, 0.59111],
			112: [0.19444, 0.44444, 0.07861, 0, 0.59111],
			113: [0.19444, 0.44444, 0.105, 0, 0.53222],
			114: [0, 0.44444, 0.11111, 0, 0.50167],
			115: [0, 0.44444, 0.08167, 0, 0.48694],
			116: [0, 0.63492, 0.09639, 0, 0.385],
			117: [0, 0.44444, 0.09426, 0, 0.62055],
			118: [0, 0.44444, 0.11111, 0, 0.53222],
			119: [0, 0.44444, 0.11111, 0, 0.76777],
			120: [0, 0.44444, 0.12583, 0, 0.56055],
			121: [0.19444, 0.44444, 0.105, 0, 0.56166],
			122: [0, 0.44444, 0.13889, 0, 0.49055],
			126: [0.35, 0.34444, 0.11472, 0, 0.59111],
			160: [0, 0, 0, 0, 0.25],
			168: [0, 0.69444, 0.11473, 0, 0.59111],
			176: [0, 0.69444, 0, 0, 0.94888],
			184: [0.17014, 0, 0, 0, 0.53222],
			198: [0, 0.68611, 0.11431, 0, 1.02277],
			216: [0.04861, 0.73472, 0.09062, 0, 0.88555],
			223: [0.19444, 0.69444, 0.09736, 0, 0.665],
			230: [0, 0.44444, 0.085, 0, 0.82666],
			248: [0.09722, 0.54167, 0.09458, 0, 0.59111],
			305: [0, 0.44444, 0.09426, 0, 0.35555],
			338: [0, 0.68611, 0.11431, 0, 1.14054],
			339: [0, 0.44444, 0.085, 0, 0.82666],
			567: [0.19444, 0.44444, 0.04611, 0, 0.385],
			710: [0, 0.69444, 0.06709, 0, 0.59111],
			711: [0, 0.63194, 0.08271, 0, 0.59111],
			713: [0, 0.59444, 0.10444, 0, 0.59111],
			714: [0, 0.69444, 0.08528, 0, 0.59111],
			715: [0, 0.69444, 0, 0, 0.59111],
			728: [0, 0.69444, 0.10333, 0, 0.59111],
			729: [0, 0.69444, 0.12945, 0, 0.35555],
			730: [0, 0.69444, 0, 0, 0.94888],
			732: [0, 0.69444, 0.11472, 0, 0.59111],
			733: [0, 0.69444, 0.11472, 0, 0.59111],
			915: [0, 0.68611, 0.12903, 0, 0.69777],
			916: [0, 0.68611, 0, 0, 0.94444],
			920: [0, 0.68611, 0.09062, 0, 0.88555],
			923: [0, 0.68611, 0, 0, 0.80666],
			926: [0, 0.68611, 0.15092, 0, 0.76777],
			928: [0, 0.68611, 0.17208, 0, 0.8961],
			931: [0, 0.68611, 0.11431, 0, 0.82666],
			933: [0, 0.68611, 0.10778, 0, 0.88555],
			934: [0, 0.68611, 0.05632, 0, 0.82666],
			936: [0, 0.68611, 0.10778, 0, 0.88555],
			937: [0, 0.68611, 0.0992, 0, 0.82666],
			8211: [0, 0.44444, 0.09811, 0, 0.59111],
			8212: [0, 0.44444, 0.09811, 0, 1.18221],
			8216: [0, 0.69444, 0.12945, 0, 0.35555],
			8217: [0, 0.69444, 0.12945, 0, 0.35555],
			8220: [0, 0.69444, 0.16772, 0, 0.62055],
			8221: [0, 0.69444, 0.07939, 0, 0.62055],
		},
		"Main-Italic": {
			32: [0, 0, 0, 0, 0.25],
			33: [0, 0.69444, 0.12417, 0, 0.30667],
			34: [0, 0.69444, 0.06961, 0, 0.51444],
			35: [0.19444, 0.69444, 0.06616, 0, 0.81777],
			37: [0.05556, 0.75, 0.13639, 0, 0.81777],
			38: [0, 0.69444, 0.09694, 0, 0.76666],
			39: [0, 0.69444, 0.12417, 0, 0.30667],
			40: [0.25, 0.75, 0.16194, 0, 0.40889],
			41: [0.25, 0.75, 0.03694, 0, 0.40889],
			42: [0, 0.75, 0.14917, 0, 0.51111],
			43: [0.05667, 0.56167, 0.03694, 0, 0.76666],
			44: [0.19444, 0.10556, 0, 0, 0.30667],
			45: [0, 0.43056, 0.02826, 0, 0.35778],
			46: [0, 0.10556, 0, 0, 0.30667],
			47: [0.25, 0.75, 0.16194, 0, 0.51111],
			48: [0, 0.64444, 0.13556, 0, 0.51111],
			49: [0, 0.64444, 0.13556, 0, 0.51111],
			50: [0, 0.64444, 0.13556, 0, 0.51111],
			51: [0, 0.64444, 0.13556, 0, 0.51111],
			52: [0.19444, 0.64444, 0.13556, 0, 0.51111],
			53: [0, 0.64444, 0.13556, 0, 0.51111],
			54: [0, 0.64444, 0.13556, 0, 0.51111],
			55: [0.19444, 0.64444, 0.13556, 0, 0.51111],
			56: [0, 0.64444, 0.13556, 0, 0.51111],
			57: [0, 0.64444, 0.13556, 0, 0.51111],
			58: [0, 0.43056, 0.0582, 0, 0.30667],
			59: [0.19444, 0.43056, 0.0582, 0, 0.30667],
			61: [-0.13313, 0.36687, 0.06616, 0, 0.76666],
			63: [0, 0.69444, 0.1225, 0, 0.51111],
			64: [0, 0.69444, 0.09597, 0, 0.76666],
			65: [0, 0.68333, 0, 0, 0.74333],
			66: [0, 0.68333, 0.10257, 0, 0.70389],
			67: [0, 0.68333, 0.14528, 0, 0.71555],
			68: [0, 0.68333, 0.09403, 0, 0.755],
			69: [0, 0.68333, 0.12028, 0, 0.67833],
			70: [0, 0.68333, 0.13305, 0, 0.65277],
			71: [0, 0.68333, 0.08722, 0, 0.77361],
			72: [0, 0.68333, 0.16389, 0, 0.74333],
			73: [0, 0.68333, 0.15806, 0, 0.38555],
			74: [0, 0.68333, 0.14028, 0, 0.525],
			75: [0, 0.68333, 0.14528, 0, 0.76888],
			76: [0, 0.68333, 0, 0, 0.62722],
			77: [0, 0.68333, 0.16389, 0, 0.89666],
			78: [0, 0.68333, 0.16389, 0, 0.74333],
			79: [0, 0.68333, 0.09403, 0, 0.76666],
			80: [0, 0.68333, 0.10257, 0, 0.67833],
			81: [0.19444, 0.68333, 0.09403, 0, 0.76666],
			82: [0, 0.68333, 0.03868, 0, 0.72944],
			83: [0, 0.68333, 0.11972, 0, 0.56222],
			84: [0, 0.68333, 0.13305, 0, 0.71555],
			85: [0, 0.68333, 0.16389, 0, 0.74333],
			86: [0, 0.68333, 0.18361, 0, 0.74333],
			87: [0, 0.68333, 0.18361, 0, 0.99888],
			88: [0, 0.68333, 0.15806, 0, 0.74333],
			89: [0, 0.68333, 0.19383, 0, 0.74333],
			90: [0, 0.68333, 0.14528, 0, 0.61333],
			91: [0.25, 0.75, 0.1875, 0, 0.30667],
			93: [0.25, 0.75, 0.10528, 0, 0.30667],
			94: [0, 0.69444, 0.06646, 0, 0.51111],
			95: [0.31, 0.12056, 0.09208, 0, 0.51111],
			97: [0, 0.43056, 0.07671, 0, 0.51111],
			98: [0, 0.69444, 0.06312, 0, 0.46],
			99: [0, 0.43056, 0.05653, 0, 0.46],
			100: [0, 0.69444, 0.10333, 0, 0.51111],
			101: [0, 0.43056, 0.07514, 0, 0.46],
			102: [0.19444, 0.69444, 0.21194, 0, 0.30667],
			103: [0.19444, 0.43056, 0.08847, 0, 0.46],
			104: [0, 0.69444, 0.07671, 0, 0.51111],
			105: [0, 0.65536, 0.1019, 0, 0.30667],
			106: [0.19444, 0.65536, 0.14467, 0, 0.30667],
			107: [0, 0.69444, 0.10764, 0, 0.46],
			108: [0, 0.69444, 0.10333, 0, 0.25555],
			109: [0, 0.43056, 0.07671, 0, 0.81777],
			110: [0, 0.43056, 0.07671, 0, 0.56222],
			111: [0, 0.43056, 0.06312, 0, 0.51111],
			112: [0.19444, 0.43056, 0.06312, 0, 0.51111],
			113: [0.19444, 0.43056, 0.08847, 0, 0.46],
			114: [0, 0.43056, 0.10764, 0, 0.42166],
			115: [0, 0.43056, 0.08208, 0, 0.40889],
			116: [0, 0.61508, 0.09486, 0, 0.33222],
			117: [0, 0.43056, 0.07671, 0, 0.53666],
			118: [0, 0.43056, 0.10764, 0, 0.46],
			119: [0, 0.43056, 0.10764, 0, 0.66444],
			120: [0, 0.43056, 0.12042, 0, 0.46389],
			121: [0.19444, 0.43056, 0.08847, 0, 0.48555],
			122: [0, 0.43056, 0.12292, 0, 0.40889],
			126: [0.35, 0.31786, 0.11585, 0, 0.51111],
			160: [0, 0, 0, 0, 0.25],
			168: [0, 0.66786, 0.10474, 0, 0.51111],
			176: [0, 0.69444, 0, 0, 0.83129],
			184: [0.17014, 0, 0, 0, 0.46],
			198: [0, 0.68333, 0.12028, 0, 0.88277],
			216: [0.04861, 0.73194, 0.09403, 0, 0.76666],
			223: [0.19444, 0.69444, 0.10514, 0, 0.53666],
			230: [0, 0.43056, 0.07514, 0, 0.71555],
			248: [0.09722, 0.52778, 0.09194, 0, 0.51111],
			338: [0, 0.68333, 0.12028, 0, 0.98499],
			339: [0, 0.43056, 0.07514, 0, 0.71555],
			710: [0, 0.69444, 0.06646, 0, 0.51111],
			711: [0, 0.62847, 0.08295, 0, 0.51111],
			713: [0, 0.56167, 0.10333, 0, 0.51111],
			714: [0, 0.69444, 0.09694, 0, 0.51111],
			715: [0, 0.69444, 0, 0, 0.51111],
			728: [0, 0.69444, 0.10806, 0, 0.51111],
			729: [0, 0.66786, 0.11752, 0, 0.30667],
			730: [0, 0.69444, 0, 0, 0.83129],
			732: [0, 0.66786, 0.11585, 0, 0.51111],
			733: [0, 0.69444, 0.1225, 0, 0.51111],
			915: [0, 0.68333, 0.13305, 0, 0.62722],
			916: [0, 0.68333, 0, 0, 0.81777],
			920: [0, 0.68333, 0.09403, 0, 0.76666],
			923: [0, 0.68333, 0, 0, 0.69222],
			926: [0, 0.68333, 0.15294, 0, 0.66444],
			928: [0, 0.68333, 0.16389, 0, 0.74333],
			931: [0, 0.68333, 0.12028, 0, 0.71555],
			933: [0, 0.68333, 0.11111, 0, 0.76666],
			934: [0, 0.68333, 0.05986, 0, 0.71555],
			936: [0, 0.68333, 0.11111, 0, 0.76666],
			937: [0, 0.68333, 0.10257, 0, 0.71555],
			8211: [0, 0.43056, 0.09208, 0, 0.51111],
			8212: [0, 0.43056, 0.09208, 0, 1.02222],
			8216: [0, 0.69444, 0.12417, 0, 0.30667],
			8217: [0, 0.69444, 0.12417, 0, 0.30667],
			8220: [0, 0.69444, 0.1685, 0, 0.51444],
			8221: [0, 0.69444, 0.06961, 0, 0.51444],
			8463: [0, 0.68889, 0, 0, 0.54028],
		},
		"Main-Regular": {
			32: [0, 0, 0, 0, 0.25],
			33: [0, 0.69444, 0, 0, 0.27778],
			34: [0, 0.69444, 0, 0, 0.5],
			35: [0.19444, 0.69444, 0, 0, 0.83334],
			36: [0.05556, 0.75, 0, 0, 0.5],
			37: [0.05556, 0.75, 0, 0, 0.83334],
			38: [0, 0.69444, 0, 0, 0.77778],
			39: [0, 0.69444, 0, 0, 0.27778],
			40: [0.25, 0.75, 0, 0, 0.38889],
			41: [0.25, 0.75, 0, 0, 0.38889],
			42: [0, 0.75, 0, 0, 0.5],
			43: [0.08333, 0.58333, 0, 0, 0.77778],
			44: [0.19444, 0.10556, 0, 0, 0.27778],
			45: [0, 0.43056, 0, 0, 0.33333],
			46: [0, 0.10556, 0, 0, 0.27778],
			47: [0.25, 0.75, 0, 0, 0.5],
			48: [0, 0.64444, 0, 0, 0.5],
			49: [0, 0.64444, 0, 0, 0.5],
			50: [0, 0.64444, 0, 0, 0.5],
			51: [0, 0.64444, 0, 0, 0.5],
			52: [0, 0.64444, 0, 0, 0.5],
			53: [0, 0.64444, 0, 0, 0.5],
			54: [0, 0.64444, 0, 0, 0.5],
			55: [0, 0.64444, 0, 0, 0.5],
			56: [0, 0.64444, 0, 0, 0.5],
			57: [0, 0.64444, 0, 0, 0.5],
			58: [0, 0.43056, 0, 0, 0.27778],
			59: [0.19444, 0.43056, 0, 0, 0.27778],
			60: [0.0391, 0.5391, 0, 0, 0.77778],
			61: [-0.13313, 0.36687, 0, 0, 0.77778],
			62: [0.0391, 0.5391, 0, 0, 0.77778],
			63: [0, 0.69444, 0, 0, 0.47222],
			64: [0, 0.69444, 0, 0, 0.77778],
			65: [0, 0.68333, 0, 0, 0.75],
			66: [0, 0.68333, 0, 0, 0.70834],
			67: [0, 0.68333, 0, 0, 0.72222],
			68: [0, 0.68333, 0, 0, 0.76389],
			69: [0, 0.68333, 0, 0, 0.68056],
			70: [0, 0.68333, 0, 0, 0.65278],
			71: [0, 0.68333, 0, 0, 0.78472],
			72: [0, 0.68333, 0, 0, 0.75],
			73: [0, 0.68333, 0, 0, 0.36111],
			74: [0, 0.68333, 0, 0, 0.51389],
			75: [0, 0.68333, 0, 0, 0.77778],
			76: [0, 0.68333, 0, 0, 0.625],
			77: [0, 0.68333, 0, 0, 0.91667],
			78: [0, 0.68333, 0, 0, 0.75],
			79: [0, 0.68333, 0, 0, 0.77778],
			80: [0, 0.68333, 0, 0, 0.68056],
			81: [0.19444, 0.68333, 0, 0, 0.77778],
			82: [0, 0.68333, 0, 0, 0.73611],
			83: [0, 0.68333, 0, 0, 0.55556],
			84: [0, 0.68333, 0, 0, 0.72222],
			85: [0, 0.68333, 0, 0, 0.75],
			86: [0, 0.68333, 0.01389, 0, 0.75],
			87: [0, 0.68333, 0.01389, 0, 1.02778],
			88: [0, 0.68333, 0, 0, 0.75],
			89: [0, 0.68333, 0.025, 0, 0.75],
			90: [0, 0.68333, 0, 0, 0.61111],
			91: [0.25, 0.75, 0, 0, 0.27778],
			92: [0.25, 0.75, 0, 0, 0.5],
			93: [0.25, 0.75, 0, 0, 0.27778],
			94: [0, 0.69444, 0, 0, 0.5],
			95: [0.31, 0.12056, 0.02778, 0, 0.5],
			97: [0, 0.43056, 0, 0, 0.5],
			98: [0, 0.69444, 0, 0, 0.55556],
			99: [0, 0.43056, 0, 0, 0.44445],
			100: [0, 0.69444, 0, 0, 0.55556],
			101: [0, 0.43056, 0, 0, 0.44445],
			102: [0, 0.69444, 0.07778, 0, 0.30556],
			103: [0.19444, 0.43056, 0.01389, 0, 0.5],
			104: [0, 0.69444, 0, 0, 0.55556],
			105: [0, 0.66786, 0, 0, 0.27778],
			106: [0.19444, 0.66786, 0, 0, 0.30556],
			107: [0, 0.69444, 0, 0, 0.52778],
			108: [0, 0.69444, 0, 0, 0.27778],
			109: [0, 0.43056, 0, 0, 0.83334],
			110: [0, 0.43056, 0, 0, 0.55556],
			111: [0, 0.43056, 0, 0, 0.5],
			112: [0.19444, 0.43056, 0, 0, 0.55556],
			113: [0.19444, 0.43056, 0, 0, 0.52778],
			114: [0, 0.43056, 0, 0, 0.39167],
			115: [0, 0.43056, 0, 0, 0.39445],
			116: [0, 0.61508, 0, 0, 0.38889],
			117: [0, 0.43056, 0, 0, 0.55556],
			118: [0, 0.43056, 0.01389, 0, 0.52778],
			119: [0, 0.43056, 0.01389, 0, 0.72222],
			120: [0, 0.43056, 0, 0, 0.52778],
			121: [0.19444, 0.43056, 0.01389, 0, 0.52778],
			122: [0, 0.43056, 0, 0, 0.44445],
			123: [0.25, 0.75, 0, 0, 0.5],
			124: [0.25, 0.75, 0, 0, 0.27778],
			125: [0.25, 0.75, 0, 0, 0.5],
			126: [0.35, 0.31786, 0, 0, 0.5],
			160: [0, 0, 0, 0, 0.25],
			163: [0, 0.69444, 0, 0, 0.76909],
			167: [0.19444, 0.69444, 0, 0, 0.44445],
			168: [0, 0.66786, 0, 0, 0.5],
			172: [0, 0.43056, 0, 0, 0.66667],
			176: [0, 0.69444, 0, 0, 0.75],
			177: [0.08333, 0.58333, 0, 0, 0.77778],
			182: [0.19444, 0.69444, 0, 0, 0.61111],
			184: [0.17014, 0, 0, 0, 0.44445],
			198: [0, 0.68333, 0, 0, 0.90278],
			215: [0.08333, 0.58333, 0, 0, 0.77778],
			216: [0.04861, 0.73194, 0, 0, 0.77778],
			223: [0, 0.69444, 0, 0, 0.5],
			230: [0, 0.43056, 0, 0, 0.72222],
			247: [0.08333, 0.58333, 0, 0, 0.77778],
			248: [0.09722, 0.52778, 0, 0, 0.5],
			305: [0, 0.43056, 0, 0, 0.27778],
			338: [0, 0.68333, 0, 0, 1.01389],
			339: [0, 0.43056, 0, 0, 0.77778],
			567: [0.19444, 0.43056, 0, 0, 0.30556],
			710: [0, 0.69444, 0, 0, 0.5],
			711: [0, 0.62847, 0, 0, 0.5],
			713: [0, 0.56778, 0, 0, 0.5],
			714: [0, 0.69444, 0, 0, 0.5],
			715: [0, 0.69444, 0, 0, 0.5],
			728: [0, 0.69444, 0, 0, 0.5],
			729: [0, 0.66786, 0, 0, 0.27778],
			730: [0, 0.69444, 0, 0, 0.75],
			732: [0, 0.66786, 0, 0, 0.5],
			733: [0, 0.69444, 0, 0, 0.5],
			915: [0, 0.68333, 0, 0, 0.625],
			916: [0, 0.68333, 0, 0, 0.83334],
			920: [0, 0.68333, 0, 0, 0.77778],
			923: [0, 0.68333, 0, 0, 0.69445],
			926: [0, 0.68333, 0, 0, 0.66667],
			928: [0, 0.68333, 0, 0, 0.75],
			931: [0, 0.68333, 0, 0, 0.72222],
			933: [0, 0.68333, 0, 0, 0.77778],
			934: [0, 0.68333, 0, 0, 0.72222],
			936: [0, 0.68333, 0, 0, 0.77778],
			937: [0, 0.68333, 0, 0, 0.72222],
			8211: [0, 0.43056, 0.02778, 0, 0.5],
			8212: [0, 0.43056, 0.02778, 0, 1],
			8216: [0, 0.69444, 0, 0, 0.27778],
			8217: [0, 0.69444, 0, 0, 0.27778],
			8220: [0, 0.69444, 0, 0, 0.5],
			8221: [0, 0.69444, 0, 0, 0.5],
			8224: [0.19444, 0.69444, 0, 0, 0.44445],
			8225: [0.19444, 0.69444, 0, 0, 0.44445],
			8230: [0, 0.123, 0, 0, 1.172],
			8242: [0, 0.55556, 0, 0, 0.275],
			8407: [0, 0.71444, 0.15382, 0, 0.5],
			8463: [0, 0.68889, 0, 0, 0.54028],
			8465: [0, 0.69444, 0, 0, 0.72222],
			8467: [0, 0.69444, 0, 0.11111, 0.41667],
			8472: [0.19444, 0.43056, 0, 0.11111, 0.63646],
			8476: [0, 0.69444, 0, 0, 0.72222],
			8501: [0, 0.69444, 0, 0, 0.61111],
			8592: [-0.13313, 0.36687, 0, 0, 1],
			8593: [0.19444, 0.69444, 0, 0, 0.5],
			8594: [-0.13313, 0.36687, 0, 0, 1],
			8595: [0.19444, 0.69444, 0, 0, 0.5],
			8596: [-0.13313, 0.36687, 0, 0, 1],
			8597: [0.25, 0.75, 0, 0, 0.5],
			8598: [0.19444, 0.69444, 0, 0, 1],
			8599: [0.19444, 0.69444, 0, 0, 1],
			8600: [0.19444, 0.69444, 0, 0, 1],
			8601: [0.19444, 0.69444, 0, 0, 1],
			8614: [0.011, 0.511, 0, 0, 1],
			8617: [0.011, 0.511, 0, 0, 1.126],
			8618: [0.011, 0.511, 0, 0, 1.126],
			8636: [-0.13313, 0.36687, 0, 0, 1],
			8637: [-0.13313, 0.36687, 0, 0, 1],
			8640: [-0.13313, 0.36687, 0, 0, 1],
			8641: [-0.13313, 0.36687, 0, 0, 1],
			8652: [0.011, 0.671, 0, 0, 1],
			8656: [-0.13313, 0.36687, 0, 0, 1],
			8657: [0.19444, 0.69444, 0, 0, 0.61111],
			8658: [-0.13313, 0.36687, 0, 0, 1],
			8659: [0.19444, 0.69444, 0, 0, 0.61111],
			8660: [-0.13313, 0.36687, 0, 0, 1],
			8661: [0.25, 0.75, 0, 0, 0.61111],
			8704: [0, 0.69444, 0, 0, 0.55556],
			8706: [0, 0.69444, 0.05556, 0.08334, 0.5309],
			8707: [0, 0.69444, 0, 0, 0.55556],
			8709: [0.05556, 0.75, 0, 0, 0.5],
			8711: [0, 0.68333, 0, 0, 0.83334],
			8712: [0.0391, 0.5391, 0, 0, 0.66667],
			8715: [0.0391, 0.5391, 0, 0, 0.66667],
			8722: [0.08333, 0.58333, 0, 0, 0.77778],
			8723: [0.08333, 0.58333, 0, 0, 0.77778],
			8725: [0.25, 0.75, 0, 0, 0.5],
			8726: [0.25, 0.75, 0, 0, 0.5],
			8727: [-0.03472, 0.46528, 0, 0, 0.5],
			8728: [-0.05555, 0.44445, 0, 0, 0.5],
			8729: [-0.05555, 0.44445, 0, 0, 0.5],
			8730: [0.2, 0.8, 0, 0, 0.83334],
			8733: [0, 0.43056, 0, 0, 0.77778],
			8734: [0, 0.43056, 0, 0, 1],
			8736: [0, 0.69224, 0, 0, 0.72222],
			8739: [0.25, 0.75, 0, 0, 0.27778],
			8741: [0.25, 0.75, 0, 0, 0.5],
			8743: [0, 0.55556, 0, 0, 0.66667],
			8744: [0, 0.55556, 0, 0, 0.66667],
			8745: [0, 0.55556, 0, 0, 0.66667],
			8746: [0, 0.55556, 0, 0, 0.66667],
			8747: [0.19444, 0.69444, 0.11111, 0, 0.41667],
			8764: [-0.13313, 0.36687, 0, 0, 0.77778],
			8768: [0.19444, 0.69444, 0, 0, 0.27778],
			8771: [-0.03625, 0.46375, 0, 0, 0.77778],
			8773: [-0.022, 0.589, 0, 0, 0.778],
			8776: [-0.01688, 0.48312, 0, 0, 0.77778],
			8781: [-0.03625, 0.46375, 0, 0, 0.77778],
			8784: [-0.133, 0.673, 0, 0, 0.778],
			8801: [-0.03625, 0.46375, 0, 0, 0.77778],
			8804: [0.13597, 0.63597, 0, 0, 0.77778],
			8805: [0.13597, 0.63597, 0, 0, 0.77778],
			8810: [0.0391, 0.5391, 0, 0, 1],
			8811: [0.0391, 0.5391, 0, 0, 1],
			8826: [0.0391, 0.5391, 0, 0, 0.77778],
			8827: [0.0391, 0.5391, 0, 0, 0.77778],
			8834: [0.0391, 0.5391, 0, 0, 0.77778],
			8835: [0.0391, 0.5391, 0, 0, 0.77778],
			8838: [0.13597, 0.63597, 0, 0, 0.77778],
			8839: [0.13597, 0.63597, 0, 0, 0.77778],
			8846: [0, 0.55556, 0, 0, 0.66667],
			8849: [0.13597, 0.63597, 0, 0, 0.77778],
			8850: [0.13597, 0.63597, 0, 0, 0.77778],
			8851: [0, 0.55556, 0, 0, 0.66667],
			8852: [0, 0.55556, 0, 0, 0.66667],
			8853: [0.08333, 0.58333, 0, 0, 0.77778],
			8854: [0.08333, 0.58333, 0, 0, 0.77778],
			8855: [0.08333, 0.58333, 0, 0, 0.77778],
			8856: [0.08333, 0.58333, 0, 0, 0.77778],
			8857: [0.08333, 0.58333, 0, 0, 0.77778],
			8866: [0, 0.69444, 0, 0, 0.61111],
			8867: [0, 0.69444, 0, 0, 0.61111],
			8868: [0, 0.69444, 0, 0, 0.77778],
			8869: [0, 0.69444, 0, 0, 0.77778],
			8872: [0.249, 0.75, 0, 0, 0.867],
			8900: [-0.05555, 0.44445, 0, 0, 0.5],
			8901: [-0.05555, 0.44445, 0, 0, 0.27778],
			8902: [-0.03472, 0.46528, 0, 0, 0.5],
			8904: [0.005, 0.505, 0, 0, 0.9],
			8942: [0.03, 0.903, 0, 0, 0.278],
			8943: [-0.19, 0.313, 0, 0, 1.172],
			8945: [-0.1, 0.823, 0, 0, 1.282],
			8968: [0.25, 0.75, 0, 0, 0.44445],
			8969: [0.25, 0.75, 0, 0, 0.44445],
			8970: [0.25, 0.75, 0, 0, 0.44445],
			8971: [0.25, 0.75, 0, 0, 0.44445],
			8994: [-0.14236, 0.35764, 0, 0, 1],
			8995: [-0.14236, 0.35764, 0, 0, 1],
			9136: [0.244, 0.744, 0, 0, 0.412],
			9137: [0.244, 0.745, 0, 0, 0.412],
			9651: [0.19444, 0.69444, 0, 0, 0.88889],
			9657: [-0.03472, 0.46528, 0, 0, 0.5],
			9661: [0.19444, 0.69444, 0, 0, 0.88889],
			9667: [-0.03472, 0.46528, 0, 0, 0.5],
			9711: [0.19444, 0.69444, 0, 0, 1],
			9824: [0.12963, 0.69444, 0, 0, 0.77778],
			9825: [0.12963, 0.69444, 0, 0, 0.77778],
			9826: [0.12963, 0.69444, 0, 0, 0.77778],
			9827: [0.12963, 0.69444, 0, 0, 0.77778],
			9837: [0, 0.75, 0, 0, 0.38889],
			9838: [0.19444, 0.69444, 0, 0, 0.38889],
			9839: [0.19444, 0.69444, 0, 0, 0.38889],
			10216: [0.25, 0.75, 0, 0, 0.38889],
			10217: [0.25, 0.75, 0, 0, 0.38889],
			10222: [0.244, 0.744, 0, 0, 0.412],
			10223: [0.244, 0.745, 0, 0, 0.412],
			10229: [0.011, 0.511, 0, 0, 1.609],
			10230: [0.011, 0.511, 0, 0, 1.638],
			10231: [0.011, 0.511, 0, 0, 1.859],
			10232: [0.024, 0.525, 0, 0, 1.609],
			10233: [0.024, 0.525, 0, 0, 1.638],
			10234: [0.024, 0.525, 0, 0, 1.858],
			10236: [0.011, 0.511, 0, 0, 1.638],
			10815: [0, 0.68333, 0, 0, 0.75],
			10927: [0.13597, 0.63597, 0, 0, 0.77778],
			10928: [0.13597, 0.63597, 0, 0, 0.77778],
			57376: [0.19444, 0.69444, 0, 0, 0],
		},
		"Math-BoldItalic": {
			32: [0, 0, 0, 0, 0.25],
			48: [0, 0.44444, 0, 0, 0.575],
			49: [0, 0.44444, 0, 0, 0.575],
			50: [0, 0.44444, 0, 0, 0.575],
			51: [0.19444, 0.44444, 0, 0, 0.575],
			52: [0.19444, 0.44444, 0, 0, 0.575],
			53: [0.19444, 0.44444, 0, 0, 0.575],
			54: [0, 0.64444, 0, 0, 0.575],
			55: [0.19444, 0.44444, 0, 0, 0.575],
			56: [0, 0.64444, 0, 0, 0.575],
			57: [0.19444, 0.44444, 0, 0, 0.575],
			65: [0, 0.68611, 0, 0, 0.86944],
			66: [0, 0.68611, 0.04835, 0, 0.8664],
			67: [0, 0.68611, 0.06979, 0, 0.81694],
			68: [0, 0.68611, 0.03194, 0, 0.93812],
			69: [0, 0.68611, 0.05451, 0, 0.81007],
			70: [0, 0.68611, 0.15972, 0, 0.68889],
			71: [0, 0.68611, 0, 0, 0.88673],
			72: [0, 0.68611, 0.08229, 0, 0.98229],
			73: [0, 0.68611, 0.07778, 0, 0.51111],
			74: [0, 0.68611, 0.10069, 0, 0.63125],
			75: [0, 0.68611, 0.06979, 0, 0.97118],
			76: [0, 0.68611, 0, 0, 0.75555],
			77: [0, 0.68611, 0.11424, 0, 1.14201],
			78: [0, 0.68611, 0.11424, 0, 0.95034],
			79: [0, 0.68611, 0.03194, 0, 0.83666],
			80: [0, 0.68611, 0.15972, 0, 0.72309],
			81: [0.19444, 0.68611, 0, 0, 0.86861],
			82: [0, 0.68611, 0.00421, 0, 0.87235],
			83: [0, 0.68611, 0.05382, 0, 0.69271],
			84: [0, 0.68611, 0.15972, 0, 0.63663],
			85: [0, 0.68611, 0.11424, 0, 0.80027],
			86: [0, 0.68611, 0.25555, 0, 0.67778],
			87: [0, 0.68611, 0.15972, 0, 1.09305],
			88: [0, 0.68611, 0.07778, 0, 0.94722],
			89: [0, 0.68611, 0.25555, 0, 0.67458],
			90: [0, 0.68611, 0.06979, 0, 0.77257],
			97: [0, 0.44444, 0, 0, 0.63287],
			98: [0, 0.69444, 0, 0, 0.52083],
			99: [0, 0.44444, 0, 0, 0.51342],
			100: [0, 0.69444, 0, 0, 0.60972],
			101: [0, 0.44444, 0, 0, 0.55361],
			102: [0.19444, 0.69444, 0.11042, 0, 0.56806],
			103: [0.19444, 0.44444, 0.03704, 0, 0.5449],
			104: [0, 0.69444, 0, 0, 0.66759],
			105: [0, 0.69326, 0, 0, 0.4048],
			106: [0.19444, 0.69326, 0.0622, 0, 0.47083],
			107: [0, 0.69444, 0.01852, 0, 0.6037],
			108: [0, 0.69444, 0.0088, 0, 0.34815],
			109: [0, 0.44444, 0, 0, 1.0324],
			110: [0, 0.44444, 0, 0, 0.71296],
			111: [0, 0.44444, 0, 0, 0.58472],
			112: [0.19444, 0.44444, 0, 0, 0.60092],
			113: [0.19444, 0.44444, 0.03704, 0, 0.54213],
			114: [0, 0.44444, 0.03194, 0, 0.5287],
			115: [0, 0.44444, 0, 0, 0.53125],
			116: [0, 0.63492, 0, 0, 0.41528],
			117: [0, 0.44444, 0, 0, 0.68102],
			118: [0, 0.44444, 0.03704, 0, 0.56666],
			119: [0, 0.44444, 0.02778, 0, 0.83148],
			120: [0, 0.44444, 0, 0, 0.65903],
			121: [0.19444, 0.44444, 0.03704, 0, 0.59028],
			122: [0, 0.44444, 0.04213, 0, 0.55509],
			160: [0, 0, 0, 0, 0.25],
			915: [0, 0.68611, 0.15972, 0, 0.65694],
			916: [0, 0.68611, 0, 0, 0.95833],
			920: [0, 0.68611, 0.03194, 0, 0.86722],
			923: [0, 0.68611, 0, 0, 0.80555],
			926: [0, 0.68611, 0.07458, 0, 0.84125],
			928: [0, 0.68611, 0.08229, 0, 0.98229],
			931: [0, 0.68611, 0.05451, 0, 0.88507],
			933: [0, 0.68611, 0.15972, 0, 0.67083],
			934: [0, 0.68611, 0, 0, 0.76666],
			936: [0, 0.68611, 0.11653, 0, 0.71402],
			937: [0, 0.68611, 0.04835, 0, 0.8789],
			945: [0, 0.44444, 0, 0, 0.76064],
			946: [0.19444, 0.69444, 0.03403, 0, 0.65972],
			947: [0.19444, 0.44444, 0.06389, 0, 0.59003],
			948: [0, 0.69444, 0.03819, 0, 0.52222],
			949: [0, 0.44444, 0, 0, 0.52882],
			950: [0.19444, 0.69444, 0.06215, 0, 0.50833],
			951: [0.19444, 0.44444, 0.03704, 0, 0.6],
			952: [0, 0.69444, 0.03194, 0, 0.5618],
			953: [0, 0.44444, 0, 0, 0.41204],
			954: [0, 0.44444, 0, 0, 0.66759],
			955: [0, 0.69444, 0, 0, 0.67083],
			956: [0.19444, 0.44444, 0, 0, 0.70787],
			957: [0, 0.44444, 0.06898, 0, 0.57685],
			958: [0.19444, 0.69444, 0.03021, 0, 0.50833],
			959: [0, 0.44444, 0, 0, 0.58472],
			960: [0, 0.44444, 0.03704, 0, 0.68241],
			961: [0.19444, 0.44444, 0, 0, 0.6118],
			962: [0.09722, 0.44444, 0.07917, 0, 0.42361],
			963: [0, 0.44444, 0.03704, 0, 0.68588],
			964: [0, 0.44444, 0.13472, 0, 0.52083],
			965: [0, 0.44444, 0.03704, 0, 0.63055],
			966: [0.19444, 0.44444, 0, 0, 0.74722],
			967: [0.19444, 0.44444, 0, 0, 0.71805],
			968: [0.19444, 0.69444, 0.03704, 0, 0.75833],
			969: [0, 0.44444, 0.03704, 0, 0.71782],
			977: [0, 0.69444, 0, 0, 0.69155],
			981: [0.19444, 0.69444, 0, 0, 0.7125],
			982: [0, 0.44444, 0.03194, 0, 0.975],
			1009: [0.19444, 0.44444, 0, 0, 0.6118],
			1013: [0, 0.44444, 0, 0, 0.48333],
			57649: [0, 0.44444, 0, 0, 0.39352],
			57911: [0.19444, 0.44444, 0, 0, 0.43889],
		},
		"Math-Italic": {
			32: [0, 0, 0, 0, 0.25],
			48: [0, 0.43056, 0, 0, 0.5],
			49: [0, 0.43056, 0, 0, 0.5],
			50: [0, 0.43056, 0, 0, 0.5],
			51: [0.19444, 0.43056, 0, 0, 0.5],
			52: [0.19444, 0.43056, 0, 0, 0.5],
			53: [0.19444, 0.43056, 0, 0, 0.5],
			54: [0, 0.64444, 0, 0, 0.5],
			55: [0.19444, 0.43056, 0, 0, 0.5],
			56: [0, 0.64444, 0, 0, 0.5],
			57: [0.19444, 0.43056, 0, 0, 0.5],
			65: [0, 0.68333, 0, 0.13889, 0.75],
			66: [0, 0.68333, 0.05017, 0.08334, 0.75851],
			67: [0, 0.68333, 0.07153, 0.08334, 0.71472],
			68: [0, 0.68333, 0.02778, 0.05556, 0.82792],
			69: [0, 0.68333, 0.05764, 0.08334, 0.7382],
			70: [0, 0.68333, 0.13889, 0.08334, 0.64306],
			71: [0, 0.68333, 0, 0.08334, 0.78625],
			72: [0, 0.68333, 0.08125, 0.05556, 0.83125],
			73: [0, 0.68333, 0.07847, 0.11111, 0.43958],
			74: [0, 0.68333, 0.09618, 0.16667, 0.55451],
			75: [0, 0.68333, 0.07153, 0.05556, 0.84931],
			76: [0, 0.68333, 0, 0.02778, 0.68056],
			77: [0, 0.68333, 0.10903, 0.08334, 0.97014],
			78: [0, 0.68333, 0.10903, 0.08334, 0.80347],
			79: [0, 0.68333, 0.02778, 0.08334, 0.76278],
			80: [0, 0.68333, 0.13889, 0.08334, 0.64201],
			81: [0.19444, 0.68333, 0, 0.08334, 0.79056],
			82: [0, 0.68333, 0.00773, 0.08334, 0.75929],
			83: [0, 0.68333, 0.05764, 0.08334, 0.6132],
			84: [0, 0.68333, 0.13889, 0.08334, 0.58438],
			85: [0, 0.68333, 0.10903, 0.02778, 0.68278],
			86: [0, 0.68333, 0.22222, 0, 0.58333],
			87: [0, 0.68333, 0.13889, 0, 0.94445],
			88: [0, 0.68333, 0.07847, 0.08334, 0.82847],
			89: [0, 0.68333, 0.22222, 0, 0.58056],
			90: [0, 0.68333, 0.07153, 0.08334, 0.68264],
			97: [0, 0.43056, 0, 0, 0.52859],
			98: [0, 0.69444, 0, 0, 0.42917],
			99: [0, 0.43056, 0, 0.05556, 0.43276],
			100: [0, 0.69444, 0, 0.16667, 0.52049],
			101: [0, 0.43056, 0, 0.05556, 0.46563],
			102: [0.19444, 0.69444, 0.10764, 0.16667, 0.48959],
			103: [0.19444, 0.43056, 0.03588, 0.02778, 0.47697],
			104: [0, 0.69444, 0, 0, 0.57616],
			105: [0, 0.65952, 0, 0, 0.34451],
			106: [0.19444, 0.65952, 0.05724, 0, 0.41181],
			107: [0, 0.69444, 0.03148, 0, 0.5206],
			108: [0, 0.69444, 0.01968, 0.08334, 0.29838],
			109: [0, 0.43056, 0, 0, 0.87801],
			110: [0, 0.43056, 0, 0, 0.60023],
			111: [0, 0.43056, 0, 0.05556, 0.48472],
			112: [0.19444, 0.43056, 0, 0.08334, 0.50313],
			113: [0.19444, 0.43056, 0.03588, 0.08334, 0.44641],
			114: [0, 0.43056, 0.02778, 0.05556, 0.45116],
			115: [0, 0.43056, 0, 0.05556, 0.46875],
			116: [0, 0.61508, 0, 0.08334, 0.36111],
			117: [0, 0.43056, 0, 0.02778, 0.57246],
			118: [0, 0.43056, 0.03588, 0.02778, 0.48472],
			119: [0, 0.43056, 0.02691, 0.08334, 0.71592],
			120: [0, 0.43056, 0, 0.02778, 0.57153],
			121: [0.19444, 0.43056, 0.03588, 0.05556, 0.49028],
			122: [0, 0.43056, 0.04398, 0.05556, 0.46505],
			160: [0, 0, 0, 0, 0.25],
			915: [0, 0.68333, 0.13889, 0.08334, 0.61528],
			916: [0, 0.68333, 0, 0.16667, 0.83334],
			920: [0, 0.68333, 0.02778, 0.08334, 0.76278],
			923: [0, 0.68333, 0, 0.16667, 0.69445],
			926: [0, 0.68333, 0.07569, 0.08334, 0.74236],
			928: [0, 0.68333, 0.08125, 0.05556, 0.83125],
			931: [0, 0.68333, 0.05764, 0.08334, 0.77986],
			933: [0, 0.68333, 0.13889, 0.05556, 0.58333],
			934: [0, 0.68333, 0, 0.08334, 0.66667],
			936: [0, 0.68333, 0.11, 0.05556, 0.61222],
			937: [0, 0.68333, 0.05017, 0.08334, 0.7724],
			945: [0, 0.43056, 0.0037, 0.02778, 0.6397],
			946: [0.19444, 0.69444, 0.05278, 0.08334, 0.56563],
			947: [0.19444, 0.43056, 0.05556, 0, 0.51773],
			948: [0, 0.69444, 0.03785, 0.05556, 0.44444],
			949: [0, 0.43056, 0, 0.08334, 0.46632],
			950: [0.19444, 0.69444, 0.07378, 0.08334, 0.4375],
			951: [0.19444, 0.43056, 0.03588, 0.05556, 0.49653],
			952: [0, 0.69444, 0.02778, 0.08334, 0.46944],
			953: [0, 0.43056, 0, 0.05556, 0.35394],
			954: [0, 0.43056, 0, 0, 0.57616],
			955: [0, 0.69444, 0, 0, 0.58334],
			956: [0.19444, 0.43056, 0, 0.02778, 0.60255],
			957: [0, 0.43056, 0.06366, 0.02778, 0.49398],
			958: [0.19444, 0.69444, 0.04601, 0.11111, 0.4375],
			959: [0, 0.43056, 0, 0.05556, 0.48472],
			960: [0, 0.43056, 0.03588, 0, 0.57003],
			961: [0.19444, 0.43056, 0, 0.08334, 0.51702],
			962: [0.09722, 0.43056, 0.07986, 0.08334, 0.36285],
			963: [0, 0.43056, 0.03588, 0, 0.57141],
			964: [0, 0.43056, 0.1132, 0.02778, 0.43715],
			965: [0, 0.43056, 0.03588, 0.02778, 0.54028],
			966: [0.19444, 0.43056, 0, 0.08334, 0.65417],
			967: [0.19444, 0.43056, 0, 0.05556, 0.62569],
			968: [0.19444, 0.69444, 0.03588, 0.11111, 0.65139],
			969: [0, 0.43056, 0.03588, 0, 0.62245],
			977: [0, 0.69444, 0, 0.08334, 0.59144],
			981: [0.19444, 0.69444, 0, 0.08334, 0.59583],
			982: [0, 0.43056, 0.02778, 0, 0.82813],
			1009: [0.19444, 0.43056, 0, 0.08334, 0.51702],
			1013: [0, 0.43056, 0, 0.05556, 0.4059],
			57649: [0, 0.43056, 0, 0.02778, 0.32246],
			57911: [0.19444, 0.43056, 0, 0.08334, 0.38403],
		},
		"SansSerif-Bold": {
			32: [0, 0, 0, 0, 0.25],
			33: [0, 0.69444, 0, 0, 0.36667],
			34: [0, 0.69444, 0, 0, 0.55834],
			35: [0.19444, 0.69444, 0, 0, 0.91667],
			36: [0.05556, 0.75, 0, 0, 0.55],
			37: [0.05556, 0.75, 0, 0, 1.02912],
			38: [0, 0.69444, 0, 0, 0.83056],
			39: [0, 0.69444, 0, 0, 0.30556],
			40: [0.25, 0.75, 0, 0, 0.42778],
			41: [0.25, 0.75, 0, 0, 0.42778],
			42: [0, 0.75, 0, 0, 0.55],
			43: [0.11667, 0.61667, 0, 0, 0.85556],
			44: [0.10556, 0.13056, 0, 0, 0.30556],
			45: [0, 0.45833, 0, 0, 0.36667],
			46: [0, 0.13056, 0, 0, 0.30556],
			47: [0.25, 0.75, 0, 0, 0.55],
			48: [0, 0.69444, 0, 0, 0.55],
			49: [0, 0.69444, 0, 0, 0.55],
			50: [0, 0.69444, 0, 0, 0.55],
			51: [0, 0.69444, 0, 0, 0.55],
			52: [0, 0.69444, 0, 0, 0.55],
			53: [0, 0.69444, 0, 0, 0.55],
			54: [0, 0.69444, 0, 0, 0.55],
			55: [0, 0.69444, 0, 0, 0.55],
			56: [0, 0.69444, 0, 0, 0.55],
			57: [0, 0.69444, 0, 0, 0.55],
			58: [0, 0.45833, 0, 0, 0.30556],
			59: [0.10556, 0.45833, 0, 0, 0.30556],
			61: [-0.09375, 0.40625, 0, 0, 0.85556],
			63: [0, 0.69444, 0, 0, 0.51945],
			64: [0, 0.69444, 0, 0, 0.73334],
			65: [0, 0.69444, 0, 0, 0.73334],
			66: [0, 0.69444, 0, 0, 0.73334],
			67: [0, 0.69444, 0, 0, 0.70278],
			68: [0, 0.69444, 0, 0, 0.79445],
			69: [0, 0.69444, 0, 0, 0.64167],
			70: [0, 0.69444, 0, 0, 0.61111],
			71: [0, 0.69444, 0, 0, 0.73334],
			72: [0, 0.69444, 0, 0, 0.79445],
			73: [0, 0.69444, 0, 0, 0.33056],
			74: [0, 0.69444, 0, 0, 0.51945],
			75: [0, 0.69444, 0, 0, 0.76389],
			76: [0, 0.69444, 0, 0, 0.58056],
			77: [0, 0.69444, 0, 0, 0.97778],
			78: [0, 0.69444, 0, 0, 0.79445],
			79: [0, 0.69444, 0, 0, 0.79445],
			80: [0, 0.69444, 0, 0, 0.70278],
			81: [0.10556, 0.69444, 0, 0, 0.79445],
			82: [0, 0.69444, 0, 0, 0.70278],
			83: [0, 0.69444, 0, 0, 0.61111],
			84: [0, 0.69444, 0, 0, 0.73334],
			85: [0, 0.69444, 0, 0, 0.76389],
			86: [0, 0.69444, 0.01528, 0, 0.73334],
			87: [0, 0.69444, 0.01528, 0, 1.03889],
			88: [0, 0.69444, 0, 0, 0.73334],
			89: [0, 0.69444, 0.0275, 0, 0.73334],
			90: [0, 0.69444, 0, 0, 0.67223],
			91: [0.25, 0.75, 0, 0, 0.34306],
			93: [0.25, 0.75, 0, 0, 0.34306],
			94: [0, 0.69444, 0, 0, 0.55],
			95: [0.35, 0.10833, 0.03056, 0, 0.55],
			97: [0, 0.45833, 0, 0, 0.525],
			98: [0, 0.69444, 0, 0, 0.56111],
			99: [0, 0.45833, 0, 0, 0.48889],
			100: [0, 0.69444, 0, 0, 0.56111],
			101: [0, 0.45833, 0, 0, 0.51111],
			102: [0, 0.69444, 0.07639, 0, 0.33611],
			103: [0.19444, 0.45833, 0.01528, 0, 0.55],
			104: [0, 0.69444, 0, 0, 0.56111],
			105: [0, 0.69444, 0, 0, 0.25556],
			106: [0.19444, 0.69444, 0, 0, 0.28611],
			107: [0, 0.69444, 0, 0, 0.53056],
			108: [0, 0.69444, 0, 0, 0.25556],
			109: [0, 0.45833, 0, 0, 0.86667],
			110: [0, 0.45833, 0, 0, 0.56111],
			111: [0, 0.45833, 0, 0, 0.55],
			112: [0.19444, 0.45833, 0, 0, 0.56111],
			113: [0.19444, 0.45833, 0, 0, 0.56111],
			114: [0, 0.45833, 0.01528, 0, 0.37222],
			115: [0, 0.45833, 0, 0, 0.42167],
			116: [0, 0.58929, 0, 0, 0.40417],
			117: [0, 0.45833, 0, 0, 0.56111],
			118: [0, 0.45833, 0.01528, 0, 0.5],
			119: [0, 0.45833, 0.01528, 0, 0.74445],
			120: [0, 0.45833, 0, 0, 0.5],
			121: [0.19444, 0.45833, 0.01528, 0, 0.5],
			122: [0, 0.45833, 0, 0, 0.47639],
			126: [0.35, 0.34444, 0, 0, 0.55],
			160: [0, 0, 0, 0, 0.25],
			168: [0, 0.69444, 0, 0, 0.55],
			176: [0, 0.69444, 0, 0, 0.73334],
			180: [0, 0.69444, 0, 0, 0.55],
			184: [0.17014, 0, 0, 0, 0.48889],
			305: [0, 0.45833, 0, 0, 0.25556],
			567: [0.19444, 0.45833, 0, 0, 0.28611],
			710: [0, 0.69444, 0, 0, 0.55],
			711: [0, 0.63542, 0, 0, 0.55],
			713: [0, 0.63778, 0, 0, 0.55],
			728: [0, 0.69444, 0, 0, 0.55],
			729: [0, 0.69444, 0, 0, 0.30556],
			730: [0, 0.69444, 0, 0, 0.73334],
			732: [0, 0.69444, 0, 0, 0.55],
			733: [0, 0.69444, 0, 0, 0.55],
			915: [0, 0.69444, 0, 0, 0.58056],
			916: [0, 0.69444, 0, 0, 0.91667],
			920: [0, 0.69444, 0, 0, 0.85556],
			923: [0, 0.69444, 0, 0, 0.67223],
			926: [0, 0.69444, 0, 0, 0.73334],
			928: [0, 0.69444, 0, 0, 0.79445],
			931: [0, 0.69444, 0, 0, 0.79445],
			933: [0, 0.69444, 0, 0, 0.85556],
			934: [0, 0.69444, 0, 0, 0.79445],
			936: [0, 0.69444, 0, 0, 0.85556],
			937: [0, 0.69444, 0, 0, 0.79445],
			8211: [0, 0.45833, 0.03056, 0, 0.55],
			8212: [0, 0.45833, 0.03056, 0, 1.10001],
			8216: [0, 0.69444, 0, 0, 0.30556],
			8217: [0, 0.69444, 0, 0, 0.30556],
			8220: [0, 0.69444, 0, 0, 0.55834],
			8221: [0, 0.69444, 0, 0, 0.55834],
		},
		"SansSerif-Italic": {
			32: [0, 0, 0, 0, 0.25],
			33: [0, 0.69444, 0.05733, 0, 0.31945],
			34: [0, 0.69444, 0.00316, 0, 0.5],
			35: [0.19444, 0.69444, 0.05087, 0, 0.83334],
			36: [0.05556, 0.75, 0.11156, 0, 0.5],
			37: [0.05556, 0.75, 0.03126, 0, 0.83334],
			38: [0, 0.69444, 0.03058, 0, 0.75834],
			39: [0, 0.69444, 0.07816, 0, 0.27778],
			40: [0.25, 0.75, 0.13164, 0, 0.38889],
			41: [0.25, 0.75, 0.02536, 0, 0.38889],
			42: [0, 0.75, 0.11775, 0, 0.5],
			43: [0.08333, 0.58333, 0.02536, 0, 0.77778],
			44: [0.125, 0.08333, 0, 0, 0.27778],
			45: [0, 0.44444, 0.01946, 0, 0.33333],
			46: [0, 0.08333, 0, 0, 0.27778],
			47: [0.25, 0.75, 0.13164, 0, 0.5],
			48: [0, 0.65556, 0.11156, 0, 0.5],
			49: [0, 0.65556, 0.11156, 0, 0.5],
			50: [0, 0.65556, 0.11156, 0, 0.5],
			51: [0, 0.65556, 0.11156, 0, 0.5],
			52: [0, 0.65556, 0.11156, 0, 0.5],
			53: [0, 0.65556, 0.11156, 0, 0.5],
			54: [0, 0.65556, 0.11156, 0, 0.5],
			55: [0, 0.65556, 0.11156, 0, 0.5],
			56: [0, 0.65556, 0.11156, 0, 0.5],
			57: [0, 0.65556, 0.11156, 0, 0.5],
			58: [0, 0.44444, 0.02502, 0, 0.27778],
			59: [0.125, 0.44444, 0.02502, 0, 0.27778],
			61: [-0.13, 0.37, 0.05087, 0, 0.77778],
			63: [0, 0.69444, 0.11809, 0, 0.47222],
			64: [0, 0.69444, 0.07555, 0, 0.66667],
			65: [0, 0.69444, 0, 0, 0.66667],
			66: [0, 0.69444, 0.08293, 0, 0.66667],
			67: [0, 0.69444, 0.11983, 0, 0.63889],
			68: [0, 0.69444, 0.07555, 0, 0.72223],
			69: [0, 0.69444, 0.11983, 0, 0.59722],
			70: [0, 0.69444, 0.13372, 0, 0.56945],
			71: [0, 0.69444, 0.11983, 0, 0.66667],
			72: [0, 0.69444, 0.08094, 0, 0.70834],
			73: [0, 0.69444, 0.13372, 0, 0.27778],
			74: [0, 0.69444, 0.08094, 0, 0.47222],
			75: [0, 0.69444, 0.11983, 0, 0.69445],
			76: [0, 0.69444, 0, 0, 0.54167],
			77: [0, 0.69444, 0.08094, 0, 0.875],
			78: [0, 0.69444, 0.08094, 0, 0.70834],
			79: [0, 0.69444, 0.07555, 0, 0.73611],
			80: [0, 0.69444, 0.08293, 0, 0.63889],
			81: [0.125, 0.69444, 0.07555, 0, 0.73611],
			82: [0, 0.69444, 0.08293, 0, 0.64584],
			83: [0, 0.69444, 0.09205, 0, 0.55556],
			84: [0, 0.69444, 0.13372, 0, 0.68056],
			85: [0, 0.69444, 0.08094, 0, 0.6875],
			86: [0, 0.69444, 0.1615, 0, 0.66667],
			87: [0, 0.69444, 0.1615, 0, 0.94445],
			88: [0, 0.69444, 0.13372, 0, 0.66667],
			89: [0, 0.69444, 0.17261, 0, 0.66667],
			90: [0, 0.69444, 0.11983, 0, 0.61111],
			91: [0.25, 0.75, 0.15942, 0, 0.28889],
			93: [0.25, 0.75, 0.08719, 0, 0.28889],
			94: [0, 0.69444, 0.0799, 0, 0.5],
			95: [0.35, 0.09444, 0.08616, 0, 0.5],
			97: [0, 0.44444, 0.00981, 0, 0.48056],
			98: [0, 0.69444, 0.03057, 0, 0.51667],
			99: [0, 0.44444, 0.08336, 0, 0.44445],
			100: [0, 0.69444, 0.09483, 0, 0.51667],
			101: [0, 0.44444, 0.06778, 0, 0.44445],
			102: [0, 0.69444, 0.21705, 0, 0.30556],
			103: [0.19444, 0.44444, 0.10836, 0, 0.5],
			104: [0, 0.69444, 0.01778, 0, 0.51667],
			105: [0, 0.67937, 0.09718, 0, 0.23889],
			106: [0.19444, 0.67937, 0.09162, 0, 0.26667],
			107: [0, 0.69444, 0.08336, 0, 0.48889],
			108: [0, 0.69444, 0.09483, 0, 0.23889],
			109: [0, 0.44444, 0.01778, 0, 0.79445],
			110: [0, 0.44444, 0.01778, 0, 0.51667],
			111: [0, 0.44444, 0.06613, 0, 0.5],
			112: [0.19444, 0.44444, 0.0389, 0, 0.51667],
			113: [0.19444, 0.44444, 0.04169, 0, 0.51667],
			114: [0, 0.44444, 0.10836, 0, 0.34167],
			115: [0, 0.44444, 0.0778, 0, 0.38333],
			116: [0, 0.57143, 0.07225, 0, 0.36111],
			117: [0, 0.44444, 0.04169, 0, 0.51667],
			118: [0, 0.44444, 0.10836, 0, 0.46111],
			119: [0, 0.44444, 0.10836, 0, 0.68334],
			120: [0, 0.44444, 0.09169, 0, 0.46111],
			121: [0.19444, 0.44444, 0.10836, 0, 0.46111],
			122: [0, 0.44444, 0.08752, 0, 0.43472],
			126: [0.35, 0.32659, 0.08826, 0, 0.5],
			160: [0, 0, 0, 0, 0.25],
			168: [0, 0.67937, 0.06385, 0, 0.5],
			176: [0, 0.69444, 0, 0, 0.73752],
			184: [0.17014, 0, 0, 0, 0.44445],
			305: [0, 0.44444, 0.04169, 0, 0.23889],
			567: [0.19444, 0.44444, 0.04169, 0, 0.26667],
			710: [0, 0.69444, 0.0799, 0, 0.5],
			711: [0, 0.63194, 0.08432, 0, 0.5],
			713: [0, 0.60889, 0.08776, 0, 0.5],
			714: [0, 0.69444, 0.09205, 0, 0.5],
			715: [0, 0.69444, 0, 0, 0.5],
			728: [0, 0.69444, 0.09483, 0, 0.5],
			729: [0, 0.67937, 0.07774, 0, 0.27778],
			730: [0, 0.69444, 0, 0, 0.73752],
			732: [0, 0.67659, 0.08826, 0, 0.5],
			733: [0, 0.69444, 0.09205, 0, 0.5],
			915: [0, 0.69444, 0.13372, 0, 0.54167],
			916: [0, 0.69444, 0, 0, 0.83334],
			920: [0, 0.69444, 0.07555, 0, 0.77778],
			923: [0, 0.69444, 0, 0, 0.61111],
			926: [0, 0.69444, 0.12816, 0, 0.66667],
			928: [0, 0.69444, 0.08094, 0, 0.70834],
			931: [0, 0.69444, 0.11983, 0, 0.72222],
			933: [0, 0.69444, 0.09031, 0, 0.77778],
			934: [0, 0.69444, 0.04603, 0, 0.72222],
			936: [0, 0.69444, 0.09031, 0, 0.77778],
			937: [0, 0.69444, 0.08293, 0, 0.72222],
			8211: [0, 0.44444, 0.08616, 0, 0.5],
			8212: [0, 0.44444, 0.08616, 0, 1],
			8216: [0, 0.69444, 0.07816, 0, 0.27778],
			8217: [0, 0.69444, 0.07816, 0, 0.27778],
			8220: [0, 0.69444, 0.14205, 0, 0.5],
			8221: [0, 0.69444, 0.00316, 0, 0.5],
		},
		"SansSerif-Regular": {
			32: [0, 0, 0, 0, 0.25],
			33: [0, 0.69444, 0, 0, 0.31945],
			34: [0, 0.69444, 0, 0, 0.5],
			35: [0.19444, 0.69444, 0, 0, 0.83334],
			36: [0.05556, 0.75, 0, 0, 0.5],
			37: [0.05556, 0.75, 0, 0, 0.83334],
			38: [0, 0.69444, 0, 0, 0.75834],
			39: [0, 0.69444, 0, 0, 0.27778],
			40: [0.25, 0.75, 0, 0, 0.38889],
			41: [0.25, 0.75, 0, 0, 0.38889],
			42: [0, 0.75, 0, 0, 0.5],
			43: [0.08333, 0.58333, 0, 0, 0.77778],
			44: [0.125, 0.08333, 0, 0, 0.27778],
			45: [0, 0.44444, 0, 0, 0.33333],
			46: [0, 0.08333, 0, 0, 0.27778],
			47: [0.25, 0.75, 0, 0, 0.5],
			48: [0, 0.65556, 0, 0, 0.5],
			49: [0, 0.65556, 0, 0, 0.5],
			50: [0, 0.65556, 0, 0, 0.5],
			51: [0, 0.65556, 0, 0, 0.5],
			52: [0, 0.65556, 0, 0, 0.5],
			53: [0, 0.65556, 0, 0, 0.5],
			54: [0, 0.65556, 0, 0, 0.5],
			55: [0, 0.65556, 0, 0, 0.5],
			56: [0, 0.65556, 0, 0, 0.5],
			57: [0, 0.65556, 0, 0, 0.5],
			58: [0, 0.44444, 0, 0, 0.27778],
			59: [0.125, 0.44444, 0, 0, 0.27778],
			61: [-0.13, 0.37, 0, 0, 0.77778],
			63: [0, 0.69444, 0, 0, 0.47222],
			64: [0, 0.69444, 0, 0, 0.66667],
			65: [0, 0.69444, 0, 0, 0.66667],
			66: [0, 0.69444, 0, 0, 0.66667],
			67: [0, 0.69444, 0, 0, 0.63889],
			68: [0, 0.69444, 0, 0, 0.72223],
			69: [0, 0.69444, 0, 0, 0.59722],
			70: [0, 0.69444, 0, 0, 0.56945],
			71: [0, 0.69444, 0, 0, 0.66667],
			72: [0, 0.69444, 0, 0, 0.70834],
			73: [0, 0.69444, 0, 0, 0.27778],
			74: [0, 0.69444, 0, 0, 0.47222],
			75: [0, 0.69444, 0, 0, 0.69445],
			76: [0, 0.69444, 0, 0, 0.54167],
			77: [0, 0.69444, 0, 0, 0.875],
			78: [0, 0.69444, 0, 0, 0.70834],
			79: [0, 0.69444, 0, 0, 0.73611],
			80: [0, 0.69444, 0, 0, 0.63889],
			81: [0.125, 0.69444, 0, 0, 0.73611],
			82: [0, 0.69444, 0, 0, 0.64584],
			83: [0, 0.69444, 0, 0, 0.55556],
			84: [0, 0.69444, 0, 0, 0.68056],
			85: [0, 0.69444, 0, 0, 0.6875],
			86: [0, 0.69444, 0.01389, 0, 0.66667],
			87: [0, 0.69444, 0.01389, 0, 0.94445],
			88: [0, 0.69444, 0, 0, 0.66667],
			89: [0, 0.69444, 0.025, 0, 0.66667],
			90: [0, 0.69444, 0, 0, 0.61111],
			91: [0.25, 0.75, 0, 0, 0.28889],
			93: [0.25, 0.75, 0, 0, 0.28889],
			94: [0, 0.69444, 0, 0, 0.5],
			95: [0.35, 0.09444, 0.02778, 0, 0.5],
			97: [0, 0.44444, 0, 0, 0.48056],
			98: [0, 0.69444, 0, 0, 0.51667],
			99: [0, 0.44444, 0, 0, 0.44445],
			100: [0, 0.69444, 0, 0, 0.51667],
			101: [0, 0.44444, 0, 0, 0.44445],
			102: [0, 0.69444, 0.06944, 0, 0.30556],
			103: [0.19444, 0.44444, 0.01389, 0, 0.5],
			104: [0, 0.69444, 0, 0, 0.51667],
			105: [0, 0.67937, 0, 0, 0.23889],
			106: [0.19444, 0.67937, 0, 0, 0.26667],
			107: [0, 0.69444, 0, 0, 0.48889],
			108: [0, 0.69444, 0, 0, 0.23889],
			109: [0, 0.44444, 0, 0, 0.79445],
			110: [0, 0.44444, 0, 0, 0.51667],
			111: [0, 0.44444, 0, 0, 0.5],
			112: [0.19444, 0.44444, 0, 0, 0.51667],
			113: [0.19444, 0.44444, 0, 0, 0.51667],
			114: [0, 0.44444, 0.01389, 0, 0.34167],
			115: [0, 0.44444, 0, 0, 0.38333],
			116: [0, 0.57143, 0, 0, 0.36111],
			117: [0, 0.44444, 0, 0, 0.51667],
			118: [0, 0.44444, 0.01389, 0, 0.46111],
			119: [0, 0.44444, 0.01389, 0, 0.68334],
			120: [0, 0.44444, 0, 0, 0.46111],
			121: [0.19444, 0.44444, 0.01389, 0, 0.46111],
			122: [0, 0.44444, 0, 0, 0.43472],
			126: [0.35, 0.32659, 0, 0, 0.5],
			160: [0, 0, 0, 0, 0.25],
			168: [0, 0.67937, 0, 0, 0.5],
			176: [0, 0.69444, 0, 0, 0.66667],
			184: [0.17014, 0, 0, 0, 0.44445],
			305: [0, 0.44444, 0, 0, 0.23889],
			567: [0.19444, 0.44444, 0, 0, 0.26667],
			710: [0, 0.69444, 0, 0, 0.5],
			711: [0, 0.63194, 0, 0, 0.5],
			713: [0, 0.60889, 0, 0, 0.5],
			714: [0, 0.69444, 0, 0, 0.5],
			715: [0, 0.69444, 0, 0, 0.5],
			728: [0, 0.69444, 0, 0, 0.5],
			729: [0, 0.67937, 0, 0, 0.27778],
			730: [0, 0.69444, 0, 0, 0.66667],
			732: [0, 0.67659, 0, 0, 0.5],
			733: [0, 0.69444, 0, 0, 0.5],
			915: [0, 0.69444, 0, 0, 0.54167],
			916: [0, 0.69444, 0, 0, 0.83334],
			920: [0, 0.69444, 0, 0, 0.77778],
			923: [0, 0.69444, 0, 0, 0.61111],
			926: [0, 0.69444, 0, 0, 0.66667],
			928: [0, 0.69444, 0, 0, 0.70834],
			931: [0, 0.69444, 0, 0, 0.72222],
			933: [0, 0.69444, 0, 0, 0.77778],
			934: [0, 0.69444, 0, 0, 0.72222],
			936: [0, 0.69444, 0, 0, 0.77778],
			937: [0, 0.69444, 0, 0, 0.72222],
			8211: [0, 0.44444, 0.02778, 0, 0.5],
			8212: [0, 0.44444, 0.02778, 0, 1],
			8216: [0, 0.69444, 0, 0, 0.27778],
			8217: [0, 0.69444, 0, 0, 0.27778],
			8220: [0, 0.69444, 0, 0, 0.5],
			8221: [0, 0.69444, 0, 0, 0.5],
		},
		"Script-Regular": {
			32: [0, 0, 0, 0, 0.25],
			65: [0, 0.7, 0.22925, 0, 0.80253],
			66: [0, 0.7, 0.04087, 0, 0.90757],
			67: [0, 0.7, 0.1689, 0, 0.66619],
			68: [0, 0.7, 0.09371, 0, 0.77443],
			69: [0, 0.7, 0.18583, 0, 0.56162],
			70: [0, 0.7, 0.13634, 0, 0.89544],
			71: [0, 0.7, 0.17322, 0, 0.60961],
			72: [0, 0.7, 0.29694, 0, 0.96919],
			73: [0, 0.7, 0.19189, 0, 0.80907],
			74: [0.27778, 0.7, 0.19189, 0, 1.05159],
			75: [0, 0.7, 0.31259, 0, 0.91364],
			76: [0, 0.7, 0.19189, 0, 0.87373],
			77: [0, 0.7, 0.15981, 0, 1.08031],
			78: [0, 0.7, 0.3525, 0, 0.9015],
			79: [0, 0.7, 0.08078, 0, 0.73787],
			80: [0, 0.7, 0.08078, 0, 1.01262],
			81: [0, 0.7, 0.03305, 0, 0.88282],
			82: [0, 0.7, 0.06259, 0, 0.85],
			83: [0, 0.7, 0.19189, 0, 0.86767],
			84: [0, 0.7, 0.29087, 0, 0.74697],
			85: [0, 0.7, 0.25815, 0, 0.79996],
			86: [0, 0.7, 0.27523, 0, 0.62204],
			87: [0, 0.7, 0.27523, 0, 0.80532],
			88: [0, 0.7, 0.26006, 0, 0.94445],
			89: [0, 0.7, 0.2939, 0, 0.70961],
			90: [0, 0.7, 0.24037, 0, 0.8212],
			160: [0, 0, 0, 0, 0.25],
		},
		"Size1-Regular": {
			32: [0, 0, 0, 0, 0.25],
			40: [0.35001, 0.85, 0, 0, 0.45834],
			41: [0.35001, 0.85, 0, 0, 0.45834],
			47: [0.35001, 0.85, 0, 0, 0.57778],
			91: [0.35001, 0.85, 0, 0, 0.41667],
			92: [0.35001, 0.85, 0, 0, 0.57778],
			93: [0.35001, 0.85, 0, 0, 0.41667],
			123: [0.35001, 0.85, 0, 0, 0.58334],
			125: [0.35001, 0.85, 0, 0, 0.58334],
			160: [0, 0, 0, 0, 0.25],
			710: [0, 0.72222, 0, 0, 0.55556],
			732: [0, 0.72222, 0, 0, 0.55556],
			770: [0, 0.72222, 0, 0, 0.55556],
			771: [0, 0.72222, 0, 0, 0.55556],
			8214: [-99e-5, 0.601, 0, 0, 0.77778],
			8593: [1e-5, 0.6, 0, 0, 0.66667],
			8595: [1e-5, 0.6, 0, 0, 0.66667],
			8657: [1e-5, 0.6, 0, 0, 0.77778],
			8659: [1e-5, 0.6, 0, 0, 0.77778],
			8719: [0.25001, 0.75, 0, 0, 0.94445],
			8720: [0.25001, 0.75, 0, 0, 0.94445],
			8721: [0.25001, 0.75, 0, 0, 1.05556],
			8730: [0.35001, 0.85, 0, 0, 1],
			8739: [-0.00599, 0.606, 0, 0, 0.33333],
			8741: [-0.00599, 0.606, 0, 0, 0.55556],
			8747: [0.30612, 0.805, 0.19445, 0, 0.47222],
			8748: [0.306, 0.805, 0.19445, 0, 0.47222],
			8749: [0.306, 0.805, 0.19445, 0, 0.47222],
			8750: [0.30612, 0.805, 0.19445, 0, 0.47222],
			8896: [0.25001, 0.75, 0, 0, 0.83334],
			8897: [0.25001, 0.75, 0, 0, 0.83334],
			8898: [0.25001, 0.75, 0, 0, 0.83334],
			8899: [0.25001, 0.75, 0, 0, 0.83334],
			8968: [0.35001, 0.85, 0, 0, 0.47222],
			8969: [0.35001, 0.85, 0, 0, 0.47222],
			8970: [0.35001, 0.85, 0, 0, 0.47222],
			8971: [0.35001, 0.85, 0, 0, 0.47222],
			9168: [-99e-5, 0.601, 0, 0, 0.66667],
			10216: [0.35001, 0.85, 0, 0, 0.47222],
			10217: [0.35001, 0.85, 0, 0, 0.47222],
			10752: [0.25001, 0.75, 0, 0, 1.11111],
			10753: [0.25001, 0.75, 0, 0, 1.11111],
			10754: [0.25001, 0.75, 0, 0, 1.11111],
			10756: [0.25001, 0.75, 0, 0, 0.83334],
			10758: [0.25001, 0.75, 0, 0, 0.83334],
		},
		"Size2-Regular": {
			32: [0, 0, 0, 0, 0.25],
			40: [0.65002, 1.15, 0, 0, 0.59722],
			41: [0.65002, 1.15, 0, 0, 0.59722],
			47: [0.65002, 1.15, 0, 0, 0.81111],
			91: [0.65002, 1.15, 0, 0, 0.47222],
			92: [0.65002, 1.15, 0, 0, 0.81111],
			93: [0.65002, 1.15, 0, 0, 0.47222],
			123: [0.65002, 1.15, 0, 0, 0.66667],
			125: [0.65002, 1.15, 0, 0, 0.66667],
			160: [0, 0, 0, 0, 0.25],
			710: [0, 0.75, 0, 0, 1],
			732: [0, 0.75, 0, 0, 1],
			770: [0, 0.75, 0, 0, 1],
			771: [0, 0.75, 0, 0, 1],
			8719: [0.55001, 1.05, 0, 0, 1.27778],
			8720: [0.55001, 1.05, 0, 0, 1.27778],
			8721: [0.55001, 1.05, 0, 0, 1.44445],
			8730: [0.65002, 1.15, 0, 0, 1],
			8747: [0.86225, 1.36, 0.44445, 0, 0.55556],
			8748: [0.862, 1.36, 0.44445, 0, 0.55556],
			8749: [0.862, 1.36, 0.44445, 0, 0.55556],
			8750: [0.86225, 1.36, 0.44445, 0, 0.55556],
			8896: [0.55001, 1.05, 0, 0, 1.11111],
			8897: [0.55001, 1.05, 0, 0, 1.11111],
			8898: [0.55001, 1.05, 0, 0, 1.11111],
			8899: [0.55001, 1.05, 0, 0, 1.11111],
			8968: [0.65002, 1.15, 0, 0, 0.52778],
			8969: [0.65002, 1.15, 0, 0, 0.52778],
			8970: [0.65002, 1.15, 0, 0, 0.52778],
			8971: [0.65002, 1.15, 0, 0, 0.52778],
			10216: [0.65002, 1.15, 0, 0, 0.61111],
			10217: [0.65002, 1.15, 0, 0, 0.61111],
			10752: [0.55001, 1.05, 0, 0, 1.51112],
			10753: [0.55001, 1.05, 0, 0, 1.51112],
			10754: [0.55001, 1.05, 0, 0, 1.51112],
			10756: [0.55001, 1.05, 0, 0, 1.11111],
			10758: [0.55001, 1.05, 0, 0, 1.11111],
		},
		"Size3-Regular": {
			32: [0, 0, 0, 0, 0.25],
			40: [0.95003, 1.45, 0, 0, 0.73611],
			41: [0.95003, 1.45, 0, 0, 0.73611],
			47: [0.95003, 1.45, 0, 0, 1.04445],
			91: [0.95003, 1.45, 0, 0, 0.52778],
			92: [0.95003, 1.45, 0, 0, 1.04445],
			93: [0.95003, 1.45, 0, 0, 0.52778],
			123: [0.95003, 1.45, 0, 0, 0.75],
			125: [0.95003, 1.45, 0, 0, 0.75],
			160: [0, 0, 0, 0, 0.25],
			710: [0, 0.75, 0, 0, 1.44445],
			732: [0, 0.75, 0, 0, 1.44445],
			770: [0, 0.75, 0, 0, 1.44445],
			771: [0, 0.75, 0, 0, 1.44445],
			8730: [0.95003, 1.45, 0, 0, 1],
			8968: [0.95003, 1.45, 0, 0, 0.58334],
			8969: [0.95003, 1.45, 0, 0, 0.58334],
			8970: [0.95003, 1.45, 0, 0, 0.58334],
			8971: [0.95003, 1.45, 0, 0, 0.58334],
			10216: [0.95003, 1.45, 0, 0, 0.75],
			10217: [0.95003, 1.45, 0, 0, 0.75],
		},
		"Size4-Regular": {
			32: [0, 0, 0, 0, 0.25],
			40: [1.25003, 1.75, 0, 0, 0.79167],
			41: [1.25003, 1.75, 0, 0, 0.79167],
			47: [1.25003, 1.75, 0, 0, 1.27778],
			91: [1.25003, 1.75, 0, 0, 0.58334],
			92: [1.25003, 1.75, 0, 0, 1.27778],
			93: [1.25003, 1.75, 0, 0, 0.58334],
			123: [1.25003, 1.75, 0, 0, 0.80556],
			125: [1.25003, 1.75, 0, 0, 0.80556],
			160: [0, 0, 0, 0, 0.25],
			710: [0, 0.825, 0, 0, 1.8889],
			732: [0, 0.825, 0, 0, 1.8889],
			770: [0, 0.825, 0, 0, 1.8889],
			771: [0, 0.825, 0, 0, 1.8889],
			8730: [1.25003, 1.75, 0, 0, 1],
			8968: [1.25003, 1.75, 0, 0, 0.63889],
			8969: [1.25003, 1.75, 0, 0, 0.63889],
			8970: [1.25003, 1.75, 0, 0, 0.63889],
			8971: [1.25003, 1.75, 0, 0, 0.63889],
			9115: [0.64502, 1.155, 0, 0, 0.875],
			9116: [1e-5, 0.6, 0, 0, 0.875],
			9117: [0.64502, 1.155, 0, 0, 0.875],
			9118: [0.64502, 1.155, 0, 0, 0.875],
			9119: [1e-5, 0.6, 0, 0, 0.875],
			9120: [0.64502, 1.155, 0, 0, 0.875],
			9121: [0.64502, 1.155, 0, 0, 0.66667],
			9122: [-99e-5, 0.601, 0, 0, 0.66667],
			9123: [0.64502, 1.155, 0, 0, 0.66667],
			9124: [0.64502, 1.155, 0, 0, 0.66667],
			9125: [-99e-5, 0.601, 0, 0, 0.66667],
			9126: [0.64502, 1.155, 0, 0, 0.66667],
			9127: [1e-5, 0.9, 0, 0, 0.88889],
			9128: [0.65002, 1.15, 0, 0, 0.88889],
			9129: [0.90001, 0, 0, 0, 0.88889],
			9130: [0, 0.3, 0, 0, 0.88889],
			9131: [1e-5, 0.9, 0, 0, 0.88889],
			9132: [0.65002, 1.15, 0, 0, 0.88889],
			9133: [0.90001, 0, 0, 0, 0.88889],
			9143: [0.88502, 0.915, 0, 0, 1.05556],
			10216: [1.25003, 1.75, 0, 0, 0.80556],
			10217: [1.25003, 1.75, 0, 0, 0.80556],
			57344: [-0.00499, 0.605, 0, 0, 1.05556],
			57345: [-0.00499, 0.605, 0, 0, 1.05556],
			57680: [0, 0.12, 0, 0, 0.45],
			57681: [0, 0.12, 0, 0, 0.45],
			57682: [0, 0.12, 0, 0, 0.45],
			57683: [0, 0.12, 0, 0, 0.45],
		},
		"Typewriter-Regular": {
			32: [0, 0, 0, 0, 0.525],
			33: [0, 0.61111, 0, 0, 0.525],
			34: [0, 0.61111, 0, 0, 0.525],
			35: [0, 0.61111, 0, 0, 0.525],
			36: [0.08333, 0.69444, 0, 0, 0.525],
			37: [0.08333, 0.69444, 0, 0, 0.525],
			38: [0, 0.61111, 0, 0, 0.525],
			39: [0, 0.61111, 0, 0, 0.525],
			40: [0.08333, 0.69444, 0, 0, 0.525],
			41: [0.08333, 0.69444, 0, 0, 0.525],
			42: [0, 0.52083, 0, 0, 0.525],
			43: [-0.08056, 0.53055, 0, 0, 0.525],
			44: [0.13889, 0.125, 0, 0, 0.525],
			45: [-0.08056, 0.53055, 0, 0, 0.525],
			46: [0, 0.125, 0, 0, 0.525],
			47: [0.08333, 0.69444, 0, 0, 0.525],
			48: [0, 0.61111, 0, 0, 0.525],
			49: [0, 0.61111, 0, 0, 0.525],
			50: [0, 0.61111, 0, 0, 0.525],
			51: [0, 0.61111, 0, 0, 0.525],
			52: [0, 0.61111, 0, 0, 0.525],
			53: [0, 0.61111, 0, 0, 0.525],
			54: [0, 0.61111, 0, 0, 0.525],
			55: [0, 0.61111, 0, 0, 0.525],
			56: [0, 0.61111, 0, 0, 0.525],
			57: [0, 0.61111, 0, 0, 0.525],
			58: [0, 0.43056, 0, 0, 0.525],
			59: [0.13889, 0.43056, 0, 0, 0.525],
			60: [-0.05556, 0.55556, 0, 0, 0.525],
			61: [-0.19549, 0.41562, 0, 0, 0.525],
			62: [-0.05556, 0.55556, 0, 0, 0.525],
			63: [0, 0.61111, 0, 0, 0.525],
			64: [0, 0.61111, 0, 0, 0.525],
			65: [0, 0.61111, 0, 0, 0.525],
			66: [0, 0.61111, 0, 0, 0.525],
			67: [0, 0.61111, 0, 0, 0.525],
			68: [0, 0.61111, 0, 0, 0.525],
			69: [0, 0.61111, 0, 0, 0.525],
			70: [0, 0.61111, 0, 0, 0.525],
			71: [0, 0.61111, 0, 0, 0.525],
			72: [0, 0.61111, 0, 0, 0.525],
			73: [0, 0.61111, 0, 0, 0.525],
			74: [0, 0.61111, 0, 0, 0.525],
			75: [0, 0.61111, 0, 0, 0.525],
			76: [0, 0.61111, 0, 0, 0.525],
			77: [0, 0.61111, 0, 0, 0.525],
			78: [0, 0.61111, 0, 0, 0.525],
			79: [0, 0.61111, 0, 0, 0.525],
			80: [0, 0.61111, 0, 0, 0.525],
			81: [0.13889, 0.61111, 0, 0, 0.525],
			82: [0, 0.61111, 0, 0, 0.525],
			83: [0, 0.61111, 0, 0, 0.525],
			84: [0, 0.61111, 0, 0, 0.525],
			85: [0, 0.61111, 0, 0, 0.525],
			86: [0, 0.61111, 0, 0, 0.525],
			87: [0, 0.61111, 0, 0, 0.525],
			88: [0, 0.61111, 0, 0, 0.525],
			89: [0, 0.61111, 0, 0, 0.525],
			90: [0, 0.61111, 0, 0, 0.525],
			91: [0.08333, 0.69444, 0, 0, 0.525],
			92: [0.08333, 0.69444, 0, 0, 0.525],
			93: [0.08333, 0.69444, 0, 0, 0.525],
			94: [0, 0.61111, 0, 0, 0.525],
			95: [0.09514, 0, 0, 0, 0.525],
			96: [0, 0.61111, 0, 0, 0.525],
			97: [0, 0.43056, 0, 0, 0.525],
			98: [0, 0.61111, 0, 0, 0.525],
			99: [0, 0.43056, 0, 0, 0.525],
			100: [0, 0.61111, 0, 0, 0.525],
			101: [0, 0.43056, 0, 0, 0.525],
			102: [0, 0.61111, 0, 0, 0.525],
			103: [0.22222, 0.43056, 0, 0, 0.525],
			104: [0, 0.61111, 0, 0, 0.525],
			105: [0, 0.61111, 0, 0, 0.525],
			106: [0.22222, 0.61111, 0, 0, 0.525],
			107: [0, 0.61111, 0, 0, 0.525],
			108: [0, 0.61111, 0, 0, 0.525],
			109: [0, 0.43056, 0, 0, 0.525],
			110: [0, 0.43056, 0, 0, 0.525],
			111: [0, 0.43056, 0, 0, 0.525],
			112: [0.22222, 0.43056, 0, 0, 0.525],
			113: [0.22222, 0.43056, 0, 0, 0.525],
			114: [0, 0.43056, 0, 0, 0.525],
			115: [0, 0.43056, 0, 0, 0.525],
			116: [0, 0.55358, 0, 0, 0.525],
			117: [0, 0.43056, 0, 0, 0.525],
			118: [0, 0.43056, 0, 0, 0.525],
			119: [0, 0.43056, 0, 0, 0.525],
			120: [0, 0.43056, 0, 0, 0.525],
			121: [0.22222, 0.43056, 0, 0, 0.525],
			122: [0, 0.43056, 0, 0, 0.525],
			123: [0.08333, 0.69444, 0, 0, 0.525],
			124: [0.08333, 0.69444, 0, 0, 0.525],
			125: [0.08333, 0.69444, 0, 0, 0.525],
			126: [0, 0.61111, 0, 0, 0.525],
			127: [0, 0.61111, 0, 0, 0.525],
			160: [0, 0, 0, 0, 0.525],
			176: [0, 0.61111, 0, 0, 0.525],
			184: [0.19445, 0, 0, 0, 0.525],
			305: [0, 0.43056, 0, 0, 0.525],
			567: [0.22222, 0.43056, 0, 0, 0.525],
			711: [0, 0.56597, 0, 0, 0.525],
			713: [0, 0.56555, 0, 0, 0.525],
			714: [0, 0.61111, 0, 0, 0.525],
			715: [0, 0.61111, 0, 0, 0.525],
			728: [0, 0.61111, 0, 0, 0.525],
			730: [0, 0.61111, 0, 0, 0.525],
			770: [0, 0.61111, 0, 0, 0.525],
			771: [0, 0.61111, 0, 0, 0.525],
			776: [0, 0.61111, 0, 0, 0.525],
			915: [0, 0.61111, 0, 0, 0.525],
			916: [0, 0.61111, 0, 0, 0.525],
			920: [0, 0.61111, 0, 0, 0.525],
			923: [0, 0.61111, 0, 0, 0.525],
			926: [0, 0.61111, 0, 0, 0.525],
			928: [0, 0.61111, 0, 0, 0.525],
			931: [0, 0.61111, 0, 0, 0.525],
			933: [0, 0.61111, 0, 0, 0.525],
			934: [0, 0.61111, 0, 0, 0.525],
			936: [0, 0.61111, 0, 0, 0.525],
			937: [0, 0.61111, 0, 0, 0.525],
			8216: [0, 0.61111, 0, 0, 0.525],
			8217: [0, 0.61111, 0, 0, 0.525],
			8242: [0, 0.61111, 0, 0, 0.525],
			9251: [0.11111, 0.21944, 0, 0, 0.525],
		},
	},
	Is = {
		slant: [0.25, 0.25, 0.25],
		space: [0, 0, 0],
		stretch: [0, 0, 0],
		shrink: [0, 0, 0],
		xHeight: [0.431, 0.431, 0.431],
		quad: [1, 1.171, 1.472],
		extraSpace: [0, 0, 0],
		num1: [0.677, 0.732, 0.925],
		num2: [0.394, 0.384, 0.387],
		num3: [0.444, 0.471, 0.504],
		denom1: [0.686, 0.752, 1.025],
		denom2: [0.345, 0.344, 0.532],
		sup1: [0.413, 0.503, 0.504],
		sup2: [0.363, 0.431, 0.404],
		sup3: [0.289, 0.286, 0.294],
		sub1: [0.15, 0.143, 0.2],
		sub2: [0.247, 0.286, 0.4],
		supDrop: [0.386, 0.353, 0.494],
		subDrop: [0.05, 0.071, 0.1],
		delim1: [2.39, 1.7, 1.98],
		delim2: [1.01, 1.157, 1.42],
		axisHeight: [0.25, 0.25, 0.25],
		defaultRuleThickness: [0.04, 0.049, 0.049],
		bigOpSpacing1: [0.111, 0.111, 0.111],
		bigOpSpacing2: [0.166, 0.166, 0.166],
		bigOpSpacing3: [0.2, 0.2, 0.2],
		bigOpSpacing4: [0.6, 0.611, 0.611],
		bigOpSpacing5: [0.1, 0.143, 0.143],
		sqrtRuleThickness: [0.04, 0.04, 0.04],
		ptPerEm: [10, 10, 10],
		doubleRuleSep: [0.2, 0.2, 0.2],
		arrayRuleWidth: [0.04, 0.04, 0.04],
		fboxsep: [0.3, 0.3, 0.3],
		fboxrule: [0.04, 0.04, 0.04],
	},
	Yd = {
		Å: "A",
		Ð: "D",
		Þ: "o",
		å: "a",
		ð: "d",
		þ: "o",
		А: "A",
		Б: "B",
		В: "B",
		Г: "F",
		Д: "A",
		Е: "E",
		Ж: "K",
		З: "3",
		И: "N",
		Й: "N",
		К: "K",
		Л: "N",
		М: "M",
		Н: "H",
		О: "O",
		П: "N",
		Р: "P",
		С: "C",
		Т: "T",
		У: "y",
		Ф: "O",
		Х: "X",
		Ц: "U",
		Ч: "h",
		Ш: "W",
		Щ: "W",
		Ъ: "B",
		Ы: "X",
		Ь: "B",
		Э: "3",
		Ю: "X",
		Я: "R",
		а: "a",
		б: "b",
		в: "a",
		г: "r",
		д: "y",
		е: "e",
		ж: "m",
		з: "e",
		и: "n",
		й: "n",
		к: "n",
		л: "n",
		м: "m",
		н: "n",
		о: "o",
		п: "n",
		р: "p",
		с: "c",
		т: "o",
		у: "y",
		ф: "b",
		х: "x",
		ц: "n",
		ч: "n",
		ш: "w",
		щ: "w",
		ъ: "a",
		ы: "m",
		ь: "a",
		э: "e",
		ю: "m",
		я: "r",
	};
function Sv(e, t) {
	dr[e] = t;
}
function wu(e, t, r) {
	if (!dr[t]) throw new Error("Font metrics not found for font: " + t + ".");
	var n = e.charCodeAt(0),
		i = dr[t][n];
	if (
		(!i && e[0] in Yd && ((n = Yd[e[0]].charCodeAt(0)), (i = dr[t][n])),
		!i && r === "text" && a4(n) && (i = dr[t][77]),
		i)
	)
		return { depth: i[0], height: i[1], italic: i[2], skew: i[3], width: i[4] };
}
var j0 = {};
function Ev(e) {
	var t;
	if ((e >= 5 ? (t = 0) : e >= 3 ? (t = 1) : (t = 2), !j0[t])) {
		var r = (j0[t] = { cssEmPerMu: Is.quad[t] / 18 });
		for (var n in Is) Is.hasOwnProperty(n) && (r[n] = Is[n][t]);
	}
	return j0[t];
}
var xv = [
		[1, 1, 1],
		[2, 1, 1],
		[3, 1, 1],
		[4, 2, 1],
		[5, 2, 1],
		[6, 3, 1],
		[7, 4, 2],
		[8, 6, 3],
		[9, 7, 6],
		[10, 8, 7],
		[11, 10, 9],
	],
	Wd = [0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.2, 1.44, 1.728, 2.074, 2.488],
	Vd = function (t, r) {
		return r.size < 2 ? t : xv[t - 1][r.size - 1];
	};
class kr {
	constructor(t) {
		(this.style = void 0),
			(this.color = void 0),
			(this.size = void 0),
			(this.textSize = void 0),
			(this.phantom = void 0),
			(this.font = void 0),
			(this.fontFamily = void 0),
			(this.fontWeight = void 0),
			(this.fontShape = void 0),
			(this.sizeMultiplier = void 0),
			(this.maxSize = void 0),
			(this.minRuleThickness = void 0),
			(this._fontMetrics = void 0),
			(this.style = t.style),
			(this.color = t.color),
			(this.size = t.size || kr.BASESIZE),
			(this.textSize = t.textSize || this.size),
			(this.phantom = !!t.phantom),
			(this.font = t.font || ""),
			(this.fontFamily = t.fontFamily || ""),
			(this.fontWeight = t.fontWeight || ""),
			(this.fontShape = t.fontShape || ""),
			(this.sizeMultiplier = Wd[this.size - 1]),
			(this.maxSize = t.maxSize),
			(this.minRuleThickness = t.minRuleThickness),
			(this._fontMetrics = void 0);
	}
	extend(t) {
		var r = {
			style: this.style,
			size: this.size,
			textSize: this.textSize,
			color: this.color,
			phantom: this.phantom,
			font: this.font,
			fontFamily: this.fontFamily,
			fontWeight: this.fontWeight,
			fontShape: this.fontShape,
			maxSize: this.maxSize,
			minRuleThickness: this.minRuleThickness,
		};
		for (var n in t) t.hasOwnProperty(n) && (r[n] = t[n]);
		return new kr(r);
	}
	havingStyle(t) {
		return this.style === t
			? this
			: this.extend({ style: t, size: Vd(this.textSize, t) });
	}
	havingCrampedStyle() {
		return this.havingStyle(this.style.cramp());
	}
	havingSize(t) {
		return this.size === t && this.textSize === t
			? this
			: this.extend({
					style: this.style.text(),
					size: t,
					textSize: t,
					sizeMultiplier: Wd[t - 1],
			  });
	}
	havingBaseStyle(t) {
		t = t || this.style.text();
		var r = Vd(kr.BASESIZE, t);
		return this.size === r && this.textSize === kr.BASESIZE && this.style === t
			? this
			: this.extend({ style: t, size: r });
	}
	havingBaseSizing() {
		var t;
		switch (this.style.id) {
			case 4:
			case 5:
				t = 3;
				break;
			case 6:
			case 7:
				t = 1;
				break;
			default:
				t = 6;
		}
		return this.extend({ style: this.style.text(), size: t });
	}
	withColor(t) {
		return this.extend({ color: t });
	}
	withPhantom() {
		return this.extend({ phantom: !0 });
	}
	withFont(t) {
		return this.extend({ font: t });
	}
	withTextFontFamily(t) {
		return this.extend({ fontFamily: t, font: "" });
	}
	withTextFontWeight(t) {
		return this.extend({ fontWeight: t, font: "" });
	}
	withTextFontShape(t) {
		return this.extend({ fontShape: t, font: "" });
	}
	sizingClasses(t) {
		return t.size !== this.size
			? ["sizing", "reset-size" + t.size, "size" + this.size]
			: [];
	}
	baseSizingClasses() {
		return this.size !== kr.BASESIZE
			? ["sizing", "reset-size" + this.size, "size" + kr.BASESIZE]
			: [];
	}
	fontMetrics() {
		return (
			this._fontMetrics || (this._fontMetrics = Ev(this.size)),
			this._fontMetrics
		);
	}
	getColor() {
		return this.phantom ? "transparent" : this.color;
	}
}
kr.BASESIZE = 6;
var Ql = {
		pt: 1,
		mm: 7227 / 2540,
		cm: 7227 / 254,
		in: 72.27,
		bp: 803 / 800,
		pc: 12,
		dd: 1238 / 1157,
		cc: 14856 / 1157,
		nd: 685 / 642,
		nc: 1370 / 107,
		sp: 1 / 65536,
		px: 803 / 800,
	},
	Tv = { ex: !0, em: !0, mu: !0 },
	s4 = function (t) {
		return (
			typeof t != "string" && (t = t.unit), t in Ql || t in Tv || t === "ex"
		);
	},
	Xe = function (t, r) {
		var n;
		if (t.unit in Ql)
			n = Ql[t.unit] / r.fontMetrics().ptPerEm / r.sizeMultiplier;
		else if (t.unit === "mu") n = r.fontMetrics().cssEmPerMu;
		else {
			var i;
			if (
				(r.style.isTight() ? (i = r.havingStyle(r.style.text())) : (i = r),
				t.unit === "ex")
			)
				n = i.fontMetrics().xHeight;
			else if (t.unit === "em") n = i.fontMetrics().quad;
			else throw new Z("Invalid unit: '" + t.unit + "'");
			i !== r && (n *= i.sizeMultiplier / r.sizeMultiplier);
		}
		return Math.min(t.number * n, r.maxSize);
	},
	re = function (t) {
		return +t.toFixed(4) + "em";
	},
	wn = function (t) {
		return t.filter((r) => r).join(" ");
	},
	o4 = function (t, r, n) {
		if (
			((this.classes = t || []),
			(this.attributes = {}),
			(this.height = 0),
			(this.depth = 0),
			(this.maxFontSize = 0),
			(this.style = n || {}),
			r)
		) {
			r.style.isTight() && this.classes.push("mtight");
			var i = r.getColor();
			i && (this.style.color = i);
		}
	},
	l4 = function (t) {
		var r = document.createElement(t);
		r.className = wn(this.classes);
		for (var n in this.style)
			this.style.hasOwnProperty(n) && (r.style[n] = this.style[n]);
		for (var i in this.attributes)
			this.attributes.hasOwnProperty(i) &&
				r.setAttribute(i, this.attributes[i]);
		for (var a = 0; a < this.children.length; a++)
			r.appendChild(this.children[a].toNode());
		return r;
	},
	c4 = function (t) {
		var r = "<" + t;
		this.classes.length &&
			(r += ' class="' + _e.escape(wn(this.classes)) + '"');
		var n = "";
		for (var i in this.style)
			this.style.hasOwnProperty(i) &&
				(n += _e.hyphenate(i) + ":" + this.style[i] + ";");
		n && (r += ' style="' + _e.escape(n) + '"');
		for (var a in this.attributes)
			this.attributes.hasOwnProperty(a) &&
				(r += " " + a + '="' + _e.escape(this.attributes[a]) + '"');
		r += ">";
		for (var s = 0; s < this.children.length; s++)
			r += this.children[s].toMarkup();
		return (r += "</" + t + ">"), r;
	};
let ps = class {
	constructor(t, r, n, i) {
		(this.children = void 0),
			(this.attributes = void 0),
			(this.classes = void 0),
			(this.height = void 0),
			(this.depth = void 0),
			(this.width = void 0),
			(this.maxFontSize = void 0),
			(this.style = void 0),
			o4.call(this, t, n, i),
			(this.children = r || []);
	}
	setAttribute(t, r) {
		this.attributes[t] = r;
	}
	hasClass(t) {
		return _e.contains(this.classes, t);
	}
	toNode() {
		return l4.call(this, "span");
	}
	toMarkup() {
		return c4.call(this, "span");
	}
};
class Su {
	constructor(t, r, n, i) {
		(this.children = void 0),
			(this.attributes = void 0),
			(this.classes = void 0),
			(this.height = void 0),
			(this.depth = void 0),
			(this.maxFontSize = void 0),
			(this.style = void 0),
			o4.call(this, r, i),
			(this.children = n || []),
			this.setAttribute("href", t);
	}
	setAttribute(t, r) {
		this.attributes[t] = r;
	}
	hasClass(t) {
		return _e.contains(this.classes, t);
	}
	toNode() {
		return l4.call(this, "a");
	}
	toMarkup() {
		return c4.call(this, "a");
	}
}
class kv {
	constructor(t, r, n) {
		(this.src = void 0),
			(this.alt = void 0),
			(this.classes = void 0),
			(this.height = void 0),
			(this.depth = void 0),
			(this.maxFontSize = void 0),
			(this.style = void 0),
			(this.alt = r),
			(this.src = t),
			(this.classes = ["mord"]),
			(this.style = n);
	}
	hasClass(t) {
		return _e.contains(this.classes, t);
	}
	toNode() {
		var t = document.createElement("img");
		(t.src = this.src), (t.alt = this.alt), (t.className = "mord");
		for (var r in this.style)
			this.style.hasOwnProperty(r) && (t.style[r] = this.style[r]);
		return t;
	}
	toMarkup() {
		var t = "<img  src='" + this.src + " 'alt='" + this.alt + "' ",
			r = "";
		for (var n in this.style)
			this.style.hasOwnProperty(n) &&
				(r += _e.hyphenate(n) + ":" + this.style[n] + ";");
		return r && (t += ' style="' + _e.escape(r) + '"'), (t += "'/>"), t;
	}
}
var Av = { î: "ı̂", ï: "ı̈", í: "ı́", ì: "ı̀" };
class Wt {
	constructor(t, r, n, i, a, s, o, l) {
		(this.text = void 0),
			(this.height = void 0),
			(this.depth = void 0),
			(this.italic = void 0),
			(this.skew = void 0),
			(this.width = void 0),
			(this.maxFontSize = void 0),
			(this.classes = void 0),
			(this.style = void 0),
			(this.text = t),
			(this.height = r || 0),
			(this.depth = n || 0),
			(this.italic = i || 0),
			(this.skew = a || 0),
			(this.width = s || 0),
			(this.classes = o || []),
			(this.style = l || {}),
			(this.maxFontSize = 0);
		var c = fv(this.text.charCodeAt(0));
		c && this.classes.push(c + "_fallback"),
			/[îïíì]/.test(this.text) && (this.text = Av[this.text]);
	}
	hasClass(t) {
		return _e.contains(this.classes, t);
	}
	toNode() {
		var t = document.createTextNode(this.text),
			r = null;
		this.italic > 0 &&
			((r = document.createElement("span")),
			(r.style.marginRight = re(this.italic))),
			this.classes.length > 0 &&
				((r = r || document.createElement("span")),
				(r.className = wn(this.classes)));
		for (var n in this.style)
			this.style.hasOwnProperty(n) &&
				((r = r || document.createElement("span")),
				(r.style[n] = this.style[n]));
		return r ? (r.appendChild(t), r) : t;
	}
	toMarkup() {
		var t = !1,
			r = "<span";
		this.classes.length &&
			((t = !0),
			(r += ' class="'),
			(r += _e.escape(wn(this.classes))),
			(r += '"'));
		var n = "";
		this.italic > 0 && (n += "margin-right:" + this.italic + "em;");
		for (var i in this.style)
			this.style.hasOwnProperty(i) &&
				(n += _e.hyphenate(i) + ":" + this.style[i] + ";");
		n && ((t = !0), (r += ' style="' + _e.escape(n) + '"'));
		var a = _e.escape(this.text);
		return t ? ((r += ">"), (r += a), (r += "</span>"), r) : a;
	}
}
class Dr {
	constructor(t, r) {
		(this.children = void 0),
			(this.attributes = void 0),
			(this.children = t || []),
			(this.attributes = r || {});
	}
	toNode() {
		var t = "http://www.w3.org/2000/svg",
			r = document.createElementNS(t, "svg");
		for (var n in this.attributes)
			Object.prototype.hasOwnProperty.call(this.attributes, n) &&
				r.setAttribute(n, this.attributes[n]);
		for (var i = 0; i < this.children.length; i++)
			r.appendChild(this.children[i].toNode());
		return r;
	}
	toMarkup() {
		var t = '<svg xmlns="http://www.w3.org/2000/svg"';
		for (var r in this.attributes)
			Object.prototype.hasOwnProperty.call(this.attributes, r) &&
				(t += " " + r + "='" + this.attributes[r] + "'");
		t += ">";
		for (var n = 0; n < this.children.length; n++)
			t += this.children[n].toMarkup();
		return (t += "</svg>"), t;
	}
}
class Sn {
	constructor(t, r) {
		(this.pathName = void 0),
			(this.alternate = void 0),
			(this.pathName = t),
			(this.alternate = r);
	}
	toNode() {
		var t = "http://www.w3.org/2000/svg",
			r = document.createElementNS(t, "path");
		return (
			this.alternate
				? r.setAttribute("d", this.alternate)
				: r.setAttribute("d", Gd[this.pathName]),
			r
		);
	}
	toMarkup() {
		return this.alternate
			? "<path d='" + this.alternate + "'/>"
			: "<path d='" + Gd[this.pathName] + "'/>";
	}
}
class ec {
	constructor(t) {
		(this.attributes = void 0), (this.attributes = t || {});
	}
	toNode() {
		var t = "http://www.w3.org/2000/svg",
			r = document.createElementNS(t, "line");
		for (var n in this.attributes)
			Object.prototype.hasOwnProperty.call(this.attributes, n) &&
				r.setAttribute(n, this.attributes[n]);
		return r;
	}
	toMarkup() {
		var t = "<line";
		for (var r in this.attributes)
			Object.prototype.hasOwnProperty.call(this.attributes, r) &&
				(t += " " + r + "='" + this.attributes[r] + "'");
		return (t += "/>"), t;
	}
}
function Kd(e) {
	if (e instanceof Wt) return e;
	throw new Error("Expected symbolNode but got " + String(e) + ".");
}
function Rv(e) {
	if (e instanceof ps) return e;
	throw new Error("Expected span<HtmlDomNode> but got " + String(e) + ".");
}
var Mv = { bin: 1, close: 1, inner: 1, open: 1, punct: 1, rel: 1 },
	Ov = { "accent-token": 1, mathord: 1, "op-token": 1, spacing: 1, textord: 1 },
	Ue = { math: {}, text: {} };
function f(e, t, r, n, i, a) {
	(Ue[e][i] = { font: t, group: r, replace: n }),
		a && n && (Ue[e][n] = Ue[e][i]);
}
var h = "math",
	Y = "text",
	g = "main",
	S = "ams",
	Ve = "accent-token",
	ce = "bin",
	kt = "close",
	ta = "inner",
	ve = "mathord",
	at = "op-token",
	zt = "open",
	e0 = "punct",
	x = "rel",
	$r = "spacing",
	A = "textord";
f(h, g, x, "≡", "\\equiv", !0);
f(h, g, x, "≺", "\\prec", !0);
f(h, g, x, "≻", "\\succ", !0);
f(h, g, x, "∼", "\\sim", !0);
f(h, g, x, "⊥", "\\perp");
f(h, g, x, "⪯", "\\preceq", !0);
f(h, g, x, "⪰", "\\succeq", !0);
f(h, g, x, "≃", "\\simeq", !0);
f(h, g, x, "∣", "\\mid", !0);
f(h, g, x, "≪", "\\ll", !0);
f(h, g, x, "≫", "\\gg", !0);
f(h, g, x, "≍", "\\asymp", !0);
f(h, g, x, "∥", "\\parallel");
f(h, g, x, "⋈", "\\bowtie", !0);
f(h, g, x, "⌣", "\\smile", !0);
f(h, g, x, "⊑", "\\sqsubseteq", !0);
f(h, g, x, "⊒", "\\sqsupseteq", !0);
f(h, g, x, "≐", "\\doteq", !0);
f(h, g, x, "⌢", "\\frown", !0);
f(h, g, x, "∋", "\\ni", !0);
f(h, g, x, "∝", "\\propto", !0);
f(h, g, x, "⊢", "\\vdash", !0);
f(h, g, x, "⊣", "\\dashv", !0);
f(h, g, x, "∋", "\\owns");
f(h, g, e0, ".", "\\ldotp");
f(h, g, e0, "⋅", "\\cdotp");
f(h, g, A, "#", "\\#");
f(Y, g, A, "#", "\\#");
f(h, g, A, "&", "\\&");
f(Y, g, A, "&", "\\&");
f(h, g, A, "ℵ", "\\aleph", !0);
f(h, g, A, "∀", "\\forall", !0);
f(h, g, A, "ℏ", "\\hbar", !0);
f(h, g, A, "∃", "\\exists", !0);
f(h, g, A, "∇", "\\nabla", !0);
f(h, g, A, "♭", "\\flat", !0);
f(h, g, A, "ℓ", "\\ell", !0);
f(h, g, A, "♮", "\\natural", !0);
f(h, g, A, "♣", "\\clubsuit", !0);
f(h, g, A, "℘", "\\wp", !0);
f(h, g, A, "♯", "\\sharp", !0);
f(h, g, A, "♢", "\\diamondsuit", !0);
f(h, g, A, "ℜ", "\\Re", !0);
f(h, g, A, "♡", "\\heartsuit", !0);
f(h, g, A, "ℑ", "\\Im", !0);
f(h, g, A, "♠", "\\spadesuit", !0);
f(h, g, A, "§", "\\S", !0);
f(Y, g, A, "§", "\\S");
f(h, g, A, "¶", "\\P", !0);
f(Y, g, A, "¶", "\\P");
f(h, g, A, "†", "\\dag");
f(Y, g, A, "†", "\\dag");
f(Y, g, A, "†", "\\textdagger");
f(h, g, A, "‡", "\\ddag");
f(Y, g, A, "‡", "\\ddag");
f(Y, g, A, "‡", "\\textdaggerdbl");
f(h, g, kt, "⎱", "\\rmoustache", !0);
f(h, g, zt, "⎰", "\\lmoustache", !0);
f(h, g, kt, "⟯", "\\rgroup", !0);
f(h, g, zt, "⟮", "\\lgroup", !0);
f(h, g, ce, "∓", "\\mp", !0);
f(h, g, ce, "⊖", "\\ominus", !0);
f(h, g, ce, "⊎", "\\uplus", !0);
f(h, g, ce, "⊓", "\\sqcap", !0);
f(h, g, ce, "∗", "\\ast");
f(h, g, ce, "⊔", "\\sqcup", !0);
f(h, g, ce, "◯", "\\bigcirc", !0);
f(h, g, ce, "∙", "\\bullet", !0);
f(h, g, ce, "‡", "\\ddagger");
f(h, g, ce, "≀", "\\wr", !0);
f(h, g, ce, "⨿", "\\amalg");
f(h, g, ce, "&", "\\And");
f(h, g, x, "⟵", "\\longleftarrow", !0);
f(h, g, x, "⇐", "\\Leftarrow", !0);
f(h, g, x, "⟸", "\\Longleftarrow", !0);
f(h, g, x, "⟶", "\\longrightarrow", !0);
f(h, g, x, "⇒", "\\Rightarrow", !0);
f(h, g, x, "⟹", "\\Longrightarrow", !0);
f(h, g, x, "↔", "\\leftrightarrow", !0);
f(h, g, x, "⟷", "\\longleftrightarrow", !0);
f(h, g, x, "⇔", "\\Leftrightarrow", !0);
f(h, g, x, "⟺", "\\Longleftrightarrow", !0);
f(h, g, x, "↦", "\\mapsto", !0);
f(h, g, x, "⟼", "\\longmapsto", !0);
f(h, g, x, "↗", "\\nearrow", !0);
f(h, g, x, "↩", "\\hookleftarrow", !0);
f(h, g, x, "↪", "\\hookrightarrow", !0);
f(h, g, x, "↘", "\\searrow", !0);
f(h, g, x, "↼", "\\leftharpoonup", !0);
f(h, g, x, "⇀", "\\rightharpoonup", !0);
f(h, g, x, "↙", "\\swarrow", !0);
f(h, g, x, "↽", "\\leftharpoondown", !0);
f(h, g, x, "⇁", "\\rightharpoondown", !0);
f(h, g, x, "↖", "\\nwarrow", !0);
f(h, g, x, "⇌", "\\rightleftharpoons", !0);
f(h, S, x, "≮", "\\nless", !0);
f(h, S, x, "", "\\@nleqslant");
f(h, S, x, "", "\\@nleqq");
f(h, S, x, "⪇", "\\lneq", !0);
f(h, S, x, "≨", "\\lneqq", !0);
f(h, S, x, "", "\\@lvertneqq");
f(h, S, x, "⋦", "\\lnsim", !0);
f(h, S, x, "⪉", "\\lnapprox", !0);
f(h, S, x, "⊀", "\\nprec", !0);
f(h, S, x, "⋠", "\\npreceq", !0);
f(h, S, x, "⋨", "\\precnsim", !0);
f(h, S, x, "⪹", "\\precnapprox", !0);
f(h, S, x, "≁", "\\nsim", !0);
f(h, S, x, "", "\\@nshortmid");
f(h, S, x, "∤", "\\nmid", !0);
f(h, S, x, "⊬", "\\nvdash", !0);
f(h, S, x, "⊭", "\\nvDash", !0);
f(h, S, x, "⋪", "\\ntriangleleft");
f(h, S, x, "⋬", "\\ntrianglelefteq", !0);
f(h, S, x, "⊊", "\\subsetneq", !0);
f(h, S, x, "", "\\@varsubsetneq");
f(h, S, x, "⫋", "\\subsetneqq", !0);
f(h, S, x, "", "\\@varsubsetneqq");
f(h, S, x, "≯", "\\ngtr", !0);
f(h, S, x, "", "\\@ngeqslant");
f(h, S, x, "", "\\@ngeqq");
f(h, S, x, "⪈", "\\gneq", !0);
f(h, S, x, "≩", "\\gneqq", !0);
f(h, S, x, "", "\\@gvertneqq");
f(h, S, x, "⋧", "\\gnsim", !0);
f(h, S, x, "⪊", "\\gnapprox", !0);
f(h, S, x, "⊁", "\\nsucc", !0);
f(h, S, x, "⋡", "\\nsucceq", !0);
f(h, S, x, "⋩", "\\succnsim", !0);
f(h, S, x, "⪺", "\\succnapprox", !0);
f(h, S, x, "≆", "\\ncong", !0);
f(h, S, x, "", "\\@nshortparallel");
f(h, S, x, "∦", "\\nparallel", !0);
f(h, S, x, "⊯", "\\nVDash", !0);
f(h, S, x, "⋫", "\\ntriangleright");
f(h, S, x, "⋭", "\\ntrianglerighteq", !0);
f(h, S, x, "", "\\@nsupseteqq");
f(h, S, x, "⊋", "\\supsetneq", !0);
f(h, S, x, "", "\\@varsupsetneq");
f(h, S, x, "⫌", "\\supsetneqq", !0);
f(h, S, x, "", "\\@varsupsetneqq");
f(h, S, x, "⊮", "\\nVdash", !0);
f(h, S, x, "⪵", "\\precneqq", !0);
f(h, S, x, "⪶", "\\succneqq", !0);
f(h, S, x, "", "\\@nsubseteqq");
f(h, S, ce, "⊴", "\\unlhd");
f(h, S, ce, "⊵", "\\unrhd");
f(h, S, x, "↚", "\\nleftarrow", !0);
f(h, S, x, "↛", "\\nrightarrow", !0);
f(h, S, x, "⇍", "\\nLeftarrow", !0);
f(h, S, x, "⇏", "\\nRightarrow", !0);
f(h, S, x, "↮", "\\nleftrightarrow", !0);
f(h, S, x, "⇎", "\\nLeftrightarrow", !0);
f(h, S, x, "△", "\\vartriangle");
f(h, S, A, "ℏ", "\\hslash");
f(h, S, A, "▽", "\\triangledown");
f(h, S, A, "◊", "\\lozenge");
f(h, S, A, "Ⓢ", "\\circledS");
f(h, S, A, "®", "\\circledR");
f(Y, S, A, "®", "\\circledR");
f(h, S, A, "∡", "\\measuredangle", !0);
f(h, S, A, "∄", "\\nexists");
f(h, S, A, "℧", "\\mho");
f(h, S, A, "Ⅎ", "\\Finv", !0);
f(h, S, A, "⅁", "\\Game", !0);
f(h, S, A, "‵", "\\backprime");
f(h, S, A, "▲", "\\blacktriangle");
f(h, S, A, "▼", "\\blacktriangledown");
f(h, S, A, "■", "\\blacksquare");
f(h, S, A, "⧫", "\\blacklozenge");
f(h, S, A, "★", "\\bigstar");
f(h, S, A, "∢", "\\sphericalangle", !0);
f(h, S, A, "∁", "\\complement", !0);
f(h, S, A, "ð", "\\eth", !0);
f(Y, g, A, "ð", "ð");
f(h, S, A, "╱", "\\diagup");
f(h, S, A, "╲", "\\diagdown");
f(h, S, A, "□", "\\square");
f(h, S, A, "□", "\\Box");
f(h, S, A, "◊", "\\Diamond");
f(h, S, A, "¥", "\\yen", !0);
f(Y, S, A, "¥", "\\yen", !0);
f(h, S, A, "✓", "\\checkmark", !0);
f(Y, S, A, "✓", "\\checkmark");
f(h, S, A, "ℶ", "\\beth", !0);
f(h, S, A, "ℸ", "\\daleth", !0);
f(h, S, A, "ℷ", "\\gimel", !0);
f(h, S, A, "ϝ", "\\digamma", !0);
f(h, S, A, "ϰ", "\\varkappa");
f(h, S, zt, "┌", "\\@ulcorner", !0);
f(h, S, kt, "┐", "\\@urcorner", !0);
f(h, S, zt, "└", "\\@llcorner", !0);
f(h, S, kt, "┘", "\\@lrcorner", !0);
f(h, S, x, "≦", "\\leqq", !0);
f(h, S, x, "⩽", "\\leqslant", !0);
f(h, S, x, "⪕", "\\eqslantless", !0);
f(h, S, x, "≲", "\\lesssim", !0);
f(h, S, x, "⪅", "\\lessapprox", !0);
f(h, S, x, "≊", "\\approxeq", !0);
f(h, S, ce, "⋖", "\\lessdot");
f(h, S, x, "⋘", "\\lll", !0);
f(h, S, x, "≶", "\\lessgtr", !0);
f(h, S, x, "⋚", "\\lesseqgtr", !0);
f(h, S, x, "⪋", "\\lesseqqgtr", !0);
f(h, S, x, "≑", "\\doteqdot");
f(h, S, x, "≓", "\\risingdotseq", !0);
f(h, S, x, "≒", "\\fallingdotseq", !0);
f(h, S, x, "∽", "\\backsim", !0);
f(h, S, x, "⋍", "\\backsimeq", !0);
f(h, S, x, "⫅", "\\subseteqq", !0);
f(h, S, x, "⋐", "\\Subset", !0);
f(h, S, x, "⊏", "\\sqsubset", !0);
f(h, S, x, "≼", "\\preccurlyeq", !0);
f(h, S, x, "⋞", "\\curlyeqprec", !0);
f(h, S, x, "≾", "\\precsim", !0);
f(h, S, x, "⪷", "\\precapprox", !0);
f(h, S, x, "⊲", "\\vartriangleleft");
f(h, S, x, "⊴", "\\trianglelefteq");
f(h, S, x, "⊨", "\\vDash", !0);
f(h, S, x, "⊪", "\\Vvdash", !0);
f(h, S, x, "⌣", "\\smallsmile");
f(h, S, x, "⌢", "\\smallfrown");
f(h, S, x, "≏", "\\bumpeq", !0);
f(h, S, x, "≎", "\\Bumpeq", !0);
f(h, S, x, "≧", "\\geqq", !0);
f(h, S, x, "⩾", "\\geqslant", !0);
f(h, S, x, "⪖", "\\eqslantgtr", !0);
f(h, S, x, "≳", "\\gtrsim", !0);
f(h, S, x, "⪆", "\\gtrapprox", !0);
f(h, S, ce, "⋗", "\\gtrdot");
f(h, S, x, "⋙", "\\ggg", !0);
f(h, S, x, "≷", "\\gtrless", !0);
f(h, S, x, "⋛", "\\gtreqless", !0);
f(h, S, x, "⪌", "\\gtreqqless", !0);
f(h, S, x, "≖", "\\eqcirc", !0);
f(h, S, x, "≗", "\\circeq", !0);
f(h, S, x, "≜", "\\triangleq", !0);
f(h, S, x, "∼", "\\thicksim");
f(h, S, x, "≈", "\\thickapprox");
f(h, S, x, "⫆", "\\supseteqq", !0);
f(h, S, x, "⋑", "\\Supset", !0);
f(h, S, x, "⊐", "\\sqsupset", !0);
f(h, S, x, "≽", "\\succcurlyeq", !0);
f(h, S, x, "⋟", "\\curlyeqsucc", !0);
f(h, S, x, "≿", "\\succsim", !0);
f(h, S, x, "⪸", "\\succapprox", !0);
f(h, S, x, "⊳", "\\vartriangleright");
f(h, S, x, "⊵", "\\trianglerighteq");
f(h, S, x, "⊩", "\\Vdash", !0);
f(h, S, x, "∣", "\\shortmid");
f(h, S, x, "∥", "\\shortparallel");
f(h, S, x, "≬", "\\between", !0);
f(h, S, x, "⋔", "\\pitchfork", !0);
f(h, S, x, "∝", "\\varpropto");
f(h, S, x, "◀", "\\blacktriangleleft");
f(h, S, x, "∴", "\\therefore", !0);
f(h, S, x, "∍", "\\backepsilon");
f(h, S, x, "▶", "\\blacktriangleright");
f(h, S, x, "∵", "\\because", !0);
f(h, S, x, "⋘", "\\llless");
f(h, S, x, "⋙", "\\gggtr");
f(h, S, ce, "⊲", "\\lhd");
f(h, S, ce, "⊳", "\\rhd");
f(h, S, x, "≂", "\\eqsim", !0);
f(h, g, x, "⋈", "\\Join");
f(h, S, x, "≑", "\\Doteq", !0);
f(h, S, ce, "∔", "\\dotplus", !0);
f(h, S, ce, "∖", "\\smallsetminus");
f(h, S, ce, "⋒", "\\Cap", !0);
f(h, S, ce, "⋓", "\\Cup", !0);
f(h, S, ce, "⩞", "\\doublebarwedge", !0);
f(h, S, ce, "⊟", "\\boxminus", !0);
f(h, S, ce, "⊞", "\\boxplus", !0);
f(h, S, ce, "⋇", "\\divideontimes", !0);
f(h, S, ce, "⋉", "\\ltimes", !0);
f(h, S, ce, "⋊", "\\rtimes", !0);
f(h, S, ce, "⋋", "\\leftthreetimes", !0);
f(h, S, ce, "⋌", "\\rightthreetimes", !0);
f(h, S, ce, "⋏", "\\curlywedge", !0);
f(h, S, ce, "⋎", "\\curlyvee", !0);
f(h, S, ce, "⊝", "\\circleddash", !0);
f(h, S, ce, "⊛", "\\circledast", !0);
f(h, S, ce, "⋅", "\\centerdot");
f(h, S, ce, "⊺", "\\intercal", !0);
f(h, S, ce, "⋒", "\\doublecap");
f(h, S, ce, "⋓", "\\doublecup");
f(h, S, ce, "⊠", "\\boxtimes", !0);
f(h, S, x, "⇢", "\\dashrightarrow", !0);
f(h, S, x, "⇠", "\\dashleftarrow", !0);
f(h, S, x, "⇇", "\\leftleftarrows", !0);
f(h, S, x, "⇆", "\\leftrightarrows", !0);
f(h, S, x, "⇚", "\\Lleftarrow", !0);
f(h, S, x, "↞", "\\twoheadleftarrow", !0);
f(h, S, x, "↢", "\\leftarrowtail", !0);
f(h, S, x, "↫", "\\looparrowleft", !0);
f(h, S, x, "⇋", "\\leftrightharpoons", !0);
f(h, S, x, "↶", "\\curvearrowleft", !0);
f(h, S, x, "↺", "\\circlearrowleft", !0);
f(h, S, x, "↰", "\\Lsh", !0);
f(h, S, x, "⇈", "\\upuparrows", !0);
f(h, S, x, "↿", "\\upharpoonleft", !0);
f(h, S, x, "⇃", "\\downharpoonleft", !0);
f(h, g, x, "⊶", "\\origof", !0);
f(h, g, x, "⊷", "\\imageof", !0);
f(h, S, x, "⊸", "\\multimap", !0);
f(h, S, x, "↭", "\\leftrightsquigarrow", !0);
f(h, S, x, "⇉", "\\rightrightarrows", !0);
f(h, S, x, "⇄", "\\rightleftarrows", !0);
f(h, S, x, "↠", "\\twoheadrightarrow", !0);
f(h, S, x, "↣", "\\rightarrowtail", !0);
f(h, S, x, "↬", "\\looparrowright", !0);
f(h, S, x, "↷", "\\curvearrowright", !0);
f(h, S, x, "↻", "\\circlearrowright", !0);
f(h, S, x, "↱", "\\Rsh", !0);
f(h, S, x, "⇊", "\\downdownarrows", !0);
f(h, S, x, "↾", "\\upharpoonright", !0);
f(h, S, x, "⇂", "\\downharpoonright", !0);
f(h, S, x, "⇝", "\\rightsquigarrow", !0);
f(h, S, x, "⇝", "\\leadsto");
f(h, S, x, "⇛", "\\Rrightarrow", !0);
f(h, S, x, "↾", "\\restriction");
f(h, g, A, "‘", "`");
f(h, g, A, "$", "\\$");
f(Y, g, A, "$", "\\$");
f(Y, g, A, "$", "\\textdollar");
f(h, g, A, "%", "\\%");
f(Y, g, A, "%", "\\%");
f(h, g, A, "_", "\\_");
f(Y, g, A, "_", "\\_");
f(Y, g, A, "_", "\\textunderscore");
f(h, g, A, "∠", "\\angle", !0);
f(h, g, A, "∞", "\\infty", !0);
f(h, g, A, "′", "\\prime");
f(h, g, A, "△", "\\triangle");
f(h, g, A, "Γ", "\\Gamma", !0);
f(h, g, A, "Δ", "\\Delta", !0);
f(h, g, A, "Θ", "\\Theta", !0);
f(h, g, A, "Λ", "\\Lambda", !0);
f(h, g, A, "Ξ", "\\Xi", !0);
f(h, g, A, "Π", "\\Pi", !0);
f(h, g, A, "Σ", "\\Sigma", !0);
f(h, g, A, "Υ", "\\Upsilon", !0);
f(h, g, A, "Φ", "\\Phi", !0);
f(h, g, A, "Ψ", "\\Psi", !0);
f(h, g, A, "Ω", "\\Omega", !0);
f(h, g, A, "A", "Α");
f(h, g, A, "B", "Β");
f(h, g, A, "E", "Ε");
f(h, g, A, "Z", "Ζ");
f(h, g, A, "H", "Η");
f(h, g, A, "I", "Ι");
f(h, g, A, "K", "Κ");
f(h, g, A, "M", "Μ");
f(h, g, A, "N", "Ν");
f(h, g, A, "O", "Ο");
f(h, g, A, "P", "Ρ");
f(h, g, A, "T", "Τ");
f(h, g, A, "X", "Χ");
f(h, g, A, "¬", "\\neg", !0);
f(h, g, A, "¬", "\\lnot");
f(h, g, A, "⊤", "\\top");
f(h, g, A, "⊥", "\\bot");
f(h, g, A, "∅", "\\emptyset");
f(h, S, A, "∅", "\\varnothing");
f(h, g, ve, "α", "\\alpha", !0);
f(h, g, ve, "β", "\\beta", !0);
f(h, g, ve, "γ", "\\gamma", !0);
f(h, g, ve, "δ", "\\delta", !0);
f(h, g, ve, "ϵ", "\\epsilon", !0);
f(h, g, ve, "ζ", "\\zeta", !0);
f(h, g, ve, "η", "\\eta", !0);
f(h, g, ve, "θ", "\\theta", !0);
f(h, g, ve, "ι", "\\iota", !0);
f(h, g, ve, "κ", "\\kappa", !0);
f(h, g, ve, "λ", "\\lambda", !0);
f(h, g, ve, "μ", "\\mu", !0);
f(h, g, ve, "ν", "\\nu", !0);
f(h, g, ve, "ξ", "\\xi", !0);
f(h, g, ve, "ο", "\\omicron", !0);
f(h, g, ve, "π", "\\pi", !0);
f(h, g, ve, "ρ", "\\rho", !0);
f(h, g, ve, "σ", "\\sigma", !0);
f(h, g, ve, "τ", "\\tau", !0);
f(h, g, ve, "υ", "\\upsilon", !0);
f(h, g, ve, "ϕ", "\\phi", !0);
f(h, g, ve, "χ", "\\chi", !0);
f(h, g, ve, "ψ", "\\psi", !0);
f(h, g, ve, "ω", "\\omega", !0);
f(h, g, ve, "ε", "\\varepsilon", !0);
f(h, g, ve, "ϑ", "\\vartheta", !0);
f(h, g, ve, "ϖ", "\\varpi", !0);
f(h, g, ve, "ϱ", "\\varrho", !0);
f(h, g, ve, "ς", "\\varsigma", !0);
f(h, g, ve, "φ", "\\varphi", !0);
f(h, g, ce, "∗", "*", !0);
f(h, g, ce, "+", "+");
f(h, g, ce, "−", "-", !0);
f(h, g, ce, "⋅", "\\cdot", !0);
f(h, g, ce, "∘", "\\circ", !0);
f(h, g, ce, "÷", "\\div", !0);
f(h, g, ce, "±", "\\pm", !0);
f(h, g, ce, "×", "\\times", !0);
f(h, g, ce, "∩", "\\cap", !0);
f(h, g, ce, "∪", "\\cup", !0);
f(h, g, ce, "∖", "\\setminus", !0);
f(h, g, ce, "∧", "\\land");
f(h, g, ce, "∨", "\\lor");
f(h, g, ce, "∧", "\\wedge", !0);
f(h, g, ce, "∨", "\\vee", !0);
f(h, g, A, "√", "\\surd");
f(h, g, zt, "⟨", "\\langle", !0);
f(h, g, zt, "∣", "\\lvert");
f(h, g, zt, "∥", "\\lVert");
f(h, g, kt, "?", "?");
f(h, g, kt, "!", "!");
f(h, g, kt, "⟩", "\\rangle", !0);
f(h, g, kt, "∣", "\\rvert");
f(h, g, kt, "∥", "\\rVert");
f(h, g, x, "=", "=");
f(h, g, x, ":", ":");
f(h, g, x, "≈", "\\approx", !0);
f(h, g, x, "≅", "\\cong", !0);
f(h, g, x, "≥", "\\ge");
f(h, g, x, "≥", "\\geq", !0);
f(h, g, x, "←", "\\gets");
f(h, g, x, ">", "\\gt", !0);
f(h, g, x, "∈", "\\in", !0);
f(h, g, x, "", "\\@not");
f(h, g, x, "⊂", "\\subset", !0);
f(h, g, x, "⊃", "\\supset", !0);
f(h, g, x, "⊆", "\\subseteq", !0);
f(h, g, x, "⊇", "\\supseteq", !0);
f(h, S, x, "⊈", "\\nsubseteq", !0);
f(h, S, x, "⊉", "\\nsupseteq", !0);
f(h, g, x, "⊨", "\\models");
f(h, g, x, "←", "\\leftarrow", !0);
f(h, g, x, "≤", "\\le");
f(h, g, x, "≤", "\\leq", !0);
f(h, g, x, "<", "\\lt", !0);
f(h, g, x, "→", "\\rightarrow", !0);
f(h, g, x, "→", "\\to");
f(h, S, x, "≱", "\\ngeq", !0);
f(h, S, x, "≰", "\\nleq", !0);
f(h, g, $r, " ", "\\ ");
f(h, g, $r, " ", "\\space");
f(h, g, $r, " ", "\\nobreakspace");
f(Y, g, $r, " ", "\\ ");
f(Y, g, $r, " ", " ");
f(Y, g, $r, " ", "\\space");
f(Y, g, $r, " ", "\\nobreakspace");
f(h, g, $r, null, "\\nobreak");
f(h, g, $r, null, "\\allowbreak");
f(h, g, e0, ",", ",");
f(h, g, e0, ";", ";");
f(h, S, ce, "⊼", "\\barwedge", !0);
f(h, S, ce, "⊻", "\\veebar", !0);
f(h, g, ce, "⊙", "\\odot", !0);
f(h, g, ce, "⊕", "\\oplus", !0);
f(h, g, ce, "⊗", "\\otimes", !0);
f(h, g, A, "∂", "\\partial", !0);
f(h, g, ce, "⊘", "\\oslash", !0);
f(h, S, ce, "⊚", "\\circledcirc", !0);
f(h, S, ce, "⊡", "\\boxdot", !0);
f(h, g, ce, "△", "\\bigtriangleup");
f(h, g, ce, "▽", "\\bigtriangledown");
f(h, g, ce, "†", "\\dagger");
f(h, g, ce, "⋄", "\\diamond");
f(h, g, ce, "⋆", "\\star");
f(h, g, ce, "◃", "\\triangleleft");
f(h, g, ce, "▹", "\\triangleright");
f(h, g, zt, "{", "\\{");
f(Y, g, A, "{", "\\{");
f(Y, g, A, "{", "\\textbraceleft");
f(h, g, kt, "}", "\\}");
f(Y, g, A, "}", "\\}");
f(Y, g, A, "}", "\\textbraceright");
f(h, g, zt, "{", "\\lbrace");
f(h, g, kt, "}", "\\rbrace");
f(h, g, zt, "[", "\\lbrack", !0);
f(Y, g, A, "[", "\\lbrack", !0);
f(h, g, kt, "]", "\\rbrack", !0);
f(Y, g, A, "]", "\\rbrack", !0);
f(h, g, zt, "(", "\\lparen", !0);
f(h, g, kt, ")", "\\rparen", !0);
f(Y, g, A, "<", "\\textless", !0);
f(Y, g, A, ">", "\\textgreater", !0);
f(h, g, zt, "⌊", "\\lfloor", !0);
f(h, g, kt, "⌋", "\\rfloor", !0);
f(h, g, zt, "⌈", "\\lceil", !0);
f(h, g, kt, "⌉", "\\rceil", !0);
f(h, g, A, "\\", "\\backslash");
f(h, g, A, "∣", "|");
f(h, g, A, "∣", "\\vert");
f(Y, g, A, "|", "\\textbar", !0);
f(h, g, A, "∥", "\\|");
f(h, g, A, "∥", "\\Vert");
f(Y, g, A, "∥", "\\textbardbl");
f(Y, g, A, "~", "\\textasciitilde");
f(Y, g, A, "\\", "\\textbackslash");
f(Y, g, A, "^", "\\textasciicircum");
f(h, g, x, "↑", "\\uparrow", !0);
f(h, g, x, "⇑", "\\Uparrow", !0);
f(h, g, x, "↓", "\\downarrow", !0);
f(h, g, x, "⇓", "\\Downarrow", !0);
f(h, g, x, "↕", "\\updownarrow", !0);
f(h, g, x, "⇕", "\\Updownarrow", !0);
f(h, g, at, "∐", "\\coprod");
f(h, g, at, "⋁", "\\bigvee");
f(h, g, at, "⋀", "\\bigwedge");
f(h, g, at, "⨄", "\\biguplus");
f(h, g, at, "⋂", "\\bigcap");
f(h, g, at, "⋃", "\\bigcup");
f(h, g, at, "∫", "\\int");
f(h, g, at, "∫", "\\intop");
f(h, g, at, "∬", "\\iint");
f(h, g, at, "∭", "\\iiint");
f(h, g, at, "∏", "\\prod");
f(h, g, at, "∑", "\\sum");
f(h, g, at, "⨂", "\\bigotimes");
f(h, g, at, "⨁", "\\bigoplus");
f(h, g, at, "⨀", "\\bigodot");
f(h, g, at, "∮", "\\oint");
f(h, g, at, "∯", "\\oiint");
f(h, g, at, "∰", "\\oiiint");
f(h, g, at, "⨆", "\\bigsqcup");
f(h, g, at, "∫", "\\smallint");
f(Y, g, ta, "…", "\\textellipsis");
f(h, g, ta, "…", "\\mathellipsis");
f(Y, g, ta, "…", "\\ldots", !0);
f(h, g, ta, "…", "\\ldots", !0);
f(h, g, ta, "⋯", "\\@cdots", !0);
f(h, g, ta, "⋱", "\\ddots", !0);
f(h, g, A, "⋮", "\\varvdots");
f(h, g, Ve, "ˊ", "\\acute");
f(h, g, Ve, "ˋ", "\\grave");
f(h, g, Ve, "¨", "\\ddot");
f(h, g, Ve, "~", "\\tilde");
f(h, g, Ve, "ˉ", "\\bar");
f(h, g, Ve, "˘", "\\breve");
f(h, g, Ve, "ˇ", "\\check");
f(h, g, Ve, "^", "\\hat");
f(h, g, Ve, "⃗", "\\vec");
f(h, g, Ve, "˙", "\\dot");
f(h, g, Ve, "˚", "\\mathring");
f(h, g, ve, "", "\\@imath");
f(h, g, ve, "", "\\@jmath");
f(h, g, A, "ı", "ı");
f(h, g, A, "ȷ", "ȷ");
f(Y, g, A, "ı", "\\i", !0);
f(Y, g, A, "ȷ", "\\j", !0);
f(Y, g, A, "ß", "\\ss", !0);
f(Y, g, A, "æ", "\\ae", !0);
f(Y, g, A, "œ", "\\oe", !0);
f(Y, g, A, "ø", "\\o", !0);
f(Y, g, A, "Æ", "\\AE", !0);
f(Y, g, A, "Œ", "\\OE", !0);
f(Y, g, A, "Ø", "\\O", !0);
f(Y, g, Ve, "ˊ", "\\'");
f(Y, g, Ve, "ˋ", "\\`");
f(Y, g, Ve, "ˆ", "\\^");
f(Y, g, Ve, "˜", "\\~");
f(Y, g, Ve, "ˉ", "\\=");
f(Y, g, Ve, "˘", "\\u");
f(Y, g, Ve, "˙", "\\.");
f(Y, g, Ve, "¸", "\\c");
f(Y, g, Ve, "˚", "\\r");
f(Y, g, Ve, "ˇ", "\\v");
f(Y, g, Ve, "¨", '\\"');
f(Y, g, Ve, "˝", "\\H");
f(Y, g, Ve, "◯", "\\textcircled");
var u4 = { "--": !0, "---": !0, "``": !0, "''": !0 };
f(Y, g, A, "–", "--", !0);
f(Y, g, A, "–", "\\textendash");
f(Y, g, A, "—", "---", !0);
f(Y, g, A, "—", "\\textemdash");
f(Y, g, A, "‘", "`", !0);
f(Y, g, A, "‘", "\\textquoteleft");
f(Y, g, A, "’", "'", !0);
f(Y, g, A, "’", "\\textquoteright");
f(Y, g, A, "“", "``", !0);
f(Y, g, A, "“", "\\textquotedblleft");
f(Y, g, A, "”", "''", !0);
f(Y, g, A, "”", "\\textquotedblright");
f(h, g, A, "°", "\\degree", !0);
f(Y, g, A, "°", "\\degree");
f(Y, g, A, "°", "\\textdegree", !0);
f(h, g, A, "£", "\\pounds");
f(h, g, A, "£", "\\mathsterling", !0);
f(Y, g, A, "£", "\\pounds");
f(Y, g, A, "£", "\\textsterling", !0);
f(h, S, A, "✠", "\\maltese");
f(Y, S, A, "✠", "\\maltese");
var Xd = '0123456789/@."';
for (var q0 = 0; q0 < Xd.length; q0++) {
	var Jd = Xd.charAt(q0);
	f(h, g, A, Jd, Jd);
}
var Zd = '0123456789!@*()-=+";:?/.,';
for (var G0 = 0; G0 < Zd.length; G0++) {
	var Qd = Zd.charAt(G0);
	f(Y, g, A, Qd, Qd);
}
var Eo = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
for (var Y0 = 0; Y0 < Eo.length; Y0++) {
	var Ds = Eo.charAt(Y0);
	f(h, g, ve, Ds, Ds), f(Y, g, A, Ds, Ds);
}
f(h, S, A, "C", "ℂ");
f(Y, S, A, "C", "ℂ");
f(h, S, A, "H", "ℍ");
f(Y, S, A, "H", "ℍ");
f(h, S, A, "N", "ℕ");
f(Y, S, A, "N", "ℕ");
f(h, S, A, "P", "ℙ");
f(Y, S, A, "P", "ℙ");
f(h, S, A, "Q", "ℚ");
f(Y, S, A, "Q", "ℚ");
f(h, S, A, "R", "ℝ");
f(Y, S, A, "R", "ℝ");
f(h, S, A, "Z", "ℤ");
f(Y, S, A, "Z", "ℤ");
f(h, g, ve, "h", "ℎ");
f(Y, g, ve, "h", "ℎ");
var we = "";
for (var At = 0; At < Eo.length; At++) {
	var it = Eo.charAt(At);
	(we = String.fromCharCode(55349, 56320 + At)),
		f(h, g, ve, it, we),
		f(Y, g, A, it, we),
		(we = String.fromCharCode(55349, 56372 + At)),
		f(h, g, ve, it, we),
		f(Y, g, A, it, we),
		(we = String.fromCharCode(55349, 56424 + At)),
		f(h, g, ve, it, we),
		f(Y, g, A, it, we),
		(we = String.fromCharCode(55349, 56580 + At)),
		f(h, g, ve, it, we),
		f(Y, g, A, it, we),
		(we = String.fromCharCode(55349, 56736 + At)),
		f(h, g, ve, it, we),
		f(Y, g, A, it, we),
		(we = String.fromCharCode(55349, 56788 + At)),
		f(h, g, ve, it, we),
		f(Y, g, A, it, we),
		(we = String.fromCharCode(55349, 56840 + At)),
		f(h, g, ve, it, we),
		f(Y, g, A, it, we),
		(we = String.fromCharCode(55349, 56944 + At)),
		f(h, g, ve, it, we),
		f(Y, g, A, it, we),
		At < 26 &&
			((we = String.fromCharCode(55349, 56632 + At)),
			f(h, g, ve, it, we),
			f(Y, g, A, it, we),
			(we = String.fromCharCode(55349, 56476 + At)),
			f(h, g, ve, it, we),
			f(Y, g, A, it, we));
}
we = String.fromCharCode(55349, 56668);
f(h, g, ve, "k", we);
f(Y, g, A, "k", we);
for (var In = 0; In < 10; In++) {
	var Xr = In.toString();
	(we = String.fromCharCode(55349, 57294 + In)),
		f(h, g, ve, Xr, we),
		f(Y, g, A, Xr, we),
		(we = String.fromCharCode(55349, 57314 + In)),
		f(h, g, ve, Xr, we),
		f(Y, g, A, Xr, we),
		(we = String.fromCharCode(55349, 57324 + In)),
		f(h, g, ve, Xr, we),
		f(Y, g, A, Xr, we),
		(we = String.fromCharCode(55349, 57334 + In)),
		f(h, g, ve, Xr, we),
		f(Y, g, A, Xr, we);
}
var tc = "ÐÞþ";
for (var W0 = 0; W0 < tc.length; W0++) {
	var Bs = tc.charAt(W0);
	f(h, g, ve, Bs, Bs), f(Y, g, A, Bs, Bs);
}
var Ps = [
		["mathbf", "textbf", "Main-Bold"],
		["mathbf", "textbf", "Main-Bold"],
		["mathnormal", "textit", "Math-Italic"],
		["mathnormal", "textit", "Math-Italic"],
		["boldsymbol", "boldsymbol", "Main-BoldItalic"],
		["boldsymbol", "boldsymbol", "Main-BoldItalic"],
		["mathscr", "textscr", "Script-Regular"],
		["", "", ""],
		["", "", ""],
		["", "", ""],
		["mathfrak", "textfrak", "Fraktur-Regular"],
		["mathfrak", "textfrak", "Fraktur-Regular"],
		["mathbb", "textbb", "AMS-Regular"],
		["mathbb", "textbb", "AMS-Regular"],
		["", "", ""],
		["", "", ""],
		["mathsf", "textsf", "SansSerif-Regular"],
		["mathsf", "textsf", "SansSerif-Regular"],
		["mathboldsf", "textboldsf", "SansSerif-Bold"],
		["mathboldsf", "textboldsf", "SansSerif-Bold"],
		["mathitsf", "textitsf", "SansSerif-Italic"],
		["mathitsf", "textitsf", "SansSerif-Italic"],
		["", "", ""],
		["", "", ""],
		["mathtt", "texttt", "Typewriter-Regular"],
		["mathtt", "texttt", "Typewriter-Regular"],
	],
	eh = [
		["mathbf", "textbf", "Main-Bold"],
		["", "", ""],
		["mathsf", "textsf", "SansSerif-Regular"],
		["mathboldsf", "textboldsf", "SansSerif-Bold"],
		["mathtt", "texttt", "Typewriter-Regular"],
	],
	Nv = function (t, r) {
		var n = t.charCodeAt(0),
			i = t.charCodeAt(1),
			a = (n - 55296) * 1024 + (i - 56320) + 65536,
			s = r === "math" ? 0 : 1;
		if (119808 <= a && a < 120484) {
			var o = Math.floor((a - 119808) / 26);
			return [Ps[o][2], Ps[o][s]];
		} else if (120782 <= a && a <= 120831) {
			var l = Math.floor((a - 120782) / 10);
			return [eh[l][2], eh[l][s]];
		} else {
			if (a === 120485 || a === 120486) return [Ps[0][2], Ps[0][s]];
			if (120486 < a && a < 120782) return ["", ""];
			throw new Z("Unsupported character: " + t);
		}
	},
	t0 = function (t, r, n) {
		return (
			Ue[n][t] && Ue[n][t].replace && (t = Ue[n][t].replace),
			{ value: t, metrics: wu(t, r, n) }
		);
	},
	Xt = function (t, r, n, i, a) {
		var s = t0(t, r, n),
			o = s.metrics;
		t = s.value;
		var l;
		if (o) {
			var c = o.italic;
			(n === "text" || (i && i.font === "mathit")) && (c = 0),
				(l = new Wt(t, o.height, o.depth, c, o.skew, o.width, a));
		} else
			typeof console < "u" &&
				console.warn(
					"No character metrics " +
						("for '" + t + "' in style '" + r + "' and mode '" + n + "'")
				),
				(l = new Wt(t, 0, 0, 0, 0, 0, a));
		if (i) {
			(l.maxFontSize = i.sizeMultiplier),
				i.style.isTight() && l.classes.push("mtight");
			var u = i.getColor();
			u && (l.style.color = u);
		}
		return l;
	},
	Cv = function (t, r, n, i) {
		return (
			i === void 0 && (i = []),
			n.font === "boldsymbol" && t0(t, "Main-Bold", r).metrics
				? Xt(t, "Main-Bold", r, n, i.concat(["mathbf"]))
				: t === "\\" || Ue[r][t].font === "main"
				? Xt(t, "Main-Regular", r, n, i)
				: Xt(t, "AMS-Regular", r, n, i.concat(["amsrm"]))
		);
	},
	Iv = function (t, r, n, i, a) {
		return a !== "textord" && t0(t, "Math-BoldItalic", r).metrics
			? { fontName: "Math-BoldItalic", fontClass: "boldsymbol" }
			: { fontName: "Main-Bold", fontClass: "mathbf" };
	},
	Dv = function (t, r, n) {
		var i = t.mode,
			a = t.text,
			s = ["mord"],
			o = i === "math" || (i === "text" && r.font),
			l = o ? r.font : r.fontFamily;
		if (a.charCodeAt(0) === 55349) {
			var [c, u] = Nv(a, i);
			return Xt(a, c, i, r, s.concat(u));
		} else if (l) {
			var d, p;
			if (l === "boldsymbol") {
				var m = Iv(a, i, r, s, n);
				(d = m.fontName), (p = [m.fontClass]);
			} else
				o
					? ((d = h4[l].fontName), (p = [l]))
					: ((d = Ls(l, r.fontWeight, r.fontShape)),
					  (p = [l, r.fontWeight, r.fontShape]));
			if (t0(a, d, i).metrics) return Xt(a, d, i, r, s.concat(p));
			if (u4.hasOwnProperty(a) && d.slice(0, 10) === "Typewriter") {
				for (var b = [], E = 0; E < a.length; E++)
					b.push(Xt(a[E], d, i, r, s.concat(p)));
				return d4(b);
			}
		}
		if (n === "mathord")
			return Xt(a, "Math-Italic", i, r, s.concat(["mathnormal"]));
		if (n === "textord") {
			var R = Ue[i][a] && Ue[i][a].font;
			if (R === "ams") {
				var _ = Ls("amsrm", r.fontWeight, r.fontShape);
				return Xt(a, _, i, r, s.concat("amsrm", r.fontWeight, r.fontShape));
			} else if (R === "main" || !R) {
				var v = Ls("textrm", r.fontWeight, r.fontShape);
				return Xt(a, v, i, r, s.concat(r.fontWeight, r.fontShape));
			} else {
				var T = Ls(R, r.fontWeight, r.fontShape);
				return Xt(a, T, i, r, s.concat(T, r.fontWeight, r.fontShape));
			}
		} else throw new Error("unexpected type: " + n + " in makeOrd");
	},
	Bv = (e, t) => {
		if (
			wn(e.classes) !== wn(t.classes) ||
			e.skew !== t.skew ||
			e.maxFontSize !== t.maxFontSize
		)
			return !1;
		if (e.classes.length === 1) {
			var r = e.classes[0];
			if (r === "mbin" || r === "mord") return !1;
		}
		for (var n in e.style)
			if (e.style.hasOwnProperty(n) && e.style[n] !== t.style[n]) return !1;
		for (var i in t.style)
			if (t.style.hasOwnProperty(i) && e.style[i] !== t.style[i]) return !1;
		return !0;
	},
	Pv = (e) => {
		for (var t = 0; t < e.length - 1; t++) {
			var r = e[t],
				n = e[t + 1];
			r instanceof Wt &&
				n instanceof Wt &&
				Bv(r, n) &&
				((r.text += n.text),
				(r.height = Math.max(r.height, n.height)),
				(r.depth = Math.max(r.depth, n.depth)),
				(r.italic = n.italic),
				e.splice(t + 1, 1),
				t--);
		}
		return e;
	},
	Eu = function (t) {
		for (var r = 0, n = 0, i = 0, a = 0; a < t.children.length; a++) {
			var s = t.children[a];
			s.height > r && (r = s.height),
				s.depth > n && (n = s.depth),
				s.maxFontSize > i && (i = s.maxFontSize);
		}
		(t.height = r), (t.depth = n), (t.maxFontSize = i);
	},
	Mt = function (t, r, n, i) {
		var a = new ps(t, r, n, i);
		return Eu(a), a;
	},
	f4 = (e, t, r, n) => new ps(e, t, r, n),
	Lv = function (t, r, n) {
		var i = Mt([t], [], r);
		return (
			(i.height = Math.max(
				n || r.fontMetrics().defaultRuleThickness,
				r.minRuleThickness
			)),
			(i.style.borderBottomWidth = re(i.height)),
			(i.maxFontSize = 1),
			i
		);
	},
	zv = function (t, r, n, i) {
		var a = new Su(t, r, n, i);
		return Eu(a), a;
	},
	d4 = function (t) {
		var r = new hs(t);
		return Eu(r), r;
	},
	$v = function (t, r) {
		return t instanceof hs ? Mt([], [t], r) : t;
	},
	Fv = function (t) {
		if (t.positionType === "individualShift") {
			for (
				var r = t.children,
					n = [r[0]],
					i = -r[0].shift - r[0].elem.depth,
					a = i,
					s = 1;
				s < r.length;
				s++
			) {
				var o = -r[s].shift - a - r[s].elem.depth,
					l = o - (r[s - 1].elem.height + r[s - 1].elem.depth);
				(a = a + o), n.push({ type: "kern", size: l }), n.push(r[s]);
			}
			return { children: n, depth: i };
		}
		var c;
		if (t.positionType === "top") {
			for (var u = t.positionData, d = 0; d < t.children.length; d++) {
				var p = t.children[d];
				u -= p.type === "kern" ? p.size : p.elem.height + p.elem.depth;
			}
			c = u;
		} else if (t.positionType === "bottom") c = -t.positionData;
		else {
			var m = t.children[0];
			if (m.type !== "elem")
				throw new Error('First child must have type "elem".');
			if (t.positionType === "shift") c = -m.elem.depth - t.positionData;
			else if (t.positionType === "firstBaseline") c = -m.elem.depth;
			else throw new Error("Invalid positionType " + t.positionType + ".");
		}
		return { children: t.children, depth: c };
	},
	Hv = function (t, r) {
		for (
			var { children: n, depth: i } = Fv(t), a = 0, s = 0;
			s < n.length;
			s++
		) {
			var o = n[s];
			if (o.type === "elem") {
				var l = o.elem;
				a = Math.max(a, l.maxFontSize, l.height);
			}
		}
		a += 2;
		var c = Mt(["pstrut"], []);
		c.style.height = re(a);
		for (var u = [], d = i, p = i, m = i, b = 0; b < n.length; b++) {
			var E = n[b];
			if (E.type === "kern") m += E.size;
			else {
				var R = E.elem,
					_ = E.wrapperClasses || [],
					v = E.wrapperStyle || {},
					T = Mt(_, [c, R], void 0, v);
				(T.style.top = re(-a - m - R.depth)),
					E.marginLeft && (T.style.marginLeft = E.marginLeft),
					E.marginRight && (T.style.marginRight = E.marginRight),
					u.push(T),
					(m += R.height + R.depth);
			}
			(d = Math.min(d, m)), (p = Math.max(p, m));
		}
		var M = Mt(["vlist"], u);
		M.style.height = re(p);
		var O;
		if (d < 0) {
			var B = Mt([], []),
				z = Mt(["vlist"], [B]);
			z.style.height = re(-d);
			var D = Mt(["vlist-s"], [new Wt("​")]);
			O = [Mt(["vlist-r"], [M, D]), Mt(["vlist-r"], [z])];
		} else O = [Mt(["vlist-r"], [M])];
		var H = Mt(["vlist-t"], O);
		return (
			O.length === 2 && H.classes.push("vlist-t2"),
			(H.height = p),
			(H.depth = -d),
			H
		);
	},
	Uv = (e, t) => {
		var r = Mt(["mspace"], [], t),
			n = Xe(e, t);
		return (r.style.marginRight = re(n)), r;
	},
	Ls = function (t, r, n) {
		var i = "";
		switch (t) {
			case "amsrm":
				i = "AMS";
				break;
			case "textrm":
				i = "Main";
				break;
			case "textsf":
				i = "SansSerif";
				break;
			case "texttt":
				i = "Typewriter";
				break;
			default:
				i = t;
		}
		var a;
		return (
			r === "textbf" && n === "textit"
				? (a = "BoldItalic")
				: r === "textbf"
				? (a = "Bold")
				: r === "textit"
				? (a = "Italic")
				: (a = "Regular"),
			i + "-" + a
		);
	},
	h4 = {
		mathbf: { variant: "bold", fontName: "Main-Bold" },
		mathrm: { variant: "normal", fontName: "Main-Regular" },
		textit: { variant: "italic", fontName: "Main-Italic" },
		mathit: { variant: "italic", fontName: "Main-Italic" },
		mathnormal: { variant: "italic", fontName: "Math-Italic" },
		mathbb: { variant: "double-struck", fontName: "AMS-Regular" },
		mathcal: { variant: "script", fontName: "Caligraphic-Regular" },
		mathfrak: { variant: "fraktur", fontName: "Fraktur-Regular" },
		mathscr: { variant: "script", fontName: "Script-Regular" },
		mathsf: { variant: "sans-serif", fontName: "SansSerif-Regular" },
		mathtt: { variant: "monospace", fontName: "Typewriter-Regular" },
	},
	p4 = {
		vec: ["vec", 0.471, 0.714],
		oiintSize1: ["oiintSize1", 0.957, 0.499],
		oiintSize2: ["oiintSize2", 1.472, 0.659],
		oiiintSize1: ["oiiintSize1", 1.304, 0.499],
		oiiintSize2: ["oiiintSize2", 1.98, 0.659],
	},
	jv = function (t, r) {
		var [n, i, a] = p4[t],
			s = new Sn(n),
			o = new Dr([s], {
				width: re(i),
				height: re(a),
				style: "width:" + re(i),
				viewBox: "0 0 " + 1e3 * i + " " + 1e3 * a,
				preserveAspectRatio: "xMinYMin",
			}),
			l = f4(["overlay"], [o], r);
		return (l.height = a), (l.style.height = re(a)), (l.style.width = re(i)), l;
	},
	N = {
		fontMap: h4,
		makeSymbol: Xt,
		mathsym: Cv,
		makeSpan: Mt,
		makeSvgSpan: f4,
		makeLineSpan: Lv,
		makeAnchor: zv,
		makeFragment: d4,
		wrapFragment: $v,
		makeVList: Hv,
		makeOrd: Dv,
		makeGlue: Uv,
		staticSvg: jv,
		svgData: p4,
		tryCombineChars: Pv,
	},
	Ke = { number: 3, unit: "mu" },
	Dn = { number: 4, unit: "mu" },
	wr = { number: 5, unit: "mu" },
	qv = {
		mord: { mop: Ke, mbin: Dn, mrel: wr, minner: Ke },
		mop: { mord: Ke, mop: Ke, mrel: wr, minner: Ke },
		mbin: { mord: Dn, mop: Dn, mopen: Dn, minner: Dn },
		mrel: { mord: wr, mop: wr, mopen: wr, minner: wr },
		mopen: {},
		mclose: { mop: Ke, mbin: Dn, mrel: wr, minner: Ke },
		mpunct: {
			mord: Ke,
			mop: Ke,
			mrel: wr,
			mopen: Ke,
			mclose: Ke,
			mpunct: Ke,
			minner: Ke,
		},
		minner: {
			mord: Ke,
			mop: Ke,
			mbin: Dn,
			mrel: wr,
			mopen: Ke,
			mpunct: Ke,
			minner: Ke,
		},
	},
	Gv = {
		mord: { mop: Ke },
		mop: { mord: Ke, mop: Ke },
		mbin: {},
		mrel: {},
		mopen: {},
		mclose: { mop: Ke },
		mpunct: {},
		minner: { mop: Ke },
	},
	m4 = {},
	xo = {},
	To = {};
function le(e) {
	for (
		var {
				type: t,
				names: r,
				props: n,
				handler: i,
				htmlBuilder: a,
				mathmlBuilder: s,
			} = e,
			o = {
				type: t,
				numArgs: n.numArgs,
				argTypes: n.argTypes,
				allowedInArgument: !!n.allowedInArgument,
				allowedInText: !!n.allowedInText,
				allowedInMath: n.allowedInMath === void 0 ? !0 : n.allowedInMath,
				numOptionalArgs: n.numOptionalArgs || 0,
				infix: !!n.infix,
				primitive: !!n.primitive,
				handler: i,
			},
			l = 0;
		l < r.length;
		++l
	)
		m4[r[l]] = o;
	t && (a && (xo[t] = a), s && (To[t] = s));
}
function ti(e) {
	var { type: t, htmlBuilder: r, mathmlBuilder: n } = e;
	le({
		type: t,
		names: [],
		props: { numArgs: 0 },
		handler() {
			throw new Error("Should never be called.");
		},
		htmlBuilder: r,
		mathmlBuilder: n,
	});
}
var ko = function (t) {
		return t.type === "ordgroup" && t.body.length === 1 ? t.body[0] : t;
	},
	nt = function (t) {
		return t.type === "ordgroup" ? t.body : [t];
	},
	Br = N.makeSpan,
	Yv = ["leftmost", "mbin", "mopen", "mrel", "mop", "mpunct"],
	Wv = ["rightmost", "mrel", "mclose", "mpunct"],
	Vv = {
		display: be.DISPLAY,
		text: be.TEXT,
		script: be.SCRIPT,
		scriptscript: be.SCRIPTSCRIPT,
	},
	Kv = {
		mord: "mord",
		mop: "mop",
		mbin: "mbin",
		mrel: "mrel",
		mopen: "mopen",
		mclose: "mclose",
		mpunct: "mpunct",
		minner: "minner",
	},
	ot = function (t, r, n, i) {
		i === void 0 && (i = [null, null]);
		for (var a = [], s = 0; s < t.length; s++) {
			var o = Be(t[s], r);
			if (o instanceof hs) {
				var l = o.children;
				a.push(...l);
			} else a.push(o);
		}
		if ((N.tryCombineChars(a), !n)) return a;
		var c = r;
		if (t.length === 1) {
			var u = t[0];
			u.type === "sizing"
				? (c = r.havingSize(u.size))
				: u.type === "styling" && (c = r.havingStyle(Vv[u.style]));
		}
		var d = Br([i[0] || "leftmost"], [], r),
			p = Br([i[1] || "rightmost"], [], r),
			m = n === "root";
		return (
			th(
				a,
				(b, E) => {
					var R = E.classes[0],
						_ = b.classes[0];
					R === "mbin" && _e.contains(Wv, _)
						? (E.classes[0] = "mord")
						: _ === "mbin" && _e.contains(Yv, R) && (b.classes[0] = "mord");
				},
				{ node: d },
				p,
				m
			),
			th(
				a,
				(b, E) => {
					var R = rc(E),
						_ = rc(b),
						v = R && _ ? (b.hasClass("mtight") ? Gv[R][_] : qv[R][_]) : null;
					if (v) return N.makeGlue(v, c);
				},
				{ node: d },
				p,
				m
			),
			a
		);
	},
	th = function e(t, r, n, i, a) {
		i && t.push(i);
		for (var s = 0; s < t.length; s++) {
			var o = t[s],
				l = g4(o);
			if (l) {
				e(l.children, r, n, null, a);
				continue;
			}
			var c = !o.hasClass("mspace");
			if (c) {
				var u = r(o, n.node);
				u && (n.insertAfter ? n.insertAfter(u) : (t.unshift(u), s++));
			}
			c
				? (n.node = o)
				: a && o.hasClass("newline") && (n.node = Br(["leftmost"])),
				(n.insertAfter = ((d) => (p) => {
					t.splice(d + 1, 0, p), s++;
				})(s));
		}
		i && t.pop();
	},
	g4 = function (t) {
		return t instanceof hs ||
			t instanceof Su ||
			(t instanceof ps && t.hasClass("enclosing"))
			? t
			: null;
	},
	Xv = function e(t, r) {
		var n = g4(t);
		if (n) {
			var i = n.children;
			if (i.length) {
				if (r === "right") return e(i[i.length - 1], "right");
				if (r === "left") return e(i[0], "left");
			}
		}
		return t;
	},
	rc = function (t, r) {
		return t ? (r && (t = Xv(t, r)), Kv[t.classes[0]] || null) : null;
	},
	Wa = function (t, r) {
		var n = ["nulldelimiter"].concat(t.baseSizingClasses());
		return Br(r.concat(n));
	},
	Be = function (t, r, n) {
		if (!t) return Br();
		if (xo[t.type]) {
			var i = xo[t.type](t, r);
			if (n && r.size !== n.size) {
				i = Br(r.sizingClasses(n), [i], r);
				var a = r.sizeMultiplier / n.sizeMultiplier;
				(i.height *= a), (i.depth *= a);
			}
			return i;
		} else throw new Z("Got group of unknown type: '" + t.type + "'");
	};
function zs(e, t) {
	var r = Br(["base"], e, t),
		n = Br(["strut"]);
	return (
		(n.style.height = re(r.height + r.depth)),
		r.depth && (n.style.verticalAlign = re(-r.depth)),
		r.children.unshift(n),
		r
	);
}
function nc(e, t) {
	var r = null;
	e.length === 1 && e[0].type === "tag" && ((r = e[0].tag), (e = e[0].body));
	var n = ot(e, t, "root"),
		i;
	n.length === 2 && n[1].hasClass("tag") && (i = n.pop());
	for (var a = [], s = [], o = 0; o < n.length; o++)
		if (
			(s.push(n[o]),
			n[o].hasClass("mbin") ||
				n[o].hasClass("mrel") ||
				n[o].hasClass("allowbreak"))
		) {
			for (
				var l = !1;
				o < n.length - 1 &&
				n[o + 1].hasClass("mspace") &&
				!n[o + 1].hasClass("newline");

			)
				o++, s.push(n[o]), n[o].hasClass("nobreak") && (l = !0);
			l || (a.push(zs(s, t)), (s = []));
		} else
			n[o].hasClass("newline") &&
				(s.pop(), s.length > 0 && (a.push(zs(s, t)), (s = [])), a.push(n[o]));
	s.length > 0 && a.push(zs(s, t));
	var c;
	r
		? ((c = zs(ot(r, t, !0))), (c.classes = ["tag"]), a.push(c))
		: i && a.push(i);
	var u = Br(["katex-html"], a);
	if ((u.setAttribute("aria-hidden", "true"), c)) {
		var d = c.children[0];
		(d.style.height = re(u.height + u.depth)),
			u.depth && (d.style.verticalAlign = re(-u.depth));
	}
	return u;
}
function y4(e) {
	return new hs(e);
}
class Ht {
	constructor(t, r, n) {
		(this.type = void 0),
			(this.attributes = void 0),
			(this.children = void 0),
			(this.classes = void 0),
			(this.type = t),
			(this.attributes = {}),
			(this.children = r || []),
			(this.classes = n || []);
	}
	setAttribute(t, r) {
		this.attributes[t] = r;
	}
	getAttribute(t) {
		return this.attributes[t];
	}
	toNode() {
		var t = document.createElementNS(
			"http://www.w3.org/1998/Math/MathML",
			this.type
		);
		for (var r in this.attributes)
			Object.prototype.hasOwnProperty.call(this.attributes, r) &&
				t.setAttribute(r, this.attributes[r]);
		this.classes.length > 0 && (t.className = wn(this.classes));
		for (var n = 0; n < this.children.length; n++)
			t.appendChild(this.children[n].toNode());
		return t;
	}
	toMarkup() {
		var t = "<" + this.type;
		for (var r in this.attributes)
			Object.prototype.hasOwnProperty.call(this.attributes, r) &&
				((t += " " + r + '="'),
				(t += _e.escape(this.attributes[r])),
				(t += '"'));
		this.classes.length > 0 &&
			(t += ' class ="' + _e.escape(wn(this.classes)) + '"'),
			(t += ">");
		for (var n = 0; n < this.children.length; n++)
			t += this.children[n].toMarkup();
		return (t += "</" + this.type + ">"), t;
	}
	toText() {
		return this.children.map((t) => t.toText()).join("");
	}
}
class Ma {
	constructor(t) {
		(this.text = void 0), (this.text = t);
	}
	toNode() {
		return document.createTextNode(this.text);
	}
	toMarkup() {
		return _e.escape(this.toText());
	}
	toText() {
		return this.text;
	}
}
class Jv {
	constructor(t) {
		(this.width = void 0),
			(this.character = void 0),
			(this.width = t),
			t >= 0.05555 && t <= 0.05556
				? (this.character = " ")
				: t >= 0.1666 && t <= 0.1667
				? (this.character = " ")
				: t >= 0.2222 && t <= 0.2223
				? (this.character = " ")
				: t >= 0.2777 && t <= 0.2778
				? (this.character = "  ")
				: t >= -0.05556 && t <= -0.05555
				? (this.character = " ⁣")
				: t >= -0.1667 && t <= -0.1666
				? (this.character = " ⁣")
				: t >= -0.2223 && t <= -0.2222
				? (this.character = " ⁣")
				: t >= -0.2778 && t <= -0.2777
				? (this.character = " ⁣")
				: (this.character = null);
	}
	toNode() {
		if (this.character) return document.createTextNode(this.character);
		var t = document.createElementNS(
			"http://www.w3.org/1998/Math/MathML",
			"mspace"
		);
		return t.setAttribute("width", re(this.width)), t;
	}
	toMarkup() {
		return this.character
			? "<mtext>" + this.character + "</mtext>"
			: '<mspace width="' + re(this.width) + '"/>';
	}
	toText() {
		return this.character ? this.character : " ";
	}
}
var X = { MathNode: Ht, TextNode: Ma, SpaceNode: Jv, newDocumentFragment: y4 },
	Vt = function (t, r, n) {
		return (
			Ue[r][t] &&
				Ue[r][t].replace &&
				t.charCodeAt(0) !== 55349 &&
				!(
					u4.hasOwnProperty(t) &&
					n &&
					((n.fontFamily && n.fontFamily.slice(4, 6) === "tt") ||
						(n.font && n.font.slice(4, 6) === "tt"))
				) &&
				(t = Ue[r][t].replace),
			new X.TextNode(t)
		);
	},
	xu = function (t) {
		return t.length === 1 ? t[0] : new X.MathNode("mrow", t);
	},
	Tu = function (t, r) {
		if (r.fontFamily === "texttt") return "monospace";
		if (r.fontFamily === "textsf")
			return r.fontShape === "textit" && r.fontWeight === "textbf"
				? "sans-serif-bold-italic"
				: r.fontShape === "textit"
				? "sans-serif-italic"
				: r.fontWeight === "textbf"
				? "bold-sans-serif"
				: "sans-serif";
		if (r.fontShape === "textit" && r.fontWeight === "textbf")
			return "bold-italic";
		if (r.fontShape === "textit") return "italic";
		if (r.fontWeight === "textbf") return "bold";
		var n = r.font;
		if (!n || n === "mathnormal") return null;
		var i = t.mode;
		if (n === "mathit") return "italic";
		if (n === "boldsymbol")
			return t.type === "textord" ? "bold" : "bold-italic";
		if (n === "mathbf") return "bold";
		if (n === "mathbb") return "double-struck";
		if (n === "mathfrak") return "fraktur";
		if (n === "mathscr" || n === "mathcal") return "script";
		if (n === "mathsf") return "sans-serif";
		if (n === "mathtt") return "monospace";
		var a = t.text;
		if (_e.contains(["\\imath", "\\jmath"], a)) return null;
		Ue[i][a] && Ue[i][a].replace && (a = Ue[i][a].replace);
		var s = N.fontMap[n].fontName;
		return wu(a, s, i) ? N.fontMap[n].variant : null;
	},
	It = function (t, r, n) {
		if (t.length === 1) {
			var i = Fe(t[0], r);
			return (
				n &&
					i instanceof Ht &&
					i.type === "mo" &&
					(i.setAttribute("lspace", "0em"), i.setAttribute("rspace", "0em")),
				[i]
			);
		}
		for (var a = [], s, o = 0; o < t.length; o++) {
			var l = Fe(t[o], r);
			if (l instanceof Ht && s instanceof Ht) {
				if (
					l.type === "mtext" &&
					s.type === "mtext" &&
					l.getAttribute("mathvariant") === s.getAttribute("mathvariant")
				) {
					s.children.push(...l.children);
					continue;
				} else if (l.type === "mn" && s.type === "mn") {
					s.children.push(...l.children);
					continue;
				} else if (
					l.type === "mi" &&
					l.children.length === 1 &&
					s.type === "mn"
				) {
					var c = l.children[0];
					if (c instanceof Ma && c.text === ".") {
						s.children.push(...l.children);
						continue;
					}
				} else if (s.type === "mi" && s.children.length === 1) {
					var u = s.children[0];
					if (
						u instanceof Ma &&
						u.text === "̸" &&
						(l.type === "mo" || l.type === "mi" || l.type === "mn")
					) {
						var d = l.children[0];
						d instanceof Ma &&
							d.text.length > 0 &&
							((d.text = d.text.slice(0, 1) + "̸" + d.text.slice(1)), a.pop());
					}
				}
			}
			a.push(l), (s = l);
		}
		return a;
	},
	En = function (t, r, n) {
		return xu(It(t, r, n));
	},
	Fe = function (t, r) {
		if (!t) return new X.MathNode("mrow");
		if (To[t.type]) {
			var n = To[t.type](t, r);
			return n;
		} else throw new Z("Got group of unknown type: '" + t.type + "'");
	};
function rh(e, t, r, n, i) {
	var a = It(e, r),
		s;
	a.length === 1 &&
	a[0] instanceof Ht &&
	_e.contains(["mrow", "mtable"], a[0].type)
		? (s = a[0])
		: (s = new X.MathNode("mrow", a));
	var o = new X.MathNode("annotation", [new X.TextNode(t)]);
	o.setAttribute("encoding", "application/x-tex");
	var l = new X.MathNode("semantics", [s, o]),
		c = new X.MathNode("math", [l]);
	c.setAttribute("xmlns", "http://www.w3.org/1998/Math/MathML"),
		n && c.setAttribute("display", "block");
	var u = i ? "katex" : "katex-mathml";
	return N.makeSpan([u], [c]);
}
var b4 = function (t) {
		return new kr({
			style: t.displayMode ? be.DISPLAY : be.TEXT,
			maxSize: t.maxSize,
			minRuleThickness: t.minRuleThickness,
		});
	},
	v4 = function (t, r) {
		if (r.displayMode) {
			var n = ["katex-display"];
			r.leqno && n.push("leqno"),
				r.fleqn && n.push("fleqn"),
				(t = N.makeSpan(n, [t]));
		}
		return t;
	},
	Zv = function (t, r, n) {
		var i = b4(n),
			a;
		if (n.output === "mathml") return rh(t, r, i, n.displayMode, !0);
		if (n.output === "html") {
			var s = nc(t, i);
			a = N.makeSpan(["katex"], [s]);
		} else {
			var o = rh(t, r, i, n.displayMode, !1),
				l = nc(t, i);
			a = N.makeSpan(["katex"], [o, l]);
		}
		return v4(a, n);
	},
	Qv = function (t, r, n) {
		var i = b4(n),
			a = nc(t, i),
			s = N.makeSpan(["katex"], [a]);
		return v4(s, n);
	},
	e9 = {
		widehat: "^",
		widecheck: "ˇ",
		widetilde: "~",
		utilde: "~",
		overleftarrow: "←",
		underleftarrow: "←",
		xleftarrow: "←",
		overrightarrow: "→",
		underrightarrow: "→",
		xrightarrow: "→",
		underbrace: "⏟",
		overbrace: "⏞",
		overgroup: "⏠",
		undergroup: "⏡",
		overleftrightarrow: "↔",
		underleftrightarrow: "↔",
		xleftrightarrow: "↔",
		Overrightarrow: "⇒",
		xRightarrow: "⇒",
		overleftharpoon: "↼",
		xleftharpoonup: "↼",
		overrightharpoon: "⇀",
		xrightharpoonup: "⇀",
		xLeftarrow: "⇐",
		xLeftrightarrow: "⇔",
		xhookleftarrow: "↩",
		xhookrightarrow: "↪",
		xmapsto: "↦",
		xrightharpoondown: "⇁",
		xleftharpoondown: "↽",
		xrightleftharpoons: "⇌",
		xleftrightharpoons: "⇋",
		xtwoheadleftarrow: "↞",
		xtwoheadrightarrow: "↠",
		xlongequal: "=",
		xtofrom: "⇄",
		xrightleftarrows: "⇄",
		xrightequilibrium: "⇌",
		xleftequilibrium: "⇋",
		"\\cdrightarrow": "→",
		"\\cdleftarrow": "←",
		"\\cdlongequal": "=",
	},
	t9 = function (t) {
		var r = new X.MathNode("mo", [new X.TextNode(e9[t.replace(/^\\/, "")])]);
		return r.setAttribute("stretchy", "true"), r;
	},
	r9 = {
		overrightarrow: [["rightarrow"], 0.888, 522, "xMaxYMin"],
		overleftarrow: [["leftarrow"], 0.888, 522, "xMinYMin"],
		underrightarrow: [["rightarrow"], 0.888, 522, "xMaxYMin"],
		underleftarrow: [["leftarrow"], 0.888, 522, "xMinYMin"],
		xrightarrow: [["rightarrow"], 1.469, 522, "xMaxYMin"],
		"\\cdrightarrow": [["rightarrow"], 3, 522, "xMaxYMin"],
		xleftarrow: [["leftarrow"], 1.469, 522, "xMinYMin"],
		"\\cdleftarrow": [["leftarrow"], 3, 522, "xMinYMin"],
		Overrightarrow: [["doublerightarrow"], 0.888, 560, "xMaxYMin"],
		xRightarrow: [["doublerightarrow"], 1.526, 560, "xMaxYMin"],
		xLeftarrow: [["doubleleftarrow"], 1.526, 560, "xMinYMin"],
		overleftharpoon: [["leftharpoon"], 0.888, 522, "xMinYMin"],
		xleftharpoonup: [["leftharpoon"], 0.888, 522, "xMinYMin"],
		xleftharpoondown: [["leftharpoondown"], 0.888, 522, "xMinYMin"],
		overrightharpoon: [["rightharpoon"], 0.888, 522, "xMaxYMin"],
		xrightharpoonup: [["rightharpoon"], 0.888, 522, "xMaxYMin"],
		xrightharpoondown: [["rightharpoondown"], 0.888, 522, "xMaxYMin"],
		xlongequal: [["longequal"], 0.888, 334, "xMinYMin"],
		"\\cdlongequal": [["longequal"], 3, 334, "xMinYMin"],
		xtwoheadleftarrow: [["twoheadleftarrow"], 0.888, 334, "xMinYMin"],
		xtwoheadrightarrow: [["twoheadrightarrow"], 0.888, 334, "xMaxYMin"],
		overleftrightarrow: [["leftarrow", "rightarrow"], 0.888, 522],
		overbrace: [["leftbrace", "midbrace", "rightbrace"], 1.6, 548],
		underbrace: [
			["leftbraceunder", "midbraceunder", "rightbraceunder"],
			1.6,
			548,
		],
		underleftrightarrow: [["leftarrow", "rightarrow"], 0.888, 522],
		xleftrightarrow: [["leftarrow", "rightarrow"], 1.75, 522],
		xLeftrightarrow: [["doubleleftarrow", "doublerightarrow"], 1.75, 560],
		xrightleftharpoons: [
			["leftharpoondownplus", "rightharpoonplus"],
			1.75,
			716,
		],
		xleftrightharpoons: [
			["leftharpoonplus", "rightharpoondownplus"],
			1.75,
			716,
		],
		xhookleftarrow: [["leftarrow", "righthook"], 1.08, 522],
		xhookrightarrow: [["lefthook", "rightarrow"], 1.08, 522],
		overlinesegment: [["leftlinesegment", "rightlinesegment"], 0.888, 522],
		underlinesegment: [["leftlinesegment", "rightlinesegment"], 0.888, 522],
		overgroup: [["leftgroup", "rightgroup"], 0.888, 342],
		undergroup: [["leftgroupunder", "rightgroupunder"], 0.888, 342],
		xmapsto: [["leftmapsto", "rightarrow"], 1.5, 522],
		xtofrom: [["leftToFrom", "rightToFrom"], 1.75, 528],
		xrightleftarrows: [["baraboveleftarrow", "rightarrowabovebar"], 1.75, 901],
		xrightequilibrium: [
			["baraboveshortleftharpoon", "rightharpoonaboveshortbar"],
			1.75,
			716,
		],
		xleftequilibrium: [
			["shortbaraboveleftharpoon", "shortrightharpoonabovebar"],
			1.75,
			716,
		],
	},
	n9 = function (t) {
		return t.type === "ordgroup" ? t.body.length : 1;
	},
	i9 = function (t, r) {
		function n() {
			var o = 4e5,
				l = t.label.slice(1);
			if (_e.contains(["widehat", "widecheck", "widetilde", "utilde"], l)) {
				var c = t,
					u = n9(c.base),
					d,
					p,
					m;
				if (u > 5)
					l === "widehat" || l === "widecheck"
						? ((d = 420), (o = 2364), (m = 0.42), (p = l + "4"))
						: ((d = 312), (o = 2340), (m = 0.34), (p = "tilde4"));
				else {
					var b = [1, 1, 2, 2, 3, 3][u];
					l === "widehat" || l === "widecheck"
						? ((o = [0, 1062, 2364, 2364, 2364][b]),
						  (d = [0, 239, 300, 360, 420][b]),
						  (m = [0, 0.24, 0.3, 0.3, 0.36, 0.42][b]),
						  (p = l + b))
						: ((o = [0, 600, 1033, 2339, 2340][b]),
						  (d = [0, 260, 286, 306, 312][b]),
						  (m = [0, 0.26, 0.286, 0.3, 0.306, 0.34][b]),
						  (p = "tilde" + b));
				}
				var E = new Sn(p),
					R = new Dr([E], {
						width: "100%",
						height: re(m),
						viewBox: "0 0 " + o + " " + d,
						preserveAspectRatio: "none",
					});
				return { span: N.makeSvgSpan([], [R], r), minWidth: 0, height: m };
			} else {
				var _ = [],
					v = r9[l],
					[T, M, O] = v,
					B = O / 1e3,
					z = T.length,
					D,
					H;
				if (z === 1) {
					var Q = v[3];
					(D = ["hide-tail"]), (H = [Q]);
				} else if (z === 2)
					(D = ["halfarrow-left", "halfarrow-right"]),
						(H = ["xMinYMin", "xMaxYMin"]);
				else if (z === 3)
					(D = ["brace-left", "brace-center", "brace-right"]),
						(H = ["xMinYMin", "xMidYMin", "xMaxYMin"]);
				else
					throw new Error(
						`Correct katexImagesData or update code here to support
                    ` +
							z +
							" children."
					);
				for (var te = 0; te < z; te++) {
					var q = new Sn(T[te]),
						oe = new Dr([q], {
							width: "400em",
							height: re(B),
							viewBox: "0 0 " + o + " " + O,
							preserveAspectRatio: H[te] + " slice",
						}),
						W = N.makeSvgSpan([D[te]], [oe], r);
					if (z === 1) return { span: W, minWidth: M, height: B };
					(W.style.height = re(B)), _.push(W);
				}
				return { span: N.makeSpan(["stretchy"], _, r), minWidth: M, height: B };
			}
		}
		var { span: i, minWidth: a, height: s } = n();
		return (
			(i.height = s),
			(i.style.height = re(s)),
			a > 0 && (i.style.minWidth = re(a)),
			i
		);
	},
	a9 = function (t, r, n, i, a) {
		var s,
			o = t.height + t.depth + n + i;
		if (/fbox|color|angl/.test(r)) {
			if (((s = N.makeSpan(["stretchy", r], [], a)), r === "fbox")) {
				var l = a.color && a.getColor();
				l && (s.style.borderColor = l);
			}
		} else {
			var c = [];
			/^[bx]cancel$/.test(r) &&
				c.push(
					new ec({
						x1: "0",
						y1: "0",
						x2: "100%",
						y2: "100%",
						"stroke-width": "0.046em",
					})
				),
				/^x?cancel$/.test(r) &&
					c.push(
						new ec({
							x1: "0",
							y1: "100%",
							x2: "100%",
							y2: "0",
							"stroke-width": "0.046em",
						})
					);
			var u = new Dr(c, { width: "100%", height: re(o) });
			s = N.makeSvgSpan([], [u], a);
		}
		return (s.height = o), (s.style.height = re(o)), s;
	},
	Pr = { encloseSpan: a9, mathMLnode: t9, svgSpan: i9 };
function ke(e, t) {
	if (!e || e.type !== t)
		throw new Error(
			"Expected node of type " +
				t +
				", but got " +
				(e ? "node of type " + e.type : String(e))
		);
	return e;
}
function ku(e) {
	var t = r0(e);
	if (!t)
		throw new Error(
			"Expected node of symbol group type, but got " +
				(e ? "node of type " + e.type : String(e))
		);
	return t;
}
function r0(e) {
	return e && (e.type === "atom" || Ov.hasOwnProperty(e.type)) ? e : null;
}
var Au = (e, t) => {
		var r, n, i;
		e && e.type === "supsub"
			? ((n = ke(e.base, "accent")),
			  (r = n.base),
			  (e.base = r),
			  (i = Rv(Be(e, t))),
			  (e.base = n))
			: ((n = ke(e, "accent")), (r = n.base));
		var a = Be(r, t.havingCrampedStyle()),
			s = n.isShifty && _e.isCharacterBox(r),
			o = 0;
		if (s) {
			var l = _e.getBaseElem(r),
				c = Be(l, t.havingCrampedStyle());
			o = Kd(c).skew;
		}
		var u = n.label === "\\c",
			d = u ? a.height + a.depth : Math.min(a.height, t.fontMetrics().xHeight),
			p;
		if (n.isStretchy)
			(p = Pr.svgSpan(n, t)),
				(p = N.makeVList(
					{
						positionType: "firstBaseline",
						children: [
							{ type: "elem", elem: a },
							{
								type: "elem",
								elem: p,
								wrapperClasses: ["svg-align"],
								wrapperStyle:
									o > 0
										? {
												width: "calc(100% - " + re(2 * o) + ")",
												marginLeft: re(2 * o),
										  }
										: void 0,
							},
						],
					},
					t
				));
		else {
			var m, b;
			n.label === "\\vec"
				? ((m = N.staticSvg("vec", t)), (b = N.svgData.vec[1]))
				: ((m = N.makeOrd({ mode: n.mode, text: n.label }, t, "textord")),
				  (m = Kd(m)),
				  (m.italic = 0),
				  (b = m.width),
				  u && (d += m.depth)),
				(p = N.makeSpan(["accent-body"], [m]));
			var E = n.label === "\\textcircled";
			E && (p.classes.push("accent-full"), (d = a.height));
			var R = o;
			E || (R -= b / 2),
				(p.style.left = re(R)),
				n.label === "\\textcircled" && (p.style.top = ".2em"),
				(p = N.makeVList(
					{
						positionType: "firstBaseline",
						children: [
							{ type: "elem", elem: a },
							{ type: "kern", size: -d },
							{ type: "elem", elem: p },
						],
					},
					t
				));
		}
		var _ = N.makeSpan(["mord", "accent"], [p], t);
		return i
			? ((i.children[0] = _),
			  (i.height = Math.max(_.height, i.height)),
			  (i.classes[0] = "mord"),
			  i)
			: _;
	},
	_4 = (e, t) => {
		var r = e.isStretchy
				? Pr.mathMLnode(e.label)
				: new X.MathNode("mo", [Vt(e.label, e.mode)]),
			n = new X.MathNode("mover", [Fe(e.base, t), r]);
		return n.setAttribute("accent", "true"), n;
	},
	s9 = new RegExp(
		[
			"\\acute",
			"\\grave",
			"\\ddot",
			"\\tilde",
			"\\bar",
			"\\breve",
			"\\check",
			"\\hat",
			"\\vec",
			"\\dot",
			"\\mathring",
		]
			.map((e) => "\\" + e)
			.join("|")
	);
le({
	type: "accent",
	names: [
		"\\acute",
		"\\grave",
		"\\ddot",
		"\\tilde",
		"\\bar",
		"\\breve",
		"\\check",
		"\\hat",
		"\\vec",
		"\\dot",
		"\\mathring",
		"\\widecheck",
		"\\widehat",
		"\\widetilde",
		"\\overrightarrow",
		"\\overleftarrow",
		"\\Overrightarrow",
		"\\overleftrightarrow",
		"\\overgroup",
		"\\overlinesegment",
		"\\overleftharpoon",
		"\\overrightharpoon",
	],
	props: { numArgs: 1 },
	handler: (e, t) => {
		var r = ko(t[0]),
			n = !s9.test(e.funcName),
			i =
				!n ||
				e.funcName === "\\widehat" ||
				e.funcName === "\\widetilde" ||
				e.funcName === "\\widecheck";
		return {
			type: "accent",
			mode: e.parser.mode,
			label: e.funcName,
			isStretchy: n,
			isShifty: i,
			base: r,
		};
	},
	htmlBuilder: Au,
	mathmlBuilder: _4,
});
le({
	type: "accent",
	names: [
		"\\'",
		"\\`",
		"\\^",
		"\\~",
		"\\=",
		"\\u",
		"\\.",
		'\\"',
		"\\c",
		"\\r",
		"\\H",
		"\\v",
		"\\textcircled",
	],
	props: {
		numArgs: 1,
		allowedInText: !0,
		allowedInMath: !0,
		argTypes: ["primitive"],
	},
	handler: (e, t) => {
		var r = t[0],
			n = e.parser.mode;
		return (
			n === "math" &&
				(e.parser.settings.reportNonstrict(
					"mathVsTextAccents",
					"LaTeX's accent " + e.funcName + " works only in text mode"
				),
				(n = "text")),
			{
				type: "accent",
				mode: n,
				label: e.funcName,
				isStretchy: !1,
				isShifty: !0,
				base: r,
			}
		);
	},
	htmlBuilder: Au,
	mathmlBuilder: _4,
});
le({
	type: "accentUnder",
	names: [
		"\\underleftarrow",
		"\\underrightarrow",
		"\\underleftrightarrow",
		"\\undergroup",
		"\\underlinesegment",
		"\\utilde",
	],
	props: { numArgs: 1 },
	handler: (e, t) => {
		var { parser: r, funcName: n } = e,
			i = t[0];
		return { type: "accentUnder", mode: r.mode, label: n, base: i };
	},
	htmlBuilder: (e, t) => {
		var r = Be(e.base, t),
			n = Pr.svgSpan(e, t),
			i = e.label === "\\utilde" ? 0.12 : 0,
			a = N.makeVList(
				{
					positionType: "top",
					positionData: r.height,
					children: [
						{ type: "elem", elem: n, wrapperClasses: ["svg-align"] },
						{ type: "kern", size: i },
						{ type: "elem", elem: r },
					],
				},
				t
			);
		return N.makeSpan(["mord", "accentunder"], [a], t);
	},
	mathmlBuilder: (e, t) => {
		var r = Pr.mathMLnode(e.label),
			n = new X.MathNode("munder", [Fe(e.base, t), r]);
		return n.setAttribute("accentunder", "true"), n;
	},
});
var $s = (e) => {
	var t = new X.MathNode("mpadded", e ? [e] : []);
	return (
		t.setAttribute("width", "+0.6em"), t.setAttribute("lspace", "0.3em"), t
	);
};
le({
	type: "xArrow",
	names: [
		"\\xleftarrow",
		"\\xrightarrow",
		"\\xLeftarrow",
		"\\xRightarrow",
		"\\xleftrightarrow",
		"\\xLeftrightarrow",
		"\\xhookleftarrow",
		"\\xhookrightarrow",
		"\\xmapsto",
		"\\xrightharpoondown",
		"\\xrightharpoonup",
		"\\xleftharpoondown",
		"\\xleftharpoonup",
		"\\xrightleftharpoons",
		"\\xleftrightharpoons",
		"\\xlongequal",
		"\\xtwoheadrightarrow",
		"\\xtwoheadleftarrow",
		"\\xtofrom",
		"\\xrightleftarrows",
		"\\xrightequilibrium",
		"\\xleftequilibrium",
		"\\\\cdrightarrow",
		"\\\\cdleftarrow",
		"\\\\cdlongequal",
	],
	props: { numArgs: 1, numOptionalArgs: 1 },
	handler(e, t, r) {
		var { parser: n, funcName: i } = e;
		return { type: "xArrow", mode: n.mode, label: i, body: t[0], below: r[0] };
	},
	htmlBuilder(e, t) {
		var r = t.style,
			n = t.havingStyle(r.sup()),
			i = N.wrapFragment(Be(e.body, n, t), t),
			a = e.label.slice(0, 2) === "\\x" ? "x" : "cd";
		i.classes.push(a + "-arrow-pad");
		var s;
		e.below &&
			((n = t.havingStyle(r.sub())),
			(s = N.wrapFragment(Be(e.below, n, t), t)),
			s.classes.push(a + "-arrow-pad"));
		var o = Pr.svgSpan(e, t),
			l = -t.fontMetrics().axisHeight + 0.5 * o.height,
			c = -t.fontMetrics().axisHeight - 0.5 * o.height - 0.111;
		(i.depth > 0.25 || e.label === "\\xleftequilibrium") && (c -= i.depth);
		var u;
		if (s) {
			var d = -t.fontMetrics().axisHeight + s.height + 0.5 * o.height + 0.111;
			u = N.makeVList(
				{
					positionType: "individualShift",
					children: [
						{ type: "elem", elem: i, shift: c },
						{ type: "elem", elem: o, shift: l },
						{ type: "elem", elem: s, shift: d },
					],
				},
				t
			);
		} else
			u = N.makeVList(
				{
					positionType: "individualShift",
					children: [
						{ type: "elem", elem: i, shift: c },
						{ type: "elem", elem: o, shift: l },
					],
				},
				t
			);
		return (
			u.children[0].children[0].children[1].classes.push("svg-align"),
			N.makeSpan(["mrel", "x-arrow"], [u], t)
		);
	},
	mathmlBuilder(e, t) {
		var r = Pr.mathMLnode(e.label);
		r.setAttribute("minsize", e.label.charAt(0) === "x" ? "1.75em" : "3.0em");
		var n;
		if (e.body) {
			var i = $s(Fe(e.body, t));
			if (e.below) {
				var a = $s(Fe(e.below, t));
				n = new X.MathNode("munderover", [r, a, i]);
			} else n = new X.MathNode("mover", [r, i]);
		} else if (e.below) {
			var s = $s(Fe(e.below, t));
			n = new X.MathNode("munder", [r, s]);
		} else (n = $s()), (n = new X.MathNode("mover", [r, n]));
		return n;
	},
});
var o9 = N.makeSpan;
function w4(e, t) {
	var r = ot(e.body, t, !0);
	return o9([e.mclass], r, t);
}
function S4(e, t) {
	var r,
		n = It(e.body, t);
	return (
		e.mclass === "minner"
			? (r = new X.MathNode("mpadded", n))
			: e.mclass === "mord"
			? e.isCharacterBox
				? ((r = n[0]), (r.type = "mi"))
				: (r = new X.MathNode("mi", n))
			: (e.isCharacterBox
					? ((r = n[0]), (r.type = "mo"))
					: (r = new X.MathNode("mo", n)),
			  e.mclass === "mbin"
					? ((r.attributes.lspace = "0.22em"), (r.attributes.rspace = "0.22em"))
					: e.mclass === "mpunct"
					? ((r.attributes.lspace = "0em"), (r.attributes.rspace = "0.17em"))
					: e.mclass === "mopen" || e.mclass === "mclose"
					? ((r.attributes.lspace = "0em"), (r.attributes.rspace = "0em"))
					: e.mclass === "minner" &&
					  ((r.attributes.lspace = "0.0556em"),
					  (r.attributes.width = "+0.1111em"))),
		r
	);
}
le({
	type: "mclass",
	names: [
		"\\mathord",
		"\\mathbin",
		"\\mathrel",
		"\\mathopen",
		"\\mathclose",
		"\\mathpunct",
		"\\mathinner",
	],
	props: { numArgs: 1, primitive: !0 },
	handler(e, t) {
		var { parser: r, funcName: n } = e,
			i = t[0];
		return {
			type: "mclass",
			mode: r.mode,
			mclass: "m" + n.slice(5),
			body: nt(i),
			isCharacterBox: _e.isCharacterBox(i),
		};
	},
	htmlBuilder: w4,
	mathmlBuilder: S4,
});
var n0 = (e) => {
	var t = e.type === "ordgroup" && e.body.length ? e.body[0] : e;
	return t.type === "atom" && (t.family === "bin" || t.family === "rel")
		? "m" + t.family
		: "mord";
};
le({
	type: "mclass",
	names: ["\\@binrel"],
	props: { numArgs: 2 },
	handler(e, t) {
		var { parser: r } = e;
		return {
			type: "mclass",
			mode: r.mode,
			mclass: n0(t[0]),
			body: nt(t[1]),
			isCharacterBox: _e.isCharacterBox(t[1]),
		};
	},
});
le({
	type: "mclass",
	names: ["\\stackrel", "\\overset", "\\underset"],
	props: { numArgs: 2 },
	handler(e, t) {
		var { parser: r, funcName: n } = e,
			i = t[1],
			a = t[0],
			s;
		n !== "\\stackrel" ? (s = n0(i)) : (s = "mrel");
		var o = {
				type: "op",
				mode: i.mode,
				limits: !0,
				alwaysHandleSupSub: !0,
				parentIsSupSub: !1,
				symbol: !1,
				suppressBaseShift: n !== "\\stackrel",
				body: nt(i),
			},
			l = {
				type: "supsub",
				mode: a.mode,
				base: o,
				sup: n === "\\underset" ? null : a,
				sub: n === "\\underset" ? a : null,
			};
		return {
			type: "mclass",
			mode: r.mode,
			mclass: s,
			body: [l],
			isCharacterBox: _e.isCharacterBox(l),
		};
	},
	htmlBuilder: w4,
	mathmlBuilder: S4,
});
le({
	type: "pmb",
	names: ["\\pmb"],
	props: { numArgs: 1, allowedInText: !0 },
	handler(e, t) {
		var { parser: r } = e;
		return { type: "pmb", mode: r.mode, mclass: n0(t[0]), body: nt(t[0]) };
	},
	htmlBuilder(e, t) {
		var r = ot(e.body, t, !0),
			n = N.makeSpan([e.mclass], r, t);
		return (n.style.textShadow = "0.02em 0.01em 0.04px"), n;
	},
	mathmlBuilder(e, t) {
		var r = It(e.body, t),
			n = new X.MathNode("mstyle", r);
		return n.setAttribute("style", "text-shadow: 0.02em 0.01em 0.04px"), n;
	},
});
var l9 = {
		">": "\\\\cdrightarrow",
		"<": "\\\\cdleftarrow",
		"=": "\\\\cdlongequal",
		A: "\\uparrow",
		V: "\\downarrow",
		"|": "\\Vert",
		".": "no arrow",
	},
	nh = () => ({ type: "styling", body: [], mode: "math", style: "display" }),
	ih = (e) => e.type === "textord" && e.text === "@",
	c9 = (e, t) => (e.type === "mathord" || e.type === "atom") && e.text === t;
function u9(e, t, r) {
	var n = l9[e];
	switch (n) {
		case "\\\\cdrightarrow":
		case "\\\\cdleftarrow":
			return r.callFunction(n, [t[0]], [t[1]]);
		case "\\uparrow":
		case "\\downarrow": {
			var i = r.callFunction("\\\\cdleft", [t[0]], []),
				a = { type: "atom", text: n, mode: "math", family: "rel" },
				s = r.callFunction("\\Big", [a], []),
				o = r.callFunction("\\\\cdright", [t[1]], []),
				l = { type: "ordgroup", mode: "math", body: [i, s, o] };
			return r.callFunction("\\\\cdparent", [l], []);
		}
		case "\\\\cdlongequal":
			return r.callFunction("\\\\cdlongequal", [], []);
		case "\\Vert": {
			var c = { type: "textord", text: "\\Vert", mode: "math" };
			return r.callFunction("\\Big", [c], []);
		}
		default:
			return { type: "textord", text: " ", mode: "math" };
	}
}
function f9(e) {
	var t = [];
	for (
		e.gullet.beginGroup(),
			e.gullet.macros.set("\\cr", "\\\\\\relax"),
			e.gullet.beginGroup();
		;

	) {
		t.push(e.parseExpression(!1, "\\\\")),
			e.gullet.endGroup(),
			e.gullet.beginGroup();
		var r = e.fetch().text;
		if (r === "&" || r === "\\\\") e.consume();
		else if (r === "\\end") {
			t[t.length - 1].length === 0 && t.pop();
			break;
		} else throw new Z("Expected \\\\ or \\cr or \\end", e.nextToken);
	}
	for (var n = [], i = [n], a = 0; a < t.length; a++) {
		for (var s = t[a], o = nh(), l = 0; l < s.length; l++)
			if (!ih(s[l])) o.body.push(s[l]);
			else {
				n.push(o), (l += 1);
				var c = ku(s[l]).text,
					u = new Array(2);
				if (
					((u[0] = { type: "ordgroup", mode: "math", body: [] }),
					(u[1] = { type: "ordgroup", mode: "math", body: [] }),
					!("=|.".indexOf(c) > -1))
				)
					if ("<>AV".indexOf(c) > -1)
						for (var d = 0; d < 2; d++) {
							for (var p = !0, m = l + 1; m < s.length; m++) {
								if (c9(s[m], c)) {
									(p = !1), (l = m);
									break;
								}
								if (ih(s[m]))
									throw new Z(
										"Missing a " + c + " character to complete a CD arrow.",
										s[m]
									);
								u[d].body.push(s[m]);
							}
							if (p)
								throw new Z(
									"Missing a " + c + " character to complete a CD arrow.",
									s[l]
								);
						}
					else throw new Z('Expected one of "<>AV=|." after @', s[l]);
				var b = u9(c, u, e),
					E = { type: "styling", body: [b], mode: "math", style: "display" };
				n.push(E), (o = nh());
			}
		a % 2 === 0 ? n.push(o) : n.shift(), (n = []), i.push(n);
	}
	e.gullet.endGroup(), e.gullet.endGroup();
	var R = new Array(i[0].length).fill({
		type: "align",
		align: "c",
		pregap: 0.25,
		postgap: 0.25,
	});
	return {
		type: "array",
		mode: "math",
		body: i,
		arraystretch: 1,
		addJot: !0,
		rowGaps: [null],
		cols: R,
		colSeparationType: "CD",
		hLinesBeforeRow: new Array(i.length + 1).fill([]),
	};
}
le({
	type: "cdlabel",
	names: ["\\\\cdleft", "\\\\cdright"],
	props: { numArgs: 1 },
	handler(e, t) {
		var { parser: r, funcName: n } = e;
		return { type: "cdlabel", mode: r.mode, side: n.slice(4), label: t[0] };
	},
	htmlBuilder(e, t) {
		var r = t.havingStyle(t.style.sup()),
			n = N.wrapFragment(Be(e.label, r, t), t);
		return (
			n.classes.push("cd-label-" + e.side),
			(n.style.bottom = re(0.8 - n.depth)),
			(n.height = 0),
			(n.depth = 0),
			n
		);
	},
	mathmlBuilder(e, t) {
		var r = new X.MathNode("mrow", [Fe(e.label, t)]);
		return (
			(r = new X.MathNode("mpadded", [r])),
			r.setAttribute("width", "0"),
			e.side === "left" && r.setAttribute("lspace", "-1width"),
			r.setAttribute("voffset", "0.7em"),
			(r = new X.MathNode("mstyle", [r])),
			r.setAttribute("displaystyle", "false"),
			r.setAttribute("scriptlevel", "1"),
			r
		);
	},
});
le({
	type: "cdlabelparent",
	names: ["\\\\cdparent"],
	props: { numArgs: 1 },
	handler(e, t) {
		var { parser: r } = e;
		return { type: "cdlabelparent", mode: r.mode, fragment: t[0] };
	},
	htmlBuilder(e, t) {
		var r = N.wrapFragment(Be(e.fragment, t), t);
		return r.classes.push("cd-vert-arrow"), r;
	},
	mathmlBuilder(e, t) {
		return new X.MathNode("mrow", [Fe(e.fragment, t)]);
	},
});
le({
	type: "textord",
	names: ["\\@char"],
	props: { numArgs: 1, allowedInText: !0 },
	handler(e, t) {
		for (
			var { parser: r } = e,
				n = ke(t[0], "ordgroup"),
				i = n.body,
				a = "",
				s = 0;
			s < i.length;
			s++
		) {
			var o = ke(i[s], "textord");
			a += o.text;
		}
		var l = parseInt(a),
			c;
		if (isNaN(l)) throw new Z("\\@char has non-numeric argument " + a);
		if (l < 0 || l >= 1114111)
			throw new Z("\\@char with invalid code point " + a);
		return (
			l <= 65535
				? (c = String.fromCharCode(l))
				: ((l -= 65536),
				  (c = String.fromCharCode((l >> 10) + 55296, (l & 1023) + 56320))),
			{ type: "textord", mode: r.mode, text: c }
		);
	},
});
var E4 = (e, t) => {
		var r = ot(e.body, t.withColor(e.color), !1);
		return N.makeFragment(r);
	},
	x4 = (e, t) => {
		var r = It(e.body, t.withColor(e.color)),
			n = new X.MathNode("mstyle", r);
		return n.setAttribute("mathcolor", e.color), n;
	};
le({
	type: "color",
	names: ["\\textcolor"],
	props: { numArgs: 2, allowedInText: !0, argTypes: ["color", "original"] },
	handler(e, t) {
		var { parser: r } = e,
			n = ke(t[0], "color-token").color,
			i = t[1];
		return { type: "color", mode: r.mode, color: n, body: nt(i) };
	},
	htmlBuilder: E4,
	mathmlBuilder: x4,
});
le({
	type: "color",
	names: ["\\color"],
	props: { numArgs: 1, allowedInText: !0, argTypes: ["color"] },
	handler(e, t) {
		var { parser: r, breakOnTokenText: n } = e,
			i = ke(t[0], "color-token").color;
		r.gullet.macros.set("\\current@color", i);
		var a = r.parseExpression(!0, n);
		return { type: "color", mode: r.mode, color: i, body: a };
	},
	htmlBuilder: E4,
	mathmlBuilder: x4,
});
le({
	type: "cr",
	names: ["\\\\"],
	props: { numArgs: 0, numOptionalArgs: 0, allowedInText: !0 },
	handler(e, t, r) {
		var { parser: n } = e,
			i = n.gullet.future().text === "[" ? n.parseSizeGroup(!0) : null,
			a =
				!n.settings.displayMode ||
				!n.settings.useStrictBehavior(
					"newLineInDisplayMode",
					"In LaTeX, \\\\ or \\newline does nothing in display mode"
				);
		return {
			type: "cr",
			mode: n.mode,
			newLine: a,
			size: i && ke(i, "size").value,
		};
	},
	htmlBuilder(e, t) {
		var r = N.makeSpan(["mspace"], [], t);
		return (
			e.newLine &&
				(r.classes.push("newline"),
				e.size && (r.style.marginTop = re(Xe(e.size, t)))),
			r
		);
	},
	mathmlBuilder(e, t) {
		var r = new X.MathNode("mspace");
		return (
			e.newLine &&
				(r.setAttribute("linebreak", "newline"),
				e.size && r.setAttribute("height", re(Xe(e.size, t)))),
			r
		);
	},
});
var ic = {
		"\\global": "\\global",
		"\\long": "\\\\globallong",
		"\\\\globallong": "\\\\globallong",
		"\\def": "\\gdef",
		"\\gdef": "\\gdef",
		"\\edef": "\\xdef",
		"\\xdef": "\\xdef",
		"\\let": "\\\\globallet",
		"\\futurelet": "\\\\globalfuture",
	},
	T4 = (e) => {
		var t = e.text;
		if (/^(?:[\\{}$&#^_]|EOF)$/.test(t))
			throw new Z("Expected a control sequence", e);
		return t;
	},
	d9 = (e) => {
		var t = e.gullet.popToken();
		return (
			t.text === "=" &&
				((t = e.gullet.popToken()),
				t.text === " " && (t = e.gullet.popToken())),
			t
		);
	},
	k4 = (e, t, r, n) => {
		var i = e.gullet.macros.get(r.text);
		i == null &&
			((r.noexpand = !0),
			(i = {
				tokens: [r],
				numArgs: 0,
				unexpandable: !e.gullet.isExpandable(r.text),
			})),
			e.gullet.macros.set(t, i, n);
	};
le({
	type: "internal",
	names: ["\\global", "\\long", "\\\\globallong"],
	props: { numArgs: 0, allowedInText: !0 },
	handler(e) {
		var { parser: t, funcName: r } = e;
		t.consumeSpaces();
		var n = t.fetch();
		if (ic[n.text])
			return (
				(r === "\\global" || r === "\\\\globallong") && (n.text = ic[n.text]),
				ke(t.parseFunction(), "internal")
			);
		throw new Z("Invalid token after macro prefix", n);
	},
});
le({
	type: "internal",
	names: ["\\def", "\\gdef", "\\edef", "\\xdef"],
	props: { numArgs: 0, allowedInText: !0, primitive: !0 },
	handler(e) {
		var { parser: t, funcName: r } = e,
			n = t.gullet.popToken(),
			i = n.text;
		if (/^(?:[\\{}$&#^_]|EOF)$/.test(i))
			throw new Z("Expected a control sequence", n);
		for (var a = 0, s, o = [[]]; t.gullet.future().text !== "{"; )
			if (((n = t.gullet.popToken()), n.text === "#")) {
				if (t.gullet.future().text === "{") {
					(s = t.gullet.future()), o[a].push("{");
					break;
				}
				if (((n = t.gullet.popToken()), !/^[1-9]$/.test(n.text)))
					throw new Z('Invalid argument number "' + n.text + '"');
				if (parseInt(n.text) !== a + 1)
					throw new Z('Argument number "' + n.text + '" out of order');
				a++, o.push([]);
			} else {
				if (n.text === "EOF") throw new Z("Expected a macro definition");
				o[a].push(n.text);
			}
		var { tokens: l } = t.gullet.consumeArg();
		return (
			s && l.unshift(s),
			(r === "\\edef" || r === "\\xdef") &&
				((l = t.gullet.expandTokens(l)), l.reverse()),
			t.gullet.macros.set(
				i,
				{ tokens: l, numArgs: a, delimiters: o },
				r === ic[r]
			),
			{ type: "internal", mode: t.mode }
		);
	},
});
le({
	type: "internal",
	names: ["\\let", "\\\\globallet"],
	props: { numArgs: 0, allowedInText: !0, primitive: !0 },
	handler(e) {
		var { parser: t, funcName: r } = e,
			n = T4(t.gullet.popToken());
		t.gullet.consumeSpaces();
		var i = d9(t);
		return (
			k4(t, n, i, r === "\\\\globallet"), { type: "internal", mode: t.mode }
		);
	},
});
le({
	type: "internal",
	names: ["\\futurelet", "\\\\globalfuture"],
	props: { numArgs: 0, allowedInText: !0, primitive: !0 },
	handler(e) {
		var { parser: t, funcName: r } = e,
			n = T4(t.gullet.popToken()),
			i = t.gullet.popToken(),
			a = t.gullet.popToken();
		return (
			k4(t, n, a, r === "\\\\globalfuture"),
			t.gullet.pushToken(a),
			t.gullet.pushToken(i),
			{ type: "internal", mode: t.mode }
		);
	},
});
var ba = function (t, r, n) {
		var i = Ue.math[t] && Ue.math[t].replace,
			a = wu(i || t, r, n);
		if (!a)
			throw new Error("Unsupported symbol " + t + " and font size " + r + ".");
		return a;
	},
	Ru = function (t, r, n, i) {
		var a = n.havingBaseStyle(r),
			s = N.makeSpan(i.concat(a.sizingClasses(n)), [t], n),
			o = a.sizeMultiplier / n.sizeMultiplier;
		return (
			(s.height *= o), (s.depth *= o), (s.maxFontSize = a.sizeMultiplier), s
		);
	},
	A4 = function (t, r, n) {
		var i = r.havingBaseStyle(n),
			a =
				(1 - r.sizeMultiplier / i.sizeMultiplier) * r.fontMetrics().axisHeight;
		t.classes.push("delimcenter"),
			(t.style.top = re(a)),
			(t.height -= a),
			(t.depth += a);
	},
	h9 = function (t, r, n, i, a, s) {
		var o = N.makeSymbol(t, "Main-Regular", a, i),
			l = Ru(o, r, i, s);
		return n && A4(l, i, r), l;
	},
	p9 = function (t, r, n, i) {
		return N.makeSymbol(t, "Size" + r + "-Regular", n, i);
	},
	R4 = function (t, r, n, i, a, s) {
		var o = p9(t, r, a, i),
			l = Ru(N.makeSpan(["delimsizing", "size" + r], [o], i), be.TEXT, i, s);
		return n && A4(l, i, be.TEXT), l;
	},
	V0 = function (t, r, n) {
		var i;
		r === "Size1-Regular" ? (i = "delim-size1") : (i = "delim-size4");
		var a = N.makeSpan(
			["delimsizinginner", i],
			[N.makeSpan([], [N.makeSymbol(t, r, n)])]
		);
		return { type: "elem", elem: a };
	},
	K0 = function (t, r, n) {
		var i = dr["Size4-Regular"][t.charCodeAt(0)]
				? dr["Size4-Regular"][t.charCodeAt(0)][4]
				: dr["Size1-Regular"][t.charCodeAt(0)][4],
			a = new Sn("inner", _v(t, Math.round(1e3 * r))),
			s = new Dr([a], {
				width: re(i),
				height: re(r),
				style: "width:" + re(i),
				viewBox: "0 0 " + 1e3 * i + " " + Math.round(1e3 * r),
				preserveAspectRatio: "xMinYMin",
			}),
			o = N.makeSvgSpan([], [s], n);
		return (
			(o.height = r),
			(o.style.height = re(r)),
			(o.style.width = re(i)),
			{ type: "elem", elem: o }
		);
	},
	ac = 0.008,
	Fs = { type: "kern", size: -1 * ac },
	m9 = ["|", "\\lvert", "\\rvert", "\\vert"],
	g9 = ["\\|", "\\lVert", "\\rVert", "\\Vert"],
	M4 = function (t, r, n, i, a, s) {
		var o,
			l,
			c,
			u,
			d = "",
			p = 0;
		(o = c = u = t), (l = null);
		var m = "Size1-Regular";
		t === "\\uparrow"
			? (c = u = "⏐")
			: t === "\\Uparrow"
			? (c = u = "‖")
			: t === "\\downarrow"
			? (o = c = "⏐")
			: t === "\\Downarrow"
			? (o = c = "‖")
			: t === "\\updownarrow"
			? ((o = "\\uparrow"), (c = "⏐"), (u = "\\downarrow"))
			: t === "\\Updownarrow"
			? ((o = "\\Uparrow"), (c = "‖"), (u = "\\Downarrow"))
			: _e.contains(m9, t)
			? ((c = "∣"), (d = "vert"), (p = 333))
			: _e.contains(g9, t)
			? ((c = "∥"), (d = "doublevert"), (p = 556))
			: t === "[" || t === "\\lbrack"
			? ((o = "⎡"),
			  (c = "⎢"),
			  (u = "⎣"),
			  (m = "Size4-Regular"),
			  (d = "lbrack"),
			  (p = 667))
			: t === "]" || t === "\\rbrack"
			? ((o = "⎤"),
			  (c = "⎥"),
			  (u = "⎦"),
			  (m = "Size4-Regular"),
			  (d = "rbrack"),
			  (p = 667))
			: t === "\\lfloor" || t === "⌊"
			? ((c = o = "⎢"),
			  (u = "⎣"),
			  (m = "Size4-Regular"),
			  (d = "lfloor"),
			  (p = 667))
			: t === "\\lceil" || t === "⌈"
			? ((o = "⎡"),
			  (c = u = "⎢"),
			  (m = "Size4-Regular"),
			  (d = "lceil"),
			  (p = 667))
			: t === "\\rfloor" || t === "⌋"
			? ((c = o = "⎥"),
			  (u = "⎦"),
			  (m = "Size4-Regular"),
			  (d = "rfloor"),
			  (p = 667))
			: t === "\\rceil" || t === "⌉"
			? ((o = "⎤"),
			  (c = u = "⎥"),
			  (m = "Size4-Regular"),
			  (d = "rceil"),
			  (p = 667))
			: t === "(" || t === "\\lparen"
			? ((o = "⎛"),
			  (c = "⎜"),
			  (u = "⎝"),
			  (m = "Size4-Regular"),
			  (d = "lparen"),
			  (p = 875))
			: t === ")" || t === "\\rparen"
			? ((o = "⎞"),
			  (c = "⎟"),
			  (u = "⎠"),
			  (m = "Size4-Regular"),
			  (d = "rparen"),
			  (p = 875))
			: t === "\\{" || t === "\\lbrace"
			? ((o = "⎧"), (l = "⎨"), (u = "⎩"), (c = "⎪"), (m = "Size4-Regular"))
			: t === "\\}" || t === "\\rbrace"
			? ((o = "⎫"), (l = "⎬"), (u = "⎭"), (c = "⎪"), (m = "Size4-Regular"))
			: t === "\\lgroup" || t === "⟮"
			? ((o = "⎧"), (u = "⎩"), (c = "⎪"), (m = "Size4-Regular"))
			: t === "\\rgroup" || t === "⟯"
			? ((o = "⎫"), (u = "⎭"), (c = "⎪"), (m = "Size4-Regular"))
			: t === "\\lmoustache" || t === "⎰"
			? ((o = "⎧"), (u = "⎭"), (c = "⎪"), (m = "Size4-Regular"))
			: (t === "\\rmoustache" || t === "⎱") &&
			  ((o = "⎫"), (u = "⎩"), (c = "⎪"), (m = "Size4-Regular"));
		var b = ba(o, m, a),
			E = b.height + b.depth,
			R = ba(c, m, a),
			_ = R.height + R.depth,
			v = ba(u, m, a),
			T = v.height + v.depth,
			M = 0,
			O = 1;
		if (l !== null) {
			var B = ba(l, m, a);
			(M = B.height + B.depth), (O = 2);
		}
		var z = E + T + M,
			D = Math.max(0, Math.ceil((r - z) / (O * _))),
			H = z + D * O * _,
			Q = i.fontMetrics().axisHeight;
		n && (Q *= i.sizeMultiplier);
		var te = H / 2 - Q,
			q = [];
		if (d.length > 0) {
			var oe = H - E - T,
				W = Math.round(H * 1e3),
				Ee = wv(d, Math.round(oe * 1e3)),
				I = new Sn(d, Ee),
				K = (p / 1e3).toFixed(3) + "em",
				ie = (W / 1e3).toFixed(3) + "em",
				ye = new Dr([I], {
					width: K,
					height: ie,
					viewBox: "0 0 " + p + " " + W,
				}),
				Te = N.makeSvgSpan([], [ye], i);
			(Te.height = W / 1e3),
				(Te.style.width = K),
				(Te.style.height = ie),
				q.push({ type: "elem", elem: Te });
		} else {
			if ((q.push(V0(u, m, a)), q.push(Fs), l === null)) {
				var Ne = H - E - T + 2 * ac;
				q.push(K0(c, Ne, i));
			} else {
				var Me = (H - E - T - M) / 2 + 2 * ac;
				q.push(K0(c, Me, i)),
					q.push(Fs),
					q.push(V0(l, m, a)),
					q.push(Fs),
					q.push(K0(c, Me, i));
			}
			q.push(Fs), q.push(V0(o, m, a));
		}
		var ut = i.havingBaseStyle(be.TEXT),
			Je = N.makeVList(
				{ positionType: "bottom", positionData: te, children: q },
				ut
			);
		return Ru(N.makeSpan(["delimsizing", "mult"], [Je], ut), be.TEXT, i, s);
	},
	X0 = 80,
	J0 = 0.08,
	Z0 = function (t, r, n, i, a) {
		var s = vv(t, i, n),
			o = new Sn(t, s),
			l = new Dr([o], {
				width: "400em",
				height: re(r),
				viewBox: "0 0 400000 " + n,
				preserveAspectRatio: "xMinYMin slice",
			});
		return N.makeSvgSpan(["hide-tail"], [l], a);
	},
	y9 = function (t, r) {
		var n = r.havingBaseSizing(),
			i = I4("\\surd", t * n.sizeMultiplier, C4, n),
			a = n.sizeMultiplier,
			s = Math.max(0, r.minRuleThickness - r.fontMetrics().sqrtRuleThickness),
			o,
			l = 0,
			c = 0,
			u = 0,
			d;
		return (
			i.type === "small"
				? ((u = 1e3 + 1e3 * s + X0),
				  t < 1 ? (a = 1) : t < 1.4 && (a = 0.7),
				  (l = (1 + s + J0) / a),
				  (c = (1 + s) / a),
				  (o = Z0("sqrtMain", l, u, s, r)),
				  (o.style.minWidth = "0.853em"),
				  (d = 0.833 / a))
				: i.type === "large"
				? ((u = (1e3 + X0) * Oa[i.size]),
				  (c = (Oa[i.size] + s) / a),
				  (l = (Oa[i.size] + s + J0) / a),
				  (o = Z0("sqrtSize" + i.size, l, u, s, r)),
				  (o.style.minWidth = "1.02em"),
				  (d = 1 / a))
				: ((l = t + s + J0),
				  (c = t + s),
				  (u = Math.floor(1e3 * t + s) + X0),
				  (o = Z0("sqrtTall", l, u, s, r)),
				  (o.style.minWidth = "0.742em"),
				  (d = 1.056)),
			(o.height = c),
			(o.style.height = re(l)),
			{
				span: o,
				advanceWidth: d,
				ruleWidth: (r.fontMetrics().sqrtRuleThickness + s) * a,
			}
		);
	},
	O4 = [
		"(",
		"\\lparen",
		")",
		"\\rparen",
		"[",
		"\\lbrack",
		"]",
		"\\rbrack",
		"\\{",
		"\\lbrace",
		"\\}",
		"\\rbrace",
		"\\lfloor",
		"\\rfloor",
		"⌊",
		"⌋",
		"\\lceil",
		"\\rceil",
		"⌈",
		"⌉",
		"\\surd",
	],
	b9 = [
		"\\uparrow",
		"\\downarrow",
		"\\updownarrow",
		"\\Uparrow",
		"\\Downarrow",
		"\\Updownarrow",
		"|",
		"\\|",
		"\\vert",
		"\\Vert",
		"\\lvert",
		"\\rvert",
		"\\lVert",
		"\\rVert",
		"\\lgroup",
		"\\rgroup",
		"⟮",
		"⟯",
		"\\lmoustache",
		"\\rmoustache",
		"⎰",
		"⎱",
	],
	N4 = ["<", ">", "\\langle", "\\rangle", "/", "\\backslash", "\\lt", "\\gt"],
	Oa = [0, 1.2, 1.8, 2.4, 3],
	v9 = function (t, r, n, i, a) {
		if (
			(t === "<" || t === "\\lt" || t === "⟨"
				? (t = "\\langle")
				: (t === ">" || t === "\\gt" || t === "⟩") && (t = "\\rangle"),
			_e.contains(O4, t) || _e.contains(N4, t))
		)
			return R4(t, r, !1, n, i, a);
		if (_e.contains(b9, t)) return M4(t, Oa[r], !1, n, i, a);
		throw new Z("Illegal delimiter: '" + t + "'");
	},
	_9 = [
		{ type: "small", style: be.SCRIPTSCRIPT },
		{ type: "small", style: be.SCRIPT },
		{ type: "small", style: be.TEXT },
		{ type: "large", size: 1 },
		{ type: "large", size: 2 },
		{ type: "large", size: 3 },
		{ type: "large", size: 4 },
	],
	w9 = [
		{ type: "small", style: be.SCRIPTSCRIPT },
		{ type: "small", style: be.SCRIPT },
		{ type: "small", style: be.TEXT },
		{ type: "stack" },
	],
	C4 = [
		{ type: "small", style: be.SCRIPTSCRIPT },
		{ type: "small", style: be.SCRIPT },
		{ type: "small", style: be.TEXT },
		{ type: "large", size: 1 },
		{ type: "large", size: 2 },
		{ type: "large", size: 3 },
		{ type: "large", size: 4 },
		{ type: "stack" },
	],
	S9 = function (t) {
		if (t.type === "small") return "Main-Regular";
		if (t.type === "large") return "Size" + t.size + "-Regular";
		if (t.type === "stack") return "Size4-Regular";
		throw new Error("Add support for delim type '" + t.type + "' here.");
	},
	I4 = function (t, r, n, i) {
		for (
			var a = Math.min(2, 3 - i.style.size), s = a;
			s < n.length && n[s].type !== "stack";
			s++
		) {
			var o = ba(t, S9(n[s]), "math"),
				l = o.height + o.depth;
			if (n[s].type === "small") {
				var c = i.havingBaseStyle(n[s].style);
				l *= c.sizeMultiplier;
			}
			if (l > r) return n[s];
		}
		return n[n.length - 1];
	},
	D4 = function (t, r, n, i, a, s) {
		t === "<" || t === "\\lt" || t === "⟨"
			? (t = "\\langle")
			: (t === ">" || t === "\\gt" || t === "⟩") && (t = "\\rangle");
		var o;
		_e.contains(N4, t) ? (o = _9) : _e.contains(O4, t) ? (o = C4) : (o = w9);
		var l = I4(t, r, o, i);
		return l.type === "small"
			? h9(t, l.style, n, i, a, s)
			: l.type === "large"
			? R4(t, l.size, n, i, a, s)
			: M4(t, r, n, i, a, s);
	},
	E9 = function (t, r, n, i, a, s) {
		var o = i.fontMetrics().axisHeight * i.sizeMultiplier,
			l = 901,
			c = 5 / i.fontMetrics().ptPerEm,
			u = Math.max(r - o, n + o),
			d = Math.max((u / 500) * l, 2 * u - c);
		return D4(t, d, !0, i, a, s);
	},
	Or = {
		sqrtImage: y9,
		sizedDelim: v9,
		sizeToMaxHeight: Oa,
		customSizedDelim: D4,
		leftRightDelim: E9,
	},
	ah = {
		"\\bigl": { mclass: "mopen", size: 1 },
		"\\Bigl": { mclass: "mopen", size: 2 },
		"\\biggl": { mclass: "mopen", size: 3 },
		"\\Biggl": { mclass: "mopen", size: 4 },
		"\\bigr": { mclass: "mclose", size: 1 },
		"\\Bigr": { mclass: "mclose", size: 2 },
		"\\biggr": { mclass: "mclose", size: 3 },
		"\\Biggr": { mclass: "mclose", size: 4 },
		"\\bigm": { mclass: "mrel", size: 1 },
		"\\Bigm": { mclass: "mrel", size: 2 },
		"\\biggm": { mclass: "mrel", size: 3 },
		"\\Biggm": { mclass: "mrel", size: 4 },
		"\\big": { mclass: "mord", size: 1 },
		"\\Big": { mclass: "mord", size: 2 },
		"\\bigg": { mclass: "mord", size: 3 },
		"\\Bigg": { mclass: "mord", size: 4 },
	},
	x9 = [
		"(",
		"\\lparen",
		")",
		"\\rparen",
		"[",
		"\\lbrack",
		"]",
		"\\rbrack",
		"\\{",
		"\\lbrace",
		"\\}",
		"\\rbrace",
		"\\lfloor",
		"\\rfloor",
		"⌊",
		"⌋",
		"\\lceil",
		"\\rceil",
		"⌈",
		"⌉",
		"<",
		">",
		"\\langle",
		"⟨",
		"\\rangle",
		"⟩",
		"\\lt",
		"\\gt",
		"\\lvert",
		"\\rvert",
		"\\lVert",
		"\\rVert",
		"\\lgroup",
		"\\rgroup",
		"⟮",
		"⟯",
		"\\lmoustache",
		"\\rmoustache",
		"⎰",
		"⎱",
		"/",
		"\\backslash",
		"|",
		"\\vert",
		"\\|",
		"\\Vert",
		"\\uparrow",
		"\\Uparrow",
		"\\downarrow",
		"\\Downarrow",
		"\\updownarrow",
		"\\Updownarrow",
		".",
	];
function i0(e, t) {
	var r = r0(e);
	if (r && _e.contains(x9, r.text)) return r;
	throw r
		? new Z("Invalid delimiter '" + r.text + "' after '" + t.funcName + "'", e)
		: new Z("Invalid delimiter type '" + e.type + "'", e);
}
le({
	type: "delimsizing",
	names: [
		"\\bigl",
		"\\Bigl",
		"\\biggl",
		"\\Biggl",
		"\\bigr",
		"\\Bigr",
		"\\biggr",
		"\\Biggr",
		"\\bigm",
		"\\Bigm",
		"\\biggm",
		"\\Biggm",
		"\\big",
		"\\Big",
		"\\bigg",
		"\\Bigg",
	],
	props: { numArgs: 1, argTypes: ["primitive"] },
	handler: (e, t) => {
		var r = i0(t[0], e);
		return {
			type: "delimsizing",
			mode: e.parser.mode,
			size: ah[e.funcName].size,
			mclass: ah[e.funcName].mclass,
			delim: r.text,
		};
	},
	htmlBuilder: (e, t) =>
		e.delim === "."
			? N.makeSpan([e.mclass])
			: Or.sizedDelim(e.delim, e.size, t, e.mode, [e.mclass]),
	mathmlBuilder: (e) => {
		var t = [];
		e.delim !== "." && t.push(Vt(e.delim, e.mode));
		var r = new X.MathNode("mo", t);
		e.mclass === "mopen" || e.mclass === "mclose"
			? r.setAttribute("fence", "true")
			: r.setAttribute("fence", "false"),
			r.setAttribute("stretchy", "true");
		var n = re(Or.sizeToMaxHeight[e.size]);
		return r.setAttribute("minsize", n), r.setAttribute("maxsize", n), r;
	},
});
function sh(e) {
	if (!e.body)
		throw new Error("Bug: The leftright ParseNode wasn't fully parsed.");
}
le({
	type: "leftright-right",
	names: ["\\right"],
	props: { numArgs: 1, primitive: !0 },
	handler: (e, t) => {
		var r = e.parser.gullet.macros.get("\\current@color");
		if (r && typeof r != "string")
			throw new Z("\\current@color set to non-string in \\right");
		return {
			type: "leftright-right",
			mode: e.parser.mode,
			delim: i0(t[0], e).text,
			color: r,
		};
	},
});
le({
	type: "leftright",
	names: ["\\left"],
	props: { numArgs: 1, primitive: !0 },
	handler: (e, t) => {
		var r = i0(t[0], e),
			n = e.parser;
		++n.leftrightDepth;
		var i = n.parseExpression(!1);
		--n.leftrightDepth, n.expect("\\right", !1);
		var a = ke(n.parseFunction(), "leftright-right");
		return {
			type: "leftright",
			mode: n.mode,
			body: i,
			left: r.text,
			right: a.delim,
			rightColor: a.color,
		};
	},
	htmlBuilder: (e, t) => {
		sh(e);
		for (
			var r = ot(e.body, t, !0, ["mopen", "mclose"]),
				n = 0,
				i = 0,
				a = !1,
				s = 0;
			s < r.length;
			s++
		)
			r[s].isMiddle
				? (a = !0)
				: ((n = Math.max(r[s].height, n)), (i = Math.max(r[s].depth, i)));
		(n *= t.sizeMultiplier), (i *= t.sizeMultiplier);
		var o;
		if (
			(e.left === "."
				? (o = Wa(t, ["mopen"]))
				: (o = Or.leftRightDelim(e.left, n, i, t, e.mode, ["mopen"])),
			r.unshift(o),
			a)
		)
			for (var l = 1; l < r.length; l++) {
				var c = r[l],
					u = c.isMiddle;
				u && (r[l] = Or.leftRightDelim(u.delim, n, i, u.options, e.mode, []));
			}
		var d;
		if (e.right === ".") d = Wa(t, ["mclose"]);
		else {
			var p = e.rightColor ? t.withColor(e.rightColor) : t;
			d = Or.leftRightDelim(e.right, n, i, p, e.mode, ["mclose"]);
		}
		return r.push(d), N.makeSpan(["minner"], r, t);
	},
	mathmlBuilder: (e, t) => {
		sh(e);
		var r = It(e.body, t);
		if (e.left !== ".") {
			var n = new X.MathNode("mo", [Vt(e.left, e.mode)]);
			n.setAttribute("fence", "true"), r.unshift(n);
		}
		if (e.right !== ".") {
			var i = new X.MathNode("mo", [Vt(e.right, e.mode)]);
			i.setAttribute("fence", "true"),
				e.rightColor && i.setAttribute("mathcolor", e.rightColor),
				r.push(i);
		}
		return xu(r);
	},
});
le({
	type: "middle",
	names: ["\\middle"],
	props: { numArgs: 1, primitive: !0 },
	handler: (e, t) => {
		var r = i0(t[0], e);
		if (!e.parser.leftrightDepth)
			throw new Z("\\middle without preceding \\left", r);
		return { type: "middle", mode: e.parser.mode, delim: r.text };
	},
	htmlBuilder: (e, t) => {
		var r;
		if (e.delim === ".") r = Wa(t, []);
		else {
			r = Or.sizedDelim(e.delim, 1, t, e.mode, []);
			var n = { delim: e.delim, options: t };
			r.isMiddle = n;
		}
		return r;
	},
	mathmlBuilder: (e, t) => {
		var r =
				e.delim === "\\vert" || e.delim === "|"
					? Vt("|", "text")
					: Vt(e.delim, e.mode),
			n = new X.MathNode("mo", [r]);
		return (
			n.setAttribute("fence", "true"),
			n.setAttribute("lspace", "0.05em"),
			n.setAttribute("rspace", "0.05em"),
			n
		);
	},
});
var Mu = (e, t) => {
		var r = N.wrapFragment(Be(e.body, t), t),
			n = e.label.slice(1),
			i = t.sizeMultiplier,
			a,
			s = 0,
			o = _e.isCharacterBox(e.body);
		if (n === "sout")
			(a = N.makeSpan(["stretchy", "sout"])),
				(a.height = t.fontMetrics().defaultRuleThickness / i),
				(s = -0.5 * t.fontMetrics().xHeight);
		else if (n === "phase") {
			var l = Xe({ number: 0.6, unit: "pt" }, t),
				c = Xe({ number: 0.35, unit: "ex" }, t),
				u = t.havingBaseSizing();
			i = i / u.sizeMultiplier;
			var d = r.height + r.depth + l + c;
			r.style.paddingLeft = re(d / 2 + l);
			var p = Math.floor(1e3 * d * i),
				m = yv(p),
				b = new Dr([new Sn("phase", m)], {
					width: "400em",
					height: re(p / 1e3),
					viewBox: "0 0 400000 " + p,
					preserveAspectRatio: "xMinYMin slice",
				});
			(a = N.makeSvgSpan(["hide-tail"], [b], t)),
				(a.style.height = re(d)),
				(s = r.depth + l + c);
		} else {
			/cancel/.test(n)
				? o || r.classes.push("cancel-pad")
				: n === "angl"
				? r.classes.push("anglpad")
				: r.classes.push("boxpad");
			var E = 0,
				R = 0,
				_ = 0;
			/box/.test(n)
				? ((_ = Math.max(t.fontMetrics().fboxrule, t.minRuleThickness)),
				  (E = t.fontMetrics().fboxsep + (n === "colorbox" ? 0 : _)),
				  (R = E))
				: n === "angl"
				? ((_ = Math.max(
						t.fontMetrics().defaultRuleThickness,
						t.minRuleThickness
				  )),
				  (E = 4 * _),
				  (R = Math.max(0, 0.25 - r.depth)))
				: ((E = o ? 0.2 : 0), (R = E)),
				(a = Pr.encloseSpan(r, n, E, R, t)),
				/fbox|boxed|fcolorbox/.test(n)
					? ((a.style.borderStyle = "solid"), (a.style.borderWidth = re(_)))
					: n === "angl" &&
					  _ !== 0.049 &&
					  ((a.style.borderTopWidth = re(_)),
					  (a.style.borderRightWidth = re(_))),
				(s = r.depth + R),
				e.backgroundColor &&
					((a.style.backgroundColor = e.backgroundColor),
					e.borderColor && (a.style.borderColor = e.borderColor));
		}
		var v;
		if (e.backgroundColor)
			v = N.makeVList(
				{
					positionType: "individualShift",
					children: [
						{ type: "elem", elem: a, shift: s },
						{ type: "elem", elem: r, shift: 0 },
					],
				},
				t
			);
		else {
			var T = /cancel|phase/.test(n) ? ["svg-align"] : [];
			v = N.makeVList(
				{
					positionType: "individualShift",
					children: [
						{ type: "elem", elem: r, shift: 0 },
						{ type: "elem", elem: a, shift: s, wrapperClasses: T },
					],
				},
				t
			);
		}
		return (
			/cancel/.test(n) && ((v.height = r.height), (v.depth = r.depth)),
			/cancel/.test(n) && !o
				? N.makeSpan(["mord", "cancel-lap"], [v], t)
				: N.makeSpan(["mord"], [v], t)
		);
	},
	Ou = (e, t) => {
		var r = 0,
			n = new X.MathNode(
				e.label.indexOf("colorbox") > -1 ? "mpadded" : "menclose",
				[Fe(e.body, t)]
			);
		switch (e.label) {
			case "\\cancel":
				n.setAttribute("notation", "updiagonalstrike");
				break;
			case "\\bcancel":
				n.setAttribute("notation", "downdiagonalstrike");
				break;
			case "\\phase":
				n.setAttribute("notation", "phasorangle");
				break;
			case "\\sout":
				n.setAttribute("notation", "horizontalstrike");
				break;
			case "\\fbox":
				n.setAttribute("notation", "box");
				break;
			case "\\angl":
				n.setAttribute("notation", "actuarial");
				break;
			case "\\fcolorbox":
			case "\\colorbox":
				if (
					((r = t.fontMetrics().fboxsep * t.fontMetrics().ptPerEm),
					n.setAttribute("width", "+" + 2 * r + "pt"),
					n.setAttribute("height", "+" + 2 * r + "pt"),
					n.setAttribute("lspace", r + "pt"),
					n.setAttribute("voffset", r + "pt"),
					e.label === "\\fcolorbox")
				) {
					var i = Math.max(t.fontMetrics().fboxrule, t.minRuleThickness);
					n.setAttribute(
						"style",
						"border: " + i + "em solid " + String(e.borderColor)
					);
				}
				break;
			case "\\xcancel":
				n.setAttribute("notation", "updiagonalstrike downdiagonalstrike");
				break;
		}
		return (
			e.backgroundColor && n.setAttribute("mathbackground", e.backgroundColor),
			n
		);
	};
le({
	type: "enclose",
	names: ["\\colorbox"],
	props: { numArgs: 2, allowedInText: !0, argTypes: ["color", "text"] },
	handler(e, t, r) {
		var { parser: n, funcName: i } = e,
			a = ke(t[0], "color-token").color,
			s = t[1];
		return {
			type: "enclose",
			mode: n.mode,
			label: i,
			backgroundColor: a,
			body: s,
		};
	},
	htmlBuilder: Mu,
	mathmlBuilder: Ou,
});
le({
	type: "enclose",
	names: ["\\fcolorbox"],
	props: {
		numArgs: 3,
		allowedInText: !0,
		argTypes: ["color", "color", "text"],
	},
	handler(e, t, r) {
		var { parser: n, funcName: i } = e,
			a = ke(t[0], "color-token").color,
			s = ke(t[1], "color-token").color,
			o = t[2];
		return {
			type: "enclose",
			mode: n.mode,
			label: i,
			backgroundColor: s,
			borderColor: a,
			body: o,
		};
	},
	htmlBuilder: Mu,
	mathmlBuilder: Ou,
});
le({
	type: "enclose",
	names: ["\\fbox"],
	props: { numArgs: 1, argTypes: ["hbox"], allowedInText: !0 },
	handler(e, t) {
		var { parser: r } = e;
		return { type: "enclose", mode: r.mode, label: "\\fbox", body: t[0] };
	},
});
le({
	type: "enclose",
	names: ["\\cancel", "\\bcancel", "\\xcancel", "\\sout", "\\phase"],
	props: { numArgs: 1 },
	handler(e, t) {
		var { parser: r, funcName: n } = e,
			i = t[0];
		return { type: "enclose", mode: r.mode, label: n, body: i };
	},
	htmlBuilder: Mu,
	mathmlBuilder: Ou,
});
le({
	type: "enclose",
	names: ["\\angl"],
	props: { numArgs: 1, argTypes: ["hbox"], allowedInText: !1 },
	handler(e, t) {
		var { parser: r } = e;
		return { type: "enclose", mode: r.mode, label: "\\angl", body: t[0] };
	},
});
var B4 = {};
function gr(e) {
	for (
		var {
				type: t,
				names: r,
				props: n,
				handler: i,
				htmlBuilder: a,
				mathmlBuilder: s,
			} = e,
			o = {
				type: t,
				numArgs: n.numArgs || 0,
				allowedInText: !1,
				numOptionalArgs: 0,
				handler: i,
			},
			l = 0;
		l < r.length;
		++l
	)
		B4[r[l]] = o;
	a && (xo[t] = a), s && (To[t] = s);
}
var P4 = {};
function y(e, t) {
	P4[e] = t;
}
function oh(e) {
	var t = [];
	e.consumeSpaces();
	var r = e.fetch().text;
	for (
		r === "\\relax" && (e.consume(), e.consumeSpaces(), (r = e.fetch().text));
		r === "\\hline" || r === "\\hdashline";

	)
		e.consume(),
			t.push(r === "\\hdashline"),
			e.consumeSpaces(),
			(r = e.fetch().text);
	return t;
}
var a0 = (e) => {
	var t = e.parser.settings;
	if (!t.displayMode)
		throw new Z("{" + e.envName + "} can be used only in display mode.");
};
function Nu(e) {
	if (e.indexOf("ed") === -1) return e.indexOf("*") === -1;
}
function Rn(e, t, r) {
	var {
		hskipBeforeAndAfter: n,
		addJot: i,
		cols: a,
		arraystretch: s,
		colSeparationType: o,
		autoTag: l,
		singleRow: c,
		emptySingleRow: u,
		maxNumCols: d,
		leqno: p,
	} = t;
	if (
		(e.gullet.beginGroup(), c || e.gullet.macros.set("\\cr", "\\\\\\relax"), !s)
	) {
		var m = e.gullet.expandMacroAsText("\\arraystretch");
		if (m == null) s = 1;
		else if (((s = parseFloat(m)), !s || s < 0))
			throw new Z("Invalid \\arraystretch: " + m);
	}
	e.gullet.beginGroup();
	var b = [],
		E = [b],
		R = [],
		_ = [],
		v = l != null ? [] : void 0;
	function T() {
		l && e.gullet.macros.set("\\@eqnsw", "1", !0);
	}
	function M() {
		v &&
			(e.gullet.macros.get("\\df@tag")
				? (v.push(e.subparse([new jt("\\df@tag")])),
				  e.gullet.macros.set("\\df@tag", void 0, !0))
				: v.push(Boolean(l) && e.gullet.macros.get("\\@eqnsw") === "1"));
	}
	for (T(), _.push(oh(e)); ; ) {
		var O = e.parseExpression(!1, c ? "\\end" : "\\\\");
		e.gullet.endGroup(),
			e.gullet.beginGroup(),
			(O = { type: "ordgroup", mode: e.mode, body: O }),
			r && (O = { type: "styling", mode: e.mode, style: r, body: [O] }),
			b.push(O);
		var B = e.fetch().text;
		if (B === "&") {
			if (d && b.length === d) {
				if (c || o) throw new Z("Too many tab characters: &", e.nextToken);
				e.settings.reportNonstrict(
					"textEnv",
					"Too few columns specified in the {array} column argument."
				);
			}
			e.consume();
		} else if (B === "\\end") {
			M(),
				b.length === 1 &&
					O.type === "styling" &&
					O.body[0].body.length === 0 &&
					(E.length > 1 || !u) &&
					E.pop(),
				_.length < E.length + 1 && _.push([]);
			break;
		} else if (B === "\\\\") {
			e.consume();
			var z = void 0;
			e.gullet.future().text !== " " && (z = e.parseSizeGroup(!0)),
				R.push(z ? z.value : null),
				M(),
				_.push(oh(e)),
				(b = []),
				E.push(b),
				T();
		} else throw new Z("Expected & or \\\\ or \\cr or \\end", e.nextToken);
	}
	return (
		e.gullet.endGroup(),
		e.gullet.endGroup(),
		{
			type: "array",
			mode: e.mode,
			addJot: i,
			arraystretch: s,
			body: E,
			cols: a,
			rowGaps: R,
			hskipBeforeAndAfter: n,
			hLinesBeforeRow: _,
			colSeparationType: o,
			tags: v,
			leqno: p,
		}
	);
}
function Cu(e) {
	return e.slice(0, 1) === "d" ? "display" : "text";
}
var yr = function (t, r) {
		var n,
			i,
			a = t.body.length,
			s = t.hLinesBeforeRow,
			o = 0,
			l = new Array(a),
			c = [],
			u = Math.max(r.fontMetrics().arrayRuleWidth, r.minRuleThickness),
			d = 1 / r.fontMetrics().ptPerEm,
			p = 5 * d;
		if (t.colSeparationType && t.colSeparationType === "small") {
			var m = r.havingStyle(be.SCRIPT).sizeMultiplier;
			p = 0.2778 * (m / r.sizeMultiplier);
		}
		var b =
				t.colSeparationType === "CD"
					? Xe({ number: 3, unit: "ex" }, r)
					: 12 * d,
			E = 3 * d,
			R = t.arraystretch * b,
			_ = 0.7 * R,
			v = 0.3 * R,
			T = 0;
		function M(ae) {
			for (var j = 0; j < ae.length; ++j)
				j > 0 && (T += 0.25), c.push({ pos: T, isDashed: ae[j] });
		}
		for (M(s[0]), n = 0; n < t.body.length; ++n) {
			var O = t.body[n],
				B = _,
				z = v;
			o < O.length && (o = O.length);
			var D = new Array(O.length);
			for (i = 0; i < O.length; ++i) {
				var H = Be(O[i], r);
				z < H.depth && (z = H.depth),
					B < H.height && (B = H.height),
					(D[i] = H);
			}
			var Q = t.rowGaps[n],
				te = 0;
			Q &&
				((te = Xe(Q, r)), te > 0 && ((te += v), z < te && (z = te), (te = 0))),
				t.addJot && (z += E),
				(D.height = B),
				(D.depth = z),
				(T += B),
				(D.pos = T),
				(T += z + te),
				(l[n] = D),
				M(s[n + 1]);
		}
		var q = T / 2 + r.fontMetrics().axisHeight,
			oe = t.cols || [],
			W = [],
			Ee,
			I,
			K = [];
		if (t.tags && t.tags.some((ae) => ae))
			for (n = 0; n < a; ++n) {
				var ie = l[n],
					ye = ie.pos - q,
					Te = t.tags[n],
					Ne = void 0;
				Te === !0
					? (Ne = N.makeSpan(["eqn-num"], [], r))
					: Te === !1
					? (Ne = N.makeSpan([], [], r))
					: (Ne = N.makeSpan([], ot(Te, r, !0), r)),
					(Ne.depth = ie.depth),
					(Ne.height = ie.height),
					K.push({ type: "elem", elem: Ne, shift: ye });
			}
		for (i = 0, I = 0; i < o || I < oe.length; ++i, ++I) {
			for (var Me = oe[I] || {}, ut = !0; Me.type === "separator"; ) {
				if (
					(ut ||
						((Ee = N.makeSpan(["arraycolsep"], [])),
						(Ee.style.width = re(r.fontMetrics().doubleRuleSep)),
						W.push(Ee)),
					Me.separator === "|" || Me.separator === ":")
				) {
					var Je = Me.separator === "|" ? "solid" : "dashed",
						L = N.makeSpan(["vertical-separator"], [], r);
					(L.style.height = re(T)),
						(L.style.borderRightWidth = re(u)),
						(L.style.borderRightStyle = Je),
						(L.style.margin = "0 " + re(-u / 2));
					var se = T - q;
					se && (L.style.verticalAlign = re(-se)), W.push(L);
				} else throw new Z("Invalid separator type: " + Me.separator);
				I++, (Me = oe[I] || {}), (ut = !1);
			}
			if (!(i >= o)) {
				var ne = void 0;
				(i > 0 || t.hskipBeforeAndAfter) &&
					((ne = _e.deflt(Me.pregap, p)),
					ne !== 0 &&
						((Ee = N.makeSpan(["arraycolsep"], [])),
						(Ee.style.width = re(ne)),
						W.push(Ee)));
				var de = [];
				for (n = 0; n < a; ++n) {
					var Ae = l[n],
						Le = Ae[i];
					if (Le) {
						var xe = Ae.pos - q;
						(Le.depth = Ae.depth),
							(Le.height = Ae.height),
							de.push({ type: "elem", elem: Le, shift: xe });
					}
				}
				(de = N.makeVList(
					{ positionType: "individualShift", children: de },
					r
				)),
					(de = N.makeSpan(["col-align-" + (Me.align || "c")], [de])),
					W.push(de),
					(i < o - 1 || t.hskipBeforeAndAfter) &&
						((ne = _e.deflt(Me.postgap, p)),
						ne !== 0 &&
							((Ee = N.makeSpan(["arraycolsep"], [])),
							(Ee.style.width = re(ne)),
							W.push(Ee)));
			}
		}
		if (((l = N.makeSpan(["mtable"], W)), c.length > 0)) {
			for (
				var w = N.makeLineSpan("hline", r, u),
					k = N.makeLineSpan("hdashline", r, u),
					C = [{ type: "elem", elem: l, shift: 0 }];
				c.length > 0;

			) {
				var $ = c.pop(),
					U = $.pos - q;
				$.isDashed
					? C.push({ type: "elem", elem: k, shift: U })
					: C.push({ type: "elem", elem: w, shift: U });
			}
			l = N.makeVList({ positionType: "individualShift", children: C }, r);
		}
		if (K.length === 0) return N.makeSpan(["mord"], [l], r);
		var P = N.makeVList({ positionType: "individualShift", children: K }, r);
		return (P = N.makeSpan(["tag"], [P], r)), N.makeFragment([l, P]);
	},
	T9 = { c: "center ", l: "left ", r: "right " },
	br = function (t, r) {
		for (
			var n = [],
				i = new X.MathNode("mtd", [], ["mtr-glue"]),
				a = new X.MathNode("mtd", [], ["mml-eqn-num"]),
				s = 0;
			s < t.body.length;
			s++
		) {
			for (var o = t.body[s], l = [], c = 0; c < o.length; c++)
				l.push(new X.MathNode("mtd", [Fe(o[c], r)]));
			t.tags &&
				t.tags[s] &&
				(l.unshift(i), l.push(i), t.leqno ? l.unshift(a) : l.push(a)),
				n.push(new X.MathNode("mtr", l));
		}
		var u = new X.MathNode("mtable", n),
			d =
				t.arraystretch === 0.5
					? 0.1
					: 0.16 + t.arraystretch - 1 + (t.addJot ? 0.09 : 0);
		u.setAttribute("rowspacing", re(d));
		var p = "",
			m = "";
		if (t.cols && t.cols.length > 0) {
			var b = t.cols,
				E = "",
				R = !1,
				_ = 0,
				v = b.length;
			b[0].type === "separator" && ((p += "top "), (_ = 1)),
				b[b.length - 1].type === "separator" && ((p += "bottom "), (v -= 1));
			for (var T = _; T < v; T++)
				b[T].type === "align"
					? ((m += T9[b[T].align]), R && (E += "none "), (R = !0))
					: b[T].type === "separator" &&
					  R &&
					  ((E += b[T].separator === "|" ? "solid " : "dashed "), (R = !1));
			u.setAttribute("columnalign", m.trim()),
				/[sd]/.test(E) && u.setAttribute("columnlines", E.trim());
		}
		if (t.colSeparationType === "align") {
			for (var M = t.cols || [], O = "", B = 1; B < M.length; B++)
				O += B % 2 ? "0em " : "1em ";
			u.setAttribute("columnspacing", O.trim());
		} else
			t.colSeparationType === "alignat" || t.colSeparationType === "gather"
				? u.setAttribute("columnspacing", "0em")
				: t.colSeparationType === "small"
				? u.setAttribute("columnspacing", "0.2778em")
				: t.colSeparationType === "CD"
				? u.setAttribute("columnspacing", "0.5em")
				: u.setAttribute("columnspacing", "1em");
		var z = "",
			D = t.hLinesBeforeRow;
		(p += D[0].length > 0 ? "left " : ""),
			(p += D[D.length - 1].length > 0 ? "right " : "");
		for (var H = 1; H < D.length - 1; H++)
			z += D[H].length === 0 ? "none " : D[H][0] ? "dashed " : "solid ";
		return (
			/[sd]/.test(z) && u.setAttribute("rowlines", z.trim()),
			p !== "" &&
				((u = new X.MathNode("menclose", [u])),
				u.setAttribute("notation", p.trim())),
			t.arraystretch &&
				t.arraystretch < 1 &&
				((u = new X.MathNode("mstyle", [u])),
				u.setAttribute("scriptlevel", "1")),
			u
		);
	},
	L4 = function (t, r) {
		t.envName.indexOf("ed") === -1 && a0(t);
		var n = [],
			i = t.envName.indexOf("at") > -1 ? "alignat" : "align",
			a = t.envName === "split",
			s = Rn(
				t.parser,
				{
					cols: n,
					addJot: !0,
					autoTag: a ? void 0 : Nu(t.envName),
					emptySingleRow: !0,
					colSeparationType: i,
					maxNumCols: a ? 2 : void 0,
					leqno: t.parser.settings.leqno,
				},
				"display"
			),
			o,
			l = 0,
			c = { type: "ordgroup", mode: t.mode, body: [] };
		if (r[0] && r[0].type === "ordgroup") {
			for (var u = "", d = 0; d < r[0].body.length; d++) {
				var p = ke(r[0].body[d], "textord");
				u += p.text;
			}
			(o = Number(u)), (l = o * 2);
		}
		var m = !l;
		s.body.forEach(function (_) {
			for (var v = 1; v < _.length; v += 2) {
				var T = ke(_[v], "styling"),
					M = ke(T.body[0], "ordgroup");
				M.body.unshift(c);
			}
			if (m) l < _.length && (l = _.length);
			else {
				var O = _.length / 2;
				if (o < O)
					throw new Z(
						"Too many math in a row: " + ("expected " + o + ", but got " + O),
						_[0]
					);
			}
		});
		for (var b = 0; b < l; ++b) {
			var E = "r",
				R = 0;
			b % 2 === 1 ? (E = "l") : b > 0 && m && (R = 1),
				(n[b] = { type: "align", align: E, pregap: R, postgap: 0 });
		}
		return (s.colSeparationType = m ? "align" : "alignat"), s;
	};
gr({
	type: "array",
	names: ["array", "darray"],
	props: { numArgs: 1 },
	handler(e, t) {
		var r = r0(t[0]),
			n = r ? [t[0]] : ke(t[0], "ordgroup").body,
			i = n.map(function (s) {
				var o = ku(s),
					l = o.text;
				if ("lcr".indexOf(l) !== -1) return { type: "align", align: l };
				if (l === "|") return { type: "separator", separator: "|" };
				if (l === ":") return { type: "separator", separator: ":" };
				throw new Z("Unknown column alignment: " + l, s);
			}),
			a = { cols: i, hskipBeforeAndAfter: !0, maxNumCols: i.length };
		return Rn(e.parser, a, Cu(e.envName));
	},
	htmlBuilder: yr,
	mathmlBuilder: br,
});
gr({
	type: "array",
	names: [
		"matrix",
		"pmatrix",
		"bmatrix",
		"Bmatrix",
		"vmatrix",
		"Vmatrix",
		"matrix*",
		"pmatrix*",
		"bmatrix*",
		"Bmatrix*",
		"vmatrix*",
		"Vmatrix*",
	],
	props: { numArgs: 0 },
	handler(e) {
		var t = {
				matrix: null,
				pmatrix: ["(", ")"],
				bmatrix: ["[", "]"],
				Bmatrix: ["\\{", "\\}"],
				vmatrix: ["|", "|"],
				Vmatrix: ["\\Vert", "\\Vert"],
			}[e.envName.replace("*", "")],
			r = "c",
			n = { hskipBeforeAndAfter: !1, cols: [{ type: "align", align: r }] };
		if (e.envName.charAt(e.envName.length - 1) === "*") {
			var i = e.parser;
			if ((i.consumeSpaces(), i.fetch().text === "[")) {
				if (
					(i.consume(),
					i.consumeSpaces(),
					(r = i.fetch().text),
					"lcr".indexOf(r) === -1)
				)
					throw new Z("Expected l or c or r", i.nextToken);
				i.consume(),
					i.consumeSpaces(),
					i.expect("]"),
					i.consume(),
					(n.cols = [{ type: "align", align: r }]);
			}
		}
		var a = Rn(e.parser, n, Cu(e.envName)),
			s = Math.max(0, ...a.body.map((o) => o.length));
		return (
			(a.cols = new Array(s).fill({ type: "align", align: r })),
			t
				? {
						type: "leftright",
						mode: e.mode,
						body: [a],
						left: t[0],
						right: t[1],
						rightColor: void 0,
				  }
				: a
		);
	},
	htmlBuilder: yr,
	mathmlBuilder: br,
});
gr({
	type: "array",
	names: ["smallmatrix"],
	props: { numArgs: 0 },
	handler(e) {
		var t = { arraystretch: 0.5 },
			r = Rn(e.parser, t, "script");
		return (r.colSeparationType = "small"), r;
	},
	htmlBuilder: yr,
	mathmlBuilder: br,
});
gr({
	type: "array",
	names: ["subarray"],
	props: { numArgs: 1 },
	handler(e, t) {
		var r = r0(t[0]),
			n = r ? [t[0]] : ke(t[0], "ordgroup").body,
			i = n.map(function (s) {
				var o = ku(s),
					l = o.text;
				if ("lc".indexOf(l) !== -1) return { type: "align", align: l };
				throw new Z("Unknown column alignment: " + l, s);
			});
		if (i.length > 1) throw new Z("{subarray} can contain only one column");
		var a = { cols: i, hskipBeforeAndAfter: !1, arraystretch: 0.5 };
		if (
			((a = Rn(e.parser, a, "script")),
			a.body.length > 0 && a.body[0].length > 1)
		)
			throw new Z("{subarray} can contain only one column");
		return a;
	},
	htmlBuilder: yr,
	mathmlBuilder: br,
});
gr({
	type: "array",
	names: ["cases", "dcases", "rcases", "drcases"],
	props: { numArgs: 0 },
	handler(e) {
		var t = {
				arraystretch: 1.2,
				cols: [
					{ type: "align", align: "l", pregap: 0, postgap: 1 },
					{ type: "align", align: "l", pregap: 0, postgap: 0 },
				],
			},
			r = Rn(e.parser, t, Cu(e.envName));
		return {
			type: "leftright",
			mode: e.mode,
			body: [r],
			left: e.envName.indexOf("r") > -1 ? "." : "\\{",
			right: e.envName.indexOf("r") > -1 ? "\\}" : ".",
			rightColor: void 0,
		};
	},
	htmlBuilder: yr,
	mathmlBuilder: br,
});
gr({
	type: "array",
	names: ["align", "align*", "aligned", "split"],
	props: { numArgs: 0 },
	handler: L4,
	htmlBuilder: yr,
	mathmlBuilder: br,
});
gr({
	type: "array",
	names: ["gathered", "gather", "gather*"],
	props: { numArgs: 0 },
	handler(e) {
		_e.contains(["gather", "gather*"], e.envName) && a0(e);
		var t = {
			cols: [{ type: "align", align: "c" }],
			addJot: !0,
			colSeparationType: "gather",
			autoTag: Nu(e.envName),
			emptySingleRow: !0,
			leqno: e.parser.settings.leqno,
		};
		return Rn(e.parser, t, "display");
	},
	htmlBuilder: yr,
	mathmlBuilder: br,
});
gr({
	type: "array",
	names: ["alignat", "alignat*", "alignedat"],
	props: { numArgs: 1 },
	handler: L4,
	htmlBuilder: yr,
	mathmlBuilder: br,
});
gr({
	type: "array",
	names: ["equation", "equation*"],
	props: { numArgs: 0 },
	handler(e) {
		a0(e);
		var t = {
			autoTag: Nu(e.envName),
			emptySingleRow: !0,
			singleRow: !0,
			maxNumCols: 1,
			leqno: e.parser.settings.leqno,
		};
		return Rn(e.parser, t, "display");
	},
	htmlBuilder: yr,
	mathmlBuilder: br,
});
gr({
	type: "array",
	names: ["CD"],
	props: { numArgs: 0 },
	handler(e) {
		return a0(e), f9(e.parser);
	},
	htmlBuilder: yr,
	mathmlBuilder: br,
});
y("\\nonumber", "\\gdef\\@eqnsw{0}");
y("\\notag", "\\nonumber");
le({
	type: "text",
	names: ["\\hline", "\\hdashline"],
	props: { numArgs: 0, allowedInText: !0, allowedInMath: !0 },
	handler(e, t) {
		throw new Z(e.funcName + " valid only within array environment");
	},
});
var lh = B4;
le({
	type: "environment",
	names: ["\\begin", "\\end"],
	props: { numArgs: 1, argTypes: ["text"] },
	handler(e, t) {
		var { parser: r, funcName: n } = e,
			i = t[0];
		if (i.type !== "ordgroup") throw new Z("Invalid environment name", i);
		for (var a = "", s = 0; s < i.body.length; ++s)
			a += ke(i.body[s], "textord").text;
		if (n === "\\begin") {
			if (!lh.hasOwnProperty(a)) throw new Z("No such environment: " + a, i);
			var o = lh[a],
				{ args: l, optArgs: c } = r.parseArguments("\\begin{" + a + "}", o),
				u = { mode: r.mode, envName: a, parser: r },
				d = o.handler(u, l, c);
			r.expect("\\end", !1);
			var p = r.nextToken,
				m = ke(r.parseFunction(), "environment");
			if (m.name !== a)
				throw new Z(
					"Mismatch: \\begin{" + a + "} matched by \\end{" + m.name + "}",
					p
				);
			return d;
		}
		return { type: "environment", mode: r.mode, name: a, nameGroup: i };
	},
});
var z4 = (e, t) => {
		var r = e.font,
			n = t.withFont(r);
		return Be(e.body, n);
	},
	$4 = (e, t) => {
		var r = e.font,
			n = t.withFont(r);
		return Fe(e.body, n);
	},
	ch = {
		"\\Bbb": "\\mathbb",
		"\\bold": "\\mathbf",
		"\\frak": "\\mathfrak",
		"\\bm": "\\boldsymbol",
	};
le({
	type: "font",
	names: [
		"\\mathrm",
		"\\mathit",
		"\\mathbf",
		"\\mathnormal",
		"\\mathbb",
		"\\mathcal",
		"\\mathfrak",
		"\\mathscr",
		"\\mathsf",
		"\\mathtt",
		"\\Bbb",
		"\\bold",
		"\\frak",
	],
	props: { numArgs: 1, allowedInArgument: !0 },
	handler: (e, t) => {
		var { parser: r, funcName: n } = e,
			i = ko(t[0]),
			a = n;
		return (
			a in ch && (a = ch[a]),
			{ type: "font", mode: r.mode, font: a.slice(1), body: i }
		);
	},
	htmlBuilder: z4,
	mathmlBuilder: $4,
});
le({
	type: "mclass",
	names: ["\\boldsymbol", "\\bm"],
	props: { numArgs: 1 },
	handler: (e, t) => {
		var { parser: r } = e,
			n = t[0],
			i = _e.isCharacterBox(n);
		return {
			type: "mclass",
			mode: r.mode,
			mclass: n0(n),
			body: [{ type: "font", mode: r.mode, font: "boldsymbol", body: n }],
			isCharacterBox: i,
		};
	},
});
le({
	type: "font",
	names: ["\\rm", "\\sf", "\\tt", "\\bf", "\\it", "\\cal"],
	props: { numArgs: 0, allowedInText: !0 },
	handler: (e, t) => {
		var { parser: r, funcName: n, breakOnTokenText: i } = e,
			{ mode: a } = r,
			s = r.parseExpression(!0, i),
			o = "math" + n.slice(1);
		return {
			type: "font",
			mode: a,
			font: o,
			body: { type: "ordgroup", mode: r.mode, body: s },
		};
	},
	htmlBuilder: z4,
	mathmlBuilder: $4,
});
var F4 = (e, t) => {
		var r = t;
		return (
			e === "display"
				? (r = r.id >= be.SCRIPT.id ? r.text() : be.DISPLAY)
				: e === "text" && r.size === be.DISPLAY.size
				? (r = be.TEXT)
				: e === "script"
				? (r = be.SCRIPT)
				: e === "scriptscript" && (r = be.SCRIPTSCRIPT),
			r
		);
	},
	Iu = (e, t) => {
		var r = F4(e.size, t.style),
			n = r.fracNum(),
			i = r.fracDen(),
			a;
		a = t.havingStyle(n);
		var s = Be(e.numer, a, t);
		if (e.continued) {
			var o = 8.5 / t.fontMetrics().ptPerEm,
				l = 3.5 / t.fontMetrics().ptPerEm;
			(s.height = s.height < o ? o : s.height),
				(s.depth = s.depth < l ? l : s.depth);
		}
		a = t.havingStyle(i);
		var c = Be(e.denom, a, t),
			u,
			d,
			p;
		e.hasBarLine
			? (e.barSize
					? ((d = Xe(e.barSize, t)), (u = N.makeLineSpan("frac-line", t, d)))
					: (u = N.makeLineSpan("frac-line", t)),
			  (d = u.height),
			  (p = u.height))
			: ((u = null), (d = 0), (p = t.fontMetrics().defaultRuleThickness));
		var m, b, E;
		r.size === be.DISPLAY.size || e.size === "display"
			? ((m = t.fontMetrics().num1),
			  d > 0 ? (b = 3 * p) : (b = 7 * p),
			  (E = t.fontMetrics().denom1))
			: (d > 0
					? ((m = t.fontMetrics().num2), (b = p))
					: ((m = t.fontMetrics().num3), (b = 3 * p)),
			  (E = t.fontMetrics().denom2));
		var R;
		if (u) {
			var v = t.fontMetrics().axisHeight;
			m - s.depth - (v + 0.5 * d) < b &&
				(m += b - (m - s.depth - (v + 0.5 * d))),
				v - 0.5 * d - (c.height - E) < b &&
					(E += b - (v - 0.5 * d - (c.height - E)));
			var T = -(v - 0.5 * d);
			R = N.makeVList(
				{
					positionType: "individualShift",
					children: [
						{ type: "elem", elem: c, shift: E },
						{ type: "elem", elem: u, shift: T },
						{ type: "elem", elem: s, shift: -m },
					],
				},
				t
			);
		} else {
			var _ = m - s.depth - (c.height - E);
			_ < b && ((m += 0.5 * (b - _)), (E += 0.5 * (b - _))),
				(R = N.makeVList(
					{
						positionType: "individualShift",
						children: [
							{ type: "elem", elem: c, shift: E },
							{ type: "elem", elem: s, shift: -m },
						],
					},
					t
				));
		}
		(a = t.havingStyle(r)),
			(R.height *= a.sizeMultiplier / t.sizeMultiplier),
			(R.depth *= a.sizeMultiplier / t.sizeMultiplier);
		var M;
		r.size === be.DISPLAY.size
			? (M = t.fontMetrics().delim1)
			: r.size === be.SCRIPTSCRIPT.size
			? (M = t.havingStyle(be.SCRIPT).fontMetrics().delim2)
			: (M = t.fontMetrics().delim2);
		var O, B;
		return (
			e.leftDelim == null
				? (O = Wa(t, ["mopen"]))
				: (O = Or.customSizedDelim(
						e.leftDelim,
						M,
						!0,
						t.havingStyle(r),
						e.mode,
						["mopen"]
				  )),
			e.continued
				? (B = N.makeSpan([]))
				: e.rightDelim == null
				? (B = Wa(t, ["mclose"]))
				: (B = Or.customSizedDelim(
						e.rightDelim,
						M,
						!0,
						t.havingStyle(r),
						e.mode,
						["mclose"]
				  )),
			N.makeSpan(
				["mord"].concat(a.sizingClasses(t)),
				[O, N.makeSpan(["mfrac"], [R]), B],
				t
			)
		);
	},
	Du = (e, t) => {
		var r = new X.MathNode("mfrac", [Fe(e.numer, t), Fe(e.denom, t)]);
		if (!e.hasBarLine) r.setAttribute("linethickness", "0px");
		else if (e.barSize) {
			var n = Xe(e.barSize, t);
			r.setAttribute("linethickness", re(n));
		}
		var i = F4(e.size, t.style);
		if (i.size !== t.style.size) {
			r = new X.MathNode("mstyle", [r]);
			var a = i.size === be.DISPLAY.size ? "true" : "false";
			r.setAttribute("displaystyle", a), r.setAttribute("scriptlevel", "0");
		}
		if (e.leftDelim != null || e.rightDelim != null) {
			var s = [];
			if (e.leftDelim != null) {
				var o = new X.MathNode("mo", [
					new X.TextNode(e.leftDelim.replace("\\", "")),
				]);
				o.setAttribute("fence", "true"), s.push(o);
			}
			if ((s.push(r), e.rightDelim != null)) {
				var l = new X.MathNode("mo", [
					new X.TextNode(e.rightDelim.replace("\\", "")),
				]);
				l.setAttribute("fence", "true"), s.push(l);
			}
			return xu(s);
		}
		return r;
	};
le({
	type: "genfrac",
	names: [
		"\\dfrac",
		"\\frac",
		"\\tfrac",
		"\\dbinom",
		"\\binom",
		"\\tbinom",
		"\\\\atopfrac",
		"\\\\bracefrac",
		"\\\\brackfrac",
	],
	props: { numArgs: 2, allowedInArgument: !0 },
	handler: (e, t) => {
		var { parser: r, funcName: n } = e,
			i = t[0],
			a = t[1],
			s,
			o = null,
			l = null,
			c = "auto";
		switch (n) {
			case "\\dfrac":
			case "\\frac":
			case "\\tfrac":
				s = !0;
				break;
			case "\\\\atopfrac":
				s = !1;
				break;
			case "\\dbinom":
			case "\\binom":
			case "\\tbinom":
				(s = !1), (o = "("), (l = ")");
				break;
			case "\\\\bracefrac":
				(s = !1), (o = "\\{"), (l = "\\}");
				break;
			case "\\\\brackfrac":
				(s = !1), (o = "["), (l = "]");
				break;
			default:
				throw new Error("Unrecognized genfrac command");
		}
		switch (n) {
			case "\\dfrac":
			case "\\dbinom":
				c = "display";
				break;
			case "\\tfrac":
			case "\\tbinom":
				c = "text";
				break;
		}
		return {
			type: "genfrac",
			mode: r.mode,
			continued: !1,
			numer: i,
			denom: a,
			hasBarLine: s,
			leftDelim: o,
			rightDelim: l,
			size: c,
			barSize: null,
		};
	},
	htmlBuilder: Iu,
	mathmlBuilder: Du,
});
le({
	type: "genfrac",
	names: ["\\cfrac"],
	props: { numArgs: 2 },
	handler: (e, t) => {
		var { parser: r, funcName: n } = e,
			i = t[0],
			a = t[1];
		return {
			type: "genfrac",
			mode: r.mode,
			continued: !0,
			numer: i,
			denom: a,
			hasBarLine: !0,
			leftDelim: null,
			rightDelim: null,
			size: "display",
			barSize: null,
		};
	},
});
le({
	type: "infix",
	names: ["\\over", "\\choose", "\\atop", "\\brace", "\\brack"],
	props: { numArgs: 0, infix: !0 },
	handler(e) {
		var { parser: t, funcName: r, token: n } = e,
			i;
		switch (r) {
			case "\\over":
				i = "\\frac";
				break;
			case "\\choose":
				i = "\\binom";
				break;
			case "\\atop":
				i = "\\\\atopfrac";
				break;
			case "\\brace":
				i = "\\\\bracefrac";
				break;
			case "\\brack":
				i = "\\\\brackfrac";
				break;
			default:
				throw new Error("Unrecognized infix genfrac command");
		}
		return { type: "infix", mode: t.mode, replaceWith: i, token: n };
	},
});
var uh = ["display", "text", "script", "scriptscript"],
	fh = function (t) {
		var r = null;
		return t.length > 0 && ((r = t), (r = r === "." ? null : r)), r;
	};
le({
	type: "genfrac",
	names: ["\\genfrac"],
	props: {
		numArgs: 6,
		allowedInArgument: !0,
		argTypes: ["math", "math", "size", "text", "math", "math"],
	},
	handler(e, t) {
		var { parser: r } = e,
			n = t[4],
			i = t[5],
			a = ko(t[0]),
			s = a.type === "atom" && a.family === "open" ? fh(a.text) : null,
			o = ko(t[1]),
			l = o.type === "atom" && o.family === "close" ? fh(o.text) : null,
			c = ke(t[2], "size"),
			u,
			d = null;
		c.isBlank ? (u = !0) : ((d = c.value), (u = d.number > 0));
		var p = "auto",
			m = t[3];
		if (m.type === "ordgroup") {
			if (m.body.length > 0) {
				var b = ke(m.body[0], "textord");
				p = uh[Number(b.text)];
			}
		} else (m = ke(m, "textord")), (p = uh[Number(m.text)]);
		return {
			type: "genfrac",
			mode: r.mode,
			numer: n,
			denom: i,
			continued: !1,
			hasBarLine: u,
			barSize: d,
			leftDelim: s,
			rightDelim: l,
			size: p,
		};
	},
	htmlBuilder: Iu,
	mathmlBuilder: Du,
});
le({
	type: "infix",
	names: ["\\above"],
	props: { numArgs: 1, argTypes: ["size"], infix: !0 },
	handler(e, t) {
		var { parser: r, funcName: n, token: i } = e;
		return {
			type: "infix",
			mode: r.mode,
			replaceWith: "\\\\abovefrac",
			size: ke(t[0], "size").value,
			token: i,
		};
	},
});
le({
	type: "genfrac",
	names: ["\\\\abovefrac"],
	props: { numArgs: 3, argTypes: ["math", "size", "math"] },
	handler: (e, t) => {
		var { parser: r, funcName: n } = e,
			i = t[0],
			a = rv(ke(t[1], "infix").size),
			s = t[2],
			o = a.number > 0;
		return {
			type: "genfrac",
			mode: r.mode,
			numer: i,
			denom: s,
			continued: !1,
			hasBarLine: o,
			barSize: a,
			leftDelim: null,
			rightDelim: null,
			size: "auto",
		};
	},
	htmlBuilder: Iu,
	mathmlBuilder: Du,
});
var H4 = (e, t) => {
		var r = t.style,
			n,
			i;
		e.type === "supsub"
			? ((n = e.sup
					? Be(e.sup, t.havingStyle(r.sup()), t)
					: Be(e.sub, t.havingStyle(r.sub()), t)),
			  (i = ke(e.base, "horizBrace")))
			: (i = ke(e, "horizBrace"));
		var a = Be(i.base, t.havingBaseStyle(be.DISPLAY)),
			s = Pr.svgSpan(i, t),
			o;
		if (
			(i.isOver
				? ((o = N.makeVList(
						{
							positionType: "firstBaseline",
							children: [
								{ type: "elem", elem: a },
								{ type: "kern", size: 0.1 },
								{ type: "elem", elem: s },
							],
						},
						t
				  )),
				  o.children[0].children[0].children[1].classes.push("svg-align"))
				: ((o = N.makeVList(
						{
							positionType: "bottom",
							positionData: a.depth + 0.1 + s.height,
							children: [
								{ type: "elem", elem: s },
								{ type: "kern", size: 0.1 },
								{ type: "elem", elem: a },
							],
						},
						t
				  )),
				  o.children[0].children[0].children[0].classes.push("svg-align")),
			n)
		) {
			var l = N.makeSpan(["mord", i.isOver ? "mover" : "munder"], [o], t);
			i.isOver
				? (o = N.makeVList(
						{
							positionType: "firstBaseline",
							children: [
								{ type: "elem", elem: l },
								{ type: "kern", size: 0.2 },
								{ type: "elem", elem: n },
							],
						},
						t
				  ))
				: (o = N.makeVList(
						{
							positionType: "bottom",
							positionData: l.depth + 0.2 + n.height + n.depth,
							children: [
								{ type: "elem", elem: n },
								{ type: "kern", size: 0.2 },
								{ type: "elem", elem: l },
							],
						},
						t
				  ));
		}
		return N.makeSpan(["mord", i.isOver ? "mover" : "munder"], [o], t);
	},
	k9 = (e, t) => {
		var r = Pr.mathMLnode(e.label);
		return new X.MathNode(e.isOver ? "mover" : "munder", [Fe(e.base, t), r]);
	};
le({
	type: "horizBrace",
	names: ["\\overbrace", "\\underbrace"],
	props: { numArgs: 1 },
	handler(e, t) {
		var { parser: r, funcName: n } = e;
		return {
			type: "horizBrace",
			mode: r.mode,
			label: n,
			isOver: /^\\over/.test(n),
			base: t[0],
		};
	},
	htmlBuilder: H4,
	mathmlBuilder: k9,
});
le({
	type: "href",
	names: ["\\href"],
	props: { numArgs: 2, argTypes: ["url", "original"], allowedInText: !0 },
	handler: (e, t) => {
		var { parser: r } = e,
			n = t[1],
			i = ke(t[0], "url").url;
		return r.settings.isTrusted({ command: "\\href", url: i })
			? { type: "href", mode: r.mode, href: i, body: nt(n) }
			: r.formatUnsupportedCmd("\\href");
	},
	htmlBuilder: (e, t) => {
		var r = ot(e.body, t, !1);
		return N.makeAnchor(e.href, [], r, t);
	},
	mathmlBuilder: (e, t) => {
		var r = En(e.body, t);
		return (
			r instanceof Ht || (r = new Ht("mrow", [r])),
			r.setAttribute("href", e.href),
			r
		);
	},
});
le({
	type: "href",
	names: ["\\url"],
	props: { numArgs: 1, argTypes: ["url"], allowedInText: !0 },
	handler: (e, t) => {
		var { parser: r } = e,
			n = ke(t[0], "url").url;
		if (!r.settings.isTrusted({ command: "\\url", url: n }))
			return r.formatUnsupportedCmd("\\url");
		for (var i = [], a = 0; a < n.length; a++) {
			var s = n[a];
			s === "~" && (s = "\\textasciitilde"),
				i.push({ type: "textord", mode: "text", text: s });
		}
		var o = { type: "text", mode: r.mode, font: "\\texttt", body: i };
		return { type: "href", mode: r.mode, href: n, body: nt(o) };
	},
});
le({
	type: "hbox",
	names: ["\\hbox"],
	props: { numArgs: 1, argTypes: ["text"], allowedInText: !0, primitive: !0 },
	handler(e, t) {
		var { parser: r } = e;
		return { type: "hbox", mode: r.mode, body: nt(t[0]) };
	},
	htmlBuilder(e, t) {
		var r = ot(e.body, t, !1);
		return N.makeFragment(r);
	},
	mathmlBuilder(e, t) {
		return new X.MathNode("mrow", It(e.body, t));
	},
});
le({
	type: "html",
	names: ["\\htmlClass", "\\htmlId", "\\htmlStyle", "\\htmlData"],
	props: { numArgs: 2, argTypes: ["raw", "original"], allowedInText: !0 },
	handler: (e, t) => {
		var { parser: r, funcName: n, token: i } = e,
			a = ke(t[0], "raw").string,
			s = t[1];
		r.settings.strict &&
			r.settings.reportNonstrict(
				"htmlExtension",
				"HTML extension is disabled on strict mode"
			);
		var o,
			l = {};
		switch (n) {
			case "\\htmlClass":
				(l.class = a), (o = { command: "\\htmlClass", class: a });
				break;
			case "\\htmlId":
				(l.id = a), (o = { command: "\\htmlId", id: a });
				break;
			case "\\htmlStyle":
				(l.style = a), (o = { command: "\\htmlStyle", style: a });
				break;
			case "\\htmlData": {
				for (var c = a.split(","), u = 0; u < c.length; u++) {
					var d = c[u].split("=");
					if (d.length !== 2)
						throw new Z("Error parsing key-value for \\htmlData");
					l["data-" + d[0].trim()] = d[1].trim();
				}
				o = { command: "\\htmlData", attributes: l };
				break;
			}
			default:
				throw new Error("Unrecognized html command");
		}
		return r.settings.isTrusted(o)
			? { type: "html", mode: r.mode, attributes: l, body: nt(s) }
			: r.formatUnsupportedCmd(n);
	},
	htmlBuilder: (e, t) => {
		var r = ot(e.body, t, !1),
			n = ["enclosing"];
		e.attributes.class && n.push(...e.attributes.class.trim().split(/\s+/));
		var i = N.makeSpan(n, r, t);
		for (var a in e.attributes)
			a !== "class" &&
				e.attributes.hasOwnProperty(a) &&
				i.setAttribute(a, e.attributes[a]);
		return i;
	},
	mathmlBuilder: (e, t) => En(e.body, t),
});
le({
	type: "htmlmathml",
	names: ["\\html@mathml"],
	props: { numArgs: 2, allowedInText: !0 },
	handler: (e, t) => {
		var { parser: r } = e;
		return {
			type: "htmlmathml",
			mode: r.mode,
			html: nt(t[0]),
			mathml: nt(t[1]),
		};
	},
	htmlBuilder: (e, t) => {
		var r = ot(e.html, t, !1);
		return N.makeFragment(r);
	},
	mathmlBuilder: (e, t) => En(e.mathml, t),
});
var Q0 = function (t) {
	if (/^[-+]? *(\d+(\.\d*)?|\.\d+)$/.test(t)) return { number: +t, unit: "bp" };
	var r = /([-+]?) *(\d+(?:\.\d*)?|\.\d+) *([a-z]{2})/.exec(t);
	if (!r) throw new Z("Invalid size: '" + t + "' in \\includegraphics");
	var n = { number: +(r[1] + r[2]), unit: r[3] };
	if (!s4(n))
		throw new Z("Invalid unit: '" + n.unit + "' in \\includegraphics.");
	return n;
};
le({
	type: "includegraphics",
	names: ["\\includegraphics"],
	props: {
		numArgs: 1,
		numOptionalArgs: 1,
		argTypes: ["raw", "url"],
		allowedInText: !1,
	},
	handler: (e, t, r) => {
		var { parser: n } = e,
			i = { number: 0, unit: "em" },
			a = { number: 0.9, unit: "em" },
			s = { number: 0, unit: "em" },
			o = "";
		if (r[0])
			for (
				var l = ke(r[0], "raw").string, c = l.split(","), u = 0;
				u < c.length;
				u++
			) {
				var d = c[u].split("=");
				if (d.length === 2) {
					var p = d[1].trim();
					switch (d[0].trim()) {
						case "alt":
							o = p;
							break;
						case "width":
							i = Q0(p);
							break;
						case "height":
							a = Q0(p);
							break;
						case "totalheight":
							s = Q0(p);
							break;
						default:
							throw new Z("Invalid key: '" + d[0] + "' in \\includegraphics.");
					}
				}
			}
		var m = ke(t[0], "url").url;
		return (
			o === "" &&
				((o = m),
				(o = o.replace(/^.*[\\/]/, "")),
				(o = o.substring(0, o.lastIndexOf(".")))),
			n.settings.isTrusted({ command: "\\includegraphics", url: m })
				? {
						type: "includegraphics",
						mode: n.mode,
						alt: o,
						width: i,
						height: a,
						totalheight: s,
						src: m,
				  }
				: n.formatUnsupportedCmd("\\includegraphics")
		);
	},
	htmlBuilder: (e, t) => {
		var r = Xe(e.height, t),
			n = 0;
		e.totalheight.number > 0 && (n = Xe(e.totalheight, t) - r);
		var i = 0;
		e.width.number > 0 && (i = Xe(e.width, t));
		var a = { height: re(r + n) };
		i > 0 && (a.width = re(i)), n > 0 && (a.verticalAlign = re(-n));
		var s = new kv(e.src, e.alt, a);
		return (s.height = r), (s.depth = n), s;
	},
	mathmlBuilder: (e, t) => {
		var r = new X.MathNode("mglyph", []);
		r.setAttribute("alt", e.alt);
		var n = Xe(e.height, t),
			i = 0;
		if (
			(e.totalheight.number > 0 &&
				((i = Xe(e.totalheight, t) - n), r.setAttribute("valign", re(-i))),
			r.setAttribute("height", re(n + i)),
			e.width.number > 0)
		) {
			var a = Xe(e.width, t);
			r.setAttribute("width", re(a));
		}
		return r.setAttribute("src", e.src), r;
	},
});
le({
	type: "kern",
	names: ["\\kern", "\\mkern", "\\hskip", "\\mskip"],
	props: { numArgs: 1, argTypes: ["size"], primitive: !0, allowedInText: !0 },
	handler(e, t) {
		var { parser: r, funcName: n } = e,
			i = ke(t[0], "size");
		if (r.settings.strict) {
			var a = n[1] === "m",
				s = i.value.unit === "mu";
			a
				? (s ||
						r.settings.reportNonstrict(
							"mathVsTextUnits",
							"LaTeX's " +
								n +
								" supports only mu units, " +
								("not " + i.value.unit + " units")
						),
				  r.mode !== "math" &&
						r.settings.reportNonstrict(
							"mathVsTextUnits",
							"LaTeX's " + n + " works only in math mode"
						))
				: s &&
				  r.settings.reportNonstrict(
						"mathVsTextUnits",
						"LaTeX's " + n + " doesn't support mu units"
				  );
		}
		return { type: "kern", mode: r.mode, dimension: i.value };
	},
	htmlBuilder(e, t) {
		return N.makeGlue(e.dimension, t);
	},
	mathmlBuilder(e, t) {
		var r = Xe(e.dimension, t);
		return new X.SpaceNode(r);
	},
});
le({
	type: "lap",
	names: ["\\mathllap", "\\mathrlap", "\\mathclap"],
	props: { numArgs: 1, allowedInText: !0 },
	handler: (e, t) => {
		var { parser: r, funcName: n } = e,
			i = t[0];
		return { type: "lap", mode: r.mode, alignment: n.slice(5), body: i };
	},
	htmlBuilder: (e, t) => {
		var r;
		e.alignment === "clap"
			? ((r = N.makeSpan([], [Be(e.body, t)])),
			  (r = N.makeSpan(["inner"], [r], t)))
			: (r = N.makeSpan(["inner"], [Be(e.body, t)]));
		var n = N.makeSpan(["fix"], []),
			i = N.makeSpan([e.alignment], [r, n], t),
			a = N.makeSpan(["strut"]);
		return (
			(a.style.height = re(i.height + i.depth)),
			i.depth && (a.style.verticalAlign = re(-i.depth)),
			i.children.unshift(a),
			(i = N.makeSpan(["thinbox"], [i], t)),
			N.makeSpan(["mord", "vbox"], [i], t)
		);
	},
	mathmlBuilder: (e, t) => {
		var r = new X.MathNode("mpadded", [Fe(e.body, t)]);
		if (e.alignment !== "rlap") {
			var n = e.alignment === "llap" ? "-1" : "-0.5";
			r.setAttribute("lspace", n + "width");
		}
		return r.setAttribute("width", "0px"), r;
	},
});
le({
	type: "styling",
	names: ["\\(", "$"],
	props: { numArgs: 0, allowedInText: !0, allowedInMath: !1 },
	handler(e, t) {
		var { funcName: r, parser: n } = e,
			i = n.mode;
		n.switchMode("math");
		var a = r === "\\(" ? "\\)" : "$",
			s = n.parseExpression(!1, a);
		return (
			n.expect(a),
			n.switchMode(i),
			{ type: "styling", mode: n.mode, style: "text", body: s }
		);
	},
});
le({
	type: "text",
	names: ["\\)", "\\]"],
	props: { numArgs: 0, allowedInText: !0, allowedInMath: !1 },
	handler(e, t) {
		throw new Z("Mismatched " + e.funcName);
	},
});
var dh = (e, t) => {
	switch (t.style.size) {
		case be.DISPLAY.size:
			return e.display;
		case be.TEXT.size:
			return e.text;
		case be.SCRIPT.size:
			return e.script;
		case be.SCRIPTSCRIPT.size:
			return e.scriptscript;
		default:
			return e.text;
	}
};
le({
	type: "mathchoice",
	names: ["\\mathchoice"],
	props: { numArgs: 4, primitive: !0 },
	handler: (e, t) => {
		var { parser: r } = e;
		return {
			type: "mathchoice",
			mode: r.mode,
			display: nt(t[0]),
			text: nt(t[1]),
			script: nt(t[2]),
			scriptscript: nt(t[3]),
		};
	},
	htmlBuilder: (e, t) => {
		var r = dh(e, t),
			n = ot(r, t, !1);
		return N.makeFragment(n);
	},
	mathmlBuilder: (e, t) => {
		var r = dh(e, t);
		return En(r, t);
	},
});
var U4 = (e, t, r, n, i, a, s) => {
		e = N.makeSpan([], [e]);
		var o = r && _e.isCharacterBox(r),
			l,
			c;
		if (t) {
			var u = Be(t, n.havingStyle(i.sup()), n);
			c = {
				elem: u,
				kern: Math.max(
					n.fontMetrics().bigOpSpacing1,
					n.fontMetrics().bigOpSpacing3 - u.depth
				),
			};
		}
		if (r) {
			var d = Be(r, n.havingStyle(i.sub()), n);
			l = {
				elem: d,
				kern: Math.max(
					n.fontMetrics().bigOpSpacing2,
					n.fontMetrics().bigOpSpacing4 - d.height
				),
			};
		}
		var p;
		if (c && l) {
			var m =
				n.fontMetrics().bigOpSpacing5 +
				l.elem.height +
				l.elem.depth +
				l.kern +
				e.depth +
				s;
			p = N.makeVList(
				{
					positionType: "bottom",
					positionData: m,
					children: [
						{ type: "kern", size: n.fontMetrics().bigOpSpacing5 },
						{ type: "elem", elem: l.elem, marginLeft: re(-a) },
						{ type: "kern", size: l.kern },
						{ type: "elem", elem: e },
						{ type: "kern", size: c.kern },
						{ type: "elem", elem: c.elem, marginLeft: re(a) },
						{ type: "kern", size: n.fontMetrics().bigOpSpacing5 },
					],
				},
				n
			);
		} else if (l) {
			var b = e.height - s;
			p = N.makeVList(
				{
					positionType: "top",
					positionData: b,
					children: [
						{ type: "kern", size: n.fontMetrics().bigOpSpacing5 },
						{ type: "elem", elem: l.elem, marginLeft: re(-a) },
						{ type: "kern", size: l.kern },
						{ type: "elem", elem: e },
					],
				},
				n
			);
		} else if (c) {
			var E = e.depth + s;
			p = N.makeVList(
				{
					positionType: "bottom",
					positionData: E,
					children: [
						{ type: "elem", elem: e },
						{ type: "kern", size: c.kern },
						{ type: "elem", elem: c.elem, marginLeft: re(a) },
						{ type: "kern", size: n.fontMetrics().bigOpSpacing5 },
					],
				},
				n
			);
		} else return e;
		var R = [p];
		if (l && a !== 0 && !o) {
			var _ = N.makeSpan(["mspace"], [], n);
			(_.style.marginRight = re(a)), R.unshift(_);
		}
		return N.makeSpan(["mop", "op-limits"], R, n);
	},
	j4 = ["\\smallint"],
	ra = (e, t) => {
		var r,
			n,
			i = !1,
			a;
		e.type === "supsub"
			? ((r = e.sup), (n = e.sub), (a = ke(e.base, "op")), (i = !0))
			: (a = ke(e, "op"));
		var s = t.style,
			o = !1;
		s.size === be.DISPLAY.size &&
			a.symbol &&
			!_e.contains(j4, a.name) &&
			(o = !0);
		var l;
		if (a.symbol) {
			var c = o ? "Size2-Regular" : "Size1-Regular",
				u = "";
			if (
				((a.name === "\\oiint" || a.name === "\\oiiint") &&
					((u = a.name.slice(1)),
					(a.name = u === "oiint" ? "\\iint" : "\\iiint")),
				(l = N.makeSymbol(a.name, c, "math", t, [
					"mop",
					"op-symbol",
					o ? "large-op" : "small-op",
				])),
				u.length > 0)
			) {
				var d = l.italic,
					p = N.staticSvg(u + "Size" + (o ? "2" : "1"), t);
				(l = N.makeVList(
					{
						positionType: "individualShift",
						children: [
							{ type: "elem", elem: l, shift: 0 },
							{ type: "elem", elem: p, shift: o ? 0.08 : 0 },
						],
					},
					t
				)),
					(a.name = "\\" + u),
					l.classes.unshift("mop"),
					(l.italic = d);
			}
		} else if (a.body) {
			var m = ot(a.body, t, !0);
			m.length === 1 && m[0] instanceof Wt
				? ((l = m[0]), (l.classes[0] = "mop"))
				: (l = N.makeSpan(["mop"], m, t));
		} else {
			for (var b = [], E = 1; E < a.name.length; E++)
				b.push(N.mathsym(a.name[E], a.mode, t));
			l = N.makeSpan(["mop"], b, t);
		}
		var R = 0,
			_ = 0;
		return (
			(l instanceof Wt || a.name === "\\oiint" || a.name === "\\oiiint") &&
				!a.suppressBaseShift &&
				((R = (l.height - l.depth) / 2 - t.fontMetrics().axisHeight),
				(_ = l.italic)),
			i
				? U4(l, r, n, t, s, _, R)
				: (R && ((l.style.position = "relative"), (l.style.top = re(R))), l)
		);
	},
	ms = (e, t) => {
		var r;
		if (e.symbol)
			(r = new Ht("mo", [Vt(e.name, e.mode)])),
				_e.contains(j4, e.name) && r.setAttribute("largeop", "false");
		else if (e.body) r = new Ht("mo", It(e.body, t));
		else {
			r = new Ht("mi", [new Ma(e.name.slice(1))]);
			var n = new Ht("mo", [Vt("⁡", "text")]);
			e.parentIsSupSub ? (r = new Ht("mrow", [r, n])) : (r = y4([r, n]));
		}
		return r;
	},
	A9 = {
		"∏": "\\prod",
		"∐": "\\coprod",
		"∑": "\\sum",
		"⋀": "\\bigwedge",
		"⋁": "\\bigvee",
		"⋂": "\\bigcap",
		"⋃": "\\bigcup",
		"⨀": "\\bigodot",
		"⨁": "\\bigoplus",
		"⨂": "\\bigotimes",
		"⨄": "\\biguplus",
		"⨆": "\\bigsqcup",
	};
le({
	type: "op",
	names: [
		"\\coprod",
		"\\bigvee",
		"\\bigwedge",
		"\\biguplus",
		"\\bigcap",
		"\\bigcup",
		"\\intop",
		"\\prod",
		"\\sum",
		"\\bigotimes",
		"\\bigoplus",
		"\\bigodot",
		"\\bigsqcup",
		"\\smallint",
		"∏",
		"∐",
		"∑",
		"⋀",
		"⋁",
		"⋂",
		"⋃",
		"⨀",
		"⨁",
		"⨂",
		"⨄",
		"⨆",
	],
	props: { numArgs: 0 },
	handler: (e, t) => {
		var { parser: r, funcName: n } = e,
			i = n;
		return (
			i.length === 1 && (i = A9[i]),
			{
				type: "op",
				mode: r.mode,
				limits: !0,
				parentIsSupSub: !1,
				symbol: !0,
				name: i,
			}
		);
	},
	htmlBuilder: ra,
	mathmlBuilder: ms,
});
le({
	type: "op",
	names: ["\\mathop"],
	props: { numArgs: 1, primitive: !0 },
	handler: (e, t) => {
		var { parser: r } = e,
			n = t[0];
		return {
			type: "op",
			mode: r.mode,
			limits: !1,
			parentIsSupSub: !1,
			symbol: !1,
			body: nt(n),
		};
	},
	htmlBuilder: ra,
	mathmlBuilder: ms,
});
var R9 = {
	"∫": "\\int",
	"∬": "\\iint",
	"∭": "\\iiint",
	"∮": "\\oint",
	"∯": "\\oiint",
	"∰": "\\oiiint",
};
le({
	type: "op",
	names: [
		"\\arcsin",
		"\\arccos",
		"\\arctan",
		"\\arctg",
		"\\arcctg",
		"\\arg",
		"\\ch",
		"\\cos",
		"\\cosec",
		"\\cosh",
		"\\cot",
		"\\cotg",
		"\\coth",
		"\\csc",
		"\\ctg",
		"\\cth",
		"\\deg",
		"\\dim",
		"\\exp",
		"\\hom",
		"\\ker",
		"\\lg",
		"\\ln",
		"\\log",
		"\\sec",
		"\\sin",
		"\\sinh",
		"\\sh",
		"\\tan",
		"\\tanh",
		"\\tg",
		"\\th",
	],
	props: { numArgs: 0 },
	handler(e) {
		var { parser: t, funcName: r } = e;
		return {
			type: "op",
			mode: t.mode,
			limits: !1,
			parentIsSupSub: !1,
			symbol: !1,
			name: r,
		};
	},
	htmlBuilder: ra,
	mathmlBuilder: ms,
});
le({
	type: "op",
	names: [
		"\\det",
		"\\gcd",
		"\\inf",
		"\\lim",
		"\\max",
		"\\min",
		"\\Pr",
		"\\sup",
	],
	props: { numArgs: 0 },
	handler(e) {
		var { parser: t, funcName: r } = e;
		return {
			type: "op",
			mode: t.mode,
			limits: !0,
			parentIsSupSub: !1,
			symbol: !1,
			name: r,
		};
	},
	htmlBuilder: ra,
	mathmlBuilder: ms,
});
le({
	type: "op",
	names: [
		"\\int",
		"\\iint",
		"\\iiint",
		"\\oint",
		"\\oiint",
		"\\oiiint",
		"∫",
		"∬",
		"∭",
		"∮",
		"∯",
		"∰",
	],
	props: { numArgs: 0 },
	handler(e) {
		var { parser: t, funcName: r } = e,
			n = r;
		return (
			n.length === 1 && (n = R9[n]),
			{
				type: "op",
				mode: t.mode,
				limits: !1,
				parentIsSupSub: !1,
				symbol: !0,
				name: n,
			}
		);
	},
	htmlBuilder: ra,
	mathmlBuilder: ms,
});
var q4 = (e, t) => {
		var r,
			n,
			i = !1,
			a;
		e.type === "supsub"
			? ((r = e.sup), (n = e.sub), (a = ke(e.base, "operatorname")), (i = !0))
			: (a = ke(e, "operatorname"));
		var s;
		if (a.body.length > 0) {
			for (
				var o = a.body.map((d) => {
						var p = d.text;
						return typeof p == "string"
							? { type: "textord", mode: d.mode, text: p }
							: d;
					}),
					l = ot(o, t.withFont("mathrm"), !0),
					c = 0;
				c < l.length;
				c++
			) {
				var u = l[c];
				u instanceof Wt &&
					(u.text = u.text.replace(/\u2212/, "-").replace(/\u2217/, "*"));
			}
			s = N.makeSpan(["mop"], l, t);
		} else s = N.makeSpan(["mop"], [], t);
		return i ? U4(s, r, n, t, t.style, 0, 0) : s;
	},
	M9 = (e, t) => {
		for (
			var r = It(e.body, t.withFont("mathrm")), n = !0, i = 0;
			i < r.length;
			i++
		) {
			var a = r[i];
			if (!(a instanceof X.SpaceNode))
				if (a instanceof X.MathNode)
					switch (a.type) {
						case "mi":
						case "mn":
						case "ms":
						case "mspace":
						case "mtext":
							break;
						case "mo": {
							var s = a.children[0];
							a.children.length === 1 && s instanceof X.TextNode
								? (s.text = s.text
										.replace(/\u2212/, "-")
										.replace(/\u2217/, "*"))
								: (n = !1);
							break;
						}
						default:
							n = !1;
					}
				else n = !1;
		}
		if (n) {
			var o = r.map((u) => u.toText()).join("");
			r = [new X.TextNode(o)];
		}
		var l = new X.MathNode("mi", r);
		l.setAttribute("mathvariant", "normal");
		var c = new X.MathNode("mo", [Vt("⁡", "text")]);
		return e.parentIsSupSub
			? new X.MathNode("mrow", [l, c])
			: X.newDocumentFragment([l, c]);
	};
le({
	type: "operatorname",
	names: ["\\operatorname@", "\\operatornamewithlimits"],
	props: { numArgs: 1 },
	handler: (e, t) => {
		var { parser: r, funcName: n } = e,
			i = t[0];
		return {
			type: "operatorname",
			mode: r.mode,
			body: nt(i),
			alwaysHandleSupSub: n === "\\operatornamewithlimits",
			limits: !1,
			parentIsSupSub: !1,
		};
	},
	htmlBuilder: q4,
	mathmlBuilder: M9,
});
y("\\operatorname", "\\@ifstar\\operatornamewithlimits\\operatorname@");
ti({
	type: "ordgroup",
	htmlBuilder(e, t) {
		return e.semisimple
			? N.makeFragment(ot(e.body, t, !1))
			: N.makeSpan(["mord"], ot(e.body, t, !0), t);
	},
	mathmlBuilder(e, t) {
		return En(e.body, t, !0);
	},
});
le({
	type: "overline",
	names: ["\\overline"],
	props: { numArgs: 1 },
	handler(e, t) {
		var { parser: r } = e,
			n = t[0];
		return { type: "overline", mode: r.mode, body: n };
	},
	htmlBuilder(e, t) {
		var r = Be(e.body, t.havingCrampedStyle()),
			n = N.makeLineSpan("overline-line", t),
			i = t.fontMetrics().defaultRuleThickness,
			a = N.makeVList(
				{
					positionType: "firstBaseline",
					children: [
						{ type: "elem", elem: r },
						{ type: "kern", size: 3 * i },
						{ type: "elem", elem: n },
						{ type: "kern", size: i },
					],
				},
				t
			);
		return N.makeSpan(["mord", "overline"], [a], t);
	},
	mathmlBuilder(e, t) {
		var r = new X.MathNode("mo", [new X.TextNode("‾")]);
		r.setAttribute("stretchy", "true");
		var n = new X.MathNode("mover", [Fe(e.body, t), r]);
		return n.setAttribute("accent", "true"), n;
	},
});
le({
	type: "phantom",
	names: ["\\phantom"],
	props: { numArgs: 1, allowedInText: !0 },
	handler: (e, t) => {
		var { parser: r } = e,
			n = t[0];
		return { type: "phantom", mode: r.mode, body: nt(n) };
	},
	htmlBuilder: (e, t) => {
		var r = ot(e.body, t.withPhantom(), !1);
		return N.makeFragment(r);
	},
	mathmlBuilder: (e, t) => {
		var r = It(e.body, t);
		return new X.MathNode("mphantom", r);
	},
});
le({
	type: "hphantom",
	names: ["\\hphantom"],
	props: { numArgs: 1, allowedInText: !0 },
	handler: (e, t) => {
		var { parser: r } = e,
			n = t[0];
		return { type: "hphantom", mode: r.mode, body: n };
	},
	htmlBuilder: (e, t) => {
		var r = N.makeSpan([], [Be(e.body, t.withPhantom())]);
		if (((r.height = 0), (r.depth = 0), r.children))
			for (var n = 0; n < r.children.length; n++)
				(r.children[n].height = 0), (r.children[n].depth = 0);
		return (
			(r = N.makeVList(
				{
					positionType: "firstBaseline",
					children: [{ type: "elem", elem: r }],
				},
				t
			)),
			N.makeSpan(["mord"], [r], t)
		);
	},
	mathmlBuilder: (e, t) => {
		var r = It(nt(e.body), t),
			n = new X.MathNode("mphantom", r),
			i = new X.MathNode("mpadded", [n]);
		return i.setAttribute("height", "0px"), i.setAttribute("depth", "0px"), i;
	},
});
le({
	type: "vphantom",
	names: ["\\vphantom"],
	props: { numArgs: 1, allowedInText: !0 },
	handler: (e, t) => {
		var { parser: r } = e,
			n = t[0];
		return { type: "vphantom", mode: r.mode, body: n };
	},
	htmlBuilder: (e, t) => {
		var r = N.makeSpan(["inner"], [Be(e.body, t.withPhantom())]),
			n = N.makeSpan(["fix"], []);
		return N.makeSpan(["mord", "rlap"], [r, n], t);
	},
	mathmlBuilder: (e, t) => {
		var r = It(nt(e.body), t),
			n = new X.MathNode("mphantom", r),
			i = new X.MathNode("mpadded", [n]);
		return i.setAttribute("width", "0px"), i;
	},
});
le({
	type: "raisebox",
	names: ["\\raisebox"],
	props: { numArgs: 2, argTypes: ["size", "hbox"], allowedInText: !0 },
	handler(e, t) {
		var { parser: r } = e,
			n = ke(t[0], "size").value,
			i = t[1];
		return { type: "raisebox", mode: r.mode, dy: n, body: i };
	},
	htmlBuilder(e, t) {
		var r = Be(e.body, t),
			n = Xe(e.dy, t);
		return N.makeVList(
			{
				positionType: "shift",
				positionData: -n,
				children: [{ type: "elem", elem: r }],
			},
			t
		);
	},
	mathmlBuilder(e, t) {
		var r = new X.MathNode("mpadded", [Fe(e.body, t)]),
			n = e.dy.number + e.dy.unit;
		return r.setAttribute("voffset", n), r;
	},
});
le({
	type: "internal",
	names: ["\\relax"],
	props: { numArgs: 0, allowedInText: !0 },
	handler(e) {
		var { parser: t } = e;
		return { type: "internal", mode: t.mode };
	},
});
le({
	type: "rule",
	names: ["\\rule"],
	props: { numArgs: 2, numOptionalArgs: 1, argTypes: ["size", "size", "size"] },
	handler(e, t, r) {
		var { parser: n } = e,
			i = r[0],
			a = ke(t[0], "size"),
			s = ke(t[1], "size");
		return {
			type: "rule",
			mode: n.mode,
			shift: i && ke(i, "size").value,
			width: a.value,
			height: s.value,
		};
	},
	htmlBuilder(e, t) {
		var r = N.makeSpan(["mord", "rule"], [], t),
			n = Xe(e.width, t),
			i = Xe(e.height, t),
			a = e.shift ? Xe(e.shift, t) : 0;
		return (
			(r.style.borderRightWidth = re(n)),
			(r.style.borderTopWidth = re(i)),
			(r.style.bottom = re(a)),
			(r.width = n),
			(r.height = i + a),
			(r.depth = -a),
			(r.maxFontSize = i * 1.125 * t.sizeMultiplier),
			r
		);
	},
	mathmlBuilder(e, t) {
		var r = Xe(e.width, t),
			n = Xe(e.height, t),
			i = e.shift ? Xe(e.shift, t) : 0,
			a = (t.color && t.getColor()) || "black",
			s = new X.MathNode("mspace");
		s.setAttribute("mathbackground", a),
			s.setAttribute("width", re(r)),
			s.setAttribute("height", re(n));
		var o = new X.MathNode("mpadded", [s]);
		return (
			i >= 0
				? o.setAttribute("height", re(i))
				: (o.setAttribute("height", re(i)), o.setAttribute("depth", re(-i))),
			o.setAttribute("voffset", re(i)),
			o
		);
	},
});
function G4(e, t, r) {
	for (
		var n = ot(e, t, !1), i = t.sizeMultiplier / r.sizeMultiplier, a = 0;
		a < n.length;
		a++
	) {
		var s = n[a].classes.indexOf("sizing");
		s < 0
			? Array.prototype.push.apply(n[a].classes, t.sizingClasses(r))
			: n[a].classes[s + 1] === "reset-size" + t.size &&
			  (n[a].classes[s + 1] = "reset-size" + r.size),
			(n[a].height *= i),
			(n[a].depth *= i);
	}
	return N.makeFragment(n);
}
var hh = [
		"\\tiny",
		"\\sixptsize",
		"\\scriptsize",
		"\\footnotesize",
		"\\small",
		"\\normalsize",
		"\\large",
		"\\Large",
		"\\LARGE",
		"\\huge",
		"\\Huge",
	],
	O9 = (e, t) => {
		var r = t.havingSize(e.size);
		return G4(e.body, r, t);
	};
le({
	type: "sizing",
	names: hh,
	props: { numArgs: 0, allowedInText: !0 },
	handler: (e, t) => {
		var { breakOnTokenText: r, funcName: n, parser: i } = e,
			a = i.parseExpression(!1, r);
		return { type: "sizing", mode: i.mode, size: hh.indexOf(n) + 1, body: a };
	},
	htmlBuilder: O9,
	mathmlBuilder: (e, t) => {
		var r = t.havingSize(e.size),
			n = It(e.body, r),
			i = new X.MathNode("mstyle", n);
		return i.setAttribute("mathsize", re(r.sizeMultiplier)), i;
	},
});
le({
	type: "smash",
	names: ["\\smash"],
	props: { numArgs: 1, numOptionalArgs: 1, allowedInText: !0 },
	handler: (e, t, r) => {
		var { parser: n } = e,
			i = !1,
			a = !1,
			s = r[0] && ke(r[0], "ordgroup");
		if (s)
			for (var o = "", l = 0; l < s.body.length; ++l) {
				var c = s.body[l];
				if (((o = c.text), o === "t")) i = !0;
				else if (o === "b") a = !0;
				else {
					(i = !1), (a = !1);
					break;
				}
			}
		else (i = !0), (a = !0);
		var u = t[0];
		return {
			type: "smash",
			mode: n.mode,
			body: u,
			smashHeight: i,
			smashDepth: a,
		};
	},
	htmlBuilder: (e, t) => {
		var r = N.makeSpan([], [Be(e.body, t)]);
		if (!e.smashHeight && !e.smashDepth) return r;
		if (e.smashHeight && ((r.height = 0), r.children))
			for (var n = 0; n < r.children.length; n++) r.children[n].height = 0;
		if (e.smashDepth && ((r.depth = 0), r.children))
			for (var i = 0; i < r.children.length; i++) r.children[i].depth = 0;
		var a = N.makeVList(
			{ positionType: "firstBaseline", children: [{ type: "elem", elem: r }] },
			t
		);
		return N.makeSpan(["mord"], [a], t);
	},
	mathmlBuilder: (e, t) => {
		var r = new X.MathNode("mpadded", [Fe(e.body, t)]);
		return (
			e.smashHeight && r.setAttribute("height", "0px"),
			e.smashDepth && r.setAttribute("depth", "0px"),
			r
		);
	},
});
le({
	type: "sqrt",
	names: ["\\sqrt"],
	props: { numArgs: 1, numOptionalArgs: 1 },
	handler(e, t, r) {
		var { parser: n } = e,
			i = r[0],
			a = t[0];
		return { type: "sqrt", mode: n.mode, body: a, index: i };
	},
	htmlBuilder(e, t) {
		var r = Be(e.body, t.havingCrampedStyle());
		r.height === 0 && (r.height = t.fontMetrics().xHeight),
			(r = N.wrapFragment(r, t));
		var n = t.fontMetrics(),
			i = n.defaultRuleThickness,
			a = i;
		t.style.id < be.TEXT.id && (a = t.fontMetrics().xHeight);
		var s = i + a / 4,
			o = r.height + r.depth + s + i,
			{ span: l, ruleWidth: c, advanceWidth: u } = Or.sqrtImage(o, t),
			d = l.height - c;
		d > r.height + r.depth + s && (s = (s + d - r.height - r.depth) / 2);
		var p = l.height - r.height - s - c;
		r.style.paddingLeft = re(u);
		var m = N.makeVList(
			{
				positionType: "firstBaseline",
				children: [
					{ type: "elem", elem: r, wrapperClasses: ["svg-align"] },
					{ type: "kern", size: -(r.height + p) },
					{ type: "elem", elem: l },
					{ type: "kern", size: c },
				],
			},
			t
		);
		if (e.index) {
			var b = t.havingStyle(be.SCRIPTSCRIPT),
				E = Be(e.index, b, t),
				R = 0.6 * (m.height - m.depth),
				_ = N.makeVList(
					{
						positionType: "shift",
						positionData: -R,
						children: [{ type: "elem", elem: E }],
					},
					t
				),
				v = N.makeSpan(["root"], [_]);
			return N.makeSpan(["mord", "sqrt"], [v, m], t);
		} else return N.makeSpan(["mord", "sqrt"], [m], t);
	},
	mathmlBuilder(e, t) {
		var { body: r, index: n } = e;
		return n
			? new X.MathNode("mroot", [Fe(r, t), Fe(n, t)])
			: new X.MathNode("msqrt", [Fe(r, t)]);
	},
});
var ph = {
	display: be.DISPLAY,
	text: be.TEXT,
	script: be.SCRIPT,
	scriptscript: be.SCRIPTSCRIPT,
};
le({
	type: "styling",
	names: [
		"\\displaystyle",
		"\\textstyle",
		"\\scriptstyle",
		"\\scriptscriptstyle",
	],
	props: { numArgs: 0, allowedInText: !0, primitive: !0 },
	handler(e, t) {
		var { breakOnTokenText: r, funcName: n, parser: i } = e,
			a = i.parseExpression(!0, r),
			s = n.slice(1, n.length - 5);
		return { type: "styling", mode: i.mode, style: s, body: a };
	},
	htmlBuilder(e, t) {
		var r = ph[e.style],
			n = t.havingStyle(r).withFont("");
		return G4(e.body, n, t);
	},
	mathmlBuilder(e, t) {
		var r = ph[e.style],
			n = t.havingStyle(r),
			i = It(e.body, n),
			a = new X.MathNode("mstyle", i),
			s = {
				display: ["0", "true"],
				text: ["0", "false"],
				script: ["1", "false"],
				scriptscript: ["2", "false"],
			},
			o = s[e.style];
		return (
			a.setAttribute("scriptlevel", o[0]),
			a.setAttribute("displaystyle", o[1]),
			a
		);
	},
});
var N9 = function (t, r) {
	var n = t.base;
	if (n)
		if (n.type === "op") {
			var i =
				n.limits && (r.style.size === be.DISPLAY.size || n.alwaysHandleSupSub);
			return i ? ra : null;
		} else if (n.type === "operatorname") {
			var a =
				n.alwaysHandleSupSub && (r.style.size === be.DISPLAY.size || n.limits);
			return a ? q4 : null;
		} else {
			if (n.type === "accent") return _e.isCharacterBox(n.base) ? Au : null;
			if (n.type === "horizBrace") {
				var s = !t.sub;
				return s === n.isOver ? H4 : null;
			} else return null;
		}
	else return null;
};
ti({
	type: "supsub",
	htmlBuilder(e, t) {
		var r = N9(e, t);
		if (r) return r(e, t);
		var { base: n, sup: i, sub: a } = e,
			s = Be(n, t),
			o,
			l,
			c = t.fontMetrics(),
			u = 0,
			d = 0,
			p = n && _e.isCharacterBox(n);
		if (i) {
			var m = t.havingStyle(t.style.sup());
			(o = Be(i, m, t)),
				p ||
					(u =
						s.height -
						(m.fontMetrics().supDrop * m.sizeMultiplier) / t.sizeMultiplier);
		}
		if (a) {
			var b = t.havingStyle(t.style.sub());
			(l = Be(a, b, t)),
				p ||
					(d =
						s.depth +
						(b.fontMetrics().subDrop * b.sizeMultiplier) / t.sizeMultiplier);
		}
		var E;
		t.style === be.DISPLAY
			? (E = c.sup1)
			: t.style.cramped
			? (E = c.sup3)
			: (E = c.sup2);
		var R = t.sizeMultiplier,
			_ = re(0.5 / c.ptPerEm / R),
			v = null;
		if (l) {
			var T =
				e.base &&
				e.base.type === "op" &&
				e.base.name &&
				(e.base.name === "\\oiint" || e.base.name === "\\oiiint");
			(s instanceof Wt || T) && (v = re(-s.italic));
		}
		var M;
		if (o && l) {
			(u = Math.max(u, E, o.depth + 0.25 * c.xHeight)),
				(d = Math.max(d, c.sub2));
			var O = c.defaultRuleThickness,
				B = 4 * O;
			if (u - o.depth - (l.height - d) < B) {
				d = B - (u - o.depth) + l.height;
				var z = 0.8 * c.xHeight - (u - o.depth);
				z > 0 && ((u += z), (d -= z));
			}
			var D = [
				{ type: "elem", elem: l, shift: d, marginRight: _, marginLeft: v },
				{ type: "elem", elem: o, shift: -u, marginRight: _ },
			];
			M = N.makeVList({ positionType: "individualShift", children: D }, t);
		} else if (l) {
			d = Math.max(d, c.sub1, l.height - 0.8 * c.xHeight);
			var H = [{ type: "elem", elem: l, marginLeft: v, marginRight: _ }];
			M = N.makeVList(
				{ positionType: "shift", positionData: d, children: H },
				t
			);
		} else if (o)
			(u = Math.max(u, E, o.depth + 0.25 * c.xHeight)),
				(M = N.makeVList(
					{
						positionType: "shift",
						positionData: -u,
						children: [{ type: "elem", elem: o, marginRight: _ }],
					},
					t
				));
		else throw new Error("supsub must have either sup or sub.");
		var Q = rc(s, "right") || "mord";
		return N.makeSpan([Q], [s, N.makeSpan(["msupsub"], [M])], t);
	},
	mathmlBuilder(e, t) {
		var r = !1,
			n,
			i;
		e.base &&
			e.base.type === "horizBrace" &&
			((i = !!e.sup), i === e.base.isOver && ((r = !0), (n = e.base.isOver))),
			e.base &&
				(e.base.type === "op" || e.base.type === "operatorname") &&
				(e.base.parentIsSupSub = !0);
		var a = [Fe(e.base, t)];
		e.sub && a.push(Fe(e.sub, t)), e.sup && a.push(Fe(e.sup, t));
		var s;
		if (r) s = n ? "mover" : "munder";
		else if (e.sub)
			if (e.sup) {
				var c = e.base;
				(c && c.type === "op" && c.limits && t.style === be.DISPLAY) ||
				(c &&
					c.type === "operatorname" &&
					c.alwaysHandleSupSub &&
					(t.style === be.DISPLAY || c.limits))
					? (s = "munderover")
					: (s = "msubsup");
			} else {
				var l = e.base;
				(l &&
					l.type === "op" &&
					l.limits &&
					(t.style === be.DISPLAY || l.alwaysHandleSupSub)) ||
				(l &&
					l.type === "operatorname" &&
					l.alwaysHandleSupSub &&
					(l.limits || t.style === be.DISPLAY))
					? (s = "munder")
					: (s = "msub");
			}
		else {
			var o = e.base;
			(o &&
				o.type === "op" &&
				o.limits &&
				(t.style === be.DISPLAY || o.alwaysHandleSupSub)) ||
			(o &&
				o.type === "operatorname" &&
				o.alwaysHandleSupSub &&
				(o.limits || t.style === be.DISPLAY))
				? (s = "mover")
				: (s = "msup");
		}
		return new X.MathNode(s, a);
	},
});
ti({
	type: "atom",
	htmlBuilder(e, t) {
		return N.mathsym(e.text, e.mode, t, ["m" + e.family]);
	},
	mathmlBuilder(e, t) {
		var r = new X.MathNode("mo", [Vt(e.text, e.mode)]);
		if (e.family === "bin") {
			var n = Tu(e, t);
			n === "bold-italic" && r.setAttribute("mathvariant", n);
		} else
			e.family === "punct"
				? r.setAttribute("separator", "true")
				: (e.family === "open" || e.family === "close") &&
				  r.setAttribute("stretchy", "false");
		return r;
	},
});
var Y4 = { mi: "italic", mn: "normal", mtext: "normal" };
ti({
	type: "mathord",
	htmlBuilder(e, t) {
		return N.makeOrd(e, t, "mathord");
	},
	mathmlBuilder(e, t) {
		var r = new X.MathNode("mi", [Vt(e.text, e.mode, t)]),
			n = Tu(e, t) || "italic";
		return n !== Y4[r.type] && r.setAttribute("mathvariant", n), r;
	},
});
ti({
	type: "textord",
	htmlBuilder(e, t) {
		return N.makeOrd(e, t, "textord");
	},
	mathmlBuilder(e, t) {
		var r = Vt(e.text, e.mode, t),
			n = Tu(e, t) || "normal",
			i;
		return (
			e.mode === "text"
				? (i = new X.MathNode("mtext", [r]))
				: /[0-9]/.test(e.text)
				? (i = new X.MathNode("mn", [r]))
				: e.text === "\\prime"
				? (i = new X.MathNode("mo", [r]))
				: (i = new X.MathNode("mi", [r])),
			n !== Y4[i.type] && i.setAttribute("mathvariant", n),
			i
		);
	},
});
var el = { "\\nobreak": "nobreak", "\\allowbreak": "allowbreak" },
	tl = {
		" ": {},
		"\\ ": {},
		"~": { className: "nobreak" },
		"\\space": {},
		"\\nobreakspace": { className: "nobreak" },
	};
ti({
	type: "spacing",
	htmlBuilder(e, t) {
		if (tl.hasOwnProperty(e.text)) {
			var r = tl[e.text].className || "";
			if (e.mode === "text") {
				var n = N.makeOrd(e, t, "textord");
				return n.classes.push(r), n;
			} else
				return N.makeSpan(["mspace", r], [N.mathsym(e.text, e.mode, t)], t);
		} else {
			if (el.hasOwnProperty(e.text))
				return N.makeSpan(["mspace", el[e.text]], [], t);
			throw new Z('Unknown type of space "' + e.text + '"');
		}
	},
	mathmlBuilder(e, t) {
		var r;
		if (tl.hasOwnProperty(e.text))
			r = new X.MathNode("mtext", [new X.TextNode(" ")]);
		else {
			if (el.hasOwnProperty(e.text)) return new X.MathNode("mspace");
			throw new Z('Unknown type of space "' + e.text + '"');
		}
		return r;
	},
});
var mh = () => {
	var e = new X.MathNode("mtd", []);
	return e.setAttribute("width", "50%"), e;
};
ti({
	type: "tag",
	mathmlBuilder(e, t) {
		var r = new X.MathNode("mtable", [
			new X.MathNode("mtr", [
				mh(),
				new X.MathNode("mtd", [En(e.body, t)]),
				mh(),
				new X.MathNode("mtd", [En(e.tag, t)]),
			]),
		]);
		return r.setAttribute("width", "100%"), r;
	},
});
var gh = {
		"\\text": void 0,
		"\\textrm": "textrm",
		"\\textsf": "textsf",
		"\\texttt": "texttt",
		"\\textnormal": "textrm",
	},
	yh = { "\\textbf": "textbf", "\\textmd": "textmd" },
	C9 = { "\\textit": "textit", "\\textup": "textup" },
	bh = (e, t) => {
		var r = e.font;
		return r
			? gh[r]
				? t.withTextFontFamily(gh[r])
				: yh[r]
				? t.withTextFontWeight(yh[r])
				: t.withTextFontShape(C9[r])
			: t;
	};
le({
	type: "text",
	names: [
		"\\text",
		"\\textrm",
		"\\textsf",
		"\\texttt",
		"\\textnormal",
		"\\textbf",
		"\\textmd",
		"\\textit",
		"\\textup",
	],
	props: {
		numArgs: 1,
		argTypes: ["text"],
		allowedInArgument: !0,
		allowedInText: !0,
	},
	handler(e, t) {
		var { parser: r, funcName: n } = e,
			i = t[0];
		return { type: "text", mode: r.mode, body: nt(i), font: n };
	},
	htmlBuilder(e, t) {
		var r = bh(e, t),
			n = ot(e.body, r, !0);
		return N.makeSpan(["mord", "text"], n, r);
	},
	mathmlBuilder(e, t) {
		var r = bh(e, t);
		return En(e.body, r);
	},
});
le({
	type: "underline",
	names: ["\\underline"],
	props: { numArgs: 1, allowedInText: !0 },
	handler(e, t) {
		var { parser: r } = e;
		return { type: "underline", mode: r.mode, body: t[0] };
	},
	htmlBuilder(e, t) {
		var r = Be(e.body, t),
			n = N.makeLineSpan("underline-line", t),
			i = t.fontMetrics().defaultRuleThickness,
			a = N.makeVList(
				{
					positionType: "top",
					positionData: r.height,
					children: [
						{ type: "kern", size: i },
						{ type: "elem", elem: n },
						{ type: "kern", size: 3 * i },
						{ type: "elem", elem: r },
					],
				},
				t
			);
		return N.makeSpan(["mord", "underline"], [a], t);
	},
	mathmlBuilder(e, t) {
		var r = new X.MathNode("mo", [new X.TextNode("‾")]);
		r.setAttribute("stretchy", "true");
		var n = new X.MathNode("munder", [Fe(e.body, t), r]);
		return n.setAttribute("accentunder", "true"), n;
	},
});
le({
	type: "vcenter",
	names: ["\\vcenter"],
	props: { numArgs: 1, argTypes: ["original"], allowedInText: !1 },
	handler(e, t) {
		var { parser: r } = e;
		return { type: "vcenter", mode: r.mode, body: t[0] };
	},
	htmlBuilder(e, t) {
		var r = Be(e.body, t),
			n = t.fontMetrics().axisHeight,
			i = 0.5 * (r.height - n - (r.depth + n));
		return N.makeVList(
			{
				positionType: "shift",
				positionData: i,
				children: [{ type: "elem", elem: r }],
			},
			t
		);
	},
	mathmlBuilder(e, t) {
		return new X.MathNode("mpadded", [Fe(e.body, t)], ["vcenter"]);
	},
});
le({
	type: "verb",
	names: ["\\verb"],
	props: { numArgs: 0, allowedInText: !0 },
	handler(e, t, r) {
		throw new Z("\\verb ended by end of line instead of matching delimiter");
	},
	htmlBuilder(e, t) {
		for (
			var r = vh(e), n = [], i = t.havingStyle(t.style.text()), a = 0;
			a < r.length;
			a++
		) {
			var s = r[a];
			s === "~" && (s = "\\textasciitilde"),
				n.push(
					N.makeSymbol(s, "Typewriter-Regular", e.mode, i, ["mord", "texttt"])
				);
		}
		return N.makeSpan(
			["mord", "text"].concat(i.sizingClasses(t)),
			N.tryCombineChars(n),
			i
		);
	},
	mathmlBuilder(e, t) {
		var r = new X.TextNode(vh(e)),
			n = new X.MathNode("mtext", [r]);
		return n.setAttribute("mathvariant", "monospace"), n;
	},
});
var vh = (e) => e.body.replace(/ /g, e.star ? "␣" : " "),
	on = m4,
	W4 = `[ \r
	]`,
	I9 = "\\\\[a-zA-Z@]+",
	D9 = "\\\\[^\uD800-\uDFFF]",
	B9 = "(" + I9 + ")" + W4 + "*",
	P9 = `\\\\(
|[ \r	]+
?)[ \r	]*`,
	sc = "[̀-ͯ]",
	L9 = new RegExp(sc + "+$"),
	z9 =
		"(" +
		W4 +
		"+)|" +
		(P9 + "|") +
		"([!-\\[\\]-‧‪-퟿豈-￿]" +
		(sc + "*") +
		"|[\uD800-\uDBFF][\uDC00-\uDFFF]" +
		(sc + "*") +
		"|\\\\verb\\*([^]).*?\\4|\\\\verb([^*a-zA-Z]).*?\\5" +
		("|" + B9) +
		("|" + D9 + ")");
class _h {
	constructor(t, r) {
		(this.input = void 0),
			(this.settings = void 0),
			(this.tokenRegex = void 0),
			(this.catcodes = void 0),
			(this.input = t),
			(this.settings = r),
			(this.tokenRegex = new RegExp(z9, "g")),
			(this.catcodes = { "%": 14, "~": 13 });
	}
	setCatcode(t, r) {
		this.catcodes[t] = r;
	}
	lex() {
		var t = this.input,
			r = this.tokenRegex.lastIndex;
		if (r === t.length) return new jt("EOF", new Bt(this, r, r));
		var n = this.tokenRegex.exec(t);
		if (n === null || n.index !== r)
			throw new Z(
				"Unexpected character: '" + t[r] + "'",
				new jt(t[r], new Bt(this, r, r + 1))
			);
		var i = n[6] || n[3] || (n[2] ? "\\ " : " ");
		if (this.catcodes[i] === 14) {
			var a = t.indexOf(
				`
`,
				this.tokenRegex.lastIndex
			);
			return (
				a === -1
					? ((this.tokenRegex.lastIndex = t.length),
					  this.settings.reportNonstrict(
							"commentAtEnd",
							"% comment has no terminating newline; LaTeX would fail because of commenting the end of math mode (e.g. $)"
					  ))
					: (this.tokenRegex.lastIndex = a + 1),
				this.lex()
			);
		}
		return new jt(i, new Bt(this, r, this.tokenRegex.lastIndex));
	}
}
class $9 {
	constructor(t, r) {
		t === void 0 && (t = {}),
			r === void 0 && (r = {}),
			(this.current = void 0),
			(this.builtins = void 0),
			(this.undefStack = void 0),
			(this.current = r),
			(this.builtins = t),
			(this.undefStack = []);
	}
	beginGroup() {
		this.undefStack.push({});
	}
	endGroup() {
		if (this.undefStack.length === 0)
			throw new Z(
				"Unbalanced namespace destruction: attempt to pop global namespace; please report this as a bug"
			);
		var t = this.undefStack.pop();
		for (var r in t)
			t.hasOwnProperty(r) &&
				(t[r] == null ? delete this.current[r] : (this.current[r] = t[r]));
	}
	endGroups() {
		for (; this.undefStack.length > 0; ) this.endGroup();
	}
	has(t) {
		return this.current.hasOwnProperty(t) || this.builtins.hasOwnProperty(t);
	}
	get(t) {
		return this.current.hasOwnProperty(t) ? this.current[t] : this.builtins[t];
	}
	set(t, r, n) {
		if ((n === void 0 && (n = !1), n)) {
			for (var i = 0; i < this.undefStack.length; i++)
				delete this.undefStack[i][t];
			this.undefStack.length > 0 &&
				(this.undefStack[this.undefStack.length - 1][t] = r);
		} else {
			var a = this.undefStack[this.undefStack.length - 1];
			a && !a.hasOwnProperty(t) && (a[t] = this.current[t]);
		}
		r == null ? delete this.current[t] : (this.current[t] = r);
	}
}
var F9 = P4;
y("\\noexpand", function (e) {
	var t = e.popToken();
	return (
		e.isExpandable(t.text) && ((t.noexpand = !0), (t.treatAsRelax = !0)),
		{ tokens: [t], numArgs: 0 }
	);
});
y("\\expandafter", function (e) {
	var t = e.popToken();
	return e.expandOnce(!0), { tokens: [t], numArgs: 0 };
});
y("\\@firstoftwo", function (e) {
	var t = e.consumeArgs(2);
	return { tokens: t[0], numArgs: 0 };
});
y("\\@secondoftwo", function (e) {
	var t = e.consumeArgs(2);
	return { tokens: t[1], numArgs: 0 };
});
y("\\@ifnextchar", function (e) {
	var t = e.consumeArgs(3);
	e.consumeSpaces();
	var r = e.future();
	return t[0].length === 1 && t[0][0].text === r.text
		? { tokens: t[1], numArgs: 0 }
		: { tokens: t[2], numArgs: 0 };
});
y("\\@ifstar", "\\@ifnextchar *{\\@firstoftwo{#1}}");
y("\\TextOrMath", function (e) {
	var t = e.consumeArgs(2);
	return e.mode === "text"
		? { tokens: t[0], numArgs: 0 }
		: { tokens: t[1], numArgs: 0 };
});
var wh = {
	0: 0,
	1: 1,
	2: 2,
	3: 3,
	4: 4,
	5: 5,
	6: 6,
	7: 7,
	8: 8,
	9: 9,
	a: 10,
	A: 10,
	b: 11,
	B: 11,
	c: 12,
	C: 12,
	d: 13,
	D: 13,
	e: 14,
	E: 14,
	f: 15,
	F: 15,
};
y("\\char", function (e) {
	var t = e.popToken(),
		r,
		n = "";
	if (t.text === "'") (r = 8), (t = e.popToken());
	else if (t.text === '"') (r = 16), (t = e.popToken());
	else if (t.text === "`")
		if (((t = e.popToken()), t.text[0] === "\\")) n = t.text.charCodeAt(1);
		else {
			if (t.text === "EOF") throw new Z("\\char` missing argument");
			n = t.text.charCodeAt(0);
		}
	else r = 10;
	if (r) {
		if (((n = wh[t.text]), n == null || n >= r))
			throw new Z("Invalid base-" + r + " digit " + t.text);
		for (var i; (i = wh[e.future().text]) != null && i < r; )
			(n *= r), (n += i), e.popToken();
	}
	return "\\@char{" + n + "}";
});
var Bu = (e, t, r) => {
	var n = e.consumeArg().tokens;
	if (n.length !== 1)
		throw new Z("\\newcommand's first argument must be a macro name");
	var i = n[0].text,
		a = e.isDefined(i);
	if (a && !t)
		throw new Z(
			"\\newcommand{" +
				i +
				"} attempting to redefine " +
				(i + "; use \\renewcommand")
		);
	if (!a && !r)
		throw new Z(
			"\\renewcommand{" +
				i +
				"} when command " +
				i +
				" does not yet exist; use \\newcommand"
		);
	var s = 0;
	if (((n = e.consumeArg().tokens), n.length === 1 && n[0].text === "[")) {
		for (
			var o = "", l = e.expandNextToken();
			l.text !== "]" && l.text !== "EOF";

		)
			(o += l.text), (l = e.expandNextToken());
		if (!o.match(/^\s*[0-9]+\s*$/))
			throw new Z("Invalid number of arguments: " + o);
		(s = parseInt(o)), (n = e.consumeArg().tokens);
	}
	return e.macros.set(i, { tokens: n, numArgs: s }), "";
};
y("\\newcommand", (e) => Bu(e, !1, !0));
y("\\renewcommand", (e) => Bu(e, !0, !1));
y("\\providecommand", (e) => Bu(e, !0, !0));
y("\\message", (e) => {
	var t = e.consumeArgs(1)[0];
	return (
		console.log(
			t
				.reverse()
				.map((r) => r.text)
				.join("")
		),
		""
	);
});
y("\\errmessage", (e) => {
	var t = e.consumeArgs(1)[0];
	return (
		console.error(
			t
				.reverse()
				.map((r) => r.text)
				.join("")
		),
		""
	);
});
y("\\show", (e) => {
	var t = e.popToken(),
		r = t.text;
	return console.log(t, e.macros.get(r), on[r], Ue.math[r], Ue.text[r]), "";
});
y("\\bgroup", "{");
y("\\egroup", "}");
y("~", "\\nobreakspace");
y("\\lq", "`");
y("\\rq", "'");
y("\\aa", "\\r a");
y("\\AA", "\\r A");
y("\\textcopyright", "\\html@mathml{\\textcircled{c}}{\\char`©}");
y("\\copyright", "\\TextOrMath{\\textcopyright}{\\text{\\textcopyright}}");
y("\\textregistered", "\\html@mathml{\\textcircled{\\scriptsize R}}{\\char`®}");
y("ℬ", "\\mathscr{B}");
y("ℰ", "\\mathscr{E}");
y("ℱ", "\\mathscr{F}");
y("ℋ", "\\mathscr{H}");
y("ℐ", "\\mathscr{I}");
y("ℒ", "\\mathscr{L}");
y("ℳ", "\\mathscr{M}");
y("ℛ", "\\mathscr{R}");
y("ℭ", "\\mathfrak{C}");
y("ℌ", "\\mathfrak{H}");
y("ℨ", "\\mathfrak{Z}");
y("\\Bbbk", "\\Bbb{k}");
y("·", "\\cdotp");
y("\\llap", "\\mathllap{\\textrm{#1}}");
y("\\rlap", "\\mathrlap{\\textrm{#1}}");
y("\\clap", "\\mathclap{\\textrm{#1}}");
y("\\mathstrut", "\\vphantom{(}");
y("\\underbar", "\\underline{\\text{#1}}");
y("\\not", '\\html@mathml{\\mathrel{\\mathrlap\\@not}}{\\char"338}');
y("\\neq", "\\html@mathml{\\mathrel{\\not=}}{\\mathrel{\\char`≠}}");
y("\\ne", "\\neq");
y("≠", "\\neq");
y(
	"\\notin",
	"\\html@mathml{\\mathrel{{\\in}\\mathllap{/\\mskip1mu}}}{\\mathrel{\\char`∉}}"
);
y("∉", "\\notin");
y(
	"≘",
	"\\html@mathml{\\mathrel{=\\kern{-1em}\\raisebox{0.4em}{$\\scriptsize\\frown$}}}{\\mathrel{\\char`≘}}"
);
y("≙", "\\html@mathml{\\stackrel{\\tiny\\wedge}{=}}{\\mathrel{\\char`≘}}");
y("≚", "\\html@mathml{\\stackrel{\\tiny\\vee}{=}}{\\mathrel{\\char`≚}}");
y("≛", "\\html@mathml{\\stackrel{\\scriptsize\\star}{=}}{\\mathrel{\\char`≛}}");
y(
	"≝",
	"\\html@mathml{\\stackrel{\\tiny\\mathrm{def}}{=}}{\\mathrel{\\char`≝}}"
);
y("≞", "\\html@mathml{\\stackrel{\\tiny\\mathrm{m}}{=}}{\\mathrel{\\char`≞}}");
y("≟", "\\html@mathml{\\stackrel{\\tiny?}{=}}{\\mathrel{\\char`≟}}");
y("⟂", "\\perp");
y("‼", "\\mathclose{!\\mkern-0.8mu!}");
y("∌", "\\notni");
y("⌜", "\\ulcorner");
y("⌝", "\\urcorner");
y("⌞", "\\llcorner");
y("⌟", "\\lrcorner");
y("©", "\\copyright");
y("®", "\\textregistered");
y("️", "\\textregistered");
y("\\ulcorner", '\\html@mathml{\\@ulcorner}{\\mathop{\\char"231c}}');
y("\\urcorner", '\\html@mathml{\\@urcorner}{\\mathop{\\char"231d}}');
y("\\llcorner", '\\html@mathml{\\@llcorner}{\\mathop{\\char"231e}}');
y("\\lrcorner", '\\html@mathml{\\@lrcorner}{\\mathop{\\char"231f}}');
y("\\vdots", "\\mathord{\\varvdots\\rule{0pt}{15pt}}");
y("⋮", "\\vdots");
y("\\varGamma", "\\mathit{\\Gamma}");
y("\\varDelta", "\\mathit{\\Delta}");
y("\\varTheta", "\\mathit{\\Theta}");
y("\\varLambda", "\\mathit{\\Lambda}");
y("\\varXi", "\\mathit{\\Xi}");
y("\\varPi", "\\mathit{\\Pi}");
y("\\varSigma", "\\mathit{\\Sigma}");
y("\\varUpsilon", "\\mathit{\\Upsilon}");
y("\\varPhi", "\\mathit{\\Phi}");
y("\\varPsi", "\\mathit{\\Psi}");
y("\\varOmega", "\\mathit{\\Omega}");
y("\\substack", "\\begin{subarray}{c}#1\\end{subarray}");
y(
	"\\colon",
	"\\nobreak\\mskip2mu\\mathpunct{}\\mathchoice{\\mkern-3mu}{\\mkern-3mu}{}{}{:}\\mskip6mu\\relax"
);
y("\\boxed", "\\fbox{$\\displaystyle{#1}$}");
y("\\iff", "\\DOTSB\\;\\Longleftrightarrow\\;");
y("\\implies", "\\DOTSB\\;\\Longrightarrow\\;");
y("\\impliedby", "\\DOTSB\\;\\Longleftarrow\\;");
var Sh = {
	",": "\\dotsc",
	"\\not": "\\dotsb",
	"+": "\\dotsb",
	"=": "\\dotsb",
	"<": "\\dotsb",
	">": "\\dotsb",
	"-": "\\dotsb",
	"*": "\\dotsb",
	":": "\\dotsb",
	"\\DOTSB": "\\dotsb",
	"\\coprod": "\\dotsb",
	"\\bigvee": "\\dotsb",
	"\\bigwedge": "\\dotsb",
	"\\biguplus": "\\dotsb",
	"\\bigcap": "\\dotsb",
	"\\bigcup": "\\dotsb",
	"\\prod": "\\dotsb",
	"\\sum": "\\dotsb",
	"\\bigotimes": "\\dotsb",
	"\\bigoplus": "\\dotsb",
	"\\bigodot": "\\dotsb",
	"\\bigsqcup": "\\dotsb",
	"\\And": "\\dotsb",
	"\\longrightarrow": "\\dotsb",
	"\\Longrightarrow": "\\dotsb",
	"\\longleftarrow": "\\dotsb",
	"\\Longleftarrow": "\\dotsb",
	"\\longleftrightarrow": "\\dotsb",
	"\\Longleftrightarrow": "\\dotsb",
	"\\mapsto": "\\dotsb",
	"\\longmapsto": "\\dotsb",
	"\\hookrightarrow": "\\dotsb",
	"\\doteq": "\\dotsb",
	"\\mathbin": "\\dotsb",
	"\\mathrel": "\\dotsb",
	"\\relbar": "\\dotsb",
	"\\Relbar": "\\dotsb",
	"\\xrightarrow": "\\dotsb",
	"\\xleftarrow": "\\dotsb",
	"\\DOTSI": "\\dotsi",
	"\\int": "\\dotsi",
	"\\oint": "\\dotsi",
	"\\iint": "\\dotsi",
	"\\iiint": "\\dotsi",
	"\\iiiint": "\\dotsi",
	"\\idotsint": "\\dotsi",
	"\\DOTSX": "\\dotsx",
};
y("\\dots", function (e) {
	var t = "\\dotso",
		r = e.expandAfterFuture().text;
	return (
		r in Sh
			? (t = Sh[r])
			: (r.slice(0, 4) === "\\not" ||
					(r in Ue.math && _e.contains(["bin", "rel"], Ue.math[r].group))) &&
			  (t = "\\dotsb"),
		t
	);
});
var Pu = {
	")": !0,
	"]": !0,
	"\\rbrack": !0,
	"\\}": !0,
	"\\rbrace": !0,
	"\\rangle": !0,
	"\\rceil": !0,
	"\\rfloor": !0,
	"\\rgroup": !0,
	"\\rmoustache": !0,
	"\\right": !0,
	"\\bigr": !0,
	"\\biggr": !0,
	"\\Bigr": !0,
	"\\Biggr": !0,
	$: !0,
	";": !0,
	".": !0,
	",": !0,
};
y("\\dotso", function (e) {
	var t = e.future().text;
	return t in Pu ? "\\ldots\\," : "\\ldots";
});
y("\\dotsc", function (e) {
	var t = e.future().text;
	return t in Pu && t !== "," ? "\\ldots\\," : "\\ldots";
});
y("\\cdots", function (e) {
	var t = e.future().text;
	return t in Pu ? "\\@cdots\\," : "\\@cdots";
});
y("\\dotsb", "\\cdots");
y("\\dotsm", "\\cdots");
y("\\dotsi", "\\!\\cdots");
y("\\dotsx", "\\ldots\\,");
y("\\DOTSI", "\\relax");
y("\\DOTSB", "\\relax");
y("\\DOTSX", "\\relax");
y("\\tmspace", "\\TextOrMath{\\kern#1#3}{\\mskip#1#2}\\relax");
y("\\,", "\\tmspace+{3mu}{.1667em}");
y("\\thinspace", "\\,");
y("\\>", "\\mskip{4mu}");
y("\\:", "\\tmspace+{4mu}{.2222em}");
y("\\medspace", "\\:");
y("\\;", "\\tmspace+{5mu}{.2777em}");
y("\\thickspace", "\\;");
y("\\!", "\\tmspace-{3mu}{.1667em}");
y("\\negthinspace", "\\!");
y("\\negmedspace", "\\tmspace-{4mu}{.2222em}");
y("\\negthickspace", "\\tmspace-{5mu}{.277em}");
y("\\enspace", "\\kern.5em ");
y("\\enskip", "\\hskip.5em\\relax");
y("\\quad", "\\hskip1em\\relax");
y("\\qquad", "\\hskip2em\\relax");
y("\\tag", "\\@ifstar\\tag@literal\\tag@paren");
y("\\tag@paren", "\\tag@literal{({#1})}");
y("\\tag@literal", (e) => {
	if (e.macros.get("\\df@tag")) throw new Z("Multiple \\tag");
	return "\\gdef\\df@tag{\\text{#1}}";
});
y(
	"\\bmod",
	"\\mathchoice{\\mskip1mu}{\\mskip1mu}{\\mskip5mu}{\\mskip5mu}\\mathbin{\\rm mod}\\mathchoice{\\mskip1mu}{\\mskip1mu}{\\mskip5mu}{\\mskip5mu}"
);
y(
	"\\pod",
	"\\allowbreak\\mathchoice{\\mkern18mu}{\\mkern8mu}{\\mkern8mu}{\\mkern8mu}(#1)"
);
y("\\pmod", "\\pod{{\\rm mod}\\mkern6mu#1}");
y(
	"\\mod",
	"\\allowbreak\\mathchoice{\\mkern18mu}{\\mkern12mu}{\\mkern12mu}{\\mkern12mu}{\\rm mod}\\,\\,#1"
);
y("\\newline", "\\\\\\relax");
y(
	"\\TeX",
	"\\textrm{\\html@mathml{T\\kern-.1667em\\raisebox{-.5ex}{E}\\kern-.125emX}{TeX}}"
);
var V4 = re(
	dr["Main-Regular"]["T".charCodeAt(0)][1] -
		0.7 * dr["Main-Regular"]["A".charCodeAt(0)][1]
);
y(
	"\\LaTeX",
	"\\textrm{\\html@mathml{" +
		("L\\kern-.36em\\raisebox{" + V4 + "}{\\scriptstyle A}") +
		"\\kern-.15em\\TeX}{LaTeX}}"
);
y(
	"\\KaTeX",
	"\\textrm{\\html@mathml{" +
		("K\\kern-.17em\\raisebox{" + V4 + "}{\\scriptstyle A}") +
		"\\kern-.15em\\TeX}{KaTeX}}"
);
y("\\hspace", "\\@ifstar\\@hspacer\\@hspace");
y("\\@hspace", "\\hskip #1\\relax");
y("\\@hspacer", "\\rule{0pt}{0pt}\\hskip #1\\relax");
y("\\ordinarycolon", ":");
y("\\vcentcolon", "\\mathrel{\\mathop\\ordinarycolon}");
y(
	"\\dblcolon",
	'\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-.9mu}\\vcentcolon}}{\\mathop{\\char"2237}}'
);
y(
	"\\coloneqq",
	'\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}=}}{\\mathop{\\char"2254}}'
);
y(
	"\\Coloneqq",
	'\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}=}}{\\mathop{\\char"2237\\char"3d}}'
);
y(
	"\\coloneq",
	'\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}}}{\\mathop{\\char"3a\\char"2212}}'
);
y(
	"\\Coloneq",
	'\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}}}{\\mathop{\\char"2237\\char"2212}}'
);
y(
	"\\eqqcolon",
	'\\html@mathml{\\mathrel{=\\mathrel{\\mkern-1.2mu}\\vcentcolon}}{\\mathop{\\char"2255}}'
);
y(
	"\\Eqqcolon",
	'\\html@mathml{\\mathrel{=\\mathrel{\\mkern-1.2mu}\\dblcolon}}{\\mathop{\\char"3d\\char"2237}}'
);
y(
	"\\eqcolon",
	'\\html@mathml{\\mathrel{\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\vcentcolon}}{\\mathop{\\char"2239}}'
);
y(
	"\\Eqcolon",
	'\\html@mathml{\\mathrel{\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\dblcolon}}{\\mathop{\\char"2212\\char"2237}}'
);
y(
	"\\colonapprox",
	'\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\approx}}{\\mathop{\\char"3a\\char"2248}}'
);
y(
	"\\Colonapprox",
	'\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\approx}}{\\mathop{\\char"2237\\char"2248}}'
);
y(
	"\\colonsim",
	'\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\sim}}{\\mathop{\\char"3a\\char"223c}}'
);
y(
	"\\Colonsim",
	'\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\sim}}{\\mathop{\\char"2237\\char"223c}}'
);
y("∷", "\\dblcolon");
y("∹", "\\eqcolon");
y("≔", "\\coloneqq");
y("≕", "\\eqqcolon");
y("⩴", "\\Coloneqq");
y("\\ratio", "\\vcentcolon");
y("\\coloncolon", "\\dblcolon");
y("\\colonequals", "\\coloneqq");
y("\\coloncolonequals", "\\Coloneqq");
y("\\equalscolon", "\\eqqcolon");
y("\\equalscoloncolon", "\\Eqqcolon");
y("\\colonminus", "\\coloneq");
y("\\coloncolonminus", "\\Coloneq");
y("\\minuscolon", "\\eqcolon");
y("\\minuscoloncolon", "\\Eqcolon");
y("\\coloncolonapprox", "\\Colonapprox");
y("\\coloncolonsim", "\\Colonsim");
y("\\simcolon", "\\mathrel{\\sim\\mathrel{\\mkern-1.2mu}\\vcentcolon}");
y("\\simcoloncolon", "\\mathrel{\\sim\\mathrel{\\mkern-1.2mu}\\dblcolon}");
y("\\approxcolon", "\\mathrel{\\approx\\mathrel{\\mkern-1.2mu}\\vcentcolon}");
y(
	"\\approxcoloncolon",
	"\\mathrel{\\approx\\mathrel{\\mkern-1.2mu}\\dblcolon}"
);
y("\\notni", "\\html@mathml{\\not\\ni}{\\mathrel{\\char`∌}}");
y("\\limsup", "\\DOTSB\\operatorname*{lim\\,sup}");
y("\\liminf", "\\DOTSB\\operatorname*{lim\\,inf}");
y("\\injlim", "\\DOTSB\\operatorname*{inj\\,lim}");
y("\\projlim", "\\DOTSB\\operatorname*{proj\\,lim}");
y("\\varlimsup", "\\DOTSB\\operatorname*{\\overline{lim}}");
y("\\varliminf", "\\DOTSB\\operatorname*{\\underline{lim}}");
y("\\varinjlim", "\\DOTSB\\operatorname*{\\underrightarrow{lim}}");
y("\\varprojlim", "\\DOTSB\\operatorname*{\\underleftarrow{lim}}");
y("\\gvertneqq", "\\html@mathml{\\@gvertneqq}{≩}");
y("\\lvertneqq", "\\html@mathml{\\@lvertneqq}{≨}");
y("\\ngeqq", "\\html@mathml{\\@ngeqq}{≱}");
y("\\ngeqslant", "\\html@mathml{\\@ngeqslant}{≱}");
y("\\nleqq", "\\html@mathml{\\@nleqq}{≰}");
y("\\nleqslant", "\\html@mathml{\\@nleqslant}{≰}");
y("\\nshortmid", "\\html@mathml{\\@nshortmid}{∤}");
y("\\nshortparallel", "\\html@mathml{\\@nshortparallel}{∦}");
y("\\nsubseteqq", "\\html@mathml{\\@nsubseteqq}{⊈}");
y("\\nsupseteqq", "\\html@mathml{\\@nsupseteqq}{⊉}");
y("\\varsubsetneq", "\\html@mathml{\\@varsubsetneq}{⊊}");
y("\\varsubsetneqq", "\\html@mathml{\\@varsubsetneqq}{⫋}");
y("\\varsupsetneq", "\\html@mathml{\\@varsupsetneq}{⊋}");
y("\\varsupsetneqq", "\\html@mathml{\\@varsupsetneqq}{⫌}");
y("\\imath", "\\html@mathml{\\@imath}{ı}");
y("\\jmath", "\\html@mathml{\\@jmath}{ȷ}");
y(
	"\\llbracket",
	"\\html@mathml{\\mathopen{[\\mkern-3.2mu[}}{\\mathopen{\\char`⟦}}"
);
y(
	"\\rrbracket",
	"\\html@mathml{\\mathclose{]\\mkern-3.2mu]}}{\\mathclose{\\char`⟧}}"
);
y("⟦", "\\llbracket");
y("⟧", "\\rrbracket");
y(
	"\\lBrace",
	"\\html@mathml{\\mathopen{\\{\\mkern-3.2mu[}}{\\mathopen{\\char`⦃}}"
);
y(
	"\\rBrace",
	"\\html@mathml{\\mathclose{]\\mkern-3.2mu\\}}}{\\mathclose{\\char`⦄}}"
);
y("⦃", "\\lBrace");
y("⦄", "\\rBrace");
y(
	"\\minuso",
	"\\mathbin{\\html@mathml{{\\mathrlap{\\mathchoice{\\kern{0.145em}}{\\kern{0.145em}}{\\kern{0.1015em}}{\\kern{0.0725em}}\\circ}{-}}}{\\char`⦵}}"
);
y("⦵", "\\minuso");
y("\\darr", "\\downarrow");
y("\\dArr", "\\Downarrow");
y("\\Darr", "\\Downarrow");
y("\\lang", "\\langle");
y("\\rang", "\\rangle");
y("\\uarr", "\\uparrow");
y("\\uArr", "\\Uparrow");
y("\\Uarr", "\\Uparrow");
y("\\N", "\\mathbb{N}");
y("\\R", "\\mathbb{R}");
y("\\Z", "\\mathbb{Z}");
y("\\alef", "\\aleph");
y("\\alefsym", "\\aleph");
y("\\Alpha", "\\mathrm{A}");
y("\\Beta", "\\mathrm{B}");
y("\\bull", "\\bullet");
y("\\Chi", "\\mathrm{X}");
y("\\clubs", "\\clubsuit");
y("\\cnums", "\\mathbb{C}");
y("\\Complex", "\\mathbb{C}");
y("\\Dagger", "\\ddagger");
y("\\diamonds", "\\diamondsuit");
y("\\empty", "\\emptyset");
y("\\Epsilon", "\\mathrm{E}");
y("\\Eta", "\\mathrm{H}");
y("\\exist", "\\exists");
y("\\harr", "\\leftrightarrow");
y("\\hArr", "\\Leftrightarrow");
y("\\Harr", "\\Leftrightarrow");
y("\\hearts", "\\heartsuit");
y("\\image", "\\Im");
y("\\infin", "\\infty");
y("\\Iota", "\\mathrm{I}");
y("\\isin", "\\in");
y("\\Kappa", "\\mathrm{K}");
y("\\larr", "\\leftarrow");
y("\\lArr", "\\Leftarrow");
y("\\Larr", "\\Leftarrow");
y("\\lrarr", "\\leftrightarrow");
y("\\lrArr", "\\Leftrightarrow");
y("\\Lrarr", "\\Leftrightarrow");
y("\\Mu", "\\mathrm{M}");
y("\\natnums", "\\mathbb{N}");
y("\\Nu", "\\mathrm{N}");
y("\\Omicron", "\\mathrm{O}");
y("\\plusmn", "\\pm");
y("\\rarr", "\\rightarrow");
y("\\rArr", "\\Rightarrow");
y("\\Rarr", "\\Rightarrow");
y("\\real", "\\Re");
y("\\reals", "\\mathbb{R}");
y("\\Reals", "\\mathbb{R}");
y("\\Rho", "\\mathrm{P}");
y("\\sdot", "\\cdot");
y("\\sect", "\\S");
y("\\spades", "\\spadesuit");
y("\\sub", "\\subset");
y("\\sube", "\\subseteq");
y("\\supe", "\\supseteq");
y("\\Tau", "\\mathrm{T}");
y("\\thetasym", "\\vartheta");
y("\\weierp", "\\wp");
y("\\Zeta", "\\mathrm{Z}");
y("\\argmin", "\\DOTSB\\operatorname*{arg\\,min}");
y("\\argmax", "\\DOTSB\\operatorname*{arg\\,max}");
y("\\plim", "\\DOTSB\\mathop{\\operatorname{plim}}\\limits");
y("\\bra", "\\mathinner{\\langle{#1}|}");
y("\\ket", "\\mathinner{|{#1}\\rangle}");
y("\\braket", "\\mathinner{\\langle{#1}\\rangle}");
y("\\Bra", "\\left\\langle#1\\right|");
y("\\Ket", "\\left|#1\\right\\rangle");
var K4 = (e) => (t) => {
	var r = t.consumeArg().tokens,
		n = t.consumeArg().tokens,
		i = t.consumeArg().tokens,
		a = t.consumeArg().tokens,
		s = t.macros.get("|"),
		o = t.macros.get("\\|");
	t.macros.beginGroup();
	var l = (d) => (p) => {
		e && (p.macros.set("|", s), i.length && p.macros.set("\\|", o));
		var m = d;
		if (!d && i.length) {
			var b = p.future();
			b.text === "|" && (p.popToken(), (m = !0));
		}
		return { tokens: m ? i : n, numArgs: 0 };
	};
	t.macros.set("|", l(!1)), i.length && t.macros.set("\\|", l(!0));
	var c = t.consumeArg().tokens,
		u = t.expandTokens([...a, ...c, ...r]);
	return t.macros.endGroup(), { tokens: u.reverse(), numArgs: 0 };
};
y("\\bra@ket", K4(!1));
y("\\bra@set", K4(!0));
y(
	"\\Braket",
	"\\bra@ket{\\left\\langle}{\\,\\middle\\vert\\,}{\\,\\middle\\vert\\,}{\\right\\rangle}"
);
y(
	"\\Set",
	"\\bra@set{\\left\\{\\:}{\\;\\middle\\vert\\;}{\\;\\middle\\Vert\\;}{\\:\\right\\}}"
);
y("\\set", "\\bra@set{\\{\\,}{\\mid}{}{\\,\\}}");
y("\\angln", "{\\angl n}");
y("\\blue", "\\textcolor{##6495ed}{#1}");
y("\\orange", "\\textcolor{##ffa500}{#1}");
y("\\pink", "\\textcolor{##ff00af}{#1}");
y("\\red", "\\textcolor{##df0030}{#1}");
y("\\green", "\\textcolor{##28ae7b}{#1}");
y("\\gray", "\\textcolor{gray}{#1}");
y("\\purple", "\\textcolor{##9d38bd}{#1}");
y("\\blueA", "\\textcolor{##ccfaff}{#1}");
y("\\blueB", "\\textcolor{##80f6ff}{#1}");
y("\\blueC", "\\textcolor{##63d9ea}{#1}");
y("\\blueD", "\\textcolor{##11accd}{#1}");
y("\\blueE", "\\textcolor{##0c7f99}{#1}");
y("\\tealA", "\\textcolor{##94fff5}{#1}");
y("\\tealB", "\\textcolor{##26edd5}{#1}");
y("\\tealC", "\\textcolor{##01d1c1}{#1}");
y("\\tealD", "\\textcolor{##01a995}{#1}");
y("\\tealE", "\\textcolor{##208170}{#1}");
y("\\greenA", "\\textcolor{##b6ffb0}{#1}");
y("\\greenB", "\\textcolor{##8af281}{#1}");
y("\\greenC", "\\textcolor{##74cf70}{#1}");
y("\\greenD", "\\textcolor{##1fab54}{#1}");
y("\\greenE", "\\textcolor{##0d923f}{#1}");
y("\\goldA", "\\textcolor{##ffd0a9}{#1}");
y("\\goldB", "\\textcolor{##ffbb71}{#1}");
y("\\goldC", "\\textcolor{##ff9c39}{#1}");
y("\\goldD", "\\textcolor{##e07d10}{#1}");
y("\\goldE", "\\textcolor{##a75a05}{#1}");
y("\\redA", "\\textcolor{##fca9a9}{#1}");
y("\\redB", "\\textcolor{##ff8482}{#1}");
y("\\redC", "\\textcolor{##f9685d}{#1}");
y("\\redD", "\\textcolor{##e84d39}{#1}");
y("\\redE", "\\textcolor{##bc2612}{#1}");
y("\\maroonA", "\\textcolor{##ffbde0}{#1}");
y("\\maroonB", "\\textcolor{##ff92c6}{#1}");
y("\\maroonC", "\\textcolor{##ed5fa6}{#1}");
y("\\maroonD", "\\textcolor{##ca337c}{#1}");
y("\\maroonE", "\\textcolor{##9e034e}{#1}");
y("\\purpleA", "\\textcolor{##ddd7ff}{#1}");
y("\\purpleB", "\\textcolor{##c6b9fc}{#1}");
y("\\purpleC", "\\textcolor{##aa87ff}{#1}");
y("\\purpleD", "\\textcolor{##7854ab}{#1}");
y("\\purpleE", "\\textcolor{##543b78}{#1}");
y("\\mintA", "\\textcolor{##f5f9e8}{#1}");
y("\\mintB", "\\textcolor{##edf2df}{#1}");
y("\\mintC", "\\textcolor{##e0e5cc}{#1}");
y("\\grayA", "\\textcolor{##f6f7f7}{#1}");
y("\\grayB", "\\textcolor{##f0f1f2}{#1}");
y("\\grayC", "\\textcolor{##e3e5e6}{#1}");
y("\\grayD", "\\textcolor{##d6d8da}{#1}");
y("\\grayE", "\\textcolor{##babec2}{#1}");
y("\\grayF", "\\textcolor{##888d93}{#1}");
y("\\grayG", "\\textcolor{##626569}{#1}");
y("\\grayH", "\\textcolor{##3b3e40}{#1}");
y("\\grayI", "\\textcolor{##21242c}{#1}");
y("\\kaBlue", "\\textcolor{##314453}{#1}");
y("\\kaGreen", "\\textcolor{##71B307}{#1}");
var X4 = { "^": !0, _: !0, "\\limits": !0, "\\nolimits": !0 };
class H9 {
	constructor(t, r, n) {
		(this.settings = void 0),
			(this.expansionCount = void 0),
			(this.lexer = void 0),
			(this.macros = void 0),
			(this.stack = void 0),
			(this.mode = void 0),
			(this.settings = r),
			(this.expansionCount = 0),
			this.feed(t),
			(this.macros = new $9(F9, r.macros)),
			(this.mode = n),
			(this.stack = []);
	}
	feed(t) {
		this.lexer = new _h(t, this.settings);
	}
	switchMode(t) {
		this.mode = t;
	}
	beginGroup() {
		this.macros.beginGroup();
	}
	endGroup() {
		this.macros.endGroup();
	}
	endGroups() {
		this.macros.endGroups();
	}
	future() {
		return (
			this.stack.length === 0 && this.pushToken(this.lexer.lex()),
			this.stack[this.stack.length - 1]
		);
	}
	popToken() {
		return this.future(), this.stack.pop();
	}
	pushToken(t) {
		this.stack.push(t);
	}
	pushTokens(t) {
		this.stack.push(...t);
	}
	scanArgument(t) {
		var r, n, i;
		if (t) {
			if ((this.consumeSpaces(), this.future().text !== "[")) return null;
			(r = this.popToken()), ({ tokens: i, end: n } = this.consumeArg(["]"]));
		} else ({ tokens: i, start: r, end: n } = this.consumeArg());
		return (
			this.pushToken(new jt("EOF", n.loc)), this.pushTokens(i), r.range(n, "")
		);
	}
	consumeSpaces() {
		for (;;) {
			var t = this.future();
			if (t.text === " ") this.stack.pop();
			else break;
		}
	}
	consumeArg(t) {
		var r = [],
			n = t && t.length > 0;
		n || this.consumeSpaces();
		var i = this.future(),
			a,
			s = 0,
			o = 0;
		do {
			if (((a = this.popToken()), r.push(a), a.text === "{")) ++s;
			else if (a.text === "}") {
				if ((--s, s === -1)) throw new Z("Extra }", a);
			} else if (a.text === "EOF")
				throw new Z(
					"Unexpected end of input in a macro argument, expected '" +
						(t && n ? t[o] : "}") +
						"'",
					a
				);
			if (t && n)
				if ((s === 0 || (s === 1 && t[o] === "{")) && a.text === t[o]) {
					if ((++o, o === t.length)) {
						r.splice(-o, o);
						break;
					}
				} else o = 0;
		} while (s !== 0 || n);
		return (
			i.text === "{" && r[r.length - 1].text === "}" && (r.pop(), r.shift()),
			r.reverse(),
			{ tokens: r, start: i, end: a }
		);
	}
	consumeArgs(t, r) {
		if (r) {
			if (r.length !== t + 1)
				throw new Z(
					"The length of delimiters doesn't match the number of args!"
				);
			for (var n = r[0], i = 0; i < n.length; i++) {
				var a = this.popToken();
				if (n[i] !== a.text)
					throw new Z("Use of the macro doesn't match its definition", a);
			}
		}
		for (var s = [], o = 0; o < t; o++)
			s.push(this.consumeArg(r && r[o + 1]).tokens);
		return s;
	}
	expandOnce(t) {
		var r = this.popToken(),
			n = r.text,
			i = r.noexpand ? null : this._getExpansion(n);
		if (i == null || (t && i.unexpandable)) {
			if (t && i == null && n[0] === "\\" && !this.isDefined(n))
				throw new Z("Undefined control sequence: " + n);
			return this.pushToken(r), r;
		}
		if ((this.expansionCount++, this.expansionCount > this.settings.maxExpand))
			throw new Z(
				"Too many expansions: infinite loop or need to increase maxExpand setting"
			);
		var a = i.tokens,
			s = this.consumeArgs(i.numArgs, i.delimiters);
		if (i.numArgs) {
			a = a.slice();
			for (var o = a.length - 1; o >= 0; --o) {
				var l = a[o];
				if (l.text === "#") {
					if (o === 0)
						throw new Z("Incomplete placeholder at end of macro body", l);
					if (((l = a[--o]), l.text === "#")) a.splice(o + 1, 1);
					else if (/^[1-9]$/.test(l.text)) a.splice(o, 2, ...s[+l.text - 1]);
					else throw new Z("Not a valid argument number", l);
				}
			}
		}
		return this.pushTokens(a), a;
	}
	expandAfterFuture() {
		return this.expandOnce(), this.future();
	}
	expandNextToken() {
		for (;;) {
			var t = this.expandOnce();
			if (t instanceof jt)
				return t.treatAsRelax && (t.text = "\\relax"), this.stack.pop();
		}
		throw new Error();
	}
	expandMacro(t) {
		return this.macros.has(t) ? this.expandTokens([new jt(t)]) : void 0;
	}
	expandTokens(t) {
		var r = [],
			n = this.stack.length;
		for (this.pushTokens(t); this.stack.length > n; ) {
			var i = this.expandOnce(!0);
			i instanceof jt &&
				(i.treatAsRelax && ((i.noexpand = !1), (i.treatAsRelax = !1)),
				r.push(this.stack.pop()));
		}
		return r;
	}
	expandMacroAsText(t) {
		var r = this.expandMacro(t);
		return r && r.map((n) => n.text).join("");
	}
	_getExpansion(t) {
		var r = this.macros.get(t);
		if (r == null) return r;
		if (t.length === 1) {
			var n = this.lexer.catcodes[t];
			if (n != null && n !== 13) return;
		}
		var i = typeof r == "function" ? r(this) : r;
		if (typeof i == "string") {
			var a = 0;
			if (i.indexOf("#") !== -1)
				for (var s = i.replace(/##/g, ""); s.indexOf("#" + (a + 1)) !== -1; )
					++a;
			for (
				var o = new _h(i, this.settings), l = [], c = o.lex();
				c.text !== "EOF";

			)
				l.push(c), (c = o.lex());
			l.reverse();
			var u = { tokens: l, numArgs: a };
			return u;
		}
		return i;
	}
	isDefined(t) {
		return (
			this.macros.has(t) ||
			on.hasOwnProperty(t) ||
			Ue.math.hasOwnProperty(t) ||
			Ue.text.hasOwnProperty(t) ||
			X4.hasOwnProperty(t)
		);
	}
	isExpandable(t) {
		var r = this.macros.get(t);
		return r != null
			? typeof r == "string" || typeof r == "function" || !r.unexpandable
			: on.hasOwnProperty(t) && !on[t].primitive;
	}
}
var Eh = /^[₊₋₌₍₎₀₁₂₃₄₅₆₇₈₉ₐₑₕᵢⱼₖₗₘₙₒₚᵣₛₜᵤᵥₓᵦᵧᵨᵩᵪ]/,
	Hs = Object.freeze({
		"₊": "+",
		"₋": "-",
		"₌": "=",
		"₍": "(",
		"₎": ")",
		"₀": "0",
		"₁": "1",
		"₂": "2",
		"₃": "3",
		"₄": "4",
		"₅": "5",
		"₆": "6",
		"₇": "7",
		"₈": "8",
		"₉": "9",
		ₐ: "a",
		ₑ: "e",
		ₕ: "h",
		ᵢ: "i",
		ⱼ: "j",
		ₖ: "k",
		ₗ: "l",
		ₘ: "m",
		ₙ: "n",
		ₒ: "o",
		ₚ: "p",
		ᵣ: "r",
		ₛ: "s",
		ₜ: "t",
		ᵤ: "u",
		ᵥ: "v",
		ₓ: "x",
		ᵦ: "β",
		ᵧ: "γ",
		ᵨ: "ρ",
		ᵩ: "ϕ",
		ᵪ: "χ",
		"⁺": "+",
		"⁻": "-",
		"⁼": "=",
		"⁽": "(",
		"⁾": ")",
		"⁰": "0",
		"¹": "1",
		"²": "2",
		"³": "3",
		"⁴": "4",
		"⁵": "5",
		"⁶": "6",
		"⁷": "7",
		"⁸": "8",
		"⁹": "9",
		ᴬ: "A",
		ᴮ: "B",
		ᴰ: "D",
		ᴱ: "E",
		ᴳ: "G",
		ᴴ: "H",
		ᴵ: "I",
		ᴶ: "J",
		ᴷ: "K",
		ᴸ: "L",
		ᴹ: "M",
		ᴺ: "N",
		ᴼ: "O",
		ᴾ: "P",
		ᴿ: "R",
		ᵀ: "T",
		ᵁ: "U",
		ⱽ: "V",
		ᵂ: "W",
		ᵃ: "a",
		ᵇ: "b",
		ᶜ: "c",
		ᵈ: "d",
		ᵉ: "e",
		ᶠ: "f",
		ᵍ: "g",
		ʰ: "h",
		ⁱ: "i",
		ʲ: "j",
		ᵏ: "k",
		ˡ: "l",
		ᵐ: "m",
		ⁿ: "n",
		ᵒ: "o",
		ᵖ: "p",
		ʳ: "r",
		ˢ: "s",
		ᵗ: "t",
		ᵘ: "u",
		ᵛ: "v",
		ʷ: "w",
		ˣ: "x",
		ʸ: "y",
		ᶻ: "z",
		ᵝ: "β",
		ᵞ: "γ",
		ᵟ: "δ",
		ᵠ: "ϕ",
		ᵡ: "χ",
		ᶿ: "θ",
	}),
	rl = {
		"́": { text: "\\'", math: "\\acute" },
		"̀": { text: "\\`", math: "\\grave" },
		"̈": { text: '\\"', math: "\\ddot" },
		"̃": { text: "\\~", math: "\\tilde" },
		"̄": { text: "\\=", math: "\\bar" },
		"̆": { text: "\\u", math: "\\breve" },
		"̌": { text: "\\v", math: "\\check" },
		"̂": { text: "\\^", math: "\\hat" },
		"̇": { text: "\\.", math: "\\dot" },
		"̊": { text: "\\r", math: "\\mathring" },
		"̋": { text: "\\H" },
		"̧": { text: "\\c" },
	},
	xh = {
		á: "á",
		à: "à",
		ä: "ä",
		ǟ: "ǟ",
		ã: "ã",
		ā: "ā",
		ă: "ă",
		ắ: "ắ",
		ằ: "ằ",
		ẵ: "ẵ",
		ǎ: "ǎ",
		â: "â",
		ấ: "ấ",
		ầ: "ầ",
		ẫ: "ẫ",
		ȧ: "ȧ",
		ǡ: "ǡ",
		å: "å",
		ǻ: "ǻ",
		ḃ: "ḃ",
		ć: "ć",
		ḉ: "ḉ",
		č: "č",
		ĉ: "ĉ",
		ċ: "ċ",
		ç: "ç",
		ď: "ď",
		ḋ: "ḋ",
		ḑ: "ḑ",
		é: "é",
		è: "è",
		ë: "ë",
		ẽ: "ẽ",
		ē: "ē",
		ḗ: "ḗ",
		ḕ: "ḕ",
		ĕ: "ĕ",
		ḝ: "ḝ",
		ě: "ě",
		ê: "ê",
		ế: "ế",
		ề: "ề",
		ễ: "ễ",
		ė: "ė",
		ȩ: "ȩ",
		ḟ: "ḟ",
		ǵ: "ǵ",
		ḡ: "ḡ",
		ğ: "ğ",
		ǧ: "ǧ",
		ĝ: "ĝ",
		ġ: "ġ",
		ģ: "ģ",
		ḧ: "ḧ",
		ȟ: "ȟ",
		ĥ: "ĥ",
		ḣ: "ḣ",
		ḩ: "ḩ",
		í: "í",
		ì: "ì",
		ï: "ï",
		ḯ: "ḯ",
		ĩ: "ĩ",
		ī: "ī",
		ĭ: "ĭ",
		ǐ: "ǐ",
		î: "î",
		ǰ: "ǰ",
		ĵ: "ĵ",
		ḱ: "ḱ",
		ǩ: "ǩ",
		ķ: "ķ",
		ĺ: "ĺ",
		ľ: "ľ",
		ļ: "ļ",
		ḿ: "ḿ",
		ṁ: "ṁ",
		ń: "ń",
		ǹ: "ǹ",
		ñ: "ñ",
		ň: "ň",
		ṅ: "ṅ",
		ņ: "ņ",
		ó: "ó",
		ò: "ò",
		ö: "ö",
		ȫ: "ȫ",
		õ: "õ",
		ṍ: "ṍ",
		ṏ: "ṏ",
		ȭ: "ȭ",
		ō: "ō",
		ṓ: "ṓ",
		ṑ: "ṑ",
		ŏ: "ŏ",
		ǒ: "ǒ",
		ô: "ô",
		ố: "ố",
		ồ: "ồ",
		ỗ: "ỗ",
		ȯ: "ȯ",
		ȱ: "ȱ",
		ő: "ő",
		ṕ: "ṕ",
		ṗ: "ṗ",
		ŕ: "ŕ",
		ř: "ř",
		ṙ: "ṙ",
		ŗ: "ŗ",
		ś: "ś",
		ṥ: "ṥ",
		š: "š",
		ṧ: "ṧ",
		ŝ: "ŝ",
		ṡ: "ṡ",
		ş: "ş",
		ẗ: "ẗ",
		ť: "ť",
		ṫ: "ṫ",
		ţ: "ţ",
		ú: "ú",
		ù: "ù",
		ü: "ü",
		ǘ: "ǘ",
		ǜ: "ǜ",
		ǖ: "ǖ",
		ǚ: "ǚ",
		ũ: "ũ",
		ṹ: "ṹ",
		ū: "ū",
		ṻ: "ṻ",
		ŭ: "ŭ",
		ǔ: "ǔ",
		û: "û",
		ů: "ů",
		ű: "ű",
		ṽ: "ṽ",
		ẃ: "ẃ",
		ẁ: "ẁ",
		ẅ: "ẅ",
		ŵ: "ŵ",
		ẇ: "ẇ",
		ẘ: "ẘ",
		ẍ: "ẍ",
		ẋ: "ẋ",
		ý: "ý",
		ỳ: "ỳ",
		ÿ: "ÿ",
		ỹ: "ỹ",
		ȳ: "ȳ",
		ŷ: "ŷ",
		ẏ: "ẏ",
		ẙ: "ẙ",
		ź: "ź",
		ž: "ž",
		ẑ: "ẑ",
		ż: "ż",
		Á: "Á",
		À: "À",
		Ä: "Ä",
		Ǟ: "Ǟ",
		Ã: "Ã",
		Ā: "Ā",
		Ă: "Ă",
		Ắ: "Ắ",
		Ằ: "Ằ",
		Ẵ: "Ẵ",
		Ǎ: "Ǎ",
		Â: "Â",
		Ấ: "Ấ",
		Ầ: "Ầ",
		Ẫ: "Ẫ",
		Ȧ: "Ȧ",
		Ǡ: "Ǡ",
		Å: "Å",
		Ǻ: "Ǻ",
		Ḃ: "Ḃ",
		Ć: "Ć",
		Ḉ: "Ḉ",
		Č: "Č",
		Ĉ: "Ĉ",
		Ċ: "Ċ",
		Ç: "Ç",
		Ď: "Ď",
		Ḋ: "Ḋ",
		Ḑ: "Ḑ",
		É: "É",
		È: "È",
		Ë: "Ë",
		Ẽ: "Ẽ",
		Ē: "Ē",
		Ḗ: "Ḗ",
		Ḕ: "Ḕ",
		Ĕ: "Ĕ",
		Ḝ: "Ḝ",
		Ě: "Ě",
		Ê: "Ê",
		Ế: "Ế",
		Ề: "Ề",
		Ễ: "Ễ",
		Ė: "Ė",
		Ȩ: "Ȩ",
		Ḟ: "Ḟ",
		Ǵ: "Ǵ",
		Ḡ: "Ḡ",
		Ğ: "Ğ",
		Ǧ: "Ǧ",
		Ĝ: "Ĝ",
		Ġ: "Ġ",
		Ģ: "Ģ",
		Ḧ: "Ḧ",
		Ȟ: "Ȟ",
		Ĥ: "Ĥ",
		Ḣ: "Ḣ",
		Ḩ: "Ḩ",
		Í: "Í",
		Ì: "Ì",
		Ï: "Ï",
		Ḯ: "Ḯ",
		Ĩ: "Ĩ",
		Ī: "Ī",
		Ĭ: "Ĭ",
		Ǐ: "Ǐ",
		Î: "Î",
		İ: "İ",
		Ĵ: "Ĵ",
		Ḱ: "Ḱ",
		Ǩ: "Ǩ",
		Ķ: "Ķ",
		Ĺ: "Ĺ",
		Ľ: "Ľ",
		Ļ: "Ļ",
		Ḿ: "Ḿ",
		Ṁ: "Ṁ",
		Ń: "Ń",
		Ǹ: "Ǹ",
		Ñ: "Ñ",
		Ň: "Ň",
		Ṅ: "Ṅ",
		Ņ: "Ņ",
		Ó: "Ó",
		Ò: "Ò",
		Ö: "Ö",
		Ȫ: "Ȫ",
		Õ: "Õ",
		Ṍ: "Ṍ",
		Ṏ: "Ṏ",
		Ȭ: "Ȭ",
		Ō: "Ō",
		Ṓ: "Ṓ",
		Ṑ: "Ṑ",
		Ŏ: "Ŏ",
		Ǒ: "Ǒ",
		Ô: "Ô",
		Ố: "Ố",
		Ồ: "Ồ",
		Ỗ: "Ỗ",
		Ȯ: "Ȯ",
		Ȱ: "Ȱ",
		Ő: "Ő",
		Ṕ: "Ṕ",
		Ṗ: "Ṗ",
		Ŕ: "Ŕ",
		Ř: "Ř",
		Ṙ: "Ṙ",
		Ŗ: "Ŗ",
		Ś: "Ś",
		Ṥ: "Ṥ",
		Š: "Š",
		Ṧ: "Ṧ",
		Ŝ: "Ŝ",
		Ṡ: "Ṡ",
		Ş: "Ş",
		Ť: "Ť",
		Ṫ: "Ṫ",
		Ţ: "Ţ",
		Ú: "Ú",
		Ù: "Ù",
		Ü: "Ü",
		Ǘ: "Ǘ",
		Ǜ: "Ǜ",
		Ǖ: "Ǖ",
		Ǚ: "Ǚ",
		Ũ: "Ũ",
		Ṹ: "Ṹ",
		Ū: "Ū",
		Ṻ: "Ṻ",
		Ŭ: "Ŭ",
		Ǔ: "Ǔ",
		Û: "Û",
		Ů: "Ů",
		Ű: "Ű",
		Ṽ: "Ṽ",
		Ẃ: "Ẃ",
		Ẁ: "Ẁ",
		Ẅ: "Ẅ",
		Ŵ: "Ŵ",
		Ẇ: "Ẇ",
		Ẍ: "Ẍ",
		Ẋ: "Ẋ",
		Ý: "Ý",
		Ỳ: "Ỳ",
		Ÿ: "Ÿ",
		Ỹ: "Ỹ",
		Ȳ: "Ȳ",
		Ŷ: "Ŷ",
		Ẏ: "Ẏ",
		Ź: "Ź",
		Ž: "Ž",
		Ẑ: "Ẑ",
		Ż: "Ż",
		ά: "ά",
		ὰ: "ὰ",
		ᾱ: "ᾱ",
		ᾰ: "ᾰ",
		έ: "έ",
		ὲ: "ὲ",
		ή: "ή",
		ὴ: "ὴ",
		ί: "ί",
		ὶ: "ὶ",
		ϊ: "ϊ",
		ΐ: "ΐ",
		ῒ: "ῒ",
		ῑ: "ῑ",
		ῐ: "ῐ",
		ό: "ό",
		ὸ: "ὸ",
		ύ: "ύ",
		ὺ: "ὺ",
		ϋ: "ϋ",
		ΰ: "ΰ",
		ῢ: "ῢ",
		ῡ: "ῡ",
		ῠ: "ῠ",
		ώ: "ώ",
		ὼ: "ὼ",
		Ύ: "Ύ",
		Ὺ: "Ὺ",
		Ϋ: "Ϋ",
		Ῡ: "Ῡ",
		Ῠ: "Ῠ",
		Ώ: "Ώ",
		Ὼ: "Ὼ",
	};
class Va {
	constructor(t, r) {
		(this.mode = void 0),
			(this.gullet = void 0),
			(this.settings = void 0),
			(this.leftrightDepth = void 0),
			(this.nextToken = void 0),
			(this.mode = "math"),
			(this.gullet = new H9(t, r, this.mode)),
			(this.settings = r),
			(this.leftrightDepth = 0);
	}
	expect(t, r) {
		if ((r === void 0 && (r = !0), this.fetch().text !== t))
			throw new Z(
				"Expected '" + t + "', got '" + this.fetch().text + "'",
				this.fetch()
			);
		r && this.consume();
	}
	consume() {
		this.nextToken = null;
	}
	fetch() {
		return (
			this.nextToken == null &&
				(this.nextToken = this.gullet.expandNextToken()),
			this.nextToken
		);
	}
	switchMode(t) {
		(this.mode = t), this.gullet.switchMode(t);
	}
	parse() {
		this.settings.globalGroup || this.gullet.beginGroup(),
			this.settings.colorIsTextColor &&
				this.gullet.macros.set("\\color", "\\textcolor");
		try {
			var t = this.parseExpression(!1);
			return (
				this.expect("EOF"),
				this.settings.globalGroup || this.gullet.endGroup(),
				t
			);
		} finally {
			this.gullet.endGroups();
		}
	}
	subparse(t) {
		var r = this.nextToken;
		this.consume(),
			this.gullet.pushToken(new jt("}")),
			this.gullet.pushTokens(t);
		var n = this.parseExpression(!1);
		return this.expect("}"), (this.nextToken = r), n;
	}
	parseExpression(t, r) {
		for (var n = []; ; ) {
			this.mode === "math" && this.consumeSpaces();
			var i = this.fetch();
			if (
				Va.endOfExpression.indexOf(i.text) !== -1 ||
				(r && i.text === r) ||
				(t && on[i.text] && on[i.text].infix)
			)
				break;
			var a = this.parseAtom(r);
			if (a) {
				if (a.type === "internal") continue;
			} else break;
			n.push(a);
		}
		return (
			this.mode === "text" && this.formLigatures(n), this.handleInfixNodes(n)
		);
	}
	handleInfixNodes(t) {
		for (var r = -1, n, i = 0; i < t.length; i++)
			if (t[i].type === "infix") {
				if (r !== -1)
					throw new Z("only one infix operator per group", t[i].token);
				(r = i), (n = t[i].replaceWith);
			}
		if (r !== -1 && n) {
			var a,
				s,
				o = t.slice(0, r),
				l = t.slice(r + 1);
			o.length === 1 && o[0].type === "ordgroup"
				? (a = o[0])
				: (a = { type: "ordgroup", mode: this.mode, body: o }),
				l.length === 1 && l[0].type === "ordgroup"
					? (s = l[0])
					: (s = { type: "ordgroup", mode: this.mode, body: l });
			var c;
			return (
				n === "\\\\abovefrac"
					? (c = this.callFunction(n, [a, t[r], s], []))
					: (c = this.callFunction(n, [a, s], [])),
				[c]
			);
		} else return t;
	}
	handleSupSubscript(t) {
		var r = this.fetch(),
			n = r.text;
		this.consume(), this.consumeSpaces();
		var i = this.parseGroup(t);
		if (!i) throw new Z("Expected group after '" + n + "'", r);
		return i;
	}
	formatUnsupportedCmd(t) {
		for (var r = [], n = 0; n < t.length; n++)
			r.push({ type: "textord", mode: "text", text: t[n] });
		var i = { type: "text", mode: this.mode, body: r },
			a = {
				type: "color",
				mode: this.mode,
				color: this.settings.errorColor,
				body: [i],
			};
		return a;
	}
	parseAtom(t) {
		var r = this.parseGroup("atom", t);
		if (this.mode === "text") return r;
		for (var n, i; ; ) {
			this.consumeSpaces();
			var a = this.fetch();
			if (a.text === "\\limits" || a.text === "\\nolimits") {
				if (r && r.type === "op") {
					var s = a.text === "\\limits";
					(r.limits = s), (r.alwaysHandleSupSub = !0);
				} else if (r && r.type === "operatorname")
					r.alwaysHandleSupSub && (r.limits = a.text === "\\limits");
				else throw new Z("Limit controls must follow a math operator", a);
				this.consume();
			} else if (a.text === "^") {
				if (n) throw new Z("Double superscript", a);
				n = this.handleSupSubscript("superscript");
			} else if (a.text === "_") {
				if (i) throw new Z("Double subscript", a);
				i = this.handleSupSubscript("subscript");
			} else if (a.text === "'") {
				if (n) throw new Z("Double superscript", a);
				var o = { type: "textord", mode: this.mode, text: "\\prime" },
					l = [o];
				for (this.consume(); this.fetch().text === "'"; )
					l.push(o), this.consume();
				this.fetch().text === "^" &&
					l.push(this.handleSupSubscript("superscript")),
					(n = { type: "ordgroup", mode: this.mode, body: l });
			} else if (Hs[a.text]) {
				var c = Hs[a.text],
					u = Eh.test(a.text);
				for (this.consume(); ; ) {
					var d = this.fetch().text;
					if (!Hs[d] || Eh.test(d) !== u) break;
					this.consume(), (c += Hs[d]);
				}
				var p = new Va(c, this.settings).parse();
				u
					? (i = { type: "ordgroup", mode: "math", body: p })
					: (n = { type: "ordgroup", mode: "math", body: p });
			} else break;
		}
		return n || i
			? { type: "supsub", mode: this.mode, base: r, sup: n, sub: i }
			: r;
	}
	parseFunction(t, r) {
		var n = this.fetch(),
			i = n.text,
			a = on[i];
		if (!a) return null;
		if ((this.consume(), r && r !== "atom" && !a.allowedInArgument))
			throw new Z(
				"Got function '" + i + "' with no arguments" + (r ? " as " + r : ""),
				n
			);
		if (this.mode === "text" && !a.allowedInText)
			throw new Z("Can't use function '" + i + "' in text mode", n);
		if (this.mode === "math" && a.allowedInMath === !1)
			throw new Z("Can't use function '" + i + "' in math mode", n);
		var { args: s, optArgs: o } = this.parseArguments(i, a);
		return this.callFunction(i, s, o, n, t);
	}
	callFunction(t, r, n, i, a) {
		var s = { funcName: t, parser: this, token: i, breakOnTokenText: a },
			o = on[t];
		if (o && o.handler) return o.handler(s, r, n);
		throw new Z("No function handler for " + t);
	}
	parseArguments(t, r) {
		var n = r.numArgs + r.numOptionalArgs;
		if (n === 0) return { args: [], optArgs: [] };
		for (var i = [], a = [], s = 0; s < n; s++) {
			var o = r.argTypes && r.argTypes[s],
				l = s < r.numOptionalArgs;
			((r.primitive && o == null) ||
				(r.type === "sqrt" && s === 1 && a[0] == null)) &&
				(o = "primitive");
			var c = this.parseGroupOfType("argument to '" + t + "'", o, l);
			if (l) a.push(c);
			else if (c != null) i.push(c);
			else throw new Z("Null argument, please report this as a bug");
		}
		return { args: i, optArgs: a };
	}
	parseGroupOfType(t, r, n) {
		switch (r) {
			case "color":
				return this.parseColorGroup(n);
			case "size":
				return this.parseSizeGroup(n);
			case "url":
				return this.parseUrlGroup(n);
			case "math":
			case "text":
				return this.parseArgumentGroup(n, r);
			case "hbox": {
				var i = this.parseArgumentGroup(n, "text");
				return i != null
					? { type: "styling", mode: i.mode, body: [i], style: "text" }
					: null;
			}
			case "raw": {
				var a = this.parseStringGroup("raw", n);
				return a != null ? { type: "raw", mode: "text", string: a.text } : null;
			}
			case "primitive": {
				if (n) throw new Z("A primitive argument cannot be optional");
				var s = this.parseGroup(t);
				if (s == null) throw new Z("Expected group as " + t, this.fetch());
				return s;
			}
			case "original":
			case null:
			case void 0:
				return this.parseArgumentGroup(n);
			default:
				throw new Z("Unknown group type as " + t, this.fetch());
		}
	}
	consumeSpaces() {
		for (; this.fetch().text === " "; ) this.consume();
	}
	parseStringGroup(t, r) {
		var n = this.gullet.scanArgument(r);
		if (n == null) return null;
		for (var i = "", a; (a = this.fetch()).text !== "EOF"; )
			(i += a.text), this.consume();
		return this.consume(), (n.text = i), n;
	}
	parseRegexGroup(t, r) {
		for (
			var n = this.fetch(), i = n, a = "", s;
			(s = this.fetch()).text !== "EOF" && t.test(a + s.text);

		)
			(i = s), (a += i.text), this.consume();
		if (a === "") throw new Z("Invalid " + r + ": '" + n.text + "'", n);
		return n.range(i, a);
	}
	parseColorGroup(t) {
		var r = this.parseStringGroup("color", t);
		if (r == null) return null;
		var n = /^(#[a-f0-9]{3}|#?[a-f0-9]{6}|[a-z]+)$/i.exec(r.text);
		if (!n) throw new Z("Invalid color: '" + r.text + "'", r);
		var i = n[0];
		return (
			/^[0-9a-f]{6}$/i.test(i) && (i = "#" + i),
			{ type: "color-token", mode: this.mode, color: i }
		);
	}
	parseSizeGroup(t) {
		var r,
			n = !1;
		if (
			(this.gullet.consumeSpaces(),
			!t && this.gullet.future().text !== "{"
				? (r = this.parseRegexGroup(
						/^[-+]? *(?:$|\d+|\d+\.\d*|\.\d*) *[a-z]{0,2} *$/,
						"size"
				  ))
				: (r = this.parseStringGroup("size", t)),
			!r)
		)
			return null;
		!t && r.text.length === 0 && ((r.text = "0pt"), (n = !0));
		var i = /([-+]?) *(\d+(?:\.\d*)?|\.\d+) *([a-z]{2})/.exec(r.text);
		if (!i) throw new Z("Invalid size: '" + r.text + "'", r);
		var a = { number: +(i[1] + i[2]), unit: i[3] };
		if (!s4(a)) throw new Z("Invalid unit: '" + a.unit + "'", r);
		return { type: "size", mode: this.mode, value: a, isBlank: n };
	}
	parseUrlGroup(t) {
		this.gullet.lexer.setCatcode("%", 13),
			this.gullet.lexer.setCatcode("~", 12);
		var r = this.parseStringGroup("url", t);
		if (
			(this.gullet.lexer.setCatcode("%", 14),
			this.gullet.lexer.setCatcode("~", 13),
			r == null)
		)
			return null;
		var n = r.text.replace(/\\([#$%&~_^{}])/g, "$1");
		return { type: "url", mode: this.mode, url: n };
	}
	parseArgumentGroup(t, r) {
		var n = this.gullet.scanArgument(t);
		if (n == null) return null;
		var i = this.mode;
		r && this.switchMode(r), this.gullet.beginGroup();
		var a = this.parseExpression(!1, "EOF");
		this.expect("EOF"), this.gullet.endGroup();
		var s = { type: "ordgroup", mode: this.mode, loc: n.loc, body: a };
		return r && this.switchMode(i), s;
	}
	parseGroup(t, r) {
		var n = this.fetch(),
			i = n.text,
			a;
		if (i === "{" || i === "\\begingroup") {
			this.consume();
			var s = i === "{" ? "}" : "\\endgroup";
			this.gullet.beginGroup();
			var o = this.parseExpression(!1, s),
				l = this.fetch();
			this.expect(s),
				this.gullet.endGroup(),
				(a = {
					type: "ordgroup",
					mode: this.mode,
					loc: Bt.range(n, l),
					body: o,
					semisimple: i === "\\begingroup" || void 0,
				});
		} else if (
			((a = this.parseFunction(r, t) || this.parseSymbol()),
			a == null && i[0] === "\\" && !X4.hasOwnProperty(i))
		) {
			if (this.settings.throwOnError)
				throw new Z("Undefined control sequence: " + i, n);
			(a = this.formatUnsupportedCmd(i)), this.consume();
		}
		return a;
	}
	formLigatures(t) {
		for (var r = t.length - 1, n = 0; n < r; ++n) {
			var i = t[n],
				a = i.text;
			a === "-" &&
				t[n + 1].text === "-" &&
				(n + 1 < r && t[n + 2].text === "-"
					? (t.splice(n, 3, {
							type: "textord",
							mode: "text",
							loc: Bt.range(i, t[n + 2]),
							text: "---",
					  }),
					  (r -= 2))
					: (t.splice(n, 2, {
							type: "textord",
							mode: "text",
							loc: Bt.range(i, t[n + 1]),
							text: "--",
					  }),
					  (r -= 1))),
				(a === "'" || a === "`") &&
					t[n + 1].text === a &&
					(t.splice(n, 2, {
						type: "textord",
						mode: "text",
						loc: Bt.range(i, t[n + 1]),
						text: a + a,
					}),
					(r -= 1));
		}
	}
	parseSymbol() {
		var t = this.fetch(),
			r = t.text;
		if (/^\\verb[^a-zA-Z]/.test(r)) {
			this.consume();
			var n = r.slice(5),
				i = n.charAt(0) === "*";
			if ((i && (n = n.slice(1)), n.length < 2 || n.charAt(0) !== n.slice(-1)))
				throw new Z(`\\verb assertion failed --
                    please report what input caused this bug`);
			return (
				(n = n.slice(1, -1)), { type: "verb", mode: "text", body: n, star: i }
			);
		}
		xh.hasOwnProperty(r[0]) &&
			!Ue[this.mode][r[0]] &&
			(this.settings.strict &&
				this.mode === "math" &&
				this.settings.reportNonstrict(
					"unicodeTextInMathMode",
					'Accented Unicode text character "' + r[0] + '" used in math mode',
					t
				),
			(r = xh[r[0]] + r.slice(1)));
		var a = L9.exec(r);
		a &&
			((r = r.substring(0, a.index)),
			r === "i" ? (r = "ı") : r === "j" && (r = "ȷ"));
		var s;
		if (Ue[this.mode][r]) {
			this.settings.strict &&
				this.mode === "math" &&
				tc.indexOf(r) >= 0 &&
				this.settings.reportNonstrict(
					"unicodeTextInMathMode",
					'Latin-1/Unicode text character "' + r[0] + '" used in math mode',
					t
				);
			var o = Ue[this.mode][r].group,
				l = Bt.range(t),
				c;
			if (Mv.hasOwnProperty(o)) {
				var u = o;
				c = { type: "atom", mode: this.mode, family: u, loc: l, text: r };
			} else c = { type: o, mode: this.mode, loc: l, text: r };
			s = c;
		} else if (r.charCodeAt(0) >= 128)
			this.settings.strict &&
				(a4(r.charCodeAt(0))
					? this.mode === "math" &&
					  this.settings.reportNonstrict(
							"unicodeTextInMathMode",
							'Unicode text character "' + r[0] + '" used in math mode',
							t
					  )
					: this.settings.reportNonstrict(
							"unknownSymbol",
							'Unrecognized Unicode character "' +
								r[0] +
								'"' +
								(" (" + r.charCodeAt(0) + ")"),
							t
					  )),
				(s = { type: "textord", mode: "text", loc: Bt.range(t), text: r });
		else return null;
		if ((this.consume(), a))
			for (var d = 0; d < a[0].length; d++) {
				var p = a[0][d];
				if (!rl[p]) throw new Z("Unknown accent ' " + p + "'", t);
				var m = rl[p][this.mode] || rl[p].text;
				if (!m)
					throw new Z(
						"Accent " + p + " unsupported in " + this.mode + " mode",
						t
					);
				s = {
					type: "accent",
					mode: this.mode,
					loc: Bt.range(t),
					label: m,
					isStretchy: !1,
					isShifty: !0,
					base: s,
				};
			}
		return s;
	}
}
Va.endOfExpression = ["}", "\\endgroup", "\\end", "\\right", "&"];
var Lu = function (t, r) {
		if (!(typeof t == "string" || t instanceof String))
			throw new TypeError("KaTeX can only parse string typed expression");
		var n = new Va(t, r);
		delete n.gullet.macros.current["\\df@tag"];
		var i = n.parse();
		if (
			(delete n.gullet.macros.current["\\current@color"],
			delete n.gullet.macros.current["\\color"],
			n.gullet.macros.get("\\df@tag"))
		) {
			if (!r.displayMode) throw new Z("\\tag works only in display equations");
			i = [
				{
					type: "tag",
					mode: "text",
					body: i,
					tag: n.subparse([new jt("\\df@tag")]),
				},
			];
		}
		return i;
	},
	J4 = function (t, r, n) {
		r.textContent = "";
		var i = zu(t, n).toNode();
		r.appendChild(i);
	};
typeof document < "u" &&
	document.compatMode !== "CSS1Compat" &&
	(typeof console < "u" &&
		console.warn(
			"Warning: KaTeX doesn't work in quirks mode. Make sure your website has a suitable doctype."
		),
	(J4 = function () {
		throw new Z("KaTeX doesn't work in quirks mode.");
	}));
var U9 = function (t, r) {
		var n = zu(t, r).toMarkup();
		return n;
	},
	j9 = function (t, r) {
		var n = new vu(r);
		return Lu(t, n);
	},
	Z4 = function (t, r, n) {
		if (n.throwOnError || !(t instanceof Z)) throw t;
		var i = N.makeSpan(["katex-error"], [new Wt(r)]);
		return (
			i.setAttribute("title", t.toString()),
			i.setAttribute("style", "color:" + n.errorColor),
			i
		);
	},
	zu = function (t, r) {
		var n = new vu(r);
		try {
			var i = Lu(t, n);
			return Zv(i, t, n);
		} catch (a) {
			return Z4(a, t, n);
		}
	},
	q9 = function (t, r) {
		var n = new vu(r);
		try {
			var i = Lu(t, n);
			return Qv(i, t, n);
		} catch (a) {
			return Z4(a, t, n);
		}
	},
	G9 = {
		version: "0.16.4",
		render: J4,
		renderToString: U9,
		ParseError: Z,
		SETTINGS_SCHEMA: to,
		__parse: j9,
		__renderToDomTree: zu,
		__renderToHTMLTree: q9,
		__setFontMetrics: Sv,
		__defineSymbol: f,
		__defineMacro: y,
		__domTree: {
			Span: ps,
			Anchor: Su,
			SymbolNode: Wt,
			SvgNode: Dr,
			PathNode: Sn,
			LineNode: ec,
		},
	};
const EP = Object.freeze(
	Object.defineProperty({ __proto__: null, default: G9 }, Symbol.toStringTag, {
		value: "Module",
	})
);
async function Y9({ topics: e = [], size: t = 4, options: r = {} } = {}) {
	const { $twill: n } = Re();
	let i;
	const a = { published: !0 },
		s = n
			.find("research-publications")
			.sort("-publicationDate,-createdAt")
			.page({ size: t })
			.include(["media"]);
	return (
		e && e.length && (a.topics = { slug: e }),
		r.exclude && (a.exclude = r.exclude),
		s.filter(a),
		(i = await s.fetch()),
		i.data ? n.transform(i) : null
	);
}
async function W9({ slug: e, preview: t = null }) {
	const { $twill: r } = Re();
	let n, i;
	return (
		(i = r.find("research-publications").filter({ slug: e })),
		t && i.query("preview", t),
		(n = await i.fetch()),
		n.data ? r.transform(n).pop() : null
	);
}
async function V9({
	slug: e,
	parent: t = null,
	scope: r = null,
	preview: n = null,
	locale: i = null,
}) {
	const { $twill: a } = Re();
	let s, o;
	const l = { slug: e };
	return (
		r && (l.scope = r),
		t && !n && ((l.parent = { slug: t }), r && (l.parent.scope = r)),
		(o = a.find("landings").filter(l)),
		n && o.query("preview", n),
		i && o.query("locale", i),
		(s = await o.fetch()),
		s.data ? a.transform(s).pop() : null
	);
}
async function K9({ slug: e, preview: t = null }) {
	const { $twill: r } = Re();
	let n;
	const i = r.find("products").filter({ slug: e });
	return (
		t && i.query("preview", t),
		(n = await i.fetch()),
		n.data ? r.transform(n).pop() : null
	);
}
const Q4 = (e) => {
	const t = e.IS_GENERATING ? e.TWILL_API_BASE : e.public.TWILL_API_BASE,
		r = "/api",
		n = "v1",
		i = `${t}${r}/${n}`,
		a = e.public.TWILL_API_AUTH_TOKEN ? e.public.TWILL_API_AUTH_TOKEN : null;
	return { url: t, token: a, prefix: r, version: n, cookie: {}, baseURL: i };
};
function X9(e, t) {
	const r = Jo(),
		{ baseURL: n } = Q4(r),
		{ type: i, id: a } = e;
	return `${n}/${i}/${a}/${t}`;
}
const oc = "blog-details",
	J9 = "blog-indices",
	eg = "blog-series",
	Z9 = "blog-series-indices",
	Q9 = "content-types",
	e_ = "custom-links",
	t_ = "careers-listings",
	tg = "customer-stories",
	r_ = "customer-story-landings",
	n_ = "greenhouse-jobs",
	i_ = "homepages",
	a_ = "interactive-tabs",
	s0 = "landings",
	s_ = "models",
	o_ = "people",
	rg = "products",
	l_ = "research-indices",
	Ka = "research-publications",
	c_ = "topics";
async function u_(e) {
	const { $twill: t } = Re(),
		r = X9(e, a_);
	let n;
	return (
		(n = await t
			.get(r)
			.include([
				"interactive-tab-contents.media",
				"interactive-tab-contents.related-items.related",
			])
			.fetch()),
		n.data ? t.transform(n) : null
	);
}
async function f_({ size: e = 3 } = {}) {
	const { $twill: t } = Re();
	let r;
	const n = { published: !0 },
		i = t
			.find("blog-series")
			.filter({ published: !0 })
			.sort("-createdAt")
			.page({ size: e })
			.include(["media"]);
	return i.filter(n), (r = await i.fetch()), r.data ? t.transform(r) : null;
}
async function d_({ size: e = 5 } = {}) {
	const { $twill: t } = Re();
	let r;
	const n = { published: !0 },
		i = t
			.find("greenhouse-jobs")
			.filter({ published: !0 })
			.sort("-ghUpdatedAt")
			.page({ size: e });
	return i.filter(n), (r = await i.fetch()), r.data ? t.transform(r) : null;
}
async function h_({ slug: e, preview: t = null }) {
	const { $twill: r } = Re();
	let n;
	const i = r.find("blog-series").filter({ slug: e });
	return (
		t && i.query("preview", t),
		(n = await i.fetch()),
		n.data ? r.transform(n).pop() : null
	);
}
async function p_(e = {}) {
	var c;
	const { $twill: t } = Re(),
		r = e.sort ?? "-createdAt",
		n = e.slug,
		i = e.pageSize ?? 15,
		a = e.pageNumber ?? null;
	let s;
	const o = { published: !0 },
		l = t
			.find("blog-details")
			.sort(r)
			.page({ size: i })
			.include(["media", "topics"]);
	return (
		n && (o["blog-series"] = { slug: n }),
		l.filter(o),
		a && l.page({ number: a }),
		(s = await l.fetch()),
		s.data
			? {
					resources: t.transform(s),
					page: (c = s == null ? void 0 : s.meta) == null ? void 0 : c.page,
			  }
			: null
	);
}
async function m_(e) {
	const { $twill: t } = Re();
	let r;
	const n = { published: !0 },
		i = t
			.find("people")
			.filter({ scope: ["author"], published: !0 })
			.sort("lastname")
			.query("withCount", e)
			.page({ size: 300 });
	return (
		e && (n[`has-${e}`] = !0),
		i.filter(n),
		(r = await i.fetch()),
		r.data ? t.transform(r) : null
	);
}
async function g_(e) {
	const { $twill: t } = Re();
	let r;
	const n = { published: !0 },
		i = t.find("content-types").sort("title").query("withCount", e);
	return (
		e && (n[`has-${e}`] = !0),
		i.filter(n),
		(r = await i.fetch()),
		r.data ? t.transform(r) : null
	);
}
async function y_(e) {
	const { $twill: t } = Re();
	let r;
	const n = { published: !0 },
		i = t.find("models").sort("title").query("withCount", e);
	return (
		e && (n[`has-${e}`] = !0),
		i.filter(n),
		(r = await i.fetch()),
		r.data ? t.transform(r) : null
	);
}
async function b_(e) {
	const { $twill: t } = Re();
	let r;
	const n = { published: !0 },
		i = t.find("topics").sort("title").query("withCount", e);
	return (
		e && (n[`has-${e}`] = !0),
		i.filter(n),
		(r = await i.fetch()),
		r.data ? t.transform(r) : null
	);
}
async function v_(e) {
	const { $twill: t } = Re();
	let r;
	const n = { published: !0 },
		i = t
			.find("greenhouse-departments")
			.sort("name")
			.query("withCount", e)
			.filter({ published: !0 })
			.include(e)
			.page({ size: 200 });
	return (
		e && (n[`has-${e}`] = !0),
		i.filter(n),
		(r = await i.fetch()),
		r.data ? t.transform(r) : null
	);
}
async function __({ topics: e = [], size: t = 3, options: r = {} } = {}) {
	const { $twill: n } = Re();
	let i;
	const a = { published: !0 },
		s = n
			.find("customer-stories")
			.sort("-publicationDate,-createdAt")
			.page({ size: t })
			.include(["media"]);
	return (
		e && e.length && (a.topics = { slug: e }),
		r.exclude && (a.exclude = r.exclude),
		s.filter(a),
		(i = await s.fetch()),
		i.data ? n.transform(i) : null
	);
}
async function w_(e) {
	const { $twill: t } = Re();
	let r;
	const n = { published: !0 },
		i = t.find("products").sort("title");
	return (
		e && ((n[e] = { published: !0 }), i.query("withCount", e)),
		i.filter(n),
		(r = await i.fetch()),
		r.data ? t.transform(r) : null
	);
}
async function S_(e) {
	const { $twill: t } = Re(),
		r = e.sort ?? "-createdAt",
		n = e.topics ?? null,
		i = e.models ?? null,
		a = e.contentTypes ?? null,
		s = e.authors ?? null,
		o = e.pageSize ?? null,
		l = e.pageNumber ?? null,
		c = e.search ?? null,
		u = t
			.find("research-publications")
			.include([
				"media",
				"topics",
				"models",
				"content-types",
				"research-publication-links",
			])
			.sort(r)
			.filter({ published: !0 });
	return (
		o && u.page({ size: o }),
		c && u.query("search", c),
		n && u.filter({ topics: { slugs: Array.isArray(n) ? n : [n] } }),
		i && u.filter({ models: { slugs: Array.isArray(i) ? i : [i] } }),
		a && u.filter({ "content-types": { slugs: Array.isArray(a) ? a : [a] } }),
		s && u.filter({ authors: Array.isArray(s) ? s : [s] }),
		l && u.page({ number: l }),
		u.fetch().then((d) => {
			var p;
			return {
				page: (p = d == null ? void 0 : d.meta) == null ? void 0 : p.page,
				resources: t.transform(d),
			};
		})
	);
}
async function E_(e) {
	const { $twill: t } = Re(),
		r = e.sort ?? "-createdAt",
		n = e.topics ?? null,
		i = e.authors ?? null,
		a = e.pageSize ?? null,
		s = e.pageNumber ?? null,
		o = e.search ?? null,
		l = t
			.find("blog-details")
			.include(["media", "topics", "authors"])
			.sort(r)
			.filter({ published: !0 });
	return (
		a && l.page({ size: a }),
		o && l.query("search", o),
		n && l.filter({ topics: { slugs: Array.isArray(n) ? n : [n] } }),
		i && l.filter({ authors: Array.isArray(i) ? i : [i] }),
		s && l.page({ number: s }),
		l.fetch().then((c) => {
			var u;
			return {
				page: (u = c == null ? void 0 : c.meta) == null ? void 0 : u.page,
				resources: t.transform(c),
			};
		})
	);
}
async function x_(e) {
	const { $twill: t } = Re(),
		r = e.sort ?? "-createdAt",
		n = e.pageSize ?? null,
		i = e.pageNumber ?? null,
		a = e.search ?? null,
		s = t
			.find("blog-series")
			.include(["media"])
			.sort(r)
			.filter({ published: !0 });
	return (
		n && s.page({ size: n }),
		a && s.query("search", a),
		i && s.page({ number: i }),
		s.fetch().then((o) => {
			var l;
			return {
				page: (l = o == null ? void 0 : o.meta) == null ? void 0 : l.page,
				resources: t.transform(o),
			};
		})
	);
}
async function T_(e) {
	const { $twill: t } = Re(),
		r = e.sort ?? "-createdAt",
		n = e.topics ?? null,
		i = e.products ?? null,
		a = e.pageSize ?? null,
		s = e.pageNumber ?? null,
		o = e.search ?? null,
		l = t
			.find("customer-stories")
			.include(["media", "topics", "products"])
			.sort(r)
			.filter({ published: !0 });
	return (
		a && l.page({ size: a }),
		o && l.query("search", o),
		n && l.filter({ topics: { slugs: Array.isArray(n) ? n : [n] } }),
		i && l.filter({ products: { slugs: Array.isArray(i) ? i : [i] } }),
		s && l.page({ number: s }),
		l.fetch().then((c) => {
			var u;
			return {
				page: (u = c == null ? void 0 : c.meta) == null ? void 0 : u.page,
				resources: t.transform(c),
			};
		})
	);
}
async function k_(e) {
	const { $twill: t } = Re(),
		r = e.sort ?? "-createdAt",
		n = e.pageSize ?? null,
		i = e.pageNumber ?? null,
		a = e.search ?? null,
		s = t.find("landings").sort(r).filter({ published: !0 });
	return (
		n && s.page({ size: n }),
		a && s.query("search", a),
		i && s.page({ number: i }),
		s.fetch().then((o) => {
			var l;
			return {
				page: (l = o == null ? void 0 : o.meta) == null ? void 0 : l.page,
				resources: t.transform(o),
			};
		})
	);
}
async function A_(e) {
	const { $twill: t } = Re(),
		r = e.sort ?? "-createdAt",
		n = e.pageSize ?? null,
		i = e.pageNumber ?? null,
		a = e.search ?? null,
		s = t.find("products").sort(r).filter({ published: !0 });
	return (
		n && s.page({ size: n }),
		a && s.query("search", a),
		i && s.page({ number: i }),
		s.fetch().then((o) => {
			var l;
			return {
				page: (l = o == null ? void 0 : o.meta) == null ? void 0 : l.page,
				resources: t.transform(o),
			};
		})
	);
}
const R_ = {
		blogSeriesBySlug: h_,
		landingBySlug: V9,
		productBySlug: K9,
		researchPublicationBySlug: W9,
		blogDetailsByBlogSeriesSlug: p_,
		indexResearchPublications: S_,
		indexBlogDetails: E_,
		indexBlogSeries: x_,
		indexCustomerStories: T_,
		indexLandings: k_,
		indexProducts: A_,
		interactiveTabs: u_,
		blogDetailsLatest: Wb,
		customerStoriesLatest: __,
		researchPublicationsByTopics: Y9,
		blogSeriesLatest: f_,
		greenhouseJobsLatest: d_,
		authorsWhereHas: m_,
		contentTypesWhereHas: g_,
		modelsWhereHas: y_,
		topicsWhereHas: b_,
		departmentsWhereHas: v_,
		productsWhereHas: w_,
	},
	M_ = "research",
	O_ = "product";
function gt(e, t) {
	if (typeof e > "u" || e === null) return null;
	let r;
	switch (e.type) {
		case i_:
			r = "/";
			break;
		case l_:
			r = "/research";
			break;
		case Z9:
			r = "/blog/series";
			break;
		case J9:
			r = "/blog";
			break;
		case r_:
			r = "/customer-stories";
			break;
		case t_:
			r = "/careers/search";
			break;
	}
	if (r) return r;
	switch (e.type) {
		case Ka:
			r = `/research/${e.slug}`;
			break;
		case s0:
			switch (e.scope) {
				case M_:
					r = `/research/${e.nestedSlug}`;
					break;
				case O_:
					r = `/product/${e.nestedSlug}`;
					break;
				default:
					r = `/${e.nestedSlug}`;
			}
			break;
		case Q9:
			r = `/research?contentTypes=${e.slug}`;
			break;
		case s_:
			r = `/research?models=${e.slug}`;
			break;
		case c_:
			(t == null ? void 0 : t.context) === "customer-stories"
				? (r = `/customer-stories?topics=${e.slug}`)
				: (t == null ? void 0 : t.context) === "blog-details"
				? (r = `/blog?topics=${e.slug}`)
				: (r = `/research?topics=${e.slug}`);
			break;
		case o_:
			if ((t == null ? void 0 : t.context) === Ka) {
				r = `/research?authors=${e.slug}`;
				break;
			}
			if ((t == null ? void 0 : t.context) === oc) {
				r = `/blog?authors=${e.slug}`;
				break;
			}
		case oc:
			r = `/blog/${e.slug}`;
			break;
		case eg:
			r = `/blog/series/${e.slug}`;
			break;
		case n_:
			r = `/careers/${e.slug}`;
			break;
		case rg:
			r = `/${e.slug}`;
			break;
		case tg:
			r = `/customer-stories/${e.slug}`;
			break;
	}
	return r;
}
var N_ =
	typeof global == "object" && global && global.Object === Object && global;
const C_ = N_;
var I_ = typeof self == "object" && self && self.Object === Object && self,
	D_ = C_ || I_ || Function("return this")();
const B_ = D_;
var P_ = B_.Symbol;
const Hi = P_;
var ng = Object.prototype,
	L_ = ng.hasOwnProperty,
	z_ = ng.toString,
	da = Hi ? Hi.toStringTag : void 0;
function $_(e) {
	var t = L_.call(e, da),
		r = e[da];
	try {
		e[da] = void 0;
		var n = !0;
	} catch {}
	var i = z_.call(e);
	return n && (t ? (e[da] = r) : delete e[da]), i;
}
var F_ = Object.prototype,
	H_ = F_.toString;
function U_(e) {
	return H_.call(e);
}
var j_ = "[object Null]",
	q_ = "[object Undefined]",
	Th = Hi ? Hi.toStringTag : void 0;
function G_(e) {
	return e == null
		? e === void 0
			? q_
			: j_
		: Th && Th in Object(e)
		? $_(e)
		: U_(e);
}
function Y_(e) {
	return e != null && typeof e == "object";
}
var W_ = "[object Symbol]";
function V_(e) {
	return typeof e == "symbol" || (Y_(e) && G_(e) == W_);
}
function K_(e, t) {
	for (var r = -1, n = e == null ? 0 : e.length, i = Array(n); ++r < n; )
		i[r] = t(e[r], r, e);
	return i;
}
var X_ = Array.isArray;
const J_ = X_;
var Z_ = 1 / 0,
	kh = Hi ? Hi.prototype : void 0,
	Ah = kh ? kh.toString : void 0;
function ig(e) {
	if (typeof e == "string") return e;
	if (J_(e)) return K_(e, ig) + "";
	if (V_(e)) return Ah ? Ah.call(e) : "";
	var t = e + "";
	return t == "0" && 1 / e == -Z_ ? "-0" : t;
}
function o0(e) {
	return e == null ? "" : ig(e);
}
function Q_(e, t, r) {
	var n = -1,
		i = e.length;
	t < 0 && (t = -t > i ? 0 : i + t),
		(r = r > i ? i : r),
		r < 0 && (r += i),
		(i = t > r ? 0 : (r - t) >>> 0),
		(t >>>= 0);
	for (var a = Array(i); ++n < i; ) a[n] = e[n + t];
	return a;
}
function ew(e, t, r) {
	var n = e.length;
	return (r = r === void 0 ? n : r), !t && r >= n ? e : Q_(e, t, r);
}
var tw = "\\ud800-\\udfff",
	rw = "\\u0300-\\u036f",
	nw = "\\ufe20-\\ufe2f",
	iw = "\\u20d0-\\u20ff",
	aw = rw + nw + iw,
	sw = "\\ufe0e\\ufe0f",
	ow = "\\u200d",
	lw = RegExp("[" + ow + tw + aw + sw + "]");
function ag(e) {
	return lw.test(e);
}
function cw(e) {
	return e.split("");
}
var sg = "\\ud800-\\udfff",
	uw = "\\u0300-\\u036f",
	fw = "\\ufe20-\\ufe2f",
	dw = "\\u20d0-\\u20ff",
	hw = uw + fw + dw,
	pw = "\\ufe0e\\ufe0f",
	mw = "[" + sg + "]",
	lc = "[" + hw + "]",
	cc = "\\ud83c[\\udffb-\\udfff]",
	gw = "(?:" + lc + "|" + cc + ")",
	og = "[^" + sg + "]",
	lg = "(?:\\ud83c[\\udde6-\\uddff]){2}",
	cg = "[\\ud800-\\udbff][\\udc00-\\udfff]",
	yw = "\\u200d",
	ug = gw + "?",
	fg = "[" + pw + "]?",
	bw = "(?:" + yw + "(?:" + [og, lg, cg].join("|") + ")" + fg + ug + ")*",
	vw = fg + ug + bw,
	_w = "(?:" + [og + lc + "?", lc, lg, cg, mw].join("|") + ")",
	ww = RegExp(cc + "(?=" + cc + ")|" + _w + vw, "g");
function Sw(e) {
	return e.match(ww) || [];
}
function Ew(e) {
	return ag(e) ? Sw(e) : cw(e);
}
function xw(e) {
	return function (t) {
		t = o0(t);
		var r = ag(t) ? Ew(t) : void 0,
			n = r ? r[0] : t.charAt(0),
			i = r ? ew(r, 1).join("") : t.slice(1);
		return n[e]() + i;
	};
}
var Tw = xw("toUpperCase");
const kw = Tw;
function Aw(e) {
	return kw(o0(e).toLowerCase());
}
function Rw(e, t, r, n) {
	var i = -1,
		a = e == null ? 0 : e.length;
	for (n && a && (r = e[++i]); ++i < a; ) r = t(r, e[i], i, e);
	return r;
}
function Mw(e) {
	return function (t) {
		return e == null ? void 0 : e[t];
	};
}
var Ow = {
		À: "A",
		Á: "A",
		Â: "A",
		Ã: "A",
		Ä: "A",
		Å: "A",
		à: "a",
		á: "a",
		â: "a",
		ã: "a",
		ä: "a",
		å: "a",
		Ç: "C",
		ç: "c",
		Ð: "D",
		ð: "d",
		È: "E",
		É: "E",
		Ê: "E",
		Ë: "E",
		è: "e",
		é: "e",
		ê: "e",
		ë: "e",
		Ì: "I",
		Í: "I",
		Î: "I",
		Ï: "I",
		ì: "i",
		í: "i",
		î: "i",
		ï: "i",
		Ñ: "N",
		ñ: "n",
		Ò: "O",
		Ó: "O",
		Ô: "O",
		Õ: "O",
		Ö: "O",
		Ø: "O",
		ò: "o",
		ó: "o",
		ô: "o",
		õ: "o",
		ö: "o",
		ø: "o",
		Ù: "U",
		Ú: "U",
		Û: "U",
		Ü: "U",
		ù: "u",
		ú: "u",
		û: "u",
		ü: "u",
		Ý: "Y",
		ý: "y",
		ÿ: "y",
		Æ: "Ae",
		æ: "ae",
		Þ: "Th",
		þ: "th",
		ß: "ss",
		Ā: "A",
		Ă: "A",
		Ą: "A",
		ā: "a",
		ă: "a",
		ą: "a",
		Ć: "C",
		Ĉ: "C",
		Ċ: "C",
		Č: "C",
		ć: "c",
		ĉ: "c",
		ċ: "c",
		č: "c",
		Ď: "D",
		Đ: "D",
		ď: "d",
		đ: "d",
		Ē: "E",
		Ĕ: "E",
		Ė: "E",
		Ę: "E",
		Ě: "E",
		ē: "e",
		ĕ: "e",
		ė: "e",
		ę: "e",
		ě: "e",
		Ĝ: "G",
		Ğ: "G",
		Ġ: "G",
		Ģ: "G",
		ĝ: "g",
		ğ: "g",
		ġ: "g",
		ģ: "g",
		Ĥ: "H",
		Ħ: "H",
		ĥ: "h",
		ħ: "h",
		Ĩ: "I",
		Ī: "I",
		Ĭ: "I",
		Į: "I",
		İ: "I",
		ĩ: "i",
		ī: "i",
		ĭ: "i",
		į: "i",
		ı: "i",
		Ĵ: "J",
		ĵ: "j",
		Ķ: "K",
		ķ: "k",
		ĸ: "k",
		Ĺ: "L",
		Ļ: "L",
		Ľ: "L",
		Ŀ: "L",
		Ł: "L",
		ĺ: "l",
		ļ: "l",
		ľ: "l",
		ŀ: "l",
		ł: "l",
		Ń: "N",
		Ņ: "N",
		Ň: "N",
		Ŋ: "N",
		ń: "n",
		ņ: "n",
		ň: "n",
		ŋ: "n",
		Ō: "O",
		Ŏ: "O",
		Ő: "O",
		ō: "o",
		ŏ: "o",
		ő: "o",
		Ŕ: "R",
		Ŗ: "R",
		Ř: "R",
		ŕ: "r",
		ŗ: "r",
		ř: "r",
		Ś: "S",
		Ŝ: "S",
		Ş: "S",
		Š: "S",
		ś: "s",
		ŝ: "s",
		ş: "s",
		š: "s",
		Ţ: "T",
		Ť: "T",
		Ŧ: "T",
		ţ: "t",
		ť: "t",
		ŧ: "t",
		Ũ: "U",
		Ū: "U",
		Ŭ: "U",
		Ů: "U",
		Ű: "U",
		Ų: "U",
		ũ: "u",
		ū: "u",
		ŭ: "u",
		ů: "u",
		ű: "u",
		ų: "u",
		Ŵ: "W",
		ŵ: "w",
		Ŷ: "Y",
		ŷ: "y",
		Ÿ: "Y",
		Ź: "Z",
		Ż: "Z",
		Ž: "Z",
		ź: "z",
		ż: "z",
		ž: "z",
		Ĳ: "IJ",
		ĳ: "ij",
		Œ: "Oe",
		œ: "oe",
		ŉ: "'n",
		ſ: "s",
	},
	Nw = Mw(Ow);
const Cw = Nw;
var Iw = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,
	Dw = "\\u0300-\\u036f",
	Bw = "\\ufe20-\\ufe2f",
	Pw = "\\u20d0-\\u20ff",
	Lw = Dw + Bw + Pw,
	zw = "[" + Lw + "]",
	$w = RegExp(zw, "g");
function Fw(e) {
	return (e = o0(e)), e && e.replace(Iw, Cw).replace($w, "");
}
var Hw = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
function Uw(e) {
	return e.match(Hw) || [];
}
var jw = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
function qw(e) {
	return jw.test(e);
}
var dg = "\\ud800-\\udfff",
	Gw = "\\u0300-\\u036f",
	Yw = "\\ufe20-\\ufe2f",
	Ww = "\\u20d0-\\u20ff",
	Vw = Gw + Yw + Ww,
	hg = "\\u2700-\\u27bf",
	pg = "a-z\\xdf-\\xf6\\xf8-\\xff",
	Kw = "\\xac\\xb1\\xd7\\xf7",
	Xw = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf",
	Jw = "\\u2000-\\u206f",
	Zw =
		" \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",
	mg = "A-Z\\xc0-\\xd6\\xd8-\\xde",
	Qw = "\\ufe0e\\ufe0f",
	gg = Kw + Xw + Jw + Zw,
	yg = "['’]",
	Rh = "[" + gg + "]",
	eS = "[" + Vw + "]",
	bg = "\\d+",
	tS = "[" + hg + "]",
	vg = "[" + pg + "]",
	_g = "[^" + dg + gg + bg + hg + pg + mg + "]",
	rS = "\\ud83c[\\udffb-\\udfff]",
	nS = "(?:" + eS + "|" + rS + ")",
	iS = "[^" + dg + "]",
	wg = "(?:\\ud83c[\\udde6-\\uddff]){2}",
	Sg = "[\\ud800-\\udbff][\\udc00-\\udfff]",
	ci = "[" + mg + "]",
	aS = "\\u200d",
	Mh = "(?:" + vg + "|" + _g + ")",
	sS = "(?:" + ci + "|" + _g + ")",
	Oh = "(?:" + yg + "(?:d|ll|m|re|s|t|ve))?",
	Nh = "(?:" + yg + "(?:D|LL|M|RE|S|T|VE))?",
	Eg = nS + "?",
	xg = "[" + Qw + "]?",
	oS = "(?:" + aS + "(?:" + [iS, wg, Sg].join("|") + ")" + xg + Eg + ")*",
	lS = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",
	cS = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])",
	uS = xg + Eg + oS,
	fS = "(?:" + [tS, wg, Sg].join("|") + ")" + uS,
	dS = RegExp(
		[
			ci + "?" + vg + "+" + Oh + "(?=" + [Rh, ci, "$"].join("|") + ")",
			sS + "+" + Nh + "(?=" + [Rh, ci + Mh, "$"].join("|") + ")",
			ci + "?" + Mh + "+" + Oh,
			ci + "+" + Nh,
			cS,
			lS,
			bg,
			fS,
		].join("|"),
		"g"
	);
function hS(e) {
	return e.match(dS) || [];
}
function pS(e, t, r) {
	return (
		(e = o0(e)),
		(t = r ? void 0 : t),
		t === void 0 ? (qw(e) ? hS(e) : Uw(e)) : e.match(t) || []
	);
}
var mS = "['’]",
	gS = RegExp(mS, "g");
function yS(e) {
	return function (t) {
		return Rw(pS(Fw(t).replace(gS, "")), e, "");
	};
}
var bS = yS(function (e, t, r) {
	return (t = t.toLowerCase()), e + (r ? Aw(t) : t);
});
const uc = bS;
function Tg(e, t) {
	const { namePrefix: r, defaultText: n, defaultUrl: i } = t || {},
		a = ({
			linkType: s,
			linkLabel: o,
			linkUrl: l,
			linkDownload: c,
			browserName: u,
			resource: d,
		}) => {
			var m;
			let p = {};
			if (s === "none") return null;
			if (
				(s === "default" && n && i && ((p.text = n), (p.url = i)),
				s === "external" &&
					o &&
					l &&
					((p.text = o), (p.url = l), (p.download = c)),
				s === "internal")
			) {
				const b = (m = d.relatedItems[u]) == null ? void 0 : m[0];
				b ? ((p.text = o ?? b.title), (p.url = gt(b))) : (p = {});
			}
			return p;
		};
	return a(
		r
			? {
					linkType: e.content[`${r}LinkType`],
					linkLabel: e.content[`${r}LinkLabel`],
					linkDownload: e.content[`${r}LinkDownload`],
					linkUrl: e.content[`${r}LinkUrl`],
					browserName: uc(`${r}_link_item`),
					resource: e,
			  }
			: {
					linkType: e.content.linkType,
					linkLabel: e.content.linkLabel,
					linkUrl: e.content.linkUrl,
					linkDownload: e.content.linkDownload,
					browserName: uc("link_item"),
					resource: e,
			  }
	);
}
const vS = (e) => Tg(e);
function kg(e, t) {
	var n;
	const r = ((n = e.meta) == null ? void 0 : n.browsers) || {};
	return (e.relatedItems[t] || []).filter((i) => {
		if (!i) return null;
		if (e.type !== "blocks") return !0;
		const a = r[t],
			s = parseInt(i.id);
		return a && a.includes(s);
	});
}
function $u(e, t) {
	const r = kg(e, t);
	return r != null && r.length ? r[0] : null;
}
function Fu(e, t, r = null) {
	const n = uc(t),
		i = e.media[n] ?? null;
	return i ? (r ? (i == null ? void 0 : i.map((a) => a[r] || {})) : i) : null;
}
function Ar(e, t, r = null) {
	const n = Fu(e, t, r);
	return n != null && n.length ? n[0] : null;
}
function Hu(e) {
	var r;
	if (!e) return null;
	const t = { type: e.type, id: e.id };
	switch (e.type) {
		case rg:
			(t.title = e.title),
				(t.image = Ar(e, "cover", "default")),
				(t.link = { text: "Learn more", url: gt(e) });
			break;
		case oc:
			(t.title = e.title),
				(t.image = Ar(e, "heroImage", "half-width")),
				(t.link = { url: gt(e) }),
				(t.meta = {
					date: e.publicationDate,
					tags:
						(r = e.tags) == null ? void 0 : r.map((n) => ({ text: n.title })),
				});
			break;
		case eg:
			(t.title = e.title),
				(t.subtitle = e.description),
				(t.image = Ar(e, "cover", "default")),
				(t.meta = { date: e.publicationDate }),
				(t.link = { url: gt(e) });
			break;
		case tg:
			(t.title = e.title),
				(t.subtitle = e.description),
				(t.image = Ar(e, "cover", "half-width")),
				(t.meta = {}),
				(t.link = { url: gt(e) });
			break;
		case s0:
			(t.title = e.title),
				(t.image = Ar(e, "heroImage", "half-width")),
				(t.link = { text: "Learn more", url: gt(e) });
			break;
		case Ka:
			(t.title = e.title),
				(t.subtitle = e.description),
				(t.image = Ar(e, "cover", "listing")),
				(t.link = { url: gt(e) }),
				(t.meta = { date: e.publicationDate });
			break;
	}
	return t;
}
function l0(e, t = {}) {
	var n;
	if (!e || !e.length) return [];
	const r = e.map((i) => Hu(i));
	return (n = Object.keys(t)) != null && n.length
		? r.map((i) =>
				t[i.type]
					? [...t[i.type], "id", "type"].reduce(
							(a, s) => ((a[s] = i[s]), a),
							{}
					  )
					: i
		  )
		: r;
}
function _S(e, t = {}) {
	return l0(e, { [s0]: ["title", "link", "meta"] });
}
function wS(e) {
	return l0(e, { [Ka]: ["title", "image", "link", "meta"] });
}
function SS(e) {
	return l0(e, { [s0]: ["title", "link", "image"] });
}
function ES(e) {
	const {
		inheritance: t,
		item_blurb: r,
		item_link_download: n,
		item_link_label: i,
		item_link_type: a,
		item_link_url: s,
		item_title: o,
	} = e.content;
	let l = o,
		c = Ar(e, "listingMixedItemImage", "default"),
		u = null,
		d = r;
	const p = { text: i, url: s };
	if (a === "internal") {
		const m = $u(e, "item");
		if ((t != null && t.includes("title") && m && (l = m.title), m)) {
			let b;
			try {
				b = Hu(m);
			} catch (E) {
				console.log(E);
			}
			if (t != null && t.includes("image"))
				try {
					c = b.image ?? c;
				} catch (E) {
					console.log(E);
				}
			t != null && t.includes("blurb") && b.meta
				? (u = b.meta)
				: t != null && t.includes("blurb") && b.subtitle && (d = b.subtitle),
				a === "internal" && (p.url = gt(m)),
				m.type === "landings" &&
					!i &&
					(p.text = b.link.text ? b.link.text : "Learn more");
		}
	}
	return { title: l, subtitle: d, image: c, link: p, meta: u };
}
const xS = (e) => {
		var t;
		return (t = e.links) == null
			? void 0
			: t.map((r) => ({
					text: r.label,
					url: r.url,
					style: r.style,
					download: !!r.download,
					disabled: !!r.disabled,
					target: r.target,
			  }));
	},
	TS = (e) => {
		const t = Fu(e, "tabContent", "default");
		return t
			? t.length > 1
				? t.map((r) => ({
						image: {
							src: r.src,
							ratio: r.ratio ? r.ratio.replace(":", "x") : "ratio-free",
							alt: r.alt,
						},
						caption: r.caption,
						credit: r.credit,
				  }))
				: t.map((r) => ({
						src: r.src,
						ratio: r.ratio ? r.ratio.replace(":", "x") : "ratio-free",
						alt: r.alt,
						caption: r.caption,
						credit: r.credit,
				  }))
			: null;
	};
function kS({ resource: e, tabs: t }) {
	return {
		title: e.displayTitle,
		interactiveType: e.interactiveType,
		textBeforeDropdown: e.textBeforeDropdown,
		textAfterDropdown: e.textAfterDropdown,
		tabs: t.map((r) => ({
			title: r.title,
			position: r.position,
			content: r.interactiveTabContents.map((n) => {
				var i, a, s;
				return {
					position: n.position,
					subtitle: n.subtitle,
					label: n.label,
					contentType: n.contentType,
					content: n.text,
					code: n.code,
					lang: n.lang,
					images: TS(n),
					snippet:
						(a = (i = n.relatedItems) == null ? void 0 : i.snippets) != null &&
						a.length
							? (s = n.relatedItems) == null
								? void 0
								: s.snippets[0]
							: null,
				};
			}),
		})),
	};
}
function Ag(e) {
	const t = e.researchPublicationLinks ?? null;
	return t == null
		? void 0
		: t.map((r) => {
				const n = r.href;
				let i = r.title;
				return (
					!i && r.type === "paper"
						? (i = "Read paper")
						: !i && r.type === "code" && (i = "View code"),
					{ href: n, title: i, type: r.type, type: r.type }
				);
		  });
}
function Rg(e) {
	const t = Ag(e);
	return Array.isArray(t) && t.length
		? t.find(({ type: r }) => r === "paper")
		: null;
}
const AS = "+2 (Full bleed)",
	RS = "+1 (No bleed)",
	xP = "level-1",
	MS = "level-2";
function OS(e) {
	return e == null
		? void 0
		: e.map((t) => {
				var a;
				const r = Rg(t),
					n = t.template === MS ? AS : RS,
					i = Ar(t, "cover", n);
				return {
					type: t.type,
					id: t.id,
					title: t.title,
					date: t.publicationDate,
					url: gt(t),
					resource: {
						text: r == null ? void 0 : r.title,
						url: r == null ? void 0 : r.href,
					},
					image: {
						src: i == null ? void 0 : i.src,
						alt: i == null ? void 0 : i.alt,
					},
					tags:
						(a = t.topics) == null
							? void 0
							: a.map((s) => ({
									text: s == null ? void 0 : s.title,
									url: gt(s),
							  })),
				};
		  });
}
function NS(e) {
	var n, i;
	const t = [],
		r = (a) =>
			t.push({ text: a.title, url: gt(a, { context: "customer-stories" }) });
	return (
		(n = e.topics) == null || n.map(r), (i = e.products) == null || i.map(r), t
	);
}
function CS(e) {
	var n, i, a;
	const t = [],
		r = (s) => t.push({ text: s.title, url: gt(s) });
	return (
		(n = e.topics) == null || n.map(r),
		(i = e.models) == null || i.map(r),
		(a = e.contentTypes) == null || a.map(r),
		t
	);
}
function IS(e) {
	var n;
	const t =
			(n = e.authorGroups) == null
				? void 0
				: n.map((i) => {
						var a;
						return {
							title: i.title,
							links:
								(a = i.authors) == null
									? void 0
									: a.map((s) => ({
											text: s.fullname,
											url: gt(s, { context: Ka }),
									  })),
						};
				  }),
		r = [[], []];
	for (let i = 0; i < t.length; i++)
		(i === 0 || i === 1) &&
			(t[i].title || t[i].links.length) &&
			r[0].push(t[i]),
			(i === 2 || i === 3) &&
				(t[i].title || t[i].links.length) &&
				r[1].push(t[i]);
	return r;
}
const DS = (e, t) =>
		e
			.filter((r) => r.bucketKey === t)
			.sort((r, n) => r.position - n.position)
			.map((r) => r.featured),
	Mg = (e) => {
		if (!e) return null;
		let t, r;
		if (e.type === e_) {
			if (e.linkType === "internal") {
				const n = $u(e, "links");
				r = e.label.length > 0 ? e.label : n.title;
				try {
					t = gt(n);
				} catch (i) {
					console.error(i);
				}
			}
			return (
				e.linkType === "external" && ((r = e.label), (t = e.url)),
				{ text: r, url: t }
			);
		} else (r = e.title), (t = gt(e));
		return !r || !t ? null : { text: r, url: t };
	},
	BS = (e) =>
		e &&
		e.length &&
		e
			.map(Mg)
			.filter((t) => t)
			.filter((t) => t.url),
	PS = (e) => {
		const t = [];
		let r = "",
			n = !1,
			i = !1;
		for (let a = 0; a < e.length; a++)
			e.substring(a, a + 2) === "$$" && !i
				? (n
						? (t.push({ math: r }), (n = !1))
						: (r !== "" && t.push(r), (n = !0)),
				  (r = ""),
				  a++)
				: e.substring(a, a + 2) === "##" && !n
				? (i
						? (t.push({ block: r }), (i = !1))
						: (r !== "" && t.push(r), (i = !0)),
				  (r = ""),
				  a++)
				: (r += e[a]);
		return r !== "" && t.push(r), t;
	},
	fc = (e) => {
		let t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
		return t
			? [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)]
			: null;
	},
	Og = (e) =>
		"#" +
		e
			.map((t) => {
				const r = t.toString(16);
				return r.length === 1 ? "0" + r : r;
			})
			.join(""),
	LS = (e, t, r) => {
		r = Math.max(0, Math.min(1, r));
		let n = fc(e),
			i = fc(t);
		if (!n || !i) throw new Error("Invalid color!");
		let a = n.map((s, o) => Math.round(s + r * (i[o] - s)));
		return Og(a);
	},
	zS = (e) => getComputedStyle(document.documentElement).getPropertyValue(e),
	$S = {
		blocks: { featureLink: vS, listingLink: Tg, listingMixedItem: ES },
		buckets: { byKey: DS, navigationLink: Mg, navigationLinks: BS },
		customerStories: { tags: NS },
		interactives: { tabs: kS },
		media: { imageByRole: Ar, imagesByRole: Fu },
		relatedItems: { browser: kg, firstBrowserItem: $u },
		researchPublications: {
			links: Ag,
			indexItems: OS,
			firstPaperLink: Rg,
			tags: CS,
			authors: IS,
		},
		card: Hu,
		cards: l0,
		heroLinks: xS,
		searchCardItems: _S,
		researchPublicationCardItems: wS,
		landingCardItems: SS,
		route: gt,
		math: { getSegmentsFromString: PS },
		color: { hexToRgb: fc, rgbToHex: Og, interpolate: LS, cssVarToHex: zS },
	},
	FS = Ct(() => ({ provide: { api: R_, helpers: $S } })),
	HS = Ct((e) => {
		e.hook("app:error", (t) => {
			t.toString().includes("Failed to fetch dynamically imported module") &&
				window.location.reload();
		});
	});
var Uu = { exports: {} };
function ju(e) {
	return (
		e instanceof Map
			? (e.clear =
					e.delete =
					e.set =
						function () {
							throw new Error("map is read-only");
						})
			: e instanceof Set &&
			  (e.add =
					e.clear =
					e.delete =
						function () {
							throw new Error("set is read-only");
						}),
		Object.freeze(e),
		Object.getOwnPropertyNames(e).forEach(function (t) {
			var r = e[t];
			typeof r == "object" && !Object.isFrozen(r) && ju(r);
		}),
		e
	);
}
Uu.exports = ju;
Uu.exports.default = ju;
let Ch = class {
	constructor(t) {
		t.data === void 0 && (t.data = {}),
			(this.data = t.data),
			(this.isMatchIgnored = !1);
	}
	ignoreMatch() {
		this.isMatchIgnored = !0;
	}
};
function Ng(e) {
	return e
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#x27;");
}
function ln(e, ...t) {
	const r = Object.create(null);
	for (const n in e) r[n] = e[n];
	return (
		t.forEach(function (n) {
			for (const i in n) r[i] = n[i];
		}),
		r
	);
}
const US = "</span>",
	Ih = (e) => !!e.scope || (e.sublanguage && e.language),
	jS = (e, { prefix: t }) => {
		if (e.includes(".")) {
			const r = e.split(".");
			return [
				`${t}${r.shift()}`,
				...r.map((n, i) => `${n}${"_".repeat(i + 1)}`),
			].join(" ");
		}
		return `${t}${e}`;
	};
class qS {
	constructor(t, r) {
		(this.buffer = ""), (this.classPrefix = r.classPrefix), t.walk(this);
	}
	addText(t) {
		this.buffer += Ng(t);
	}
	openNode(t) {
		if (!Ih(t)) return;
		let r = "";
		t.sublanguage
			? (r = `language-${t.language}`)
			: (r = jS(t.scope, { prefix: this.classPrefix })),
			this.span(r);
	}
	closeNode(t) {
		Ih(t) && (this.buffer += US);
	}
	value() {
		return this.buffer;
	}
	span(t) {
		this.buffer += `<span class="${t}">`;
	}
}
const Dh = (e = {}) => {
	const t = { children: [] };
	return Object.assign(t, e), t;
};
class qu {
	constructor() {
		(this.rootNode = Dh()), (this.stack = [this.rootNode]);
	}
	get top() {
		return this.stack[this.stack.length - 1];
	}
	get root() {
		return this.rootNode;
	}
	add(t) {
		this.top.children.push(t);
	}
	openNode(t) {
		const r = Dh({ scope: t });
		this.add(r), this.stack.push(r);
	}
	closeNode() {
		if (this.stack.length > 1) return this.stack.pop();
	}
	closeAllNodes() {
		for (; this.closeNode(); );
	}
	toJSON() {
		return JSON.stringify(this.rootNode, null, 4);
	}
	walk(t) {
		return this.constructor._walk(t, this.rootNode);
	}
	static _walk(t, r) {
		return (
			typeof r == "string"
				? t.addText(r)
				: r.children &&
				  (t.openNode(r),
				  r.children.forEach((n) => this._walk(t, n)),
				  t.closeNode(r)),
			t
		);
	}
	static _collapse(t) {
		typeof t != "string" &&
			t.children &&
			(t.children.every((r) => typeof r == "string")
				? (t.children = [t.children.join("")])
				: t.children.forEach((r) => {
						qu._collapse(r);
				  }));
	}
}
class GS extends qu {
	constructor(t) {
		super(), (this.options = t);
	}
	addKeyword(t, r) {
		t !== "" && (this.openNode(r), this.addText(t), this.closeNode());
	}
	addText(t) {
		t !== "" && this.add(t);
	}
	addSublanguage(t, r) {
		const n = t.root;
		(n.sublanguage = !0), (n.language = r), this.add(n);
	}
	toHTML() {
		return new qS(this, this.options).value();
	}
	finalize() {
		return !0;
	}
}
function Xa(e) {
	return e ? (typeof e == "string" ? e : e.source) : null;
}
function Cg(e) {
	return ri("(?=", e, ")");
}
function YS(e) {
	return ri("(?:", e, ")*");
}
function WS(e) {
	return ri("(?:", e, ")?");
}
function ri(...e) {
	return e.map((r) => Xa(r)).join("");
}
function VS(e) {
	const t = e[e.length - 1];
	return typeof t == "object" && t.constructor === Object
		? (e.splice(e.length - 1, 1), t)
		: {};
}
function Gu(...e) {
	return (
		"(" + (VS(e).capture ? "" : "?:") + e.map((n) => Xa(n)).join("|") + ")"
	);
}
function Ig(e) {
	return new RegExp(e.toString() + "|").exec("").length - 1;
}
function KS(e, t) {
	const r = e && e.exec(t);
	return r && r.index === 0;
}
const XS = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;
function Yu(e, { joinWith: t }) {
	let r = 0;
	return e
		.map((n) => {
			r += 1;
			const i = r;
			let a = Xa(n),
				s = "";
			for (; a.length > 0; ) {
				const o = XS.exec(a);
				if (!o) {
					s += a;
					break;
				}
				(s += a.substring(0, o.index)),
					(a = a.substring(o.index + o[0].length)),
					o[0][0] === "\\" && o[1]
						? (s += "\\" + String(Number(o[1]) + i))
						: ((s += o[0]), o[0] === "(" && r++);
			}
			return s;
		})
		.map((n) => `(${n})`)
		.join(t);
}
const JS = /\b\B/,
	Dg = "[a-zA-Z]\\w*",
	Wu = "[a-zA-Z_]\\w*",
	Bg = "\\b\\d+(\\.\\d+)?",
	Pg = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",
	Lg = "\\b(0b[01]+)",
	ZS =
		"!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",
	QS = (e = {}) => {
		const t = /^#![ ]*\//;
		return (
			e.binary && (e.begin = ri(t, /.*\b/, e.binary, /\b.*/)),
			ln(
				{
					scope: "meta",
					begin: t,
					end: /$/,
					relevance: 0,
					"on:begin": (r, n) => {
						r.index !== 0 && n.ignoreMatch();
					},
				},
				e
			)
		);
	},
	Ja = { begin: "\\\\[\\s\\S]", relevance: 0 },
	eE = {
		scope: "string",
		begin: "'",
		end: "'",
		illegal: "\\n",
		contains: [Ja],
	},
	tE = {
		scope: "string",
		begin: '"',
		end: '"',
		illegal: "\\n",
		contains: [Ja],
	},
	rE = {
		begin:
			/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/,
	},
	c0 = function (e, t, r = {}) {
		const n = ln({ scope: "comment", begin: e, end: t, contains: [] }, r);
		n.contains.push({
			scope: "doctag",
			begin: "[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",
			end: /(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,
			excludeBegin: !0,
			relevance: 0,
		});
		const i = Gu(
			"I",
			"a",
			"is",
			"so",
			"us",
			"to",
			"at",
			"if",
			"in",
			"it",
			"on",
			/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,
			/[A-Za-z]+[-][a-z]+/,
			/[A-Za-z][a-z]{2,}/
		);
		return (
			n.contains.push({
				begin: ri(/[ ]+/, "(", i, /[.]?[:]?([.][ ]|[ ])/, "){3}"),
			}),
			n
		);
	},
	nE = c0("//", "$"),
	iE = c0("/\\*", "\\*/"),
	aE = c0("#", "$"),
	sE = { scope: "number", begin: Bg, relevance: 0 },
	oE = { scope: "number", begin: Pg, relevance: 0 },
	lE = { scope: "number", begin: Lg, relevance: 0 },
	cE = {
		begin: /(?=\/[^/\n]*\/)/,
		contains: [
			{
				scope: "regexp",
				begin: /\//,
				end: /\/[gimuy]*/,
				illegal: /\n/,
				contains: [
					Ja,
					{ begin: /\[/, end: /\]/, relevance: 0, contains: [Ja] },
				],
			},
		],
	},
	uE = { scope: "title", begin: Dg, relevance: 0 },
	fE = { scope: "title", begin: Wu, relevance: 0 },
	dE = { begin: "\\.\\s*" + Wu, relevance: 0 },
	hE = function (e) {
		return Object.assign(e, {
			"on:begin": (t, r) => {
				r.data._beginMatch = t[1];
			},
			"on:end": (t, r) => {
				r.data._beginMatch !== t[1] && r.ignoreMatch();
			},
		});
	};
var Us = Object.freeze({
	__proto__: null,
	MATCH_NOTHING_RE: JS,
	IDENT_RE: Dg,
	UNDERSCORE_IDENT_RE: Wu,
	NUMBER_RE: Bg,
	C_NUMBER_RE: Pg,
	BINARY_NUMBER_RE: Lg,
	RE_STARTERS_RE: ZS,
	SHEBANG: QS,
	BACKSLASH_ESCAPE: Ja,
	APOS_STRING_MODE: eE,
	QUOTE_STRING_MODE: tE,
	PHRASAL_WORDS_MODE: rE,
	COMMENT: c0,
	C_LINE_COMMENT_MODE: nE,
	C_BLOCK_COMMENT_MODE: iE,
	HASH_COMMENT_MODE: aE,
	NUMBER_MODE: sE,
	C_NUMBER_MODE: oE,
	BINARY_NUMBER_MODE: lE,
	REGEXP_MODE: cE,
	TITLE_MODE: uE,
	UNDERSCORE_TITLE_MODE: fE,
	METHOD_GUARD: dE,
	END_SAME_AS_BEGIN: hE,
});
function pE(e, t) {
	e.input[e.index - 1] === "." && t.ignoreMatch();
}
function mE(e, t) {
	e.className !== void 0 && ((e.scope = e.className), delete e.className);
}
function gE(e, t) {
	t &&
		e.beginKeywords &&
		((e.begin =
			"\\b(" + e.beginKeywords.split(" ").join("|") + ")(?!\\.)(?=\\b|\\s)"),
		(e.__beforeBegin = pE),
		(e.keywords = e.keywords || e.beginKeywords),
		delete e.beginKeywords,
		e.relevance === void 0 && (e.relevance = 0));
}
function yE(e, t) {
	Array.isArray(e.illegal) && (e.illegal = Gu(...e.illegal));
}
function bE(e, t) {
	if (e.match) {
		if (e.begin || e.end)
			throw new Error("begin & end are not supported with match");
		(e.begin = e.match), delete e.match;
	}
}
function vE(e, t) {
	e.relevance === void 0 && (e.relevance = 1);
}
const _E = (e, t) => {
		if (!e.beforeMatch) return;
		if (e.starts) throw new Error("beforeMatch cannot be used with starts");
		const r = Object.assign({}, e);
		Object.keys(e).forEach((n) => {
			delete e[n];
		}),
			(e.keywords = r.keywords),
			(e.begin = ri(r.beforeMatch, Cg(r.begin))),
			(e.starts = {
				relevance: 0,
				contains: [Object.assign(r, { endsParent: !0 })],
			}),
			(e.relevance = 0),
			delete r.beforeMatch;
	},
	wE = [
		"of",
		"and",
		"for",
		"in",
		"not",
		"or",
		"if",
		"then",
		"parent",
		"list",
		"value",
	],
	SE = "keyword";
function zg(e, t, r = SE) {
	const n = Object.create(null);
	return (
		typeof e == "string"
			? i(r, e.split(" "))
			: Array.isArray(e)
			? i(r, e)
			: Object.keys(e).forEach(function (a) {
					Object.assign(n, zg(e[a], t, a));
			  }),
		n
	);
	function i(a, s) {
		t && (s = s.map((o) => o.toLowerCase())),
			s.forEach(function (o) {
				const l = o.split("|");
				n[l[0]] = [a, EE(l[0], l[1])];
			});
	}
}
function EE(e, t) {
	return t ? Number(t) : xE(e) ? 0 : 1;
}
function xE(e) {
	return wE.includes(e.toLowerCase());
}
const Bh = {},
	Yn = (e) => {
		console.error(e);
	},
	Ph = (e, ...t) => {
		console.log(`WARN: ${e}`, ...t);
	},
	si = (e, t) => {
		Bh[`${e}/${t}`] ||
			(console.log(`Deprecated as of ${e}. ${t}`), (Bh[`${e}/${t}`] = !0));
	},
	Ao = new Error();
function $g(e, t, { key: r }) {
	let n = 0;
	const i = e[r],
		a = {},
		s = {};
	for (let o = 1; o <= t.length; o++)
		(s[o + n] = i[o]), (a[o + n] = !0), (n += Ig(t[o - 1]));
	(e[r] = s), (e[r]._emit = a), (e[r]._multi = !0);
}
function TE(e) {
	if (Array.isArray(e.begin)) {
		if (e.skip || e.excludeBegin || e.returnBegin)
			throw (
				(Yn(
					"skip, excludeBegin, returnBegin not compatible with beginScope: {}"
				),
				Ao)
			);
		if (typeof e.beginScope != "object" || e.beginScope === null)
			throw (Yn("beginScope must be object"), Ao);
		$g(e, e.begin, { key: "beginScope" }),
			(e.begin = Yu(e.begin, { joinWith: "" }));
	}
}
function kE(e) {
	if (Array.isArray(e.end)) {
		if (e.skip || e.excludeEnd || e.returnEnd)
			throw (
				(Yn("skip, excludeEnd, returnEnd not compatible with endScope: {}"), Ao)
			);
		if (typeof e.endScope != "object" || e.endScope === null)
			throw (Yn("endScope must be object"), Ao);
		$g(e, e.end, { key: "endScope" }), (e.end = Yu(e.end, { joinWith: "" }));
	}
}
function AE(e) {
	e.scope &&
		typeof e.scope == "object" &&
		e.scope !== null &&
		((e.beginScope = e.scope), delete e.scope);
}
function RE(e) {
	AE(e),
		typeof e.beginScope == "string" && (e.beginScope = { _wrap: e.beginScope }),
		typeof e.endScope == "string" && (e.endScope = { _wrap: e.endScope }),
		TE(e),
		kE(e);
}
function ME(e) {
	function t(s, o) {
		return new RegExp(
			Xa(s),
			"m" +
				(e.case_insensitive ? "i" : "") +
				(e.unicodeRegex ? "u" : "") +
				(o ? "g" : "")
		);
	}
	class r {
		constructor() {
			(this.matchIndexes = {}),
				(this.regexes = []),
				(this.matchAt = 1),
				(this.position = 0);
		}
		addRule(o, l) {
			(l.position = this.position++),
				(this.matchIndexes[this.matchAt] = l),
				this.regexes.push([l, o]),
				(this.matchAt += Ig(o) + 1);
		}
		compile() {
			this.regexes.length === 0 && (this.exec = () => null);
			const o = this.regexes.map((l) => l[1]);
			(this.matcherRe = t(Yu(o, { joinWith: "|" }), !0)), (this.lastIndex = 0);
		}
		exec(o) {
			this.matcherRe.lastIndex = this.lastIndex;
			const l = this.matcherRe.exec(o);
			if (!l) return null;
			const c = l.findIndex((d, p) => p > 0 && d !== void 0),
				u = this.matchIndexes[c];
			return l.splice(0, c), Object.assign(l, u);
		}
	}
	class n {
		constructor() {
			(this.rules = []),
				(this.multiRegexes = []),
				(this.count = 0),
				(this.lastIndex = 0),
				(this.regexIndex = 0);
		}
		getMatcher(o) {
			if (this.multiRegexes[o]) return this.multiRegexes[o];
			const l = new r();
			return (
				this.rules.slice(o).forEach(([c, u]) => l.addRule(c, u)),
				l.compile(),
				(this.multiRegexes[o] = l),
				l
			);
		}
		resumingScanAtSamePosition() {
			return this.regexIndex !== 0;
		}
		considerAll() {
			this.regexIndex = 0;
		}
		addRule(o, l) {
			this.rules.push([o, l]), l.type === "begin" && this.count++;
		}
		exec(o) {
			const l = this.getMatcher(this.regexIndex);
			l.lastIndex = this.lastIndex;
			let c = l.exec(o);
			if (
				this.resumingScanAtSamePosition() &&
				!(c && c.index === this.lastIndex)
			) {
				const u = this.getMatcher(0);
				(u.lastIndex = this.lastIndex + 1), (c = u.exec(o));
			}
			return (
				c &&
					((this.regexIndex += c.position + 1),
					this.regexIndex === this.count && this.considerAll()),
				c
			);
		}
	}
	function i(s) {
		const o = new n();
		return (
			s.contains.forEach((l) => o.addRule(l.begin, { rule: l, type: "begin" })),
			s.terminatorEnd && o.addRule(s.terminatorEnd, { type: "end" }),
			s.illegal && o.addRule(s.illegal, { type: "illegal" }),
			o
		);
	}
	function a(s, o) {
		const l = s;
		if (s.isCompiled) return l;
		[mE, bE, RE, _E].forEach((u) => u(s, o)),
			e.compilerExtensions.forEach((u) => u(s, o)),
			(s.__beforeBegin = null),
			[gE, yE, vE].forEach((u) => u(s, o)),
			(s.isCompiled = !0);
		let c = null;
		return (
			typeof s.keywords == "object" &&
				s.keywords.$pattern &&
				((s.keywords = Object.assign({}, s.keywords)),
				(c = s.keywords.$pattern),
				delete s.keywords.$pattern),
			(c = c || /\w+/),
			s.keywords && (s.keywords = zg(s.keywords, e.case_insensitive)),
			(l.keywordPatternRe = t(c, !0)),
			o &&
				(s.begin || (s.begin = /\B|\b/),
				(l.beginRe = t(l.begin)),
				!s.end && !s.endsWithParent && (s.end = /\B|\b/),
				s.end && (l.endRe = t(l.end)),
				(l.terminatorEnd = Xa(l.end) || ""),
				s.endsWithParent &&
					o.terminatorEnd &&
					(l.terminatorEnd += (s.end ? "|" : "") + o.terminatorEnd)),
			s.illegal && (l.illegalRe = t(s.illegal)),
			s.contains || (s.contains = []),
			(s.contains = [].concat(
				...s.contains.map(function (u) {
					return OE(u === "self" ? s : u);
				})
			)),
			s.contains.forEach(function (u) {
				a(u, l);
			}),
			s.starts && a(s.starts, o),
			(l.matcher = i(l)),
			l
		);
	}
	if (
		(e.compilerExtensions || (e.compilerExtensions = []),
		e.contains && e.contains.includes("self"))
	)
		throw new Error(
			"ERR: contains `self` is not supported at the top-level of a language.  See documentation."
		);
	return (e.classNameAliases = ln(e.classNameAliases || {})), a(e);
}
function Fg(e) {
	return e ? e.endsWithParent || Fg(e.starts) : !1;
}
function OE(e) {
	return (
		e.variants &&
			!e.cachedVariants &&
			(e.cachedVariants = e.variants.map(function (t) {
				return ln(e, { variants: null }, t);
			})),
		e.cachedVariants
			? e.cachedVariants
			: Fg(e)
			? ln(e, { starts: e.starts ? ln(e.starts) : null })
			: Object.isFrozen(e)
			? ln(e)
			: e
	);
}
var NE = "11.7.0";
class CE extends Error {
	constructor(t, r) {
		super(t), (this.name = "HTMLInjectionError"), (this.html = r);
	}
}
const nl = Ng,
	Lh = ln,
	zh = Symbol("nomatch"),
	IE = 7,
	DE = function (e) {
		const t = Object.create(null),
			r = Object.create(null),
			n = [];
		let i = !0;
		const a =
				"Could not find the language '{}', did you forget to load/include a language module?",
			s = { disableAutodetect: !0, name: "Plain text", contains: [] };
		let o = {
			ignoreUnescapedHTML: !1,
			throwUnescapedHTML: !1,
			noHighlightRe: /^(no-?highlight)$/i,
			languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
			classPrefix: "hljs-",
			cssSelector: "pre code",
			languages: null,
			__emitter: GS,
		};
		function l(I) {
			return o.noHighlightRe.test(I);
		}
		function c(I) {
			let K = I.className + " ";
			K += I.parentNode ? I.parentNode.className : "";
			const ie = o.languageDetectRe.exec(K);
			if (ie) {
				const ye = H(ie[1]);
				return (
					ye ||
						(Ph(a.replace("{}", ie[1])),
						Ph("Falling back to no-highlight mode for this block.", I)),
					ye ? ie[1] : "no-highlight"
				);
			}
			return K.split(/\s+/).find((ye) => l(ye) || H(ye));
		}
		function u(I, K, ie) {
			let ye = "",
				Te = "";
			typeof K == "object"
				? ((ye = I), (ie = K.ignoreIllegals), (Te = K.language))
				: (si("10.7.0", "highlight(lang, code, ...args) has been deprecated."),
				  si(
						"10.7.0",
						`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`
				  ),
				  (Te = I),
				  (ye = K)),
				ie === void 0 && (ie = !0);
			const Ne = { code: ye, language: Te };
			W("before:highlight", Ne);
			const Me = Ne.result ? Ne.result : d(Ne.language, Ne.code, ie);
			return (Me.code = Ne.code), W("after:highlight", Me), Me;
		}
		function d(I, K, ie, ye) {
			const Te = Object.create(null);
			function Ne(F, J) {
				return F.keywords[J];
			}
			function Me() {
				if (!P.keywords) {
					j.addText(G);
					return;
				}
				let F = 0;
				P.keywordPatternRe.lastIndex = 0;
				let J = P.keywordPatternRe.exec(G),
					ue = "";
				for (; J; ) {
					ue += G.substring(F, J.index);
					const pe = C.case_insensitive ? J[0].toLowerCase() : J[0],
						Oe = Ne(P, pe);
					if (Oe) {
						const [rt, jr] = Oe;
						if (
							(j.addText(ue),
							(ue = ""),
							(Te[pe] = (Te[pe] || 0) + 1),
							Te[pe] <= IE && (V += jr),
							rt.startsWith("_"))
						)
							ue += J[0];
						else {
							const ws = C.classNameAliases[rt] || rt;
							j.addKeyword(J[0], ws);
						}
					} else ue += J[0];
					(F = P.keywordPatternRe.lastIndex), (J = P.keywordPatternRe.exec(G));
				}
				(ue += G.substring(F)), j.addText(ue);
			}
			function ut() {
				if (G === "") return;
				let F = null;
				if (typeof P.subLanguage == "string") {
					if (!t[P.subLanguage]) {
						j.addText(G);
						return;
					}
					(F = d(P.subLanguage, G, !0, ae[P.subLanguage])),
						(ae[P.subLanguage] = F._top);
				} else F = m(G, P.subLanguage.length ? P.subLanguage : null);
				P.relevance > 0 && (V += F.relevance),
					j.addSublanguage(F._emitter, F.language);
			}
			function Je() {
				P.subLanguage != null ? ut() : Me(), (G = "");
			}
			function L(F, J) {
				let ue = 1;
				const pe = J.length - 1;
				for (; ue <= pe; ) {
					if (!F._emit[ue]) {
						ue++;
						continue;
					}
					const Oe = C.classNameAliases[F[ue]] || F[ue],
						rt = J[ue];
					Oe ? j.addKeyword(rt, Oe) : ((G = rt), Me(), (G = "")), ue++;
				}
			}
			function se(F, J) {
				return (
					F.scope &&
						typeof F.scope == "string" &&
						j.openNode(C.classNameAliases[F.scope] || F.scope),
					F.beginScope &&
						(F.beginScope._wrap
							? (j.addKeyword(
									G,
									C.classNameAliases[F.beginScope._wrap] || F.beginScope._wrap
							  ),
							  (G = ""))
							: F.beginScope._multi && (L(F.beginScope, J), (G = ""))),
					(P = Object.create(F, { parent: { value: P } })),
					P
				);
			}
			function ne(F, J, ue) {
				let pe = KS(F.endRe, ue);
				if (pe) {
					if (F["on:end"]) {
						const Oe = new Ch(F);
						F["on:end"](J, Oe), Oe.isMatchIgnored && (pe = !1);
					}
					if (pe) {
						for (; F.endsParent && F.parent; ) F = F.parent;
						return F;
					}
				}
				if (F.endsWithParent) return ne(F.parent, J, ue);
			}
			function de(F) {
				return P.matcher.regexIndex === 0 ? ((G += F[0]), 1) : ((me = !0), 0);
			}
			function Ae(F) {
				const J = F[0],
					ue = F.rule,
					pe = new Ch(ue),
					Oe = [ue.__beforeBegin, ue["on:begin"]];
				for (const rt of Oe)
					if (rt && (rt(F, pe), pe.isMatchIgnored)) return de(J);
				return (
					ue.skip
						? (G += J)
						: (ue.excludeBegin && (G += J),
						  Je(),
						  !ue.returnBegin && !ue.excludeBegin && (G = J)),
					se(ue, F),
					ue.returnBegin ? 0 : J.length
				);
			}
			function Le(F) {
				const J = F[0],
					ue = K.substring(F.index),
					pe = ne(P, F, ue);
				if (!pe) return zh;
				const Oe = P;
				P.endScope && P.endScope._wrap
					? (Je(), j.addKeyword(J, P.endScope._wrap))
					: P.endScope && P.endScope._multi
					? (Je(), L(P.endScope, F))
					: Oe.skip
					? (G += J)
					: (Oe.returnEnd || Oe.excludeEnd || (G += J),
					  Je(),
					  Oe.excludeEnd && (G = J));
				do
					P.scope && j.closeNode(),
						!P.skip && !P.subLanguage && (V += P.relevance),
						(P = P.parent);
				while (P !== pe.parent);
				return pe.starts && se(pe.starts, F), Oe.returnEnd ? 0 : J.length;
			}
			function xe() {
				const F = [];
				for (let J = P; J !== C; J = J.parent) J.scope && F.unshift(J.scope);
				F.forEach((J) => j.openNode(J));
			}
			let w = {};
			function k(F, J) {
				const ue = J && J[0];
				if (((G += F), ue == null)) return Je(), 0;
				if (
					w.type === "begin" &&
					J.type === "end" &&
					w.index === J.index &&
					ue === ""
				) {
					if (((G += K.slice(J.index, J.index + 1)), !i)) {
						const pe = new Error(`0 width match regex (${I})`);
						throw ((pe.languageName = I), (pe.badRule = w.rule), pe);
					}
					return 1;
				}
				if (((w = J), J.type === "begin")) return Ae(J);
				if (J.type === "illegal" && !ie) {
					const pe = new Error(
						'Illegal lexeme "' +
							ue +
							'" for mode "' +
							(P.scope || "<unnamed>") +
							'"'
					);
					throw ((pe.mode = P), pe);
				} else if (J.type === "end") {
					const pe = Le(J);
					if (pe !== zh) return pe;
				}
				if (J.type === "illegal" && ue === "") return 1;
				if (fe > 1e5 && fe > J.index * 3)
					throw new Error(
						"potential infinite loop, way more iterations than matches"
					);
				return (G += ue), ue.length;
			}
			const C = H(I);
			if (!C)
				throw (
					(Yn(a.replace("{}", I)), new Error('Unknown language: "' + I + '"'))
				);
			const $ = ME(C);
			let U = "",
				P = ye || $;
			const ae = {},
				j = new o.__emitter(o);
			xe();
			let G = "",
				V = 0,
				he = 0,
				fe = 0,
				me = !1;
			try {
				for (P.matcher.considerAll(); ; ) {
					fe++,
						me ? (me = !1) : P.matcher.considerAll(),
						(P.matcher.lastIndex = he);
					const F = P.matcher.exec(K);
					if (!F) break;
					const J = K.substring(he, F.index),
						ue = k(J, F);
					he = F.index + ue;
				}
				return (
					k(K.substring(he)),
					j.closeAllNodes(),
					j.finalize(),
					(U = j.toHTML()),
					{
						language: I,
						value: U,
						relevance: V,
						illegal: !1,
						_emitter: j,
						_top: P,
					}
				);
			} catch (F) {
				if (F.message && F.message.includes("Illegal"))
					return {
						language: I,
						value: nl(K),
						illegal: !0,
						relevance: 0,
						_illegalBy: {
							message: F.message,
							index: he,
							context: K.slice(he - 100, he + 100),
							mode: F.mode,
							resultSoFar: U,
						},
						_emitter: j,
					};
				if (i)
					return {
						language: I,
						value: nl(K),
						illegal: !1,
						relevance: 0,
						errorRaised: F,
						_emitter: j,
						_top: P,
					};
				throw F;
			}
		}
		function p(I) {
			const K = {
				value: nl(I),
				illegal: !1,
				relevance: 0,
				_top: s,
				_emitter: new o.__emitter(o),
			};
			return K._emitter.addText(I), K;
		}
		function m(I, K) {
			K = K || o.languages || Object.keys(t);
			const ie = p(I),
				ye = K.filter(H)
					.filter(te)
					.map((Je) => d(Je, I, !1));
			ye.unshift(ie);
			const Te = ye.sort((Je, L) => {
					if (Je.relevance !== L.relevance) return L.relevance - Je.relevance;
					if (Je.language && L.language) {
						if (H(Je.language).supersetOf === L.language) return 1;
						if (H(L.language).supersetOf === Je.language) return -1;
					}
					return 0;
				}),
				[Ne, Me] = Te,
				ut = Ne;
			return (ut.secondBest = Me), ut;
		}
		function b(I, K, ie) {
			const ye = (K && r[K]) || ie;
			I.classList.add("hljs"), I.classList.add(`language-${ye}`);
		}
		function E(I) {
			let K = null;
			const ie = c(I);
			if (l(ie)) return;
			if (
				(W("before:highlightElement", { el: I, language: ie }),
				I.children.length > 0 &&
					(o.ignoreUnescapedHTML ||
						(console.warn(
							"One of your code blocks includes unescaped HTML. This is a potentially serious security risk."
						),
						console.warn(
							"https://github.com/highlightjs/highlight.js/wiki/security"
						),
						console.warn("The element with unescaped HTML:"),
						console.warn(I)),
					o.throwUnescapedHTML))
			)
				throw new CE(
					"One of your code blocks includes unescaped HTML.",
					I.innerHTML
				);
			K = I;
			const ye = K.textContent,
				Te = ie ? u(ye, { language: ie, ignoreIllegals: !0 }) : m(ye);
			(I.innerHTML = Te.value),
				b(I, ie, Te.language),
				(I.result = {
					language: Te.language,
					re: Te.relevance,
					relevance: Te.relevance,
				}),
				Te.secondBest &&
					(I.secondBest = {
						language: Te.secondBest.language,
						relevance: Te.secondBest.relevance,
					}),
				W("after:highlightElement", { el: I, result: Te, text: ye });
		}
		function R(I) {
			o = Lh(o, I);
		}
		const _ = () => {
			M(),
				si("10.6.0", "initHighlighting() deprecated.  Use highlightAll() now.");
		};
		function v() {
			M(),
				si(
					"10.6.0",
					"initHighlightingOnLoad() deprecated.  Use highlightAll() now."
				);
		}
		let T = !1;
		function M() {
			if (document.readyState === "loading") {
				T = !0;
				return;
			}
			document.querySelectorAll(o.cssSelector).forEach(E);
		}
		function O() {
			T && M();
		}
		typeof window < "u" &&
			window.addEventListener &&
			window.addEventListener("DOMContentLoaded", O, !1);
		function B(I, K) {
			let ie = null;
			try {
				ie = K(e);
			} catch (ye) {
				if (
					(Yn(
						"Language definition for '{}' could not be registered.".replace(
							"{}",
							I
						)
					),
					i)
				)
					Yn(ye);
				else throw ye;
				ie = s;
			}
			ie.name || (ie.name = I),
				(t[I] = ie),
				(ie.rawDefinition = K.bind(null, e)),
				ie.aliases && Q(ie.aliases, { languageName: I });
		}
		function z(I) {
			delete t[I];
			for (const K of Object.keys(r)) r[K] === I && delete r[K];
		}
		function D() {
			return Object.keys(t);
		}
		function H(I) {
			return (I = (I || "").toLowerCase()), t[I] || t[r[I]];
		}
		function Q(I, { languageName: K }) {
			typeof I == "string" && (I = [I]),
				I.forEach((ie) => {
					r[ie.toLowerCase()] = K;
				});
		}
		function te(I) {
			const K = H(I);
			return K && !K.disableAutodetect;
		}
		function q(I) {
			I["before:highlightBlock"] &&
				!I["before:highlightElement"] &&
				(I["before:highlightElement"] = (K) => {
					I["before:highlightBlock"](Object.assign({ block: K.el }, K));
				}),
				I["after:highlightBlock"] &&
					!I["after:highlightElement"] &&
					(I["after:highlightElement"] = (K) => {
						I["after:highlightBlock"](Object.assign({ block: K.el }, K));
					});
		}
		function oe(I) {
			q(I), n.push(I);
		}
		function W(I, K) {
			const ie = I;
			n.forEach(function (ye) {
				ye[ie] && ye[ie](K);
			});
		}
		function Ee(I) {
			return (
				si("10.7.0", "highlightBlock will be removed entirely in v12.0"),
				si("10.7.0", "Please use highlightElement now."),
				E(I)
			);
		}
		Object.assign(e, {
			highlight: u,
			highlightAuto: m,
			highlightAll: M,
			highlightElement: E,
			highlightBlock: Ee,
			configure: R,
			initHighlighting: _,
			initHighlightingOnLoad: v,
			registerLanguage: B,
			unregisterLanguage: z,
			listLanguages: D,
			getLanguage: H,
			registerAliases: Q,
			autoDetection: te,
			inherit: Lh,
			addPlugin: oe,
		}),
			(e.debugMode = function () {
				i = !1;
			}),
			(e.safeMode = function () {
				i = !0;
			}),
			(e.versionString = NE),
			(e.regex = {
				concat: ri,
				lookahead: Cg,
				either: Gu,
				optional: WS,
				anyNumberOfTimes: YS,
			});
		for (const I in Us) typeof Us[I] == "object" && Uu.exports(Us[I]);
		return Object.assign(e, Us), e;
	};
var Za = DE({}),
	BE = Za;
Za.HighlightJS = Za;
Za.default = Za;
const ar = BE,
	$h = "[A-Za-z$_][0-9A-Za-z$_]*",
	PE = [
		"as",
		"in",
		"of",
		"if",
		"for",
		"while",
		"finally",
		"var",
		"new",
		"function",
		"do",
		"return",
		"void",
		"else",
		"break",
		"catch",
		"instanceof",
		"with",
		"throw",
		"case",
		"default",
		"try",
		"switch",
		"continue",
		"typeof",
		"delete",
		"let",
		"yield",
		"const",
		"class",
		"debugger",
		"async",
		"await",
		"static",
		"import",
		"from",
		"export",
		"extends",
	],
	LE = ["true", "false", "null", "undefined", "NaN", "Infinity"],
	Hg = [
		"Object",
		"Function",
		"Boolean",
		"Symbol",
		"Math",
		"Date",
		"Number",
		"BigInt",
		"String",
		"RegExp",
		"Array",
		"Float32Array",
		"Float64Array",
		"Int8Array",
		"Uint8Array",
		"Uint8ClampedArray",
		"Int16Array",
		"Int32Array",
		"Uint16Array",
		"Uint32Array",
		"BigInt64Array",
		"BigUint64Array",
		"Set",
		"Map",
		"WeakSet",
		"WeakMap",
		"ArrayBuffer",
		"SharedArrayBuffer",
		"Atomics",
		"DataView",
		"JSON",
		"Promise",
		"Generator",
		"GeneratorFunction",
		"AsyncFunction",
		"Reflect",
		"Proxy",
		"Intl",
		"WebAssembly",
	],
	Ug = [
		"Error",
		"EvalError",
		"InternalError",
		"RangeError",
		"ReferenceError",
		"SyntaxError",
		"TypeError",
		"URIError",
	],
	jg = [
		"setInterval",
		"setTimeout",
		"clearInterval",
		"clearTimeout",
		"require",
		"exports",
		"eval",
		"isFinite",
		"isNaN",
		"parseFloat",
		"parseInt",
		"decodeURI",
		"decodeURIComponent",
		"encodeURI",
		"encodeURIComponent",
		"escape",
		"unescape",
	],
	zE = [
		"arguments",
		"this",
		"super",
		"console",
		"window",
		"document",
		"localStorage",
		"module",
		"global",
	],
	$E = [].concat(jg, Hg, Ug);
function FE(e) {
	const t = e.regex,
		r = (K, { after: ie }) => {
			const ye = "</" + K[0].slice(1);
			return K.input.indexOf(ye, ie) !== -1;
		},
		n = $h,
		i = { begin: "<>", end: "</>" },
		a = /<[A-Za-z0-9\\._:-]+\s*\/>/,
		s = {
			begin: /<[A-Za-z0-9\\._:-]+/,
			end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
			isTrulyOpeningTag: (K, ie) => {
				const ye = K[0].length + K.index,
					Te = K.input[ye];
				if (Te === "<" || Te === ",") {
					ie.ignoreMatch();
					return;
				}
				Te === ">" && (r(K, { after: ye }) || ie.ignoreMatch());
				let Ne;
				const Me = K.input.substring(ye);
				if ((Ne = Me.match(/^\s*=/))) {
					ie.ignoreMatch();
					return;
				}
				if ((Ne = Me.match(/^\s+extends\s+/)) && Ne.index === 0) {
					ie.ignoreMatch();
					return;
				}
			},
		},
		o = {
			$pattern: $h,
			keyword: PE,
			literal: LE,
			built_in: $E,
			"variable.language": zE,
		},
		l = "[0-9](_?[0-9])*",
		c = `\\.(${l})`,
		u = "0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",
		d = {
			className: "number",
			variants: [
				{ begin: `(\\b(${u})((${c})|\\.)?|(${c}))[eE][+-]?(${l})\\b` },
				{ begin: `\\b(${u})\\b((${c})\\b|\\.)?|(${c})\\b` },
				{ begin: "\\b(0|[1-9](_?[0-9])*)n\\b" },
				{ begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b" },
				{ begin: "\\b0[bB][0-1](_?[0-1])*n?\\b" },
				{ begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" },
				{ begin: "\\b0[0-7]+n?\\b" },
			],
			relevance: 0,
		},
		p = {
			className: "subst",
			begin: "\\$\\{",
			end: "\\}",
			keywords: o,
			contains: [],
		},
		m = {
			begin: "html`",
			end: "",
			starts: {
				end: "`",
				returnEnd: !1,
				contains: [e.BACKSLASH_ESCAPE, p],
				subLanguage: "xml",
			},
		},
		b = {
			begin: "css`",
			end: "",
			starts: {
				end: "`",
				returnEnd: !1,
				contains: [e.BACKSLASH_ESCAPE, p],
				subLanguage: "css",
			},
		},
		E = {
			className: "string",
			begin: "`",
			end: "`",
			contains: [e.BACKSLASH_ESCAPE, p],
		},
		_ = {
			className: "comment",
			variants: [
				e.COMMENT(/\/\*\*(?!\/)/, "\\*/", {
					relevance: 0,
					contains: [
						{
							begin: "(?=@[A-Za-z]+)",
							relevance: 0,
							contains: [
								{ className: "doctag", begin: "@[A-Za-z]+" },
								{
									className: "type",
									begin: "\\{",
									end: "\\}",
									excludeEnd: !0,
									excludeBegin: !0,
									relevance: 0,
								},
								{
									className: "variable",
									begin: n + "(?=\\s*(-)|$)",
									endsParent: !0,
									relevance: 0,
								},
								{ begin: /(?=[^\n])\s/, relevance: 0 },
							],
						},
					],
				}),
				e.C_BLOCK_COMMENT_MODE,
				e.C_LINE_COMMENT_MODE,
			],
		},
		v = [
			e.APOS_STRING_MODE,
			e.QUOTE_STRING_MODE,
			m,
			b,
			E,
			{ match: /\$\d+/ },
			d,
		];
	p.contains = v.concat({
		begin: /\{/,
		end: /\}/,
		keywords: o,
		contains: ["self"].concat(v),
	});
	const T = [].concat(_, p.contains),
		M = T.concat([
			{ begin: /\(/, end: /\)/, keywords: o, contains: ["self"].concat(T) },
		]),
		O = {
			className: "params",
			begin: /\(/,
			end: /\)/,
			excludeBegin: !0,
			excludeEnd: !0,
			keywords: o,
			contains: M,
		},
		B = {
			variants: [
				{
					match: [
						/class/,
						/\s+/,
						n,
						/\s+/,
						/extends/,
						/\s+/,
						t.concat(n, "(", t.concat(/\./, n), ")*"),
					],
					scope: {
						1: "keyword",
						3: "title.class",
						5: "keyword",
						7: "title.class.inherited",
					},
				},
				{
					match: [/class/, /\s+/, n],
					scope: { 1: "keyword", 3: "title.class" },
				},
			],
		},
		z = {
			relevance: 0,
			match: t.either(
				/\bJSON/,
				/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,
				/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,
				/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/
			),
			className: "title.class",
			keywords: { _: [...Hg, ...Ug] },
		},
		D = {
			label: "use_strict",
			className: "meta",
			relevance: 10,
			begin: /^\s*['"]use (strict|asm)['"]/,
		},
		H = {
			variants: [
				{ match: [/function/, /\s+/, n, /(?=\s*\()/] },
				{ match: [/function/, /\s*(?=\()/] },
			],
			className: { 1: "keyword", 3: "title.function" },
			label: "func.def",
			contains: [O],
			illegal: /%/,
		},
		Q = {
			relevance: 0,
			match: /\b[A-Z][A-Z_0-9]+\b/,
			className: "variable.constant",
		};
	function te(K) {
		return t.concat("(?!", K.join("|"), ")");
	}
	const q = {
			match: t.concat(
				/\b/,
				te([...jg, "super", "import"]),
				n,
				t.lookahead(/\(/)
			),
			className: "title.function",
			relevance: 0,
		},
		oe = {
			begin: t.concat(/\./, t.lookahead(t.concat(n, /(?![0-9A-Za-z$_(])/))),
			end: n,
			excludeBegin: !0,
			keywords: "prototype",
			className: "property",
			relevance: 0,
		},
		W = {
			match: [/get|set/, /\s+/, n, /(?=\()/],
			className: { 1: "keyword", 3: "title.function" },
			contains: [{ begin: /\(\)/ }, O],
		},
		Ee =
			"(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" +
			e.UNDERSCORE_IDENT_RE +
			")\\s*=>",
		I = {
			match: [
				/const|var|let/,
				/\s+/,
				n,
				/\s*/,
				/=\s*/,
				/(async\s*)?/,
				t.lookahead(Ee),
			],
			keywords: "async",
			className: { 1: "keyword", 3: "title.function" },
			contains: [O],
		};
	return {
		name: "Javascript",
		aliases: ["js", "jsx", "mjs", "cjs"],
		keywords: o,
		exports: { PARAMS_CONTAINS: M, CLASS_REFERENCE: z },
		illegal: /#(?![$_A-z])/,
		contains: [
			e.SHEBANG({ label: "shebang", binary: "node", relevance: 5 }),
			D,
			e.APOS_STRING_MODE,
			e.QUOTE_STRING_MODE,
			m,
			b,
			E,
			_,
			{ match: /\$\d+/ },
			d,
			z,
			{ className: "attr", begin: n + t.lookahead(":"), relevance: 0 },
			I,
			{
				begin: "(" + e.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
				keywords: "return throw case",
				relevance: 0,
				contains: [
					_,
					e.REGEXP_MODE,
					{
						className: "function",
						begin: Ee,
						returnBegin: !0,
						end: "\\s*=>",
						contains: [
							{
								className: "params",
								variants: [
									{ begin: e.UNDERSCORE_IDENT_RE, relevance: 0 },
									{ className: null, begin: /\(\s*\)/, skip: !0 },
									{
										begin: /\(/,
										end: /\)/,
										excludeBegin: !0,
										excludeEnd: !0,
										keywords: o,
										contains: M,
									},
								],
							},
						],
					},
					{ begin: /,/, relevance: 0 },
					{ match: /\s+/, relevance: 0 },
					{
						variants: [
							{ begin: i.begin, end: i.end },
							{ match: a },
							{ begin: s.begin, "on:begin": s.isTrulyOpeningTag, end: s.end },
						],
						subLanguage: "xml",
						contains: [
							{ begin: s.begin, end: s.end, skip: !0, contains: ["self"] },
						],
					},
				],
			},
			H,
			{ beginKeywords: "while if switch catch for" },
			{
				begin:
					"\\b(?!function)" +
					e.UNDERSCORE_IDENT_RE +
					"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
				returnBegin: !0,
				label: "func.def",
				contains: [
					O,
					e.inherit(e.TITLE_MODE, { begin: n, className: "title.function" }),
				],
			},
			{ match: /\.\.\./, relevance: 0 },
			oe,
			{ match: "\\$" + n, relevance: 0 },
			{
				match: [/\bconstructor(?=\s*\()/],
				className: { 1: "title.function" },
				contains: [O],
			},
			q,
			Q,
			B,
			W,
			{ match: /\$[(.]/ },
		],
	};
}
function HE(e) {
	const t = e.regex,
		r = /(?![A-Za-z0-9])(?![$])/,
		n = t.concat(/[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/, r),
		i = t.concat(
			/(\\?[A-Z][a-z0-9_\x7f-\xff]+|\\?[A-Z]+(?=[A-Z][a-z0-9_\x7f-\xff])){1,}/,
			r
		),
		a = { scope: "variable", match: "\\$+" + n },
		s = {
			scope: "meta",
			variants: [
				{ begin: /<\?php/, relevance: 10 },
				{ begin: /<\?=/ },
				{ begin: /<\?/, relevance: 0.1 },
				{ begin: /\?>/ },
			],
		},
		o = {
			scope: "subst",
			variants: [{ begin: /\$\w+/ }, { begin: /\{\$/, end: /\}/ }],
		},
		l = e.inherit(e.APOS_STRING_MODE, { illegal: null }),
		c = e.inherit(e.QUOTE_STRING_MODE, {
			illegal: null,
			contains: e.QUOTE_STRING_MODE.contains.concat(o),
		}),
		u = e.END_SAME_AS_BEGIN({
			begin: /<<<[ \t]*(\w+)\n/,
			end: /[ \t]*(\w+)\b/,
			contains: e.QUOTE_STRING_MODE.contains.concat(o),
		}),
		d = `[ 	
]`,
		p = { scope: "string", variants: [c, l, u] },
		m = {
			scope: "number",
			variants: [
				{ begin: "\\b0[bB][01]+(?:_[01]+)*\\b" },
				{ begin: "\\b0[oO][0-7]+(?:_[0-7]+)*\\b" },
				{ begin: "\\b0[xX][\\da-fA-F]+(?:_[\\da-fA-F]+)*\\b" },
				{
					begin:
						"(?:\\b\\d+(?:_\\d+)*(\\.(?:\\d+(?:_\\d+)*))?|\\B\\.\\d+)(?:[eE][+-]?\\d+)?",
				},
			],
			relevance: 0,
		},
		b = ["false", "null", "true"],
		E = [
			"__CLASS__",
			"__DIR__",
			"__FILE__",
			"__FUNCTION__",
			"__COMPILER_HALT_OFFSET__",
			"__LINE__",
			"__METHOD__",
			"__NAMESPACE__",
			"__TRAIT__",
			"die",
			"echo",
			"exit",
			"include",
			"include_once",
			"print",
			"require",
			"require_once",
			"array",
			"abstract",
			"and",
			"as",
			"binary",
			"bool",
			"boolean",
			"break",
			"callable",
			"case",
			"catch",
			"class",
			"clone",
			"const",
			"continue",
			"declare",
			"default",
			"do",
			"double",
			"else",
			"elseif",
			"empty",
			"enddeclare",
			"endfor",
			"endforeach",
			"endif",
			"endswitch",
			"endwhile",
			"enum",
			"eval",
			"extends",
			"final",
			"finally",
			"float",
			"for",
			"foreach",
			"from",
			"global",
			"goto",
			"if",
			"implements",
			"instanceof",
			"insteadof",
			"int",
			"integer",
			"interface",
			"isset",
			"iterable",
			"list",
			"match|0",
			"mixed",
			"new",
			"never",
			"object",
			"or",
			"private",
			"protected",
			"public",
			"readonly",
			"real",
			"return",
			"string",
			"switch",
			"throw",
			"trait",
			"try",
			"unset",
			"use",
			"var",
			"void",
			"while",
			"xor",
			"yield",
		],
		R = [
			"Error|0",
			"AppendIterator",
			"ArgumentCountError",
			"ArithmeticError",
			"ArrayIterator",
			"ArrayObject",
			"AssertionError",
			"BadFunctionCallException",
			"BadMethodCallException",
			"CachingIterator",
			"CallbackFilterIterator",
			"CompileError",
			"Countable",
			"DirectoryIterator",
			"DivisionByZeroError",
			"DomainException",
			"EmptyIterator",
			"ErrorException",
			"Exception",
			"FilesystemIterator",
			"FilterIterator",
			"GlobIterator",
			"InfiniteIterator",
			"InvalidArgumentException",
			"IteratorIterator",
			"LengthException",
			"LimitIterator",
			"LogicException",
			"MultipleIterator",
			"NoRewindIterator",
			"OutOfBoundsException",
			"OutOfRangeException",
			"OuterIterator",
			"OverflowException",
			"ParentIterator",
			"ParseError",
			"RangeException",
			"RecursiveArrayIterator",
			"RecursiveCachingIterator",
			"RecursiveCallbackFilterIterator",
			"RecursiveDirectoryIterator",
			"RecursiveFilterIterator",
			"RecursiveIterator",
			"RecursiveIteratorIterator",
			"RecursiveRegexIterator",
			"RecursiveTreeIterator",
			"RegexIterator",
			"RuntimeException",
			"SeekableIterator",
			"SplDoublyLinkedList",
			"SplFileInfo",
			"SplFileObject",
			"SplFixedArray",
			"SplHeap",
			"SplMaxHeap",
			"SplMinHeap",
			"SplObjectStorage",
			"SplObserver",
			"SplPriorityQueue",
			"SplQueue",
			"SplStack",
			"SplSubject",
			"SplTempFileObject",
			"TypeError",
			"UnderflowException",
			"UnexpectedValueException",
			"UnhandledMatchError",
			"ArrayAccess",
			"BackedEnum",
			"Closure",
			"Fiber",
			"Generator",
			"Iterator",
			"IteratorAggregate",
			"Serializable",
			"Stringable",
			"Throwable",
			"Traversable",
			"UnitEnum",
			"WeakReference",
			"WeakMap",
			"Directory",
			"__PHP_Incomplete_Class",
			"parent",
			"php_user_filter",
			"self",
			"static",
			"stdClass",
		],
		v = {
			keyword: E,
			literal: ((q) => {
				const oe = [];
				return (
					q.forEach((W) => {
						oe.push(W),
							W.toLowerCase() === W
								? oe.push(W.toUpperCase())
								: oe.push(W.toLowerCase());
					}),
					oe
				);
			})(b),
			built_in: R,
		},
		T = (q) => q.map((oe) => oe.replace(/\|\d+$/, "")),
		M = {
			variants: [
				{
					match: [
						/new/,
						t.concat(d, "+"),
						t.concat("(?!", T(R).join("\\b|"), "\\b)"),
						i,
					],
					scope: { 1: "keyword", 4: "title.class" },
				},
			],
		},
		O = t.concat(n, "\\b(?!\\()"),
		B = {
			variants: [
				{
					match: [t.concat(/::/, t.lookahead(/(?!class\b)/)), O],
					scope: { 2: "variable.constant" },
				},
				{ match: [/::/, /class/], scope: { 2: "variable.language" } },
				{
					match: [i, t.concat(/::/, t.lookahead(/(?!class\b)/)), O],
					scope: { 1: "title.class", 3: "variable.constant" },
				},
				{
					match: [i, t.concat("::", t.lookahead(/(?!class\b)/))],
					scope: { 1: "title.class" },
				},
				{
					match: [i, /::/, /class/],
					scope: { 1: "title.class", 3: "variable.language" },
				},
			],
		},
		z = {
			scope: "attr",
			match: t.concat(n, t.lookahead(":"), t.lookahead(/(?!::)/)),
		},
		D = {
			relevance: 0,
			begin: /\(/,
			end: /\)/,
			keywords: v,
			contains: [z, a, B, e.C_BLOCK_COMMENT_MODE, p, m, M],
		},
		H = {
			relevance: 0,
			match: [
				/\b/,
				t.concat(
					"(?!fn\\b|function\\b|",
					T(E).join("\\b|"),
					"|",
					T(R).join("\\b|"),
					"\\b)"
				),
				n,
				t.concat(d, "*"),
				t.lookahead(/(?=\()/),
			],
			scope: { 3: "title.function.invoke" },
			contains: [D],
		};
	D.contains.push(H);
	const Q = [z, B, e.C_BLOCK_COMMENT_MODE, p, m, M],
		te = {
			begin: t.concat(/#\[\s*/, i),
			beginScope: "meta",
			end: /]/,
			endScope: "meta",
			keywords: { literal: b, keyword: ["new", "array"] },
			contains: [
				{
					begin: /\[/,
					end: /]/,
					keywords: { literal: b, keyword: ["new", "array"] },
					contains: ["self", ...Q],
				},
				...Q,
				{ scope: "meta", match: i },
			],
		};
	return {
		case_insensitive: !1,
		keywords: v,
		contains: [
			te,
			e.HASH_COMMENT_MODE,
			e.COMMENT("//", "$"),
			e.COMMENT("/\\*", "\\*/", {
				contains: [{ scope: "doctag", match: "@[A-Za-z]+" }],
			}),
			{
				match: /__halt_compiler\(\);/,
				keywords: "__halt_compiler",
				starts: {
					scope: "comment",
					end: e.MATCH_NOTHING_RE,
					contains: [{ match: /\?>/, scope: "meta", endsParent: !0 }],
				},
			},
			s,
			{ scope: "variable.language", match: /\$this\b/ },
			a,
			H,
			B,
			{
				match: [/const/, /\s/, n],
				scope: { 1: "keyword", 3: "variable.constant" },
			},
			M,
			{
				scope: "function",
				relevance: 0,
				beginKeywords: "fn function",
				end: /[;{]/,
				excludeEnd: !0,
				illegal: "[$%\\[]",
				contains: [
					{ beginKeywords: "use" },
					e.UNDERSCORE_TITLE_MODE,
					{ begin: "=>", endsParent: !0 },
					{
						scope: "params",
						begin: "\\(",
						end: "\\)",
						excludeBegin: !0,
						excludeEnd: !0,
						keywords: v,
						contains: ["self", a, B, e.C_BLOCK_COMMENT_MODE, p, m],
					},
				],
			},
			{
				scope: "class",
				variants: [
					{ beginKeywords: "enum", illegal: /[($"]/ },
					{ beginKeywords: "class interface trait", illegal: /[:($"]/ },
				],
				relevance: 0,
				end: /\{/,
				excludeEnd: !0,
				contains: [
					{ beginKeywords: "extends implements" },
					e.UNDERSCORE_TITLE_MODE,
				],
			},
			{
				beginKeywords: "namespace",
				relevance: 0,
				end: ";",
				illegal: /[.']/,
				contains: [
					e.inherit(e.UNDERSCORE_TITLE_MODE, { scope: "title.class" }),
				],
			},
			{
				beginKeywords: "use",
				relevance: 0,
				end: ";",
				contains: [
					{ match: /\b(as|const|function)\b/, scope: "keyword" },
					e.UNDERSCORE_TITLE_MODE,
				],
			},
			p,
			m,
		],
	};
}
function UE(e) {
	const t = e.regex,
		r = /[\p{XID_Start}_]\p{XID_Continue}*/u,
		n = [
			"and",
			"as",
			"assert",
			"async",
			"await",
			"break",
			"case",
			"class",
			"continue",
			"def",
			"del",
			"elif",
			"else",
			"except",
			"finally",
			"for",
			"from",
			"global",
			"if",
			"import",
			"in",
			"is",
			"lambda",
			"match",
			"nonlocal|10",
			"not",
			"or",
			"pass",
			"raise",
			"return",
			"try",
			"while",
			"with",
			"yield",
		],
		o = {
			$pattern: /[A-Za-z]\w+|__\w+__/,
			keyword: n,
			built_in: [
				"__import__",
				"abs",
				"all",
				"any",
				"ascii",
				"bin",
				"bool",
				"breakpoint",
				"bytearray",
				"bytes",
				"callable",
				"chr",
				"classmethod",
				"compile",
				"complex",
				"delattr",
				"dict",
				"dir",
				"divmod",
				"enumerate",
				"eval",
				"exec",
				"filter",
				"float",
				"format",
				"frozenset",
				"getattr",
				"globals",
				"hasattr",
				"hash",
				"help",
				"hex",
				"id",
				"input",
				"int",
				"isinstance",
				"issubclass",
				"iter",
				"len",
				"list",
				"locals",
				"map",
				"max",
				"memoryview",
				"min",
				"next",
				"object",
				"oct",
				"open",
				"ord",
				"pow",
				"print",
				"property",
				"range",
				"repr",
				"reversed",
				"round",
				"set",
				"setattr",
				"slice",
				"sorted",
				"staticmethod",
				"str",
				"sum",
				"super",
				"tuple",
				"type",
				"vars",
				"zip",
			],
			literal: [
				"__debug__",
				"Ellipsis",
				"False",
				"None",
				"NotImplemented",
				"True",
			],
			type: [
				"Any",
				"Callable",
				"Coroutine",
				"Dict",
				"List",
				"Literal",
				"Generic",
				"Optional",
				"Sequence",
				"Set",
				"Tuple",
				"Type",
				"Union",
			],
		},
		l = { className: "meta", begin: /^(>>>|\.\.\.) / },
		c = {
			className: "subst",
			begin: /\{/,
			end: /\}/,
			keywords: o,
			illegal: /#/,
		},
		u = { begin: /\{\{/, relevance: 0 },
		d = {
			className: "string",
			contains: [e.BACKSLASH_ESCAPE],
			variants: [
				{
					begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?'''/,
					end: /'''/,
					contains: [e.BACKSLASH_ESCAPE, l],
					relevance: 10,
				},
				{
					begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?"""/,
					end: /"""/,
					contains: [e.BACKSLASH_ESCAPE, l],
					relevance: 10,
				},
				{
					begin: /([fF][rR]|[rR][fF]|[fF])'''/,
					end: /'''/,
					contains: [e.BACKSLASH_ESCAPE, l, u, c],
				},
				{
					begin: /([fF][rR]|[rR][fF]|[fF])"""/,
					end: /"""/,
					contains: [e.BACKSLASH_ESCAPE, l, u, c],
				},
				{ begin: /([uU]|[rR])'/, end: /'/, relevance: 10 },
				{ begin: /([uU]|[rR])"/, end: /"/, relevance: 10 },
				{ begin: /([bB]|[bB][rR]|[rR][bB])'/, end: /'/ },
				{ begin: /([bB]|[bB][rR]|[rR][bB])"/, end: /"/ },
				{
					begin: /([fF][rR]|[rR][fF]|[fF])'/,
					end: /'/,
					contains: [e.BACKSLASH_ESCAPE, u, c],
				},
				{
					begin: /([fF][rR]|[rR][fF]|[fF])"/,
					end: /"/,
					contains: [e.BACKSLASH_ESCAPE, u, c],
				},
				e.APOS_STRING_MODE,
				e.QUOTE_STRING_MODE,
			],
		},
		p = "[0-9](_?[0-9])*",
		m = `(\\b(${p}))?\\.(${p})|\\b(${p})\\.`,
		b = `\\b|${n.join("|")}`,
		E = {
			className: "number",
			relevance: 0,
			variants: [
				{ begin: `(\\b(${p})|(${m}))[eE][+-]?(${p})[jJ]?(?=${b})` },
				{ begin: `(${m})[jJ]?` },
				{ begin: `\\b([1-9](_?[0-9])*|0+(_?0)*)[lLjJ]?(?=${b})` },
				{ begin: `\\b0[bB](_?[01])+[lL]?(?=${b})` },
				{ begin: `\\b0[oO](_?[0-7])+[lL]?(?=${b})` },
				{ begin: `\\b0[xX](_?[0-9a-fA-F])+[lL]?(?=${b})` },
				{ begin: `\\b(${p})[jJ](?=${b})` },
			],
		},
		R = {
			className: "comment",
			begin: t.lookahead(/# type:/),
			end: /$/,
			keywords: o,
			contains: [
				{ begin: /# type:/ },
				{ begin: /#/, end: /\b\B/, endsWithParent: !0 },
			],
		},
		_ = {
			className: "params",
			variants: [
				{ className: "", begin: /\(\s*\)/, skip: !0 },
				{
					begin: /\(/,
					end: /\)/,
					excludeBegin: !0,
					excludeEnd: !0,
					keywords: o,
					contains: ["self", l, E, d, e.HASH_COMMENT_MODE],
				},
			],
		};
	return (
		(c.contains = [d, E, l]),
		{
			name: "Python",
			aliases: ["py", "gyp", "ipython"],
			unicodeRegex: !0,
			keywords: o,
			illegal: /(<\/|->|\?)|=>/,
			contains: [
				l,
				E,
				{ begin: /\bself\b/ },
				{ beginKeywords: "if", relevance: 0 },
				d,
				R,
				e.HASH_COMMENT_MODE,
				{
					match: [/\bdef/, /\s+/, r],
					scope: { 1: "keyword", 3: "title.function" },
					contains: [_],
				},
				{
					variants: [
						{ match: [/\bclass/, /\s+/, r, /\s*/, /\(\s*/, r, /\s*\)/] },
						{ match: [/\bclass/, /\s+/, r] },
					],
					scope: { 1: "keyword", 3: "title.class", 6: "title.class.inherited" },
				},
				{
					className: "meta",
					begin: /^[\t ]*@/,
					end: /(?=#)|$/,
					contains: [E, _, d],
				},
			],
		}
	);
}
function jE(e) {
	const t = e.regex,
		r = {},
		n = {
			begin: /\$\{/,
			end: /\}/,
			contains: ["self", { begin: /:-/, contains: [r] }],
		};
	Object.assign(r, {
		className: "variable",
		variants: [
			{ begin: t.concat(/\$[\w\d#@][\w\d_]*/, "(?![\\w\\d])(?![$])") },
			n,
		],
	});
	const i = {
			className: "subst",
			begin: /\$\(/,
			end: /\)/,
			contains: [e.BACKSLASH_ESCAPE],
		},
		a = {
			begin: /<<-?\s*(?=\w+)/,
			starts: {
				contains: [
					e.END_SAME_AS_BEGIN({
						begin: /(\w+)/,
						end: /(\w+)/,
						className: "string",
					}),
				],
			},
		},
		s = {
			className: "string",
			begin: /"/,
			end: /"/,
			contains: [e.BACKSLASH_ESCAPE, r, i],
		};
	i.contains.push(s);
	const o = { className: "", begin: /\\"/ },
		l = { className: "string", begin: /'/, end: /'/ },
		c = {
			begin: /\$?\(\(/,
			end: /\)\)/,
			contains: [
				{ begin: /\d+#[0-9a-f]+/, className: "number" },
				e.NUMBER_MODE,
				r,
			],
		},
		u = ["fish", "bash", "zsh", "sh", "csh", "ksh", "tcsh", "dash", "scsh"],
		d = e.SHEBANG({ binary: `(${u.join("|")})`, relevance: 10 }),
		p = {
			className: "function",
			begin: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
			returnBegin: !0,
			contains: [e.inherit(e.TITLE_MODE, { begin: /\w[\w\d_]*/ })],
			relevance: 0,
		},
		m = [
			"if",
			"then",
			"else",
			"elif",
			"fi",
			"for",
			"while",
			"in",
			"do",
			"done",
			"case",
			"esac",
			"function",
		],
		b = ["true", "false"],
		E = { match: /(\/[a-z._-]+)+/ },
		R = [
			"break",
			"cd",
			"continue",
			"eval",
			"exec",
			"exit",
			"export",
			"getopts",
			"hash",
			"pwd",
			"readonly",
			"return",
			"shift",
			"test",
			"times",
			"trap",
			"umask",
			"unset",
		],
		_ = [
			"alias",
			"bind",
			"builtin",
			"caller",
			"command",
			"declare",
			"echo",
			"enable",
			"help",
			"let",
			"local",
			"logout",
			"mapfile",
			"printf",
			"read",
			"readarray",
			"source",
			"type",
			"typeset",
			"ulimit",
			"unalias",
		],
		v = [
			"autoload",
			"bg",
			"bindkey",
			"bye",
			"cap",
			"chdir",
			"clone",
			"comparguments",
			"compcall",
			"compctl",
			"compdescribe",
			"compfiles",
			"compgroups",
			"compquote",
			"comptags",
			"comptry",
			"compvalues",
			"dirs",
			"disable",
			"disown",
			"echotc",
			"echoti",
			"emulate",
			"fc",
			"fg",
			"float",
			"functions",
			"getcap",
			"getln",
			"history",
			"integer",
			"jobs",
			"kill",
			"limit",
			"log",
			"noglob",
			"popd",
			"print",
			"pushd",
			"pushln",
			"rehash",
			"sched",
			"setcap",
			"setopt",
			"stat",
			"suspend",
			"ttyctl",
			"unfunction",
			"unhash",
			"unlimit",
			"unsetopt",
			"vared",
			"wait",
			"whence",
			"where",
			"which",
			"zcompile",
			"zformat",
			"zftp",
			"zle",
			"zmodload",
			"zparseopts",
			"zprof",
			"zpty",
			"zregexparse",
			"zsocket",
			"zstyle",
			"ztcp",
		],
		T = [
			"chcon",
			"chgrp",
			"chown",
			"chmod",
			"cp",
			"dd",
			"df",
			"dir",
			"dircolors",
			"ln",
			"ls",
			"mkdir",
			"mkfifo",
			"mknod",
			"mktemp",
			"mv",
			"realpath",
			"rm",
			"rmdir",
			"shred",
			"sync",
			"touch",
			"truncate",
			"vdir",
			"b2sum",
			"base32",
			"base64",
			"cat",
			"cksum",
			"comm",
			"csplit",
			"cut",
			"expand",
			"fmt",
			"fold",
			"head",
			"join",
			"md5sum",
			"nl",
			"numfmt",
			"od",
			"paste",
			"ptx",
			"pr",
			"sha1sum",
			"sha224sum",
			"sha256sum",
			"sha384sum",
			"sha512sum",
			"shuf",
			"sort",
			"split",
			"sum",
			"tac",
			"tail",
			"tr",
			"tsort",
			"unexpand",
			"uniq",
			"wc",
			"arch",
			"basename",
			"chroot",
			"date",
			"dirname",
			"du",
			"echo",
			"env",
			"expr",
			"factor",
			"groups",
			"hostid",
			"id",
			"link",
			"logname",
			"nice",
			"nohup",
			"nproc",
			"pathchk",
			"pinky",
			"printenv",
			"printf",
			"pwd",
			"readlink",
			"runcon",
			"seq",
			"sleep",
			"stat",
			"stdbuf",
			"stty",
			"tee",
			"test",
			"timeout",
			"tty",
			"uname",
			"unlink",
			"uptime",
			"users",
			"who",
			"whoami",
			"yes",
		];
	return {
		name: "Bash",
		aliases: ["sh"],
		keywords: {
			$pattern: /\b[a-z][a-z0-9._-]+\b/,
			keyword: m,
			literal: b,
			built_in: [...R, ..._, "set", "shopt", ...v, ...T],
		},
		contains: [d, e.SHEBANG(), p, c, e.HASH_COMMENT_MODE, a, E, s, o, l, r],
	};
}
function qE(e) {
	return {
		name: "Plain text",
		aliases: ["text", "txt"],
		disableAutodetect: !0,
	};
}
function GE(e) {
	const t = {
			className: "attr",
			begin: /"(\\.|[^\\"\r\n])*"(?=\s*:)/,
			relevance: 1.01,
		},
		r = { match: /[{}[\],:]/, className: "punctuation", relevance: 0 },
		n = ["true", "false", "null"],
		i = { scope: "literal", beginKeywords: n.join(" ") };
	return {
		name: "JSON",
		keywords: { literal: n },
		contains: [
			t,
			r,
			e.QUOTE_STRING_MODE,
			i,
			e.C_NUMBER_MODE,
			e.C_LINE_COMMENT_MODE,
			e.C_BLOCK_COMMENT_MODE,
		],
		illegal: "\\S",
	};
}
function YE(e) {
	const a = {
		keyword: [
			"break",
			"case",
			"chan",
			"const",
			"continue",
			"default",
			"defer",
			"else",
			"fallthrough",
			"for",
			"func",
			"go",
			"goto",
			"if",
			"import",
			"interface",
			"map",
			"package",
			"range",
			"return",
			"select",
			"struct",
			"switch",
			"type",
			"var",
		],
		type: [
			"bool",
			"byte",
			"complex64",
			"complex128",
			"error",
			"float32",
			"float64",
			"int8",
			"int16",
			"int32",
			"int64",
			"string",
			"uint8",
			"uint16",
			"uint32",
			"uint64",
			"int",
			"uint",
			"uintptr",
			"rune",
		],
		literal: ["true", "false", "iota", "nil"],
		built_in: [
			"append",
			"cap",
			"close",
			"complex",
			"copy",
			"imag",
			"len",
			"make",
			"new",
			"panic",
			"print",
			"println",
			"real",
			"recover",
			"delete",
		],
	};
	return {
		name: "Go",
		aliases: ["golang"],
		keywords: a,
		illegal: "</",
		contains: [
			e.C_LINE_COMMENT_MODE,
			e.C_BLOCK_COMMENT_MODE,
			{
				className: "string",
				variants: [
					e.QUOTE_STRING_MODE,
					e.APOS_STRING_MODE,
					{ begin: "`", end: "`" },
				],
			},
			{
				className: "number",
				variants: [
					{ begin: e.C_NUMBER_RE + "[i]", relevance: 1 },
					e.C_NUMBER_MODE,
				],
			},
			{ begin: /:=/ },
			{
				className: "function",
				beginKeywords: "func",
				end: "\\s*(\\{|$)",
				excludeEnd: !0,
				contains: [
					e.TITLE_MODE,
					{
						className: "params",
						begin: /\(/,
						end: /\)/,
						endsParent: !0,
						keywords: a,
						illegal: /["']/,
					},
				],
			},
		],
	};
}
const WE = Ct((e) => {
		ar.configure({ ignoreUnescapedHTML: !0 }),
			ar.registerLanguage("javascript", FE),
			ar.registerLanguage("php", HE),
			ar.registerLanguage("python", UE),
			ar.registerLanguage("plaintext", qE),
			ar.registerLanguage("bash", jE),
			ar.registerLanguage("json", GE),
			ar.registerLanguage("go", YE),
			e.hook("page:transition:finish", () => {
				vn(() => {
					ar.highlightAll();
				});
			}),
			e.hook("app:mounted", () => {
				vn(() => {
					ar.highlightAll();
				});
			});
	}),
	VE = function () {
		function e() {
			const t = document.documentElement.clientHeight * 0.01;
			document.documentElement.style.setProperty("--vh", `${t}px`);
		}
		typeof window < "u" && (window.addEventListener("resize", e), e());
	},
	KE = Ct((e) => {
		VE(), document.documentElement.classList.add("scroll-smooth");
	}),
	XE = Ct((e) => {}),
	JE = "0.0.0",
	qg = Object.prototype.toString;
function Gg(e) {
	switch (qg.call(e)) {
		case "[object Error]":
		case "[object Exception]":
		case "[object DOMException]":
			return !0;
		default:
			return mr(e, Error);
	}
}
function na(e, t) {
	return qg.call(e) === `[object ${t}]`;
}
function Yg(e) {
	return na(e, "ErrorEvent");
}
function Fh(e) {
	return na(e, "DOMError");
}
function ZE(e) {
	return na(e, "DOMException");
}
function xn(e) {
	return na(e, "String");
}
function Wg(e) {
	return e === null || (typeof e != "object" && typeof e != "function");
}
function Ui(e) {
	return na(e, "Object");
}
function Vu(e) {
	return typeof Event < "u" && mr(e, Event);
}
function QE(e) {
	return typeof Element < "u" && mr(e, Element);
}
function ex(e) {
	return na(e, "RegExp");
}
function Ku(e) {
	return Boolean(e && e.then && typeof e.then == "function");
}
function tx(e) {
	return (
		Ui(e) &&
		"nativeEvent" in e &&
		"preventDefault" in e &&
		"stopPropagation" in e
	);
}
function Vg(e) {
	return typeof e == "number" && e !== e;
}
function mr(e, t) {
	try {
		return e instanceof t;
	} catch {
		return !1;
	}
}
function js(e) {
	return e && e.Math == Math ? e : void 0;
}
const Yt =
	(typeof globalThis == "object" && js(globalThis)) ||
	(typeof window == "object" && js(window)) ||
	(typeof self == "object" && js(self)) ||
	(typeof global == "object" && js(global)) ||
	(function () {
		return this;
	})() ||
	{};
function u0() {
	return Yt;
}
function Xu(e, t, r) {
	const n = r || Yt,
		i = (n.__SENTRY__ = n.__SENTRY__ || {});
	return i[e] || (i[e] = t());
}
const no = u0(),
	rx = 80;
function Qa(e, t = {}) {
	try {
		let r = e;
		const n = 5,
			i = [];
		let a = 0,
			s = 0;
		const o = " > ",
			l = o.length;
		let c;
		const u = Array.isArray(t) ? t : t.keyAttrs,
			d = (!Array.isArray(t) && t.maxStringLength) || rx;
		for (
			;
			r &&
			a++ < n &&
			((c = nx(r, u)),
			!(c === "html" || (a > 1 && s + i.length * l + c.length >= d)));

		)
			i.push(c), (s += c.length), (r = r.parentNode);
		return i.reverse().join(o);
	} catch {
		return "<unknown>";
	}
}
function nx(e, t) {
	const r = e,
		n = [];
	let i, a, s, o, l;
	if (!r || !r.tagName) return "";
	n.push(r.tagName.toLowerCase());
	const c =
		t && t.length
			? t.filter((d) => r.getAttribute(d)).map((d) => [d, r.getAttribute(d)])
			: null;
	if (c && c.length)
		c.forEach((d) => {
			n.push(`[${d[0]}="${d[1]}"]`);
		});
	else if ((r.id && n.push(`#${r.id}`), (i = r.className), i && xn(i)))
		for (a = i.split(/\s+/), l = 0; l < a.length; l++) n.push(`.${a[l]}`);
	const u = ["type", "name", "title", "alt"];
	for (l = 0; l < u.length; l++)
		(s = u[l]), (o = r.getAttribute(s)), o && n.push(`[${s}="${o}"]`);
	return n.join("");
}
function ix() {
	try {
		return no.document.location.href;
	} catch {
		return "";
	}
}
function ax(e) {
	return no.document && no.document.querySelector
		? no.document.querySelector(e)
		: null;
}
class yt extends Error {
	constructor(t, r = "warn") {
		super(t),
			(this.message = t),
			(this.name = new.target.prototype.constructor.name),
			Object.setPrototypeOf(this, new.target.prototype),
			(this.logLevel = r);
	}
}
const sx = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)([\w.-]+)(?::(\d+))?\/(.+)/;
function ox(e) {
	return e === "http" || e === "https";
}
function Ju(e, t = !1) {
	const {
		host: r,
		path: n,
		pass: i,
		port: a,
		projectId: s,
		protocol: o,
		publicKey: l,
	} = e;
	return `${o}://${l}${t && i ? `:${i}` : ""}@${r}${a ? `:${a}` : ""}/${
		n && `${n}/`
	}${s}`;
}
function lx(e) {
	const t = sx.exec(e);
	if (!t) throw new yt(`Invalid Sentry Dsn: ${e}`);
	const [r, n, i = "", a, s = "", o] = t.slice(1);
	let l = "",
		c = o;
	const u = c.split("/");
	if ((u.length > 1 && ((l = u.slice(0, -1).join("/")), (c = u.pop())), c)) {
		const d = c.match(/^\d+/);
		d && (c = d[0]);
	}
	return Kg({
		host: a,
		pass: i,
		path: l,
		projectId: c,
		port: s,
		protocol: r,
		publicKey: n,
	});
}
function Kg(e) {
	return {
		protocol: e.protocol,
		publicKey: e.publicKey || "",
		pass: e.pass || "",
		host: e.host,
		port: e.port || "",
		path: e.path || "",
		projectId: e.projectId,
	};
}
function cx(e) {
	if (!(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__)) return;
	const { port: t, projectId: r, protocol: n } = e;
	if (
		(["protocol", "publicKey", "host", "projectId"].forEach((a) => {
			if (!e[a]) throw new yt(`Invalid Sentry Dsn: ${a} missing`);
		}),
		!r.match(/^\d+$/))
	)
		throw new yt(`Invalid Sentry Dsn: Invalid projectId ${r}`);
	if (!ox(n)) throw new yt(`Invalid Sentry Dsn: Invalid protocol ${n}`);
	if (t && isNaN(parseInt(t, 10)))
		throw new yt(`Invalid Sentry Dsn: Invalid port ${t}`);
	return !0;
}
function ux(e) {
	const t = typeof e == "string" ? lx(e) : Kg(e);
	return cx(t), t;
}
const fx = "Sentry Logger ",
	Ro = ["debug", "info", "warn", "error", "log", "assert", "trace"];
function Xg(e) {
	if (!("console" in Yt)) return e();
	const t = Yt.console,
		r = {};
	Ro.forEach((n) => {
		const i = t[n] && t[n].__sentry_original__;
		n in t && i && ((r[n] = t[n]), (t[n] = i));
	});
	try {
		return e();
	} finally {
		Object.keys(r).forEach((n) => {
			t[n] = r[n];
		});
	}
}
function Hh() {
	let e = !1;
	const t = {
		enable: () => {
			e = !0;
		},
		disable: () => {
			e = !1;
		},
	};
	return (
		typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__
			? Ro.forEach((r) => {
					t[r] = (...n) => {
						e &&
							Xg(() => {
								Yt.console[r](`${fx}[${r}]:`, ...n);
							});
					};
			  })
			: Ro.forEach((r) => {
					t[r] = () => {};
			  }),
		t
	);
}
let ee;
typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__
	? (ee = Xu("logger", Hh))
	: (ee = Hh());
function Na(e, t = 0) {
	return typeof e != "string" || t === 0 || e.length <= t
		? e
		: `${e.substr(0, t)}...`;
}
function Uh(e, t) {
	if (!Array.isArray(e)) return "";
	const r = [];
	for (let n = 0; n < e.length; n++) {
		const i = e[n];
		try {
			r.push(String(i));
		} catch {
			r.push("[value cannot be serialized]");
		}
	}
	return r.join(t);
}
function dx(e, t, r = !1) {
	return xn(e)
		? ex(t)
			? t.test(e)
			: xn(t)
			? r
				? e === t
				: e.includes(t)
			: !1
		: !1;
}
function f0(e, t = [], r = !1) {
	return t.some((n) => dx(e, n, r));
}
function vt(e, t, r) {
	if (!(t in e)) return;
	const n = e[t],
		i = r(n);
	if (typeof i == "function")
		try {
			Jg(i, n);
		} catch {}
	e[t] = i;
}
function Zu(e, t, r) {
	Object.defineProperty(e, t, { value: r, writable: !0, configurable: !0 });
}
function Jg(e, t) {
	const r = t.prototype || {};
	(e.prototype = t.prototype = r), Zu(e, "__sentry_original__", t);
}
function Qu(e) {
	return e.__sentry_original__;
}
function hx(e) {
	return Object.keys(e)
		.map((t) => `${encodeURIComponent(t)}=${encodeURIComponent(e[t])}`)
		.join("&");
}
function Zg(e) {
	if (Gg(e))
		return { message: e.message, name: e.name, stack: e.stack, ...qh(e) };
	if (Vu(e)) {
		const t = {
			type: e.type,
			target: jh(e.target),
			currentTarget: jh(e.currentTarget),
			...qh(e),
		};
		return (
			typeof CustomEvent < "u" && mr(e, CustomEvent) && (t.detail = e.detail), t
		);
	} else return e;
}
function jh(e) {
	try {
		return QE(e) ? Qa(e) : Object.prototype.toString.call(e);
	} catch {
		return "<unknown>";
	}
}
function qh(e) {
	if (typeof e == "object" && e !== null) {
		const t = {};
		for (const r in e)
			Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
		return t;
	} else return {};
}
function px(e, t = 40) {
	const r = Object.keys(Zg(e));
	if ((r.sort(), !r.length)) return "[object has no keys]";
	if (r[0].length >= t) return Na(r[0], t);
	for (let n = r.length; n > 0; n--) {
		const i = r.slice(0, n).join(", ");
		if (!(i.length > t)) return n === r.length ? i : Na(i, t);
	}
	return "";
}
function pn(e) {
	return dc(e, new Map());
}
function dc(e, t) {
	if (Ui(e)) {
		const r = t.get(e);
		if (r !== void 0) return r;
		const n = {};
		t.set(e, n);
		for (const i of Object.keys(e)) typeof e[i] < "u" && (n[i] = dc(e[i], t));
		return n;
	}
	if (Array.isArray(e)) {
		const r = t.get(e);
		if (r !== void 0) return r;
		const n = [];
		return (
			t.set(e, n),
			e.forEach((i) => {
				n.push(dc(i, t));
			}),
			n
		);
	}
	return e;
}
function nn(e, t) {
	return e ?? t();
}
function io(e) {
	let t,
		r = e[0],
		n = 1;
	for (; n < e.length; ) {
		const i = e[n],
			a = e[n + 1];
		if (
			((n += 2), (i === "optionalAccess" || i === "optionalCall") && r == null)
		)
			return;
		i === "access" || i === "optionalAccess"
			? ((t = r), (r = a(r)))
			: (i === "call" || i === "optionalCall") &&
			  ((r = a((...s) => r.call(t, ...s))), (t = void 0));
	}
	return r;
}
const mx = 50;
function Qg(...e) {
	const t = e.sort((r, n) => r[0] - n[0]).map((r) => r[1]);
	return (r, n = 0) => {
		const i = [];
		for (const a of r
			.split(
				`
`
			)
			.slice(n)) {
			if (a.length > 1024) continue;
			const s = a.replace(/\(error: (.*)\)/, "$1");
			for (const o of t) {
				const l = o(s);
				if (l) {
					i.push(l);
					break;
				}
			}
		}
		return yx(i);
	};
}
function gx(e) {
	return Array.isArray(e) ? Qg(...e) : e;
}
function yx(e) {
	if (!e.length) return [];
	let t = e;
	const r = t[0].function || "",
		n = t[t.length - 1].function || "";
	return (
		(r.indexOf("captureMessage") !== -1 ||
			r.indexOf("captureException") !== -1) &&
			(t = t.slice(1)),
		n.indexOf("sentryWrapped") !== -1 && (t = t.slice(0, -1)),
		t
			.slice(0, mx)
			.map((i) => ({
				...i,
				filename: i.filename || t[0].filename,
				function: i.function || "?",
			}))
			.reverse()
	);
}
const il = "<anonymous>";
function Tn(e) {
	try {
		return !e || typeof e != "function" ? il : e.name || il;
	} catch {
		return il;
	}
}
const Un = u0();
function e2() {
	if (!("fetch" in Un)) return !1;
	try {
		return (
			new Headers(), new Request("http://www.example.com"), new Response(), !0
		);
	} catch {
		return !1;
	}
}
function hc(e) {
	return (
		e && /^function fetch\(\)\s+\{\s+\[native code\]\s+\}$/.test(e.toString())
	);
}
function bx() {
	if (!e2()) return !1;
	if (hc(Un.fetch)) return !0;
	let e = !1;
	const t = Un.document;
	if (t && typeof t.createElement == "function")
		try {
			const r = t.createElement("iframe");
			(r.hidden = !0),
				t.head.appendChild(r),
				r.contentWindow &&
					r.contentWindow.fetch &&
					(e = hc(r.contentWindow.fetch)),
				t.head.removeChild(r);
		} catch (r) {
			(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
				ee.warn(
					"Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ",
					r
				);
		}
	return e;
}
function vx() {
	const e = Un.chrome,
		t = e && e.app && e.app.runtime,
		r = "history" in Un && !!Un.history.pushState && !!Un.history.replaceState;
	return !t && r;
}
const Ge = u0(),
	Ca = {},
	Gh = {};
function _x(e) {
	if (!Gh[e])
		switch (((Gh[e] = !0), e)) {
			case "console":
				wx();
				break;
			case "dom":
				Ox();
				break;
			case "xhr":
				Tx();
				break;
			case "fetch":
				Sx();
				break;
			case "history":
				kx();
				break;
			case "error":
				Nx();
				break;
			case "unhandledrejection":
				Cx();
				break;
			default:
				(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
					ee.warn("unknown instrumentation type:", e);
				return;
		}
}
function Pt(e, t) {
	(Ca[e] = Ca[e] || []), Ca[e].push(t), _x(e);
}
function tr(e, t) {
	if (!(!e || !Ca[e]))
		for (const r of Ca[e] || [])
			try {
				r(t);
			} catch (n) {
				(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
					ee.error(
						`Error while triggering instrumentation handler.
Type: ${e}
Name: ${Tn(r)}
Error:`,
						n
					);
			}
}
function wx() {
	"console" in Ge &&
		Ro.forEach(function (e) {
			e in Ge.console &&
				vt(Ge.console, e, function (t) {
					return function (...r) {
						tr("console", { args: r, level: e }), t && t.apply(Ge.console, r);
					};
				});
		});
}
function Sx() {
	bx() &&
		vt(Ge, "fetch", function (e) {
			return function (...t) {
				const r = {
					args: t,
					fetchData: { method: Ex(t), url: xx(t) },
					startTimestamp: Date.now(),
				};
				return (
					tr("fetch", { ...r }),
					e.apply(Ge, t).then(
						(n) => (
							tr("fetch", { ...r, endTimestamp: Date.now(), response: n }), n
						),
						(n) => {
							throw (
								(tr("fetch", { ...r, endTimestamp: Date.now(), error: n }), n)
							);
						}
					)
				);
			};
		});
}
function Ex(e = []) {
	return "Request" in Ge && mr(e[0], Request) && e[0].method
		? String(e[0].method).toUpperCase()
		: e[1] && e[1].method
		? String(e[1].method).toUpperCase()
		: "GET";
}
function xx(e = []) {
	return typeof e[0] == "string"
		? e[0]
		: "Request" in Ge && mr(e[0], Request)
		? e[0].url
		: String(e[0]);
}
function Tx() {
	if (!("XMLHttpRequest" in Ge)) return;
	const e = XMLHttpRequest.prototype;
	vt(e, "open", function (t) {
		return function (...r) {
			const n = this,
				i = r[1],
				a = (n.__sentry_xhr__ = {
					method: xn(r[0]) ? r[0].toUpperCase() : r[0],
					url: r[1],
				});
			xn(i) &&
				a.method === "POST" &&
				i.match(/sentry_key/) &&
				(n.__sentry_own_request__ = !0);
			const s = function () {
				if (n.readyState === 4) {
					try {
						a.status_code = n.status;
					} catch {}
					tr("xhr", {
						args: r,
						endTimestamp: Date.now(),
						startTimestamp: Date.now(),
						xhr: n,
					});
				}
			};
			return (
				"onreadystatechange" in n && typeof n.onreadystatechange == "function"
					? vt(n, "onreadystatechange", function (o) {
							return function (...l) {
								return s(), o.apply(n, l);
							};
					  })
					: n.addEventListener("readystatechange", s),
				t.apply(n, r)
			);
		};
	}),
		vt(e, "send", function (t) {
			return function (...r) {
				return (
					this.__sentry_xhr__ &&
						r[0] !== void 0 &&
						(this.__sentry_xhr__.body = r[0]),
					tr("xhr", { args: r, startTimestamp: Date.now(), xhr: this }),
					t.apply(this, r)
				);
			};
		});
}
let qs;
function kx() {
	if (!vx()) return;
	const e = Ge.onpopstate;
	Ge.onpopstate = function (...r) {
		const n = Ge.location.href,
			i = qs;
		if (((qs = n), tr("history", { from: i, to: n }), e))
			try {
				return e.apply(this, r);
			} catch {}
	};
	function t(r) {
		return function (...n) {
			const i = n.length > 2 ? n[2] : void 0;
			if (i) {
				const a = qs,
					s = String(i);
				(qs = s), tr("history", { from: a, to: s });
			}
			return r.apply(this, n);
		};
	}
	vt(Ge.history, "pushState", t), vt(Ge.history, "replaceState", t);
}
const Ax = 1e3;
let Gs, Ys;
function Rx(e, t) {
	if (!e || e.type !== t.type) return !0;
	try {
		if (e.target !== t.target) return !0;
	} catch {}
	return !1;
}
function Mx(e) {
	if (e.type !== "keypress") return !1;
	try {
		const t = e.target;
		if (!t || !t.tagName) return !0;
		if (
			t.tagName === "INPUT" ||
			t.tagName === "TEXTAREA" ||
			t.isContentEditable
		)
			return !1;
	} catch {}
	return !0;
}
function Yh(e, t = !1) {
	return (r) => {
		if (!r || Ys === r || Mx(r)) return;
		const n = r.type === "keypress" ? "input" : r.type;
		Gs === void 0
			? (e({ event: r, name: n, global: t }), (Ys = r))
			: Rx(Ys, r) && (e({ event: r, name: n, global: t }), (Ys = r)),
			clearTimeout(Gs),
			(Gs = Ge.setTimeout(() => {
				Gs = void 0;
			}, Ax));
	};
}
function Ox() {
	if (!("document" in Ge)) return;
	const e = tr.bind(null, "dom"),
		t = Yh(e, !0);
	Ge.document.addEventListener("click", t, !1),
		Ge.document.addEventListener("keypress", t, !1),
		["EventTarget", "Node"].forEach((r) => {
			const n = Ge[r] && Ge[r].prototype;
			!n ||
				!n.hasOwnProperty ||
				!n.hasOwnProperty("addEventListener") ||
				(vt(n, "addEventListener", function (i) {
					return function (a, s, o) {
						if (a === "click" || a == "keypress")
							try {
								const l = this,
									c = (l.__sentry_instrumentation_handlers__ =
										l.__sentry_instrumentation_handlers__ || {}),
									u = (c[a] = c[a] || { refCount: 0 });
								if (!u.handler) {
									const d = Yh(e);
									(u.handler = d), i.call(this, a, d, o);
								}
								u.refCount++;
							} catch {}
						return i.call(this, a, s, o);
					};
				}),
				vt(n, "removeEventListener", function (i) {
					return function (a, s, o) {
						if (a === "click" || a == "keypress")
							try {
								const l = this,
									c = l.__sentry_instrumentation_handlers__ || {},
									u = c[a];
								u &&
									(u.refCount--,
									u.refCount <= 0 &&
										(i.call(this, a, u.handler, o),
										(u.handler = void 0),
										delete c[a]),
									Object.keys(c).length === 0 &&
										delete l.__sentry_instrumentation_handlers__);
							} catch {}
						return i.call(this, a, s, o);
					};
				}));
		});
}
let al = null;
function Nx() {
	(al = Ge.onerror),
		(Ge.onerror = function (e, t, r, n, i) {
			return (
				tr("error", { column: n, error: i, line: r, msg: e, url: t }),
				al ? al.apply(this, arguments) : !1
			);
		});
}
let sl = null;
function Cx() {
	(sl = Ge.onunhandledrejection),
		(Ge.onunhandledrejection = function (e) {
			return tr("unhandledrejection", e), sl ? sl.apply(this, arguments) : !0;
		});
}
function Ix() {
	const e = typeof WeakSet == "function",
		t = e ? new WeakSet() : [];
	function r(i) {
		if (e) return t.has(i) ? !0 : (t.add(i), !1);
		for (let a = 0; a < t.length; a++) if (t[a] === i) return !0;
		return t.push(i), !1;
	}
	function n(i) {
		if (e) t.delete(i);
		else
			for (let a = 0; a < t.length; a++)
				if (t[a] === i) {
					t.splice(a, 1);
					break;
				}
	}
	return [r, n];
}
function mn() {
	const e = Yt,
		t = e.crypto || e.msCrypto;
	if (t && t.randomUUID) return t.randomUUID().replace(/-/g, "");
	const r =
		t && t.getRandomValues
			? () => t.getRandomValues(new Uint8Array(1))[0]
			: () => Math.random() * 16;
	return ([1e7] + 1e3 + 4e3 + 8e3 + 1e11).replace(/[018]/g, (n) =>
		(n ^ ((r() & 15) >> (n / 4))).toString(16)
	);
}
function t2(e) {
	return e.exception && e.exception.values ? e.exception.values[0] : void 0;
}
function jn(e) {
	const { message: t, event_id: r } = e;
	if (t) return t;
	const n = t2(e);
	return n
		? n.type && n.value
			? `${n.type}: ${n.value}`
			: n.type || n.value || r || "<unknown>"
		: r || "<unknown>";
}
function pc(e, t, r) {
	const n = (e.exception = e.exception || {}),
		i = (n.values = n.values || []),
		a = (i[0] = i[0] || {});
	a.value || (a.value = t || ""), a.type || (a.type = r || "Error");
}
function es(e, t) {
	const r = t2(e);
	if (!r) return;
	const n = { type: "generic", handled: !0 },
		i = r.mechanism;
	if (((r.mechanism = { ...n, ...i, ...t }), t && "data" in t)) {
		const a = { ...(i && i.data), ...t.data };
		r.mechanism.data = a;
	}
}
function Wh(e) {
	if (e && e.__sentry_captured__) return !0;
	try {
		Zu(e, "__sentry_captured__", !0);
	} catch {}
	return !1;
}
function r2(e) {
	return Array.isArray(e) ? e : [e];
}
function Dx() {
	return typeof __SENTRY_BROWSER_BUNDLE__ < "u" && !!__SENTRY_BROWSER_BUNDLE__;
}
function ef() {
	return (
		!Dx() &&
		Object.prototype.toString.call(typeof process < "u" ? process : 0) ===
			"[object process]"
	);
}
function cn(e, t) {
	return e.require(t);
}
function Bx(e) {
	let t;
	try {
		t = cn(module, e);
	} catch {}
	try {
		const { cwd: r } = cn(module, "process");
		t = cn(module, `${r()}/node_modules/${e}`);
	} catch {}
	return t;
}
function Qr(e, t = 1 / 0, r = 1 / 0) {
	try {
		return mc("", e, t, r);
	} catch (n) {
		return { ERROR: `**non-serializable** (${n})` };
	}
}
function n2(e, t = 3, r = 100 * 1024) {
	const n = Qr(e, t);
	return zx(n) > r ? n2(e, t - 1, r) : n;
}
function mc(e, t, r = 1 / 0, n = 1 / 0, i = Ix()) {
	const [a, s] = i;
	if (
		t === null ||
		(["number", "boolean", "string"].includes(typeof t) && !Vg(t))
	)
		return t;
	const o = Px(e, t);
	if (!o.startsWith("[object ")) return o;
	if (t.__sentry_skip_normalization__) return t;
	if (r === 0) return o.replace("object ", "");
	if (a(t)) return "[Circular ~]";
	const l = t;
	if (l && typeof l.toJSON == "function")
		try {
			const p = l.toJSON();
			return mc("", p, r - 1, n, i);
		} catch {}
	const c = Array.isArray(t) ? [] : {};
	let u = 0;
	const d = Zg(t);
	for (const p in d) {
		if (!Object.prototype.hasOwnProperty.call(d, p)) continue;
		if (u >= n) {
			c[p] = "[MaxProperties ~]";
			break;
		}
		const m = d[p];
		(c[p] = mc(p, m, r - 1, n, i)), u++;
	}
	return s(t), c;
}
function Px(e, t) {
	try {
		return e === "domain" && t && typeof t == "object" && t._events
			? "[Domain]"
			: e === "domainEmitter"
			? "[DomainEmitter]"
			: typeof global < "u" && t === global
			? "[Global]"
			: typeof window < "u" && t === window
			? "[Window]"
			: typeof document < "u" && t === document
			? "[Document]"
			: tx(t)
			? "[SyntheticEvent]"
			: typeof t == "number" && t !== t
			? "[NaN]"
			: t === void 0
			? "[undefined]"
			: typeof t == "function"
			? `[Function: ${Tn(t)}]`
			: typeof t == "symbol"
			? `[${String(t)}]`
			: typeof t == "bigint"
			? `[BigInt: ${String(t)}]`
			: `[object ${Object.getPrototypeOf(t).constructor.name}]`;
	} catch (r) {
		return `**non-serializable** (${r})`;
	}
}
function Lx(e) {
	return ~-encodeURI(e).split(/%..|./).length;
}
function zx(e) {
	return Lx(JSON.stringify(e));
}
var Er;
(function (e) {
	e[(e.PENDING = 0)] = "PENDING";
	const r = 1;
	e[(e.RESOLVED = r)] = "RESOLVED";
	const n = 2;
	e[(e.REJECTED = n)] = "REJECTED";
})(Er || (Er = {}));
function Xn(e) {
	return new St((t) => {
		t(e);
	});
}
function Mo(e) {
	return new St((t, r) => {
		r(e);
	});
}
class St {
	__init() {
		this._state = Er.PENDING;
	}
	__init2() {
		this._handlers = [];
	}
	constructor(t) {
		St.prototype.__init.call(this),
			St.prototype.__init2.call(this),
			St.prototype.__init3.call(this),
			St.prototype.__init4.call(this),
			St.prototype.__init5.call(this),
			St.prototype.__init6.call(this);
		try {
			t(this._resolve, this._reject);
		} catch (r) {
			this._reject(r);
		}
	}
	then(t, r) {
		return new St((n, i) => {
			this._handlers.push([
				!1,
				(a) => {
					if (!t) n(a);
					else
						try {
							n(t(a));
						} catch (s) {
							i(s);
						}
				},
				(a) => {
					if (!r) i(a);
					else
						try {
							n(r(a));
						} catch (s) {
							i(s);
						}
				},
			]),
				this._executeHandlers();
		});
	}
	catch(t) {
		return this.then((r) => r, t);
	}
	finally(t) {
		return new St((r, n) => {
			let i, a;
			return this.then(
				(s) => {
					(a = !1), (i = s), t && t();
				},
				(s) => {
					(a = !0), (i = s), t && t();
				}
			).then(() => {
				if (a) {
					n(i);
					return;
				}
				r(i);
			});
		});
	}
	__init3() {
		this._resolve = (t) => {
			this._setResult(Er.RESOLVED, t);
		};
	}
	__init4() {
		this._reject = (t) => {
			this._setResult(Er.REJECTED, t);
		};
	}
	__init5() {
		this._setResult = (t, r) => {
			if (this._state === Er.PENDING) {
				if (Ku(r)) {
					r.then(this._resolve, this._reject);
					return;
				}
				(this._state = t), (this._value = r), this._executeHandlers();
			}
		};
	}
	__init6() {
		this._executeHandlers = () => {
			if (this._state === Er.PENDING) return;
			const t = this._handlers.slice();
			(this._handlers = []),
				t.forEach((r) => {
					r[0] ||
						(this._state === Er.RESOLVED && r[1](this._value),
						this._state === Er.REJECTED && r[2](this._value),
						(r[0] = !0));
				});
		};
	}
}
function $x(e) {
	const t = [];
	function r() {
		return e === void 0 || t.length < e;
	}
	function n(s) {
		return t.splice(t.indexOf(s), 1)[0];
	}
	function i(s) {
		if (!r())
			return Mo(new yt("Not adding Promise because buffer limit was reached."));
		const o = s();
		return (
			t.indexOf(o) === -1 && t.push(o),
			o.then(() => n(o)).then(null, () => n(o).then(null, () => {})),
			o
		);
	}
	function a(s) {
		return new St((o, l) => {
			let c = t.length;
			if (!c) return o(!0);
			const u = setTimeout(() => {
				s && s > 0 && o(!1);
			}, s);
			t.forEach((d) => {
				Xn(d).then(() => {
					--c || (clearTimeout(u), o(!0));
				}, l);
			});
		});
	}
	return { $: t, add: i, drain: a };
}
function ol(e) {
	if (!e) return {};
	const t = e.match(
		/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/
	);
	if (!t) return {};
	const r = t[6] || "",
		n = t[8] || "";
	return { host: t[4], path: t[5], protocol: t[2], relative: t[5] + r + n };
}
const Fx = ["fatal", "error", "warning", "log", "info", "debug"];
function Hx(e) {
	return e === "warn" ? "warning" : Fx.includes(e) ? e : "log";
}
const i2 = u0(),
	gc = { nowSeconds: () => Date.now() / 1e3 };
function Ux() {
	const { performance: e } = i2;
	if (!e || !e.now) return;
	const t = Date.now() - e.now();
	return { now: () => e.now(), timeOrigin: t };
}
function jx() {
	try {
		return cn(module, "perf_hooks").performance;
	} catch {
		return;
	}
}
const ll = ef() ? jx() : Ux(),
	Vh =
		ll === void 0 ? gc : { nowSeconds: () => (ll.timeOrigin + ll.now()) / 1e3 },
	d0 = gc.nowSeconds.bind(gc),
	h0 = Vh.nowSeconds.bind(Vh),
	ts = h0,
	rs = (() => {
		const { performance: e } = i2;
		if (!e || !e.now) return;
		const t = 3600 * 1e3,
			r = e.now(),
			n = Date.now(),
			i = e.timeOrigin ? Math.abs(e.timeOrigin + r - n) : t,
			a = i < t,
			s = e.timing && e.timing.navigationStart,
			l = typeof s == "number" ? Math.abs(s + r - n) : t,
			c = l < t;
		return a || c ? (i <= l ? e.timeOrigin : s) : n;
	})(),
	qx = new RegExp("^[ \\t]*([0-9a-f]{32})?-?([0-9a-f]{16})?-?([01])?[ \\t]*$");
function Gx(e) {
	const t = e.match(qx);
	if (!e || !t) return;
	let r;
	return (
		t[3] === "1" ? (r = !0) : t[3] === "0" && (r = !1),
		{ traceId: t[1], parentSampled: r, parentSpanId: t[2] }
	);
}
function p0(e, t = []) {
	return [e, t];
}
function Yx(e, t) {
	const [r, n] = e;
	return [r, [...n, t]];
}
function Kh(e, t) {
	e[1].forEach((n) => {
		const i = n[0].type;
		t(n, i);
	});
}
function yc(e, t) {
	return (t || new TextEncoder()).encode(e);
}
function a2(e, t) {
	const [r, n] = e;
	let i = JSON.stringify(r);
	function a(s) {
		typeof i == "string"
			? (i = typeof s == "string" ? i + s : [yc(i, t), s])
			: i.push(typeof s == "string" ? yc(s, t) : s);
	}
	for (const s of n) {
		const [o, l] = s;
		if (
			(a(`
${JSON.stringify(o)}
`),
			typeof l == "string" || l instanceof Uint8Array)
		)
			a(l);
		else {
			let c;
			try {
				c = JSON.stringify(l);
			} catch {
				c = JSON.stringify(Qr(l));
			}
			a(c);
		}
	}
	return typeof i == "string" ? i : Wx(i);
}
function Wx(e) {
	const t = e.reduce((i, a) => i + a.length, 0),
		r = new Uint8Array(t);
	let n = 0;
	for (const i of e) r.set(i, n), (n += i.length);
	return r;
}
function Vx(e, t) {
	const r = typeof e.data == "string" ? yc(e.data, t) : e.data;
	return [
		pn({
			type: "attachment",
			length: r.length,
			filename: e.filename,
			content_type: e.contentType,
			attachment_type: e.attachmentType,
		}),
		r,
	];
}
const Kx = {
	session: "session",
	sessions: "session",
	attachment: "attachment",
	transaction: "transaction",
	event: "error",
	client_report: "internal",
	user_report: "default",
	profile: "profile",
	replay_event: "replay_event",
	replay_recording: "replay_recording",
};
function Xh(e) {
	return Kx[e];
}
function s2(e) {
	if (!e || !e.sdk) return;
	const { name: t, version: r } = e.sdk;
	return { name: t, version: r };
}
function Xx(e, t, r, n) {
	const i =
		e.sdkProcessingMetadata && e.sdkProcessingMetadata.dynamicSamplingContext;
	return {
		event_id: e.event_id,
		sent_at: new Date().toISOString(),
		...(t && { sdk: t }),
		...(!!r && { dsn: Ju(n) }),
		...(e.type === "transaction" && i && { trace: pn({ ...i }) }),
	};
}
function Jx(e, t, r) {
	const n = [
		{ type: "client_report" },
		{ timestamp: r || d0(), discarded_events: e },
	];
	return p0(t ? { dsn: t } : {}, [n]);
}
const Zx = 60 * 1e3;
function Qx(e, t = Date.now()) {
	const r = parseInt(`${e}`, 10);
	if (!isNaN(r)) return r * 1e3;
	const n = Date.parse(`${e}`);
	return isNaN(n) ? Zx : n - t;
}
function eT(e, t) {
	return e[t] || e.all || 0;
}
function tT(e, t, r = Date.now()) {
	return eT(e, t) > r;
}
function rT(e, { statusCode: t, headers: r }, n = Date.now()) {
	const i = { ...e },
		a = r && r["x-sentry-rate-limits"],
		s = r && r["retry-after"];
	if (a)
		for (const o of a.trim().split(",")) {
			const [l, c] = o.split(":", 2),
				u = parseInt(l, 10),
				d = (isNaN(u) ? 60 : u) * 1e3;
			if (!c) i.all = n + d;
			else for (const p of c.split(";")) i[p] = n + d;
		}
	else s ? (i.all = n + Qx(s, n)) : t === 429 && (i.all = n + 60 * 1e3);
	return i;
}
const bc = "baggage",
	o2 = "sentry-",
	nT = /^sentry-/,
	iT = 8192;
function aT(e) {
	if (!xn(e) && !Array.isArray(e)) return;
	let t = {};
	if (Array.isArray(e))
		t = e.reduce((n, i) => {
			const a = Jh(i);
			return { ...n, ...a };
		}, {});
	else {
		if (!e) return;
		t = Jh(e);
	}
	const r = Object.entries(t).reduce((n, [i, a]) => {
		if (i.match(nT)) {
			const s = i.slice(o2.length);
			n[s] = a;
		}
		return n;
	}, {});
	if (Object.keys(r).length > 0) return r;
}
function l2(e) {
	const t = Object.entries(e).reduce(
		(r, [n, i]) => (i && (r[`${o2}${n}`] = i), r),
		{}
	);
	return sT(t);
}
function Jh(e) {
	return e
		.split(",")
		.map((t) => t.split("=").map((r) => decodeURIComponent(r.trim())))
		.reduce((t, [r, n]) => ((t[r] = n), t), {});
}
function sT(e) {
	if (Object.keys(e).length !== 0)
		return Object.entries(e).reduce((t, [r, n], i) => {
			const a = `${encodeURIComponent(r)}=${encodeURIComponent(n)}`,
				s = i === 0 ? a : `${t},${a}`;
			return s.length > iT
				? ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
						ee.warn(
							`Not adding key: ${r} with val: ${n} to baggage header due to exceeding baggage size limits.`
						),
				  t)
				: s;
		}, "");
}
function oT(e) {
	const t = h0(),
		r = {
			sid: mn(),
			init: !0,
			timestamp: t,
			started: t,
			duration: 0,
			status: "ok",
			errors: 0,
			ignoreDuration: !1,
			toJSON: () => cT(r),
		};
	return e && ji(r, e), r;
}
function ji(e, t = {}) {
	if (
		(t.user &&
			(!e.ipAddress && t.user.ip_address && (e.ipAddress = t.user.ip_address),
			!e.did &&
				!t.did &&
				(e.did = t.user.id || t.user.email || t.user.username)),
		(e.timestamp = t.timestamp || h0()),
		t.ignoreDuration && (e.ignoreDuration = t.ignoreDuration),
		t.sid && (e.sid = t.sid.length === 32 ? t.sid : mn()),
		t.init !== void 0 && (e.init = t.init),
		!e.did && t.did && (e.did = `${t.did}`),
		typeof t.started == "number" && (e.started = t.started),
		e.ignoreDuration)
	)
		e.duration = void 0;
	else if (typeof t.duration == "number") e.duration = t.duration;
	else {
		const r = e.timestamp - e.started;
		e.duration = r >= 0 ? r : 0;
	}
	t.release && (e.release = t.release),
		t.environment && (e.environment = t.environment),
		!e.ipAddress && t.ipAddress && (e.ipAddress = t.ipAddress),
		!e.userAgent && t.userAgent && (e.userAgent = t.userAgent),
		typeof t.errors == "number" && (e.errors = t.errors),
		t.status && (e.status = t.status);
}
function lT(e, t) {
	let r = {};
	t ? (r = { status: t }) : e.status === "ok" && (r = { status: "exited" }),
		ji(e, r);
}
function cT(e) {
	return pn({
		sid: `${e.sid}`,
		init: e.init,
		started: new Date(e.started * 1e3).toISOString(),
		timestamp: new Date(e.timestamp * 1e3).toISOString(),
		status: e.status,
		errors: e.errors,
		did:
			typeof e.did == "number" || typeof e.did == "string"
				? `${e.did}`
				: void 0,
		duration: e.duration,
		attrs: {
			release: e.release,
			environment: e.environment,
			ip_address: e.ipAddress,
			user_agent: e.userAgent,
		},
	});
}
const uT = 100;
class gn {
	constructor() {
		(this._notifyingListeners = !1),
			(this._scopeListeners = []),
			(this._eventProcessors = []),
			(this._breadcrumbs = []),
			(this._attachments = []),
			(this._user = {}),
			(this._tags = {}),
			(this._extra = {}),
			(this._contexts = {}),
			(this._sdkProcessingMetadata = {});
	}
	static clone(t) {
		const r = new gn();
		return (
			t &&
				((r._breadcrumbs = [...t._breadcrumbs]),
				(r._tags = { ...t._tags }),
				(r._extra = { ...t._extra }),
				(r._contexts = { ...t._contexts }),
				(r._user = t._user),
				(r._level = t._level),
				(r._span = t._span),
				(r._session = t._session),
				(r._transactionName = t._transactionName),
				(r._fingerprint = t._fingerprint),
				(r._eventProcessors = [...t._eventProcessors]),
				(r._requestSession = t._requestSession),
				(r._attachments = [...t._attachments]),
				(r._sdkProcessingMetadata = { ...t._sdkProcessingMetadata })),
			r
		);
	}
	addScopeListener(t) {
		this._scopeListeners.push(t);
	}
	addEventProcessor(t) {
		return this._eventProcessors.push(t), this;
	}
	setUser(t) {
		return (
			(this._user = t || {}),
			this._session && ji(this._session, { user: t }),
			this._notifyScopeListeners(),
			this
		);
	}
	getUser() {
		return this._user;
	}
	getRequestSession() {
		return this._requestSession;
	}
	setRequestSession(t) {
		return (this._requestSession = t), this;
	}
	setTags(t) {
		return (
			(this._tags = { ...this._tags, ...t }), this._notifyScopeListeners(), this
		);
	}
	setTag(t, r) {
		return (
			(this._tags = { ...this._tags, [t]: r }),
			this._notifyScopeListeners(),
			this
		);
	}
	setExtras(t) {
		return (
			(this._extra = { ...this._extra, ...t }),
			this._notifyScopeListeners(),
			this
		);
	}
	setExtra(t, r) {
		return (
			(this._extra = { ...this._extra, [t]: r }),
			this._notifyScopeListeners(),
			this
		);
	}
	setFingerprint(t) {
		return (this._fingerprint = t), this._notifyScopeListeners(), this;
	}
	setLevel(t) {
		return (this._level = t), this._notifyScopeListeners(), this;
	}
	setTransactionName(t) {
		return (this._transactionName = t), this._notifyScopeListeners(), this;
	}
	setContext(t, r) {
		return (
			r === null ? delete this._contexts[t] : (this._contexts[t] = r),
			this._notifyScopeListeners(),
			this
		);
	}
	setSpan(t) {
		return (this._span = t), this._notifyScopeListeners(), this;
	}
	getSpan() {
		return this._span;
	}
	getTransaction() {
		const t = this.getSpan();
		return t && t.transaction;
	}
	setSession(t) {
		return (
			t ? (this._session = t) : delete this._session,
			this._notifyScopeListeners(),
			this
		);
	}
	getSession() {
		return this._session;
	}
	update(t) {
		if (!t) return this;
		if (typeof t == "function") {
			const r = t(this);
			return r instanceof gn ? r : this;
		}
		return (
			t instanceof gn
				? ((this._tags = { ...this._tags, ...t._tags }),
				  (this._extra = { ...this._extra, ...t._extra }),
				  (this._contexts = { ...this._contexts, ...t._contexts }),
				  t._user && Object.keys(t._user).length && (this._user = t._user),
				  t._level && (this._level = t._level),
				  t._fingerprint && (this._fingerprint = t._fingerprint),
				  t._requestSession && (this._requestSession = t._requestSession))
				: Ui(t) &&
				  ((t = t),
				  (this._tags = { ...this._tags, ...t.tags }),
				  (this._extra = { ...this._extra, ...t.extra }),
				  (this._contexts = { ...this._contexts, ...t.contexts }),
				  t.user && (this._user = t.user),
				  t.level && (this._level = t.level),
				  t.fingerprint && (this._fingerprint = t.fingerprint),
				  t.requestSession && (this._requestSession = t.requestSession)),
			this
		);
	}
	clear() {
		return (
			(this._breadcrumbs = []),
			(this._tags = {}),
			(this._extra = {}),
			(this._user = {}),
			(this._contexts = {}),
			(this._level = void 0),
			(this._transactionName = void 0),
			(this._fingerprint = void 0),
			(this._requestSession = void 0),
			(this._span = void 0),
			(this._session = void 0),
			this._notifyScopeListeners(),
			(this._attachments = []),
			this
		);
	}
	addBreadcrumb(t, r) {
		const n = typeof r == "number" ? r : uT;
		if (n <= 0) return this;
		const i = { timestamp: d0(), ...t };
		return (
			(this._breadcrumbs = [...this._breadcrumbs, i].slice(-n)),
			this._notifyScopeListeners(),
			this
		);
	}
	getLastBreadcrumb() {
		return this._breadcrumbs[this._breadcrumbs.length - 1];
	}
	clearBreadcrumbs() {
		return (this._breadcrumbs = []), this._notifyScopeListeners(), this;
	}
	addAttachment(t) {
		return this._attachments.push(t), this;
	}
	getAttachments() {
		return this._attachments;
	}
	clearAttachments() {
		return (this._attachments = []), this;
	}
	applyToEvent(t, r = {}) {
		if (
			(this._extra &&
				Object.keys(this._extra).length &&
				(t.extra = { ...this._extra, ...t.extra }),
			this._tags &&
				Object.keys(this._tags).length &&
				(t.tags = { ...this._tags, ...t.tags }),
			this._user &&
				Object.keys(this._user).length &&
				(t.user = { ...this._user, ...t.user }),
			this._contexts &&
				Object.keys(this._contexts).length &&
				(t.contexts = { ...this._contexts, ...t.contexts }),
			this._level && (t.level = this._level),
			this._transactionName && (t.transaction = this._transactionName),
			this._span)
		) {
			t.contexts = { trace: this._span.getTraceContext(), ...t.contexts };
			const n = this._span.transaction && this._span.transaction.name;
			n && (t.tags = { transaction: n, ...t.tags });
		}
		return (
			this._applyFingerprint(t),
			(t.breadcrumbs = [...(t.breadcrumbs || []), ...this._breadcrumbs]),
			(t.breadcrumbs = t.breadcrumbs.length > 0 ? t.breadcrumbs : void 0),
			(t.sdkProcessingMetadata = {
				...t.sdkProcessingMetadata,
				...this._sdkProcessingMetadata,
			}),
			this._notifyEventProcessors([...c2(), ...this._eventProcessors], t, r)
		);
	}
	setSDKProcessingMetadata(t) {
		return (
			(this._sdkProcessingMetadata = { ...this._sdkProcessingMetadata, ...t }),
			this
		);
	}
	_notifyEventProcessors(t, r, n, i = 0) {
		return new St((a, s) => {
			const o = t[i];
			if (r === null || typeof o != "function") a(r);
			else {
				const l = o({ ...r }, n);
				(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
					o.id &&
					l === null &&
					ee.log(`Event processor "${o.id}" dropped event`),
					Ku(l)
						? l
								.then((c) =>
									this._notifyEventProcessors(t, c, n, i + 1).then(a)
								)
								.then(null, s)
						: this._notifyEventProcessors(t, l, n, i + 1)
								.then(a)
								.then(null, s);
			}
		});
	}
	_notifyScopeListeners() {
		this._notifyingListeners ||
			((this._notifyingListeners = !0),
			this._scopeListeners.forEach((t) => {
				t(this);
			}),
			(this._notifyingListeners = !1));
	}
	_applyFingerprint(t) {
		(t.fingerprint = t.fingerprint ? r2(t.fingerprint) : []),
			this._fingerprint &&
				(t.fingerprint = t.fingerprint.concat(this._fingerprint)),
			t.fingerprint && !t.fingerprint.length && delete t.fingerprint;
	}
}
function c2() {
	return Xu("globalEventProcessors", () => []);
}
function tf(e) {
	c2().push(e);
}
const rf = 4,
	fT = 100;
class gs {
	__init() {
		this._stack = [{}];
	}
	constructor(t, r = new gn(), n = rf) {
		(this._version = n),
			gs.prototype.__init.call(this),
			(this.getStackTop().scope = r),
			t && this.bindClient(t);
	}
	isOlderThan(t) {
		return this._version < t;
	}
	bindClient(t) {
		const r = this.getStackTop();
		(r.client = t), t && t.setupIntegrations && t.setupIntegrations();
	}
	pushScope() {
		const t = gn.clone(this.getScope());
		return this.getStack().push({ client: this.getClient(), scope: t }), t;
	}
	popScope() {
		return this.getStack().length <= 1 ? !1 : !!this.getStack().pop();
	}
	withScope(t) {
		const r = this.pushScope();
		try {
			t(r);
		} finally {
			this.popScope();
		}
	}
	getClient() {
		return this.getStackTop().client;
	}
	getScope() {
		return this.getStackTop().scope;
	}
	getStack() {
		return this._stack;
	}
	getStackTop() {
		return this._stack[this._stack.length - 1];
	}
	captureException(t, r) {
		const n = (this._lastEventId = r && r.event_id ? r.event_id : mn()),
			i = new Error("Sentry syntheticException");
		return (
			this._withClient((a, s) => {
				a.captureException(
					t,
					{ originalException: t, syntheticException: i, ...r, event_id: n },
					s
				);
			}),
			n
		);
	}
	captureMessage(t, r, n) {
		const i = (this._lastEventId = n && n.event_id ? n.event_id : mn()),
			a = new Error(t);
		return (
			this._withClient((s, o) => {
				s.captureMessage(
					t,
					r,
					{ originalException: t, syntheticException: a, ...n, event_id: i },
					o
				);
			}),
			i
		);
	}
	captureEvent(t, r) {
		const n = r && r.event_id ? r.event_id : mn();
		return (
			t.type || (this._lastEventId = n),
			this._withClient((i, a) => {
				i.captureEvent(t, { ...r, event_id: n }, a);
			}),
			n
		);
	}
	lastEventId() {
		return this._lastEventId;
	}
	addBreadcrumb(t, r) {
		const { scope: n, client: i } = this.getStackTop();
		if (!n || !i) return;
		const { beforeBreadcrumb: a = null, maxBreadcrumbs: s = fT } =
			(i.getOptions && i.getOptions()) || {};
		if (s <= 0) return;
		const l = { timestamp: d0(), ...t },
			c = a ? Xg(() => a(l, r)) : l;
		c !== null && n.addBreadcrumb(c, s);
	}
	setUser(t) {
		const r = this.getScope();
		r && r.setUser(t);
	}
	setTags(t) {
		const r = this.getScope();
		r && r.setTags(t);
	}
	setExtras(t) {
		const r = this.getScope();
		r && r.setExtras(t);
	}
	setTag(t, r) {
		const n = this.getScope();
		n && n.setTag(t, r);
	}
	setExtra(t, r) {
		const n = this.getScope();
		n && n.setExtra(t, r);
	}
	setContext(t, r) {
		const n = this.getScope();
		n && n.setContext(t, r);
	}
	configureScope(t) {
		const { scope: r, client: n } = this.getStackTop();
		r && n && t(r);
	}
	run(t) {
		const r = Zh(this);
		try {
			t(this);
		} finally {
			Zh(r);
		}
	}
	getIntegration(t) {
		const r = this.getClient();
		if (!r) return null;
		try {
			return r.getIntegration(t);
		} catch {
			return (
				(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
					ee.warn(`Cannot retrieve integration ${t.id} from the current Hub`),
				null
			);
		}
	}
	startTransaction(t, r) {
		return this._callExtensionMethod("startTransaction", t, r);
	}
	traceHeaders() {
		return this._callExtensionMethod("traceHeaders");
	}
	captureSession(t = !1) {
		if (t) return this.endSession();
		this._sendSessionUpdate();
	}
	endSession() {
		const t = this.getStackTop(),
			r = t && t.scope,
			n = r && r.getSession();
		n && lT(n), this._sendSessionUpdate(), r && r.setSession();
	}
	startSession(t) {
		const { scope: r, client: n } = this.getStackTop(),
			{ release: i, environment: a } = (n && n.getOptions()) || {},
			{ userAgent: s } = Yt.navigator || {},
			o = oT({
				release: i,
				environment: a,
				...(r && { user: r.getUser() }),
				...(s && { userAgent: s }),
				...t,
			});
		if (r) {
			const l = r.getSession && r.getSession();
			l && l.status === "ok" && ji(l, { status: "exited" }),
				this.endSession(),
				r.setSession(o);
		}
		return o;
	}
	shouldSendDefaultPii() {
		const t = this.getClient(),
			r = t && t.getOptions();
		return Boolean(r && r.sendDefaultPii);
	}
	_sendSessionUpdate() {
		const { scope: t, client: r } = this.getStackTop();
		if (!t) return;
		const n = t.getSession();
		n && r && r.captureSession && r.captureSession(n);
	}
	_withClient(t) {
		const { scope: r, client: n } = this.getStackTop();
		n && t(n, r);
	}
	_callExtensionMethod(t, ...r) {
		const i = ia().__SENTRY__;
		if (i && i.extensions && typeof i.extensions[t] == "function")
			return i.extensions[t].apply(this, r);
		(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
			ee.warn(`Extension method ${t} couldn't be found, doing nothing.`);
	}
}
function ia() {
	return (Yt.__SENTRY__ = Yt.__SENTRY__ || { extensions: {}, hub: void 0 }), Yt;
}
function Zh(e) {
	const t = ia(),
		r = an(t);
	return nf(t, e), r;
}
function tt() {
	const e = ia();
	return (
		(!u2(e) || an(e).isOlderThan(rf)) && nf(e, new gs()), ef() ? dT(e) : an(e)
	);
}
function dT(e) {
	try {
		const t = ia().__SENTRY__,
			r =
				t && t.extensions && t.extensions.domain && t.extensions.domain.active;
		if (!r) return an(e);
		if (!u2(r) || an(r).isOlderThan(rf)) {
			const n = an(e).getStackTop();
			nf(r, new gs(n.client, gn.clone(n.scope)));
		}
		return an(r);
	} catch {
		return an(e);
	}
}
function u2(e) {
	return !!(e && e.__SENTRY__ && e.__SENTRY__.hub);
}
function an(e) {
	return Xu("hub", () => new gs(), e);
}
function nf(e, t) {
	if (!e) return !1;
	const r = (e.__SENTRY__ = e.__SENTRY__ || {});
	return (r.hub = t), !0;
}
function hT(e, t) {
	return tt().captureException(e, { captureContext: t });
}
function pT(e) {
	tt().withScope(e);
}
const mT = "7";
function gT(e) {
	const t = e.protocol ? `${e.protocol}:` : "",
		r = e.port ? `:${e.port}` : "";
	return `${t}//${e.host}${r}${e.path ? `/${e.path}` : ""}/api/`;
}
function yT(e) {
	return `${gT(e)}${e.projectId}/envelope/`;
}
function bT(e, t) {
	return hx({
		sentry_key: e.publicKey,
		sentry_version: mT,
		...(t && { sentry_client: `${t.name}/${t.version}` }),
	});
}
function f2(e, t = {}) {
	const r = typeof t == "string" ? t : t.tunnel,
		n = typeof t == "string" || !t._metadata ? void 0 : t._metadata.sdk;
	return r || `${yT(e)}?${bT(e, n)}`;
}
function vT(e, t) {
	return (
		t &&
			((e.sdk = e.sdk || {}),
			(e.sdk.name = e.sdk.name || t.name),
			(e.sdk.version = e.sdk.version || t.version),
			(e.sdk.integrations = [
				...(e.sdk.integrations || []),
				...(t.integrations || []),
			]),
			(e.sdk.packages = [...(e.sdk.packages || []), ...(t.packages || [])])),
		e
	);
}
function _T(e, t, r, n) {
	const i = s2(r),
		a = {
			sent_at: new Date().toISOString(),
			...(i && { sdk: i }),
			...(!!n && { dsn: Ju(t) }),
		},
		s =
			"aggregates" in e ? [{ type: "sessions" }, e] : [{ type: "session" }, e];
	return p0(a, [s]);
}
function wT(e, t, r, n) {
	const i = s2(r),
		a = e.type && e.type !== "replay_event" ? e.type : "event";
	vT(e, r && r.sdk);
	const s = Xx(e, i, n, t);
	return delete e.sdkProcessingMetadata, p0(s, [[{ type: a }, e]]);
}
const Qh = [];
function ST(e) {
	const t = {};
	return (
		e.forEach((r) => {
			const { name: n } = r,
				i = t[n];
			(i && !i.isDefaultInstance && r.isDefaultInstance) || (t[n] = r);
		}),
		Object.values(t)
	);
}
function ET(e) {
	const t = e.defaultIntegrations || [],
		r = e.integrations;
	t.forEach((s) => {
		s.isDefaultInstance = !0;
	});
	let n;
	Array.isArray(r)
		? (n = [...t, ...r])
		: typeof r == "function"
		? (n = r2(r(t)))
		: (n = t);
	const i = ST(n),
		a = i.findIndex((s) => s.name === "Debug");
	if (a !== -1) {
		const [s] = i.splice(a, 1);
		i.push(s);
	}
	return i;
}
function xT(e) {
	const t = {};
	return (
		e.forEach((r) => {
			d2(r, t);
		}),
		t
	);
}
function d2(e, t) {
	(t[e.name] = e),
		Qh.indexOf(e.name) === -1 &&
			(e.setupOnce(tf, tt),
			Qh.push(e.name),
			(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
				ee.log(`Integration installed: ${e.name}`));
}
function TT(e, t, r, n) {
	const { normalizeDepth: i = 3, normalizeMaxBreadth: a = 1e3 } = e,
		s = {
			...t,
			event_id: t.event_id || r.event_id || mn(),
			timestamp: t.timestamp || d0(),
		};
	kT(s, e),
		AT(
			s,
			e.integrations.map((c) => c.name)
		);
	let o = n;
	r.captureContext && (o = gn.clone(o).update(r.captureContext));
	let l = Xn(s);
	if (o) {
		if (o.getAttachments) {
			const c = [...(r.attachments || []), ...o.getAttachments()];
			c.length && (r.attachments = c);
		}
		l = o.applyToEvent(s, r);
	}
	return l.then((c) => (typeof i == "number" && i > 0 ? RT(c, i, a) : c));
}
function kT(e, t) {
	const { environment: r, release: n, dist: i, maxValueLength: a = 250 } = t;
	"environment" in e || (e.environment = "environment" in t ? r : "production"),
		e.release === void 0 && n !== void 0 && (e.release = n),
		e.dist === void 0 && i !== void 0 && (e.dist = i),
		e.message && (e.message = Na(e.message, a));
	const s = e.exception && e.exception.values && e.exception.values[0];
	s && s.value && (s.value = Na(s.value, a));
	const o = e.request;
	o && o.url && (o.url = Na(o.url, a));
}
function AT(e, t) {
	t.length > 0 &&
		((e.sdk = e.sdk || {}),
		(e.sdk.integrations = [...(e.sdk.integrations || []), ...t]));
}
function RT(e, t, r) {
	if (!e) return null;
	const n = {
		...e,
		...(e.breadcrumbs && {
			breadcrumbs: e.breadcrumbs.map((i) => ({
				...i,
				...(i.data && { data: Qr(i.data, t, r) }),
			})),
		}),
		...(e.user && { user: Qr(e.user, t, r) }),
		...(e.contexts && { contexts: Qr(e.contexts, t, r) }),
		...(e.extra && { extra: Qr(e.extra, t, r) }),
	};
	return (
		e.contexts &&
			e.contexts.trace &&
			n.contexts &&
			((n.contexts.trace = e.contexts.trace),
			e.contexts.trace.data &&
				(n.contexts.trace.data = Qr(e.contexts.trace.data, t, r))),
		e.spans &&
			(n.spans = e.spans.map(
				(i) => (i.data && (i.data = Qr(i.data, t, r)), i)
			)),
		n
	);
}
const e1 = "Not capturing exception because it's already been captured.";
class pi {
	__init() {
		this._integrations = {};
	}
	__init2() {
		this._integrationsInitialized = !1;
	}
	__init3() {
		this._numProcessing = 0;
	}
	__init4() {
		this._outcomes = {};
	}
	constructor(t) {
		if (
			(pi.prototype.__init.call(this),
			pi.prototype.__init2.call(this),
			pi.prototype.__init3.call(this),
			pi.prototype.__init4.call(this),
			(this._options = t),
			t.dsn)
		) {
			this._dsn = ux(t.dsn);
			const r = f2(this._dsn, t);
			this._transport = t.transport({
				recordDroppedEvent: this.recordDroppedEvent.bind(this),
				...t.transportOptions,
				url: r,
			});
		} else
			(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
				ee.warn("No DSN provided, client will not do anything.");
	}
	captureException(t, r, n) {
		if (Wh(t)) {
			(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && ee.log(e1);
			return;
		}
		let i = r && r.event_id;
		return (
			this._process(
				this.eventFromException(t, r)
					.then((a) => this._captureEvent(a, r, n))
					.then((a) => {
						i = a;
					})
			),
			i
		);
	}
	captureMessage(t, r, n, i) {
		let a = n && n.event_id;
		const s = Wg(t)
			? this.eventFromMessage(String(t), r, n)
			: this.eventFromException(t, n);
		return (
			this._process(
				s
					.then((o) => this._captureEvent(o, n, i))
					.then((o) => {
						a = o;
					})
			),
			a
		);
	}
	captureEvent(t, r, n) {
		if (r && r.originalException && Wh(r.originalException)) {
			(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && ee.log(e1);
			return;
		}
		let i = r && r.event_id;
		return (
			this._process(
				this._captureEvent(t, r, n).then((a) => {
					i = a;
				})
			),
			i
		);
	}
	captureSession(t) {
		if (!this._isEnabled()) {
			(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
				ee.warn("SDK not enabled, will not capture session.");
			return;
		}
		typeof t.release != "string"
			? (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
			  ee.warn("Discarded session because of missing or non-string release")
			: (this.sendSession(t), ji(t, { init: !1 }));
	}
	getDsn() {
		return this._dsn;
	}
	getOptions() {
		return this._options;
	}
	getSdkMetadata() {
		return this._options._metadata;
	}
	getTransport() {
		return this._transport;
	}
	flush(t) {
		const r = this._transport;
		return r
			? this._isClientDoneProcessing(t).then((n) =>
					r.flush(t).then((i) => n && i)
			  )
			: Xn(!0);
	}
	close(t) {
		return this.flush(t).then((r) => ((this.getOptions().enabled = !1), r));
	}
	setupIntegrations() {
		this._isEnabled() &&
			!this._integrationsInitialized &&
			((this._integrations = xT(this._options.integrations)),
			(this._integrationsInitialized = !0));
	}
	getIntegrationById(t) {
		return this._integrations[t];
	}
	getIntegration(t) {
		try {
			return this._integrations[t.id] || null;
		} catch {
			return (
				(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
					ee.warn(
						`Cannot retrieve integration ${t.id} from the current Client`
					),
				null
			);
		}
	}
	addIntegration(t) {
		d2(t, this._integrations);
	}
	sendEvent(t, r = {}) {
		if (this._dsn) {
			let n = wT(t, this._dsn, this._options._metadata, this._options.tunnel);
			for (const i of r.attachments || [])
				n = Yx(
					n,
					Vx(
						i,
						this._options.transportOptions &&
							this._options.transportOptions.textEncoder
					)
				);
			this._sendEnvelope(n);
		}
	}
	sendSession(t) {
		if (this._dsn) {
			const r = _T(t, this._dsn, this._options._metadata, this._options.tunnel);
			this._sendEnvelope(r);
		}
	}
	recordDroppedEvent(t, r, n) {
		if (this._options.sendClientReports) {
			const i = `${t}:${r}`;
			(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
				ee.log(`Adding outcome: "${i}"`),
				(this._outcomes[i] = this._outcomes[i] + 1 || 1);
		}
	}
	_updateSessionFromEvent(t, r) {
		let n = !1,
			i = !1;
		const a = r.exception && r.exception.values;
		if (a) {
			i = !0;
			for (const l of a) {
				const c = l.mechanism;
				if (c && c.handled === !1) {
					n = !0;
					break;
				}
			}
		}
		const s = t.status === "ok";
		((s && t.errors === 0) || (s && n)) &&
			(ji(t, {
				...(n && { status: "crashed" }),
				errors: t.errors || Number(i || n),
			}),
			this.captureSession(t));
	}
	_isClientDoneProcessing(t) {
		return new St((r) => {
			let n = 0;
			const i = 1,
				a = setInterval(() => {
					this._numProcessing == 0
						? (clearInterval(a), r(!0))
						: ((n += i), t && n >= t && (clearInterval(a), r(!1)));
				}, i);
		});
	}
	_isEnabled() {
		return this.getOptions().enabled !== !1 && this._dsn !== void 0;
	}
	_prepareEvent(t, r, n) {
		const i = this.getOptions();
		return TT(i, t, r, n);
	}
	_captureEvent(t, r = {}, n) {
		return this._processEvent(t, r, n).then(
			(i) => i.event_id,
			(i) => {
				if (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) {
					const a = i;
					a.logLevel === "log" ? ee.log(a.message) : ee.warn(a);
				}
			}
		);
	}
	_processEvent(t, r, n) {
		const i = this.getOptions(),
			{ sampleRate: a } = i;
		if (!this._isEnabled())
			return Mo(new yt("SDK not enabled, will not capture event.", "log"));
		const s = p2(t),
			o = h2(t),
			l = t.type || "error",
			c = `before send for type \`${l}\``;
		return o && typeof a == "number" && Math.random() > a
			? (this.recordDroppedEvent("sample_rate", "error", t),
			  Mo(
					new yt(
						`Discarding event because it's not included in the random sample (sampling rate = ${a})`,
						"log"
					)
			  ))
			: this._prepareEvent(t, r, n)
					.then((u) => {
						if (u === null)
							throw (
								(this.recordDroppedEvent("event_processor", l, t),
								new yt(
									"An event processor returned `null`, will not send event.",
									"log"
								))
							);
						if (r.data && r.data.__sentry__ === !0) return u;
						const p = OT(i, u, r);
						return MT(p, c);
					})
					.then((u) => {
						if (u === null)
							throw (
								(this.recordDroppedEvent("before_send", t.type || "error", t),
								new yt(`${c} returned \`null\`, will not send event.`, "log"))
							);
						const d = n && n.getSession();
						!s && d && this._updateSessionFromEvent(d, u);
						const p = u.transaction_info;
						if (s && p && u.transaction !== t.transaction) {
							const m = "custom";
							u.transaction_info = {
								...p,
								source: m,
								changes: [
									...p.changes,
									{
										source: m,
										timestamp: u.timestamp,
										propagations: p.propagations,
									},
								],
							};
						}
						return this.sendEvent(u, r), u;
					})
					.then(null, (u) => {
						throw u instanceof yt
							? u
							: (this.captureException(u, {
									data: { __sentry__: !0 },
									originalException: u,
							  }),
							  new yt(`Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.
Reason: ${u}`));
					});
	}
	_process(t) {
		this._numProcessing++,
			t.then(
				(r) => (this._numProcessing--, r),
				(r) => (this._numProcessing--, r)
			);
	}
	_sendEnvelope(t) {
		this._transport && this._dsn
			? this._transport.send(t).then(null, (r) => {
					(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
						ee.error("Error while sending event:", r);
			  })
			: (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
			  ee.error("Transport disabled");
	}
	_clearOutcomes() {
		const t = this._outcomes;
		return (
			(this._outcomes = {}),
			Object.keys(t).map((r) => {
				const [n, i] = r.split(":");
				return { reason: n, category: i, quantity: t[r] };
			})
		);
	}
}
function MT(e, t) {
	const r = `${t} must return \`null\` or a valid event.`;
	if (Ku(e))
		return e.then(
			(n) => {
				if (!Ui(n) && n !== null) throw new yt(r);
				return n;
			},
			(n) => {
				throw new yt(`${t} rejected with ${n}`);
			}
		);
	if (!Ui(e) && e !== null) throw new yt(r);
	return e;
}
function OT(e, t, r) {
	const { beforeSend: n, beforeSendTransaction: i } = e;
	return h2(t) && n ? n(t, r) : p2(t) && i ? i(t, r) : t;
}
function h2(e) {
	return e.type === void 0;
}
function p2(e) {
	return e.type === "transaction";
}
function NT(e, t) {
	t.debug === !0 &&
		(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__
			? ee.enable()
			: console.warn(
					"[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle."
			  ));
	const r = tt(),
		n = r.getScope();
	n && n.update(t.initialScope);
	const i = new e(t);
	r.bindClient(i);
}
const CT = 30;
function m2(e, t, r = $x(e.bufferSize || CT)) {
	let n = {};
	const i = (s) => r.drain(s);
	function a(s) {
		const o = [];
		if (
			(Kh(s, (d, p) => {
				const m = Xh(p);
				if (tT(n, m)) {
					const b = t1(d, p);
					e.recordDroppedEvent("ratelimit_backoff", m, b);
				} else o.push(d);
			}),
			o.length === 0)
		)
			return Xn();
		const l = p0(s[0], o),
			c = (d) => {
				Kh(l, (p, m) => {
					const b = t1(p, m);
					e.recordDroppedEvent(d, Xh(m), b);
				});
			},
			u = () =>
				t({ body: a2(l, e.textEncoder) }).then(
					(d) => (
						d.statusCode !== void 0 &&
							(d.statusCode < 200 || d.statusCode >= 300) &&
							(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
							ee.warn(
								`Sentry responded with status code ${d.statusCode} to sent event.`
							),
						(n = rT(n, d)),
						d
					),
					(d) => {
						throw (c("network_error"), d);
					}
				);
		return r.add(u).then(
			(d) => d,
			(d) => {
				if (d instanceof yt)
					return (
						(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
							ee.error("Skipped sending event because buffer is full."),
						c("queue_overflow"),
						Xn()
					);
				throw d;
			}
		);
	}
	return { send: a, flush: i };
}
function t1(e, t) {
	if (!(t !== "event" && t !== "transaction"))
		return Array.isArray(e) ? e[1] : void 0;
}
const r1 = "7.30.0";
let n1;
class ns {
	constructor() {
		ns.prototype.__init.call(this);
	}
	static __initStatic() {
		this.id = "FunctionToString";
	}
	__init() {
		this.name = ns.id;
	}
	setupOnce() {
		(n1 = Function.prototype.toString),
			(Function.prototype.toString = function (...t) {
				const r = Qu(this) || this;
				return n1.apply(r, t);
			});
	}
}
ns.__initStatic();
const IT = [
	/^Script error\.?$/,
	/^Javascript error: Script error\.? on line 0$/,
];
class ki {
	static __initStatic() {
		this.id = "InboundFilters";
	}
	__init() {
		this.name = ki.id;
	}
	constructor(t = {}) {
		(this._options = t), ki.prototype.__init.call(this);
	}
	setupOnce(t, r) {
		const n = (i) => {
			const a = r();
			if (a) {
				const s = a.getIntegration(ki);
				if (s) {
					const o = a.getClient(),
						l = o ? o.getOptions() : {},
						c = DT(s._options, l);
					return BT(i, c) ? null : i;
				}
			}
			return i;
		};
		(n.id = this.name), t(n);
	}
}
ki.__initStatic();
function DT(e = {}, t = {}) {
	return {
		allowUrls: [...(e.allowUrls || []), ...(t.allowUrls || [])],
		denyUrls: [...(e.denyUrls || []), ...(t.denyUrls || [])],
		ignoreErrors: [...(e.ignoreErrors || []), ...(t.ignoreErrors || []), ...IT],
		ignoreInternal: e.ignoreInternal !== void 0 ? e.ignoreInternal : !0,
	};
}
function BT(e, t) {
	return t.ignoreInternal && FT(e)
		? ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
				ee.warn(`Event dropped due to being internal Sentry Error.
Event: ${jn(e)}`),
		  !0)
		: PT(e, t.ignoreErrors)
		? ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
				ee.warn(`Event dropped due to being matched by \`ignoreErrors\` option.
Event: ${jn(e)}`),
		  !0)
		: LT(e, t.denyUrls)
		? ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
				ee.warn(`Event dropped due to being matched by \`denyUrls\` option.
Event: ${jn(e)}.
Url: ${Oo(e)}`),
		  !0)
		: zT(e, t.allowUrls)
		? !1
		: ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
				ee.warn(`Event dropped due to not being matched by \`allowUrls\` option.
Event: ${jn(e)}.
Url: ${Oo(e)}`),
		  !0);
}
function PT(e, t) {
	return !t || !t.length ? !1 : $T(e).some((r) => f0(r, t));
}
function LT(e, t) {
	if (!t || !t.length) return !1;
	const r = Oo(e);
	return r ? f0(r, t) : !1;
}
function zT(e, t) {
	if (!t || !t.length) return !0;
	const r = Oo(e);
	return r ? f0(r, t) : !0;
}
function $T(e) {
	if (e.message) return [e.message];
	if (e.exception)
		try {
			const { type: t = "", value: r = "" } =
				(e.exception.values && e.exception.values[0]) || {};
			return [`${r}`, `${t}: ${r}`];
		} catch {
			return (
				(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
					ee.error(`Cannot extract message for event ${jn(e)}`),
				[]
			);
		}
	return [];
}
function FT(e) {
	try {
		return e.exception.values[0].type === "SentryError";
	} catch {}
	return !1;
}
function HT(e = []) {
	for (let t = e.length - 1; t >= 0; t--) {
		const r = e[t];
		if (r && r.filename !== "<anonymous>" && r.filename !== "[native code]")
			return r.filename || null;
	}
	return null;
}
function Oo(e) {
	try {
		let t;
		try {
			t = e.exception.values[0].stacktrace.frames;
		} catch {}
		return t ? HT(t) : null;
	} catch {
		return (
			(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
				ee.error(`Cannot extract url for event ${jn(e)}`),
			null
		);
	}
}
const Pe = Yt;
let vc = 0;
function g2() {
	return vc > 0;
}
function UT() {
	vc++,
		setTimeout(() => {
			vc--;
		});
}
function qi(e, t = {}, r) {
	if (typeof e != "function") return e;
	try {
		const i = e.__sentry_wrapped__;
		if (i) return i;
		if (Qu(e)) return e;
	} catch {
		return e;
	}
	const n = function () {
		const i = Array.prototype.slice.call(arguments);
		try {
			r && typeof r == "function" && r.apply(this, arguments);
			const a = i.map((s) => qi(s, t));
			return e.apply(this, a);
		} catch (a) {
			throw (
				(UT(),
				pT((s) => {
					s.addEventProcessor(
						(o) => (
							t.mechanism && (pc(o, void 0, void 0), es(o, t.mechanism)),
							(o.extra = { ...o.extra, arguments: i }),
							o
						)
					),
						hT(a);
				}),
				a)
			);
		}
	};
	try {
		for (const i in e)
			Object.prototype.hasOwnProperty.call(e, i) && (n[i] = e[i]);
	} catch {}
	Jg(n, e), Zu(e, "__sentry_wrapped__", n);
	try {
		Object.getOwnPropertyDescriptor(n, "name").configurable &&
			Object.defineProperty(n, "name", {
				get() {
					return e.name;
				},
			});
	} catch {}
	return n;
}
function y2(e, t) {
	const r = af(e, t),
		n = { type: t && t.name, value: YT(t) };
	return (
		r.length && (n.stacktrace = { frames: r }),
		n.type === void 0 &&
			n.value === "" &&
			(n.value = "Unrecoverable error caught"),
		n
	);
}
function jT(e, t, r, n) {
	const a = tt().getClient(),
		s = a && a.getOptions().normalizeDepth,
		o = {
			exception: {
				values: [
					{
						type: Vu(t)
							? t.constructor.name
							: n
							? "UnhandledRejection"
							: "Error",
						value: `Non-Error ${
							n ? "promise rejection" : "exception"
						} captured with keys: ${px(t)}`,
					},
				],
			},
			extra: { __serialized__: n2(t, s) },
		};
	if (r) {
		const l = af(e, r);
		l.length && (o.exception.values[0].stacktrace = { frames: l });
	}
	return o;
}
function cl(e, t) {
	return { exception: { values: [y2(e, t)] } };
}
function af(e, t) {
	const r = t.stacktrace || t.stack || "",
		n = GT(t);
	try {
		return e(r, n);
	} catch {}
	return [];
}
const qT = /Minified React error #\d+;/i;
function GT(e) {
	if (e) {
		if (typeof e.framesToPop == "number") return e.framesToPop;
		if (qT.test(e.message)) return 1;
	}
	return 0;
}
function YT(e) {
	const t = e && e.message;
	return t
		? t.error && typeof t.error.message == "string"
			? t.error.message
			: t
		: "No error message";
}
function WT(e, t, r, n) {
	const i = (r && r.syntheticException) || void 0,
		a = sf(e, t, i, n);
	return (
		es(a),
		(a.level = "error"),
		r && r.event_id && (a.event_id = r.event_id),
		Xn(a)
	);
}
function VT(e, t, r = "info", n, i) {
	const a = (n && n.syntheticException) || void 0,
		s = _c(e, t, a, i);
	return (s.level = r), n && n.event_id && (s.event_id = n.event_id), Xn(s);
}
function sf(e, t, r, n, i) {
	let a;
	if (Yg(t) && t.error) return cl(e, t.error);
	if (Fh(t) || ZE(t)) {
		const s = t;
		if ("stack" in t) a = cl(e, t);
		else {
			const o = s.name || (Fh(s) ? "DOMError" : "DOMException"),
				l = s.message ? `${o}: ${s.message}` : o;
			(a = _c(e, l, r, n)), pc(a, l);
		}
		return (
			"code" in s && (a.tags = { ...a.tags, "DOMException.code": `${s.code}` }),
			a
		);
	}
	return Gg(t)
		? cl(e, t)
		: Ui(t) || Vu(t)
		? ((a = jT(e, t, r, i)), es(a, { synthetic: !0 }), a)
		: ((a = _c(e, t, r, n)),
		  pc(a, `${t}`, void 0),
		  es(a, { synthetic: !0 }),
		  a);
}
function _c(e, t, r, n) {
	const i = { message: t };
	if (n && r) {
		const a = af(e, r);
		a.length &&
			(i.exception = { values: [{ value: t, stacktrace: { frames: a } }] });
	}
	return i;
}
const Ws = 1024,
	b2 = "Breadcrumbs";
class is {
	static __initStatic() {
		this.id = b2;
	}
	__init() {
		this.name = is.id;
	}
	constructor(t) {
		is.prototype.__init.call(this),
			(this.options = {
				console: !0,
				dom: !0,
				fetch: !0,
				history: !0,
				sentry: !0,
				xhr: !0,
				...t,
			});
	}
	setupOnce() {
		this.options.console && Pt("console", XT),
			this.options.dom && Pt("dom", KT(this.options.dom)),
			this.options.xhr && Pt("xhr", JT),
			this.options.fetch && Pt("fetch", ZT),
			this.options.history && Pt("history", QT);
	}
	addSentryBreadcrumb(t) {
		this.options.sentry &&
			tt().addBreadcrumb(
				{
					category: `sentry.${
						t.type === "transaction" ? "transaction" : "event"
					}`,
					event_id: t.event_id,
					level: t.level,
					message: jn(t),
				},
				{ event: t }
			);
	}
}
is.__initStatic();
function KT(e) {
	function t(r) {
		let n,
			i = typeof e == "object" ? e.serializeAttribute : void 0,
			a =
				typeof e == "object" && typeof e.maxStringLength == "number"
					? e.maxStringLength
					: void 0;
		a &&
			a > Ws &&
			((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
				ee.warn(
					`\`dom.maxStringLength\` cannot exceed ${Ws}, but a value of ${a} was configured. Sentry will use ${Ws} instead.`
				),
			(a = Ws)),
			typeof i == "string" && (i = [i]);
		try {
			n = r.event.target
				? Qa(r.event.target, { keyAttrs: i, maxStringLength: a })
				: Qa(r.event, { keyAttrs: i, maxStringLength: a });
		} catch {
			n = "<unknown>";
		}
		n.length !== 0 &&
			tt().addBreadcrumb(
				{ category: `ui.${r.name}`, message: n },
				{ event: r.event, name: r.name, global: r.global }
			);
	}
	return t;
}
function XT(e) {
	for (let r = 0; r < e.args.length; r++)
		if (e.args[r] === "ref=Ref<") {
			e.args[r + 1] = "viewRef";
			break;
		}
	const t = {
		category: "console",
		data: { arguments: e.args, logger: "console" },
		level: Hx(e.level),
		message: Uh(e.args, " "),
	};
	if (e.level === "assert")
		if (e.args[0] === !1)
			(t.message = `Assertion failed: ${
				Uh(e.args.slice(1), " ") || "console.assert"
			}`),
				(t.data.arguments = e.args.slice(1));
		else return;
	tt().addBreadcrumb(t, { input: e.args, level: e.level });
}
function JT(e) {
	if (e.endTimestamp) {
		if (e.xhr.__sentry_own_request__) return;
		const {
			method: t,
			url: r,
			status_code: n,
			body: i,
		} = e.xhr.__sentry_xhr__ || {};
		tt().addBreadcrumb(
			{
				category: "xhr",
				data: { method: t, url: r, status_code: n },
				type: "http",
			},
			{ xhr: e.xhr, input: i }
		);
		return;
	}
}
function ZT(e) {
	e.endTimestamp &&
		((e.fetchData.url.match(/sentry_key/) && e.fetchData.method === "POST") ||
			(e.error
				? tt().addBreadcrumb(
						{
							category: "fetch",
							data: e.fetchData,
							level: "error",
							type: "http",
						},
						{ data: e.error, input: e.args }
				  )
				: tt().addBreadcrumb(
						{
							category: "fetch",
							data: { ...e.fetchData, status_code: e.response.status },
							type: "http",
						},
						{ input: e.args, response: e.response }
				  )));
}
function QT(e) {
	let t = e.from,
		r = e.to;
	const n = ol(Pe.location.href);
	let i = ol(t);
	const a = ol(r);
	i.path || (i = n),
		n.protocol === a.protocol && n.host === a.host && (r = a.relative),
		n.protocol === i.protocol && n.host === i.host && (t = i.relative),
		tt().addBreadcrumb({ category: "navigation", data: { from: t, to: r } });
}
class ek extends pi {
	constructor(t) {
		(t._metadata = t._metadata || {}),
			(t._metadata.sdk = t._metadata.sdk || {
				name: "sentry.javascript.browser",
				packages: [{ name: "npm:@sentry/browser", version: r1 }],
				version: r1,
			}),
			super(t),
			t.sendClientReports &&
				Pe.document &&
				Pe.document.addEventListener("visibilitychange", () => {
					Pe.document.visibilityState === "hidden" && this._flushOutcomes();
				});
	}
	eventFromException(t, r) {
		return WT(this._options.stackParser, t, r, this._options.attachStacktrace);
	}
	eventFromMessage(t, r = "info", n) {
		return VT(
			this._options.stackParser,
			t,
			r,
			n,
			this._options.attachStacktrace
		);
	}
	sendEvent(t, r) {
		const n = this.getIntegrationById(b2);
		io([
			n,
			"optionalAccess",
			(i) => i.addSentryBreadcrumb,
			"optionalCall",
			(i) => i(t),
		]),
			super.sendEvent(t, r);
	}
	_prepareEvent(t, r, n) {
		return (
			(t.platform = t.platform || "javascript"), super._prepareEvent(t, r, n)
		);
	}
	_flushOutcomes() {
		const t = this._clearOutcomes();
		if (t.length === 0) {
			(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
				ee.log("No outcomes to send");
			return;
		}
		if (!this._dsn) {
			(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
				ee.log("No dsn provided, will not send outcomes");
			return;
		}
		(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
			ee.log("Sending outcomes:", t);
		const r = f2(this._dsn, this._options),
			n = Jx(t, this._options.tunnel && Ju(this._dsn));
		try {
			Object.prototype.toString.call(Pe && Pe.navigator) ===
				"[object Navigator]" &&
			typeof Pe.navigator.sendBeacon == "function" &&
			!this._options.transportOptions
				? Pe.navigator.sendBeacon.bind(Pe.navigator)(r, a2(n))
				: this._sendEnvelope(n);
		} catch (i) {
			(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && ee.error(i);
		}
	}
}
let va;
function tk() {
	if (va) return va;
	if (hc(Pe.fetch)) return (va = Pe.fetch.bind(Pe));
	const e = Pe.document;
	let t = Pe.fetch;
	if (e && typeof e.createElement == "function")
		try {
			const r = e.createElement("iframe");
			(r.hidden = !0), e.head.appendChild(r);
			const n = r.contentWindow;
			n && n.fetch && (t = n.fetch), e.head.removeChild(r);
		} catch (r) {
			(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
				ee.warn(
					"Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ",
					r
				);
		}
	return (va = t.bind(Pe));
}
function rk() {
	va = void 0;
}
function nk(e, t = tk()) {
	function r(n) {
		const i = {
			body: n.body,
			method: "POST",
			referrerPolicy: "origin",
			headers: e.headers,
			keepalive: n.body.length <= 65536,
			...e.fetchOptions,
		};
		try {
			return t(e.url, i).then((a) => ({
				statusCode: a.status,
				headers: {
					"x-sentry-rate-limits": a.headers.get("X-Sentry-Rate-Limits"),
					"retry-after": a.headers.get("Retry-After"),
				},
			}));
		} catch (a) {
			return rk(), Mo(a);
		}
	}
	return m2(e, r);
}
const ik = 4;
function ak(e) {
	function t(r) {
		return new St((n, i) => {
			const a = new XMLHttpRequest();
			(a.onerror = i),
				(a.onreadystatechange = () => {
					a.readyState === ik &&
						n({
							statusCode: a.status,
							headers: {
								"x-sentry-rate-limits": a.getResponseHeader(
									"X-Sentry-Rate-Limits"
								),
								"retry-after": a.getResponseHeader("Retry-After"),
							},
						});
				}),
				a.open("POST", e.url);
			for (const s in e.headers)
				Object.prototype.hasOwnProperty.call(e.headers, s) &&
					a.setRequestHeader(s, e.headers[s]);
			a.send(r.body);
		});
	}
	return m2(e, t);
}
const m0 = "?",
	sk = 30,
	ok = 40,
	lk = 50;
function of(e, t, r, n) {
	const i = { filename: e, function: t, in_app: !0 };
	return r !== void 0 && (i.lineno = r), n !== void 0 && (i.colno = n), i;
}
const ck =
		/^\s*at (?:(.*\).*?|.*?) ?\((?:address at )?)?((?:file|https?|blob|chrome-extension|address|native|eval|webpack|<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,
	uk = /\((\S*)(?::(\d+))(?::(\d+))\)/,
	fk = (e) => {
		const t = ck.exec(e);
		if (t) {
			if (t[2] && t[2].indexOf("eval") === 0) {
				const a = uk.exec(t[2]);
				a && ((t[2] = a[1]), (t[3] = a[2]), (t[4] = a[3]));
			}
			const [n, i] = v2(t[1] || m0, t[2]);
			return of(i, n, t[3] ? +t[3] : void 0, t[4] ? +t[4] : void 0);
		}
	},
	dk = [sk, fk],
	hk =
		/^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:file|https?|blob|chrome|webpack|resource|moz-extension|safari-extension|safari-web-extension|capacitor)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i,
	pk = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i,
	mk = (e) => {
		const t = hk.exec(e);
		if (t) {
			if (t[3] && t[3].indexOf(" > eval") > -1) {
				const a = pk.exec(t[3]);
				a &&
					((t[1] = t[1] || "eval"), (t[3] = a[1]), (t[4] = a[2]), (t[5] = ""));
			}
			let n = t[3],
				i = t[1] || m0;
			return (
				([i, n] = v2(i, n)),
				of(n, i, t[4] ? +t[4] : void 0, t[5] ? +t[5] : void 0)
			);
		}
	},
	gk = [lk, mk],
	yk =
		/^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i,
	bk = (e) => {
		const t = yk.exec(e);
		return t ? of(t[2], t[1] || m0, +t[3], t[4] ? +t[4] : void 0) : void 0;
	},
	vk = [ok, bk],
	_k = [dk, gk, vk],
	wk = Qg(..._k),
	v2 = (e, t) => {
		const r = e.indexOf("safari-extension") !== -1,
			n = e.indexOf("safari-web-extension") !== -1;
		return r || n
			? [
					e.indexOf("@") !== -1 ? e.split("@")[0] : m0,
					r ? `safari-extension:${t}` : `safari-web-extension:${t}`,
			  ]
			: [e, t];
	};
class yn {
	static __initStatic() {
		this.id = "GlobalHandlers";
	}
	__init() {
		this.name = yn.id;
	}
	__init2() {
		this._installFunc = { onerror: Sk, onunhandledrejection: Ek };
	}
	constructor(t) {
		yn.prototype.__init.call(this),
			yn.prototype.__init2.call(this),
			(this._options = { onerror: !0, onunhandledrejection: !0, ...t });
	}
	setupOnce() {
		Error.stackTraceLimit = 50;
		const t = this._options;
		for (const r in t) {
			const n = this._installFunc[r];
			n && t[r] && (kk(r), n(), (this._installFunc[r] = void 0));
		}
	}
}
yn.__initStatic();
function Sk() {
	Pt("error", (e) => {
		const [t, r, n] = S2();
		if (!t.getIntegration(yn)) return;
		const { msg: i, url: a, line: s, column: o, error: l } = e;
		if (g2() || (l && l.__sentry_own_request__)) return;
		const c =
			l === void 0 && xn(i)
				? Tk(i, a, s, o)
				: _2(sf(r, l || i, void 0, n, !1), a, s, o);
		(c.level = "error"), w2(t, l, c, "onerror");
	});
}
function Ek() {
	Pt("unhandledrejection", (e) => {
		const [t, r, n] = S2();
		if (!t.getIntegration(yn)) return;
		let i = e;
		try {
			"reason" in e
				? (i = e.reason)
				: "detail" in e && "reason" in e.detail && (i = e.detail.reason);
		} catch {}
		if (g2() || (i && i.__sentry_own_request__)) return !0;
		const a = Wg(i) ? xk(i) : sf(r, i, void 0, n, !0);
		(a.level = "error"), w2(t, i, a, "onunhandledrejection");
	});
}
function xk(e) {
	return {
		exception: {
			values: [
				{
					type: "UnhandledRejection",
					value: `Non-Error promise rejection captured with value: ${String(
						e
					)}`,
				},
			],
		},
	};
}
function Tk(e, t, r, n) {
	const i =
		/^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/i;
	let a = Yg(e) ? e.message : e,
		s = "Error";
	const o = a.match(i);
	return (
		o && ((s = o[1]), (a = o[2])),
		_2({ exception: { values: [{ type: s, value: a }] } }, t, r, n)
	);
}
function _2(e, t, r, n) {
	const i = (e.exception = e.exception || {}),
		a = (i.values = i.values || []),
		s = (a[0] = a[0] || {}),
		o = (s.stacktrace = s.stacktrace || {}),
		l = (o.frames = o.frames || []),
		c = isNaN(parseInt(n, 10)) ? void 0 : n,
		u = isNaN(parseInt(r, 10)) ? void 0 : r,
		d = xn(t) && t.length > 0 ? t : ix();
	return (
		l.length === 0 &&
			l.push({ colno: c, filename: d, function: "?", in_app: !0, lineno: u }),
		e
	);
}
function kk(e) {
	(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
		ee.log(`Global Handler attached: ${e}`);
}
function w2(e, t, r, n) {
	es(r, { handled: !1, type: n }), e.captureEvent(r, { originalException: t });
}
function S2() {
	const e = tt(),
		t = e.getClient(),
		r = (t && t.getOptions()) || {
			stackParser: () => [],
			attachStacktrace: !1,
		};
	return [e, r.stackParser, r.attachStacktrace];
}
const Ak = [
	"EventTarget",
	"Window",
	"Node",
	"ApplicationCache",
	"AudioTrackList",
	"ChannelMergerNode",
	"CryptoOperation",
	"EventSource",
	"FileReader",
	"HTMLUnknownElement",
	"IDBDatabase",
	"IDBRequest",
	"IDBTransaction",
	"KeyOperation",
	"MediaController",
	"MessagePort",
	"ModalWindow",
	"Notification",
	"SVGElementInstance",
	"Screen",
	"TextTrack",
	"TextTrackCue",
	"TextTrackList",
	"WebSocket",
	"WebSocketWorker",
	"Worker",
	"XMLHttpRequest",
	"XMLHttpRequestEventTarget",
	"XMLHttpRequestUpload",
];
class as {
	static __initStatic() {
		this.id = "TryCatch";
	}
	__init() {
		this.name = as.id;
	}
	constructor(t) {
		as.prototype.__init.call(this),
			(this._options = {
				XMLHttpRequest: !0,
				eventTarget: !0,
				requestAnimationFrame: !0,
				setInterval: !0,
				setTimeout: !0,
				...t,
			});
	}
	setupOnce() {
		this._options.setTimeout && vt(Pe, "setTimeout", i1),
			this._options.setInterval && vt(Pe, "setInterval", i1),
			this._options.requestAnimationFrame &&
				vt(Pe, "requestAnimationFrame", Rk),
			this._options.XMLHttpRequest &&
				"XMLHttpRequest" in Pe &&
				vt(XMLHttpRequest.prototype, "send", Mk);
		const t = this._options.eventTarget;
		t && (Array.isArray(t) ? t : Ak).forEach(Ok);
	}
}
as.__initStatic();
function i1(e) {
	return function (...t) {
		const r = t[0];
		return (
			(t[0] = qi(r, {
				mechanism: {
					data: { function: Tn(e) },
					handled: !0,
					type: "instrument",
				},
			})),
			e.apply(this, t)
		);
	};
}
function Rk(e) {
	return function (t) {
		return e.apply(this, [
			qi(t, {
				mechanism: {
					data: { function: "requestAnimationFrame", handler: Tn(e) },
					handled: !0,
					type: "instrument",
				},
			}),
		]);
	};
}
function Mk(e) {
	return function (...t) {
		const r = this;
		return (
			["onload", "onerror", "onprogress", "onreadystatechange"].forEach((i) => {
				i in r &&
					typeof r[i] == "function" &&
					vt(r, i, function (a) {
						const s = {
								mechanism: {
									data: { function: i, handler: Tn(a) },
									handled: !0,
									type: "instrument",
								},
							},
							o = Qu(a);
						return o && (s.mechanism.data.handler = Tn(o)), qi(a, s);
					});
			}),
			e.apply(this, t)
		);
	};
}
function Ok(e) {
	const t = Pe,
		r = t[e] && t[e].prototype;
	!r ||
		!r.hasOwnProperty ||
		!r.hasOwnProperty("addEventListener") ||
		(vt(r, "addEventListener", function (n) {
			return function (i, a, s) {
				try {
					typeof a.handleEvent == "function" &&
						(a.handleEvent = qi(a.handleEvent, {
							mechanism: {
								data: { function: "handleEvent", handler: Tn(a), target: e },
								handled: !0,
								type: "instrument",
							},
						}));
				} catch {}
				return n.apply(this, [
					i,
					qi(a, {
						mechanism: {
							data: { function: "addEventListener", handler: Tn(a), target: e },
							handled: !0,
							type: "instrument",
						},
					}),
					s,
				]);
			};
		}),
		vt(r, "removeEventListener", function (n) {
			return function (i, a, s) {
				const o = a;
				try {
					const l = o && o.__sentry_wrapped__;
					l && n.call(this, i, l, s);
				} catch {}
				return n.call(this, i, o, s);
			};
		}));
}
const Nk = "cause",
	Ck = 5;
class Ai {
	static __initStatic() {
		this.id = "LinkedErrors";
	}
	__init() {
		this.name = Ai.id;
	}
	constructor(t = {}) {
		Ai.prototype.__init.call(this),
			(this._key = t.key || Nk),
			(this._limit = t.limit || Ck);
	}
	setupOnce() {
		const t = tt().getClient();
		t &&
			tf((r, n) => {
				const i = tt().getIntegration(Ai);
				return i ? Ik(t.getOptions().stackParser, i._key, i._limit, r, n) : r;
			});
	}
}
Ai.__initStatic();
function Ik(e, t, r, n, i) {
	if (
		!n.exception ||
		!n.exception.values ||
		!i ||
		!mr(i.originalException, Error)
	)
		return n;
	const a = E2(e, r, i.originalException, t);
	return (n.exception.values = [...a, ...n.exception.values]), n;
}
function E2(e, t, r, n, i = []) {
	if (!mr(r[n], Error) || i.length + 1 >= t) return i;
	const a = y2(e, r[n]);
	return E2(e, t, r[n], n, [a, ...i]);
}
class Ri {
	constructor() {
		Ri.prototype.__init.call(this);
	}
	static __initStatic() {
		this.id = "HttpContext";
	}
	__init() {
		this.name = Ri.id;
	}
	setupOnce() {
		tf((t) => {
			if (tt().getIntegration(Ri)) {
				if (!Pe.navigator && !Pe.location && !Pe.document) return t;
				const r =
						(t.request && t.request.url) || (Pe.location && Pe.location.href),
					{ referrer: n } = Pe.document || {},
					{ userAgent: i } = Pe.navigator || {},
					a = {
						...(t.request && t.request.headers),
						...(n && { Referer: n }),
						...(i && { "User-Agent": i }),
					},
					s = { ...t.request, ...(r && { url: r }), headers: a };
				return { ...t, request: s };
			}
			return t;
		});
	}
}
Ri.__initStatic();
class Mi {
	constructor() {
		Mi.prototype.__init.call(this);
	}
	static __initStatic() {
		this.id = "Dedupe";
	}
	__init() {
		this.name = Mi.id;
	}
	setupOnce(t, r) {
		const n = (i) => {
			const a = r().getIntegration(Mi);
			if (a) {
				try {
					if (Dk(i, a._previousEvent))
						return (
							(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
								ee.warn(
									"Event dropped due to being a duplicate of previously captured event."
								),
							null
						);
				} catch {
					return (a._previousEvent = i);
				}
				return (a._previousEvent = i);
			}
			return i;
		};
		(n.id = this.name), t(n);
	}
}
Mi.__initStatic();
function Dk(e, t) {
	return t ? !!(Bk(e, t) || Pk(e, t)) : !1;
}
function Bk(e, t) {
	const r = e.message,
		n = t.message;
	return !(
		(!r && !n) ||
		(r && !n) ||
		(!r && n) ||
		r !== n ||
		!T2(e, t) ||
		!x2(e, t)
	);
}
function Pk(e, t) {
	const r = a1(t),
		n = a1(e);
	return !(
		!r ||
		!n ||
		r.type !== n.type ||
		r.value !== n.value ||
		!T2(e, t) ||
		!x2(e, t)
	);
}
function x2(e, t) {
	let r = s1(e),
		n = s1(t);
	if (!r && !n) return !0;
	if ((r && !n) || (!r && n) || ((r = r), (n = n), n.length !== r.length))
		return !1;
	for (let i = 0; i < n.length; i++) {
		const a = n[i],
			s = r[i];
		if (
			a.filename !== s.filename ||
			a.lineno !== s.lineno ||
			a.colno !== s.colno ||
			a.function !== s.function
		)
			return !1;
	}
	return !0;
}
function T2(e, t) {
	let r = e.fingerprint,
		n = t.fingerprint;
	if (!r && !n) return !0;
	if ((r && !n) || (!r && n)) return !1;
	(r = r), (n = n);
	try {
		return r.join("") === n.join("");
	} catch {
		return !1;
	}
}
function a1(e) {
	return e.exception && e.exception.values && e.exception.values[0];
}
function s1(e) {
	const t = e.exception;
	if (t)
		try {
			return t.values[0].stacktrace.frames;
		} catch {
			return;
		}
}
const Lk = [
	new ki(),
	new ns(),
	new as(),
	new is(),
	new yn(),
	new Ai(),
	new Mi(),
	new Ri(),
];
function zk(e = {}) {
	e.defaultIntegrations === void 0 && (e.defaultIntegrations = Lk),
		e.release === void 0 &&
			(typeof __SENTRY_RELEASE__ == "string" &&
				(e.release = __SENTRY_RELEASE__),
			Pe.SENTRY_RELEASE &&
				Pe.SENTRY_RELEASE.id &&
				(e.release = Pe.SENTRY_RELEASE.id)),
		e.autoSessionTracking === void 0 && (e.autoSessionTracking = !0),
		e.sendClientReports === void 0 && (e.sendClientReports = !0);
	const t = {
		...e,
		stackParser: gx(e.stackParser || wk),
		integrations: ET(e),
		transport: e.transport || (e2() ? nk : ak),
	};
	NT(ek, t), e.autoSessionTracking && $k();
}
function o1(e) {
	e.startSession({ ignoreDuration: !0 }), e.captureSession();
}
function $k() {
	if (typeof Pe.document > "u") {
		(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
			ee.warn(
				"Session tracking in non-browser environment with @sentry/browser is not supported."
			);
		return;
	}
	const e = tt();
	e.captureSession &&
		(o1(e),
		Pt("history", ({ from: t, to: r }) => {
			t === void 0 || t === r || o1(tt());
		}));
}
function lf(e) {
	const t = tt().getClient(),
		r = e || (t && t.getOptions());
	return !!r && ("tracesSampleRate" in r || "tracesSampler" in r);
}
function ys(e) {
	const r = (e || tt()).getScope();
	return r && r.getTransaction();
}
function ht(e) {
	return e / 1e3;
}
function Fk() {
	Pt("error", l1), Pt("unhandledrejection", l1);
}
function l1() {
	const e = ys();
	if (e) {
		const t = "internal_error";
		(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
			ee.log(`[Tracing] Transaction: ${t} -> Global error occured`),
			e.setStatus(t);
	}
}
class g0 {
	__init() {
		this.spans = [];
	}
	constructor(t = 1e3) {
		g0.prototype.__init.call(this), (this._maxlen = t);
	}
	add(t) {
		this.spans.length > this._maxlen
			? (t.spanRecorder = void 0)
			: this.spans.push(t);
	}
}
class xr {
	__init2() {
		this.traceId = mn();
	}
	__init3() {
		this.spanId = mn().substring(16);
	}
	__init4() {
		this.startTimestamp = ts();
	}
	__init5() {
		this.tags = {};
	}
	__init6() {
		this.data = {};
	}
	__init7() {
		this.instrumenter = "sentry";
	}
	constructor(t) {
		if (
			(xr.prototype.__init2.call(this),
			xr.prototype.__init3.call(this),
			xr.prototype.__init4.call(this),
			xr.prototype.__init5.call(this),
			xr.prototype.__init6.call(this),
			xr.prototype.__init7.call(this),
			!t)
		)
			return this;
		t.traceId && (this.traceId = t.traceId),
			t.spanId && (this.spanId = t.spanId),
			t.parentSpanId && (this.parentSpanId = t.parentSpanId),
			"sampled" in t && (this.sampled = t.sampled),
			t.op && (this.op = t.op),
			t.description && (this.description = t.description),
			t.data && (this.data = t.data),
			t.tags && (this.tags = t.tags),
			t.status && (this.status = t.status),
			t.startTimestamp && (this.startTimestamp = t.startTimestamp),
			t.endTimestamp && (this.endTimestamp = t.endTimestamp),
			t.instrumenter && (this.instrumenter = t.instrumenter);
	}
	startChild(t) {
		const r = new xr({
			...t,
			parentSpanId: this.spanId,
			sampled: this.sampled,
			traceId: this.traceId,
		});
		if (
			((r.spanRecorder = this.spanRecorder),
			r.spanRecorder && r.spanRecorder.add(r),
			(r.transaction = this.transaction),
			(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && r.transaction)
		) {
			const n = (t && t.op) || "< unknown op >",
				i = r.transaction.name || "< unknown name >",
				a = r.transaction.spanId,
				s = `[Tracing] Starting '${n}' span on transaction '${i}' (${a}).`;
			(r.transaction.metadata.spanMetadata[r.spanId] = { logMessage: s }),
				ee.log(s);
		}
		return r;
	}
	setTag(t, r) {
		return (this.tags = { ...this.tags, [t]: r }), this;
	}
	setData(t, r) {
		return (this.data = { ...this.data, [t]: r }), this;
	}
	setStatus(t) {
		return (this.status = t), this;
	}
	setHttpStatus(t) {
		this.setTag("http.status_code", String(t));
		const r = Hk(t);
		return r !== "unknown_error" && this.setStatus(r), this;
	}
	isSuccess() {
		return this.status === "ok";
	}
	finish(t) {
		if (
			(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
			this.transaction &&
			this.transaction.spanId !== this.spanId
		) {
			const { logMessage: r } =
				this.transaction.metadata.spanMetadata[this.spanId];
			r && ee.log(r.replace("Starting", "Finishing"));
		}
		this.endTimestamp = typeof t == "number" ? t : ts();
	}
	toTraceparent() {
		let t = "";
		return (
			this.sampled !== void 0 && (t = this.sampled ? "-1" : "-0"),
			`${this.traceId}-${this.spanId}${t}`
		);
	}
	toContext() {
		return pn({
			data: this.data,
			description: this.description,
			endTimestamp: this.endTimestamp,
			op: this.op,
			parentSpanId: this.parentSpanId,
			sampled: this.sampled,
			spanId: this.spanId,
			startTimestamp: this.startTimestamp,
			status: this.status,
			tags: this.tags,
			traceId: this.traceId,
		});
	}
	updateWithContext(t) {
		return (
			(this.data = nn(t.data, () => ({}))),
			(this.description = t.description),
			(this.endTimestamp = t.endTimestamp),
			(this.op = t.op),
			(this.parentSpanId = t.parentSpanId),
			(this.sampled = t.sampled),
			(this.spanId = nn(t.spanId, () => this.spanId)),
			(this.startTimestamp = nn(t.startTimestamp, () => this.startTimestamp)),
			(this.status = t.status),
			(this.tags = nn(t.tags, () => ({}))),
			(this.traceId = nn(t.traceId, () => this.traceId)),
			this
		);
	}
	getTraceContext() {
		return pn({
			data: Object.keys(this.data).length > 0 ? this.data : void 0,
			description: this.description,
			op: this.op,
			parent_span_id: this.parentSpanId,
			span_id: this.spanId,
			status: this.status,
			tags: Object.keys(this.tags).length > 0 ? this.tags : void 0,
			trace_id: this.traceId,
		});
	}
	toJSON() {
		return pn({
			data: Object.keys(this.data).length > 0 ? this.data : void 0,
			description: this.description,
			op: this.op,
			parent_span_id: this.parentSpanId,
			span_id: this.spanId,
			start_timestamp: this.startTimestamp,
			status: this.status,
			tags: Object.keys(this.tags).length > 0 ? this.tags : void 0,
			timestamp: this.endTimestamp,
			trace_id: this.traceId,
		});
	}
}
function Hk(e) {
	if (e < 400 && e >= 100) return "ok";
	if (e >= 400 && e < 500)
		switch (e) {
			case 401:
				return "unauthenticated";
			case 403:
				return "permission_denied";
			case 404:
				return "not_found";
			case 409:
				return "already_exists";
			case 413:
				return "failed_precondition";
			case 429:
				return "resource_exhausted";
			default:
				return "invalid_argument";
		}
	if (e >= 500 && e < 600)
		switch (e) {
			case 501:
				return "unimplemented";
			case 503:
				return "unavailable";
			case 504:
				return "deadline_exceeded";
			default:
				return "internal_error";
		}
	return "unknown_error";
}
class Oi extends xr {
	__init() {
		this._measurements = {};
	}
	__init2() {
		this._contexts = {};
	}
	__init3() {
		this._frozenDynamicSamplingContext = void 0;
	}
	constructor(t, r) {
		super(t),
			Oi.prototype.__init.call(this),
			Oi.prototype.__init2.call(this),
			Oi.prototype.__init3.call(this),
			(this._hub = r || tt()),
			(this._name = t.name || ""),
			(this.metadata = {
				source: "custom",
				...t.metadata,
				spanMetadata: {},
				changes: [],
				propagations: 0,
			}),
			(this._trimEnd = t.trimEnd),
			(this.transaction = this);
		const n = this.metadata.dynamicSamplingContext;
		n && (this._frozenDynamicSamplingContext = { ...n });
	}
	get name() {
		return this._name;
	}
	set name(t) {
		this.setName(t);
	}
	setName(t, r = "custom") {
		(t !== this.name || r !== this.metadata.source) &&
			this.metadata.changes.push({
				source: this.metadata.source,
				timestamp: h0(),
				propagations: this.metadata.propagations,
			}),
			(this._name = t),
			(this.metadata.source = r);
	}
	initSpanRecorder(t = 1e3) {
		this.spanRecorder || (this.spanRecorder = new g0(t)),
			this.spanRecorder.add(this);
	}
	setContext(t, r) {
		r === null ? delete this._contexts[t] : (this._contexts[t] = r);
	}
	setMeasurement(t, r, n = "") {
		this._measurements[t] = { value: r, unit: n };
	}
	setMetadata(t) {
		this.metadata = { ...this.metadata, ...t };
	}
	finish(t) {
		if (this.endTimestamp !== void 0) return;
		if (
			(this.name ||
				((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
					ee.warn(
						"Transaction has no name, falling back to `<unlabeled transaction>`."
					),
				(this.name = "<unlabeled transaction>")),
			super.finish(t),
			this.sampled !== !0)
		) {
			(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
				ee.log(
					"[Tracing] Discarding transaction because its trace was not chosen to be sampled."
				);
			const s = this._hub.getClient();
			s && s.recordDroppedEvent("sample_rate", "transaction");
			return;
		}
		const r = this.spanRecorder
			? this.spanRecorder.spans.filter((s) => s !== this && s.endTimestamp)
			: [];
		this._trimEnd &&
			r.length > 0 &&
			(this.endTimestamp = r.reduce((s, o) =>
				s.endTimestamp && o.endTimestamp
					? s.endTimestamp > o.endTimestamp
						? s
						: o
					: s
			).endTimestamp);
		const n = this.metadata,
			i = {
				contexts: { ...this._contexts, trace: this.getTraceContext() },
				spans: r,
				start_timestamp: this.startTimestamp,
				tags: this.tags,
				timestamp: this.endTimestamp,
				transaction: this.name,
				type: "transaction",
				sdkProcessingMetadata: {
					...n,
					dynamicSamplingContext: this.getDynamicSamplingContext(),
				},
				...(n.source && {
					transaction_info: {
						source: n.source,
						changes: n.changes,
						propagations: n.propagations,
					},
				}),
			};
		return (
			Object.keys(this._measurements).length > 0 &&
				((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
					ee.log(
						"[Measurements] Adding measurements to transaction",
						JSON.stringify(this._measurements, void 0, 2)
					),
				(i.measurements = this._measurements)),
			(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
				ee.log(`[Tracing] Finishing ${this.op} transaction: ${this.name}.`),
			this._hub.captureEvent(i)
		);
	}
	toContext() {
		const t = super.toContext();
		return pn({ ...t, name: this.name, trimEnd: this._trimEnd });
	}
	updateWithContext(t) {
		return (
			super.updateWithContext(t),
			(this.name = nn(t.name, () => "")),
			(this._trimEnd = t.trimEnd),
			this
		);
	}
	getDynamicSamplingContext() {
		if (this._frozenDynamicSamplingContext)
			return this._frozenDynamicSamplingContext;
		const t = this._hub || tt(),
			r = t && t.getClient();
		if (!r) return {};
		const { environment: n, release: i } = r.getOptions() || {},
			{ publicKey: a } = r.getDsn() || {},
			s = this.metadata.sampleRate,
			o = s !== void 0 ? s.toString() : void 0,
			l = t.getScope(),
			{ segment: c } = (l && l.getUser()) || {},
			u = this.metadata.source,
			d = u && u !== "url" ? this.name : void 0;
		return pn({
			environment: n,
			release: i,
			transaction: d,
			user_segment: c,
			public_key: a,
			trace_id: this.traceId,
			sample_rate: o,
		});
	}
}
const k2 = 1e3,
	A2 = 3e4,
	R2 = 5e3;
class Uk extends g0 {
	constructor(t, r, n, i) {
		super(i),
			(this._pushActivity = t),
			(this._popActivity = r),
			(this.transactionSpanId = n);
	}
	add(t) {
		t.spanId !== this.transactionSpanId &&
			((t.finish = (r) => {
				(t.endTimestamp = typeof r == "number" ? r : ts()),
					this._popActivity(t.spanId);
			}),
			t.endTimestamp === void 0 && this._pushActivity(t.spanId)),
			super.add(t);
	}
}
class mi extends Oi {
	__init() {
		this.activities = {};
	}
	__init2() {
		this._heartbeatCounter = 0;
	}
	__init3() {
		this._finished = !1;
	}
	__init4() {
		this._beforeFinishCallbacks = [];
	}
	constructor(t, r, n = k2, i = A2, a = R2, s = !1) {
		super(t, r),
			(this._idleHub = r),
			(this._idleTimeout = n),
			(this._finalTimeout = i),
			(this._heartbeatInterval = a),
			(this._onScope = s),
			mi.prototype.__init.call(this),
			mi.prototype.__init2.call(this),
			mi.prototype.__init3.call(this),
			mi.prototype.__init4.call(this),
			s &&
				(c1(r),
				(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
					ee.log(`Setting idle transaction on scope. Span ID: ${this.spanId}`),
				r.configureScope((o) => o.setSpan(this))),
			this._startIdleTimeout(),
			setTimeout(() => {
				this._finished || (this.setStatus("deadline_exceeded"), this.finish());
			}, this._finalTimeout);
	}
	finish(t = ts()) {
		if (((this._finished = !0), (this.activities = {}), this.spanRecorder)) {
			(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
				ee.log(
					"[Tracing] finishing IdleTransaction",
					new Date(t * 1e3).toISOString(),
					this.op
				);
			for (const r of this._beforeFinishCallbacks) r(this, t);
			(this.spanRecorder.spans = this.spanRecorder.spans.filter((r) => {
				if (r.spanId === this.spanId) return !0;
				r.endTimestamp ||
					((r.endTimestamp = t),
					r.setStatus("cancelled"),
					(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
						ee.log(
							"[Tracing] cancelling span since transaction ended early",
							JSON.stringify(r, void 0, 2)
						));
				const n = r.startTimestamp < t;
				return (
					n ||
						((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
							ee.log(
								"[Tracing] discarding Span since it happened after Transaction was finished",
								JSON.stringify(r, void 0, 2)
							)),
					n
				);
			})),
				(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
					ee.log("[Tracing] flushing IdleTransaction");
		} else
			(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
				ee.log("[Tracing] No active IdleTransaction");
		return this._onScope && c1(this._idleHub), super.finish(t);
	}
	registerBeforeFinishCallback(t) {
		this._beforeFinishCallbacks.push(t);
	}
	initSpanRecorder(t) {
		if (!this.spanRecorder) {
			const r = (i) => {
					this._finished || this._pushActivity(i);
				},
				n = (i) => {
					this._finished || this._popActivity(i);
				};
			(this.spanRecorder = new Uk(r, n, this.spanId, t)),
				(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
					ee.log("Starting heartbeat"),
				this._pingHeartbeat();
		}
		this.spanRecorder.add(this);
	}
	_cancelIdleTimeout() {
		this._idleTimeoutID &&
			(clearTimeout(this._idleTimeoutID), (this._idleTimeoutID = void 0));
	}
	_startIdleTimeout(t) {
		this._cancelIdleTimeout(),
			(this._idleTimeoutID = setTimeout(() => {
				!this._finished &&
					Object.keys(this.activities).length === 0 &&
					this.finish(t);
			}, this._idleTimeout));
	}
	_pushActivity(t) {
		this._cancelIdleTimeout(),
			(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
				ee.log(`[Tracing] pushActivity: ${t}`),
			(this.activities[t] = !0),
			(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
				ee.log(
					"[Tracing] new activities count",
					Object.keys(this.activities).length
				);
	}
	_popActivity(t) {
		if (
			(this.activities[t] &&
				((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
					ee.log(`[Tracing] popActivity ${t}`),
				delete this.activities[t],
				(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
					ee.log(
						"[Tracing] new activities count",
						Object.keys(this.activities).length
					)),
			Object.keys(this.activities).length === 0)
		) {
			const r = ts() + this._idleTimeout / 1e3;
			this._startIdleTimeout(r);
		}
	}
	_beat() {
		if (this._finished) return;
		const t = Object.keys(this.activities).join("");
		t === this._prevHeartbeatString
			? this._heartbeatCounter++
			: (this._heartbeatCounter = 1),
			(this._prevHeartbeatString = t),
			this._heartbeatCounter >= 3
				? ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
						ee.log(
							"[Tracing] Transaction finished because of no change for 3 heart beats"
						),
				  this.setStatus("deadline_exceeded"),
				  this.finish())
				: this._pingHeartbeat();
	}
	_pingHeartbeat() {
		(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
			ee.log(`pinging Heartbeat -> current counter: ${this._heartbeatCounter}`),
			setTimeout(() => {
				this._beat();
			}, this._heartbeatInterval);
	}
}
function c1(e) {
	const t = e.getScope();
	t && t.getTransaction() && t.setSpan(void 0);
}
function jk() {
	const e = this.getScope();
	if (e) {
		const t = e.getSpan();
		if (t) return { "sentry-trace": t.toTraceparent() };
	}
	return {};
}
function M2(e, t, r) {
	if (!lf(t)) return (e.sampled = !1), e;
	if (e.sampled !== void 0)
		return e.setMetadata({ sampleRate: Number(e.sampled) }), e;
	let n;
	return (
		typeof t.tracesSampler == "function"
			? ((n = t.tracesSampler(r)), e.setMetadata({ sampleRate: Number(n) }))
			: r.parentSampled !== void 0
			? (n = r.parentSampled)
			: ((n = t.tracesSampleRate), e.setMetadata({ sampleRate: Number(n) })),
		qk(n)
			? n
				? ((e.sampled = Math.random() < n),
				  e.sampled
						? ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
								ee.log(`[Tracing] starting ${e.op} transaction - ${e.name}`),
						  e)
						: ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
								ee.log(
									`[Tracing] Discarding transaction because it's not included in the random sample (sampling rate = ${Number(
										n
									)})`
								),
						  e))
				: ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
						ee.log(
							`[Tracing] Discarding transaction because ${
								typeof t.tracesSampler == "function"
									? "tracesSampler returned 0 or false"
									: "a negative sampling decision was inherited or tracesSampleRate is set to 0"
							}`
						),
				  (e.sampled = !1),
				  e)
			: ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
					ee.warn(
						"[Tracing] Discarding transaction because of invalid sample rate."
					),
			  (e.sampled = !1),
			  e)
	);
}
function qk(e) {
	return Vg(e) || !(typeof e == "number" || typeof e == "boolean")
		? ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
				ee.warn(
					`[Tracing] Given sample rate is invalid. Sample rate must be a boolean or a number between 0 and 1. Got ${JSON.stringify(
						e
					)} of type ${JSON.stringify(typeof e)}.`
				),
		  !1)
		: e < 0 || e > 1
		? ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
				ee.warn(
					`[Tracing] Given sample rate is invalid. Sample rate must be between 0 and 1. Got ${e}.`
				),
		  !1)
		: !0;
}
function Gk(e, t) {
	const r = this.getClient(),
		n = (r && r.getOptions()) || {},
		i = n.instrumenter || "sentry",
		a = e.instrumenter || "sentry";
	i !== a &&
		((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
			ee.error(`A transaction was started with instrumenter=\`${a}\`, but the SDK is configured with the \`${i}\` instrumenter.
The transaction will not be sampled. Please use the ${i} instrumentation to start transactions.`),
		(e.sampled = !1));
	let s = new Oi(e, this);
	return (
		(s = M2(s, n, {
			parentSampled: e.parentSampled,
			transactionContext: e,
			...t,
		})),
		s.sampled && s.initSpanRecorder(n._experiments && n._experiments.maxSpans),
		s
	);
}
function u1(e, t, r, n, i, a, s) {
	const o = e.getClient(),
		l = (o && o.getOptions()) || {};
	let c = new mi(t, e, r, n, s, i);
	return (
		(c = M2(c, l, {
			parentSampled: t.parentSampled,
			transactionContext: t,
			...a,
		})),
		c.sampled && c.initSpanRecorder(l._experiments && l._experiments.maxSpans),
		c
	);
}
function Yk() {
	const e = ia();
	e.__SENTRY__ &&
		((e.__SENTRY__.extensions = e.__SENTRY__.extensions || {}),
		e.__SENTRY__.extensions.startTransaction ||
			(e.__SENTRY__.extensions.startTransaction = Gk),
		e.__SENTRY__.extensions.traceHeaders ||
			(e.__SENTRY__.extensions.traceHeaders = jk));
}
function Wk() {
	const e = ia();
	if (!e.__SENTRY__) return;
	const t = {
			mongodb() {
				const n = cn(module, "./integrations/node/mongo");
				return new n.Mongo();
			},
			mongoose() {
				const n = cn(module, "./integrations/node/mongo");
				return new n.Mongo({ mongoose: !0 });
			},
			mysql() {
				const n = cn(module, "./integrations/node/mysql");
				return new n.Mysql();
			},
			pg() {
				const n = cn(module, "./integrations/node/postgres");
				return new n.Postgres();
			},
		},
		r = Object.keys(t)
			.filter((n) => !!Bx(n))
			.map((n) => {
				try {
					return t[n]();
				} catch {
					return;
				}
			})
			.filter((n) => n);
	r.length > 0 &&
		(e.__SENTRY__.integrations = [...(e.__SENTRY__.integrations || []), ...r]);
}
function Vk() {
	Yk(), ef() && Wk(), Fk();
}
const $e = Yt;
function Kk() {
	$e && $e.document
		? $e.document.addEventListener("visibilitychange", () => {
				const e = ys();
				if ($e.document.hidden && e) {
					const t = "cancelled";
					(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
						ee.log(
							`[Tracing] Transaction: ${t} -> since tab moved to the background, op: ${e.op}`
						),
						e.status || e.setStatus(t),
						e.setTag("visibilitychange", "document.hidden"),
						e.finish();
				}
		  })
		: (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
		  ee.warn(
				"[Tracing] Could not set up background tab detection due to lack of global document"
		  );
}
const cf = (e, t, r) => {
		let n, i;
		return (a) => {
			t.value >= 0 &&
				(a || r) &&
				((i = t.value - (n || 0)),
				(i || n === void 0) && ((n = t.value), (t.delta = i), e(t)));
		};
	},
	Xk = () =>
		`v3-${Date.now()}-${Math.floor(Math.random() * (9e12 - 1)) + 1e12}`,
	Jk = () => {
		const e = $e.performance.timing,
			t = $e.performance.navigation.type,
			r = {
				entryType: "navigation",
				startTime: 0,
				type: t == 2 ? "back_forward" : t === 1 ? "reload" : "navigate",
			};
		for (const n in e)
			n !== "navigationStart" &&
				n !== "toJSON" &&
				(r[n] = Math.max(e[n] - e.navigationStart, 0));
		return r;
	},
	O2 = () =>
		$e.__WEB_VITALS_POLYFILL__
			? $e.performance &&
			  ((performance.getEntriesByType &&
					performance.getEntriesByType("navigation")[0]) ||
					Jk())
			: $e.performance &&
			  performance.getEntriesByType &&
			  performance.getEntriesByType("navigation")[0],
	N2 = () => {
		const e = O2();
		return (e && e.activationStart) || 0;
	},
	uf = (e, t) => {
		const r = O2();
		let n = "navigate";
		return (
			r &&
				($e.document.prerendering || N2() > 0
					? (n = "prerender")
					: (n = r.type.replace(/_/g, "-"))),
			{
				name: e,
				value: typeof t > "u" ? -1 : t,
				rating: "good",
				delta: 0,
				entries: [],
				id: Xk(),
				navigationType: n,
			}
		);
	},
	y0 = (e, t, r) => {
		try {
			if (PerformanceObserver.supportedEntryTypes.includes(e)) {
				const n = new PerformanceObserver((i) => {
					t(i.getEntries());
				});
				return n.observe(Object.assign({ type: e, buffered: !0 }, r || {})), n;
			}
		} catch {}
	},
	b0 = (e, t) => {
		const r = (n) => {
			(n.type === "pagehide" || $e.document.visibilityState === "hidden") &&
				(e(n),
				t &&
					(removeEventListener("visibilitychange", r, !0),
					removeEventListener("pagehide", r, !0)));
		};
		addEventListener("visibilitychange", r, !0),
			addEventListener("pagehide", r, !0);
	},
	Zk = (e) => {
		const t = uf("CLS", 0);
		let r,
			n = 0,
			i = [];
		const a = (o) => {
				o.forEach((l) => {
					if (!l.hadRecentInput) {
						const c = i[0],
							u = i[i.length - 1];
						n &&
						i.length !== 0 &&
						l.startTime - u.startTime < 1e3 &&
						l.startTime - c.startTime < 5e3
							? ((n += l.value), i.push(l))
							: ((n = l.value), (i = [l])),
							n > t.value && ((t.value = n), (t.entries = i), r && r());
					}
				});
			},
			s = y0("layout-shift", a);
		s &&
			((r = cf(e, t)),
			b0(() => {
				a(s.takeRecords()), r(!0);
			}));
	};
let ao = -1;
const Qk = () =>
		$e.document.visibilityState === "hidden" && !$e.document.prerendering
			? 0
			: 1 / 0,
	eA = () => {
		b0(({ timeStamp: e }) => {
			ao = e;
		}, !0);
	},
	ff = () => (
		ao < 0 && ((ao = Qk()), eA()),
		{
			get firstHiddenTime() {
				return ao;
			},
		}
	),
	tA = (e) => {
		const t = ff(),
			r = uf("FID");
		let n;
		const i = (o) => {
				o.startTime < t.firstHiddenTime &&
					((r.value = o.processingStart - o.startTime),
					r.entries.push(o),
					n(!0));
			},
			a = (o) => {
				o.forEach(i);
			},
			s = y0("first-input", a);
		(n = cf(e, r)),
			s &&
				b0(() => {
					a(s.takeRecords()), s.disconnect();
				}, !0);
	},
	f1 = {},
	rA = (e) => {
		const t = ff(),
			r = uf("LCP");
		let n;
		const i = (s) => {
				const o = s[s.length - 1];
				if (o) {
					const l = Math.max(o.startTime - N2(), 0);
					l < t.firstHiddenTime && ((r.value = l), (r.entries = [o]), n());
				}
			},
			a = y0("largest-contentful-paint", i);
		if (a) {
			n = cf(e, r);
			const s = () => {
				f1[r.id] ||
					(i(a.takeRecords()), a.disconnect(), (f1[r.id] = !0), n(!0));
			};
			["keydown", "click"].forEach((o) => {
				addEventListener(o, s, { once: !0, capture: !0 });
			}),
				b0(s, !0);
		}
	};
function ul(e) {
	return typeof e == "number" && isFinite(e);
}
function Gi(e, { startTimestamp: t, ...r }) {
	return (
		t && e.startTimestamp > t && (e.startTimestamp = t),
		e.startChild({ startTimestamp: t, ...r })
	);
}
function C2() {
	return $e && $e.addEventListener && $e.performance;
}
let d1 = 0,
	Qe = {},
	or,
	Ia;
function nA() {
	const e = C2();
	e &&
		rs &&
		(e.mark && $e.performance.mark("sentry-tracing-init"), aA(), sA(), oA());
}
function iA() {
	y0("longtask", (t) => {
		for (const r of t) {
			const n = ys();
			if (!n) return;
			const i = ht(rs + r.startTime),
				a = ht(r.duration);
			n.startChild({
				description: "Main UI thread blocked",
				op: "ui.long-task",
				startTimestamp: i,
				endTimestamp: i + a,
			});
		}
	});
}
function aA() {
	Zk((e) => {
		const t = e.entries.pop();
		t &&
			((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
				ee.log("[Measurements] Adding CLS"),
			(Qe.cls = { value: e.value, unit: "" }),
			(Ia = t));
	});
}
function sA() {
	rA((e) => {
		const t = e.entries.pop();
		t &&
			((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
				ee.log("[Measurements] Adding LCP"),
			(Qe.lcp = { value: e.value, unit: "millisecond" }),
			(or = t));
	});
}
function oA() {
	tA((e) => {
		const t = e.entries.pop();
		if (!t) return;
		const r = ht(rs),
			n = ht(t.startTime);
		(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
			ee.log("[Measurements] Adding FID"),
			(Qe.fid = { value: e.value, unit: "millisecond" }),
			(Qe["mark.fid"] = { value: r + n, unit: "second" });
	});
}
function lA(e) {
	const t = C2();
	if (!t || !$e.performance.getEntries || !rs) return;
	(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
		ee.log("[Tracing] Adding & adjusting spans using Performance API");
	const r = ht(rs),
		n = t.getEntries();
	let i, a;
	if (
		(n.slice(d1).forEach((s) => {
			const o = ht(s.startTime),
				l = ht(s.duration);
			if (!(e.op === "navigation" && r + o < e.startTimestamp))
				switch (s.entryType) {
					case "navigation": {
						uA(e, s, r),
							(i = r + ht(s.responseStart)),
							(a = r + ht(s.requestStart));
						break;
					}
					case "mark":
					case "paint":
					case "measure": {
						cA(e, s, o, l, r);
						const c = ff(),
							u = s.startTime < c.firstHiddenTime;
						s.name === "first-paint" &&
							u &&
							((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
								ee.log("[Measurements] Adding FP"),
							(Qe.fp = { value: s.startTime, unit: "millisecond" })),
							s.name === "first-contentful-paint" &&
								u &&
								((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
									ee.log("[Measurements] Adding FCP"),
								(Qe.fcp = { value: s.startTime, unit: "millisecond" }));
						break;
					}
					case "resource": {
						const c = s.name.replace($e.location.origin, "");
						dA(e, s, c, o, l, r);
						break;
					}
				}
		}),
		(d1 = Math.max(n.length - 1, 0)),
		hA(e),
		e.op === "pageload")
	) {
		typeof i == "number" &&
			((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
				ee.log("[Measurements] Adding TTFB"),
			(Qe.ttfb = { value: (i - e.startTimestamp) * 1e3, unit: "millisecond" }),
			typeof a == "number" &&
				a <= i &&
				(Qe["ttfb.requestTime"] = {
					value: (i - a) * 1e3,
					unit: "millisecond",
				})),
			["fcp", "fp", "lcp"].forEach((o) => {
				if (!Qe[o] || r >= e.startTimestamp) return;
				const l = Qe[o].value,
					c = r + ht(l),
					u = Math.abs((c - e.startTimestamp) * 1e3),
					d = u - l;
				(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
					ee.log(`[Measurements] Normalized ${o} from ${l} to ${u} (${d})`),
					(Qe[o].value = u);
			});
		const s = Qe["mark.fid"];
		s &&
			Qe.fid &&
			(Gi(e, {
				description: "first input delay",
				endTimestamp: s.value + ht(Qe.fid.value),
				op: "ui.action",
				startTimestamp: s.value,
			}),
			delete Qe["mark.fid"]),
			"fcp" in Qe || delete Qe.cls,
			Object.keys(Qe).forEach((o) => {
				e.setMeasurement(o, Qe[o].value, Qe[o].unit);
			}),
			pA(e);
	}
	(or = void 0), (Ia = void 0), (Qe = {});
}
function cA(e, t, r, n, i) {
	const a = i + r,
		s = a + n;
	return (
		Gi(e, {
			description: t.name,
			endTimestamp: s,
			op: t.entryType,
			startTimestamp: a,
		}),
		a
	);
}
function uA(e, t, r) {
	[
		"unloadEvent",
		"redirect",
		"domContentLoadedEvent",
		"loadEvent",
		"connect",
	].forEach((n) => {
		Vs(e, t, n, r);
	}),
		Vs(e, t, "secureConnection", r, "TLS/SSL", "connectEnd"),
		Vs(e, t, "fetch", r, "cache", "domainLookupStart"),
		Vs(e, t, "domainLookup", r, "DNS"),
		fA(e, t, r);
}
function Vs(e, t, r, n, i, a) {
	const s = a ? t[a] : t[`${r}End`],
		o = t[`${r}Start`];
	!o ||
		!s ||
		Gi(e, {
			op: "browser",
			description: nn(i, () => r),
			startTimestamp: n + ht(o),
			endTimestamp: n + ht(s),
		});
}
function fA(e, t, r) {
	Gi(e, {
		op: "browser",
		description: "request",
		startTimestamp: r + ht(t.requestStart),
		endTimestamp: r + ht(t.responseEnd),
	}),
		Gi(e, {
			op: "browser",
			description: "response",
			startTimestamp: r + ht(t.responseStart),
			endTimestamp: r + ht(t.responseEnd),
		});
}
function dA(e, t, r, n, i, a) {
	if (t.initiatorType === "xmlhttprequest" || t.initiatorType === "fetch")
		return;
	const s = {};
	"transferSize" in t && (s["Transfer Size"] = t.transferSize),
		"encodedBodySize" in t && (s["Encoded Body Size"] = t.encodedBodySize),
		"decodedBodySize" in t && (s["Decoded Body Size"] = t.decodedBodySize);
	const o = a + n,
		l = o + i;
	Gi(e, {
		description: r,
		endTimestamp: l,
		op: t.initiatorType ? `resource.${t.initiatorType}` : "resource.other",
		startTimestamp: o,
		data: s,
	});
}
function hA(e) {
	const t = $e.navigator;
	if (!t) return;
	const r = t.connection;
	r &&
		(r.effectiveType && e.setTag("effectiveConnectionType", r.effectiveType),
		r.type && e.setTag("connectionType", r.type),
		ul(r.rtt) &&
			(Qe["connection.rtt"] = { value: r.rtt, unit: "millisecond" })),
		ul(t.deviceMemory) && e.setTag("deviceMemory", `${t.deviceMemory} GB`),
		ul(t.hardwareConcurrency) &&
			e.setTag("hardwareConcurrency", String(t.hardwareConcurrency));
}
function pA(e) {
	or &&
		((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
			ee.log("[Measurements] Adding LCP Data"),
		or.element && e.setTag("lcp.element", Qa(or.element)),
		or.id && e.setTag("lcp.id", or.id),
		or.url && e.setTag("lcp.url", or.url.trim().slice(0, 200)),
		e.setTag("lcp.size", or.size)),
		Ia &&
			Ia.sources &&
			((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
				ee.log("[Measurements] Adding CLS Data"),
			Ia.sources.forEach((t, r) =>
				e.setTag(`cls.source.${r + 1}`, Qa(t.node))
			));
}
const wc = ["localhost", /^\//],
	Sc = {
		traceFetch: !0,
		traceXHR: !0,
		tracingOrigins: wc,
		tracePropagationTargets: wc,
	};
function mA(e) {
	const {
			traceFetch: t,
			traceXHR: r,
			tracePropagationTargets: n,
			tracingOrigins: i,
			shouldCreateSpanForRequest: a,
		} = { traceFetch: Sc.traceFetch, traceXHR: Sc.traceXHR, ...e },
		s = typeof a == "function" ? a : (c) => !0,
		o = (c) => gA(c, n || i),
		l = {};
	t &&
		Pt("fetch", (c) => {
			yA(c, s, o, l);
		}),
		r &&
			Pt("xhr", (c) => {
				vA(c, s, o, l);
			});
}
function gA(e, t) {
	return f0(e, t || wc);
}
function yA(e, t, r, n) {
	if (!lf() || !(e.fetchData && t(e.fetchData.url))) return;
	if (e.endTimestamp) {
		const a = e.fetchData.__span;
		if (!a) return;
		const s = n[a];
		s &&
			(e.response
				? s.setHttpStatus(e.response.status)
				: e.error && s.setStatus("internal_error"),
			s.finish(),
			delete n[a]);
		return;
	}
	const i = ys();
	if (i) {
		const a = i.startChild({
			data: { ...e.fetchData, type: "fetch" },
			description: `${e.fetchData.method} ${e.fetchData.url}`,
			op: "http.client",
		});
		(e.fetchData.__span = a.spanId), (n[a.spanId] = a);
		const s = e.args[0];
		e.args[1] = e.args[1] || {};
		const o = e.args[1];
		r(e.fetchData.url) &&
			((o.headers = bA(s, i.getDynamicSamplingContext(), a, o)),
			i.metadata.propagations++);
	}
}
function bA(e, t, r, n) {
	const i = l2(t),
		a = r.toTraceparent(),
		s = typeof Request < "u" && mr(e, Request) ? e.headers : n.headers;
	if (s)
		if (typeof Headers < "u" && mr(s, Headers)) {
			const o = new Headers(s);
			return o.append("sentry-trace", a), i && o.append(bc, i), o;
		} else if (Array.isArray(s)) {
			const o = [...s, ["sentry-trace", a]];
			return i && o.push([bc, i]), o;
		} else {
			const o = "baggage" in s ? s.baggage : void 0,
				l = [];
			return (
				Array.isArray(o) ? l.push(...o) : o && l.push(o),
				i && l.push(i),
				{
					...s,
					"sentry-trace": a,
					baggage: l.length > 0 ? l.join(",") : void 0,
				}
			);
		}
	else return { "sentry-trace": a, baggage: i };
}
function vA(e, t, r, n) {
	if (
		!lf() ||
		(e.xhr && e.xhr.__sentry_own_request__) ||
		!(e.xhr && e.xhr.__sentry_xhr__ && t(e.xhr.__sentry_xhr__.url))
	)
		return;
	const i = e.xhr.__sentry_xhr__;
	if (e.endTimestamp) {
		const s = e.xhr.__sentry_xhr_span_id__;
		if (!s) return;
		const o = n[s];
		o && (o.setHttpStatus(i.status_code), o.finish(), delete n[s]);
		return;
	}
	const a = ys();
	if (a) {
		const s = a.startChild({
			data: { ...i.data, type: "xhr", method: i.method, url: i.url },
			description: `${i.method} ${i.url}`,
			op: "http.client",
		});
		if (
			((e.xhr.__sentry_xhr_span_id__ = s.spanId),
			(n[e.xhr.__sentry_xhr_span_id__] = s),
			e.xhr.setRequestHeader && r(e.xhr.__sentry_xhr__.url))
		)
			try {
				e.xhr.setRequestHeader("sentry-trace", s.toTraceparent());
				const o = a.getDynamicSamplingContext(),
					l = l2(o);
				l && e.xhr.setRequestHeader(bc, l), a.metadata.propagations++;
			} catch {}
	}
}
function _A(e, t = !0, r = !0) {
	if (!$e || !$e.location) {
		(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
			ee.warn(
				"Could not initialize routing instrumentation due to invalid location"
			);
		return;
	}
	let n = $e.location.href,
		i;
	t &&
		(i = e({
			name: $e.location.pathname,
			op: "pageload",
			metadata: { source: "url" },
		})),
		r &&
			Pt("history", ({ to: a, from: s }) => {
				if (s === void 0 && n && n.indexOf(a) !== -1) {
					n = void 0;
					return;
				}
				s !== a &&
					((n = void 0),
					i &&
						((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
							ee.log(
								`[Tracing] Finishing current transaction with op: ${i.op}`
							),
						i.finish()),
					(i = e({
						name: $e.location.pathname,
						op: "navigation",
						metadata: { source: "url" },
					})));
			});
}
const wA = "BrowserTracing",
	SA = {
		idleTimeout: k2,
		finalTimeout: A2,
		heartbeatInterval: R2,
		markBackgroundTransactions: !0,
		routingInstrumentation: _A,
		startTransactionOnLocationChange: !0,
		startTransactionOnPageLoad: !0,
		_experiments: { enableLongTask: !0, enableInteractions: !1 },
		...Sc,
	};
class df {
	__init() {
		this.name = wA;
	}
	constructor(t) {
		df.prototype.__init.call(this),
			(this.options = { ...SA, ...t }),
			t &&
				!t.tracePropagationTargets &&
				t.tracingOrigins &&
				(this.options.tracePropagationTargets = t.tracingOrigins),
			nA(),
			io([
				this,
				"access",
				(r) => r.options,
				"access",
				(r) => r._experiments,
				"optionalAccess",
				(r) => r.enableLongTask,
			]) && iA();
	}
	setupOnce(t, r) {
		this._getCurrentHub = r;
		const {
			routingInstrumentation: n,
			startTransactionOnLocationChange: i,
			startTransactionOnPageLoad: a,
			markBackgroundTransactions: s,
			traceFetch: o,
			traceXHR: l,
			tracePropagationTargets: c,
			shouldCreateSpanForRequest: u,
			_experiments: d,
		} = this.options;
		n((p) => this._createRouteTransaction(p), a, i),
			s && Kk(),
			io([d, "optionalAccess", (p) => p.enableInteractions]) &&
				this._registerInteractionListener(),
			mA({
				traceFetch: o,
				traceXHR: l,
				tracePropagationTargets: c,
				shouldCreateSpanForRequest: u,
			});
	}
	_createRouteTransaction(t) {
		if (!this._getCurrentHub) {
			(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
				ee.warn(
					`[Tracing] Did not create ${t.op} transaction because _getCurrentHub is invalid.`
				);
			return;
		}
		const {
				beforeNavigate: r,
				idleTimeout: n,
				finalTimeout: i,
				heartbeatInterval: a,
			} = this.options,
			s = t.op === "pageload",
			o = s ? h1("sentry-trace") : null,
			l = s ? h1("baggage") : null,
			c = o ? Gx(o) : void 0,
			u = l ? aT(l) : void 0,
			d = {
				...t,
				...c,
				metadata: { ...t.metadata, dynamicSamplingContext: c && !u ? {} : u },
				trimEnd: !0,
			},
			p = typeof r == "function" ? r(d) : d,
			m = p === void 0 ? { ...d, sampled: !1 } : p;
		(m.metadata =
			m.name !== d.name ? { ...m.metadata, source: "custom" } : m.metadata),
			(this._latestRouteName = m.name),
			(this._latestRouteSource = io([
				m,
				"access",
				(_) => _.metadata,
				"optionalAccess",
				(_) => _.source,
			])),
			m.sampled === !1 &&
				(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
				ee.log(
					`[Tracing] Will not send ${m.op} transaction because of beforeNavigate.`
				),
			(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
				ee.log(`[Tracing] Starting ${m.op} transaction on scope`);
		const b = this._getCurrentHub(),
			{ location: E } = $e,
			R = u1(b, m, n, i, !0, { location: E }, a);
		return (
			R.registerBeforeFinishCallback((_) => {
				lA(_);
			}),
			R
		);
	}
	_registerInteractionListener() {
		let t;
		const r = () => {
			const {
					idleTimeout: n,
					finalTimeout: i,
					heartbeatInterval: a,
				} = this.options,
				s = "ui.action.click";
			if ((t && (t.finish(), (t = void 0)), !this._getCurrentHub)) {
				(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
					ee.warn(
						`[Tracing] Did not create ${s} transaction because _getCurrentHub is invalid.`
					);
				return;
			}
			if (!this._latestRouteName) {
				(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
					ee.warn(
						`[Tracing] Did not create ${s} transaction because _latestRouteName is missing.`
					);
				return;
			}
			const o = this._getCurrentHub(),
				{ location: l } = $e,
				c = {
					name: this._latestRouteName,
					op: s,
					trimEnd: !0,
					metadata: { source: nn(this._latestRouteSource, () => "url") },
				};
			t = u1(o, c, n, i, !0, { location: l }, a);
		};
		["click"].forEach((n) => {
			addEventListener(n, r, { once: !1, capture: !0 });
		});
	}
}
function h1(e) {
	const t = ax(`meta[name=${e}]`);
	return t ? t.getAttribute("content") : null;
}
(typeof __SENTRY_TRACING__ > "u" || __SENTRY_TRACING__) && Vk();
const EA = Ct((e) => {
	const t = `openai-website@${JE}`,
		r = e.$config.public.APP_ENV;
	zk({
		dsn: e.$config.public.SENTRY_DSN,
		release: t,
		environment: r,
		integrations: [new df()],
		sampleRate: 0.05,
		tracesSampleRate: 0.05,
	});
});
var xA = Object.defineProperty,
	TA = (e, t, r) =>
		t in e
			? xA(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r })
			: (e[t] = r),
	Ks = (e, t, r) => (TA(e, typeof t != "symbol" ? t + "" : t, r), r);
function kA(e) {
	var t = e.default;
	if (typeof t == "function") {
		var r = function () {
			return t.apply(this, arguments);
		};
		r.prototype = t.prototype;
	} else r = {};
	return (
		Object.defineProperty(r, "__esModule", { value: !0 }),
		Object.keys(e).forEach(function (n) {
			var i = Object.getOwnPropertyDescriptor(e, n);
			Object.defineProperty(
				r,
				n,
				i.get
					? i
					: {
							enumerable: !0,
							get: function () {
								return e[n];
							},
					  }
			);
		}),
		r
	);
}
var AA = function () {
		if (
			typeof Symbol != "function" ||
			typeof Object.getOwnPropertySymbols != "function"
		)
			return !1;
		if (typeof Symbol.iterator == "symbol") return !0;
		var e = {},
			t = Symbol("test"),
			r = Object(t);
		if (
			typeof t == "string" ||
			Object.prototype.toString.call(t) !== "[object Symbol]" ||
			Object.prototype.toString.call(r) !== "[object Symbol]"
		)
			return !1;
		var n = 42;
		e[t] = n;
		for (t in e) return !1;
		if (
			(typeof Object.keys == "function" && Object.keys(e).length !== 0) ||
			(typeof Object.getOwnPropertyNames == "function" &&
				Object.getOwnPropertyNames(e).length !== 0)
		)
			return !1;
		var i = Object.getOwnPropertySymbols(e);
		if (
			i.length !== 1 ||
			i[0] !== t ||
			!Object.prototype.propertyIsEnumerable.call(e, t)
		)
			return !1;
		if (typeof Object.getOwnPropertyDescriptor == "function") {
			var a = Object.getOwnPropertyDescriptor(e, t);
			if (a.value !== n || a.enumerable !== !0) return !1;
		}
		return !0;
	},
	p1 = typeof Symbol < "u" && Symbol,
	RA = AA,
	MA = function () {
		return typeof p1 != "function" ||
			typeof Symbol != "function" ||
			typeof p1("foo") != "symbol" ||
			typeof Symbol("bar") != "symbol"
			? !1
			: RA();
	},
	OA = "Function.prototype.bind called on incompatible ",
	fl = Array.prototype.slice,
	NA = Object.prototype.toString,
	CA = "[object Function]",
	IA = function (e) {
		var t = this;
		if (typeof t != "function" || NA.call(t) !== CA)
			throw new TypeError(OA + t);
		for (
			var r = fl.call(arguments, 1),
				n,
				i = function () {
					if (this instanceof n) {
						var c = t.apply(this, r.concat(fl.call(arguments)));
						return Object(c) === c ? c : this;
					} else return t.apply(e, r.concat(fl.call(arguments)));
				},
				a = Math.max(0, t.length - r.length),
				s = [],
				o = 0;
			o < a;
			o++
		)
			s.push("$" + o);
		if (
			((n = Function(
				"binder",
				"return function (" +
					s.join(",") +
					"){ return binder.apply(this,arguments); }"
			)(i)),
			t.prototype)
		) {
			var l = function () {};
			(l.prototype = t.prototype),
				(n.prototype = new l()),
				(l.prototype = null);
		}
		return n;
	},
	DA = IA,
	hf = Function.prototype.bind || DA,
	BA = hf,
	PA = BA.call(Function.call, Object.prototype.hasOwnProperty),
	Ce,
	Yi = SyntaxError,
	I2 = Function,
	Ni = TypeError,
	dl = function (e) {
		try {
			return I2('"use strict"; return (' + e + ").constructor;")();
		} catch {}
	},
	Wn = Object.getOwnPropertyDescriptor;
if (Wn)
	try {
		Wn({}, "");
	} catch {
		Wn = null;
	}
var hl = function () {
		throw new Ni();
	},
	LA = Wn
		? (function () {
				try {
					return arguments.callee, hl;
				} catch {
					try {
						return Wn(arguments, "callee").get;
					} catch {
						return hl;
					}
				}
		  })()
		: hl,
	oi = MA(),
	en =
		Object.getPrototypeOf ||
		function (e) {
			return e.__proto__;
		},
	ui = {},
	zA = typeof Uint8Array > "u" ? Ce : en(Uint8Array),
	Ci = {
		"%AggregateError%": typeof AggregateError > "u" ? Ce : AggregateError,
		"%Array%": Array,
		"%ArrayBuffer%": typeof ArrayBuffer > "u" ? Ce : ArrayBuffer,
		"%ArrayIteratorPrototype%": oi ? en([][Symbol.iterator]()) : Ce,
		"%AsyncFromSyncIteratorPrototype%": Ce,
		"%AsyncFunction%": ui,
		"%AsyncGenerator%": ui,
		"%AsyncGeneratorFunction%": ui,
		"%AsyncIteratorPrototype%": ui,
		"%Atomics%": typeof Atomics > "u" ? Ce : Atomics,
		"%BigInt%": typeof BigInt > "u" ? Ce : BigInt,
		"%Boolean%": Boolean,
		"%DataView%": typeof DataView > "u" ? Ce : DataView,
		"%Date%": Date,
		"%decodeURI%": decodeURI,
		"%decodeURIComponent%": decodeURIComponent,
		"%encodeURI%": encodeURI,
		"%encodeURIComponent%": encodeURIComponent,
		"%Error%": Error,
		"%eval%": eval,
		"%EvalError%": EvalError,
		"%Float32Array%": typeof Float32Array > "u" ? Ce : Float32Array,
		"%Float64Array%": typeof Float64Array > "u" ? Ce : Float64Array,
		"%FinalizationRegistry%":
			typeof FinalizationRegistry > "u" ? Ce : FinalizationRegistry,
		"%Function%": I2,
		"%GeneratorFunction%": ui,
		"%Int8Array%": typeof Int8Array > "u" ? Ce : Int8Array,
		"%Int16Array%": typeof Int16Array > "u" ? Ce : Int16Array,
		"%Int32Array%": typeof Int32Array > "u" ? Ce : Int32Array,
		"%isFinite%": isFinite,
		"%isNaN%": isNaN,
		"%IteratorPrototype%": oi ? en(en([][Symbol.iterator]())) : Ce,
		"%JSON%": typeof JSON == "object" ? JSON : Ce,
		"%Map%": typeof Map > "u" ? Ce : Map,
		"%MapIteratorPrototype%":
			typeof Map > "u" || !oi ? Ce : en(new Map()[Symbol.iterator]()),
		"%Math%": Math,
		"%Number%": Number,
		"%Object%": Object,
		"%parseFloat%": parseFloat,
		"%parseInt%": parseInt,
		"%Promise%": typeof Promise > "u" ? Ce : Promise,
		"%Proxy%": typeof Proxy > "u" ? Ce : Proxy,
		"%RangeError%": RangeError,
		"%ReferenceError%": ReferenceError,
		"%Reflect%": typeof Reflect > "u" ? Ce : Reflect,
		"%RegExp%": RegExp,
		"%Set%": typeof Set > "u" ? Ce : Set,
		"%SetIteratorPrototype%":
			typeof Set > "u" || !oi ? Ce : en(new Set()[Symbol.iterator]()),
		"%SharedArrayBuffer%":
			typeof SharedArrayBuffer > "u" ? Ce : SharedArrayBuffer,
		"%String%": String,
		"%StringIteratorPrototype%": oi ? en(""[Symbol.iterator]()) : Ce,
		"%Symbol%": oi ? Symbol : Ce,
		"%SyntaxError%": Yi,
		"%ThrowTypeError%": LA,
		"%TypedArray%": zA,
		"%TypeError%": Ni,
		"%Uint8Array%": typeof Uint8Array > "u" ? Ce : Uint8Array,
		"%Uint8ClampedArray%":
			typeof Uint8ClampedArray > "u" ? Ce : Uint8ClampedArray,
		"%Uint16Array%": typeof Uint16Array > "u" ? Ce : Uint16Array,
		"%Uint32Array%": typeof Uint32Array > "u" ? Ce : Uint32Array,
		"%URIError%": URIError,
		"%WeakMap%": typeof WeakMap > "u" ? Ce : WeakMap,
		"%WeakRef%": typeof WeakRef > "u" ? Ce : WeakRef,
		"%WeakSet%": typeof WeakSet > "u" ? Ce : WeakSet,
	},
	$A = function e(t) {
		var r;
		if (t === "%AsyncFunction%") r = dl("async function () {}");
		else if (t === "%GeneratorFunction%") r = dl("function* () {}");
		else if (t === "%AsyncGeneratorFunction%") r = dl("async function* () {}");
		else if (t === "%AsyncGenerator%") {
			var n = e("%AsyncGeneratorFunction%");
			n && (r = n.prototype);
		} else if (t === "%AsyncIteratorPrototype%") {
			var i = e("%AsyncGenerator%");
			i && (r = en(i.prototype));
		}
		return (Ci[t] = r), r;
	},
	m1 = {
		"%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
		"%ArrayPrototype%": ["Array", "prototype"],
		"%ArrayProto_entries%": ["Array", "prototype", "entries"],
		"%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
		"%ArrayProto_keys%": ["Array", "prototype", "keys"],
		"%ArrayProto_values%": ["Array", "prototype", "values"],
		"%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
		"%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
		"%AsyncGeneratorPrototype%": [
			"AsyncGeneratorFunction",
			"prototype",
			"prototype",
		],
		"%BooleanPrototype%": ["Boolean", "prototype"],
		"%DataViewPrototype%": ["DataView", "prototype"],
		"%DatePrototype%": ["Date", "prototype"],
		"%ErrorPrototype%": ["Error", "prototype"],
		"%EvalErrorPrototype%": ["EvalError", "prototype"],
		"%Float32ArrayPrototype%": ["Float32Array", "prototype"],
		"%Float64ArrayPrototype%": ["Float64Array", "prototype"],
		"%FunctionPrototype%": ["Function", "prototype"],
		"%Generator%": ["GeneratorFunction", "prototype"],
		"%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
		"%Int8ArrayPrototype%": ["Int8Array", "prototype"],
		"%Int16ArrayPrototype%": ["Int16Array", "prototype"],
		"%Int32ArrayPrototype%": ["Int32Array", "prototype"],
		"%JSONParse%": ["JSON", "parse"],
		"%JSONStringify%": ["JSON", "stringify"],
		"%MapPrototype%": ["Map", "prototype"],
		"%NumberPrototype%": ["Number", "prototype"],
		"%ObjectPrototype%": ["Object", "prototype"],
		"%ObjProto_toString%": ["Object", "prototype", "toString"],
		"%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
		"%PromisePrototype%": ["Promise", "prototype"],
		"%PromiseProto_then%": ["Promise", "prototype", "then"],
		"%Promise_all%": ["Promise", "all"],
		"%Promise_reject%": ["Promise", "reject"],
		"%Promise_resolve%": ["Promise", "resolve"],
		"%RangeErrorPrototype%": ["RangeError", "prototype"],
		"%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
		"%RegExpPrototype%": ["RegExp", "prototype"],
		"%SetPrototype%": ["Set", "prototype"],
		"%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
		"%StringPrototype%": ["String", "prototype"],
		"%SymbolPrototype%": ["Symbol", "prototype"],
		"%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
		"%TypedArrayPrototype%": ["TypedArray", "prototype"],
		"%TypeErrorPrototype%": ["TypeError", "prototype"],
		"%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
		"%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
		"%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
		"%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
		"%URIErrorPrototype%": ["URIError", "prototype"],
		"%WeakMapPrototype%": ["WeakMap", "prototype"],
		"%WeakSetPrototype%": ["WeakSet", "prototype"],
	},
	bs = hf,
	No = PA,
	FA = bs.call(Function.call, Array.prototype.concat),
	HA = bs.call(Function.apply, Array.prototype.splice),
	g1 = bs.call(Function.call, String.prototype.replace),
	Co = bs.call(Function.call, String.prototype.slice),
	UA = bs.call(Function.call, RegExp.prototype.exec),
	jA =
		/[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,
	qA = /\\(\\)?/g,
	GA = function (e) {
		var t = Co(e, 0, 1),
			r = Co(e, -1);
		if (t === "%" && r !== "%")
			throw new Yi("invalid intrinsic syntax, expected closing `%`");
		if (r === "%" && t !== "%")
			throw new Yi("invalid intrinsic syntax, expected opening `%`");
		var n = [];
		return (
			g1(e, jA, function (i, a, s, o) {
				n[n.length] = s ? g1(o, qA, "$1") : a || i;
			}),
			n
		);
	},
	YA = function (e, t) {
		var r = e,
			n;
		if ((No(m1, r) && ((n = m1[r]), (r = "%" + n[0] + "%")), No(Ci, r))) {
			var i = Ci[r];
			if ((i === ui && (i = $A(r)), typeof i > "u" && !t))
				throw new Ni(
					"intrinsic " +
						e +
						" exists, but is not available. Please file an issue!"
				);
			return { alias: n, name: r, value: i };
		}
		throw new Yi("intrinsic " + e + " does not exist!");
	},
	pf = function (e, t) {
		if (typeof e != "string" || e.length === 0)
			throw new Ni("intrinsic name must be a non-empty string");
		if (arguments.length > 1 && typeof t != "boolean")
			throw new Ni('"allowMissing" argument must be a boolean');
		if (UA(/^%?[^%]*%?$/, e) === null)
			throw new Yi(
				"`%` may not be present anywhere but at the beginning and end of the intrinsic name"
			);
		var r = GA(e),
			n = r.length > 0 ? r[0] : "",
			i = YA("%" + n + "%", t),
			a = i.name,
			s = i.value,
			o = !1,
			l = i.alias;
		l && ((n = l[0]), HA(r, FA([0, 1], l)));
		for (var c = 1, u = !0; c < r.length; c += 1) {
			var d = r[c],
				p = Co(d, 0, 1),
				m = Co(d, -1);
			if (
				(p === '"' ||
					p === "'" ||
					p === "`" ||
					m === '"' ||
					m === "'" ||
					m === "`") &&
				p !== m
			)
				throw new Yi("property names with quotes must have matching quotes");
			if (
				((d === "constructor" || !u) && (o = !0),
				(n += "." + d),
				(a = "%" + n + "%"),
				No(Ci, a))
			)
				s = Ci[a];
			else if (s != null) {
				if (!(d in s)) {
					if (!t)
						throw new Ni(
							"base intrinsic for " +
								e +
								" exists, but the property is not available."
						);
					return;
				}
				if (Wn && c + 1 >= r.length) {
					var b = Wn(s, d);
					(u = !!b),
						u && "get" in b && !("originalValue" in b.get)
							? (s = b.get)
							: (s = s[d]);
				} else (u = No(s, d)), (s = s[d]);
				u && !o && (Ci[a] = s);
			}
		}
		return s;
	},
	D2 = { exports: {} };
(function (e) {
	var t = hf,
		r = pf,
		n = r("%Function.prototype.apply%"),
		i = r("%Function.prototype.call%"),
		a = r("%Reflect.apply%", !0) || t.call(i, n),
		s = r("%Object.getOwnPropertyDescriptor%", !0),
		o = r("%Object.defineProperty%", !0),
		l = r("%Math.max%");
	if (o)
		try {
			o({}, "a", { value: 1 });
		} catch {
			o = null;
		}
	e.exports = function (u) {
		var d = a(t, i, arguments);
		if (s && o) {
			var p = s(d, "length");
			p.configurable &&
				o(d, "length", { value: 1 + l(0, u.length - (arguments.length - 1)) });
		}
		return d;
	};
	var c = function () {
		return a(t, n, arguments);
	};
	o ? o(e.exports, "apply", { value: c }) : (e.exports.apply = c);
})(D2);
var B2 = pf,
	P2 = D2.exports,
	WA = P2(B2("String.prototype.indexOf")),
	VA = function (e, t) {
		var r = B2(e, !!t);
		return typeof r == "function" && WA(e, ".prototype.") > -1 ? P2(r) : r;
	};
const KA = {},
	XA = Object.freeze(
		Object.defineProperty(
			{ __proto__: null, default: KA },
			Symbol.toStringTag,
			{ value: "Module" }
		)
	),
	JA = kA(XA);
var mf = typeof Map == "function" && Map.prototype,
	pl =
		Object.getOwnPropertyDescriptor && mf
			? Object.getOwnPropertyDescriptor(Map.prototype, "size")
			: null,
	Io = mf && pl && typeof pl.get == "function" ? pl.get : null,
	ZA = mf && Map.prototype.forEach,
	gf = typeof Set == "function" && Set.prototype,
	ml =
		Object.getOwnPropertyDescriptor && gf
			? Object.getOwnPropertyDescriptor(Set.prototype, "size")
			: null,
	Do = gf && ml && typeof ml.get == "function" ? ml.get : null,
	QA = gf && Set.prototype.forEach,
	eR = typeof WeakMap == "function" && WeakMap.prototype,
	Da = eR ? WeakMap.prototype.has : null,
	tR = typeof WeakSet == "function" && WeakSet.prototype,
	Ba = tR ? WeakSet.prototype.has : null,
	rR = typeof WeakRef == "function" && WeakRef.prototype,
	y1 = rR ? WeakRef.prototype.deref : null,
	nR = Boolean.prototype.valueOf,
	iR = Object.prototype.toString,
	aR = Function.prototype.toString,
	sR = String.prototype.match,
	yf = String.prototype.slice,
	un = String.prototype.replace,
	oR = String.prototype.toUpperCase,
	b1 = String.prototype.toLowerCase,
	L2 = RegExp.prototype.test,
	v1 = Array.prototype.concat,
	ur = Array.prototype.join,
	lR = Array.prototype.slice,
	_1 = Math.floor,
	Ec = typeof BigInt == "function" ? BigInt.prototype.valueOf : null,
	gl = Object.getOwnPropertySymbols,
	xc =
		typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
			? Symbol.prototype.toString
			: null,
	Wi = typeof Symbol == "function" && typeof Symbol.iterator == "object",
	_t =
		typeof Symbol == "function" &&
		Symbol.toStringTag &&
		(typeof Symbol.toStringTag === Wi || "symbol")
			? Symbol.toStringTag
			: null,
	z2 = Object.prototype.propertyIsEnumerable,
	w1 =
		(typeof Reflect == "function"
			? Reflect.getPrototypeOf
			: Object.getPrototypeOf) ||
		([].__proto__ === Array.prototype
			? function (e) {
					return e.__proto__;
			  }
			: null);
function S1(e, t) {
	if (
		e === 1 / 0 ||
		e === -1 / 0 ||
		e !== e ||
		(e && e > -1e3 && e < 1e3) ||
		L2.call(/e/, t)
	)
		return t;
	var r = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
	if (typeof e == "number") {
		var n = e < 0 ? -_1(-e) : _1(e);
		if (n !== e) {
			var i = String(n),
				a = yf.call(t, i.length + 1);
			return (
				un.call(i, r, "$&_") +
				"." +
				un.call(un.call(a, /([0-9]{3})/g, "$&_"), /_$/, "")
			);
		}
	}
	return un.call(t, r, "$&_");
}
var Tc = JA,
	E1 = Tc.custom,
	x1 = F2(E1) ? E1 : null,
	cR = function e(t, r, n, i) {
		var a = r || {};
		if (
			tn(a, "quoteStyle") &&
			a.quoteStyle !== "single" &&
			a.quoteStyle !== "double"
		)
			throw new TypeError('option "quoteStyle" must be "single" or "double"');
		if (
			tn(a, "maxStringLength") &&
			(typeof a.maxStringLength == "number"
				? a.maxStringLength < 0 && a.maxStringLength !== 1 / 0
				: a.maxStringLength !== null)
		)
			throw new TypeError(
				'option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`'
			);
		var s = tn(a, "customInspect") ? a.customInspect : !0;
		if (typeof s != "boolean" && s !== "symbol")
			throw new TypeError(
				"option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`"
			);
		if (
			tn(a, "indent") &&
			a.indent !== null &&
			a.indent !== "	" &&
			!(parseInt(a.indent, 10) === a.indent && a.indent > 0)
		)
			throw new TypeError(
				'option "indent" must be "\\t", an integer > 0, or `null`'
			);
		if (tn(a, "numericSeparator") && typeof a.numericSeparator != "boolean")
			throw new TypeError(
				'option "numericSeparator", if provided, must be `true` or `false`'
			);
		var o = a.numericSeparator;
		if (typeof t > "u") return "undefined";
		if (t === null) return "null";
		if (typeof t == "boolean") return t ? "true" : "false";
		if (typeof t == "string") return U2(t, a);
		if (typeof t == "number") {
			if (t === 0) return 1 / 0 / t > 0 ? "0" : "-0";
			var l = String(t);
			return o ? S1(t, l) : l;
		}
		if (typeof t == "bigint") {
			var c = String(t) + "n";
			return o ? S1(t, c) : c;
		}
		var u = typeof a.depth > "u" ? 5 : a.depth;
		if ((typeof n > "u" && (n = 0), n >= u && u > 0 && typeof t == "object"))
			return kc(t) ? "[Array]" : "[Object]";
		var d = AR(a, n);
		if (typeof i > "u") i = [];
		else if (H2(i, t) >= 0) return "[Circular]";
		function p(oe, W, Ee) {
			if ((W && ((i = lR.call(i)), i.push(W)), Ee)) {
				var I = { depth: a.depth };
				return (
					tn(a, "quoteStyle") && (I.quoteStyle = a.quoteStyle),
					e(oe, I, n + 1, i)
				);
			}
			return e(oe, a, n + 1, i);
		}
		if (typeof t == "function" && !T1(t)) {
			var m = bR(t),
				b = Xs(t, p);
			return (
				"[Function" +
				(m ? ": " + m : " (anonymous)") +
				"]" +
				(b.length > 0 ? " { " + ur.call(b, ", ") + " }" : "")
			);
		}
		if (F2(t)) {
			var E = Wi
				? un.call(String(t), /^(Symbol\(.*\))_[^)]*$/, "$1")
				: xc.call(t);
			return typeof t == "object" && !Wi ? ha(E) : E;
		}
		if (xR(t)) {
			for (
				var R = "<" + b1.call(String(t.nodeName)),
					_ = t.attributes || [],
					v = 0;
				v < _.length;
				v++
			)
				R += " " + _[v].name + "=" + $2(uR(_[v].value), "double", a);
			return (
				(R += ">"),
				t.childNodes && t.childNodes.length && (R += "..."),
				(R += "</" + b1.call(String(t.nodeName)) + ">"),
				R
			);
		}
		if (kc(t)) {
			if (t.length === 0) return "[]";
			var T = Xs(t, p);
			return d && !kR(T)
				? "[" + Ac(T, d) + "]"
				: "[ " + ur.call(T, ", ") + " ]";
		}
		if (dR(t)) {
			var M = Xs(t, p);
			return !("cause" in Error.prototype) &&
				"cause" in t &&
				!z2.call(t, "cause")
				? "{ [" +
						String(t) +
						"] " +
						ur.call(v1.call("[cause]: " + p(t.cause), M), ", ") +
						" }"
				: M.length === 0
				? "[" + String(t) + "]"
				: "{ [" + String(t) + "] " + ur.call(M, ", ") + " }";
		}
		if (typeof t == "object" && s) {
			if (x1 && typeof t[x1] == "function" && Tc)
				return Tc(t, { depth: u - n });
			if (s !== "symbol" && typeof t.inspect == "function") return t.inspect();
		}
		if (vR(t)) {
			var O = [];
			return (
				ZA.call(t, function (oe, W) {
					O.push(p(W, t, !0) + " => " + p(oe, t));
				}),
				k1("Map", Io.call(t), O, d)
			);
		}
		if (SR(t)) {
			var B = [];
			return (
				QA.call(t, function (oe) {
					B.push(p(oe, t));
				}),
				k1("Set", Do.call(t), B, d)
			);
		}
		if (_R(t)) return yl("WeakMap");
		if (ER(t)) return yl("WeakSet");
		if (wR(t)) return yl("WeakRef");
		if (pR(t)) return ha(p(Number(t)));
		if (gR(t)) return ha(p(Ec.call(t)));
		if (mR(t)) return ha(nR.call(t));
		if (hR(t)) return ha(p(String(t)));
		if (!fR(t) && !T1(t)) {
			var z = Xs(t, p),
				D = w1
					? w1(t) === Object.prototype
					: t instanceof Object || t.constructor === Object,
				H = t instanceof Object ? "" : "null prototype",
				Q =
					!D && _t && Object(t) === t && _t in t
						? yf.call(Mn(t), 8, -1)
						: H
						? "Object"
						: "",
				te =
					D || typeof t.constructor != "function"
						? ""
						: t.constructor.name
						? t.constructor.name + " "
						: "",
				q =
					te +
					(Q || H
						? "[" + ur.call(v1.call([], Q || [], H || []), ": ") + "] "
						: "");
			return z.length === 0
				? q + "{}"
				: d
				? q + "{" + Ac(z, d) + "}"
				: q + "{ " + ur.call(z, ", ") + " }";
		}
		return String(t);
	};
function $2(e, t, r) {
	var n = (r.quoteStyle || t) === "double" ? '"' : "'";
	return n + e + n;
}
function uR(e) {
	return un.call(String(e), /"/g, "&quot;");
}
function kc(e) {
	return (
		Mn(e) === "[object Array]" && (!_t || !(typeof e == "object" && _t in e))
	);
}
function fR(e) {
	return (
		Mn(e) === "[object Date]" && (!_t || !(typeof e == "object" && _t in e))
	);
}
function T1(e) {
	return (
		Mn(e) === "[object RegExp]" && (!_t || !(typeof e == "object" && _t in e))
	);
}
function dR(e) {
	return (
		Mn(e) === "[object Error]" && (!_t || !(typeof e == "object" && _t in e))
	);
}
function hR(e) {
	return (
		Mn(e) === "[object String]" && (!_t || !(typeof e == "object" && _t in e))
	);
}
function pR(e) {
	return (
		Mn(e) === "[object Number]" && (!_t || !(typeof e == "object" && _t in e))
	);
}
function mR(e) {
	return (
		Mn(e) === "[object Boolean]" && (!_t || !(typeof e == "object" && _t in e))
	);
}
function F2(e) {
	if (Wi) return e && typeof e == "object" && e instanceof Symbol;
	if (typeof e == "symbol") return !0;
	if (!e || typeof e != "object" || !xc) return !1;
	try {
		return xc.call(e), !0;
	} catch {}
	return !1;
}
function gR(e) {
	if (!e || typeof e != "object" || !Ec) return !1;
	try {
		return Ec.call(e), !0;
	} catch {}
	return !1;
}
var yR =
	Object.prototype.hasOwnProperty ||
	function (e) {
		return e in this;
	};
function tn(e, t) {
	return yR.call(e, t);
}
function Mn(e) {
	return iR.call(e);
}
function bR(e) {
	if (e.name) return e.name;
	var t = sR.call(aR.call(e), /^function\s*([\w$]+)/);
	return t ? t[1] : null;
}
function H2(e, t) {
	if (e.indexOf) return e.indexOf(t);
	for (var r = 0, n = e.length; r < n; r++) if (e[r] === t) return r;
	return -1;
}
function vR(e) {
	if (!Io || !e || typeof e != "object") return !1;
	try {
		Io.call(e);
		try {
			Do.call(e);
		} catch {
			return !0;
		}
		return e instanceof Map;
	} catch {}
	return !1;
}
function _R(e) {
	if (!Da || !e || typeof e != "object") return !1;
	try {
		Da.call(e, Da);
		try {
			Ba.call(e, Ba);
		} catch {
			return !0;
		}
		return e instanceof WeakMap;
	} catch {}
	return !1;
}
function wR(e) {
	if (!y1 || !e || typeof e != "object") return !1;
	try {
		return y1.call(e), !0;
	} catch {}
	return !1;
}
function SR(e) {
	if (!Do || !e || typeof e != "object") return !1;
	try {
		Do.call(e);
		try {
			Io.call(e);
		} catch {
			return !0;
		}
		return e instanceof Set;
	} catch {}
	return !1;
}
function ER(e) {
	if (!Ba || !e || typeof e != "object") return !1;
	try {
		Ba.call(e, Ba);
		try {
			Da.call(e, Da);
		} catch {
			return !0;
		}
		return e instanceof WeakSet;
	} catch {}
	return !1;
}
function xR(e) {
	return !e || typeof e != "object"
		? !1
		: typeof HTMLElement < "u" && e instanceof HTMLElement
		? !0
		: typeof e.nodeName == "string" && typeof e.getAttribute == "function";
}
function U2(e, t) {
	if (e.length > t.maxStringLength) {
		var r = e.length - t.maxStringLength,
			n = "... " + r + " more character" + (r > 1 ? "s" : "");
		return U2(yf.call(e, 0, t.maxStringLength), t) + n;
	}
	var i = un.call(un.call(e, /(['\\])/g, "\\$1"), /[\x00-\x1f]/g, TR);
	return $2(i, "single", t);
}
function TR(e) {
	var t = e.charCodeAt(0),
		r = { 8: "b", 9: "t", 10: "n", 12: "f", 13: "r" }[t];
	return r ? "\\" + r : "\\x" + (t < 16 ? "0" : "") + oR.call(t.toString(16));
}
function ha(e) {
	return "Object(" + e + ")";
}
function yl(e) {
	return e + " { ? }";
}
function k1(e, t, r, n) {
	var i = n ? Ac(r, n) : ur.call(r, ", ");
	return e + " (" + t + ") {" + i + "}";
}
function kR(e) {
	for (var t = 0; t < e.length; t++)
		if (
			H2(
				e[t],
				`
`
			) >= 0
		)
			return !1;
	return !0;
}
function AR(e, t) {
	var r;
	if (e.indent === "	") r = "	";
	else if (typeof e.indent == "number" && e.indent > 0)
		r = ur.call(Array(e.indent + 1), " ");
	else return null;
	return { base: r, prev: ur.call(Array(t + 1), r) };
}
function Ac(e, t) {
	if (e.length === 0) return "";
	var r =
		`
` +
		t.prev +
		t.base;
	return (
		r +
		ur.call(e, "," + r) +
		`
` +
		t.prev
	);
}
function Xs(e, t) {
	var r = kc(e),
		n = [];
	if (r) {
		n.length = e.length;
		for (var i = 0; i < e.length; i++) n[i] = tn(e, i) ? t(e[i], e) : "";
	}
	var a = typeof gl == "function" ? gl(e) : [],
		s;
	if (Wi) {
		s = {};
		for (var o = 0; o < a.length; o++) s["$" + a[o]] = a[o];
	}
	for (var l in e)
		!tn(e, l) ||
			(r && String(Number(l)) === l && l < e.length) ||
			(Wi && s["$" + l] instanceof Symbol) ||
			(L2.call(/[^\w$]/, l)
				? n.push(t(l, e) + ": " + t(e[l], e))
				: n.push(l + ": " + t(e[l], e)));
	if (typeof gl == "function")
		for (var c = 0; c < a.length; c++)
			z2.call(e, a[c]) && n.push("[" + t(a[c]) + "]: " + t(e[a[c]], e));
	return n;
}
var bf = pf,
	aa = VA,
	RR = cR,
	MR = bf("%TypeError%"),
	Js = bf("%WeakMap%", !0),
	Zs = bf("%Map%", !0),
	OR = aa("WeakMap.prototype.get", !0),
	NR = aa("WeakMap.prototype.set", !0),
	CR = aa("WeakMap.prototype.has", !0),
	IR = aa("Map.prototype.get", !0),
	DR = aa("Map.prototype.set", !0),
	BR = aa("Map.prototype.has", !0),
	vf = function (e, t) {
		for (var r = e, n; (n = r.next) !== null; r = n)
			if (n.key === t)
				return (r.next = n.next), (n.next = e.next), (e.next = n), n;
	},
	PR = function (e, t) {
		var r = vf(e, t);
		return r && r.value;
	},
	LR = function (e, t, r) {
		var n = vf(e, t);
		n ? (n.value = r) : (e.next = { key: t, next: e.next, value: r });
	},
	zR = function (e, t) {
		return !!vf(e, t);
	},
	$R = function () {
		var e,
			t,
			r,
			n = {
				assert: function (i) {
					if (!n.has(i)) throw new MR("Side channel does not contain " + RR(i));
				},
				get: function (i) {
					if (Js && i && (typeof i == "object" || typeof i == "function")) {
						if (e) return OR(e, i);
					} else if (Zs) {
						if (t) return IR(t, i);
					} else if (r) return PR(r, i);
				},
				has: function (i) {
					if (Js && i && (typeof i == "object" || typeof i == "function")) {
						if (e) return CR(e, i);
					} else if (Zs) {
						if (t) return BR(t, i);
					} else if (r) return zR(r, i);
					return !1;
				},
				set: function (i, a) {
					Js && i && (typeof i == "object" || typeof i == "function")
						? (e || (e = new Js()), NR(e, i, a))
						: Zs
						? (t || (t = new Zs()), DR(t, i, a))
						: (r || (r = { key: {}, next: null }), LR(r, i, a));
				},
			};
		return n;
	},
	FR = String.prototype.replace,
	HR = /%20/g,
	bl = { RFC1738: "RFC1738", RFC3986: "RFC3986" },
	_f = {
		default: bl.RFC3986,
		formatters: {
			RFC1738: function (e) {
				return FR.call(e, HR, "+");
			},
			RFC3986: function (e) {
				return String(e);
			},
		},
		RFC1738: bl.RFC1738,
		RFC3986: bl.RFC3986,
	},
	UR = _f,
	vl = Object.prototype.hasOwnProperty,
	$n = Array.isArray,
	sr = (function () {
		for (var e = [], t = 0; t < 256; ++t)
			e.push("%" + ((t < 16 ? "0" : "") + t.toString(16)).toUpperCase());
		return e;
	})(),
	jR = function (e) {
		for (; e.length > 1; ) {
			var t = e.pop(),
				r = t.obj[t.prop];
			if ($n(r)) {
				for (var n = [], i = 0; i < r.length; ++i)
					typeof r[i] < "u" && n.push(r[i]);
				t.obj[t.prop] = n;
			}
		}
	},
	j2 = function (e, t) {
		for (
			var r = t && t.plainObjects ? Object.create(null) : {}, n = 0;
			n < e.length;
			++n
		)
			typeof e[n] < "u" && (r[n] = e[n]);
		return r;
	},
	qR = function e(t, r, n) {
		if (!r) return t;
		if (typeof r != "object") {
			if ($n(t)) t.push(r);
			else if (t && typeof t == "object")
				((n && (n.plainObjects || n.allowPrototypes)) ||
					!vl.call(Object.prototype, r)) &&
					(t[r] = !0);
			else return [t, r];
			return t;
		}
		if (!t || typeof t != "object") return [t].concat(r);
		var i = t;
		return (
			$n(t) && !$n(r) && (i = j2(t, n)),
			$n(t) && $n(r)
				? (r.forEach(function (a, s) {
						if (vl.call(t, s)) {
							var o = t[s];
							o && typeof o == "object" && a && typeof a == "object"
								? (t[s] = e(o, a, n))
								: t.push(a);
						} else t[s] = a;
				  }),
				  t)
				: Object.keys(r).reduce(function (a, s) {
						var o = r[s];
						return vl.call(a, s) ? (a[s] = e(a[s], o, n)) : (a[s] = o), a;
				  }, i)
		);
	},
	GR = function (e, t) {
		return Object.keys(t).reduce(function (r, n) {
			return (r[n] = t[n]), r;
		}, e);
	},
	YR = function (e, t, r) {
		var n = e.replace(/\+/g, " ");
		if (r === "iso-8859-1") return n.replace(/%[0-9a-f]{2}/gi, unescape);
		try {
			return decodeURIComponent(n);
		} catch {
			return n;
		}
	},
	WR = function (e, t, r, n, i) {
		if (e.length === 0) return e;
		var a = e;
		if (
			(typeof e == "symbol"
				? (a = Symbol.prototype.toString.call(e))
				: typeof e != "string" && (a = String(e)),
			r === "iso-8859-1")
		)
			return escape(a).replace(/%u[0-9a-f]{4}/gi, function (c) {
				return "%26%23" + parseInt(c.slice(2), 16) + "%3B";
			});
		for (var s = "", o = 0; o < a.length; ++o) {
			var l = a.charCodeAt(o);
			if (
				l === 45 ||
				l === 46 ||
				l === 95 ||
				l === 126 ||
				(l >= 48 && l <= 57) ||
				(l >= 65 && l <= 90) ||
				(l >= 97 && l <= 122) ||
				(i === UR.RFC1738 && (l === 40 || l === 41))
			) {
				s += a.charAt(o);
				continue;
			}
			if (l < 128) {
				s = s + sr[l];
				continue;
			}
			if (l < 2048) {
				s = s + (sr[192 | (l >> 6)] + sr[128 | (l & 63)]);
				continue;
			}
			if (l < 55296 || l >= 57344) {
				s =
					s +
					(sr[224 | (l >> 12)] +
						sr[128 | ((l >> 6) & 63)] +
						sr[128 | (l & 63)]);
				continue;
			}
			(o += 1),
				(l = 65536 + (((l & 1023) << 10) | (a.charCodeAt(o) & 1023))),
				(s +=
					sr[240 | (l >> 18)] +
					sr[128 | ((l >> 12) & 63)] +
					sr[128 | ((l >> 6) & 63)] +
					sr[128 | (l & 63)]);
		}
		return s;
	},
	VR = function (e) {
		for (
			var t = [{ obj: { o: e }, prop: "o" }], r = [], n = 0;
			n < t.length;
			++n
		)
			for (
				var i = t[n], a = i.obj[i.prop], s = Object.keys(a), o = 0;
				o < s.length;
				++o
			) {
				var l = s[o],
					c = a[l];
				typeof c == "object" &&
					c !== null &&
					r.indexOf(c) === -1 &&
					(t.push({ obj: a, prop: l }), r.push(c));
			}
		return jR(t), e;
	},
	KR = function (e) {
		return Object.prototype.toString.call(e) === "[object RegExp]";
	},
	XR = function (e) {
		return !e || typeof e != "object"
			? !1
			: !!(
					e.constructor &&
					e.constructor.isBuffer &&
					e.constructor.isBuffer(e)
			  );
	},
	JR = function (e, t) {
		return [].concat(e, t);
	},
	ZR = function (e, t) {
		if ($n(e)) {
			for (var r = [], n = 0; n < e.length; n += 1) r.push(t(e[n]));
			return r;
		}
		return t(e);
	},
	q2 = {
		arrayToObject: j2,
		assign: GR,
		combine: JR,
		compact: VR,
		decode: YR,
		encode: WR,
		isBuffer: XR,
		isRegExp: KR,
		maybeMap: ZR,
		merge: qR,
	},
	G2 = $R,
	Rc = q2,
	Pa = _f,
	QR = Object.prototype.hasOwnProperty,
	A1 = {
		brackets: function (e) {
			return e + "[]";
		},
		comma: "comma",
		indices: function (e, t) {
			return e + "[" + t + "]";
		},
		repeat: function (e) {
			return e;
		},
	},
	Rr = Array.isArray,
	eM = String.prototype.split,
	tM = Array.prototype.push,
	Y2 = function (e, t) {
		tM.apply(e, Rr(t) ? t : [t]);
	},
	rM = Date.prototype.toISOString,
	R1 = Pa.default,
	ft = {
		addQueryPrefix: !1,
		allowDots: !1,
		charset: "utf-8",
		charsetSentinel: !1,
		delimiter: "&",
		encode: !0,
		encoder: Rc.encode,
		encodeValuesOnly: !1,
		format: R1,
		formatter: Pa.formatters[R1],
		indices: !1,
		serializeDate: function (e) {
			return rM.call(e);
		},
		skipNulls: !1,
		strictNullHandling: !1,
	},
	nM = function (e) {
		return (
			typeof e == "string" ||
			typeof e == "number" ||
			typeof e == "boolean" ||
			typeof e == "symbol" ||
			typeof e == "bigint"
		);
	},
	_l = {},
	iM = function e(t, r, n, i, a, s, o, l, c, u, d, p, m, b, E, R) {
		for (var _ = t, v = R, T = 0, M = !1; (v = v.get(_l)) !== void 0 && !M; ) {
			var O = v.get(t);
			if (((T += 1), typeof O < "u")) {
				if (O === T) throw new RangeError("Cyclic object value");
				M = !0;
			}
			typeof v.get(_l) > "u" && (T = 0);
		}
		if (
			(typeof l == "function"
				? (_ = l(r, _))
				: _ instanceof Date
				? (_ = d(_))
				: n === "comma" &&
				  Rr(_) &&
				  (_ = Rc.maybeMap(_, function (ye) {
						return ye instanceof Date ? d(ye) : ye;
				  })),
			_ === null)
		) {
			if (a) return o && !b ? o(r, ft.encoder, E, "key", p) : r;
			_ = "";
		}
		if (nM(_) || Rc.isBuffer(_)) {
			if (o) {
				var B = b ? r : o(r, ft.encoder, E, "key", p);
				if (n === "comma" && b) {
					for (
						var z = eM.call(String(_), ","), D = "", H = 0;
						H < z.length;
						++H
					)
						D += (H === 0 ? "" : ",") + m(o(z[H], ft.encoder, E, "value", p));
					return [m(B) + (i && Rr(_) && z.length === 1 ? "[]" : "") + "=" + D];
				}
				return [m(B) + "=" + m(o(_, ft.encoder, E, "value", p))];
			}
			return [m(r) + "=" + m(String(_))];
		}
		var Q = [];
		if (typeof _ > "u") return Q;
		var te;
		if (n === "comma" && Rr(_))
			te = [{ value: _.length > 0 ? _.join(",") || null : void 0 }];
		else if (Rr(l)) te = l;
		else {
			var q = Object.keys(_);
			te = c ? q.sort(c) : q;
		}
		for (
			var oe = i && Rr(_) && _.length === 1 ? r + "[]" : r, W = 0;
			W < te.length;
			++W
		) {
			var Ee = te[W],
				I = typeof Ee == "object" && typeof Ee.value < "u" ? Ee.value : _[Ee];
			if (!(s && I === null)) {
				var K = Rr(_)
					? typeof n == "function"
						? n(oe, Ee)
						: oe
					: oe + (u ? "." + Ee : "[" + Ee + "]");
				R.set(t, T);
				var ie = G2();
				ie.set(_l, R),
					Y2(Q, e(I, K, n, i, a, s, o, l, c, u, d, p, m, b, E, ie));
			}
		}
		return Q;
	},
	aM = function (e) {
		if (!e) return ft;
		if (
			e.encoder !== null &&
			typeof e.encoder < "u" &&
			typeof e.encoder != "function"
		)
			throw new TypeError("Encoder has to be a function.");
		var t = e.charset || ft.charset;
		if (
			typeof e.charset < "u" &&
			e.charset !== "utf-8" &&
			e.charset !== "iso-8859-1"
		)
			throw new TypeError(
				"The charset option must be either utf-8, iso-8859-1, or undefined"
			);
		var r = Pa.default;
		if (typeof e.format < "u") {
			if (!QR.call(Pa.formatters, e.format))
				throw new TypeError("Unknown format option provided.");
			r = e.format;
		}
		var n = Pa.formatters[r],
			i = ft.filter;
		return (
			(typeof e.filter == "function" || Rr(e.filter)) && (i = e.filter),
			{
				addQueryPrefix:
					typeof e.addQueryPrefix == "boolean"
						? e.addQueryPrefix
						: ft.addQueryPrefix,
				allowDots: typeof e.allowDots > "u" ? ft.allowDots : !!e.allowDots,
				charset: t,
				charsetSentinel:
					typeof e.charsetSentinel == "boolean"
						? e.charsetSentinel
						: ft.charsetSentinel,
				delimiter: typeof e.delimiter > "u" ? ft.delimiter : e.delimiter,
				encode: typeof e.encode == "boolean" ? e.encode : ft.encode,
				encoder: typeof e.encoder == "function" ? e.encoder : ft.encoder,
				encodeValuesOnly:
					typeof e.encodeValuesOnly == "boolean"
						? e.encodeValuesOnly
						: ft.encodeValuesOnly,
				filter: i,
				format: r,
				formatter: n,
				serializeDate:
					typeof e.serializeDate == "function"
						? e.serializeDate
						: ft.serializeDate,
				skipNulls: typeof e.skipNulls == "boolean" ? e.skipNulls : ft.skipNulls,
				sort: typeof e.sort == "function" ? e.sort : null,
				strictNullHandling:
					typeof e.strictNullHandling == "boolean"
						? e.strictNullHandling
						: ft.strictNullHandling,
			}
		);
	},
	sM = function (e, t) {
		var r = e,
			n = aM(t),
			i,
			a;
		typeof n.filter == "function"
			? ((a = n.filter), (r = a("", r)))
			: Rr(n.filter) && ((a = n.filter), (i = a));
		var s = [];
		if (typeof r != "object" || r === null) return "";
		var o;
		t && t.arrayFormat in A1
			? (o = t.arrayFormat)
			: t && "indices" in t
			? (o = t.indices ? "indices" : "repeat")
			: (o = "indices");
		var l = A1[o];
		if (t && "commaRoundTrip" in t && typeof t.commaRoundTrip != "boolean")
			throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
		var c = l === "comma" && t && t.commaRoundTrip;
		i || (i = Object.keys(r)), n.sort && i.sort(n.sort);
		for (var u = G2(), d = 0; d < i.length; ++d) {
			var p = i[d];
			(n.skipNulls && r[p] === null) ||
				Y2(
					s,
					iM(
						r[p],
						p,
						l,
						c,
						n.strictNullHandling,
						n.skipNulls,
						n.encode ? n.encoder : null,
						n.filter,
						n.sort,
						n.allowDots,
						n.serializeDate,
						n.format,
						n.formatter,
						n.encodeValuesOnly,
						n.charset,
						u
					)
				);
		}
		var m = s.join(n.delimiter),
			b = n.addQueryPrefix === !0 ? "?" : "";
		return (
			n.charsetSentinel &&
				(n.charset === "iso-8859-1"
					? (b += "utf8=%26%2310003%3B&")
					: (b += "utf8=%E2%9C%93&")),
			m.length > 0 ? b + m : ""
		);
	},
	Vi = q2,
	Mc = Object.prototype.hasOwnProperty,
	oM = Array.isArray,
	lt = {
		allowDots: !1,
		allowPrototypes: !1,
		allowSparse: !1,
		arrayLimit: 20,
		charset: "utf-8",
		charsetSentinel: !1,
		comma: !1,
		decoder: Vi.decode,
		delimiter: "&",
		depth: 5,
		ignoreQueryPrefix: !1,
		interpretNumericEntities: !1,
		parameterLimit: 1e3,
		parseArrays: !0,
		plainObjects: !1,
		strictNullHandling: !1,
	},
	lM = function (e) {
		return e.replace(/&#(\d+);/g, function (t, r) {
			return String.fromCharCode(parseInt(r, 10));
		});
	},
	W2 = function (e, t) {
		return e && typeof e == "string" && t.comma && e.indexOf(",") > -1
			? e.split(",")
			: e;
	},
	cM = "utf8=%26%2310003%3B",
	uM = "utf8=%E2%9C%93",
	fM = function (e, t) {
		var r = {},
			n = t.ignoreQueryPrefix ? e.replace(/^\?/, "") : e,
			i = t.parameterLimit === 1 / 0 ? void 0 : t.parameterLimit,
			a = n.split(t.delimiter, i),
			s = -1,
			o,
			l = t.charset;
		if (t.charsetSentinel)
			for (o = 0; o < a.length; ++o)
				a[o].indexOf("utf8=") === 0 &&
					(a[o] === uM ? (l = "utf-8") : a[o] === cM && (l = "iso-8859-1"),
					(s = o),
					(o = a.length));
		for (o = 0; o < a.length; ++o)
			if (o !== s) {
				var c = a[o],
					u = c.indexOf("]="),
					d = u === -1 ? c.indexOf("=") : u + 1,
					p,
					m;
				d === -1
					? ((p = t.decoder(c, lt.decoder, l, "key")),
					  (m = t.strictNullHandling ? null : ""))
					: ((p = t.decoder(c.slice(0, d), lt.decoder, l, "key")),
					  (m = Vi.maybeMap(W2(c.slice(d + 1), t), function (b) {
							return t.decoder(b, lt.decoder, l, "value");
					  }))),
					m && t.interpretNumericEntities && l === "iso-8859-1" && (m = lM(m)),
					c.indexOf("[]=") > -1 && (m = oM(m) ? [m] : m),
					Mc.call(r, p) ? (r[p] = Vi.combine(r[p], m)) : (r[p] = m);
			}
		return r;
	},
	dM = function (e, t, r, n) {
		for (var i = n ? t : W2(t, r), a = e.length - 1; a >= 0; --a) {
			var s,
				o = e[a];
			if (o === "[]" && r.parseArrays) s = [].concat(i);
			else {
				s = r.plainObjects ? Object.create(null) : {};
				var l =
						o.charAt(0) === "[" && o.charAt(o.length - 1) === "]"
							? o.slice(1, -1)
							: o,
					c = parseInt(l, 10);
				!r.parseArrays && l === ""
					? (s = { 0: i })
					: !isNaN(c) &&
					  o !== l &&
					  String(c) === l &&
					  c >= 0 &&
					  r.parseArrays &&
					  c <= r.arrayLimit
					? ((s = []), (s[c] = i))
					: l !== "__proto__" && (s[l] = i);
			}
			i = s;
		}
		return i;
	},
	hM = function (e, t, r, n) {
		if (e) {
			var i = r.allowDots ? e.replace(/\.([^.[]+)/g, "[$1]") : e,
				a = /(\[[^[\]]*])/,
				s = /(\[[^[\]]*])/g,
				o = r.depth > 0 && a.exec(i),
				l = o ? i.slice(0, o.index) : i,
				c = [];
			if (l) {
				if (
					!r.plainObjects &&
					Mc.call(Object.prototype, l) &&
					!r.allowPrototypes
				)
					return;
				c.push(l);
			}
			for (
				var u = 0;
				r.depth > 0 && (o = s.exec(i)) !== null && u < r.depth;

			) {
				if (
					((u += 1),
					!r.plainObjects &&
						Mc.call(Object.prototype, o[1].slice(1, -1)) &&
						!r.allowPrototypes)
				)
					return;
				c.push(o[1]);
			}
			return o && c.push("[" + i.slice(o.index) + "]"), dM(c, t, r, n);
		}
	},
	pM = function (e) {
		if (!e) return lt;
		if (
			e.decoder !== null &&
			e.decoder !== void 0 &&
			typeof e.decoder != "function"
		)
			throw new TypeError("Decoder has to be a function.");
		if (
			typeof e.charset < "u" &&
			e.charset !== "utf-8" &&
			e.charset !== "iso-8859-1"
		)
			throw new TypeError(
				"The charset option must be either utf-8, iso-8859-1, or undefined"
			);
		var t = typeof e.charset > "u" ? lt.charset : e.charset;
		return {
			allowDots: typeof e.allowDots > "u" ? lt.allowDots : !!e.allowDots,
			allowPrototypes:
				typeof e.allowPrototypes == "boolean"
					? e.allowPrototypes
					: lt.allowPrototypes,
			allowSparse:
				typeof e.allowSparse == "boolean" ? e.allowSparse : lt.allowSparse,
			arrayLimit:
				typeof e.arrayLimit == "number" ? e.arrayLimit : lt.arrayLimit,
			charset: t,
			charsetSentinel:
				typeof e.charsetSentinel == "boolean"
					? e.charsetSentinel
					: lt.charsetSentinel,
			comma: typeof e.comma == "boolean" ? e.comma : lt.comma,
			decoder: typeof e.decoder == "function" ? e.decoder : lt.decoder,
			delimiter:
				typeof e.delimiter == "string" || Vi.isRegExp(e.delimiter)
					? e.delimiter
					: lt.delimiter,
			depth: typeof e.depth == "number" || e.depth === !1 ? +e.depth : lt.depth,
			ignoreQueryPrefix: e.ignoreQueryPrefix === !0,
			interpretNumericEntities:
				typeof e.interpretNumericEntities == "boolean"
					? e.interpretNumericEntities
					: lt.interpretNumericEntities,
			parameterLimit:
				typeof e.parameterLimit == "number"
					? e.parameterLimit
					: lt.parameterLimit,
			parseArrays: e.parseArrays !== !1,
			plainObjects:
				typeof e.plainObjects == "boolean" ? e.plainObjects : lt.plainObjects,
			strictNullHandling:
				typeof e.strictNullHandling == "boolean"
					? e.strictNullHandling
					: lt.strictNullHandling,
		};
	},
	mM = function (e, t) {
		var r = pM(t);
		if (e === "" || e === null || typeof e > "u")
			return r.plainObjects ? Object.create(null) : {};
		for (
			var n = typeof e == "string" ? fM(e, r) : e,
				i = r.plainObjects ? Object.create(null) : {},
				a = Object.keys(n),
				s = 0;
			s < a.length;
			++s
		) {
			var o = a[s],
				l = hM(o, n[o], r, typeof e == "string");
			i = Vi.merge(i, l, r);
		}
		return r.allowSparse === !0 ? i : Vi.compact(i);
	},
	gM = sM,
	yM = mM,
	bM = _f,
	vM = { formats: bM, parse: yM, stringify: gM };
const _M =
		/"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/,
	wM =
		/"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/,
	SM = /^["[{]|^-?\d[\d.]{0,14}$/;
function EM(e, t) {
	if (!(e === "__proto__" || e === "constructor")) return t;
}
function xM(e, t = {}) {
	if (typeof e != "string") return e;
	const r = e.toLowerCase();
	if (r === "true") return !0;
	if (r === "false") return !1;
	if (r === "null") return null;
	if (r === "nan") return Number.NaN;
	if (r === "infinity") return Number.POSITIVE_INFINITY;
	if (r !== "undefined") {
		if (!SM.test(e)) {
			if (t.strict) throw new SyntaxError("Invalid JSON");
			return e;
		}
		try {
			return _M.test(e) || wM.test(e) ? JSON.parse(e, EM) : JSON.parse(e);
		} catch (n) {
			if (t.strict) throw n;
			return e;
		}
	}
}
const TM = /#/g,
	kM = /&/g,
	AM = /=/g,
	V2 = /\+/g,
	RM = /%5b/gi,
	MM = /%5d/gi,
	OM = /%5e/gi,
	NM = /%60/gi,
	CM = /%7b/gi,
	IM = /%7c/gi,
	DM = /%7d/gi,
	BM = /%20/gi;
function PM(e) {
	return encodeURI("" + e)
		.replace(IM, "|")
		.replace(RM, "[")
		.replace(MM, "]");
}
function Oc(e) {
	return PM(e)
		.replace(V2, "%2B")
		.replace(BM, "+")
		.replace(TM, "%23")
		.replace(kM, "%26")
		.replace(NM, "`")
		.replace(CM, "{")
		.replace(DM, "}")
		.replace(OM, "^");
}
function wl(e) {
	return Oc(e).replace(AM, "%3D");
}
function K2(e = "") {
	try {
		return decodeURIComponent("" + e);
	} catch {
		return "" + e;
	}
}
function LM(e) {
	return K2(e.replace(V2, " "));
}
function zM(e = "") {
	const t = {};
	e[0] === "?" && (e = e.slice(1));
	for (const r of e.split("&")) {
		const n = r.match(/([^=]+)=?(.*)/) || [];
		if (n.length < 2) continue;
		const i = K2(n[1]);
		if (i === "__proto__" || i === "constructor") continue;
		const a = LM(n[2] || "");
		t[i]
			? Array.isArray(t[i])
				? t[i].push(a)
				: (t[i] = [t[i], a])
			: (t[i] = a);
	}
	return t;
}
function $M(e, t) {
	return (
		(typeof t == "number" || typeof t == "boolean") && (t = String(t)),
		t
			? Array.isArray(t)
				? t.map((r) => `${wl(e)}=${Oc(r)}`).join("&")
				: `${wl(e)}=${Oc(t)}`
			: wl(e)
	);
}
function FM(e) {
	return Object.keys(e)
		.filter((t) => e[t] !== void 0)
		.map((t) => $M(t, e[t]))
		.join("&");
}
const HM = /^\w+:(\/\/)?/,
	UM = /^\/\/[^/]+/;
function X2(e, t = !1) {
	return HM.test(e) || (t && UM.test(e));
}
const jM = /\/$|\/\?/;
function Nc(e = "", t = !1) {
	return t ? jM.test(e) : e.endsWith("/");
}
function qM(e = "", t = !1) {
	if (!t) return (Nc(e) ? e.slice(0, -1) : e) || "/";
	if (!Nc(e, !0)) return e || "/";
	const [r, ...n] = e.split("?");
	return (r.slice(0, -1) || "/") + (n.length > 0 ? `?${n.join("?")}` : "");
}
function GM(e = "", t = !1) {
	if (!t) return e.endsWith("/") ? e : e + "/";
	if (Nc(e, !0)) return e || "/";
	const [r, ...n] = e.split("?");
	return r + "/" + (n.length > 0 ? `?${n.join("?")}` : "");
}
function YM(e = "") {
	return e.startsWith("/");
}
function WM(e = "") {
	return (YM(e) ? e.slice(1) : e) || "/";
}
function VM(e, t) {
	if (XM(t) || X2(e)) return e;
	const r = qM(t);
	return e.startsWith(r) ? e : ZM(r, e);
}
function KM(e, t) {
	const r = J2(e),
		n = { ...zM(r.search), ...t };
	return (r.search = FM(n)), QM(r);
}
function XM(e) {
	return !e || e === "/";
}
function JM(e) {
	return e && e !== "/";
}
function ZM(e, ...t) {
	let r = e || "";
	for (const n of t.filter((i) => JM(i))) r = r ? GM(r) + WM(n) : n;
	return r;
}
function J2(e = "", t) {
	if (!X2(e, !0)) return t ? J2(t + e) : M1(e);
	const [r = "", n, i = ""] = (
			e.replace(/\\/g, "/").match(/([^/:]+:)?\/\/([^/@]+@)?(.*)/) || []
		).splice(1),
		[a = "", s = ""] = (i.match(/([^#/?]*)(.*)?/) || []).splice(1),
		{ pathname: o, search: l, hash: c } = M1(s.replace(/\/(?=[A-Za-z]:)/, ""));
	return {
		protocol: r,
		auth: n ? n.slice(0, Math.max(0, n.length - 1)) : "",
		host: a,
		pathname: o,
		search: l,
		hash: c,
	};
}
function M1(e = "") {
	const [t = "", r = "", n = ""] = (
		e.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []
	).splice(1);
	return { pathname: t, search: r, hash: n };
}
function QM(e) {
	const t =
		e.pathname +
		(e.search ? (e.search.startsWith("?") ? "" : "?") + e.search : "") +
		e.hash;
	return e.protocol
		? e.protocol + "//" + (e.auth ? e.auth + "@" : "") + e.host + t
		: t;
}
class eO extends Error {
	constructor() {
		super(...arguments), (this.name = "FetchError");
	}
}
function tO(e, t, r) {
	let n = "";
	e && r && (n = `${r.status} ${r.statusText} (${e.toString()})`),
		t && (n = `${t.message} (${n})`);
	const i = new eO(n);
	return (
		Object.defineProperty(i, "request", {
			get() {
				return e;
			},
		}),
		Object.defineProperty(i, "response", {
			get() {
				return r;
			},
		}),
		Object.defineProperty(i, "data", {
			get() {
				return r && r._data;
			},
		}),
		Object.defineProperty(i, "status", {
			get() {
				return r && r.status;
			},
		}),
		Object.defineProperty(i, "statusText", {
			get() {
				return r && r.statusText;
			},
		}),
		Object.defineProperty(i, "statusCode", {
			get() {
				return r && r.status;
			},
		}),
		Object.defineProperty(i, "statusMessage", {
			get() {
				return r && r.statusText;
			},
		}),
		i
	);
}
const rO = new Set(Object.freeze(["PATCH", "POST", "PUT", "DELETE"]));
function O1(e = "GET") {
	return rO.has(e.toUpperCase());
}
function nO(e) {
	if (e === void 0) return !1;
	const t = typeof e;
	return t === "string" || t === "number" || t === "boolean" || t === null
		? !0
		: t !== "object"
		? !1
		: Array.isArray(e)
		? !0
		: (e.constructor && e.constructor.name === "Object") ||
		  typeof e.toJSON == "function";
}
const iO = new Set([
		"image/svg",
		"application/xml",
		"application/xhtml",
		"application/html",
	]),
	aO = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function sO(e = "") {
	if (!e) return "json";
	const t = e.split(";").shift();
	return aO.test(t)
		? "json"
		: iO.has(t) || t.startsWith("text/")
		? "text"
		: "blob";
}
const oO = new Set([408, 409, 425, 429, 500, 502, 503, 504]);
function Z2(e) {
	const { fetch: t, Headers: r } = e;
	function n(s) {
		const o = (s.error && s.error.name === "AbortError") || !1;
		if (s.options.retry !== !1 && !o) {
			const c =
					typeof s.options.retry == "number"
						? s.options.retry
						: O1(s.options.method)
						? 0
						: 1,
				u = (s.response && s.response.status) || 500;
			if (c > 0 && oO.has(u))
				return i(s.request, { ...s.options, retry: c - 1 });
		}
		const l = tO(s.request, s.error, s.response);
		throw (Error.captureStackTrace && Error.captureStackTrace(l, i), l);
	}
	const i = async function (s, o = {}) {
			const l = {
				request: s,
				options: { ...e.defaults, ...o },
				response: void 0,
				error: void 0,
			};
			l.options.onRequest && (await l.options.onRequest(l)),
				typeof l.request == "string" &&
					(l.options.baseURL && (l.request = VM(l.request, l.options.baseURL)),
					(l.options.query || l.options.params) &&
						(l.request = KM(l.request, {
							...l.options.params,
							...l.options.query,
						})),
					l.options.body &&
						O1(l.options.method) &&
						nO(l.options.body) &&
						((l.options.body =
							typeof l.options.body == "string"
								? l.options.body
								: JSON.stringify(l.options.body)),
						(l.options.headers = new r(l.options.headers)),
						l.options.headers.has("content-type") ||
							l.options.headers.set("content-type", "application/json"),
						l.options.headers.has("accept") ||
							l.options.headers.set("accept", "application/json"))),
				(l.response = await t(l.request, l.options).catch(
					async (u) => (
						(l.error = u),
						l.options.onRequestError && (await l.options.onRequestError(l)),
						n(l)
					)
				));
			const c =
				(l.options.parseResponse ? "json" : l.options.responseType) ||
				sO(l.response.headers.get("content-type") || "");
			if (c === "json") {
				const u = await l.response.text(),
					d = l.options.parseResponse || xM;
				l.response._data = d(u);
			} else
				c === "stream"
					? (l.response._data = l.response.body)
					: (l.response._data = await l.response[c]());
			return (
				l.options.onResponse && (await l.options.onResponse(l)),
				l.response.status >= 400 && l.response.status < 600
					? (l.options.onResponseError && (await l.options.onResponseError(l)),
					  n(l))
					: l.response
			);
		},
		a = function (s, o) {
			return i(s, o).then((l) => l._data);
		};
	return (
		(a.raw = i),
		(a.native = t),
		(a.create = (s = {}) => Z2({ ...e, defaults: { ...e.defaults, ...s } })),
		a
	);
}
const Q2 = (function () {
		if (typeof globalThis < "u") return globalThis;
		if (typeof self < "u") return self;
		if (typeof window < "u") return window;
		if (typeof global < "u") return global;
		throw new Error("unable to locate global object");
	})(),
	lO =
		Q2.fetch ||
		(() =>
			Promise.reject(new Error("[ofetch] global.fetch is not supported!"))),
	cO = Q2.Headers,
	uO = Z2({ fetch: lO, Headers: cO }),
	fO =
		() =>
		async (e, t = {}) => {
			const r = { ...(t.headers || {}) };
			return (
				t.params &&
					((e = `${e}${e.includes("?") ? "&" : "?"}${vM.stringify(t.params)}`),
					delete t.params),
				await uO(e, { responseType: "json", retry: 0, ...t, headers: r }).catch(
					(n) => {
						var i;
						throw (
							((i = n == null ? void 0 : n.data) == null ? void 0 : i.errors) ||
							n
						);
					}
				)
			);
		};
class pa {
	constructor(t) {
		Ks(this, "path"),
			Ks(this, "baseURL"),
			Ks(this, "headers"),
			Ks(this, "params"),
			(this.path = t.path),
			(this.baseURL = t.baseURL || ""),
			(this.headers = t.headers || {}),
			(this.params = {});
	}
	filter(t) {
		return (this.params.filter = { ...this.params.filter, ...t }), this;
	}
	page(t) {
		return (this.params.page = { ...this.params.page, ...t }), this;
	}
	include(t) {
		return (this.params.include = Array.isArray(t) ? t.join(",") : t), this;
	}
	fields(t, r = []) {
		return (
			(this.params.fields = this.params.fields || {}),
			(this.params.fields[t] = r.join(",")),
			this
		);
	}
	sort(t) {
		return (this.params.sort = t), this;
	}
	query(t, r) {
		return (this.params[t] = r), this;
	}
	async fetch() {
		const t = fO(),
			r = { params: this.params, baseURL: this.baseURL, headers: this.headers };
		let n;
		try {
			n = await t(this.path, r);
		} catch (i) {
			Array.isArray(i)
				? i.map((a) =>
						console.error(
							"QueryBuilderError:",
							`${a.title} - ${a.detail} - ${this.path}`
						)
				  )
				: console.error("QueryBuilderError:", `${i}`, `${this.path}`),
				(n = null);
		}
		return n;
	}
}
var dO =
	typeof global == "object" && global && global.Object === Object && global;
const e5 = dO;
var hO = typeof self == "object" && self && self.Object === Object && self,
	pO = e5 || hO || Function("return this")();
const Fr = pO;
var mO = Fr.Symbol;
const kn = mO;
var t5 = Object.prototype,
	gO = t5.hasOwnProperty,
	yO = t5.toString,
	ma = kn ? kn.toStringTag : void 0;
function bO(e) {
	var t = gO.call(e, ma),
		r = e[ma];
	try {
		e[ma] = void 0;
		var n = !0;
	} catch {}
	var i = yO.call(e);
	return n && (t ? (e[ma] = r) : delete e[ma]), i;
}
var vO = Object.prototype,
	_O = vO.toString;
function wO(e) {
	return _O.call(e);
}
var SO = "[object Null]",
	EO = "[object Undefined]",
	N1 = kn ? kn.toStringTag : void 0;
function sa(e) {
	return e == null
		? e === void 0
			? EO
			: SO
		: N1 && N1 in Object(e)
		? bO(e)
		: wO(e);
}
function Ki(e) {
	return e != null && typeof e == "object";
}
var xO = "[object Symbol]";
function wf(e) {
	return typeof e == "symbol" || (Ki(e) && sa(e) == xO);
}
function r5(e, t) {
	for (var r = -1, n = e == null ? 0 : e.length, i = Array(n); ++r < n; )
		i[r] = t(e[r], r, e);
	return i;
}
var TO = Array.isArray;
const nr = TO;
var kO = 1 / 0,
	C1 = kn ? kn.prototype : void 0,
	I1 = C1 ? C1.toString : void 0;
function n5(e) {
	if (typeof e == "string") return e;
	if (nr(e)) return r5(e, n5) + "";
	if (wf(e)) return I1 ? I1.call(e) : "";
	var t = e + "";
	return t == "0" && 1 / e == -kO ? "-0" : t;
}
function v0(e) {
	var t = typeof e;
	return e != null && (t == "object" || t == "function");
}
function AO(e) {
	return e;
}
var RO = "[object AsyncFunction]",
	MO = "[object Function]",
	OO = "[object GeneratorFunction]",
	NO = "[object Proxy]";
function i5(e) {
	if (!v0(e)) return !1;
	var t = sa(e);
	return t == MO || t == OO || t == RO || t == NO;
}
var CO = Fr["__core-js_shared__"];
const Sl = CO;
var D1 = (function () {
	var e = /[^.]+$/.exec((Sl && Sl.keys && Sl.keys.IE_PROTO) || "");
	return e ? "Symbol(src)_1." + e : "";
})();
function IO(e) {
	return !!D1 && D1 in e;
}
var DO = Function.prototype,
	BO = DO.toString;
function ni(e) {
	if (e != null) {
		try {
			return BO.call(e);
		} catch {}
		try {
			return e + "";
		} catch {}
	}
	return "";
}
var PO = /[\\^$.*+?()[\]{}|]/g,
	LO = /^\[object .+?Constructor\]$/,
	zO = Function.prototype,
	$O = Object.prototype,
	FO = zO.toString,
	HO = $O.hasOwnProperty,
	UO = RegExp(
		"^" +
			FO.call(HO)
				.replace(PO, "\\$&")
				.replace(
					/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
					"$1.*?"
				) +
			"$"
	);
function jO(e) {
	if (!v0(e) || IO(e)) return !1;
	var t = i5(e) ? UO : LO;
	return t.test(ni(e));
}
function qO(e, t) {
	return e == null ? void 0 : e[t];
}
function oa(e, t) {
	var r = qO(e, t);
	return jO(r) ? r : void 0;
}
var GO = oa(Fr, "WeakMap");
const Cc = GO;
var YO = 9007199254740991,
	WO = /^(?:0|[1-9]\d*)$/;
function a5(e, t) {
	var r = typeof e;
	return (
		(t = t ?? YO),
		!!t &&
			(r == "number" || (r != "symbol" && WO.test(e))) &&
			e > -1 &&
			e % 1 == 0 &&
			e < t
	);
}
function s5(e, t) {
	return e === t || (e !== e && t !== t);
}
var VO = 9007199254740991;
function Sf(e) {
	return typeof e == "number" && e > -1 && e % 1 == 0 && e <= VO;
}
function _0(e) {
	return e != null && Sf(e.length) && !i5(e);
}
var KO = Object.prototype;
function o5(e) {
	var t = e && e.constructor,
		r = (typeof t == "function" && t.prototype) || KO;
	return e === r;
}
function XO(e, t) {
	for (var r = -1, n = Array(e); ++r < e; ) n[r] = t(r);
	return n;
}
var JO = "[object Arguments]";
function B1(e) {
	return Ki(e) && sa(e) == JO;
}
var l5 = Object.prototype,
	ZO = l5.hasOwnProperty,
	QO = l5.propertyIsEnumerable,
	eN = B1(
		(function () {
			return arguments;
		})()
	)
		? B1
		: function (e) {
				return Ki(e) && ZO.call(e, "callee") && !QO.call(e, "callee");
		  };
const Ef = eN;
function tN() {
	return !1;
}
var c5 = typeof exports == "object" && exports && !exports.nodeType && exports,
	P1 = c5 && typeof module == "object" && module && !module.nodeType && module,
	rN = P1 && P1.exports === c5,
	L1 = rN ? Fr.Buffer : void 0,
	nN = L1 ? L1.isBuffer : void 0,
	iN = nN || tN;
const Bo = iN;
var aN = "[object Arguments]",
	sN = "[object Array]",
	oN = "[object Boolean]",
	lN = "[object Date]",
	cN = "[object Error]",
	uN = "[object Function]",
	fN = "[object Map]",
	dN = "[object Number]",
	hN = "[object Object]",
	pN = "[object RegExp]",
	mN = "[object Set]",
	gN = "[object String]",
	yN = "[object WeakMap]",
	bN = "[object ArrayBuffer]",
	vN = "[object DataView]",
	_N = "[object Float32Array]",
	wN = "[object Float64Array]",
	SN = "[object Int8Array]",
	EN = "[object Int16Array]",
	xN = "[object Int32Array]",
	TN = "[object Uint8Array]",
	kN = "[object Uint8ClampedArray]",
	AN = "[object Uint16Array]",
	RN = "[object Uint32Array]",
	je = {};
je[_N] =
	je[wN] =
	je[SN] =
	je[EN] =
	je[xN] =
	je[TN] =
	je[kN] =
	je[AN] =
	je[RN] =
		!0;
je[aN] =
	je[sN] =
	je[bN] =
	je[oN] =
	je[vN] =
	je[lN] =
	je[cN] =
	je[uN] =
	je[fN] =
	je[dN] =
	je[hN] =
	je[pN] =
	je[mN] =
	je[gN] =
	je[yN] =
		!1;
function MN(e) {
	return Ki(e) && Sf(e.length) && !!je[sa(e)];
}
function ON(e) {
	return function (t) {
		return e(t);
	};
}
var u5 = typeof exports == "object" && exports && !exports.nodeType && exports,
	La = u5 && typeof module == "object" && module && !module.nodeType && module,
	NN = La && La.exports === u5,
	El = NN && e5.process,
	CN = (function () {
		try {
			var e = La && La.require && La.require("util").types;
			return e || (El && El.binding && El.binding("util"));
		} catch {}
	})();
const z1 = CN;
var $1 = z1 && z1.isTypedArray,
	IN = $1 ? ON($1) : MN;
const xf = IN;
var DN = Object.prototype,
	BN = DN.hasOwnProperty;
function PN(e, t) {
	var r = nr(e),
		n = !r && Ef(e),
		i = !r && !n && Bo(e),
		a = !r && !n && !i && xf(e),
		s = r || n || i || a,
		o = s ? XO(e.length, String) : [],
		l = o.length;
	for (var c in e)
		(t || BN.call(e, c)) &&
			!(
				s &&
				(c == "length" ||
					(i && (c == "offset" || c == "parent")) ||
					(a && (c == "buffer" || c == "byteLength" || c == "byteOffset")) ||
					a5(c, l))
			) &&
			o.push(c);
	return o;
}
function LN(e, t) {
	return function (r) {
		return e(t(r));
	};
}
var zN = LN(Object.keys, Object);
const $N = zN;
var FN = Object.prototype,
	HN = FN.hasOwnProperty;
function f5(e) {
	if (!o5(e)) return $N(e);
	var t = [];
	for (var r in Object(e)) HN.call(e, r) && r != "constructor" && t.push(r);
	return t;
}
function Tf(e) {
	return _0(e) ? PN(e) : f5(e);
}
var UN = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
	jN = /^\w*$/;
function kf(e, t) {
	if (nr(e)) return !1;
	var r = typeof e;
	return r == "number" || r == "symbol" || r == "boolean" || e == null || wf(e)
		? !0
		: jN.test(e) || !UN.test(e) || (t != null && e in Object(t));
}
var qN = oa(Object, "create");
const ss = qN;
function GN() {
	(this.__data__ = ss ? ss(null) : {}), (this.size = 0);
}
function YN(e) {
	var t = this.has(e) && delete this.__data__[e];
	return (this.size -= t ? 1 : 0), t;
}
var WN = "__lodash_hash_undefined__",
	VN = Object.prototype,
	KN = VN.hasOwnProperty;
function XN(e) {
	var t = this.__data__;
	if (ss) {
		var r = t[e];
		return r === WN ? void 0 : r;
	}
	return KN.call(t, e) ? t[e] : void 0;
}
var JN = Object.prototype,
	ZN = JN.hasOwnProperty;
function QN(e) {
	var t = this.__data__;
	return ss ? t[e] !== void 0 : ZN.call(t, e);
}
var eC = "__lodash_hash_undefined__";
function tC(e, t) {
	var r = this.__data__;
	return (
		(this.size += this.has(e) ? 0 : 1),
		(r[e] = ss && t === void 0 ? eC : t),
		this
	);
}
function Jn(e) {
	var t = -1,
		r = e == null ? 0 : e.length;
	for (this.clear(); ++t < r; ) {
		var n = e[t];
		this.set(n[0], n[1]);
	}
}
Jn.prototype.clear = GN;
Jn.prototype.delete = YN;
Jn.prototype.get = XN;
Jn.prototype.has = QN;
Jn.prototype.set = tC;
function rC() {
	(this.__data__ = []), (this.size = 0);
}
function w0(e, t) {
	for (var r = e.length; r--; ) if (s5(e[r][0], t)) return r;
	return -1;
}
var nC = Array.prototype,
	iC = nC.splice;
function aC(e) {
	var t = this.__data__,
		r = w0(t, e);
	if (r < 0) return !1;
	var n = t.length - 1;
	return r == n ? t.pop() : iC.call(t, r, 1), --this.size, !0;
}
function sC(e) {
	var t = this.__data__,
		r = w0(t, e);
	return r < 0 ? void 0 : t[r][1];
}
function oC(e) {
	return w0(this.__data__, e) > -1;
}
function lC(e, t) {
	var r = this.__data__,
		n = w0(r, e);
	return n < 0 ? (++this.size, r.push([e, t])) : (r[n][1] = t), this;
}
function Hr(e) {
	var t = -1,
		r = e == null ? 0 : e.length;
	for (this.clear(); ++t < r; ) {
		var n = e[t];
		this.set(n[0], n[1]);
	}
}
Hr.prototype.clear = rC;
Hr.prototype.delete = aC;
Hr.prototype.get = sC;
Hr.prototype.has = oC;
Hr.prototype.set = lC;
var cC = oa(Fr, "Map");
const os = cC;
function uC() {
	(this.size = 0),
		(this.__data__ = {
			hash: new Jn(),
			map: new (os || Hr)(),
			string: new Jn(),
		});
}
function fC(e) {
	var t = typeof e;
	return t == "string" || t == "number" || t == "symbol" || t == "boolean"
		? e !== "__proto__"
		: e === null;
}
function S0(e, t) {
	var r = e.__data__;
	return fC(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
}
function dC(e) {
	var t = S0(this, e).delete(e);
	return (this.size -= t ? 1 : 0), t;
}
function hC(e) {
	return S0(this, e).get(e);
}
function pC(e) {
	return S0(this, e).has(e);
}
function mC(e, t) {
	var r = S0(this, e),
		n = r.size;
	return r.set(e, t), (this.size += r.size == n ? 0 : 1), this;
}
function Ur(e) {
	var t = -1,
		r = e == null ? 0 : e.length;
	for (this.clear(); ++t < r; ) {
		var n = e[t];
		this.set(n[0], n[1]);
	}
}
Ur.prototype.clear = uC;
Ur.prototype.delete = dC;
Ur.prototype.get = hC;
Ur.prototype.has = pC;
Ur.prototype.set = mC;
var gC = "Expected a function";
function Af(e, t) {
	if (typeof e != "function" || (t != null && typeof t != "function"))
		throw new TypeError(gC);
	var r = function () {
		var n = arguments,
			i = t ? t.apply(this, n) : n[0],
			a = r.cache;
		if (a.has(i)) return a.get(i);
		var s = e.apply(this, n);
		return (r.cache = a.set(i, s) || a), s;
	};
	return (r.cache = new (Af.Cache || Ur)()), r;
}
Af.Cache = Ur;
var yC = 500;
function bC(e) {
	var t = Af(e, function (n) {
			return r.size === yC && r.clear(), n;
		}),
		r = t.cache;
	return t;
}
var vC =
		/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
	_C = /\\(\\)?/g,
	wC = bC(function (e) {
		var t = [];
		return (
			e.charCodeAt(0) === 46 && t.push(""),
			e.replace(vC, function (r, n, i, a) {
				t.push(i ? a.replace(_C, "$1") : n || r);
			}),
			t
		);
	});
const SC = wC;
function vs(e) {
	return e == null ? "" : n5(e);
}
function d5(e, t) {
	return nr(e) ? e : kf(e, t) ? [e] : SC(vs(e));
}
var EC = 1 / 0;
function E0(e) {
	if (typeof e == "string" || wf(e)) return e;
	var t = e + "";
	return t == "0" && 1 / e == -EC ? "-0" : t;
}
function h5(e, t) {
	t = d5(t, e);
	for (var r = 0, n = t.length; e != null && r < n; ) e = e[E0(t[r++])];
	return r && r == n ? e : void 0;
}
function xC(e, t, r) {
	var n = e == null ? void 0 : h5(e, t);
	return n === void 0 ? r : n;
}
function TC(e, t) {
	for (var r = -1, n = t.length, i = e.length; ++r < n; ) e[i + r] = t[r];
	return e;
}
function kC(e, t, r) {
	var n = -1,
		i = e.length;
	t < 0 && (t = -t > i ? 0 : i + t),
		(r = r > i ? i : r),
		r < 0 && (r += i),
		(i = t > r ? 0 : (r - t) >>> 0),
		(t >>>= 0);
	for (var a = Array(i); ++n < i; ) a[n] = e[n + t];
	return a;
}
function AC(e, t, r) {
	var n = e.length;
	return (r = r === void 0 ? n : r), !t && r >= n ? e : kC(e, t, r);
}
var RC = "\\ud800-\\udfff",
	MC = "\\u0300-\\u036f",
	OC = "\\ufe20-\\ufe2f",
	NC = "\\u20d0-\\u20ff",
	CC = MC + OC + NC,
	IC = "\\ufe0e\\ufe0f",
	DC = "\\u200d",
	BC = RegExp("[" + DC + RC + CC + IC + "]");
function p5(e) {
	return BC.test(e);
}
function PC(e) {
	return e.split("");
}
var m5 = "\\ud800-\\udfff",
	LC = "\\u0300-\\u036f",
	zC = "\\ufe20-\\ufe2f",
	$C = "\\u20d0-\\u20ff",
	FC = LC + zC + $C,
	HC = "\\ufe0e\\ufe0f",
	UC = "[" + m5 + "]",
	Ic = "[" + FC + "]",
	Dc = "\\ud83c[\\udffb-\\udfff]",
	jC = "(?:" + Ic + "|" + Dc + ")",
	g5 = "[^" + m5 + "]",
	y5 = "(?:\\ud83c[\\udde6-\\uddff]){2}",
	b5 = "[\\ud800-\\udbff][\\udc00-\\udfff]",
	qC = "\\u200d",
	v5 = jC + "?",
	_5 = "[" + HC + "]?",
	GC = "(?:" + qC + "(?:" + [g5, y5, b5].join("|") + ")" + _5 + v5 + ")*",
	YC = _5 + v5 + GC,
	WC = "(?:" + [g5 + Ic + "?", Ic, y5, b5, UC].join("|") + ")",
	VC = RegExp(Dc + "(?=" + Dc + ")|" + WC + YC, "g");
function KC(e) {
	return e.match(VC) || [];
}
function XC(e) {
	return p5(e) ? KC(e) : PC(e);
}
function JC(e) {
	return function (t) {
		t = vs(t);
		var r = p5(t) ? XC(t) : void 0,
			n = r ? r[0] : t.charAt(0),
			i = r ? AC(r, 1).join("") : t.slice(1);
		return n[e]() + i;
	};
}
var ZC = JC("toUpperCase");
const QC = ZC;
function eI(e) {
	return QC(vs(e).toLowerCase());
}
function tI(e, t, r, n) {
	var i = -1,
		a = e == null ? 0 : e.length;
	for (n && a && (r = e[++i]); ++i < a; ) r = t(r, e[i], i, e);
	return r;
}
function rI(e) {
	return function (t) {
		return e == null ? void 0 : e[t];
	};
}
var nI = {
		À: "A",
		Á: "A",
		Â: "A",
		Ã: "A",
		Ä: "A",
		Å: "A",
		à: "a",
		á: "a",
		â: "a",
		ã: "a",
		ä: "a",
		å: "a",
		Ç: "C",
		ç: "c",
		Ð: "D",
		ð: "d",
		È: "E",
		É: "E",
		Ê: "E",
		Ë: "E",
		è: "e",
		é: "e",
		ê: "e",
		ë: "e",
		Ì: "I",
		Í: "I",
		Î: "I",
		Ï: "I",
		ì: "i",
		í: "i",
		î: "i",
		ï: "i",
		Ñ: "N",
		ñ: "n",
		Ò: "O",
		Ó: "O",
		Ô: "O",
		Õ: "O",
		Ö: "O",
		Ø: "O",
		ò: "o",
		ó: "o",
		ô: "o",
		õ: "o",
		ö: "o",
		ø: "o",
		Ù: "U",
		Ú: "U",
		Û: "U",
		Ü: "U",
		ù: "u",
		ú: "u",
		û: "u",
		ü: "u",
		Ý: "Y",
		ý: "y",
		ÿ: "y",
		Æ: "Ae",
		æ: "ae",
		Þ: "Th",
		þ: "th",
		ß: "ss",
		Ā: "A",
		Ă: "A",
		Ą: "A",
		ā: "a",
		ă: "a",
		ą: "a",
		Ć: "C",
		Ĉ: "C",
		Ċ: "C",
		Č: "C",
		ć: "c",
		ĉ: "c",
		ċ: "c",
		č: "c",
		Ď: "D",
		Đ: "D",
		ď: "d",
		đ: "d",
		Ē: "E",
		Ĕ: "E",
		Ė: "E",
		Ę: "E",
		Ě: "E",
		ē: "e",
		ĕ: "e",
		ė: "e",
		ę: "e",
		ě: "e",
		Ĝ: "G",
		Ğ: "G",
		Ġ: "G",
		Ģ: "G",
		ĝ: "g",
		ğ: "g",
		ġ: "g",
		ģ: "g",
		Ĥ: "H",
		Ħ: "H",
		ĥ: "h",
		ħ: "h",
		Ĩ: "I",
		Ī: "I",
		Ĭ: "I",
		Į: "I",
		İ: "I",
		ĩ: "i",
		ī: "i",
		ĭ: "i",
		į: "i",
		ı: "i",
		Ĵ: "J",
		ĵ: "j",
		Ķ: "K",
		ķ: "k",
		ĸ: "k",
		Ĺ: "L",
		Ļ: "L",
		Ľ: "L",
		Ŀ: "L",
		Ł: "L",
		ĺ: "l",
		ļ: "l",
		ľ: "l",
		ŀ: "l",
		ł: "l",
		Ń: "N",
		Ņ: "N",
		Ň: "N",
		Ŋ: "N",
		ń: "n",
		ņ: "n",
		ň: "n",
		ŋ: "n",
		Ō: "O",
		Ŏ: "O",
		Ő: "O",
		ō: "o",
		ŏ: "o",
		ő: "o",
		Ŕ: "R",
		Ŗ: "R",
		Ř: "R",
		ŕ: "r",
		ŗ: "r",
		ř: "r",
		Ś: "S",
		Ŝ: "S",
		Ş: "S",
		Š: "S",
		ś: "s",
		ŝ: "s",
		ş: "s",
		š: "s",
		Ţ: "T",
		Ť: "T",
		Ŧ: "T",
		ţ: "t",
		ť: "t",
		ŧ: "t",
		Ũ: "U",
		Ū: "U",
		Ŭ: "U",
		Ů: "U",
		Ű: "U",
		Ų: "U",
		ũ: "u",
		ū: "u",
		ŭ: "u",
		ů: "u",
		ű: "u",
		ų: "u",
		Ŵ: "W",
		ŵ: "w",
		Ŷ: "Y",
		ŷ: "y",
		Ÿ: "Y",
		Ź: "Z",
		Ż: "Z",
		Ž: "Z",
		ź: "z",
		ż: "z",
		ž: "z",
		Ĳ: "IJ",
		ĳ: "ij",
		Œ: "Oe",
		œ: "oe",
		ŉ: "'n",
		ſ: "s",
	},
	iI = rI(nI);
const aI = iI;
var sI = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,
	oI = "\\u0300-\\u036f",
	lI = "\\ufe20-\\ufe2f",
	cI = "\\u20d0-\\u20ff",
	uI = oI + lI + cI,
	fI = "[" + uI + "]",
	dI = RegExp(fI, "g");
function hI(e) {
	return (e = vs(e)), e && e.replace(sI, aI).replace(dI, "");
}
var pI = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
function mI(e) {
	return e.match(pI) || [];
}
var gI = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
function yI(e) {
	return gI.test(e);
}
var w5 = "\\ud800-\\udfff",
	bI = "\\u0300-\\u036f",
	vI = "\\ufe20-\\ufe2f",
	_I = "\\u20d0-\\u20ff",
	wI = bI + vI + _I,
	S5 = "\\u2700-\\u27bf",
	E5 = "a-z\\xdf-\\xf6\\xf8-\\xff",
	SI = "\\xac\\xb1\\xd7\\xf7",
	EI = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf",
	xI = "\\u2000-\\u206f",
	TI =
		" \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",
	x5 = "A-Z\\xc0-\\xd6\\xd8-\\xde",
	kI = "\\ufe0e\\ufe0f",
	T5 = SI + EI + xI + TI,
	k5 = "['’]",
	F1 = "[" + T5 + "]",
	AI = "[" + wI + "]",
	A5 = "\\d+",
	RI = "[" + S5 + "]",
	R5 = "[" + E5 + "]",
	M5 = "[^" + w5 + T5 + A5 + S5 + E5 + x5 + "]",
	MI = "\\ud83c[\\udffb-\\udfff]",
	OI = "(?:" + AI + "|" + MI + ")",
	NI = "[^" + w5 + "]",
	O5 = "(?:\\ud83c[\\udde6-\\uddff]){2}",
	N5 = "[\\ud800-\\udbff][\\udc00-\\udfff]",
	fi = "[" + x5 + "]",
	CI = "\\u200d",
	H1 = "(?:" + R5 + "|" + M5 + ")",
	II = "(?:" + fi + "|" + M5 + ")",
	U1 = "(?:" + k5 + "(?:d|ll|m|re|s|t|ve))?",
	j1 = "(?:" + k5 + "(?:D|LL|M|RE|S|T|VE))?",
	C5 = OI + "?",
	I5 = "[" + kI + "]?",
	DI = "(?:" + CI + "(?:" + [NI, O5, N5].join("|") + ")" + I5 + C5 + ")*",
	BI = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",
	PI = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])",
	LI = I5 + C5 + DI,
	zI = "(?:" + [RI, O5, N5].join("|") + ")" + LI,
	$I = RegExp(
		[
			fi + "?" + R5 + "+" + U1 + "(?=" + [F1, fi, "$"].join("|") + ")",
			II + "+" + j1 + "(?=" + [F1, fi + H1, "$"].join("|") + ")",
			fi + "?" + H1 + "+" + U1,
			fi + "+" + j1,
			PI,
			BI,
			A5,
			zI,
		].join("|"),
		"g"
	);
function FI(e) {
	return e.match($I) || [];
}
function HI(e, t, r) {
	return (
		(e = vs(e)),
		(t = r ? void 0 : t),
		t === void 0 ? (yI(e) ? FI(e) : mI(e)) : e.match(t) || []
	);
}
var UI = "['’]",
	jI = RegExp(UI, "g");
function qI(e) {
	return function (t) {
		return tI(HI(hI(t).replace(jI, "")), e, "");
	};
}
var GI = qI(function (e, t, r) {
	return (t = t.toLowerCase()), e + (r ? eI(t) : t);
});
const Zn = GI;
function YI() {
	(this.__data__ = new Hr()), (this.size = 0);
}
function WI(e) {
	var t = this.__data__,
		r = t.delete(e);
	return (this.size = t.size), r;
}
function VI(e) {
	return this.__data__.get(e);
}
function KI(e) {
	return this.__data__.has(e);
}
var XI = 200;
function JI(e, t) {
	var r = this.__data__;
	if (r instanceof Hr) {
		var n = r.__data__;
		if (!os || n.length < XI - 1)
			return n.push([e, t]), (this.size = ++r.size), this;
		r = this.__data__ = new Ur(n);
	}
	return r.set(e, t), (this.size = r.size), this;
}
function Nr(e) {
	var t = (this.__data__ = new Hr(e));
	this.size = t.size;
}
Nr.prototype.clear = YI;
Nr.prototype.delete = WI;
Nr.prototype.get = VI;
Nr.prototype.has = KI;
Nr.prototype.set = JI;
function ZI(e, t) {
	for (var r = -1, n = e == null ? 0 : e.length, i = 0, a = []; ++r < n; ) {
		var s = e[r];
		t(s, r, e) && (a[i++] = s);
	}
	return a;
}
function QI() {
	return [];
}
var eD = Object.prototype,
	tD = eD.propertyIsEnumerable,
	q1 = Object.getOwnPropertySymbols,
	rD = q1
		? function (e) {
				return e == null
					? []
					: ((e = Object(e)),
					  ZI(q1(e), function (t) {
							return tD.call(e, t);
					  }));
		  }
		: QI;
const nD = rD;
function iD(e, t, r) {
	var n = t(e);
	return nr(e) ? n : TC(n, r(e));
}
function G1(e) {
	return iD(e, Tf, nD);
}
var aD = oa(Fr, "DataView");
const Bc = aD;
var sD = oa(Fr, "Promise");
const Pc = sD;
var oD = oa(Fr, "Set");
const Lc = oD;
var Y1 = "[object Map]",
	lD = "[object Object]",
	W1 = "[object Promise]",
	V1 = "[object Set]",
	K1 = "[object WeakMap]",
	X1 = "[object DataView]",
	cD = ni(Bc),
	uD = ni(os),
	fD = ni(Pc),
	dD = ni(Lc),
	hD = ni(Cc),
	Pn = sa;
((Bc && Pn(new Bc(new ArrayBuffer(1))) != X1) ||
	(os && Pn(new os()) != Y1) ||
	(Pc && Pn(Pc.resolve()) != W1) ||
	(Lc && Pn(new Lc()) != V1) ||
	(Cc && Pn(new Cc()) != K1)) &&
	(Pn = function (e) {
		var t = sa(e),
			r = t == lD ? e.constructor : void 0,
			n = r ? ni(r) : "";
		if (n)
			switch (n) {
				case cD:
					return X1;
				case uD:
					return Y1;
				case fD:
					return W1;
				case dD:
					return V1;
				case hD:
					return K1;
			}
		return t;
	});
const zc = Pn;
var pD = Fr.Uint8Array;
const J1 = pD;
var mD = "__lodash_hash_undefined__";
function gD(e) {
	return this.__data__.set(e, mD), this;
}
function yD(e) {
	return this.__data__.has(e);
}
function Po(e) {
	var t = -1,
		r = e == null ? 0 : e.length;
	for (this.__data__ = new Ur(); ++t < r; ) this.add(e[t]);
}
Po.prototype.add = Po.prototype.push = gD;
Po.prototype.has = yD;
function bD(e, t) {
	for (var r = -1, n = e == null ? 0 : e.length; ++r < n; )
		if (t(e[r], r, e)) return !0;
	return !1;
}
function vD(e, t) {
	return e.has(t);
}
var _D = 1,
	wD = 2;
function D5(e, t, r, n, i, a) {
	var s = r & _D,
		o = e.length,
		l = t.length;
	if (o != l && !(s && l > o)) return !1;
	var c = a.get(e),
		u = a.get(t);
	if (c && u) return c == t && u == e;
	var d = -1,
		p = !0,
		m = r & wD ? new Po() : void 0;
	for (a.set(e, t), a.set(t, e); ++d < o; ) {
		var b = e[d],
			E = t[d];
		if (n) var R = s ? n(E, b, d, t, e, a) : n(b, E, d, e, t, a);
		if (R !== void 0) {
			if (R) continue;
			p = !1;
			break;
		}
		if (m) {
			if (
				!bD(t, function (_, v) {
					if (!vD(m, v) && (b === _ || i(b, _, r, n, a))) return m.push(v);
				})
			) {
				p = !1;
				break;
			}
		} else if (!(b === E || i(b, E, r, n, a))) {
			p = !1;
			break;
		}
	}
	return a.delete(e), a.delete(t), p;
}
function SD(e) {
	var t = -1,
		r = Array(e.size);
	return (
		e.forEach(function (n, i) {
			r[++t] = [i, n];
		}),
		r
	);
}
function ED(e) {
	var t = -1,
		r = Array(e.size);
	return (
		e.forEach(function (n) {
			r[++t] = n;
		}),
		r
	);
}
var xD = 1,
	TD = 2,
	kD = "[object Boolean]",
	AD = "[object Date]",
	RD = "[object Error]",
	MD = "[object Map]",
	OD = "[object Number]",
	ND = "[object RegExp]",
	CD = "[object Set]",
	ID = "[object String]",
	DD = "[object Symbol]",
	BD = "[object ArrayBuffer]",
	PD = "[object DataView]",
	Z1 = kn ? kn.prototype : void 0,
	xl = Z1 ? Z1.valueOf : void 0;
function LD(e, t, r, n, i, a, s) {
	switch (r) {
		case PD:
			if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
				return !1;
			(e = e.buffer), (t = t.buffer);
		case BD:
			return !(e.byteLength != t.byteLength || !a(new J1(e), new J1(t)));
		case kD:
		case AD:
		case OD:
			return s5(+e, +t);
		case RD:
			return e.name == t.name && e.message == t.message;
		case ND:
		case ID:
			return e == t + "";
		case MD:
			var o = SD;
		case CD:
			var l = n & xD;
			if ((o || (o = ED), e.size != t.size && !l)) return !1;
			var c = s.get(e);
			if (c) return c == t;
			(n |= TD), s.set(e, t);
			var u = D5(o(e), o(t), n, i, a, s);
			return s.delete(e), u;
		case DD:
			if (xl) return xl.call(e) == xl.call(t);
	}
	return !1;
}
var zD = 1,
	$D = Object.prototype,
	FD = $D.hasOwnProperty;
function HD(e, t, r, n, i, a) {
	var s = r & zD,
		o = G1(e),
		l = o.length,
		c = G1(t),
		u = c.length;
	if (l != u && !s) return !1;
	for (var d = l; d--; ) {
		var p = o[d];
		if (!(s ? p in t : FD.call(t, p))) return !1;
	}
	var m = a.get(e),
		b = a.get(t);
	if (m && b) return m == t && b == e;
	var E = !0;
	a.set(e, t), a.set(t, e);
	for (var R = s; ++d < l; ) {
		p = o[d];
		var _ = e[p],
			v = t[p];
		if (n) var T = s ? n(v, _, p, t, e, a) : n(_, v, p, e, t, a);
		if (!(T === void 0 ? _ === v || i(_, v, r, n, a) : T)) {
			E = !1;
			break;
		}
		R || (R = p == "constructor");
	}
	if (E && !R) {
		var M = e.constructor,
			O = t.constructor;
		M != O &&
			"constructor" in e &&
			"constructor" in t &&
			!(
				typeof M == "function" &&
				M instanceof M &&
				typeof O == "function" &&
				O instanceof O
			) &&
			(E = !1);
	}
	return a.delete(e), a.delete(t), E;
}
var UD = 1,
	Q1 = "[object Arguments]",
	ep = "[object Array]",
	Qs = "[object Object]",
	jD = Object.prototype,
	tp = jD.hasOwnProperty;
function qD(e, t, r, n, i, a) {
	var s = nr(e),
		o = nr(t),
		l = s ? ep : zc(e),
		c = o ? ep : zc(t);
	(l = l == Q1 ? Qs : l), (c = c == Q1 ? Qs : c);
	var u = l == Qs,
		d = c == Qs,
		p = l == c;
	if (p && Bo(e)) {
		if (!Bo(t)) return !1;
		(s = !0), (u = !1);
	}
	if (p && !u)
		return (
			a || (a = new Nr()),
			s || xf(e) ? D5(e, t, r, n, i, a) : LD(e, t, l, r, n, i, a)
		);
	if (!(r & UD)) {
		var m = u && tp.call(e, "__wrapped__"),
			b = d && tp.call(t, "__wrapped__");
		if (m || b) {
			var E = m ? e.value() : e,
				R = b ? t.value() : t;
			return a || (a = new Nr()), i(E, R, r, n, a);
		}
	}
	return p ? (a || (a = new Nr()), HD(e, t, r, n, i, a)) : !1;
}
function Rf(e, t, r, n, i) {
	return e === t
		? !0
		: e == null || t == null || (!Ki(e) && !Ki(t))
		? e !== e && t !== t
		: qD(e, t, r, n, Rf, i);
}
var GD = 1,
	YD = 2;
function WD(e, t, r, n) {
	var i = r.length,
		a = i,
		s = !n;
	if (e == null) return !a;
	for (e = Object(e); i--; ) {
		var o = r[i];
		if (s && o[2] ? o[1] !== e[o[0]] : !(o[0] in e)) return !1;
	}
	for (; ++i < a; ) {
		o = r[i];
		var l = o[0],
			c = e[l],
			u = o[1];
		if (s && o[2]) {
			if (c === void 0 && !(l in e)) return !1;
		} else {
			var d = new Nr();
			if (n) var p = n(c, u, l, e, t, d);
			if (!(p === void 0 ? Rf(u, c, GD | YD, n, d) : p)) return !1;
		}
	}
	return !0;
}
function B5(e) {
	return e === e && !v0(e);
}
function VD(e) {
	for (var t = Tf(e), r = t.length; r--; ) {
		var n = t[r],
			i = e[n];
		t[r] = [n, i, B5(i)];
	}
	return t;
}
function P5(e, t) {
	return function (r) {
		return r == null ? !1 : r[e] === t && (t !== void 0 || e in Object(r));
	};
}
function KD(e) {
	var t = VD(e);
	return t.length == 1 && t[0][2]
		? P5(t[0][0], t[0][1])
		: function (r) {
				return r === e || WD(r, e, t);
		  };
}
function XD(e, t) {
	return e != null && t in Object(e);
}
function JD(e, t, r) {
	t = d5(t, e);
	for (var n = -1, i = t.length, a = !1; ++n < i; ) {
		var s = E0(t[n]);
		if (!(a = e != null && r(e, s))) break;
		e = e[s];
	}
	return a || ++n != i
		? a
		: ((i = e == null ? 0 : e.length),
		  !!i && Sf(i) && a5(s, i) && (nr(e) || Ef(e)));
}
function ZD(e, t) {
	return e != null && JD(e, t, XD);
}
var QD = 1,
	eB = 2;
function tB(e, t) {
	return kf(e) && B5(t)
		? P5(E0(e), t)
		: function (r) {
				var n = xC(r, e);
				return n === void 0 && n === t ? ZD(r, e) : Rf(t, n, QD | eB);
		  };
}
function rB(e) {
	return function (t) {
		return t == null ? void 0 : t[e];
	};
}
function nB(e) {
	return function (t) {
		return h5(t, e);
	};
}
function iB(e) {
	return kf(e) ? rB(E0(e)) : nB(e);
}
function aB(e) {
	return typeof e == "function"
		? e
		: e == null
		? AO
		: typeof e == "object"
		? nr(e)
			? tB(e[0], e[1])
			: KD(e)
		: iB(e);
}
function sB(e) {
	return function (t, r, n) {
		for (var i = -1, a = Object(t), s = n(t), o = s.length; o--; ) {
			var l = s[e ? o : ++i];
			if (r(a[l], l, a) === !1) break;
		}
		return t;
	};
}
var oB = sB();
const lB = oB;
function cB(e, t) {
	return e && lB(e, t, Tf);
}
function uB(e, t) {
	return function (r, n) {
		if (r == null) return r;
		if (!_0(r)) return e(r, n);
		for (
			var i = r.length, a = t ? i : -1, s = Object(r);
			(t ? a-- : ++a < i) && n(s[a], a, s) !== !1;

		);
		return r;
	};
}
var fB = uB(cB);
const dB = fB;
function hB(e, t) {
	var r = -1,
		n = _0(e) ? Array(e.length) : [];
	return (
		dB(e, function (i, a, s) {
			n[++r] = t(i, a, s);
		}),
		n
	);
}
function pB(e, t) {
	var r = nr(e) ? r5 : hB;
	return r(e, aB(t));
}
var mB = "[object Map]",
	gB = "[object Set]",
	yB = Object.prototype,
	bB = yB.hasOwnProperty;
function vB(e) {
	if (e == null) return !0;
	if (
		_0(e) &&
		(nr(e) ||
			typeof e == "string" ||
			typeof e.splice == "function" ||
			Bo(e) ||
			xf(e) ||
			Ef(e))
	)
		return !e.length;
	var t = zc(e);
	if (t == mB || t == gB) return !e.size;
	if (o5(e)) return !f5(e).length;
	for (var r in e) if (bB.call(e, r)) return !1;
	return !0;
}
function _s(e, t = !1) {
	return v0(e)
		? Object.entries(e).reduce((r, n) => {
				const i = Zn(String(n[0]));
				return (r[i] = t ? _s(n[1]) : n[1]), r;
		  }, {})
		: e;
}
function rp(e) {
	let t;
	Array.isArray(e.data) ? (t = e.data) : (t = [e.data]);
	const r = e.included || [],
		n = [],
		i = {};
	return (
		t.forEach((a) => {
			_B(n, a), np(i, a);
		}),
		r.forEach((a) => {
			np(i, a);
		}),
		{ result: n, resources: i }
	);
}
function _B(e, t) {
	const { type: r, id: n } = t;
	e.push({ type: r, id: n });
}
function np(e, t) {
	const {
			type: r,
			id: n,
			attributes: i,
			meta: a,
			links: s,
			relationships: o,
		} = t,
		l = Zn(r);
	return (
		e[l] || (e[l] = {}),
		(e[l][n] = {
			id: n,
			type: r,
			attributes: _s(i || {}),
			relationships: wB(o) || {},
			meta: a,
			links: s,
		}),
		e
	);
}
function wB(e) {
	if (!e) return;
	const t = {};
	return (
		Object.keys(e).map((r) => {
			const n = Zn(r);
			t[n] = e[r];
		}),
		t
	);
}
const SB = 10;
function EB(e, t, r, n) {
	return e.map((i) => L5(i, t, r, n)).filter((i) => !!i);
}
function L5(e, t, r, n) {
	return $c(e, t, r, n);
}
function xB(e, t, r = 0, n) {
	return e.map((i) => z5(i, t, r, n));
}
function z5(e, t, r = 0, n) {
	const i = t[Zn(e.type)][e.id];
	if ((typeof r == "number" ? r++ : (r = 1), r > SB)) return { ...i };
	let a = { type: i.type, meta: i.meta, id: i.id, ..._s(i.attributes) };
	return (
		i.relationships &&
			(a = Object.keys(i.relationships).reduce((s, o) => {
				const l = i.relationships[o].data;
				let c;
				return (
					vB(l) || (c = Array.isArray(l) ? EB(l, t, r, n) : L5(l, t, r, n)),
					{ ...s, [Zn(o)]: c ?? l }
				);
			}, a)),
		n && (a = { ...a, ...n(a) }),
		a
	);
}
function $c(e, t, r = 0, n) {
	return Array.isArray(e) ? xB(e, t, r, n) : z5(e, t, r, n);
}
function x0(e, t) {
	const r = Array.isArray(e) ? pB(e, t) : [];
	return [...new Set(r)];
}
function TB(e, t = "default") {
	return Array.isArray(e.blocks)
		? e.blocks
				.filter((r) => r.editorName === t)
				.sort((r, n) => r.position - n.position)
		: [];
}
function kB(e) {
	if (!e.blocks) return {};
	const t = {};
	return (
		Array.isArray(e.blocks) &&
			x0(e.blocks, "editorName").map((r) => {
				t[Zn(r)] = TB(e, r);
			}),
		t
	);
}
function AB(e, t) {
	var r;
	const n = ((r = e.meta) == null ? void 0 : r.browsers) || null;
	return e.relatedItems
		.filter((i) => i.browserName === t)
		.sort((i, a) => i.position - a.position)
		.map((i) => i.related)
		.filter((i) =>
			i
				? i.type !== "blocks"
					? !0
					: n !== null && n[t] && n[t].includes(parseInt(i.id))
				: null
		);
}
function RB(e) {
	if (!e.relatedItems) return {};
	const t = {};
	return (
		Array.isArray(e == null ? void 0 : e.relatedItems) &&
			x0(e.relatedItems, "browserName").map((r) => {
				t[Zn(r)] = AB(e, r);
			}),
		t
	);
}
function MB(e, t) {
	const r = {};
	return (
		Array.isArray(e.files) &&
			e.files
				.filter((n) => n.meta.role === t)
				.map((n) => {
					r[n.meta.uuid] = n;
				}),
		Object.values(r)
	);
}
function OB(e) {
	if (!e.files) return {};
	const t = Array.isArray(e.files) ? x0(e.files, "meta.role") : [],
		r = {};
	return (
		t.map((n) => {
			r[n] = MB(e, n);
		}),
		_s(r)
	);
}
function NB(e) {
	if (!e.media) return {};
	const t = Array.isArray(e.media) ? x0(e.media, "meta.role") : [],
		r = {};
	return (
		t.map((n) => {
			r[n] = CB(e, n);
		}),
		_s(r)
	);
}
function CB(e, t) {
	if (!e.media) return [];
	const r = {};
	return (
		e.media
			.filter((n) => n.meta.role === t)
			.map((n) => {
				r[n.meta.uuid] || (r[n.meta.uuid] = {}),
					(r[n.meta.uuid][n.meta.crop] = n);
			}),
		Object.values(r)
	);
}
const ip = (e) => {
		const t = {};
		return (
			Array.isArray(e.blocks) && (t.blocks = kB(e)),
			Array.isArray(e.media) && (t.media = NB(e)),
			Array.isArray(e.relatedItems) && (t.relatedItems = RB(e)),
			Array.isArray(e.files) && (t.files = OB(e)),
			t
		);
	},
	IB = (e) => {
		const { url: t, prefix: r, version: n, token: i } = e,
			a = `${t}${r}/${n}`,
			s = { Accept: "application/vnd.api+json" };
		return (
			i && (s.Authorization = `Bearer ${i}`),
			{
				get: (o) => new pa({ path: o, headers: s }),
				find: (o) => new pa({ path: o, baseURL: a, headers: s }),
				findOne: (o, l) =>
					new pa({ path: `${o}/${l}`, baseURL: a, headers: s }),
				findRelated: (o, l) => {
					var c, u;
					const d =
						(u = (c = l.relationships[o]) == null ? void 0 : c.links) == null
							? void 0
							: u.related;
					return d ? new pa({ path: d, headers: s }) : null;
				},
				findRelationship: (o, l) => {
					var c, u;
					const d =
						(u = (c = l.relationships[o]) == null ? void 0 : c.links) == null
							? void 0
							: u.self;
					return d ? new pa({ path: d, headers: s }) : null;
				},
				normalize: rp,
				deserialize: $c,
				extract: ip,
				transform: (o) => {
					const l = rp(o);
					return $c(l.result, l.resources, 0, ip);
				},
			}
		);
	},
	DB = Ct((e) => {
		const t = e.$config,
			r = Q4(t);
		return { provide: { twill: IB(r) } };
	}),
	BB = [_y, r8, Mb, Ob, qb, Gb, Yb, FS, HS, WE, KE, XE, EA, DB],
	PB = (e, t) =>
		t.path
			.replace(/(:\w+)\([^)]+\)/g, "$1")
			.replace(/(:\w+)[?+*]/g, "$1")
			.replace(/:\w+/g, (r) => {
				var n;
				return (
					((n = e.params[r.slice(1)]) == null ? void 0 : n.toString()) || ""
				);
			}),
	LB = (e, t) => {
		const r = e.route.matched.find((i) => {
				var a;
				return (
					((a = i.components) == null ? void 0 : a.default) === e.Component.type
				);
			}),
			n = t ?? (r == null ? void 0 : r.meta.key) ?? (r && PB(e.route, r));
		return typeof n == "function" ? n(e.route) : n;
	},
	zB = (e, t) => ({ default: () => (e ? er(r6, e === !0 ? {} : e, t) : t) }),
	$B = Lr({
		name: "FragmentWrapper",
		setup(e, { slots: t }) {
			return () => {
				var r;
				return (r = t.default) == null ? void 0 : r.call(t);
			};
		},
	}),
	Fc = (e, t, r) => ({
		default: () => (t ? er(e, t === !0 ? {} : t, r) : er($B, {}, r)),
	}),
	FB = Lr({
		name: "NuxtPage",
		inheritAttrs: !1,
		props: {
			name: { type: String },
			transition: { type: [Boolean, Object], default: void 0 },
			keepalive: { type: [Boolean, Object], default: void 0 },
			route: { type: Object },
			pageKey: { type: [Function, String], default: null },
		},
		setup(e, { attrs: t }) {
			const r = Re();
			return () =>
				er(
					Km,
					{ name: e.name, route: e.route, ...t },
					{
						default: (n) => {
							if (!n.Component) return;
							const i = LB(n, e.pageKey),
								a = r.deferHydration(),
								s = !!(e.transition ?? n.route.meta.pageTransition ?? ql),
								o =
									s &&
									UB(
										[
											e.transition,
											n.route.meta.pageTransition,
											ql,
											{
												onAfterLeave: () => {
													r.callHook("page:transition:finish", n.Component);
												},
											},
										].filter(Boolean)
									);
							return Fc(
								Xo,
								s && o,
								zB(
									e.keepalive ?? n.route.meta.keepalive ?? e8,
									er(
										Lp,
										{
											onPending: () => r.callHook("page:start", n.Component),
											onResolve: () => {
												vn(() =>
													r.callHook("page:finish", n.Component).finally(a)
												);
											},
										},
										{
											default: () =>
												er(jB, {
													key: i,
													routeProps: n,
													pageKey: i,
													hasTransition: s,
												}),
										}
									)
								)
							).default();
						},
					}
				);
		},
	});
function HB(e) {
	return Array.isArray(e) ? e : e ? [e] : [];
}
function UB(e) {
	const t = e.map((r) => ({ ...r, onAfterLeave: HB(r.onAfterLeave) }));
	return yu(...t);
}
const jB = Lr({
		name: "RouteProvider",
		props: ["routeProps", "pageKey", "hasTransition"],
		setup(e) {
			const t = e.pageKey,
				r = e.routeProps.route,
				n = {};
			for (const i in e.routeProps.route)
				n[i] = Et(() => (t === e.pageKey ? e.routeProps.route[i] : r[i]));
			return Ei("_route", pr(n)), () => er(e.routeProps.Component);
		},
	}),
	qB = Lr({
		name: "LayoutLoader",
		inheritAttrs: !1,
		props: { name: String },
		async setup(e, t) {
			const r = await hi[e.name]().then((n) => n.default || n);
			return () => er(r, t.attrs, t.slots);
		},
	}),
	GB = Lr({
		name: "NuxtLayout",
		inheritAttrs: !1,
		props: { name: { type: [String, Boolean, Object], default: null } },
		setup(e, t) {
			const r = Lt("_route"),
				n = r === bu() ? ab() : r,
				i = Et(() => ct(e.name) ?? n.meta.layout ?? "default");
			return () => {
				const a = i.value && i.value in hi,
					s = n.meta.layoutTransition ?? Qy;
				return Fc(Xo, a && s, {
					default: () =>
						Fc(
							qB,
							a && { key: i.value, name: i.value, ...t.attrs },
							t.slots
						).default(),
				}).default();
			};
		},
	}),
	YB = (e) =>
		Object.fromEntries(Object.entries(e).filter(([, t]) => t !== void 0)),
	WB = (e, t) => (r, n) => (
		wb(() => e({ ...YB(r), ...n.attrs }, n)),
		() => {
			var i, a;
			return t
				? (a = (i = n.slots).default) == null
					? void 0
					: a.call(i)
				: null;
		}
	),
	VB = {
		accesskey: String,
		autocapitalize: String,
		autofocus: { type: Boolean, default: void 0 },
		class: [String, Object, Array],
		contenteditable: { type: Boolean, default: void 0 },
		contextmenu: String,
		dir: String,
		draggable: { type: Boolean, default: void 0 },
		enterkeyhint: String,
		exportparts: String,
		hidden: { type: Boolean, default: void 0 },
		id: String,
		inputmode: String,
		is: String,
		itemid: String,
		itemprop: String,
		itemref: String,
		itemscope: String,
		itemtype: String,
		lang: String,
		nonce: String,
		part: String,
		slot: String,
		spellcheck: { type: Boolean, default: void 0 },
		style: String,
		tabindex: String,
		title: String,
		translate: String,
	},
	KB = Lr({
		name: "Html",
		inheritAttrs: !1,
		props: {
			...VB,
			manifest: String,
			version: String,
			xmlns: String,
			renderPriority: [String, Number],
		},
		setup: WB((e) => ({ htmlAttrs: e }), !0),
	}),
	ap = [
		{
			code: "en",
			iso: "en-US",
			name: "English",
			messages: { global: { selected_lang: "Selected language:" } },
		},
		{
			code: "ja",
			iso: "ja-JP",
			name: "日本語",
			redirect: !0,
			messages: { global: { selected_lang: "選択中の言語：" } },
		},
		{
			code: "ko",
			iso: "ko-KR",
			name: "한국어",
			redirect: !0,
			messages: { global: { selected_lang: "선택한 언어：" } },
		},
		{
			code: "fr",
			iso: "fr-FR",
			name: "Français",
			redirect: !0,
			messages: { global: { selected_lang: "Langue sélectionnée:" } },
		},
		{
			code: "nl",
			iso: "nl-NL",
			name: "Nederlands",
			redirect: !0,
			messages: { global: { selected_lang: "Geselecteerde taal:" } },
		},
		{
			code: "de",
			iso: "de-DE",
			name: "Deutsch",
			redirect: !0,
			messages: { global: { selected_lang: "Ausgewählte Sprache:" } },
		},
		{
			code: "it",
			iso: "it-IT",
			name: "Italiano",
			redirect: !0,
			messages: { global: { selected_lang: "Lingua selezionata:" } },
		},
		{
			code: "hu",
			iso: "hu-HU",
			name: "Magyar",
			redirect: !0,
			messages: { global: { selected_lang: "Kiválasztott nyelv:" } },
		},
		{
			code: "pt",
			iso: "pt-PT",
			name: "Português",
			redirect: !0,
			messages: { global: { selected_lang: "Língua selecionada:" } },
		},
		{
			code: "es",
			iso: "es-ES",
			name: "Español",
			redirect: !0,
			messages: { global: { selected_lang: "Idioma seleccionado:" } },
		},
		{
			code: "pl",
			iso: "pl-PL",
			name: "Polski",
			redirect: !0,
			messages: { global: { selected_lang: "Wybrany język:" } },
		},
	],
	XB = Vo(
		"div",
		{ class: "fixed inset-0", "aria-hidden": "true", "data-document-bg": "" },
		null,
		-1
	),
	JB = { class: "relative bg-[color:var(--gray-000)]" },
	ZB = {
		__name: "app",
		setup(e) {
			const n = bu().fullPath.split("/")[1];
			let i = "en-US";
			return (
				ap.some((a) => a.code === n) && (i = ap.find((a) => a.code === n).iso),
				(a, s) => {
					const o = FB,
						l = GB,
						c = KB;
					return (
						sn(),
						Hn(
							c,
							{ lang: ct(i) },
							{
								default: ho(() => [
									XB,
									Vo("div", JB, [
										Ye(
											l,
											{ name: "app" },
											{ default: ho(() => [Ye(o)]), _: 1 }
										),
									]),
								]),
								_: 1,
							},
							8,
							["lang"]
						)
					);
				}
			);
		},
	},
	sp = {
		__name: "nuxt-root",
		setup(e) {
			const t = e6(() =>
					Ze(
						() => import("./error-component.231e0e24.js"),
						[
							"./error-component.231e0e24.js",
							"./Footer.e6485fe5.js",
							"./usePageTransition.c85436b5.js",
							"./Footer.9aabec20.css",
							"./useAsyncNavigationData.564096b3.js",
							"./lang.4a9029fb.js",
						],
						import.meta.url
					).then((o) => o.default || o)
				),
				r = () => null,
				n = Re(),
				i = n.deferHydration();
			Ei("_route", bu()),
				n.hooks.callHookWith((o) => o.map((l) => l()), "vue:setup");
			const a = Qo();
			Vp((o, l, c) => {
				n.hooks
					.callHook("vue:error", o, l, c)
					.catch((u) => console.error("[nuxt] Error in `vue:error` hook", u)),
					ub(o) && (o.fatal || o.unhandled) && Tr(n, di, [o]);
			});
			const { islandContext: s } = !1;
			return (o, l) => (
				sn(),
				Hn(
					Lp,
					{ onResolve: ct(i) },
					{
						default: ho(() => [
							ct(a)
								? (sn(),
								  Hn(ct(t), { key: 0, error: ct(a) }, null, 8, ["error"]))
								: ct(s)
								? (sn(),
								  Hn(ct(r), { key: 1, context: ct(s) }, null, 8, ["context"]))
								: (sn(), Hn(ct(ZB), { key: 2 })),
						]),
						_: 1,
					},
					8,
					["onResolve"]
				)
			);
		},
	};
globalThis.$fetch || (globalThis.$fetch = ty.create({ baseURL: ny() }));
let op;
const QB = vy(BB);
(op = async function () {
	var i;
	const r = Boolean((i = window.__NUXT__) == null ? void 0 : i.serverRendered)
			? g7(sp)
			: m7(sp),
		n = gy({ vueApp: r });
	try {
		await by(n, QB);
	} catch (a) {
		await n.callHook("app:error", a), (n.payload.error = n.payload.error || a);
	}
	try {
		await n.hooks.callHook("app:created", r),
			await n.hooks.callHook("app:beforeMount", r),
			r.mount("#" + t8),
			await n.hooks.callHook("app:mounted", r),
			await vn();
	} catch (a) {
		await n.callHook("app:error", a), (n.payload.error = n.payload.error || a);
	}
}),
	op().catch((e) => {
		console.error("Error while mounting app:", e);
	});
export {
	J_ as $,
	xi as A,
	oc as B,
	aP as C,
	bP as D,
	st as E,
	Ot as F,
	lP as G,
	wP as H,
	N6 as I,
	Lo as J,
	AS as K,
	s0 as L,
	RS as M,
	xP as N,
	l_ as O,
	rg as P,
	vP as Q,
	Ka as R,
	Wp as S,
	MS as T,
	w7 as U,
	fb as V,
	G9 as W,
	G_ as X,
	B_ as Y,
	Y_ as Z,
	C_ as _,
	Ye as a,
	e6 as a0,
	Ze as a1,
	dP as a2,
	Z9 as a3,
	t_ as a4,
	J9 as a5,
	Xo as a6,
	nP as a7,
	iP as a8,
	Zm as a9,
	eg as aa,
	tg as ab,
	gP as ac,
	Lr as ad,
	_P as ae,
	vn as af,
	Tp as ag,
	ds as ah,
	Kn as ai,
	er as aj,
	sP as ak,
	wo as al,
	Jo as am,
	An as an,
	i6 as ao,
	uP as ap,
	De as aq,
	pP as ar,
	rP as as,
	yP as at,
	K_ as au,
	EP as av,
	Vo as b,
	fP as c,
	ct as d,
	um as e,
	bu as f,
	au as g,
	Re as h,
	Hn as i,
	ho as j,
	zo as k,
	ap as l,
	hP as m,
	hb as n,
	sn as o,
	eP as p,
	O6 as q,
	_i as r,
	di as s,
	tP as t,
	wb as u,
	oP as v,
	mP as w,
	cP as x,
	Et as y,
	Yo as z,
};
