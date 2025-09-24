document.addEventListener("DOMContentLoaded", () => {
    const translateBtn = document.getElementById("translateBtn");
    if (translateBtn) {
        translateBtn.addEventListener("click", async () => {
            const text = document.getElementById("textInput").value;
            const language = document.querySelector('input[name="language"]:checked').value;

            if (!text) {
                alert("Please enter text to translate");
                return;
            }

            // ارسال به Worker
            const response = await fetch("/worker.js", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({text, language})
            });

            const data = await response.json();
            // ذخیره در sessionStorage برای نمایش در results.html
            sessionStorage.setItem("originalText", text);
            sessionStorage.setItem("translatedText", data.translation);

            window.location.href = "results.html";
        });
    }

    // نمایش ترجمه در results.html
    const originalTextEl = document.getElementById("originalText");
    const translatedTextEl = document.getElementById("translatedText");
    if (originalTextEl && translatedTextEl) {
        originalTextEl.textContent = sessionStorage.getItem("originalText") || "";
        translatedTextEl.textContent = sessionStorage.getItem("translatedText") || "";
    }
});

function startOver() {
    window.location.href = "index.html";
}