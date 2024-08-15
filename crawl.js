function normalizeURL(urlString) {
    const urlObject = new URL(urlString);
    let fullPath = `${urlObject.hostname}${urlObject.pathname}`;
    if (fullPath.slice(-1) === '/') {
        fullPath = fullPath.slice(0, -1);
    }
    return fullPath;
}

module.exports = {
    normalizeURL
}