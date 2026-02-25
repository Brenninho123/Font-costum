const textInput = document.getElementById("textInput");
const previewText = document.getElementById("previewText");
const fontUpload = document.getElementById("fontUpload");

const fontSize = document.getElementById("fontSize");
const fontColor = document.getElementById("fontColor");
const textAlign = document.getElementById("textAlign");
const bgColor = document.getElementById("bgColor");

const shadowX = document.getElementById("shadowX");
const shadowY = document.getElementById("shadowY");
const shadowBlur = document.getElementById("shadowBlur");

const strokeWidth = document.getElementById("strokeWidth");
const letterSpacing = document.getElementById("letterSpacing");

const grad1 = document.getElementById("grad1");
const grad2 = document.getElementById("grad2");

const previewContainer = document.getElementById("previewContainer");
const themeToggle = document.getElementById("themeToggle");

/* Atualização ao digitar */
textInput.addEventListener("input", () => {
    previewText.innerText = textInput.value || "Seu texto aparecerá aqui";
});

/* Atualização geral */
function updateStyle() {

    previewText.style.fontSize = fontSize.value + "px";
    previewText.style.textAlign = textAlign.value;
    previewContainer.style.background = bgColor.value;
    previewText.style.letterSpacing = letterSpacing.value + "px";

    /* Gradiente */
    previewText.style.background = `linear-gradient(45deg, ${grad1.value}, ${grad2.value})`;
    previewText.style.webkitBackgroundClip = "text";
    previewText.style.webkitTextFillColor = "transparent";

    /* Sombra */
    previewText.style.textShadow =
        `${shadowX.value}px ${shadowY.value}px ${shadowBlur.value}px black`;

    /* Outline */
    previewText.style.webkitTextStroke =
        `${strokeWidth.value}px black`;
}

/* Eventos */
document.querySelectorAll("input, select").forEach(el => {
    el.addEventListener("input", updateStyle);
});

/* Upload fonte */
fontUpload.addEventListener("change", function(e) {
    const file = e.target.files[0];
    if (!file) return;

    const fontName = "CustomFont";
    const reader = new FileReader();

    reader.onload = function(event) {
        const font = new FontFace(fontName, event.target.result);
        font.load().then(function(loaded) {
            document.fonts.add(loaded);
            previewText.style.fontFamily = fontName;
        });
    };

    reader.readAsArrayBuffer(file);
});

/* Copiar texto */
function copyText() {
    navigator.clipboard.writeText(previewText.innerText);
    alert("Texto copiado!");
}

/* Exportar PNG */
function downloadImage() {
    html2canvas(previewContainer).then(canvas => {
        const link = document.createElement("a");
        link.download = "texto.png";
        link.href = canvas.toDataURL();
        link.click();
    });
}

/* Modo Escuro/Claro */
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
});

/* Inicializa */
updateStyle();