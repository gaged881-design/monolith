(function () {
  "use strict";
  var C = window.MONOLITH || {};
  var $ = function (id) { return document.getElementById(id); };
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  // ---- plans
  var names = { monthly: "Monthly", yearly: "Yearly", lifetime: "Lifetime" };
  var extras = {
    monthly: ["Both apps + Toolbox", "A fresh key every month you stay", "Cancel any time"],
    yearly: ["Both apps + Toolbox", "A fresh key each year", "2 months free vs monthly"],
    lifetime: ["Both apps + Toolbox", "The key never expires", "All future updates included"],
  };
  var plans = $("plans");
  if (plans && C.plans) {
    plans.innerHTML = Object.keys(names).map(function (k) {
      var p = C.plans[k] || {}, best = C.highlight === k;
      var buy = p.id
        ? '<a class="btn ' + (best ? "primary" : "") + '" href="' + esc((C.checkoutBase || "") + p.id) + '" target="_blank" rel="noopener">Get ' + names[k] + "</a>"
        : '<span class="btn" aria-disabled="true">Available soon</span>';
      return '<div class="card plan' + (best ? " best" : "") + '">' + (best ? '<span class="badge">BEST VALUE</span>' : "") +
        "<h3>" + names[k] + '</h3><div class="price">' + esc(p.price || "") + "<small>" + esc(p.per || "") + "</small></div>" +
        '<p>' + esc(p.note || "") + '</p><ul class="ticks">' + extras[k].map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul>" + buy + "</div>";
    }).join("");
  }

  // ---- download, support, policy
  if ($("dl")) { $("dl").href = C.downloadUrl || "#"; }
  if ($("dl-ver")) { $("dl-ver").textContent = C.toolboxVersion ? "Toolbox v" + C.toolboxVersion + " · Windows 10/11 64-bit" : ""; }
  if ($("dl-sha")) { $("dl-sha").textContent = C.toolboxSha256 || ""; }
  if ($("smartscreen")) { $("smartscreen").hidden = !!C.codeSigned; }
  if ($("manage") && C.manageUrl) { $("manage").href = C.manageUrl; }
  if ($("refund") && C.refundPolicy) { $("refund").hidden = false; $("refund").textContent = "Refunds: " + C.refundPolicy; }
  if ($("support-line")) {
    $("support-line").innerHTML = C.supportEmail
      ? 'Email <a href="mailto:' + esc(C.supportEmail) + '">' + esc(C.supportEmail) + "</a>. Include your Whop receipt if it is about a key."
      : esc(C.supportNote || "");
  }

  // ---- code rain (hero only): cheap, paused when hidden, off for reduced motion
  var canvas = $("rain"), toggle = $("rain-toggle");
  if (!canvas || !canvas.getContext || (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches)) { return; }
  var ctx = canvas.getContext("2d"), glyphs = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉ0123456789", size = 16, cols = [], rgb = false, timer = null, hue = 0;
  try { rgb = localStorage.getItem("rain") === "rgb"; } catch (e) { /* private window */ }
  function label() { toggle.textContent = "rain: " + (rgb ? "rgb" : "blue"); toggle.setAttribute("aria-pressed", String(rgb)); }
  function fit() {
    var r = canvas.getBoundingClientRect(), d = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = r.width * d; canvas.height = r.height * d; ctx.setTransform(d, 0, 0, d, 0, 0);
    cols = []; for (var i = 0; i < Math.ceil(r.width / size); i++) { cols.push(Math.random() * r.height / size); }
    ctx.fillStyle = "#0b0d12"; ctx.fillRect(0, 0, r.width, r.height);
  }
  function tick() {
    var r = canvas.getBoundingClientRect();
    ctx.fillStyle = "rgba(11,13,18,0.16)"; ctx.fillRect(0, 0, r.width, r.height);
    ctx.font = size + "px Consolas, monospace"; hue = (hue + 1) % 360;
    for (var i = 0; i < cols.length; i++) {
      ctx.fillStyle = rgb ? "hsl(" + ((hue + i * 9) % 360) + ",90%,65%)" : "#6c8cff";
      ctx.fillText(glyphs.charAt(Math.floor(Math.random() * glyphs.length)), i * size, cols[i] * size);
      cols[i] = cols[i] * size > r.height && Math.random() > 0.975 ? 0 : cols[i] + 1;
    }
  }
  function run() { if (!timer) { timer = setInterval(tick, 70); } }
  function stop() { clearInterval(timer); timer = null; }
  fit(); label(); run();
  window.addEventListener("resize", fit);
  document.addEventListener("visibilitychange", function () { if (document.hidden) { stop(); } else { run(); } });
  if ("IntersectionObserver" in window) { new IntersectionObserver(function (e) { if (e[0].isIntersecting) { run(); } else { stop(); } }).observe(canvas); }
  toggle.addEventListener("click", function () { rgb = !rgb; label(); try { localStorage.setItem("rain", rgb ? "rgb" : "blue"); } catch (e) { /* ignore */ } });
})();
