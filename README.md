# meteor d3

###
Implementing d3.js (http://bl.ocks.org/mbostock/3885304) BarChart in a Meteor context

###Issue
```
d3.tsv("data.tsv", type, function(error, data) {}
```
This doesn't seem to work properly.
No files are loading unless they're in the public directory. And even then it looks like meteor is caching the file somehow. Changing its content will not change the data shown, even after a restart...

###Temporary fix
Create a collection and import data from csv or tsv file :
```
mongoimport -h localhost:3001 --db meteor --drop --collection alpha --type csv --file public/data.csv --headerline
```
Benefit from reactivity by using template.autorun! 
