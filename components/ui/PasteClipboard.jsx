// روش async/await
async function PasteClipboard(id) {
  try {
    const text = await navigator.clipboard.readText(); // ← اینجا Promise resolve میشه
    console.log(text); // حالا متن واقعی داخل کلیپبورد
    const txtNewEmail = document.getElementById(id"txtNewEmail");
    if (txtNewEmail) txtNewEmail.value = text;
  } catch (err) {
    console.error("Clipboard read denied:", err);
  }
}

// روش .then
navigator.clipboard.readText()
  .then(text => {
    console.log(text); // متن واقعی
  })
  .catch(err => console.error(err));
