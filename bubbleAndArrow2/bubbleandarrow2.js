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
        {
            value:0.5,
            linepath:[
                { x : 100, y : 100 },
                { x : 500, y : 300 }
            ],
        }
    ]

    line = d3.line()
        // lineのX軸をセット
        .x(d => d.x)
        // lineのY軸をセット
        .y(d => d.y);

    let path = []
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
            .attr("d", line(linedata[i].linepath));
    }
    
    lineText = svg.append("text")
        .style("font-size", "20px")
        // 位置調整
        .attr("transform", "translate(" 
            + (linedata[0].linepath[1].x - linedata[0].linepath[0].x - 60)/2
            + ","
            + (linedata[0].linepath[1].y - linedata[0].linepath[0].y - 60)/2
            + ")") 
        .append("textPath")
            .attr("xlink:href", "#path0")
            .text("できた？")

    const wordCloudData = [
        {
            name: "A",
            children: [
                { name: "B", value: 25 },
                { name: "C", value: 40 },
                { name: "D", value: 10 }
            ]
        },
        {
            name: "E",
            children: [
                { name: "F", value: 25 },
                { name: "G", value: 40 },
                { name: "H", value: 60 }
            ]
        },
    ]

    // 2. 描画用のデータ変換
    // node 配置
    const pack = d3.pack()
        .size([200, 200])
        .padding(0);

    const root = []
    for (let i = 0; i < wordCloudData.length; i++) {
        root[i] = d3.hierarchy(wordCloudData[i]);
        root[i].sum(function(d) { return d.value; });
        pack(root[i]);
    }

    const node = [];
    // 3. svg要素の配置
    for (let i = 0; i < wordCloudData.length; i++) {
        node[i] = d3.select("svg").selectAll(".node")
        .data(root[i].descendants()) 
        .enter()
        .append("g")
    }
    node[0].attr("transform", d => "translate(" + (d.x) + "," + (d.y) + ")" );
    node[1].attr("transform", d => "translate(" + (400 + d.x) + "," + (200 + d.y) + ")" );

    console.log(node)

    const color = ["orange", "Khaki", "Ivory"];

    for (let i = 0; i < wordCloudData.length; i++) {
        node[i].append("circle")
        .attr("r", d => d.r)
        .attr("stroke", "none")
        .attr("fill", d => color[d.depth]);
    
        node[i].append("text")
            .style("text-anchor", d => d.children ? "end" : "middle")
            .attr("font-size", "150%")
            .text(d => d.children ? "" : d.data.name);
    }


    // //link作成
    // const linkData = [
    //     {source: "A", target: "E", value: 5},
    // ];

    // const links = linkData.map(d => Object.create(d));
    // const nodes = wordCloudData.map(d => Object.create(d));
    
    // const link = svg.append("g")
    //     .attr("stroke", "#999")
    //     .attr("stroke-opacity", 0.6)
    //     .selectAll("line")
    //     .data(links)
    //     .join("line")
    //     .attr("stroke-width", d => Math.sqrt(d.value));

    // const simulation = d3.forceSimulation(nodes)
    //     .force("link", d3.forceLink(links).id(d => d.name));

    // simulation.on("tick", () => {
    //     link
    //         .attr("x1", d => d.source.x)
    //         .attr("y1", d => d.source.y)
    //         .attr("x2", d => d.target.x)
    //         .attr("y2", d => d.target.y);
    // });

};

