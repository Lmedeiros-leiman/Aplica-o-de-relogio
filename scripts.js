//
// Este é o arquivo principal.
// o código compilado esta em bundle.js
// obrigado browserify pelo empacotamento.
//



// passo 2 - o padrao desta variavel ser a zona local do usuario
//          2.5 - manter uma maneira de saber qual a zona selecionada E a original
// passo 3 - pegar o horario se baseando nessa variavel
// passo 4 - mostrar para o usuario :)
// passo 5 - tomar cafézinho enquanto o hithub trabalha.
//



//
// Handle TimeClock
//
const moment = require("moment")
const momentTimezone = require("moment-timezone")

let zonaTemporalSelecionada = momentTimezone.tz.guess() 
function AtualizarHorario(ZonaTemporal){
    
    momentTimezone.tz.setDefault( ZonaTemporal );
    const horarioCompleto = moment().tz(ZonaTemporal).format();
    
    const horario = moment().format("HH:mm:ss")
    const dia = moment().format("MMMM Do YYYY");

    // modifica os elementos visuais
    document.getElementById("fusohorario").innerText = ZonaTemporal

    document.getElementById("horario").innerText = horario

    document.getElementById("data").innerText = dia

}
AtualizarHorario(zonaTemporalSelecionada);
setInterval( (e) => {AtualizarHorario(zonaTemporalSelecionada)} ,1000)

//
// Handle Modal
//

const modal = document.getElementById("modal");

const botaoAbrirModal = document.getElementById("AbrirModal");
botaoAbrirModal.addEventListener("click",( (e) => {
    
    modal.showModal();
}))


//
// Cria as opcoes para o usuario
// e lida com o formulario
//


let OpcaoFormularioSelecionada = null
const Formulario = document.getElementById("formulario")
const ElementoSelecao = Lista = document.getElementById("selecao")

const chuteZonaUsuario = momentTimezone.tz.guess()
const ListaZonasTemporais = moment.tz.names()
ListaZonasTemporais.forEach( (zona,numero) => {
    let Opcao = document.createElement("option");
    Opcao.value = zona; Opcao.text = zona
    Opcao.index = numero

    if (zona == chuteZonaUsuario) {
        Opcao.style.color = "rgb(38,183,255)";
        Opcao.style.fontWeight = "bold";
        Opcao.selected = true;
        OpcaoFormularioSelecionada = ElementoSelecao.options[ElementoSelecao.selectedIndex]
    }

    Lista.appendChild(Opcao)
})

Formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const AntigaOpcao = OpcaoFormularioSelecionada
    const NovaOpcao = (ElementoSelecao.options[ElementoSelecao.selectedIndex])
    // normaliza a opção antiga
    AntigaOpcao.style.fontWeight = "normal"

    // modifica a nova opcao selecionada
    NovaOpcao.style.fontWeight = "bold"


    zonaTemporalSelecionada = NovaOpcao.value
    OpcaoFormularioSelecionada = NovaOpcao
    modal.close();
})
Formulario.addEventListener("reset", (e) => {
    e.preventDefault()
    modal.close();
})







