document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("signupBtn").addEventListener("click", async () => {
        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!username || !email || !password) {
            alert("All fields are required.");
            return;
        }

        try {
            const response = await fetch("/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password })
            });

            const result = await response.json();

            if (response.ok) {
                localStorage.setItem("token", result.token);
                window.location.href = "dashboard.html";
            } else {
                alert(result.message || "Signup failed. Try again.");
            }
        } catch (error) {
            console.error("Signup error:", error);
            alert("Error connecting to server.");
        }
    });
});
