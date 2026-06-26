async function hashRaw(algorithm, text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const start = performance.now();
    const hashBuffer = await crypto.subtle.digest(algorithm, data);
    const end = performance.now();
    const timeMs = (end - start).toFixed(2);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
    return { hex, timeMs };
}

function formatHash(hex, format) {
    if (format === "hex") return hex;
    if (format === "hex-upper") return hex.toUpperCase();
    if (format === "base64") {
        const bytes = hex.match(/.{1,2}/g).map(b => parseInt(b, 16));
        const uint8 = new Uint8Array(bytes);
        let binary = "";
        uint8.forEach(b => binary += String.fromCharCode(b));
        return btoa(binary);
    }
    return hex;
}

function updateHashLength(formattedHash) {
    const lengthSpan = document.getElementById("hashLength");
    if (!formattedHash) {
        lengthSpan.textContent = "Hash length: —";
    } else {
        lengthSpan.textContent = `Hash length: ${formattedHash.length} characters`;
    }
}

async function computeAndDisplayHash() {
    const password = document.getElementById("passwordInput").value;
    const salt = document.getElementById("saltInput").value;
    const algorithm = document.getElementById("algorithmSelect").value;
    const format = document.getElementById("formatSelect").value;

    if (!password) {
        document.getElementById("hashOutput").value = "";
        updateHashLength("");
        document.getElementById("hashTiming").textContent = "Hash time: — ms";
        return;
    }

    const combined = salt + password;
    const { hex, timeMs } = await hashRaw(algorithm, combined);
    const formatted = formatHash(hex, format);

    document.getElementById("hashOutput").value = formatted;
    document.getElementById("hashTiming").textContent = `Hash time: ${timeMs} ms`;
    updateHashLength(formatted);
}

document.getElementById("hashButton").addEventListener("click", async () => {
    await computeAndDisplayHash();
});

document.getElementById("copyButton").addEventListener("click", () => {
    const output = document.getElementById("hashOutput").value;
    if (!output) return;
    navigator.clipboard.writeText(output);
});

document.getElementById("copyJsonButton").addEventListener("click", () => {
    const salt = document.getElementById("saltInput").value;
    const hash = document.getElementById("hashOutput").value;
    if (!hash) return;
    const json = JSON.stringify({ salt, hash }, null, 2);
    navigator.clipboard.writeText(json);
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

document.getElementById("generateSalt").addEventListener("click", () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let salt = "";
    for (let i = 0; i < 10; i++) {
        salt += chars[Math.floor(Math.random() * chars.length)];
    }
    document.getElementById("saltInput").value = salt;
});

document.getElementById("clearAllButton").addEventListener("click", () => {
    document.getElementById("passwordInput").value = "";
    document.getElementById("saltInput").value = "";
    document.getElementById("hashOutput").value = "";
    document.getElementById("hashTiming").textContent = "Hash time: — ms";
    updateHashLength("");
});

document.getElementById("instantHashToggle").addEventListener("change", () => {
    const instant = document.getElementById("instantHashToggle").checked;
    const hashButton = document.getElementById("hashButton");

    if (instant) {
        hashButton.style.display = "none";
        computeAndDisplayHash();
    } else {
        hashButton.style.display = "block";
    }
});

["passwordInput", "saltInput", "algorithmSelect", "formatSelect"].forEach(id => {
    document.getElementById(id).addEventListener("input", () => {
        const instant = document.getElementById("instantHashToggle").checked;
        if (instant) {
            computeAndDisplayHash();
        }
    });
    document.getElementById(id).addEventListener("change", () => {
        const instant = document.getElementById("instantHashToggle").checked;
        if (instant) {
            computeAndDisplayHash();
        }
    });
});

document.getElementById("themeToggle").addEventListener("click", () => {
    const body = document.body;
    const current = body.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    body.setAttribute("data-theme", next);
    document.getElementById("themeToggle").textContent = next === "dark" ? "Dark" : "Light";
});
