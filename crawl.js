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

async function getWebPage(currentURL) {
    let response;
    try {
        response = await fetch(currentURL);
    }
    catch (err) {
        throw new Error(`Network error: ${err.message}`)
    }

    if (response.status >= 400) {
        throw new Error(`Got HTTP error: ${response.status} ${response.statusText}`)
    }

    const contentType = response.headers.get('content-type');
    if (!contentType.includes('text/html') || !contentType) {
        throw new Error(`Got non-HTML response: ${contentType}`)
    }

    return response.text();
}

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
    const baseURLObj = new URL(baseURL);
    const currURLObj = new URL(currentURL);

    if (baseURLObj.hostname !== currURLObj.hostname) {
        return pages;
    }

    const normalizedURL = normalizeURL(currentURL);

    if (pages[normalizedURL] > 0) {
        pages[normalizedURL]++;
        return pages;
    }
    else {
        pages[normalizedURL] = 1;
    }

    let htmlBody = '';
    try {
        htmlBody = await getWebPage(currentURL);
    }
    catch (err) {
        console.log(`${err.message}`);
        return pages;
    }

    const urls = getURLsFromHTML(htmlBody, baseURL);
    for (const url of urls) {
        pages = await crawlPage(baseURL, url, pages)
    }
    
    return pages;

}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage,
}