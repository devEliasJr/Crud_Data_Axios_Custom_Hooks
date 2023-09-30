import { createContext, useContext, useState, useEffect } from "react";
import { createPost, getAllData } from "../hooks/useFetchData";
import { AxiosError } from "axios";

interface IUserContext {
  posts: IDataProps[];
  createNewPost: (userData: any) => Promise<void>;
  isLoading: boolean;
  isError: string | null;
}

const UserContext = createContext({} as IUserContext);

export const useUserContext = () => {
  return useContext(UserContext);
};

export function PostsProvider({ children }: any) {
  const [posts, setPosts] = useState<IDataProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    setIsLoading(true);

    try {
      const res = await getAllData();
      setPosts(res);
    } catch (error) {
      if (error instanceof AxiosError) {
        setIsError("Error getting posts");
      }
    }

    setIsLoading(false);
  };

  const createNewPost = async (userData: any) => {
    const newPost = await createPost(userData);
    setPosts([...posts, newPost]);
  };

  return (
    <UserContext.Provider value={{ posts, createNewPost, isLoading, isError }}>
      {children}
    </UserContext.Provider>
  );
}
