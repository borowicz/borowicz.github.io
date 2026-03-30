var ttResultsList = [];
var currentPosition = -1;

function exportTT() {
    let cList = [];

    if (currentPosition < window.scrollY) {
        window.scrollTo(0, document.body.scrollHeight);
        for (const d of document.querySelectorAll('div[data-testid="UserCell"]')) {
            let img = d.getElementsByTagName('img')[0].src;
            let usr = d.getElementsByTagName('a')[0].href;

            ttResultsList.push([usr, img]);
        }
        currentPosition = parseInt(window.scrollY);
    } else {
        console.clear();
        console.log('finished');
        console.dir(ttResultsList);
        // console.save(ttResultsList);

        // clearInterval(myVar);
    }
}
setInterval(exportTT, 1000);
var myVar = setInterval(exportTT, 1000);

setInterval(() => {
    for (const d of document.querySelectorAll('div[data-testid="unlike"]')) {
        d.click()
    }
    window.scrollTo(0, document.body.scrollHeight)
}, 1000)


    // let e = document.createElement('a');
    // e.innerHTML = htmldata;

    // let aHref = document.createElement('a');
    // let linkText = document.createTextNode("my title text");

    // d.appendChild(url);

    // let url = atob(d.getAttribute("data-wyr"));
    // url = ' <a href="' + url + '" target="_blank"> >> click</a>';
    // d.innerHTML = url;

    // console.log(atob(d.getAttribute("data-wyr")));

for (const d of document.querySelectorAll('span[data-wyr]')) {

    let url = atob(d.getAttribute("data-wyr"));
    let a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('target', '_blank');
    a.innerHTML = ' >> click';

    d.appendChild(a);
}