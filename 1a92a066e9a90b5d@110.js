// https://observablehq.com/@palewire/sort-colors-by-hue@110
import define1 from "./e93997d5089d7165@2303.js";

function _1(md){return(
md`# Sort colors by hue

Sort randomly selected colors by hue using [@chedda86's system](https://web.archive.org/web/20150215052611/http://www.runtime-era.com/2011/11/grouping-html-hex-colors-by-hue-in.html). Developed as part of the Dec. 27, 2018 _Los Angeles Times_ story ["Cover to cover: The colors of NYRB Classics."](https://www.latimes.com/projects/la-et-jc-nyrb-covers/).`
)}

function _chart(replay,d3,DOM,width,height,createColor,randomColor,sort_by)
{
  replay;
  
  const svg = d3.select(DOM.svg(width, height));
  
  let colors = Array(Math.floor(width/3))
    .fill()
    .map(d => createColor(randomColor({luminosity: 'dark'})))
    .sort(sort_by("hue"));
  
  const x = d3.scaleBand()
    .domain(colors.map(d => d.hex))
    .range([0, width])
    .padding(0.1);
  
  svg.selectAll("rect").data(colors)
      .enter().append("rect")
          .attr("fill", d => d.hex)
          .attr("stroke-width", 0)
          .attr("data-hex", d => d.hex)
          .attr("data-hue", d => d.hue)
          .attr("data-red", d => d.red)
          .attr("data-green", d => d.green)
          .attr("data-blue", d => d.blue)
          .attr("y", 0)
          .attr("x", d => x(d.hex))
          .attr("height", "100%")
          .attr("width", x.bandwidth());
  
  return svg.node();
}


function _replay(html){return(
html`<button>▶︎ Draw random colors`
)}

function _4(md){return(
md`### Configuration`
)}

function _height(slider){return(
slider({
  min: 100, 
  max: 1000, 
  step: 10, 
  value: 300, 
  title: "Height",
})
)}

function _6(md){return(
md`### Dependencies`
)}

function _createColor(){return(
function(hex) {
    // Adapted from http://www.runtime-era.com/2011/11/grouping-html-hex-colors-by-hue-in.html
    hex = hex.slice(1);
    var colorObj = {hex: "#" + hex};
  
    /* Get the RGB values to calculate the Hue. */
    var r = parseInt(hex.substring(0, 2), 16) / 255;
    var g = parseInt(hex.substring(2, 4), 16) / 255;
    var b = parseInt(hex.substring(4, 6), 16) / 255;

    /* Getting the Max and Min values for Chroma. */
    var max = Math.max.apply(Math, [r, g, b]);
    var min = Math.min.apply(Math, [r, g, b]);

    /* Variables for HSV value of hex color. */
    var chr = max - min;
    var hue = 0;
    var val = max;
    var sat = 0;

    if (val > 0) {
        /* Calculate Saturation only if Value isn't 0. */
        sat = chr / val;
        if (sat > 0) {
            if (r == max) {
                hue = 60 * (((g - min) - (b - min)) / chr);
                if (hue < 0) {
                    hue += 360;
                }
            } else if (g == max) {
                hue = 120 + 60 * (((b - min) - (r - min)) / chr);
            } else if (b == max) {
                hue = 240 + 60 * (((r - min) - (g - min)) / chr);
            }
        }
    }
    colorObj.chroma = chr;
    colorObj.hue = hue;
    colorObj.sat = sat;
    colorObj.val = val;
    colorObj.luma = .3 * r + .59 * g + .11 * b
    colorObj.red = r;
    colorObj.green = g;
    colorObj.blue = b;
    return colorObj;
}
)}

function _sort_by(){return(
function() {
   var fields = [].slice.call(arguments),
       n_fields = fields.length;

   return function(A,B) {
       var a, b, field, key, primer, reverse, result, i;

       for(i = 0; i < n_fields; i++) {
           result = 0;
           field = fields[i];

           key = typeof field === 'string' ? field : field.name;

           a = A[key];
           b = B[key];

           if (typeof field.primer  !== 'undefined'){
               a = field.primer(a);
               b = field.primer(b);
           }

           reverse = (field.reverse) ? -1 : 1;

           if (a<b) result = reverse * -1;
           if (a>b) result = reverse * 1;
           if(result !== 0) break;
       }
       return result;
   }
}
)}

function _randomColor(require){return(
require('randomcolor')
)}

function _d3(require){return(
require("d3@5")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("chart")).define("chart", ["replay","d3","DOM","width","height","createColor","randomColor","sort_by"], _chart);
  main.variable(observer("viewof replay")).define("viewof replay", ["html"], _replay);
  main.variable(observer("replay")).define("replay", ["Generators", "viewof replay"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("viewof height")).define("viewof height", ["slider"], _height);
  main.variable(observer("height")).define("height", ["Generators", "viewof height"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("createColor")).define("createColor", _createColor);
  main.variable(observer("sort_by")).define("sort_by", _sort_by);
  main.variable(observer("randomColor")).define("randomColor", ["require"], _randomColor);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  const child1 = runtime.module(define1);
  main.import("text", child1);
  main.import("slider", child1);
  return main;
}
