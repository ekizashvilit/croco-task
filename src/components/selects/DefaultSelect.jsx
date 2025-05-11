import { Select } from "antd";

const { Option } = Select;

const DefaultSelect = ({
	options,
	defaultValue,
	value,
	onChange,
	placeholder,
	allowClear,
	...rest
}) => {
	return (
		<Select
			defaultValue={defaultValue}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			allowClear={allowClear}
			{...rest}
		>
			{options.map((option) => (
				<Option key={option.value} value={option.value}>
					{option.label}
				</Option>
			))}
		</Select>
	);
};

export default DefaultSelect;
