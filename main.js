var fs = require('fs')
var ndx = require('ndx')
var csv = require('fast-csv')
var stream = fs.createReadStream('corpus.csv')
contents = []
var index = new ndx.DocumentIndex();
var csvStream = csv()
    .on("data", function(data) {
        contents.push(data[1]);
    })
    .on("end", function() {
        index.addField('content');
        var start = new Date();
        for (var i = 0 ; i < contents.length ; i++) {
            contents[i] = {'id': i, 'content': contents[i]};
            index.add(contents.id, contents);
        }
        var end = new Date();
        console.log("Time to insert " + contents.length + " documents: " + (end - start));
        // Search for the word "times"
        start = new Date();
        index.search("times");
        end = new Date();
        console.log(end - start);

    });
stream.pipe(csvStream);
