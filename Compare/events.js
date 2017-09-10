const buttons = document.querySelectorAll('button');
let i = 0;
let length = buttons.length;

for (i; i < length; i++) {
    buttons[i].addEventListener("click", function(e) {
        e.preventDefault();
        const data = {};
        data.name = e.target.attributes["data-name"].value;
        data.id = e.target.attributes["data-id"].value;
        data.code = e.target.attributes["data-code"].value;
        data.img = e.target.attributes["data-img"].value;
        data.url = e.target.attributes["data-url"].value;
        Compare.addItem(data);
        //need to add trigger after compare item to trigger popup if success or fail
    });
    
};


