🌦️ App do Tempo

  Um aplicativo simples e intuitivo para verificar as condições climáticas atuais de qualquer cidade ao redor do mundo. Desenvolvido com HTML, CSS e JavaScript puro, utilizando a API da OpenWeatherMap para dados precisos e atualizados.

✨ Funcionalidades

Busca por Cidade: Digite o nome de qualquer cidade e obtenha as informações do clima.

Dados Detalhados: Exibe a temperatura atual em Celsius, a velocidade do vento em km/h e uma descrição textual das condições climáticas.

Ícones Visuais: Apresenta um ícone dinâmico que representa visualmente a condição climática atual, tornando a experiência mais amigável.

Tratamento de Erros: Informa o usuário sobre problemas como cidade não encontrada ou falhas na conexão com a API.

Responsivo: Design básico que se adapta a diferentes tamanhos de tela (requer estilos CSS adicionais para total responsividade).

🚀 Como Usar

1. Clone ou Baixe o Projeto:

Bash
git clone [https://github.com/159753marcelo/APP-DO-TEMPO.git]
cd AppClima

(Se você não usa Git, apenas baixe os arquivos e descompacte a pasta AppClima.)

2. Obtenha sua Chave da API OpenWeatherMap:

Vá para OpenWeatherMap API.

Crie uma conta (se ainda não tiver) ou faça login.

Navegue até a seção "API keys" no seu perfil.

Copie sua chave API (ela será uma sequência de caracteres alfanuméricos). Certifique-se de que seu e-mail esteja confirmado para a chave ser ativada!

3. Configure a Chave no Código:

Abra o arquivo script.js na pasta AppClima.

* Encontre a linha:

JavaScript
const OPENWEATHER_API_KEY = 'SUA_API_KEY_AQUI';

* Substitua 'SUA_API_KEY_AQUI' pela sua chave real copiada da OpenWeatherMap. Exemplo:

JavaScript
const OPENWEATHER_API_KEY = '12345abcdefg67890hijklm'; // Sua chave verdadeira aqui

* Salve o arquivo script.js.

4. Execute o Aplicativo:

 Abra o arquivo index.html no seu navegador. A maneira mais fácil é usar a extensão "Live Server" no VS Code, que abrirá o projeto em um servidor local e atualizará automaticamente as mudanças.

🛠️ Tecnologias Utilizadas

* HTML5: Estrutura da página web.

* CSS3: Estilização e layout.

* JavaScript (ES6+): Lógica do aplicativo e interação com a API.

* OpenWeatherMap API: Fornecimento dos dados meteorológicos.

🤝 Contribuição

Contribuições são bem-vindas! Se você tiver ideias para melhorias, novas funcionalidades ou quiser corrigir algum bug, sinta-se à vontade para:

1. Fazer um "fork" do repositório.

2. Criar uma nova "branch" (git checkout -b feature/minha-nova-funcionalidade).

3. Fazer suas alterações.

4. Submeter um "Pull Request".

📄 Licença

Este projeto está licenciado sob a Licença MIT.

Como usar:

1. Crie um novo arquivo na pasta raiz do seu projeto AppClima (ao lado de index.html, script.js, style.css) e salve-o como README.md.

2. Copie e cole o conteúdo acima neste novo arquivo.

3. Lembre-se de substituir [https://github.com/159753marcelo/APP-DO-TEMPO.git] 

pelo link real do seu repositório Git, caso você o tenha hospedado no GitHub, GitLab, etc.