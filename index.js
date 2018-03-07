const express = require('express');
const axios = require('axios');
const { JSDOM } = require("jsdom");

const app = express();

const isDubbed = (title) => {
    const searchLink = 'https://www2.9anime.is/search?keyword=' + encodeURIComponent(title);
    return axios(searchLink)
        .then(({ data: html }) => new JSDOM(html))
        .then(dom => {
            const dubbedAnimeList = [...dom.window.document.querySelectorAll('a[data-jtitle]')]
                              .map(el => ({title: el.dataset.jtitle.toLowerCase(),
                                           link: el.href})
                                        )
                              .filter(({title}) => title.includes('dub'));
            
            if (dubbedAnimeList.length === 0) {
                return {found: false, link: searchLink};
            }
            const targetAnime = dubbedAnimeList.find(anime => anime.title.includes(title.toLowerCase()));

            return targetAnime !== undefined ? {...targetAnime, found: true} : false;
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
