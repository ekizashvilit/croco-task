import { Form, Input } from "antd";

const DefaultFormInput = ({
	name,
	label,
	placeholder,
	rules = [],
	...rest
}) => {
	return (
		<Form.Item name={name} label={label} rules={rules}>
			<Input placeholder={placeholder} {...rest} />
		</Form.Item>
	);
};

export default DefaultFormInput;
