import {
	SortableContext,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { List, Modal } from "antd";
import styled from "styled-components";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { restrictToParentElement } from "@dnd-kit/modifiers";

import TaskItem from "./TaskItem";
import { useTaskContext } from "../context/TaskContext";
import { useTaskDragAndDrop } from "../hooks/useTaskDragAndDrop";

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
				items={taskItems.map((t) => t.id)}
				strategy={verticalListSortingStrategy}
			>
				<StyledList
					header={<h2>Tasks List</h2>}
					itemLayout="horizontal"
					dataSource={taskItems}
					renderItem={(task) => (
						<TaskItem
							key={task.id}
							task={task}
							onEditTask={onEditTask}
							onDeleteTask={showDeleteConfirm}
							onToggleComplete={handleToggleComplete}
						/>
					)}
				/>
			</SortableContext>
		</DndContext>
	);
};

const StyledList = styled(List)`
	padding: 0 1rem;

	.ant-list-header {
		padding-top: 0;
	}

	.task-completed {
		text-decoration: line-through;
		color: #ccc;
	}

	.ant-list-item {
		background-color: white;
	}
`;

export default TasksList;
