let Elsec = document.querySelector(".section__content");
let searchInput = document.querySelector(".search");
let Elsvg = document.querySelector("svg");
Elsvg.addEventListener("click", function () {
  document.body.classList.toggle("light");
  Elsvg.style.fill = "#ffffff";
});

fetch("https://jsonplaceholder.typicode.com/photos")
  .then((response) => response.json())
  .then((data) => {
    let ElwrapperDiv = document.createElement("div");
    ElwrapperDiv.className = "wrapper";

    function filterPhotos() {
      let searchTerm = searchInput.value.toLowerCase();
      ElwrapperDiv.innerHTML = "";

      data.forEach((photo) => {
        if (photo.title.toLowerCase().includes(searchTerm)) {
          let ElphotoDiv = document.createElement("div");
          ElphotoDiv.classList.add("photo-wrapper");

          let Elh1 = document.createElement("h1");
          Elh1.textContent = photo.id;
          ElphotoDiv.appendChild(Elh1);

          let Elimg = document.createElement("img");
          Elimg.src = photo.url;
          Elimg.alt = photo.title;
          Elimg.style.width = "100px";
          Elimg.style.margin = "5px";
          ElphotoDiv.appendChild(Elimg);

          let Eltitle = document.createElement("p");
          Eltitle.textContent = photo.title;
          Eltitle.style.maxWidth = "200px";
          Eltitle.style.height = "100px";
          ElphotoDiv.appendChild(Eltitle);

          let Eledit = document.createElement("button");
          Eledit.classList.add("edit");
          Eledit.textContent = "Edit";
          Eledit.addEventListener("click", () => {
            let newTitle = prompt("Enter new title:");
            if (newTitle) {
              Eltitle.textContent = newTitle;
            }
          });
          ElphotoDiv.appendChild(Eledit);

          let Eldel = document.createElement("button");
          Eldel.classList.add("del");
          Eldel.textContent = "Delete";
          Eldel.addEventListener("click", () => {
            ElphotoDiv.remove();
          });
          ElphotoDiv.appendChild(Eldel);

          ElwrapperDiv.appendChild(ElphotoDiv);
        }
      });
    }
    filterPhotos();
    searchInput.addEventListener("input", filterPhotos);
    Elsec.appendChild(ElwrapperDiv);
  })
  .catch((error) => console.error("Xato:", error));
