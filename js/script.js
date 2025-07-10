document.addEventListener("DOMContentLoaded", function () {
    const validarBtn = document.getElementById("validarBtn");
    const limparBtn = document.getElementById("limparBtn");
    const codigoTextarea = document.getElementById("codigo");
    const modalErro = document.getElementById("modalErro");
    const modalSucesso = document.getElementById("modalSucesso");

    /*validarBtn.addEventListener("click", () => {
  console.log("Botão validar clicado!");
});*/

    // Botão "Tentar novamente" do modal de erro
    const tentarNovamenteBtn = document.querySelector(".retry-button");
    if (tentarNovamenteBtn) {
        tentarNovamenteBtn.addEventListener("click", function () {
            // Fecha o modal de erro
            if (modalErro) {
                modalErro.style.display = "none";
            }
            // Recarrega a página para limpar os dados (opcional)
            window.location.reload();
        });
    }

    // Funções para abrir e fechar modais
    function abrirModal(modalElement) {
        modalElement.style.display = "flex";
        modalElement.classList.remove("fadeOut");
        modalElement.classList.add("fadeIn");
    }

    function fecharModal(modalElement) {
        modalElement.classList.remove("fadeIn");
        modalElement.classList.add("fadeOut");
        setTimeout(() => {
            modalElement.style.display = "none";
        }, 500);
    }

    // Fecha modais ao clicar nos botões de fechar
    document.querySelectorAll('.close-icon, .close-btn').forEach(icon => {
        icon.addEventListener('click', () => {
            limparCodigo(); // Limpa o campo e dá foco
            fecharModal(modalErro);
            fecharModal(modalSucesso);
        });
    });

    // Função que valida o código digitado
    function validarCodigo() {
        const codigo = codigoTextarea.value;

        // Expressões regulares para validação
        const variavelNomeRegex = /(?:let|const|var)\s+nome\s*=\s*['"]([^'"]+)['"]\s*;/i;
        const variavelCidadeRegex = /(?:let|const|var)\s+cidade\s*=\s*['"]([^'"]+)['"]\s*;/i;

        // Regex flexível para diferentes formatos de console.log
        const consoleLogRegex = /console\.log\s*\((.*nome.*\+.*cidade.*|`.*\${nome}.*\${cidade}.*`)\s*\)\s*;/i;

        const matchNome = codigo.match(variavelNomeRegex);
        const matchCidade = codigo.match(variavelCidadeRegex);

        const nomeCapturado = matchNome ? matchNome[1] : '[seu nome]';
        const cidadeCapturada = matchCidade ? matchCidade[1] : '[sua cidade]';

        if (matchNome && matchCidade && consoleLogRegex.test(codigo)) {
            const dynamicMessageElement = modalSucesso.querySelector('.modal-dynamic-message');
            if (dynamicMessageElement) {
                dynamicMessageElement.textContent = `Olá, meu nome é ${nomeCapturado} e moro em ${cidadeCapturada}!`;
            }
            abrirModal(modalSucesso);
        } else {
            abrirModal(modalErro);
        }
    }

        /*function validarCodigo() {
  alert("Função validarCodigo foi chamada!");
}*/

    // Função para limpar o textarea e focar nele
    function limparCodigo() {
        codigoTextarea.value = "";
        codigoTextarea.focus();
    }

    // Adiciona event listeners nos botões
    validarBtn.addEventListener("click", validarCodigo);
    limparBtn.addEventListener("click", limparCodigo);
});
