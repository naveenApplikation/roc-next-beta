if (!self.define) {
  let e,
    a = {};
  const s = (s, i) => (
    (s = new URL(s + ".js", i).href),
    a[s] ||
      new Promise((a) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = s), (e.onload = a), document.head.appendChild(e);
        } else (e = s), importScripts(s), a();
      }).then(() => {
        let e = a[s];
        if (!e) throw new Error(`Module ${s} didn’t register its module`);
        return e;
      })
  );
  self.define = (i, c) => {
    const t =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (a[t]) return;
    let n = {};
    const d = (e) => s(e, t),
      r = { module: { uri: t }, exports: n, require: d };
    a[t] = Promise.all(i.map((e) => r[e] || d(e))).then((e) => (c(...e), n));
  };
}
define(["./workbox-3c9d0171"], function (e) {
  "use strict";
  importScripts("/fallback-ce627215c0e4a9af.js"),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: "/ROC.png", revision: "ce1e3279e9c4891ebbde857eb7a344d4" },
        {
          url: "/_next/static/CsGfSsqm9Iy9j5oaCp7nW/_buildManifest.js",
          revision: "b8a108465e9c9fce1f1a0685ed16a1c7",
        },
        {
          url: "/_next/static/CsGfSsqm9Iy9j5oaCp7nW/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        {
          url: "/_next/static/chunks/155-3a95f1c11d23734d.js",
          revision: "CsGfSsqm9Iy9j5oaCp7nW",
        },
        {
          url: "/_next/static/chunks/18-dab2b9d32cd78eff.js",
          revision: "CsGfSsqm9Iy9j5oaCp7nW",
        },
        {
          url: "/_next/static/chunks/22-174abe2e29b33200.js",
          revision: "CsGfSsqm9Iy9j5oaCp7nW",
        },
        {
          url: "/_next/static/chunks/248f8154-8565bf35b68218ed.js",
          revision: "CsGfSsqm9Iy9j5oaCp7nW",
        },
        {
          url: "/_next/static/chunks/292-8334aefe62239c4d.js",
          revision: "CsGfSsqm9Iy9j5oaCp7nW",
        },
        {
          url: "/_next/static/chunks/3723546d-5b35a250b29856c2.js",
          revision: "CsGfSsqm9Iy9j5oaCp7nW",
        },
        {
          url: "/_next/static/chunks/3da0feb0-776a2c25d67e6712.js",
          revision: "CsGfSsqm9Iy9j5oaCp7nW",
        },
        {
          url: "/_next/static/chunks/3de63b20-28398a4b1e5f012d.js",
          revision: "CsGfSsqm9Iy9j5oaCp7nW",
        },
        {
          url: "/_next/static/chunks/3f76de95-97d3646a082c819e.js",
          revision: "CsGfSsqm9Iy9j5oaCp7nW",
        },
        {
          url: "/_next/static/chunks/445.c85174296e27adc7.js",
          revision: "c85174296e27adc7",
        },
        {
          url: "/_next/static/chunks/44c83eb9-0cbea8fede563d38.js",
          revision: "CsGfSsqm9Iy9j5oaCp7nW",
        },
        {
          url: "/_next/static/chunks/46a1adcb-7f2da0e03c14f15d.js",
          revision: "CsGfSsqm9Iy9j5oaCp7nW",
        },
        {
          url: "/_next/static/chunks/474-ea98f80b52072e5f.js",
          revision: "CsGfSsqm9Iy9j5oaCp7nW",
        },
        {
          url: "/_next/static/chunks/491-90f730b35524f24c.js",
          revision: "CsGfSsqm9Iy9j5oaCp7nW",
        },
        {
          url: "/_next/static/chunks/525.aacac23e0c515d3f.js",
          revision: "aacac23e0c515d3f",
        },
        {
          url: "/_next/static/chunks/58-2fb395a120c1e479.js",
          revision: "CsGfSsqm9Iy9j5oaCp7nW",
        },
        {
          url: "/_next/static/chunks/5fb86971-7166717b25fa4385.js",
          revision: "CsGfSsqm9Iy9j5oaCp7nW",
        },
        {
          url: "/_next/static/chunks/605-bc243f2278ac5d60.js",
          revision: "CsGfSsqm9Iy9j5oaCp7nW",
        },
        {
          url: "/_next/static/chunks/645-c9d15edd20521bcd.js",
          revision: "CsGfSsqm9Iy9j5oaCp7nW",
        },
        {
          url: "/_next/static/chunks/65-264ea10cdc61b142.js",
          revision: "CsGfSsqm9Iy9j5oaCp7nW",
        },
        {
          url: "/_next/static/chunks/662.f543c336329ec1d4.js",
          revision: "f543c336329ec1d4",
        },
        {
          url: "/_next/static/chunks/668.ba9b1b1d3fbae846.js",
          revision: "ba9b1b1d3fbae846",
        },
        {
          url: "/_next/static/chunks/678-46e46581cc29aed7.js",
          revision: "CsGfSsqm9Iy9j5oaCp7nW",
        },
        {
          url: "/_next/static/chunks/70d9dfd6-5c143bf62376a003.js",
          revision: "CsGfSsqm9Iy9j5oaCp7nW",
        },
        {
          url: "/_next/static/chunks/766-0295e00d0fb3b5db.js",
          revision: "CsGfSsqm9Iy9j5oaCp7nW",
        },
        {
          url: "/_next/static/chunks/819fb543-901c8e135da63f26.js",
          revision: "CsGfSsqm9Iy9j5oaCp7nW",
        },
        {
          url: "/_next/static/chunks/915.92ff8f590f1e3b7b.js",
          revision: "92ff8f590f1e3b7b",
        },
        {
          url: "/_next/static/chunks/93175576-3389fbfcaeef8cfa.js",
          revision: "CsGfSsqm9Iy9j5oaCp7nW",
        },
        {
          url: "/_next/static/chunks/988.923fdf4723d86aee.js",
          revision: "923fdf4723d86aee",
        },
        {
          url: "/_next/static/chunks/a8043795-9db016bc9d22b1fc.js",
          revision: "CsGfSsqm9Iy9j5oaCp7nW",
        },
        {
          url: "/_next/static/chunks/app/_not-found-3694c430f9c88235.js",
          revision: "CsGfSsqm9Iy9j5oaCp7nW",
        },
        {
          url: "/_next/static/chunks/app/categories/%5BeventName%5D/page-4d543d2fd5aace81.js",
          revision: "CsGfSsqm9Iy9j5oaCp7nW",
        },
        {
          url: "/_next/static/chunks/app/error-1d503b7d2d9144b5.js",
          revision: "CsGfSsqm9Iy9j5oaCp7nW",
        },
        {
          url: "/_next/static/chunks/app/layout-a3c1b7ddd9b21c90.js",
          revision: "CsGfSsqm9Iy9j5oaCp7nW",
        },
        {
          url: "/_next/static/chunks/app/page-2598bc8bf042031f.js",
          revision: "CsGfSsqm9Iy9j5oaCp7nW",
        },
        {
          url: "/_next/static/chunks/app/screens/%5Bevents%5D/page-74d88d6eeb0dae9d.js",
          revision: "CsGfSsqm9Iy9j5oaCp7nW",
        },
        {
          url: "/_next/static/chunks/app/screens/createList/page-11550e88af6b4526.js",
          revision: "CsGfSsqm9Iy9j5oaCp7nW",
        },
        {
          url: "/_next/static/chunks/app/screens/directoryList/page-22807bcb56c463af.js",
          revision: "CsGfSsqm9Iy9j5oaCp7nW",
        },
        {
          url: "/_next/static/chunks/b27dc69b-2a83f3b538944dfe.js",
          revision: "CsGfSsqm9Iy9j5oaCp7nW",
        },
        {
          url: "/_next/static/chunks/c465da65-b235ae3a7fab59e6.js",
          revision: "CsGfSsqm9Iy9j5oaCp7nW",
        },
        {
          url: "/_next/static/chunks/cacb533c-150c7ec60ce79047.js",
          revision: "CsGfSsqm9Iy9j5oaCp7nW",
        },
        {
          url: "/_next/static/chunks/da31e3a9-eb423faf1b1f0148.js",
          revision: "CsGfSsqm9Iy9j5oaCp7nW",
        },
        {
          url: "/_next/static/chunks/e1bbbf97-bc132a706e456835.js",
          revision: "CsGfSsqm9Iy9j5oaCp7nW",
        },
        {
          url: "/_next/static/chunks/framework-ded83d71b51ce901.js",
          revision: "CsGfSsqm9Iy9j5oaCp7nW",
        },
        {
          url: "/_next/static/chunks/main-7ca256bfbb1f42d6.js",
          revision: "CsGfSsqm9Iy9j5oaCp7nW",
        },
        {
          url: "/_next/static/chunks/main-app-adbdf175659cbe77.js",
          revision: "CsGfSsqm9Iy9j5oaCp7nW",
        },
        {
          url: "/_next/static/chunks/pages/_app-caa34081fffab5ed.js",
          revision: "CsGfSsqm9Iy9j5oaCp7nW",
        },
        {
          url: "/_next/static/chunks/pages/_error-12cfca9c593cf8a1.js",
          revision: "CsGfSsqm9Iy9j5oaCp7nW",
        },
        {
          url: "/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",
          revision: "837c0df77fd5009c9e46d446188ecfd0",
        },
        {
          url: "/_next/static/chunks/webpack-60eb65d0e0771bb8.js",
          revision: "CsGfSsqm9Iy9j5oaCp7nW",
        },
        {
          url: "/_next/static/css/095ebbe6c448bc4b.css",
          revision: "095ebbe6c448bc4b",
        },
        {
          url: "/_next/static/css/19484ee71a073f60.css",
          revision: "19484ee71a073f60",
        },
        {
          url: "/_next/static/css/1be0e9294ba76caa.css",
          revision: "1be0e9294ba76caa",
        },
        {
          url: "/_next/static/css/5ef1019dd2f2a6a4.css",
          revision: "5ef1019dd2f2a6a4",
        },
        {
          url: "/_next/static/css/9581205490783a34.css",
          revision: "9581205490783a34",
        },
        {
          url: "/_next/static/css/abae58cd3ed4d7b1.css",
          revision: "abae58cd3ed4d7b1",
        },
        {
          url: "/_next/static/media/03394d20c28fe439-s.p.ttf",
          revision: "7a177fa21fece72dfaa5639d8f1c114a",
        },
        {
          url: "/_next/static/media/05a31a2ca4975f99-s.woff2",
          revision: "f1b44860c66554b91f3b1c81556f73ca",
        },
        {
          url: "/_next/static/media/1282ebc61b96a9d9-s.p.ttf",
          revision: "ea5879884a95551632e9eb1bba5b2128",
        },
        {
          url: "/_next/static/media/513657b02c5c193f-s.woff2",
          revision: "c4eb7f37bc4206c901ab08601f21f0f2",
        },
        {
          url: "/_next/static/media/51ed15f9841b9f9d-s.woff2",
          revision: "bb9d99fb9bbc695be80777ca2c1c2bee",
        },
        {
          url: "/_next/static/media/524c2f2ba740ce37-s.p.ttf",
          revision: "465266b2b986e33ef7e395f4df87b300",
        },
        {
          url: "/_next/static/media/8d213a541b09f168-s.p.ttf",
          revision: "cad1054327a25f42f2447d1829596bfe",
        },
        {
          url: "/_next/static/media/Authorcomment.c8365666.svg",
          revision: "e34e556d56e89f6087fc20638b32663b",
        },
        {
          url: "/_next/static/media/BlackStar.76be1611.svg",
          revision: "cfb57c9d56c8db93192d5a1431699144",
        },
        {
          url: "/_next/static/media/CommentRatingImage.4bc65a80.png",
          revision: "1a5cd19fa0905e1579454f271720cfd1",
        },
        { url: "/_next/static/media/Inter.1282ebc6.ttf", revision: "1282ebc6" },
        {
          url: "/_next/static/media/La Hougue Bie.5389b901.svg",
          revision: "36cfd0b5ee7c95254e5c5cb28ac98a48",
        },
        {
          url: "/_next/static/media/LogoNew.2e3c4b4c.svg",
          revision: "b6bb34d85ec5affc77032b154ba50ee1",
        },
        {
          url: "/_next/static/media/MaskGroup.a299f5fe.svg",
          revision: "73510fe9bcbc438ac31d827935c7d912",
        },
        {
          url: "/_next/static/media/MobileMap.5408a0dd.svg",
          revision: "256a11cdbbacae20a18073b820bd1512",
        },
        {
          url: "/_next/static/media/MobileProfile.5c426fa2.svg",
          revision: "413462b128b40a79a35a616e81cce3d4",
        },
        {
          url: "/_next/static/media/MobileRocLogo.7de5bf0d.svg",
          revision: "8c377b3475015a67e00d7740ebe13539",
        },
        {
          url: "/_next/static/media/MobileStore.da2fdcd7.svg",
          revision: "1f990c1c9a66371f577581e844ed2799",
        },
        {
          url: "/_next/static/media/Mobilecalendar.d4fa87ac.svg",
          revision: "b137b762a818becad04c12866952ffa2",
        },
        {
          url: "/_next/static/media/Mobilecastle.26572543.svg",
          revision: "e25c0e084379297961ceeb640a4febd6",
        },
        {
          url: "/_next/static/media/Mobileutensils.91fc96a8.svg",
          revision: "82725692b99c529627b49d254be95c69",
        },
        {
          url: "/_next/static/media/NewLogoRoc.4ca9eaf4.svg",
          revision: "10b0ea0e603f0223569b021e349778a6",
        },
        {
          url: "/_next/static/media/Proxima Nova Font.f6846059.otf",
          revision: "f6846059",
        },
        {
          url: "/_next/static/media/ROCLogo.ab8edb66.svg",
          revision: "3d393102afa0e0e02b1c39277d04e0da",
        },
        {
          url: "/_next/static/media/ROCLogoWhite.3e6739f2.svg",
          revision: "ae7f35730606944fa5a835fa145500d3",
        },
        {
          url: "/_next/static/media/Store.da771769.svg",
          revision: "94a605d116924eaec9936e62cc63271c",
        },
        {
          url: "/_next/static/media/activity.ab8816d2.png",
          revision: "feca828741d0c40e1b90086c4d9a48f9",
        },
        {
          url: "/_next/static/media/arrow-bottom.8f1f5d48.svg",
          revision: "233b05a85db7f60420af8a4c18e150a4",
        },
        {
          url: "/_next/static/media/arrow-left.04769b43.svg",
          revision: "335a7ee40bbbe29f2cb2442e0810a044",
        },
        {
          url: "/_next/static/media/arrow-right.11cf9c8f.svg",
          revision: "1a5b38c5ff981be49a7dde9ae68c5884",
        },
        {
          url: "/_next/static/media/arrow-top.e3f623a0.svg",
          revision: "1c3d830320a0160277db748dc427a090",
        },
        {
          url: "/_next/static/media/associate.d0782b91.svg",
          revision: "10100e481aadb9f0f6fceee4eae92d7d",
        },
        {
          url: "/_next/static/media/attraction1.c737e6e4.jpg",
          revision: "e984333078ca4c5156bcd0ed30a1507c",
        },
        {
          url: "/_next/static/media/attraction2.496494ab.jpg",
          revision: "951cb060bf5ae083ffb18df3c6245daa",
        },
        {
          url: "/_next/static/media/attraction3.ac287529.jpg",
          revision: "fc350f038d0e6f717fae0a4770a372b5",
        },
        {
          url: "/_next/static/media/attraction4.09f7e5d9.jpg",
          revision: "2ec5be1f913cd948c0f77bdd1d540d94",
        },
        {
          url: "/_next/static/media/attraction5.d84b0837.jpg",
          revision: "4160106a60e3f25493f83368aff0c8cf",
        },
        {
          url: "/_next/static/media/attraction6.6b90d607.jpg",
          revision: "070946eedb319d68d0331635c5180d9b",
        },
        {
          url: "/_next/static/media/attraction7.39bd5531.jpg",
          revision: "c683e1371116bc62ebdc373e1208fe3a",
        },
        {
          url: "/_next/static/media/bar2.71452356.jpg",
          revision: "2acd45928efd31a2d4f68f2a9a18cbad",
        },
        {
          url: "/_next/static/media/bar3.506c0a1c.jpg",
          revision: "733f1bb1c78ef84efca22072a7b03638",
        },
        {
          url: "/_next/static/media/bar4.19bf22c8.jpg",
          revision: "25bfc289f498644d23630eddab3239fc",
        },
        {
          url: "/_next/static/media/bar5.a3dcf36f.jpg",
          revision: "bcf3744c9721bc10441768d1412b2849",
        },
        {
          url: "/_next/static/media/bar6.de1a349a.jpg",
          revision: "73a4b86718f32e00c2024a1e7d7172d8",
        },
        {
          url: "/_next/static/media/betaHigh.881d0e7a.svg",
          revision: "328971f5e686265805f4b77932a61b21",
        },
        {
          url: "/_next/static/media/blank.e5ed3ff3.svg",
          revision: "11fa565acd8eb4b60e1b22c0b77c2968",
        },
        {
          url: "/_next/static/media/book-open.061aaec0.svg",
          revision: "3a99516bdb474d5b89b5b2189102efdd",
        },
        {
          url: "/_next/static/media/c146dcab14729d84-s.p.ttf",
          revision: "ba74cc325d5f67d0efbeda51616352db",
        },
        {
          url: "/_next/static/media/c9a5bc6a7c948fb0-s.p.woff2",
          revision: "74c3556b9dad12fb76f84af53ba69410",
        },
        {
          url: "/_next/static/media/calendarImg.31cf5f55.png",
          revision: "31cba3a39e4b8b534ce029dc011c1779",
        },
        {
          url: "/_next/static/media/calendaras.d4fa87ac.svg",
          revision: "b137b762a818becad04c12866952ffa2",
        },
        {
          url: "/_next/static/media/camera-retro.57f9c28f.svg",
          revision: "842cbae230f6b38a0a7f21929fb84d7e",
        },
        {
          url: "/_next/static/media/cart-shopping.0f0deabc.png",
          revision: "9d7f76d31e355812488b64d90347f14c",
        },
        {
          url: "/_next/static/media/cart-shopping.327f23d7.svg",
          revision: "6d120c7e21a99c66b5ed3db0cbcf99cc",
        },
        {
          url: "/_next/static/media/cart-shoppings.a3fb08b5.svg",
          revision: "cd499858621ee25f5a52e3776df8329a",
        },
        {
          url: "/_next/static/media/cart-shoppingsa.e7361068.svg",
          revision: "ba2e135bc85ff10921e6bba142b548a5",
        },
        {
          url: "/_next/static/media/cart-shoppingsas.82d2fb24.svg",
          revision: "51514e5d7a3ae38b4bb180330a34aada",
        },
        {
          url: "/_next/static/media/cart-shoppingsw.25f426b5.svg",
          revision: "f0d5002fc5ebd2cf992b966190afe1b2",
        },
        {
          url: "/_next/static/media/cartShoppingFrog.8dd3e15f.svg",
          revision: "eb00baf46806c3715e9525586041a4df",
        },
        {
          url: "/_next/static/media/castle.3aa7d8f8.svg",
          revision: "88eb2cb0f35599f601f477763d8e4625",
        },
        {
          url: "/_next/static/media/cb018e4d77df9451-s.p.otf",
          revision: "62d4d7d369292a9bf23762465ec6d704",
        },
        {
          url: "/_next/static/media/check.cd11087e.png",
          revision: "1e44718868c15568cd13e684f91bb4ff",
        },
        {
          url: "/_next/static/media/chevron-right.83aebbd3.png",
          revision: "bcd6fa256eb6fcdc41a730b3cc54fee8",
        },
        {
          url: "/_next/static/media/chevronRight.3e7ac35b.svg",
          revision: "3f2200a7bea80cbfdd1eff2e6183aad6",
        },
        {
          url: "/_next/static/media/clocks.29264c2a.svg",
          revision: "13535741fda3e33dec59a31b9109a52a",
        },
        {
          url: "/_next/static/media/closeModal.36a03144.svg",
          revision: "143cda6ad6e3cfe4ff784f4f3aa02d20",
        },
        {
          url: "/_next/static/media/comment.39dc120e.svg",
          revision: "12602e2991ccb0d1fe9a6755861b1584",
        },
        {
          url: "/_next/static/media/comment.ad330ef3.svg",
          revision: "eb1fa08b2fedb9ddb1e703e108aad06e",
        },
        {
          url: "/_next/static/media/commentstar.e318a14e.svg",
          revision: "08478f98de699269132402d81a5c0b10",
        },
        {
          url: "/_next/static/media/compass.4cb60130.svg",
          revision: "3602052e73d5cbeb3e32ce14ccd48b44",
        },
        {
          url: "/_next/static/media/contactUs.2f99af80.png",
          revision: "2839d4fddca708155cb6b7c93c8b99a2",
        },
        {
          url: "/_next/static/media/createList.b2f82fbe.png",
          revision: "a2372c13b927a8fe9d12ff9e895a049d",
        },
        {
          url: "/_next/static/media/currency.7bb567b3.svg",
          revision: "3c7adbd353dccb535dc4e5b6769c6b7b",
        },
        {
          url: "/_next/static/media/currencySign.a10e3a54.png",
          revision: "1b3573f8973807c5690e67af5d0aac70",
        },
        {
          url: "/_next/static/media/cycle.4c2a0c0a.svg",
          revision: "f9739d4d4687dfa06152215526f38d30",
        },
        {
          url: "/_next/static/media/cycleBlack.d1821b3e.svg",
          revision: "9725f2e571d52734bf2ac9867111b837",
        },
        {
          url: "/_next/static/media/d6b16ce4a6175f26-s.woff2",
          revision: "dd930bafc6297347be3213f22cc53d3e",
        },
        {
          url: "/_next/static/media/dragIcon.74586f5a.png",
          revision: "66060572d74a2ef8fca78c6411fa3d56",
        },
        {
          url: "/_next/static/media/ec159349637c90ad-s.woff2",
          revision: "0e89df9522084290e01e4127495fae99",
        },
        {
          url: "/_next/static/media/ellipsis.a57f11fc.svg",
          revision: "79a891474fb1ffaed21270a04e647eca",
        },
        {
          url: "/_next/static/media/email.09ff8e80.svg",
          revision: "cc6eafe9fa7c8675acb1eb002078ec76",
        },
        {
          url: "/_next/static/media/email.6970eb90.png",
          revision: "00ef554266542d98e3353d9389f1e97c",
        },
        {
          url: "/_next/static/media/emailPreference.cbc9e196.png",
          revision: "db84eb873f153609e628af27d0bfd113",
        },
        {
          url: "/_next/static/media/event.fd4b4dff.svg",
          revision: "bad3f4428a0ee466dfb72867bf3aabbe",
        },
        {
          url: "/_next/static/media/facebook.db649148.svg",
          revision: "d47ba7ee8a96148d867f46050cd33d97",
        },
        {
          url: "/_next/static/media/fallbackimage.0dbd6a1b.png",
          revision: "93587c9fef462380fb4d6a01e3bd9c43",
        },
        {
          url: "/_next/static/media/family.c0cb7f3e.svg",
          revision: "82bcbbda0276ad120f74d74bd6635f81",
        },
        {
          url: "/_next/static/media/family1.60fe9032.jpg",
          revision: "68ee84edc04786782e16e81fee4b2f28",
        },
        {
          url: "/_next/static/media/family3.b105e790.jpg",
          revision: "537300803ff4d75bd273b9623f9a233c",
        },
        {
          url: "/_next/static/media/family4.1d780b39.jpg",
          revision: "5340e54edc941d5a8840fd8003729103",
        },
        {
          url: "/_next/static/media/family5.9e8c32bf.jpg",
          revision: "68558d3ef1334dcc6d78e7b847ed84db",
        },
        {
          url: "/_next/static/media/family6.a1a4816f.jpg",
          revision: "402589c9d82e3d01b00e3248cf4b29c9",
        },
        {
          url: "/_next/static/media/fd4db3eb5472fc27-s.woff2",
          revision: "71f3fcaf22131c3368d9ec28ef839831",
        },
        {
          url: "/_next/static/media/filter.55a21c10.svg",
          revision: "b1cf9f5e97c3a71681180b56540c06b5",
        },
        {
          url: "/_next/static/media/filterSearch.8dac5aa0.svg",
          revision: "94522bc1d51c923e3a65b38dc89a98ed",
        },
        {
          url: "/_next/static/media/flight.fc135710.svg",
          revision: "ad02673a31c23a65b94114076d66a03c",
        },
        {
          url: "/_next/static/media/forwardNavigate.ad5a5271.png",
          revision: "069a9193f039241da85cbc564a70b10f",
        },
        {
          url: "/_next/static/media/furniture.4f452971.png",
          revision: "e10ecf6b1253afa1c79ac91effeee2cc",
        },
        {
          url: "/_next/static/media/garden_center.bde59dc5.png",
          revision: "0869c7714883f7bc712334542960c807",
        },
        {
          url: "/_next/static/media/giftIdeas.459d5edd.png",
          revision: "f1a3b1c16a68eea350a624a1dbafad0b",
        },
        {
          url: "/_next/static/media/globe.9b092f22.svg",
          revision: "5c7dccd2e00f0113f43230ff77ae749a",
        },
        {
          url: "/_next/static/media/globereal.4fd6024e.svg",
          revision: "8ab9ab92a228b03cde543216214b80f5",
        },
        {
          url: "/_next/static/media/greenGlocers.a573824b.png",
          revision: "42e2bbbc8df447fce4c39c993de6914b",
        },
        {
          url: "/_next/static/media/headerHome.27969275.svg",
          revision: "0c73ebe6313f83726ebf233962a17f92",
        },
        {
          url: "/_next/static/media/hiking.e427b8eb.svg",
          revision: "ff07067e8c1e919371b03c56a9dd6f06",
        },
        {
          url: "/_next/static/media/home.3d20e1c8.svg",
          revision: "6156a93fdf083a21eb6963066213a165",
        },
        {
          url: "/_next/static/media/homeBlack.54c6308f.svg",
          revision: "29b9b4d9a1372d542d9db3db3b1b7ed8",
        },
        {
          url: "/_next/static/media/homeware.192b1d99.png",
          revision: "a1dd938c8c20b9ee97605be6fb17f53c",
        },
        {
          url: "/_next/static/media/hotel.d4d4e4ac.svg",
          revision: "71fc51f8886b0e61683dade6da14c8fa",
        },
        {
          url: "/_next/static/media/icons8-logout-96.f894103a.png",
          revision: "e6620248307316fdfca7328f6bb417ed",
        },
        {
          url: "/_next/static/media/imagedsd.b55a5eab.svg",
          revision: "54962a19207cd197c5d52d65f9705e00",
        },
        {
          url: "/_next/static/media/info-circle.77ad1335.svg",
          revision: "1908231de6501f82452e50fd86605dac",
        },
        {
          url: "/_next/static/media/instagram.516c9aee.svg",
          revision: "4a6439c0d76fc2dd90b12f6d674484df",
        },
        {
          url: "/_next/static/media/lights-holiday.62d96685.svg",
          revision: "bd5622047eebd07ccfcd0add48fbd4c2",
        },
        {
          url: "/_next/static/media/linkedin.a45b25ea.svg",
          revision: "eec5ea8d0afbdaa2d7777c658069e9b4",
        },
        {
          url: "/_next/static/media/listStar.76e284f3.svg",
          revision: "4993c8d6644dafde809ea2ade3d67ea3",
        },
        {
          url: "/_next/static/media/localShops.4df9f10b.png",
          revision: "a57ee7e56fa5e8f71e6ed25aabe161dc",
        },
        {
          url: "/_next/static/media/location-dot.59451677.svg",
          revision: "c5bfa224b0aef061ec36b04b9c39181c",
        },
        {
          url: "/_next/static/media/location.06e3c21f.svg",
          revision: "965af54ceab0a271f967dff5cda99337",
        },
        {
          url: "/_next/static/media/locationMark.578adf5b.svg",
          revision: "58ac8c4cc0f9a5d3161daa8b0a364849",
        },
        {
          url: "/_next/static/media/logo-outline.4045b8c6.svg",
          revision: "bbc16e9b21c23ca975e4ec35934382ce",
        },
        {
          url: "/_next/static/media/logoBlack.cc24a4cf.svg",
          revision: "6cb8affc1c110a35d227f56b6ed129b2",
        },
        {
          url: "/_next/static/media/mapBlack.ebce5aa0.svg",
          revision: "8c8707df0c8e510ecac104f920503feb",
        },
        {
          url: "/_next/static/media/mapIcon.6d4fdbc4.svg",
          revision: "c9fd426ffa3b4fefd76f00ad4bdaa0d1",
        },
        {
          url: "/_next/static/media/mapIconDark.6bd43c92.svg",
          revision: "55e48b6603c7e8718b014a3f6b27ca34",
        },
        {
          url: "/_next/static/media/mapNew.1d1fe062.svg",
          revision: "7e3b602f1656b94be5da1004546d0b93",
        },
        {
          url: "/_next/static/media/mapWhite.e88d7c76.svg",
          revision: "8789e11e056a42dcf368a19403403140",
        },
        {
          url: "/_next/static/media/mensClothing.f199100c.png",
          revision: "baa0441dca7daf61faae279807ab8d25",
        },
        {
          url: "/_next/static/media/moped.198d06f7.png",
          revision: "75ec1d6fdacdd79b1f828cccd3ebd571",
        },
        {
          url: "/_next/static/media/moped.ae27860e.svg",
          revision: "cc7d7c22824fe0663799a6bbcc8d5baa",
        },
        {
          url: "/_next/static/media/more.3885475b.svg",
          revision: "bbb734380d2eac4412621b73bd0b8c31",
        },
        {
          url: "/_next/static/media/network.60d1ae78.svg",
          revision: "4b8c14ad7751f65058907705c208a6b9",
        },
        {
          url: "/_next/static/media/news.81396dcb.svg",
          revision: "9828070a4293170a074544252f492c6a",
        },
        {
          url: "/_next/static/media/parking.298197bf.png",
          revision: "3c51f4a2a533ced24ca611c3e850b2d6",
        },
        {
          url: "/_next/static/media/password.7470eb99.png",
          revision: "cb55fe982e69f75629aa44651244d9c0",
        },
        {
          url: "/_next/static/media/phone.54c2dfe1.svg",
          revision: "f6d007a8090eb565a23e01cd5d3411e1",
        },
        {
          url: "/_next/static/media/phone.ca3d8df5.svg",
          revision: "d6f17b96b9afc67741ded8d5e253ff78",
        },
        {
          url: "/_next/static/media/plus-circle.aecfd901.png",
          revision: "e64e33331db58de161adf3a772ea612b",
        },
        {
          url: "/_next/static/media/plus-circle.ba616eef.svg",
          revision: "c2b32da1f3a018debc68af36059abede",
        },
        {
          url: "/_next/static/media/plus-circle.f918888c.svg",
          revision: "a7a92bf573e159abf5fed958abb88aab",
        },
        {
          url: "/_next/static/media/pro.467b5e83.svg",
          revision: "f43c08bd00c31cff9ecd9293759bf70b",
        },
        {
          url: "/_next/static/media/profile.aac56926.png",
          revision: "f9c22e6e0b4fab57ba58da2f556f47ae",
        },
        {
          url: "/_next/static/media/profileBlack.5ad6514e.svg",
          revision: "4f52c876c3f2452c6975ab881f073312",
        },
        {
          url: "/_next/static/media/profileIcon.ff41ab71.svg",
          revision: "6f2fa1544a6caec5e1e64df99cce0f05",
        },
        {
          url: "/_next/static/media/profileIconDark.e38f720e.svg",
          revision: "5bdda2c058a92cb3ee9f15596fff00b1",
        },
        {
          url: "/_next/static/media/profileNew.c1f39576.svg",
          revision: "6a0af013b33668dc341299f357efce9a",
        },
        {
          url: "/_next/static/media/profileWhite.b755b03f.svg",
          revision: "1be593999a717c30c5355d33a6cb00ca",
        },
        {
          url: "/_next/static/media/profile_brown.cb6fe5f3.svg",
          revision: "775dbf9c28fbd76ef1f8561004a4d033",
        },
        {
          url: "/_next/static/media/purchaseImage.221d1ddb.png",
          revision: "6ff9d1251db46bb8e5286d38a0e305c6",
        },
        {
          url: "/_next/static/media/radio.3e2514d6.png",
          revision: "03547f0f1d312d1433780fc2469e240a",
        },
        {
          url: "/_next/static/media/restaurant3.cbc0cf23.jpg",
          revision: "fb8cdd337fafc79f82a1c098be23fc9b",
        },
        {
          url: "/_next/static/media/restaurant6.191cfc39.jpg",
          revision: "8fc3dad574e8b98b1d0fb34a466c5774",
        },
        {
          url: "/_next/static/media/revicons.652e7269.eot",
          revision: "652e7269",
        },
        {
          url: "/_next/static/media/revicons.b96bdb22.ttf",
          revision: "b96bdb22",
        },
        {
          url: "/_next/static/media/revicons.ff59b316.woff",
          revision: "ff59b316",
        },
        {
          url: "/_next/static/media/salings.077c2066.svg",
          revision: "48fda637c38f318e187482294261cac9",
        },
        {
          url: "/_next/static/media/saved.96aae256.png",
          revision: "a7c5bc30bf882150420d57e4531c72d7",
        },
        {
          url: "/_next/static/media/search.9279ee72.svg",
          revision: "6a232d41d4aa173d738a862e8b107169",
        },
        {
          url: "/_next/static/media/sheild.6485b166.svg",
          revision: "e872bc257b8f4e68277c0feffa38cc2a",
        },
        {
          url: "/_next/static/media/shopping.77704116.svg",
          revision: "bead8b31e55bb70c12c4eabfe23e46bf",
        },
        {
          url: "/_next/static/media/sos.bcc28b1d.svg",
          revision: "bc3c5537d73fb7df27ab85aaf5c5d18c",
        },
        {
          url: "/_next/static/media/star.dbc95427.svg",
          revision: "adc7f51e1f274915f6fab37e2b13ccb4",
        },
        {
          url: "/_next/static/media/sun.c4289283.svg",
          revision: "c7d4f48999ddda07809fe019b5aad005",
        },
        {
          url: "/_next/static/media/sunglassesSes.fc733dbf.png",
          revision: "771b7b9f5bdf2e85880bcb42e92b7c38",
        },
        {
          url: "/_next/static/media/tag4.f1689262.svg",
          revision: "76758bba050675f53c4fc7da4c88d71e",
        },
        {
          url: "/_next/static/media/tag5.dae55a0b.svg",
          revision: "5256cb06add370e32d5b75c3192b8cc2",
        },
        {
          url: "/_next/static/media/tag7.8a781c10.svg",
          revision: "99435d747b9dcdec5bd2a08a88acdb7e",
        },
        {
          url: "/_next/static/media/tagd.ae4a5949.svg",
          revision: "f9d56b1e632ccda2ad7e7c3dfa204c52",
        },
        {
          url: "/_next/static/media/tagds.e6253e07.svg",
          revision: "90c4893e4163b32bd60a7bd98a2e600b",
        },
        {
          url: "/_next/static/media/tagqw.e3108431.svg",
          revision: "bea603ccb66d66e8822e385764eca9e0",
        },
        {
          url: "/_next/static/media/tagsdf.af5fdf8f.svg",
          revision: "5761273d81845589a2bfe045abe6a810",
        },
        {
          url: "/_next/static/media/tandc.c5852604.svg",
          revision: "7f5db93b57f4edfc86e906fa8726fa5d",
        },
        {
          url: "/_next/static/media/taxi.6947b92c.png",
          revision: "e66da3dd4f0d9ff15ce9bbe3a378d3b4",
        },
        {
          url: "/_next/static/media/thumbs-down.2f95f77f.svg",
          revision: "9b9e3feff340d5af125a5a384279f995",
        },
        {
          url: "/_next/static/media/thumbs-up.0a03d9ae.svg",
          revision: "b6638443fa723ee59cea9ca8e6b1309d",
        },
        {
          url: "/_next/static/media/thumbs-up.c6a88613.svg",
          revision: "7783d68fcaa69ebc9b0175b6289c5a46",
        },
        {
          url: "/_next/static/media/tides.3644bb52.svg",
          revision: "b1b80c85308d3b6e4eab92f66741719a",
        },
        {
          url: "/_next/static/media/topSc.88da6287.png",
          revision: "4045b07c1ea2c08a641635debcaad012",
        },
        {
          url: "/_next/static/media/umbrella-beach.b3641777.svg",
          revision: "b8828acb8be6c6d8d4a3f416b98ce683",
        },
        {
          url: "/_next/static/media/user.ff41ab71.svg",
          revision: "6f2fa1544a6caec5e1e64df99cce0f05",
        },
        {
          url: "/_next/static/media/utensils.c92279da.svg",
          revision: "c77c7b3d041b973cfe9614a057f0abf7",
        },
        {
          url: "/_next/static/media/utensilsImg.955c7d1c.svg",
          revision: "37e5eecb9523bf165f8f95f020e82826",
        },
        {
          url: "/_next/static/media/van.078725ff.svg",
          revision: "27d60347426c5437cc222ce48114f1b0",
        },
        {
          url: "/_next/static/media/walkMask.d735bea0.svg",
          revision: "8b3dc878476ea7e6293892d86ed6ba73",
        },
        {
          url: "/_next/static/media/walks1.d1bc239a.jpg",
          revision: "bbc5b23b4a051f0d0e798dd0b1b4e598",
        },
        {
          url: "/_next/static/media/walks2.3de93f74.jpg",
          revision: "24ed031643153eb6f7641b64e45b77b8",
        },
        {
          url: "/_next/static/media/walks4.c96e0d4d.jpg",
          revision: "815a790a8088e8b3edaa325b38a32f59",
        },
        {
          url: "/_next/static/media/walks6.e75c6d61.jpg",
          revision: "214e6ff8f1a860c3067409f5a52f77d8",
        },
        {
          url: "/_next/static/media/walks7.8d23dc1e.jpg",
          revision: "d2a036f3394baafcc51f023c585c4170",
        },
        {
          url: "/_next/static/media/wineGlass.98165fcb.svg",
          revision: "5ef5c1e1406af71ebcee377f57e56bf3",
        },
        {
          url: "/_next/static/media/woomenClothing.62a7acdb.png",
          revision: "1b209f9e57f8cb59d4a11782e2960e2f",
        },
        {
          url: "/_next/static/media/x-twitter.8f274faf.svg",
          revision: "4aed375354237afa1c52ae7511fa973b",
        },
        {
          url: "/_next/static/media/yellowStar.ed2e426c.svg",
          revision: "3fa7f60e32797b78be3c04040ef12f23",
        },
        {
          url: "/apple-touch-icon.png",
          revision: "c1a9c57e1e9a1381d19cb833df409a2b",
        },
        {
          url: "/fallback-ce627215c0e4a9af.js",
          revision: "a5281aa1504c5d6bcd7ba1097870376a",
        },
        { url: "/favicon.ico", revision: "be065407891082d68f145fe6700995d6" },
        { url: "/manifest.json", revision: "67c3e9e41bf1223edb7b39763924d339" },
        { url: "/next.svg", revision: "8e061864f388b47f33a1c3780831193e" },
        { url: "/offline", revision: "CsGfSsqm9Iy9j5oaCp7nW" },
        {
          url: "/roc-144-144.png",
          revision: "81bf79f0d67eb2c3ee0b405d58e7ccf2",
        },
        {
          url: "/roc-192-192.png",
          revision: "046ab78e607b30207330e3f4817c74d1",
        },
        {
          url: "/roc-512-512.png",
          revision: "6927e7806c78b61be7a3dd883904014e",
        },
        {
          url: "/swe-worker-5c72df51bb1f6ee0.js",
          revision: "5a47d90db13bb1309b25bdf7b363570e",
        },
        { url: "/vercel.svg", revision: "61c6b19abff40ea7acd577be818f3976" },
      ],
      { ignoreURLParametersMatching: [/^utm_/, /^fbclid$/] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({ response: e }) =>
              e && "opaqueredirect" === e.type
                ? new Response(e.body, {
                    status: 200,
                    statusText: "OK",
                    headers: e.headers,
                  })
                : e,
          },
          {
            handlerDidError: async ({ request: e }) =>
              "undefined" != typeof self ? self.fallback(e) : Response.error(),
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
          {
            handlerDidError: async ({ request: e }) =>
              "undefined" != typeof self ? self.fallback(e) : Response.error(),
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
          {
            handlerDidError: async ({ request: e }) =>
              "undefined" != typeof self ? self.fallback(e) : Response.error(),
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
          {
            handlerDidError: async ({ request: e }) =>
              "undefined" != typeof self ? self.fallback(e) : Response.error(),
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 2592e3 }),
          {
            handlerDidError: async ({ request: e }) =>
              "undefined" != typeof self ? self.fallback(e) : Response.error(),
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/static.+\.js$/i,
      new e.CacheFirst({
        cacheName: "next-static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
          {
            handlerDidError: async ({ request: e }) =>
              "undefined" != typeof self ? self.fallback(e) : Response.error(),
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
          {
            handlerDidError: async ({ request: e }) =>
              "undefined" != typeof self ? self.fallback(e) : Response.error(),
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          {
            handlerDidError: async ({ request: e }) =>
              "undefined" != typeof self ? self.fallback(e) : Response.error(),
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp4|webm)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          {
            handlerDidError: async ({ request: e }) =>
              "undefined" != typeof self ? self.fallback(e) : Response.error(),
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 48, maxAgeSeconds: 86400 }),
          {
            handlerDidError: async ({ request: e }) =>
              "undefined" != typeof self ? self.fallback(e) : Response.error(),
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          {
            handlerDidError: async ({ request: e }) =>
              "undefined" != typeof self ? self.fallback(e) : Response.error(),
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          {
            handlerDidError: async ({ request: e }) =>
              "undefined" != typeof self ? self.fallback(e) : Response.error(),
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          {
            handlerDidError: async ({ request: e }) =>
              "undefined" != typeof self ? self.fallback(e) : Response.error(),
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ sameOrigin: e, url: { pathname: a } }) =>
        !(!e || a.startsWith("/api/auth/callback") || !a.startsWith("/api/")),
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
          {
            handlerDidError: async ({ request: e }) =>
              "undefined" != typeof self ? self.fallback(e) : Response.error(),
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ request: e, url: { pathname: a }, sameOrigin: s }) =>
        "1" === e.headers.get("RSC") &&
        "1" === e.headers.get("Next-Router-Prefetch") &&
        s &&
        !a.startsWith("/api/"),
      new e.NetworkFirst({
        cacheName: "pages-rsc-prefetch",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          {
            handlerDidError: async ({ request: e }) =>
              "undefined" != typeof self ? self.fallback(e) : Response.error(),
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ request: e, url: { pathname: a }, sameOrigin: s }) =>
        "1" === e.headers.get("RSC") && s && !a.startsWith("/api/"),
      new e.NetworkFirst({
        cacheName: "pages-rsc",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          {
            handlerDidError: async ({ request: e }) =>
              "undefined" != typeof self ? self.fallback(e) : Response.error(),
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: { pathname: e }, sameOrigin: a }) => a && !e.startsWith("/api/"),
      new e.NetworkFirst({
        cacheName: "pages",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          {
            handlerDidError: async ({ request: e }) =>
              "undefined" != typeof self ? self.fallback(e) : Response.error(),
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ sameOrigin: e }) => !e,
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
          {
            handlerDidError: async ({ request: e }) =>
              "undefined" != typeof self ? self.fallback(e) : Response.error(),
          },
        ],
      }),
      "GET"
    ),
    (self.__WB_DISABLE_DEV_LOGS = !0);
});
