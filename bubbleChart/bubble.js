createBubble();

function createBubble() {

    data = [
        {
            name: "CommunityStructure",
            title: "flare/analytics/cluster/CommunityStructure",
            group: "analytics",
            value: 3812
        },
        {
            name: "HierarchicalCluster",
            title: "flare/analytics/cluster/HierarchicalCluster",
            group: "analytics",
            value: 6714,
        },
        {
            name: "Easing",
            title: "flare/animate/Easing",
            group: "animate",
            value: 17010
        }
    ]

    const root = pack(data);

    const contents = d3.select('#bubble');
    const svg = contents.append("svg")
        .attr("viewBox", [0, 0, width, height])
        .attr("font-size", 10)
        .attr("font-family", "sans-serif")
        .attr("text-anchor", "middle");

    const width = 800
    const height = width

    color = d3.scaleOrdinal(data.map(d => d.group), d3.schemeCategory10)
    
    const leaf = svg.selectAll("g")
        .data(root.leaves())
        .join("g")
        .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`);

    leaf.append("circle")
        .attr("id", d => (d.leafUid = DOM.uid("leaf")).id)
        .attr("r", d => d.r)
        .attr("fill-opacity", 0.7)
        .attr("fill", d => color(d.data.group));

    leaf.append("clipPath")
        .attr("id", d => (d.clipUid = DOM.uid("clip")).id)
        .append("use")
        .attr("xlink:href", d => d.leafUid.href);

    leaf.append("text")
        .attr("clip-path", d => d.clipUid)
        .selectAll("tspan")
        .data(d => d.data.name.split(/(?=[A-Z][a-z])|\s+/g))
        .join("tspan")
        .attr("x", 0)
        .attr("y", (d, i, nodes) => `${i - nodes.length / 2 + 0.8}em`)
        .text(d => d);

    leaf.append("title")
        .text(d => `${d.data.title === undefined ? "" : `${d.data.title}`}${format(d.value)}`);

    return svg.node();
};


