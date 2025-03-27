document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("loginBtn").addEventListener("click", async () => {
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!email || !password) {
            alert("Please fill in both fields.");
            return;
        }

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const result = await response.json();

            if (response.ok) {
                localStorage.setItem("token", result.token);
                window.location.href = "dashboard.html";
            } else {
                alert(result.message || "Login failed. Please try again.");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Error connecting to server. Try again later.");
        }
    });
});
