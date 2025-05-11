import { createContext, useContext, useEffect, useReducer } from "react";

import initialMockTasks from "../../mockData.json";

export const LOAD_TASKS = "LOAD_TASKS";
export const ADD_TASK = "ADD_TASK";
export const EDIT_TASK = "EDIT_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const TOGGLE_TASK_COMPLETION = "TOGGLE_TASK_COMPLETION";
export const SET_FILTER_STATUS = "SET_FILTER_STATUS";
export const SET_SORT_CRITERIA = "SET_SORT_CRITERIA";
export const SET_SEARCH_TERM = "SET_SEARCH_TERM";

const initialState = {
	tasks: [],
	error: null,
	filterStatus: "all",
	sortCriteria: null,
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
			const updatedTasks = state.tasks.map((task) =>
				task.id === action.payload.id
					? { ...task, ...action.payload.data }
					: task
			);
			localStorage.setItem("tasks", JSON.stringify(updatedTasks));
			return { ...state, tasks: updatedTasks };
		}

		case DELETE_TASK: {
			const filteredTasks = state.tasks.filter(
				(task) => task.id !== action.payload
			);
			localStorage.setItem("tasks", JSON.stringify(filteredTasks));
			return { ...state, tasks: filteredTasks };
		}

		case TOGGLE_TASK_COMPLETION: {
			const toggledTasks = state.tasks.map((task) =>
				task.id === action.payload
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

	const filteredTasks = state.tasks.filter((task) => {
		if (state.filterStatus === "all") {
			return true;
		}
		if (state.filterStatus === "completed") {
			return task.completed;
		}
		if (state.filterStatus === "active") {
			return !task.completed;
		}
		return true;
	});

	let sortedAndFilteredTasks = [...filteredTasks];
	if (state.sortCriteria === "priority") {
		const priorityOrder = { high: 3, medium: 2, low: 1 };
		sortedAndFilteredTasks.sort(
			(a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
		);
	} else if (state.sortCriteria === "date") {
		sortedAndFilteredTasks.sort((a, b) => new Date(b.date) - new Date(a.date));
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
				tasks: sortedAndFilteredTasks,
				filterStatus: state.filterStatus,
				sortCriteria: state.sortCriteria,
				error: state.error,
			}}
		>
			{children}
		</TaskContext.Provider>
	);
};

export const useTaskContext = () => useContext(TaskContext);
