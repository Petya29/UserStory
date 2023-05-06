import { IStory } from "../models";

const indexedDB =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB ||
    window.shimIndexedDB;

const dbCheck = () => {
    if (!indexedDB) {
        alert("This browser doesn't support IndexedDB");
        return;
    }
}

const request = indexedDB.open("UserStory", 1);

request.onerror = (e) => {
    console.log("An error occured with indexedDB");
    console.log(e);
}

request.onupgradeneeded = () => {
    const db = request.result;
    db.createObjectStore("stories", { keyPath: "id" });
}

request.onsuccess = () => {
    const db = request.result;
    const transaction = db.transaction("stories", "readwrite");

    transaction.objectStore("stories");
    transaction.oncomplete = () => {
        db.close();
    }
}

const getStories = (): Promise<IStory[]> => {
    return new Promise(function (resolve) {
        const opendedDB = indexedDB.open("UserStory", 1);

        opendedDB.onsuccess = () => {
            const db = opendedDB.result;
            const transaction = db.transaction("stories", "readwrite");
            const stories = transaction.objectStore("stories");

            stories.getAll().onsuccess = function (query) {
                db.close();
                return resolve(query.target.result);
            };
        }
    });
}

const saveStories = (storiesState: IStory[]): Promise<void> => {
    return new Promise(function (resolve) {
        const opendedDB = indexedDB.open("UserStory", 1);

        opendedDB.onsuccess = () => {
            const db = opendedDB.result;
            const transaction = db.transaction("stories", "readwrite");
            const stories = transaction.objectStore("stories");
            
            stories.clear();

            storiesState.forEach(story => {
                stories.put(story);
            });
            
            stories.transaction.oncomplete = function () {
                db.close();
                return resolve();
            }
        }
    });
}

export {
    dbCheck,
    getStories,
    saveStories
}