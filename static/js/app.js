// Initializing default info
function init() {
    d3.json("samples.json").then((initData) => {
        // console.log(initData.metadata[0].id);        
        
        // Create empty array to hold ID data
        var IDArray = [];

        // Loop through metadata to grab IDs and push to IDArray
        initData.metadata.forEach((obs) => {
            IDArray.push(obs.id);
        });
        // console.log(IDArray);
        

        // Loop through IDArray to link ID Nos. to HTML
        IDArray.forEach((ID) => {
            d3.select("#selDataset")
            .append("option")
            .text(ID)
            .property("value", ID)
        });


    // Create variable to hold first ID No. in IDArray
    const firstID = IDArray[0];
    
    // Call functions to display info, Panel and Bar are ID specific
    buildPanel(firstID);
    buildBar(firstID);
    buildBubble(firstID);

    });

}    

init();



// Build function to display Bar Chart
function buildBar(id) {
    d3.json("samples.json").then((barData) => {
        // console.log(barData.samples[0].otu_ids);

        // Filter by id to match user selection with our JSON data
        var infoArray = barData.samples.filter(x => x.id == id);
        console.log(infoArray);

        // Grabbing zeroth element of the filtered metadata
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
            title: "Top 10 Bacteria Cultures Found",
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


// Build function to display Panel
function buildPanel(id) {
    d3.json("samples.json").then((buildData) => {

        // Filter by id to match user selection with our JSON data
        var infoArray = buildData.metadata.filter(x => x.id == id);
        console.log(infoArray);

        // Grabbing zeroth element of the filtered metadata
        var infoObject = infoArray[0];
        console.log(infoObject);

        // Looping through metadata to display in panel
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
    buildBubble(newid);
}




// Build function to display Bubble Chart
function buildBubble(id) {
    d3.json("samples.json").then((bubbleData) => {
        // console.log(bubbleData.samples[0].otu_ids);

        
        // Filter by id to match user selection with our JSON data
        var infoArray = bubbleData.samples.filter(x => x.id == id);
        console.log(infoArray);

        // Grabbing zeroth element of the filtered metadata
        var infoObject = infoArray[0];
        console.log(infoObject);
  

        // Create variables and reverse order due to Plotly's defaults
        var Values = infoObject.sample_values.map(row => row).reverse();
        var IDs = infoObject.otu_ids.map(row => row).reverse();
        var Labels = infoObject.otu_labels.map(row => row).reverse();


        // Trace1 for the Bacterial Data
        var trace1 = {
            x: IDs,
            y: Values,
            text: Labels,
            mode: 'markers',
            marker: {
            color: IDs,
            size: Values
            }
        };
        
        var data = [trace1];
        
        var layout = {
            title: 'Bacteria Cultures Per Sample',
            showlegend: false,
            height: 600,
            width: 1200
        };
        
        Plotly.newPlot('bubble', data, layout);

    });

}