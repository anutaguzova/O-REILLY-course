const btn = document.getElementById("btn");
const errorMessage = document.getElementById("errorMessage");
const gallery = document.getElementById("gallery");

async function fetchImage() {
    const inputValue = document.getElementById("input").value;

    if (inputValue > 10 || inputValue < 1) {
        errorMessage.style.display = "block";
        errorMessage.innerText = "Number should be between 1 and 10";
        return
    }

    img = "";

    try {
        btn.style.display = "none";
        const loading = `<img src="spinner.svg" alt ="spinner" class="spinner" />`;
        gallery.innerHTML = loading;

        await fetch(`https://api.unsplash.com/photos?per_page=${inputValue}&page=${Math.round(Math.random()*1000)}&client_id=iTVkUdKq-kb3Qniz1k6brARMcLcI4owXHCTAtrwSbBE`)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    data.forEach(element => {
                        img += `<img src=${element.urls.small} alt ="image">`;
                        gallery.style.display = "block";
                        gallery.innerHTML = img;
                        btn.style.display = "block";
                    });
                }
            })
        errorMessage.style.display = "none";
    } catch (error) {
        errorMessage.style.display = "block";
        errorMessage.innerHTML = "An error happened, try again later";
        btn.style.display = "block";
    }

}

btn.addEventListener("click", fetchImage);