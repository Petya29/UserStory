import { useAutoAnimate } from "@formkit/auto-animate/react";
import { IStory } from "../../models";
import { ArrowDownIcon, ArrowUpIcon, DocumentMinusIcon, MinusIcon, PlusIcon, TrashIcon } from "../ui/data-display";
import { StoryAddInput } from "./StoryAddInput";
import { SubList } from "./SubList";
import { useState } from "react";

type StoryProps = {
  story: IStory,
  index: number,
  isLast: boolean,
  handleEditStory: (story: IStory, index: number) => void,
  handleRemoveStory: (id: string) => void,
  handleRemoveSubStories: (index: number) => void,
  handleMoveStory: (currIndex: number, newIndex: number) => void
}

export const Story = ({
  story,
  index,
  isLast,
  handleEditStory,
  handleRemoveStory,
  handleRemoveSubStories,
  handleMoveStory
}: StoryProps) => {

  const [listRef] = useAutoAnimate<HTMLDivElement>({ duration: 150 });

  const [isInputOpen, setIsInputOpen] = useState<boolean>(false);

  const toggleInputOpenState = () => {
    setIsInputOpen(prevState => !prevState);
  }

  const handleAddSubStory = (newStory: IStory) => {
    const editedStory = { ...story, subStories: [...story.subStories, newStory] };
    handleEditStory(editedStory, index);
  }

  const handleEditSubStory = (newStory: IStory, i: number) => {
    const editedStory = { ...story };
    editedStory.subStories[i] = newStory;
    handleEditStory(editedStory, index);
  }

  const removeSubStory = (id: string) => {
    const updSubStories = story.subStories.filter(subStory => subStory.id !== id);
    const editedStory = { ...story, subStories: updSubStories };
    handleEditStory(editedStory, index);
  }

  const removeSubStories = (index: number) => {
    const updSubStories = [...story.subStories];

    updSubStories[index].subStories = [];
    const editedStory = { ...story, subStories: updSubStories };
    handleEditStory(editedStory, index);
  }

  const handleMoveSubStories = (currIndex: number, newIndex: number) => {
    const updSubStories = [...story.subStories];
    const oldOrderId = updSubStories[currIndex].orderId;
    updSubStories[currIndex].orderId = updSubStories[newIndex].orderId;
    updSubStories[newIndex].orderId = oldOrderId;

    const editedStory = { ...story, subStories: updSubStories };
    handleEditStory(editedStory, index);
  }

  return (
    <li
      className={[
        "min-h-[40px]",
        "py-1",
        "flex flex-col justify-center",
        "border-b border-solid border-[#505050]",
        index === 0 ? "border-t" : ""
      ].join(" ").trim()}
    >
      <div className="flex justify-between items-center">
        <p className="overflow-hidden text-ellipsis whitespace-nowrap">{story.title}</p>
        <div className="flex gap-1">
          {!isLast &&
            <ArrowDownIcon
              className="cursor-pointer"
              onClick={() => handleMoveStory(index, index + 1)}
            />
          }
          {index !== 0 &&
            <ArrowUpIcon
              className="cursor-pointer"
              onClick={() => handleMoveStory(index, index - 1)}
            />
          }
          {isInputOpen
            ?
            <MinusIcon
              strokeColor="#90caf9"
              className="cursor-pointer"
              onClick={toggleInputOpenState}
            />
            :
            <PlusIcon
              strokeColor="#90caf9"
              className="cursor-pointer"
              onClick={toggleInputOpenState}
            />
          }
          <TrashIcon
            strokeColor="#a92323"
            className="cursor-pointer"
            onClick={() => handleRemoveStory(story.id)}
          />
          {story.subStories && story.subStories.length
            ?
            <DocumentMinusIcon
              strokeColor="#a92323"
              className="cursor-pointer"
              onClick={() => handleRemoveSubStories(index)}
            />
            :
            ""
          }
        </div>
      </div>
      <div ref={listRef} className={story.subStories.length ? ["my-2 ml-7"].join(" ").trim() : "ml-7"}>
        <SubList
          subStories={story.subStories}
          handleEditStory={handleEditSubStory}
          handleMoveSubStory={handleMoveSubStories}
          handleRemoveSubStory={removeSubStory}
          handleRemoveSubStories={removeSubStories}
        />
        {isInputOpen &&
          <div className="mt-2">
            <StoryAddInput
              prevOrder={story.subStories[story.subStories.length - 1]?.orderId || 0}
              handleAddStory={handleAddSubStory}
              key={story.subStories.sort((a, b) => a.orderId - b.orderId)[story.subStories.length - 1]?.id}
            />
          </div>
        }
      </div>
    </li>
  )
}
