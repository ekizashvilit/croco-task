import dayjs from "dayjs";
import { useEffect } from "react";
import { DatePicker, Form, Modal } from "antd";

import { priorityOptions } from "../../constants";
import DefaultSelect from "../selects/DefaultSelect";
import DefaultFormInput from "../inputs/DefaultFormInput";

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
				const valuesToSet = { ...initialValues };
				if (initialValues.dueDate) {
					valuesToSet.dueDate = dayjs(initialValues.dueDate, "YYYY-MM-DD");
				}
				form.setFieldsValue(valuesToSet);
			} else {
				form.resetFields();
			}
		}
	}, [isOpen, mode, initialValues, form]);

	const handleOk = () => {
		form
			.validateFields()
			.then((values) => {
				const submissionValues = { ...values };
				if (values.dueDate) {
					submissionValues.dueDate = values.dueDate.format("YYYY-MM-DD");
				}
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
				<DefaultFormInput
					name="title"
					label="Task Title"
					placeholder="Enter task title"
					rules={[{ required: true, message: "Please enter the task title" }]}
				/>

				<DefaultFormInput
					name="description"
					label="Task Description"
					placeholder="Enter task description"
					rules={[
						{ required: true, message: "Please enter the task description" },
					]}
				/>

				<Form.Item
					name="priority"
					label="Priority"
					rules={[{ required: true, message: "Please select a priority" }]}
				>
					<DefaultSelect
						placeholder="Select task priority"
						options={priorityOptions}
					/>
				</Form.Item>

				<Form.Item
					name="dueDate"
					label="Due Date"
					rules={[{ required: true, message: "Please select a due date" }]}
				>
					<DatePicker
						format="YYYY-MM-DD"
						disabledDate={(current) => {
							return current && current < dayjs().startOf("day");
						}}
					/>
				</Form.Item>
			</Form>
		</Modal>
	);
};
export default TaskFormModal;
