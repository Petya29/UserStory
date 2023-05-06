import { useEffect, useState } from "react";
import { getStories } from "../../db";
import { IStory } from "../../models";
import { StoryAddInput } from "./StoryAddInput";

export const List = () => {

  const [stories, setStories] = useState<IStory[]>([]);

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
        <ul>
          {stories.sort((a, b) => a.orderId - b.orderId).map((story, i) => (
            <li key={story.id}>{story.title}</li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <StoryAddInput
          prevOrder={stories[stories.length - 1]?.orderId || 0}
          handleAddStory={() => { }}
          key={stories.sort((a, b) => a.orderId - b.orderId)[stories.length - 1]?.id}
        />
      </div>
    </div>
  )
}
