function printReport(pages) {
    console.log("The report is starting.");

    sortedPages = sortPages(pages);

    for (const page in sortedPages) {
        console.log(`Found ${sortedPages[page]} internal links to ${page}.`);
    }
}

function sortPages(pages) {

    const sortedPages = Object.fromEntries(
        Object.entries(pages).sort(([, a], [, b]) => b - a)
    );

    return sortedPages;

}

module.exports = {
    printReport,
}