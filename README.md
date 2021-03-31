# biodiversity-dashboard-challenge

In this assignment, I built an interactive dashboard to explore the [Belly Button Biodiversity dataset](http://robdunnlab.com/projects/belly-button-biodiversity/), which catalogs the microbes that colonize human navels.

The dataset reveals that a small handful of microbial species (also  called operational taxonomic units, or OTUs, in the study) were present  in more than 70% of people, while the rest were relatively rare.

## 

## Plotly

I used the D3 library to read in a JSON file.

I created a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

I also made a bubble chart that displays each sample.

There is also a panel that displays the sample metadata, i.e., an individual's demographic information.

All of the plots update any time that a new sample is selected.



