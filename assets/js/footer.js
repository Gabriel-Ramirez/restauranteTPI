window.addEventListener("load", resizeBody);
window.addEventListener('resize', resizeBody);

function resizeBody() {
    let maxHeigth = calculateTotalHeightMinusElement("footer");
    let bodySize = document.getElementById("page-top").offsetHeight;
    let tamanio = bodySize - maxHeigth;
    let footer = document.getElementById("footer");
    if (footer != null) {
        footer.style.minHeight = tamanio + "px";
    }
}


function calculateTotalHeightMinusElement(excludeElementClass) {
    // Get all child elements of the body tag
    var bodyChildren = document.getElementsByTagName('body')[0].children[0].children;
    var finalHeight = 0;
    var totalHeight = 0;

    // Loop through the selected elements
    for (var i = 0; i < bodyChildren.length; i++) {

        // Add the height of this element
        totalHeight = totalHeight + bodyChildren[i].offsetHeight;
    }

    // Get the height of the element we want to exclude
    var excludedElementHeight = document.getElementById(excludeElementClass).offsetHeight;

    // Calculate height minus the excluded element
    finalHeight = totalHeight - excludedElementHeight;
    return finalHeight;
}