// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument
d3.json("samples.json").then((importedData) => {
//   console.log(importedData.samples[0].otu_ids);
  var data = importedData;

  // Slice the first 10 objects for plotting and reverse order due to Plotly's defaults
  var Values = data.samples[0].sample_values.map(row => row).slice(0, 10).reverse();
  var IDs = data.samples[0].otu_ids.map(row => `OTU ${row}`).slice(0, 10).reverse();
  var Labels = data.samples[0].otu_labels.map(row => row).slice(0, 10).reverse();




    // Trace1 for the Bacterial Data
    var trace1 = {
        x: Values,
        y: IDs,
        text: Labels,
        name: "Bacteria",
        type: "bar",
        orientation: "h"
    };
    console.log(trace1);

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

    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("bar", chartData, layout);


});