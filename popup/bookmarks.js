
var prevPage = '';
var rootId = '';

// Used to change folder contents if folder is selected
function clickListener() {
    document.addEventListener("click", (e) => {
        if(e.target.classList.contains('folder')) {
            prevPage = $('body').html();
            browser.bookmarks.getSubTree(e.target.id).then(displayFolder).catch(onRejected);
        } else if(e.target.classList.contains('back')) {
            $('body').html(prevPage);
        }
    });
}

function onRejected(error) {
    console.log(`An error: ${error}`);
}

function displayFolder(bookmarkItems) {
    console.log('1',bookmarkItems);
    let item;
    // Checks to make sure 
    if(Array.isArray(bookmarkItems))
    item = bookmarkItems[0];
    else
    item = bookmarkItems;
    
    // sets the root id if not already set
    if(rootId === "")
        rootId = item.id;
    console.log('Root ID:', rootId);

    let content = '';
    
    // Get the title that will be displayed at the top
    let title = item.title;
    if(title === "") {
        title = 'Bookmarks';
    }

    // Display the selected folder
    if(item.type === 'folder') {
        var children = item.children;
        for(let child of children) {
            if (child.type == 'folder') {
                if (child.children.length > 0) {
                    let imgUrl = browser.extension.getURL('icons/outline_keyboard_arrow_right_black_48dp.png')
                    content += `<li class='folder' id='${child.id}'>${child.title}<span><img src='${imgUrl}'/></span></li>`;
                } else {
                    content += `<li id='${child.id}'>${child.title}</li>`
                }
            } else    
                content += `<a href='${child.url}'><li id='${child.id}'>${child.title}</li></a>`;
        }
    }
    if(item.id !== rootId) {
        let imgUrl = browser.extension.getURL('');
        let innerHtml = `<span><img src='${imgUrl}'/></span>${title}`;
        $('#folder-name').html(innerHtml);
        $('#folder-name').addClass('back');
    } else
        $('#folder-name').html(title);
    $('#folder-contents').html(content);

    // Add a listener for clicks for folders
    clickListener();
}

  
var gettingTree = browser.bookmarks.getTree();
gettingTree.then(displayFolder, onRejected);