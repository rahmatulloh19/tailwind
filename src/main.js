if (!localStorage.getItem("token")) {
	localStorage.setItem("token", JSON.stringify([]));
}

const elForm = document.querySelector(".js-form");
const elList = document.querySelector(".mt-10");
const elTemplate = document.querySelector("template").content;
const elWrapper = document.querySelector(".wrapper");
const fragment = document.createDocumentFragment();

const todos = JSON.parse(localStorage.getItem("token"));

renderTodo(todos);

elForm.addEventListener("submit", (evt) => {
	evt.preventDefault();

	const elInput = evt.target[0];

	if (elInput.value) {
		todos.push({
			id: todos.length ? todos.at(-1).id + 1 : 1,
			todo_value: elInput.value.trim(),
			isCompleted: false,
		});
	}

	localStorage.setItem("token", JSON.stringify(todos));

	renderTodo(todos);

	elInput.value = "";
});

elWrapper.addEventListener("click", (evt) => {
	if (evt.target.matches(".bg-lime-500")) {
		renderTodo(todos);
	}
	if (evt.target.matches(".bg-cyan-600")) {
		const completedTodos = todos.filter((item) => item.isCompleted == true);

		renderTodo(completedTodos);
	}
	if (evt.target.matches(".bg-yellow-400")) {
		const completedTodos = todos.filter((item) => item.isCompleted != true);

		renderTodo(completedTodos);
	}
});

elList.addEventListener("click", function (evt) {
	if (evt.target.matches("input")) {
		const targetId = evt.target.dataset.id;
		const editingElementsObject = todos.find((item) => item.id == targetId);

		editingElementsObject.isCompleted = !editingElementsObject.isCompleted;
		renderTodo(todos);

		localStorage.setItem("token", JSON.stringify(todos));
	}
	if (evt.target.matches(".bg-red-400")) {
		const targetId = evt.target.dataset.id;
		const deletingElementsIndex = todos.findIndex((item) => item.id == targetId);

		if (confirm(`Do you want to delete '${todos[deletingElementsIndex].todo_value}' ?`)) {
			todos.splice(deletingElementsIndex, 1);
		}

		renderTodo(todos);

		localStorage.setItem("token", JSON.stringify(todos));
	}

	if (evt.target.matches(".bg-green-600")) {
		const targetId = evt.target.dataset.id;
		const editingElementsObject = todos.find((item) => item.id == targetId);

		const newValue = prompt("Do you want to change value", editingElementsObject.todo_value);

		if (newValue) {
			editingElementsObject.todo_value = newValue;
		}

		renderTodo(todos);

		localStorage.setItem("token", JSON.stringify(todos));
	}
});

function changerCount() {
	elWrapper.children[0].querySelector("span").textContent = todos.length;
	const completedTodos = todos.filter((item) => item.isCompleted == true);
	elWrapper.children[1].querySelector("span").textContent = completedTodos.length;
	const unCompletedTodos = todos.filter((item) => item.isCompleted != true);
	elWrapper.children[2].querySelector("span").textContent = unCompletedTodos.length;
}

function renderTodo(array) {
	elList.innerHTML = "";
	if (array.length) {
		array.forEach((item) => {
			const cloneTemplate = elTemplate.cloneNode(true);

			cloneTemplate.querySelector(".text-xl").textContent = item.todo_value;
			cloneTemplate.querySelector("input").dataset.id = item.id;
			cloneTemplate.querySelector(".bg-green-600").dataset.id = item.id;
			cloneTemplate.querySelector(".bg-red-400").dataset.id = item.id;

			changerCount();

			if (item.isCompleted) {
				cloneTemplate.querySelector(".text-xl").classList.add("line-through");
				cloneTemplate.querySelector("input").checked = true;
				changerCount();
			}

			fragment.appendChild(cloneTemplate);
		});
	} else {
		elList.innerHTML = `
		<p class="text-2xl text-white text-center mt-20">You have not any todos</p>
		`;
	}
	elList.appendChild(fragment);
}
