// 参考
// https://codepen.io/tiked/pen/dyMboLo?editors=0010
// https://wizardace.com/d3-pack/
createBubble();

function createBubble() {

  // 1. 描画用のデータ準備
    const width = 1000;
    const height = width;

    const contents = d3.select('#bubble');
    const svg = contents.append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("transform", "translate(50,50)");

    // 線を引く
    const linedata = [
        [
            {
                x : 100,
                y : 100,
            },
            {
                x : 500,
                y : 300,
            }
        ],
    ]

    line = d3.line()
        // lineのX軸をセット
        .x(function(d) { return d.x; })
        // lineのY軸をセット
        .y(function(d) { return d.y; });

    for (let i = 0; i < linedata.length; i++){
        // path全体の設定
        path = svg.append("path")
            // 塗りつぶしをなしに
            .attr("fill", "none")
            // strokeカラーを設定
            .attr("stroke", "red")
            // stroke幅
            .attr("stroke-width", 10)
            // idを設定
            .attr("id", "path"+i)
            .attr("d", line(linedata[i]));
    }
    
    lineText = svg.append("text")
        .data(linedata[0])
        .style("font-size", "20px")
        // 位置調整
        .attr("transform", "translate(" + (linedata[0][1].x - linedata[0][0].x + 40)/2 + "," + (linedata[0][1].y- linedata[0][0].y)/2 + ")") 
        .append("textPath")
            .attr("xlink:href", "#path0")
            .text("できた？")

    const wordCloudData = [
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

    // 2. 描画用のデータ変換
    root = d3.hierarchy(wordCloudData[0]);
    root.sum(function(d) { return d.value; });
    
    root2 = d3.hierarchy(wordCloudData[1]);
    root2.sum(function(d) { return d.value; });

    const pack = d3.pack()
        .size([200, 200])
        .padding(0);
    
    pack(root);
    pack(root2);
    
    // 3. svg要素の配置
    
    const node = d3.select("svg").selectAll(".node")
        .data(root.descendants()) 
        .enter()
        .append("g")
        .attr("transform", function(d) { return "translate(" + (d.x) + "," + (d.y) + ")"; });
    
    const color = ["orange", "Khaki", "Ivory"];
    node.append("circle")
        .attr("r", function(d) { return d.r; })
        .attr("stroke", "black")
        .attr("fill", function(d) { return color[d.depth]; });
    
    node.append("text")
        .style("text-anchor", function(d) { return d.children ? "end" : "middle"; })
        .attr("font-size", "150%")
        .text(function(d) { return d.children ? "" : d.data.name; });

    // *************************************

    const node2 = d3.select("svg").selectAll(".node")
        .data(root2.descendants()) 
        .enter()
        .append("g")
        .attr("transform", function(d) { return "translate(" + (400 + d.x) + "," + (200 + d.y) + ")"; });
    
    node2.append("circle")
        .attr("r", function(d) { return d.r; })
        .attr("stroke", "black")
        .attr("fill", function(d) { return color[d.depth]; });
    
    node2.append("text")
        .style("text-anchor", function(d) { return d.children ? "end" : "middle"; })
        .attr("font-size", "150%")
        .text(function(d) { return d.children ? d.data.name : d.data.name; });

};


