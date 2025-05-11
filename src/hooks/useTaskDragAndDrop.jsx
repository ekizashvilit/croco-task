import {
	useSensors,
	useSensor,
	PointerSensor,
	KeyboardSensor,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

export const useTaskDragAndDrop = (reorderTasksCallback, setSortCriteria) => {
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	const handleDragEnd = (event) => {
		const { active, over } = event;

		if (over && active.id !== over.id) {
			const activeIdStr = active.id;
			const overIdStr = over.id;

			const activeIdNum = Number(activeIdStr);
			const overIdNum = Number(overIdStr);

			reorderTasksCallback(activeIdNum, overIdNum);
			setSortCriteria(null);
		}
	};

	return {
		sensors,
		handleDragEnd,
	};
};
