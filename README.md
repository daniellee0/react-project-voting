# VoteFact Web Application

## Collaboration
This web application makes full use of both partners interactions (Form+Graphs and Map). Descriptive content from both partners was also included and a larger focus on Daniel's design was involved in this web application. These interactions
provide the user an added level of interactivity when learning/analyting voting data. Daniel's design was modified to
account for Kyle's county level data and so the design is focused on counties. 


## How to Interact in its Current State (Stage 3)
Our web application has two main components, both designed to teach users about voting in Washington state. 

The first section utilizes an external csv file representing the data that will be used to display analytics. Although not implemented at this time, new entries should be added to the csv file every time the user submits a new form. For now, the user should enter a county name already present in the csv file and should click "Begin" to see analytical information about that County (eg. "Pierce", "King", etc). Casing is ignored. 

The second section utilizes an external csv file containing data on voter registration and voter turnout rates for each WA state county, and then maps it on a Leaflet map based off of fields chosen by the user on buttons above the map. The user can switch betweeen different years, different ages, and different focuses. 

## Libraries Used
Boostrap, ChartJS, PapaParse, Leaflet, LeafletReact, ChartReact

## Authors
Kyle Avalani

Daniel Lee

Link: https://info340b-a18.github.io/project-daniellee0/

https://github.com/info340b-a18/react-project-voting