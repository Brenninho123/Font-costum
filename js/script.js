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

let currentFontName = null;
let currentFontBase64 = null;

/* ========================= */
/* Atualiza Texto ao Digitar */
/* ========================= */

textInput.addEventListener("input", () => {
    previewText.innerText = textInput.value || "Seu texto aparecerá aqui";
});

/* ========================= */
/* Atualiza Estilo */
/* ========================= */

function updateStyle() {

    previewText.style.fontSize = fontSize.value + "px";
    previewText.style.textAlign = textAlign.value;
    previewContainer.style.background = bgColor.value;
    previewText.style.letterSpacing = letterSpacing.value + "px";

    /* Gradiente */
    previewText.style.background = `linear-gradient(45deg, ${grad1.value}, ${grad2.value})`;
    previewText.style.webkitBackgroundClip = "text";
    previewText.style.webkitTextFillColor = "transparent";

    /* Cor normal (fallback) */
    previewText.style.color = fontColor.value;

    /* Sombra */
    previewText.style.textShadow =
        `${shadowX.value}px ${shadowY.value}px ${shadowBlur.value}px black`;

    /* Outline */
    previewText.style.webkitTextStroke =
        `${strokeWidth.value}px black`;
}

/* Eventos automáticos */
document.querySelectorAll("input, select").forEach(el => {
    el.addEventListener("input", updateStyle);
});

/* ========================= */
/* Upload Fonte TTF */
/* ========================= */

fontUpload.addEventListener("change", function(e) {
    const file = e.target.files[0];
    if (!file) return;

    currentFontName = "CustomFont";

    const reader = new FileReader();

    reader.onload = function(event) {

        const arrayBuffer = event.target.result;

        /* Salvar Base64 para copiar depois */
        const base64Reader = new FileReader();
        base64Reader.onload = function(b64) {
            currentFontBase64 = b64.target.result;
        };
        base64Reader.readAsDataURL(file);

        const font = new FontFace(currentFontName, arrayBuffer);
        font.load().then(function(loaded) {
            document.fonts.add(loaded);
            previewText.style.fontFamily = currentFontName;
        });
    };

    reader.readAsArrayBuffer(file);
});

/* ========================= */
/* Copiar Texto com Estilo */
/* ========================= */

async function copyText() {

    let styleBlock = "";

    if (currentFontBase64) {
        styleBlock = `
        <style>
        @font-face {
            font-family: '${currentFontName}';
            src: url('${currentFontBase64}');
        }
        </style>
        `;
    }

    const fullHTML = `
        ${styleBlock}
        ${previewText.outerHTML}
    `;

    const blobHTML = new Blob([fullHTML], { type: "text/html" });
    const blobText = new Blob([previewText.innerText], { type: "text/plain" });

    const data = [
        new ClipboardItem({
            "text/html": blobHTML,
            "text/plain": blobText
        })
    ];

    try {
        await navigator.clipboard.write(data);
        alert("Texto + fonte + estilo copiados!");
    } catch (err) {
        alert("Erro ao copiar. Use HTTPS ou navegador compatível.");
    }
}

/* ========================= */
/* Exportar PNG */
/* ========================= */

function downloadImage() {
    html2canvas(previewContainer).then(canvas => {
        const link = document.createElement("a");
        link.download = "texto.png";
        link.href = canvas.toDataURL();
        link.click();
    });
}

/* ========================= */
/* Modo Claro / Escuro */
/* ========================= */

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
});

/* Inicializa */
updateStyle();