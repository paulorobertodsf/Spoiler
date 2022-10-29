async function fetchPerguntas() {
    const URL = 'http://127.0.0.1:3000/perguntas'
    await fetch(URL)
    .then(res => {
        res.json()
        .then(perg => {
            console.log('Chamou fetchPerguntas')
            sorteiaPergunta(perg)
        })
    })
}

function sorteiaPergunta(perg) {
    console.log('Chamou sorteia pergunta')
    var num_random = numRandom(perg.length)
    adicionaPergunta(perg[num_random])
}

function adicionaPergunta(perg) {
    console.log('Chamou adicionaPerguntas')
    let opc_correta = ''
    const titulo = document.querySelector('#pergunta')
    titulo.textContent = perg.pergunta

    const opcoes = document.querySelectorAll('.opcao')
    for(let opc = 0; opc < 4; opc++) {
        opcoes[opc].textContent = perg.opcoes[opc].opcao

        if (perg.opcoes[opc].correta) {
            opc_correta = perg.opcoes[opc].opcao
        }
        
        opcoes[opc].onclick = (obj) => {
            if (obj.target.textContent == opc_correta) {
                const spoiler = document.querySelector('#spoiler')
                spoiler.textContent = ''
                fetchPerguntas()
            } else {
                addSpoiler()
            }
        }
    }
}

function numRandom(limite) {
    return Math.floor(Math.random()*limite)
}

let spoilers = []

function fetchSpoilers() {
    const URL = 'http://127.0.0.1:3000/spoilers'
    fetch(URL)
    .then(res => {
        res.json()
        .then(spoiler => {
            spoilers = spoiler
        })
    })
}

function addSpoiler() {
    const spoiler = document.querySelector('#spoiler')
    spoiler.textContent = spoilers[numRandom(spoilers.length)]
}

fetchSpoilers()
fetchPerguntas()