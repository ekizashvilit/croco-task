import styled from "styled-components";
import { Input, Select, Button } from "antd";
import { useTaskContext } from "../context/TaskContext";
import { useState } from "react";

const { Search } = Input;
const { Option } = Select;

const TasksControls = ({ onAddTaskClick }) => {
	const {
		filterStatus,
		setFilterStatus,
		sortCriteria,
		setSortCriteria,
		setSearchTerm,
		searchTerm,
	} = useTaskContext();
	const [inputValue, setInputValue] = useState(searchTerm);

	const handleFilterChange = (value) => {
		setFilterStatus(value);
	};

	const handleSortChange = (value) => {
		setSortCriteria(value === undefined ? null : value);
	};

	const handleSearch = (value) => {
		setSearchTerm(value);
	};

	return (
		<TasksControlsWrapper>
			<Search
				placeholder="Search Tasks"
				allowClear
				onSearch={handleSearch}
				onChange={(e) => setInputValue(e.target.value)}
				value={inputValue}
				onClear={() => setInputValue("")}
			/>
			<div>
				<Select
					defaultValue="all"
					value={filterStatus}
					onChange={handleFilterChange}
				>
					<Option value="all">All Tasks</Option>
					<Option value="completed">Completed</Option>
					<Option value="active">Active</Option>
				</Select>

				<Select
					placeholder="Sort by"
					allowClear
					value={sortCriteria}
					onChange={handleSortChange}
				>
					<Option value="priority">Priority</Option>
					<Option value="date">Creation Date</Option>
				</Select>

				<Button type="primary" onClick={onAddTaskClick}>
					Add Task
				</Button>
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
