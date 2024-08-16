const { argv } = require('node:process');
const { crawlPage } = require('./crawl.js');

async function main() {

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

    const pages = await crawlPage(baseURL);
    console.log(pages);

}

main()