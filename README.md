# <img src="https://img.shields.io/badge/GitHub-9Website-black?style=for-the-badge&logo=github" height="45">

# To access this site go to: [`https://9website.github.io/HashSnap/`](https://9website.github.io/HashSnap/)
(If this URL tries to take you to a GitHub page, copy it and paste it directly into your browser address bar or a new tab.)

TL;DR (Too Long Didn't Read) is at the bottom.

---

# 🔐 HashSnap — Client-Side Password Hash Generator

HashSnap is a fast, browser-based password hashing tool built for developers, creators, and privacy-conscious users.

All hashing is performed **locally in your browser** using the Web Crypto API — no servers, no tracking, and no password storage. Enter a password, optionally add a salt, choose an algorithm, and instantly generate a cryptographic hash.

---

## 👤 Credits & Distribution

This software is developed, maintained, and distributed by **[9Website](https://github.com/9Website)**.

This project is licensed under the **MIT License**.

---

## ⚖️ License (MIT)

This project is open-source under the **MIT License**.

That means:

1. **You are free to use it**  
   Personal, educational, and commercial use are allowed.

2. **You are free to modify it**  
   You can fork, customize, and extend the project.

3. **You are free to redistribute it**  
   As long as you keep the original copyright and license notice.

4. **You are NOT required to open-source your own project**  
   MIT is a permissive license and does not force derivative works to be public.

---

## ✨ Features

* **Client-Side Hashing:** All hashing happens in your browser using `crypto.subtle.digest()`.
* **Multiple Algorithms:** Support for SHA-256, SHA-1, and SHA-512.
* **Optional Salt:** Add a salt string to strengthen your hashes.
* **Copy-to-Clipboard:** One-click copying of the generated hash.
* **Minimal & Fast:** Lightweight, no external libraries, no backend.
* **Open-Source:** Easy to audit, fork, and integrate into other workflows.

---

## 🧠 How It Works

HashSnap uses the browser’s built-in **Web Crypto API**:

- The password (and optional salt) are combined into a single string.
- That string is encoded using `TextEncoder`.
- The encoded data is passed to `crypto.subtle.digest()` with the selected algorithm.
- The resulting hash bytes are converted to a hexadecimal string and displayed.

No data is sent to any server. Everything happens in memory on the client side.

---

## ⚠️ Troubleshooting

If HashSnap doesn’t work as expected:

- Make sure you’re using a **modern browser** (Chrome, Edge, Firefox, Safari).
- Ensure **JavaScript is enabled**.
- Some very old browsers may not support the Web Crypto API.

If you encounter bugs or have feature requests, please report them in the **Issues** tab of this repository.

---

## ⏱️ TL;DR (Too Long; Didn't Read)

> This is a **client-side password hashing tool**.  
> Your input (password and salt) is never uploaded, stored, or logged.

> For best security, always use strong, unique passwords and appropriate salts.

| Feature | Description |
| :--- | :--- |
| 🔒 **Local Hashing** | All hashing is done in your browser using the Web Crypto API. |
| 🧂 **Salt Support** | Optional salt field to strengthen hashes. |
| ⚙️ **Multiple Algorithms** | SHA-256, SHA-1, and SHA-512 available. |
| 📋 **Copy Output** | One-click copying of the generated hash string. |

---

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Tech: WebCrypto](https://img.shields.io/badge/Tech-WebCrypto-blue.svg)
![Status: Stable](https://img.shields.io/badge/Status-Stable-brightgreen.svg)
