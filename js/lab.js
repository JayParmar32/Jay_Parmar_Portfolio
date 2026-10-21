document.addEventListener("DOMContentLoaded", () => {
    const counterValue = document.getElementById("counterValue");
    let count = 0;

    document.getElementById("incrementButton").addEventListener("click", () => {
        count += 1;
        counterValue.textContent = count;
    });

    document.getElementById("decrementButton").addEventListener("click", () => {
        count -= 1;
        counterValue.textContent = count;
    });

    document.getElementById("themeSelect").addEventListener("change", (event) => {
        document.body.dataset.labTheme = event.target.value;
    });

    const details = document.getElementById("hiddenDetails");
    document.getElementById("toggleDetails").addEventListener("click", (event) => {
        const isHidden = details.classList.toggle("d-none");
        event.currentTarget.textContent = isHidden ? "Show details" : "Hide details";
    });

    const zoomImage = document.getElementById("zoomImage");
    zoomImage.addEventListener("mouseover", () => zoomImage.classList.add("is-zoomed"));
    zoomImage.addEventListener("mouseout", () => zoomImage.classList.remove("is-zoomed"));

    const switchImage = document.getElementById("switchImage");
    const imageOptions = [
        "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=700&q=80",
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=700&q=80"
    ];
    let imageIndex = 0;
    document.getElementById("switchImageButton").addEventListener("click", () => {
        imageIndex = (imageIndex + 1) % imageOptions.length;
        switchImage.src = imageOptions[imageIndex];
    });

    const registrationForm = document.getElementById("registrationForm");
    const fields = {
        regName: "Name is required.",
        regEmail: "Enter a valid email address.",
        regPassword: "Use at least 8 characters with letters and numbers.",
        regConfirm: "Passwords must match.",
        regMobile: "Enter exactly 10 digits."
    };

    registrationForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const values = Object.fromEntries(new FormData(registrationForm));
        const errors = {
            regName: values.name.trim() ? "" : fields.regName,
            regEmail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) ? "" : fields.regEmail,
            regPassword: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(values.password) ? "" : fields.regPassword,
            regConfirm: values.confirm && values.confirm === values.password ? "" : fields.regConfirm,
            regMobile: /^\d{10}$/.test(values.mobile) ? "" : fields.regMobile
        };

        Object.entries(errors).forEach(([fieldId, message]) => {
            const input = document.getElementById(fieldId);
            const error = document.getElementById(`${fieldId}Error`);
            input.classList.toggle("is-invalid", Boolean(message));
            error.textContent = message;
        });

        const success = document.getElementById("registrationSuccess");
        const isValid = Object.values(errors).every(message => !message);
        success.classList.toggle("d-none", !isValid);
        if (isValid) registrationForm.reset();
    });

    const canvas = document.getElementById("artCanvas");
    const context = canvas.getContext("2d");
    context.fillStyle = "#15161d";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#d8ff3e";
    context.beginPath();
    context.arc(140, 155, 82, 0, Math.PI * 2);
    context.fill();
    context.fillStyle = "#ff6b4a";
    context.beginPath();
    context.moveTo(230, 55);
    context.lineTo(350, 260);
    context.lineTo(110, 260);
    context.closePath();
    context.fill();
    context.strokeStyle = "#fbf9f4";
    context.lineWidth = 5;
    context.strokeRect(300, 40, 170, 170);

    const postsGrid = document.getElementById("postsGrid");
    const apiStatus = document.getElementById("apiStatus");
    document.getElementById("loadPosts").addEventListener("click", async () => {
        apiStatus.textContent = "Loading posts...";
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=6");
            if (!response.ok) throw new Error("Request failed");
            const posts = await response.json();
            postsGrid.innerHTML = posts.map(post => `<article class="col-md-6 col-lg-4"><div class="api-post"><span>#${post.id}</span><h3>${post.title}</h3><p>${post.body}</p></div></article>`).join("");
            apiStatus.textContent = `${posts.length} posts loaded successfully.`;
        } catch (error) {
            apiStatus.textContent = "Could not load the external feed. Check your connection and try again.";
        }
    });
});
