
// var prevPage = '';
var rootId = '';
const STRWIDTH = 20;

function shortenString(str) {
    if(str.length > STRWIDTH) {
        str = str.substring(0,STRWIDTH-3) + '...'
    }
    return str;
}

// Used to change folder contents if folder is selected
function clickListener() {
    document.addEventListener("click", (e) => {
        if(e.target.classList.contains('folder')) {
            // prevPage = $('body').html();
            browser.bookmarks.getSubTree(e.target.id).then(displayFolder).catch(onRejected);
        } else if(e.target.classList.contains('back')) {
            browser.bookmarks.getSubTree(e.target.id).then(displayFolder).catch(onRejected);
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
            let childTitle = shortenString(child.title);
            if (child.type == 'folder') {
                if (child.children.length > 0) {
                    let imgUrl = browser.extension.getURL('icons/outline_keyboard_arrow_right_black_48dp.png')
                    content += `<li class='folder' id='${child.id}'>${childTitle}<span><img src='${imgUrl}'/></span></li>`;
                } else {
                    content += `<li id='${child.id}'>${childTitle}</li>`
                }
            } else if(child.type == 'bookmark')   
                content += `<a href='${child.url}' data-title='${child.title}'><li id='${child.id}'>${childTitle}</li></a>`;
            else 
                content += '<hr>';
        }
    }

    // Set the header
    if(item.id !== rootId) {
        let imgUrl = browser.extension.getURL('icons/outline_keyboard_arrow_left_black_48dp.png');
        let innerHtml = `<div class='back' id='${item.parentId}'><span><img src='${imgUrl}' class='back-btn'/></span>${title}</div>`;
        $('#folder-name').html(innerHtml);
    } else
        $('#folder-name').html(title);
    $('#folder-contents').html(content);

    $( "a" ).hover(
        function() {   
         var title = $(this).attr("data-title");  // extracts the title using the data-title attr applied to the 'a' tag
          $('<div/>', { // creates a dynamic div element on the fly
              text: title,
              class: 'box'
          }).appendTo(this);  // append to 'a' element
        }, function() {
          $(document).find("div.box").remove(); // on hover out, finds the dynamic element and removes it.
        }
      );

    // Add a listener for clicks for folders
    clickListener();
}

  
var gettingTree = browser.bookmarks.getTree();
gettingTree.then(displayFolder, onRejected);