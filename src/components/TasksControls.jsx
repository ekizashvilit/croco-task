import styled from "styled-components";
import { Input, Select, Button } from "antd";

const { Search } = Input;
const { Option } = Select;

const TasksControls = () => {
	return (
		<TasksControlsWrapper>
			<Search placeholder="Search Tasks" allowClear />
			<div>
				<Select defaultValue="all">
					<Option value="all">All Tasks</Option>
					<Option value="completed">Completed</Option>
					<Option value="active">Active</Option>
				</Select>

				<Select placeholder="Sort by" allowClear>
					<Option value="priority">Priority</Option>
					<Option value="date">Creation Date</Option>
				</Select>

				<Button type="primary">Add Task</Button>
			</div>
		</TasksControlsWrapper>
	);
};

const TasksControlsWrapper = styled.section`
	display: flex;
	flex-direction: column;
	padding: 0.5rem 1rem;
	gap: 0.7rem;

	@media (min-width: 768px) {
		flex-direction: row;
		justify-content: space-between;

		.ant-input-search {
			width: 20rem;
		}
	}

	div {
		display: flex;
		flex-direction: column;
		gap: 0.7rem;

		@media (min-width: 768px) {
			flex-direction: row;
		}
	}
`;

export default TasksControls;
