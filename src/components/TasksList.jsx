import {
	EditOutlined,
	DeleteOutlined,
	CalendarOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import styled from "styled-components";
import { List, Checkbox, Tag, Button, Space } from "antd";

const initialTasks = [
	{
		id: 1,
		title: "Complete React Assignment",
		description: "Finish the task manager application with all requirements",
		priority: "high",
		completed: false,
		date: "2025-05-06",
	},
	{
		id: 2,
		title: "Prepare for Interview",
		description: "Review common React interview questions",
		priority: "high",
		completed: false,
		date: "2025-05-07",
	},
	{
		id: 3,
		title: "Read React Documentation",
		description: "Go through the hooks section in detail",
		priority: "medium",
		completed: true,
		date: "2025-05-05",
	},
	{
		id: 4,
		title: "Buy groceries",
		description: "Milk, eggs, bread, and vegetables",
		priority: "low",
		completed: false,
		date: "2025-05-04",
	},
];

const priorityColors = {
	high: "red",
	medium: "orange",
	low: "green",
};

const TasksList = () => {
	const [tasks, setTasks] = useState(initialTasks);

	const handleToggleComplete = (taskId) => {
		setTasks(
			tasks.map((task) =>
				task.id === taskId ? { ...task, completed: !task.completed } : task
			)
		);
	};

	return (
		<StyledList
			itemLayout="horizontal"
			dataSource={tasks}
			renderItem={(task) => (
				<List.Item
					actions={[
						<Button type="default" icon={<EditOutlined />} key="list-edit" />,
						<Button
							type="primary"
							danger
							icon={<DeleteOutlined />}
							key="list-delete"
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
								<Tag color={priorityColors[task.priority]}>{task.priority}</Tag>
							</Space>
						}
						description={
							<>
								<p className={`${task.completed ? "task-completed" : ""}`}>
									{task.description}
								</p>
								<Space className={`${task.completed ? "task-completed" : ""}`}>
									<CalendarOutlined />
									<span>{task.date}</span>
								</Space>
							</>
						}
					/>
				</List.Item>
			)}
		/>
	);
};

const StyledList = styled(List)`
	padding: 1rem;

	.task-completed {
		text-decoration: line-through;
		color: #ccc;
	}
`;

export default TasksList;
