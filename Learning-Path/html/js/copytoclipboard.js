$(document).ready(function(){
	var div, span;
	var pre = document.getElementsByClassName('allow-copy');
	for (var i = 0; i < pre.length; i++) {
		span = pre[i].getElementsByTagName('span');
		if(span.length == 1) {
			pre[i].setAttribute("id", "copyable-container" + i);
			//pre[i].innerHTML = "\n" + pre[i].innerHTML;
			span[0].setAttribute("id", "copy-code" + i);
			
			div = document.createElement('div');
			div.setAttribute("title", "Copy to clipboard");
			div.setAttribute("onclick", "copy(this.parentNode.id)");		
			//div.innerHTML = "Copy";
			pre[i].insertBefore(div, pre[i].firstChild);
		}
	}
});

function copy(containerid) {
	containerid = document.getElementById(containerid).getElementsByTagName('span')[0].id;
    if (window.getSelection) {
        if (window.getSelection().empty) { // Chrome
            window.getSelection().empty();
        } else if (window.getSelection().removeAllRanges) { // Firefox
            window.getSelection().removeAllRanges();
        }
    } else if (document.selection) { // IE?
        document.selection.empty();
    }

    if (document.selection) {
        var range = document.body.createTextRange();
        range.moveToElementText(document.getElementById(containerid));
        range.select().createTextRange();
        document.execCommand("copy");

    } else if (window.getSelection) {        
        var range = document.createRange();
        range.selectNode(document.getElementById(containerid));
        window.getSelection().addRange(range);
        document.execCommand("copy");
    }
}