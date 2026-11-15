// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-purple; icon-glyph: tv;

/*
 * سهرة MAC — مشغّل اشتراكات MAC / Stalker IPTV بواجهة احترافية متحركة
 * يعمل داخل تطبيق Scriptable على الآيفون: بدون IPA وبدون سيرفر.
 */

const UI_HTML = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover">
<title>سهرة</title>
<style>:root{
  --bg:#07080f;--bg2:#0d1020;--surface:#141829;--surface2:#1d2238;--stroke:rgba(255,255,255,.07);
  --a1:#ff4d8d;--a2:#7b5cff;--a3:#2ec5ff;--gold:#ffc94d;--live:#ff3b5c;
  --text:#fff;--muted:rgba(255,255,255,.6);--dim:rgba(255,255,255,.38);
  --grad:linear-gradient(120deg,#ff4d8d 0%,#7b5cff 55%,#2ec5ff 100%);
  --st:max(env(safe-area-inset-top),14px);--sb:env(safe-area-inset-bottom);
  --spring:cubic-bezier(.2,.9,.25,1.12);--ease:cubic-bezier(.25,.8,.25,1);
  --glow:#1b1440;--a1rgb:255,77,141;--a2rgb:123,92,255;--bgrgb:7,8,15;--surfrgb:20,24,41;
  --an:rise;--ad:.42s;--ae:var(--spring);--as:28ms;--pd:.32s;--pt:translateY(14px);
}
*{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}
html,body{height:100%;background:var(--bg);color:var(--text);overflow:hidden;
  font-family:-apple-system,"SF Arabic","SF Pro Display",system-ui,"Segoe UI",Tahoma,sans-serif;
  -webkit-user-select:none;user-select:none;-webkit-text-size-adjust:100%}
button{font:inherit;color:inherit;background:none;border:0;cursor:pointer}
input{font:inherit;color:inherit;-webkit-user-select:text;user-select:text}
img{-webkit-user-drag:none}
svg{display:block}
.hidden{display:none!important}
.scroll{overflow-y:auto;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;scrollbar-width:none}
.scroll::-webkit-scrollbar,.htrack::-webkit-scrollbar{display:none}
.press{transition:transform .18s var(--ease),opacity .18s}
.press:active{transform:scale(.95);opacity:.85}

/* ---------- splash ---------- */
#splash{position:fixed;inset:0;z-index:200;background:radial-gradient(120% 80% at 50% 30%,var(--glow) 0%,var(--bg) 70%);
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;transition:opacity .6s var(--ease),transform .6s var(--ease)}
#splash.out{opacity:0;transform:scale(1.08);pointer-events:none}
.mark{width:96px;height:96px;border-radius:28px;background:var(--grad);display:grid;place-items:center;
  box-shadow:0 18px 50px rgba(var(--a2rgb),.55);animation:markIn .9s var(--spring) both}
.mark svg path.tri{stroke-dasharray:60;stroke-dashoffset:60;animation:draw 1s .35s ease forwards}
.splash-name{font-size:40px;font-weight:900;background:linear-gradient(90deg,#fff 0%,#fff 38%,#ff9ac0 48%,#b9a8ff 54%,#fff 64%,#fff 100%);background-size:260% 100%;
  -webkit-background-clip:text;background-clip:text;color:transparent;opacity:0;animation:nameIn .9s .35s var(--spring) forwards,shine 2.4s 1.1s linear infinite}
@keyframes nameIn{0%{opacity:0;transform:translateY(14px) scale(.85);filter:blur(10px)}100%{opacity:1;transform:none;filter:none}}
@keyframes shine{0%{background-position:100% 0}100%{background-position:-60% 0}}
.splash-sub{color:var(--muted);font-size:14px;opacity:0;animation:fadeUp .6s .9s forwards}
@keyframes markIn{0%{transform:scale(.4) rotate(-12deg);opacity:0}100%{transform:none;opacity:1}}
@keyframes draw{to{stroke-dashoffset:0}}
@keyframes letter{0%{opacity:0;transform:translateY(16px) scale(.8)}100%{opacity:1;transform:none}}
@keyframes fadeUp{0%{opacity:0;transform:translateY(12px)}100%{opacity:1;transform:none}}

/* ---------- pages ---------- */
.page{position:fixed;inset:0;bottom:calc(66px + var(--sb));display:flex;flex-direction:column;opacity:0;transform:var(--pt);
  pointer-events:none;transition:opacity var(--pd) var(--ease),transform var(--pd) var(--ease)}
.page.on{opacity:1;transform:none;pointer-events:auto}
.page>.scroll{flex:1}
.aurora{position:absolute;top:-120px;left:-20%;right:-20%;height:420px;pointer-events:none;z-index:0;filter:blur(60px);opacity:.55}
.aurora i{position:absolute;width:260px;height:260px;border-radius:50%;animation:float 14s ease-in-out infinite alternate}
.aurora i:nth-child(1){background:var(--a2);left:10%;top:40px}
.aurora i:nth-child(2){background:var(--a1);right:5%;top:0;animation-duration:17s}
.aurora i:nth-child(3){background:var(--a3);left:45%;top:120px;animation-duration:19s;width:200px;height:200px}
@keyframes float{0%{transform:translate(0,0) scale(1)}50%{transform:translate(40px,30px) scale(1.15)}100%{transform:translate(-30px,10px) scale(.95)}}
.topbar{position:relative;z-index:2;padding:calc(var(--st) + 6px) 18px 10px;display:flex;align-items:center;justify-content:space-between;gap:10px}
.topbar .hello{font-size:13px;color:var(--muted);font-weight:600}
.topbar h1{font-size:28px;font-weight:900;letter-spacing:.3px;background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent}
.topbar h2{font-size:30px;font-weight:900}
.topbar .sub{font-size:13px;color:var(--muted);margin-top:2px}
.roundbtn{width:42px;height:42px;border-radius:50%;background:rgba(255,255,255,.08);border:1px solid var(--stroke);display:grid;place-items:center;flex:none;
  -webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px)}
.tbtns{display:flex;gap:8px}

/* ---------- hero ---------- */
.hero{position:relative;margin:4px 0 6px;z-index:1}
.hero-track{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;direction:ltr;scrollbar-width:none}
.hero-track::-webkit-scrollbar{display:none}
.slide{flex:0 0 100%;scroll-snap-align:center;padding:0 16px;direction:rtl}
.slide-in{position:relative;height:430px;border-radius:28px;overflow:hidden;background:var(--surface);box-shadow:0 20px 50px rgba(0,0,0,.45)}
.sbg{position:absolute;inset:-20px;background-size:cover;background-position:center;filter:blur(18px) saturate(1.3);opacity:.75;transform:scale(1.05)}
.slide.active .sbg{animation:kenburns 9s ease-out forwards}
@keyframes kenburns{0%{transform:scale(1.05) translate(0,0)}100%{transform:scale(1.22) translate(-12px,8px)}}
.sshade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(var(--bgrgb),.05) 0%,rgba(var(--bgrgb),.25) 40%,rgba(var(--bgrgb),.95) 100%)}
.sposter{position:absolute;top:26px;left:50%;width:172px;aspect-ratio:2/3;transform:translateX(-50%) translateY(10px) scale(.94);border-radius:18px;overflow:hidden;
  box-shadow:0 18px 40px rgba(0,0,0,.6);background:var(--surface2);opacity:0;transition:transform .7s var(--spring),opacity .6s}
.slide.active .sposter{transform:translateX(-50%);opacity:1}
.sposter img{width:100%;height:100%;object-fit:cover}
.sinfo{position:absolute;left:18px;right:18px;bottom:18px;text-align:center;opacity:0;transform:translateY(16px);transition:all .6s .15s var(--ease)}
.slide.active .sinfo{opacity:1;transform:none}
.kicker{display:inline-flex;align-items:center;gap:6px;font-size:11px;font-weight:800;letter-spacing:.5px;padding:4px 10px;border-radius:999px;background:rgba(255,255,255,.14);margin-bottom:8px}
.sinfo h3{font-size:22px;font-weight:900;line-height:1.25;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.smeta{font-size:12.5px;color:var(--muted);margin-top:4px}
.sbtns{display:flex;gap:10px;justify-content:center;margin-top:12px}
.btn-play{display:flex;align-items:center;gap:7px;padding:11px 22px;border-radius:999px;background:#fff;color:#000;font-weight:900;font-size:15px}
.btn-ghost{display:flex;align-items:center;gap:7px;padding:11px 18px;border-radius:999px;background:rgba(255,255,255,.16);font-weight:800;font-size:15px;
  -webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px)}
.dots{display:flex;justify-content:center;gap:6px;margin-top:12px}
.dots i{width:7px;height:7px;border-radius:4px;background:rgba(255,255,255,.22);overflow:hidden;transition:width .35s var(--ease)}
.dots i.on{width:26px}
.dots i.on b{display:block;height:100%;background:var(--grad);animation:dotfill 6s linear forwards;transform-origin:right}
@keyframes dotfill{0%{transform:scaleX(0)}100%{transform:scaleX(1)}}

/* ---------- rails ---------- */
.rail{margin-top:22px;animation:fadeUp .5s var(--ease) both}
.rail.gone{animation:collapse .4s var(--ease) forwards}
@keyframes collapse{to{opacity:0;max-height:0;margin:0}}
.rail-h{display:flex;align-items:center;justify-content:space-between;padding:0 18px 10px}
.rail-h h3{font-size:19px;font-weight:900;display:flex;align-items:center;gap:8px}
.rail-h button{font-size:13px;font-weight:700;color:var(--a3);display:flex;align-items:center;gap:2px}
.htrack{display:flex;gap:12px;overflow-x:auto;padding:4px 18px 8px;scroll-snap-type:x proximity;scrollbar-width:none}
.htrack>*{scroll-snap-align:start;flex:none}
.rise{animation:var(--an) var(--ad) var(--ae) both;animation-delay:calc(min(var(--i,0),14) * var(--as))}
@keyframes rise{0%{opacity:0;transform:translateY(22px) scale(.94)}100%{opacity:1;transform:none}}

.pcard{width:118px}
.pcard.wide{width:100%}
.pimg{position:relative;aspect-ratio:2/3;border-radius:16px;overflow:hidden;background:linear-gradient(160deg,var(--surface2),var(--surface));border:1px solid var(--stroke);
  display:grid;place-items:center;text-align:center;padding:8px;color:var(--dim);font-size:11px;font-weight:700}
.pimg img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity .5s}
.pimg img.ok{opacity:1}
.pimg .tagk{position:absolute;top:7px;right:7px;font-size:10px;font-weight:800;padding:3px 7px;border-radius:999px;background:rgba(0,0,0,.55);color:#fff;
  -webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);z-index:1}
.pt{font-size:13px;font-weight:800;margin-top:7px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;line-height:1.35}
.py{font-size:11px;color:var(--muted);margin-top:2px}

.ccard{width:104px;text-align:center}
.ctile{position:relative;width:104px;height:104px;border-radius:24px;background:linear-gradient(150deg,var(--surface2),var(--surface));border:1px solid var(--stroke);
  display:grid;place-items:center;overflow:hidden;font-weight:900;color:var(--dim);font-size:20px}
.ctile img{position:absolute;inset:16px;width:calc(100% - 32px);height:calc(100% - 32px);object-fit:contain;opacity:0;transition:opacity .4s}
.ctile img.ok{opacity:1}
.livedot{position:absolute;top:8px;left:8px;width:9px;height:9px;border-radius:50%;background:var(--live);box-shadow:0 0 0 0 rgba(255,59,92,.7);animation:ping 1.8s infinite}
@keyframes ping{0%{box-shadow:0 0 0 0 rgba(255,59,92,.65)}80%,100%{box-shadow:0 0 0 9px rgba(255,59,92,0)}}
.cn{font-size:12.5px;font-weight:800;margin-top:7px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}

.wcard{width:230px}
.wimg{position:relative;aspect-ratio:16/9;border-radius:16px;overflow:hidden;background:var(--surface2);border:1px solid var(--stroke)}
.wimg img{width:100%;height:100%;object-fit:cover;filter:saturate(1.1)}
.wimg .pl{position:absolute;inset:0;display:grid;place-items:center;background:linear-gradient(180deg,transparent 40%,rgba(0,0,0,.65))}
.wimg .pl span{width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,.22);display:grid;place-items:center;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}
.wprog{position:absolute;left:10px;right:10px;bottom:9px;height:4px;border-radius:2px;background:rgba(255,255,255,.25);overflow:hidden}
.wprog i{display:block;height:100%;background:var(--grad);border-radius:2px}

.sk{position:relative;overflow:hidden;background:var(--surface)}
.sk::after{content:"";position:absolute;inset:0;transform:translateX(100%);background:linear-gradient(90deg,transparent,rgba(255,255,255,.07),transparent);animation:shimmer 1.3s infinite}
@keyframes shimmer{to{transform:translateX(-100%)}}

/* ---------- chips / search ---------- */
.chips{display:flex;gap:8px;overflow-x:auto;padding:10px 18px 12px;scrollbar-width:none;flex:none}
.chips::-webkit-scrollbar{display:none}
.chip{flex:none;padding:8px 15px;border-radius:999px;background:var(--surface);border:1px solid var(--stroke);color:var(--muted);font-weight:800;font-size:13.5px;white-space:nowrap;
  transition:all .25s var(--ease)}
.chip small{opacity:.6;margin-inline-start:4px;font-weight:700}
.chip.on{background:var(--grad);color:#fff;border-color:transparent;box-shadow:0 6px 18px rgba(var(--a2rgb),.35);transform:translateY(-1px)}
.sfield{margin:0 18px;display:flex;align-items:center;gap:10px;background:var(--surface);border:1px solid var(--stroke);border-radius:16px;padding:0 14px;color:var(--muted);
  transition:border-color .25s,box-shadow .25s}
.sfield:focus-within{border-color:rgba(var(--a2rgb),.7);box-shadow:0 0 0 4px rgba(var(--a2rgb),.18)}
.sfield input{flex:1;background:transparent;border:0;outline:0;color:#fff;font-size:16px;padding:13px 0;min-width:0}
.sfield input::placeholder{color:var(--dim)}
.sfield input::-webkit-search-cancel-button{display:none}
.clr{width:26px;height:26px;border-radius:50%;background:rgba(255,255,255,.12);display:grid;place-items:center}

/* ---------- grids ---------- */
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(104px,1fr));gap:18px 12px;padding:4px 18px 16px}
.grid .pcard{width:auto}
.cgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(98px,1fr));gap:16px 12px;padding:4px 18px 16px}
.cgrid .ccard{width:auto}
.cgrid .ctile{width:100%;height:auto;aspect-ratio:1/1}
.cbadges{position:absolute;bottom:7px;right:7px;left:7px;display:flex;gap:4px;justify-content:flex-end}
.cbadges b{font-size:9px;font-weight:900;padding:2px 5px;border-radius:6px;background:rgba(0,0,0,.6);color:#fff}
.cbadges b.w{background:rgba(255,201,77,.9);color:#000}
.empty{text-align:center;padding:50px 30px;color:var(--muted);font-size:14px;line-height:1.7;animation:fadeUp .5s both}
.empty .eic{width:64px;height:64px;margin:0 auto 14px;border-radius:20px;background:var(--surface2);display:grid;place-items:center;color:var(--a3)}
.empty b{display:block;color:#fff;font-size:17px;margin-bottom:4px}
.loader{display:flex;justify-content:center;padding:24px}
.spin{width:30px;height:30px;border-radius:50%;border:3px solid rgba(255,255,255,.15);border-top-color:#fff;animation:spin .8s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.sec-t{font-size:17px;font-weight:900;padding:16px 18px 10px;display:flex;justify-content:space-between;align-items:center}
.sec-t button{font-size:13px;color:var(--a3);font-weight:700}
.rchips{display:flex;flex-wrap:wrap;gap:8px;padding:0 18px}

/* ---------- tab bar ---------- */
#tabbar{position:fixed;left:12px;right:12px;bottom:calc(var(--sb) + 8px);height:60px;border-radius:22px;display:flex;z-index:20;
  background:rgba(var(--surfrgb),.82);-webkit-backdrop-filter:blur(24px) saturate(1.4);backdrop-filter:blur(24px) saturate(1.4);border:1px solid var(--stroke);
  box-shadow:0 12px 34px rgba(0,0,0,.45);transition:transform .35s var(--ease)}
#tabbar.away{transform:translateY(140%)}
#tabbar button{flex:1;position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;
  color:var(--dim);font-size:10.5px;font-weight:800;transition:color .25s}
#tabbar button.on{color:#fff}
#tabbar button.on svg{animation:bounce .5s var(--spring)}
@keyframes bounce{0%{transform:scale(.7)}60%{transform:scale(1.15)}100%{transform:scale(1)}}
#tabind{position:absolute;top:6px;bottom:6px;width:calc((100% - 12px) / 5);right:6px;border-radius:16px;background:var(--grad);opacity:.9;
  box-shadow:0 6px 18px rgba(var(--a2rgb),.45);transition:transform .45s var(--spring)}

/* ---------- detail sheet ---------- */
#sheet{position:fixed;inset:0;z-index:40;background:var(--bg);transform:translateY(100%);transition:transform .5s var(--spring);display:flex;flex-direction:column}
#sheet.open{transform:none}
#sheet .scroll{flex:1}
.dnav{position:absolute;top:0;left:0;right:0;z-index:5;padding:calc(var(--st) + 4px) 14px 10px;display:flex;align-items:center;gap:10px;
  background:rgba(var(--bgrgb),0);transition:background .25s}
.dnav.solid{background:rgba(var(--bgrgb),.86);-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);border-bottom:1px solid var(--stroke)}
.dnav .t{flex:1;font-weight:900;font-size:16px;opacity:0;transform:translateY(6px);transition:all .25s;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:center}
.dnav.solid .t{opacity:1;transform:none}
.dhero{position:relative;height:440px;overflow:hidden}
.dhero .bg{position:absolute;inset:-30px;background-size:cover;background-position:center;filter:blur(24px) saturate(1.3);opacity:.6;will-change:transform}
.dhero::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(var(--bgrgb),.2),rgba(var(--bgrgb),.35) 50%,var(--bg))}
.dhero .pos{position:absolute;z-index:2;top:calc(var(--st) + 56px);left:50%;width:180px;aspect-ratio:2/3;transform:translateX(-50%);border-radius:20px;overflow:hidden;
  box-shadow:0 24px 50px rgba(0,0,0,.65);background:var(--surface2);animation:popIn .7s .1s var(--spring) both}
.dhero .pos img{width:100%;height:100%;object-fit:cover}
@keyframes popIn{0%{opacity:0;transform:translateX(-50%) scale(.8) translateY(30px)}100%{opacity:1;transform:translateX(-50%)}}
.dbody{position:relative;z-index:3;margin-top:-118px;padding:0 18px calc(var(--sb) + 40px);text-align:center}
.dbody h1{font-size:25px;font-weight:900;line-height:1.3;animation:fadeUp .5s .2s both}
.dmeta{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin-top:10px;animation:fadeUp .5s .28s both}
.dmeta span{font-size:12px;font-weight:800;padding:4px 10px;border-radius:999px;background:rgba(255,255,255,.1)}
.dacts{display:flex;gap:10px;margin-top:18px;animation:fadeUp .5s .36s both}
.bigplay{flex:1;display:flex;align-items:center;justify-content:center;gap:8px;padding:15px;border-radius:18px;background:var(--grad);font-weight:900;font-size:17px;
  box-shadow:0 12px 30px rgba(var(--a2rgb),.45);position:relative;overflow:hidden}
.bigplay::after{content:"";position:absolute;top:0;bottom:0;width:40%;left:-60%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.35),transparent);transform:skewX(-20deg);
  animation:sheen 3.2s 1s infinite}
@keyframes sheen{0%{left:-60%}35%,100%{left:130%}}
.sqbtn{width:56px;border-radius:18px;background:var(--surface2);display:grid;place-items:center;flex:none}
.sqbtn.on{color:var(--live)}
.sqbtn.pop svg{animation:heart .5s var(--spring)}
@keyframes heart{0%{transform:scale(1)}30%{transform:scale(1.45)}100%{transform:scale(1)}}
.ddesc{text-align:start;color:var(--muted);font-size:14.5px;line-height:1.8;margin-top:20px;animation:fadeUp .5s .44s both}
.ddesc.clamp{display:-webkit-box;-webkit-line-clamp:5;-webkit-box-orient:vertical;overflow:hidden}
.dsec{text-align:right;font-size:18px;font-weight:900;margin:24px 0 10px;display:flex;align-items:center;gap:8px}
.dsec small{font-size:12px;color:var(--muted);background:var(--surface2);padding:2px 8px;border-radius:999px}
.ep{display:flex;align-items:center;gap:12px;padding:10px;border-radius:16px;background:var(--surface);margin-bottom:8px;text-align:right}
.ep .n{width:40px;height:40px;border-radius:12px;background:var(--surface2);display:grid;place-items:center;font-weight:900;flex:none}
.ep .t{flex:1;min-width:0;font-weight:800;font-size:14px;line-height:1.4}
.ep .t small{display:block;color:var(--muted);font-weight:600;font-size:11.5px;margin-top:2px}
.ep .bar{height:3px;border-radius:2px;background:rgba(255,255,255,.12);margin-top:6px;overflow:hidden}
.ep .bar i{display:block;height:100%;background:var(--grad)}
.ep .pi{width:34px;height:34px;border-radius:50%;background:var(--grad);display:grid;place-items:center;flex:none}
.note{font-size:12px;color:var(--dim);line-height:1.7;margin-top:18px;text-align:center}

/* ---------- modal ---------- */
#modal{position:fixed;inset:0;z-index:60;background:rgba(0,0,0,.5);display:flex;align-items:flex-end;opacity:0;pointer-events:none;transition:opacity .25s}
#modal.open{opacity:1;pointer-events:auto}
.panel{width:100%;max-height:90%;overflow-y:auto;background:var(--bg2);border-radius:28px 28px 0 0;padding:10px 18px calc(var(--sb) + 24px);transform:translateY(60px);
  transition:transform .45s var(--spring);border-top:1px solid var(--stroke)}
#modal.open .panel{transform:none}
.grab{width:42px;height:5px;border-radius:3px;background:rgba(255,255,255,.2);margin:0 auto 16px}
.panel h3{font-size:20px;font-weight:900;text-align:center;margin-bottom:6px}
.panel .ps{text-align:center;color:var(--muted);font-size:13px;margin-bottom:16px}
.group{background:var(--surface);border-radius:18px;overflow:hidden;margin-bottom:14px;border:1px solid var(--stroke)}
.gt{font-size:12.5px;color:var(--muted);font-weight:800;margin:0 6px 8px}
.trow{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:13px 16px;border-bottom:1px solid var(--stroke);font-size:15px;font-weight:700;width:100%;text-align:right}
.trow:last-child{border-bottom:0}
.trow small{display:block;color:var(--muted);font-weight:600;font-size:12px;margin-top:2px}
.sw{width:50px;height:30px;border-radius:15px;background:rgba(255,255,255,.16);position:relative;flex:none;transition:background .25s}
.sw::after{content:"";position:absolute;top:3px;right:3px;width:24px;height:24px;border-radius:50%;background:#fff;transition:transform .35s var(--spring);box-shadow:0 2px 6px rgba(0,0,0,.3)}
.sw.on{background:#34c759}
.sw.on::after{transform:translateX(-20px)}
.trow.danger{color:var(--live)}

/* ---------- player ---------- */
#player{position:fixed;inset:0;z-index:100;background:#000;direction:ltr;opacity:0;transform:scale(.96);pointer-events:none;visibility:hidden;
  transition:opacity .3s,transform .4s var(--spring),visibility 0s .4s}
#player.open{opacity:1;transform:none;pointer-events:auto;visibility:visible;transition:opacity .3s,transform .4s var(--spring),visibility 0s}
#player:not(.open) *{pointer-events:none!important}
#video{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;background:#000}
#ptap{position:absolute;inset:0}
#pstate{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;pointer-events:none;text-align:center;padding:30px;direction:rtl}
#pstate .msg{font-size:15px;line-height:1.6;max-width:420px;white-space:pre-line}
#pstate .acts{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;pointer-events:auto}
#pstate .acts button{padding:11px 18px;border-radius:999px;font-weight:900;font-size:14px;background:rgba(255,255,255,.15);display:flex;gap:6px;align-items:center}
#pstate .acts button.pr{background:var(--grad)}
.ring{width:58px;height:58px;border-radius:50%;background:conic-gradient(from 0deg,var(--a1),var(--a2),var(--a3),transparent 75%);
  -webkit-mask:radial-gradient(farthest-side,transparent calc(100% - 5px),#000 calc(100% - 4px));mask:radial-gradient(farthest-side,transparent calc(100% - 5px),#000 calc(100% - 4px));animation:spin .9s linear infinite}
#pctl{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:space-between;pointer-events:none;
  padding:calc(var(--st) + 4px) max(16px,env(safe-area-inset-right)) calc(var(--sb) + 14px) max(16px,env(safe-area-inset-left));
  background:linear-gradient(180deg,rgba(0,0,0,.8),transparent 30%,transparent 62%,rgba(0,0,0,.88));transition:opacity .3s}
#pctl.off{opacity:0}
#pctl.off,#pctl.off *{pointer-events:none!important}
#pctl>*{pointer-events:auto}
.ptop{display:flex;align-items:center;gap:10px}
.ptitles{flex:1;min-width:0;direction:rtl;text-align:right}
.ptitles .a{font-weight:900;font-size:16px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ptitles .b{font-size:12px;color:rgba(255,255,255,.7);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:2px}
.cb{width:42px;height:42px;border-radius:50%;background:rgba(255,255,255,.15);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);display:grid;place-items:center;flex:none;color:#fff;
  transition:transform .2s var(--ease)}
.cb:active{transform:scale(.88)}
.cb.pop svg{animation:heart .5s var(--spring)}
.cb.l{width:58px;height:58px}
.cb.xl{width:80px;height:80px;background:rgba(255,255,255,.2)}
.pmid{display:flex;justify-content:center;align-items:center;gap:46px;pointer-events:none!important}
.pmid .cb{pointer-events:auto}
.pbot{display:flex;flex-direction:column;gap:12px}
.plive{display:flex;align-items:center;gap:10px;direction:rtl}
.lbadge{display:flex;align-items:center;gap:6px;background:var(--live);font-weight:900;font-size:12px;padding:5px 10px;border-radius:999px}
.lbadge i{width:7px;height:7px;border-radius:50%;background:#fff;animation:blink 1.2s infinite}
@keyframes blink{50%{opacity:.25}}
.pgroup{font-size:12.5px;color:rgba(255,255,255,.75);font-weight:700}
.pvod{display:flex;align-items:center;gap:12px}
.pvod .t{font-size:12px;font-variant-numeric:tabular-nums;min-width:46px;text-align:center}
input[type=range]{-webkit-appearance:none;appearance:none;flex:1;height:4px;border-radius:2px;background:rgba(255,255,255,.25);outline:0}
input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:17px;height:17px;border-radius:50%;background:#fff;box-shadow:0 0 0 5px rgba(var(--a2rgb),.35)}
.ptools{display:flex;justify-content:space-between;align-items:center;gap:8px}
.ptools .g{display:flex;gap:8px}
.chipbtn{display:flex;align-items:center;gap:6px;padding:9px 14px;border-radius:999px;background:rgba(255,255,255,.15);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);font-size:13px;font-weight:900}
#plist{position:absolute;top:0;bottom:0;right:0;width:min(340px,86%);background:rgba(var(--bgrgb),.94);-webkit-backdrop-filter:blur(22px);backdrop-filter:blur(22px);
  transform:translateX(105%);transition:transform .4s var(--spring);display:flex;flex-direction:column;direction:rtl;padding-top:var(--st);z-index:3}
#plist.open{transform:none}
#plist .h{display:flex;justify-content:space-between;align-items:center;padding:12px 16px;font-weight:900;font-size:17px}
#plist .scroll{flex:1;padding:0 10px calc(var(--sb) + 20px)}
.pli{display:flex;align-items:center;gap:10px;padding:8px;border-radius:14px;margin-bottom:5px;background:rgba(255,255,255,.04);transition:background .2s}
.pli.on{background:rgba(var(--a2rgb),.35)}
.pli .lg{width:44px;height:44px;border-radius:12px;background:var(--surface2);position:relative;overflow:hidden;flex:none;display:grid;place-items:center;font-size:12px;font-weight:900;color:var(--dim)}
.pli .lg img{position:absolute;inset:5px;width:calc(100% - 10px);height:calc(100% - 10px);object-fit:contain}
.pli .t{flex:1;min-width:0;font-weight:800;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#zap{position:absolute;top:calc(var(--st) + 64px);left:50%;z-index:4;display:flex;align-items:center;gap:10px;direction:rtl;padding:8px 16px 8px 8px;border-radius:999px;
  background:rgba(var(--surfrgb),.9);-webkit-backdrop-filter:blur(18px);backdrop-filter:blur(18px);border:1px solid var(--stroke);
  transform:translate(-50%,-30px);opacity:0;transition:all .45s var(--spring);pointer-events:none;max-width:86%}
#zap.show{transform:translate(-50%,0);opacity:1}
#zap .lg{width:40px;height:40px;border-radius:12px;background:var(--surface2);position:relative;overflow:hidden;flex:none}
#zap .lg img{position:absolute;inset:4px;width:calc(100% - 8px);height:calc(100% - 8px);object-fit:contain}
#zap b{font-size:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}

#toast{position:fixed;left:50%;bottom:calc(var(--sb) + 84px);transform:translate(-50%,20px) scale(.96);background:rgba(var(--surfrgb),.97);border:1px solid var(--stroke);
  padding:11px 18px;border-radius:999px;font-size:14px;font-weight:800;opacity:0;transition:all .35s var(--spring);z-index:150;pointer-events:none;max-width:88%;text-align:center}
#toast.show{opacity:1;transform:translate(-50%,0) scale(1)}
body.in-player #toast{bottom:calc(var(--sb) + 132px)}

@media (prefers-reduced-motion: reduce){
  *,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}
}

.pt,.cn,.sinfo h3,.dbody h1,.ep .t,.ptitles .a,.ptitles .b,#zap b,.pli .t,.dnav .t{unicode-bidi:plaintext}

/* ================= MAC additions ================= */
.screen{position:fixed;inset:0;display:flex;flex-direction:column;z-index:30;background:radial-gradient(120% 70% at 50% 0%,var(--glow) 0%,var(--bg) 60%);
  opacity:0;pointer-events:none;visibility:hidden;transition:opacity .4s var(--ease),visibility 0s .4s}
.screen.on{opacity:1;pointer-events:auto;visibility:visible;transition:opacity .4s var(--ease),visibility 0s}
.screen .scroll{flex:1;padding:calc(var(--st) + 30px) 20px calc(var(--sb) + 30px)}
.brand{display:flex;flex-direction:column;align-items:center;text-align:center;gap:12px;margin-bottom:26px}
.brand h1{font-size:34px;font-weight:900;background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent}
.brand p{color:var(--muted);font-size:14.5px}
.brand .mark{width:86px;height:86px;border-radius:26px}
.pcard2{display:flex;align-items:center;gap:14px;padding:14px;margin-bottom:12px;border-radius:22px;background:rgba(var(--surfrgb),.85);border:1px solid var(--stroke);
  -webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px)}
.pcard2 .ic{width:52px;height:52px;border-radius:16px;background:var(--grad);display:grid;place-items:center;flex:none;box-shadow:0 8px 20px rgba(var(--a2rgb),.35)}
.pcard2 .meta{flex:1;min-width:0}
.pcard2 .t{font-weight:900;font-size:16.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pcard2 .s{font-size:12px;color:var(--muted);margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.go{padding:10px 18px;border-radius:999px;background:#fff;color:#000;font-weight:900;font-size:14px;flex:none}
.bigbtn{width:100%;padding:16px;border-radius:18px;background:var(--grad);font-weight:900;font-size:17px;display:flex;align-items:center;justify-content:center;gap:8px;
  box-shadow:0 12px 30px rgba(var(--a2rgb),.4);margin-top:10px;position:relative;overflow:hidden}
.bigbtn::after{content:"";position:absolute;top:0;bottom:0;width:40%;left:-60%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.3),transparent);transform:skewX(-20deg);animation:sheen 3.4s 1.2s infinite}
.alert{display:flex;gap:10px;align-items:flex-start;padding:14px;border-radius:16px;background:rgba(255,59,92,.13);border:1px solid rgba(255,59,92,.4);font-size:13.5px;line-height:1.6;margin-bottom:16px;white-space:pre-line;animation:shake .5s var(--ease)}
@keyframes shake{20%{transform:translateX(6px)}40%{transform:translateX(-5px)}60%{transform:translateX(3px)}80%{transform:translateX(-2px)}}
.iconbtn{width:38px;height:38px;border-radius:50%;display:grid;place-items:center;color:var(--muted);flex:none}
#connecting{align-items:center;justify-content:center;gap:22px;text-align:center;padding:30px}
#connecting .mark{animation:markIn .9s var(--spring) both,breathe 2s 1s ease-in-out infinite}
@keyframes breathe{50%{transform:scale(1.07);box-shadow:0 18px 60px rgba(var(--a1rgb),.55)}}
.steps{display:flex;flex-direction:column;gap:10px;min-width:230px}
.step{display:flex;align-items:center;gap:10px;font-size:14px;color:var(--dim);transition:color .3s}
.step i{width:22px;height:22px;border-radius:50%;border:2px solid currentColor;display:grid;place-items:center;flex:none}
.step.on{color:#fff}
.step.on i{border-color:transparent;border-top-color:#fff;border-right-color:#fff;animation:spin .8s linear infinite}
.step.done{color:#34c759}
.step.done i{background:#34c759;border-color:#34c759}
.step.done i::after{content:"✓";color:#000;font-size:12px;font-weight:900}
.linkbtn{color:var(--muted);font-weight:700;font-size:15px;padding:10px 18px}
.field{margin-bottom:12px;text-align:right}
.field label{display:block;font-size:12.5px;color:var(--muted);font-weight:800;margin:0 4px 6px}
.field input,.field select{width:100%;background:var(--surface);border:1px solid var(--stroke);border-radius:14px;padding:13px 14px;font-size:16px;color:#fff;outline:0;
  transition:border-color .25s,box-shadow .25s}
.field input:focus{border-color:rgba(var(--a2rgb),.8);box-shadow:0 0 0 4px rgba(var(--a2rgb),.18)}
.field .err{color:var(--live);font-size:12px;margin:5px 4px 0}
.ltr{direction:ltr;text-align:left}
.adv{font-size:14px;font-weight:800;color:var(--a3);padding:8px 4px;display:flex;align-items:center;gap:6px}
.btnrow{display:flex;gap:10px;margin-top:16px}
.btnrow button{flex:1;padding:15px;border-radius:16px;font-weight:900;font-size:16px}
.btn2{background:var(--surface2)}
.btn1{background:var(--grad)}
.btn1:disabled{opacity:.35}
.sheetact{display:block;width:100%;padding:15px;border-radius:16px;background:var(--surface);font-weight:800;font-size:16px;margin-bottom:8px}
.sheetact.danger{color:var(--live)}
.seg{display:flex;background:var(--surface2);border-radius:12px;padding:3px;gap:3px;flex:none}
.seg button{padding:7px 12px;border-radius:9px;font-size:12.5px;font-weight:800;color:var(--muted);transition:all .25s var(--ease)}
.seg button.on{background:var(--grad);color:#fff}
.krow{display:flex;justify-content:space-between;gap:12px;padding:12px 16px;border-bottom:1px solid var(--stroke);font-size:14.5px}
.krow:last-child{border-bottom:0}
.krow .v{color:var(--muted);text-align:left;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:62%;direction:ltr}
.acc{display:flex;align-items:center;gap:14px;padding:16px}
.acc .ic{width:50px;height:50px;border-radius:16px;background:var(--grad);display:grid;place-items:center;flex:none}
.acc b{font-size:17px;display:block}
.acc small{color:var(--muted);font-size:12.5px;direction:ltr;display:block;text-align:right}
#banner{position:fixed;bottom:calc(var(--sb) + 80px);left:14px;right:14px;z-index:25;display:flex;align-items:center;gap:10px;padding:11px 14px;border-radius:16px;
  background:rgba(255,59,92,.18);border:1px solid rgba(255,59,92,.45);-webkit-backdrop-filter:blur(18px);backdrop-filter:blur(18px);font-size:13px;font-weight:700;
  transform:translateY(30px);opacity:0;pointer-events:none;visibility:hidden;background-color:rgba(40,10,18,.92);
  transition:transform .45s var(--spring),opacity .3s,visibility 0s .45s}
#banner.show{transform:none;opacity:1;pointer-events:auto;visibility:visible;transition:transform .45s var(--spring),opacity .3s,visibility 0s}
#banner span{flex:1;min-width:0}
#banner button{padding:7px 12px;border-radius:999px;background:#fff;color:#000;font-weight:900;font-size:12.5px;flex:none}
.tagr{display:inline-flex;align-items:center;gap:3px;background:var(--gold)!important;color:#000}
.numb{position:absolute;top:7px;right:7px;font-size:10px;font-weight:900;padding:2px 6px;border-radius:7px;background:rgba(0,0,0,.55);color:#fff;font-variant-numeric:tabular-nums}
.credits{text-align:right;margin-top:18px;padding:14px;border-radius:18px;background:var(--surface);animation:fadeUp .5s .5s both}
.credits div{margin-bottom:10px;font-size:13.5px;line-height:1.6}
.credits div:last-child{margin-bottom:0}
.credits small{display:block;color:var(--a3);font-weight:800;font-size:11.5px;margin-bottom:2px}
.pepg{flex:1;min-width:0}
.pepg .r1{display:flex;justify-content:space-between;gap:8px;font-size:14px;font-weight:800}
.pepg .r1 span:first-child{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pepg .tm{font-size:12px;opacity:.7;flex:none;direction:ltr}
.pepg .bar{height:4px;border-radius:2px;background:rgba(255,255,255,.2);margin:7px 0 5px;overflow:hidden}
.pepg .bar i{display:block;height:100%;background:var(--grad)}
.pepg .nx{font-size:12px;opacity:.65;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.schips{display:flex;gap:8px;overflow-x:auto;margin:16px -18px 4px;padding:4px 18px;scrollbar-width:none}
.schips::-webkit-scrollbar{display:none}
.pcard2,.pt,.cn{unicode-bidi:plaintext}

/* ---------- player chooser ---------- */
#chooser{position:fixed;inset:0;z-index:120;display:flex;align-items:flex-end;opacity:0;pointer-events:none;transition:opacity .22s;direction:rtl}
#chooser.open{opacity:1;pointer-events:auto}
#chooser .cbg{position:absolute;inset:0;background:rgba(0,0,0,.55)}
#chooser .cbody{position:relative;width:100%;max-width:640px;margin:0 auto;max-height:88%;overflow-y:auto;background:var(--bg2);border-radius:28px 28px 0 0;
  padding:10px 16px calc(var(--sb) + 20px);transform:translateY(80px);transition:transform .42s var(--spring);border-top:1px solid var(--stroke)}
#chooser.open .cbody{transform:none}
#chooser h3{font-size:20px;font-weight:900;text-align:center;margin-bottom:4px}
#chooser .ps{text-align:center;color:var(--muted);font-size:13px;margin-bottom:14px;unicode-bidi:plaintext}
.pgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:14px}
.ptile{position:relative;display:flex;flex-direction:column;align-items:center;gap:6px;padding:14px 6px 12px;border-radius:18px;background:var(--surface);
  border:1px solid var(--stroke);text-align:center;animation:rise .38s var(--spring) both;animation-delay:calc(var(--i,0) * 32ms)}
.ptile b{font-size:14px;font-weight:900}
.ptile small{font-size:11px;color:var(--muted);font-weight:700;line-height:1.35}
.ptile.on{border-color:var(--a2);background:rgba(var(--a2rgb),.14)}
.ptile .ok{position:absolute;top:8px;left:8px;width:20px;height:20px;border-radius:50%;background:var(--a2);display:grid;place-items:center;color:#fff}
.pic{width:46px;height:46px;border-radius:14px;display:grid;place-items:center;background:linear-gradient(135deg,var(--c1),var(--c2));color:#fff;
  font-weight:900;font-size:15px;letter-spacing:-.3px;direction:ltr;box-shadow:0 6px 16px rgba(0,0,0,.35),inset 0 1px 0 rgba(255,255,255,.25)}
#chooser .remember{background:var(--surface);border:1px solid var(--stroke);border-radius:18px}
.trow .pv{display:flex;align-items:center;gap:4px;color:var(--muted);font-weight:800;font-size:14px;flex:none}
#pstate .xpl{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px;pointer-events:auto;width:100%;max-width:340px}
#pstate .xpl button{display:flex;flex-direction:column;align-items:center;gap:6px;padding:10px 4px 9px;border-radius:16px;background:rgba(255,255,255,.1);
  font-size:12px;font-weight:900;animation:rise .38s var(--spring) both;animation-delay:calc(var(--i,0) * 35ms)}
#pstate .xpl .pic{width:40px;height:40px;border-radius:12px;font-size:13.5px}
#pstate .why{font-size:11px;color:rgba(255,255,255,.4);direction:ltr}
@media (orientation:landscape){#pstate{gap:10px;padding:16px}#pstate .xpl{grid-template-columns:repeat(6,minmax(0,1fr));max-width:620px}}

/* ---------- animations (100 presets = 20 motions × 5 tempos) ---------- */
@keyframes fade{0%{opacity:0}100%{opacity:1}}
@keyframes zoom{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:none}}
@keyframes zoomout{0%{opacity:0;transform:scale(1.18)}100%{opacity:1;transform:none}}
@keyframes slider{0%{opacity:0;transform:translateX(46px)}100%{opacity:1;transform:none}}
@keyframes slidel{0%{opacity:0;transform:translateX(-46px)}100%{opacity:1;transform:none}}
@keyframes drop{0%{opacity:0;transform:translateY(-38px)}100%{opacity:1;transform:none}}
@keyframes flipx{0%{opacity:0;transform:perspective(600px) rotateX(-75deg)}100%{opacity:1;transform:none}}
@keyframes flipy{0%{opacity:0;transform:perspective(600px) rotateY(80deg)}100%{opacity:1;transform:none}}
@keyframes blurin{0%{opacity:0;filter:blur(14px);transform:scale(1.04)}100%{opacity:1;filter:none;transform:none}}
@keyframes swing{0%{opacity:0;transform:rotate(-14deg);transform-origin:top center}100%{opacity:1;transform:none;transform-origin:top center}}
@keyframes bounce{0%{opacity:0;transform:translateY(60px)}60%{opacity:1;transform:translateY(-10px)}80%{transform:translateY(4px)}100%{transform:none}}
@keyframes spin{0%{opacity:0;transform:rotate(-20deg) scale(.7)}100%{opacity:1;transform:none}}
@keyframes skew{0%{opacity:0;transform:skewY(10deg) translateY(30px)}100%{opacity:1;transform:none}}
@keyframes pop{0%{opacity:0;transform:scale(.4)}70%{opacity:1;transform:scale(1.08)}100%{transform:none}}
@keyframes unfold{0%{opacity:0;transform:scaleY(.2);transform-origin:top}100%{opacity:1;transform:none;transform-origin:top}}
@keyframes tilt{0%{opacity:0;transform:perspective(700px) rotateX(35deg) translateY(40px)}100%{opacity:1;transform:none}}
@keyframes glide{0%{opacity:0;transform:translateX(-30px) translateY(20px);filter:blur(6px)}100%{opacity:1;transform:none;filter:none}}
@keyframes elastic{0%{opacity:0;transform:scale(.6,1.3)}40%{opacity:1;transform:scale(1.12,.9)}65%{transform:scale(.96,1.04)}100%{transform:none}}
@keyframes wave{0%{opacity:0;transform:translateY(26px) rotate(4deg)}50%{opacity:1;transform:translateY(-6px) rotate(-2deg)}100%{transform:none}}
html.nomotion .rise{animation:none!important}

/* ---------- sheets: categories, themes, motion ---------- */
#chooser .cbody.tall{height:84%;display:flex;flex-direction:column}
#chooser .cbody.tall .slist{flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;margin:0 -16px;padding:0 16px 10px}
.sfield.in-sheet{margin:0 0 12px}
.crow{display:flex;align-items:center;gap:10px;width:100%;padding:13px 14px;border-radius:14px;text-align:right;font-weight:800;font-size:15px;border:1px solid transparent}
.crow:active{background:var(--surface)}
.crow .t{flex:1;unicode-bidi:plaintext;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.crow small{color:var(--muted);font-weight:700;font-size:12px}
.crow.on{background:rgba(var(--a2rgb),.16);border-color:rgba(var(--a2rgb),.45)}
.crow .okd{width:22px;height:22px;border-radius:50%;background:var(--a2);display:grid;place-items:center;color:#fff;flex:none}
.chip.cbtn{display:flex;align-items:center;gap:6px;color:var(--text);background:rgba(var(--a2rgb),.18);border-color:rgba(var(--a2rgb),.45)}
.chips.sugg{padding-top:0}
.chips.sugg .chip{background:rgba(var(--a2rgb),.12);color:var(--text);font-size:12.5px;padding:7px 12px}
.chips.sugg .lbl{flex:none;align-self:center;color:var(--muted);font-size:12px;font-weight:800}
.pimg .tagl{position:absolute;bottom:7px;left:7px;font-size:9.5px;font-weight:900;padding:2px 6px;border-radius:6px;background:rgba(0,0,0,.6);color:#fff;letter-spacing:.4px;direction:ltr}
.thgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.thcard{position:relative;border-radius:16px;overflow:hidden;border:2px solid transparent;text-align:right;background:var(--surface)}
.thcard.on{border-color:var(--text)}
.thprev{height:78px;position:relative;padding:9px}
.thprev .bar{height:9px;border-radius:5px;width:70%}
.thprev .row{display:flex;gap:5px;margin-top:9px}
.thprev .row i{flex:1;height:30px;border-radius:7px}
.thname{padding:7px 9px 9px;font-size:11.5px;font-weight:800;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.thcard .okd{position:absolute;top:6px;left:6px;width:20px;height:20px;border-radius:50%;background:#fff;color:#000;display:grid;place-items:center}
.segs{display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;margin:0 -16px 12px;padding:0 16px}
.segs::-webkit-scrollbar{display:none}
.segs button{flex:none;padding:7px 13px;border-radius:999px;background:var(--surface);border:1px solid var(--stroke);font-size:12.5px;font-weight:800;color:var(--muted)}
.segs button.on{background:var(--grad);color:#fff;border-color:transparent}
.andemo{display:flex;gap:8px;margin-bottom:12px;height:86px}
.andemo i{flex:1;border-radius:12px;background:var(--grad);opacity:.9}
.anrow{display:flex;align-items:center;gap:10px;width:100%;padding:11px 12px;border-radius:14px;text-align:right;border:1px solid transparent;font-weight:800;font-size:14px}
.anrow small{display:block;color:var(--muted);font-size:11.5px;font-weight:700;margin-top:2px}
.anrow.on{background:rgba(var(--a2rgb),.16);border-color:rgba(var(--a2rgb),.45)}
.anrow .ic{width:34px;height:34px;border-radius:10px;background:var(--surface2);display:grid;place-items:center;flex:none;font-size:15px}
.anhead{color:var(--muted);font-size:12px;font-weight:800;margin:12px 4px 6px}
.trow .sw2{display:flex;align-items:center;gap:8px;color:var(--muted);font-weight:800;font-size:13.5px}
.trow .sw2 i{width:16px;height:16px;border-radius:50%;display:block}

#pstate .xsec{font-size:11.5px;font-weight:800;color:rgba(255,255,255,.55);margin-top:2px;margin-bottom:-6px;pointer-events:none}
#pstate .xpl.mini{grid-template-columns:repeat(6,minmax(0,1fr));max-width:360px;gap:6px}
#pstate .xpl.mini button{padding:7px 2px;font-size:10px;border-radius:12px}
#pstate .xpl.mini .pic{width:30px;height:30px;border-radius:9px;font-size:11px}
@media (orientation:landscape){#pstate .xpl.mini{max-width:520px}}

/* ---------- 10 poster layouts (every theme brings one) ---------- */
/* 1 · كبير */
html.lay-1 .grid{grid-template-columns:repeat(2,1fr);gap:22px 14px}
html.lay-1 .pt{font-size:14.5px}
html.lay-1 .htrack .pcard{width:150px}
html.lay-1 .cgrid{grid-template-columns:repeat(3,1fr)}
html.lay-1 .slide-in{height:470px}
/* 2 · مكثف */
html.lay-2 .grid{grid-template-columns:repeat(4,1fr);gap:12px 8px;padding-inline:12px}
html.lay-2 .pimg{border-radius:10px}
html.lay-2 .pt{font-size:11px;-webkit-line-clamp:1;margin-top:5px}
html.lay-2 .py{display:none}
html.lay-2 .htrack .pcard{width:94px}
html.lay-2 .cgrid{grid-template-columns:repeat(4,1fr);gap:12px 8px}
html.lay-2 .cgrid .ctile{border-radius:16px}
html.lay-2 .cn{font-size:11px}
html.lay-2 .slide-in{height:330px}
/* 3 · عريض */
html.lay-3 .grid{grid-template-columns:repeat(2,1fr);gap:18px 12px}
html.lay-3 .pimg{aspect-ratio:16/10;border-radius:14px}
html.lay-3 .htrack .pcard{width:214px}
html.lay-3 .cgrid{grid-template-columns:repeat(2,1fr)}
html.lay-3 .cgrid .ctile{aspect-ratio:16/9}
/* 4 · قائمة */
html.lay-4 .grid{grid-template-columns:1fr;gap:10px}
html.lay-4 .grid .pcard{display:grid;grid-template-columns:74px 1fr;grid-template-rows:auto auto;column-gap:14px;align-items:center;
  background:var(--surface);border:1px solid var(--stroke);border-radius:16px;padding:8px}
html.lay-4 .grid .pimg{grid-row:1/3;border-radius:10px}
html.lay-4 .grid .pt{margin:0;font-size:15px;align-self:end}
html.lay-4 .grid .py{align-self:start;font-size:12px}
html.lay-4 .cgrid{grid-template-columns:1fr;gap:8px}
html.lay-4 .cgrid .ccard{display:flex;align-items:center;gap:14px;text-align:right;background:var(--surface);border:1px solid var(--stroke);border-radius:16px;padding:8px}
html.lay-4 .cgrid .ctile{width:62px;height:62px;flex:none;border-radius:14px}
html.lay-4 .cgrid .cn{margin:0;font-size:15px;flex:1}
/* 5 · مستدير (العنوان فوق الصورة) */
html.lay-5 .pimg{aspect-ratio:3/4;border-radius:26px}
html.lay-5 .ctile,html.lay-5 .cgrid .ctile{border-radius:50%}
/* 6 · سينما (عمودين، العنوان فوق الصورة) */
html.lay-6 .grid{grid-template-columns:repeat(2,1fr);gap:14px 12px}
html.lay-6 .pimg{border-radius:6px}
html.lay-6 .htrack .pcard{width:160px}
html.lay-6 .slide-in{height:480px;border-radius:10px}
html.lay-5 .pcard,html.lay-6 .pcard{position:relative}
html.lay-5 .pimg::after,html.lay-6 .pimg::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 50%,rgba(0,0,0,.88));z-index:1;pointer-events:none}
html.lay-5 .pimg .tagk,html.lay-5 .pimg .tagl,html.lay-6 .pimg .tagk,html.lay-6 .pimg .tagl{z-index:3}
html.lay-5 .pt,html.lay-6 .pt{position:absolute;left:10px;right:10px;bottom:10px;margin:0;color:#fff;z-index:2;text-shadow:0 1px 6px rgba(0,0,0,.6)}
html.lay-5 .py,html.lay-6 .py{display:none}
html.lay-6 .pt{font-size:15px}
/* 7 · بارز (بطاقة كبيرة كل 7) */
html.lay-7 .grid{grid-auto-flow:dense}
html.lay-7 .grid .pcard:nth-child(7n+1){grid-column:span 2;grid-row:span 2}
html.lay-7 .grid .pcard:nth-child(7n+1) .pt{font-size:16px}
html.lay-7 .htrack .pcard:first-child{width:180px}
/* 8 · حاد */
html.lay-8 .pimg{border-radius:3px;border-width:2px}
html.lay-8 .ctile,html.lay-8 .cgrid .ctile{border-radius:6px}
html.lay-8 .pt,html.lay-8 .py,html.lay-8 .cn{text-align:center}
html.lay-8 .slide-in{border-radius:6px}
html.lay-8 .chip{border-radius:8px}
/* 9 · فسيفساء (أعمدة متدرجة) */
html.lay-9 .grid{gap:12px 12px;padding-bottom:40px}
html.lay-9 .grid .pcard:nth-child(3n+2){transform:translateY(26px)}
html.lay-9 .pimg{box-shadow:0 14px 30px rgba(0,0,0,.5);border-radius:20px}
html.lay-9 .pt,html.lay-9 .py{text-align:center}
.thlay{position:absolute;bottom:6px;left:8px;font-size:9.5px;font-weight:900;padding:2px 6px;border-radius:6px;background:rgba(0,0,0,.45);color:#fff}
.thmini{display:grid;gap:3px;margin-top:8px}
.thmini i{display:block;border-radius:3px}

#pstate .lab{font-size:12px;font-weight:800;color:rgba(255,255,255,.6);min-height:16px;direction:rtl}
#pstate button.why{pointer-events:auto;background:none;font-size:11px;color:rgba(255,255,255,.45);direction:rtl;padding:4px 8px}
#pstate .plog{pointer-events:auto;direction:ltr;text-align:left;font:600 10.5px ui-monospace,Menlo,monospace;color:rgba(255,255,255,.7);background:rgba(255,255,255,.07);
  border-radius:12px;padding:10px 12px;max-width:360px;max-height:180px;overflow:auto;white-space:pre-wrap;margin:0}

/* ---------- subtitles ---------- */
#psub{position:absolute;left:4%;right:4%;bottom:15%;z-index:2;text-align:center;pointer-events:none;direction:rtl;unicode-bidi:plaintext;
  font-weight:800;line-height:1.45;color:#fff;transition:bottom .3s}
#psub span{unicode-bidi:plaintext;padding:1px 8px;border-radius:6px;-webkit-box-decoration-break:clone;box-decoration-break:clone}
#psub[data-bg="1"] span{text-shadow:0 0 4px #000,0 2px 6px #000,0 0 2px #000}
#psub[data-bg="2"] span{background:rgba(0,0,0,.72)}
#player:has(#pctl:not(.off)) #psub{bottom:26%}
video::cue{font-size:110%;background:rgba(0,0,0,.6)}
.skipb{position:relative}
.skipb i{position:absolute;inset:0;display:grid;place-items:center;font-size:9px;font-weight:900;font-style:normal;padding-top:2px;direction:ltr}
.trow.pk{border:1px solid transparent;border-radius:0}
.trow.pk.on{background:rgba(var(--a2rgb),.14)}
.trow.pk .okd{width:22px;height:22px;border-radius:50%;background:var(--a2);display:grid;place-items:center;color:#fff;flex:none}
/* glass controls */
html.glass #player .cb{background:rgba(255,255,255,.14);-webkit-backdrop-filter:blur(18px) saturate(1.6);backdrop-filter:blur(18px) saturate(1.6);
  border:1px solid rgba(255,255,255,.28);box-shadow:inset 0 1px 0 rgba(255,255,255,.35),0 6px 18px rgba(0,0,0,.3)}
html.glass #player .chipbtn{background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.28)}
/* ---------- downloads ---------- */
.dlrow{display:flex;align-items:center;gap:12px;padding:10px;border-radius:16px;background:var(--surface);border:1px solid var(--stroke);margin-bottom:10px}
.dlp{width:54px;aspect-ratio:2/3;border-radius:10px;overflow:hidden;background:var(--surface2);flex:none}
.dlp img{width:100%;height:100%;object-fit:cover}
.dlm{flex:1;min-width:0;display:flex;flex-direction:column;gap:3px}
.dlm b{font-size:14.5px;unicode-bidi:plaintext;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.dlm small{font-size:11.5px;color:var(--muted);font-weight:700;unicode-bidi:plaintext}
.dlm small.err{color:var(--live)}
.dlbar{height:5px;border-radius:3px;background:rgba(255,255,255,.12);overflow:hidden;margin:3px 0}
.dlbar i{display:block;height:100%;background:var(--grad);border-radius:3px;transition:width .6s}
.dla{display:flex;flex-direction:column;gap:6px}
.dla button{width:38px;height:38px;border-radius:12px;background:var(--surface2);display:grid;place-items:center}
.dla button.pr{background:var(--grad)}
.epdl{width:34px;height:34px;border-radius:10px;display:grid;place-items:center;color:var(--muted);flex:none}
.epdl:active{background:var(--surface2)}
.drow{display:flex;gap:12px;align-items:flex-start;padding:11px 4px;border-bottom:1px solid var(--stroke)}
.drow span{font-weight:800;font-size:14px;display:block}
.drow small{display:block;color:var(--muted);font-size:12px;font-weight:600;margin-top:2px;unicode-bidi:plaintext;word-break:break-word}
.dk{width:24px;height:24px;border-radius:50%;display:grid;place-items:center;flex:none;font-size:13px;background:var(--surface2);color:var(--muted)}
.dk.ok{background:#1f9d55;color:#fff}
.dk.no{background:var(--live);color:#fff}

/* ---- gestures, next episode, lock, guide, parental ---- */
#pgest{position:absolute;inset:0;pointer-events:none;z-index:3;display:flex;align-items:center;opacity:0;transition:opacity .2s}
#pgest.show{opacity:1}
#pgest>div{width:38%;height:100%;display:flex;align-items:center;justify-content:center;background:radial-gradient(closest-side,rgba(255,255,255,.18),transparent);animation:gpop .45s var(--ease,ease)}
#pgest.r{justify-content:flex-end}#pgest.r>div{border-radius:50% 0 0 50%/50% 0 0 50%}
#pgest.l{justify-content:flex-start}#pgest.l>div{border-radius:0 50% 50% 0/0 50% 50% 0}
#pgest.c{justify-content:center}#pgest.c>div{width:auto;height:auto;padding:12px 20px;border-radius:16px;background:rgba(0,0,0,.6);backdrop-filter:blur(12px)}
#pgest b{font-size:17px;font-weight:800;color:#fff;text-shadow:0 2px 10px rgba(0,0,0,.6);direction:ltr}
@keyframes gpop{from{transform:scale(.85);opacity:.3}to{transform:none;opacity:1}}
#pnextup{position:absolute;bottom:calc(var(--sb,0px) + 92px);left:14px;z-index:5;display:flex;align-items:center;gap:8px;padding:10px;border-radius:18px;max-width:min(340px,calc(100% - 28px));
  background:rgba(var(--surfrgb,20,20,30),.86);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);border:1px solid rgba(255,255,255,.1);box-shadow:0 12px 40px rgba(0,0,0,.45);
  transform:translateY(20px);opacity:0;pointer-events:none;transition:transform .35s cubic-bezier(.2,.9,.3,1.2),opacity .25s}
#pnextup.show{transform:none;opacity:1;pointer-events:auto}
#pnextup .nt{display:flex;flex-direction:column;min-width:0;padding:0 6px}
#pnextup small{font-size:11.5px;color:var(--a2);font-weight:700}
#pnextup b{font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#pnextup .go{display:flex;align-items:center;gap:6px;padding:9px 14px;border-radius:12px;border:0;color:#fff;font:700 13px inherit;font-family:inherit;background:linear-gradient(135deg,var(--a1),var(--a2));white-space:nowrap}
#pnextup .x{width:34px;height:34px;border-radius:11px;border:0;color:var(--text);background:rgba(255,255,255,.08);display:grid;place-items:center}
#p-sleep{font-size:11.5px;color:var(--a2);font-weight:700;margin-top:2px}
#plockui{position:absolute;top:calc(var(--st,0px) + 16px);left:50%;transform:translate(-50%,-12px);z-index:7;display:flex;align-items:center;gap:8px;padding:10px 18px;border-radius:999px;border:0;
  color:#fff;font:700 14px inherit;font-family:inherit;background:rgba(0,0,0,.62);backdrop-filter:blur(14px);opacity:0;pointer-events:none;transition:opacity .25s,transform .3s}
#plockui.show{opacity:1;transform:translate(-50%,0);pointer-events:auto}
#player.locked #pctl,#player.locked #plist,#player.locked #pnextup{display:none!important}
.seg.wrap{flex-wrap:wrap;justify-content:flex-start;gap:6px}
.gdays{display:flex;gap:8px;overflow-x:auto;padding:4px 2px 10px;scrollbar-width:none}
.gdays::-webkit-scrollbar{display:none}
.glist{gap:4px}
.gp{display:flex;align-items:center;gap:12px;width:100%;padding:12px 12px;border-radius:14px;border:0;background:transparent;color:var(--text);font:inherit;text-align:right}
.gp .tm{font-size:13px;color:var(--muted);font-variant-numeric:tabular-nums;direction:ltr;min-width:44px}
.gp .t{flex:1;font-size:14.5px;line-height:1.35}
.gp.past{opacity:.62}.gp.arc{opacity:1}
.gp.arc .pl{width:30px;height:30px;border-radius:10px;display:grid;place-items:center;color:#fff;background:linear-gradient(135deg,var(--a1),var(--a2));flex:none}
.gp.now{background:rgba(var(--a1rgb,120,90,255),.16);box-shadow:inset 0 0 0 1px rgba(var(--a1rgb,120,90,255),.35)}
.gp .lb{display:inline-block;margin-inline-start:8px;padding:2px 8px;border-radius:999px;font-size:11px;font-style:normal;font-weight:800;color:#fff;background:#e5484d}
.pindots{display:flex;justify-content:center;gap:16px;margin:14px 0 8px}
.pindots i{width:15px;height:15px;border-radius:50%;border:2px solid rgba(255,255,255,.35);transition:background .15s,transform .15s}
.pindots i.on{background:var(--a2);border-color:var(--a2);transform:scale(1.1)}
.pinmsg{text-align:center;color:#ff6b6b;font-size:13px;margin:4px 0}
.pinpad{display:grid;grid-template-columns:repeat(3,72px);justify-content:center;gap:12px;margin:12px 0 6px}
.pinpad button{height:62px;border-radius:20px;border:0;font:700 24px inherit;font-family:inherit;color:var(--text);background:rgba(255,255,255,.07)}
.pinpad button:active{background:rgba(255,255,255,.16)}
.chip.lockchip{color:var(--muted)}

.chipbtn.ico{padding-inline:11px}
.chipbtn.sl{color:var(--a2)}
.trow .seg.wrap{flex:1;display:flex;flex-wrap:wrap;justify-content:flex-start;gap:6px;background:none;padding:0}
.trow .seg.wrap button{flex:1 1 auto;min-width:64px;background:rgba(255,255,255,.06);border-radius:11px}
.trow .seg.wrap button.on{background:linear-gradient(135deg,var(--a1),var(--a2));color:#fff}

/* ---- آخر المضاف ---- */
.pimg .tagn{position:absolute;left:6px;right:6px;bottom:6px;z-index:3;display:flex;align-items:center;justify-content:center;gap:4px;font-size:10.5px;font-weight:800;padding:4px 6px;border-radius:9px;
  color:#fff;background:linear-gradient(135deg,rgba(var(--a1rgb,120,90,255),.92),rgba(var(--a2rgb,80,140,255),.92));box-shadow:0 4px 14px rgba(0,0,0,.35);white-space:nowrap}
.chip.newchip{gap:5px}
.chip.newchip:not(.on){color:var(--a3,var(--a2))}
.newbar{display:flex;flex-wrap:wrap;align-items:center;gap:8px;padding:2px 16px 12px}
.newbar button{padding:7px 13px;border-radius:999px;font-size:12.5px;font-weight:800;color:var(--muted);background:var(--surface2,rgba(255,255,255,.07))}
.newbar button.on{color:#fff;background:linear-gradient(135deg,var(--a1),var(--a2))}
.newbar small{flex-basis:100%;color:var(--muted);font-size:11.5px}
.rail-h .rh2{display:flex;gap:14px}

.chip.newchip{display:inline-flex;align-items:center;gap:5px;white-space:nowrap}
.dmeta .dadd{display:inline-flex;align-items:center;gap:4px;color:var(--a3,var(--a2))}

/* ---- تحسين الصورة ---- */
#penh{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;opacity:0;transition:opacity .25s}
#penh.on{opacity:1}
.chipbtn.enhb{gap:3px;font-size:13px}
.chipbtn.enhb b{font-size:11px;font-weight:900;letter-spacing:.3px}
.chipbtn.enhb.on{color:#fff;background:linear-gradient(135deg,var(--a1),var(--a2));box-shadow:0 0 0 1px rgba(255,255,255,.18),0 6px 18px rgba(var(--a1rgb,120,90,255),.45)}

/* ================= ثيم «متفلكس»: واجهة سينمائية ومشغّل خاص ================= */
.mfonly{display:none!important}
html.skin-mf .mfonly{display:flex!important}
html.skin-mf{--stroke:rgba(255,255,255,.08);--muted:#a3a3a3}
html.skin-mf body{background:#000}
html.skin-mf .aurora{display:none}
html.skin-mf .page{bottom:calc(58px + var(--sb))}
/* home: the picture runs to the edges, the bar floats over it */
html.skin-mf #pg-home .topbar{position:absolute;top:0;left:0;right:0;z-index:6;background:linear-gradient(180deg,rgba(0,0,0,.82),rgba(0,0,0,.45) 60%,rgba(0,0,0,0));padding-bottom:26px}
html.skin-mf #pg-home .topbar h1{background:none;-webkit-background-clip:initial;background-clip:initial;color:var(--a2);letter-spacing:.5px;text-shadow:0 2px 14px rgba(0,0,0,.6)}
html.skin-mf #pg-home .topbar .hello{color:rgba(255,255,255,.75)}
html.skin-mf .roundbtn{background:rgba(0,0,0,.35);border-color:rgba(255,255,255,.12)}
html.skin-mf .hero{margin:0}
html.skin-mf .slide{padding:0}
html.skin-mf .slide-in{height:max(470px,64vh);border-radius:0;box-shadow:none;background:#000}
html.skin-mf .sbg{inset:0;filter:none;opacity:1;transform:none}
html.skin-mf .slide.active .sbg{animation:mfzoom 14s ease-out forwards}
@keyframes mfzoom{from{transform:scale(1.02)}to{transform:scale(1.1)}}
html.skin-mf .sshade{background:linear-gradient(180deg,rgba(0,0,0,.25) 0%,rgba(0,0,0,0) 30%,rgba(0,0,0,.35) 58%,rgba(0,0,0,.92) 88%,#000 100%),linear-gradient(90deg,rgba(0,0,0,.35),rgba(0,0,0,0) 45%)}
html.skin-mf .sposter{display:none}
html.skin-mf .sinfo{left:22px;right:22px;bottom:22px}
html.skin-mf .kicker{background:none;padding:0;color:var(--a2);font-size:12px;letter-spacing:1.2px;text-transform:uppercase}
html.skin-mf .sinfo h3{font-size:31px;line-height:1.15;text-shadow:0 4px 24px rgba(0,0,0,.7)}
html.skin-mf .smeta{color:#d6d6d6;font-size:13px}
html.skin-mf .btn-play{border-radius:6px;padding:11px 26px;font-size:16px}
html.skin-mf .btn-ghost{border-radius:6px;background:rgba(255,255,255,.2);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}
html.skin-mf .dots{margin-top:14px}
html.skin-mf .dots i{height:3px;border-radius:2px}
html.skin-mf .dots i.on b{background:var(--a2)}
/* rows of posters */
html.skin-mf .rail{margin-top:20px}
html.skin-mf .rail-h{padding:0 16px 8px}
html.skin-mf .rail-h h3{font-size:17px;font-weight:800}
html.skin-mf .rail-h h3 span{display:none}
html.skin-mf .rail-h button{color:#cfcfcf}
html.skin-mf .htrack{gap:7px}
html.skin-mf .pcard{width:110px}
html.skin-mf .pimg{border-radius:6px;border:0;box-shadow:none;background:#1a1a1a}
html.skin-mf .pimg .tagk{display:none}
html.skin-mf .pt{font-size:12px;font-weight:700;color:#e5e5e5}
html.skin-mf .py{display:none}
html.skin-mf .pimg .tagn{left:0;right:0;bottom:0;border-radius:0;background:linear-gradient(0deg,rgba(0,0,0,.92),rgba(0,0,0,.55));color:var(--a3);box-shadow:none;font-size:10px}
html.skin-mf .ccard .ctile{border-radius:6px;background:#141414;border-color:transparent}
/* chips and lists */
html.skin-mf .chip{background:transparent;border:1px solid rgba(255,255,255,.4);color:#fff;border-radius:999px;font-weight:700}
html.skin-mf .chip.on{background:#fff;color:#000;border-color:#fff;box-shadow:none;transform:none}
html.skin-mf .chip.on small{color:#000;opacity:.6}
html.skin-mf .newbar button.on,html.skin-mf .seg button.on{background:#fff;color:#000}
/* tab bar: flush to the bottom, quiet */
html.skin-mf #tabbar{left:0;right:0;bottom:0;height:calc(58px + var(--sb));padding-bottom:var(--sb);border-radius:0;background:rgba(0,0,0,.94);border:0;border-top:1px solid #1d1d1d;box-shadow:none;-webkit-backdrop-filter:none;backdrop-filter:none}
html.skin-mf #tabind{display:none}
html.skin-mf #tabbar button{color:#8c8c8c}
html.skin-mf #tabbar button.on{color:#fff}
html.skin-mf #tabbar button.on::after{content:"";position:absolute;top:0;left:30%;right:30%;height:2px;border-radius:2px;background:var(--a2)}
/* details */
html.skin-mf #sheet{background:#000}
html.skin-mf .dhero .bg{filter:blur(30px) saturate(1.1);opacity:.45}
html.skin-mf .dhero .pos{border-radius:8px}
html.skin-mf .bigplay{background:#fff;color:#000;border-radius:6px;box-shadow:none}
html.skin-mf .bigplay::after{display:none}
/* the player: no bubbles, big clean controls, a thin accent line, labelled actions */
html.skin-mf #pctl{background:linear-gradient(180deg,rgba(0,0,0,.72) 0%,rgba(0,0,0,0) 24%,rgba(0,0,0,0) 58%,rgba(0,0,0,.88) 100%)}
html.skin-mf .cb{background:transparent;-webkit-backdrop-filter:none;backdrop-filter:none;box-shadow:none;border:0}
html.skin-mf .cb svg{filter:drop-shadow(0 2px 6px rgba(0,0,0,.55))}
html.skin-mf .cb.xl{width:92px;height:92px;background:transparent}
html.skin-mf .cb.xl svg{transform:scale(1.55)}
html.skin-mf .skipb svg{transform:scale(1.25)}
html.skin-mf .pmid{gap:64px}
html.skin-mf .ptitles{text-align:center}
html.skin-mf .ptitles .a{font-size:15px;font-weight:800}
html.skin-mf #p-media,html.skin-mf #p-listbtn{display:none}
html.skin-mf input[type=range]{height:3px}
html.skin-mf input[type=range]::-webkit-slider-thumb{width:15px;height:15px;background:var(--a2);box-shadow:0 0 0 4px rgba(0,0,0,.35)}
html.skin-mf .pvod .t{color:#e5e5e5}
html.skin-mf .ptools{flex-wrap:wrap;justify-content:center;gap:4px 6px}
html.skin-mf .ptools .g{gap:4px}
html.skin-mf .chipbtn{background:transparent;-webkit-backdrop-filter:none;backdrop-filter:none;padding:8px 10px;font-size:13px;font-weight:700;border-radius:8px}
html.skin-mf .chipbtn:active{background:rgba(255,255,255,.12)}
html.skin-mf .chipbtn.enhb.on{background:transparent;color:var(--a2);box-shadow:none}
html.skin-mf .lbadge{background:var(--a2);color:#000}
html.skin-mf #pstate .ring{border-top-color:var(--a2)}
html.skin-mf #pnextup{border-radius:8px;background:rgba(20,20,20,.95)}
html.skin-mf #pnextup .go{background:#fff;color:#000;border-radius:6px}
/* the card in the theme picker */
.spcard{position:relative;display:flex;align-items:center;gap:14px;width:100%;padding:10px;margin:2px 0 6px;border-radius:18px;background:var(--surface);border:1px solid var(--stroke);text-align:right;color:var(--text)}
.spcard.on{border-color:var(--a2);box-shadow:0 0 0 1px var(--a2)}
.spcard .okd{position:absolute;top:10px;left:10px}
.spprev{width:132px;height:96px;border-radius:12px;overflow:hidden;background:#000;flex:none;display:flex;flex-direction:column;gap:5px;padding:0 0 6px}
.spprev .sph{position:relative;height:50px;background:linear-gradient(180deg,#3a2a12,#000);display:flex;align-items:flex-end;gap:4px;padding:6px 8px}
.spprev .sph b{position:absolute;top:5px;right:8px;font-size:9px;font-weight:900;color:#ffb020}
.spprev .sph i{width:22px;height:7px;border-radius:2px;background:#fff}
.spprev .sph i+i{background:#555}
.spprev .spr{display:flex;gap:3px;padding:0 6px}
.spprev .spr i{flex:1;height:14px;border-radius:2px;background:#2a2a2a}
.spprev .spr i:first-child{background:#ff7a18}
.spinfo{display:flex;flex-direction:column;gap:3px}
.spinfo b{font-size:17px;font-weight:900}
.spinfo small{font-size:12px;color:var(--muted)}
html.skin-mf #player .cb{background:transparent;border:0;box-shadow:none;-webkit-backdrop-filter:none;backdrop-filter:none}
html.skin-mf #player .chipbtn{background:transparent;border:0}
html.skin-mf #player .chipbtn:active,html.skin-mf #player .cb:active{background:rgba(255,255,255,.12)}

html.skin-mf #pg-home .topbar{transition:background .25s}
html.skin-mf #pg-home .topbar.solid{background:rgba(0,0,0,.94);padding-bottom:12px}
</style>
</head>
<body>

<div id="splash">
  <div class="mark"><svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="5" width="19" height="13" rx="3.5" opacity=".9"/><path class="tri" d="M10 8.8v6.4l5.2-3.2z" fill="none"/><path d="M8 21h8"/></svg></div>
  <div class="splash-name" id="splash-name"></div>
  <div class="splash-sub">اشتراك MAC · بث مباشر · أفلام · مسلسلات</div>
</div>

<section class="page" id="pg-home">
  <div class="aurora"><i></i><i></i><i></i></div>
  <div class="topbar">
    <div><div class="hello" id="hello"></div><h1>سهرة MAC</h1></div>
    <div class="tbtns">
      <button class="roundbtn press" data-act="tab" data-tab="search" aria-label="بحث"><span data-icon="search"></span></button>
      <button class="roundbtn press" data-act="settings" aria-label="الإعدادات"><span data-icon="gear"></span></button>
    </div>
  </div>
  <div class="scroll" id="home-scroll">
    <div class="hero" id="hero"></div>
    <div id="rails"></div>
    <div style="height:30px"></div>
  </div>
</section>

<section class="page" id="pg-live">
  <div class="topbar"><div><h2>البث المباشر</h2><div class="sub" id="live-sub">جارٍ التحميل…</div></div>
    <button class="roundbtn press" data-act="settings"><span data-icon="sliders"></span></button></div>
  <label class="sfield"><span data-icon="search"></span><input id="live-q" type="search" placeholder="ابحث باسم القناة أو رقمها" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"><button class="clr hidden" data-act="clear-live"><span data-icon="x" data-size="14"></span></button></label>
  <div class="chips" id="live-chips"></div>
  <div class="chips sugg hidden" id="live-sugg"></div>
  <div class="scroll" id="live-scroll"><div class="cgrid" id="live-grid"></div><div id="live-more"></div></div>
</section>

<section class="page" id="pg-movies">
  <div class="topbar"><div><h2>الأفلام</h2><div class="sub" id="movies-sub"></div></div>
    <button class="roundbtn press" data-act="settings"><span data-icon="sliders"></span></button></div>
  <label class="sfield"><span data-icon="search"></span><input id="movies-q" type="search" placeholder="ابحث في هذا القسم…" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"><button class="clr hidden" data-act="clear-catq" data-kind="movies"><span data-icon="x" data-size="14"></span></button></label>
  <div class="chips" id="movies-chips"></div>
  <div class="scroll" id="movies-scroll"><div class="grid" id="movies-grid"></div><div id="movies-status"></div></div>
</section>

<section class="page" id="pg-series">
  <div class="topbar"><div><h2>المسلسلات</h2><div class="sub" id="series-sub"></div></div>
    <button class="roundbtn press" data-act="settings"><span data-icon="sliders"></span></button></div>
  <label class="sfield"><span data-icon="search"></span><input id="series-q" type="search" placeholder="ابحث في هذا القسم…" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"><button class="clr hidden" data-act="clear-catq" data-kind="series"><span data-icon="x" data-size="14"></span></button></label>
  <div class="chips" id="series-chips"></div>
  <div class="scroll" id="series-scroll"><div class="grid" id="series-grid"></div><div id="series-status"></div></div>
</section>

<section class="page" id="pg-search">
  <div class="topbar"><div><h2>البحث</h2><div class="sub">قنوات، أفلام، مسلسلات</div></div></div>
  <label class="sfield"><span data-icon="search"></span><input id="search-q" type="search" placeholder="اكتب اسم قناة أو فيلم…" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" enterkeyhint="search"><button class="clr hidden" data-act="clear-search"><span data-icon="x" data-size="14"></span></button></label>
  <div class="scroll" id="search-scroll"><div id="search-body"></div></div>
</section>

<nav id="tabbar">
  <div id="tabind"></div>
  <button data-act="tab" data-tab="home" class="on"><span data-icon="home"></span>الرئيسية</button>
  <button data-act="tab" data-tab="live"><span data-icon="live"></span>مباشر</button>
  <button data-act="tab" data-tab="movies"><span data-icon="film"></span>أفلام</button>
  <button data-act="tab" data-tab="series"><span data-icon="series"></span>مسلسلات</button>
  <button data-act="tab" data-tab="search"><span data-icon="search"></span>بحث</button>
</nav>

<div id="sheet">
  <div class="dnav" id="dnav"><button class="roundbtn press" data-act="close-sheet"><span data-icon="chev"></span></button><div class="t" id="dnav-t"></div><div style="width:42px"></div></div>
  <div class="scroll" id="sheet-scroll"><div id="sheet-body"></div></div>
</div>

<div id="modal"><div class="panel" id="panel"></div></div>

<div id="player">
  <video id="video" playsinline webkit-playsinline preload="auto" autopictureinpicture x-webkit-airplay="allow"></video>
  <div id="ptap"></div>
  <div id="psub"></div>
  <div id="pstate"></div>
  <div id="zap"></div>
  <div id="pgest"></div>
  <div id="pnextup"></div>
  <button id="plockui" data-p="unlock"><span data-icon="unlock" data-size="22"></span><b>اضغط لفتح القفل</b></button>
  <div id="pctl">
    <div class="ptop">
      <button class="cb" data-p="close"><span data-icon="x"></span></button>
      <div class="ptitles"><div class="a" id="p-title"></div><div class="b" id="p-sub"></div></div>
      <button class="cb" data-p="favch" id="p-fav"></button>
      <button class="cb" data-p="pip" id="p-pip"><span data-icon="pip"></span></button>
      <button class="cb" data-p="media" id="p-media"><span data-icon="cc"></span></button>
      <button class="cb" data-p="aspect"><span data-icon="aspect"></span></button>
      <button class="cb" data-p="full"><span data-icon="full"></span></button>
      <button class="cb" data-p="list" id="p-listbtn"><span data-icon="list"></span></button>
    </div>
    <div class="pmid" id="pmid"></div>
    <div class="pbot">
      <div id="pinfo"></div>
      <div class="ptools"><div class="g"><button class="chipbtn" data-p="players"><span data-icon="players" data-size="16"></span>مشغّل آخر</button><button class="chipbtn ico" data-p="lock" aria-label="قفل الشاشة"><span data-icon="lock" data-size="16"></span></button><button class="chipbtn ico enhb" id="p-enh" data-p="enh" aria-label="تحسين الصورة">✨<b>HD</b></button><button class="chipbtn sl hidden" id="p-sleep" data-p="media"></button></div><div class="g mfonly"><button class="chipbtn" data-p="media"><span data-icon="cc" data-size="16"></span><span>الصوت والترجمة</span></button><button class="chipbtn" id="p-listchip" data-p="list"><span data-icon="list" data-size="16"></span><span>الحلقات</span></button></div><div class="g" id="pnext"></div></div>
    </div>
  </div>
  <div id="plist"><div class="h"><span id="plist-t">القنوات</span><button class="cb" data-p="list-close"><span data-icon="x"></span></button></div><div class="scroll" id="plist-body"></div></div>
</div>

<div id="chooser"><div class="cbg" data-act="chooser-close"></div><div class="cbody"></div></div>

<section class="screen" id="portals">
  <div class="aurora"><i></i><i></i><i></i></div>
  <div class="scroll" style="position:relative;z-index:1">
    <div class="brand">
      <div class="mark"><svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="5" width="19" height="13" rx="3.5"/><path d="M10 8.8v6.4l5.2-3.2z" fill="#fff"/><path d="M8 21h8"/></svg></div>
      <h1>سهرة MAC</h1>
      <p>شغّل اشتراك MAC (Stalker) بواجهة احترافية</p>
    </div>
    <div id="portal-error"></div>
    <div id="portal-list"></div>
    <button class="bigbtn press" data-act="add-portal"><span data-icon="plus"></span>إضافة اشتراك MAC</button>
  </div>
</section>

<section class="screen" id="connecting">
  <div class="mark"><svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="5" width="19" height="13" rx="3.5"/><path d="M10 8.8v6.4l5.2-3.2z" fill="#fff"/><path d="M8 21h8"/></svg></div>
  <div><div id="conn-name" style="font-size:22px;font-weight:900"></div><div class="muted" style="color:var(--muted);margin-top:4px;font-size:13px" id="conn-mac"></div></div>
  <div class="steps">
    <div class="step" id="st-1"><i></i>الاتصال بالبورتال</div>
    <div class="step" id="st-2"><i></i>التحقق من عنوان MAC</div>
    <div class="step" id="st-3"><i></i>تحميل القنوات</div>
  </div>
  <button class="linkbtn" data-act="cancel-connect">إلغاء</button>
  <div id="conn-note" class="hidden" style="max-width:340px;margin:0 auto;padding:12px 14px;border-radius:14px;background:rgba(255,255,255,.06);color:var(--muted);font-size:12px;line-height:1.7"></div>
</section>

<div id="banner"><span data-icon="alert"></span><span id="banner-t"></span><button data-act="retry-connect">إعادة الاتصال</button></div>

<div id="toast"></div>

<script>
/* ================= MPEG-TS live engine =================
 * Plays MPEG-TS (H.264 + AAC) live streams inside the page:
 * fetch stream -> demux TS -> remux to fragmented MP4 -> (Managed)MediaSource.
 */
const TSEngine = (() => {
  const MS = () => window.ManagedMediaSource || window.MediaSource || null;

  /* ---------- small byte helpers ---------- */
  function concat(list, total) {
    const out = new Uint8Array(total);
    let o = 0;
    for (const a of list) { out.set(a, o); o += a.length; }
    return out;
  }
  function u32(n) { return [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255]; }
  function u16(n) { return [(n >>> 8) & 255, n & 255]; }
  function box(type, ...payloads) {
    let size = 8;
    const parts = payloads.map(p => (p instanceof Uint8Array ? p : new Uint8Array(p)));
    for (const p of parts) size += p.length;
    const out = new Uint8Array(size);
    out.set(u32(size), 0);
    out.set([type.charCodeAt(0), type.charCodeAt(1), type.charCodeAt(2), type.charCodeAt(3)], 4);
    let o = 8;
    for (const p of parts) { out.set(p, o); o += p.length; }
    return out;
  }
  const full = (type, version, flags, ...payloads) => box(type, [version, (flags >> 16) & 255, (flags >> 8) & 255, flags & 255], ...payloads);

  /* ---------- H.264 SPS parsing (for width/height) ---------- */
  function unescapeRBSP(data) {
    const out = [];
    for (let i = 0; i < data.length; i++) {
      if (i > 2 && data[i] === 3 && data[i - 1] === 0 && data[i - 2] === 0) continue;
      out.push(data[i]);
    }
    return new Uint8Array(out);
  }
  function BitReader(data) {
    let pos = 0;
    const bit = () => { const b = (data[pos >> 3] >> (7 - (pos & 7))) & 1; pos++; return b; };
    const bits = n => { let v = 0; for (let i = 0; i < n; i++) v = v * 2 + bit(); return v; };
    const ue = () => { let z = 0; while (bit() === 0 && z < 32) z++; return z ? (Math.pow(2, z) - 1 + bits(z)) : 0; };
    const se = () => { const v = ue(); return v & 1 ? (v + 1) / 2 : -v / 2; };
    return { bit, bits, ue, se };
  }
  function parseSPS(nal) {
    try {
      const r = BitReader(unescapeRBSP(nal.subarray(1)));
      const profile = r.bits(8); r.bits(8); r.bits(8); r.ue();
      let chroma = 1;
      if ([100, 110, 122, 244, 44, 83, 86, 118, 128, 138, 139, 134, 135].includes(profile)) {
        chroma = r.ue();
        if (chroma === 3) r.bit();
        r.ue(); r.ue(); r.bit();
        if (r.bit()) {
          for (let i = 0; i < (chroma !== 3 ? 8 : 12); i++) {
            if (r.bit()) {
              let last = 8, next = 8;
              const size = i < 6 ? 16 : 64;
              for (let j = 0; j < size; j++) {
                if (next !== 0) next = (last + r.se() + 256) % 256;
                last = next === 0 ? last : next;
              }
            }
          }
        }
      }
      r.ue();
      const pocType = r.ue();
      if (pocType === 0) r.ue();
      else if (pocType === 1) { r.bit(); r.se(); r.se(); const n = r.ue(); for (let i = 0; i < n; i++) r.se(); }
      r.ue(); r.bit();
      const wMbs = r.ue() + 1, hMapUnits = r.ue() + 1;
      const frameMbsOnly = r.bit();
      if (!frameMbsOnly) r.bit();
      r.bit();
      let cl = 0, cr = 0, ct = 0, cb = 0;
      if (r.bit()) { cl = r.ue(); cr = r.ue(); ct = r.ue(); cb = r.ue(); }
      const cropX = chroma === 0 ? 1 : 2, cropY = (chroma === 1 ? 2 : 1) * (2 - frameMbsOnly);
      return { width: wMbs * 16 - (cl + cr) * cropX, height: (2 - frameMbsOnly) * hMapUnits * 16 - (ct + cb) * cropY };
    } catch (e) { return { width: 1280, height: 720 }; }
  }

  function splitNALs(data) {
    const nals = [];
    let i = 0, start = -1;
    const n = data.length;
    while (i + 2 < n) {
      if (data[i] === 0 && data[i + 1] === 0 && (data[i + 2] === 1 || (data[i + 2] === 0 && i + 3 < n && data[i + 3] === 1))) {
        const sc = data[i + 2] === 1 ? 3 : 4;
        if (start >= 0) {
          let end = i;
          while (end > start && data[end - 1] === 0) end--;
          if (end > start) nals.push(data.subarray(start, end));
        }
        start = i + sc;
        i += sc;
      } else i++;
    }
    if (start >= 0 && start < n) nals.push(data.subarray(start, n));
    return nals;
  }

  const AAC_RATES = [96000, 88200, 64000, 48000, 44100, 32000, 24000, 22050, 16000, 12000, 11025, 8000, 7350];
  const hex2 = v => v.toString(16).padStart(2, "0");

  /* ---------- the remuxer: TS bytes in, fMP4 segments out ---------- */
  function Remuxer(onInit, onSegment, onError) {
    let rest = null;
    let pmtPid = -1, videoPid = -1, audioPid = -1, videoType = 0, audioType = 0;
    const pes = { v: null, a: null };
    let sps = null, pps = null, vinfo = null, ainfo = null, initSent = false;
    let vq = [], aq = [];
    let base = null;
    let seq = 1;
    let lastVideoDts = null;
    let nextAudioDts = null;
    let wrapOffset = 0, lastRawPts = null, shift = 0, initAudio = false;
    let startedAt = 0;

    const unwrap = ts => {
      if (lastRawPts !== null && ts + wrapOffset < lastRawPts - 4294967296) wrapOffset += 8589934592;
      const v = ts + wrapOffset;
      lastRawPts = v;
      return v;
    };

    function parsePES(buf) {
      if (buf.length < 9 || buf[0] !== 0 || buf[1] !== 0 || buf[2] !== 1) return null;
      const flags = buf[7] >> 6;
      const hlen = buf[8];
      let pts = null, dts = null;
      const ts = o => (buf[o] & 0x0e) * 536870912 + buf[o + 1] * 4194304 + (buf[o + 2] & 0xfe) * 16384 + buf[o + 3] * 128 + (buf[o + 4] >> 1);
      if (flags & 2) { pts = ts(9); dts = pts; }
      if (flags === 3) dts = ts(14);
      return { pts, dts, data: buf.subarray(9 + hlen) };
    }

    function flushPES(kind) {
      const p = pes[kind];
      pes[kind] = null;
      if (!p || !p.size) return;
      const parsed = parsePES(concat(p.chunks, p.size));
      if (!parsed) return;
      if (kind === "v") onVideoPES(parsed); else onAudioPES(parsed);
    }

    function onVideoPES(p) {
      const units = [];
      let key = false;
      for (const nal of splitNALs(p.data)) {
        const t = nal[0] & 0x1f;
        if (t === 7) { if (!sps) { sps = nal.slice(); vinfo = parseSPS(sps); } continue; }
        if (t === 8) { if (!pps) pps = nal.slice(); continue; }
        if (t === 9) continue;
        if (t === 5) key = true;
        units.push(nal);
      }
      if (!units.length) return;
      if (p.pts === null) {
        if (lastVideoDts === null) return;
        p.pts = p.dts = lastVideoDts + 3000;
      } else {
        p.pts = unwrap(p.pts);
        p.dts = p.dts === p.pts ? p.pts : unwrap(p.dts);
        // timestamp discontinuity (channel switch, ad splice, encoder restart): continue smoothly
        if (lastVideoDts !== null) {
          const d = p.dts + shift - lastVideoDts;
          if (d < -90000 || d > 900000) shift = lastVideoDts + 3600 - p.dts;
        }
        p.pts += shift; p.dts += shift;
      }
      if (!vq.length && !key && !initSent) return; // start on a keyframe
      let size = 0;
      for (const u of units) size += 4 + u.length;
      const data = new Uint8Array(size);
      let o = 0;
      for (const u of units) { data.set(u32(u.length), o); data.set(u, o + 4); o += 4 + u.length; }
      lastVideoDts = p.dts;
      vq.push({ dts: p.dts, pts: p.pts, key, data });
      maybeFlush(key);
    }

    function onAudioPES(p) {
      const d = p.data;
      let pts = p.pts === null ? null : unwrap(p.pts) + shift;
      if (pts !== null && nextAudioDts !== null && Math.abs(pts - nextAudioDts) > 900000) pts = nextAudioDts;
      let i = 0;
      while (i + 7 <= d.length) {
        if (d[i] !== 0xff || (d[i + 1] & 0xf0) !== 0xf0) { i++; continue; }
        const protectionAbsent = d[i + 1] & 1;
        const aot = ((d[i + 2] >> 6) & 3) + 1;
        const sfi = (d[i + 2] >> 2) & 15;
        const chan = ((d[i + 2] & 1) << 2) | ((d[i + 3] >> 6) & 3);
        const flen = ((d[i + 3] & 3) << 11) | (d[i + 4] << 3) | (d[i + 5] >> 5);
        const hlen = protectionAbsent ? 7 : 9;
        if (flen < hlen || i + flen > d.length) break;
        if (!ainfo) {
          const rate = AAC_RATES[sfi] || 44100;
          ainfo = { aot, sfi, chan: chan || 2, rate, config: [(aot << 3) | (sfi >> 1), ((sfi & 1) << 7) | ((chan || 2) << 3)] };
        }
        const frameTicks = 1024 * 90000 / ainfo.rate;
        if (pts === null) pts = nextAudioDts !== null ? nextAudioDts : (lastVideoDts || 0);
        aq.push({ dts: pts, data: d.slice(i + hlen, i + flen) });
        pts += frameTicks;
        nextAudioDts = pts;
        i += flen;
      }
    }

    function maybeFlush(key) {
      if (!sps || !pps) return;
      if (audioPid >= 0 && !ainfo && vq.length < 90) return;
      if (!initSent) {
        const codecs = ["avc1." + hex2(sps[1]) + hex2(sps[2]) + hex2(sps[3])];
        if (ainfo) codecs.push("mp4a.40." + ainfo.aot);
        initSent = true;
        initAudio = !!ainfo;
        onInit(buildInit(), 'video/mp4; codecs="' + codecs.join(",") + '"');
      }
      const span = vq.length > 1 ? vq[vq.length - 1].dts - vq[0].dts : 0;
      if ((key && vq.length > 1 && span >= 45000) || span >= 180000) emit(key);
    }

    function emit(endsWithKey) {
      // keep the newest video sample (its duration is unknown until the next one arrives)
      const keep = vq.pop();
      const vs = vq;
      vq = keep ? [keep] : [];
      if (!vs.length) return;
      const cut = keep ? keep.dts : Infinity;
      const as = [];
      const ra = [];
      for (const a of aq) (a.dts < cut ? as : ra).push(a);
      aq = ra;
      if (base === null) base = Math.min(vs[0].dts, as.length ? as[0].dts : Infinity);
      for (let i = 0; i < vs.length; i++) vs[i].dur = (i + 1 < vs.length ? vs[i + 1].dts : cut) - vs[i].dts;
      onSegment(buildSegment(vs, as));
    }

    function buildInit() {
      const ftyp = box("ftyp", [105, 115, 111, 109], u32(1), [105, 115, 111, 109], [97, 118, 99, 49], [109, 112, 52, 49]);
      const mvhd = full("mvhd", 0, 0, u32(0), u32(0), u32(1000), u32(0), u32(0x00010000), u16(0x0100), new Array(10).fill(0),
        u32(0x00010000), u32(0), u32(0), u32(0), u32(0x00010000), u32(0), u32(0), u32(0), u32(0x40000000), new Array(24).fill(0), u32(3));
      const traks = [videoTrak()];
      const trexs = [trex(1)];
      if (ainfo) { traks.push(audioTrak()); trexs.push(trex(2)); }
      const moov = box("moov", mvhd, ...traks, box("mvex", ...trexs));
      return concat([ftyp, moov], ftyp.length + moov.length);
    }
    function trex(id) { return full("trex", 0, 0, u32(id), u32(1), u32(0), u32(0), u32(0)); }
    function tkhd(id, w, h, audio) {
      return full("tkhd", 0, 3, u32(0), u32(0), u32(id), u32(0), u32(0), u32(0), u32(0), u16(0), u16(0), u16(audio ? 0x0100 : 0), u16(0),
        u32(0x00010000), u32(0), u32(0), u32(0), u32(0x00010000), u32(0), u32(0), u32(0), u32(0x40000000), u32(w << 16), u32(h << 16));
    }
    function mdhd(scale) { return full("mdhd", 0, 0, u32(0), u32(0), u32(scale), u32(0), u16(0x55c4), u16(0)); }
    function hdlr(type, name) {
      const n = Array.from(name).map(c => c.charCodeAt(0));
      return full("hdlr", 0, 0, u32(0), [type.charCodeAt(0), type.charCodeAt(1), type.charCodeAt(2), type.charCodeAt(3)], u32(0), u32(0), u32(0), n, [0]);
    }
    function dinf() { return box("dinf", full("dref", 0, 0, u32(1), full("url ", 0, 1))); }
    function stbl(stsd) {
      return box("stbl", stsd, full("stts", 0, 0, u32(0)), full("stsc", 0, 0, u32(0)), full("stsz", 0, 0, u32(0), u32(0)), full("stco", 0, 0, u32(0)));
    }
    function videoTrak() {
      const w = vinfo.width, h = vinfo.height;
      const avcC = box("avcC", [1, sps[1], sps[2], sps[3], 0xff, 0xe1], u16(sps.length), sps, [1], u16(pps.length), pps);
      const avc1 = box("avc1", new Array(6).fill(0), u16(1), new Array(16).fill(0), u16(w), u16(h), u32(0x00480000), u32(0x00480000), u32(0), u16(1),
        new Array(32).fill(0), u16(0x0018), u16(0xffff), avcC);
      const stsd = full("stsd", 0, 0, u32(1), avc1);
      return box("trak", tkhd(1, w, h, false), box("mdia", mdhd(90000), hdlr("vide", "VideoHandler"), box("minf", full("vmhd", 0, 1, u16(0), u16(0), u16(0), u16(0)), dinf(), stbl(stsd))));
    }
    function audioTrak() {
      const cfg = ainfo.config;
      const dsi = [5, cfg.length, ...cfg];
      const dcd = [4, 13 + dsi.length, 0x40, 0x15, 0, 0, 0, ...u32(0), ...u32(0), ...dsi];
      const esd = [3, 3 + dcd.length + 3, ...u16(2), 0, ...dcd, 6, 1, 2];
      const esds = full("esds", 0, 0, esd);
      const mp4a = box("mp4a", new Array(6).fill(0), u16(1), u32(0), u32(0), u16(ainfo.chan), u16(16), u16(0), u16(0), u32(ainfo.rate << 16 >>> 0), esds);
      const stsd = full("stsd", 0, 0, u32(1), mp4a);
      return box("trak", tkhd(2, 0, 0, true), box("mdia", mdhd(ainfo.rate), hdlr("soun", "SoundHandler"), box("minf", full("smhd", 0, 0, u16(0), u16(0)), dinf(), stbl(stsd))));
    }

    function u64(n) { const hi = Math.floor(n / 4294967296); return [...u32(hi), ...u32(n - hi * 4294967296)]; }

    function buildSegment(vs, as) {
      const vBase = Math.max(0, Math.round(vs[0].dts - base));
      const trafs = [];
      const vEntries = [];
      let vBytes = 0;
      for (const s of vs) {
        const cto = Math.max(0, Math.round(s.pts - s.dts));
        vEntries.push(...u32(Math.max(1, Math.round(s.dur))), ...u32(s.data.length), ...u32(s.key ? 0x02000000 : 0x01010000), ...u32(cto));
        vBytes += s.data.length;
      }
      let aEntries = [], aBytes = 0, aBase = 0;
      if (initAudio && ainfo && as.length) {
        aBase = Math.max(0, Math.round((as[0].dts - base) * ainfo.rate / 90000));
        for (const s of as) { aEntries.push(...u32(1024), ...u32(s.data.length), ...u32(0x02000000)); aBytes += s.data.length; }
      }
      const mkTraf = (id, baseTime, flags, count, entries, offset) =>
        box("traf", full("tfhd", 0, 0x020000, u32(id)), full("tfdt", 1, 0, u64(baseTime)), full("trun", 0, flags, u32(count), u32(offset), entries));
      // first pass to measure moof size
      const measure = () => {
        const t = [mkTraf(1, vBase, 0xf01, vs.length, vEntries, 0)];
        if (aEntries.length) t.push(mkTraf(2, aBase, 0x701, as.length, aEntries, 0));
        return box("moof", full("mfhd", 0, 0, u32(seq)), ...t).length;
      };
      const moofSize = measure();
      trafs.push(mkTraf(1, vBase, 0xf01, vs.length, vEntries, moofSize + 8));
      if (aEntries.length) trafs.push(mkTraf(2, aBase, 0x701, as.length, aEntries, moofSize + 8 + vBytes));
      const moof = box("moof", full("mfhd", 0, 0, u32(seq++)), ...trafs);
      const mdatParts = vs.map(s => s.data).concat(as.map(s => s.data));
      const mdat = box("mdat", concat(mdatParts, vBytes + aBytes));
      return concat([moof, mdat], moof.length + mdat.length);
    }

    function packet(p) {
      if (p[0] !== 0x47) return;
      const pid = ((p[1] & 0x1f) << 8) | p[2];
      const pusi = p[1] & 0x40;
      const afc = (p[3] >> 4) & 3;
      if (!(afc & 1)) return;
      let o = 4;
      if (afc & 2) o += 1 + p[4];
      if (o >= 188) return;
      if (pid === 0) {
        if (pusi) o += 1 + p[o];
        const secLen = ((p[o + 1] & 0x0f) << 8) | p[o + 2];
        for (let i = o + 8; i < o + 3 + secLen - 4; i += 4) {
          const prog = (p[i] << 8) | p[i + 1];
          if (prog !== 0) { pmtPid = ((p[i + 2] & 0x1f) << 8) | p[i + 3]; break; }
        }
        return;
      }
      if (pid === pmtPid) {
        if (pusi) o += 1 + p[o];
        const secLen = ((p[o + 1] & 0x0f) << 8) | p[o + 2];
        const end = o + 3 + secLen - 4;
        const infoLen = ((p[o + 10] & 0x0f) << 8) | p[o + 11];
        for (let i = o + 12 + infoLen; i < end && i + 4 < 188;) {
          const type = p[i];
          const epid = ((p[i + 1] & 0x1f) << 8) | p[i + 2];
          const esLen = ((p[i + 3] & 0x0f) << 8) | p[i + 4];
          if (videoPid < 0 && (type === 0x1b || type === 0x24)) { videoPid = epid; videoType = type; }
          if (audioPid < 0 && (type === 0x0f)) { audioPid = epid; audioType = type; }
          i += 5 + esLen;
        }
        if (videoType === 0x24) onError("hevc");
        return;
      }
      const kind = pid === videoPid ? "v" : pid === audioPid ? "a" : null;
      if (!kind) return;
      if (pusi) { flushPES(kind); pes[kind] = { chunks: [], size: 0 }; }
      const cur = pes[kind];
      if (!cur) return;
      const chunk = p.subarray(o, 188);
      cur.chunks.push(chunk);
      cur.size += chunk.length;
    }

    return {
      push(bytes) {
        let data = bytes;
        if (rest && rest.length) { const m = new Uint8Array(rest.length + bytes.length); m.set(rest); m.set(bytes, rest.length); data = m; }
        let i = 0;
        while (i < data.length && data[i] !== 0x47) i++;
        for (; i + 188 <= data.length; i += 188) {
          if (data[i] !== 0x47) { while (i < data.length && data[i] !== 0x47) i++; i -= 188; continue; }
          packet(data.subarray(i, i + 188));
        }
        rest = data.slice(i);
        if (!startedAt) startedAt = Date.now();
      },
      get info() { return { videoPid, audioPid, hasInit: initSent }; }
    };
  }

  /* ---------- MediaSource controller ---------- */
  function play(video, url, cb) {
    const MSClass = MS();
    if (!MSClass) { cb.error("unsupported"); return { stop() {} }; }
    let stopped = false;
    const ctl = typeof AbortController === "function" ? new AbortController() : null;
    const ms = new MSClass();
    let sb = null;
    const queue = [];
    let appended = 0;
    let objURL = null;
    let started = false;
    let appending = false;
    let opened = false, pendingInit = null, bytes = 0;
    const T0 = Date.now(), L = [];
    const log = m => { L.push(((Date.now() - T0) / 1000).toFixed(1) + "s " + m); if (L.length > 40) L.splice(6, 1); };

    const fail = msg => { if (stopped) return; log("fail " + msg); stop(); cb.error(msg); };

    const pump = () => {
      if (stopped || !sb || sb.updating || !queue.length) return;
      try {
        appending = true;
        sb.appendBuffer(queue[0]);
      } catch (e) {
        appending = false;
        if (e && e.name === "QuotaExceededError") { trim(true); return; }
        fail("append " + (e && e.message));
      }
    };
    const trim = force => {
      if (!sb || sb.updating) return;
      try {
        const b = video.buffered;
        if (b.length && video.currentTime - b.start(0) > (force ? 10 : 40)) sb.remove(b.start(0), video.currentTime - (force ? 5 : 20));
      } catch (e) { /* ignore */ }
    };

    function setupSB(init, mime) {
      try {
        if (MSClass.isTypeSupported && !MSClass.isTypeSupported(mime)) { fail("codec " + mime); return; }
        log("mime " + mime);
        sb = ms.addSourceBuffer(mime);
        try { sb.mode = "segments"; } catch (e) { /* ignore */ }
        sb.addEventListener("updateend", () => {
          if (appending) { appending = false; if (queue.length) queue.shift(); appended++; }
          if (!started && video.buffered.length) {
            started = true;
            log("start");
            try { video.currentTime = video.buffered.start(0) + 0.05; } catch (e) { /* ignore */ }
            const pr = video.play();
            if (pr && pr.then) pr.then(() => log("play ok"), err => { log("play " + (err && err.name)); cb.blocked && cb.blocked(err); });
          } else if (started && video.buffered.length) {
            const end = video.buffered.end(video.buffered.length - 1);
            if (end - video.currentTime > 12) video.currentTime = end - 3;
            if (appended % 10 === 0) trim(false);
          }
          pump();
        });
        sb.addEventListener("error", () => fail("sourcebuffer" + (video.error ? " " + video.error.code : "")));
        queue.unshift(init);
        pump();
      } catch (e) { fail("addSourceBuffer " + (e && e.message)); }
    }
    const remux = Remuxer((init, mime) => {
      if (stopped) return;
      if (!opened) { pendingInit = [init, mime]; return; }
      setupSB(init, mime);
    }, seg => {
      if (stopped) return;
      queue.push(seg);
      if (queue.length > 60) queue.splice(1, queue.length - 30);
      pump();
    }, msg => fail(msg));

    const stop = () => {
      if (stopped) return;
      stopped = true;
      try { ctl && ctl.abort(); } catch (e) { /* ignore */ }
      try { if (objURL) URL.revokeObjectURL(objURL); } catch (e) { /* ignore */ }
    };

    (async () => {
      let resp;
      try {
        resp = await fetch(url, ctl ? { signal: ctl.signal } : {});
      } catch (e) { if (!stopped) fail("fetch"); return; }
      log("http " + resp.status + " " + (resp.headers.get("content-type") || ""));
      if (!resp.ok || !resp.body || !resp.body.getReader) { fail("http " + resp.status); return; }
      const reader = resp.body.getReader();
      let total = 0;
      let head = new Uint8Array(0);
      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (stopped) return;
          if (done) { fail(head ? "notts" : "ended"); return; }
          if (!total) log("first bytes");
          total += value.length;
          bytes = total;
          if (head) {
            // sniff: an MPEG-TS stream has a 0x47 sync byte every 188 bytes
            const m = new Uint8Array(head.length + value.length); m.set(head); m.set(value, head.length); head = m;
            if (head.length >= 1200) {
              let ok = false;
              for (let i = 0; i < 188 && !ok; i++) ok = head[i] === 0x47 && head[i + 188] === 0x47 && head[i + 376] === 0x47 && head[i + 564] === 0x47;
              if (!ok) { fail("notts"); return; }
              head = null;
            }
          }
          remux.push(value);
          if (total > 3000000 && !remux.info.hasInit) { fail(remux.info.videoPid < 0 ? "notts" : "noinit"); return; }
        }
      } catch (e) { if (!stopped) fail("read"); }
    })();

    ms.addEventListener("sourceopen", () => {
      if (opened) return;
      opened = true;
      try { window.__msAttach = how; } catch (e) { /* ignore */ }
      log("sourceopen " + (MSClass === window.ManagedMediaSource ? "MMS" : "MS") + " " + how);
      if (pendingInit) { const p = pendingInit; pendingInit = null; setupSB(p[0], p[1]); }
    });
    const onVErr = () => log("video error " + (video.error ? video.error.code + " " + (video.error.message || "") : ""));
    video.addEventListener("error", onVErr);
    try { video.disableRemotePlayback = true; } catch (e) { /* ignore */ }
    // attach the MediaSource: ManagedMediaSource in Scriptable's web view opens only as srcObject,
    // so that goes first there (and whatever worked last time is remembered)
    let how = "";
    const viaObj = () => { try { video.removeAttribute("src"); video.srcObject = ms; how = "obj"; return true; } catch (e) { log("srcObject " + (e && e.message)); return false; } };
    const viaURL = () => { try { video.srcObject = null; } catch (e) { /* ignore */ } objURL = objURL || URL.createObjectURL(ms); video.src = objURL; how = "url"; };
    const first = window.__msAttach || (MSClass === window.ManagedMediaSource && "srcObject" in video ? "obj" : "url");
    if (!(first === "obj" && viaObj())) viaURL();
    log("attached " + how);
    setTimeout(() => {
      if (opened || stopped) return;
      if (how === "obj") { log("no sourceopen → src"); viaURL(); }
      else if ("srcObject" in video && viaObj()) log("no sourceopen → srcObject");
      else { fail("nosourceopen"); return; }
      setTimeout(() => { if (!opened && !stopped) fail("nosourceopen"); }, 2500);
    }, 2000);
    const rangesText = () => { try { const b = video.buffered; let t = ""; for (let i = 0; i < b.length; i++) t += (i ? "," : "") + b.start(i).toFixed(1) + "-" + b.end(i).toFixed(1); return t || "∅"; } catch (e) { return "?"; } };
    return { stop: () => { video.removeEventListener("error", onVErr); stop(); }, get active() { return !stopped; },
      stats: () => ({ bytes, segs: appended, opened, initDone: !!sb, started, log: L.slice(), buffered: rangesText() }) };
  }

  return { supported: () => !!MS(), play, Remuxer };
})();

/* ================= MKV engine =================
 * Plays Matroska files (H.264 / HEVC video + AAC / AC-3 / E-AC-3 / MP3 audio) inside the page:
 * fetch (Range for seeking) -> EBML demux -> fragmented MP4 -> (Managed)MediaSource.
 * Most movie/series files of IPTV providers are .mkv, which the iPhone web view can't open by itself.
 */
const MKVEngine = (() => {
  const MS = () => window.ManagedMediaSource || window.MediaSource || null;

  /* ---------- bytes ---------- */
  const u32 = n => [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255];
  const u16 = n => [(n >>> 8) & 255, n & 255];
  const u64 = n => { const hi = Math.floor(n / 4294967296); return [...u32(hi), ...u32(n - hi * 4294967296)]; };
  const hex2 = v => v.toString(16).padStart(2, "0");
  function concat(list) {
    let total = 0;
    for (const a of list) total += a.length;
    const out = new Uint8Array(total);
    let o = 0;
    for (const a of list) { out.set(a, o); o += a.length; }
    return out;
  }
  function box(type, ...payloads) {
    const parts = payloads.map(p => (p instanceof Uint8Array ? p : new Uint8Array(p)));
    let size = 8;
    for (const p of parts) size += p.length;
    const out = new Uint8Array(size);
    out.set(u32(size), 0);
    for (let i = 0; i < 4; i++) out[4 + i] = type.charCodeAt(i);
    let o = 8;
    for (const p of parts) { out.set(p, o); o += p.length; }
    return out;
  }
  const full = (type, v, flags, ...p) => box(type, [v, (flags >> 16) & 255, (flags >> 8) & 255, flags & 255], ...p);
  function bitReader(d, start) {
    let pos = start * 8;
    return n => { let v = 0; for (let i = 0; i < n; i++, pos++) v = (v << 1) | ((d[pos >> 3] >> (7 - (pos & 7))) & 1); return v >>> 0; };
  }
  function bitWriter() {
    const bits = [];
    const w = (n, v) => { for (let i = n - 1; i >= 0; i--) bits.push((v >>> i) & 1); };
    w.bytes = () => { const out = []; for (let i = 0; i < bits.length; i += 8) { let b = 0; for (let k = 0; k < 8; k++) b = (b << 1) | (bits[i + k] || 0); out.push(b); } return out; };
    return w;
  }

  /* ---------- EBML ---------- */
  const E = {
    EBML: 0x1A45DFA3, SEGMENT: 0x18538067, SEEKHEAD: 0x114D9B74, INFO: 0x1549A966, TRACKS: 0x1654AE6B, CLUSTER: 0x1F43B675,
    CUES: 0x1C53BB6B, TAGS: 0x1254C367, CHAPTERS: 0x1043A770, ATTACH: 0x1941A469,
    TIMECODE: 0xE7, SIMPLEBLOCK: 0xA3, BLOCKGROUP: 0xA0, BLOCK: 0xA1, BLOCKDUR: 0x9B, REFBLOCK: 0xFB
  };
  const TOP = new Set([E.CLUSTER, E.CUES, E.TAGS, E.CHAPTERS, E.ATTACH, E.SEEKHEAD, E.INFO, E.TRACKS]);
  const vlen = b => (b & 0x80 ? 1 : b & 0x40 ? 2 : b & 0x20 ? 3 : b & 0x10 ? 4 : b & 0x08 ? 5 : b & 0x04 ? 6 : b & 0x02 ? 7 : b & 0x01 ? 8 : 0);
  function rid(d, p, end) {
    if (p >= end) return null;
    const l = vlen(d[p]);
    if (!l || l > 4) return { bad: true };
    if (p + l > end) return null;
    let v = 0;
    for (let i = 0; i < l; i++) v = v * 256 + d[p + i];
    return { v, l };
  }
  function rsize(d, p, end) {
    if (p >= end) return null;
    const l = vlen(d[p]);
    if (!l) return { bad: true };
    if (p + l > end) return null;
    let v = d[p] & (0xff >> l);
    let ones = v === (0xff >> l);
    for (let i = 1; i < l; i++) { v = v * 256 + d[p + i]; if (d[p + i] !== 0xff) ones = false; }
    return { v: ones ? -1 : v, l };
  }
  const ruint = (d, a, b) => { let v = 0; for (let i = a; i < b; i++) v = v * 256 + d[i]; return v; };
  const rfloat = (d, a, b) => { const dv = new DataView(d.buffer, d.byteOffset + a, b - a); return b - a === 4 ? dv.getFloat32(0) : b - a === 8 ? dv.getFloat64(0) : 0; };
  const utf8 = b => { try { return new TextDecoder("utf-8").decode(b); } catch (e) { let s = ""; for (const x of b) s += String.fromCharCode(x); return s; } };
  // ISO-639-2 / IETF language → short code
  const langOf = t => { const v = String((t && (t.ietf || t.lang)) || "").toLowerCase(); return /^(ar|ara|arb)/.test(v) || /arab|عرب/i.test((t && t.name) || "") ? "ar" : v.slice(0, 2); };
  const rstr = (d, a, b) => { let s = ""; for (let i = a; i < b && d[i]; i++) s += String.fromCharCode(d[i]); return s; };
  function children(d, a, b, fn) {
    let p = a;
    while (p < b) {
      const id = rid(d, p, b);
      if (!id || id.bad) return;
      const sz = rsize(d, p + id.l, b);
      if (!sz || sz.bad) return;
      const s = p + id.l + sz.l;
      const e = sz.v < 0 ? b : Math.min(b, s + sz.v);
      fn(id.v, s, e);
      p = e;
    }
  }

  function parseTracks(d, a, b) {
    const out = [];
    children(d, a, b, (id, s, e) => {
      if (id !== 0xAE) return;
      const t = { num: 0, type: 0, codec: "", priv: null, defDur: 0, w: 0, h: 0, rate: 0, ch: 0, isDefault: true, strip: null, enc: false, lang: "eng", name: "", forced: false };
      children(d, s, e, (i2, s2, e2) => {
        if (i2 === 0xD7) t.num = ruint(d, s2, e2);
        else if (i2 === 0x83) t.type = ruint(d, s2, e2);
        else if (i2 === 0x86) t.codec = rstr(d, s2, e2);
        else if (i2 === 0x63A2) t.priv = d.slice(s2, e2);
        else if (i2 === 0x23E383) t.defDur = ruint(d, s2, e2);
        else if (i2 === 0x88) t.isDefault = ruint(d, s2, e2) !== 0;
        else if (i2 === 0x55AA) t.forced = ruint(d, s2, e2) !== 0;
        else if (i2 === 0x22B59C) t.lang = rstr(d, s2, e2) || t.lang;
        else if (i2 === 0x22B59D) t.ietf = rstr(d, s2, e2);
        else if (i2 === 0x536E) t.name = utf8(d.subarray(s2, e2));
        else if (i2 === 0xE0) children(d, s2, e2, (i3, s3, e3) => { if (i3 === 0xB0) t.w = ruint(d, s3, e3); if (i3 === 0xBA) t.h = ruint(d, s3, e3); });
        else if (i2 === 0xE1) children(d, s2, e2, (i3, s3, e3) => { if (i3 === 0xB5) t.rate = rfloat(d, s3, e3); if (i3 === 0x9F) t.ch = ruint(d, s3, e3); });
        else if (i2 === 0x6D80) children(d, s2, e2, (i3, s3, e3) => {
          if (i3 !== 0x6240) return;
          children(d, s3, e3, (i4, s4, e4) => {
            if (i4 === 0x5035) t.enc = true;
            if (i4 === 0x5034) {
              let algo = 0, set = null;
              children(d, s4, e4, (i5, s5, e5) => { if (i5 === 0x4254) algo = ruint(d, s5, e5); if (i5 === 0x4255) set = d.slice(s5, e5); });
              if (algo === 3 && set) t.strip = set; else t.enc = true;
            }
          });
        });
      });
      out.push(t);
    });
    return out;
  }

  // one (Simple)Block → frames (handles Xiph / fixed / EBML lacing)
  function parseBlock(d, a, b) {
    const tn = rsize(d, a, b);
    let p = a + tn.l;
    const rel = (d[p] << 8) | d[p + 1];
    p += 2;
    const flags = d[p++];
    const lacing = (flags >> 1) & 3;
    const out = { track: tn.v, rel: rel & 0x8000 ? rel - 0x10000 : rel, key: !!(flags & 0x80), frames: [] };
    if (!lacing) { out.frames.push(d.subarray(p, b)); return out; }
    const n = d[p++] + 1;
    const sizes = [];
    if (lacing === 1) {
      for (let i = 0; i < n - 1; i++) { let s = 0, v; do { v = d[p++]; s += v; } while (v === 255); sizes.push(s); }
    } else if (lacing === 3) {
      const first = rsize(d, p, b);
      p += first.l;
      sizes.push(first.v);
      for (let i = 1; i < n - 1; i++) {
        const r = rsize(d, p, b);
        p += r.l;
        const bias = Math.pow(2, 7 * r.l - 1) - 1;
        sizes.push(sizes[i - 1] + (r.v - bias));
      }
    } else {
      const each = Math.floor((b - p) / n);
      for (let i = 0; i < n - 1; i++) sizes.push(each);
    }
    let used = 0;
    for (const s of sizes) used += s;
    sizes.push(b - p - used);
    for (const s of sizes) { out.frames.push(d.subarray(p, p + s)); p += s; }
    return out;
  }

  // streaming EBML reader: bytes in, callbacks out
  function Demuxer(h) {
    let buf = new Uint8Array(0), off = 0, pos = 0, skip = 0;
    let stack = [], segStart = -1, tcScale = 1e6, clusterTc = 0, header = false, dead = false;
    const abs = () => off + pos;
    function fail(m) { if (!dead) { dead = true; h.error(m); } }
    function handle(id, s, e) {
      const d = buf;
      if (id === E.EBML) {
        header = true;
        children(d, s, e, (i, a, b) => { if (i === 0x4282) { const t = rstr(d, a, b); if (t !== "matroska" && t !== "webm") fail("notmkv"); } });
      } else if (id === E.INFO) {
        let dur = 0;
        children(d, s, e, (i, a, b) => { if (i === 0x2AD7B1) tcScale = ruint(d, a, b) || 1e6; if (i === 0x4489) dur = rfloat(d, a, b); });
        h.info(dur * tcScale / 1e6);
      } else if (id === E.TRACKS) h.tracks(parseTracks(d, s, e));
      else if (id === E.SEEKHEAD) {
        const map = {};
        children(d, s, e, (i, a, b) => {
          if (i !== 0x4DBB) return;
          let sid = 0, sp = -1;
          children(d, a, b, (i2, a2, b2) => { if (i2 === 0x53AB) sid = ruint(d, a2, b2); if (i2 === 0x53AC) sp = ruint(d, a2, b2); });
          if (sid && sp >= 0) map[sid] = segStart + sp;
        });
        h.seekhead(map);
      } else if (id === E.CUES) h.cues(parseCues(d, s, e, segStart, tcScale));
      else if (id === E.TIMECODE) clusterTc = ruint(d, s, e);
      else if (id === E.SIMPLEBLOCK) {
        const bl = parseBlock(d, s, e);
        h.block(bl.track, (clusterTc + bl.rel) * tcScale / 1e6, bl.key, bl.frames, 0);
      } else if (id === E.BLOCKGROUP) {
        let bs = -1, be = -1, ref = false, dur = 0;
        children(d, s, e, (i, a, b) => { if (i === E.BLOCK) { bs = a; be = b; } if (i === E.REFBLOCK) ref = true; if (i === E.BLOCKDUR) dur = ruint(d, a, b); });
        if (bs >= 0) {
          const bl = parseBlock(d, bs, be);
          h.block(bl.track, (clusterTc + bl.rel) * tcScale / 1e6, !ref, bl.frames, dur * tcScale / 1e6);
        }
      }
    }
    function run() {
      while (!dead) {
        if (skip) { const n = Math.min(skip, buf.length - pos); pos += n; skip -= n; if (skip) return; }
        while (stack.length && stack[stack.length - 1].end >= 0 && abs() >= stack[stack.length - 1].end) stack.pop();
        const id = rid(buf, pos, buf.length);
        if (!id) return;
        if (id.bad) return fail(header ? "mkv" : "notmkv");
        if (!header && id.v !== E.EBML) return fail("notmkv");
        const sz = rsize(buf, pos + id.l, buf.length);
        if (!sz) return;
        if (sz.bad) return fail("mkv");
        const hl = id.l + sz.l;
        const top = stack[stack.length - 1];
        if (top && top.id === E.CLUSTER && top.end < 0 && TOP.has(id.v)) { stack.pop(); continue; }
        if (id.v === E.SEGMENT) {
          pos += hl;
          segStart = abs();
          stack.push({ id: E.SEGMENT, end: sz.v < 0 ? -1 : segStart + sz.v });
          h.segment(segStart);
          continue;
        }
        if (id.v === E.CLUSTER) {
          pos += hl;
          stack.push({ id: E.CLUSTER, end: sz.v < 0 ? -1 : abs() + sz.v });
          continue;
        }
        const whole = id.v === E.EBML || id.v === E.INFO || id.v === E.TRACKS || id.v === E.SEEKHEAD || id.v === E.CUES ||
          id.v === E.TIMECODE || id.v === E.SIMPLEBLOCK || id.v === E.BLOCKGROUP;
        if (whole && sz.v >= 0 && sz.v < 24e6) {
          if (pos + hl + sz.v > buf.length) return; // wait for the rest
          handle(id.v, pos + hl, pos + hl + sz.v);
          pos += hl + sz.v;
          continue;
        }
        if (sz.v < 0) return fail("mkv");
        pos += hl;
        skip = sz.v;
      }
    }
    return {
      push(bytes) {
        if (dead) return;
        const rest = buf.length - pos;
        if (!rest) { off += buf.length; buf = bytes; pos = 0; }
        else {
          const m = new Uint8Array(rest + bytes.length);
          m.set(buf.subarray(pos));
          m.set(bytes, rest);
          off += pos;
          buf = m;
          pos = 0;
        }
        run();
      },
      // continue reading clusters from an absolute file position (after a seek)
      restartAt(p) { buf = new Uint8Array(0); off = p; pos = 0; skip = 0; stack = [{ id: E.SEGMENT, end: -1 }]; clusterTc = 0; header = true; dead = false; },
      get segStart() { return segStart; },
      get tcScale() { return tcScale; },
      get dead() { return dead; }
    };
  }

  function parseCues(d, s, e, segStart, tcScale) {
    const out = [];
    children(d, s, e, (id, a, b) => {
      if (id !== 0xBB) return;
      let t = -1, track = 0, cpos = -1;
      children(d, a, b, (i2, a2, b2) => {
        if (i2 === 0xB3) t = ruint(d, a2, b2);
        if (i2 === 0xB7 && cpos < 0) children(d, a2, b2, (i3, a3, b3) => { if (i3 === 0xF7) track = ruint(d, a3, b3); if (i3 === 0xF1) cpos = ruint(d, a3, b3); });
      });
      if (t >= 0 && cpos >= 0) out.push({ ms: t * tcScale / 1e6, pos: segStart + cpos, track });
    });
    return out;
  }

  /* ---------- codecs ---------- */
  function hevcCodec(p) {
    const space = p[1] >> 6, tier = (p[1] >> 5) & 1, prof = p[1] & 31;
    let c = ((p[2] << 24) | (p[3] << 16) | (p[4] << 8) | p[5]) >>> 0, rev = 0;
    for (let i = 0; i < 32; i++) { rev = ((rev << 1) | (c & 1)) >>> 0; c >>>= 1; }
    const cons = [p[6], p[7], p[8], p[9], p[10], p[11]];
    while (cons.length && !cons[cons.length - 1]) cons.pop();
    return "hvc1." + (space ? "ABC"[space - 1] : "") + prof + "." + rev.toString(16).toUpperCase() + "." + (tier ? "H" : "L") + p[12] +
      (cons.length ? "." + cons.map(b => b.toString(16).toUpperCase()).join(".") : "");
  }
  const AAC_RATES = [96000, 88200, 64000, 48000, 44100, 32000, 24000, 22050, 16000, 12000, 11025, 8000, 7350];
  const AC3_KBPS = [32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 384, 448, 512, 576, 640];
  const ACMOD_CH = [2, 1, 2, 3, 3, 4, 4, 5];
  function ac3FrameBytes(f, p) {
    const fscod = f[p + 4] >> 6, code = f[p + 4] & 0x3f, kb = AC3_KBPS[code >> 1];
    if (!kb || fscod === 3) return 0;
    return 2 * (fscod === 0 ? 2 * kb : fscod === 2 ? 3 * kb : Math.floor(kb * 1000 * 1536 / 44100 / 16) + (code & 1));
  }
  function dac3(f) {
    const fscod = f[4] >> 6, code = f[4] & 0x3f, bsid = f[5] >> 3, bsmod = f[5] & 7;
    const r = bitReader(f, 6);
    const acmod = r(3);
    if ((acmod & 1) && acmod !== 1) r(2);
    if (acmod & 4) r(2);
    if (acmod === 2) r(2);
    const lfeon = r(1);
    const w = bitWriter();
    w(2, fscod); w(5, bsid); w(3, bsmod); w(3, acmod); w(1, lfeon); w(5, code >> 1); w(5, 0);
    return { cfg: box("dac3", w.bytes()), rate: [48000, 44100, 32000][fscod] || 48000, ch: ACMOD_CH[acmod] + lfeon };
  }
  function eac3Info(f, p) {
    const r = bitReader(f, p + 2);
    const strmtyp = r(2); r(3);
    const frmsiz = r(11), fscod = r(2);
    let blocks = 6, fscod2 = 0;
    if (fscod === 3) fscod2 = r(2); else blocks = [1, 2, 3, 6][r(2)];
    const acmod = r(3), lfeon = r(1), bsid = r(5);
    const rate = fscod === 3 ? [24000, 22050, 16000][fscod2] : [48000, 44100, 32000][fscod];
    return { strmtyp, bytes: (frmsiz + 1) * 2, fscod, blocks, acmod, lfeon, bsid, rate };
  }
  function dec3(f) {
    const i = eac3Info(f, 0);
    const w = bitWriter();
    w(13, Math.round(i.bytes * 8 * i.rate / (256 * i.blocks) / 1000)); w(3, 0);
    w(2, i.fscod === 3 ? 0 : i.fscod); w(5, i.bsid); w(1, 0); w(1, 0); w(3, 0); w(3, i.acmod); w(1, i.lfeon); w(3, 0); w(4, 0); w(1, 0);
    return { cfg: box("dec3", w.bytes()), rate: i.rate, ch: ACMOD_CH[i.acmod] + i.lfeon };
  }
  // samples in one stored frame (a block may hold several AC-3 / E-AC-3 sync frames)
  function audioSamples(kind, f, rate) {
    if (kind === "aac") return 1024;
    if (kind === "mp3") return rate < 32000 ? 576 : 1152;
    let n = 0, p = 0, guard = 0;
    while (p + 6 < f.length && f[p] === 0x0B && f[p + 1] === 0x77 && guard++ < 32) {
      if (kind === "ac3") { const len = ac3FrameBytes(f, p); n += 1536; if (!len) break; p += len; }
      else { const i = eac3Info(f, p); if (i.strmtyp !== 1) n += 256 * i.blocks; p += i.bytes; }
    }
    return n || 1536;
  }

  // ASS / SSA event → plain text; SRT tags removed
  function subText(codec, raw) {
    let t = raw;
    if (/ASS|SSA/.test(codec)) {
      let c = 0, i = 0;
      for (; i < t.length && c < 8; i++) if (t[i] === ",") c++;
      t = t.slice(i).replace(/\\{[^}]*\\}/g, "").replace(/\\\\N/gi, "\\n").replace(/\\\\h/g, " ");
    }
    return t.replace(/<[^>]+>/g, "").replace(/\\r/g, "").trim();
  }

  function videoSetup(t) {
    if (!t) return null;
    const head = [0, 0, 0, 0, 0, 0, ...u16(1), ...new Array(16).fill(0), ...u16(t.w), ...u16(t.h), ...u32(0x00480000), ...u32(0x00480000), ...u32(0), ...u16(1),
      ...new Array(32).fill(0), ...u16(0x18), ...u16(0xffff)];
    if (t.codec === "V_MPEG4/ISO/AVC" && t.priv && t.priv.length > 6)
      return { kind: "avc", codec: "avc1." + hex2(t.priv[1]) + hex2(t.priv[2]) + hex2(t.priv[3]), entry: box("avc1", head, box("avcC", t.priv)) };
    if (t.codec === "V_MPEGH/ISO/HEVC" && t.priv && t.priv.length > 22)
      return { kind: "hevc", codec: hevcCodec(t.priv), entry: box("hvc1", head, box("hvcC", t.priv)) };
    return null;
  }
  function audioKind(t) {
    if (!t) return null;
    if (/^A_AAC/.test(t.codec)) return "aac";
    if (t.codec === "A_AC3") return "ac3";
    if (t.codec === "A_EAC3") return "eac3";
    if (t.codec === "A_MPEG/L3") return "mp3";
    return null;
  }
  function soundEntry(type, ch, rate, cfg) {
    return box(type, new Array(6).fill(0), u16(1), u32(0), u32(0), u16(ch), u16(16), u16(0), u16(0), u32((rate << 16) >>> 0), cfg);
  }
  function esds(oti, dsi) {
    const ds = dsi ? [5, dsi.length, ...dsi] : [];
    const dcd = [4, 13 + ds.length, oti, 0x15, 0, 0, 0, ...u32(0), ...u32(0), ...ds];
    const esd = [3, 3 + dcd.length + 3, ...u16(2), 0, ...dcd, 6, 1, 2];
    return full("esds", 0, 0, esd);
  }
  // needs the first audio frame for AC-3 / E-AC-3
  function audioSetup(t, kind, first) {
    if (kind === "aac") {
      let asc = t.priv && t.priv.length >= 2 ? Array.from(t.priv) : null;
      const rate = t.rate || 48000, ch = t.ch || 2;
      if (!asc) { const sfi = Math.max(0, AAC_RATES.indexOf(rate)); asc = [(2 << 3) | (sfi >> 1), ((sfi & 1) << 7) | (ch << 3)]; }
      const aot = asc[0] >> 3;
      const sfi = ((asc[0] & 7) << 1) | (asc[1] >> 7);
      const r = AAC_RATES[sfi] || rate;
      return { kind, codec: "mp4a.40." + (aot === 31 ? 2 : aot), rate: r, entry: soundEntry("mp4a", ch, r, esds(0x40, asc)) };
    }
    if (kind === "mp3") { const rate = t.rate || 44100; return { kind, codec: "mp4a.6B", alts: ["mp4a.69", "mp3"], rate, entry: soundEntry("mp4a", t.ch || 2, rate, esds(0x6B, null)) }; }
    if (!first || first.length < 8 || first[0] !== 0x0B || first[1] !== 0x77) return null;
    const x = kind === "ac3" ? dac3(first) : dec3(first);
    return { kind, codec: kind === "ac3" ? "ac-3" : "ec-3", rate: x.rate, entry: soundEntry(kind === "ac3" ? "ac-3" : "ec-3", x.ch, x.rate, x.cfg) };
  }


  /* ---------- MP4 (progressive "moov + mdat") → the same fMP4 pipeline ---------- */
  const u32at = (d, p) => d[p] * 16777216 + (d[p + 1] << 16) + (d[p + 2] << 8) + d[p + 3];
  const typeAt = (d, p) => String.fromCharCode(d[p], d[p + 1], d[p + 2], d[p + 3]);
  function boxes(d, a, b, fn) {
    let p = a;
    while (p + 8 <= b) {
      let size = u32at(d, p), hl = 8;
      const type = typeAt(d, p + 4);
      if (size === 1) { size = u32at(d, p + 8) * 4294967296 + u32at(d, p + 12); hl = 16; } else if (size === 0) size = b - p;
      if (size < hl || p + size > b) return;
      fn(type, p + hl, p + size);
      p += size;
    }
  }
  function parseTrak(d, a, b) {
    const t = { id: 0, w: 0, h: 0, ts: 0, handler: "", lang: "und", entry: null, etype: "", elst: 0 };
    const walk = (s, e) => boxes(d, s, e, (type, cs, ce) => {
      if (type === "mdia" || type === "minf" || type === "stbl" || type === "edts") return walk(cs, ce);
      if (type === "tkhd") { t.id = u32at(d, cs + (d[cs] === 1 ? 20 : 12)); t.w = Math.round(u32at(d, ce - 8) / 65536); t.h = Math.round(u32at(d, ce - 4) / 65536); }
      else if (type === "mdhd") {
        const v1 = d[cs] === 1;
        t.ts = u32at(d, cs + (v1 ? 20 : 12));
        const l = (d[cs + (v1 ? 32 : 20)] << 8) | d[cs + (v1 ? 33 : 21)];
        t.lang = String.fromCharCode(((l >> 10) & 31) + 96, ((l >> 5) & 31) + 96, (l & 31) + 96);
      } else if (type === "hdlr") t.handler = typeAt(d, cs + 8);
      else if (type === "stsd") { if (u32at(d, cs + 4)) { const es = cs + 8, sz = u32at(d, es); t.etype = typeAt(d, es + 4); t.entry = d.slice(es, es + sz); } }
      else if (type === "elst") {
        const v1 = d[cs] === 1, n = u32at(d, cs + 4);
        for (let i = 0; i < n; i++) {
          const p = cs + 8 + i * (v1 ? 20 : 12);
          let mt = v1 ? u32at(d, p + 8) * 4294967296 + u32at(d, p + 12) : u32at(d, p + 4);
          if (!v1 && mt > 0x7fffffff) mt -= 4294967296;
          if (mt >= 0 && mt < 1e12) { t.elst = mt; break; }
        }
      } else if (type === "stts" || type === "ctts" || type === "stss" || type === "stsz" || type === "stsc") t[type] = d.subarray(cs, ce);
      else if (type === "stco" || type === "co64") { t.stco = d.subarray(cs, ce); t.co64 = type === "co64"; }
    });
    walk(a, b);
    return t.ts && t.stsz && t.stco && t.stsc && t.stts && t.entry ? t : null;
  }
  function parseMoov(d) {
    const out = { tracks: [], durMs: 0 };
    boxes(d, 0, d.length, (type, s, e) => {
      if (type === "mvhd") { const v1 = d[s] === 1, ts = u32at(d, s + (v1 ? 20 : 12)); const du = v1 ? u32at(d, s + 24) * 4294967296 + u32at(d, s + 28) : u32at(d, s + 16); out.durMs = ts ? du / ts * 1000 : 0; }
      if (type === "trak") { const t = parseTrak(d, s, e); if (t) out.tracks.push(t); }
    });
    return out;
  }
  function sampleTable(t) {
    const z = t.stsz, cs = u32at(z, 4), n = u32at(z, 8);
    const size = new Uint32Array(n);
    for (let i = 0; i < n; i++) size[i] = cs || u32at(z, 12 + i * 4);
    const co = t.stco, nc = u32at(co, 4), chunk = new Float64Array(nc);
    for (let i = 0; i < nc; i++) chunk[i] = t.co64 ? u32at(co, 8 + i * 8) * 4294967296 + u32at(co, 12 + i * 8) : u32at(co, 8 + i * 4);
    const off = new Float64Array(n), sc = t.stsc, ne = u32at(sc, 4);
    let si = 0;
    for (let e = 0; e < ne; e++) {
      const first = u32at(sc, 8 + e * 12) - 1, per = u32at(sc, 12 + e * 12), last = e + 1 < ne ? u32at(sc, 8 + (e + 1) * 12) - 1 : nc;
      for (let c = first; c < last && si < n; c++) { let o = chunk[c]; for (let k = 0; k < per && si < n; k++) { off[si] = o; o += size[si]; si++; } }
    }
    const dts = new Float64Array(n), st = t.stts, ns = u32at(st, 4);
    let i = 0, acc = 0;
    for (let e = 0; e < ns; e++) { const cnt = u32at(st, 8 + e * 8), dl = u32at(st, 12 + e * 8); for (let k = 0; k < cnt && i < n; k++) { dts[i++] = acc; acc += dl; } }
    const cto = new Float64Array(n);
    if (t.ctts) { const nn = u32at(t.ctts, 4); let j = 0; for (let e = 0; e < nn; e++) { const cnt = u32at(t.ctts, 8 + e * 8); let o = u32at(t.ctts, 12 + e * 8); if (o > 0x7fffffff) o -= 4294967296; for (let k = 0; k < cnt && j < n; k++) cto[j++] = o; } }
    let key = null;
    if (t.stss) { key = new Uint8Array(n); const nk = u32at(t.stss, 4); for (let e = 0; e < nk; e++) { const k = u32at(t.stss, 8 + e * 4) - 1; if (k >= 0 && k < n) key[k] = 1; } }
    return { n, size, off, dts, cto, key, ts: t.ts, shift: t.elst || 0, total: acc };
  }
  // codec string from a stsd entry
  function mp4Codec(t) {
    const e = t.entry, ty = t.etype;
    const child = (start, name) => { let f = null; boxes(e, start, e.length, (type, s, en) => { if (!f && type === name) f = e.subarray(s, en); }); return f; };
    if (ty === "avc1" || ty === "avc3") { const c = child(86, "avcC"); return c ? ty + "." + hex2(c[1]) + hex2(c[2]) + hex2(c[3]) : null; }
    if (ty === "hvc1" || ty === "hev1") { const c = child(86, "hvcC"); return c ? hevcCodec(c).replace(/^hvc1/, ty) : null; }
    if (ty === "ac-3" || ty === "ec-3") return ty;
    if (ty === "mp4a") {
      const ver = (e[16] << 8) | e[17];
      const es = child(36 + (ver === 1 ? 16 : ver === 2 ? 36 : 0), "esds");
      if (!es) return "mp4a.40.2";
      let oti = 0, aot = 2;
      const desc = (p, end) => {
        while (p < end) {
          const tag = es[p++]; let len = 0, b;
          do { b = es[p++]; len = (len << 7) | (b & 0x7f); } while (b & 0x80 && p < end);
          const s = p;
          if (tag === 3) { const fl = es[s + 2]; desc(s + 3 + (fl & 0x80 ? 2 : 0) + (fl & 0x40 ? 1 + es[s + 3] : 0) + (fl & 0x20 ? 2 : 0), s + len); }
          else if (tag === 4) { oti = es[s]; desc(s + 13, s + len); }
          else if (tag === 5) aot = es[s] >> 3 === 31 ? 2 : (es[s] >> 3) || 2;
          p = s + len;
        }
      };
      desc(4, es.length);
      return oti === 0x40 || oti === 0x67 ? "mp4a.40." + aot : oti === 0x6B || oti === 0x69 ? "mp4a.6B" : "mp4a.40.2";
    }
    return null;
  }
  // streaming: header boxes, then samples in file order as their bytes arrive
  function Mp4Demuxer(h, fetchMoov) {
    let buf = new Uint8Array(0), off = 0, pos = 0, dead = false, ready = false, waiting = false;
    let V = null, A = null, mOff = null, mSize = null, mTrk = null, mIdx = null, N = 0, mi = 0;
    const fail = m => { if (!dead) { dead = true; h.error(m); } };
    function setup(moov) {
      const info = parseMoov(moov);
      const pick = h.mp4(info);
      if (!pick) return false;
      V = pick.v ? sampleTable(pick.v) : null;
      A = pick.a ? sampleTable(pick.a) : null;
      const nv = V ? V.n : 0, na = A ? A.n : 0;
      N = nv + na;
      mOff = new Float64Array(N); mSize = new Uint32Array(N); mTrk = new Uint8Array(N); mIdx = new Uint32Array(N);
      let i = 0, j = 0, k = 0;
      while (i < nv || j < na) {
        if (j >= na || (i < nv && V.off[i] <= A.off[j])) { mOff[k] = V.off[i]; mSize[k] = V.size[i]; mTrk[k] = 1; mIdx[k] = i++; }
        else { mOff[k] = A.off[j]; mSize[k] = A.size[j]; mTrk[k] = 2; mIdx[k] = j++; }
        k++;
      }
      ready = true;
      mi = lower(off + pos);
      return true;
    }
    const lower = p => { let lo = 0, hi = N; while (lo < hi) { const m = (lo + hi) >> 1; if (mOff[m] < p) lo = m + 1; else hi = m; } return lo; };
    function header() {
      while (!dead && !ready && !waiting) {
        if (buf.length - pos < 16) return;
        let size = u32at(buf, pos), hl = 8;
        const type = typeAt(buf, pos + 4);
        if (size === 1) { size = u32at(buf, pos + 8) * 4294967296 + u32at(buf, pos + 12); hl = 16; } else if (size === 0) size = Infinity;
        if (size < hl || !/^[a-z0-9 ©\\-]{4}$/i.test(type)) return fail("notmp4");
        if (type === "moov") {
          if (buf.length - pos < size) { if (size > 96e6) fail("mp4"); return; }
          if (!setup(buf.subarray(pos + hl, pos + size))) return;
          pos += size;
          return;
        }
        if (type === "mdat") {
          if (!waiting) {
            waiting = true;
            const end = size === Infinity ? -1 : off + pos + size;
            pos += hl;
            if (end < 0) return fail("moovend");
            // "moov" after the media: fetch just that box, keep the media bytes meanwhile
            fetchMoov(end).then(m => { if (!dead && setup(m)) samples(); }).catch(() => fail("moovend"));
          }
          return;
        }
        if (buf.length - pos < size) { if (size > 32e6) fail("mp4"); return; }
        pos += size;
      }
    }
    function samples() {
      while (!dead && mi < N) {
        const rel = mOff[mi] - off;
        if (rel < pos) { mi++; continue; }
        if (rel + mSize[mi] > buf.length) break;
        const tk = mTrk[mi], ix = mIdx[mi], S = tk === 1 ? V : A, d = buf.subarray(rel, rel + mSize[mi]);
        if (tk === 1) h.block(1, (S.dts[ix] + S.cto[ix] - S.shift) / S.ts * 1000, S.key ? !!S.key[ix] : true, [d], 0, 0);
        else h.block(2, S.dts[ix] / S.ts * 1000, true, [d], 0, (ix + 1 < S.n ? S.dts[ix + 1] : S.total) - S.dts[ix]);
        pos = rel + mSize[mi];
        mi++;
      }
      if (!dead && mi >= N && N) h.end && h.end();
    }
    return {
      push(bytes) {
        if (dead) return;
        const rest = buf.length - pos;
        if (!rest) { off += buf.length; buf = bytes; pos = 0; }
        else { const m = new Uint8Array(rest + bytes.length); m.set(buf.subarray(pos)); m.set(bytes, rest); off += pos; buf = m; pos = 0; }
        if (!ready) header();
        if (ready) samples();
      },
      restartAt(p) { buf = new Uint8Array(0); off = p; pos = 0; mi = lower(p); },
      // byte position to start from for time \`ms\` (keyframe before it, and the audio around it)
      seekPos(ms) {
        if (!ready) return -1;
        let p = Infinity;
        if (V) { const tt = ms / 1000 * V.ts + V.shift; let lo = 0, hi = V.n - 1; while (lo < hi) { const m = (lo + hi + 1) >> 1; if (V.dts[m] <= tt) lo = m; else hi = m - 1; } while (lo > 0 && V.key && !V.key[lo]) lo--; p = Math.min(p, V.off[lo]); h.seekTo && h.seekTo((V.dts[lo] + V.cto[lo] - V.shift) / V.ts * 1000); }
        if (A) { const tt = ms / 1000 * A.ts; let lo = 0, hi = A.n - 1; while (lo < hi) { const m = (lo + hi + 1) >> 1; if (A.dts[m] <= tt) lo = m; else hi = m - 1; } p = Math.min(p, A.off[Math.max(0, lo - 2)]); }
        return p === Infinity ? -1 : p;
      },
      get dead() { return dead; }, get segStart() { return 0; }, get tcScale() { return 1e6; }
    };
  }

  /* ---------- fMP4 writer ---------- */
  function initSegment(v, a, durMs) {
    const mvhd = full("mvhd", 0, 0, u32(0), u32(0), u32(1000), u32(Math.round(durMs || 0)), u32(0x00010000), u16(0x0100), new Array(10).fill(0),
      u32(0x00010000), u32(0), u32(0), u32(0), u32(0x00010000), u32(0), u32(0), u32(0), u32(0x40000000), new Array(24).fill(0), u32(3));
    const tkhd = (id, w, h, audio) => full("tkhd", 0, 3, u32(0), u32(0), u32(id), u32(0), u32(0), u32(0), u32(0), u16(0), u16(0), u16(audio ? 0x0100 : 0), u16(0),
      u32(0x00010000), u32(0), u32(0), u32(0), u32(0x00010000), u32(0), u32(0), u32(0), u32(0x40000000), u32(w << 16), u32(h << 16));
    const mdhd = scale => full("mdhd", 0, 0, u32(0), u32(0), u32(scale), u32(0), u16(0x55c4), u16(0));
    const hdlr = (type, name) => full("hdlr", 0, 0, u32(0), Array.from(type).map(c => c.charCodeAt(0)), u32(0), u32(0), u32(0), Array.from(name).map(c => c.charCodeAt(0)), [0]);
    const dinf = () => box("dinf", full("dref", 0, 0, u32(1), full("url ", 0, 1)));
    const stbl = entry => box("stbl", full("stsd", 0, 0, u32(1), entry), full("stts", 0, 0, u32(0)), full("stsc", 0, 0, u32(0)), full("stsz", 0, 0, u32(0), u32(0)), full("stco", 0, 0, u32(0)));
    const traks = [], trex = [];
    if (v) {
      traks.push(box("trak", tkhd(1, v.w, v.h, false), box("mdia", mdhd(90000), hdlr("vide", "VideoHandler"),
        box("minf", full("vmhd", 0, 1, u16(0), u16(0), u16(0), u16(0)), dinf(), stbl(v.entry)))));
      trex.push(full("trex", 0, 0, u32(1), u32(1), u32(0), u32(0), u32(0)));
    }
    if (a) {
      traks.push(box("trak", tkhd(2, 0, 0, true), box("mdia", mdhd(a.rate), hdlr("soun", "SoundHandler"),
        box("minf", full("smhd", 0, 0, u16(0), u16(0)), dinf(), stbl(a.entry)))));
      trex.push(full("trex", 0, 0, u32(2), u32(1), u32(0), u32(0), u32(0)));
    }
    return concat([box("ftyp", [105, 115, 111, 109], u32(1), [105, 115, 111, 109], [105, 115, 111, 54], [109, 112, 52, 49]),
      box("moov", mvhd, ...traks, box("mvex", ...trex))]);
  }
  // tracks: [{ id, base, samples: [{ dur, size, key, cto }], data: [Uint8Array] }]
  function fragment(seq, tracks) {
    const entriesOf = t => {
      const out = [];
      for (const s of t.samples) {
        out.push(...u32(s.dur), ...u32(s.size), ...u32(t.id === 1 ? (s.key ? 0x02000000 : 0x01010000) : 0x02000000));
        if (t.id === 1) out.push(...u32(Math.max(0, s.cto)));
      }
      return out;
    };
    const mk = (t, offset) => box("traf", full("tfhd", 0, 0x020000, u32(t.id)), full("tfdt", 1, 0, u64(t.base)),
      full("trun", 0, t.id === 1 ? 0xf01 : 0x701, u32(t.samples.length), u32(offset), entriesOf(t)));
    const used = tracks.filter(t => t.samples.length);
    const moofLen = box("moof", full("mfhd", 0, 0, u32(seq)), ...used.map(t => mk(t, 0))).length;
    let off = moofLen + 8;
    const trafs = used.map(t => { const b = mk(t, off); for (const x of t.data) off += x.length; return b; });
    const moof = box("moof", full("mfhd", 0, 0, u32(seq)), ...trafs);
    const mdat = box("mdat", concat([].concat(...used.map(t => t.data))));
    return concat([moof, mdat]);
  }

  /* ---------- the player ---------- */
  function play(video, url, cb) {
    const MSClass = MS();
    if (!MSClass) { cb.error("unsupported"); return { stop() {} }; }
    let stopped = false, objURL = null, sb = null, initDone = false, appending = false, ended = false;
    const ms = new MSClass();
    const queue = [];             // Uint8Array | { remove: [a, b] }
    let vt = null, at = null, vset = null, aset = null, akind = null, durMs = 0;
    let vf = [], pend = [], aq = [], assigned = 0, D = -1, seq = 1, lastDts = -Infinity, defDur = 40;
    let firstAudio = null, cues = null, cuesAt = -1, seekhead = null, needKey = true, started = false;
    let reader = null, ctl = null, epoch = 0, pendingSeek = null, seeking = false, audioDropped = false;
    let opened = false, bytes = 0, segs = 0, subTracks = {};
    // a small play log: shown in the app when something goes wrong
    const T0 = Date.now(), L = [];
    const log = m => { L.push(((Date.now() - T0) / 1000).toFixed(1) + "s " + m); if (L.length > 40) L.splice(6, 1); };

    const fail = m => { if (stopped) return; log("fail " + m); stop(); cb.error(m); };
    const stop = () => {
      if (stopped) return;
      stopped = true;
      try { ctl && ctl.abort(); } catch (e) { /* ignore */ }
      cancelR(curReader);
      video.removeEventListener("seeking", onSeeking);
      video.removeEventListener("error", onVErr);
      try { if (objURL) URL.revokeObjectURL(objURL); } catch (e) { /* ignore */ }
    };
    const onVErr = () => log("video error " + (video.error ? video.error.code + " " + (video.error.message || "") : ""));
    const pump = () => {
      if (!stopped && !initDone && opened) maybeEmit(false);
      if (stopped || !sb || sb.updating || appending || !queue.length) return;
      const job = queue[0];
      try {
        appending = true;
        if (job.remove) sb.remove(job.remove[0], job.remove[1]); else sb.appendBuffer(job);
      } catch (e) {
        appending = false;
        if (e && e.name === "QuotaExceededError") { trim(true); setTimeout(pump, 300); return; }
        fail("append " + (e && e.message));
      }
    };
    const ahead = () => {
      try { const b = video.buffered, t = video.currentTime; for (let i = 0; i < b.length; i++) if (b.start(i) <= t + 0.3 && b.end(i) >= t) return b.end(i) - t; } catch (e) { /* ignore */ }
      return 0;
    };
    const trim = force => {
      try {
        const b = video.buffered;
        if (b.length && video.currentTime - b.start(0) > (force ? 12 : 60)) queue.splice(1, 0, { remove: [b.start(0), video.currentTime - (force ? 6 : 30)] });
      } catch (e) { /* ignore */ }
    };

    let dm = null, isMp4 = false;
    const H = {
      error: m => fail(m),
      segment: () => {},
      info: d => { durMs = d; },
      seekhead: m => { seekhead = m; },
      cues: list => { cues = list; if (pendingSeek != null) { const t = pendingSeek; pendingSeek = null; seekTo(t); } },
      tracks: list => {
        const vids = list.filter(t => t.type === 1), auds = list.filter(t => t.type === 2);
        vt = vids.find(t => t.isDefault) || vids[0] || null;
        vset = videoSetup(vt);
        log("tracks " + list.map(t => (t.type === 1 ? "v:" : t.type === 2 ? "a:" : "s:") + t.codec + (t.w ? " " + t.w + "x" + t.h : "") + (t.rate ? " " + t.rate + "Hz" : "")).join(" | "));
        if (vt && !vset) return fail("codec " + vt.codec);
        if (vt && vt.enc) return fail("encrypted");
        if (vt && vt.defDur) defDur = vt.defDur / 1e6;
        const okA = auds.filter(t => audioKind(t) && !t.enc);
        const pr = cb.prefs || {};
        at = okA.find(t => t.num === pr.audioNum) || (pr.audioLang ? okA.find(t => langOf(t) === pr.audioLang) : null) || okA.find(t => t.isDefault) || okA[0] || null;
        akind = audioKind(at);
        subTracks = {};
        list.filter(t => t.type === 0x11 && /^S_TEXT\\/(UTF8|ASS|SSA|WEBVTT)/.test(t.codec)).forEach(t => { subTracks[t.num] = t.codec; });
        cb.tracks && cb.tracks({
          audio: okA.map(t => ({ num: t.num, lang: langOf(t), name: t.name, codec: t.codec, ch: t.ch })), audioOn: at ? at.num : 0,
          subs: list.filter(t => subTracks[t.num]).map(t => ({ num: t.num, lang: langOf(t), name: t.name, forced: t.forced, isDefault: t.isDefault }))
        });
        if (!at && auds.length) { audioDropped = true; cb.note && cb.note("audio " + auds[0].codec); }
        if (!vt && !at) return fail("notracks");
      },
      block: (track, ms_, key, frames, dur, nSamples) => {
        if (subTracks[track]) {
          for (const f of frames) {
            const text = subText(subTracks[track], utf8(f));
            if (text) cb.cue && cb.cue({ track, start: ms_, end: ms_ + (dur > 0 ? dur : 4000), text });
          }
          return;
        }
        if (vt && track === vt.num) {
          if (needKey && !key) return;
          needKey = false;
          for (const f0 of frames) {
            const f = vt.strip ? concat([vt.strip, f0]) : f0.slice();
            vf.push({ pts: ms_, key, data: f });
            pend.push(ms_);
          }
          assign(false);
          maybeEmit(false);
        } else if (at && track === at.num) {
          if (vt && needKey) return;
          let t = ms_;
          for (const f0 of frames) {
            const f = at.strip ? concat([at.strip, f0]) : f0.slice();
            if (!firstAudio) firstAudio = f;
            const n = nSamples || audioSamples(akind, f, (aset && aset.rate) || at.rate || 48000);
            aq.push({ ts: t, data: f, n });
            t += n * 1000 / ((aset && aset.rate) || at.rate || 48000);
          }
          if (!vt) maybeEmit(false);
        }
      },
      // MP4: pick the tracks (preferred audio language) and use their sample entries as they are
      mp4: info => {
        durMs = info.durMs;
        const vids = info.tracks.filter(t => t.handler === "vide"), auds = info.tracks.filter(t => t.handler === "soun");
        log("mp4 " + info.tracks.map(t => t.handler + ":" + t.etype + (t.w ? " " + t.w + "x" + t.h : "") + " " + t.lang).join(" | "));
        const v = vids[0] || null;
        if (v) {
          const c = mp4Codec(v);
          if (!c) { fail("codec " + v.etype); return null; }
          vt = { num: 1, w: v.w, h: v.h, strip: null };
          vset = { kind: "mp4", codec: c, entry: v.entry };
        }
        const okA = auds.filter(t => mp4Codec(t));
        const pr = cb.prefs || {};
        const lg = t => (/^(ara|arb|ar)/.test(t.lang) ? "ar" : t.lang.slice(0, 2));
        const a = okA.find(t => t.id === pr.audioNum) || (pr.audioLang ? okA.find(t => lg(t) === pr.audioLang) : null) || okA[0] || null;
        if (a) { at = { num: 2, rate: a.ts, strip: null }; akind = "mp4"; aset = { kind: "mp4", codec: mp4Codec(a), rate: a.ts, entry: a.entry }; if (aset.codec === "mp4a.6B") aset.alts = ["mp4a.69", "mp3"]; }
        else if (auds.length) { audioDropped = true; cb.note && cb.note("audio " + auds[0].etype); }
        cb.tracks && cb.tracks({ audio: okA.map(t => ({ num: t.id, lang: lg(t), name: "", codec: t.etype })), audioOn: a ? a.id : 0, subs: [] });
        if (!v && !a) { fail("notracks"); return null; }
        return { v, a };
      }
    };
    function sniff(b) {
      if (b.length >= 4 && b[0] === 0x1A && b[1] === 0x45 && b[2] === 0xDF && b[3] === 0xA3) return Demuxer(H);
      const ty = b.length >= 8 ? String.fromCharCode(b[4], b[5], b[6], b[7]) : "";
      if (/^(ftyp|moov|mdat|free|skip|wide|styp)$/.test(ty)) { isMp4 = true; log("container mp4"); return Mp4Demuxer(H, fetchMoov); }
      return null;
    }
    // MP4 with its index at the end: read only that box
    async function readRange(a, b) {
      const r = await open(a, b, null);
      if (r.status !== 206) { cancelR(r.reader); throw new Error("norange"); }
      const parts = [];
      let got = 0;
      for (;;) { const x = await r.reader.read(); if (x.done) break; parts.push(x.value); got += x.value.length; if (got > b - a) break; }
      return concat(parts);
    }
    async function fetchMoov(at0) {
      let p = at0;
      for (let hop = 0; hop < 8; hop++) {
        const head = await readRange(p, p + 15);
        let size = u32at(head, 0), hl = 8;
        const type = typeAt(head, 4);
        if (size === 1) { size = u32at(head, 8) * 4294967296 + u32at(head, 12); hl = 16; }
        if (type === "moov") { log("moov at end " + Math.round(size / 1024) + "KB"); const m = await readRange(p, p + size - 1); return m.subarray(hl, size); }
        if (!size) break;
        p += size;
      }
      throw new Error("nomoov");
    }

    // decode times = presentation times taken in sorted order (needs a few frames of look-ahead)
    function assign(force) {
      const K = 8;
      while (assigned < vf.length && (force || vf.length - assigned > K)) {
        let mi = 0;
        for (let i = 1; i < pend.length; i++) if (pend[i] < pend[mi]) mi = i;
        const m = pend.splice(mi, 1)[0];
        const f = vf[assigned];
        if (D < 0 && vf.length >= 16) {
          // reorder delay from the first frames (B-frames): how far presentation runs ahead of decode
          const s = vf.slice(0, 16).map(x => x.pts).sort((x, y) => x - y);
          D = 0;
          for (let i = 0; i < 16; i++) D = Math.max(D, s[i] - vf[i].pts);
        }
        f.dts = Math.max(m, lastDts + 0.5);
        lastDts = f.dts;
        assigned++;
      }
    }
    function maybeEmit(force) {
      if (stopped) return;
      if (vt) {
        if (D < 0 && !force) return;
        if (D < 0) D = 0;
        // frames whose duration is known (their successor has a decode time)
        const ready = force ? vf.length : assigned - 1;
        if (ready < 1) return;
        let cut = 0;
        const t0 = vf[0].dts;
        for (let i = 1; i <= ready && i < vf.length; i++) if (vf[i].key && vf[i].dts - t0 >= 1000) { cut = i; break; }
        if (!cut && ready > 0 && vf[ready - 1].dts - t0 >= 2500) cut = ready;
        if (!cut && seq === 1 && ready > 0 && vf[ready - 1].dts - t0 >= 700) cut = ready; // first piece early → quick start
        if (!cut && force) cut = vf.length;
        if (!cut) return;
        if (!initDone && (!opened || !makeInit(force))) return;
        const frames = vf.splice(0, cut);
        assigned -= cut;
        const endDts = vf.length ? vf[0].dts : frames[frames.length - 1].dts + defDur;
        // decode time = dts; presentation = pts + D (D = reorder delay, so presentation never precedes decode)
        const tick = x => Math.round(x * 90);
        const samples = frames.map((f, i) => {
          const next = i + 1 < frames.length ? frames[i + 1].dts : endDts;
          return { dur: Math.max(1, tick(next) - tick(f.dts)), size: f.data.length, key: f.key, cto: Math.round((f.pts + D) * 90) - tick(f.dts) };
        });
        const audio = aq.length && aset ? takeAudio(endDts + D) : null;
        queue.push(fragment(seq++, [{ id: 1, base: tick(frames[0].dts), samples, data: frames.map(f => f.data) }].concat(audio ? [audio] : [])));
        pump();
      } else {
        if (!aq.length) return;
        const span = aq[aq.length - 1].ts - aq[0].ts;
        if (span < 1000 && !force) return;
        if (!initDone && (!opened || !makeInit(force))) return;
        const audio = takeAudio(Infinity);
        if (audio) { queue.push(fragment(seq++, [audio])); pump(); }
      }
      if (vf.length > 600) vf.splice(0, vf.length - 600);
    }
    function takeAudio(untilMs) {
      const out = [];
      while (aq.length && aq[0].ts + (D > 0 ? D : 0) < untilMs) out.push(aq.shift());
      if (!out.length) return null;
      const shift = vt ? D : 0;
      return { id: 2, base: Math.max(0, Math.round((out[0].ts + shift) * aset.rate / 1000)), samples: out.map(x => ({ dur: x.n, size: x.data.length })), data: out.map(x => x.data) };
    }
    function makeInit(force) {
      if (at && !aset && !audioDropped) {
        aset = audioSetup(at, akind, firstAudio);
        if (!aset && (firstAudio || force || (vf.length && vf[vf.length - 1].pts - vf[0].pts > 3000))) { audioDropped = true; aq = []; cb.note && cb.note("audio " + at.codec); }
        if (!aset && !audioDropped) return false;
      }
      const v = vset ? { w: vt.w, h: vt.h, entry: vset.entry } : null;
      let a = aset && !audioDropped ? aset : null;
      const mime = c => (v ? "video/mp4" : "audio/mp4") + '; codecs="' + c.join(",") + '"';
      let codecs = [vset && vset.codec, a && a.codec].filter(Boolean);
      if (a && a.alts && MSClass.isTypeSupported && !MSClass.isTypeSupported(mime(codecs))) {
        const alt = a.alts.find(x => MSClass.isTypeSupported(mime([vset && vset.codec, x].filter(Boolean))));
        if (alt) codecs = [vset && vset.codec, alt].filter(Boolean);
      }
      if (MSClass.isTypeSupported && !MSClass.isTypeSupported(mime(codecs))) {
        if (a && v && MSClass.isTypeSupported(mime([vset.codec]))) { cb.note && cb.note("audio " + a.codec); a = null; aset = null; audioDropped = true; aq = []; codecs = [vset.codec]; }
        else { fail("codec " + codecs.join(",")); return false; }
      }
      log("mime " + mime(codecs) + (MSClass.isTypeSupported ? " ✓" : ""));
      try {
        if (durMs > 0 && ms.readyState === "open") ms.duration = (durMs + (D > 0 ? D : 0)) / 1000;
        sb = ms.addSourceBuffer(mime(codecs));
        try { sb.mode = "segments"; } catch (e) { /* ignore */ }
        sb.addEventListener("updateend", onUpdateEnd);
        sb.addEventListener("error", () => fail("sourcebuffer" + (video.error ? " " + video.error.code : "")));
      } catch (e) { fail("addSourceBuffer " + (e && e.message)); return false; }
      queue.unshift(initSegment(v, a, durMs));
      initDone = true;
      return true;
    }
    function onUpdateEnd() {
      if (appending) { appending = false; const j = queue.shift(); if (j && !j.remove) { segs++; if (segs <= 2) log("appended #" + segs + " buffered " + rangesText()); } }
      if (!started && video.buffered.length) {
        started = true;
        log("start at " + video.buffered.start(0).toFixed(2));
        try { if (video.currentTime < video.buffered.start(0)) video.currentTime = video.buffered.start(0); } catch (e) { /* ignore */ }
        const pr = video.play();
        if (pr && pr.then) pr.then(() => log("play ok"), err => { log("play " + (err && err.name)); cb.blocked && cb.blocked(err); });
        cb.ready && cb.ready({ seekable: isMp4 || !!(cues || (seekhead && seekhead[E.CUES])) });
        if (!isMp4) loadCues();
      }
      if (seq % 8 === 0) trim(false);
      if (ended && !queue.length && !sb.updating) { try { if (ms.readyState === "open") ms.endOfStream(); } catch (e) { /* ignore */ } }
      pump();
    }

    // cues at the end of the file: fetch just that part
    async function loadCues() {
      if (isMp4 || cues || !seekhead || !seekhead[E.CUES] || cuesAt >= 0) return;
      cuesAt = seekhead[E.CUES];
      try {
        const r = await open(cuesAt, cuesAt + 2097151, null);
        if (r.status !== 206) { cancelR(r.reader); return; }
        const parts = [];
        for (;;) { const x = await r.reader.read(); if (x.done) break; parts.push(x.value); }
        const d = concat(parts);
        const id = rid(d, 0, d.length), sz = id && !id.bad ? rsize(d, id.l, d.length) : null;
        if (!id || id.v !== E.CUES || !sz || sz.bad) return;
        const s = id.l + sz.l, e = Math.min(d.length, s + sz.v);
        cues = parseCues(d, s, e, dm.segStart, dm.tcScale);
        if (pendingSeek != null) { const t = pendingSeek; pendingSeek = null; seekTo(t); }
      } catch (e) { /* no seeking then */ }
    }

    function onSeeking() {
      if (stopped || !initDone) return;
      const t = video.currentTime;
      try { const b = video.buffered; for (let i = 0; i < b.length; i++) if (b.start(i) <= t && b.end(i) > t + 0.5) return; } catch (e) { /* ignore */ }
      if (isMp4) { seekTo(t); return; }
      if (!cues) {
        if (!seekhead || !seekhead[E.CUES]) { cb.note && cb.note("noseek"); return; }
        pendingSeek = t; loadCues(); return;
      }
      seekTo(t);
    }
    async function seekTo(t) {
      const target = t * 1000 - (D > 0 ? D : 0);
      let cue;
      if (isMp4) {
        const p = dm ? dm.seekPos(target) : -1;
        if (p < 0) { cb.note && cb.note("noseek"); return; }
        cue = { pos: p };
      } else {
        if (!cues || !cues.length) { cb.note && cb.note("noseek"); return; }
        cue = cues[0];
        for (const c of cues) { if ((!vt || !c.track || c.track === vt.num) && c.ms <= target) cue = c; }
      }
      const my = ++epoch;
      const c2 = typeof AbortController === "function" ? new AbortController() : null;
      let r;
      try { r = await open(cue.pos, null, c2); }
      catch (e) { if (my === epoch) cb.note && cb.note("noseek"); return; }
      if (stopped || my !== epoch) { try { c2 && c2.abort(); } catch (e) { /* ignore */ } cancelR(r.reader); return; }
      if (r.status !== 206) { try { c2 && c2.abort(); } catch (e) { /* ignore */ } cancelR(r.reader); cb.note && cb.note("noseek"); return; }
      log("seek " + t.toFixed(0) + "s → byte " + cue.pos);
      try { ctl && ctl.abort(); } catch (e) { /* ignore */ }
      cancelR(curReader);
      ctl = c2;
      vf = []; pend = []; aq = []; assigned = 0; needKey = true; lastDts = -Infinity; ended = false;
      queue.splice(appending ? 1 : 0);
      try { const b = video.buffered; if (b.length) queue.push({ remove: [0, Math.max(b.end(b.length - 1), t) + 1] }); } catch (e) { /* ignore */ }
      dm.restartAt(cue.pos);
      pump();
      readLoop(r.reader, my);
    }

    async function readLoop(rd, my) {
      reader = rd;
      curReader = rd;
      try {
        for (;;) {
          while (!stopped && my === epoch && started && ahead() > ((cb.prefs && cb.prefs.ahead) || 75)) await new Promise(res => setTimeout(res, 500));
          if (stopped || my !== epoch) return;
          const { done, value } = await rd.read();
          if (stopped || my !== epoch) return;
          if (done) {
            assign(true);
            maybeEmit(true);
            ended = true;
            if (!queue.length && sb && !sb.updating) { try { if (ms.readyState === "open") ms.endOfStream(); } catch (e) { /* ignore */ } }
            // a small file on a fast line can arrive before the player opened the engine: wait for it
            if (!initDone && opened) fail("noinit");
            return;
          }
          if (!bytes) log("first bytes");
          bytes += value.length;
          if (!dm) { dm = sniff(value); if (!dm) { fail("format"); return; } }
          dm.push(value);
          if (dm.dead) return;
        }
      } catch (e) { if (!stopped && my === epoch) { log("read " + (e && e.message)); fail("read"); } }
    }

    // ---- network: the browser's fetch, or (relay mode) Scriptable fetching byte ranges for us ----
    let relayInfo = null, curReader = null;
    const cancelR = rd => { try { const x = rd && rd.cancel(); if (x && x.catch) x.catch(() => {}); } catch (e) { /* ignore */ } };
    async function open(start, end, ac) {
      if (!cb.relay) {
        const headers = {};
        if (start > 0 || end != null) headers.Range = "bytes=" + start + "-" + (end != null ? end : "");
        const r = await fetch(url, { headers, signal: ac ? ac.signal : undefined });
        if (!r.body || !r.body.getReader) throw new Error("nobody");
        return { status: r.status, type: r.headers.get("content-type") || "", len: +r.headers.get("content-length") || 0, reader: r.body.getReader() };
      }
      if (!relayInfo) {
        relayInfo = await cb.relay.info(url);
        log("relay " + relayInfo.status + " " + Math.round(relayInfo.total / 1048576) + "MB ranges:" + relayInfo.ranges);
        if (!relayInfo.total) throw new Error("norelay");
      }
      const last = Math.min(end != null ? end : Infinity, relayInfo.total - 1);
      const CH = (cb.relay && cb.relay.chunk) || 1536 * 1024;
      let pos = start, ahead = null, cancelled = false;
      const get = p => cb.relay.read(url, p, Math.min(CH, last - p + 1));
      const reader = {
        async read() {
          if (cancelled || pos > last) return { done: true };
          const job = ahead || get(pos);
          ahead = null;
          const bytes = await job;
          if (cancelled || !bytes.length) return { done: true };
          pos += bytes.length;
          if (pos <= last) { ahead = get(pos); ahead.catch(() => {}); }
          return { done: false, value: bytes };
        },
        cancel() { cancelled = true; }
      };
      return { status: start > 0 || end != null ? 206 : 200, type: relayInfo.type, len: last - start + 1, reader };
    }
    const rangesText = () => { try { const b = video.buffered; let t = ""; for (let i = 0; i < b.length; i++) t += (i ? "," : "") + b.start(i).toFixed(1) + "-" + b.end(i).toFixed(1); return t || "∅"; } catch (e) { return "?"; } };

    // the download starts right away (not after "sourceopen"), so the first picture comes sooner
    (async () => {
      ctl = typeof AbortController === "function" ? new AbortController() : null;
      let r;
      try { r = await open(0, null, ctl); }
      catch (e) { if (!stopped) { log("net " + (e && e.message)); fail(e && e.name === "AbortError" ? "abort" : cb.relay ? "relay" : "fetch"); } return; }
      if (stopped) { cancelR(r.reader); return; }
      log((cb.relay ? "relay " : "http ") + r.status + " " + r.type + " " + Math.round(r.len / 1048576) + "MB");
      if (r.status >= 400) { fail("http " + r.status); return; }
      readLoop(r.reader, epoch);
    })();

    ms.addEventListener("sourceopen", () => { if (opened) return; opened = true; try { window.__msAttach = how; } catch (e) { /* ignore */ } log("sourceopen " + (MSClass === window.ManagedMediaSource ? "MMS" : "MS") + " " + how); maybeEmit(ended); if (ended && !initDone) { fail("noinit"); return; } pump(); });
    video.addEventListener("seeking", onSeeking);
    video.addEventListener("error", onVErr);
    try { video.disableRemotePlayback = true; } catch (e) { /* ignore */ }
    // attach the MediaSource: ManagedMediaSource in Scriptable's web view opens only as srcObject,
    // so that goes first there (and whatever worked last time is remembered)
    let how = "";
    const viaObj = () => { try { video.removeAttribute("src"); video.srcObject = ms; how = "obj"; return true; } catch (e) { log("srcObject " + (e && e.message)); return false; } };
    const viaURL = () => { try { video.srcObject = null; } catch (e) { /* ignore */ } objURL = objURL || URL.createObjectURL(ms); video.src = objURL; how = "url"; };
    const first = window.__msAttach || (MSClass === window.ManagedMediaSource && "srcObject" in video ? "obj" : "url");
    if (!(first === "obj" && viaObj())) viaURL();
    log("attached " + how);
    setTimeout(() => {
      if (opened || stopped) return;
      if (how === "obj") { log("no sourceopen → src"); viaURL(); }
      else if ("srcObject" in video && viaObj()) log("no sourceopen → srcObject");
      else { fail("nosourceopen"); return; }
      setTimeout(() => { if (!opened && !stopped) fail("nosourceopen"); }, 2500);
    }, 2000);
    return { stop, get active() { return !stopped; },
      stats: () => ({ bytes, segs, opened, initDone, started, log: L.slice(), buffered: rangesText(), shift: D > 0 ? D : 0 }) };
  }

  return { supported: () => !!MS(), play, _parseBlock: parseBlock, _hevcCodec: hevcCodec, _dac3: dac3, _dec3: dec3 };
})();

"use strict";
// inside the iPhone app (IPA) instead of Scriptable: instant messages + the app fetches from any server
const IN_APP = !!window.SAHRA_APP;
const APP_POST = IN_APP && window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.sahra;
/* ================= bridge to Scriptable ================= */
const BRIDGE_URL = "https://scriptable-bridge.invalid/b?d=";
const BRIDGE_SESSION = "__BRIDGE_SESSION__";
const bridge = {
  // ids are unique per page load (a reload must not look like old, already-answered messages)
  seq: Date.now() % 1e10, queue: [], pending: {}, sending: false, replies: 0,
  call(action, params, timeoutMs, urgent) {
    return new Promise((resolve, reject) => {
      const id = ++this.seq;
      const t = setTimeout(() => {
        if (this.pending[id]) { delete this.pending[id]; reject(new Error("انتهت مهلة الاتصال، حاول مرة أخرى.")); }
      }, timeoutMs || 60000);
      const msg = { id, action, params: params || {} };
      // a large message goes in small parts: a huge URL can crash the web view
      const json = JSON.stringify(msg);
      const out = [];
      if (json.length > 6000) {
        const n = Math.ceil(json.length / 6000);
        for (let i = 0; i < n; i++) out.push({ id: id + "p" + i, action: "__part", params: { of: id, i, n, d: json.slice(i * 6000, (i + 1) * 6000) } });
      } else out.push(msg);
      this.pending[id] = { out, sentAt: 0, resolve: v => { clearTimeout(t); resolve(v); }, reject: e => { clearTimeout(t); reject(e); } };
      if (urgent) this.queue.unshift(...out); else this.queue.push(...out);
      this.flush();
      // (polling must not wait for the "load" event: WebKit stops the page load when it
      //  sees the bridge navigation, so "load" may never come)
      setTimeout(() => this.watch(id, 0), APP_POST ? 1500 : 60);
    });
  },
  flush() {
    if (this.sending || !this.queue.length) return;
    const batch = [];
    let size = 0;
    while (this.queue.length && batch.length < 25) {
      const s = encodeURIComponent(JSON.stringify(this.queue[0])).length;
      if (batch.length && size + s > 40000) break;
      batch.push(this.queue.shift());
      size += s;
    }
    const now = Date.now();
    batch.forEach(m => { const p = this.pending[m.action === "__part" ? m.params.of : m.id]; if (p) p.sentAt = now; });
    this.sending = true;
    const url = BRIDGE_URL + encodeURIComponent(JSON.stringify(batch));
    try { if (APP_POST) APP_POST.postMessage(url); else window.location.href = url; } catch (e) { try { window.location.href = url; } catch (x) { /* ignore */ } }
    setTimeout(() => { this.sending = false; this.flush(); }, APP_POST ? 0 : 120);
  },
  watch(id, n) {
    const p = this.pending[id];
    if (!p) return;
    if (p.sentAt && Date.now() - p.sentAt > 6000 && !this.queue.includes(p.out[0])) { p.sentAt = Date.now(); this.queue.push(...p.out); this.flush(); }
    const s = document.createElement("script");
    s.src = "r/" + BRIDGE_SESSION + "_" + id + ".js?n=" + n;
    const next = () => {
      s.remove();
      if (this.pending[id]) setTimeout(() => this.watch(id, n + 1), n < 12 ? 70 : n < 60 ? 150 : 300);
    };
    s.onload = next;
    s.onerror = next;
    document.head.appendChild(s);
  },
  deliver(r) {
    this.replies++;
    const p = this.pending[r.id];
    if (!p) return;
    delete this.pending[r.id];
    if (r.ok) p.resolve(r.data); else p.reject(new Error(r.error || "حدث خطأ"));
  }
};
window.bridge = bridge;
setTimeout(() => {
  if (bridge.replies) return;
  const d = document.createElement("div");
  d.id = "bridge-error";
  d.style.cssText = "position:fixed;left:20px;right:20px;bottom:calc(env(safe-area-inset-bottom) + 40px);z-index:9999;padding:16px;border-radius:16px;background:rgba(255,59,92,.2);border:1px solid rgba(255,59,92,.55);color:#fff;font:600 14px -apple-system,sans-serif;line-height:1.7;text-align:center;direction:rtl";
  d.innerHTML = (IN_APP ? "لم يبدأ محرّك التطبيق بعد." : "لم يبدأ محرّك Scriptable بعد.") + "<br>اضغط «إعادة المحاولة»، وإذا استمرت المشكلة أغلق Scriptable من قائمة التطبيقات وافتحه مرة ثانية." +
    '<br><button style="margin-top:12px;padding:10px 22px;border-radius:999px;background:#fff;color:#111;font:800 14px -apple-system,sans-serif">إعادة المحاولة</button>';
  d.querySelector("button").onclick = () => { d.remove(); bridge.queue = []; bridge.sending = false; Object.keys(bridge.pending).forEach(id => { const p = bridge.pending[id]; p.sentAt = Date.now(); bridge.queue.push(...p.out); }); bridge.flush(); };
  document.body.appendChild(d);
}, 8000);
const LONG = { connect: 300000, extras: 120000, diagLink: 90000 };
const api = (action, params, urgent) => bridge.call(action, params, LONG[action] || 60000, urgent);

/* ================= helpers ================= */
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const pad = n => String(n).padStart(2, "0");
const hhmm = sec => { const d = new Date(sec * 1000); return pad(d.getHours()) + ":" + pad(d.getMinutes()); };
const fmtTime = s => {
  if (!isFinite(s) || s <= 0) return "0:00";
  s = Math.floor(s);
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), x = s % 60;
  return h ? h + ":" + pad(m) + ":" + pad(x) : m + ":" + pad(x);
};
const initials = name => (String(name || "").replace(/[^\\p{L}\\p{N}]/gu, "").slice(0, 2) || "TV").toUpperCase();
const debounce = (fn, ms) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };
const hostOf = url => (String(url || "").match(/^[a-z]+:\\/\\/([^\\/?#]+)/i) || [])[1] || String(url || "");
const imgOK = "this.classList.add('ok')";
const imgErr = "this.remove()";

const ICONS = {
  home: '<path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/>',
  live: '<rect x="2.5" y="6" width="19" height="13" rx="3"/><path d="M8 2.5l4 3.5 4-3.5"/>',
  film: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M7 3v18M17 3v18M3 8h4M3 16h4M17 8h4M17 16h4M3 12h18"/>',
  series: '<rect x="2" y="6" width="20" height="14" rx="3"/><path d="M7 2.5h10M10 10l5 3-5 3z"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M20.5 20.5l-4.2-4.2"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
  sliders: '<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>',
  x: '<path d="M18 6L6 18M6 6l12 12"/>',
  chev: '<path d="M9 18l6-6-6-6"/>',
  left: '<path d="M15 18l-6-6 6-6"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/>',
  list: '<path d="M9 6h12M9 12h12M9 18h12M4 6h.01M4 12h.01M4 18h.01"/>',
  full: '<path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M16 21h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>',
  aspect: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M6 9v6M18 9v6"/>',
  ext: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>',
  refresh: '<path d="M21 4v6h-6M3 20v-6h6"/><path d="M5.5 9a8 8 0 0 1 13.4-3L21 10M3 14l2.1 4a8 8 0 0 0 13.4-3"/>',
  alert: '<path d="M12 3l10 18H2z"/><path d="M12 10v4M12 17.5h.01"/>',
  tv: '<rect x="3" y="5" width="18" height="13" rx="2"/><path d="M8 21h8"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  lock: '<rect x="4.5" y="10.5" width="15" height="10" rx="2.5"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/>',
  unlock: '<rect x="4.5" y="10.5" width="15" height="10" rx="2.5"/><path d="M8 10.5V7.5a4 4 0 0 1 7.6-1.7"/>',
  fire: '<path d="M12 22c4.4 0 7-2.9 7-6.6 0-3.2-2-5.6-3.6-7.4-.6 2-1.6 3-2.8 3.4C13.4 8 12.4 4.6 9.6 2 9.8 5.6 5 8.6 5 15.4 5 19.1 7.6 22 12 22z"/>',
  trash: '<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5h.01"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  more: '<circle cx="5" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="19" cy="12" r="1.4"/>',
  server: '<rect x="3" y="3" width="18" height="7" rx="2"/><rect x="3" y="14" width="18" height="7" rx="2"/><path d="M7 6.5h.01M7 17.5h.01"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
  star: '<path d="M12 2.8l2.85 5.78 6.38.93-4.62 4.5 1.09 6.35L12 17.36l-5.7 3 1.09-6.35-4.62-4.5 6.38-.93z"/>',
  back10: '<path d="M3 4v5h5"/><path d="M3.5 13a8.5 8.5 0 1 0 2.2-6.4L3 9"/>',
  fwd10: '<path d="M21 4v5h-5"/><path d="M20.5 13a8.5 8.5 0 1 1-2.2-6.4L21 9"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  cc: '<rect x="2.5" y="5" width="19" height="14" rx="3"/><path d="M10.5 10.2a2.4 2.4 0 1 0 0 3.6M17 10.2a2.4 2.4 0 1 0 0 3.6"/>',
  dl: '<path d="M12 3.5v11M7 10l5 5 5-5M4.5 19.5h15"/>',
  wave: '<path d="M3 12h2M7 8v8M11 5v14M15 9v6M19 11v2"/>',
  pip: '<rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><rect x="11.5" y="11" width="7.5" height="6" rx="1.3" fill="currentColor" stroke="none"/>',
  copy: '<rect x="9" y="9" width="12" height="12" rx="2.5"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="M15.6 8.4l-2.1 5.1-5.1 2.1 2.1-5.1z"/>',
  ask: '<circle cx="12" cy="12" r="9"/><path d="M9.6 9.3a2.5 2.5 0 0 1 4.8 1c0 1.7-2.4 2.2-2.4 3.7M12 17.4h.01"/>',
  players: '<rect x="3" y="4" width="18" height="13" rx="2.5"/><path d="M10.5 8.3v4.4l3.7-2.2z"/><path d="M8 21h8"/>'
};
const FILLED = {
  play: '<path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.4-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/>',
  pause: '<rect x="6" y="5" width="4.2" height="14" rx="1.2"/><rect x="13.8" y="5" width="4.2" height="14" rx="1.2"/>',
  next: '<path d="M5 6.2v11.6a.9.9 0 0 0 1.4.75l8.6-5.8a.9.9 0 0 0 0-1.5L6.4 5.45A.9.9 0 0 0 5 6.2z"/><rect x="16.5" y="5" width="2.6" height="14" rx="1.1"/>',
  prev: '<path d="M19 6.2v11.6a.9.9 0 0 1-1.4.75L9 12.75a.9.9 0 0 1 0-1.5l8.6-5.8A.9.9 0 0 1 19 6.2z"/><rect x="4.9" y="5" width="2.6" height="14" rx="1.1"/>',
  heartf: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/>'
};
function icon(name, size) {
  const s = size || 22;
  if (FILLED[name]) return '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="currentColor">' + FILLED[name] + "</svg>";
  return '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + (ICONS[name] || "") + "</svg>";
}
function paintIcons(root) {
  (root || document).querySelectorAll("[data-icon]").forEach(el => {
    if (!el.firstChild) el.innerHTML = icon(el.dataset.icon, el.dataset.size ? +el.dataset.size : undefined);
  });
}

let toastTimer = null;
function toast(text) {
  const t = $("#toast");
  t.textContent = text;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2300);
}
const emptyHTML = (ic, title, msg) => '<div class="empty"><div class="eic">' + icon(ic, 28) + "</div><b>" + esc(title) + "</b>" + (msg ? esc(msg) : "") + "</div>";

/* ================= state ================= */
function newCat() { return { cat: "", q: "", items: [], page: 0, total: 0, loading: false, end: false, error: "", gen: 0 }; }
const S = {
  store: {}, portals: [], portal: null, settings: { live: "app", vod: "app", format: "auto", engine: 1, bg: true, skip: 10, autoNext: true, buffer: 60, retry: true,
    audioLang: "", subs: "ar", subSize: 2, subBg: 1, subDelay: 0, glass: false },
  connected: false, conn: null, connError: "", connGen: 0, mainShown: false,
  channels: [], genres: [], genreTitle: {}, liveGroup: "*", liveQuery: "", liveList: [], liveShown: 0,
  cats: { movies: [], series: [] }, account: [], notice: "",
  favCh: [], favVod: [], progress: {}, recentQ: [],
  cat: { movies: newCat(), series: newCat() }, tab: "home", detail: null, rails: {}
};
const pk = name => name + ":" + (S.portal ? S.portal.id : "none");
const persist = (key, value) => { S.store[key] = value; return api("saveState", { key, value }).catch(() => {}); };
const saveProgress = debounce(() => {
  const keys = Object.keys(S.progress);
  if (keys.length > 150) keys.sort((a, b) => (S.progress[b].ts || 0) - (S.progress[a].ts || 0)).slice(150).forEach(k => { delete S.progress[k]; });
  persist(pk("progress"), S.progress);
}, 1500);
const LISTS = {};
const ITEMS = new Map();
const remember = list => { list.forEach(it => ITEMS.set(it.kind + ":" + it.id, it)); return list; };

function showScreen(name) {
  ["portals", "connecting"].forEach(id => $("#" + id).classList.toggle("on", id === name));
}
function hideScreens() { showScreen(null); }

/* ================= portals ================= */
const displayName = p => (p.name && p.name.trim()) || hostOf(p.url);
function formatMac(v) {
  const hex = String(v || "").toUpperCase().replace(/[^0-9A-F]/g, "").slice(0, 12);
  return hex.replace(/(.{2})(?=.)/g, "$1:");
}
const macValid = v => /^([0-9A-F]{2}:){5}[0-9A-F]{2}$/.test(v);
const urlValid = v => { const t = String(v || "").trim(); return t.length > 4 && /[.:]/.test(t); };

function showPortals(error) {
  showScreen("portals");
  $("#tabbar").classList.add("away");
  $("#portal-error").innerHTML = error ? '<div class="alert"><span style="color:var(--gold);flex:none">' + icon("alert", 20) + "</span><div>" + esc(error) + "</div></div>" : "";
  const box = $("#portal-list");
  if (!S.portals.length) {
    box.innerHTML = emptyHTML("server", "أضف اشتراكك", "أدخل رابط البورتال وعنوان MAC الذي فعّله لك مزوّد الخدمة.");
    return;
  }
  box.innerHTML = S.portals.map((p, i) =>
    '<div class="pcard2 press rise" style="--i:' + i + '" data-act="connect" data-id="' + esc(p.id) + '">' +
      '<div class="ic">' + icon("tv", 24) + "</div>" +
      '<div class="meta"><div class="t">' + esc((p.name && p.name.trim()) || "اشتراك MAC") + '</div><div class="s" style="direction:ltr;text-align:right">' + esc(p.mac) + '</div><div class="s">' + esc(hostOf(p.url)) + "</div></div>" +
      '<button class="iconbtn" data-act="portal-menu" data-id="' + esc(p.id) + '">' + icon("more", 22) + "</button>" +
      '<span class="go">تشغيل</span></div>').join("");
}

function openModal(html) {
  $("#panel").innerHTML = '<div class="grab"></div>' + html;
  paintIcons($("#panel"));
  $("#modal").classList.add("open");
}
function closeModal() { $("#modal").classList.remove("open"); }

let editing = null;
function openEditor(portal) {
  editing = portal || null;
  const p = portal || { name: "", url: "", mac: "00:1A:79", serial: "", deviceId1: "", deviceId2: "", signature: "", model: "MAG250" };
  const models = ["MAG250", "MAG254", "MAG256", "MAG322", "MAG324", "MAG420", "MAG424", "MAG524"];
  const adv = !!(p.serial || p.deviceId1 || p.deviceId2 || p.signature || (p.model && p.model !== "MAG250"));
  openModal(
    "<h3>" + (portal ? "تعديل الاشتراك" : "اشتراك MAC جديد") + '</h3><p class="ps">البيانات يعطيك إياها مزوّد الاشتراك</p>' +
    '<div class="field"><label>اسم الاشتراك (اختياري)</label><input id="f-name" value="' + esc(p.name) + '" placeholder="مثال: اشتراك البيت"></div>' +
    '<div class="field"><label>رابط البورتال</label><input id="f-url" class="ltr" dir="ltr" type="url" inputmode="url" autocapitalize="off" autocorrect="off" spellcheck="false" value="' + esc(p.url) + '" placeholder="http://example.com:8080/c/"></div>' +
    '<div class="field"><label>عنوان MAC</label><input id="f-mac" class="ltr" dir="ltr" autocapitalize="characters" autocorrect="off" spellcheck="false" value="' + esc(p.mac) + '" placeholder="00:1A:79:XX:XX:XX"><div class="err hidden" id="f-mac-err">عنوان MAC غير مكتمل</div></div>' +
    '<button class="adv" data-act="toggle-adv">' + icon("sliders", 16) + "إعدادات متقدمة</button>" +
    '<div id="f-adv" class="' + (adv ? "" : "hidden") + '">' +
      '<div class="field"><label>نوع الجهاز</label><select id="f-model">' + models.map(m => "<option" + (m === p.model ? " selected" : "") + ">" + m + "</option>").join("") + "</select></div>" +
      ["serial:Serial Number", "deviceId1:Device ID 1", "deviceId2:Device ID 2", "signature:Signature"].map(x => {
        const [k, label] = x.split(":");
        return '<div class="field"><label>' + label + '</label><input id="f-' + k + '" class="ltr" dir="ltr" autocapitalize="characters" autocorrect="off" spellcheck="false" value="' + esc(p[k]) + '"></div>';
      }).join("") +
      '<p class="note" style="text-align:right;margin-top:0">اتركها فارغة إلا إذا طلبها مزوّد الخدمة.</p></div>' +
    '<div class="btnrow"><button class="btn2 press" data-act="close-modal">إلغاء</button><button class="btn1 press" id="f-save" data-act="save-portal">حفظ وتشغيل</button></div>'
  );
  const mac = $("#f-mac"), url = $("#f-url");
  const validate = () => {
    $("#f-save").disabled = !(macValid(mac.value) && urlValid(url.value));
    $("#f-mac-err").classList.toggle("hidden", mac.value.length < 17 || macValid(mac.value));
  };
  mac.addEventListener("input", () => { const f = formatMac(mac.value); if (f !== mac.value) mac.value = f; validate(); });
  url.addEventListener("input", validate);
  validate();
}

function savePortal() {
  const val = id => ($(id) ? $(id).value.trim() : "");
  const portal = Object.assign({}, editing || {}, {
    name: val("#f-name"), url: val("#f-url"), mac: formatMac(val("#f-mac")),
    model: $("#f-model") ? $("#f-model").value : "MAG250",
    serial: val("#f-serial"), deviceId1: val("#f-deviceId1"), deviceId2: val("#f-deviceId2"), signature: val("#f-signature")
  });
  if (!macValid(portal.mac) || !urlValid(portal.url)) return;
  if (!portal.id) portal.id = "p" + Date.now().toString(36);
  const i = S.portals.findIndex(p => p.id === portal.id);
  if (i >= 0) S.portals[i] = portal; else S.portals.push(portal);
  persist("portals", S.portals);
  api("portalCacheDrop", { id: portal.id }).catch(() => {});
  closeModal();
  enterPortal(portal, true);
}

function portalMenu(id) {
  const p = S.portals.find(x => x.id === id);
  if (!p) return;
  openModal("<h3>" + esc(displayName(p)) + "</h3>" +
    '<button class="sheetact press" data-act="edit-portal" data-id="' + esc(id) + '">تعديل</button>' +
    '<button class="sheetact danger press" data-act="delete-portal" data-id="' + esc(id) + '">حذف الاشتراك</button>' +
    '<button class="sheetact press" data-act="close-modal">إلغاء</button>');
}

function deletePortal(id) {
  S.portals = S.portals.filter(p => p.id !== id);
  persist("portals", S.portals);
  ["favCh", "favVod", "progress"].forEach(k => persist(k + ":" + id, null));
  if (S.store.lastPortal === id) { S.store.lastPortal = null; persist("lastPortal", null); }
  closeModal();
  showPortals();
}

/* ================= connection ================= */
function setSteps(n) {
  [1, 2, 3].forEach(i => {
    const el = $("#st-" + i);
    el.classList.toggle("done", i < n);
    el.classList.toggle("on", i === n);
  });
}

async function enterPortal(portal, fresh) {
  S.portal = portal;
  S.store.lastPortal = portal.id;
  persist("lastPortal", portal.id);
  S.favCh = S.store[pk("favCh")] || [];
  S.favVod = S.store[pk("favVod")] || [];
  S.progress = S.store[pk("progress")] || {};
  S.cat = { movies: newCat(), series: newCat() };
  PAGES.clear();
  PAGE_REQ.clear();
  LIVEP.clear();
  LIVEP_REQ.clear();
  LIVE.gen++; LIVE.group = null;
  S.lazy = false;
  S.liveSig = "";
  S.liveWin = S.store[pk("liveWin")] || "";
  S.vodWin = S.store[pk("vodWin")] || {};
  S.liveGroup = "*";
  S.liveQuery = "";
  S.rails = {};
  S.mainShown = false;
  S.extrasLoaded = false;
  let cached = null;
  if (!fresh) {
    try {
      cached = await api("portalCache", { id: portal.id });
    } catch (e) { cached = null; }
  }
  if (cached && cached.channels) {
    applyData(cached);
    showMain();
  } else {
    S.channels = []; S.genres = []; S.cats = { movies: [], series: [] }; S.account = []; S.rawChannels = []; S.rawGenres = []; S.rawCats = { movies: [], series: [] };
    $("#conn-name").textContent = displayName(portal);
    $("#conn-mac").textContent = portal.mac;
    setSteps(1);
    const note = $("#conn-note");
    if (S.recovered && S.prevDiag) {
      note.innerHTML = "توقف التشغيل السابق قبل أن يكتمل، فشغّلت <b>الوضع الخفيف</b> للقنوات." +
        '<div style="direction:ltr;text-align:left;font:600 11px ui-monospace,Menlo,monospace;margin-top:6px;opacity:.8">' + esc(S.prevDiag.steps.slice(-5).join("\\n")).replace(/\\n/g, "<br>") + "</div>";
      note.classList.remove("hidden");
    } else note.classList.add("hidden");
    showScreen("connecting");
    $("#tabbar").classList.add("away");
  }
  connect();
}

function applyData(d) {
  if (d.pages) Object.keys(d.pages).forEach(k => { if (!PAGES.has(k)) PAGES.set(k, Object.assign({}, d.pages[k], { disk: true })); });
  if (d.pages) Object.values(d.pages).forEach(v => remember(v.items || []));
  S.chanVer = (S.chanVer || 0) + 1;
  S.lazy = !!d.lazy;
  S.liveTotal = d.total || 0;
  if (d.livePages) Object.keys(d.livePages).forEach(k => LIVEP.set(k, d.livePages[k]));
  S.rawChannels = d.channels || [];
  S.rawGenres = d.genres || [];
  S.genreTitle = {};
  S.rawGenres.forEach(g => { S.genreTitle[g.id] = g.title; });
  if (d.cats) { S.rawCats = d.cats; S.extrasLoaded = true; }
  applyLock();
  if (d.account) S.account = d.account;
  if (d.rails) S.rails = d.rails;
  if (arOn() && S.langAvail) { if (S.langAvail.movies) delete S.rails["m-all"]; if (S.langAvail.series) delete S.rails["s-all"]; }
  if (d.pages) {
    // home rails straight from the saved first pages
    railDefs().forEach(r => { const pg = PAGES.get(pageKey(r.kind, r.cat, 1)); if (pg && !S.rails[r.id]) S.rails[r.id] = pg.items.slice(0, 18); });
  }
}

function connect() {
  const gen = ++S.connGen;
  const portal = S.portal;
  S.connected = false;
  S.connError = "";
  const stepTimer = setTimeout(() => { if (gen === S.connGen) setSteps(2); }, 1200);
  const stepTimer2 = setTimeout(() => { if (gen === S.connGen) setSteps(3); }, 2600);
  S.conn = api("connect", { portal, mode: S.settings.chMode || "auto" }).then(async r => {
    if (gen !== S.connGen) return;
    S.connected = true;
    S.notice = r.notice || "";
    if (!!r.lazy !== !!S.lazy) { LIVE.gen++; LIVE.group = null; }
    applyData({ channels: r.channels, genres: r.genres, lazy: r.lazy, total: r.total, livePages: r.livePages });
    api("diag", { s: "connected " + (r.lazy ? "light " + r.total : r.channels.length) }).catch(() => {});
    $("#banner").classList.remove("show");
    setSteps(4);
    if (!S.mainShown) showMain(); else { if (S.tab === "live") renderLive(); renderLiveRail(); }
    await loadExtras(gen);
  }).catch(e => {
    if (gen !== S.connGen) return;
    S.connError = e.message;
    if (S.mainShown) {
      $("#banner-t").textContent = e.message.split("\\n")[0];
      $("#banner").classList.add("show");
    } else {
      S.portal = null;
      showPortals(e.message);
    }
  }).finally(() => { clearTimeout(stepTimer); clearTimeout(stepTimer2); });
  return S.conn;
}

async function ready() {
  if (S.connected) return;
  if (S.conn) { try { await S.conn; } catch (e) { /* handled below */ } }
  if (S.connected) return;
  await connect();
  if (!S.connected) throw new Error(S.connError || "غير متصل بالبورتال");
}

async function loadExtras(gen) {
  try {
    const r = await api("extras");
    if (gen !== S.connGen) return;
    S.rawCats = { movies: r.movies || [], series: r.series || [] };
    applyLock();
    S.account = r.account || [];
  } catch (e) { /* optional */ }
  if (gen !== S.connGen) return;
  S.extrasLoaded = true;
  if (S.tab === "movies" || S.tab === "series") renderCatalog(S.tab);
  await loadRails(gen);
  saveCache();
}

function saveCache() { /* Scriptable keeps the subscription cache itself (no big uploads) */ }

function cancelConnect() {
  S.connGen++;
  S.portal = null;
  showPortals();
}

function switchPortal() {
  closeModal();
  closeSheet();
  S.connGen++;
  S.connected = false;
  S.portal = null;
  S.mainShown = false;
  S.store.lastPortal = null;
  persist("lastPortal", null);
  api("disconnect").catch(() => {});
  $("#banner").classList.remove("show");
  showPortals();
}

let keepAliveTimer = null;
function showMain() {
  if (S.autoLight) { S.autoLight = false; setTimeout(() => toast("توقف التحميل في المرة السابقة، فشغّلت الوضع الخفيف للقنوات"), 900); }
  S.mainShown = true;
  hideScreens();
  $("#tabbar").classList.remove("away");
  buildHome();
  switchTab("home");
  clearInterval(keepAliveTimer);
  keepAliveTimer = setInterval(() => { if (S.connected) api("keepAlive").catch(() => {}); }, 120000);
}

/* ================= tabs ================= */
const TABS = ["home", "live", "movies", "series", "search"];
function switchTab(tab) {
  if (!TABS.includes(tab)) return;
  const prev = S.tab;
  S.tab = tab;
  TABS.forEach(t => $("#pg-" + t).classList.toggle("on", t === tab));
  $$("#tabbar button").forEach(b => b.classList.toggle("on", b.dataset.tab === tab));
  $("#tabind").style.transform = "translateX(" + (-100 * TABS.indexOf(tab)) + "%)";
  if (tab === "live" && (S.liveSig !== liveSig() || !$("#live-grid").children.length)) renderLive();
  if (tab === "movies" || tab === "series") renderCatalog(tab);
  if (tab === "search" && prev !== "search") { renderSearch(); setTimeout(() => $("#search-q").focus(), 350); }
  if (tab === "home") { renderContinue(); renderFavRail(); }
}

/* ================= cards ================= */
function posterCard(v, i, ctx) {
  const tt = splitTag(v.name);
  return '<div class="pcard press rise" style="--i:' + (i % 12) + '" data-act="open-vod" data-key="' + esc(v.kind + ":" + v.id) + '">' +
    '<div class="pimg">' + esc(tt.title) + (tt.tag ? '<span class="tagl">' + esc(tt.tag) + "</span>" : "") + (v.poster ? '<img loading="lazy" decoding="async" src="' + esc(v.poster) + '" onload="' + imgOK + '" onerror="' + imgErr + '">' : "") +
    (v.rating ? '<span class="tagk tagr">★ ' + esc(v.rating) + "</span>" : (v.isSeries ? '<span class="tagk">مسلسل</span>' : (v.year ? '<span class="tagk">' + esc(v.year) + "</span>" : ""))) +
    (ctx === "new" && v.added ? '<span class="tagn">' + icon("clock", 11) + esc(relTime(v.added)) + "</span>" : "") + "</div>" +
    '<div class="pt">' + esc(tt.title) + "</div>" + (v.year ? '<div class="py">' + esc(v.year) + (v.isSeries ? " · مسلسل" : "") + "</div>" : "") + "</div>";
}

function chTile(c, i, ctx) {
  return '<div class="ccard press rise" style="--i:' + (i % 12) + '" data-act="play-ch" data-ctx="' + ctx + '" data-i="' + i + '">' +
    '<div class="ctile">' + esc(initials(c.name)) + (c.logo ? '<img loading="lazy" decoding="async" src="' + esc(c.logo) + '" onload="' + imgOK + '" onerror="' + imgErr + '">' : "") +
    '<span class="livedot"></span>' + (c.number > 0 ? '<span class="numb">' + c.number + "</span>" : "") +
    (c.archive ? '<div class="cbadges"><b>أرشيف</b></div>' : "") +
    '</div><div class="cn">' + esc(c.name) + "</div></div>";
}

function skeleton(n, kind) {
  let h = "";
  for (let i = 0; i < n; i++) {
    h += kind === "ch"
      ? '<div class="ccard"><div class="ctile sk"></div><div class="sk" style="height:10px;border-radius:5px;margin:9px 14px 0"></div></div>'
      : '<div class="pcard"><div class="pimg sk"></div><div class="sk" style="height:10px;border-radius:5px;margin-top:9px;width:80%"></div></div>';
  }
  return h;
}

/* ================= home ================= */
function greeting() {
  const h = new Date().getHours();
  return h < 5 ? "سهرة سعيدة 🌙" : h < 12 ? "صباح الخير ☀️" : h < 18 ? "مساء الخير 🌤" : "مساء النور 🌙";
}

function railDefs() {
  const out = [];
  const mc = S.cats.movies, sc = S.cats.series;
  const allId = list => (list.find(x => x.id === "*") || list[0] || {}).id;
  const hasAll = list => list.some(x => x.id === "*");
  const mOther = mc.filter(x => x.id !== "*" && (hasAll(mc) || x.id !== allId(mc))).slice(0, 4);
  const sOther = sc.filter(x => x.id !== "*" && (hasAll(sc) || x.id !== allId(sc))).slice(0, 3);
  const ttl = (list, all) => hasAll(list) ? all : (list[0] || {}).title || all;
  if (mc.length) out.push({ id: "m-all", title: ttl(mc, "أحدث الأفلام"), icon: "fire", kind: "movies", cat: allId(mc) });
  if (sc.length) out.push({ id: "s-all", title: ttl(sc, "أحدث المسلسلات"), icon: "series", kind: "series", cat: allId(sc) });
  const n = Math.max(mOther.length, sOther.length);
  for (let i = 0; i < n; i++) {
    if (mOther[i]) out.push({ id: "m-" + mOther[i].id, title: mOther[i].title, kind: "movies", cat: mOther[i].id });
    if (sOther[i]) out.push({ id: "s-" + sOther[i].id, title: sOther[i].title, kind: "series", cat: sOther[i].id });
  }
  return out;
}

function railShell(id, title, ic, more, body) {
  return '<section class="rail" id="rail-' + id + '"><div class="rail-h"><h3>' + (ic ? '<span style="color:var(--a1)">' + icon(ic, 20) + "</span>" : "") + esc(title) + "</h3>" + (more || "") +
    '</div><div class="htrack" id="track-' + id + '">' + (body || "") + "</div></section>";
}

function buildHome() {
  $("#hello").textContent = greeting();
  $("#home-scroll").scrollTop = 0;
  const defs = railDefs();
  const heroItems = (S.rails["m-all"] || S.rails["s-all"] || []).filter(v => v.poster).slice(0, 6);
  if (heroItems.length) buildHero(heroItems);
  else $("#hero").innerHTML = defs.length ? '<div class="hero-track"><div class="slide active"><div class="slide-in sk"></div></div></div>' : "";
  let h = railShell("continue", "تابع المشاهدة", "clock") +
    railShell("dls", "التنزيلات", "dl", '<button data-act="downloads">الكل' + icon("left", 16) + "</button>") +
    railShell("live", "مباشر الآن", "live", '<button data-act="tab" data-tab="live">كل القنوات' + icon("left", 16) + "</button>", skeleton(5, "ch")) +
    railShell("favs", "مفضلتي", "heart") +
    railShell("new", "آخر المضاف", "clock", '<div class="rh2"><button data-act="see-new" data-kind="movies">أفلام' + icon("left", 16) + '</button><button data-act="see-new" data-kind="series">مسلسلات' + icon("left", 16) + "</button></div>", skeleton(5, "p"));
  h += defs.map(r => railShell(r.id, r.title, r.icon, '<button data-act="see-all" data-kind="' + r.kind + '" data-cat="' + esc(r.cat) + '">عرض الكل' + icon("left", 16) + "</button>",
    S.rails[r.id] ? S.rails[r.id].map((v, i) => posterCard(v, i)).join("") : skeleton(5, "p"))).join("");
  $("#rails").innerHTML = h;
  defs.forEach(r => { if (S.rails[r.id]) { remember(S.rails[r.id]); if (!S.rails[r.id].length) $("#rail-" + r.id).classList.add("hidden"); } });
  renderContinue();
  renderFavRail();
  renderLiveRail();
  renderDlRail();
  api("dlList").then(l => { DLS.list = l || []; renderDlRail(); pollDownloads(); }).catch(() => {});
}

async function loadRails(gen) {
  setTimeout(() => { if (gen === S.connGen) renderNewRail(); }, 1200);
  const defs = railDefs();
  if (defs.some(r => !$("#rail-" + r.id))) buildHome();
  const one = async r => {
    try {
      const res = await fetchPage(r.kind, r.cat, 1, true);
      if (gen !== S.connGen) return;
      const items = res.items.slice(0, 18);
      S.rails[r.id] = items;
      const track = $("#track-" + r.id);
      if (!track) return;
      if (!items.length) { hideRail(r.id); return; }
      track.innerHTML = items.map((v, i) => posterCard(v, i)).join("");
      if ((r.id === "m-all" || (r.id === "s-all" && !HERO.items.length))) {
        const hero = items.filter(v => v.poster).slice(0, 6);
        if (hero.length) buildHero(hero);
      }
      // a catalog tab that is open on this category refreshes from the new page
      const c = S.cat[r.kind];
      if (S.tab === r.kind && c.cat === r.cat && c.page <= 1 && !c.loading) catalogLoad(r.kind, true);
    } catch (e) {
      if (gen !== S.connGen) return;
      if (!S.rails[r.id]) hideRail(r.id);
    }
  };
  // newest movies + series first (they feed the hero and the first page of each tab), then the rest two at a time
  await Promise.all(defs.slice(0, 2).map(one));
  const rest = defs.slice(2);
  await Promise.all([0, 1].map(async w => { for (let i = w; i < rest.length; i += 2) { if (gen !== S.connGen) return; await one(rest[i]); } }));
  if (gen !== S.connGen) return;
  if (!HERO.items.length) $("#hero").innerHTML = "";
  api("diag", { s: "ready" }).catch(() => {});
}

function hideRail(id) {
  const el = $("#rail-" + id);
  if (el) { el.classList.add("gone"); setTimeout(() => el.classList.add("hidden"), 400); }
}

function renderLiveRail() {
  const track = $("#track-live");
  if (!track) return;
  let all = S.channels;
  if (S.lazy) {
    const g1 = liveCut() ? (S.genres.find(g => g.id !== "*") || { id: "*" }).id : "*";
    const p1 = LIVEP.get(g1 + "|1");
    if (!p1) { liveFetch(g1, 1).then(() => renderLiveRail()).catch(() => { if (S.connected && !S.favCh.length) hideRail("live"); }); return; }
    all = p1.items;
  }
  if (liveCut()) all = all.filter(arChannel);
  if (!all.length && !S.favCh.length) { if (S.connected) hideRail("live"); return; }
  const favs = S.favCh.map(f => all.find(c => c.id === f.id) || f);
  const rest = all.filter(c => !favs.some(f => f.id === c.id));
  const withLogo = rest.filter(c => c.logo);
  const pick = favs.concat((withLogo.length >= 10 ? withLogo : rest).slice(0, 18)).slice(0, 20);
  LISTS["home-live"] = pick;
  $("#rail-live").classList.remove("hidden", "gone");
  track.innerHTML = pick.map((c, i) => chTile(c, i, "home-live")).join("");
}

function renderContinue() {
  const rail = $("#rail-continue");
  if (!rail) return;
  const list = Object.values(S.progress).filter(p => p.dur > 0 && p.pos > 15 && p.pos / p.dur < 0.95).sort((a, b) => b.ts - a.ts).slice(0, 12);
  if (!list.length) { rail.classList.add("hidden"); return; }
  LISTS.continue = list;
  rail.classList.remove("hidden", "gone");
  $("#track-continue").innerHTML = list.map((p, i) =>
    '<div class="wcard press rise" style="--i:' + i + '" data-act="resume" data-i="' + i + '">' +
      '<div class="wimg">' + (p.poster ? '<img loading="lazy" src="' + esc(p.poster) + '" onerror="' + imgErr + '">' : "") + '<div class="pl"><span>' + icon("play", 18) + "</span></div>" +
      '<div class="wprog"><i style="width:' + Math.round(p.pos / p.dur * 100) + '%"></i></div></div>' +
      '<div class="pt">' + esc(p.title) + '</div><div class="py">' + esc(p.ep || "") + (p.ep ? " · " : "") + "باقي " + fmtTime(p.dur - p.pos) + "</div></div>").join("");
}

function renderFavRail() {
  const rail = $("#rail-favs");
  if (!rail) return;
  if (!S.favVod.length) { rail.classList.add("hidden"); return; }
  remember(S.favVod);
  rail.classList.remove("hidden", "gone");
  $("#track-favs").innerHTML = S.favVod.map((v, i) => posterCard(v, i)).join("");
}

/* ----- hero ----- */
const HERO = { items: [], index: 0, timer: null, hold: 0 };
function buildHero(items) {
  HERO.items = items;
  HERO.index = 0;
  remember(items);
  $("#hero").innerHTML =
    '<div class="hero-track" id="hero-track">' + items.map((v, i) =>
      '<div class="slide' + (i === 0 ? " active" : "") + '"><div class="slide-in" data-act="open-vod" data-key="' + esc(v.kind + ":" + v.id) + '">' +
        '<div class="sbg" style="background-image:url(&quot;' + esc(v.poster) + '&quot;)"></div><div class="sshade"></div>' +
        '<div class="sposter"><img src="' + esc(v.poster) + '" onerror="' + imgErr + '"></div>' +
        '<div class="sinfo"><span class="kicker">' + icon("fire", 13) + (v.isSeries ? "مسلسل جديد" : "جديد على اشتراكك") + "</span><h3>" + esc(splitTag(v.name).title) + '</h3><div class="smeta">' +
          [v.year, v.rating ? "★ " + v.rating : "", v.genres].filter(Boolean).map(esc).join(" · ") + "</div>" +
          '<div class="sbtns"><button class="btn-play press" data-act="quick-play" data-key="' + esc(v.kind + ":" + v.id) + '">' + icon("play", 16) + "تشغيل</button>" +
          '<button class="btn-ghost press" data-act="open-vod" data-key="' + esc(v.kind + ":" + v.id) + '">' + icon("info", 16) + "التفاصيل</button></div></div>" +
      "</div></div>").join("") + "</div>" +
    '<div class="dots" id="hero-dots">' + items.map((_, i) => "<i" + (i === 0 ? ' class="on"' : "") + "><b></b></i>").join("") + "</div>";
  const track = $("#hero-track");
  track.addEventListener("scroll", debounce(() => {
    const i = Math.round(track.scrollLeft / Math.max(track.clientWidth, 1));
    if (i !== HERO.index && i >= 0 && i < HERO.items.length) setHero(i, false);
  }, 80), { passive: true });
  track.addEventListener("touchstart", () => { HERO.hold = Date.now() + 9000; }, { passive: true });
  clearInterval(HERO.timer);
  HERO.timer = setInterval(() => {
    if (S.tab !== "home" || Date.now() < HERO.hold || $("#sheet").classList.contains("open") || $("#player").classList.contains("open") || HERO.items.length < 2) return;
    setHero((HERO.index + 1) % HERO.items.length, true);
  }, 6000);
}

function setHero(i, scroll) {
  HERO.index = i;
  $$("#hero-track .slide").forEach((s, k) => s.classList.toggle("active", k === i));
  $$("#hero-dots i").forEach((d, k) => { d.classList.toggle("on", k === i); d.innerHTML = "<b></b>"; });
  if (scroll) { const t = $("#hero-track"); t.scrollTo({ left: i * t.clientWidth, behavior: "smooth" }); }
}

/* ================= live ================= */
// Light mode (big subscriptions): channels are loaded category by category, page by page,
// instead of the whole list at once.
const LIVEP = new Map();          // "genre|page" -> { items, total, perPage }
const LIVEP_REQ = new Map();
const LIVE = { group: null, items: [], page: 0, total: 0, end: false, loading: false, gen: 0, error: "" };
function liveFetch(genre, page) {
  const k = genre + "|" + page;
  if (LIVEP.has(k)) return Promise.resolve(LIVEP.get(k));
  if (LIVEP_REQ.has(k)) return LIVEP_REQ.get(k);
  const portal = S.portal;
  const req = ready().then(() => api("liveList", { genre, page })).then(r => {
    const v = { items: r.items || [], total: r.total || 0, perPage: r.perPage || 0 };
    if (portal === S.portal) LIVEP.set(k, v);
    return v;
  });
  LIVEP_REQ.set(k, req);
  const done = () => LIVEP_REQ.delete(k);
  req.then(done, done);
  return req;
}
function liveAdd(res) {
  const seen = new Set(LIVE.items.map(c => c.id));
  res.items.forEach(c => { if (!seen.has(c.id)) LIVE.items.push(c); });
  LIVE.page++;
  LIVE.total = res.total || LIVE.items.length;
  if (!res.items.length || (res.perPage > 0 && LIVE.page * res.perPage >= res.total) || LIVE.page >= 400) LIVE.end = true;
}
// light mode + «عربي ومترجم»: the "all" list walks through the Arabic sections one page at a time
async function arLoadMore(gen) {
  const gs = S.genres.filter(g => g.id !== "*");
  if (LIVE.arI == null) { LIVE.arI = 0; LIVE.arP = 0; }
  if (LIVE.arI >= gs.length) { LIVE.end = true; return; }
  LIVE.loading = true;
  liveStatus();
  try {
    const res = await liveFetch(gs[LIVE.arI].id, LIVE.arP + 1);
    if (gen !== LIVE.gen) return;
    const seen = new Set(LIVE.items.map(c => c.id));
    res.items.forEach(c => { if (!seen.has(c.id)) LIVE.items.push(c); });
    LIVE.arP++;
    if (!res.items.length || (res.perPage > 0 && LIVE.arP * res.perPage >= res.total) || LIVE.arP >= 60) { LIVE.arI++; LIVE.arP = 0; }
  } catch (e) {
    if (gen !== LIVE.gen) return;
    LIVE.arI++; LIVE.arP = 0;
  }
  LIVE.page++;
  LIVE.total = LIVE.items.length;
  if (LIVE.arI >= gs.length) LIVE.end = true;
  LIVE.loading = false;
  S.liveList = liveFiltered();
  LISTS.live = S.liveList;
  appendLive();
  liveStatus();
  // a section with few channels: keep going until the screen has something to show
  if (!LIVE.end && S.liveList.length < 24 && !S.liveQuery.trim()) arLoadMore(gen);
}
async function liveLoadMore() {
  if (LIVE.loading || LIVE.end) return;
  if (S.lazy && LIVE.group === "*" && liveCut()) return arLoadMore(LIVE.gen);
  const gen = LIVE.gen, group = LIVE.group;
  const k = group + "|" + (LIVE.page + 1);
  if (LIVEP.has(k)) liveAdd(LIVEP.get(k));
  else {
    LIVE.loading = true;
    liveStatus();
    try {
      const res = await liveFetch(group, LIVE.page + 1);
      if (gen !== LIVE.gen) return;
      liveAdd(res);
    } catch (e) {
      if (gen !== LIVE.gen) return;
      LIVE.end = true;
      LIVE.error = e.message;
    }
    LIVE.loading = false;
  }
  if (gen !== LIVE.gen) return;
  S.liveList = liveFiltered();
  LISTS.live = S.liveList;
  appendLive();
  liveStatus();
  if (!LIVE.end) liveFetch(group, LIVE.page + 1).catch(() => {}); // warm the next page
  const sc = $("#live-scroll");
  if (!LIVE.end && S.tab === "live" && sc.scrollHeight <= sc.clientHeight + 400) setTimeout(() => { if (gen === LIVE.gen) liveLoadMore(); }, 0);
}
function liveStatus() {
  if (!S.lazy) return;
  if (S.liveQuery.trim()) return;
  if (S.liveGroup !== "__fav" && !S.liveQuery.trim()) $("#live-sub").textContent = LIVE.total ? fmtNum(LIVE.total) + " قناة" : (S.liveTotal ? fmtNum(S.liveTotal) + " قناة" : "");
  const more = $("#live-more");
  if (S.liveGroup === "__fav") return;
  if (LIVE.loading) more.innerHTML = S.liveList.length ? '<div class="loader"><div class="spin"></div></div>' : "";
  else if (!S.liveList.length && LIVE.end) more.innerHTML = emptyHTML("search", LIVE.error || "لا توجد قنوات", S.liveQuery ? "جرّب كلمة بحث أخرى." : "");
  else more.innerHTML = "";
  if (LIVE.loading && !S.liveList.length) $("#live-grid").innerHTML = skeleton(9, "ch");
}
// every channel known so far (search, rails); in light mode only the loaded ones
function knownChannels() {
  if (!S.lazy) return S.channels;
  const map = new Map();
  S.favCh.forEach(c => map.set(c.id, c));
  LIVEP.forEach(v => v.items.forEach(c => { if (!map.has(c.id)) map.set(c.id, c); }));
  return Array.from(map.values());
}

// live search state (light mode): whole-category loading and the portal's own search
const LSEARCH = { q: "", items: [], loading: false, gen: 0, ok: null, scanning: false, done: 0, of: 0 };
function liveFiltered() {
  let list;
  const q = S.liveQuery.trim();
  if (S.liveGroup === "__fav") list = S.favCh.map(f => S.channels.find(c => c.id === f.id) || f);
  else if (S.lazy) list = q && S.liveGroup === "*" ? knownChannels() : (LIVE.group === S.liveGroup ? LIVE.items : []);
  else list = S.liveGroup === "*" ? S.channels : S.channels.filter(c => c.genre === S.liveGroup);
  if (lockOn() && S.lockedGenres && S.lockedGenres.size) list = list.filter(c => !lockedCh(c));
  if (liveCut() && S.liveGroup !== "__fav" && (S.lazy || S.liveGroup === "*")) list = list.filter(arChannel);
  if (!q) return list;
  const found = smartFilter(list, q);
  if (S.lazy && S.liveGroup === "*" && LSEARCH.q === q && LSEARCH.items.length) {
    const ids = new Set(found.map(c => c.id));
    LSEARCH.items.forEach(c => { if (!ids.has(c.id)) found.push(c); });
  }
  return found;
}
// light mode + a query inside one category: bring in the rest of that category (4 pages at a time)
async function liveLoadAll() {
  if (!S.lazy || S.liveGroup === "*" || S.liveGroup === "__fav" || LIVE.end || LSEARCH.scanning) return;
  const gen = LIVE.gen;
  LSEARCH.scanning = true;
  try {
    while (!LIVE.end && gen === LIVE.gen && S.liveQuery.trim() && LIVE.page < 120) {
      const per = LIVEP.get(LIVE.group + "|1");
      const total = (per && per.total) || LIVE.total;
      const pages = [];
      for (let p = LIVE.page + 1; p <= LIVE.page + 4; p++) pages.push(p);
      const res = await Promise.all(pages.map(p => liveFetch(LIVE.group, p).catch(() => null)));
      if (gen !== LIVE.gen) return;
      for (const r of res) { if (!r) { LIVE.end = true; break; } liveAdd(r); if (LIVE.end) break; }
      LSEARCH.done = LIVE.items.length; LSEARCH.of = total;
      refreshLiveResults();
    }
  } finally { LSEARCH.scanning = false; if (gen === LIVE.gen) refreshLiveResults(); }
}
// light mode + a query on "all": ask the portal (if it supports channel search) — checked once
async function portalLiveSearch(q) {
  if (!S.lazy || LSEARCH.ok === false || S.liveGroup !== "*") return;
  const gen = ++LSEARCH.gen;
  LSEARCH.q = q; LSEARCH.items = []; LSEARCH.loading = true;
  refreshLiveResults();
  try {
    await ready();
    const r = await api("liveSearch", { q });
    if (gen !== LSEARCH.gen) return;
    const items = r.items || [];
    const qs = queryVariants(q);
    const looksFiltered = !items.length || (r.total && S.liveTotal && r.total < S.liveTotal * 0.6) ||
      items.every(c => qs.some(t => t.every(x => nkey(c, "name").n.includes(x) || nkey(c, "name").ns.includes(x))));
    if (!looksFiltered) { LSEARCH.ok = false; LSEARCH.items = []; }
    else { LSEARCH.ok = true; LSEARCH.items = items; }
  } catch (e) { if (gen === LSEARCH.gen) LSEARCH.items = []; }
  if (gen !== LSEARCH.gen) return;
  LSEARCH.loading = false;
  refreshLiveResults();
}
function refreshLiveResults() {
  const list = liveFiltered();
  const same = list.length === S.liveList.length && list.every((c, i) => S.liveList[i] === c);
  if (!same) {
    S.liveList = list;
    LISTS.live = list;
    S.liveShown = 0;
    $("#live-grid").innerHTML = "";
    appendLive();
  }
  const more = $("#live-more");
  const q = S.liveQuery.trim();
  if (!q) { liveStatus(); return; }
  const busy = LSEARCH.scanning || LSEARCH.loading;
  let note = "";
  if (S.lazy && S.liveGroup !== "*" && S.liveGroup !== "__fav" && LSEARCH.scanning) note = "جارٍ البحث في كل القسم… " + fmtNum(LSEARCH.done) + (LSEARCH.of ? " / " + fmtNum(LSEARCH.of) : "");
  else if (S.lazy && S.liveGroup === "*" && LSEARCH.loading) note = "جارٍ البحث في البورتال…";
  else if (S.lazy && S.liveGroup === "*" && LSEARCH.ok === false) note = "البحث يشمل القنوات المحمّلة. لنتائج كاملة اختر القسم من «الأقسام» ثم ابحث داخله.";
  else if (S.lazy && S.liveGroup !== "*" && S.liveGroup !== "__fav" && !LIVE.end) note = "بحثت في أول " + fmtNum(LIVE.items.length) + " قناة من " + fmtNum(LIVE.total) + " في هذا القسم.";
  more.innerHTML = (busy ? '<div class="loader"><div class="spin"></div></div>' : "") +
    (!list.length && !busy ? emptyHTML("search", "لا توجد قنوات بهذا الاسم", note || "جرّب اسماً آخر أو بالإنجليزي (مثل MBC).") : (note ? '<p class="note" style="text-align:center;padding:6px 24px 20px">' + esc(note) + "</p>" : ""));
  $("#live-sub").textContent = fmtNum(list.length) + " نتيجة";
}
// matching categories while typing (tap → open the category)
function renderLiveSugg() {
  const box = $("#live-sugg");
  const q = S.liveQuery.trim();
  const hits = q ? smartFilter(S.genres.filter(g => g.id !== "*"), q, "title").slice(0, 12) : [];
  box.classList.toggle("hidden", !hits.length);
  box.innerHTML = hits.length ? '<span class="lbl">أقسام:</span>' + hits.map(g =>
    '<button class="chip press" data-act="live-sugg" data-id="' + esc(g.id) + '">' + esc(g.title) + "</button>").join("") : "";
}

function renderLive() {
  const sub = $("#live-sub");
  if (S.lazy) {
    renderLiveChips();
    renderLiveGrid();
    liveStatus();
    return;
  }
  if (!S.channels.length) {
    sub.textContent = S.connected ? "لا توجد قنوات" : "جارٍ التحميل…";
    $("#live-chips").innerHTML = "";
    $("#live-grid").innerHTML = S.connected ? "" : skeleton(9, "ch");
    $("#live-more").innerHTML = S.connected ? emptyHTML("tv", "لا توجد قنوات", "لم يُرجع البورتال قنوات لهذا الاشتراك.") : "";
    return;
  }
  sub.textContent = fmtNum(S.channels.length) + " قناة";
  renderLiveChips();
  renderLiveGrid();
}

function renderLiveChips() {
  if (S.lazy) {
    if (S.liveGroup === "__fav" && !S.favCh.length) S.liveGroup = "*";
    if (S.liveGroup !== "*" && S.liveGroup !== "__fav" && !S.genres.some(g => g.id === S.liveGroup)) S.liveGroup = "*";
    const chips = [{ id: "*", title: liveCut() ? "كل العربية" : "الكل", n: liveCut() ? "" : S.liveTotal || "" }]
      .concat(S.favCh.length ? [{ id: "__fav", title: "♥ المفضلة", n: S.favCh.length }] : [])
      .concat(S.genres.filter(g => g.id !== "*").map(g => ({ id: g.id, title: g.title, n: "" })));
    $("#live-chips").innerHTML = catBtn("live") + langChip("live") + chips.map(g =>
      '<button class="chip' + (g.id === S.liveGroup ? " on" : "") + '" data-act="live-group" data-id="' + esc(g.id) + '">' + esc(g.title) + (g.n !== "" ? "<small>" + fmtNum(g.n) + "</small>" : "") + "</button>").join("") + lockChip();
    return;
  }
  if (!S.channels.length) return;
  const counts = {};
  S.channels.forEach(c => { counts[c.genre] = (counts[c.genre] || 0) + 1; });
  const groups = S.genres.filter(g => g.id !== "*" && counts[g.id]).map(g => ({ id: g.id, title: g.title, n: counts[g.id] }));
  if (S.liveGroup !== "*" && S.liveGroup !== "__fav" && !counts[S.liveGroup]) S.liveGroup = "*";
  if (S.liveGroup === "__fav" && !S.favCh.length) S.liveGroup = "*";
  const chips = [{ id: "*", title: "الكل", n: S.channels.length }]
    .concat(S.favCh.length ? [{ id: "__fav", title: "♥ المفضلة", n: S.favCh.length }] : [])
    .concat(groups);
  $("#live-chips").innerHTML = catBtn("live") + langChip("live") + chips.map(g =>
    '<button class="chip' + (g.id === S.liveGroup ? " on" : "") + '" data-act="live-group" data-id="' + esc(g.id) + '">' + esc(g.title) + "<small>" + fmtNum(g.n) + "</small></button>").join("") + lockChip();
}

const liveSig = () => [S.chanVer, S.channels.length, lockOn(), S.liveGroup, S.favCh.length, S.liveQuery, S.connected, S.lazy, LIVE.gen].join("|");
function renderLiveGrid() {
  if (S.lazy && S.liveGroup !== "__fav" && LIVE.group !== S.liveGroup) {
    LIVE.gen++;
    Object.assign(LIVE, { group: S.liveGroup, items: [], page: 0, total: 0, end: false, loading: false, error: "", arI: null, arP: 0 });
  }
  S.liveSig = liveSig();
  const list = liveFiltered();
  S.liveList = list;
  LISTS.live = list;
  S.liveShown = 0;
  $("#live-grid").innerHTML = "";
  $("#live-more").innerHTML = list.length ? "" : emptyHTML("search", "لا توجد قنوات", S.liveQuery ? "جرّب كلمة بحث أخرى." : "");
  appendLive();
  $("#live-scroll").scrollTop = 0;
  if (S.lazy && S.liveGroup !== "__fav" && !LIVE.items.length && !LIVE.end) liveLoadMore();
  if (S.liveQuery.trim()) {
    refreshLiveResults();
    if (S.lazy && S.liveGroup === "*" && LSEARCH.q !== S.liveQuery.trim()) portalLiveSearch(S.liveQuery.trim());
    if (S.lazy && S.liveGroup !== "*" && S.liveGroup !== "__fav") liveLoadAll();
  }
}

function appendLive() {
  const list = S.liveList;
  if (S.liveShown >= list.length) {
    if (S.lazy && S.liveGroup !== "__fav" && !LIVE.end && !LIVE.loading && LIVE.items.length) liveLoadMore();
    return;
  }
  if (S.liveShown === 0 && S.lazy) $("#live-grid").innerHTML = "";
  const end = Math.min(S.liveShown + 60, list.length);
  let h = "";
  for (let i = S.liveShown; i < end; i++) h += chTile(list[i], i, "live");
  $("#live-grid").insertAdjacentHTML("beforeend", h);
  S.liveShown = end;
  trackImgs($("#live-grid"), $("#live-scroll"));
}

/* ----- posters far off-screen give their memory back (a big subscription can list thousands) ----- */
const IMGIO = new Map();
function trackImgs(grid, scroller) {
  if (typeof IntersectionObserver !== "function" || !grid || !scroller) return;
  let io = IMGIO.get(scroller);
  if (!io) {
    io = new IntersectionObserver(entries => {
      for (const e of entries) {
        const img = e.target;
        if (!img.isConnected) { io.unobserve(img); continue; }
        if (e.isIntersecting) { if (!img.getAttribute("src") && img.dataset.src) img.setAttribute("src", img.dataset.src); }
        else if (img.getAttribute("src")) { img.dataset.src = img.getAttribute("src"); img.removeAttribute("src"); img.classList.remove("ok"); }
      }
    }, { root: scroller, rootMargin: "2000px 0px 2000px 0px" });
    IMGIO.set(scroller, io);
  }
  grid.querySelectorAll("img:not([data-t])").forEach(img => { img.dataset.t = "1"; io.observe(img); });
}

/* ================= movies / series ================= */
// Every catalog page fetched once is kept here, so chips, tabs and "see all" open instantly.
const PAGES = new Map();
const PAGE_REQ = new Map();
const pageKey = (kind, cat, page, q) => kind + "|" + cat + "|" + page + (q ? "|" + q : "");
function fetchPage(kind, cat, page, force, q) {
  const k = pageKey(kind, cat, page, q);
  const hit = PAGES.get(k);
  if (hit && !force) return Promise.resolve(hit);
  if (PAGE_REQ.has(k)) return PAGE_REQ.get(k);
  const portal = S.portal;
  const req = ready().then(() => api("vodList", { kind, category: cat, page, search: q || "" })).then(res => {
    const v = { items: remember(res.items || []), total: res.total || 0, perPage: res.perPage || 0 };
    if (portal === S.portal) PAGES.set(k, v);
    return v;
  });
  PAGE_REQ.set(k, req);
  const done = () => PAGE_REQ.delete(k);
  req.then(done, done);
  return req;
}
function prefetchCats(kind, around) {
  const cats = S.cats[kind] || [];
  const i = Math.max(0, cats.findIndex(x => x.id === around));
  [cats[i + 1], cats[i - 1], cats[i + 2]].forEach(x => { if (x && !PAGES.has(pageKey(kind, x.id, 1))) fetchPage(kind, x.id, 1).catch(() => {}); });
}

const catBtn = kind => '<button class="chip cbtn press" data-act="cat-search" data-kind="' + kind + '">' + icon("list", 15) + "الأقسام<small>" +
  fmtNum(kind === "live" ? S.genres.filter(g => g.id !== "*").length : (S.cats[kind] || []).length) + "</small></button>";
function catSub(kind) {
  const c = S.cat[kind];
  if (c.cat === "__new") return c.loading ? "جارٍ جمع آخر المضاف…" : "آخر المضاف · " + fmtNum(c.total) + " عنوان";
  if (c.q) return c.loading && !c.items.length ? "جارٍ البحث…" : fmtNum(c.total) + " نتيجة لـ «" + c.q + "»";
  return c.total ? fmtNum(c.total) + " عنوان" : "";
}
function renderCatalog(kind) {
  const cats = S.cats[kind];
  const c = S.cat[kind];
  $("#" + kind + "-sub").textContent = catSub(kind) || (kind === "movies" ? "مكتبة الأفلام في اشتراكك" : "مكتبة المسلسلات في اشتراكك");
  if (!cats.length) {
    $("#" + kind + "-chips").innerHTML = "";
    $("#" + kind + "-grid").innerHTML = S.extrasLoaded ? "" : skeleton(9, "p");
    $("#" + kind + "-status").innerHTML = S.extrasLoaded ? emptyHTML(kind === "movies" ? "film" : "series", "لا يوجد محتوى", "هذا الاشتراك لا يحتوي على " + (kind === "movies" ? "أفلام." : "مسلسلات.")) : "";
    return;
  }
  const first = !c.cat || (c.cat !== "__new" && !cats.some(x => x.id === c.cat));
  if (first) c.cat = cats[0].id;
  renderNewBar(kind);
  $("#" + kind + "-chips").innerHTML = catBtn(kind) + langChip(kind) + newChip(kind) + cats.map(x =>
    '<button class="chip' + (x.id === c.cat ? " on" : "") + '" data-act="cat" data-kind="' + kind + '" data-id="' + esc(x.id) + '">' + esc(x.title) + "</button>").join("") + lockChip();
  const on = $("#" + kind + "-chips .chip.on");
  if (on && on.scrollIntoView) on.scrollIntoView({ inline: "center", block: "nearest" });
  if (first || (!c.items.length && !c.loading && !c.end)) catalogLoad(kind, true);
}

function catStatus(kind) {
  const c = S.cat[kind];
  $("#" + kind + "-sub").textContent = catSub(kind);
  const st = $("#" + kind + "-status");
  if (c.loading) {
    st.innerHTML = c.items.length ? '<div class="loader"><div class="spin"></div></div>' : "";
    if (!c.items.length) $("#" + kind + "-grid").innerHTML = skeleton(9, "p");
    return;
  }
  st.innerHTML = !c.items.length ? (c.q && !c.error ? emptyHTML("search", "لا نتائج في هذا القسم", "جرّب كلمة أخرى، أو اختر «All» للبحث في كل القسم.")
    : emptyHTML(kind === "movies" ? "film" : "series", c.error || "لا يوجد محتوى في هذا القسم", c.error ? "" : "جرّب قسماً آخر.")) : "";
}

function addPage(kind, res) {
  const c = S.cat[kind];
  const first = !c.items.length;
  const seen = new Set(c.items.map(x => x.id));
  const fresh = res.items.filter(x => !seen.has(x.id));
  const start = c.items.length;
  c.items = c.items.concat(fresh);
  c.page++;
  c.total = res.total || c.items.length;
  if (!res.items.length || (res.perPage > 0 && c.page * res.perPage >= res.total)) c.end = true;
  const html = fresh.map((v, k) => posterCard(v, start + k)).join("");
  const grid = $("#" + kind + "-grid");
  if (first) grid.innerHTML = html; else grid.insertAdjacentHTML("beforeend", html);
  trackImgs(grid, $("#" + kind + "-scroll"));
}

async function catalogLoad(kind, reset) {
  const c = S.cat[kind];
  if (c.cat === "__new") { if (reset || (!c.items.length && !c.loading)) newLoad(kind); return; }
  renderNewBar(kind);
  if (reset) {
    c.gen++;
    c.items = []; c.page = 0; c.total = 0; c.end = false; c.error = ""; c.loading = false;
    $("#" + kind + "-scroll").scrollTop = 0;
  }
  if (c.loading || c.end || !c.cat) return;
  const gen = c.gen;
  const cat = c.cat;
  const q = c.q || "";
  const hit = PAGES.get(pageKey(kind, cat, c.page + 1, q));
  if (hit) {
    // instant: already fetched (home rails, an earlier visit, or the background prefetch)
    addPage(kind, hit);
    if (hit.disk && c.page === 1 && !q) {
      // saved from the last launch: show it now, refresh quietly
      fetchPage(kind, cat, 1, true).then(res => {
        if (gen !== c.gen || c.page !== 1) return;
        const a = hit.items.map(x => x.id).join(), b = res.items.map(x => x.id).join();
        if (a !== b) catalogLoad(kind, true);
      }).catch(() => {});
    }
  } else {
    c.loading = true;
    if (reset) $("#" + kind + "-grid").innerHTML = "";
    catStatus(kind);
    try {
      const res = await fetchPage(kind, cat, c.page + 1, false, q);
      if (gen !== c.gen) return;
      c.loading = false;
      addPage(kind, res);
    } catch (e) {
      if (gen !== c.gen) return;
      c.loading = false;
      if (!c.items.length) { c.error = e.message; $("#" + kind + "-grid").innerHTML = ""; }
      c.end = true;
    }
  }
  if (gen !== c.gen) return;
  catStatus(kind);
  if (!c.end) fetchPage(kind, cat, c.page + 1, false, q).catch(() => {}); // warm the next page while the user looks
  if (reset && !q) prefetchCats(kind, cat);
  const sc = $("#" + kind + "-scroll");
  if (!c.end && sc.scrollHeight <= sc.clientHeight + 300 && S.tab === kind) setTimeout(() => { if (gen === c.gen) catalogLoad(kind, false); }, hit ? 0 : 30);
}

/* ================= search ================= */
let searchGen = 0;
function renderSearch() {
  const q = $("#search-q").value.trim();
  $(".clr[data-act=clear-search]").classList.toggle("hidden", !q);
  const body = $("#search-body");
  if (!q) {
    const used = new Set(S.lazy ? S.genres.map(g => g.id) : S.channels.map(c => c.genre));
    const sugg = S.genres.filter(g => g.id !== "*" && used.has(g.id)).slice(0, 10);
    body.innerHTML =
      (S.recentQ.length ? '<div class="sec-t"><span>عمليات بحث سابقة</span><button data-act="clear-recent">مسح</button></div><div class="rchips">' +
        S.recentQ.map((x, i) => '<button class="chip press rise" style="--i:' + i + '" data-act="q" data-q="' + esc(x) + '">' + esc(x) + "</button>").join("") + "</div>" : "") +
      (sugg.length ? '<div class="sec-t"><span>أقسام القنوات</span></div><div class="rchips">' +
        sugg.map((g, i) => '<button class="chip press rise" style="--i:' + i + '" data-act="goto-genre" data-id="' + esc(g.id) + '">' + esc(g.title) + "</button>").join("") + "</div>" : "");
    return;
  }
  runSearch(q);
}

const runSearch = debounce(async q => {
  const gen = ++searchGen;
  const chs = smartFilter(knownChannels(), q).slice(0, 30);
  LISTS["search-ch"] = chs;
  const hasVod = S.cats.movies.length || S.cats.series.length;
  const secs = [].concat(
    smartFilter(S.genres.filter(g => g.id !== "*"), q, "title").slice(0, 8).map(g => ({ kind: "live", id: g.id, title: g.title, ic: "📺" })),
    smartFilter(S.cats.movies.filter(g => g.id !== "*"), q, "title").slice(0, 8).map(g => ({ kind: "movies", id: g.id, title: g.title, ic: "🎬" })),
    smartFilter(S.cats.series.filter(g => g.id !== "*"), q, "title").slice(0, 8).map(g => ({ kind: "series", id: g.id, title: g.title, ic: "📼" })));
  $("#search-body").innerHTML =
    (secs.length ? '<div class="sec-t"><span>أقسام مطابقة</span></div><div class="rchips">' + secs.map((g, i) =>
      '<button class="chip press rise" style="--i:' + i + '" data-act="goto-sec" data-kind="' + g.kind + '" data-id="' + esc(g.id) + '">' + g.ic + " " + esc(g.title) + "</button>").join("") + "</div>" : "") +
    (chs.length ? '<div class="sec-t"><span>القنوات <small style="color:var(--muted)">' + chs.length + '</small></span></div><div class="htrack">' + chs.map((c, i) => chTile(c, i, "search-ch")).join("") + "</div>" : "") +
    (hasVod ? '<div id="search-m"><div class="sec-t"><span>أفلام</span></div><div class="grid">' + skeleton(3, "p") + '</div></div><div id="search-s"></div>' : "") +
    (!chs.length && !hasVod ? emptyHTML("search", "لا توجد نتائج", "") : "");
  if (!hasVod) { saveQuery(q, chs.length > 0); return; }
  let found = chs.length > 0;
  for (const kind of ["movies", "series"]) {
    const box = $(kind === "movies" ? "#search-m" : "#search-s");
    if (!S.cats[kind].length) { if (box) box.innerHTML = ""; continue; }
    const cat = (S.cats[kind].find(x => x.id === "*") || S.cats[kind][0]).id;
    try {
      await ready();
      const res = await api("vodList", { kind, category: cat, page: 1, search: q }, true);
      if (gen !== searchGen) return;
      remember(res.items);
      if (res.items.length) found = true;
      box.innerHTML = res.items.length
        ? '<div class="sec-t"><span>' + (kind === "movies" ? "أفلام" : "مسلسلات") + ' <small style="color:var(--muted)">' + (res.total || res.items.length) + '</small></span></div><div class="grid">' + res.items.slice(0, 24).map((v, i) => posterCard(v, i)).join("") + "</div>"
        : "";
    } catch (e) {
      if (gen !== searchGen) return;
      box.innerHTML = kind === "movies" ? emptyHTML("alert", e.message, "") : "";
    }
  }
  if (gen !== searchGen) return;
  if (!found) $("#search-body").insertAdjacentHTML("beforeend", emptyHTML("search", "لا توجد نتائج", "جرّب كلمة أخرى أو اسماً بالإنجليزي."));
  saveQuery(q, found);
}, 450);

function saveQuery(q, found) {
  if (!found) return;
  S.recentQ = [q].concat(S.recentQ.filter(x => x !== q)).slice(0, 10);
  persist("recentQ", S.recentQ);
}

/* ================= detail sheet ================= */
const progKey = (kind, id, series) => kind + ":" + id + ":" + (series || "");

function openVod(key) {
  const it = ITEMS.get(key);
  if (!it) return;
  S.detail = { key, item: it, seasons: [], season: null, episodes: [], loading: !!it.isSeries, error: "" };
  renderDetail();
  $("#sheet-scroll").scrollTop = 0;
  $("#dnav").classList.remove("solid");
  $("#sheet").classList.add("open");
  $("#tabbar").classList.add("away");
  if (it.isSeries) loadSeries(S.detail);
}

function closeSheet() {
  $("#sheet").classList.remove("open");
  if (S.mainShown) $("#tabbar").classList.remove("away");
  S.detail = null;
}

async function loadSeries(d) {
  const it = d.item;
  try {
    await ready();
    if (it.kind === "series") {
      const seasons = await api("seasons", { item: it });
      if (S.detail !== d) return;
      if (seasons.length) {
        d.seasons = seasons;
        await selectSeason(d, seasons[0]);
        return;
      }
    }
  } catch (e) {
    if (S.detail !== d) return;
    d.error = e.message;
  }
  if (it.episodes && it.episodes.length) {
    d.episodes = it.episodes.map(n => ({ id: it.id + "-" + n, title: "الحلقة " + n, cmd: it.cmd, series: String(n) }));
    d.error = "";
  }
  d.loading = false;
  renderDetail();
}

async function selectSeason(d, season) {
  d.season = season;
  d.episodes = [];
  d.loading = true;
  renderDetail();
  try {
    const eps = await api("episodes", { item: d.item, season }, true);
    if (S.detail !== d || d.season !== season) return;
    d.episodes = eps;
    d.error = "";
  } catch (e) {
    if (S.detail !== d) return;
    d.error = e.message;
  }
  d.loading = false;
  renderDetail();
}

function renderDetail() {
  const d = S.detail;
  if (!d) return;
  const it = d.item;
  const fav = S.favVod.some(f => f.kind === it.kind && f.id === it.id);
  $("#dnav-t").textContent = splitTag(it.name).title;
  const meta = [it.year, it.rating ? "★ " + it.rating : "", it.duration && !it.isSeries ? (/^\\d+$/.test(it.duration) ? it.duration + " د" : it.duration) : "", it.isSeries ? (d.episodes.length ? d.episodes.length + " حلقة" : "مسلسل") : ""].filter(Boolean);
  let h = '<div class="dhero"><div class="bg" id="dbg" style="' + (it.poster ? "background-image:url(&quot;" + esc(it.poster) + "&quot;)" : "background:var(--grad)") + '"></div>' +
    '<div class="pos">' + (it.poster ? '<img src="' + esc(it.poster) + '" onerror="' + imgErr + '">' : '<div style="display:grid;place-items:center;height:100%;padding:10px;font-weight:800;color:var(--dim)">' + esc(it.name) + "</div>") + "</div></div>" +
    '<div class="dbody"><h1>' + esc(splitTag(it.name).title) + '</h1><div class="dmeta">' + meta.map(m => "<span>" + esc(m) + "</span>").join("") +
      (it.added ? '<span class="dadd">' + icon("clock", 13) + "أُضيف " + esc(relTime(it.added)) + " · " + esc(addedText(it.added)) + "</span>" : "") + "</div>";
  if (it.genres) h += '<div style="color:var(--muted);font-size:12.5px;margin-top:8px">' + esc(it.genres) + "</div>";
  const favBtn = '<button class="sqbtn press' + (fav ? " on" : "") + '" data-act="fav-vod" id="favbtn">' + icon(fav ? "heartf" : "heart", 24) + "</button>";
  if (!it.isSeries) {
    const p = S.progress[progKey(it.kind, it.id, "")];
    const resume = p && p.pos > 15 && p.pos / p.dur < 0.95;
    h += '<div class="dacts"><button class="bigplay press" data-act="play-movie">' + icon("play", 18) + (resume ? "متابعة " + fmtTime(p.pos) : "تشغيل") + "</button>" + favBtn +
      '<button class="sqbtn press" data-act="dl-movie" title="تنزيل">' + icon("dl", 24) + "</button></div>";
  } else {
    h += '<div class="dacts">' + (d.episodes.length ? '<button class="bigplay press" data-act="play-ep" data-i="' + resumeEpisodeIndex(d) + '">' + icon("play", 18) + resumeLabel(d) + "</button>" : '<div class="bigplay sk" style="background:var(--surface)">&nbsp;</div>') + favBtn + "</div>";
  }
  if (it.overview) h += '<div class="ddesc clamp" dir="auto" data-act="expand">' + esc(it.overview).replace(/\\n/g, "<br>") + "</div>";
  if (it.isSeries) {
    if (d.seasons.length > 1) {
      h += '<div class="schips">' + d.seasons.map(s => '<button class="chip' + (d.season && d.season.id === s.id ? " on" : "") + '" data-act="season" data-id="' + esc(s.id) + '">' + esc(s.name) + "</button>").join("") + "</div>";
    }
    h += '<div class="dsec">الحلقات' + (d.episodes.length ? " <small>" + d.episodes.length + "</small>" : "") + "</div>";
    if (d.loading) h += '<div class="loader"><div class="spin"></div></div>';
    else if (!d.episodes.length) h += '<p class="note">' + esc(d.error || "لا توجد حلقات متاحة.") + "</p>";
    else h += d.episodes.map((e, i) => {
      const p = S.progress[progKey(it.kind, it.id, epKey(d, e))];
      const pct = p && p.dur ? Math.min(100, Math.round(p.pos / p.dur * 100)) : 0;
      return '<div class="ep press rise" style="--i:' + (i % 14) + '" data-act="play-ep" data-i="' + i + '"><span class="n">' + (i + 1) + '</span><div class="t">' + esc(e.title) +
        (pct ? '<div class="bar"><i style="width:' + pct + '%"></i></div>' : "") + '</div><button class="epdl" data-act="dl-ep" data-i="' + i + '">' + icon("dl", 16) + '</button><span class="pi">' + icon("play", 14) + "</span></div>";
    }).join("");
  }
  if (it.director || it.actors) {
    h += '<div class="credits">' + (it.director ? "<div><small>الإخراج</small>" + esc(it.director) + "</div>" : "") + (it.actors ? "<div><small>التمثيل</small>" + esc(it.actors) + "</div>" : "") + "</div>";
  }
  h += "</div>";
  $("#sheet-body").innerHTML = h;
  if (!it.isSeries) prefetchLink(movieItem(it));
  else if (d.episodes.length) prefetchLink(episodeItems(d)[resumeEpisodeIndex(d)]);
}

const epKey = (d, e) => (d.season ? d.season.id + "/" : "") + e.id;
function resumeEpisodeIndex(d) {
  let best = -1, ts = 0;
  d.episodes.forEach((e, i) => {
    const p = S.progress[progKey(d.item.kind, d.item.id, epKey(d, e))];
    if (p && p.ts > ts) { ts = p.ts; best = p.pos / p.dur < 0.95 ? i : Math.min(i + 1, d.episodes.length - 1); }
  });
  return Math.max(best, 0);
}
function resumeLabel(d) {
  const i = resumeEpisodeIndex(d);
  const p = S.progress[progKey(d.item.kind, d.item.id, epKey(d, d.episodes[i]))];
  return p && p.pos > 15 && p.pos / p.dur < 0.95 ? "متابعة الحلقة " + (i + 1) : "تشغيل الحلقة " + (i + 1);
}

function movieItem(it) {
  return { key: progKey(it.kind, it.id, ""), live: false, title: it.name, subtitle: [it.year, it.genres].filter(Boolean).join(" · "), poster: it.poster, logo: it.poster,
    source: { type: "vod", cmd: it.cmd, series: "" }, meta: { kind: it.kind, id: it.id, ep: "" } };
}

function episodeItems(d) {
  const it = d.item;
  const sname = d.season ? d.season.name : "";
  return d.episodes.map((e, i) => ({
    key: progKey(it.kind, it.id, epKey(d, e)), live: false, title: it.name,
    subtitle: [sname, e.title].filter(Boolean).join(" • "), poster: it.poster, logo: it.poster,
    source: { type: "vod", cmd: e.cmd, series: e.series || "" }, meta: { kind: it.kind, id: it.id, ep: [sname, "الحلقة " + (i + 1)].filter(Boolean).join(" · ") }
  }));
}

async function quickPlay(key) {
  const it = ITEMS.get(key);
  if (!it) return;
  if (!it.isSeries) { startPlayback([movieItem(it)], 0); return; }
  openVod(key);
}

function toggleFavVod() {
  const d = S.detail;
  if (!d) return;
  const it = d.item;
  const i = S.favVod.findIndex(f => f.kind === it.kind && f.id === it.id);
  if (i >= 0) S.favVod.splice(i, 1); else S.favVod.unshift(it);
  persist(pk("favVod"), S.favVod);
  const on = i < 0;
  const b = $("#favbtn");
  if (b) { b.classList.toggle("on", on); b.innerHTML = icon(on ? "heartf" : "heart", 24); b.classList.remove("pop"); void b.offsetWidth; b.classList.add("pop"); }
  toast(on ? "أُضيف إلى مفضلتي" : "أُزيل من مفضلتي");
  renderFavRail();
}

/* ================= looks: 100 themes + 100 motions ================= */
const hsl2rgb = (h, s, l) => {
  s /= 100; l /= 100;
  const k = n => (n + h / 30) % 12, a = s * Math.min(l, 1 - l);
  const f = n => Math.round(255 * (l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))));
  return [f(0), f(8), f(4)];
};
const rgbHex = c => "#" + c.map(v => v.toString(16).padStart(2, "0")).join("");
const hexRgb = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
// 20 colour families × 5 backgrounds = 100 themes
const FAMILIES = [
  ["سهرة", 250, "#ff4d8d", "#7b5cff", "#2ec5ff"], ["غروب", 15, "#ff8a3d", "#ff4d6d", "#b14dff"], ["محيط", 205, "#2ec5ff", "#2f7bff", "#19e3c5"],
  ["زمرد", 155, "#19d38a", "#0fb5a6", "#41c7ff"], ["ذهبي", 42, "#ffd166", "#ff9f1c", "#ff5e3a"], ["ليلك", 275, "#c58bff", "#8a5cff", "#ff7ad9"],
  ["نار", 5, "#ff3d3d", "#ff7a1a", "#ffc93d"], ["جليد", 195, "#9fe7ff", "#5ab8ff", "#d6f4ff"], ["نيون", 300, "#ff2bd6", "#00f5d4", "#c6ff00"],
  ["صحراء", 32, "#e8b77a", "#d9824a", "#b85c38"], ["ورد", 340, "#ff7eb3", "#ff4f8b", "#ffb199"], ["فضاء", 240, "#6c63ff", "#3a2bff", "#00c2ff"],
  ["غابة", 120, "#7ddf64", "#2fbf71", "#d4e157"], ["ياقوت", 350, "#ff2e63", "#c2185b", "#ff6f91"], ["فيروز", 175, "#2de1c2", "#00b4d8", "#7cf5a4"],
  ["شفق", 165, "#38f9d7", "#43e97b", "#a66cff"], ["قهوة", 25, "#d4a373", "#b5835a", "#e9c46a"], ["برتقال", 28, "#ffa62b", "#ff7b00", "#ffd000"],
  ["مرجان", 8, "#ff7f6e", "#ff5c8a", "#ffb385"], ["سماوي", 210, "#56ccf2", "#2f80ed", "#6fe0ff"]
];
const BGSTYLES = [
  ["ليلي", h => [[h, 35, 5], [h, 33, 8], [h, 30, 12], [h, 28, 17], [h, 55, 16]]],
  ["أسود", h => [[h, 0, 0], [h, 8, 3], [h, 10, 8], [h, 10, 12], [h, 60, 9]]],
  ["عميق", h => [[h, 60, 7], [h, 55, 10], [h, 45, 15], [h, 40, 20], [h, 70, 22]]],
  ["رمادي", h => [[225, 6, 8], [225, 6, 11], [225, 6, 15], [225, 6, 20], [h, 22, 15]]],
  ["ضبابي", h => [[h, 18, 11], [h, 18, 14], [h, 16, 19], [h, 15, 24], [h, 35, 22]]]
];
// 10 poster layouts; each theme brings one (theme id % 10)
const LAYOUTS = ["كلاسيك", "كبير", "مكثف", "عريض", "قائمة", "مستدير", "سينما", "بارز", "حاد", "فسيفساء"];
const THEMES = [];
FAMILIES.forEach(([fname, h, a1, a2, a3], fi) => {
  BGSTYLES.forEach(([sname, mk], si) => {
    const [bg, bg2, sf, sf2, glow] = mk(h).map(x => hsl2rgb(...x));
    const id = fi * 5 + si;
    const t = { id, name: fname + " · " + sname, family: fname, style: sname, layout: id % 10, a1, a2, a3, bg, bg2, sf, sf2, glow };
    if (fi === 0 && si === 0) Object.assign(t, { bg: hexRgb("#07080f"), bg2: hexRgb("#0d1020"), sf: hexRgb("#141829"), sf2: hexRgb("#1d2238"), glow: hexRgb("#1b1440") });
    THEMES.push(t);
  });
});
// special themes: their own look for the whole app and the player (not just colours)
const SPECIAL_THEMES = [
  { id: 100, name: "متفلكس", family: "خاص", style: "سينمائي", layout: 0, skin: "mf", a1: "#ffb020", a2: "#ff7a18", a3: "#ffd166",
    bg: [0, 0, 0], bg2: [10, 10, 10], sf: [22, 22, 22], sf2: [34, 34, 34], glow: [16, 12, 6], sub: "واجهة سينمائية كاملة ومشغّل خاص" }
];
const themeById = id => THEMES[id] || SPECIAL_THEMES.find(x => x.id === id) || THEMES[0];
function applyTheme(id) {
  const t = themeById(+id);
  const r = document.documentElement.style;
  r.setProperty("--bg", rgbHex(t.bg)); r.setProperty("--bg2", rgbHex(t.bg2));
  r.setProperty("--surface", rgbHex(t.sf)); r.setProperty("--surface2", rgbHex(t.sf2)); r.setProperty("--glow", rgbHex(t.glow));
  r.setProperty("--a1", t.a1); r.setProperty("--a2", t.a2); r.setProperty("--a3", t.a3);
  r.setProperty("--grad", "linear-gradient(120deg," + t.a1 + " 0%," + t.a2 + " 55%," + t.a3 + " 100%)");
  r.setProperty("--a1rgb", hexRgb(t.a1).join(",")); r.setProperty("--a2rgb", hexRgb(t.a2).join(","));
  r.setProperty("--bgrgb", t.bg.join(",")); r.setProperty("--surfrgb", t.sf.join(","));
  const cl = document.documentElement.classList;
  for (let i = 1; i < 10; i++) cl.toggle("lay-" + i, t.layout === i);
  cl.toggle("skin-mf", t.skin === "mf");
  try { paintSeek(); } catch (e) { /* player not built yet */ }
}
// 20 motions × 5 tempos = 100 animations
const MOTIONS = [
  ["rise", "ارتفاع", "⬆", "translateY(14px)"], ["fade", "تلاشي", "◐", "none"], ["zoom", "تكبير", "⊕", "scale(.97)"], ["zoomout", "تصغير", "⊖", "scale(1.03)"],
  ["slider", "انزلاق يمين", "→", "translateX(-18px)"], ["slidel", "انزلاق يسار", "←", "translateX(18px)"], ["drop", "سقوط", "⬇", "translateY(-14px)"],
  ["flipx", "قلب أفقي", "⇅", "perspective(800px) rotateX(-6deg)"], ["flipy", "قلب عمودي", "⇄", "perspective(800px) rotateY(6deg)"], ["blurin", "ضبابي", "◌", "scale(1.02)"],
  ["swing", "تأرجح", "〰", "rotate(-1deg)"], ["bounce", "ارتداد", "⤴", "translateY(24px)"], ["spin", "دوران", "↻", "rotate(-2deg) scale(.98)"],
  ["skew", "ميلان", "⟋", "skewY(2deg)"], ["pop", "فرقعة", "✦", "scale(.94)"], ["unfold", "انفتاح", "☰", "scaleY(.96)"], ["tilt", "إمالة ثلاثية", "◢", "perspective(800px) rotateX(8deg)"],
  ["glide", "انسياب", "≋", "translateX(14px)"], ["elastic", "مطاط", "⌇", "scale(.98,1.02)"], ["wave", "موجة", "∿", "translateY(10px) rotate(.6deg)"]
];
const TEMPOS = [
  ["هادئ", ".7s", "cubic-bezier(.25,.8,.25,1)", "40ms", ".45s"], ["سريع", ".28s", "ease-out", "14ms", ".2s"],
  ["مرن", ".6s", "cubic-bezier(.34,1.56,.64,1)", "30ms", ".38s"], ["متتابع", ".5s", "ease-out", "75ms", ".34s"],
  ["سينمائي", "1s", "cubic-bezier(.16,1,.3,1)", "55ms", ".6s"]
];
const ANIMS = [];
MOTIONS.forEach(([key, name, glyph, pt], mi) => TEMPOS.forEach(([tname, ad, ae, as, pd], ti) =>
  ANIMS.push({ id: mi * 5 + ti, key, name: name + " · " + tname, motion: name, tempo: tname, glyph, ad, ae, as, pd, pt })));
function applyAnim(id) {
  const a = ANIMS[id] || ANIMS[0];
  const r = document.documentElement.style;
  r.setProperty("--an", a.key); r.setProperty("--ad", a.ad); r.setProperty("--ae", a.ae); r.setProperty("--as", a.as);
  r.setProperty("--pd", a.pd); r.setProperty("--pt", a.pt);
}
function applyLooks() {
  applyTheme(+S.settings.theme || 0);
  applyAnim(+S.settings.anim || 0);
  document.documentElement.classList.toggle("nomotion", S.settings.motion === "off");
}

function miniLayout(l, t) {
  const c = rgbHex(t.sf2), a = t.a2;
  const cols = [3, 2, 4, 2, 1, 3, 2, 3, 3, 3][l];
  const h = [16, 22, 12, 12, 8, 16, 22, 16, 16, 16][l];
  let cells = "";
  for (let i = 0; i < (l === 4 ? 2 : cols); i++) cells += '<i style="height:' + h + "px;background:" + (i === 0 ? a : c) + ";border-radius:" + (l === 5 ? 8 : l === 8 ? 1 : 3) + "px" + (l === 9 && i === 1 ? ";margin-top:5px" : "") + '"></i>';
  return '<div class="thmini" style="grid-template-columns:repeat(' + (l === 4 ? 1 : cols) + ',1fr)">' + cells + "</div>";
}
function openThemes(style, lay) {
  CH.mode = "theme";
  CH.style = style || CH.style || "الكل";
  CH.lay = lay != null ? lay : (CH.lay != null ? CH.lay : -1);
  const cur = +S.settings.theme || 0;
  const styles = ["الكل"].concat(BGSTYLES.map(b => b[0]));
  const st = CH.style;
  const list = THEMES.filter(t => (st === "الكل" || t.style === st) && (CH.lay < 0 || t.layout === CH.lay));
  const body = $("#chooser .cbody");
  body.classList.add("tall");
  body.innerHTML = '<div class="grab"></div><h3>الثيمات</h3><p class="ps">' + THEMES.length + " ثيم · كل ثيم بألوان وترتيب بوسترات مختلف</p>" +
    '<div class="segs">' + styles.map(x => '<button class="' + (x === st ? "on" : "") + '" data-act="theme-style" data-id="' + x + '">' + x + "</button>").join("") + "</div>" +
    '<div class="segs">' + ['<button class="' + (CH.lay < 0 ? "on" : "") + '" data-act="theme-lay" data-id="-1">كل التخطيطات</button>'].concat(LAYOUTS.map((n, i) =>
      '<button class="' + (CH.lay === i ? "on" : "") + '" data-act="theme-lay" data-id="' + i + '">' + n + "</button>")).join("") + "</div>" +
    '<div class="slist">' + SPECIAL_THEMES.map(t => '<div class="gt">ثيمات خاصة</div><button class="spcard press' + (t.id === cur ? " on" : "") + '" data-act="theme-set" data-id="' + t.id + '">' +
      '<div class="spprev"><div class="sph"><b>' + esc(t.name) + '</b><i></i><i></i></div><div class="spr"><i></i><i></i><i></i><i></i></div><div class="spr"><i></i><i></i><i></i><i></i></div></div>' +
      '<div class="spinfo"><b>' + esc(t.name) + "</b><small>" + esc(t.sub) + "</small></div>" + (t.id === cur ? '<i class="okd">' + icon("check", 12) + "</i>" : "") + "</button>").join("") +
    '<div class="gt">' + THEMES.length + ' ثيم ملوّن</div><div class="thgrid">' + list.map((t, i) =>
      '<button class="thcard press rise' + (t.id === cur ? " on" : "") + '" style="--i:' + i + '" data-act="theme-set" data-id="' + t.id + '">' +
        '<div class="thprev" style="background:linear-gradient(160deg,' + rgbHex(t.glow) + "," + rgbHex(t.bg) + ' 70%)">' +
          '<div class="bar" style="background:linear-gradient(120deg,' + t.a1 + "," + t.a2 + "," + t.a3 + ')"></div>' +
          miniLayout(t.layout, t) + '<span class="thlay">' + LAYOUTS[t.layout] + "</span></div>" +
        '<div class="thname">' + esc(t.name) + "</div>" + (t.id === cur ? '<i class="okd">' + icon("check", 12) + "</i>" : "") + "</button>").join("") + "</div></div>";
  $("#chooser").classList.add("open");
}
function openAnims() {
  CH.mode = "anim";
  const cur = +S.settings.anim || 0;
  const body = $("#chooser .cbody");
  body.classList.add("tall");
  let h = '<div class="grab"></div><h3>الحركات</h3><p class="ps">' + ANIMS.length + " حركة · اضغط لتجربتها</p>" +
    '<div class="andemo" id="andemo">' + [0, 1, 2, 3].map(i => '<i class="rise" style="--i:' + i + '"></i>').join("") + "</div>" +
    '<button class="anrow' + (S.settings.motion === "off" ? " on" : "") + '" data-act="anim-off"><span class="ic">⏸</span><span style="flex:1">بدون حركة<small>أسرع وأخف على البطارية</small></span></button>' +
    '<div class="slist">';
  MOTIONS.forEach(([key, name, glyph], mi) => {
    h += '<div class="anhead">' + glyph + " " + name + "</div>";
    for (let ti = 0; ti < 5; ti++) {
      const a = ANIMS[mi * 5 + ti];
      h += '<button class="anrow' + (a.id === cur && S.settings.motion !== "off" ? " on" : "") + '" data-act="anim-set" data-id="' + a.id + '"><span class="ic">' + glyph + '</span><span style="flex:1">' +
        esc(a.name) + "<small>" + parseFloat(a.ad) + " ثانية · تتابع " + parseInt(a.as) + " ملّي ثانية</small></span>" + (a.id === cur && S.settings.motion !== "off" ? '<i class="okd" style="width:22px;height:22px;border-radius:50%;background:var(--a2);display:grid;place-items:center;color:#fff">' + icon("check", 12) + "</i>" : "") + "</button>";
    }
  });
  body.innerHTML = h + "</div>";
  $("#chooser").classList.add("open");
}
function replayDemo() {
  const d = $("#andemo");
  if (!d) return;
  d.innerHTML = [0, 1, 2, 3].map(i => '<i class="rise" style="--i:' + i + '"></i>').join("");
}

/* ================= smart search (Arabic + English, aliases, any word order) ================= */
function norm(s) {
  let t = String(s == null ? "" : s);
  try { t = t.normalize("NFKC"); } catch (e) { /* older iOS */ }
  return t.toLowerCase()
    .replace(/[ً-ٰٟـ]/g, "")
    .replace(/[أإآٱ]/g, "ا").replace(/ة/g, "ه").replace(/ى/g, "ي").replace(/ؤ/g, "و").replace(/ئ/g, "ي")
    .replace(/[٠-٩]/g, d => String(d.charCodeAt(0) - 1632))
    .replace(/[|\\-_:.,/\\\\()[\\]{}"'+*!؟?#@&«»•·★]+/g, " ")
    .replace(/\\s+/g, " ").trim();
}
const ALIASES = [
  ["ام بي سي", "mbc"], ["بي ان سبورت", "bein sport"], ["بي ان", "bein"], ["الجزيره", "jazeera"], ["العربيه", "arabiya"], ["روتانا", "rotana"],
  ["سبيستون", "spacetoon"], ["سبيس تون", "spacetoon"], ["دبي", "dubai"], ["ابوظبي", "abu dhabi"], ["ابو ظبي", "abu dhabi"], ["الكاس", "alkass"],
  ["شاهد", "shahid"], ["او اس ان", "osn"], ["ناشيونال جيوغرافيك", "nat geo"], ["ديسكفري", "discovery"], ["كرتون", "cartoon"], ["افلام", "movies"],
  ["فيلم", "movie"], ["سينما", "cinema"], ["رياضه", "sport"], ["اخبار", "news"], ["اطفال", "kids"], ["وثائقي", "documentary"], ["قران", "quran"],
  ["السعوديه", "saudi"], ["مصر", "egypt"], ["الكويت", "kuwait"], ["قطر", "qatar"], ["الامارات", "uae"], ["المغرب", "morocco"], ["الجزائر", "algeria"],
  ["العراق", "iraq"], ["سوريا", "syria"], ["لبنان", "lebanon"], ["الاردن", "jordan"], ["تونس", "tunisia"], ["عمان", "oman"], ["البحرين", "bahrain"],
  ["نتفليكس", "netflix"], ["تركي", "turkish"], ["هندي", "indian"], ["عربي", "arabic"], ["كوري", "korean"], ["انمي", "anime"], ["مسلسلات", "series"],
  ["رمضان", "ramadan"], ["ديزني", "disney"], ["سيما", "cima"], ["اسلامي", "islamic"], ["موسيقى", "music"], ["اغاني", "music"], ["ترفيه", "entertainment"]
].map(([a, b]) => [norm(a), norm(b)]);
function queryVariants(q) {
  const base = norm(q);
  const out = new Set(base ? [base] : []);
  for (const [a, b] of ALIASES) {
    for (const v of Array.from(out)) {
      if (out.size > 16) break;
      if (v.includes(a)) out.add(v.split(a).join(b));
      else if (v.includes(b)) out.add(v.split(b).join(a));
    }
  }
  for (const v of Array.from(out)) out.add(v.replace(/([a-z؀-ۿ])(\\d)/g, "$1 $2"));
  return Array.from(out).filter(Boolean).map(v => v.split(" "));
}
const NKEY = new WeakMap();
function nkey(o, field) {
  let k = NKEY.get(o);
  if (!k) { const n = norm(o[field] != null ? o[field] : (o.name || o.title)); k = { n, ns: n.replace(/ /g, "") }; NKEY.set(o, k); }
  return k;
}
function smartFilter(list, q, field) {
  const variants = queryVariants(q);
  if (!variants.length) return list.slice();
  const qn = norm(q);
  const hits = [];
  for (const o of list) {
    const k = nkey(o, field || "name");
    let best = 0;
    for (const toks of variants) {
      if (!toks.every(t => k.n.includes(t) || k.ns.includes(t))) continue;
      const joined = toks.join(" ");
      const sc = k.n === joined ? 6 : k.n.startsWith(joined) ? 4 : (" " + k.n).includes(" " + toks[0]) ? 2.5 : 1;
      if (sc > best) best = sc;
    }
    if (o.number && String(o.number) === qn) best = 10;
    if (best) hits.push([best - k.n.length / 1000, o]);
  }
  hits.sort((a, b) => b[0] - a[0]);
  return hits.map(x => x[1]);
}
const fmtNum = n => (Number(n) || 0).toLocaleString("en-US");
// "IR - Colony (2016)" → { tag: "IR", title: "Colony (2016)" }
function splitTag(name) {
  const m = String(name || "").match(/^\\s*[|\\[]?\\s*([A-Z]{2,3}(?:-[A-Z0-9]{1,3})?|4K|8K|VIP)\\s*[|\\]]?\\s*[-|:•»]\\s*(.+)$/);
  return m && m[2].trim() ? { tag: m[1], title: m[2].trim() } : { tag: "", title: String(name || "") };
}

/* ================= section picker with search ================= */
function catsFor(kind) {
  if (kind === "live") {
    const base = S.genres.filter(g => g.id !== "*");
    if (S.lazy) return base.map(g => ({ id: g.id, title: g.title, n: "" }));
    const counts = {};
    S.channels.forEach(c => { counts[c.genre] = (counts[c.genre] || 0) + 1; });
    return base.filter(g => counts[g.id]).map(g => ({ id: g.id, title: g.title, n: counts[g.id] }));
  }
  return (S.cats[kind] || []).map(x => ({ id: x.id, title: x.title, n: "" }));
}
function openCats(kind) {
  CH.mode = "cats";
  CH.key = kind;
  const label = kind === "live" ? "أقسام البث المباشر" : kind === "movies" ? "أقسام الأفلام" : "أقسام المسلسلات";
  const all = catsFor(kind);
  if (kind === "live") all.unshift({ id: "*", title: "كل القنوات", n: S.lazy ? S.liveTotal || "" : S.channels.length });
  const cur = kind === "live" ? S.liveGroup : S.cat[kind].cat;
  const body = $("#chooser .cbody");
  body.classList.add("tall");
  body.innerHTML = '<div class="grab"></div><h3>' + label + '</h3><p class="ps">' + fmtNum(all.length) + " قسم</p>" +
    '<label class="sfield in-sheet">' + icon("search", 18) + '<input id="cat-q" type="search" placeholder="ابحث عن قسم… (عربي أو English)" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"></label>' +
    '<div class="slist" id="cat-list"></div>';
  const render = () => {
    const q = $("#cat-q").value.trim();
    const list = (q ? smartFilter(all, q, "title") : all).slice(0, 500);
    $("#cat-list").innerHTML = list.length ? list.map(c =>
      '<button class="crow' + (c.id === cur ? " on" : "") + '" data-act="pick-cat" data-kind="' + kind + '" data-id="' + esc(c.id) + '"><span class="t">' + esc(c.title) + "</span>" +
        (c.n !== "" && c.n != null ? "<small>" + fmtNum(c.n) + "</small>" : "") + (c.id === cur ? '<i class="okd">' + icon("check", 12) + "</i>" : "") + "</button>").join("")
      : emptyHTML("search", "لا يوجد قسم بهذا الاسم", "جرّب كلمة أقصر أو بالإنجليزي.");
  };
  render();
  $("#cat-q").addEventListener("input", debounce(render, 120));
  $("#chooser").classList.add("open");
  try { $("#cat-q").focus(); } catch (e) { /* ignore */ }
}
function pickCat(kind, id) {
  closeChooser();
  if (kind === "live") {
    S.liveGroup = id;
    $("#live-q").value = ""; S.liveQuery = "";
    $(".clr[data-act=clear-live]").classList.add("hidden");
    renderLiveChips(); renderLiveGrid(); renderLiveSugg();
    const on = $("#live-chips .chip.on");
    if (on && on.scrollIntoView) on.scrollIntoView({ inline: "center", block: "nearest" });
    return;
  }
  S.cat[kind].cat = id;
  renderCatalog(kind);
  catalogLoad(kind, true);
}

/* ================= settings ================= */
function openSettings() {
  const p = S.portal || {};
  const seg = (key, opts) => '<div class="seg">' + opts.map(o => '<button class="' + (S.settings[key] === o[0] ? "on" : "") + '" data-act="set" data-key="' + key + '" data-val="' + o[0] + '">' + o[1] + "</button>").join("") + "</div>";
  const krow = (k, v) => '<div class="krow"><span>' + esc(k) + '</span><span class="v">' + esc(v) + "</span></div>";
  const prow = (key, label, sub) => '<button class="trow" data-act="pick-player" data-key="' + key + '"><span>' + label + "<small>" + sub + '</small></span><span class="pv">' +
    esc(playerName(S.settings[key])) + icon("left", 16) + "</span></button>";
  openModal(
    "<h3>الإعدادات</h3>" +
    '<div class="group"><div class="acc"><div class="ic">' + icon("tv", 24) + "</div><div><b>" + esc(displayName(p)) + "</b><small>" + esc(p.mac || "") + "</small></div></div>" +
      S.account.map(r => krow(r.title, r.value)).join("") +
      krow("القنوات", String(S.lazy ? (S.liveTotal || "—") : S.channels.length) + (S.lazy ? " · وضع خفيف" : "")) + krow("أقسام الأفلام", String(S.cats.movies.length)) + krow("أقسام المسلسلات", String(S.cats.series.length)) +
      krow("الحالة", S.connected ? "متصل ✓" : (S.connError ? "غير متصل" : "جارٍ الاتصال…")) + "</div>" +
    '<div class="gt">المظهر</div><div class="group">' +
      '<button class="trow" data-act="open-themes"><span>الثيم<small>' + THEMES.length + " ثيم · التخطيط: " + LAYOUTS[(THEMES[+S.settings.theme || 0] || THEMES[0]).layout] + '</small></span><span class="sw2">' + esc((THEMES[+S.settings.theme || 0] || THEMES[0]).name) +
        '<i style="background:var(--grad)"></i>' + icon("left", 16) + "</span></button>" +
      '<button class="trow" data-act="open-anims"><span>الحركة<small>' + ANIMS.length + ' حركة مختلفة</small></span><span class="sw2">' +
        esc(S.settings.motion === "off" ? "بدون حركة" : (ANIMS[+S.settings.anim || 0] || ANIMS[0]).name) + icon("left", 16) + "</span></button></div>" +
    '<div class="gt">التشغيل</div><div class="group">' +
      '<button class="trow" data-act="pprefs-open"><span>تفضيلات المشغّل<small>' + PLAYER_KINDS[(+S.settings.engine || 1) - 1].name + " · الترجمة: " + ({ ar: "عربي تلقائي", any: "أي لغة", off: "إيقاف" })[S.settings.subs || "ar"] + "</small></span>" + icon("left", 16) + "</button>" +
      prow("live", "مشغّل البث المباشر", "عند الضغط على قناة") +
      prow("vod", "مشغّل الأفلام والمسلسلات", "عند الضغط على تشغيل") +
      '<div class="trow"><span>صيغة البث<small>HLS أنسب للآيفون</small></span>' + seg("format", [["auto", "تلقائي"], ["original", "الأصلية"]]) + "</div>" +
      '<div class="trow"><span>تحميل القنوات<small>«خفيف» يحمّل كل قسم عند فتحه — للاشتراكات الكبيرة</small></span>' +
        seg("chMode", [["auto", "تلقائي"], ["light", "خفيف"], ["full", "الكل"]]) + "</div></div>" +
    '<div class="group"><div class="trow"><span>المحتوى المعروض<small>' + (S.arHidden ? "مخفي " + fmtNum(S.arHidden) + " قسم بلغات أخرى" : "القنوات والأفلام والمسلسلات") + "</small></span>" +
      '<div class="seg"><button class="' + (arOn() ? "on" : "") + '" data-act="content-set" data-id="ar">عربي ومترجم</button><button class="' + (arOn() ? "" : "on") + '" data-act="content-set" data-id="all">الكل</button></div></div></div>' +
    '<div class="group"><button class="trow" data-act="pin-open"><span>قفل محتوى الكبار<small>' + (S.settings.pin ? (lockOn() ? "مفعّل · " + fmtNum(S.hiddenN || 0) + " قسم مخفي" : "مفتوح مؤقتاً") : "يخفي أقسام الكبار برمز سري") + "</small></span>" + icon("lock", 20) + "</button></div>" +
    '<div class="group"><button class="trow" data-act="selftest"><span>فحص التشغيل<small>يكتشف سبب عدم التشغيل على جهازك</small></span>' + icon("info", 20) + "</button></div>" +
    '<div class="group"><button class="trow" data-act="downloads"><span>التنزيلات<small>' + (DLS.list.length ? DLS.list.length + " · للمشاهدة بدون إنترنت" : "شاهد بدون إنترنت") + "</small></span>" + icon("dl", 20) + "</button></div>" +
    '<div class="group"><button class="trow" data-act="reconnect"><span>تحديث القنوات والمحتوى</span>' + icon("refresh", 20) + "</button>" +
      '<button class="trow" data-act="clear-progress"><span>مسح سجل المشاهدة</span>' + icon("clock", 20) + "</button>" +
      '<button class="trow" data-act="clear-cache"><span>مسح الذاكرة المؤقتة</span>' + icon("trash", 20) + "</button>" +
      '<button class="trow danger" data-act="switch-portal"><span>تبديل الاشتراك / خروج</span>' + icon("logout", 20) + "</button></div>" +
    (S.prevDiag ? '<div class="group"><button class="trow" data-act="diag-show"><span>تقرير التشغيل السابق<small>' +
      (S.prevDiag.clean ? "انتهى بشكل طبيعي" : "توقف قبل أن يكتمل") + "</small></span>" + icon("info", 20) + "</button>" +
      '<div id="diag-box" class="hidden" style="direction:ltr;text-align:left;font:600 11.5px ui-monospace,Menlo,monospace;color:var(--muted);padding:10px 16px 14px;line-height:1.7;white-space:pre-wrap">' +
      esc(S.prevDiag.steps.join("\\n")) + "</div></div>" : "") +
    '<p class="note">إذا لم تعمل قناة داخل التطبيق اختر مشغّلاً سريعاً من شاشة المشغّل: VLC أو Infuse أو VidHub أو nPlayer (يجب تثبيته من App Store).</p>'
  );
}

function setSetting(key, val, el) {
  S.settings[key] = val;
  el.parentElement.querySelectorAll("button").forEach(b => b.classList.toggle("on", b === el));
  persist("settings", S.settings);
}

/* ================= player ================= */
const video = $("#video");
const P = { items: [], index: 0, token: 0, aid: 0, attempt: 0, cands: [], cur: null, retries: 0, drops: 0, played: false, playStart: 0, why: [],
  eng: null, aspect: 0, epg: [], state: "idle", hide: null, stall: null, open: false, resumeAt: 0, scrubbing: false, errorMsg: "" };
const ASPECTS = [["contain", "ملاءمة"], ["cover", "ملء الشاشة"], ["fill", "تمديد"]];

/* ----- players: in-app + external apps (x-callback schemes documented by each app) ----- */
const enc = encodeURIComponent;
const PLAYERS = [
  { id: "app", name: "داخل التطبيق", sub: "يختار أفضل محرك تلقائياً", c1: "#8b6cff", c2: "#4f7dff", ic: "play" },
  { id: "system", name: "مشغّل النظام", sub: "داخل التطبيق · نافذة صغيرة", c1: "#5b6cff", c2: "#2b3cff", ic: "pip", inapp: true },
  { id: "vlc", name: "VLC", sub: "كل الصيغ · مجاني", c1: "#ffa53a", c2: "#f26b00", tx: "VLC", url: u => "vlc-x-callback://x-callback-url/stream?url=" + enc(u) },
  { id: "infuse", name: "Infuse", sub: "صورة وصوت ممتاز", c1: "#ff8a4c", c2: "#e2431c", tx: "IN", url: u => "infuse://x-callback-url/play?url=" + enc(u) },
  { id: "vidhub", name: "VidHub", sub: "سريع وخفيف", c1: "#45adff", c2: "#2560e8", tx: "VH", url: u => "open-vidhub://x-callback-url/play?url=" + enc(u) },
  { id: "nplayer", name: "nPlayer", sub: "يدعم كل الصيغ", c1: "#33d690", c2: "#0f8c58", tx: "nP", url: u => "nplayer-" + u },
  { id: "safari", name: "Safari", sub: "مشغّل آبل", c1: "#4cc9ff", c2: "#1677ff", ic: "compass", hls: true, url: u => u },
  { id: "copy", name: "نسخ الرابط", sub: "لأي مشغّل آخر", c1: "#9aa3c7", c2: "#5a6285", ic: "copy" }
];
const PLAYER = {};
PLAYERS.forEach(p => { PLAYER[p.id] = p; });
const ASK = { id: "ask", name: "اسأل كل مرة", sub: "اختر عند التشغيل", c1: "#c06cff", c2: "#7b3cf0", ic: "ask" };
const playerName = id => (id === "ask" ? ASK : PLAYER[id] || PLAYER.app).name;
const pIcon = p => '<span class="pic" style="--c1:' + p.c1 + ";--c2:" + p.c2 + '">' + (p.ic ? icon(p.ic, 22) : esc(p.tx)) + "</span>";

function toHLS(url) {
  if (/\\.m3u8(\\?|$)/i.test(url)) return url;
  if (/[?&]extension=ts(&|$)/i.test(url)) return url.replace(/([?&]extension=)ts(?=&|$)/i, "$1m3u8");
  const q = url.indexOf("?");
  const base = q >= 0 ? url.slice(0, q) : url;
  const rest = q >= 0 ? url.slice(q) : "";
  if (/\\.ts$/i.test(base)) return base.replace(/\\.ts$/i, ".m3u8") + rest;
  if (/\\/live\\/[^\\/]+\\/[^\\/]+\\/\\d+$/i.test(base)) return base + ".m3u8" + rest;
  // Xtream short form http://host:port/user/pass/123
  if (/^https?:\\/\\/[^\\/]+\\/(?!live\\/|movie\\/|series\\/|play\\/)[^\\/]+\\/[^\\/]+\\/\\d+$/i.test(base)) return base.replace(/\\/([^\\/]+)\\/([^\\/]+)\\/(\\d+)$/, "/live/$1/$2/$3.m3u8") + rest;
  return url;
}

function chItem(c) {
  return { key: "ch:" + c.id, live: true, title: c.name, subtitle: [c.number > 0 ? "قناة " + c.number : "", S.genreTitle[c.genre] || ""].filter(Boolean).join(" · "),
    logo: c.logo, source: { type: "live", cmd: c.cmd, id: c.id }, ch: c };
}

let leaveCheck = null;
async function launchExternal(id, item) {
  const pl = PLAYER[id];
  if (!pl || !item) return;
  if (id === "app") return;
  if (id === "system") return openSystem(item);
  toast(id === "copy" ? "جارٍ تجهيز الرابط…" : "جارٍ الفتح في " + pl.name + "…");
  try {
    await ready();
    const url = (await api("link", { source: item.source }, true)).url;
    if (item.live) addRecent(item.ch);
    if (id === "copy") { await api("copy", { text: url }, true); toast("تم نسخ الرابط ✓"); return; }
    if (P.open) { stopEngine(); try { video.pause(); } catch (e) { /* ignore */ } clearTimeout(P.stall); }
    const target = pl.hls && item.live && S.settings.format !== "original" ? toHLS(url) : url;
    let left = false;
    const mark = () => { if (document.hidden) left = true; };
    document.addEventListener("visibilitychange", mark);
    window.addEventListener("blur", () => { left = true; }, { once: true });
    await api("openURL", { url: pl.url(target) }, true);
    clearTimeout(leaveCheck);
    leaveCheck = setTimeout(() => {
      document.removeEventListener("visibilitychange", mark);
      if (!left && !document.hidden && id !== "safari") toast("إذا لم يفتح " + pl.name + " فثبّته من App Store أو اختر مشغّلاً آخر");
    }, 2600);
  } catch (e) { toast(e.message); }
}

// Apple's own player, shown inside Scriptable (MP4 / HLS; supports picture-in-picture and AirPlay)
async function openSystem(item) {
  toast("جارٍ الفتح في مشغّل النظام…");
  try {
    await ready();
    const url = (await api("link", { source: item.source }, true)).url;
    if (item.live) addRecent(item.ch);
    if (P.open) { stopEngine(); try { video.pause(); } catch (e) { /* ignore */ } clearTimeout(P.stall); }
    const ext = fileExt(url);
    if (["mkv", "avi", "wmv", "flv"].includes(ext)) toast("مشغّل النظام لا يفتح ملفات " + ext.toUpperCase() + " — استخدم محرك MKV");
    await api("openInApp", { url: item.live && S.settings.format !== "original" ? toHLS(url) : url }, true);
  } catch (e) { toast(e.message); }
}

// in-app engines that make sense for this item / link
const ENGINE_INFO = {
  native: { name: "الأساسي", sub: "MP4 · HLS", c1: "#8b6cff", c2: "#4f7dff", ic: "play" },
  hls: { name: "محرك HLS", sub: "بث متكيّف", c1: "#3ec6ff", c2: "#1677ff", tx: "HLS" },
  engine: { name: "محرك TS", sub: "البث المباشر", c1: "#ff8a4c", c2: "#e2431c", tx: "TS" },
  mkv: { name: "محرك MKV", sub: "أفلام ومسلسلات", c1: "#33d690", c2: "#0f8c58", tx: "MKV" },
  mkvr: { name: "MKV عبر Scriptable", sub: "إذا منع الخادم التشغيل", c1: "#b06bff", c2: "#6a2ce0", tx: "MKV+" }
};
// Scriptable downloads the pieces itself (no browser restrictions), the page plays them
const b64bytes = b64 => { const bin = atob(b64); const out = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i); return out; };
const RELAY = IN_APP ? {
  chunk: 3 * 1024 * 1024,
  info: async u => {
    const ac = typeof AbortController === "function" ? new AbortController() : null;
    const r = await fetch(u, { headers: { Range: "bytes=0-1" }, signal: ac ? ac.signal : undefined });
    const cr = r.headers.get("content-range") || "";
    const total = cr.indexOf("/") > 0 ? +cr.split("/")[1] || 0 : 0;
    try { ac && ac.abort(); } catch (e) { /* ignore */ }
    return { status: r.status, total: r.status === 206 ? total : 0, ranges: r.status === 206, type: r.headers.get("content-type") || "" };
  },
  read: async (u, start, len) => {
    const r = await fetch(u, { headers: { Range: "bytes=" + start + "-" + (start + len - 1) } });
    if (r.status !== 206) throw new Error("norange " + r.status);
    return new Uint8Array(await r.arrayBuffer());
  }
} : {
  info: u => api("rangeInfo", { url: u }, 30000),
  read: (u, start, len) => api("rangeRead", { url: u, start, len }, 60000).then(r => b64bytes(r.b64))
};
if (IN_APP) Object.assign(ENGINE_INFO.mkvr, { name: "MKV المجزّأ", sub: "قراءة على دفعات" });
function enginesFor(item) {
  const url = P.url || "";
  const ext = fileExt(url);
  const out = ["native"];
  if (url && toHLS(url) !== url) out.push("hls");
  if ((item.live || ext === "ts") && typeof TSEngine !== "undefined" && TSEngine.supported()) out.push("engine");
  if (!item.live && typeof MKVEngine !== "undefined" && MKVEngine.supported()) out.push("mkv", "mkvr");
  return out;
}

/* ----- player chooser ----- */
const CH = { items: null, index: 0, mode: "play", key: "" };
function openChooser(items, index, mode, key) {
  CH.items = items; CH.index = index; CH.mode = mode || "play"; CH.key = key || "";
  const pick = CH.mode === "pick";
  const bg = CH.mode === "bg";
  const item = items ? items[index] : null;
  const kind = pick ? key : (item && item.live ? "live" : "vod");
  const cur = S.settings[kind] || "app";
  const engs = !pick && !bg && item && P.open && P.items[P.index] === item
    ? enginesFor(item).map(k => Object.assign({ id: "eng:" + k }, ENGINE_INFO[k], P.cur && P.cur.k === k ? { sub: "يعمل الآن" } : {})) : [];
  const list = pick ? PLAYERS.filter(p => p.id !== "copy").concat([ASK])
    : bg ? PLAYERS.filter(p => ["system", "infuse", "vlc", "nplayer", "vidhub"].includes(p.id))
    : engs.length ? engs.concat(PLAYERS.filter(p => p.id !== "app")) : PLAYERS;
  const title = pick ? (kind === "live" ? "مشغّل البث المباشر" : "مشغّل الأفلام والمسلسلات") : bg ? "شاهد في الخلفية" : "شغّل بـ…";
  const sub = pick ? "يُستخدم تلقائياً عند الضغط على " + (kind === "live" ? "أي قناة" : "تشغيل")
    : bg ? "Scriptable لا يسمح بالنافذة الصغيرة. هذه المشغّلات تكمل التشغيل في نافذة صغيرة وفي الخلفية وأنت تستخدم تطبيقات أخرى."
    : (item ? item.title : "");
  $("#chooser .cbody").classList.remove("tall");
  $("#chooser .cbody").innerHTML =
    '<div class="grab"></div><h3>' + title + '</h3><p class="ps">' + esc(sub) + "</p>" +
    '<div class="pgrid">' + list.map((p, i) =>
      '<button class="ptile press' + (pick && p.id === cur ? " on" : "") + '" style="--i:' + i + '" data-act="choose" data-id="' + p.id + '">' + pIcon(p) +
        "<b>" + esc(p.name) + "</b><small>" + esc(p.sub) + "</small>" + (pick && p.id === cur ? '<i class="ok">' + icon("check", 13) + "</i>" : "") + "</button>").join("") + "</div>" +
    (pick || bg ? "" : '<button class="trow remember" data-act="ch-remember"><span>اجعله الافتراضي ' + (kind === "live" ? "للبث المباشر" : "للأفلام والمسلسلات") +
      '<small>يمكنك تغييره من الإعدادات</small></span><span class="sw" id="ch-remember"></span></button>');
  $("#chooser").classList.add("open");
}
function closeChooser() { $("#chooser").classList.remove("open"); }
function choose(id) {
  const remember = $("#ch-remember") && $("#ch-remember").classList.contains("on");
  closeChooser();
  if (CH.mode === "pick") {
    S.settings[CH.key] = id;
    persist("settings", S.settings);
    if ($("#modal").classList.contains("open")) openSettings();
    toast(playerName(id) + " ✓");
    return;
  }
  const item = CH.items && CH.items[CH.index];
  if (!item) return;
  if (remember && PLAYER[id] && id !== "copy") { S.settings[item.live ? "live" : "vod"] = id; persist("settings", S.settings); }
  if (id.indexOf("eng:") === 0) { useEngine(id.slice(4)); return; }
  if (id === "app") {
    if (P.open && P.items[P.index] === item) { P.force = null; P.retries = 0; P.attempt = 0; P.drops = 0; P.why = []; loadAttempt(P.token); }
    else playInApp(CH.items, CH.index);
    return;
  }
  launchExternal(id, item);
}

function startPlayback(items, index) {
  if (!items.length) return;
  const item = items[index];
  const mode = S.settings[item.live ? "live" : "vod"] || "app";
  if (mode === "ask") { openChooser(items, index, "play"); return; }
  if (mode !== "app" && PLAYER[mode]) { launchExternal(mode, item); return; }
  if (+S.settings.engine === 3) { openSystem(item); return; }
  playInApp(items, index);
}

function playInApp(items, index) {
  P.items = items;
  P.index = index;
  P.open = true;
  document.body.classList.add("in-player");
  $("#player").classList.add("open");
  $("#p-listbtn").classList.toggle("hidden", items.length < 2);
  $("#p-listchip").classList.toggle("hidden", items.length < 2);
  $("#p-listchip span:last-child").textContent = items[0].live ? "القنوات" : "الحلقات";
  $("#plist-t").textContent = items[0].live ? "القنوات" : "الحلقات";
  $("#plist").classList.remove("open");
  playCurrent(false);
}

/* ================= playback self-test («فحص التشغيل») =================
 * Runs on the iPhone itself and lists exactly what works: the engines, the formats, the link.
 */
const DIAG_CLIP = "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joRHpxDoVM/9Of+/m741bWSd+a59tu3NeIqor2DneeBG9zqbtwRsA888889z86edjL3oIFm56+sBK0rScVAYMw6x46A6iW0ywtmCIqIMVjC4AQgyiJYxlohDpBDpFZ8+v0/39prV6aVPX355+KO5lXVSKgoooQ2KAJarb9+MGzZs2bNi3qjH+XRHgJYRltGcmMZe0bsFZXRTQeVI/qQXtwEEMoh2QY6ER6MhaERaFus/47/29petcTOI/b8Pf77eC8TLkyqHynUCKSJQl3SNKqhv37997333333qalIabwKL3fumZ1OaepJMtjQrWKh4yG4BI+9ASZPCKok1JWaNwgRcAQoykJYyUK9CJNIqt/8eP/bU1xqSa278ufJ48+7t+9UUgBkUvmJrSBM6G3woCooossUXGKF+GJHyhmJelxWi8nsEqEtVJ1QhokGP5Q3kBUK30+VTpJ1sU1IbbXtoc86UDJwBAjKIdkJAt0Yh0Ij0LK3/47/6/F3fE1db5r65+f55VZ4KxqqB554Erfn9t3DVslB+/3+9LHkp72OdrOTXIlhJZ8htXKWprT/JKMk+qZTgStNrPLR5KhTk7PXac/lesYdyf7koKaIcAQwykJYkYJtCY9IIdIPX/ivx/td61JZPt+N7+MdW+M3dUlQAkJCY0PQtYBVPUEhJwJEiSs1MrlgVhawqJcJoFr7U5NRhk3Q9c5SnAbncLtjgNHzmc1ODKW08AP4yiHZClohDoxDoxDoXOd/8ev3/3XrWovHr8d/P85j0valplwULoA8wVoWgSKrwH66KKKKKKFULgFF/OBQeMA9DTAsMASvFpmPgeS053qRUnZApuarSm43jwAEKMpCWMnG3QiJTv/w/x99TjWuG08e2c/FO+smqrLdygDEiUD1Ow87gW3kJ55+af5fL5P/Lmf4vzznyiRsB9c5KkbRVw7Pbble9JociQaU43lHNBo6wXySbirPSu0cmU696rrnKrfipflSuZV2zaXDeOpmKT/shhrpJQScBBDKSQm0Ih0Ih1Lefb/x/H/r/m741q61V/t/jP0/WnfymSi6Aillw/x+v1yyyyyyyy5yyyorK+LKPJBA6ws1fNco99b+++6qAuMps4AEGMoiWMo6EQ6EQ6cQ6Ft7/9u//vq74vitUv19c79tu7czLykzqx9Hnks//tHGHgeeeeeee83ngnz53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";
const DIAGT = { rows: [], running: false, title: "" };
function diagRender() {
  if (CH.mode !== "selftest") return;
  const body = $("#chooser .cbody");
  const mark = ok => ok === true ? '<b class="dk ok">✓</b>' : ok === false ? '<b class="dk no">✗</b>' : '<b class="dk">•</b>';
  body.innerHTML = '<div class="grab"></div><h3>فحص التشغيل</h3><p class="ps">' + esc(DIAGT.title) + '</p><div class="slist">' +
    DIAGT.rows.map(r => '<div class="drow">' + mark(r.ok) + '<div><span>' + esc(r.label) + "</span>" + (r.detail ? "<small>" + esc(r.detail) + "</small>" : "") + "</div></div>").join("") +
    (DIAGT.running ? '<div class="loader"><div class="spin"></div></div>' : '<button class="bigbtn press" data-act="diag-copy" style="margin-top:14px">' + icon("copy", 18) + "نسخ التقرير وأرسله لي</button>") +
    "</div>";
}
function diagText() { return "فحص سهرة MAC\\n" + DIAGT.title + "\\n" + DIAGT.rows.map(r => (r.ok === true ? "✓ " : r.ok === false ? "✗ " : "• ") + r.label + (r.detail ? " — " + r.detail : "")).join("\\n"); }
function testVideo() {
  const v = document.createElement("video");
  v.muted = true; v.playsInline = true; v.setAttribute("playsinline", ""); v.setAttribute("webkit-playsinline", "");
  v.style.cssText = "position:fixed;left:0;bottom:0;width:4px;height:4px;opacity:.02;pointer-events:none";
  document.body.appendChild(v);
  return v;
}
function b64ToBytes(b) { return b64bytes(b); }
function clipParts() {
  const d = b64ToBytes(DIAG_CLIP), out = [];
  let p = 0;
  while (p + 8 <= d.length) { const s = d[p] * 16777216 + (d[p + 1] << 16) + (d[p + 2] << 8) + d[p + 3]; out.push({ t: String.fromCharCode(d[p + 4], d[p + 5], d[p + 6], d[p + 7]), b: d.subarray(p, p + s) }); p += s; }
  return { all: d, init: [out[0].b, out[1].b], s1: [out[2].b, out[3].b], s2: [out[4].b, out[5].b] };
}
const toB64 = parts => { let s = ""; for (const a of parts) for (let i = 0; i < a.length; i += 8192) s += String.fromCharCode.apply(null, a.subarray(i, i + 8192)); return btoa(s); };
function playTest(src, muted) {
  return new Promise(res => {
    const v = testVideo();
    v.muted = muted !== false;
    let done = false;
    const end = r => { if (done) return; done = true; try { v.pause(); v.removeAttribute("src"); v.load(); } catch (e) { /* ignore */ } v.remove(); res(r); };
    v.addEventListener("timeupdate", () => { if (v.currentTime > 0.25) end({ ok: true, detail: "شغّال" }); });
    v.addEventListener("error", () => end({ ok: false, detail: "خطأ " + (v.error ? v.error.code + " " + (v.error.message || "") : "") }));
    v.src = src;
    const pr = v.play();
    if (pr && pr.catch) pr.catch(e => end({ ok: false, detail: "play: " + e.name }));
    setTimeout(() => end({ ok: false, detail: "لم يبدأ خلال 7 ث" }), 7000);
  });
}
function mseTest(C, bytes) {
  return new Promise(res => {
    const v = testVideo();
    const out = { opened: false, how: "src", appended: false, played: false, err: "" };
    const ms = new C();
    let done = false;
    const end = () => { if (done) return; done = true; try { v.pause(); v.srcObject = null; v.removeAttribute("src"); v.load(); } catch (e) { /* ignore */ } v.remove(); res(out); };
    ms.addEventListener("sourceopen", () => {
      if (out.opened) return;
      out.opened = true;
      try {
        const sb = ms.addSourceBuffer('video/mp4; codecs="avc1.42d00b,mp4a.40.2"');
        sb.addEventListener("updateend", () => {
          out.appended = v.buffered.length > 0;
          out.buf = out.appended ? "مخزّن " + (v.buffered.end(0) - v.buffered.start(0)).toFixed(1) + " ث" : "فارغ";
          const pr = v.play();
          if (pr && pr.catch) pr.catch(e => { out.err = "play: " + e.name; });
        });
        sb.addEventListener("error", () => { out.err = "append error"; });
        sb.appendBuffer(bytes);
      } catch (e) { out.err = e.message; }
    });
    v.addEventListener("timeupdate", () => { if (v.currentTime > 0.25) { out.played = true; end(); } });
    v.addEventListener("error", () => { out.err = "video error " + (v.error ? v.error.code : ""); });
    try { v.disableRemotePlayback = true; } catch (e) { /* ignore */ }
    v.src = URL.createObjectURL(ms);
    setTimeout(() => { if (!out.opened && "srcObject" in v) { try { v.removeAttribute("src"); v.srcObject = ms; out.how = "srcObject"; } catch (e) { out.err = "srcObject: " + e.message; } } }, 2000);
    setTimeout(end, 7000);
  });
}
// the real engine on the real movie, in a hidden player, for up to 15 s
function engineTest(url, E) {
  E = E || (typeof MKVEngine !== "undefined" ? MKVEngine : null);
  return new Promise(res => {
    if (!E || !E.supported()) { res({ ok: false, detail: "غير متاح" }); return; }
    const v = testVideo();
    let done = false, h = null;
    const end = (ok, detail) => {
      if (done) return; done = true;
      let lg = "";
      try { const st = h && h.stats ? h.stats() : null; if (st && !ok) lg = st.log.slice(-4).join(" | "); } catch (e) { /* ignore */ }
      try { h && h.stop(); } catch (e) { /* ignore */ }
      try { v.pause(); v.srcObject = null; v.removeAttribute("src"); v.load(); } catch (e) { /* ignore */ }
      v.remove();
      res({ ok, detail, log: lg });
    };
    v.addEventListener("timeupdate", () => { if (v.currentTime > 0.3 && v.videoWidth) end(true, "يعمل · " + v.videoWidth + "×" + v.videoHeight); });
    try {
      h = E.play(v, url, { prefs: { ahead: 20 }, tracks: () => {}, cue: () => {}, note: () => {},
        error: m => end(false, reasonText(m)), blocked: () => {} });
    } catch (e) { end(false, e.message); return; }
    setTimeout(() => end(false, "لم يبدأ خلال 15 ث"), 15000);
  });
}
async function runSelfTest(link, label, source, ctx) {
  ctx = ctx || {};
  if (DIAGT.running) return;
  DIAGT.running = true; DIAGT.rows = [];
  CH.mode = "selftest";
  $("#chooser .cbody").classList.add("tall");
  $("#chooser").classList.add("open");
  const add = (l, ok, detail) => { DIAGT.rows.push({ label: l, ok, detail: detail || "" }); diagRender(); };
  DIAGT.title = "";
  diagRender();
  const ua = navigator.userAgent;
  const ios = (ua.match(/OS (\\d+)_(\\d+)(?:_(\\d+))?/) || []).slice(1).filter(Boolean).join(".");
  add("الجهاز", null, "iOS " + (ios || "?") + " · " + (/iPad/.test(ua) ? "iPad" : "iPhone") + " · " + (S.lazy ? "تحميل خفيف" : "كامل"));
  (ctx.tries || []).forEach(t => add("محاولة: " + ((ENGINE_INFO[t.k] || {}).name || t.k) + (t.ext ? " · " + t.ext.toUpperCase() : ""), false, (reasonText(t.why) || "?") + (t.log.length ? " · " + t.log.join(" | ") : "")));
  // 1) the engines (MediaSource)
  const MMS = window.ManagedMediaSource, MSN = window.MediaSource, C = MMS || MSN;
  add("محرك سهرة متاح (MediaSource)", !!C, MMS ? "ManagedMediaSource" : MSN ? "MediaSource" : "غير متاح — يحتاج iOS 17.1 أو أحدث");
  if (C) {
    const t = c => { try { return C.isTypeSupported(c); } catch (e) { return false; } };
    add("صيغ: H.264 / AAC / HEVC / AC-3 / E-AC-3", t('video/mp4; codecs="avc1.640028,mp4a.40.2"'),
      ["H.264+AAC " + (t('video/mp4; codecs="avc1.640028,mp4a.40.2"') ? "✓" : "✗"), "HEVC " + (t('video/mp4; codecs="hvc1.1.6.L120.90"') ? "✓" : "✗"),
       "AC-3 " + (t('audio/mp4; codecs="ac-3"') ? "✓" : "✗"), "E-AC-3 " + (t('audio/mp4; codecs="ec-3"') ? "✓" : "✗")].join(" · "));
    const r = await mseTest(C, clipParts().all);
    add("فتح المحرك (sourceopen)", r.opened, r.opened ? "عبر " + r.how : r.err || "لم يُفتح");
    if (r.opened) add("تشغيل فيديو عبر المحرك", r.played, r.played ? "يعمل · " + (r.buf || "") : (r.appended ? "أُضيف ولم يبدأ · " : "") + (r.err || "لم يبدأ"));
  }
  // 2) files Scriptable writes: a normal video file, and HLS made of local pieces
  let wrote = false;
  try {
    const p = clipParts();
    await api("diagWrite", { files: [
      { name: "clip.mp4", b64: DIAG_CLIP },
      { name: "init.mp4", b64: toB64(p.init) }, { name: "s1.m4s", b64: toB64(p.s1) }, { name: "s2.m4s", b64: toB64(p.s2) },
      { name: "p.m3u8", text: "#EXTM3U\\n#EXT-X-VERSION:7\\n#EXT-X-TARGETDURATION:2\\n#EXT-X-PLAYLIST-TYPE:VOD\\n#EXT-X-MAP:URI=\\"init.mp4\\"\\n#EXTINF:1.0,\\ns1.m4s\\n#EXTINF:1.0,\\ns2.m4s\\n#EXT-X-ENDLIST\\n" }] }, 20000);
    wrote = true;
  } catch (e) { add("كتابة ملفات الفحص", false, e.message); }
  if (wrote) {
    const a = await playTest("diag/clip.mp4"); add("تشغيل ملف فيديو محلي", a.ok, a.detail);
    const b = await playTest("diag/p.m3u8"); add("تشغيل HLS من ملفات محلية", b.ok, b.detail);
    const c = await playTest("diag/clip.mp4", false); add("تشغيل تلقائي بالصوت", c.ok, c.ok ? "مسموح" : c.detail);
  }
  // 3) the movie itself — every check gets its own new link (some portals give one-time links)
  let src = ctx.live ? null : source;
  if (ctx.live) link = "";
  if (!ctx.live && !link && !src) {
    const it = (S.rails["m-all"] || [])[0] || (S.cat.movies.items || [])[0];
    if (it) { src = movieItem(it).source; label = label || splitTag(it.name).title; }
  }
  const newLink = async () => {
    if (src) { try { await ready(); const u = (await api("link", { source: src }, true)).url; if (u) return u; } catch (e) { if (!link) throw e; } }
    return link;
  };
  try { link = link || await newLink(); } catch (e) { add("جلب رابط فيلم للفحص", false, e.message); }
  if (link) {
    const ext = fileExt(link);
    let host = "";
    try { host = new URL(link).host; } catch (e) { /* ignore */ }
    DIAGT.title = (label || "") + " · " + (ext ? ext.toUpperCase() + " · " : "") + host;
    diagRender();
    const nat = await playTest(await newLink().catch(() => link));
    const knownNo = /^(mkv|avi|ts|flv|wmv)$/.test(ext) || !/^(mp4|m4v|mov|m3u8)$/.test(ext);
    add("تشغيل الفيلم بالمشغّل الأساسي", nat.ok ? true : knownNo ? null : false, nat.ok ? nat.detail : nat.detail + (knownNo ? " — طبيعي لملفات MKV" : ""));
    const eng = await engineTest(await newLink().catch(() => link));
    add("تشغيل الفيلم بمحرك سهرة (MKV/MP4)", eng.ok, eng.detail + (eng.log ? " · " + eng.log : ""));
    const pr = await pageProbe(await newLink().catch(() => link));
    if (pr.error) add("وصول المحرك للخادم مباشرة", null, "الخادم لا يسمح (" + pr.error + ") — يُستخدم «MKV عبر Scriptable» بدلاً منه");
    else {
      add("وصول المحرك للخادم مباشرة", pr.status < 400, "HTTP " + pr.status + " · " + (pr.type || "?") + (pr.total ? " · " + (pr.total / 1048576).toFixed(0) + " م.ب" : ""));
      add("التقديم والتنزيل المجزّأ (من المحرك)", pr.ranges, pr.ranges ? "مدعوم" : pr.rangeErr ? "طلب الجزء مرفوض (" + pr.rangeErr + ")" : "الخادم يرسل الملف كاملاً فقط");
    }
    try {
      const n = await api("diagLink", { url: await newLink().catch(() => link) }, true);
      add("فحص Scriptable للخادم (HEAD)", n.head.status >= 200 && n.head.status < 400 ? true : pr.ranges ? null : false,
        "HTTP " + n.head.status + (n.head.total ? " · " + (n.head.total / 1048576).toFixed(0) + " م.ب" : "") + (n.head.status >= 400 && pr.ranges ? " — لا يهم، التنزيل يستخدم فحص المحرك" : ""));
      if (n.read) add("قراءة جزء عبر Scriptable", n.read.ok, n.read.detail);
    } catch (e) { add("فحص Scriptable للخادم", false, e.message); }
  } else if (!ctx.live) add("رابط للفحص", null, "افتح فيلماً ثم اضغط «افحص السبب» من شاشة الخطأ");
  // 4) a live channel (the one that failed, or the first one): HLS, the TS engine, and the plain player
  const ch = ctx.ch || (S.liveList || [])[0] || (S.channels || [])[0];
  if (ch) {
    const chLink = async () => { await ready(); return (await api("link", { source: chItem(ch).source }, true)).url; };
    try {
      const l1 = await chLink();
      DIAGT.title += (DIAGT.title ? "\\n" : "") + "قناة: " + ch.name + " · " + (fileExt(l1) || "?").toUpperCase();
      diagRender();
      if (toHLS(l1) !== l1) { const h = await playTest(toHLS(l1)); add("قناة مباشرة: محرك HLS", h.ok, h.detail); }
      if (typeof TSEngine !== "undefined") { const t = await engineTest(await chLink(), TSEngine); add("قناة مباشرة: محرك TS", t.ok, t.detail + (t.log ? " · " + t.log : "")); }
      const pr = await pageProbe(await chLink());
      add("قناة مباشرة: وصول المحرك للبث", pr.error ? false : pr.status < 400, pr.error ? "الخادم يمنع (" + pr.error + ")" : "HTTP " + pr.status + " · " + (pr.type || "?"));
      const n = await playTest(await chLink()); add("قناة مباشرة: المشغّل الأساسي", n.ok, n.detail);
    } catch (e) { add("قناة مباشرة", false, e.message); }
  }
  DIAGT.running = false;
  diagRender();
  api("diag", { s: "selftest " + DIAGT.rows.map(r => (r.ok === false ? "✗" : r.ok ? "✓" : "•") + r.label.slice(0, 18)).join(",") }).catch(() => {});
}

/* ================= downloads ================= */
const DLS = { list: [], timer: null };
// offline pieces come from Scriptable, aligned to its 4 MB parts
const LOCAL = {
  part: 4 * 1024 * 1024,
  info: u => api("localInfo", { id: u.slice(6) }, 20000).then(r => { LOCAL.part = r.part || LOCAL.part; return r; }),
  read: (u, start) => { const part = Math.floor(start / LOCAL.part); return api("localRead", { id: u.slice(6), part }, 30000).then(r => b64bytes(r.b64).subarray(start - r.start)); }
};
const fmtMB = b => (b >= 1073741824 ? (b / 1073741824).toFixed(2) + " ج.ب" : Math.max(0.1, b / 1048576).toFixed(b < 10485760 ? 1 : 0) + " م.ب");
// asks the file server itself (as the player does) whether it hands out pieces of the file, and the size
async function pageProbe(url) {
  const out = { ranges: false, total: 0, status: 0, type: "", error: "" };
  const get = async (headers) => {
    const ac = typeof AbortController === "function" ? new AbortController() : null;
    const r = await Promise.race([fetch(url, { headers, signal: ac ? ac.signal : undefined }), new Promise((_, rej) => setTimeout(() => rej(new Error("مهلة")), 12000))]);
    setTimeout(() => { try { ac && ac.abort(); } catch (e) { /* ignore */ } }, 0);
    return r;
  };
  try {
    const r = await get({ Range: "bytes=0-1" });
    out.status = r.status; out.type = r.headers.get("content-type") || "";
    const cr = r.headers.get("content-range") || "";
    out.ranges = r.status === 206;
    out.total = cr.indexOf("/") > 0 ? +cr.split("/")[1] || 0 : r.status === 200 ? +r.headers.get("content-length") || 0 : 0;
    if (out.ranges && !out.total) { const r2 = await get({}); out.total = r2.ok ? +r2.headers.get("content-length") || 0 : 0; }
  } catch (e) {
    // a Range request may be refused where a plain one works (CORS pre-check)
    out.rangeErr = e.message || e.name;
    try { const r2 = await get({}); out.status = r2.status; out.type = r2.headers.get("content-type") || ""; out.total = +r2.headers.get("content-length") || 0; }
    catch (e2) { out.error = e2.message || e2.name; }
  }
  return out;
}
async function startDownload(item) {
  if (!item || item.live) return;
  try {
    await ready();
    let probe = null;
    try { const u = (await api("link", { source: item.source }, true)).url; if (u) probe = await pageProbe(u); } catch (e) { /* Scriptable checks by itself */ }
    DLS.list = await api("dlAdd", { item: { key: item.key, title: item.title, subtitle: item.subtitle, poster: item.poster, kind: (item.meta || {}).kind, source: item.source, probe } }, true);
    toast("بدأ التنزيل ⬇ · تابعه من «التنزيلات»");
    renderDlRail();
    pollDownloads();
  } catch (e) { toast(e.message); }
}
function pollDownloads() {
  clearTimeout(DLS.timer);
  const busy = DLS.list.some(d => d.state === "running" || d.state === "queued");
  const open = CH.mode === "downloads" && $("#chooser").classList.contains("open");
  if (!busy && !open) return;
  DLS.timer = setTimeout(async () => {
    try { DLS.list = await api("dlList"); } catch (e) { /* offline */ }
    if (CH.mode === "downloads" && $("#chooser").classList.contains("open")) renderDownloads();
    renderDlRail();
    pollDownloads();
  }, 1200);
}
const dlState = d => d.state === "done" ? "جاهز للمشاهدة بدون إنترنت" : d.state === "running" ? "يتنزّل… " + (d.total ? Math.floor(d.bytes / d.total * 100) + "%" : "")
  : d.state === "queued" ? "في الانتظار" : d.state === "paused" ? "متوقف مؤقتاً" : "خطأ: " + d.error;
function renderDownloads() {
  const body = $("#chooser .cbody");
  const list = DLS.list;
  const used = list.reduce((a, d) => a + (d.bytes || 0), 0);
  body.innerHTML = '<div class="grab"></div><h3>التنزيلات</h3><p class="ps">' + list.length + " · " + fmtMB(used) + ' على الجهاز</p><div class="slist">' +
    (list.length ? list.map(d => {
      const pct = d.total ? Math.floor(d.bytes / d.total * 100) : 0;
      return '<div class="dlrow"><div class="dlp">' + (d.poster ? '<img src="' + esc(d.poster) + '" onerror="' + imgErr + '">' : "") + "</div>" +
        '<div class="dlm"><b>' + esc(splitTag(d.title).title) + "</b><small>" + esc(d.sub || "") + "</small>" +
        '<div class="dlbar"><i style="width:' + (d.state === "done" ? 100 : pct) + '%"></i></div><small class="' + (d.state === "error" ? "err" : "") + '">' + esc(dlState(d)) +
        (d.total ? " · " + fmtMB(d.state === "done" ? d.total : d.bytes) + (d.state === "done" ? "" : " / " + fmtMB(d.total)) : "") + "</small></div>" +
        '<div class="dla">' + (d.state === "done" ? '<button class="pr" data-act="dl-play" data-id="' + d.id + '">' + icon("play", 16) + "</button>" :
          d.state === "running" || d.state === "queued" ? '<button data-act="dl-pause" data-id="' + d.id + '">' + icon("pause", 16) + "</button>" :
          '<button data-act="dl-resume" data-id="' + d.id + '">' + icon("refresh", 16) + "</button>") +
          (d.state === "error" ? '<button data-act="dl-safari" data-id="' + d.id + '" title="Safari">' + icon("compass", 16) + "</button>" : "") +
          '<button data-act="dl-del" data-id="' + d.id + '">' + icon("trash", 16) + "</button></div></div>";
    }).join("") : emptyHTML("dl", "لا توجد تنزيلات", "اضغط زر التنزيل في صفحة الفيلم أو بجانب الحلقة.")) +
    '<p class="note">التنزيل يستمر وتطبيق Scriptable مفتوح، ويكمل تلقائياً عند فتحه مرة ثانية. إذا فشل لأن الخادم لا يسمح، اضغط زر Safari (البوصلة) ليتنزّل الملف في تطبيق «الملفات».</p></div>';
}
async function openDownloads() {
  CH.mode = "downloads";
  $("#chooser .cbody").classList.add("tall");
  renderDownloads();
  $("#chooser").classList.add("open");
  try { DLS.list = await api("dlList"); renderDownloads(); } catch (e) { /* ignore */ }
  pollDownloads();
}
function playDownload(id) {
  const d = DLS.list.find(x => x.id === id);
  if (!d) return;
  closeChooser();
  const kind = d.kind || "movies";
  playInApp([{ key: d.key, live: false, title: d.title, subtitle: d.sub, poster: d.poster, logo: d.poster, local: d.id,
    source: { type: "local", id: d.id }, meta: { kind, id: (d.key || "").split(":")[1] || d.id, ep: d.sub || "" } }], 0);
}
function renderDlRail() {
  const rail = $("#rail-dls");
  if (!rail) return;
  const list = DLS.list;
  if (!list.length) { rail.classList.add("hidden"); return; }
  rail.classList.remove("hidden", "gone");
  $("#track-dls").innerHTML = list.slice(0, 12).map((d, i) =>
    '<div class="pcard press rise" style="--i:' + i + '" data-act="' + (d.state === "done" ? "dl-play" : "dl-open") + '" data-id="' + d.id + '"><div class="pimg">' + esc(splitTag(d.title).title) +
      (d.poster ? '<img loading="lazy" src="' + esc(d.poster) + '" onload="' + imgOK + '" onerror="' + imgErr + '">' : "") +
      '<span class="tagk">' + (d.state === "done" ? "⬇ جاهز" : d.total ? Math.floor(d.bytes / d.total * 100) + "%" : "…") + "</span></div>" +
      '<div class="pt">' + esc(splitTag(d.title).title) + '</div><div class="py">' + esc(d.sub || "") + "</div></div>").join("");
}

/* ================= player preferences (like iSTB) + audio / subtitles ================= */
const PLAYER_KINDS = [
  { id: 1, name: "المشغّل 1 · السريع", sub: "يبدأ بمشغّل الآيفون (MP4 · HLS)، ويحوّل لمحركات سهرة تلقائياً عند الحاجة." },
  { id: 2, name: "المشغّل 2 · المتقدّم", sub: "محركات سهرة أولاً: MKV وMP4 وTS، ترجمة عربية تلقائية، واختيار لغة الصوت." },
  { id: 3, name: "المشغّل 3 · النظام", sub: "مشغّل آبل داخل التطبيق: صورة داخل صورة وAirPlay (لروابط MP4 وHLS)." }
];
function openPlayerPrefs() {
  const st = S.settings;
  const seg = (key, opts) => '<div class="seg">' + opts.map(o => '<button class="' + (String(st[key]) === String(o[0]) ? "on" : "") + '" data-act="pset" data-key="' + key + '" data-val="' + o[0] + '">' + o[1] + "</button>").join("") + "</div>";
  const sw = (key, label, sub) => '<button class="trow" data-act="ptoggle" data-key="' + key + '"><span>' + label + (sub ? "<small>" + sub + "</small>" : "") + '</span><span class="sw' + (st[key] !== false ? " on" : "") + '"></span></button>';
  const body = $("#chooser .cbody");
  body.classList.add("tall");
  CH.mode = "pprefs";
  body.innerHTML = '<div class="grab"></div><h3>تفضيلات المشغّل</h3><p class="ps">تُطبَّق على التشغيل داخل التطبيق</p><div class="slist">' +
    '<div class="gt">المشغّل</div><div class="group">' + PLAYER_KINDS.map(k =>
      '<button class="trow pk' + (+st.engine === k.id ? " on" : "") + '" data-act="pset" data-key="engine" data-val="' + k.id + '"><span>' + k.name + "<small>" + k.sub + "</small></span>" +
      (+st.engine === k.id ? '<i class="okd">' + icon("check", 12) + "</i>" : "") + "</button>").join("") + "</div>" +
    '<div class="group">' +
      sw("bg", "التشغيل في الخلفية", "نافذة صغيرة عند الخروج إن سمح الآيفون، ويكمل عند الرجوع") +
      '<div class="trow"><span>فترة القفز</span>' + seg("skip", [[10, "10ث"], [15, "15ث"], [30, "30ث"]]) + "</div>" +
      sw("autoNext", "تشغيل الحلقة التالية تلقائياً") +
      '<div class="trow"><span>مدة التخزين المؤقت<small>أطول = تقطيع أقل، ذاكرة أكثر</small></span>' + seg("buffer", [[30, "30ث"], [60, "60ث"], [120, "120ث"]]) + "</div>" +
      sw("retry", "إعادة المحاولة عند حدوث خطأ", "يعيد الاتصال تلقائياً إذا انقطع البث") + "</div>" +
    '<div class="gt">الصوت والترجمة</div><div class="group">' +
      '<div class="trow"><span>اللغة الصوتية المفضلة</span>' + seg("audioLang", [["", "بلا"], ["ar", "العربية"], ["en", "English"]]) + "</div>" +
      '<div class="trow"><span>الترجمة<small>تختار العربية تلقائياً إن وُجدت في الملف</small></span>' + seg("subs", [["ar", "عربي تلقائي"], ["any", "أي لغة"], ["off", "إيقاف"]]) + "</div>" +
      '<div class="trow"><span>حجم الترجمة</span>' + seg("subSize", [[1, "صغير"], [2, "متوسط"], [3, "كبير"]]) + "</div>" +
      '<div class="trow"><span>خلفية الترجمة</span>' + seg("subBg", [[0, "بدون"], [1, "ظل"], [2, "صندوق"]]) + "</div></div>" +
    '<div class="gt">عناصر التحكم</div><div class="group">' + sw("glass", "أزرار زجاجية", "أزرار شفافة بتأثير الزجاج") + "</div>" +
    "</div>";
  $("#chooser").classList.add("open");
}
function applyPlayerLooks() {
  document.documentElement.classList.toggle("glass", S.settings.glass === true);
  const sz = [0, 15, 19, 24][+S.settings.subSize || 2];
  const ps = $("#psub");
  ps.style.fontSize = sz + "px";
  ps.dataset.bg = String(S.settings.subBg == null ? 1 : S.settings.subBg);
  try { video.autoPictureInPicture = S.settings.bg !== false; } catch (e) { /* ignore */ }
}

// subtitles: cues from the engine (MKV text tracks) drawn over the video
const SUB = { cues: {}, track: 0, shown: "", raf: 0 };
function resetSubs() { SUB.cues = {}; SUB.track = 0; SUB.shown = ""; $("#psub").innerHTML = ""; P.tracks = null; }
function addCue(q) {
  const list = SUB.cues[q.track] || (SUB.cues[q.track] = []);
  let i = list.length;
  while (i > 0 && list[i - 1].start > q.start) i--;
  if (list[i - 1] && list[i - 1].start === q.start && list[i - 1].text === q.text) return;
  list.splice(i, 0, q);
}
function pickSubTrack(subs) {
  const mode = S.settings.subs || "ar";
  if (mode === "off" || !subs || !subs.length) return 0;
  const ar = subs.filter(x => x.lang === "ar");
  const pick = ar.find(x => !x.forced) || ar[0] || (mode === "any" ? subs.find(x => x.isDefault) || subs[0] : null);
  return pick ? pick.num : 0;
}
function drawSubs() {
  const box = $("#psub");
  if (!SUB.track || !SUB.cues[SUB.track]) { if (SUB.shown) { box.innerHTML = ""; SUB.shown = ""; } return; }
  const shift = P.eng && P.eng.stats ? P.eng.stats().shift || 0 : 0;
  const t = video.currentTime * 1000 - shift - (+S.settings.subDelay || 0);
  const list = SUB.cues[SUB.track];
  let lo = 0, hi = list.length;
  while (lo < hi) { const m = (lo + hi) >> 1; if (list[m].start <= t) lo = m + 1; else hi = m; }
  const on = [];
  for (let i = lo - 1; i >= 0 && i >= lo - 6; i--) if (list[i].end > t) on.unshift(list[i].text);
  const txt = on.join("\\n");
  if (txt !== SUB.shown) { SUB.shown = txt; box.innerHTML = txt ? txt.split("\\n").map(l => "<span>" + esc(l) + "</span>").join("<br>") : ""; }
}
function subLoop() {
  cancelAnimationFrame(SUB.raf);
  const tick = () => { if (!P.open) return; drawSubs(); SUB.raf = requestAnimationFrame(tick); };
  SUB.raf = requestAnimationFrame(tick);
}
// native playback (MP4 / HLS): use the file's own text tracks — Arabic shown automatically
function nativeTracks() {
  try {
    const tt = video.textTracks;
    if (!tt || !tt.length) return;
    const mode = S.settings.subs || "ar";
    let chosen = -1;
    for (let i = 0; i < tt.length; i++) if (/^ar/i.test(tt[i].language || "") || /arab|عرب/i.test(tt[i].label || "")) { chosen = i; break; }
    if (chosen < 0 && mode === "any") chosen = 0;
    for (let i = 0; i < tt.length; i++) tt[i].mode = i === chosen && mode !== "off" ? "showing" : "disabled";
  } catch (e) { /* ignore */ }
  try {
    const at = video.audioTracks, want = S.settings.audioLang;
    if (at && at.length > 1 && want) for (let i = 0; i < at.length; i++) if ((at[i].language || "").toLowerCase().startsWith(want)) { for (let k = 0; k < at.length; k++) at[k].enabled = k === i; break; }
  } catch (e) { /* ignore */ }
}
const LANG_NAME = { ar: "العربية", en: "English", fr: "Français", tr: "Türkçe", es: "Español", de: "Deutsch", hi: "हिन्दी", fa: "فارسی", un: "غير محدد" };
// audio + subtitles menu
function openMedia() {
  const body = $("#chooser .cbody");
  body.classList.add("tall");
  CH.mode = "media";
  const tr = P.tracks || { audio: [], subs: [] };
  let nt = [], na = [];
  try { nt = Array.from(video.textTracks || []); na = Array.from(video.audioTracks || []); } catch (e) { /* ignore */ }
  const row = (act, id, label, sub, on) => '<button class="crow' + (on ? " on" : "") + '" data-act="' + act + '" data-id="' + id + '"><span class="t">' + esc(label) + "</span>" + (sub ? "<small>" + esc(sub) + "</small>" : "") + (on ? '<i class="okd">' + icon("check", 12) + "</i>" : "") + "</button>";
  const cur = P.items[P.index] || {};
  let h = '<div class="grab"></div><h3>خيارات التشغيل</h3><p class="ps">' + esc(cur.title || "") + '</p><div class="slist">';
  if (!cur.live) h += '<div class="gt">سرعة التشغيل</div><div class="group"><div class="trow"><span>السرعة</span><div class="seg">' +
    SPEEDS.map(r => '<button class="' + ((P.rate || 1) === r ? "on" : "") + '" data-act="m-speed" data-id="' + r + '">' + r + "×</button>").join("") + "</div></div></div>";
  h += '<div class="gt">تحسين الصورة ✨</div><div class="group"><div class="trow"><div class="seg wrap">' +
    ENH_LEVELS.map((L, i) => '<button class="' + ((+S.settings.enhance || 0) === i ? "on" : "") + '" data-act="m-enh" data-id="' + i + '">' + (L ? L.name : "إيقاف") + "</button>").join("") + "</div></div>" +
    ((+S.settings.enhance || 0) ? '<div class="trow"><span>قارن قبل / بعد<small>النصف الأيسر بدون تحسين</small></span><div class="seg"><button class="' + (ENH.split ? "" : "on") + '" data-act="m-split" data-id="0">لا</button><button class="' + (ENH.split ? "on" : "") + '" data-act="m-split" data-id="0.5">نعم</button></div></div>' : "") +
    (ENH.err === "cross" ? '<p class="note">هذا الفيديو يعرضه المشغّل الأساسي، والتحسين يعمل مع محركات سهرة. اختر «محرك MKV» أو «محرك TS» من «مشغّل آخر».</p>' : "") + "</div>";
  h += '<div class="gt">مؤقت النوم' + (sleepLeft() ? " · متبقٍ " + sleepLeft() : "") + '</div><div class="group"><div class="trow"><div class="seg wrap">' +
    [["0", "إيقاف"], ["15", "15 د"], ["30", "30 د"], ["60", "ساعة"], ["90", "1.5 س"]].concat(cur.live ? [] : [["end", "نهاية الحلقة"]]).map(o =>
      '<button class="' + ((o[0] === "end" ? SLEEP.end : o[0] === "0" ? !sleepLeft() : !!SLEEP.at && SLEEP.min === o[0]) ? "on" : "") + '" data-act="m-sleep" data-id="' + o[0] + '">' + o[1] + "</button>").join("") + "</div></div></div>";
  h += '<div class="gt">الصوت</div>';
  if (tr.audio.length) h += tr.audio.map(a => row("m-audio", a.num, LANG_NAME[a.lang] || a.lang || "مسار " + a.num, (a.name || "") + " " + (a.codec || "").replace(/^A_/, ""), a.num === tr.audioOn)).join("");
  else if (na.length > 1) h += na.map((a, i) => row("m-naudio", i, LANG_NAME[(a.language || "").slice(0, 2)] || a.label || "مسار " + (i + 1), a.label || "", a.enabled)).join("");
  else h += '<p class="note">مسار صوت واحد.</p>';
  h += '<div class="gt">الترجمة</div>' + row("m-sub", 0, "إيقاف", "", tr.subs.length ? !SUB.track : !nt.some(t => t.mode === "showing"));
  if (tr.subs.length) h += tr.subs.map(x => row("m-sub", x.num, LANG_NAME[x.lang] || x.lang || "ترجمة " + x.num, x.name + (x.forced ? " · إجبارية" : ""), SUB.track === x.num)).join("");
  else if (nt.length) h += nt.map((t, i) => row("m-nsub", i, LANG_NAME[(t.language || "").slice(0, 2)] || t.label || "ترجمة " + (i + 1), t.label || "", t.mode === "showing")).join("");
  else h += '<p class="note">لا توجد ترجمة داخل هذا الملف.</p>';
  h += '<div class="gt">مزامنة الترجمة مع الصوت</div><div class="group"><div class="trow"><span>التأخير<small>إذا ظهرت الترجمة قبل الكلام أو بعده</small></span><div class="seg">' +
    '<button data-act="m-delay" data-id="-500">−0.5</button><button class="on" data-act="m-delay" data-id="0">' + ((+S.settings.subDelay || 0) / 1000).toFixed(1) + 'ث</button><button data-act="m-delay" data-id="500">+0.5</button></div></div></div>';
  h += '<button class="trow" data-act="pprefs-open" style="margin-top:6px"><span>تفضيلات المشغّل</span>' + icon("left", 16) + "</button></div>";
  body.innerHTML = h;
  $("#chooser").classList.add("open");
}
function switchAudio(num) {
  if (!P.cur || !(P.cur.k === "mkv" || P.cur.k === "mkvr")) return;
  P.audioPick = +num;
  P.resumeAt = video.currentTime;
  P.force = P.cur.k;
  P.attempt = 0;
  toast("جارٍ تغيير الصوت…");
  loadAttempt(P.token);
}

/* ----- picture in picture & background ----- */
const inPiP = () => video.webkitPresentationMode === "picture-in-picture" || document.pictureInPictureElement === video;
function pipAvailable() {
  try {
    if (video.webkitSupportsPresentationMode && video.webkitSupportsPresentationMode("picture-in-picture")) return true;
    return !!(document.pictureInPictureEnabled && video.requestPictureInPicture);
  } catch (e) { return false; }
}
async function togglePiP() {
  if (inPiP()) {
    try { if (video.webkitSetPresentationMode) video.webkitSetPresentationMode("inline"); else await document.exitPictureInPicture(); } catch (e) { /* ignore */ }
    return;
  }
  if (!["playing", "paused", "buffering"].includes(P.state)) { openChooser(P.items, P.index, "bg"); return; }
  let started = false;
  const on = () => { started = true; };
  video.addEventListener("enterpictureinpicture", on, { once: true });
  video.addEventListener("webkitpresentationmodechanged", on, { once: true });
  setTimeout(() => {
    video.removeEventListener("enterpictureinpicture", on);
    video.removeEventListener("webkitpresentationmodechanged", on);
    if (!started && !inPiP() && P.open && !$("#chooser").classList.contains("open")) openChooser(P.items, P.index, "bg");
  }, 1000);
  if (pipAvailable()) {
    try {
      if (video.webkitSetPresentationMode) video.webkitSetPresentationMode("picture-in-picture");
      else { const pr = video.requestPictureInPicture(); if (pr && pr.catch) pr.catch(() => {}); }
    } catch (e) { /* not allowed here */ }
  }
}
function setMediaSession(item) {
  try {
    if (!("mediaSession" in navigator) || typeof MediaMetadata !== "function") return;
    const art = item.logo || item.poster;
    navigator.mediaSession.metadata = new MediaMetadata({ title: item.title, artist: item.subtitle || "سهرة MAC", album: "سهرة MAC",
      artwork: art ? [{ src: art, sizes: "512x512" }] : [] });
    const h = (a, f) => { try { navigator.mediaSession.setActionHandler(a, f); } catch (e) { /* unsupported */ } };
    h("play", () => video.play().catch(() => {}));
    h("pause", () => video.pause());
    h("nexttrack", P.items.length > 1 ? () => playerAction("next") : null);
    h("previoustrack", P.items.length > 1 && item.live ? () => playerAction("prev") : null);
  } catch (e) { /* ignore */ }
}
try { video.autoPictureInPicture = true; } catch (e) { /* ignore */ }
// back from another app: continue where it stopped (live jumps back to "now")
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    P.hiddenAt = Date.now();
    P.wasPlaying = P.open && (P.state === "playing" || P.state === "buffering");
    return;
  }
  if (!P.open || !P.wasPlaying || inPiP()) return;
  if (S.settings.bg === false) { P.wasPlaying = false; return; }
  P.wasPlaying = false;
  const item = P.items[P.index];
  if (!item) return;
  if (item.live) {
    if (video.paused || Date.now() - P.hiddenAt > 15000) { P.drops = 0; P.why = []; loadAttempt(P.token); }
  } else if (video.paused) {
    video.play().catch(() => setState("tap"));
  }
});

function stopEngine() {
  if (ENH.on) enhStop();
  const e = P.eng;
  if (!e) return;
  P.eng = null;
  try { e.stop(); } catch (x) { /* ignore */ }
  // load() also drops any queued "ended"/"error" events of the old MediaSource
  try { video.srcObject = null; } catch (x) { /* ignore */ }
  try { video.removeAttribute("src"); video.load(); } catch (x) { /* ignore */ }
}

function closePlayer() {
  enhStop();
  savePos(true);
  P.open = false;
  if (P.locked) { P.locked = false; $("#player").classList.remove("locked"); }
  $("#pnextup").classList.remove("show");
  P.token++;
  P.aid++;
  clearTimeout(P.stall);
  clearTimeout(P.hide);
  stopEngine();
  try { video.pause(); } catch (e) { /* ignore */ }
  video.removeAttribute("src");
  try { video.load(); } catch (e) { /* ignore */ }
  $("#player").classList.remove("open");
  document.body.classList.remove("in-player");
  renderContinue();
  if (S.detail) renderDetail();
  if (S.tab === "live") { if (S.liveGroup === "__fav") renderLive(); else renderLiveChips(); }
}

function playCurrent(zap) {
  enhStop();
  savePos(true);
  const item = P.items[P.index];
  P.token++;
  P.attempt = 0;
  P.retries = 0;
  P.drops = 0;
  P.slow = false;
  P.force = null;
  P.audioPick = 0;
  resetSubs();
  P.why = [];
  P.tries = [];
  P.lastLog = null;
  P.epg = [];
  clearTimeout(P.stall);
  stopEngine();
  try { video.pause(); } catch (e) { /* ignore */ }
  video.removeAttribute("src");
  const p = !item.live && S.progress[item.key];
  P.resumeAt = p && p.pos > 15 && p.pos / p.dur < 0.95 ? p.pos : 0;
  $("#p-title").textContent = item.title;
  $("#p-sub").textContent = item.subtitle || "";
  paintFavCh();
  renderInfo();
  setMediaSession(item);
  if (zap && item.live) showZap(item);
  showControls();
  loadAttempt(P.token);
  if (item.live) {
    addRecent(item.ch);
    const tok = P.token;
    ready().then(() => api("epg", { id: item.source.id })).then(e => {
      if (tok === P.token) { P.epg = e || []; renderInfo(); }
    }).catch(() => {});
  }
}

// The ways to play one link, best first. Live MPEG-TS (what most MAC providers send) has no
// native support on iPhone, so it goes through the built-in TS engine (TS → fMP4 → MediaSource).
// "…/123.mkv?token" · "…&extension=mkv" · "stream=123.mkv" → "mkv"
function fileExt(url) {
  const u = String(url || "");
  const m = u.match(/[?&]extension=([a-z0-9]{2,4})(?:&|$)/i) || u.split("?")[0].match(/\\.([a-z0-9]{2,4})$/i) || u.match(/[?&]stream=[^&]*\\.([a-z0-9]{2,4})(?:&|$)/i);
  return m ? m[1].toLowerCase() : "";
}
const NO_INAPP = ["avi", "wmv", "flv", "divx", "xvid", "mpg", "mpeg", "vob", "rmvb", "3gp"];
function buildCands(item, url) {
  const hls = toHLS(url);
  const ext = fileExt(url);
  const isHLS = ext === "m3u8" || /\\.m3u8(\\?|$)/i.test(url);
  const tsLike = !isHLS && (item.live || ext === "ts");
  const eng = tsLike && typeof TSEngine !== "undefined" && TSEngine.supported();
  const mkv = typeof MKVEngine !== "undefined" && MKVEngine.supported();
  let list;
  if (/^local:/.test(url)) return [{ k: "mkvr", u: url, local: true }];
  if (P.force) return [{ k: P.force, u: P.force === "hls" ? hls : url }];
  if (isHLS) list = [{ k: "native", u: url }];
  else if (!item.live && ext !== "ts") {
    // movies & series: pick by file type (MKV can't be opened by the web view itself)
    if (NO_INAPP.includes(ext)) list = [];
    else if (+S.settings.engine === 2 && mkv) list = ext === "mkv" ? [{ k: "mkv", u: url }, { k: "mkvr", u: url }] : [{ k: "mkv", u: url }, { k: "native", u: url }, { k: "mkvr", u: url }];
    else if (ext === "mkv") list = mkv ? [{ k: "mkv", u: url }, { k: "mkvr", u: url }] : [];
    else if (ext === "webm") list = (mkv ? [{ k: "mkv", u: url }] : []).concat([{ k: "native", u: url }]);
    else if (ext === "mp4" || ext === "m4v" || ext === "mov") list = [{ k: "native", u: url }].concat(mkv ? [{ k: "mkv", u: url }, { k: "mkvr", u: url }] : []);
    // links like movie.php / play?... hide the real file type: the engine reads the file itself and
    // knows MKV and MP4 (MKV is the usual case and the web view can't play it at all)
    else list = mkv ? [{ k: "mkv", u: url }, { k: "native", u: url }, { k: "mkvr", u: url }] : [{ k: "native", u: url }];
    const win = +S.settings.engine === 2 ? null : (S.vodWin || {})[ext || "?"];
    const i = win ? list.findIndex(c => c.k === win) : -1;
    if (i > 0) list.unshift(list.splice(i, 1)[0]);
    return list;
  }
  else if (S.settings.format === "original") list = [{ k: "native", u: url }].concat(eng ? [{ k: "engine", u: url }] : []);
  else {
    list = [];
    if (hls !== url) list.push({ k: "hls", u: hls });
    if (eng) list.push({ k: "engine", u: url });
    list.push({ k: "native", u: url });
  }
  if (item.live && +S.settings.engine === 2) { const i = list.findIndex(c => c.k === "engine"); if (i > 0) list.unshift(list.splice(i, 1)[0]); }
  else if (item.live && S.liveWin) {
    const i = list.findIndex(c => c.k === S.liveWin);
    if (i > 0) list.unshift(list.splice(i, 1)[0]);
  }
  return list;
}
const CAND_NAME = { hls: "HLS", engine: "TS", native: "أساسي", mkv: "MKV", mkvr: "MKV+" };
function useEngine(k) {
  if (!P.open) return;
  P.force = k; P.attempt = 0; P.retries = 0; P.drops = 0; P.why = [];
  toast("جارٍ التشغيل بـ" + ENGINE_INFO[k].name + "…");
  loadAttempt(P.token);
}
function engineNote(m) {
  if (m === "noseek") toast("التقديم غير متاح لهذا الملف من الخادم");
  else if (/^audio /.test(m)) toast("صوت هذا الملف (" + m.slice(6) + ") غير مدعوم داخل التطبيق — الصورة تعمل، وللصوت جرّب VLC");
}
// links prepared ahead (when a movie/series page opens) so «تشغيل» starts at once
const LINKC = new Map();
function prefetchLink(item) {
  if (!item || item.live) return;
  const k = JSON.stringify(item.source);
  const c = LINKC.get(k);
  if (c && (c.p || Date.now() - c.t < 40000)) return;
  const ent = { t: Date.now(), url: "", p: null };
  ent.p = ready().then(() => api("link", { source: item.source })).then(r => { ent.url = r.url; ent.t = Date.now(); ent.p = null; }).catch(() => { LINKC.delete(k); });
  LINKC.set(k, ent);
}
async function takeLink(item) {
  const k = JSON.stringify(item.source);
  const c = LINKC.get(k);
  LINKC.delete(k);
  if (c) {
    if (c.p) { try { await c.p; } catch (e) { /* ignore */ } }
    if (c.url && Date.now() - c.t < 45000) return c.url;
  }
  await ready();
  return (await api("link", { source: item.source }, true)).url;
}

async function loadAttempt(tok) {
  const item = P.items[P.index];
  const aid = ++P.aid;
  setState("loading");
  stopEngine();
  clearTimeout(P.stall);
  let url;
  try {
    url = item.local ? "local:" + item.local : P.attempt === 0 && !P.force && !item.live ? await takeLink(item) : (await ready(), (await api("link", { source: item.source }, true)).url);
  } catch (e) {
    if (tok === P.token && aid === P.aid) fail(e.message);
    return;
  }
  if (tok !== P.token || aid !== P.aid) return;
  P.url = url;
  P.cands = buildCands(item, url);
  if (!P.cands.length) {
    P.cur = null;
    fail("ملفات " + fileExt(url).toUpperCase() + " لا تعمل داخل الآيفون.\\nشغّله بتطبيق خارجي:");
    return;
  }
  const c = P.cands[Math.min(P.attempt, P.cands.length - 1)];
  P.cur = c;
  P.played = false;
  P.engMsg = "";
  video.style.objectFit = ASPECTS[P.aspect][0];
  P.engLog = null;
  P.vErr = "";
  if (c.k === "engine" || c.k === "mkv" || c.k === "mkvr") {
    const t0 = Date.now();
    P.eng = (c.k === "engine" ? TSEngine : MKVEngine).play(video, c.u, {
      relay: c.k === "mkvr" ? (c.local ? LOCAL : RELAY) : (IN_APP && c.k === "mkv" ? RELAY : null),
      prefs: { audioLang: S.settings.audioLang || "", audioNum: P.audioPick || 0, ahead: +S.settings.buffer || 60 },
      tracks: x => { if (tok === P.token && aid === P.aid) { P.tracks = x; SUB.track = pickSubTrack(x.subs); if (SUB.track) toast("الترجمة: " + (LANG_NAME[(x.subs.find(s => s.num === SUB.track) || {}).lang] || "مفعّلة")); } },
      cue: q => { if (tok === P.token) addCue(q); },
      error: m => { if (tok === P.token && aid === P.aid) { P.engMsg = m; keepEngLog(); P.eng = null; onFail(aid); } },
      blocked: () => { if (tok === P.token && aid === P.aid) setState("tap"); },
      note: m => { if (tok === P.token && aid === P.aid) engineNote(m); }
    });
    // watchdog: say *why* instead of waiting blindly
    const dog = setInterval(() => {
      if (tok !== P.token || aid !== P.aid || !P.eng || P.state !== "loading") { clearInterval(dog); return; }
      const st = P.eng.stats ? P.eng.stats() : null;
      if (!st) return;
      const el = Date.now() - t0;
      const lab = $("#pstate .lab");
      if (lab) lab.textContent = ENGINE_INFO[c.k].name + " · " + (st.bytes ? (st.bytes / 1048576).toFixed(1) + " م.ب" : "جارٍ الاتصال…") + (st.initDone ? " · جاهز" : "");
      let why = "";
      if (!st.bytes && el > (c.k === "mkvr" ? 20000 : 10000)) why = "nodata";
      else if (!st.initDone && el > 22000) why = st.opened ? "noinit" : "nosourceopen";
      else if (st.initDone && el > 30000) why = "stuck " + st.buffered;
      if (why) { clearInterval(dog); P.engMsg = why; keepEngLog(); onFail(aid); }
    }, 1000);
  } else {
    video.src = c.u;
    const pr = video.play();
    if (pr && pr.catch) pr.catch(err => {
      if (tok !== P.token || aid !== P.aid) return;
      if (err && err.name === "NotAllowedError") setState("tap");
    });
  }
  if (c.k !== "mkv" && c.k !== "mkvr" && c.k !== "engine") P.stall = setTimeout(() => { if (tok === P.token && aid === P.aid && P.state === "loading") { P.slow = true; onFail(aid); } }, item.live ? 12000 : 18000);
  else if (item.live) P.stall = setTimeout(() => { if (tok === P.token && aid === P.aid && P.state === "loading") { P.slow = true; P.engMsg = P.engMsg || "slow"; keepEngLog(); onFail(aid); } }, 20000);
}

function keepEngLog() {
  try { if (P.eng && P.eng.stats) P.engLog = P.eng.stats().log; } catch (e) { /* ignore */ }
}
const REASON = { fetch: "الخادم يمنع التشغيل داخل التطبيق", relay: "تعذّر التحميل عبر Scriptable", norelay: "الخادم لا يدعم التحميل المجزّأ", nodata: "لا تصل بيانات من الخادم", nosourceopen: "الآيفون لم يفتح المحرك", noinit: "الملف لم يُقرأ",
  notmkv: "ليس ملف MKV", notts: "ليس بث TS", hevc: "صيغة HEVC", read: "انقطع التحميل", slow: "بطيء جداً", sourcebuffer: "الآيفون رفض الصورة" };
const reasonText = m => { const k = String(m || "").split(" ")[0]; return REASON[k] ? REASON[k] + (/\\d/.test(m) && k === "sourcebuffer" ? " (" + m.split(" ")[1] + ")" : "") : m; };
function onFail(aid) {
  if (!P.open) return;
  if (aid != null && aid !== P.aid) return;
  if (P.eng && !P.engLog) keepEngLog();
  if (!P.engMsg && video.error) P.vErr = "خطأ " + video.error.code;
  P.aid++; // one failure per attempt
  const tok = P.token;
  const item = P.items[P.index];
  clearTimeout(P.stall);
  stopEngine();
  if (P.cur) P.why.push(CAND_NAME[P.cur.k] + (P.engMsg ? ": " + reasonText(P.engMsg) : P.vErr ? ": " + P.vErr : ""));
  if (P.cur) { P.tries = (P.tries || []).slice(-7); P.tries.push({ k: P.cur.k, why: P.engMsg || P.vErr || "", ext: fileExt(P.url), log: (P.engLog || []).slice(-5) }); }
  if (P.engLog) { P.lastLog = P.engLog; api("diag", { s: "play " + P.cur.k + " " + (P.engMsg || P.vErr) + " | " + P.engLog.slice(-6).join(" | ") }).catch(() => {}); }
  // a live stream that was already playing and dropped: reconnect the same way, quietly
  if (P.played && item.live && S.settings.retry !== false) {
    if (Date.now() - P.playStart > 60000) P.drops = 0;
    if (P.drops < 4) { P.drops++; P.why = []; loadAttempt(tok); return; }
  }
  // the Scriptable relay only helps when the browser itself couldn't reach the file
  const netFail = P.why.some(w => /الخادم يمنع|لا تصل بيانات|انقطع التحميل|^MKV: http|^MKV: abort/.test(w));
  if (P.attempt + 1 < P.cands.length) {
    P.attempt++;
    const nx = P.cands[P.attempt];
    if (nx && nx.k === "mkvr" && !netFail) {
      if (P.attempt + 1 < P.cands.length) P.attempt++;
      else return fail("هذا الفيديو لم يعمل تلقائياً.\\nجرّب محركاً آخر داخل التطبيق أو تطبيقاً خارجياً:");
    }
    loadAttempt(tok);
    return;
  }
  // a second round only helps a slow/stuck network; clear refusals go straight to the player choice
  if (item.live && P.slow && P.retries < 1 && S.settings.retry !== false) { P.retries++; P.attempt = 0; P.slow = false; toast("إعادة المحاولة…"); loadAttempt(tok); return; }
  fail(P.force ? ENGINE_INFO[P.force].name + " لم يستطع تشغيله.\\nجرّب محركاً آخر:" : item.live ? "هذه القناة لم تعمل تلقائياً.\\nجرّب محركاً آخر داخل التطبيق أو تطبيقاً خارجياً:" : "هذا الفيديو لم يعمل تلقائياً.\\nجرّب محركاً آخر داخل التطبيق أو تطبيقاً خارجياً:");
}

function fail(msg) {
  clearTimeout(P.stall);
  P.errorMsg = msg;
  setState("error");
}

function setState(st) {
  P.state = st;
  const box = $("#pstate");
  const item = P.items[P.index] || {};
  if (st === "loading") box.innerHTML = '<div class="ring"></div><div class="lab"></div>';
  else if (st === "tap") box.innerHTML = '<div class="acts"><button class="cb xl" data-p="play">' + icon("play", 36) + "</button></div>";
  else if (st === "error") {
    const engs = enginesFor(item);
    box.innerHTML = '<div style="color:var(--gold)">' + icon("alert", 34) + '</div><div class="msg">' + esc(P.errorMsg) + "</div>" +
      '<div class="xsec">داخل التطبيق</div><div class="xpl">' + engs.map((k, i) => { const e = ENGINE_INFO[k];
        return '<button class="press" style="--i:' + i + '" data-p="eng" data-id="' + k + '">' + pIcon(e) + "<span>" + esc(e.name) + "</span></button>"; }).join("") +
        '<button class="press" style="--i:' + engs.length + '" data-p="ext" data-id="system">' + pIcon(PLAYER.system) + "<span>مشغّل النظام</span></button></div>" +
      '<div class="xsec">تطبيقات خارجية</div><div class="xpl mini">' + PLAYERS.filter(p => !p.inapp && p.id !== "app").map((p, i) =>
        '<button class="press" style="--i:' + i + '" data-p="ext" data-id="' + p.id + '">' + pIcon(p) + "<span>" + esc(p.name) + "</span></button>").join("") + "</div>" +
      '<div class="acts"><button data-p="retry">' + icon("refresh", 16) + "إعادة المحاولة</button>" +
      (item.live && P.items.length > 1 ? '<button data-p="next">' + icon("next", 16) + "القناة التالية</button>" : "") + "</div>" +
      (P.why.length ? '<button class="why" data-p="diag">' + esc(P.why.join(" · ")) + (P.lastLog ? " ⓘ" : "") + "</button>" : "") +
      '<div class="acts"><button data-p="selftest">' + icon("info", 16) + "افحص السبب</button></div>" +
      (P.lastLog ? '<pre class="plog hidden" id="plog">' + esc(P.lastLog.slice(-14).join("\\n")) + "</pre>" : "");
    showControls(true);
  } else box.innerHTML = "";
  renderMid();
}

function renderMid() {
  const item = P.items[P.index];
  if (!item) return;
  const playing = P.state === "playing" || P.state === "buffering";
  const hide = P.state === "loading" || P.state === "error" || P.state === "tap";
  let h = "";
  if (item.live) h += P.items.length > 1 ? '<button class="cb l" data-p="prev">' + icon("prev", 24) + "</button>" : "";
  else h += '<button class="cb l skipb" data-p="back">' + icon("back10", 24) + "<i>" + (+S.settings.skip || 10) + "</i></button>";
  h += '<button class="cb xl" data-p="toggle" style="visibility:' + (hide ? "hidden" : "visible") + '">' + icon(playing ? "pause" : "play", 36) + "</button>";
  if (item.live) h += P.items.length > 1 ? '<button class="cb l" data-p="next">' + icon("next", 24) + "</button>" : "";
  else h += '<button class="cb l skipb" data-p="fwd">' + icon("fwd10", 24) + "<i>" + (+S.settings.skip || 10) + "</i></button>";
  $("#pmid").innerHTML = h;
  $("#pmid").style.visibility = P.state === "error" ? "hidden" : "visible";
}

function renderInfo() {
  const item = P.items[P.index];
  if (!item) return;
  if (item.live) {
    const now = Date.now() / 1000;
    const cur = P.epg.find(e => e.start <= now && e.end > now);
    const nxt = P.epg.find(e => e.start > now);
    if (cur) $("#p-sub").textContent = cur.title;
    let epg = '<span class="pgroup">' + esc(item.subtitle) + "</span>";
    if (cur) {
      const prog = Math.min(100, Math.max(0, (now - cur.start) / (cur.end - cur.start) * 100));
      epg = '<div class="pepg"><div class="r1"><span>' + esc(cur.title) + '</span><span class="tm">' + hhmm(cur.start) + " - " + hhmm(cur.end) + "</span></div>" +
        '<div class="bar"><i style="width:' + prog.toFixed(1) + '%"></i></div>' + (nxt ? '<div class="nx">التالي: ' + esc(nxt.title) + " · " + hhmm(nxt.start) + "</div>" : "") + "</div>";
    }
    $("#pinfo").innerHTML = '<div class="plive"><span class="lbadge"><i></i>مباشر</span>' + epg + "</div>";
    $("#pnext").innerHTML = item.ch ? '<button class="chipbtn" data-p="guide">' + icon("clock", 15) + (item.ch.archive ? "الدليل والأرشيف" : "دليل البرامج") + "</button>" : "";
    return;
  }
  $("#pinfo").innerHTML = '<div class="pvod"><span class="t" id="p-cur">0:00</span><input type="range" id="p-seek" min="0" max="1000" value="0"><span class="t" id="p-dur">0:00</span></div>';
  $("#pnext").innerHTML = P.index + 1 < P.items.length ? '<button class="chipbtn" data-p="next">' + icon("next", 15) + "الحلقة التالية</button>" : "";
  const seek = $("#p-seek");
  seek.addEventListener("input", () => {
    P.scrubbing = true;
    showControls();
    $("#p-cur").textContent = fmtTime(seek.value / 1000 * (video.duration || 0));
    paintSeek();
  });
  seek.addEventListener("change", () => {
    if (isFinite(video.duration) && video.duration > 0) video.currentTime = seek.value / 1000 * video.duration;
    P.scrubbing = false;
  });
}

function paintSeek() {
  const s = $("#p-seek");
  if (!s) return;
  const pct = s.value / 10;
  const ac = getComputedStyle(document.documentElement).getPropertyValue(document.documentElement.classList.contains("skin-mf") ? "--a2" : "--a1").trim() || "#7b5cff";
  s.style.background = "linear-gradient(90deg," + ac + " " + pct + "%,rgba(255,255,255,.25) " + pct + "%)";
}

function updateProgress() {
  const item = P.items[P.index];
  if (!item || item.live || P.scrubbing) return;
  const s = $("#p-seek");
  if (!s) return;
  const d = video.duration;
  $("#p-cur").textContent = fmtTime(video.currentTime);
  $("#p-dur").textContent = isFinite(d) ? fmtTime(d) : "--:--";
  s.value = isFinite(d) && d > 0 ? Math.round(video.currentTime / d * 1000) : 0;
  paintSeek();
}

let lastSave = 0;
function savePos(force) {
  const item = P.items[P.index];
  if (!P.open || !item || item.live || !item.meta) return;
  const d = video.duration, t = video.currentTime;
  if (!isFinite(d) || d <= 0 || !(t > 0)) return;
  if (!force && Date.now() - lastSave < 8000) return;
  lastSave = Date.now();
  const it = ITEMS.get(item.meta.kind + ":" + item.meta.id);
  S.progress[item.key] = { key: item.key, kind: item.meta.kind, id: item.meta.id, ep: item.meta.ep, title: item.title, poster: item.poster,
    source: item.source, item: it || null, subtitle: item.subtitle, pos: t, dur: d, ts: Date.now() };
  const keys = Object.keys(S.progress).sort((a, b) => S.progress[b].ts - S.progress[a].ts);
  keys.slice(50).forEach(k => delete S.progress[k]);
  saveProgress();
}

function addRecent(c) {
  if (!c) return;
  const list = (S.store[pk("recentCh")] || []).filter(x => x !== c.id);
  list.unshift(c.id);
  S.store[pk("recentCh")] = list.slice(0, 20);
  persist(pk("recentCh"), S.store[pk("recentCh")]);
}

function paintFavCh() {
  const item = P.items[P.index];
  const b = $("#p-fav");
  b.classList.toggle("hidden", !item || !item.live);
  if (!item || !item.live) return;
  const on = S.favCh.some(f => f.id === item.ch.id);
  b.innerHTML = icon(on ? "heartf" : "heart", 20);
  b.style.color = on ? "var(--live)" : "#fff";
}

function toggleFavCh() {
  const item = P.items[P.index];
  if (!item || !item.live) return;
  const c = item.ch;
  const i = S.favCh.findIndex(f => f.id === c.id);
  if (i >= 0) S.favCh.splice(i, 1);
  else S.favCh.unshift({ id: c.id, name: c.name, number: c.number, cmd: c.cmd, logo: c.logo, genre: c.genre, archive: c.archive });
  persist(pk("favCh"), S.favCh);
  paintFavCh();
  const b = $("#p-fav");
  b.classList.remove("pop"); void b.offsetWidth; b.classList.add("pop");
  toast(i < 0 ? "أُضيفت القناة إلى المفضلة" : "أُزيلت من المفضلة");
  renderLiveRail();
  showControls();
}

function showZap(item) {
  const z = $("#zap");
  z.innerHTML = '<div class="lg">' + (item.logo ? '<img src="' + esc(item.logo) + '" onerror="' + imgErr + '">' : "") + "</div><b>" + esc(item.title) + "</b>";
  z.classList.remove("show");
  void z.offsetWidth;
  z.classList.add("show");
  clearTimeout(showZap.t);
  showZap.t = setTimeout(() => z.classList.remove("show"), 2200);
}

function showControls(stay) {
  $("#pctl").classList.remove("off");
  clearTimeout(P.hide);
  if (stay) return;
  P.hide = setTimeout(() => {
    if (P.state === "playing" && !P.scrubbing && !$("#plist").classList.contains("open")) $("#pctl").classList.add("off");
  }, 4000);
}

function toggleControls() {
  const c = $("#pctl");
  if (c.classList.contains("off")) showControls(); else { c.classList.add("off"); clearTimeout(P.hide); }
}

function openList() {
  const body = $("#plist-body");
  body.innerHTML = P.items.map((it, i) =>
    '<div class="pli' + (i === P.index ? " on" : "") + '" data-p="pick" data-i="' + i + '">' +
      (it.live ? '<div class="lg">' + esc(initials(it.title)) + (it.logo ? '<img loading="lazy" src="' + esc(it.logo) + '" onerror="' + imgErr + '">' : "") + "</div>" : '<div class="lg">' + (i + 1) + "</div>") +
      '<div class="t">' + esc(it.live ? it.title : (it.subtitle || it.title)) + "</div></div>").join("");
  $("#plist").classList.add("open");
  showControls(true);
  const on = body.querySelector(".pli.on");
  if (on) on.scrollIntoView({ block: "center" });
}

function playerAction(a, el) {
  const item = P.items[P.index];
  switch (a) {
    case "close": closePlayer(); break;
    case "lock": setLock(true); break;
    case "enh": setEnhance((+S.settings.enhance || 0) ? 0 : (+S.settings.enhLast || 2)); break;
    case "unlock": setLock(false); break;
    case "upnext-go": $("#pnextup").classList.remove("show"); if (P.index + 1 < P.items.length) { P.index++; playCurrent(false); } break;
    case "upnext-x": UPN.cancelled = P.token; $("#pnextup").classList.remove("show"); break;
    case "guide": if (item && item.ch) openGuide(item.ch); break;
    case "toggle": if (video.paused) video.play().catch(() => {}); else video.pause(); showControls(); break;
    case "play": video.play().catch(() => {}); break;
    case "next": if (P.items.length > 1) { P.index = (P.index + 1) % P.items.length; playCurrent(true); } break;
    case "prev": if (P.items.length > 1) { P.index = (P.index - 1 + P.items.length) % P.items.length; playCurrent(true); } break;
    case "back": video.currentTime = Math.max(0, video.currentTime - (+S.settings.skip || 10)); showControls(); break;
    case "fwd": video.currentTime = video.currentTime + (+S.settings.skip || 10); showControls(); break;
    case "media": openMedia(); break;
    case "pprefs": openPlayerPrefs(); break;
    case "aspect":
      P.aspect = (P.aspect + 1) % ASPECTS.length;
      video.style.objectFit = ASPECTS[P.aspect][0];
      if (ENH.on) enhDraw();
      toast(ASPECTS[P.aspect][1]);
      showControls();
      break;
    case "pip": togglePiP(); break;
    case "full":
      try { if (video.webkitEnterFullscreen) video.webkitEnterFullscreen(); else if (video.requestFullscreen) video.requestFullscreen(); }
      catch (e) { toast("ابدأ التشغيل أولاً"); }
      break;
    case "list": openList(); break;
    case "list-close": $("#plist").classList.remove("open"); showControls(); break;
    case "pick": $("#plist").classList.remove("open"); P.index = +el.dataset.i; playCurrent(true); break;
    case "ext": launchExternal(el.dataset.id, item); break;
    case "eng": useEngine(el.dataset.id); break;
    case "selftest": { const it = P.items[P.index] || {}; const ctx = { live: !!it.live, tries: (P.tries || []).slice(), ch: it.ch }; closePlayer(); runSelfTest(it.source ? "" : P.url, it.title, it.source, ctx); break; }
    case "diag": { const l = $("#plog"); if (l) l.classList.toggle("hidden"); break; }
    case "players": openChooser(P.items, P.index, "play"); break;
    case "retry": P.retries = 0; P.attempt = 0; P.drops = 0; P.why = []; loadAttempt(P.token); break;
    case "favch": toggleFavCh(); break;
  }
}

video.addEventListener("playing", () => {
  clearTimeout(P.stall);
  if (+S.settings.enhance) setTimeout(enhSync, 50);
  if (video.playbackRate !== ((P.items[P.index] || {}).live ? 1 : (P.rate || 1))) applySpeed();
  subLoop();
  P.retries = 0;
  if (!P.played) {
    P.played = true;
    P.playStart = Date.now();
    const item = P.items[P.index];
    // remember what works for this provider so the next channel starts with it
    if (item && item.live && P.cur && S.liveWin !== P.cur.k) { S.liveWin = P.cur.k; persist(pk("liveWin"), P.cur.k); }
    if (item && !item.live && P.cur) {
      const ext = fileExt(P.url) || "?";
      S.vodWin = S.vodWin || {};
      if (S.vodWin[ext] !== P.cur.k) { S.vodWin[ext] = P.cur.k; persist(pk("vodWin"), S.vodWin); }
    }
  }
  setState("playing");
  showControls();
});
video.addEventListener("loadedmetadata", () => {
  if (P.cur && P.cur.k === "native") setTimeout(nativeTracks, 300);
  if (P.resumeAt && isFinite(video.duration) && P.resumeAt < video.duration - 20) {
    try { video.currentTime = P.resumeAt; toast("متابعة من " + fmtTime(P.resumeAt)); } catch (e) { /* ignore */ }
  }
  P.resumeAt = 0;
});
video.addEventListener("waiting", () => { if (P.state === "playing") setState("buffering"); });
video.addEventListener("pause", () => { if (P.state === "playing" || P.state === "buffering") { setState("paused"); showControls(true); savePos(true); } });
video.addEventListener("error", () => { if (P.open && video.getAttribute("src") && video.error) onFail(P.aid); });
video.addEventListener("timeupdate", () => { updateProgress(); savePos(false); checkUpNext(); });
video.addEventListener("durationchange", updateProgress);
video.addEventListener("ended", () => {
  const item = P.items[P.index];
  if (!item) return;
  if (item.live) { onFail(P.aid); return; }
  savePos(true);
  if (S.progress[item.key]) { S.progress[item.key].pos = S.progress[item.key].dur; saveProgress(); }
  $("#pnextup").classList.remove("show");
  if (SLEEP.end) { sleepNow(); return; }
  if (P.index + 1 < P.items.length && S.settings.autoNext !== false && UPN.cancelled !== P.token) { P.index++; toast("الحلقة التالية"); playCurrent(false); }
  else { setState("paused"); showControls(true); }
});
initGestures();
// cinematic theme: the floating bar turns solid once the picture has scrolled away
$("#home-scroll").addEventListener("scroll", e => { const tb = $("#pg-home .topbar"); if (tb) tb.classList.toggle("solid", e.target.scrollTop > 60); }, { passive: true });
setInterval(() => { const it = P.items[P.index]; if (P.open && it && it.live && P.epg.length) renderInfo(); }, 30000);

/* ================= player extras: gestures, speed, sleep timer, next episode, lock ================= */
const GX = { lastTap: 0, side: "", combo: 0, tapT: null, sx: 0, sy: 0, mode: "", t0: 0, target: 0, quiet: 0, hideT: null };
const canSeekNow = () => { const it = P.items[P.index]; return !!(it && !it.live && isFinite(video.duration) && video.duration > 0); };
function gestBubble(side, text) {
  const g = $("#pgest");
  g.className = "show " + side;
  g.innerHTML = "<div><b>" + esc(text) + "</b></div>";
  clearTimeout(GX.hideT);
  GX.hideT = setTimeout(() => { g.className = ""; }, 650);
}
function seekBy(d) {
  if (!canSeekNow()) return;
  try { video.currentTime = Math.max(0, Math.min(video.duration - 0.5, video.currentTime + d)); } catch (e) { /* ignore */ }
  updateProgress();
}
function onPlayerTap(e) {
  if (Date.now() - GX.quiet < 450) return;
  if (P.locked) { lockHint(); return; }
  const w = $("#ptap").clientWidth || 1, x = e.clientX, now = Date.now();
  const side = x > w * 0.62 ? "r" : x < w * 0.38 ? "l" : "";
  const step = +S.settings.skip || 10;
  if (side && canSeekNow() && now - GX.lastTap < 340 && GX.side === side) {
    // double tap (and more): skip, like YouTube; the second tap no longer toggles the controls
    clearTimeout(GX.tapT);
    GX.combo += step;
    seekBy(side === "r" ? step : -step);
    gestBubble(side, (side === "r" ? "+" : "−") + GX.combo + " ث");
    GX.lastTap = now;
    return;
  }
  GX.lastTap = now; GX.side = side; GX.combo = 0;
  clearTimeout(GX.tapT);
  if (side && canSeekNow()) GX.tapT = setTimeout(toggleControls, 340); else toggleControls();
}
function initGestures() {
  const el = $("#ptap");
  el.addEventListener("click", onPlayerTap);
  el.addEventListener("touchstart", e => {
    const t = e.touches[0];
    GX.sx = t.clientX; GX.sy = t.clientY; GX.mode = ""; GX.t0 = video.currentTime;
  }, { passive: true });
  el.addEventListener("touchmove", e => {
    if (P.locked || e.touches.length !== 1) return;
    const t = e.touches[0], dx = t.clientX - GX.sx, dy = t.clientY - GX.sy;
    const it = P.items[P.index] || {};
    if (!GX.mode) {
      if (Math.abs(dx) > 28 && Math.abs(dx) > Math.abs(dy) * 1.4 && canSeekNow()) GX.mode = "scrub";
      else if (Math.abs(dy) > 46 && Math.abs(dy) > Math.abs(dx) * 1.4 && it.live && P.items.length > 1) GX.mode = "zap";
    }
    if (GX.mode === "scrub") {
      // a full swipe across the screen moves up to 3 minutes (or the whole film if it's shorter)
      const span = Math.min(video.duration, 180);
      GX.target = Math.max(0, Math.min(video.duration - 0.5, GX.t0 + dx / (el.clientWidth || 1) * span));
      const d = Math.round(GX.target - GX.t0);
      gestBubble("c", fmtTime(GX.target) + "  (" + (d >= 0 ? "+" : "−") + Math.abs(d) + " ث)");
    }
  }, { passive: true });
  el.addEventListener("touchend", e => {
    if (!GX.mode) return;
    GX.quiet = Date.now();
    const t = e.changedTouches[0], dy = t.clientY - GX.sy;
    if (GX.mode === "scrub") { try { video.currentTime = GX.target; } catch (x) { /* ignore */ } updateProgress(); }
    else if (GX.mode === "zap") playerAction(dy < 0 ? "next" : "prev");
    GX.mode = "";
  }, { passive: true });
}

// playback speed (films and episodes only)
const SPEEDS = [0.75, 1, 1.25, 1.5, 2];
function applySpeed() {
  const it = P.items[P.index] || {};
  const r = it.live ? 1 : (P.rate || 1);
  try { video.defaultPlaybackRate = r; video.playbackRate = r; } catch (e) { /* ignore */ }
}

// sleep timer
const SLEEP = { at: 0, end: false, timer: null };
function setSleep(min) {
  clearInterval(SLEEP.timer);
  SLEEP.at = 0; SLEEP.end = false;
  if (min === "end") { SLEEP.end = true; toast("سيتوقف التشغيل بنهاية هذه الحلقة"); }
  else if (+min > 0) {
    SLEEP.at = Date.now() + min * 60000; SLEEP.min = String(min);
    SLEEP.timer = setInterval(() => { if (SLEEP.at && Date.now() >= SLEEP.at) sleepNow(); }, 5000);
    toast("مؤقت النوم: " + min + " دقيقة");
  } else toast("أُلغي مؤقت النوم");
  paintSleep();
}
function sleepNow() {
  clearInterval(SLEEP.timer);
  SLEEP.at = 0; SLEEP.end = false;
  paintSleep();
  try { video.pause(); } catch (e) { /* ignore */ }
  if (P.open) closePlayer();
  toast("انتهى مؤقت النوم — تصبح على خير 🌙");
}
function sleepLeft() { return SLEEP.end ? "نهاية الحلقة" : SLEEP.at ? Math.max(1, Math.round((SLEEP.at - Date.now()) / 60000)) + " د" : ""; }
function paintSleep() { const b = $("#p-sleep"); if (b) { b.textContent = sleepLeft() ? "🌙 " + sleepLeft() : ""; b.classList.toggle("hidden", !sleepLeft()); } }
setInterval(paintSleep, 30000);

// "next episode" card in the last seconds
const UPN = { shownFor: -1, cancelled: -1 };
function checkUpNext() {
  const it = P.items[P.index];
  const box = $("#pnextup");
  const has = it && !it.live && P.index + 1 < P.items.length && S.settings.autoNext !== false && !SLEEP.end;
  const left = video.duration - video.currentTime;
  const win = Math.min(20, video.duration * 0.2);
  if (!has || !isFinite(left) || video.duration < 30 || left > win || UPN.cancelled === P.token || P.state === "error") {
    if (box.classList.contains("show") && UPN.shownFor === P.token && (left > win + 2 || !has)) box.classList.remove("show");
    return;
  }
  const nx = P.items[P.index + 1];
  const txt = "الحلقة التالية خلال " + Math.max(0, Math.ceil(left)) + " ث";
  if (UPN.shownFor !== P.token || !box.querySelector(".nt small")) {
    box.innerHTML = '<div class="nt"><small></small><b>' + esc(nx.subtitle || nx.title) + "</b></div>" +
      '<button class="press go" data-p="upnext-go">' + icon("play", 16) + "شغّل الآن</button>" +
      '<button class="press x" data-p="upnext-x">' + icon("x", 15) + "</button>";
    UPN.shownFor = P.token;
    box.classList.add("show");
  }
  const sm = box.querySelector(".nt small");
  if (sm.textContent !== txt) sm.textContent = txt;
}

// screen lock (no accidental touches while watching)
function setLock(on) {
  P.locked = !!on;
  $("#player").classList.toggle("locked", P.locked);
  if (P.locked) { $("#pctl").classList.add("off"); clearTimeout(P.hide); lockHint(); toast("قُفلت الشاشة 🔒"); }
  else { showControls(); toast("فُتح القفل"); }
}
function lockHint() {
  const b = $("#plockui");
  b.classList.add("show");
  clearTimeout(lockHint.t);
  lockHint.t = setTimeout(() => b.classList.remove("show"), 2600);
}

/* ================= TV guide + catch-up (أرشيف) ================= */
const GUIDE = { ch: null, day: 0, list: [], loading: false, err: "" };
const dayStr = off => { const d = new Date(Date.now() - off * 86400000); return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); };
const dayName = off => off === 0 ? "اليوم" : off === 1 ? "أمس" : ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"][new Date(Date.now() - off * 86400000).getDay()];
function openGuide(ch) {
  if (!ch) return;
  GUIDE.ch = ch; GUIDE.day = 0;
  CH.mode = "guide";
  $("#chooser .cbody").classList.add("tall");
  $("#chooser").classList.add("open");
  loadGuide();
}
async function loadGuide() {
  const ch = GUIDE.ch, day = GUIDE.day, tok = (GUIDE.tok = (GUIDE.tok || 0) + 1);
  GUIDE.loading = true; GUIDE.err = ""; GUIDE.list = [];
  renderGuide();
  try {
    await ready();
    const r = await api("guide", { id: ch.id, date: dayStr(day) }, true);
    if (tok !== GUIDE.tok) return;
    GUIDE.list = r || [];
    if (!GUIDE.list.length && day === 0 && P.epg.length) GUIDE.list = P.epg;
  } catch (e) { if (tok === GUIDE.tok) GUIDE.err = e.message; }
  if (tok !== GUIDE.tok) return;
  GUIDE.loading = false;
  renderGuide();
}
function renderGuide() {
  if (CH.mode !== "guide") return;
  const ch = GUIDE.ch, now = Date.now() / 1000;
  const days = ch.archive ? [0, 1, 2, 3, 4, 5, 6] : [0];
  let h = '<div class="grab"></div><h3>' + (ch.archive ? "الدليل والأرشيف" : "دليل البرامج") + '</h3><p class="ps">' + esc(ch.name) + "</p>";
  if (days.length > 1) h += '<div class="gdays">' + days.map(d => '<button class="chip' + (d === GUIDE.day ? " on" : "") + '" data-act="g-day" data-id="' + d + '">' + dayName(d) + "</button>").join("") + "</div>";
  h += '<div class="slist glist">';
  if (GUIDE.loading) h += '<div class="loader"><div class="spin"></div></div>';
  else if (!GUIDE.list.length) h += '<p class="note">' + (GUIDE.err ? esc(GUIDE.err) : "لا يوجد جدول برامج لهذه القناة في هذا اليوم.") + "</p>";
  else h += GUIDE.list.map((e, i) => {
    const live = e.start <= now && e.end > now, past = e.end <= now;
    const can = ch.archive && past && e.id && e.arc !== false;
    return '<button class="gp' + (live ? " now" : "") + (past ? " past" : "") + (can ? " arc" : "") + '"' + (can ? ' data-act="g-play" data-i="' + i + '"' : live ? ' data-act="g-live"' : "") + ">" +
      '<span class="tm">' + hhmm(e.start) + "</span><span class=\\"t\\">" + esc(e.title) + (live ? '<i class="lb">الآن</i>' : "") + "</span>" +
      (can ? '<span class="pl">' + icon("play", 14) + "</span>" : "") + "</button>";
  }).join("");
  h += "</div>";
  $("#chooser .cbody").innerHTML = h;
  const on = $("#chooser .gp.now");
  if (on) on.scrollIntoView({ block: "center" });
}
function playArchive(i) {
  const e = GUIDE.list[i], ch = GUIDE.ch;
  if (!e || !ch) return;
  closeChooser();
  const item = { key: "arc:" + ch.id + ":" + e.id, live: false, archive: true, title: e.title, subtitle: ch.name + " · " + dayName(GUIDE.day) + " " + hhmm(e.start),
    logo: ch.logo, poster: ch.logo, source: { type: "archive", prog: e.id, ch: ch.id, cmd: ch.cmd } };
  playInApp([item], 0);
}

/* ================= parental lock (محتوى الكبار) ================= */
const ADULT = /\\b(adults?|xxx|porn\\w*|erotic\\w*|sexy?|playboy|hustler)\\b|18\\s*\\+|\\+\\s*18|للكبار|الكبار|كبار فقط|بالغين|إباحي|اباحي/i;
const lockOn = () => !!S.settings.pin && !S.unlocked;

/* ----- Arabic content first: «عربي ومترجم» shows Arabic channels, Arabic + subtitled films and series ----- */
const AR_LET = /[\\u0600-\\u06FF]/;
const AR_TOK = new Set(["ar", "ara", "arab", "arabe", "arabic", "arabia", "arabian", "ksa", "saudi", "uae", "ae", "emirates", "egypt", "eg", "kuwait", "kw", "qatar", "qa",
  "iraq", "iq", "syria", "sy", "lebanon", "lb", "jordan", "jo", "morocco", "maroc", "ma", "algeria", "dz", "tunisia", "tn", "libya", "ly", "oman", "om", "bahrain", "bh",
  "yemen", "ye", "sudan", "sd", "palestine", "ps", "gulf", "khaleeji", "mena", "vostar"]);
const AR_NET = /\\b(mbc|rotana|osn|shahid|bein|ssc|alkass|al ?kass|al ?jazeera|al ?arabiya|nilesat|dubai|abu ?dhabi|sharjah|lbc|dmc|nile ?(tv|drama|cinema|comedy|sport))\\b/i;
const FOREIGN = new Set(["fr", "tr", "de", "uk", "us", "usa", "en", "es", "it", "nl", "pt", "pl", "ru", "ir", "fa", "ger", "fra", "tur", "eng", "latino", "french", "turkish", "german", "english"]);
const SUB_TOK = /^(sub|subs|subbed|subtitle|subtitles|translated|vostar)$/;
// "ar" = Arabic, "sub" = foreign with Arabic subtitles, "" = other languages
function langOf(title) {
  const t = String(title || "");
  if (AR_LET.test(t)) return /مترجم|ترجمة/.test(t) ? "sub" : "ar";
  const toks = t.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
  if (toks.some(x => AR_TOK.has(x))) return toks.some(x => SUB_TOK.test(x)) ? "sub" : "ar";
  if (AR_NET.test(t) && !toks.some(x => FOREIGN.has(x))) return "ar";
  return "";
}
const arOn = () => S.settings.content !== "all";
const arChannel = c => (S.arGenres && S.arGenres.has(c.genre)) || !!langOf(c.name);
// Arabic first, then subtitled, keeping the portal's own order inside each group
const arSort = list => list.map((x, i) => ({ x, i, k: langOf(x.title) === "ar" ? 0 : 1 })).sort((a, b) => a.k - b.k || a.i - b.i).map(o => o.x);
const liveCut = () => arOn() && !!(S.langAvail && S.langAvail.live);

function applyLock() {
  const rawG = S.rawGenres || S.genres || [], rawC = S.rawCats || S.cats || { movies: [], series: [] }, rawCh = S.rawChannels || S.channels || [];
  S.rawGenres = rawG; S.rawCats = rawC; S.rawChannels = rawCh;
  S.lockedGenres = new Set(rawG.filter(g => ADULT.test(g.title || "")).map(g => g.id));
  // which sections are Arabic / subtitled; filtering only applies where the portal also has other languages
  const real = l => (l || []).filter(x => x.id !== "*");
  const arG = real(rawG).filter(g => langOf(g.title));
  S.arGenres = new Set(arG.map(g => g.id));
  const arM = real(rawC.movies).filter(x => langOf(x.title)), arS = real(rawC.series).filter(x => langOf(x.title));
  S.langAvail = { live: arG.length > 0 && arG.length < real(rawG).length, movies: arM.length > 0 && arM.length < real(rawC.movies).length, series: arS.length > 0 && arS.length < real(rawC.series).length };
  let g = rawG, c = rawC, ch = rawCh;
  if (arOn()) {
    if (S.langAvail.live) { g = rawG.filter(x => x.id === "*").concat(arSort(arG)); ch = rawCh.filter(arChannel); }
    c = { movies: S.langAvail.movies ? arSort(arM) : rawC.movies, series: S.langAvail.series ? arSort(arS) : rawC.series };
  }
  S.arHidden = arOn() ? (rawG.length - g.length) + (rawC.movies || []).length - c.movies.length + (rawC.series || []).length - c.series.length : 0;
  if (!lockOn()) { S.genres = g; S.cats = c; S.channels = ch; S.hiddenN = 0; return; }
  const okC = l => (l || []).filter(x => !ADULT.test(x.title || ""));
  S.genres = g.filter(x => !S.lockedGenres.has(x.id));
  S.cats = { movies: okC(c.movies), series: okC(c.series) };
  S.channels = ch.filter(x => !S.lockedGenres.has(x.genre));
  S.hiddenN = (g.length - S.genres.length) + c.movies.length - S.cats.movies.length + c.series.length - S.cats.series.length;
}
// the chip that switches between «عربي ومترجم» and everything
const langChip = kind => {
  if (!S.langAvail || !S.langAvail[kind]) return "";
  return '<button class="chip langchip press' + (arOn() ? " on2" : "") + '" data-act="content-toggle">' + (arOn() ? "🌐 عرض الكل" : "عربي ومترجم") + "</button>";
};
function setContent(v) {
  S.settings.content = v;
  persist("settings", S.settings);
  S.rails = {};
  S.liveGroup = "*";
  S.cat.movies.cat = null; S.cat.series.cat = null;
  relock();
  buildHome();
  loadRails(S.connGen);
  renderLiveRail();
  toast(v === "all" ? "يعرض كل المحتوى" : "يعرض المحتوى العربي والمترجم");
}
const lockChip = () => lockOn() && S.hiddenN > 0 ? '<button class="chip lockchip press" data-act="pin-open">' + icon("lock", 14) + "مقفل<small>" + S.hiddenN + "</small></button>" : "";
const lockedCh = c => lockOn() && S.lockedGenres && S.lockedGenres.has(c.genre);
function relock() {
  applyLock();
  S.chanVer = (S.chanVer || 0) + 1;
  if (S.tab === "live") renderLive();
  else if (S.tab === "movies" || S.tab === "series") renderCatalog(S.tab);
  try { loadRails(S.connGen); } catch (e) { /* ignore */ }
}
const PIN = { buf: "", step: "", first: "" };
function openPin(step) {
  PIN.buf = ""; PIN.step = step || (S.settings.pin ? "menu" : "new"); PIN.first = "";
  CH.mode = "pin";
  $("#chooser .cbody").classList.remove("tall");
  $("#chooser").classList.add("open");
  renderPin();
}
function renderPin(msg) {
  if (CH.mode !== "pin") return;
  let h = '<div class="grab"></div><h3>قفل محتوى الكبار</h3>';
  if (PIN.step === "menu") {
    h += '<p class="ps">' + (lockOn() ? "مفعّل — الأقسام المخصّصة للكبار مخفية" : "مفتوح مؤقتاً حتى تغلق التطبيق") + '</p><div class="slist">' +
      (lockOn() ? '<button class="crow" data-act="pin-step" data-id="unlock"><span class="t">فتح مؤقتاً</span><small>حتى تغلق التطبيق</small></button>'
        : '<button class="crow" data-act="pin-relock"><span class="t">اقفل الآن</span></button>') +
      '<button class="crow" data-act="pin-step" data-id="off"><span class="t">إيقاف القفل</span><small>يطلب الرمز</small></button></div>';
  } else {
    const title = { new: "اختر رمزاً من 4 أرقام", again: "أعد كتابة الرمز", unlock: "اكتب الرمز لفتح المحتوى", off: "اكتب الرمز لإيقاف القفل" }[PIN.step];
    h += '<p class="ps">' + title + '</p><div class="pindots">' + [0, 1, 2, 3].map(i => "<i" + (i < PIN.buf.length ? ' class="on"' : "") + "></i>").join("") + "</div>" +
      (msg ? '<p class="pinmsg">' + esc(msg) + "</p>" : "") +
      '<div class="pinpad">' + ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"].map(k => k ? '<button class="press" data-act="pin-k" data-id="' + k + '">' + k + "</button>" : "<span></span>").join("") + "</div>";
  }
  $("#chooser .cbody").innerHTML = h;
}
function pinKey(k) {
  if (k === "⌫") { PIN.buf = PIN.buf.slice(0, -1); renderPin(); return; }
  if (PIN.buf.length >= 4) return;
  PIN.buf += k;
  renderPin();
  if (PIN.buf.length < 4) return;
  const v = PIN.buf;
  {
    PIN.buf = "";
    if (PIN.step === "new") { PIN.first = v; PIN.step = "again"; renderPin(); }
    else if (PIN.step === "again") {
      if (v !== PIN.first) { PIN.step = "new"; renderPin("الرمزان غير متطابقين، حاول مرة أخرى"); return; }
      S.settings.pin = v; S.unlocked = false; persist("settings", S.settings); closeChooser(); relock(); toast("فُعّل قفل الكبار 🔒");
    } else if (v !== S.settings.pin) renderPin("رمز غير صحيح");
    else if (PIN.step === "unlock") { S.unlocked = true; closeChooser(); relock(); toast("فُتح المحتوى حتى تغلق التطبيق"); }
    else if (PIN.step === "off") { delete S.settings.pin; S.unlocked = false; persist("settings", S.settings); closeChooser(); relock(); toast("أُوقف قفل الكبار"); }
  }
}

/* ================= «آخر المضاف» — newest films and series, with the time they were added ================= */
const NEW = { win: 0 };   // hours; 0 = everything, newest first
const WINS = [[0, "الكل"], [24, "آخر 24 ساعة"], [72, "3 أيام"], [168, "أسبوع"]];
function relTime(ts) {
  if (!ts) return "";
  const d = Math.max(0, Date.now() / 1000 - ts);
  if (d < 3600) return d < 120 ? "الآن" : "قبل " + Math.floor(d / 60) + " د";
  if (d < 86400) { const h = Math.floor(d / 3600); return h === 1 ? "قبل ساعة" : h === 2 ? "قبل ساعتين" : "قبل " + h + (h <= 10 ? " ساعات" : " ساعة"); }
  const t = new Date(ts * 1000), y = new Date(Date.now() - 86400000);
  if (t.toDateString() === y.toDateString()) return "أمس " + hhmm(ts);
  const days = Math.floor(d / 86400);
  return days < 7 ? (days === 2 ? "قبل يومين" : "قبل " + days + " أيام") : t.getDate() + "/" + (t.getMonth() + 1);
}
const addedText = ts => { if (!ts) return ""; const t = new Date(ts * 1000); return t.getFullYear() + "/" + (t.getMonth() + 1) + "/" + t.getDate() + " · " + hhmm(ts); };
// which sections to look in: the "all" section when it is shown, otherwise the (Arabic) sections themselves
function newSources(kind) {
  const cats = S.cats[kind] || [];
  if (cats.some(x => x.id === "*")) return ["*"];
  return cats.slice(0, 14).map(x => x.id);
}
async function recentItems(kind, deep) {
  const ids = newSources(kind);
  const pages = ids.length === 1 ? (deep ? 4 : 1) : 1;
  const jobs = [];
  (deep ? ids : ids.slice(0, 5)).forEach(id => { for (let p = 1; p <= pages; p++) jobs.push(fetchPage(kind, id, p).catch(() => null)); });
  const res = await Promise.all(jobs);
  const seen = new Set(), out = [];
  res.forEach(r => (r ? r.items : []).forEach(v => { if (!seen.has(v.id)) { seen.add(v.id); out.push(v); } }));
  if (!out.some(v => v.added > 0)) return out;      // the portal doesn't say when: keep its own order
  return out.filter(v => v.added > 0).sort((a, b) => b.added - a.added);
}
async function newLoad(kind) {
  const c = S.cat[kind];
  const gen = ++c.gen;
  c.items = []; c.page = 0; c.total = 0; c.end = false; c.error = ""; c.loading = true;
  $("#" + kind + "-scroll").scrollTop = 0;
  renderNewBar(kind);
  catStatus(kind);
  let list = [];
  try { list = await recentItems(kind, true); } catch (e) { c.error = e.message; }
  if (gen !== c.gen) return;
  const dated = list.some(v => v.added > 0);
  if (NEW.win && dated) list = list.filter(v => v.added >= Date.now() / 1000 - NEW.win * 3600);
  if (c.q) list = smartFilter(list, c.q, "name");
  c.items = list; c.page = 1; c.total = list.length; c.end = true; c.loading = false; c.undated = !dated && list.length > 0;
  remember(list);
  const grid = $("#" + kind + "-grid");
  grid.innerHTML = list.map((v, i) => posterCard(v, i, "new")).join("");
  trackImgs(grid, $("#" + kind + "-scroll"));
  renderNewBar(kind);
  catStatus(kind);
  if (!list.length && !c.error) $("#" + kind + "-status").innerHTML = emptyHTML("clock", "لا جديد في هذه المدة", "اختر مدة أطول.");
}
function renderNewBar(kind) {
  const grid = $("#" + kind + "-grid");
  let bar = $("#" + kind + "-newbar");
  const c = S.cat[kind];
  if (c.cat !== "__new") { if (bar) bar.remove(); return; }
  if (!bar) { bar = document.createElement("div"); bar.id = kind + "-newbar"; bar.className = "newbar"; grid.parentNode.insertBefore(bar, grid); }
  bar.innerHTML = WINS.map(w => '<button class="' + (NEW.win === w[0] ? "on" : "") + '" data-act="new-win" data-kind="' + kind + '" data-id="' + w[0] + '">' + w[1] + "</button>").join("") +
    (c.undated ? '<small>البورتال لا يذكر وقت الإضافة — مرتّبة كما يرسلها</small>' : "");
}
const newChip = kind => '<button class="chip newchip' + (S.cat[kind].cat === "__new" ? " on" : "") + '" data-act="cat" data-kind="' + kind + '" data-id="__new">' + icon("clock", 14) + "آخر المضاف</button>";
// home: newest films and series together
async function renderNewRail() {
  const gen = S.connGen;
  let all = [];
  try {
    const [m, s] = await Promise.all([recentItems("movies", false), recentItems("series", false)]);
    all = m.concat(s);
  } catch (e) { /* nothing new to show */ }
  if (gen !== S.connGen) return;
  const dated = all.filter(v => v.added > 0).sort((a, b) => b.added - a.added).slice(0, 18);
  const track = $("#track-new");
  if (!track) return;
  if (!dated.length) { hideRail("new"); return; }
  $("#rail-new").classList.remove("hidden", "gone");
  remember(dated);
  track.innerHTML = dated.map((v, i) => posterCard(v, i, "new")).join("");
}
function openNew(kind) {
  const c = S.cat[kind];
  c.cat = "__new"; c.q = ""; c.gen++; c.items = []; c.page = 0; c.end = false; c.loading = false; c.error = "";
  $("#" + kind + "-q").value = "";
  $("#" + kind + "-grid").innerHTML = "";
  switchTab(kind);
}

/* ================= تحسين الصورة — GPU upscaling + adaptive sharpening (FSR/CAS style) ================= *
 * The video frame goes to the GPU, is enlarged to the screen's real pixels with a sharp bicubic filter,
 * then sharpened only where detail is soft (contrast-adaptive, so edges don't ring) and given a little
 * colour depth. Works on what Sahra's own engines play (MKV / MP4 / TS); a picture the web view gets
 * straight from another server can't be read back, so there it says so and steps aside.
 */
const ENH = { gl: null, cv: null, on: false, lvl: 0, split: 0, frames: 0, err: "", raf: 0, vfc: 0, tex: null, fbo: null, fboTex: null, fw: 0, fh: 0, progA: null, progB: null, buf: null, warned: "" };
const ENH_LEVELS = [null, { name: "خفيف", sharp: 0.35, vib: 0.06, con: 0.02 }, { name: "قوي", sharp: 0.7, vib: 0.12, con: 0.04 }, { name: "فائق", sharp: 1.0, vib: 0.18, con: 0.06 }];
const ENH_VS = "attribute vec2 p;varying vec2 uv;void main(){uv=p*0.5+0.5;gl_Position=vec4(p,0.0,1.0);}";
const ENH_FA = "precision highp float;uniform sampler2D src;uniform vec2 srcSize;varying vec2 uv;" +
  "void main(){vec2 q=vec2(uv.x,1.0-uv.y)*srcSize;vec2 tc=floor(q-0.5)+0.5;vec2 f=q-tc;" +
  "vec2 w0=f*(-0.5+f*(1.0-0.5*f));vec2 w1=1.0+f*f*(-2.5+1.5*f);vec2 w2=f*(0.5+f*(2.0-1.5*f));vec2 w3=f*f*(-0.5+0.5*f);" +
  "vec2 w12=w1+w2;vec2 t0=(tc-1.0)/srcSize;vec2 t3=(tc+2.0)/srcSize;vec2 t12=(tc+w2/w12)/srcSize;" +
  "vec4 r=texture2D(src,vec2(t0.x,t0.y))*w0.x*w0.y+texture2D(src,vec2(t12.x,t0.y))*w12.x*w0.y+texture2D(src,vec2(t3.x,t0.y))*w3.x*w0.y" +
  "+texture2D(src,vec2(t0.x,t12.y))*w0.x*w12.y+texture2D(src,t12)*w12.x*w12.y+texture2D(src,vec2(t3.x,t12.y))*w3.x*w12.y" +
  "+texture2D(src,vec2(t0.x,t3.y))*w0.x*w3.y+texture2D(src,vec2(t12.x,t3.y))*w12.x*w3.y+texture2D(src,vec2(t3.x,t3.y))*w3.x*w3.y;" +
  "gl_FragColor=vec4(clamp(r.rgb,0.0,1.0),1.0);}";
const ENH_FB = "precision highp float;uniform sampler2D img;uniform vec2 px;uniform float sharp;uniform float vib;uniform float con;uniform float split;varying vec2 uv;" +
  "vec3 T(float x,float y){return texture2D(img,uv+vec2(x,y)*px).rgb;}" +
  "void main(){vec3 a=T(-1.,-1.),b=T(0.,-1.),c=T(1.,-1.),d=T(-1.,0.),e=T(0.,0.),f=T(1.,0.),g=T(-1.,1.),h=T(0.,1.),i=T(1.,1.);" +
  "if(uv.x<split){gl_FragColor=vec4(abs(uv.x-split)<px.x*2.0?vec3(1.0):e,1.0);return;}" +
  "vec3 mn=min(min(min(d,e),min(f,b)),h);vec3 mn2=min(mn,min(min(a,c),min(g,i)));mn+=mn2;" +
  "vec3 mx=max(max(max(d,e),max(f,b)),h);vec3 mx2=max(mx,max(max(a,c),max(g,i)));mx+=mx2;" +
  "vec3 amp=sqrt(clamp(min(mn,2.0-mx)/max(mx,1e-4),0.0,1.0));vec3 w=amp*(-1.0/mix(8.0,5.0,sharp));" +
  "vec3 o=clamp(((b+d+f+h)*w+e)/(1.0+4.0*w),0.0,1.0);" +
  "float l=dot(o,vec3(0.299,0.587,0.114));float s=max(o.r,max(o.g,o.b))-min(o.r,min(o.g,o.b));" +
  "o=mix(vec3(l),o,1.0+vib*(1.0-s));o=clamp((o-0.5)*(1.0+con)+0.5,0.0,1.0);" +
  "if(abs(uv.x-split)<px.x*2.0&&split>0.0)o=vec3(1.0);gl_FragColor=vec4(o,1.0);}";
function enhProgram(gl, fs) {
  const mk = (t, src) => { const sh = gl.createShader(t); gl.shaderSource(sh, src); gl.compileShader(sh); if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(sh) || "shader"); return sh; };
  const pr = gl.createProgram();
  gl.attachShader(pr, mk(gl.VERTEX_SHADER, ENH_VS)); gl.attachShader(pr, mk(gl.FRAGMENT_SHADER, fs));
  gl.bindAttribLocation(pr, 0, "p");
  gl.linkProgram(pr);
  if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(pr) || "link");
  return pr;
}
function enhTexture(gl) {
  const t = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, t);
  [[gl.TEXTURE_MIN_FILTER, gl.LINEAR], [gl.TEXTURE_MAG_FILTER, gl.LINEAR], [gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE], [gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE]].forEach(x => gl.texParameteri(gl.TEXTURE_2D, x[0], x[1]));
  return t;
}
function enhInit() {
  if (ENH.gl) return true;
  try {
    const cv = document.createElement("canvas");
    cv.id = "penh";
    const gl = cv.getContext("webgl", { alpha: false, antialias: false, depth: false, preserveDrawingBuffer: false, powerPreference: "high-performance" });
    if (!gl) throw new Error("الجهاز لا يدعم WebGL");
    ENH.progA = enhProgram(gl, ENH_FA);
    ENH.progB = enhProgram(gl, ENH_FB);
    ENH.buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, ENH.buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    ENH.tex = enhTexture(gl);
    ENH.fboTex = enhTexture(gl);
    ENH.fbo = gl.createFramebuffer();
    cv.addEventListener("webglcontextlost", e => { e.preventDefault(); enhStop("فُقد سياق الرسوميات"); ENH.gl = null; cv.remove(); });
    video.insertAdjacentElement("afterend", cv);
    ENH.cv = cv; ENH.gl = gl;
    return true;
  } catch (e) { ENH.err = e.message; return false; }
}
// where the picture sits on screen (fit / fill / stretch), in canvas pixels
function enhRect(W, H) {
  const vw = video.videoWidth, vh = video.videoHeight, mode = ASPECTS[P.aspect || 0][0];
  if (!vw || !vh || mode === "fill") return [0, 0, W, H];
  const s = mode === "cover" ? Math.max(W / vw, H / vh) : Math.min(W / vw, H / vh);
  const w = Math.round(vw * s), h = Math.round(vh * s);
  return [Math.round((W - w) / 2), Math.round((H - h) / 2), w, h];
}
function enhDraw() {
  const gl = ENH.gl, cv = ENH.cv, L = ENH_LEVELS[ENH.lvl];
  if (!gl || !L || !video.videoWidth) return;
  // the canvas works at the screen's real pixels, capped so a big screen stays smooth
  const box = video.getBoundingClientRect();
  let dpr = Math.min(window.devicePixelRatio || 1, 3);
  if (box.width * box.height * dpr * dpr > 2400000) dpr = Math.sqrt(2400000 / (box.width * box.height));
  const W = Math.max(2, Math.round(box.width * dpr)), H = Math.max(2, Math.round(box.height * dpr));
  if (cv.width !== W || cv.height !== H) { cv.width = W; cv.height = H; }
  const [x, y, w, h] = enhRect(W, H);
  try {
    gl.bindTexture(gl.TEXTURE_2D, ENH.tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
  } catch (e) {
    // the web view won't hand over this picture (it comes straight from another server)
    enhStop(e && e.name === "SecurityError" ? "cross" : (e && e.message) || "texture");
    return;
  }
  // pass 1: sharp enlargement into an off-screen picture the size of the visible video
  const fw = Math.min(w, 4096), fh = Math.min(h, 4096);
  if (ENH.fw !== fw || ENH.fh !== fh) {
    gl.bindTexture(gl.TEXTURE_2D, ENH.fboTex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, fw, fh, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, ENH.fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, ENH.fboTex, 0);
    ENH.fw = fw; ENH.fh = fh;
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, ENH.buf);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  gl.bindFramebuffer(gl.FRAMEBUFFER, ENH.fbo);
  gl.viewport(0, 0, fw, fh);
  gl.useProgram(ENH.progA);
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, ENH.tex);
  gl.uniform1i(gl.getUniformLocation(ENH.progA, "src"), 0);
  gl.uniform2f(gl.getUniformLocation(ENH.progA, "srcSize"), video.videoWidth, video.videoHeight);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  // pass 2: adaptive sharpening + colour, onto the screen
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  gl.viewport(0, 0, W, H);
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.viewport(x, y, w, h);
  gl.useProgram(ENH.progB);
  gl.bindTexture(gl.TEXTURE_2D, ENH.fboTex);
  gl.uniform1i(gl.getUniformLocation(ENH.progB, "img"), 0);
  gl.uniform2f(gl.getUniformLocation(ENH.progB, "px"), 1 / fw, 1 / fh);
  gl.uniform1f(gl.getUniformLocation(ENH.progB, "sharp"), L.sharp);
  gl.uniform1f(gl.getUniformLocation(ENH.progB, "vib"), L.vib);
  gl.uniform1f(gl.getUniformLocation(ENH.progB, "con"), L.con);
  gl.uniform1f(gl.getUniformLocation(ENH.progB, "split"), ENH.split);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  ENH.frames++;
  if (!cv.classList.contains("on")) cv.classList.add("on");
}
function enhLoop() {
  if (!ENH.on) return;
  enhDraw();
  if (!ENH.on) return;
  if (video.requestVideoFrameCallback) ENH.vfc = video.requestVideoFrameCallback(enhLoop);
  else ENH.raf = requestAnimationFrame(enhLoop);
}
function enhStop(why) {
  ENH.on = false;
  try { if (ENH.vfc && video.cancelVideoFrameCallback) video.cancelVideoFrameCallback(ENH.vfc); } catch (e) { /* ignore */ }
  cancelAnimationFrame(ENH.raf);
  ENH.vfc = 0; ENH.raf = 0;
  if (ENH.cv) ENH.cv.classList.remove("on");
  if (why) {
    ENH.err = why;
    const key = why + "|" + P.token;
    if (ENH.warned !== key && P.open) { ENH.warned = key; toast(why === "cross" ? "تحسين الصورة يعمل مع محركات سهرة (MKV/TS) — هذا الفيديو يعرضه المشغّل الأساسي" : "تعذّر تحسين الصورة: " + why); }
  }
  paintEnh();
}
// start / stop with the setting and the current picture
function enhSync() {
  ENH.lvl = +S.settings.enhance || 0;
  const want = ENH.lvl > 0 && P.open && (P.state === "playing" || P.state === "paused" || P.state === "buffering") && video.videoWidth > 0;
  if (!want) { if (ENH.on) enhStop(); paintEnh(); return; }
  if (ENH.on) { enhDraw(); return; }
  if (ENH.err === "cross" && ENH.errTok === P.token) return;
  if (!enhInit()) { toast("تعذّر تحسين الصورة: " + ENH.err); return; }
  ENH.err = ""; ENH.on = true; ENH.frames = 0; ENH.errTok = P.token;
  enhLoop();
  paintEnh();
}
function paintEnh() {
  const b = $("#p-enh");
  if (b) { b.classList.toggle("on", ENH.on); b.title = ENH.on ? "تحسين: " + ENH_LEVELS[ENH.lvl].name : "تحسين الصورة"; }
}
function setEnhance(lvl) {
  if (lvl) S.settings.enhLast = lvl;
  S.settings.enhance = lvl;
  persist("settings", S.settings);
  if (!lvl) ENH.split = 0;
  ENH.err = "";
  enhSync();
  if (ENH.on) enhDraw();
  if (lvl && ENH.on) toast("تحسين الصورة: " + ENH_LEVELS[lvl].name + " ✨");
  else if (!lvl) toast("أُوقف تحسين الصورة");
}
window.addEventListener("resize", () => { if (ENH.on) setTimeout(enhDraw, 60); });

/* ================= events ================= */
document.addEventListener("click", e => {
  const p = e.target.closest("[data-p]");
  if (p && p.closest("#player")) { playerAction(p.dataset.p, p); return; }
  const el = e.target.closest("[data-act]");
  if (!el) return;
  const d = el.dataset;
  switch (d.act) {
    case "tab": switchTab(d.tab); break;
    case "choose": choose(d.id); break;
    case "selftest": closeModal(); runSelfTest(); break;
    case "diag-copy": api("copy", { text: diagText() }).then(() => toast("نُسخ التقرير ✓ — الصقه في المحادثة")); break;
    case "dl-safari": { const x = DLS.list.find(z => z.id === d.id); if (x && x.source) launchExternal("safari", { source: x.source, live: false, title: x.title }); break; }
    case "downloads": case "dl-open": openDownloads(); break;
    case "dl-play": playDownload(d.id); break;
    case "dl-pause": api("dlPause", { id: d.id }).then(l => { DLS.list = l; renderDownloads(); renderDlRail(); }); break;
    case "dl-resume": api("dlResume", { id: d.id }).then(l => { DLS.list = l; renderDownloads(); pollDownloads(); }); break;
    case "dl-del": api("dlRemove", { id: d.id }).then(l => { DLS.list = l; renderDownloads(); renderDlRail(); toast("حُذف التنزيل"); }); break;
    case "dl-movie": if (S.detail) startDownload(movieItem(S.detail.item)); break;
    case "dl-ep": e.stopPropagation(); if (S.detail) startDownload(episodeItems(S.detail)[+d.i]); break;
    case "pset": {
      const v = d.val, num = /^-?\\d+$/.test(v) ? +v : v;
      S.settings[d.key] = num; persist("settings", S.settings); applyPlayerLooks();
      if (d.key === "subs" && P.open && P.tracks) SUB.track = pickSubTrack(P.tracks.subs);
      openPlayerPrefs();
      if ($("#modal").classList.contains("open")) openSettings();
      break;
    }
    case "ptoggle": S.settings[d.key] = S.settings[d.key] === false ? true : S.settings[d.key] === true ? false : false; persist("settings", S.settings); applyPlayerLooks(); openPlayerPrefs(); break;
    case "pprefs-open": openPlayerPrefs(); break;
    case "m-audio": closeChooser(); switchAudio(d.id); break;
    case "m-speed": P.rate = +d.id; applySpeed(); toast("السرعة " + d.id + "×"); openMedia(); break;
    case "m-sleep": setSleep(d.id); openMedia(); break;
    case "m-enh": setEnhance(+d.id); openMedia(); break;
    case "m-split": ENH.split = +d.id; if (ENH.on) enhDraw(); openMedia(); break;
    case "g-day": GUIDE.day = +d.id; loadGuide(); break;
    case "g-play": playArchive(+d.i); break;
    case "g-live": closeChooser(); break;
    case "pin-open": closeModal(); openPin(); break;
    case "see-new": openNew(d.kind); break;
    case "new-win": NEW.win = +d.id; newLoad(d.kind); break;
    case "content-toggle": setContent(arOn() ? "all" : "ar"); break;
    case "content-set": if ((d.id === "all") === arOn()) { setContent(d.id); openSettings(); } break;
    case "pin-k": pinKey(d.id); break;
    case "pin-step": PIN.step = d.id; PIN.buf = ""; renderPin(); break;
    case "pin-relock": S.unlocked = false; closeChooser(); relock(); toast("قُفل محتوى الكبار 🔒"); break;
    case "m-naudio": try { const at = video.audioTracks; for (let k = 0; k < at.length; k++) at[k].enabled = k === +d.id; } catch (e) { /* ignore */ } openMedia(); break;
    case "m-sub": SUB.track = +d.id; SUB.shown = "x"; drawSubs(); openMedia(); break;
    case "m-nsub": try { const tt = video.textTracks; for (let k = 0; k < tt.length; k++) tt[k].mode = k === +d.id ? "showing" : "disabled"; } catch (e) { /* ignore */ } openMedia(); break;
    case "m-delay": S.settings.subDelay = +d.id === 0 ? 0 : (+S.settings.subDelay || 0) + (+d.id); persist("settings", S.settings); drawSubs(); openMedia(); break;
    case "open-themes": openThemes(); break;
    case "theme-style": openThemes(d.id); break;
    case "theme-lay": openThemes(null, +d.id); break;
    case "theme-set":
      S.settings.theme = +d.id; applyTheme(+d.id); persist("settings", S.settings);
      if (+d.id >= 100 || $("#chooser .spcard.on")) { openThemes(); if ($("#modal").classList.contains("open")) openSettings(); toast("ثيم «" + themeById(+d.id).name + "» ✓"); break; }
      $$("#chooser .thcard").forEach(c => { const on = c.dataset.id === d.id; c.classList.toggle("on", on); const k = c.querySelector(".okd"); if (k && !on) k.remove(); if (on && !k) c.insertAdjacentHTML("beforeend", '<i class="okd">' + icon("check", 12) + "</i>"); });
      if ($("#modal").classList.contains("open")) openSettings();
      break;
    case "open-anims": openAnims(); break;
    case "anim-set":
      S.settings.anim = +d.id; S.settings.motion = "on"; applyLooks(); persist("settings", S.settings);
      $$("#chooser .anrow").forEach(r => r.classList.toggle("on", r.dataset.id === d.id));
      replayDemo();
      if ($("#modal").classList.contains("open")) openSettings();
      break;
    case "anim-off":
      S.settings.motion = S.settings.motion === "off" ? "on" : "off"; applyLooks(); persist("settings", S.settings);
      el.classList.toggle("on", S.settings.motion === "off");
      if ($("#modal").classList.contains("open")) openSettings();
      break;
    case "cat-search": openCats(d.kind); break;
    case "pick-cat": pickCat(d.kind, d.id); break;
    case "clear-catq": { const inp = $("#" + d.kind + "-q"); inp.value = ""; el.classList.add("hidden"); S.cat[d.kind].q = ""; catalogLoad(d.kind, true); break; }
    case "live-sugg": pickCat("live", d.id); break;
    case "chooser-close": closeChooser(); break;
    case "ch-remember": $("#ch-remember").classList.toggle("on"); break;
    case "pick-player": openChooser(null, 0, "pick", d.key); break;
    case "settings": openSettings(); break;
    case "add-portal": openEditor(null); break;
    case "connect": { const pt = S.portals.find(x => x.id === d.id); if (pt) enterPortal(pt, true); break; }
    case "portal-menu": e.stopPropagation(); portalMenu(d.id); break;
    case "edit-portal": openEditor(S.portals.find(x => x.id === d.id)); break;
    case "delete-portal": deletePortal(d.id); break;
    case "close-modal": closeModal(); break;
    case "toggle-adv": $("#f-adv").classList.toggle("hidden"); break;
    case "save-portal": savePortal(); break;
    case "cancel-connect": cancelConnect(); break;
    case "retry-connect": $("#banner").classList.remove("show"); connect(); toast("جارٍ إعادة الاتصال…"); break;
    case "open-vod": e.stopPropagation(); openVod(d.key); break;
    case "quick-play": e.stopPropagation(); quickPlay(d.key); break;
    case "see-all": {
      const c = S.cat[d.kind];
      c.cat = d.cat; c.gen++; c.items = []; c.page = 0; c.loading = false; c.end = false; c.error = ""; c.q = "";
      $("#" + d.kind + "-q").value = ""; $(".clr[data-act=clear-catq][data-kind=" + d.kind + "]").classList.add("hidden");
      $("#" + d.kind + "-grid").innerHTML = "";
      switchTab(d.kind);
      break;
    }
    case "play-ch": {
      const list = LISTS[d.ctx] || [];
      const i = +d.i;
      if (list[i]) startPlayback(list.map(chItem), i);
      break;
    }
    case "resume": {
      const pr = (LISTS.continue || [])[+d.i];
      if (!pr) return;
      if (pr.item) ITEMS.set(pr.kind + ":" + pr.id, pr.item);
      startPlayback([{ key: pr.key, live: false, title: pr.title, subtitle: pr.subtitle || pr.ep, poster: pr.poster, logo: pr.poster, source: pr.source, meta: { kind: pr.kind, id: pr.id, ep: pr.ep } }], 0);
      break;
    }
    case "live-group":
      S.liveGroup = d.id;
      $$("#live-chips .chip").forEach(c => c.classList.toggle("on", c.dataset.id === d.id));
      renderLiveGrid();
      break;
    case "goto-genre": S.liveGroup = d.id; switchTab("live"); break;
    case "goto-sec":
      if (d.kind === "live") { switchTab("live"); pickCat("live", d.id); }
      else { switchTab(d.kind); pickCat(d.kind, d.id); }
      break;
    case "clear-live": $("#live-q").value = ""; S.liveQuery = ""; el.classList.add("hidden"); renderLiveSugg(); renderLive(); break;
    case "cat":
      S.cat[d.kind].cat = d.id;
      $$("#" + d.kind + "-chips .chip").forEach(c => c.classList.toggle("on", c.dataset.id === d.id));
      catalogLoad(d.kind, true);
      break;
    case "q": $("#search-q").value = d.q; renderSearch(); break;
    case "clear-search": $("#search-q").value = ""; renderSearch(); break;
    case "clear-recent": S.recentQ = []; persist("recentQ", []); renderSearch(); break;
    case "close-sheet": closeSheet(); break;
    case "play-movie": if (S.detail) startPlayback([movieItem(S.detail.item)], 0); break;
    case "play-ep": if (S.detail && S.detail.episodes.length) startPlayback(episodeItems(S.detail), +d.i); break;
    case "season": { const s = S.detail && S.detail.seasons.find(x => x.id === d.id); if (s) selectSeason(S.detail, s); break; }
    case "fav-vod": toggleFavVod(); break;
    case "expand": el.classList.toggle("clamp"); break;
    case "set":
      setSetting(d.key, d.val, el);
      if (d.key === "chMode") { closeModal(); toast("جارٍ إعادة تحميل القنوات…"); LIVEP.clear(); LIVE.gen++; LIVE.group = null; connect(); }
      break;
    case "diag-show": $("#diag-box").classList.toggle("hidden"); break;
    case "reconnect": closeModal(); toast("جارٍ التحديث…"); S.rawCats = null; S.rails = {}; PAGES.clear(); LIVEP.clear(); LIVE.gen++; LIVE.group = null; S.cat = { movies: newCat(), series: newCat() }; connect(); break;
    case "switch-portal": switchPortal(); break;
    case "clear-progress": S.progress = {}; persist(pk("progress"), {}); renderContinue(); toast("تم مسح سجل المشاهدة"); break;
    case "clear-cache": api("cacheClear").then(() => toast("تم مسح الذاكرة المؤقتة")).catch(() => {}); break;
  }
});

$("#modal").addEventListener("click", e => { if (e.target.id === "modal") closeModal(); });
$("#live-q").addEventListener("input", debounce(e => {
  S.liveQuery = e.target.value;
  $(".clr[data-act=clear-live]").classList.toggle("hidden", !S.liveQuery);
  renderLiveSugg();
  renderLiveGrid();
  if (!S.liveQuery.trim()) renderLive();
}, 220));
$("#search-q").addEventListener("input", () => renderSearch());
["movies", "series"].forEach(kind => {
  const inp = $("#" + kind + "-q");
  inp.addEventListener("input", debounce(() => {
    const v = inp.value.trim();
    $(".clr[data-act=clear-catq][data-kind=" + kind + "]").classList.toggle("hidden", !v);
    if (v === S.cat[kind].q) return;
    S.cat[kind].q = v;
    catalogLoad(kind, true);
  }, 450));
  inp.addEventListener("keydown", e => { if (e.key === "Enter") e.target.blur(); });
});
$("#search-q").addEventListener("keydown", e => { if (e.key === "Enter") e.target.blur(); });
$("#live-scroll").addEventListener("scroll", e => {
  const el = e.target;
  if (el.scrollTop + el.clientHeight > el.scrollHeight - 800) appendLive();
}, { passive: true });
["movies", "series"].forEach(kind => {
  $("#" + kind + "-scroll").addEventListener("scroll", e => {
    const el = e.target;
    if (el.scrollTop + el.clientHeight > el.scrollHeight - 800) catalogLoad(kind, false);
  }, { passive: true });
});
let parallaxRAF = 0;
$("#sheet-scroll").addEventListener("scroll", e => {
  const y = e.target.scrollTop;
  if (parallaxRAF) return;
  parallaxRAF = requestAnimationFrame(() => {
    parallaxRAF = 0;
    const bg = $("#dbg");
    if (bg) bg.style.transform = "translateY(" + (y * 0.4) + "px) scale(" + (1 + Math.max(0, -y) / 500) + ")";
    $("#dnav").classList.toggle("solid", y > 300);
  });
}, { passive: true });

/* ================= boot ================= */
$("#splash-name").textContent = "سهرة MAC";
paintIcons();

async function boot() {
  const started = Date.now();
  let st = {};
  try { st = (await api("init")) || {}; } catch (e) { st = {}; }
  S.store = st;
  S.portals = Array.isArray(st.portals) ? st.portals : [];
  if (st.settings && typeof st.settings === "object") {
    S.settings = Object.assign(S.settings, st.settings);
    if (S.settings.player === "vlc" && !st.settings.live) S.settings.live = S.settings.vod = "vlc";
    delete S.settings.player;
  }
  S.recentQ = Array.isArray(st.recentQ) ? st.recentQ : [];
  applyLooks();
  applyPlayerLooks();
  // the last run stopped while loading (crash or killed)? → switch to light loading automatically
  const prev = st.__prevDiag;
  delete st.__prevDiag;
  S.prevDiag = prev && Array.isArray(prev.steps) ? prev : null;
  if (S.prevDiag && !prev.clean && prev.steps.some(x => / connect\\b/.test(x)) && !prev.steps.some(x => /page ready/.test(x))) {
    S.recovered = prev.steps[prev.steps.length - 1] || "";
    if (S.settings.chMode !== "light") { S.settings.chMode = "light"; persist("settings", S.settings); S.autoLight = true; }
  }
  const last = S.portals.find(p => p.id === st.lastPortal);
  if (last) enterPortal(last, false); else showPortals();
  setTimeout(() => $("#splash").classList.add("out"), Math.max(0, 1500 - (Date.now() - started)));
  setTimeout(() => { const sp = $("#splash"); if (sp) sp.remove(); }, 2400);
}
// looks known before the first paint (Scriptable writes them into the page)
const BOOT = /*__BOOT__*/null;
if (BOOT && typeof BOOT === "object") { Object.assign(S.settings, BOOT); try { applyLooks(); } catch (e) { /* ignore */ } }
boot();

</script>
</body>
</html>
`;

// ---------- hashing (pure JS, Scriptable has no crypto API) ----------
function utf8Bytes(str) {
  const out = [];
  for (let i = 0; i < str.length; i++) {
    let c = str.charCodeAt(i);
    if (c >= 0xd800 && c <= 0xdbff && i + 1 < str.length) {
      const d = str.charCodeAt(i + 1);
      if (d >= 0xdc00 && d <= 0xdfff) { c = 0x10000 + ((c - 0xd800) << 10) + (d - 0xdc00); i++; }
    }
    if (c < 0x80) out.push(c);
    else if (c < 0x800) out.push(0xc0 | (c >> 6), 0x80 | (c & 63));
    else if (c < 0x10000) out.push(0xe0 | (c >> 12), 0x80 | ((c >> 6) & 63), 0x80 | (c & 63));
    else out.push(0xf0 | (c >> 18), 0x80 | ((c >> 12) & 63), 0x80 | ((c >> 6) & 63), 0x80 | (c & 63));
  }
  return out;
}

function hexWordsBE(words) {
  return words.map(w => (w >>> 0).toString(16).padStart(8, "0")).join("").toUpperCase();
}

const MD5_S = [7,12,17,22,7,12,17,22,7,12,17,22,7,12,17,22,5,9,14,20,5,9,14,20,5,9,14,20,5,9,14,20,4,11,16,23,4,11,16,23,4,11,16,23,4,11,16,23,6,10,15,21,6,10,15,21,6,10,15,21,6,10,15,21];
const MD5_K = Array.from({ length: 64 }, (_, i) => Math.floor(Math.abs(Math.sin(i + 1)) * 4294967296) | 0);

function md5(str) {
  const bytes = utf8Bytes(str);
  const len = bytes.length;
  const words = new Array((((len + 8) >> 6) + 1) * 16).fill(0);
  for (let i = 0; i < len; i++) words[i >> 2] |= bytes[i] << ((i % 4) * 8);
  words[len >> 2] |= 0x80 << ((len % 4) * 8);
  words[words.length - 2] = (len * 8) >>> 0;
  words[words.length - 1] = Math.floor((len * 8) / 4294967296);
  let a0 = 0x67452301 | 0, b0 = 0xefcdab89 | 0, c0 = 0x98badcfe | 0, d0 = 0x10325476 | 0;
  for (let blk = 0; blk < words.length; blk += 16) {
    let A = a0, B = b0, C = c0, D = d0;
    for (let i = 0; i < 64; i++) {
      let F, g;
      if (i < 16) { F = (B & C) | (~B & D); g = i; }
      else if (i < 32) { F = (D & B) | (~D & C); g = (5 * i + 1) % 16; }
      else if (i < 48) { F = B ^ C ^ D; g = (3 * i + 5) % 16; }
      else { F = C ^ (B | ~D); g = (7 * i) % 16; }
      const tmp = D; D = C; C = B;
      const sum = (A + F + MD5_K[i] + words[blk + g]) | 0;
      B = (B + ((sum << MD5_S[i]) | (sum >>> (32 - MD5_S[i])))) | 0;
      A = tmp;
    }
    a0 = (a0 + A) | 0; b0 = (b0 + B) | 0; c0 = (c0 + C) | 0; d0 = (d0 + D) | 0;
  }
  return [a0, b0, c0, d0].map(w => {
    let s = "";
    for (let j = 0; j < 4; j++) s += ((w >>> (j * 8)) & 255).toString(16).padStart(2, "0");
    return s;
  }).join("").toUpperCase();
}

function shaBlocks(bytes) {
  const len = bytes.length;
  const words = new Array((((len + 8) >> 6) + 1) * 16).fill(0);
  for (let i = 0; i < len; i++) words[i >> 2] |= bytes[i] << (24 - (i % 4) * 8);
  words[len >> 2] |= 0x80 << (24 - (len % 4) * 8);
  words[words.length - 1] = (len * 8) >>> 0;
  words[words.length - 2] = Math.floor((len * 8) / 4294967296);
  return words;
}

function sha1(str) {
  const w = shaBlocks(utf8Bytes(str));
  let h0 = 0x67452301 | 0, h1 = 0xefcdab89 | 0, h2 = 0x98badcfe | 0, h3 = 0x10325476 | 0, h4 = 0xc3d2e1f0 | 0;
  const W = new Array(80);
  for (let blk = 0; blk < w.length; blk += 16) {
    for (let t = 0; t < 16; t++) W[t] = w[blk + t] | 0;
    for (let t = 16; t < 80; t++) { const x = W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16]; W[t] = (x << 1) | (x >>> 31); }
    let a = h0, b = h1, c = h2, d = h3, e = h4;
    for (let t = 0; t < 80; t++) {
      let f, k;
      if (t < 20) { f = (b & c) | (~b & d); k = 0x5a827999; }
      else if (t < 40) { f = b ^ c ^ d; k = 0x6ed9eba1; }
      else if (t < 60) { f = (b & c) | (b & d) | (c & d); k = 0x8f1bbcdc | 0; }
      else { f = b ^ c ^ d; k = 0xca62c1d6 | 0; }
      const tmp = (((a << 5) | (a >>> 27)) + f + e + k + W[t]) | 0;
      e = d; d = c; c = (b << 30) | (b >>> 2); b = a; a = tmp;
    }
    h0 = (h0 + a) | 0; h1 = (h1 + b) | 0; h2 = (h2 + c) | 0; h3 = (h3 + d) | 0; h4 = (h4 + e) | 0;
  }
  return hexWordsBE([h0, h1, h2, h3, h4]);
}

const SHA256_K = (() => {
  const k = [];
  let n = 2;
  while (k.length < 64) {
    let prime = true;
    for (let d = 2; d * d <= n; d++) if (n % d === 0) { prime = false; break; }
    if (prime) { const c = Math.cbrt(n); k.push(Math.floor((c - Math.floor(c)) * 4294967296) | 0); }
    n++;
  }
  return k;
})();

function sha256(str) {
  const w = shaBlocks(utf8Bytes(str));
  const H = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19].map(x => x | 0);
  const W = new Array(64);
  const ror = (x, n) => (x >>> n) | (x << (32 - n));
  for (let blk = 0; blk < w.length; blk += 16) {
    for (let t = 0; t < 16; t++) W[t] = w[blk + t] | 0;
    for (let t = 16; t < 64; t++) {
      const s0 = ror(W[t - 15], 7) ^ ror(W[t - 15], 18) ^ (W[t - 15] >>> 3);
      const s1 = ror(W[t - 2], 17) ^ ror(W[t - 2], 19) ^ (W[t - 2] >>> 10);
      W[t] = (W[t - 16] + s0 + W[t - 7] + s1) | 0;
    }
    let [a, b, c, d, e, f, g, h] = H;
    for (let t = 0; t < 64; t++) {
      const S1 = ror(e, 6) ^ ror(e, 11) ^ ror(e, 25);
      const ch = (e & f) ^ (~e & g);
      const t1 = (h + S1 + ch + SHA256_K[t] + W[t]) | 0;
      const S0 = ror(a, 2) ^ ror(a, 13) ^ ror(a, 22);
      const mj = (a & b) ^ (a & c) ^ (b & c);
      const t2 = (S0 + mj) | 0;
      h = g; g = f; f = e; e = (d + t1) | 0; d = c; c = b; b = a; a = (t1 + t2) | 0;
    }
    H[0] = (H[0] + a) | 0; H[1] = (H[1] + b) | 0; H[2] = (H[2] + c) | 0; H[3] = (H[3] + d) | 0;
    H[4] = (H[4] + e) | 0; H[5] = (H[5] + f) | 0; H[6] = (H[6] + g) | 0; H[7] = (H[7] + h) | 0;
  }
  return hexWordsBE(H);
}

// ---------- constants ----------
const UA = "Mozilla/5.0 (QtEmbedded; U; Linux; C) AppleWebKit/533.3 (KHTML, like Gecko) MAG200 stbapp ver: 2 rev: 250 Safari/533.3";


// ---------- storage ----------
const fm = FileManager.local();
const UI_ROOT = fm.joinPath(fm.documentsDirectory(), "sahra-mac");
const ROOT = fm.joinPath(fm.documentsDirectory(), "sahra-mac");
if (!fm.fileExists(ROOT)) fm.createDirectory(ROOT, true);
const STATE_PATH = fm.joinPath(ROOT, "state.json");
const CACHE_DIR = fm.joinPath(ROOT, "cache");
if (!fm.fileExists(CACHE_DIR)) fm.createDirectory(CACHE_DIR, true);

function readJSON(path, fallback) {
  try { if (fm.fileExists(path)) return JSON.parse(fm.readString(path)); } catch (e) { /* corrupt */ }
  return fallback;
}
let STATE = readJSON(STATE_PATH, {});
if (!STATE || typeof STATE !== "object") STATE = {};
function saveState() {
  try { fm.writeString(STATE_PATH, JSON.stringify(STATE)); } catch (e) { /* ignore */ }
}
// ---------- run log: where did the last run stop? (shown in the app after a crash) ----------
const DIAG_PATH = fm.joinPath(ROOT, "diag.json");
const PREV_DIAG = readJSON(DIAG_PATH, null);
const DIAG = { run: Date.now(), steps: [], clean: false };
function diag(step, extra) {
  DIAG.steps.push(((Date.now() - DIAG.run) / 1000).toFixed(1) + "s " + step + (extra === undefined ? "" : " " + extra));
  if (DIAG.steps.length > 50) DIAG.steps.splice(8, DIAG.steps.length - 50);
  try { fm.writeString(DIAG_PATH, JSON.stringify(DIAG)); } catch (e) { /* ignore */ }
}

function cacheFile(key) {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) | 0;
  return fm.joinPath(CACHE_DIR, "c" + (h >>> 0).toString(36) + "_" + key.length + ".json");
}

// ---------- helpers ----------
function sleep(ms) {
  return new Promise(resolve => Timer.schedule(ms, false, resolve));
}

function jstr(v) {
  if (v === null || v === undefined) return "";
  if (typeof v === "string") return v;
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  return "";
}

function jint(v) {
  if (typeof v === "number") return Math.trunc(v);
  const n = parseFloat(jstr(v).trim());
  return isFinite(n) ? Math.trunc(n) : 0;
}

function jclean(v) {
  const s = jstr(v).trim();
  const l = s.toLowerCase();
  if (l === "n/a" || l === "null" || l === "0" || l === "0.0" || l === "none" || l === "undefined") return "";
  return s;
}

function jarr(v) {
  return Array.isArray(v) ? v.filter(x => x && typeof x === "object") : [];
}

function jints(v) {
  return Array.isArray(v) ? v.map(jint).filter(n => n > 0) : [];
}

function randomHex(n) {
  const c = "0123456789ABCDEF";
  let s = "";
  for (let i = 0; i < n; i++) s += c[Math.floor(Math.random() * 16)];
  return s;
}

function timezoneName() {
  try { return Intl.DateTimeFormat().resolvedOptions().timeZone || "Europe/London"; }
  catch (e) { return "Europe/London"; }
}

class PortalError extends Error {
  constructor(kind, detail) {
    super(kind);
    this.kind = kind;
    this.detail = detail || "";
  }
}

function errorText(e) {
  if (e instanceof PortalError) {
    switch (e.kind) {
      case "invalidURL": return "رابط البورتال غير صحيح. مثال: http://example.com:8080/c/";
      case "unreachable": return "تعذّر الوصول إلى البورتال. تأكد من الرابط واتصال الإنترنت." + (e.detail ? "\n" + e.detail : "");
      case "unauthorized": return e.detail || "رفض البورتال عنوان MAC. تأكد أن الاشتراك مفعّل على هذا العنوان.";
      case "bad": return "استجابة غير متوقعة من البورتال. جرّب رابطاً آخر (مثلاً بإضافة /c/ أو /stalker_portal/c/)." + (e.detail ? "\n(" + e.detail + ")" : "");
      case "noStream": return "لم يُرسل البورتال رابط تشغيل لهذا المحتوى.";
      case "notConnected": return "غير متصل بالبورتال.";
    }
  }
  return (e && e.message) ? String(e.message) : String(e);
}

async function httpGet(url, headers) {
  const req = new Request(url);
  req.method = "GET";
  req.headers = headers;
  req.timeoutInterval = 15;
  try { req.allowInsecureRequest = true; } catch (e) { /* older Scriptable */ }
  let text;
  try {
    text = await req.loadString();
  } catch (e) {
    throw new PortalError("unreachable", e && e.message ? e.message : "");
  }
  const status = req.response && req.response.statusCode ? req.response.statusCode : 0;
  return { text: (text || "").replace(/^﻿/, ""), status };
}

function lowerKeys(o) { const out = {}; if (o) for (const k of Object.keys(o)) out[k.toLowerCase()] = o[k]; return out; }

function parseJSON(text) {
  try { return JSON.parse(text); } catch (e) { return null; }
}

// Fast path for big channel lists: cut the "data" array into pieces of ~800 channels at the
// boundaries `},{"id":…,"name":` (native regex search) and JSON.parse one piece at a time.
// Returns the list, or null when the text doesn't look as expected (then use scanJSONArray).
function chunkedChannelList(text) {
  const a = text.indexOf('"data":[');
  if (a < 0) return null;
  const start = a + 8;
  const end = text.lastIndexOf("]");
  if (end <= start) return null;
  const re = /\},\{"id":("?)[^,"{}\[\]]*\1,"name":/g;
  re.lastIndex = start;
  const cuts = [];
  let m, k = 0;
  while ((m = re.exec(text)) && m.index < end) { if (++k % 800 === 0) cuts.push(m.index); }
  const out = [];
  let from = start;
  cuts.push(-1);
  for (const cut of cuts) {
    const piece = cut < 0 ? text.slice(from, end) : text.slice(from, cut + 1);
    let arr;
    try { arr = JSON.parse("[" + piece + "]"); } catch (e) { return null; }
    for (const o of arr) out.push(o);
    if (cut >= 0) from = cut + 2;
  }
  return out;
}

// Calls onItem(object) for each object of the first array named `key` in a JSON text,
// parsing one small object at a time.
function scanJSONArray(text, key, onItem) {
  let i = text.indexOf('"' + key + '"');
  if (i < 0) return 0;
  i = text.indexOf("[", i);
  if (i < 0) return 0;
  i++;
  const n = text.length;
  let count = 0;
  while (i < n) {
    const c0 = text.charCodeAt(i);
    if (c0 === 93) break;                 // ]
    if (c0 !== 123) { i++; continue; }    // {
    const start = i;
    let depth = 0, inStr = false;
    for (; i < n; i++) {
      const c = text.charCodeAt(i);
      if (inStr) {
        if (c === 92) i++;                // backslash: skip the escaped char
        else if (c === 34) inStr = false;
        continue;
      }
      if (c === 34) inStr = true;
      else if (c === 123 || c === 91) depth++;
      else if (c === 125 || c === 93) { depth--; if (depth === 0) { i++; break; } }
    }
    let obj = null;
    try { obj = JSON.parse(text.slice(start, i)); } catch (e) { obj = null; }
    if (obj && typeof obj === "object") { onItem(obj); count++; }
  }
  return count;
}

// ---------- Stalker / Ministra portal client ----------
class Stalker {
  constructor(portal) {
    this.portal = portal;
    this.mac = String(portal.mac || "").trim().toUpperCase();
    const sn = String(portal.serial || "").trim();
    this.serial = sn || md5(this.mac).slice(0, 13);
    this.deviceId1 = String(portal.deviceId1 || "").trim() || sha256(this.mac);
    this.deviceId2 = String(portal.deviceId2 || "").trim() || sha256(this.serial);
    this.signature = String(portal.signature || "").trim() || sha256(this.serial + this.mac);
    this.model = String(portal.model || "").trim() || "MAG250";
    this.ep = null;
    this.token = "";
    this.random = "";
    this.notice = "";
    this.expiry = "";
  }

  static candidates(raw) {
    let s = String(raw || "").trim();
    if (!s) throw new PortalError("invalidURL");
    if (!/^https?:\/\//i.test(s)) s = "http://" + s;
    const m = s.match(/^(https?):\/\/([^\/?#]+)([^?#]*)/i);
    if (!m || !m[2]) throw new PortalError("invalidURL");
    const root = m[1].toLowerCase() + "://" + m[2];
    let path = m[3] || "";
    for (const suffix of ["/index.html", "/portal.php", "/server/load.php", "/load.php"]) {
      if (path.toLowerCase().endsWith(suffix)) path = path.slice(0, -suffix.length);
    }
    path = path.replace(/\/+$/, "");
    if (path.toLowerCase().endsWith("/c")) path = path.slice(0, -2);
    path = path.replace(/\/+$/, "");
    const list = [];
    const add = (prefix, file) => {
      const api = root + prefix + file;
      if (!list.some(e => e.api === api)) list.push({ root, prefix, api });
    };
    if (/stalker_portal/i.test(path)) {
      add(path, "/server/load.php");
      add(path, "/portal.php");
    } else {
      if (path) { add(path, "/portal.php"); add(path, "/server/load.php"); }
      add("", "/portal.php");
      add("", "/server/load.php");
      add("/stalker_portal", "/server/load.php");
    }
    return list;
  }

  static resolve(raw, ep, logo) {
    const t = jstr(raw).trim();
    if (!t) return "";
    if (/^https?:\/\//i.test(t)) return t;
    if (t.startsWith("/")) return ep.root + t;
    if (logo) return ep.root + ep.prefix + "/misc/logos/320/" + t;
    return ep.root + "/" + t;
  }

  static extractURL(cmd) {
    const s = jstr(cmd).trim();
    if (!s) return "";
    const m = s.match(/(https?|rtmp|rtsp|udp|rtp|mms):\/\/\S+/i);
    return m ? m[0] : "";
  }

  static isBroken(url) {
    return !url || /stream=(&|$)/.test(url) || !/^[a-z]+:\/\/[^\/]+/i.test(url);
  }

  headers(ep, auth) {
    const h = {
      "User-Agent": UA,
      "X-User-Agent": "Model: " + this.model + "; Link: WiFi",
      "Referer": ep.root + ep.prefix + "/c/",
      "Accept": "*/*",
      "Cookie": "mac=" + encodeURIComponent(this.mac) + "; stb_lang=en; timezone=" + encodeURIComponent(timezoneName())
    };
    if (auth && this.token) h["Authorization"] = "Bearer " + this.token;
    return h;
  }

  buildURL(ep, params) {
    const all = params.concat([["JsHttpRequest", "1-xml"]]);
    return ep.api + "?" + all.map(([k, v]) => k + "=" + encodeURIComponent(v)).join("&");
  }

  // raw response text (auth handled); big lists are scanned from it without one giant JSON.parse
  async callText(params, retry = true) {
    if (!this.ep) throw new PortalError("notConnected");
    const r = await httpGet(this.buildURL(this.ep, params), this.headers(this.ep, true));
    const head = r.text.slice(0, 300);
    if (r.status === 401 || r.status === 403 || /Authorization failed/i.test(head)) {
      if (retry) {
        await this.reauth();
        return this.callText(params, false);
      }
      throw new PortalError("unauthorized", this.notice);
    }
    return r;
  }

  async call(params, retry = true) {
    const r = await this.callText(params, retry);
    const obj = parseJSON(r.text);
    if (!obj || typeof obj !== "object" || !("js" in obj)) {
      const action = (params.find(p => p[0] === "action") || [])[1] || "";
      throw new PortalError("bad", "HTTP " + (r.status || "?") + " · " + action);
    }
    return obj.js;
  }

  async connect() {
    const list = Stalker.candidates(this.portal.url);
    let lastError = new PortalError("bad");
    let found = null;
    for (const ep of list) {
      try {
        await this.handshake(ep);
        found = ep;
        break;
      } catch (e) {
        if (e instanceof PortalError && e.kind === "unreachable") throw e;
        lastError = e;
      }
    }
    if (!found) throw lastError;
    this.ep = found;
    await this.loadProfile();
  }

  async reauth() {
    if (!this.ep) throw new PortalError("notConnected");
    await this.handshake(this.ep);
    await this.loadProfile();
  }

  async handshake(ep) {
    const tryToken = async (tok) => {
      const url = this.buildURL(ep, [["type", "stb"], ["action", "handshake"], ["token", tok], ["prehash", "0"]]);
      const r = await httpGet(url, this.headers(ep, false));
      const obj = parseJSON(r.text);
      if (r.status !== 200 || !obj || !obj.js || typeof obj.js !== "object") {
        const path = ep.api.replace(ep.root, "") || "/";
        throw new PortalError("bad", "HTTP " + (r.status || "?") + " · " + path + (r.text ? " · " + r.text.slice(0, 60).replace(/\s+/g, " ") : ""));
      }
      return obj.js;
    };
    const js = await tryToken("");
    this.random = jstr(js.random);
    const t = jstr(js.token);
    if (t) { this.token = t; return; }
    const generated = randomHex(32);
    const js2 = await tryToken(generated);
    this.token = jstr(js2.token) || generated;
  }

  async loadProfile() {
    const ts = String(Math.floor(Date.now() / 1000));
    const metrics = JSON.stringify({ mac: this.mac, sn: this.serial, model: this.model, type: "STB", uid: this.deviceId1, random: this.random });
    const ver = "ImageDescription: 0.2.18-r23-250; ImageDate: Fri Jan 15 15:20:44 EET 2016; PORTAL version: 5.6.1; API Version: JS API version: 343; STB API version: 146; Player Engine version: 0x58c";
    const js = await this.call([
      ["type", "stb"], ["action", "get_profile"], ["hd", "1"], ["ver", ver], ["num_banks", "2"],
      ["sn", this.serial], ["stb_type", this.model], ["client_type", "STB"], ["image_version", "218"],
      ["video_out", "hdmi"], ["device_id", this.deviceId1], ["device_id2", this.deviceId2],
      ["signature", this.signature], ["auth_second_step", "1"], ["hw_version", "1.7-BD-00"],
      ["not_valid_token", "0"], ["metrics", metrics], ["hw_version_2", sha1(this.mac)],
      ["timestamp", ts], ["api_signature", "262"], ["prehash", ""]
    ], false);
    if (js && typeof js === "object") {
      this.notice = jstr(js.block_msg);
      for (const k of ["expire_billing_date", "tariff_expired_date", "end_date"]) {
        const v = jclean(js[k]);
        if (v && !v.startsWith("0000")) { this.expiry = v; break; }
      }
    }
  }

  async keepAlive() {
    try { await this.call([["type", "watchdog"], ["action", "get_events"], ["event_active_id", "0"], ["init", "0"], ["cur_play_type", "1"]]); } catch (e) { /* ignore */ }
  }

  async accountInfo() {
    const rows = [];
    try {
      const d = await this.call([["type", "account_info"], ["action", "get_main_info"]]);
      if (d && typeof d === "object") {
        const add = (title, v) => { const c = jclean(v); if (c) rows.push({ title, value: c }); };
        add("اسم الحساب", d.fname);
        add("المستخدم", d.login);
        add("الباقة", d.tariff_plan);
        const end = jclean(d.end_date) || jclean(d.phone);
        if (end) rows.push({ title: "تاريخ الانتهاء", value: end });
      }
    } catch (e) { /* optional */ }
    if (!rows.some(r => r.title === "تاريخ الانتهاء") && this.expiry) rows.push({ title: "تاريخ الانتهاء", value: this.expiry });
    return rows;
  }

  async liveList(genre, page) {
    const js = await this.call([["type", "itv"], ["action", "get_ordered_list"], ["genre", genre], ["force_ch_link_check", ""], ["fav", "0"],
      ["sortby", "number"], ["hd", "0"], ["p", String(page)]]);
    if (!js || typeof js !== "object") return { items: [], total: 0, perPage: 0 };
    return { items: jarr(js.data).map(d => this.parseChannel(d)).filter(Boolean), total: jint(js.total_items), perPage: jint(js.max_page_items) };
  }

  async genres() {
    const js = await this.call([["type", "itv"], ["action", "get_genres"]]);
    return jarr(js).map(g => ({ id: jstr(g.id), title: jstr(g.title).trim() })).filter(g => g.id);
  }

  parseChannel(d) {
    const id = jstr(d.id);
    if (!id) return null;
    let cmd = jstr(d.cmd);
    if (!cmd && jarr(d.cmds).length) cmd = jstr(jarr(d.cmds)[0].url);
    return {
      id,
      name: jstr(d.name).trim(),
      number: jint(d.number),
      cmd,
      logo: Stalker.resolve(d.logo, this.ep, true),
      genre: jstr(d.tv_genre_id),
      archive: jint(d.tv_archive) === 1 || jint(d.archive) === 1
    };
  }

  async allChannels() {
    try {
      const params = [["type", "itv"], ["action", "get_all_channels"]];
      const r = await this.callText(params);
      diag("channels text", Math.round(r.text.length / 1024) + "KB");
      let list = [];
      if (r.text.length > 2000000) {
        // a big subscription: read the channels one by one instead of parsing ~all~ the text at once
        // (one JSON.parse of tens of MB builds a huge object tree and can crash Scriptable)
        const fast = chunkedChannelList(r.text);
        if (fast) {
          for (const d of fast) { const c = d && typeof d === "object" ? this.parseChannel(d) : null; if (c) list.push(c); }
        } else {
          scanJSONArray(r.text, "data", d => { const c = this.parseChannel(d); if (c) list.push(c); });
        }
        r.text = "";
      } else {
        const obj = parseJSON(r.text);
        r.text = "";
        list = jarr(obj && obj.js && obj.js.data).map(d => this.parseChannel(d)).filter(Boolean);
      }
      if (list.length) return list;
    } catch (e) {
      if (e instanceof PortalError && e.kind === "unauthorized") throw e;
    }
    const out = [];
    const seen = new Set();
    for (let page = 1; page <= 300; page++) {
      const js = await this.call([["type", "itv"], ["action", "get_ordered_list"], ["genre", "*"], ["force_ch_link_check", ""], ["fav", "0"], ["sortby", "number"], ["hd", "0"], ["p", String(page)]]);
      if (!js || typeof js !== "object") break;
      const items = jarr(js.data).map(d => this.parseChannel(d)).filter(Boolean);
      for (const c of items) if (!seen.has(c.id)) { seen.add(c.id); out.push(c); }
      const total = jint(js.total_items);
      const per = Math.max(jint(js.max_page_items), 1);
      if (!items.length || out.length >= total || page * per >= total) break;
    }
    return out;
  }

  async shortEPG(chId) {
    let js;
    try { js = await this.call([["type", "itv"], ["action", "get_short_epg"], ["ch_id", chId], ["size", "10"]]); }
    catch (e) { return []; }
    let list = jarr(js);
    if (!list.length && js && typeof js === "object") list = jarr(js.data);
    return list.map(d => {
      const start = jint(d.start_timestamp), end = jint(d.stop_timestamp);
      if (!(start > 0 && end > start)) return null;
      return { title: jstr(d.name), start, end, info: jstr(d.descr) };
    }).filter(Boolean);
  }

  // a whole day of programmes (for the guide and catch-up); mark_archive = can be watched again
  async dayEPG(chId, date) {
    const out = [];
    for (let p = 1; p <= 5; p++) {
      let js;
      try { js = await this.call([["type", "itv"], ["action", "get_simple_data_table"], ["ch_id", chId], ["date", date], ["p", String(p)]]); }
      catch (e) { if (p === 1) throw e; break; }
      const list = jarr(js && typeof js === "object" ? js.data : js);
      list.forEach(d => {
        const start = jint(d.start_timestamp), end = jint(d.stop_timestamp);
        if (start > 0 && end > start) out.push({ id: jstr(d.id), title: jstr(d.name), start, end, info: jstr(d.descr), arc: jint(d.mark_archive) === 1 });
      });
      const total = jint(js && js.total_items), per = jint(js && js.max_page_items) || list.length;
      if (!list.length || !total || p * per >= total) break;
    }
    return out;
  }

  async categories(kind) {
    const js = await this.call([["type", kind === "movie" ? "vod" : "series"], ["action", "get_categories"]]);
    return jarr(js).map(g => ({ id: jstr(g.id), title: jstr(g.title).trim() })).filter(g => g.id);
  }

  parseVOD(d, kind) {
    const id = jstr(d.id);
    if (!id) return null;
    const episodes = jints(d.series);
    let rating = jclean(d.rating_imdb) || jclean(d.rating_kinopoisk);
    const rn = parseFloat(rating);
    if (isFinite(rn) && rn > 0) rating = rn.toFixed(1);
    const poster = jstr(d.screenshot_uri) || jstr(d.cover_big) || jstr(d.cover);
    let overview = jstr(d.description).trim();
    if (overview.toLowerCase() === "n/a") overview = "";
    return {
      id,
      name: jstr(d.name).trim(),
      cmd: jstr(d.cmd),
      poster: Stalker.resolve(poster, this.ep, false),
      overview,
      year: jclean(d.year).slice(0, 4),
      rating,
      genres: jclean(d.genres_str),
      director: jclean(d.director),
      actors: jclean(d.actors),
      duration: jclean(d.time) || jclean(d.length),
      isSeries: kind === "series" || jint(d.is_series) === 1 || episodes.length > 0,
      episodes,
      kind,
      added: parseAdded(jstr(d.added) || jstr(d.last_modified))
    };
  }

  async items(kind, category, page, search) {
    const params = [["type", kind === "movie" ? "vod" : "series"], ["action", "get_ordered_list"], ["category", category], ["genre", "*"], ["sortby", "added"], ["fav", "0"], ["p", String(page)]];
    if (search) params.push(["search", search]);
    const js = await this.call(params);
    if (!js || typeof js !== "object") return { items: [], total: 0, perPage: 0 };
    return {
      items: jarr(js.data).map(d => this.parseVOD(d, kind)).filter(Boolean),
      total: jint(js.total_items),
      perPage: jint(js.max_page_items)
    };
  }

  async seasons(item) {
    const js = await this.call([["type", "series"], ["action", "get_ordered_list"], ["movie_id", item.id], ["season_id", "0"], ["episode_id", "0"], ["p", "1"]]);
    if (!js || typeof js !== "object") return [];
    return jarr(js.data).map(s => {
      const id = jstr(s.id);
      if (!id) return null;
      return { id, name: jstr(s.name).trim() || "الموسم", cmd: jstr(s.cmd), episodes: jints(s.series) };
    }).filter(Boolean);
  }

  async episodes(item, season) {
    if (season.episodes && season.episodes.length) {
      return season.episodes.map(n => ({ id: season.id + "-" + n, title: "الحلقة " + n, cmd: season.cmd, series: String(n) }));
    }
    const js = await this.call([["type", "series"], ["action", "get_ordered_list"], ["movie_id", item.id], ["season_id", season.id], ["episode_id", "0"], ["p", "1"]]);
    if (!js || typeof js !== "object") return [];
    let i = 0;
    return jarr(js.data).map(e => {
      const id = jstr(e.id);
      if (!id) return null;
      i++;
      return { id, title: jstr(e.name).trim() || ("الحلقة " + i), cmd: jstr(e.cmd), series: jstr(e.series_number) };
    }).filter(Boolean);
  }

  async streamURL(source) {
    if (source.type === "archive") {
      const js = await this.call([["type", "tv_archive"], ["action", "create_link"], ["cmd", "auto /media/" + source.prog + ".mpg"], ["series", ""], ["forced_storage", ""], ["disable_ad", "0"], ["download", "0"]]);
      const u = js && typeof js === "object" ? Stalker.extractURL(js.cmd) : "";
      if (u && !Stalker.isBroken(u)) return u;
      throw new PortalError("noStream");
    }
    if (source.type === "live") {
      let candidate = "";
      try {
        const js = await this.call([["type", "itv"], ["action", "create_link"], ["cmd", source.cmd], ["series", ""], ["forced_storage", "undefined"], ["disable_ad", "0"], ["download", "0"]]);
        if (js && typeof js === "object") candidate = Stalker.extractURL(js.cmd);
      } catch (e) {
        if (e instanceof PortalError && e.kind === "unauthorized") throw e;
      }
      if (candidate && !Stalker.isBroken(candidate)) return candidate;
      const direct = Stalker.extractURL(source.cmd);
      if (direct && !/localhost/i.test(direct) && !Stalker.isBroken(direct)) return direct;
      throw new PortalError("noStream");
    }
    const js = await this.call([["type", "vod"], ["action", "create_link"], ["cmd", source.cmd], ["series", source.series || ""], ["forced_storage", ""], ["disable_ad", "0"], ["download", "0"]]);
    const u = js && typeof js === "object" ? Stalker.extractURL(js.cmd) : "";
    if (u && !Stalker.isBroken(u)) return u;
    const direct = Stalker.extractURL(source.cmd);
    if (direct && !/localhost/i.test(direct)) return direct;
    throw new PortalError("noStream");
  }
}


// "2026-11-15 13:45:10" (portal time, taken as UTC) or a unix time → seconds
function parseAdded(v) {
  const m = /^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})(?::(\d{2}))?/.exec(String(v || ""));
  if (m) return Math.floor(Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5], +(m[6] || 0)) / 1000);
  const n = +v;
  return n > 1e9 && n < 4e9 ? Math.floor(n) : 0;
}

// ---------- bridge handlers ----------
let client = null;
let clientPortal = null;

// ---------- per-subscription cache, written here (big lists never travel page -> Scriptable) ----------
const PC = { id: null, data: null, timer: null, dirty: false };
const LIGHT_OVER = 5000; // more live channels than this → load them category by category
const pcPath = id => cacheFile("pc2:" + id);
function writePortalCache() {
  if (!PC.dirty || !PC.id || !PC.data) return;
  PC.dirty = false;
  try {
    const text = JSON.stringify({ id: PC.id, ts: Date.now(), data: PC.data });
    if (text.length > 1000000) diag("cache write", Math.round(text.length / 1024) + "KB");
    fm.writeString(pcPath(PC.id), text);
  } catch (e) { /* storage full */ }
}
function portalCacheFor(id) {
  if (PC.id !== id) {
    writePortalCache();
    PC.id = id;
    const v = readJSON(pcPath(id), null);
    PC.data = v && v.id === id && v.data ? v.data : { pages: {} };
    if (!PC.data.pages) PC.data.pages = {};
  }
  return PC.data;
}
function savePortalCache() {
  PC.dirty = true;
  if (PC.timer) return;
  PC.timer = Timer.schedule(2500, false, () => { PC.timer = null; writePortalCache(); });
}

function need() {
  if (!client) throw new PortalError("notConnected");
  return client;
}

// ---------- downloads ----------
// Scriptable can't append to a file, so a download is kept as 4 MB pieces; the in-app engine
// plays them back (offline) through the same relay it uses for streaming.
const DL_DIR = fm.joinPath(ROOT, "downloads");
if (!fm.fileExists(DL_DIR)) fm.createDirectory(DL_DIR, true);
const DL_INDEX = fm.joinPath(DL_DIR, "index.json");
const PART = 4 * 1024 * 1024;
let DL = readJSON(DL_INDEX, []);
if (!Array.isArray(DL)) DL = [];
DL.forEach(d => { if (d.state === "running") d.state = "queued"; });
const saveDL = () => { try { fm.writeString(DL_INDEX, JSON.stringify(DL)); } catch (e) { /* ignore */ } };
const dlDir = id => fm.joinPath(DL_DIR, id);
const partPath = (id, i) => fm.joinPath(dlDir(id), "p" + String(i).padStart(5, "0") + ".bin");
let dlBusy = false;
const FINAL = {};
const goodFinal = (u, f) => typeof f === "string" && /^https?:\/\//i.test(f) && f !== u;
async function headInfo(url) {
  const req = new Request(url);
  req.method = "HEAD";
  req.headers = { Range: "bytes=0-1" };
  req.timeoutInterval = 20;
  try { req.allowInsecureRequest = true; } catch (e) { /* older Scriptable */ }
  await req.loadString();
  const r = req.response || {}, h = lowerKeys(r.headers);
  const cr = String(h["content-range"] || "");
  const total = cr.indexOf("/") > 0 ? +cr.split("/")[1] : r.statusCode === 206 ? 0 : +(h["content-length"] || 0);
  let host = "";
  try { host = String(r.url || url).split("/")[2] || ""; } catch (e) { /* ignore */ }
  const out = { status: r.statusCode || 0, total: total || 0, ranges: r.statusCode === 206 || !!cr || /bytes/i.test(h["accept-ranges"] || ""), type: h["content-type"] || "", host, final: r.url || url };
  if (goodFinal(url, out.final) && out.status < 400) FINAL[url] = out.final;
  return out;
}
async function rangeData(url, start, len) {
  const req = new Request(url);
  req.headers = { Range: "bytes=" + start + "-" + (start + len - 1) };
  req.timeoutInterval = 45;
  try { req.allowInsecureRequest = true; } catch (e) { /* older Scriptable */ }
  const data = await req.load();
  const r = req.response || {};
  if (r.statusCode !== 206) throw new Error("norange " + r.statusCode);
  if (goodFinal(url, r.url)) FINAL[url] = r.url;
  return data;
}
async function dlWorker() {
  if (dlBusy) return;
  dlBusy = true;
  try {
    for (;;) {
      const d = DL.find(x => x.state === "queued" || x.state === "running");
      if (!d) break;
      d.state = "running"; d.error = ""; saveDL();
      try { await dlRun(d); }
      catch (e) {
        if (d.state !== "running") continue;
        const m = /norange (\d+)/.exec(String(e && e.message));
        d.state = "error";
        d.error = m ? (m[1] === "200" ? "الخادم لا يسمح بالتنزيل المجزّأ — نزّله عبر Safari" : "الخادم رفض جزءاً من الملف (HTTP " + m[1] + ")") : errorText(e).split("\n")[0];
        saveDL();
      }
    }
  } finally { dlBusy = false; }
}
async function dlRun(d) {
  const fresh = async () => {
    if (!client || clientPortal !== d.portal) throw new Error("افتح الاشتراك لإكمال التنزيل");
    d.url = await client.streamURL(d.source);
    d.urlAt = Date.now();
  };
  if (!d.url || Date.now() - (d.urlAt || 0) > 4 * 60 * 1000) await fresh();
  if (!fm.fileExists(dlDir(d.id))) fm.createDirectory(dlDir(d.id), true);
  if (!d.total) {
    let info;
    try { info = await headInfo(d.url); } catch (e) { info = { status: 0, error: errorText(e).split("\n")[0] }; }
    // some servers refuse HEAD (502/405) but serve pieces fine: the page checked that with a real request
    const pr = d.probe || {};
    if ((info.status >= 400 || !info.total || !info.ranges) && pr.ranges && pr.total > 0) {
      info = { status: 206, total: pr.total, ranges: true, type: pr.type || "" };
      try { await fresh(); } catch (e) { /* keep the link */ }
    }
    if (info.status >= 400) throw new Error("الخادم رفض الرابط (HTTP " + info.status + ")");
    if (!info.total || !info.ranges) throw new Error("الخادم لا يسمح بالتنزيل داخل التطبيق (HTTP " + info.status + (info.ranges ? "" : " · بلا Range") + ") — نزّله عبر Safari");
    d.total = info.total; d.type = info.type; d.parts = Math.ceil(info.total / PART); d.done = 0;
    saveDL();
  }
  // read from the address the link redirects to; some portals give one-time links
  const target = async () => {
    if (d.oneTime) { await fresh(); return d.url; }
    return FINAL[d.url] || d.url;
  };
  while (d.done < d.parts) {
    if (d.state !== "running") return;
    const i = d.done, start = i * PART, len = Math.min(PART, d.total - start);
    let data = null;
    for (let tryN = 0; !data; tryN++) {
      try { data = await rangeData(await target(), start, len); }
      catch (e) {
        if (tryN >= 3 || d.state !== "running") throw e;
        const denied = / (401|403|404|410)$/.test(String(e.message));
        if (denied && i > 0 && tryN === 0 && Date.now() - (d.urlAt || 0) < 90000) d.oneTime = true;
        if (!denied) await sleep(1500);
        delete FINAL[d.url];
        try { if (!d.oneTime) await fresh(); } catch (x) { /* keep the old link */ }
      }
    }
    if (d.state !== "running") return;
    fm.write(partPath(d.id, i), data);
    d.done = i + 1;
    saveDL();
  }
  d.state = "done";
  d.doneAt = Date.now();
  saveDL();
}
const dlView = () => DL.map(d => ({ id: d.id, key: d.key, title: d.title, sub: d.sub, poster: d.poster, kind: d.kind, state: d.state, error: d.error || "",
  total: d.total || 0, bytes: Math.min(d.total || 0, (d.done || 0) * PART), parts: d.parts || 0, done: d.done || 0, ext: d.ext || "", source: d.source }));

const handlers = {
  async init() {
    diag("init");
    return Object.assign({}, STATE, { __prevDiag: PREV_DIAG });
  },
  async diag({ s }) { diag("page " + String(s || "").slice(0, 80)); return true; },

  async saveState({ key, value }) {
    if (typeof key !== "string" || !key) throw new Error("bad key");
    if (value === null || value === undefined) delete STATE[key]; else STATE[key] = value;
    saveState();
    return true;
  },

  // mode: "auto" (small lists load at once, big ones by category), "full", or "light" (always by category)
  async connect({ portal, mode }) {
    if (!portal || !portal.url || !portal.mac) throw new Error("بيانات البورتال ناقصة");
    diag("connect", mode || "auto");
    const c = new Stalker(portal);
    await c.connect();
    diag("portal ok");
    let genres = [];
    try { genres = await c.genres(); } catch (e) { genres = []; }
    let lazy = mode === "light";
    let total = 0;
    let first = null;
    if (mode !== "full") {
      try {
        first = await c.liveList("*", 1);
        total = first.total;
        if (total > LIGHT_OVER) lazy = true;
      } catch (e) {
        if (e instanceof PortalError && e.kind === "unauthorized") throw e;
      }
      diag("live total", total);
    }
    let channels = [];
    if (!lazy) {
      diag("channels start");
      try {
        channels = await c.allChannels();
      } catch (e) {
        if (e instanceof PortalError && e.kind === "unauthorized") throw e;
        channels = [];
      }
      diag("channels done", channels.length);
      total = channels.length;
    }
    client = c;
    clientPortal = portal.id;
    const pc = portalCacheFor(portal.id);
    pc.channels = channels;
    pc.genres = genres;
    pc.lazy = lazy;
    pc.total = total;
    if (!pc.livePages) pc.livePages = {};
    if (first && lazy) pc.livePages["*|1"] = first;
    savePortalCache();
    if (DL.some(x => x.state === "queued")) dlWorker();
    return { channels, genres, lazy, total, livePages: lazy && first ? { "*|1": first } : null, notice: c.notice || "" };
  },

  // channel search on the portal (not every portal supports it; the app checks the answer)
  async liveSearch({ q }) {
    const c = need();
    const js = await c.call([["type", "itv"], ["action", "get_ordered_list"], ["genre", "*"], ["search", String(q || "")], ["fav", "0"],
      ["sortby", "number"], ["hd", "0"], ["p", "1"]]);
    return { items: jarr(js && js.data).map(d => c.parseChannel(d)).filter(Boolean), total: jint(js && js.total_items) };
  },

  // light mode: one page of a live category
  async liveList({ genre, page }) {
    const res = await need().liveList(genre || "*", page || 1);
    if ((page || 1) === 1 && clientPortal) {
      const pc = portalCacheFor(clientPortal);
      if (!pc.livePages) pc.livePages = {};
      const key = (genre || "*") + "|1";
      delete pc.livePages[key];
      pc.livePages[key] = res;
      const keys = Object.keys(pc.livePages);
      if (keys.length > 60) keys.slice(0, keys.length - 60).forEach(k => { delete pc.livePages[k]; });
      savePortalCache();
    }
    return res;
  },

  async disconnect() { client = null; clientPortal = null; return true; },

  async extras() {
    const c = need();
    let movies = [], series = [];
    try { movies = await c.categories("movie"); } catch (e) { movies = []; }
    try { series = await c.categories("series"); } catch (e) { series = []; }
    const account = await c.accountInfo();
    if (clientPortal) {
      const pc = portalCacheFor(clientPortal);
      pc.cats = { movies, series };
      pc.account = account;
      savePortalCache();
    }
    return { movies, series, account };
  },

  async vodList({ kind, category, page, search }) {
    const res = await need().items(kind === "series" ? "series" : "movie", category, page || 1, search || "");
    if ((page || 1) === 1 && !search && clientPortal) {
      const pc = portalCacheFor(clientPortal);
      const key = kind + "|" + category + "|1";
      delete pc.pages[key];
      pc.pages[key] = res;
      const keys = Object.keys(pc.pages);
      if (keys.length > 60) keys.slice(0, keys.length - 60).forEach(k => { delete pc.pages[k]; });
      savePortalCache();
    }
    return res;
  },

  async portalCache({ id }) {
    const d = portalCacheFor(String(id || ""));
    return d && d.channels ? d : null;
  },
  async portalCacheDrop({ id }) {
    try { if (fm.fileExists(pcPath(id))) fm.remove(pcPath(id)); } catch (e) { /* ignore */ }
    if (PC.id === id) { PC.id = null; PC.data = null; PC.dirty = false; }
    return true;
  },

  async seasons({ item }) { return need().seasons(item); },
  async episodes({ item, season }) { return need().episodes(item, season); },
  async link({ source }) { return { url: await need().streamURL(source) }; },
  async epg({ id }) { return client ? client.shortEPG(id) : []; },
  async guide({ id, date }) {
    const list = await need().dayEPG(id, date);
    if (list.length) return list;
    return date === new Date().toISOString().slice(0, 10) ? client.shortEPG(id) : [];
  },
  async keepAlive() { if (client) await client.keepAlive(); return true; },

  async cacheGet({ key }) {
    const v = readJSON(cacheFile(key), null);
    return v && v.key === key ? v : null;
  },
  async cachePut({ key, text }) {
    try { fm.writeString(cacheFile(key), JSON.stringify({ key, text, ts: Date.now() })); } catch (e) { /* full */ }
    return true;
  },
  async cacheClear() {
    PC.id = null; PC.data = null; PC.dirty = false;
    for (const f of fm.listContents(CACHE_DIR)) {
      try { fm.remove(fm.joinPath(CACHE_DIR, f)); } catch (e) { /* ignore */ }
    }
    return true;
  },

  async openURL({ url }) { Safari.open(url); return true; },
  async copy({ text }) { Pasteboard.copyString(String(text || "")); return true; },
  // byte-range relay for the in-app MKV engine when the file server blocks browser access (CORS):
  // Scriptable downloads the piece itself and hands it to the page as base64.
  async rangeInfo({ url }) {
    const i = await headInfo(url);
    if (!i.ranges) return Object.assign(i, { total: 0 });
    return i;
  },
  // «فحص التشغيل»: test files next to the page, and what the server of a link allows
  async diagWrite({ files }) {
    const dir = fm.joinPath(fm.joinPath(UI_ROOT, "ui"), "diag");
    if (!fm.fileExists(dir)) fm.createDirectory(dir, true);
    for (const f of files || []) {
      const p = fm.joinPath(dir, String(f.name).replace(/[^\w.\-]/g, ""));
      if (f.text != null) fm.writeString(p, f.text); else fm.write(p, Data.fromBase64String(f.b64));
    }
    return true;
  },
  async diagLink({ url }) {
    const out = { head: { status: 0 }, ranges: false, rangeDetail: "", read: null };
    try { out.head = await headInfo(url); } catch (e) { out.head = { status: 0, host: "", error: errorText(e) }; }
    out.ranges = !!out.head.ranges && out.head.total > 0;
    out.rangeDetail = out.ranges ? "مدعوم" : "غير مدعوم (HTTP " + out.head.status + (out.head.error ? " · " + out.head.error : "") + ")";
    if (out.ranges) {
      const t0 = Date.now();
      try { const d = await rangeData(url, 0, 262144); out.read = { ok: true, detail: Math.round(262144 / 1024) + " ك.ب في " + (Date.now() - t0) + " ملّي ثانية" }; }
      catch (e) { out.read = { ok: false, detail: errorText(e) }; }
    }
    return out;
  },
  async rangeRead({ url, start, len }) {
    const once = async u => {
      const req = new Request(u);
      req.headers = { Range: "bytes=" + start + "-" + (start + len - 1) };
      req.timeoutInterval = 30;
      try { req.allowInsecureRequest = true; } catch (e) { /* older Scriptable */ }
      const data = await req.load();
      const r = req.response || {}, h = lowerKeys(r.headers);
      const cr = String(h["content-range"] || "");
      if (r.statusCode !== 206) throw new Error("norange " + r.statusCode);
      if (u === url && goodFinal(url, r.url)) FINAL[url] = r.url;
      return { b64: data.toBase64String(), total: cr.indexOf("/") > 0 ? +cr.split("/")[1] : 0 };
    };
    if (FINAL[url]) { try { return await once(FINAL[url]); } catch (e) { delete FINAL[url]; } }
    return once(url);
  },

  async dlAdd({ item }) {
    if (!item || !item.source) throw new Error("لا يمكن تنزيل هذا");
    const id = "d" + md5(item.key + "|" + JSON.stringify(item.source)).slice(0, 12);
    const old = DL.find(x => x.id === id);
    const probe = item.probe && item.probe.ranges && +item.probe.total > 0 ? { ranges: true, total: +item.probe.total, type: String(item.probe.type || "") } : null;
    if (old) { if (old.state === "error" || old.state === "paused") old.state = "queued"; if (probe) old.probe = probe; }
    else DL.unshift({ id, key: item.key, title: item.title, sub: item.subtitle || "", poster: item.poster || "", kind: item.kind || "",
      source: item.source, portal: clientPortal, state: "queued", done: 0, parts: 0, total: 0, added: Date.now(), probe });
    saveDL();
    dlWorker();
    return dlView();
  },
  async dlList() { return dlView(); },
  async dlPause({ id }) { const d = DL.find(x => x.id === id); if (d && (d.state === "running" || d.state === "queued")) d.state = "paused"; saveDL(); return dlView(); },
  async dlResume({ id }) { const d = DL.find(x => x.id === id); if (d && d.state !== "done") d.state = "queued"; saveDL(); dlWorker(); return dlView(); },
  async dlRemove({ id }) {
    const i = DL.findIndex(x => x.id === id);
    if (i >= 0) { DL[i].state = "removed"; DL.splice(i, 1); saveDL(); }
    try { if (fm.fileExists(dlDir(id))) fm.remove(dlDir(id)); } catch (e) { /* ignore */ }
    return dlView();
  },
  // offline playback: the engine asks for pieces of a downloaded file
  async localInfo({ id }) {
    const d = DL.find(x => x.id === id);
    if (!d || d.state !== "done") throw new Error("التنزيل غير مكتمل");
    return { status: 200, total: d.total, ranges: true, type: d.type || "", part: PART };
  },
  async localRead({ id, part }) {
    const p = partPath(id, part);
    if (!fm.fileExists(p)) throw new Error("جزء مفقود");
    return { b64: fm.read(p).toBase64String(), start: part * PART };
  },

  // Apple's player inside Scriptable (resolves when the user closes it — not waited for here)
  async openInApp({ url }) { try { Safari.openInApp(url, true).catch(() => {}); } catch (e) { Safari.open(url); } return true; }
};

async function dispatch(msg) {
  const fn = handlers[msg.action];
  if (!fn) return { id: msg.id, ok: false, error: "unknown action: " + msg.action };
  try {
    return { id: msg.id, ok: true, data: await fn(msg.params || {}) };
  } catch (e) {
    return { id: msg.id, ok: false, error: errorText(e) };
  }
}

// ---------- main: show the UI and serve its requests ----------
// The page and Scriptable talk WITHOUT evaluateJavaScript (calling it while the
// web view is shown can leave the screen black):
//   page -> Scriptable : a blocked navigation to https://scriptable-bridge.invalid/b?d=<json>,
//                        caught synchronously by shouldAllowRequest (returns false).
//   Scriptable -> page : each answer is written to ui/r/<session>_<id>.js, which the page
//                        loads with a <script> tag (files next to the page are readable).
const BRIDGE_HOST = "scriptable-bridge.invalid";

async function main() {
  const uiDir = fm.joinPath(UI_ROOT, "ui");
  const respDir = fm.joinPath(uiDir, "r");
  if (!fm.fileExists(uiDir)) fm.createDirectory(uiDir, true);
  try { if (fm.fileExists(respDir)) fm.remove(respDir); } catch (e) { /* ignore */ }
  fm.createDirectory(respDir, true);

  const session = Date.now().toString(36) + Math.floor(Math.random() * 1e8).toString(36);
  const indexPath = fm.joinPath(uiDir, "index.html");
  const st = STATE.settings || {};
  const boot = JSON.stringify({ theme: st.theme || 0, anim: st.anim || 0, motion: st.motion || "on" });
  fm.writeString(indexPath, UI_HTML.split("__BRIDGE_SESSION__").join(session).split("/*__BOOT__*/null").join(boot));

  const seen = new Set();
  const written = [];
  const answer = (id, result) => {
    const file = fm.joinPath(respDir, session + "_" + id + ".js");
    try {
      const text = "bridge.deliver(" + JSON.stringify(result) + ");";
      if (text.length > 1000000) diag("answer", Math.round(text.length / 1024) + "KB");
      fm.writeString(file, text);
    } catch (e) { diag("answer failed", e && e.message); }
    // answers are read within a moment; drop old ones so the folder never fills up
    // (big ones — video pieces of the relay — after 30 s)
    written.push({ file, t: Date.now(), big: (result && result.data && result.data.b64 ? result.data.b64.length : 0) > 100000 });
    const now = Date.now();
    for (let i = written.length - 1; i >= 0; i--) {
      const w = written[i];
      if (now - w.t > (w.big ? 30000 : 600000)) { try { fm.remove(w.file); } catch (e) { /* ignore */ } written.splice(i, 1); }
    }
  };
  // big messages arrive in parts ("__part"); put them back together before running them
  const parts = {};
  const run = m => {
    if (!m || !m.action || seen.has(m.id)) return;
    seen.add(m.id);
    if (m.action === "__part") {
      const p = m.params || {};
      const box = parts[p.of] || (parts[p.of] = { n: p.n, got: 0, d: [] });
      if (box.d[p.i] === undefined) { box.d[p.i] = String(p.d || ""); box.got++; }
      if (box.got === box.n) {
        delete parts[p.of];
        let real = null;
        try { real = JSON.parse(box.d.join("")); } catch (e) { real = null; }
        if (real) run(real); else answer(p.of, { id: p.of, ok: false, error: "رسالة تالفة" });
      }
      return;
    }
    dispatch(m).then(r => answer(m.id, r));
  };

  const wv = new WebView();
  wv.shouldAllowRequest = request => {
    const url = String((request && request.url) || "");
    if (url.indexOf(BRIDGE_HOST) < 0) return true;
    let batch = [];
    try {
      const i = url.indexOf("?d=");
      batch = JSON.parse(decodeURIComponent(i >= 0 ? url.slice(i + 3) : "[]"));
    } catch (e) { batch = []; }
    if (!Array.isArray(batch)) batch = [];
    for (const m of batch) run(m);
    return false;
  };

  // present as soon as the page is loaded, and never wait on it for more than 4 s
  await Promise.race([wv.loadFile(indexPath).catch(() => {}), new Promise(r => Timer.schedule(3000, false, r))]);
  diag("shown");
  await wv.present(true);
  DIAG.clean = true;
  diag("closed");
  Script.complete();
}

await main();
