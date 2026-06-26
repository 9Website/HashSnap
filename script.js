async function hashString(algorithm, text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest(algorithm, data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

document.getElementById("hashButton").addEventListener("click", async () => {
    const password = document.getElementById("passwordInput").value;
    const salt = document.getElementById("saltInput").value;
    const algorithm = document.getElementById("algorithmSelect").value;

    const combined = salt + password;
    const hash = await hashString(algorithm, combined);

    document.getElementById("hashOutput").value = hash;
});

document.getElementById("copyButton").addEventListener("click", () => {
    const output = document.getElementById("hashOutput").value;
    navigator.clipboard.writeText(output);
});

document.getElementById("togglePassword").addEventListener("click", () => {
    const input = document.getElementById("passwordInput");
    const btn = document.getElementById("togglePassword");

    if (input.type === "password") {
        input.type = "text";
        btn.textContent = "Hide";
    } else {
        input.type = "password";
        btn.textContent = "Show";
    }
});
