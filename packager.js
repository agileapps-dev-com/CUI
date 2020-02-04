// require modules
var fs = require('fs');
var archiver = require('archiver');
var readline = require("readline");
var tmpls = process.argv.slice(2);
var packageName, packageVersion;
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Provide the name for the package: ", function(name) {
    rl.question("Package version: ", function(ver) {
        console.log(`${name} package version is ${ver}`);
		packageName = name;
		packageVersion = ver;
		rl.close();
    });
});

rl.on("close", function() {
	var itr = 0;
	while(itr < tmpls.length ){
		archive(tmpls[itr]);
		itr++;
	}
});

function createTemplateJsonFile(packageName, packageVersion, template) {
	var writeStream = fs.createWriteStream('src/' + template + '/template-details.json');
	const template_details = '{ "name": "'+packageName+'", "version": "'+packageVersion+'" }';
	writeStream.write(template_details);
	writeStream.end();
}


function archive(templatename) {
  
  var template = templatename || "";
  packageName = packageName || templatename || ""; 
  packageVersion = packageVersion || "1.0";	

  createTemplateJsonFile(packageName, packageVersion, template); 
  
// create a file to stream archive data to.
var output = fs.createWriteStream(__dirname + '/dist/'+packageName+'_'+packageVersion+'.zip'); 
var archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level.
});
 
// listen for all archive data to be written
// 'close' event is fired only when a file descriptor is involved
output.on('close', function() {
  console.log(archive.pointer() + ' total bytes');
  console.log('archiver has been finalized and the output file descriptor has closed.');
  process.exit(); 
});
 
// This event is fired when the data source is drained no matter what was the data source.
// It is not part of this library but rather from the NodeJS Stream API.
// @see: https://nodejs.org/api/stream.html#stream_event_end
output.on('end', function() {
  console.log('Data has been drained');
});
 
// good practice to catch warnings (ie stat failures and other non-blocking errors)
archive.on('warning', function(err) {
  if (err.code === 'ENOENT') {
    // log warning
  } else {
    // throw error
    throw err;
  }
});
 
// good practice to catch this error explicitly
archive.on('error', function(err) {
  throw err;
});
 
// pipe archive data to the file
archive.pipe(output);
/* 
// append a file from stream
var file1 = __dirname + '/file1.txt';
archive.append(fs.createReadStream(file1), { name: 'file1.txt' });
 
// append a file from string
archive.append('string cheese!', { name: 'file2.txt' });
 
// append a file from buffer
var buffer3 = Buffer.from('buff it!');
archive.append(buffer3, { name: 'file3.txt' });
 
// append a file
archive.file('file1.txt', { name: 'file4.txt' });
 
// append files from a sub-directory and naming it `new-subdir` within the archive
archive.directory('subdir/', 'new-subdir');
 */
// append files from a sub-directory, putting its contents at the root of archive
archive.directory('src/'+template, false);
 /*
// append files from a glob pattern
archive.glob('subdir/*.txt');
 */
// finalize the archive (ie we are done appending files but streams have to finish yet)
// 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
archive.finalize();


};
module.exports = archive;

