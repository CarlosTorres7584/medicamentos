async function login() {
            const res = await fetch('/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    usuario: document.getElementById('usuario').value,
                    password: document.getElementById('password').value
                })
            });

            if (res.ok){
                alert("Login Correcto");
            }else {
                try {
                    const data = await res.json();
                    alert(data.error);
            } catch (e) {
        alert("Error en el servidor");
        }
    }
}