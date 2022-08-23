import { FunctionComponent, useState } from "react";
import { getTags, RecipeTag } from "../../api/recipes.api";
import { Spinner } from "../../common/spinner";
import { Tag } from "./tag-item";
import { useQuery } from "@tanstack/react-query";

const TagsList: FunctionComponent<{
  title: string;
  tags: RecipeTag[];
  noTagsMessage?: string;
  onTagClicked?: Function;
}> = ({ title, noTagsMessage, tags, onTagClicked }) => {
  if (!tags.length) {
    if (noTagsMessage) return <span> {noTagsMessage} </span>;
    return;
  }

  return (
    <div>
      <small className="me-2">
        <b>{title}</b>
      </small>
      {tags.map((tag) => (
        <Tag key={tag.name} recipeTag={tag} onClick={onTagClicked} />
      ))}
    </div>
  );
};

export const Tags: FunctionComponent<{
  initial?: RecipeTag[];
  onChange?: Function;
  className?: string;
}> = ({ initial, onChange, className }) => {
  const [selectedTags, setSelectedTags] = useState<RecipeTag[]>(initial || []);
  const [availableTags, setAvailableTags] = useState<RecipeTag[]>([]);
  const { isLoading, data, isError } = useQuery(["getTags"], getTags, {
    onSuccess: (data) => {
      if (!availableTags.length) {
        if (initial && initial.length) {
          data = data.filter(
            (tag) => !initial.find((t) => t.name === tag.name)
          );
        }
        setAvailableTags(data);
      }
    },
  });

  if (isLoading) return <Spinner />;
  if (!data || isError) return <span>Error loading tags</span>;

  const tagSelected = (tag: RecipeTag) => {
    const selected = [...selectedTags, tag];
    setSelectedTags(selected);
    const available = (availableTags.length ? availableTags : data).filter(
      (t) => t.name !== tag.name
    );
    setAvailableTags(available);
    if (onChange) onChange(selected);
  };

  const restoreSelectedTag = (tag: RecipeTag) => {
    const selected = selectedTags.filter((t) => t.name !== tag.name);
    setSelectedTags(selected);
    setAvailableTags([...availableTags, tag]);
    if (onChange) onChange(selected);
  };

  return (
    <div className={className}>
      <TagsList
        title="Select tags:"
        noTagsMessage="No more tags"
        tags={availableTags}
        onTagClicked={(tag: RecipeTag) => tagSelected(tag)}
      />
      <TagsList
        title="Selected tags:"
        tags={selectedTags}
        onTagClicked={(tag: RecipeTag) => restoreSelectedTag(tag)}
      />
    </div>
  );
};
