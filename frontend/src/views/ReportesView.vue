<script setup>
import jsPDF from 'jspdf'
import { onMounted } from 'vue'

let formCharacterProfile;
let previewBtn;
let errorMessageContainer;
let frame;

const handleOnSubmitForm = (e) => {
  e.preventDefault();
  try {
    const characterProperties = Array.from(e.target.querySelectorAll("[name]"));
    const characterData = {};
    errorMessageContainer.classList.add("hidden");
    for (let i = 0, j = characterProperties.length; i < j; i++) {
      const field = characterProperties[i];
      const attribute = field.getAttribute("name");
      const value = field.value;
      if (!field.value) {
        throw new Error(`El campo ${attribute} está vacio!`);
      }
      characterData[attribute] = value;
      if (attribute === "type") {
        const option = field.querySelector(`[value=${value}]`);
        characterData[attribute] = {
          name: option.innerHTML,
          //image: option.dataset.imageUrl,
        };
      }
    }
    generatePDF(characterData, e.isPreview);
  } catch (err) {
    errorMessageContainer.innerHTML = err.message;
    errorMessageContainer.classList.remove("hidden");
  }
};

const generatePDF = (characterData, preview) => {
  const doc = new jsPDF();
  doc.setFontSize(40);
  doc.setFont("helvetica", "bold");
  doc.text(characterData.name, 60, 30);
  doc.setFont("helvetica", "normal");
  doc.text(characterData.surname, 60, 42);
  //doc.addImage(characterData.type.image, "PNG", 5, 0, 50, 50);
  doc.setFontSize(20);
  const docWidth = doc.internal.pageSize.getWidth();
  const docHeight = doc.internal.pageSize.getHeight();
  doc.line(0, 60, docWidth, 60);
  doc.setFont("helvetica", "italic");
  const splitDescription = doc.splitTextToSize(
    characterData.description,
    docWidth - 20
  );
  doc.text(splitDescription, 10, 80);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text(characterData.type.name, docWidth - 20, 45, { align: "right" });
  doc.line(0, docHeight - 60, docWidth, docHeight - 60);
  doc.text(`Fuerza: `, 10, docHeight - 40);
  doc.text(`Magia: `, 10, docHeight - 30);
  doc.text(`Velocidad: `, 10, docHeight - 20);
  doc.setFont("helvetica", "normal");
  doc.text(`${characterData.strength}`, 50, docHeight - 40);
  doc.text(`${characterData.magic}`, 50, docHeight - 30);
  doc.text(`${characterData.velocity}`, 50, docHeight - 20);
  if (preview) {
    frame.src = doc.output("bloburl");
    return;
  }
  doc.save(`${characterData.name}-${characterData.surname}`);
};

const handlePreviewClick = () => {
  const event = new Event("submit");
  event.isPreview = true;
  formCharacterProfile.dispatchEvent(event);
};

onMounted(() => {
  formCharacterProfile = document.querySelector("#form-character-profile");
  previewBtn = formCharacterProfile.querySelector(".preview-pdf-btn");
  errorMessageContainer = document.querySelector("#error-message-container");
  frame = document.querySelector("#frame");

  previewBtn.addEventListener("click", handlePreviewClick);
  formCharacterProfile.addEventListener("submit", handleOnSubmitForm);
});
</script>

<template>
    <div class="block md:flex main-layout w-screen">
      <div class="flex justify-center items-center p-5">
        <form id="form-character-profile" class="w-full">
          <div class="mb-5">
            <label for="" class="block text-sky-900 font-bold">
              Nombre: 
            </label>
            <input type="text" name="name" placeholder="Nombre" value="Gandalf" class="block w-full p-3 border-2 border-sky-700 bg-sky-50 rounded" />
          </div>
          <div class="mb-5">
            <label for="" class="block text-sky-900 font-bold">
              Sobrenombre: 
            </label>
            <input type="text" name="surname" placeholder="Apellidos" value="El gris" class="block w-full p-3 border-2 border-sky-700 bg-sky-50 rounded" />
          </div>
          <div class="mb-5">
            <label for="" class="block text-sky-900 font-bold">Descripción: </label>
            <textarea
              name="description"
              cols="30"
              rows="5"
              class="block w-full p-3 border-2 border-sky-700 bg-sky-50 rounded"
              placeholder="Descripción"
            >Llevaba un sombrero azul alto y puntiagudo, una capa larga gris y una bufanda plateada. Tenía una larga barba blanca y cejas pobladas que sobresalían más allá del ala de su sombrero.</textarea>
          </div>
          <div class="mb-5">
            <label for="" class="block text-sky-900 font-bold">
              Tipo:
            </label>
            <select name="type" class="block w-full p-3 border-2 border-sky-700 bg-sky-50 rounded">
              <option
                value="wizard"
                data-image-url="imgs/Wizard_Idle.png"
              >Mago</option>
              <option
                value="bandit"
                data-image-url="imgs/Bandit_Idle_1.png"
              >Bandido</option>
              <option
                value="bear"
                data-image-url="imgs/Bear_Idle_1.png"
              >Oso</option>
              <option
                value="elf"
                data-image-url="imgs/HighElf_F_Idle_1.png"
              >Elfa</option>
              <option
                value="ent"
                data-image-url="imgs/Ent_Idle_1.png"
              >Ent</option>
              <option
                value="golem"
                data-image-url="imgs/Golem_Idle_1.png"
              >Golem</option>
            </select>
          </div>
          <div>
            <div>
              <label class="block text-sky-900 font-bold">Fuerza:</label>
              <input
                type="range"
                name="strength"
                value="40"
                class="w-full"
              
              /></div>
            <div>
              <label class="block text-sky-900 font-bold">Magia:</label>
              <input type="range" name="magic" class="w-full" value="90" />
            </div>
            <div>
              <label class="block text-sky-900 font-bold">Velocidad:</label>
              <input
                type="range"
                value="60"
                name="velocity"
                class="w-full"
              
              /></div>
          </div>
          <div id="error-message-container" class="hidden text-red-500 bg-red-100 p-4 rounded mt-3">
            *Error messages
          </div>
          <hr class="my-5">
          <div class="mt-3">
            <button type="button" class="bg-sky-500 text-white px-3 py-2 rounded preview-pdf-btn">Previsualizar PDF</button>
            <button type="submit" class="bg-sky-500 text-white px-3 py-2 rounded">Descargar PDF</button>
          </div>
        </form>
      </div>
      <div>
        <iframe
          id="frame"
          src=""
          frameborder="0"
        ></iframe>
      </div>
    </div>
</template>