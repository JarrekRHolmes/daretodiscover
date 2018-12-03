var parent = $("#parent");
var divs = parent.children();
while (divs.length) {
  parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
}
