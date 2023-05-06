import { useState } from "react";
import { IStory } from "../../models"
import { Button, TextField } from "../ui/inputs";

type StoryAddInputProps = {
    prevOrder: number,
    handleAddStory: (newStory: IStory) => void
}

export const StoryAddInput = ({ prevOrder, handleAddStory }: StoryAddInputProps) => {

    const [newStory, setNewStory] = useState<IStory>({
        id: '',
        orderId: prevOrder + 1,
        title: '',
        subStories: []
    });

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
            // TODO Snackbar
            return;
        }

        handleAddStory({ ...newStory, id: crypto.randomUUID() });
            // TODO save to db
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
        </div>
    )
}
