import {
	MenuOutlined,
	EditOutlined,
	DeleteOutlined,
	CalendarOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import styled from "styled-components";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { List, Checkbox, Tag, Space } from "antd";

import { priorityColors } from "../constants";
import DefaultButton from "./buttons/DefaultButton";

const TaskItem = ({ task, onEditTask, onDeleteTask, onToggleComplete }) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
	} = useSortable({ id: task.id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<List.Item
			ref={setNodeRef}
			style={style}
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
					onClick={() => onDeleteTask(task.id)}
				/>,
				<DragHandle {...attributes} {...listeners} />,
			]}
		>
			<List.Item.Meta
				avatar={
					<Checkbox
						checked={task.completed}
						onChange={() => onToggleComplete(task.id)}
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
							<span>Created: {task.date}</span>
							<span>Due: {dayjs(task.dueDate).format("YYYY-MM-DD")}</span>
						</Space>
					</>
				}
			/>
		</List.Item>
	);
};

const DragHandle = styled(MenuOutlined)`
	&:active {
		cursor: grabbing;
	}
`;

export default TaskItem;
