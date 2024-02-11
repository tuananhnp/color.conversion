// https://observablehq.com/@palewire/saving-json@73
function _1(md){return(
md`# Saving JSON

Download a JSON object as a plain text file. Based on [@mbostock/saving-svg](https://beta.observablehq.com/@mbostock/saving-svg).`
)}

function _2(md){return(
md`Our sample dataset is Iowa's annual electrical production, taken from [vega-datasets](https://github.com/vega/vega-datasets/). Their definition:

> The state of Iowa has dramatically increased its production of renewable wind power in recent years. This file contains the annual net generation of electricity in the state by source in thousand megawatthours.

`
)}

function _iowa(){return(
[{"year":"2001-01-01","source":"Fossil Fuels","net_generation":35361},
{"year":"2002-01-01","source":"Fossil Fuels","net_generation":35991},
{"year":"2003-01-01","source":"Fossil Fuels","net_generation":36234},
{"year":"2004-01-01","source":"Fossil Fuels","net_generation":36205},
{"year":"2005-01-01","source":"Fossil Fuels","net_generation":36883},
{"year":"2006-01-01","source":"Fossil Fuels","net_generation":37014},
{"year":"2007-01-01","source":"Fossil Fuels","net_generation":41389},
{"year":"2008-01-01","source":"Fossil Fuels","net_generation":42734},
{"year":"2009-01-01","source":"Fossil Fuels","net_generation":38620},
{"year":"2010-01-01","source":"Fossil Fuels","net_generation":42750},
{"year":"2011-01-01","source":"Fossil Fuels","net_generation":39361},
{"year":"2012-01-01","source":"Fossil Fuels","net_generation":37379},
{"year":"2013-01-01","source":"Fossil Fuels","net_generation":34873},
{"year":"2014-01-01","source":"Fossil Fuels","net_generation":35250},
{"year":"2015-01-01","source":"Fossil Fuels","net_generation":32319},
{"year":"2016-01-01","source":"Fossil Fuels","net_generation":28437},
{"year":"2017-01-01","source":"Fossil Fuels","net_generation":29329},
{"year":"2001-01-01","source":"Nuclear Energy","net_generation":3853},
{"year":"2002-01-01","source":"Nuclear Energy","net_generation":4574},
{"year":"2003-01-01","source":"Nuclear Energy","net_generation":3988},
{"year":"2004-01-01","source":"Nuclear Energy","net_generation":4929},
{"year":"2005-01-01","source":"Nuclear Energy","net_generation":4538},
{"year":"2006-01-01","source":"Nuclear Energy","net_generation":5095},
{"year":"2007-01-01","source":"Nuclear Energy","net_generation":4519},
{"year":"2008-01-01","source":"Nuclear Energy","net_generation":5282},
{"year":"2009-01-01","source":"Nuclear Energy","net_generation":4679},
{"year":"2010-01-01","source":"Nuclear Energy","net_generation":4451},
{"year":"2011-01-01","source":"Nuclear Energy","net_generation":5215},
{"year":"2012-01-01","source":"Nuclear Energy","net_generation":4347},
{"year":"2013-01-01","source":"Nuclear Energy","net_generation":5321},
{"year":"2014-01-01","source":"Nuclear Energy","net_generation":4152},
{"year":"2015-01-01","source":"Nuclear Energy","net_generation":5243},
{"year":"2016-01-01","source":"Nuclear Energy","net_generation":4703},
{"year":"2017-01-01","source":"Nuclear Energy","net_generation":5214},
{"year":"2001-01-01","source":"Renewables","net_generation":1437},
{"year":"2002-01-01","source":"Renewables","net_generation":1963},
{"year":"2003-01-01","source":"Renewables","net_generation":1885},
{"year":"2004-01-01","source":"Renewables","net_generation":2102},
{"year":"2005-01-01","source":"Renewables","net_generation":2724},
{"year":"2006-01-01","source":"Renewables","net_generation":3364},
{"year":"2007-01-01","source":"Renewables","net_generation":3870},
{"year":"2008-01-01","source":"Renewables","net_generation":5070},
{"year":"2009-01-01","source":"Renewables","net_generation":8560},
{"year":"2010-01-01","source":"Renewables","net_generation":10308},
{"year":"2011-01-01","source":"Renewables","net_generation":11795},
{"year":"2012-01-01","source":"Renewables","net_generation":14949},
{"year":"2013-01-01","source":"Renewables","net_generation":16476},
{"year":"2014-01-01","source":"Renewables","net_generation":17452},
{"year":"2015-01-01","source":"Renewables","net_generation":19091},
{"year":"2016-01-01","source":"Renewables","net_generation":21241},
{"year":"2017-01-01","source":"Renewables","net_generation":21933}]
)}

function _4(md){return(
md`You can serialize and download the JSON using this button.`
)}

function _5(DOM,serialize,iowa){return(
DOM.download(serialize(iowa), null, "Download JSON")
)}

function _serialize(){return(
function serialize (data) {
 let s = JSON.stringify(data);
 return new Blob([s], {type: "application/json"}) 
}
)}

function _7(md){return(
md`To use this in your own notebook, import from this notebook:

\`\`\`js
import {serialize} from "@palewire/saving-json"
\`\`\`

Then display the download button:

\`\`\`js
DOM.download(serialize(data), null, "Download JSON")
\`\`\`

Happy downloading!`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("iowa")).define("iowa", _iowa);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["DOM","serialize","iowa"], _5);
  main.variable(observer("serialize")).define("serialize", _serialize);
  main.variable(observer()).define(["md"], _7);
  return main;
}
