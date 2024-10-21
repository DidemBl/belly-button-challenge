// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
  let metadata = data.metadata
 
    // Filter the metadata for the object with the desired sample number
  let filteredMetadata = metadata.filter(sampleObj => sampleObj.id == sample);
  let result = filteredMetadata[0];
  //Use d3 to select the panel with id of `#sample-metadata`
  
  panel = d3.select("sample-metadata")

    // Use `.html("") to clear any existing metadata
  panel.html("");

    // Inside a loop, you will need to use d3 to append new
  for (let i = 0; i<filteredMetadata.length ;i++){
    panel.append("card-body").text(filteredMetadata[0])
  };

    // tags for each key-value in the filtered metadata.

  });
}





// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
  let samples = data.samples

    // Filter the samples for the object with the desired sample number
  let filteredSamples = metadata.filter(sampleObj => sampleObj.id == sample);
  let sampleResult = filteredSamples[0];
    // Get the otu_ids, otu_labels, and sample_values
  let otu_ids = sampleResult.otu_ids
  let otu_labels = sampleResult.otu_labels
  let sample_values = sampleResult.sample_values

    // Build a Bubble Chart
    let data = {
      x: otu_ids,
      y:  sample_values,
      mode: 'markers',
      size: sample_values,
      color: otu_ids
    };
    
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
    Plotly.newPlot("plot", data, layout);

  
   

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks


    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately


    // Render the Bar Chart

  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field


    // Use d3 to select the dropdown with id of `#selDataset`


    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.


    // Get the first sample from the list


    // Build charts and metadata panel with the first sample

  });
}

d3.selectAll("#selDataset").on("change", optionChanged);
// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  let dropdownMenu = d3.select("#selDataset");
  let dataset = dropdownMenu.this("value");
  if (dataset == sampleObj.id) {
    newdata = result;
  }
  updatePlotly(newdata);
}
// Update the restyled plot's values
function updatePlotly(newdata) {
  Plotly.restyle("values",[newdata]);
}



// Initialize the dashboard
init();
