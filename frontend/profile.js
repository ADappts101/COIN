<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>COIN - Profile</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>Profile</h1>
        <nav>
            <ul>
                <li><a href="dashboard.html">Dashboard</a></li>
                <li><a href="clans.html">My Clans</a></li>
                <li><a href="settings.html">Settings</a></li>
                <li><a href="#" id="logout">Logout</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <section class="profile-info">
            <h2>Your Profile</h2>
            <p><strong>Username:</strong> <span id="profileUsername"></span></p>
            <p><strong>Email:</strong> <span id="profileEmail"></span></p>
            <p><strong>Joined:</strong> <span id="profileJoinDate"></span></p>
        </section>

        <section class="clan-membership">
            <h2>Your Clans</h2>
            <ul id="userClanList">
                <!-- User's clans will be dynamically listed here -->
            </ul>
        </section>
    </main>

    <footer>
        <p>&copy; 2025 COIN. All Rights Reserved.</p>
    </footer>

    <script src="scripts/profile.js"></script>
</body>
</html>
