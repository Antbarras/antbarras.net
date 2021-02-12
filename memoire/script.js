// window.onload = function () {
//     document.body.scrollTop = document.documentElement.scrollTop = 0;
// };


window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    if (window.innerWidth < 1256) {
        alert('This website is made for desktop, full-screen mode.');
    }
    //setTitleReveal();
    setParagraphsHeights();
    setCites();
    setBibliography();
    // document.addEventListener('mousemove', (e) => {
    //     rightLeftMap(e);
    // })
    document.addEventListener('scroll', (e) => {
        scrollToColor();
    })
    document.addEventListener('resize', () => {
        setCites();
        //setTitleReveal();
    });
    setMenu();


    //drawBaselineGrid();
});

function setMenu() {
    let navContainers = document.getElementsByClassName('nav-container');
    let menuContainers = document.getElementsByClassName('menu-container');
    let mainLogos = document.getElementsByClassName('main-logo');
    let mainTitles = document.getElementsByClassName('main-title');

    for (let i = 0; i < navContainers.length - 2; i++) {
        let navTitle = document.getElementsByClassName('nav-title')[i];
        navContainers[i].addEventListener('mousemove', (e) => {
            navTitle.style.top = e.clientY - 36 + "px";
            navTitle.style.left = "0px";
            navTitle.classList.add('displayed');
            document.body.style.cursor = "pointer";
        });
        menuContainers[i].addEventListener('mousemove', (e) => {
            navTitle.style.top = e.clientY - 36 + "px";
            navTitle.style.left = e.clientX - 36 + "px";
            navTitle.classList.add('displayed');

        });

        mainLogos[i].addEventListener('mousemove', (e) => {
            navTitle.style.top = e.clientY - 36 + "px";
            navTitle.style.left = e.clientX - 36 + "px";
            navTitle.classList.add('displayed');
        });

        mainTitles[i].addEventListener('mousemove', (e) => {
            navTitle.style.top = e.clientY - 36 + "px";
            navTitle.style.left = e.clientX - 36 + "px";
            navTitle.classList.add('displayed');
        });

        navContainers[i].addEventListener('mouseleave', (e) => {
            navTitle.classList.remove('displayed');
        });

        menuContainers[i].addEventListener('mouseleave', (e) => {
            console.log('mouseout');
            navTitle.classList.remove('displayed');
        });

        mainLogos[i].addEventListener('mouseleave', (e) => {
            console.log('mouseout');
            navTitle.classList.remove('displayed');
        });

        mainTitles[i].addEventListener('mouseleave', (e) => {
            console.log('mouseout');
            navTitle.classList.remove('displayed');
        });

        if (i == navContainers.length - 3) {
            let navTitle = document.getElementsByClassName('nav-title')[i + 1];
            navContainers[i + 1].addEventListener('mousemove', (e) => {
                navTitle.style.top = e.clientY - 36 + "px";
                navTitle.style.left = "0px";
                navTitle.classList.add('displayed');
                document.body.style.cursor = "pointer";
            });
            navContainers[i + 1].addEventListener('mouseleave', (e) => {
                navTitle.classList.remove('displayed');
            });

            let navTitle2 = document.getElementsByClassName('nav-title')[i + 2];
            console.log(navTitle2);
            navContainers[i + 2].addEventListener('mousemove', (e) => {
                navTitle2.style.top = e.clientY - 36 + "px";
                navTitle2.style.left = "0px";
                navTitle2.classList.add('displayed');
            });
            navContainers[i + 2].addEventListener('mouseleave', (e) => {
                navTitle2.classList.remove('displayed');
            });
        }
    }
}

function setTitleReveal() {
    let dots = document.getElementsByClassName('reveal-dot');
    let mainLogos = document.getElementsByClassName('main-logo');
    let mainTitles = document.getElementsByClassName('main-title');
    let titles = document.getElementsByClassName('six-title');
    for (let i = 0; i < dots.length; i++) {
        let dot = dots[i];
        let title = titles[i];
        let mainTitle = mainTitles[i];
        let logo = mainLogos[i];
        dot.addEventListener('mouseover', revealTitle);
        logo.addEventListener('mouseover', revealTitle);

        function revealTitle() {
            title.classList.add('revealed');
            mainTitle.classList.add('hidden');
        }

        dot.addEventListener('mouseout', hideTitle);
        logo.addEventListener('mouseout', hideTitle);

        function hideTitle() {
            title.classList.remove('revealed');
            mainTitle.classList.remove('hidden');
        }
    }
}

function setParagraphsHeights() {
    let mainText = document.getElementById("main-text");
    for (let i = 0; i < mainText.childNodes.length; i++) {
        for (let j = 0; j < mainText.childNodes[i].childNodes.length; j++) {
            let textContainer = mainText.childNodes[i].childNodes[j];
            try {
                let rangeToAdd = textContainer.getAttribute('data-add-range');
                if (rangeToAdd !== null) {
                    textContainer.style.height = textContainer.getBoundingClientRect().height + parseInt(rangeToAdd) + "px";
                }
            } catch {
            }
        }
    }
}

function setBooksHeights() {
    let marginTop = 16;
    let marginBottom = 16;

    let books = document.getElementsByClassName('book');
    for (let i = 0; i < books.length; i++) {
        let startPoint = books[i].getAttribute('data-start-point');
        let startBoundingRect = getWordPosition(document.getElementById('main-text'), startPoint);
        let endPoint = books[i].getAttribute('data-end-point');
        let endBoundingRect = getWordPosition(document.getElementById('main-text'), endPoint);
        let startOffset = books[i].getAttribute('data-start-offset');
        let endOffset = books[i].getAttribute('data-end-offset');


        //console.log(startBoundingRect);
        //console.log(endBoundingRect);
        if (startBoundingRect !== null) {
            if (startOffset == null) {
                startOffset = 0;
            }
            let topPosition = (startBoundingRect.top + startBoundingRect.height + parseInt(startOffset));

            // topPosition = (startBoundingRect.top + startBoundingRect.height);
            // console.log(topPosition);

            //adjusting it so that it fits the baseline grid
            books[i].style.top = topPosition + (topPosition % 8 - 2) + marginTop + "px";

            if (endBoundingRect !== null) {
                let totalHeight = endBoundingRect.top - topPosition - marginBottom - marginTop - endOffset;
                books[i].style.height = totalHeight + "px";

                // for (let j = 0; j < books[i].childNodes.length; j++) {
                //     try {
                //         books[i].childNodes[j].style.top = '25vh';
                //     } catch {
                //     }
                // }
            }
        }
    }
}

function setImagesHeights() {
    let marginTop = 16;
    let marginBottom = 16;


    let images = document.getElementsByClassName('svg');

    for (let i = 0; i < images.length; i++) {
        let startPoint = images[i].getAttribute('data-start-point');
        let startBoundingRect = getWordPosition(document.getElementById('main-text'), startPoint);
        let endPoint = images[i].getAttribute('data-end-point');
        let endBoundingRect = getWordPosition(document.getElementById('main-text'), endPoint);
        let startOffset = images[i].getAttribute('data-start-offset');
        let endOffset = images[i].getAttribute('data-end-offset');


        if (startBoundingRect !== null) {
            if (startOffset == null) {
                startOffset = 0;
            }
            if (endOffset == null) {
                endOffset = 0;
            }
            let topPosition = (startBoundingRect.top + startBoundingRect.height + parseInt(startOffset));

            // topPosition = (startBoundingRect.top + startBoundingRect.height);
            // console.log(topPosition);

            //adjusting it so that it fits the baseline grid
            images[i].style.top = topPosition + (topPosition % 8 - 2) + marginTop + "px";

            if (endBoundingRect !== null) {
                let totalHeight = endBoundingRect.top - topPosition - marginBottom - marginTop - endOffset;
                images[i].style.height = totalHeight + "px";

                // for (let j = 0; j < images[i].childNodes.length; j++) {
                //     // try {
                //     //     images[i].childNodes[j].style.top = '20vh';
                //     // } catch {
                //     // }
                // }
            }
        }
    }
}

function getWordPosition(node, word) {
    //browsing through 2 dimensions as the section has divs that contain p's
    let wordBoundingClientRect = null;
    for (let i = 0; i < node.childNodes.length; i++) {
        for (let j = 0; j < node.childNodes[i].childNodes.length; j++) {
            for (let k = 0; k < node.childNodes[i].childNodes[j].childNodes.length; k++) {
                let currentNode = node.childNodes[i].childNodes[j].childNodes[k];
                if (currentNode.nodeName == 'P' || currentNode.nodeName == 'EM') {
                    let pTextToInspect = currentNode.innerText;
                    if (pTextToInspect != null || pTextToInspect != "") {
                        try {
                            let indexFound = pTextToInspect.indexOf(word);
                            //console.log(word.trim());
                            if (indexFound !== null) {
                                let theRange = new Range();

                                //using firstChild to get the Node.TEXT_NODE of the p
                                theRange.setStart(currentNode.firstChild, indexFound);
                                theRange.setEnd(currentNode.firstChild, indexFound + word.length);

                                //console.log(theRange.getBoundingClientRect());
                                wordBoundingClientRect = theRange.getBoundingClientRect();
                            }
                        } catch {
                            //only happens because of div formatting
                        }
                    }
                }
                if (wordBoundingClientRect !== null) {
                    break;
                }
            }
            if (wordBoundingClientRect !== null) {
                break;
            }
        }
        if (wordBoundingClientRect !== null) {
            break;
        }
    }
    return wordBoundingClientRect;
}

function setCites() {
    let cites = document.getElementsByTagName('cite');

    for (let i = 0; i < cites.length; i++) {
        let cite = cites[i];
        let parent = cites[i].parentElement;
        let parentContainer = parent.parentElement;

        let formattedSource = document.createElement('div');
        formattedSource.classList.add('source');

        let sourceDot = document.createElement('div');
        sourceDot.classList.add('source-dot');

        sourceDot.addEventListener('mouseover', () => {
            formattedSource.classList.add('over');
            sourceDot.classList.add('over');
        });
        sourceDot.addEventListener('mouseout', () => {
            formattedSource.classList.remove('over');
            sourceDot.classList.remove('over');

        });
        let formattedText = cites[i].getAttribute('data-formatted-source').replaceAll('.', '.\n');

        if (cites[i].getAttribute('data-website') !== null && cites[i].getAttribute('data-website') != '') {

            let link = document.createElement('a');
            link.href = cites[i].getAttribute('data-website');
            link.target = '_blank';
            link.innerText = formattedText;
            formattedSource.appendChild(link);

            let dotLink = document.createElement('a');
            dotLink.href = cites[i].getAttribute('data-website');
            dotLink.target = '_blank';
            dotLink.innerText = '•';
            sourceDot.appendChild(dotLink);
        } else {
            formattedSource.innerText = formattedText;
            sourceDot.innerText = '';
        }


        if (parentContainer.classList.contains('book')) {
            formattedSource.classList.add('book');
            formattedSource.style.height = parentContainer.getBoundingClientRect().height - 32 + "px";
            formattedSource.style.width = parentContainer.getBoundingClientRect().width + "px";
            formattedSource.style.left = '0';
            sourceDot.style.left = 0 - 36 + "px";
            sourceDot.style.top = parentContainer.getBoundingClientRect().height - 32 + "px";
            // sourceDot.style.top = parentContainer.getBoundingClientRect().bottom - marginBottom * 3.25 + "px";
            // sourceDot.style.left = 'calc(var(--offset-min) - 16px)';

            let nullObjectParentSource = document.createElement("div");
            nullObjectParentSource.appendChild(formattedSource);
            nullObjectParentSource.style = "position: absolute; width: 0; height: 0; top:0; left:0;";
            parentContainer.appendChild(nullObjectParentSource);

            let nullObjectParentDot = document.createElement("div");
            nullObjectParentDot.appendChild(sourceDot);
            nullObjectParentDot.style = "position: absolute; width: 0; height: 0; top:0; left:0;";
            parentContainer.appendChild(nullObjectParentDot);
        } else if (cite.id == 'last-map-cite' || cite.id == 'left-map-cite') {
            formattedSource.classList.add('graph');
            sourceDot.style.left = 0 - 36 + "px";
            formattedSource.style.textAlign = 'left';
            formattedSource.style.height = "4rem";
            sourceDot.style.top = "2.4rem";

            let nullObjectParentDot = document.createElement("div");
            nullObjectParentDot.style = "position: relative; width: 0; height: 0;";
            let nullObjectParentSource = document.createElement("div");
            nullObjectParentSource.style = "position: relative; width: 0; height: 0;";
            nullObjectParentDot.appendChild(sourceDot);
            cite.appendChild(nullObjectParentDot);
            nullObjectParentSource.appendChild(formattedSource);
            cite.appendChild(nullObjectParentSource);
        } else if (cite.id == 'right-map-cite') {
            formattedSource.classList.add('graph');
            sourceDot.style.left = "calc(var(--col-12) + 36px)";
            formattedSource.style.left = "calc(var(--col-10))";
            formattedSource.style.textAlign = 'right';
            formattedSource.style.height = "4rem";
            sourceDot.style.top = "2.4rem";

            let nullObjectParentDot = document.createElement("div");
            nullObjectParentDot.style = "position: relative; width: 0; height: 0;";
            let nullObjectParentSource = document.createElement("div");
            nullObjectParentSource.style = "position: relative; width: 0; height: 0;";
            nullObjectParentDot.appendChild(sourceDot);
            cite.appendChild(nullObjectParentDot);
            nullObjectParentSource.appendChild(formattedSource);
            cite.appendChild(nullObjectParentSource);

        } else if (parentContainer.parentElement.id == 'limitations-graph') {

            formattedSource.classList.add('graph');

            formattedSource.style.height = "4rem";
            sourceDot.style.left = 0 - 36 + "px";
            sourceDot.style.top = "2.4rem";


            let nullObjectParentDot = document.createElement("div");
            nullObjectParentDot.style = "position: relative; width: 0; height: 0;";
            let nullObjectParentSource = document.createElement("div");
            nullObjectParentSource.style = "position: relative; width: 0; height: 0;";
            nullObjectParentDot.appendChild(sourceDot);
            cite.appendChild(nullObjectParentDot);
            nullObjectParentSource.appendChild(formattedSource);
            cite.appendChild(nullObjectParentSource);
        } else if (parentContainer.parentElement.classList.contains('main-text') || parentContainer.classList.contains('main-text')) {
            formattedSource.classList.add('text');
            formattedSource.style.height = cite.getBoundingClientRect().height + 16 + "px";
            formattedSource.style.top = 0 - cite.getBoundingClientRect().height - parseInt(window.getComputedStyle(parent, null).getPropertyValue('font-size')) + "px";
            sourceDot.style.top = "-" + window.getComputedStyle(parent, null).getPropertyValue('font-size');
            sourceDot.style.left = parent.getBoundingClientRect().width + 36 + "px";

            let nullObjectParentDot = document.createElement("div");
            nullObjectParentDot.style = "position: relative; width: 0; height: 0;";
            let nullObjectParentSource = document.createElement("div");
            nullObjectParentSource.style = "position: relative; width: 0; height: 0;";
            nullObjectParentDot.appendChild(sourceDot);
            cite.appendChild(nullObjectParentDot);
            nullObjectParentSource.appendChild(formattedSource);
            cite.appendChild(nullObjectParentSource);
        } else if (parentContainer.parentElement.classList.contains('projects') || parentContainer.parentElement.parentElement.classList.contains('projects')) {
            formattedSource.classList.add('project');
            formattedSource.style.height = cite.getBoundingClientRect().height + 16 + "px";
            formattedSource.style.top = 0 - cite.getBoundingClientRect().height - parseInt(window.getComputedStyle(parent, null).getPropertyValue('font-size')) + "px";
            sourceDot.style.top = "-" + window.getComputedStyle(parent, null).getPropertyValue('font-size');
            sourceDot.style.left = 0 - 36 + "px";

            let nullObjectParentDot = document.createElement("div");
            nullObjectParentDot.style = "position: relative; width: 0; height: 0;";
            let nullObjectParentSource = document.createElement("div");
            nullObjectParentSource.style = "position: relative; width: 0; height: 0;";
            nullObjectParentDot.appendChild(sourceDot);
            cite.appendChild(nullObjectParentDot);
            nullObjectParentSource.appendChild(formattedSource);
            cite.appendChild(nullObjectParentSource);
        }

    }
}


function drawBaselineGrid() {
    const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
    const lineHeight = 8;
    let gridContainer = document.getElementById('grid');
    for (let i = 0; i < ((documentHeight - (documentHeight % lineHeight)) / lineHeight); i++) {
        let line = document.createElement('div');
        line.style.position = 'absolute';
        line.style.left = '0px';
        line.style.top = i * lineHeight + 'px'
        line.style.width = '100%';
        line.style.height = '1px';
        line.style.backgroundColor = '#ff5e5e';
        line.style.zIndex = '20';
        gridContainer.appendChild(line)
    }
}

function drawColumnsGrid() {
    let documentWidth = Math.max(document.body.scrollWidth, document.body.offsetWidth, document.documentElement.clientWidth, document.documentElement.scrollWidth, document.documentElement.offsetWidth);
    //documentWidth = 1920; //!
    let contentWidth = 1256;
    let minMarginWidth = 36;
    let gutterWidth = 36;
    let columnsNumber = 12;
    //const columnWidth = (documentWidth - 2 * marginWidth - (columnsNumber - 1) * gutterWidth) / columnsNumber;
    let columnWidth = (contentWidth - 11 * gutterWidth - 2 * minMarginWidth) / 12;
    console.log("colwidth" + columnWidth);
    let marginWidth = (documentWidth - contentWidth) / 2 + minMarginWidth;
    //let marginWidth = getComputedStyle(document.documentElement).getPropertyValue('--margin-width');
    //let gutterWidth = getComputedStyle(document.documentElement).getPropertyValue('--gutter-width');
    //let columnWidth = getComputedStyle(document.documentElement).getPropertyValue('--column-width');

    let gridContainer = document.getElementById('grid');

    for (let i = 1; i <= columnsNumber * 2; i++) {
        let line = document.createElement('div');
        line.style.position = 'absolute';
        if (i % 2 == 1) {
            line.style.left = marginWidth + Math.floor(i / 2) * columnWidth + Math.floor(i / 2) * gutterWidth + "px";
            //console.log(line.style.left)
            line.style.backgroundColor = '#1c7a02';

        } else {
            line.style.left = marginWidth + Math.floor(i / 2) * columnWidth + ((Math.floor(i / 2) - 1) * gutterWidth) + "px";
            console.log(line.style.left)
            line.style.backgroundColor = '#1c7a02';
        }
        line.style.height = '100%';
        line.style.width = '1px';
        line.style.zIndex = '20';
        line.style.position = 'fixed';
        gridContainer.appendChild(line)
    }
}

function rightLeftMap(e) {
    if (e.clientX <= window.innerWidth / 2) {
        document.getElementById('left-map').classList.add('hover');
        document.getElementById('right-map').classList.remove('hover');
    } else {
        document.getElementById('left-map').classList.remove('hover');
        document.getElementById('right-map').classList.add('hover');
    }
}

let currentCat = 8;

function scrollToColor() {
    // console.log("scroll" + window.scrollY);
    if (currentCat != 8 && isScrolledIntoView(document.getElementById('menu-u'))) {
        currentCat = 8;
        document.documentElement.setAttribute('class', '');
    } else if (currentCat != 0 && isScrolledIntoView(document.getElementById('externalisation-title'))) {
        currentCat = 0;
        document.documentElement.setAttribute('class', 'externalisation');
    } else if (currentCat != 1 && isScrolledIntoView(document.getElementById('limitations-title'))) {
        currentCat = 1;
        document.documentElement.setAttribute('class', '');
        document.documentElement.classList.add('limitations');
    } else if (currentCat != 1 && isScrolledIntoView(document.getElementById('limitations-graph-title'))) {
        currentCat = 1;
        document.documentElement.setAttribute('class', '');
        document.documentElement.classList.add('limitations');
    } else if (currentCat != 2 && isScrolledIntoView(document.getElementById('illusions-title'))) {
        currentCat = 2;
        document.documentElement.setAttribute('class', '');
        document.documentElement.classList.add('illusions');
    } else if (currentCat != 3 && isScrolledIntoView(document.getElementById('defuturation-title'))) {
        currentCat = 3;
        document.documentElement.setAttribute('class', '');
        document.documentElement.classList.add('defuturation');
    } else if (currentCat != 4 && isScrolledIntoView(document.getElementById('internalisation-title'))) {
        currentCat = 4;
        document.documentElement.setAttribute('class', '');
    } else if (currentCat != 5 && isScrolledIntoView(document.getElementById('directions-title'))) {
        console.log("directionss");
        currentCat = 5;
        document.documentElement.setAttribute('class', '');
        document.documentElement.classList.add('directions');
    } else if (currentCat != 6 && isScrolledIntoView(document.getElementById('comprehension-title'))) {
        currentCat = 6;
        document.documentElement.setAttribute('class', '');
        document.documentElement.classList.add('comprehension');
    } else if (currentCat != 7 && (isScrolledIntoView(document.getElementById('projects-title')) || isScrolledIntoView(document.getElementById('bibliography-books')))) {
        currentCat = 7;
        document.documentElement.setAttribute('class', '');
    }
}

function isScrolledIntoView(el) {
    var rect = el.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;

    // Only completely visible elements return true:
    var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    // Partially visible elements return true:
    //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
    return isVisible;
}

function setBibliography() {
    let cites = document.getElementsByTagName('cite');

    //let sourcesSection = document.getElementById('sources');
    for (let i = 0; i < cites.length; i++) {
        let cite = cites[i];
        let formattedText = cite.getAttribute('data-formatted-source');
        let formattedP = document.createElement('p');
        let firstDotIndex = formattedText.indexOf('.');
        let boldPart = formattedText.substring(0, firstDotIndex + 1);
        let formattedbold = document.createElement('b');
        formattedbold.innerText = boldPart;
        let normalPart = formattedText.substring(firstDotIndex + 1, formattedText.length - 1);
        formattedP.appendChild(formattedbold);
        formattedP.append(normalPart);
        let dataType = cites[i].getAttribute('data-type');
        if (dataType == "book") {
            document.getElementById('bibliography-books').appendChild(formattedP);
        } else if (dataType == "article") {
            document.getElementById('bibliography-articles').appendChild(formattedP);
        } else if (dataType == "web-article") {
            let link = document.createElement('a');
            link.href = cites[i].getAttribute('data-website');
            link.target = '_blank';
            link.appendChild(formattedP);
            document.getElementById('bibliography-web-articles').appendChild(link);
        } else if (dataType == "web-site") {
            let link = document.createElement('a');
            link.href = cites[i].getAttribute('data-website');
            link.target = '_blank';
            link.appendChild(formattedP);
            document.getElementById('bibliography-web-sites').appendChild(link);
        }
    }
}