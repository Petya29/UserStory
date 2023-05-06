import { useAutoAnimate } from "@formkit/auto-animate/react";
import { IStory } from "../../models";
import { Story } from "./Story";

type SubListProps = {
    subStories: IStory[],
    handleEditStory: (story: IStory, index: number) => void,
    handleMoveSubStory: (currIndex: number, newIndex: number) => void,
    handleRemoveSubStory: (id: string) => void,
    handleRemoveSubStories: (index: number) => void
}

export const SubList = ({
    subStories,
    handleEditStory,
    handleMoveSubStory,
    handleRemoveSubStory,
    handleRemoveSubStories
}: SubListProps) => {

    const [listRef] = useAutoAnimate<HTMLUListElement>();

    return (
        <ul ref={listRef}>
            {subStories.sort((a, b) => a.orderId - b.orderId).map((subStory, i) => (
                <Story
                    story={subStory}
                    index={i}
                    isLast={i === subStories.length - 1}
                    handleEditStory={handleEditStory}
                    handleRemoveStory={() => handleRemoveSubStory(subStory.id)}
                    handleRemoveSubStories={handleRemoveSubStories}
                    handleMoveStory={handleMoveSubStory}
                    key={subStory.id}
                />
            ))}
        </ul>
    )
}
