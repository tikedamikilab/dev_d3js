createsvg();

function createsvg() {
    const contents = d3.select('#example');
    const svg = contents.append("svg")
            .attr("viewBox", "0 0 1000 1000")
    

    let dataset = [
        [
            {
                x : 100,
                y : 70,
            },
            {
                x : 300,
                y : 300,
            }
        ],
        [
            {
                x : 100,
                y : 70,
            },
            {
                x : 400,
                y : 100,
            }
        ]
    ]

    let color = d3.rgb("#85a7cc");

    // 描画の軸を決定？消すと上手くいかない
    line = d3.line()
        // lineのX軸をセット
        .x(function(d) { return d.x; })
        // lineのY軸をセット
        .y(function(d) { return d.y; });

    for (let i = 0; i < dataset.length; i++){
        // path全体の設定
        path = svg.append("path")
            // 塗りつぶしをなしに
            .attr("fill", "none")
            // strokeカラーを設定
            .attr("stroke", color)
            // stroke幅
            .attr("stroke-width", 10)
            // idを設定
            .attr("id", "path"+i)
            .attr("d", line(dataset[i]));
    }
    
    lineText = svg.append("text")
        .data(dataset[0])
        .style("font-size", "20px")
        // 位置調整
        .attr("transform", "translate(" + (dataset[0][1].x - dataset[0][0].x + 10)/2 + "," + (dataset[0][1].y- dataset[0][0].y)/2 + ")") 
        .append("textPath")
            .attr("xlink:href", "#path0")
            .text("できた？")

};