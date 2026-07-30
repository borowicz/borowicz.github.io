const CARD_WIDTH = 1080;
const CARD_HEIGHT = 1350;

function roundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, radius);
  ctx.fill();
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 4) {
  const words = text.split(/\s+/);
  let line = "";
  let lines = 0;
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, y + lines * lineHeight);
      line = word;
      lines += 1;
      if (lines >= maxLines - 1) break;
    } else line = test;
  }
  if (lines < maxLines) ctx.fillText(line, x, y + lines * lineHeight);
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

async function buildShareCard() {
  const screen = document.querySelector(".result-screen");
  if (!screen) throw new Error("Result screen not found");
  const title = screen.querySelector("h1")?.textContent?.trim() || "MuuToo!";
  const description = screen.querySelector(":scope > p")?.textContent?.trim() || "The Mad Feminist Cow Test";
  const quote = screen.querySelector("blockquote")?.textContent?.trim() || "";
  const imageSrc = screen.querySelector(".result-art img")?.src;
  const scores = [...screen.querySelectorAll(".axis-score")].map(row => ({
    label: row.querySelector("span")?.textContent?.trim() || "",
    value: row.querySelector("b")?.textContent?.trim() || "0%"
  })).sort((a, b) => parseInt(b.value) - parseInt(a.value)).slice(0, 3);

  const canvas = document.createElement("canvas");
  canvas.width = CARD_WIDTH;
  canvas.height = CARD_HEIGHT;
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createLinearGradient(0, 0, CARD_WIDTH, CARD_HEIGHT);
  gradient.addColorStop(0, "#dff8ee");
  gradient.addColorStop(.55, "#f8e8f1");
  gradient.addColorStop(1, "#eee6ff");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

  ctx.fillStyle = "rgba(255,255,255,.78)";
  roundedRect(ctx, 70, 70, 940, 1210, 48);

  ctx.fillStyle = "#2f2540";
  ctx.font = "900 72px system-ui, -apple-system, sans-serif";
  ctx.fillText("Muu", 120, 155);
  ctx.fillStyle = "#ff5c9c";
  ctx.fillText("Too!", 270, 155);
  ctx.font = "700 26px system-ui, -apple-system, sans-serif";
  ctx.fillStyle = "#756b7f";
  ctx.fillText("THE MAD FEMINIST COW TEST", 120, 200);

  if (imageSrc) {
    try {
      const image = await loadImage(imageSrc);
      const boxX = 210, boxY = 235, boxW = 660, boxH = 500;
      const scale = Math.min(boxW / image.width, boxH / image.height);
      const width = image.width * scale;
      const height = image.height * scale;
      ctx.drawImage(image, boxX + (boxW - width) / 2, boxY + (boxH - height) / 2, width, height);
    } catch {}
  }

  ctx.textAlign = "center";
  ctx.fillStyle = "#ff5c9c";
  ctx.font = "800 26px system-ui, -apple-system, sans-serif";
  ctx.fillText("YOUR RESULT", CARD_WIDTH / 2, 790);
  ctx.fillStyle = "#2f2540";
  ctx.font = "900 62px system-ui, -apple-system, sans-serif";
  wrapText(ctx, title, CARD_WIDTH / 2, 860, 800, 68, 2);

  ctx.fillStyle = "#655b70";
  ctx.font = "500 29px system-ui, -apple-system, sans-serif";
  wrapText(ctx, description, CARD_WIDTH / 2, 985, 790, 39, 3);

  ctx.textAlign = "left";
  const scoreY = 1100;
  scores.forEach((score, index) => {
    const x = 130 + index * 285;
    ctx.fillStyle = "#2f2540";
    ctx.font = "800 25px system-ui, -apple-system, sans-serif";
    ctx.fillText(score.label, x, scoreY);
    ctx.fillStyle = "#ff5c9c";
    ctx.font = "900 42px system-ui, -apple-system, sans-serif";
    ctx.fillText(score.value, x, scoreY + 52);
  });

  if (quote) {
    ctx.textAlign = "center";
    ctx.fillStyle = "#756b7f";
    ctx.font = "italic 600 25px system-ui, -apple-system, sans-serif";
    wrapText(ctx, quote, CARD_WIDTH / 2, 1220, 780, 34, 2);
  }
  return canvas;
}

function canvasBlob(canvas) {
  return new Promise(resolve => canvas.toBlob(resolve, "image/png", .95));
}

async function downloadCard() {
  const canvas = await buildShareCard();
  const blob = await canvasBlob(canvas);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "muutoo-result.png";
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

async function shareCard() {
  const canvas = await buildShareCard();
  const blob = await canvasBlob(canvas);
  const file = new File([blob], "muutoo-result.png", { type: "image/png" });
  const title = document.querySelector(".result-screen h1")?.textContent || "MuuToo!";
  if (navigator.canShare?.({ files: [file] })) await navigator.share({ title: "MuuToo!", text: title, files: [file] });
  else if (navigator.share) await navigator.share({ title: "MuuToo!", text: title });
  else await navigator.clipboard.writeText(`MuuToo! — ${title}`);
}

function enhanceResultScreen(root = document) {
  const screen = root.querySelector?.(".result-screen");
  if (!screen || screen.dataset.shareEnhanced) return;
  screen.dataset.shareEnhanced = "true";
  const oldActions = screen.querySelector(".result-actions");
  if (!oldActions) return;
  const language = document.documentElement.lang === "pl" ? "pl" : "en";
  const labels = language === "pl"
    ? { share: "Udostępnij kartę", download: "Pobierz PNG", copy: "Kopiuj wynik", copied: "Wynik skopiowany!" }
    : { share: "Share card", download: "Download PNG", copy: "Copy result", copied: "Result copied!" };
  oldActions.className = "share-card-actions";
  oldActions.innerHTML = `<button class="primary-button" id="shareCardButton">${labels.share}<span>↗</span></button><button class="secondary-button" id="downloadCardButton">${labels.download}</button><button class="secondary-button" id="copyResultButton">${labels.copy}</button>`;
  oldActions.querySelector("#shareCardButton")?.addEventListener("click", () => shareCard().catch(() => {}));
  oldActions.querySelector("#downloadCardButton")?.addEventListener("click", () => downloadCard().catch(() => {}));
  oldActions.querySelector("#copyResultButton")?.addEventListener("click", async () => {
    const title = screen.querySelector("h1")?.textContent || "MuuToo!";
    const desc = screen.querySelector(":scope > p")?.textContent || "";
    await navigator.clipboard.writeText(`MuuToo! — ${title}: ${desc}`);
    const status = screen.querySelector("#shareStatus");
    if (status) status.textContent = labels.copied;
  });
}

const shareObserver = new MutationObserver(() => enhanceResultScreen());
shareObserver.observe(document.body, { childList: true, subtree: true });
enhanceResultScreen();
