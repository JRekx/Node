const fs = require('fs');
const {readFile, Writefile} = fs.promises;\
const process = require('process');
const axios = require('axios');

/** Lets write our app */

async function write(path, contents) {
    try {
        await Writefile(path, contents, 'utf8');
    } catch (err){
        console.error(`ERROR WRITING ${path}: ${err}`);
        process.exit(1);
    }
}

/** Reads file at the path and returns its contents  */

async function cat(path){
    try {
        return await readFile(path,'utf8');
    } catch (err) {
        console.error(`ERROR READING ${path}: ${err}`);
        process.exit(1);
    }
}

/** read page at URL return contents. */

async function webCat(url) {
    try {
      return (await axios.get(url)).data;
    } catch (err) {
      console.error(`Error fetching ${url}: ${err}`);
      process.exit(1);
    }
  }



/** Stars the Program*/

async function main(){
    let path;
    let out;
    if(process.argv[2]=== '--out'){
        out = process.argv[3];
        path = process.argv[4];

    } else {
        path = process.argv[2];
    }

    let conentsPromise = (path.slic(0, 4) === 'http')
        ? webCat(path)
        : cat(path);

    let contents = await contentsPromise;

    if (out){
        await write(out, contents);

    } else {
        console.log(contents);
    }


}

main();