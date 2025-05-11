import { arrayMove } from "@dnd-kit/sortable";
import { createContext, useContext, useEffect, useReducer } from "react";

import initialMockTasks from "../../mockData.json";

const LOAD_TASKS = "LOAD_TASKS";
const ADD_TASK = "ADD_TASK";
const EDIT_TASK = "EDIT_TASK";
const DELETE_TASK = "DELETE_TASK";
const TOGGLE_TASK_COMPLETION = "TOGGLE_TASK_COMPLETION";
const SET_FILTER_STATUS = "SET_FILTER_STATUS";
const SET_SORT_CRITERIA = "SET_SORT_CRITERIA";
const SET_SEARCH_TERM = "SET_SEARCH_TERM";
const REORDER_TASKS = "REORDER_TASKS";

const initialState = {
	tasks: [],
	error: null,
	filterStatus: "all",
	sortCriteria: null,
	searchTerm: "",
};

const taskReducer = (state, action) => {
	switch (action.type) {
		case LOAD_TASKS:
			return { ...state, tasks: action.payload };

		case ADD_TASK: {
			const newTasks = [...state.tasks, action.payload];
			localStorage.setItem("tasks", JSON.stringify(newTasks));
			return { ...state, tasks: newTasks };
		}

		case EDIT_TASK: {
			const taskIdToEdit = Number(action.payload.id);
			const updatedTasks = state.tasks.map((task) =>
				task.id === taskIdToEdit ? { ...task, ...action.payload.data } : task
			);
			localStorage.setItem("tasks", JSON.stringify(updatedTasks));
			return { ...state, tasks: updatedTasks };
		}

		case DELETE_TASK: {
			const taskIdToDelete = Number(action.payload);
			const filteredTasks = state.tasks.filter(
				(task) => task.id !== taskIdToDelete
			);
			localStorage.setItem("tasks", JSON.stringify(filteredTasks));
			return { ...state, tasks: filteredTasks };
		}

		case TOGGLE_TASK_COMPLETION: {
			const taskIdToToggle = Number(action.payload);
			const toggledTasks = state.tasks.map((task) =>
				task.id === taskIdToToggle
					? { ...task, completed: !task.completed }
					: task
			);
			localStorage.setItem("tasks", JSON.stringify(toggledTasks));
			return { ...state, tasks: toggledTasks };
		}

		case SET_FILTER_STATUS:
			return { ...state, filterStatus: action.payload };

		case SET_SORT_CRITERIA:
			return { ...state, sortCriteria: action.payload };

		case SET_SEARCH_TERM:
			return { ...state, searchTerm: action.payload };

		case REORDER_TASKS: {
			localStorage.setItem("tasks", JSON.stringify(action.payload));
			return { ...state, tasks: action.payload };
		}

		default:
			return state;
	}
};

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
	const [state, dispatch] = useReducer(taskReducer, initialState);

	useEffect(() => {
		try {
			const localTasks = localStorage.getItem("tasks");
			if (localTasks) {
				dispatch({ type: LOAD_TASKS, payload: JSON.parse(localTasks) });
			} else {
				dispatch({ type: LOAD_TASKS, payload: initialMockTasks });
				localStorage.setItem("tasks", JSON.stringify(initialMockTasks));
			}
		} catch (error) {
			console.log(error);
		}
	}, []);

	const addTask = (taskData) => {
		const newTask = {
			id: Date.now(),
			...taskData,
			completed: false,
			date: new Date().toISOString().split("T")[0],
		};
		dispatch({ type: ADD_TASK, payload: newTask });
	};

	const editTask = (taskID, updatedData) => {
		dispatch({ type: EDIT_TASK, payload: { id: taskID, data: updatedData } });
	};

	const deleteTask = (taskID) => {
		dispatch({ type: DELETE_TASK, payload: taskID });
	};

	const toggleTaskCompletion = (taskID) => {
		dispatch({ type: TOGGLE_TASK_COMPLETION, payload: taskID });
	};

	const setFilterStatus = (status) => {
		dispatch({ type: SET_FILTER_STATUS, payload: status });
	};

	const setSortCriteria = (criteria) => {
		dispatch({ type: SET_SORT_CRITERIA, payload: criteria });
	};

	const setSearchTerm = (term) => {
		dispatch({ type: SET_SEARCH_TERM, payload: term });
	};

	const reorderTasks = (activeId, overId) => {
		const currentTasks = state.tasks;
		const oldIndex = currentTasks.findIndex((task) => task.id === activeId);
		const newIndex = currentTasks.findIndex((task) => task.id === overId);

		if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
			const reorderedFullTasks = arrayMove(currentTasks, oldIndex, newIndex);
			dispatch({ type: REORDER_TASKS, payload: reorderedFullTasks });
		}
	};

	const processedTasks = state.tasks
		.filter((task) => {
			if (state.filterStatus === "completed") {
				return task.completed;
			}
			if (state.filterStatus === "active") {
				return !task.completed;
			}
			return true;
		})
		.filter((task) => {
			if (!state.searchTerm) {
				return true;
			}
			const searchTermLowered = state.searchTerm.toLowerCase();
			return (
				task.title.toLowerCase().includes(searchTermLowered) ||
				task.description.toLowerCase().includes(searchTermLowered)
			);
		});

	let sortedAndProcessedTasks = [...processedTasks];
	if (state.sortCriteria === "priority") {
		const priorityOrder = { high: 3, medium: 2, low: 1 };
		sortedAndProcessedTasks.sort(
			(a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
		);
	} else if (state.sortCriteria === "date") {
		sortedAndProcessedTasks.sort((a, b) => new Date(b.date) - new Date(a.date));
	}

	return (
		<TaskContext.Provider
			value={{
				dispatch,
				addTask,
				editTask,
				deleteTask,
				toggleTaskCompletion,
				setFilterStatus,
				setSortCriteria,
				setSearchTerm,
				reorderTasks,
				tasks: sortedAndProcessedTasks,
				filterStatus: state.filterStatus,
				sortCriteria: state.sortCriteria,
				searchTerm: state.searchTerm,
				error: state.error,
			}}
		>
			{children}
		</TaskContext.Provider>
	);
};

export const useTaskContext = () => useContext(TaskContext);
