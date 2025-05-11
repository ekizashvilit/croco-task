import { Input } from "antd";
import { useState } from "react";
import styled from "styled-components";

import DefaultButton from "./buttons/DefaultButton";
import DefaultSelect from "./selects/DefaultSelect";
import { useTaskContext } from "../context/TaskContext";
import { filterOptions, sortOptions } from "../constants";

const { Search } = Input;

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
				<DefaultSelect
					defaultValue="all"
					value={filterStatus}
					onChange={handleFilterChange}
					options={filterOptions}
				/>

				<DefaultSelect
					placeholder="Sort by"
					allowClear
					value={sortCriteria}
					onChange={handleSortChange}
					options={sortOptions}
				/>

				<DefaultButton type="primary" onClick={onAddTaskClick}>
					Add Task
				</DefaultButton>
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
