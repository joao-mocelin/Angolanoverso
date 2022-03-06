const gitalk = new Gitalk({
	clientID: "3b53c4b7f46b647d7639",
	clientSecret: "5d82db75d245a6d8c3b63c142b09c0fd1621ba6c",
	repo: "Angolanoverso", // The repository of store comments,
	owner: "joao-mocelin",
	admin: ["joao-mocelin", "IgorBayerl"],
	id: location.pathname, // Ensure uniqueness and length less than 50
	distractionFreeMode: false, // Facebook-like distraction free mode
});

gitalk.render("gitalk-container");

function addCard(title, emoji, img) {
	const angolaBox = document.querySelector(".angola_box");
	const card = angolaBox.cloneNode(true);
	card.querySelector(".angola_txt").innerHTML = ` ${title} ${emoji} `;
	card.querySelector("img").src = img;
	document.querySelector(".container").appendChild(card);
}
function searchInComments() {
	document
		.querySelector("#gitalk-container > div > div.gt-comments")
		.classList.add("hidden");
	document.querySelectorAll(".gt-comment").forEach((comment) => {
		const pName = comment.innerText.search("-nome:");
		const pEmoji = comment.innerText.search("-emoji:");
		const pUrl = comment.innerText.search("-url:");
		if (pName != -1 || pEmoji != -1 || pUrl != -1) {
			const textName = comment.innerText.slice(pName + 6, pEmoji).trim();
			const textEmoji = comment.innerText.slice(pEmoji + 7, pUrl).trim();
			const textImg = comment.innerText.slice(pUrl + 5).trim();
			if (
				textName.lenght > 1 &&
				textEmoji.lenght > 0 &&
				textImg.lenght > 5
			) {
				addCard(textName, textEmoji, textImg);
			}
		}
	});
}
setTimeout(function () {
	searchInComments();
}, 1000);
function comment_gen() {
	const nome = document.getElementById("input_nome").value;
	const emoji = document.getElementById("input_emoji").value;
	const url = document.getElementById("input_url").value;
	const comment = ` -nome:${nome}\n -emoji:${emoji}\n -url:${url}`;

	const comment_gitalk = document.querySelector(
		"#gitalk-container > div > div.gt-header > div.gt-header-comment > textarea"
	);
	comment_gitalk.value = comment;
	comment_gitalk.dispatchEvent(new KeyboardEvent("keydown", { key: "a" }));
	setTimeout(function () {
		document
			.querySelector(
				"#gitalk-container > div > div.gt-header > div.gt-header-comment > div.gt-header-controls > button.gt-btn.gt-btn-public > span"
			)
			.click();
	}, 500);
}
