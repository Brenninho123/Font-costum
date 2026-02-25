const textInput = document.getElementById("textInput");
const previewText = document.getElementById("previewText");
const fontUpload = document.getElementById("fontUpload");

textInput.addEventListener("input", () => {
    previewText.textContent = textInput.value || "Seu texto aparecerá aqui";
});

fontUpload.addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const fontName = "CustomFont";

    const reader = new FileReader();
    reader.onload = function(e) {
        const font = new FontFace(fontName, e.target.result);
        font.load().then(function(loadedFont) {
            document.fonts.add(loadedFont);
            previewText.style.fontFamily = fontName;
        });
    };

    reader.readAsArrayBuffer(file);
});

function downloadImage() {
    html2canvas(document.querySelector(".preview-container")).then(canvas => {
        const link = document.createElement("a");
        link.download = "texto.png";
        link.href = canvas.toDataURL();
        link.click();
    });
}
