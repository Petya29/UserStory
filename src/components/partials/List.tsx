import { useEffect, useState } from "react";
import { Story } from "./Story";
import { getStories, saveStories } from "../../db";
import { IStory } from "../../models";
import { StoryAddInput } from "./StoryAddInput";
import { useAutoAnimate } from '@formkit/auto-animate/react';

export const List = () => {

  const [listRef] = useAutoAnimate<HTMLUListElement>({ duration: 150 });

  const [stories, setStories] = useState<IStory[]>([]);

  const handleAddStory = (newStory: IStory) => {
    setStories(prevState => {
      const updState = [...prevState, newStory];
      saveStories(updState);
      return updState;
    });
  }

  const handleEditStory = (story: IStory, index: number) => {
    setStories(prevState => {
      const updState = [...prevState];
      updState[index] = story;
      saveStories(updState)
      return updState;
    });
  }

  const handleRemoveStory = (id: string) => {
    setStories(prevState => {
      const updState = prevState.filter(story => story.id !== id);
      saveStories(updState);
      return updState;
    });
  }

  const handleRemoveSubStories = (index: number) => {
    const storyStateCopy = [...stories];

    storyStateCopy[index].subStories = [];
    saveStories(storyStateCopy);
    setStories(storyStateCopy);
  }

  const handleMoveStory = (currIndex: number, newIndex: number) => {
    const storyStateCopy = [...stories];

    const oldOrderId = storyStateCopy[currIndex].orderId;
    storyStateCopy[currIndex].orderId = storyStateCopy[newIndex].orderId;
    storyStateCopy[newIndex].orderId = oldOrderId;


    saveStories(storyStateCopy);
    setStories(storyStateCopy);
  }

  useEffect(() => {
    const promiseWrap = async () => {
      const dbStories = await getStories();
      if (dbStories && dbStories.length) {
        setStories(dbStories);
      }
    }
    promiseWrap();
  }, []);

  return (
    <div className="px-2">
      <div>
        <ul ref={listRef}>
          {stories.sort((a, b) => a.orderId - b.orderId).map((story, i) => (
            <Story
              story={story}
              index={i}
              isLast={i === stories.length - 1}
              handleEditStory={handleEditStory}
              handleRemoveStory={handleRemoveStory}
              handleRemoveSubStories={handleRemoveSubStories}
              handleMoveStory={handleMoveStory}
              key={story.id}
            />
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <StoryAddInput
          prevOrder={stories[stories.length - 1]?.orderId || 0}
          handleAddStory={handleAddStory}
          key={stories.sort((a, b) => a.orderId - b.orderId)[stories.length - 1]?.id}
        />
      </div>
    </div>
  )
}
