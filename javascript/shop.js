var items;
var load = () => {
    items = localStorage.getItem("cart");
    items = JSON.parse(items);
    if (items == null || Object.keys(items).length === 0) {
        var temp = document.getElementById("empty-template");
        var clon = temp.content.cloneNode(true);
        var list = document.getElementsByClassName("products-container")[0]
        // list.removeChild( document.getElementById("shop-table"));
        list.appendChild(clon);
    }
    else {
        const body = document.getElementsByClassName("products-container")[0];
        tbl = document.createElement('table');
        // tbl.style.width = '100px';
        tbl.id = "shop_table"
        // tbl.style.border = '1px solid black';
        var headerCell = document.createElement("TH");
        var tr = tbl.insertRow();
        var td = tr.insertCell();
        td.innerHTML = "Name";
        td = tr.insertCell();
        td.innerHTML = "Image";
        td = tr.insertCell();
        td.innerHTML = "Price";
        td = tr.insertCell();
        td.innerHTML = "Quantity";
        var total = 0;
        for (let id in items) {
            p = products[id];
            tr = tbl.insertRow();
            td = tr.insertCell();
            td.innerHTML = p.name
            td = tr.insertCell();
            td.innerHTML = `<img class='s-img' src=${"images/products/" + p.img}></img>`;
            td = tr.insertCell();
            td.innerHTML = p.price;
            td = tr.insertCell();
            td.innerHTML = items[id]
            total += (items[id] * p.price);
        }
        body.appendChild(tbl);
        // display total
      var item = document.createElement("div");
      item.className = "c-total";
      item.id = "c-total";
      item.innerHTML = "<h1>TOTAL: $" + total + "</h1>";
      body.appendChild(item);

      // checkout and empty
      item = document.getElementById("buy-now").content.cloneNode(true);
      body.appendChild(item);

    }
}


window.addEventListener("DOMContentLoaded", () => {
    load();
})