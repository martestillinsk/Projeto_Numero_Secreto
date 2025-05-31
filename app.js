let listaDeNumeroSorteados = [];
let numeroLimite = 10;
let numeroSecreto = 1;
let tentativas = 1;

function mostrarTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function mostrarMensagemInicial(){
    mostrarTextoNaTela('h1', 'Jogo do numero secreto');
    mostrarTextoNaTela('p', 'escolha um numero entre 1 e 10');
}

mostrarMensagemInicial();

function verificarChute(){
    let chute = document.querySelector('input').value;
    
    if(chute == numeroSecreto){
        mostrarTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1? 'tentativas' : 'tentativa' ;
        let mensagemTentativas = `você descobriu o numero secreto com ${tentativas} ${palavraTentativa}!`;
        mostrarTextoNaTela('p', mensagemTentativas );
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if(chute > numeroSecreto){
            mostrarTextoNaTela('p', 'o numero secreto é menor');
            tentativas++;
        }
        if(chute<numeroSecreto){
            mostrarTextoNaTela('p', 'o numero secreto é maior');
            tentativas++;
        }
        limparCampo();
    }

}

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random()*numeroLimite+1);
    let quantidadeDeElementosNaLista = listaDeNumeroSorteados.length;

    if(quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumeroSorteados = [];
    }

    if(listaDeNumeroSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }else {
        listaDeNumeroSorteados.push(numeroEscolhido);
        console.log(listaDeNumeroSorteados);
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('input')
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    mostrarMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}