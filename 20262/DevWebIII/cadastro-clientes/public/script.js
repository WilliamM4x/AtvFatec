const API_URL = "http://localhost:3000/clientes";
const form = document.getElementById("clientForm");
const lista = document.getElementById("lista-clientes");


async function carregarClients(){
    const resp = await fetch(API_URL);
    const cliente = await resp.json();
    
    lista.innerHTML = "";
    cliente.forEach(cliente => {
        const li = document.createElement("li");
        li.textContent = `${cliente.nome} - ${cliente.email} - ${cliente.telefone}`;
        lista.appendChild(li);

    });
}

form.addEventListener("submit", async(e)=>{
    e.preventDefault();
   
    const novoCliente = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        telefone: document.getElementById("telefone").value,
    };

    await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(novoCliente),
    });
    
    form.reset();
    await carregarClients();
});

carregarClients();