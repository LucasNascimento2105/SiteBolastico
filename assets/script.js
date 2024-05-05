// Adiciona um event listener para o evento de scroll
window.addEventListener('scroll', function() {
    var container = document.querySelector('.container');
    var image = document.getElementById('img1');
    var scrollPosition = window.scrollY;
    var windowHeight = window.innerHeight;

    // Calcula a distância entre o topo da imagem e o topo da janela
    var imageTop = image.getBoundingClientRect().top;
    var distanceFromTop = imageTop - windowHeight;

    // Calcula a opacidade com base na distância da imagem do topo da janela
    var opacity = 1 - (distanceFromTop / windowHeight);

    // Define a opacidade da imagem
    image.style.opacity = opacity;

    // Cor base do container
    var baseColor = '#06d6a0';

    // Fator de escurecimento
    var darknessFactor = 0.4; // Ajuste o valor para alterar a intensidade do escurecimento

    // Calcula a cor mais escura do container com base no fator de escurecimento e na posição de rolagem
    var darkerColor = darkenColor(baseColor, darknessFactor * (scrollPosition / windowHeight));

    // Define a cor de fundo do contêiner
    container.style.backgroundColor = darkerColor;
});

// Função para escurecer uma cor em hexadecimal
function darkenColor(color, factor) {
    var hex = color.replace('#', '');
    var r = parseInt(hex.substring(0, 2), 16);
    var g = parseInt(hex.substring(2, 4), 16);
    var b = parseInt(hex.substring(4, 6), 16);

    r = Math.round(r * (1 - factor));
    g = Math.round(g * (1 - factor));
    b = Math.round(b * (1 - factor));

    var result = '#' + (r < 16 ? '0' : '') + r.toString(16) + (g < 16 ? '0' : '') + g.toString(16) + (b < 16 ? '0' : '') + b.toString(16);
    return result;
}

// Obtém os dados da API e cria os cards dos personagens
document.addEventListener('DOMContentLoaded', function() {
    const nomesImagensLocais = ['assets/imag1.jpg', 'assets/imag2.jpg', 'assets/imag3.jpg', 'assets/imag4.jpg', 'assets/imag5.jpg'];
    fetch('https://my-json-server.typicode.com/LucasNascimento2105/api/db')
        .then(response => response.json())
        .then(data => {
            const charactersSection = document.getElementById('characters');

            data.Personagens.forEach((personagem, index) => {
                const nomeImagem = nomesImagensLocais[index % nomesImagensLocais.length];

                const personagemCard = `
                    <div class="card">
                        <img src="${nomeImagem}" alt="${personagem.nome}">
                        <h2>${personagem.nome}</h2>
                        <p>${personagem.descrição}</p>
                    </div>
                `;
                charactersSection.innerHTML += personagemCard;
            });
        })
        .catch(error => console.error('Error:', error));
});


