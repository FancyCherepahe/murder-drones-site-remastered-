let discordLinksDisplayState = false;

function showDiscordLinks() {
    const discordLinks = [
        {link: "https://discord.gg/YqUVXjVJRE", name: "Uzi`s Basement", img: "images/logo.png"},
        
        {link: "https://discord.gg/WFJnEfFAtt", name: 'JCJenson Space Corps', img: "images/logo.png"},
        
//        {link: "https://discord.gg/67W39DqJ9G", name: "Aure`s Basement", img: "images/logo.png"},

//        {link: "https://discord.gg/JuNCVs4VDM", name: "V Simp United", img: "images/logo.png"}
    ];
    const discordLinksDiv = document.querySelector(".discord-links-div");
    discordLinksDisplayState = !discordLinksDisplayState;
    if (!discordLinksDisplayState) {
        discordLinksDiv.style.display = "none";
        return;
    } else {
        discordLinksDiv.style.display = "flex";
    }
    discordLinks.forEach(discord => {
        if (discordLinksDiv.querySelector(`a[href="${discord.link}"]`)) return;
        const discordDiv = document.createElement("div");
        discordDiv.className = "discord-channel-div"
        const link = document.createElement("a");
        link.href = discord.link;
        link.textContent = discord.name;
        link.target = "_blank";
        const logo = document.createElement("img");
        logo.src = discord.img;
        logo.className = "discord-channel-logo"
        discordDiv.appendChild(logo);
        discordDiv.appendChild(link)
        discordLinksDiv.appendChild(discordDiv);
    })
}

const carousel = document.querySelector('.fan-art');
document.getElementById('prev').onclick = () => {
  carousel.scrollBy({ left: -carousel.clientWidth, behavior: 'smooth' });
};
document.getElementById('next').onclick = () => {
  carousel.scrollBy({ left: carousel.clientWidth, behavior: 'smooth' });
};
