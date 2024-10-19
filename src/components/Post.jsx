import React from "react";
import { AppContext } from "../context/AppContext";
import { Spinner } from "./Spinner";
import { Link, useNavigate } from "react-router-dom";

export const Post = (props) => {
  const store = props.post;
  if (!store) {
    return <Spinner />;
  }
  const navigate = useNavigate();
  return (
    <div className={props.className} id={store.id}>
      <div className="text-left p-4 flex justify-center items-center flex-col">
        <div className="text-base">
          <div className="font-bold text-lg hover:underline cursor-pointer" onClick={(() => {
            navigate(`/blog/${store.id}`)  
            })}>
              {store.title}
            </div>
          <div className="text-[0.9rem]">
            By <span className="italic text-[0.9rem]">{store.author}</span> on{" "}
            <span className="font-bold underline text-[0.9rem] hover:cursor-pointer" onClick={(() => {
              navigate(`/categories/${store.category}`)
            })}>
              {store.category}
            </span>
          </div>
          <div className="text-[0.9rem]">Posted on {store.date}</div>
          <div className="mt-4">{store.content}</div>
          <div className="flex text-sm gap-[6px] font-bold flex-wrap">
            {store.tags?.map((tag) => {
              return (
                <div key={tag} onClick={(() => {
                  navigate(`/tags/${tag}`)
                })} className="inline text-blue-700 underline hover:cursor-pointer">{`#${tag}`}</div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
