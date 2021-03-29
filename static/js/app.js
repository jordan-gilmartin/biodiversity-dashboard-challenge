function init() {
    d3.json("samples.json").then((initData) => {
        // console.log(initData.metadata[0].id);        
        
        var IDArray = [];

        initData.metadata.forEach((obs) => {
            IDArray.push(obs.id);
        });
        // console.log(IDArray);
        

        IDArray.forEach((ID) => {
            d3.select("#selDataset")
            .append("option")
            .text(ID)
            .property("value", ID)
        });


    // Initialise the Test Subject ID with the first test subject ID from the names list
    const firstID = IDArray[0];
    
    // // Initialise the Demographic Info and Plots with the first test subject ID
    buildPanel(firstID);
    buildBar(firstID)

    });

}    

init();


// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument
function buildBar(id) {
    d3.json("samples.json").then((barData) => {
        // console.log(barData.samples[0].otu_ids);

        var infoArray = barData.samples.filter(x => x.id == id);
        console.log(infoArray);

        var infoObject = infoArray[0];
        console.log(infoObject);
  

        // Slice the first 10 objects for plotting and reverse order due to Plotly's defaults
        var Values = infoObject.sample_values.map(row => row).slice(0, 10).reverse();
        var IDs = infoObject.otu_ids.map(row => `OTU ${row}`).slice(0, 10).reverse();
        var Labels = infoObject.otu_labels.map(row => row).slice(0, 10).reverse();

        
        // Trace1 for the Bacterial Data
        var trace1 = {
            x: Values,
            y: IDs,
            text: Labels,
            name: "Bacteria",
            type: "bar",
            orientation: "h"
        };
        // console.log(trace1);

        // data
        var chartData = [trace1];

        // Apply the group bar mode to the layout
        var layout = {
            title: "Biodiversity Results",
            margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
            }
        };

        // Render the plot to the div tag with id "bar"
        Plotly.newPlot("bar", chartData, layout);

    });


}


function buildPanel(id) {
    d3.json("samples.json").then((buildData) => {

        var infoArray = buildData.metadata.filter(x => x.id == id);
        console.log(infoArray);

        var infoObject = infoArray[0];
        console.log(infoObject);

        var metaPanel = d3.select("#sample-metadata");
        metaPanel.html("");
        Object.entries(infoObject).forEach(([key, value]) => {
            metaPanel.append("h5").text(`${key}: ${value}`);
        });

    });

}

// Update New info and Plots by optionChanged function
function optionChanged(newid) {
    buildPanel(newid);
    buildBar(newid);
}


