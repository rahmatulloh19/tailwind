const elForm = document.querySelector(".js-form");
const elList = document.querySelector(".mt-10");
const elTemplate = document.querySelector("template").content;
const elWrapper = document.querySelector(".wrapper");
const fragment = document.createDocumentFragment();

const todos = [
	{
		id: 1,
		todo_value: "da",
		isCompleted: false,
	},
	{
		id: 2,
		todo_value: "d",
		isCompleted: false,
	},
	{
		id: 3,
		todo_value: "ad",
		isCompleted: false,
	},
	{
		id: 4,
		todo_value: "a",
		isCompleted: true,
	},
	{
		id: 5,
		todo_value: "da",
		isCompleted: false,
	},
	{
		id: 6,
		todo_value: "d",
		isCompleted: true,
	},
	{
		id: 7,
		todo_value: "ad",
		isCompleted: false,
	},
];

renderTodo(todos);

elForm.addEventListener("submit", (evt) => {
	evt.preventDefault();

	const elInput = evt.target[0];

	todos.push({
		id: todos.length ? todos.at(-1).id + 1 : 1,
		todo_value: elInput.value.trim(),
		isCompleted: false,
	});

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
	}
	if (evt.target.matches(".bg-red-400")) {
		const targetId = evt.target.dataset.id;
		const deletingElementsIndex = todos.findIndex((item) => item.id == targetId);

		todos.splice(deletingElementsIndex, 1);

		renderTodo(todos);
	}

	if (evt.target.matches(".bg-green-600")) {
		const targetId = evt.target.dataset.id;
		const editingElementsObject = todos.find((item) => item.id == targetId);

		editingElementsObject.todo_value = prompt(
			"Do you want to change value",
			editingElementsObject.todo_value
		);

		renderTodo(todos);
	}
});

function renderTodo(array) {
	elList.innerHTML = "";
	array.forEach((item) => {
		const cloneTemplate = elTemplate.cloneNode(true);

		cloneTemplate.querySelector(".text-xl").textContent = item.todo_value;
		cloneTemplate.querySelector("input").dataset.id = item.id;
		cloneTemplate.querySelector(".bg-green-600").dataset.id = item.id;
		cloneTemplate.querySelector(".bg-red-400").dataset.id = item.id;

		if (item.isCompleted) {
			cloneTemplate.querySelector(".text-xl").classList.add("line-through");
			cloneTemplate.querySelector("input").checked = true;
			elWrapper.children[0].querySelector("span").textContent = array.length;
			const completedTodos = array.filter((item) => item.isCompleted == true);
			elWrapper.children[1].querySelector("span").textContent = completedTodos.length;
			const unCompletedTodos = array.filter((item) => item.isCompleted != true);
			elWrapper.children[2].querySelector("span").textContent = unCompletedTodos.length;
		}

		fragment.appendChild(cloneTemplate);
	});
	elList.appendChild(fragment);
}
