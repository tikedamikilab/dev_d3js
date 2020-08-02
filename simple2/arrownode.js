createsvg();

function createsvg() {
    var svg = d3.select("#example").append("svg")
        .attr({
            width: 640,
            height: 480,
        });

    var c1 = [100, 90, 30];
    var c2 = [200, 120, 20];
    var carray = [c1, c2];

    // line関数を定義 (x,y)は配列の[0],[1]とする。
    var line = d3.svg.line()
        .x(function (d) { return d[0]; })
        .y(function (d) { return d[1]; });

    // path要素を作成
    var path = svg.append('path')
        .attr({
            'd': line(carray),
            'stroke': 'lightgreen',
            'stroke-width': 5,
        });
};