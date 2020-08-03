// 参考
// https://codepen.io/tiked/pen/dyMboLo?editors=0010
// https://wizardace.com/d3-pack/
createBubble();

function createBubble() {

  // 1. 描画用のデータ準備
    const width = 1000;
    const height = width;

    const data = [
        {
            "name": "A",
            "children": [
                { "name": "B", "value": 25 },
                { "name": "C", "value": 40 },
                { "name": "D", "value": 10 }
            ]
        },
        {
            "name": "E",
            "children": [
                { "name": "F", "value": 25 },
                { "name": "G", "value": 40 },
                { "name": "H", "value": 60 }
            ]
        },
    ]

    const contents = d3.select('#bubble');
    const svg = contents.append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("transform", "translate(50,50)");

    // 2. 描画用のデータ変換
    root = d3.hierarchy(data[0]);
    root.sum(function(d) { return d.value; });
    
    const pack = d3.pack()
        .size([200, 200])
        .padding(0);
    
    pack(root);
    
    // 3. svg要素の配置
    const node = d3.select("svg").selectAll(".node")
        .data(root.descendants())
        .enter()
        .append("g")
        .attr("transform", function(d) { return "translate(" + d.x + "," + (d.y) + ")"; });
    
    const color = ["orange", "Khaki", "Ivory"];
    node.append("circle")
        .attr("r", function(d) { return d.r; })
        .attr("stroke", "black")
        .attr("fill", function(d) { return color[d.depth]; });
    
    node.append("text")
        .style("text-anchor", function(d) { return d.children ? "end" : "middle"; })
        .attr("font-size", "150%")
        .text(function(d) { return d.children ? "" : d.data.name; });

};


