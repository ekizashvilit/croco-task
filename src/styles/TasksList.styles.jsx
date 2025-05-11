import { List } from "antd";
import styled from "styled-components";

export const StyledList = styled(List)`
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

	.task-item-enter {
		opacity: 0;
		transform: translateX(-20px);
	}
	.task-item-enter-active {
		opacity: 1;
		transform: translateX(0);
		transition: opacity 300ms ease-out, transform 300ms ease-out;
	}
	.task-item-exit {
		opacity: 1;
		transform: translateX(0);
	}
	.task-item-exit-active {
		opacity: 0;
		transform: translateX(20px);
		transition: opacity 300ms ease-in, transform 300ms ease-in;
	}
`;
