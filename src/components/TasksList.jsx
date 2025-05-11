import {
	EditOutlined,
	DeleteOutlined,
	CalendarOutlined,
	ExclamationCircleFilled,
} from "@ant-design/icons";
import dayjs from "dayjs";
import styled from "styled-components";
import { List, Checkbox, Tag, Space, Modal } from "antd";

import { priorityColors } from "../constants";
import DefaultButton from "./buttons/DefaultButton";
import { useTaskContext } from "../context/TaskContext";

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
										<span>Created: {task.date}</span>
										<span>Due: {dayjs(task.dueDate).format("YYYY-MM-DD")}</span>
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
