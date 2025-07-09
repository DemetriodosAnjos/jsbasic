document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("validarBtn").addEventListener("click", validarCodigo);
  document.getElementById("limparBtn").addEventListener("click", limparCodigo);

  function validarCodigo() {
    const codigo = document.getElementById("codigo").value;

    const variavelNome = /(?:let|const)\s+nome\s*=\s*"[^"]+";/i;
    const variavelCidade = /(?:let|const)\s+cidade\s*=\s*"[^"]+";/i;
    const consoleLog = /console\.log\s*\(\s*(?:`Olá, meu nome é ${nome} e moro em ${cidade}!`|"Olá, meu nome é "\s*\+\s*nome\s*\+\s*" e moro em "\s*\+\s*cidade\s*)\)/i;


    if (variavelNome.test(codigo) && variavelCidade.test(codigo) && consoleLog.test(codigo)) {
      const modal = document.getElementById("modalSucesso");
      modal.style.display = "block";
      modal.classList.remove("fadeOut");
      modal.classList.add("fadeIn");
    } else {
      const modal = document.getElementById("modalErro");
      modal.style.display = "block";
      modal.classList.remove("fadeOut");
      modal.classList.add("fadeIn");
    }
  }

  function limparCodigo() {
    document.getElementById("codigo").value = "";
  }
});

function fecharModal(id) {
  const modal = document.getElementById(id);
  modal.classList.remove("fadeIn");
  modal.classList.add("fadeOut");
  setTimeout(() => {
    modal.style.display = "none";
    location.reload();
  }, 500);
}