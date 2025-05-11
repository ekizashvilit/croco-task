import {
	EditOutlined,
	DeleteOutlined,
	CalendarOutlined,
	ExclamationCircleFilled,
} from "@ant-design/icons";
import styled from "styled-components";
import { List, Checkbox, Tag, Button, Space, Modal } from "antd";

import DefaultButton from "./buttons/DefaultButton";
import { useTaskContext } from "../context/TaskContext";

const priorityColors = {
	high: "red",
	medium: "orange",
	low: "green",
};

const TasksList = ({ onEditTask }) => {
	const { tasks, toggleTaskCompletion, deleteTask } = useTaskContext();

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

	return (
		<>
			<StyledList
				header={<h2>Tasks List</h2>}
				itemLayout="horizontal"
				dataSource={tasks}
				renderItem={(task) => (
					<List.Item
						actions={[
							<DefaultButton
								type="default"
								icon={<EditOutlined />}
								key="list-edit"
								onClick={() => onEditTask(task)}
							/>,
							<DefaultButton
								type="primary"
								danger
								icon={<DeleteOutlined />}
								key="list-delete"
								onClick={() => showDeleteConfirm(task.id)}
							/>,
						]}
					>
						<List.Item.Meta
							avatar={
								<Checkbox
									checked={task.completed}
									onChange={() => handleToggleComplete(task.id)}
								/>
							}
							title={
								<Space>
									<h3 className={`${task.completed ? "task-completed" : ""}`}>
										{task.title}
									</h3>
									<Tag color={priorityColors[task.priority]}>
										{task.priority}
									</Tag>
								</Space>
							}
							description={
								<>
									<p className={`${task.completed ? "task-completed" : ""}`}>
										{task.description}
									</p>
									<Space
										className={`${task.completed ? "task-completed" : ""}`}
									>
										<CalendarOutlined />
										<span>{task.date}</span>
									</Space>
								</>
							}
						/>
					</List.Item>
				)}
			/>
		</>
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
`;

export default TasksList;
