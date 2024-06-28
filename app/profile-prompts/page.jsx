"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Profile from "@components/Profile";

const ProfilePrompts = () => {
  const [posts, setPosts] = useState([]);
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  const id = searchParams.get("id");

  useEffect(() => {
    const fetchPosts = async () => {
      if (id) {
        try {
          const response = await fetch(`/api/users/${id}/posts`);
          const data = await response.json();
          setPosts(data);
        } catch (error) {
          console.error("Failed to fetch posts:", error);
        }
      }
    };

    fetchPosts();
  }, [id]);

  if (!id) {
    return <div>No user specified</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Profile
        name={username}
        desc={`Viewing posts by ${username}`}
        data={posts}
      />
    </Suspense>
  );
};

export default ProfilePrompts;
