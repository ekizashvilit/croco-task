import { Button } from "antd";

const DefaultButton = ({ type, danger, onClick, icon, children, ...rest }) => {
	return (
		<Button type={type} danger={danger} icon={icon} onClick={onClick} {...rest}>
			{children}
		</Button>
	);
};

export default DefaultButton;
