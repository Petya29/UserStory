import { useState } from "react";
import { IStory } from "../../models"
import { Button, TextField } from "../ui/inputs";
import { Snackbar } from "../ui/feedback";
import { XMarkIcon } from "../ui/data-display";

type StoryAddInputProps = {
    prevOrder: number,
    handleAddStory: (newStory: IStory) => void
}

export const StoryAddInput = ({ prevOrder, handleAddStory }: StoryAddInputProps) => {

    const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
    const [newStory, setNewStory] = useState<IStory>({
        id: '',
        orderId: prevOrder + 1,
        title: '',
        subStories: []
    });

    const handleCloseSnackbar = () => {
        setIsSnackbarOpen(false);
    }

    const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleClickAdd();
    }


    const handleChangeStoryTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewStory({
            ...newStory,
            title: e.target.value
        });
    }

    const handleClickAdd = () => {
        if (newStory.title.trim() === '') {
            setIsSnackbarOpen(true);
            return;
        }

        handleAddStory({ ...newStory, id: crypto.randomUUID() });
        setNewStory({
            id: '',
            orderId: prevOrder + 1,
            title: '',
            subStories: []
        });
    }

    return (
        <div className="flex justify-between gap-2 mb-2">
            <TextField
                autoFocus
                className="w-full"
                styles={{ width: "100%" }}
                label="+ Add new story"
                value={newStory.title}
                onChange={handleChangeStoryTitle}
                onKeyUp={handleEnterPress}
            />
            <Button onClick={handleClickAdd}>Add</Button>
            <Snackbar
                isOpen={isSnackbarOpen}
                title={(
                    <div className="flex justify-between items-center gap-2">
                        <p>Story title cannot be empty</p>
                        <XMarkIcon
                            disableRipple
                            strokeColor="#a92323"
                            className="cursor-pointer"
                            onClick={handleCloseSnackbar}
                        />
                    </div>
                )}
                onClose={handleCloseSnackbar}
            />
        </div>
    )
}
