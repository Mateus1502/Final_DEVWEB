const usuario = JSON.parse(localStorage.getItem("user"));
if (!usuario) {
  window.location.href = "usuario";
}
console.log(usuario);
setarDados();

function setarDados(){
  const input_name = document.getElementById("name");
  const input_email = document.getElementById("email");
  input_name.value = usuario.name;
  input_email.value = usuario.email;
}
function irParaOQuizz() {
    setTimeout(() => {
      window.location.href = "quizz";
    }, 1000);
  }
  
  async function editar(e) {
    e.preventDefault();// Previne o envio padrão do formulário

     // Captura os valores de email e name do formulário
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    try {
      // Fazendo a requisição POST para o servidor
      const response = await fetch(`/api/usuario/${usuario.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name, email: email }),
      });
  
      // Esperando a resposta do servidor
      if (response.ok) {
        const data = await response.json(); // Esperando a resposta JSON
        localStorage.setItem("user", JSON.stringify(data)); // Armazenando o usuário no localStorage
        irParaOQuizz(); // Redireciona para o quiz após o login bem-sucedido
      } else {
        const errorData = await response.json(); // Obtemos o erro retornado pelo servidor
        const span_error = document.getElementById("error");
        span_error.innerHTML =
          errorData.message || errorData.error || "Erro ao fazer login"; // Mostra o erro na página
        console.error("Falha no login:", errorData);
      }
    } catch (error) {
      console.error("Erro ao tentar fazer login:", error);
    }
  }
  