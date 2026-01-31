function copyURL() {
    var urlField = document.getElementById("url");

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(urlField.value)
            .then(() => alert("URL copied to clipboard!"))
            .catch(err => {
                console.error("Clipboard API failed:", err);
                fallbackCopy(urlField.value);
            });
    } else {
        fallbackCopy(urlField.value);
    }
}

function fallbackCopy(text) {
    let textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        let successful = document.execCommand('copy');
        let msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);

        if (successful) {
            alert("URL copied to clipboard!");
        } else {
            alert("Copying failed. Please copy the URL manually.");
        }
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
        alert("Copying failed. Please copy the URL manually.");
    }

    document.body.removeChild(textArea);
}
