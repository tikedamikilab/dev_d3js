createsvg();

function createsvg() {
    const contents = d3.select('#example');
    const svg = contents.append("svg");

    width = contents.node().clientWidth;
    height = contents.node().clientHeight;

    

};