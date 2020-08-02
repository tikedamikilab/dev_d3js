createsvg();

function createsvg() {
    const contents = d3.select('#example');
    const svg = contents.append("svg");

    let dataset = [
        {
            x : 100,
            y : 70,
        },
        {
            x : 200,
            y : 30,
        },
        {
            x : 300,
            y : 60,
        },
    ]

    width = contents.node().clientWidth;
    height = contents.node().clientHeight;

    let color = d3.rgb("#85a7cc");

    line = d3.line()
        // lineのX軸をセット
        .x(function(d) { return d.x; })
        // lineのY軸をセット
        .y(function(d) { return d.y; });

    path = svg.append("path")
        // dataをセット
        .datum(dataset)
        // 塗りつぶしをなしに
        .attr("fill", "none")
        // strokeカラーを設定
        .attr("stroke", color)
        .attr("stroke-width", 10)
        // d属性を設定
        .attr("d", line(dataset));

};