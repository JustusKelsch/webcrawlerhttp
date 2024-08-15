const jsdom = require('jsdom');
const { JSDOM } = jsdom;

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

module.exports = {
    normalizeURL,
    getURLsFromHTML
}