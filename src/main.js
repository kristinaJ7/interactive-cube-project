document.addEventListener("DOMContentLoaded", () => {
  // 1. Находим все элементы сразу
  const cube = document.querySelector(".cube");
  const resizeBtn = document.getElementById("resizeBtn");
  const shrinkBtn = document.getElementById("shrinkBtn");

  // 2. Проверки существования
  if (!cube) {
    console.error("Элемент .cube не найден!");
    return;
  }
  if (!resizeBtn) {
    console.error('Кнопка "Увеличить" не найдена!');
  }
  if (!shrinkBtn) {
    console.error('Кнопка "Уменьшить" не найдена!');
  }

  // 3. Обработчик mousemove
  let isMoving = false;
  document.addEventListener("mousemove", (e) => {
    if (isMoving) return; // Ограничиваем частоту
    isMoving = true;

    requestAnimationFrame(() => {
      const normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
      const normalizedY = (e.clientY / window.innerHeight) * 2 - 1;

      const sensitivity = 0.8;
      const rotateY = normalizedX * 180 * sensitivity;
      const rotateX = -normalizedY * 180 * sensitivity;

      // Получаем значения CSS-переменных
      const style = getComputedStyle(cube);
      const vecX = style.getPropertyValue("--vec-x");
      const vecY = style.getPropertyValue("--vec-y");
      const vecZ = style.getPropertyValue("--vec-z");
      const angle = style.getPropertyValue("--cube-rotate-angle");

      cube.style.transform = `
        rotate3d(${vecX}, ${vecY}, ${vecZ}, ${angle})
        rotateY(${rotateY}deg)
        rotateX(${rotateX}deg)
      `;

      isMoving = false;
    });
  });

  // 4. Обработчики кнопок изменения размера
  if (resizeBtn) {
    resizeBtn.addEventListener("click", () => {
      const currentSize = parseInt(
        getComputedStyle(cube).getPropertyValue("--size")
      );
      const newSize = Math.min(currentSize + 20, 330);
      cube.style.setProperty("--size", `${newSize}px`);
    });
  }

  if (shrinkBtn) {
    shrinkBtn.addEventListener("click", () => {
      const currentSize = parseInt(
        getComputedStyle(cube).getPropertyValue("--size")
      );
      const newSize = Math.max(currentSize - 20, 100);
      cube.style.setProperty("--size", `${newSize}px`);
    });
  }

  // 5. Обработчик клика по граням
  document.querySelectorAll(".side").forEach((side) => {
    side.addEventListener("click", () => {
      side.style.backgroundColor = `#${Math.floor(
        Math.random() * 16777215
      ).toString(16)}`;
    });
  });
});
