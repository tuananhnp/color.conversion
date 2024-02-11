import define1 from "./e93997d5089d7165@2303.js";

function _1(md){return(
md`# Perceptually valid color scales

This notebook creates perceptually valid color scales for continuous variables.

There are lots of color scale generators on the web. This one generates scales for continuous variables based on human color perception so that neighboring colors have equal separation in both hue and lightness (includng no separation). Lightness steps are important because not everyone can discriminate hues the same way.`
)}

function _2(md){return(
md`### Here are some examples:`
)}

function _3(md){return(
md`Here's are some smooth interpolations between two colors that takes equal steps in lightness, saturation, and hue from color to color:`
)}

function _4(show_scale,make_scale){return(
show_scale(make_scale("#d6191b", "#f0b6d9", 11))
)}

function _5(show_scale,make_scale){return(
show_scale(make_scale("#de3e3b", "#ffffd4", 11))
)}

function _6(md){return(
md`Or just equal steps in saturation and lightness:`
)}

function _7(show_scale,make_scale){return(
show_scale(make_scale("#FFFFFF", "#2233FF", 11))
)}

function _8(md){return(
md`Or just steps in lightness if the colors do not exceed full saturation:`
)}

function _9(show_scale,make_scale){return(
show_scale(make_scale("#2278ee", "#2222aa", 11))
)}

function _10(md){return(
md`Or just steps in hue:`
)}

function _11(show_scale,make_scale){return(
show_scale(make_scale("#b91513", "#4455d4", 11))
)}

function _12(md){return(
md`To make a divergent scale or one that takes a curved path through the color space, just concatenate two scales (but remove the duplicate color in the middle):`
)}

function _13(show_scale,make_divergent_scale){return(
show_scale(make_divergent_scale('#d6191b', '#fefec4', '#2c7bb6', 12, true))
)}

function _14(md){return(
md`It also comes out nice if you ensure the middle color has exactly the average lightness of the end colors:`
)}

function _15(show_scale,make_divergent_scale){return(
show_scale(make_divergent_scale('black', '#1166aa', 'white', 12))
)}

function _16(md){return(
md`You’re probably familiar with RGB — the triple of red-green-blue color components that represents colors shown on computer monitors. Unfortunately math in “RGB space” isn’s perceptually valid. Dividing the green component in half doesn’t make a color half as green. Adding 50 to all of components makes the color brighter by uneven amounts depending on which color you start with. That’s because the sensitivity of human color perception is uneven across the gamut of colors we can see, and the definition of RGB used by computer monitors doesn’t follow human perceptual sensitivity.

Color professionals have come up with alternative measurement systems for colors so that taking consistent arithmetic steps has a perceptually consistent effect. One such system replaces RGB with [CIE 1976 L*, u*, v* (CIE LUV) color space](https://en.wikipedia.org/wiki/CIELUV), and RGB’s cylindrical equivalent HSL with CIELCH. This page uses [Oklab LCh by Björn Ottosson](https://bottosson.github.io/posts/oklab/), which is an improvement over the 1970's-era standard color spaces and has a simple mathematical implementation.`
)}

function _17(md){return(
md`### Make your own scale:`
)}

function _c1(color){return(
color()
)}

function _c2(color){return(
color("#ff0000")
)}

function _n(slider){return(
slider({ min: 3, max: 20, step: 1 })
)}

function _21(show_scale,make_scale,c1,c2,n){return(
show_scale(make_scale(c1, c2, n), 100)
)}

function _22(make_scale,c1,c2,n){return(
make_scale(c1, c2, n).map((d) => d.hex)
)}

function _23(md){return(
md`### More examples:`
)}

function _24(DOM,make_scale,make_divergent_scale,show_scale)
{
  let color1 = ["#d7191c", "#d01c8b", "#000000"];
  let color2 = [
    "#fdae61",
    "#f1b6da",
    "#abdda4",
    "#abd9e9",
    "#E5E5E5",
    "#FFFFFF"
  ];
  let color3 = [null, "#1a9641", "#2c7bb6", "#000000"];
  let table = DOM.element("div");
  color1.forEach(c1 => {
    color2.forEach(c2 => {
      color3.forEach(c3 => {
        let s;
        if (c3 == null) s = make_scale(c1, c2, 11);
        else s = make_divergent_scale(c1, c2, c3, 11);
        table.appendChild(show_scale(s));
      });
    });
  });
  return table;
}


function _25(md){return(
md`## Code:`
)}

function _make_scale(OklabHcl,interpolate_colors,d3color){return(
function(c1, c2, n) {
  // Construct a scale of d3color instances.
  //let colorspace = d3color.hcl;
  let colorspace = OklabHcl;
  let scale = [];
  for (var v = 0; v < n; v++)
    scale.push(interpolate_colors(c1, c2, v / (n - 1), colorspace));

  // When forming a scale between two highly saturated colors, the colors
  // on the scale may leave the RGB gamut. Although we could clamp the
  // R, G, B components of the colors on the scale, this would result in
  // non-perceptually-uniform jumps on the scale. Better is to revise the
  // scale holistically. The easiest way to keep colors in the RGB gamut
  // is to reduce the chroma value of the colors. We'll reduce the chroma
  // values at the intermediate points on the scale smoothly, if necessary,
  // and, in case a large change in necessary, we'll also revise the end
  // points on the scale and return different colors than the user asked
  // for. We'll iterate a few times until we get to the minimal change that
  // keeps the scale within the RGB gamut using a bisection-like algorithm.
  let ctr = 0,
    s = 0,
    smin = 0,
    smax = .33;
  while (ctr < 10 && smin < .99 * smax) {
    let all_in_rgb_gamut =
      scale.map(reduce_chroma).filter(in_rgb_gamut).length == scale.length;
    if (all_in_rgb_gamut) {
      if (s == 0) break;
      smax = s;
      s = (s + smin) / 2;
    } else {
      smin = s;
      s = (s + smax) / 2;
    }
    ctr++;
  }
  scale = scale.map(reduce_chroma);
  function reduce_chroma(c, i) {
    // Reduce the chroma value of c by s when in the middle of the generated
    // color scale (0 < i < n) and not at the ends, because we assume the caller
    // has given ends that are in the RGB gamut, unless s is large and then
    // also reduce the color at the ends.
    let t = (i / (n - 1)) * Math.PI;
    let sm = .2; // 1 means do not modify end colors, 0 means shift all colors evenly including ends
    let s0 = s < sm ? 0 : s - sm;
    let s1 = Math.min(s, sm) * Math.sin(t);
    return colorspace(c.h, Math.max(0, c.c * (1 - (s0 + s1))), c.l);
  }
  function in_rgb_gamut(c) {
    var crgb = c.rgb();
    return !(
      crgb.r < 0 ||
      crgb.r > 255 ||
      crgb.g < 0 ||
      crgb.g > 255 ||
      crgb.b < 0 ||
      crgb.b > 255
    );
  }

  // Return a data structure with helpful info besides the interpolated
  // color.
  function bwcontrast(c) {
    // Choose a light or dark grey for a foreground
    // text color that will be most contrast-y with
    // then given color.
    c = d3color.hcl(c.rgb());
    if (c.l < 60) c.l = 93;
    // white-ish
    else c.l = 7; // black-ish
    c.c /= 5; // reduce chroma (saturation)
    return c;
  }
  return scale.map(c => {
    return {
      color: c,
      rgb: c.rgb(),
      css: c.rgb().toString(),
      hex: c.rgb().formatHex(),
      fg_contrast_color: bwcontrast(c).toString()
    };
  });
}
)}

function _Oklab(d3color){return(
function(c) {
  // Oklab is a non-standard color space designed by Björn Ottosson
  // and described at https://bottosson.github.io/posts/oklab/. It
  // is easily convertible to/from RGB. This method returns a function
  // compatible with e.g. d3color.rgb. It accepts either three arguments
  // (L, a, and b) or a d3color convertible to RGB.

  let linear_srgb_to_oklab = function(c) {
    let l = 0.4121656120 * c.r + 0.5362752080 * c.g + 0.0514575653 * c.b;
    let m = 0.2118591070 * c.r + 0.6807189584 * c.g + 0.1074065790 * c.b;
    let s = 0.0883097947 * c.r + 0.2818474174 * c.g + 0.6302613616 * c.b;

    let l_ = Math.cbrt(l);
    let m_ = Math.cbrt(m);
    let s_ = Math.cbrt(s);

    return {
      l: 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_,
      a: 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_,
      b: 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_
    };
  };

  let oklab_to_linear_srgb = function(lab) {
    let l_ = lab.l + 0.3963377774 * lab.a + 0.2158037573 * lab.b;
    let m_ = lab.l - 0.1055613458 * lab.a - 0.0638541728 * lab.b;
    let s_ = lab.l - 0.0894841775 * lab.a - 1.2914855480 * lab.b;

    let l = l_ * l_ * l_;
    let m = m_ * m_ * m_;
    let s = s_ * s_ * s_;

    return {
      r: +4.0767245293 * l - 3.3072168827 * m + 0.2307590544 * s,
      g: -1.2681437731 * l + 2.6093323231 * m - 0.3411344290 * s,
      b: -0.0041119885 * l - 0.7034763098 * m + 1.7068625689 * s
    };
  };

  let srgb_to_linear_srgb = function(rgb) {
    function f(x) {
      if (x >= 0.04045) return ((x + 0.055) / (1 + 0.055)) ** 2.4;
      else return x / 12.92;
    }
    return {
      r: f(rgb.r / 255) * 255,
      g: f(rgb.g / 255) * 255,
      b: f(rgb.b / 255) * 255
    };
  };

  let linear_srgb_to_srgb = function(rgb) {
    function f(x) {
      if (x >= 0.0031308) return (1.055 * x) ** (1.0 / 2.4 - 0.055);
      else return 12.92 * x;
    }
    return {
      r: f(rgb.r / 255) * 255,
      g: f(rgb.g / 255) * 255,
      b: f(rgb.b / 255) * 255
    };
  };

  let Lab;

  if (arguments.length == 3) {
    Lab = {
      l: arguments[0],
      a: arguments[1],
      b: arguments[2]
    };
  } else {
    // Convert from a d3color via RGB.
    c = d3color.rgb(c);
    Lab = linear_srgb_to_oklab(srgb_to_linear_srgb(c));
  }

  Lab.rgb = function() {
    let rgb = linear_srgb_to_srgb(oklab_to_linear_srgb(this));
    return d3color.rgb(rgb.r, rgb.g, rgb.b);
  };
  return Lab;
}
)}

function _OklabHcl(Oklab){return(
function(clr) {
  // Returns a function compatible with d3color.lch.
  // It accepts either three arguments (L, c, and h)
  // or a d3color convertible to RGB. The L and c
  // components are scaled to be similar to the scale
  // of d3color.lch which is [0,100], [0,250ish], and
  // [0,360].
  let L, c, h;
  if (arguments.length == 3) {
    h = arguments[0];
    c = arguments[1];
    L = arguments[2];
  } else {
    // Convert from a d3color via Oklab.

    // Apply a gamma correction because near-black colors
    // take up too much of the color space. (Is this a problem
    // with Oklab or the linear-to-regular RGB transformation?)

    let lab = Oklab(clr);
    L = (lab.l / 6.341251097100847) * 100;
    L = (Math.max(L, 0) / 100) ** 2.5 * 100; // GAMMA CORRECTION ^
    c = Math.sqrt(lab.a ** 2 + lab.b ** 2) * 100;
    h = (Math.atan2(lab.b, lab.a) * 180) / Math.PI;
  }
  return {
    l: L,
    c: c,
    h: h,
    rgb: function() {
      // Convert to RGB via Oklab.
      let l = (this.l / 100) ** (1 / 2.5) * 100; // GAMMA CORRECTION ^
      let lab = Oklab(
        (l / 100) * 6.341251097100847,
        (this.c * Math.cos((this.h * Math.PI) / 180)) / 100,
        (this.c * Math.sin((this.h * Math.PI) / 180)) / 100
      );
      return lab.rgb();
    }
  };
}
)}

function _make_divergent_scale(d3color,make_scale){return(
function(c1, c2, c3, n, allow_lightnesss_change) {
  if (!allow_lightnesss_change) {
    // Ensure c2 is mid-way between c1 and c3 on the lightness dimension
    // so that we guarantee equal lightness steps on both sides of the scale.
    c1 = d3color.hcl(c1);
    c2 = d3color.hcl(c2);
    c3 = d3color.hcl(c3);
    c2.l = (c1.l + c3.l) / 2;
  }

  let scale1 = make_scale(c1, c2, parseInt(n / 2 + .5));
  let scale2 = make_scale(c2, c3, parseInt(n / 2 + .5));
  scale2.shift(); // first entry is c2 which is last entry of first scale
  return scale1.concat(scale2);
}
)}

function _interpolate_colors(){return(
function(c1, c2, v, colorspace) {
  // Interpolate to find a color between c1, c2 at v in the range [0, 1].
  // If v == 0, c1 is returned. If v == 1, c2 is returned.
  //
  // c1 and c2 are d3colors or anything convertible to a d3color via d3color.lch.
  // See: https://github.com/d3/d3-color#color
  //
  // A d3.color is returned. Use .toString() or .formatHex() to get a CSS color.
  //
  // A linear-like interpolation is performed in a Lch color space.
  // The interpolation is non-linear when c1 or c2 is grey because hue is
  // undefined or unstable in that part of the color space, and for black/white
  // chroma (saturation) is too.

  // Convert to Lch space using the color space provide as the argument
  // to this function. It can be d3color.lch (CIELCHab) or OklabLch.
  c1 = colorspace(c1);
  c2 = colorspace(c2);

  if (c1 == null || !isFinite(c1.l))
    throw "First color did not convert: " + JSON.stringify(c1);
  if (c2 == null || !isFinite(c2.l))
    throw "Second color did not convert: " + JSON.stringify(c2);

  // Check that we're going the right way in hues.
  // We might want to go through 360 instead of
  // going back toward zero. d3color's lch function
  // returns NaN hues at black and white, so check for
  // that first.
  if (isFinite(c1.h) && isFinite(c2.h)) {
    if (c2.h < c1.h - 180) c2.h += 360;
    if (c1.h < c2.h - 180) c1.h += 360;
  }

  // We always interpolate the lightness and chroma value linearly
  // between the two colors. But when chroma is zero (or very close),
  // at black, graey, and white, hue has no meaning. The hue value
  // for these colors may be NaN or meaningless, and an interpolation
  // with NaN or a meaningless hue will be meaningless. In these
  // cases we interpolate the hue differently --- we either keep the
  // hue value of the color that is not at chroma=0 or we pull the
  // hue toward the color that is not very close to chroma=0 so that
  // we ease into a hue that is less meaningful.
  function min(a, b) {
    return a > b ? b : a;
  }
  function max(a, b) {
    return a < b ? b : a;
  }
  function safepow(a, b) {
    return isFinite(b) ? a ** b : 0;
  }
  let vh = v;
  if (c1.c < 10) vh = v ** max(c1.c / 10, 0);
  if (c2.c < 10) vh = safepow(v, 1 / max(c2.c / 10, 0));

  // Interpolate and re-form a new color instance.
  let c = colorspace(
    (1 - vh) * c1.h + vh * c2.h,
    (1 - v) * c1.c + v * c2.c,
    (1 - v) * c1.l + v * c2.l
  );

  // Clamp chroma very near the poles (only) since at the poles
  // of the bi-cone that makes up the Lch space the chroma
  // and hue values have no meaning and may convert to RGB
  // outside of the RGB space, resulting in poor clamping
  // later.
  var ll = Math.max(0, Math.min(c.l, 100 - c.l, 100));
  c.c = Math.min(c.c, 1000 * Math.tan((ll / 100) * Math.PI));

  return c;
}
)}

function _show_scale(DOM){return(
function (scale, opacity) {
  let table = DOM.element("div");
  scale.forEach((c) => {
    let cell = DOM.element("span");
    table.appendChild(cell);
    cell.setAttribute(
      "style",
      "display: inline-block; opacity: " +
        opacity +
        "%" +
        ";background-color: " +
        c.css +
        "; color: " +
        c.fg_contrast_color +
        "; padding: 2em 6px 3px 6px; font-size: 75%; font-family: var(--monospace, mono, monospace);"
    );
    cell.appendChild(DOM.text(c.hex.replace(/#/, "")));
  });
  table.style.cursor = "pointer";
  table.onclick = () => {
    navigator.clipboard.writeText(JSON.stringify(scale.map((d) => d.hex)));
  };
  return table;
}
)}

function _d3color(require){return(
require("d3-color")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["show_scale","make_scale"], _4);
  main.variable(observer()).define(["show_scale","make_scale"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["show_scale","make_scale"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["show_scale","make_scale"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["show_scale","make_scale"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer()).define(["show_scale","make_divergent_scale"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer()).define(["show_scale","make_divergent_scale"], _15);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer("viewof c1")).define("viewof c1", ["color"], _c1);
  main.variable(observer("c1")).define("c1", ["Generators", "viewof c1"], (G, _) => G.input(_));
  main.variable(observer("viewof c2")).define("viewof c2", ["color"], _c2);
  main.variable(observer("c2")).define("c2", ["Generators", "viewof c2"], (G, _) => G.input(_));
  main.variable(observer("viewof n")).define("viewof n", ["slider"], _n);
  main.variable(observer("n")).define("n", ["Generators", "viewof n"], (G, _) => G.input(_));
  main.variable(observer()).define(["show_scale","make_scale","c1","c2","n"], _21);
  main.variable(observer()).define(["make_scale","c1","c2","n"], _22);
  main.variable(observer()).define(["md"], _23);
  main.variable(observer()).define(["DOM","make_scale","make_divergent_scale","show_scale"], _24);
  main.variable(observer()).define(["md"], _25);
  main.variable(observer("make_scale")).define("make_scale", ["OklabHcl","interpolate_colors","d3color"], _make_scale);
  main.variable(observer("Oklab")).define("Oklab", ["d3color"], _Oklab);
  main.variable(observer("OklabHcl")).define("OklabHcl", ["Oklab"], _OklabHcl);
  main.variable(observer("make_divergent_scale")).define("make_divergent_scale", ["d3color","make_scale"], _make_divergent_scale);
  main.variable(observer("interpolate_colors")).define("interpolate_colors", _interpolate_colors);
  main.variable(observer("show_scale")).define("show_scale", ["DOM"], _show_scale);
  main.variable(observer("d3color")).define("d3color", ["require"], _d3color);
  const child1 = runtime.module(define1);
  main.import("slider", child1);
  const child2 = runtime.module(define1);
  main.import("color", child2);
  return main;
}
