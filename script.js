// Animações de entrada dos painéis intermediários.
const elementos = document.querySelectorAll('.voa-esquerda, .voa-direita, .voa-baixo');
const movimentoReduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (movimentoReduzido || !('IntersectionObserver' in window)) {
    elementos.forEach((elemento) => elemento.classList.add('mostrar-agora'));
} else {
    const observador = new IntersectionObserver((entradas, observer) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('mostrar-agora');
                observer.unobserve(entrada.target);
            }
        });
    }, { threshold: 0.1 });

    elementos.forEach((elemento) => observador.observe(elemento));
}

// O painel continua funcionando com HTML nativo se o JS estiver desativado.
document.querySelectorAll('.nivel-avancado details').forEach((painel) => {
    const titulo = painel.querySelector('summary');
    const atualizarTitulo = () => {
        titulo.textContent = painel.open ? 'Fechar exemplo' : 'Explorar exemplo';
    };
    painel.addEventListener('toggle', atualizarTitulo);
    atualizarTitulo();
});
