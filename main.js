const { argv } = require('node:process');
const { crawlPage } = require('./crawl.js');

function main() {

    if (argv.length < 3) {
        console.log('Not enough CLI arguments');
        return;
    }
    else if (argv.length > 3) {
        console.log('Too many CLI arguments');
        return;
    }
    const baseURL = argv[2];

    console.log(`The crawler has started at: ${baseURL}`)
    //console.log(crawlPage(baseURL));
    crawlPage(baseURL)

}

main()