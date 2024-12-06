function irParaOQuizz() {
    setTimeout(() => {
        window.location.href = "usuario";
    }, 1000);
}

async function deletar(e) {
    e.preventDefault();


    try {
        // Fazendo a requisição POST para o servidor
        const response = await fetch(`/api/delete/${usuario.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },

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
