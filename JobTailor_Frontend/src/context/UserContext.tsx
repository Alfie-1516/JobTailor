"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

type User = {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string /* ...other fields */;
} | null;

const UserContext = createContext<{
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}>({
  user: null,
  setUser: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Error parsing saved user:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  // Save user to localStorage whenever it changes
  const setUserWithPersistence = (newUser: User | ((prev: User) => User)) => {
    setUser((prevUser) => {
      const updatedUser =
        typeof newUser === "function" ? newUser(prevUser) : newUser;

      if (updatedUser) {
        localStorage.setItem("user", JSON.stringify(updatedUser));
      } else {
        localStorage.removeItem("user");
      }

      return updatedUser;
    });
  };

  return (
    <UserContext.Provider value={{ user, setUser: setUserWithPersistence }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
