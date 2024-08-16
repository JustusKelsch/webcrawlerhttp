const { JSDOM } = require('jsdom');

function normalizeURL(urlString) {
    const urlObject = new URL(urlString);
    let fullPath = `${urlObject.hostname}${urlObject.pathname}`;
    if (fullPath.slice(-1) === '/') {
        fullPath = fullPath.slice(0, -1);
    }
    return fullPath;
}

function getURLsFromHTML(htmlBody, baseURL) {
    const dom = new JSDOM(htmlBody);
    const anchors = dom.window.document.querySelectorAll('a');
    const urlList = [];
    for (const anchor of anchors) {
        if (anchor.hasAttribute('href')) {
            let href = anchor.getAttribute('href');

            try {
                href = new URL(href, baseURL).href;
                urlList.push(href)
            }
            catch (err) {
                console.log(`${err.message}: ${href}`);
            }
        }
    }

    return urlList;
}

async function crawlPage(currentURL) {

    let response;
    try {
        response = await fetch(currentURL);
    }
    catch (err) {
        throw new Error(`Network error: ${err.message}`)
    }

    if (response.status >= 400) {
        console.log('Could not connect to the website');
        return;
    }

    if (!response.headers.get('content-type').includes('text/html')) {
        console.log('No HTML found');
        return;
    }

    console.log(await response.text());

}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage,
}