import define1 from "./1b3a22cd8be84c2f@73.js";
import define2 from "./5a59b457a394ff1c@444.js";
import define3 from "./e93997d5089d7165@2303.js";
import define4 from "./1a92a066e9a90b5d@110.js";
import define5 from "./0c800138c487d3e1@860.js";
import define6 from "./b2bbebd2f186ed03@1312.js";
import define7 from "./e85ff620b9eff715@1530.js";

function _title(md){return(
md`# Color Space Conversion
`
)}

function _dashboard2(html,$0,md,$1,$2,$3,swatches,rgb1,pickerColorSpace,colorPickerForm,colorPickerForm1,colorPickerForm2){return(
html`<table align ="center" style="width: 100%"> 
      <tr>
        <td align ="left">   
          ${$0}
          ${md`#### Adjust parameters:`}
          ${$1}
          ${$2}
          ${$3}
          ${swatches(["rgb" + "(" + rgb1 +
                      ")"])}
                      <code> <big> ${pickerColorSpace[1].channel[0]},
${pickerColorSpace[1].channel[1]}, ${pickerColorSpace[1].channel[2]}(${colorPickerForm.toFixed(2)},  
                      ${colorPickerForm1.toFixed(2)}, ${colorPickerForm2.toFixed(2)})</code>
        </td>
    </tr>
  </table>`
)}

function _dashboard1(html,$0){return(
html`<table align ="center" style="width: 100%"> 
      <tr> 
        <td  align ="left">
          ${$0}
        </td>
    </tr>
  </table>`
)}

function _dashboard3(html,$0,$1,$2,$3,rgb22){return(
html`<table  align ="center" style="width: 100%"> 
      <tr> 
        <td  align ="left">   
          ${$0}
          ${$1}
          ${$2}
          ${$3}
          ${rgb22}
        </td>
    </tr>
  </table>`
)}

function _picker(Inputs,md,hexbyname,as){return(
Inputs.color({
  label: md`#### Pick a color:`,
  value: hexbyname.get(as),
  width: 255,
  submit: false
})
)}

function _pickerColorSpace2(Inputs,spaces,md){return(
Inputs.select(Object.entries(spaces), {label: md`#### Select output color space:`, format: d => d[1].alias ?? d[0].toUpperCase()})
)}

function _rgb22(html,swatches,rgb2,pickerColorSpace2,cv2){return(
html`${swatches(["rgb" + "(" + rgb2 + ")"])} <code> <big> ${pickerColorSpace2[1].channel[0]},
${pickerColorSpace2[1].channel[1]}, ${pickerColorSpace2[1].channel[2]}(${cv2[0].toFixed(2)}, ${cv2[1].toFixed(2)}, ${cv2[2].toFixed(2)})</code>`
)}

function _colorPickerForm20(Inputs,pickerColorSpace2,cv2){return(
Inputs.range([Math.min(pickerColorSpace2[1].min[0], cv2[0]),
                                       Math.max(pickerColorSpace2[1].max[0], cv2[0])], 
                            {label: pickerColorSpace2[1].channel[0].toUpperCase(), value: cv2[0],
                                          format: (d) => d.toFixed(2), disabled: true,
                                          precision: 2
                            }
                           )
)}

function _colorPickerForm21(Inputs,pickerColorSpace2,cv2){return(
Inputs.range([Math.min(pickerColorSpace2[1].min[1], cv2[1]),
                                       Math.max(pickerColorSpace2[1].max[1], cv2[1])], 
                            {label: pickerColorSpace2[1].channel[1].toUpperCase(), value: cv2[1],
                                          format: (d) => d.toFixed(2), disabled: true,
                                          precision: 2
                            }
                           )
)}

function _colorPickerForm22(Inputs,pickerColorSpace2,cv2){return(
Inputs.range([Math.min(pickerColorSpace2[1].min[2], cv2[2]),
                                       Math.max(pickerColorSpace2[1].max[2], cv2[2])], 
                            {label: pickerColorSpace2[1].channel[2].toUpperCase(), value: cv2[2],
                                          format: (d) => d.toFixed(2), disabled: true,
                                          precision: 2,
                            }
                           )
)}

function _pickerColorSpace(Inputs,spaces,md){return(
Inputs.select(Object.entries(spaces),{label: md`#### Select input color space:`, 
                                  format: d => d[1].alias ?? d[0].toUpperCase()
                                 })
)}

function _colorPickerForm(Inputs,pickerColorSpace,cv1){return(
Inputs.range([Math.min(pickerColorSpace[1].min[0], cv1[0]),
                                       Math.max(pickerColorSpace[1].max[0], cv1[0])], 
                            {label: pickerColorSpace[1].channel[0].toUpperCase(), value: cv1[0],
                                          format: (d) => d.toFixed(2),
                                          precision: 2
                            }
                           )
)}

function _colorPickerForm1(Inputs,pickerColorSpace,cv1){return(
Inputs.range([Math.min(pickerColorSpace[1].min[1], cv1[1]),
                                       Math.max(pickerColorSpace[1].max[1], cv1[1])], 
                            {label: pickerColorSpace[1].channel[1].toUpperCase(), value: cv1[1],
                                          format: (d) => d.toFixed(2),
                                          precision: 2
                            }
                           )
)}

function _colorPickerForm2(Inputs,pickerColorSpace,cv1){return(
Inputs.range([Math.min(pickerColorSpace[1].min[2], cv1[2]),
                                       Math.max(pickerColorSpace[1].max[2], cv1[2])], 
                            {label: pickerColorSpace[1].channel[2].toUpperCase(), value: cv1[2],
                                          format: (d) => d.toFixed(2),
                                          precision: 2
                            }
                           )
)}

function _as(autoSelect,pointsLookup,md){return(
autoSelect({
  //options: Object.keys(data),
  class: "autoSelect",
  options: pointsLookup,
  value: "Steel Blue",
  title: md`Select a color name from 29372 colors <br>(<i>replace texts to filter):`,
  width: 500,
  placeholder: "Enter texts to filter"
})
)}

function _style(html,color_namer,picker){return(
html`<style>.swatch {
  padding: 5px;
  margin-left: 2px;
  border-radius: 8px;
  color: white;
  background-color: ${color_namer(picker)['basic'][0]['name']};
}`
)}

function _styles(html){return(
html`
<link rel="stylesheet" href="https://unpkg.com/pickr-widget@0.2.0/dist/pickr.min.css"/>
<style>
  /* Make sure picker stays above other Observable elements. */
  .pcr-app.visible {
    z-index: 10000000;
  }
  /* Allow our value label to be appended with good alignment. */
  .pickr {
    display: inline-block;
    vertical-align: middle;
  }
</style>
`
)}

function _pointsLookup(cnl){return(
Object.keys(cnl).map(function(key) {
    let row = cnl[key]
    return `${row.name}`
})
)}

function _color_namer(require){return(
require('https://unpkg.com/color-namer@1.3.0/dist/color-namer.js')
)}

function _cnl(require){return(
require("color-name-list")
)}

function _hexbyname(cnl){return(
new Map(
    cnl.map(d => [d.name, d.hex]))
)}

function _csp(){return(
import('https://cdn.skypack.dev/color-space@2.0.0')
)}

function _spaces(csp){return(
csp.default
)}

function _33(spaces){return(
Object.entries(spaces)[1]
)}

function _34(spaces,pickerColorSpace){return(
Object.entries(spaces).filter(d => d[0] === pickerColorSpace[1].name)[0][1]
)}

function _cv1(pickerColorSpace,rgb,spaces){return(
pickerColorSpace[1].name === "rgb"? rgb: Object.entries(spaces)[0][1][pickerColorSpace[1].name](rgb)
)}

function _cv2(pickerColorSpace,pickerColorSpace2,colorPickerForm,colorPickerForm1,colorPickerForm2,spaces){return(
pickerColorSpace[1].name === pickerColorSpace2[1].name ? [colorPickerForm, colorPickerForm1, colorPickerForm2]: Object.entries(spaces).filter(d => d[0] === pickerColorSpace[1].name)[0][1][pickerColorSpace2[1].name]([colorPickerForm, colorPickerForm1, colorPickerForm2])
)}

function _rgb1(pickerColorSpace,colorPickerForm,colorPickerForm1,colorPickerForm2,spaces){return(
pickerColorSpace[1].name === "rgb"? [colorPickerForm, colorPickerForm1, colorPickerForm2]: Object.entries(spaces).filter(d => d[0] === pickerColorSpace[1].name)[0][1].rgb([colorPickerForm, colorPickerForm1, colorPickerForm2])
)}

function _rgb2(pickerColorSpace2,colorPickerForm20,colorPickerForm21,colorPickerForm22,spaces){return(
pickerColorSpace2[1].name === "rgb"? [colorPickerForm20, colorPickerForm21, colorPickerForm22]: Object.entries(spaces).filter(d => d[0] === pickerColorSpace2[1].name)[0][1].rgb([colorPickerForm20, colorPickerForm21, colorPickerForm22])
)}

function _rgb(d3,picker){return(
[d3.color(picker).r, d3.color(picker).g, d3.color(picker).b]
)}

function _rgb2it(rgb2){return(
[Math.round(rgb2[0]), Math.round(rgb2[1]), Math.round(rgb2[2])]
)}

function _bgc(rgb2it){return(
"rgb" + "(" + rgb2it + ")"
)}

function _nietos(){return(
[]
)}

function _43(nietos){return(
nietos[nietos.length - 1]
)}

function _44(picker){return(
picker
)}

function _swatches(html){return(
function swatches(colors) {
  return html`${colors.map(c => `<div title="${c}" style="
  display: inline-block;
  vertical-align: middle;
  margin-right: 5px;
  width: 43px;
  height: 43px;
  background: ${c};
"></div>`)}`;
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer("title")).define("title", ["md"], _title);
  main.variable(observer("dashboard2")).define("dashboard2", ["html","viewof pickerColorSpace","md","viewof colorPickerForm2","viewof colorPickerForm1","viewof colorPickerForm","swatches","rgb1","pickerColorSpace","colorPickerForm","colorPickerForm1","colorPickerForm2"], _dashboard2);
  main.variable(observer("dashboard1")).define("dashboard1", ["html","viewof picker"], _dashboard1);
  main.variable(observer("dashboard3")).define("dashboard3", ["html","viewof pickerColorSpace2","viewof colorPickerForm20","viewof colorPickerForm21","viewof colorPickerForm22","rgb22"], _dashboard3);
  main.variable(observer("viewof picker")).define("viewof picker", ["Inputs","md","hexbyname","as"], _picker);
  main.variable(observer("picker")).define("picker", ["Generators", "viewof picker"], (G, _) => G.input(_));
  main.variable(observer("viewof pickerColorSpace2")).define("viewof pickerColorSpace2", ["Inputs","spaces","md"], _pickerColorSpace2);
  main.variable(observer("pickerColorSpace2")).define("pickerColorSpace2", ["Generators", "viewof pickerColorSpace2"], (G, _) => G.input(_));
  main.variable(observer("rgb22")).define("rgb22", ["html","swatches","rgb2","pickerColorSpace2","cv2"], _rgb22);
  main.variable(observer("viewof colorPickerForm20")).define("viewof colorPickerForm20", ["Inputs","pickerColorSpace2","cv2"], _colorPickerForm20);
  main.variable(observer("colorPickerForm20")).define("colorPickerForm20", ["Generators", "viewof colorPickerForm20"], (G, _) => G.input(_));
  main.variable(observer("viewof colorPickerForm21")).define("viewof colorPickerForm21", ["Inputs","pickerColorSpace2","cv2"], _colorPickerForm21);
  main.variable(observer("colorPickerForm21")).define("colorPickerForm21", ["Generators", "viewof colorPickerForm21"], (G, _) => G.input(_));
  main.variable(observer("viewof colorPickerForm22")).define("viewof colorPickerForm22", ["Inputs","pickerColorSpace2","cv2"], _colorPickerForm22);
  main.variable(observer("colorPickerForm22")).define("colorPickerForm22", ["Generators", "viewof colorPickerForm22"], (G, _) => G.input(_));
  main.variable(observer("viewof pickerColorSpace")).define("viewof pickerColorSpace", ["Inputs","spaces","md"], _pickerColorSpace);
  main.variable(observer("pickerColorSpace")).define("pickerColorSpace", ["Generators", "viewof pickerColorSpace"], (G, _) => G.input(_));
  main.variable(observer("viewof colorPickerForm")).define("viewof colorPickerForm", ["Inputs","pickerColorSpace","cv1"], _colorPickerForm);
  main.variable(observer("colorPickerForm")).define("colorPickerForm", ["Generators", "viewof colorPickerForm"], (G, _) => G.input(_));
  main.variable(observer("viewof colorPickerForm1")).define("viewof colorPickerForm1", ["Inputs","pickerColorSpace","cv1"], _colorPickerForm1);
  main.variable(observer("colorPickerForm1")).define("colorPickerForm1", ["Generators", "viewof colorPickerForm1"], (G, _) => G.input(_));
  main.variable(observer("viewof colorPickerForm2")).define("viewof colorPickerForm2", ["Inputs","pickerColorSpace","cv1"], _colorPickerForm2);
  main.variable(observer("colorPickerForm2")).define("colorPickerForm2", ["Generators", "viewof colorPickerForm2"], (G, _) => G.input(_));
  main.variable(observer("viewof as")).define("viewof as", ["autoSelect","pointsLookup","md"], _as);
  main.variable(observer("as")).define("as", ["Generators", "viewof as"], (G, _) => G.input(_));
  main.variable(observer("style")).define("style", ["html","color_namer","picker"], _style);
  main.variable(observer("styles")).define("styles", ["html"], _styles);
  main.variable(observer("pointsLookup")).define("pointsLookup", ["cnl"], _pointsLookup);
  const child1 = runtime.module(define1);
  main.import("serialize", child1);
  const child2 = runtime.module(define2);
  main.import("table", child2);
  const child3 = runtime.module(define3);
  main.import("color", child3);
  const child4 = runtime.module(define3);
  main.import("textarea", child4);
  main.variable(observer("color_namer")).define("color_namer", ["require"], _color_namer);
  const child5 = runtime.module(define4);
  main.import("chart", child5);
  const child6 = runtime.module(define5);
  main.import("colorPicker", child6);
  const child7 = runtime.module(define3);
  main.import("select", child7);
  main.import("autoSelect", child7);
  const child8 = runtime.module(define6);
  main.import("rangeSlider", child8);
  const child9 = runtime.module(define7);
  main.import("show_scale", child9);
  main.import("make_scale", child9);
  main.import("make_divergent_scale", child9);
  main.variable(observer("cnl")).define("cnl", ["require"], _cnl);
  main.variable(observer("hexbyname")).define("hexbyname", ["cnl"], _hexbyname);
  main.variable(observer("csp")).define("csp", _csp);
  main.variable(observer("spaces")).define("spaces", ["csp"], _spaces);
  main.variable(observer()).define(["spaces"], _33);
  main.variable(observer()).define(["spaces","pickerColorSpace"], _34);
  main.define("initial cv1", ["pickerColorSpace","rgb","spaces"], _cv1);
  main.variable(observer("mutable cv1")).define("mutable cv1", ["Mutable", "initial cv1"], (M, _) => new M(_));
  main.variable(observer("cv1")).define("cv1", ["mutable cv1"], _ => _.generator);
  main.variable(observer("cv2")).define("cv2", ["pickerColorSpace","pickerColorSpace2","colorPickerForm","colorPickerForm1","colorPickerForm2","spaces"], _cv2);
  main.variable(observer("rgb1")).define("rgb1", ["pickerColorSpace","colorPickerForm","colorPickerForm1","colorPickerForm2","spaces"], _rgb1);
  main.variable(observer("rgb2")).define("rgb2", ["pickerColorSpace2","colorPickerForm20","colorPickerForm21","colorPickerForm22","spaces"], _rgb2);
  main.variable(observer("rgb")).define("rgb", ["d3","picker"], _rgb);
  main.variable(observer("rgb2it")).define("rgb2it", ["rgb2"], _rgb2it);
  main.variable(observer("bgc")).define("bgc", ["rgb2it"], _bgc);
  main.variable(observer("nietos")).define("nietos", _nietos);
  main.variable(observer()).define(["nietos"], _43);
  main.variable(observer()).define(["picker"], _44);
  main.variable(observer("swatches")).define("swatches", ["html"], _swatches);
  return main;
}
