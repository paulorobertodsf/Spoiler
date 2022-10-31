async function fetchPerguntas() {
    const URL = 'http://10.0.0.179:3000/perguntas'
    await fetch(URL)
    .then(res => {
        res.json()
        .then(perg => {
           sorteiaPergunta(perg)
        })
    })
}

function sorteiaPergunta(perg) {
    var num_random = numRandom(perg.length)
    adicionaPergunta(perg[num_random])
}

function adicionaPergunta(perg) {
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
    const URL = 'http://10.0.0.179:3000/spoilers'
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