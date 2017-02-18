// Go to www.marmot.com and add at least 2 products to your cart. Then return to the home page.
// Write a javascript snippet that can be run in the console of a browser that does the following:
// Extract the number of items in the cart, the cart total, and item images from the page. Store them in javascript variables.

//variables to extract data from marmot.com/cart
var myArray = [];
var myInfo = {} || '';

//ajax call to skim info
$.ajax({url: "https://marmot.com/cart",
        type: "get",
        dataType: "html",
        }).success( function(data){
        //   console.log(data);
        var getInfoTags = function($cart){
            return $cart.find(".cart-row");
        };
        var getTotalTags = function($cart){
            return $cart.find(".cart-order-totals");
        }
        var x = getInfoTags($(data));
        var y = getTotalTags($(data));
        console.log(x);
        console.log(y);
        for(i = 0; i < x.length; i++){
            //grabs pictures
            myArray.push(x[i].cells[0].childNodes[1].childNodes[1].currentSrc);
            //grabs name
            myArray.push(x[i].firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.innerText);
            //grabs total items selected
            myArray.push(x[i].cells[2].childNodes[1].childNodes[3].defaultValue);
        }
        //grabs total amount
        myArray.push(y[0].lastElementChild.lastElementChild.innerText);
        //log array and save info
        localStorage.setItem("myArray", JSON.stringify(myArray));
        console.log(myArray);
}); 

//retrieve info on marmot.com/home page
myInfo = JSON.parse(localStorage.getItem("myArray"));
console.log(myInfo);

// Create a trigger that activates when the user scrolls into the bottom 10% of the page.
// The trigger should show a centered overlay on top of the site that displays the information gathered above and two buttons. 
// One button closes the overlay and the other takes the user to the cart page. It should have a style consistent with the website. Design matters.
// Behind the overlay add a semi¬transparent black background that obscures the site. The overlay should be able to trigger multiple times if dismissed.

//trigger event variables
var y = document.body.offsetHeight;
var up = Math.round(.85*y);
var bottom = Math.round(.86*y);
var modal = document.createElement("div");
var newBox = document.createElement("div");
var textBox = document.createElement("div");
var buttonBox = document.createElement("div");
var closeBox = document.createElement("div");
var overlay = document.createElement("div");
var button = document.createElement("button");
var close = document.createElement("button");
var textOpen = document.createTextNode("checkout");
var textClose = document.createTextNode("close");
button.appendChild(textOpen);
close.appendChild(textClose);

//function to create modal, all css styles are handled in here
function createPics(x){
    for(i = 0; i < x.length; i++){
        if((i % 3 === 0) && (i != x.length -1)){
        var picture = document.createElement("img");
        picture.setAttribute("src", x[i]);
        // picture.style.marginTop = '25%';
        picture.style.position = 'relative';
        newBox.style.display = 'flex';
        newBox.style.marginLeft = '30%';
        newBox.style.marginTop = '15%';
        newBox.style.marginBottom = '10%';
        newBox.style.maxWidth = '700px';
        newBox.appendChild(picture);
        modal.appendChild(newBox);
        document.body.appendChild(modal);
    }
    else{
        var text = document.createTextNode(myInfo[i])
        var p = document.createElement("p");
        p.appendChild(text);
        p.style.padding = '2.5%';
        p.style.position = 'relative';
        p.style.display = 'table-creation';
        modal.style.position = 'fixed';
        modal.style.backgroundColor = 'rgb(255,255,255)';
        modal.style.display = 'inline-block';
        modal.style.borderTop = '1px solid #cbcbcb';
        modal.style.top = '1%';
        modal.style.width = '100%';
        modal.style.minWidth = '300px';
        modal.style.marginTop = '60px';
        modal.style.zIndex = '4';
        modal.style.border = '2px solid #889988';
        modal.style.transition = '0.5s';
        modal.style.maxWidth = '800px';
        modal.style.width = '800px';
        modal.style.minHeight = '91px';
        modal.style.maxHeight = '680px';
        modal.style.marginLeft = '19.5%';
        modal.style.height = 'auto';
        modal.style.top = '0px';
        modal.style.left = '0px';
        modal.style.display = 'block';
        modal.appendChild(close);
        button.onclick = function(){
            window.open('https://marmot.com/cart')
        };
        button.style.position = 'relative';
        button.style.color = '#000';
        button.style.textTransform = 'uppercase';
        button.style.fontSize = '12px';
        button.style.display = 'inline-block';
        button.style.padding = '14px 30px';
        button.style.textAlign = 'center';
        button.style.border = '2px solid #000';
        button.style.marginRight = '5%';
        button.addEventListener("mouseover", function(){
            button.style.color = '#FFF';
            button.style.backgroundColor = '#D00';
            button.style.border = '2px solid #D00';
        });
        button.addEventListener("mouseout", function(){
            button.style.color = '#000';
            button.style.backgroundColor = '#FFF';
            button.style.border = '2px solid #000';
        });
        close.addEventListener("click", function(){
            modal.style.width = '0%';
            modal.style.height = '0%';
            modal.style.visibility = 'hidden';
            overlay.style.width = '0%';
            overlay.style.height = '0%';
            overlay.style.visibility = 'hidden';
            newBox.style.width = '0%';
            newBox.style.height = '0%';
            newBox.style.visibility = 'hidden';
            close.style.visibility = 'hidden';
            button.style.visibility = 'hidden';
        });
        close.addEventListener("mouseover", function(){
            close.style.color = '#FFF';
            close.style.backgroundColor = '#D00';
            close.style.border = '2px solid #D00';
        });
        close.addEventListener("mouseout", function(){
            close.style.color = '#000';
            close.style.backgroundColor = '#FFF';
            close.style.border = '2px solid #000';
        });
        close.style.position = 'relative';
        close.style.textTransform = 'uppercase';
        close.style.fontSize = '12px';
        close.style.display = 'inline-block';
        close.style.textAlign = 'center';
        close.style.padding = '14px 30px';
        close.style.border = '2px solid #000';
        buttonBox.style.marginTop = 'inherit';
        buttonBox.style.marginLeft = '30%';
        buttonBox.style.marginBottom = '10%';
        buttonBox.style.width = '600px';
        textBox.style.display = 'flex';
        textBox.style.alignContent = 'center';
        textBox.style.maxWidth = '700px';
        textBox.appendChild(p);
        modal.appendChild(textBox);
        document.body.appendChild(modal);
        buttonBox.appendChild(button);
        buttonBox.appendChild(close);
        modal.appendChild(buttonBox);
        overlay.style.backgroundColor = "rgba(0,0,0,.5)";
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.zIndex = '3';
        overlay.style.overflowX = 'hidden';
        document.body.appendChild(overlay);
        }
    }
}

//event handler to trigger overlay
window.onscroll = function(){
    if((window.pageYOffset > up) && (window.pageYOffset <  bottom)){
        createPics(myInfo);
        window.onscroll = false;
    }
}
