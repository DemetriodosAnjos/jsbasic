document.addEventListener("DOMContentLoaded", function () {
    const validarBtn = document.getElementById("validarBtn");
    const limparBtn = document.getElementById("limparBtn");
    const codigoTextarea = document.getElementById("codigo");
    const modalErro = document.getElementById("modalErro");
    const modalSucesso = document.getElementById("modalSucesso");

    // Funções auxiliares para abrir e fechar modais
    function abrirModal(modalElement) {
        modalElement.style.display = "flex"; // Usamos 'flex' para centralizar com CSS
        modalElement.classList.remove("fadeOut");
        modalElement.classList.add("fadeIn");
    }

    function fecharModal(modalElement) {
        modalElement.classList.remove("fadeIn");
        modalElement.classList.add("fadeOut");
        // Oculta o modal após a animação de fadeOut
        setTimeout(() => {
            modalElement.style.display = "none";
        }, 500); // 500ms corresponde à duração da animação fadeOut no CSS
    }

    // Adiciona event listeners para os botões dentro dos modais
    document.addEventListener("click", function(event) {
        // Verifica se o clique foi em um botão com a classe 'modal-close-btn'
        if (event.target.classList.contains("modal-close-btn") || event.target.closest(".modal-close-btn")) {
            const buttonElement = event.target.closest(".modal-close-btn");
            const modalId = buttonElement.dataset.modalId; // Pega o ID do modal do atributo data-modal-id
            const targetModal = document.getElementById(modalId);
            if (targetModal) {
                fecharModal(targetModal);
            }
        }
    });

    // Event Listeners principais dos botões de ação
    validarBtn.addEventListener("click", validarCodigo);
    limparBtn.addEventListener("click", limparCodigo);

    function validarCodigo() {
        const codigo = codigoTextarea.value;

        // Expressões regulares para validar o código e capturar os valores
        // O grupo de captura `([^'"]+)` pega qualquer coisa entre as aspas
        const variavelNomeRegex = /(?:let|const|var)\s+nome\s*=\s*['"]([^'"]+)['"]\s*;/i;
        const variavelCidadeRegex = /(?:let|const|var)\s+cidade\s*=\s*['"]([^'"]+)['"]\s*;/i;
        
        // Regex para o console.log, aceitando template literal ou concatenação
        const consoleLogRegex = /console\.log\s*\(\s*(?:`Olá,\s*meu\s*nome\s*é\s*\$\{nome\}\s*e\s*moro\s*em\s*\$\{cidade\}!`|"Olá,\s*meu\s*nome\s*é\s*"\s*\+\s*nome\s*\+\s*"(?:\s*e\s*moro\s*em\s*)"\s*\+\s*cidade)\s*\)/i;

        const matchNome = codigo.match(variavelNomeRegex);
        const matchCidade = codigo.match(variavelCidadeRegex);

        // Captura o nome e a cidade do grupo 1 da regex, ou usa um placeholder
        const nomeCapturado = matchNome ? matchNome[1] : '[seu nome]';
        const cidadeCapturada = matchCidade ? matchCidade[1] : '[sua cidade]';

        if (matchNome && matchCidade && consoleLogRegex.test(codigo)) {
            // Seleciona o elemento onde a mensagem dinâmica será exibida no modal de sucesso
            const dynamicMessageElement = modalSucesso.querySelector('.modal-dynamic-message');
            
            // Verifica se o elemento existe antes de tentar modificar seu conteúdo
            if (dynamicMessageElement) {
                dynamicMessageElement.textContent = `Olá, meu nome é ${nomeCapturado} e moro em ${cidadeCapturada}!`;
            }
            abrirModal(modalSucesso);
        } else {
            abrirModal(modalErro);
        }
    }

    function limparCodigo() {
        codigoTextarea.value = "";
    }
});