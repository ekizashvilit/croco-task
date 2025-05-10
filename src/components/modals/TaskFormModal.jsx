import { Form, Input, Modal, Select } from "antd";
import { useEffect } from "react";

const { Option } = Select;

const TaskFormModal = ({
	isOpen,
	onCancel,
	onFormSubmit,
	mode = "add",
	initialValues = null,
}) => {
	const [form] = Form.useForm();

	const modalTitle = mode === "add" ? "Add New Task" : "Edit Task";
	const okButtonText = mode === "add" ? "Add Task" : "Save Changes";

	useEffect(() => {
		if (isOpen) {
			if (mode === "edit" && initialValues) {
				form.setFieldsValue(initialValues);
			} else {
				form.resetFields();
			}
		}
	}, [isOpen, mode, initialValues, form]);

	const handleOk = () => {
		form
			.validateFields()
			.then((values) => {
				onFormSubmit(values);
				form.resetFields();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleCancel = () => {
		onCancel();
	};

	return (
		<Modal
			title={modalTitle}
			open={isOpen}
			okText={okButtonText}
			onOk={handleOk}
			onCancel={handleCancel}
			destroyOnHidden
		>
			<Form form={form} layout="vertical">
				<Form.Item
					name="title"
					label="Task Title"
					rules={[{ required: true, message: "Please enter the task title" }]}
				>
					<Input placeholder="Enter task title" />
				</Form.Item>

				<Form.Item
					name="description"
					label="Task Description"
					rules={[
						{ required: true, message: "Please enter the task description" },
					]}
				>
					<Input placeholder="Enter task description" />
				</Form.Item>

				<Form.Item
					name="priority"
					label="Priority"
					rules={[{ required: true, message: "Please select a priority" }]}
				>
					<Select placeholder="Select task priority">
						<Option value="low">Low</Option>
						<Option value="medium">Medium</Option>
						<Option value="high">High</Option>
					</Select>
				</Form.Item>
			</Form>
		</Modal>
	);
};
export default TaskFormModal;
