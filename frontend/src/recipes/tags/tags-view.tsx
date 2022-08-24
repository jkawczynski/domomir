import AddIcon from "@mui/icons-material/Add";
import ListAltIcon from "@mui/icons-material/ListAlt";
import TagIcon from "@mui/icons-material/Tag";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useQuery } from "@tanstack/react-query";
import { FunctionComponent, useState } from "react";
import { useLocation } from "wouter";

import { getRecipes } from "../api/recipes.api";
import { Page } from "../common/page";
import { Spinner } from "../common/spinner";
import { RecipeListItem } from "./recipes-list-item";
import { Filters, RecipesFilter } from "./recipes-search-filter";
