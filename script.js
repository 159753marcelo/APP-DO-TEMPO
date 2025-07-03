// script.js

// ATENÇÃO: SUBSTITUA 'SUA_API_KEY_AQUI' PELA SUA CHAVE REAL DA OPENWEATHERMAP!
// Você pode obter uma chave gratuita em: https://openweathermap.org/api
const OPENWEATHER_API_KEY = '165cc6e4d1d9ac59c7ada3d7dd9c6ebf';

/**
 * Função assíncrona para obter os dados do clima de uma cidade usando a OpenWeatherMap API.
 * Inclui tratamento de erros para nomes de cidades inválidos, falhas na API e problemas de rede.
 *
 * @param {string} nomeDaCidade - O nome da cidade para buscar o clima.
 * @returns {Promise<Object>} Um objeto JSON contendo dados do clima ou lança um erro.
 */
async function obterClimaComTratamentoDeErros(nomeDaCidade) {
    // 1. Validação Inicial da Entrada
    if (!nomeDaCidade) {
        throw new Error("Por favor, forneça o nome de uma cidade para buscar o clima. Não pode ser vazio!");
    }

    try {
        // 2. Buscando os Dados do Clima usando a OpenWeatherMap API
        // A OpenWeatherMap pode buscar diretamente pelo nome da cidade.
        // 'units=metric' para temperatura em Celsius, 'lang=pt' para descrição em português.
        const urlOpenWeather = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(nomeDaCidade)}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=pt`;

        const respostaClima = await fetch(urlOpenWeather);

        // **Tratamento de Erro:** Verifica se a resposta da API foi bem-sucedida (código 200 OK).
        if (!respostaClima.ok) {
            // Se a cidade não for encontrada (status 404), lançamos um erro específico.
            if (respostaClima.status === 404) {
                throw new Error(`Desculpe, a cidade "${nomeDaCidade}" não foi encontrada. Por favor, verifique a grafia.`);
            }
            // Para outros erros da API (ex: chave inválida, problema no servidor da API)
            throw new Error(`Falha ao conectar com a API do Clima. Status: ${respostaClima.status} (${respostaClima.statusText}).`);
        }

        const dadosClima = await respostaClima.json();

        // 3. Extraindo e Formatando os Dados Relevantes da Resposta da OpenWeatherMap
        const temperaturaAtual = dadosClima.main.temp;
        const velocidadeVentoMS = dadosClima.wind.speed; // A OpenWeatherMap fornece em metros/segundo
        // Convertendo m/s para km/h e arredondando para uma casa decimal
        const velocidadeVentoKMH = (velocidadeVentoMS * 3.6).toFixed(1);
        
        // A descrição do clima já vem em português (se lang=pt foi usado)
        // Capitalizamos a primeira letra para melhor apresentação
        const descricaoClima = dadosClima.weather[0].description;
        const descricaoFinal = descricaoClima.charAt(0).toUpperCase() + descricaoClima.slice(1);

        // O código do ícone da OpenWeatherMap para montar a URL da imagem
        const iconeCode = dadosClima.weather[0].icon;
        const iconeUrl = `https://openweathermap.org/img/wn/${iconeCode}@2x.png`; // URL padrão para ícones da OWM

        // 4. Retornando o Objeto JSON com os Dados do Clima e o URL do Ícone
        return {
            cidade: dadosClima.name, // Nome da cidade padronizado pela API
            temperatura: `${temperaturaAtual}°C`,
            velocidadeVento: `${velocidadeVentoKMH} km/h`,
            descricao: descricaoFinal,
            iconeUrl: iconeUrl // Adiciona o URL do ícone para ser exibido
        };

    } catch (erro) {
        // Captura e loga qualquer erro ocorrido durante o processo (rede, API, lógica)
        console.error("Um erro inesperado ocorreu ao obter o clima:", erro);
        // Relança o erro para que o chamador possa tratá-lo na interface
        throw erro;
    }
}

// --- Lógica para interagir com a interface (DOM) ---

// Pega os elementos HTML que vamos manipular
const cidadeInput = document.getElementById('cidadeInput');
const buscarBtn = document.getElementById('buscarBtn');
const resultadoClimaDiv = document.getElementById('resultadoClima');
const mensagemErroDiv = document.getElementById('mensagemErro');

/**
 * Exibe os dados do clima na interface do usuário.
 * @param {Object} dados - O objeto de dados do clima retornado por obterClimaComTratamentoDeErros.
 */
function exibirResultado(dados) {
    // Limpa e oculta qualquer mensagem de erro anterior
    mensagemErroDiv.style.display = 'none';
    mensagemErroDiv.textContent = '';

    // Atualiza o conteúdo da div de resultados com os dados do clima e o ícone
    resultadoClimaDiv.innerHTML = `
        ${dados.iconeUrl ? `<img src="${dados.iconeUrl}" alt="${dados.descricao}" class="icone-clima">` : ''}
        <p><strong>Cidade:</strong> ${dados.cidade}</p>
        <p><strong>Temperatura:</strong> ${dados.temperatura}</p>
        <p><strong>Velocidade do Vento:</strong> ${dados.velocidadeVento}</p>
        <p><strong>Condição:</strong> ${dados.descricao}</p>
    `;
    resultadoClimaDiv.style.backgroundColor = '#e8f5e9'; // Cor de fundo para sucesso
    resultadoClimaDiv.style.color = '#333'; // Cor do texto
}

/**
 * Exibe uma mensagem de erro na interface do usuário.
 * @param {string} mensagem - A mensagem de erro a ser exibida.
 */
function exibirErro(mensagem) {
    // Exibe uma mensagem genérica no resultado para indicar um problema
    resultadoClimaDiv.innerHTML = `<p>Ocorreu um problema ao buscar o clima.</p>`;
    resultadoClimaDiv.style.backgroundColor = '#ffebee'; // Cor de fundo para erro
    resultadoClimaDiv.style.color = '#d32f2f'; // Cor do texto do erro

    // Exibe a mensagem de erro detalhada na div específica de erros
    mensagemErroDiv.textContent = mensagem;
    mensagemErroDiv.style.display = 'block'; // Torna a div de erro visível
}

// Adiciona um "ouvinte de evento" ao botão de busca
// Esta função será executada toda vez que o botão for clicado
buscarBtn.addEventListener('click', async () => {
    // Pega o texto digitado no input da cidade e remove espaços extras
    const nomeDaCidade = cidadeInput.value.trim();

    // Limpa resultados e erros anteriores enquanto a busca é realizada
    resultadoClimaDiv.innerHTML = `<p>Buscando clima...</p>`;
    resultadoClimaDiv.style.backgroundColor = '#f0f2f5';
    mensagemErroDiv.style.display = 'none';
    mensagemErroDiv.textContent = '';

    try {
        // Chama a função assíncrona para buscar os dados do clima e espera o resultado
        const dadosDoClima = await obterClimaComTratamentoDeErros(nomeDaCidade);
        // Se a busca for bem-sucedida, exibe os dados na tela
        exibirResultado(dadosDoClima);
    } catch (erro) {
        // Se ocorrer qualquer erro, exibe a mensagem de erro na tela
        exibirErro(erro.message);
    }
});

// Opcional: Permite buscar o clima ao apertar a tecla "Enter" no campo de texto
cidadeInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        buscarBtn.click(); // Simula um clique no botão de busca
    }
});