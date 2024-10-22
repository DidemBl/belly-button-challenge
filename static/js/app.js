// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let metadata = data.metadata
 
    // Filter the metadata for the object with the desired sample number
    let filteredMetadata = metadata.filter(sampleObj => sampleObj.id == sample);
    let result = filteredMetadata[0];
    //Use d3 to select the panel with id of `#sample-metadata`
  
    panel = d3.select("#sample-metadata")

    // Use `.html("") to clear any existing metadata
    panel.html("");

    // Inside a loop, you will need to use d3 to append new
    Object.entries(result).forEach(([key, value]) => {
      panel.append("p").text(`${key}: ${value}`);
    });
  });
}
    // tags for each key-value in the filtered metadata.






// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let samples = data.samples

    // Filter the samples for the object with the desired sample number
    let filteredSamples = samples.filter(sampleObj => sampleObj.id == sample);
    let sampleResult = filteredSamples[0];
    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = sampleResult.otu_ids
    let otu_labels = sampleResult.otu_labels
    let sample_values = sampleResult.sample_values

    // Build a Bubble Chart
    let bubbleData = [{
      x: otu_ids,
      y: sample_values,
      mode: 'markers',
      marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: 'Viridis'
      },
      text: otu_labels
    }];
    
    let layout = {
      title: "Bacteria Cultures Per Sample",
      xaxis: {
        title: 'OTU ID'
      },
      yaxis: {
        title: 'Number of Bacteria'
      }
    };
    
    // Render the Bubble Chart
    Plotly.newPlot("bubble", bubbleData, layout);

  
   

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let labels = otu_ids.map(otu_id => `OTU ${otu_id}`);
    
    
    let valueKey = sample_values.map((value, index) => {
      return {value: value, label: labels[index] };
    });
    let sortedSample = valueKey.sort((a,b) => b.value - a.value);
    let slicedData = sortedSample.slice(0, 10);
    console.log(slicedData)

    // Build a Bar Chart
    let trace1 = {
      x: slicedData.map(data => data.value),
      y: slicedData.map(data => data.label),
      type: 'bar',
      orientation: 'h'
    };

    let layoutBar = {
      title: "Top 10 Bacteria Cultures Found",
      xaxis: {
        title: 'Number of Bacteria'
      },
      yaxis: {
        title: 'OTU IDs'
      }
    };
      // Don't forget to slice and reverse the input data appropriately
      Plotly.newPlot("bar", [trace1], layoutBar);

    // Render the Bar Chart

  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let sampleNames = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    let selector = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    for (let i = 0; i < sampleNames.length; i++){
      selector
        .append("option")
        .text(sampleNames[i])
        .property("value", sampleNames[i]);
    };

    // Get the first sample from the list
    let firstSample = sampleNames[0];

    // Build charts and metadata panel with the first sample
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

//d3.selectAll("#selDataset").on("change", optionChanged);
// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
  //if (dataset == sampleName) {
    //newSample = result;
  //}
  //updatePlotly(newSample);
//}
// Update the restyled plot's values
//function updatePlotly(newSample) {
  //Plotly.restyle("values",[newSample]);
}



// Initialize the dashboard
init();
