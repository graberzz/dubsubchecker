# About
Checks if provided anime title has dub/sub versions on www2.9anime.is website.
# Usage
```
npm i
npm start
```
HTTP GET request to **localhost:8080/?title=[anime title]** where [anime title] is desired anime.
Returns JSON  in following format:
```
{
    "link" // url used to search on 9anime.is
    "dub": { // if dub version exists
        "title" // dubbed anime title
        "link" // link to dubbed anime
    },
    "sub": { // if sub version exists
        "title" // subbed anime title
        "link" // link to subbed anime    
	}
}
```
## Examples

Title: **B: The Beginning**<br>
Input:
```
http://localhost:8080/?title=b%3A%20the%20beginning
```
Output:
```json
{
    "link": "https://www2.9anime.is/search?keyword=b%3A%20the%20beginning",
    "dub": {
        "title": "b: the beginning (dub)",
        "link": "https://www2.9anime.is/watch/b-the-beginning-dub.wvj4"
    },
    "sub": {
        "title": "b: the beginning",
        "link": "https://www2.9anime.is/watch/b-the-beginning.mnx8"
    }
}
```
---
Title: **Golden Time**<br>
Input:
```
http://localhost:8080/?title=golden%20time
```
Output:
```json
{
    "link": "https://www2.9anime.is/search?keyword=golden%20time",
    "sub": {
        "title": "golden time",
        "link": "https://www2.9anime.is/watch/golden-time.l66"
    }
}
```
Only sub version was found.

---
Title: **GitHub**<br>
Input:
```
http://localhost:8080/?title=github
```
Output:
```json
{
    "link": "https://www2.9anime.is/search?keyword=github"
}
```
Neither dub nor sub was found.
