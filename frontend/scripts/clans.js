document.addEventListener("DOMContentLoaded", async () => {
    const clanList = document.getElementById("clanList");

    if (!localStorage.getItem("token")) {
        alert("You must be logged in to view clans.");
        window.location.href = "login.html";
        return;
    }

    try {
        const response = await fetch("/api/user-clans", {
            headers: { 
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });

        if (!response.ok) throw new Error("Failed to fetch clans");

        const clans = await response.json();
        clanList.innerHTML = "";

        if (clans.length === 0) {
            clanList.innerHTML = "<p>No clans available. Create one!</p>";
            return;
        }

        clans.forEach(clan => {
            const li = document.createElement("li");
            li.innerHTML = `<strong>${clan.name}</strong> - ${clan.description}`;
            clanList.appendChild(li);
        });

    } catch (error) {
        console.error("Error loading clans:", error);
        clanList.innerHTML = "<p>Error loading clans. Try again later.</p>";
    }
});
