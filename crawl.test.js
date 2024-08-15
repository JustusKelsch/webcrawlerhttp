const {normalizeURL, getURLsFromHTML} = require('./crawl.js');
const {test, expect} = require('@jest/globals');

test('normalizeURL1', () => {
    const input = 'https://blog.boot.dev/path/';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
})

test('normalizeURL2', () => {
    const input = 'https://blog.boot.dev/path';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
})

test('normalizeURL3', () => {
    const input = 'http://blog.boot.dev/path/';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
})

test('normalizeURL4', () => {
    const input = 'http://blog.boot.dev/path';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
})

test('getURLsFromHTML absolue', () => {
    const htmlInput = '<html><body><a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a></body></html>';
    const baseURL = 'https://blog.boot.dev'
    const actual = getURLsFromHTML(htmlInput, baseURL);
    const expected = ['https://blog.boot.dev/'];
    expect(actual).toEqual(expected);
})

test('getURLsFromHTML relative', () => {
    const htmlInput = '<html><body><a href="/path/one"><span>Go to Boot.dev</span></a></body></html>';
    const baseURL = 'https://blog.boot.dev'
    const actual = getURLsFromHTML(htmlInput, baseURL);
    const expected = ['https://blog.boot.dev/path/one'];
    expect(actual).toEqual(expected);
})

test('getURLsFromHTML both', () => {
    const htmlInput = '<html><body><a href="/path/one"><span>Go to Boot.dev</span></a><a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a></body></html>';
    const baseURL = 'https://blog.boot.dev'
    const actual = getURLsFromHTML(htmlInput, baseURL);
    const expected = ['https://blog.boot.dev/path/one', 'https://blog.boot.dev/'];
    expect(actual).toEqual(expected);
})