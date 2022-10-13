let nome = document.getElementById("nome");
let email = document.getElementById("email");
let numero = document.getElementById("numero");

let btn = document.getElementById("btn").addEventListener("click", (e) => {
  e.preventDefault();
});

let cepValido = (cep) => cep.length == 8 && /^[0-9]+$/.test(cep);

const pesquisarCep = async () => {
  const cep = document.getElementById("cep").value;
  const url = `https://viacep.com.br/ws/${cep}/json/`;
  if (cepValido(cep)) {
    const dados = await fetch(url);
    const endereco = await dados.json();
    if (endereco.hasOwnProperty("erro")) {
      document.getElementById("endereco").value = "CEP não encontrado!";
    } else {
      preencherFormulario(endereco);
    }
  } else {
    document.getElementById("rua").value = "CEP incorreto!";
  }
};

let preencherFormulario = (endereco) => {
  document.getElementById("rua").value = endereco.logradouro;
  document.getElementById("bairro").value = endereco.bairro;
  document.getElementById("cidade").value = endereco.localidade;
  document.getElementById("estado").value = endereco.uf;
};

let cep = document
  .getElementById("cep")
  .addEventListener("focusout", pesquisarCep);
