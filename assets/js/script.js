const commentForm = document.querySelector("#comment-form");
const nameInput = document.querySelector("#nom");
const commentInput = document.querySelector("#commentaire");
const errorContainer = document.querySelector("#form-errors");
const commentsContainer = document.querySelector("#commentaires");

//Affichage des erreurs
commentForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const errors = [];

    if (nameInput.value.trim().length < 2) {
        errors.push("Le nom doit contenir au moins 2 caractères.");
    }

    if (commentInput.value.trim().length < 10) {
        errors.push("Le commentaire doit contenir au moins 10 caractères.");
    }

    errorContainer.replaceChildren(
        ...errors.map((message) => {
            const error = document.createElement("p");
            error.textContent = message;
            return error;
        })
    );

    //Construction du commentaire si pas d'erreurs
    if (errors.length === 0) {
        const emptyMessage = commentsContainer.querySelector(".empty-comments");
        if (emptyMessage) {
            emptyMessage.remove();
        }

        const newComment = document.createElement("div");
        newComment.classList.add("comment-item");

        const commentName = document.createElement("strong");
        commentName.textContent = nameInput.value.trim();

        const commentText = document.createElement("p");
        commentText.textContent = commentInput.value.trim();

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "🗑️ Supprimer";
        deleteButton.addEventListener("click", () => {
            newComment.remove();

            if (!commentsContainer.querySelector(".comment-item")) {
                const emptyMessage = document.createElement("p");
                emptyMessage.classList.add("empty-comments");
                emptyMessage.textContent = "Aucun commentaire pour le moment.";
                commentsContainer.appendChild(emptyMessage);
            }
        });

        newComment.appendChild(commentName);
        newComment.appendChild(commentText);
        newComment.appendChild(deleteButton);
        commentsContainer.appendChild(newComment);

        commentForm.reset();
    }
});
