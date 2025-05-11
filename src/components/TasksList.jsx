import {
	SortableContext,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Modal } from "antd";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import TaskItem from "./TaskItem";
import { useTaskContext } from "../context/TaskContext";
import { useTaskDragAndDrop } from "../hooks/useTaskDragAndDrop";
import { StyledList } from "../styles/TasksList.styles";

const TasksList = ({ onEditTask }) => {
	const {
		tasks,
		toggleTaskCompletion,
		deleteTask,
		reorderTasks,
		setSortCriteria,
	} = useTaskContext();
	const { sensors, handleDragEnd } = useTaskDragAndDrop(
		reorderTasks,
		setSortCriteria
	);

	const handleToggleComplete = (taskId) => {
		toggleTaskCompletion(taskId);
	};

	const showDeleteConfirm = (taskId) => {
		Modal.confirm({
			title: "Are you sure you want to delete this task?",
			icon: <ExclamationCircleFilled />,
			okText: "Delete",
			okType: "danger",
			cancelText: "Cancel",
			centered: true,
			onOk() {
				deleteTask(taskId);
			},
		});
	};

	const taskItems = tasks.map((task) => ({ ...task, id: String(task.id) }));

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnd}
			modifiers={[restrictToParentElement]}
		>
			<SortableContext
				items={taskItems.map((task) => task.id)}
				strategy={verticalListSortingStrategy}
			>
				<StyledList header={<h2>Tasks List</h2>} itemLayout="horizontal">
					<TransitionGroup component={null}>
						{tasks.map((task) => (
							<CSSTransition key={task.id} timeout={300} classNames="task-item">
								<TaskItem
									task={{ ...task, id: String(task.id) }}
									onEditTask={onEditTask}
									onDeleteTask={showDeleteConfirm}
									onToggleComplete={handleToggleComplete}
								/>
							</CSSTransition>
						))}
					</TransitionGroup>
				</StyledList>
			</SortableContext>
		</DndContext>
	);
};

export default TasksList;
