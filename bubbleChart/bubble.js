// 参考
// https://codepen.io/tiked/pen/dyMboLo?editors=0010
// https://wizardace.com/d3-pack/
createBubble();

function createBubble() {

  // 1. 描画用のデータ準備
    const width = 300;
    const height = width;
    const data = {
        "name":top,
        "children":[
            {
                "name": "A",
                "children": [
                { "name": "B", "value": 25 },
                { "name": "C", "value": 40 },
                { "name": "D", "value": 60 }
                ]
            },
            {
                "name": "A",
                "children": [
                { "name": "B", "value": 25 },
                { "name": "C", "value": 40 },
                { "name": "D", "value": 60 }
                ]
            }    
        ]
    };

    const contents = d3.select('#bubble');
    const svg = contents.append("svg")
            .attr("width", width)
            .attr("height", height)

    // 2. 描画用のデータ変換
    root = d3.hierarchy(data);
    root.sum(function(d) { return d.value; });
    
    const pack = d3.pack()
        .size([width, height])
        .padding(10);
    
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
        .attr("stroke", "white")
        .attr("fill", function(d) { return d.children ? "white" : color[d.depth]; });
    
    node.append("text")
        .style("text-anchor", function(d) { return d.children ? "end" : "middle"; })
        .attr("font-size", "150%")
        .text(function(d) { return d.children ? "" : d.data.name; });

};


