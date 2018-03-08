const express = require('express');
const axios = require('axios');
const { JSDOM } = require("jsdom");

const app = express();

const isDubbed = (animeName) => {
    const title = animeName.toLowerCase();
    const searchLink = 'https://www2.9anime.is/search?keyword=' + encodeURIComponent(title);
    return axios(searchLink)
        .then(({ data: html }) => new JSDOM(html))
        .then(dom => {
            const animeList = [...dom.window.document.querySelectorAll('a[data-jtitle]')]
                              .map(el => ({title: el.dataset.jtitle.toLowerCase(),
                                           link: el.href}));
            const subbedAnimeList = animeList
                                    .filter(({title}) => !title.includes('dub'));
            const dubbedAnimeList = animeList
                                    .filter(({title}) => title.includes('dub'));
            const dubbedAnime = dubbedAnimeList
                                .find(anime => anime.title.includes(title));
            const subbedAnime = subbedAnimeList
                                .find(anime => anime.title.includes(title));
            return {
                link: searchLink,
                dub:dubbedAnime,
                sub: subbedAnime,
            }
        });

};

app.get('/', (req, res) => {
    const title = req.query.title;
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    isDubbed(title)
        .then(result => res.json(result));
})
const server_port = process.env.PORT || 8080;

app.listen(server_port, () => {
    console.log('Listening...');
});
